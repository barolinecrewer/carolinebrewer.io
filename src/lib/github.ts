/**
 * Field Notes — maps GitHub public events to feed items at build time.
 *
 * Event mapping (per the design handoff):
 * - PushEvent      → Push badge, latest commit message, up to 3 commits, compare link
 * - PullRequestEvent → Pull request badge, PR title, merged/opened summary, PR link
 * - ReleaseEvent   → Release badge, "v{tag} — {name}", first line of the body, release link
 * - New repos      → New repo badge, repo description, language, repo link (repos API,
 *   not CreateEvent: the events feed lags the repos API and misses repo creation)
 *
 * Notes on the public events API:
 * - PR payloads are slim (no title, html_url or stats), so each PR event is
 *   enriched with one fetch to the pull request itself.
 * - CreateEvent payloads carry the description but not the repo language, so
 *   new-repo items fetch the repository for it.
 *
 * Set GITHUB_TOKEN to lift the 60 req/hr unauthenticated limit (CI provides one).
 * Private repos are excluded: the public events endpoint only returns public
 * activity, and the enrichment fetches drop any item that resolves to a
 * private repository.
 */

export type NoteKind = 'push' | 'pr' | 'release' | 'repo';

export interface FieldNote {
  kind: NoteKind;
  kindLabel: string;
  tone: 'slate' | 'sage' | 'gold' | 'outline';
  /** Sort key; rendered date is derived from it. */
  ts: string;
  date: string;
  repo: string;
  title: string;
  summary: string;
  commits: string[];
  url: string;
}

const KINDS: Record<NoteKind, { kindLabel: string; tone: FieldNote['tone'] }> = {
  push: { kindLabel: 'Push', tone: 'slate' },
  pr: { kindLabel: 'Pull request', tone: 'sage' },
  release: { kindLabel: 'Release', tone: 'gold' },
  repo: { kindLabel: 'New repo', tone: 'outline' },
};

const MAX_ITEMS = 8;
const MAX_PAGES = 3; // 90 events scanned, newest first
const REPO_WINDOW_DAYS = 90; // matches the events API window
const ZERO_SHA = /^0+$/;

interface GhEvent {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    ref?: string;
    ref_type?: string;
    description?: string;
    size?: number;
    before?: string;
    head?: string;
    number?: number;
    action?: string;
    commits?: { message: string }[];
    pull_request?: { url: string; number: number } | null;
    release?: {
      tag_name: string;
      name: string | null;
      body: string | null;
      html_url: string;
    } | null;
  };
}

interface FullPr {
  title: string;
  html_url: string;
  merged: boolean;
  additions?: number;
  deletions?: number;
  changed_files?: number;
  base?: { repo?: { private?: boolean } };
}

function apiHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'carolinebrewer.io-site',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { headers: apiHeaders() });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}

function firstLine(text: string | null | undefined): string {
  return (text ?? '').split('\n')[0].trim();
}

/** A mapped event, plus the async work needed to finish it (PR / repo lookups). */
interface Candidate {
  date: string;
  repo: string;
  build: () => Promise<FieldNote | null>;
}

