# carolinebrewer.io

Caroline Brewer's personal homepage, built with [Astro](https://astro.build) and
[Bun](https://bun.com), deployed to GitHub Pages by Actions on every push to
`main`.

## Structure

- `src/pages/index.astro` — the homepage
- `src/components/` — Header, Hero, Feed, Footer, Badge, Milo, Icon
- `src/styles/tokens.css` — the Caroline Brewer v2 design system (colors, type,
  spacing, grain, Milo mask recipe). Ported from the design handoff; change only
  when the design system changes.
- `src/lib/github.ts` — maps GitHub public events to Field Notes at build time
  (pushes, pull requests, releases, new repos)
- `public/fonts/`, `public/milo/` — webfonts and the Milo illustration assets

The design reference lives in `design_handoff/` (prototype HTML, screenshots,
original tokens) on the machine it was unpacked on. It is gitignored reference
material, not part of the build or the repo.

## Local preview

```bash
just dev     # astro dev server
just build   # static build into dist/
just preview # serve the built site
just clean   # remove dist/ and .astro/
```

Feed data is fetched from the GitHub public events API at build time; without a
token it is subject to GitHub's 60 req/hr limit. CI passes `GITHUB_TOKEN`
automatically. If the fetch fails, the page renders its empty state.

## Deploy

Push to `main`. Actions installs with Bun, builds, and publishes `dist/` via
GitHub Pages. `public/CNAME` sets the custom domain `carolinebrewer.io`.
