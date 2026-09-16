# carolinebrewer.io

Link page built with [linkme](https://github.com/ironicbadger/linkme), deployed to
GitHub Pages by Actions on every push to `main`.

Edit `config/config.yml` for links and profile; drop images in `assets/`.

## Local preview

```bash
just dev     # rebuilds on changes, serves http://localhost:3000
just build   # one-shot build into dist/
```

`just sync-ds` re-copies the fonts from `~/crb-cdn` into
`assets/fonts/` and its `tokens/*.css` into `design-system/` (reference only — not
built into the site), then prints a diff. Run it when the design system changes, then
update the `:root` values in `themes/default/styles.css` to match.

`just clean` before a build if you rename or remove an asset — linkme writes into
`dist/` without emptying it first, so deleted files linger and the old one keeps serving.

The pinned linkme version lives in the `Justfile`; bump it there and in
`.github/workflows/pages.yml` to pick up upstream changes.