function mapEvent(event: GhEvent): Candidate | null {
  const base = {
    ts: event.created_at,
    date: formatDate(event.created_at),
    repo: event.repo.name,
  };

  switch (event.type) {
    case 'PushEvent': {
      const payload = event.payload;
      const hasCommitData = (payload.commits ?? []).length > 0;
      if (!hasCommitData && !payload.head) return null;
      return {
        ...base,
        build: async () => {
          const branch = (payload.ref ?? '').replace('refs/heads/', '') || 'main';
          let count = payload.size ?? payload.commits?.length ?? 0;
          let messages = (payload.commits ?? []).map((c) => firstLine(c.message));

          // Some public push events omit size/commits — resolve via the API.
          if (messages.length === 0 && payload.head) {
            if (payload.before && !ZERO_SHA.test(payload.before)) {
              const cmp = await fetchJson<{
                total_commits: number;
                commits: { commit: { message: string } }[];
              }>(
                `https://api.github.com/repos/${event.repo.name}/compare/${payload.before}...${payload.head}`,
              );
              if (cmp) {
                count = cmp.total_commits;
                messages = cmp.commits.map((c) => firstLine(c.commit.message));
              }
            } else {
              const commit = await fetchJson<{ commit: { message: string } }>(
                `https://api.github.com/repos/${event.repo.name}/commits/${payload.head}`,
              );
              if (commit) {
                count = 1;
                messages = [firstLine(commit.commit.message)];
              }
            }
          }
          if (messages.length === 0) return null;

          const url =
            payload.before && payload.head && !ZERO_SHA.test(payload.before)
              ? `https://github.com/${event.repo.name}/compare/${payload.before}...${payload.head}`
              : `https://github.com/${event.repo.name}/commit/${payload.head ?? ''}`;
          return {
            ...base,
            ...KINDS.push,
            kind: 'push',
            title: messages[messages.length - 1],
            summary: `Pushed ${count} commit${count === 1 ? '' : 's'} to ${branch}`,
            commits: messages.slice(-3),
            url,
          };
        },
      };
    }

    case 'PullRequestEvent': {
      const prRef = event.payload.pull_request;
      const number = prRef?.number ?? event.payload.number;
      if (!number) return null;
      const apiUrl =
        prRef?.url ?? `https://api.github.com/repos/${event.repo.name}/pulls/${number}`;
      return {
        ...base,
        build: async () => {
          const pr = await fetchJson<FullPr>(apiUrl);
          if (!pr) return null;
          // Private repos never appear in the public events feed, but guard the
          // enrichment fetches too — a token with broader read scope must not
          // surface private activity.
          if (pr.base?.repo?.private) return null;
          // Closed without merging is noise; merged and opened both make the feed.
          if (event.payload.action === 'closed' && !pr.merged) return null;
          const merged = pr.merged;
          return {
            ...base,
            ...KINDS.pr,
            kind: 'pr',
            title: pr.title,
            summary: merged
              ? `Merged · +${pr.additions ?? 0} −${pr.deletions ?? 0} across ${pr.changed_files ?? 0} files`
              : `Opened · contribution to ${event.repo.name.split('/')[1] ?? event.repo.name}`,
            commits: [],
            url: pr.html_url,
          };
        },
      };
    }

    case 'ReleaseEvent': {
      const release = event.payload.release;
      if (!release) return null;
      return {
        ...base,
        build: async () => {
          const version = release.tag_name.startsWith('v')
            ? release.tag_name
            : `v${release.tag_name}`;
          const name = release.name && release.name !== release.tag_name ? release.name : null;
          return {
            ...base,
            ...KINDS.release,
            kind: 'release',
            title: name ? `${version} — ${name}` : version,
            summary: firstLine(release.body) || `Released ${version}`,
            commits: [],
            url: release.html_url,
          };
        },
      };
    }

    default:
      return null;
  }
}

async function fetchEventNotes(user: string): Promise<FieldNote[]> {
  const candidates: Candidate[] = [];

  try {
    for (let page = 1; page <= MAX_PAGES && candidates.length < MAX_ITEMS; page++) {
      const events = await fetchJson<GhEvent[]>(
        `https://api.github.com/users/${user}/events/public?per_page=30&page=${page}`,
      );
      if (!events || events.length === 0) break;
      for (const event of events) {
        const candidate = mapEvent(event);
        if (candidate) candidates.push(candidate);
      }
    }
  } catch {
    // Network or rate-limit failure — the page renders its empty state.
    return [];
  }

  const notes = await Promise.all(candidates.map((candidate) => candidate.build()));
  return notes.filter((note): note is FieldNote => note !== null);
}

/**
 * New repos come from the repos API instead of CreateEvent: the events feed
 * lags it by hours and sometimes never publishes a repo's own creation.
 */
async function fetchRepoNotes(user: string): Promise<FieldNote[]> {
  const repos = await fetchJson<
    { name: string; description: string | null; language: string | null; created_at: string }[]
  >(`https://api.github.com/users/${user}/repos?sort=created&direction=desc&per_page=10`);
  if (!repos) return [];

  const cutoff = Date.now() - REPO_WINDOW_DAYS * 86_400_000;
  return repos
    .filter((repo) => Date.parse(repo.created_at) > cutoff)
    .map((repo) => ({
      ...KINDS.repo,
      kind: 'repo' as const,
      ts: repo.created_at,
      date: formatDate(repo.created_at),
      repo: `${user}/${repo.name}`,
      title: repo.description || repo.name,
      summary: repo.language
        ? `Created a new repository · ${repo.language}`
        : 'Created a new repository',
      commits: [],
      url: `https://github.com/${user}/${repo.name}`,
    }));
}

export async function fetchFieldNotes(user: string): Promise<FieldNote[]> {
  const [events, repos] = await Promise.all([fetchEventNotes(user), fetchRepoNotes(user)]);
  const seen = new Set<string>();
  const unique = [...events, ...repos]
    .sort((a, b) => b.ts.localeCompare(a.ts))
    .filter((note) => {
      if (seen.has(note.url)) return false;
      seen.add(note.url);
      return true;
    });
  return unique.slice(0, MAX_ITEMS);
}
