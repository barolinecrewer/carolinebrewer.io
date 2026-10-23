# Handoff: Caroline Brewer — Personal Homepage

## Overview
A single-page professional homepage for Caroline Brewer. A cobalt hero introduces her, alongside Milo, the brand mascot. Below it, a "Field Notes" feed lists recent GitHub activity: pushes, pull requests, releases and new repos. No nav links for now; this is the homepage only.

## About the Design Files
`Homepage.dc.html` is a **design reference built in HTML**: a prototype showing the intended look and behavior, not production code. Recreate it in the target codebase using its established patterns. If there is no codebase yet, pick a fitting stack; a static-site generator such as Astro, Eleventy or Next static export suits this page well. Open `Homepage.dc.html` in a browser to see it. It loads `support.js` and the design-system bundle in `_ds/`.

## Fidelity
**High-fidelity.** Colors, type, spacing, grain texture and hover states are final. Match them exactly. All feed content is **[bracketed placeholder]** and should come from GitHub data.

## Layout (top → bottom)
The page background is cream `#F4EBD9` with the light screenprint grain (`.print`). The root is a full-height flex column; `main` grows so the footer stays at the bottom.

### 1. Header (full-bleed)
- Background cobalt `#2F55B0` + dark grain (`.print-dark`). Text cream.
- Inner container: max-width 1120px, centered, padding 22px 24px. Flex, space-between, gap 24px.
- Wordmark "Caroline Brewer": Flapjack 22px, letter-spacing .02em, cream, no underline. It links to `/`.
- The nav was intentionally removed. Leave space on the right for it later.

### 2. Hero (full-bleed, visually continuous with the header)
- Same cobalt + `.print-dark` grain. Overlap the header by 1px (`margin-top:-1px`) so no seam shows.
- Inner: max-width 1120px, padding 32px 24px 56px. Grid `minmax(0,1fr) auto`, gap 16px, `align-items:center`.
- Left column: flex column, gap 20px, vertically centered.
  - H1 "Hi, I'm Caroline!": Flapjack 400, `clamp(46px, 8vw, 88px)`, line-height 1.1. Effect `.fx-extrude`: yolk `#EDB83C` text with a 6-step 1px tomato `#DF5638` stacked text-shadow (see `tokens/effects.css`).
  - Subline "Optimizer and tinkerer.": Karla 18px, line-height 1.6, cream, max-width 46ch.
- Right column: Milo illustration, width `min(320px, 36vw)`, aspect 3:2. **Ink = tomato, fill = cream.**
- Alternate H1 style (optional): Dreamboat Light 300, letter-spacing .08em, cream, no effect.

### 3. Feed ("Field Notes")
- `main`: max-width 760px, centered, padding 56px 24px 72px.
- H2 "Field Notes": Flapjack 34px, line-height 1.1, cobalt, margin-bottom 20px.
- The list has a 1px top border in `rgba(43,47,60,.16)`. Each item has a 1px bottom border in the same color, **except the last item (no bottom border)**.
- **Item** (`article`): grid `96px minmax(0,1fr)`, gap 20px, padding 26px 0.
  - Left: date, "Oct 10, 2026" style. Big Bird 11px, uppercase, letter-spacing .06em, color `#4A5468`, padding-top 3px.
  - Right: flex column, gap 12px.
    1. Meta row (flex, gap 8px, wrap): **Badge** + repo name (`owner/repo`, Big Bird 11px uppercase, `#4A5468`).
    2. Title (h3): **Flapjack** 400, 18px, line-height 1.3. It inherits `--font-hero` from `tokens/base.css`, as shown in the screenshots. The whole title is a link to the GitHub item. It is followed by an arrow `↗`.
    3. Summary line: Karla 14px, line-height 1.6, `#4A5468`, max-width 62ch.
    4. Optional commit list (pushes only): `ul`, padding-left 18px, gap 4px, Karla 14px, line-height 1.5, ink `#2B2F3C`.
- **Badge** (pill): Big Bird 13px, uppercase, letter-spacing .06em, padding 8px 16px, radius 999px, line-height 1.2. Tone per kind:
  - Push: bg `#4A5468`, text cream `#F4EBD9`
  - Pull request: bg kelly `#4A9463`, text `#fff`
  - Release: bg yolk `#EDB83C`, text ink `#2B2F3C`
  - New repo: transparent, text `#4A5468`, inset 1.5px `#4A5468` ring
- **Title link + arrow**
  - At rest: title ink `#2B2F3C`, no visible underline (underline color transparent, 2px thick, offset 4px). The arrow is cobalt `#2F55B0`, 0.65em, weight 900, with a 0.6px same-color text-stroke, margin-left .9em, `vertical-align:.1em`.
  - On hover (anywhere on the link): title turns cobalt, the underline fades in tomato `#DF5638`, and the arrow turns tomato. Transition 150ms on color / text-decoration-color.
