# carolinebrewer.io

Static Astro 5 homepage, Bun for packages, `just` for commands (`just dev|build|preview|clean`). Pushes to `main` deploy to GitHub Pages; see README.md for structure.

- `src/styles/tokens.css` is the Caroline Brewer v2 design system. Edit it only when the design system itself changes; style components with its tokens.
- `src/lib/github.ts` fetches GitHub public events at build time, plus recent repos from the repos API for the "New repo" cards. Unauthenticated, it hits the 60 req/hr limit; `just dev` supplies `gh auth token`. A failed fetch renders the empty state, so treat an empty feed as a fetch problem first.
- The public events feed is unreliable for freshness — it can lag the repos API by hours and drop new events for stretches (observed: frozen for days). If push/PR/release cards look stale but "New repo" cards are correct, that's the events feed, not this code.
- The feed is baked into the HTML, so it is only as fresh as the last deploy. `.github/workflows/pages.yml` also runs on a daily cron (`17 6 * * *`) to re-fetch. A stale feed is a deploy-recency problem, not a code problem; a push-triggered build can also miss its own push event to API propagation lag.
- `design_handoff/` is reference material for the design, not part of the build.
- Verify changes with `just build`; there are no tests.