- Empty state: "Nothing in this pile yet. Milo is looking into it." Karla 16px, `#4A5468`, margin-top 24px.

### 4. Footer (full-bleed)
- Background ink `#2B2F3C` + `.print-dark` grain, cream text.
- Inner: max-width 1120px, padding 28px 24px, flex space-between, wrap, gap 20px.
- Left: "© 2026 Caroline Brewer", Big Bird 13px, uppercase, letter-spacing .06em.
- Right: links (flex, gap 20px, Karla 700 14px, cream, no underline). Each is an icon (16px) plus a label: **GitHub**, **LinkedIn**, **Email** (mailto).

## Responsive
- Containers are fluid up to their max-widths, with 24px side gutters.
- The H1 scales with `clamp`. Milo scales with `36vw` up to 320px.
- Recommended below ~640px: stack the hero to one column (Milo under the text, max ~240px). Reduce the feed grid to one column, with the date above the meta row.

## Data / State
Feed items come from GitHub. The public events API (`GET /users/{user}/events/public`) works, or build them at build time. Map events as follows:
- `PushEvent` → **Push**. Title = latest commit message; summary "Pushed N commits to {branch}"; list = up to 3 commit messages; link = compare URL.
- `PullRequestEvent` → **Pull request**. Title = PR title; summary "Merged · +X −Y across N files" or "Opened · contribution to {repo}"; link = PR URL.
- `ReleaseEvent` → **Release**. Title "v{tag} — {name}"; summary = first line of the body; link = release URL.
- `CreateEvent` (repo) → **New repo**. Title = repo description; summary "Created a new repository · {language}"; link = repo URL.

Show the newest ~6–10 items. The only UI state is per-item hover; there are no filters.

## Design Tokens (Caroline Brewer v2)
**Colors**
- Cobalt `#2F55B0` (dark `#24448F`, light `#6A88CC`)
- Tomato `#DF5638` (dark `#C4442A`)
- Yolk `#EDB83C`
- Kelly `#4A9463`
- Cream `#F4EBD9`; kraft `#E8D3AA`
- Ink `#2B2F3C`; ink-muted `#4A5468`
- Border-subtle `rgba(43,47,60,.16)`

**Type**
- Fonts: Flapjack (hero), Dreamboat (alt display), Big Bird (stamp / labels), Taxi Driver (script; unused here), Karla variable 300–800 (body).
- Scale: 11 / 13 / 14 / 16 / 18 / 22 / 28 / 34 / 46 / 64 / 88 px.
- Line-heights: display 1.1, tight 1.25, body 1.6.
- Stamp tracking .06em.

**Spacing:** 4 / 8 / 12 / 16 / 24 / 28 / 32 / 48 / 64 / 96 / 128 px. Page max-width 1120px; gutter 24px.

**Radius:** 4 / 6 / 12 / 20 / 999 px.

**Texture:** procedural SVG `feTurbulence` noise, 200px tile (`--texture-print` in `tokens/texture.css`). Use `background-blend-mode: multiply` on light grounds and `screen` on cobalt / ink grounds. **Use `background-color`, never the `background` shorthand, on textured elements; the shorthand wipes out the grain.**

## Assets
- Fonts: `_ds/…/assets/fonts/` (Flapjack, BigBird, Dreamboat Light/Regular, Karla-Variable, TaxiDriver; woff2).
- Milo: `_ds/…/assets/milo/milo-point.svg` (ink layer) and `milo-point-shape-mask.png` (fill layer). He is recolored with two stacked CSS masks; see `tokens/milo.css` and `reference-components/Milo.jsx`. The ink layer gets `background: tomato` and the fill layer gets `background: cream`.
- Icons: Phosphor glyphs (github, linkedin, mail) via `tokens/icons.css`; see `reference-components/Icon.jsx`.

## Screenshots
`screenshots/01-homepage.png` (hero), `02-homepage.png` (feed) and `03-homepage.png` (feed end + footer), captured at about 910px wide. **Note:** the capture tool can't render CSS masks, so Milo appears as a solid tomato rectangle. In the browser he renders as the pointing-dog illustration, tomato ink on a cream fill. Open `Homepage.dc.html` to see him.

## Files
- `Homepage.dc.html`: the design (template markup plus a small logic class with sample data).
- `support.js`: runtime needed to open the HTML prototype only. Not for production.
- `_ds/caroline-brewer-v2-…/`: design-system tokens (`tokens/*.css`), fonts, Milo assets, component bundle.
- `screenshots/`: reference captures.
- `reference-components/`: source for Badge, Milo and Icon to port.
