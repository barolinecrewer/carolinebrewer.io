# Caroline Brewer v2 — Personal Design System

> **v2 "Board" is the default here.** This project is a copy of the original *Caroline Brewer Design System* with the v2 direction promoted from an opt-in `.theme-v2` class to the base tokens: cobalt/tomato/yolk/kelly inks, cream + kraft stock, a heavier screenprint grain on `body`, and global headline print effects. The original project is untouched, for comparison. v1 colour names (`--blue-gray`, `--red`, `--gold`, `--sage`, `--linen`, `--charcoal`, `--dark-slate`) are kept as aliases of the v2 inks so nothing breaks; `v2/legacy-v1.css` provides a `.theme-v1` scope for side-by-side comparison only.

A personal brand system: five custom display/text faces, a warm-paper palette, and a small set of flat, paper-like UI primitives. It exists to keep everything Caroline publishes — site, writing, decks, printed matter — recognisably hers.

## Sources given

| Source | What it contained |
| --- | --- |
| `uploads/caroline.css` | The single ground-truth stylesheet: `@font-face` block, 8-colour palette, accent hierarchy, 5 type roles, and three component definitions (`.btn` + primary/secondary, `.badge` + alt, `.card`). |
| `uploads/*.woff2` | Six webfont binaries: Flapjack, Big Bird, Taxi Driver, Dreamboat Light + Regular, Karla Variable. Copied verbatim to `assets/fonts/`. |

No codebase, no Figma file, no screenshots, no product copy, and **no logo file** were provided. Nothing here was reconstructed from memory — where a mark would go, the system sets the name in Flapjack (see `guidelines/brand-wordmark.card.html`). Every colour value, radius, padding and font-size that appears in `caroline.css` is carried through **verbatim**; everything beyond it (the spacing ramp, elevation, semantic aliases, the component set past button/badge/card) is a documented extension, listed under *Intentional additions*.

## Index

- `styles.css` — the only file consumers link. `@import`s everything below.
- `tokens/fonts.css` — the six `@font-face` rules, pointing at `assets/fonts/`.
- `tokens/colors.css` — palette, accent hierarchy, semantic surface/text/status aliases.
- `tokens/typography.css` — families, 11-step size scale, weights, leading, tracking, role shorthands.
- `tokens/spacing.css` — space ramp, radii, border widths, shadows, motion.
- `tokens/texture.css` — screenprint grain `--texture-print` (default) + softer v1 cardstock grains.
- `tokens/icons.css` — Phosphor icon fonts (CDN) + duotone ink hooks.
- `tokens/effects.css` — headline print effects: `.fx-extrude`, `.fx-misreg`, `.fx-vertical`, `.halftone-field`.
- `tokens/base.css` — element defaults (body, h1–h3, p, a, focus ring, selection) + `.print` / `.print-dark` / `.stock*` grain utilities.
- `v2/` — Board cards (palette, print effects, mascot slots, v1-vs-v2 components), `image-slot.js`, `legacy-v1.css`.
- `assets/fonts/` — the six `.woff2` binaries.
- `guidelines/*.card.html` — 18 foundation specimen cards (Type, Colors, Spacing, Brand).
- `components/` — see below.
- `ui_kits/personal-site/` — a 4-screen click-through personal site. **Inferred, not a recreation** (no product was supplied); see that folder's README.
- `SKILL.md` — Agent Skills entry point.
- `guidelines/brand-voice.md` — Caroline's personal brand voice (positioning line, pillars, channel tones).
- `guidelines/caroline-voice.md` — the full caroline-voice writing skill with calibration excerpts.

## Components

Grouped under `components/`. Each has `<Name>.jsx`, `<Name>.d.ts`, `<Name>.prompt.md`, plus one `@dsCard` HTML per directory.

**brand/** — `Milo` (recolourable mascot)
- **core/** — `Button`, `Badge`, `Card`, `Tag`, `Divider`, `Icon` (interim Phosphor wrapper)
**forms/** — `Input`, `Select`, `Checkbox`, `Switch`
**feedback/** — `Dialog`, `Tooltip`

### Intentional additions

`caroline.css` only defines Button, Badge and Card. The rest exist because a personal site cannot be built without them:
- `Icon` — wraps Phosphor so the set can be swapped for custom riso icons later without touching call sites.

- `Tag` — filters need a quieter chip than the Big Bird stamp Badge provides.
- `Divider` — the section rule the stylesheet's rhythm implies but never names.
- `Input` / `Select` / `Checkbox` / `Switch` — a contact form is table stakes.
- `Dialog` / `Tooltip` — minimal overlay layer; both stay inside the palette and radii already defined.

None of these introduce a new colour, radius or family.

---

## Content fundamentals

**Source of truth: `guidelines/brand-voice.md`** (positioning, four pillars, tone by channel, word bank) **and `guidelines/caroline-voice.md`** (the caroline-voice skill, built from ~155,000 words of Caroline's own writing). Read it before writing any copy. This section only adapts it to UI and site copy.

**Short version:** an earnest Southern advocate building a case. Elevated diction cut with folksy idiom and dry humor; a clear position early; concede, then pivot; concrete named specifics everywhere; long, stacked sentences that land on a short, blunt one.

**Person.** First person singular ("I"), never the corporate "we". "You" only when there's something for the reader to do. "Folks" and "y'all" are fine for a friendly audience.

**Long-form (journal, about, case studies).** Follow the register guide in the voice file: hook, then a thesis with two or three named reasons; concession pivots ("Though X, Y."); counterfactuals; em dashes, unspaced, for elaborations (never the "It's not X—it's Y" reveal); formal pieces avoid contractions.

**UI microcopy (buttons, labels, nav, errors).** The voice lives in specifics and idiom, not adverbs, so microcopy stays short and plain:
- Buttons: sentence case, verb-first, plain ("Send a note", "Read the essay"). Never "Submit", never Title Case.
- Big Bird labels: 1–3 words, uppercase via CSS ("SELECTED WORK", "ATLANTA, GA").
- Empty, error and 404 states are where personality goes: one wry, concrete line ("Nothing here yet. Milo is looking into it.").
- Exclamation marks: only in upbeat casual moments (a thank-you, a launch note). Never in errors or buttons.
- Contractions fine in UI and casual posts; avoided in formal essays.

**Never use:** in conclusion, to sum up, pivotal, tapestry, delve, furthermore, moreover, "it's worth noting", "navigate the complexities". Signature intensifiers ("undoubtedly", "certainly") at most once per ~300 words.

**Never invent** Caroline's experiences, credentials or opinions. Use a bracketed placeholder ("[project name]") instead.

**Casing.** Flapjack and Dreamboat are caps-only; write source text in sentence case and let the font uppercase it.

**Emoji: no.** The script face (Taxi Driver) carries the one warm human gesture per page, e.g. a signed "with love, Caroline".

**Reference well** for examples and placeholder content: Georgia and Atlanta, Southern rock, the Grateful Dead, Outkast and Atlanta hip-hop, classic film, comedy, law and policy — only when it fits.

---

## Visual foundations

**Palette (v2 Board).** Eight inks, no more — halfway to poster saturation. Stock grounds (`--v2-cream #F4EBD9`, `--kraft #E8D3AA`) against ink (`--v2-ink #2B2F3C`, `--v2-ink-muted #4A5468`), with four printed accents: cobalt `#2F55B0` leads (`--accent-1`, headings, primary actions and the inverse band), tomato `#DF5638` punctuates (`--accent-2`, one element per view), yolk `#EDB83C` gilds (`--accent-3`), kelly `#4A9463` carries positive status. v1 names alias these. The warm/cool tension is the whole trick — never put a cool grey ground under this type. Derived tints (`--cobalt-dark`, `--tomato-dark`, `--yolk-dark`, `--kelly-dark`, `--kraft-deep`, `--cream-deep`) exist **only** for hover/press and banding; never introduce a new hue.

**Type.** Five faces, five jobs, no overlap.
- **Flapjack** (`--font-hero`) — wide geometric caps. Headlines and the wordmark, 34–88px, leading 1.1, in `--accent-1`.
- **Dreamboat** (`--font-alt-display`) — wider, letterspaced caps in Light (300) and Regular (400). The softer alternative headline; good on dark grounds and for one-word statements. Never mix Flapjack and Dreamboat in the same headline block.
- **Big Bird** (`--font-stamp`) — typewriter caps. Eyebrows, badges, labels, captions, 11–26px, `.06em` tracking, always uppercase.
- **Taxi Driver** (`--font-script`) — casual brush script. Signature, pull-quote, one accent per view. Never a paragraph, never a button, never below 28px.
- **Karla** (`--font-body`) — variable 300–800. Everything else: paragraphs at 16/1.6, labels at 700/14, buttons at 700/14.

Scale is 11 → 88px (`--text-2xs` … `--text-5xl`). Because both display faces are caps-only, headline blocks need generous line-height even at 1.1 and should never exceed two lines.

**Spacing & layout.** 4 → 128px ramp. Card padding is `28px 32px` (from source, not rounded). Stack rhythm inside a card: title → 10px → body → 24px → action. Page max-width 1120px, gutter 24px, text measure 66ch. Layout is a plain document column — the system does not use fixed sidebars, sticky rails, or floating action buttons. Headers scroll away with the page.

**Backgrounds.** Flat colour plus a **screenprint tooth** (v2 default: `--texture-print`, heavier than v1 cardstock; `.print` multiplies on light grounds, `.print-dark` screens on cobalt/ink; `body` gets it by default). The v1 cardstock description below still applies to the `.stock` utilities. Grounds are never gradients (the source has none, and gradients fight the flat display type) and never photographic — but every large ground carries a fine paper grain so the page reads as printed stock rather than screen. The texture is procedural SVG noise held in `--texture-card` / `-fine` / `-heavy` (`tokens/texture.css`) — no image files, so it never blurs or tiles visibly. Apply it with the `.stock` utility over a flat background colour; it multiplies, so it darkens the ground very slightly and takes on its hue. On charcoal and dark-slate use `.stock-dark`, which screens the same grain so the tooth still reads. `body` gets `.stock`'s treatment by default. Never stack texture on small elements — cards, buttons and badges stay perfectly flat, which is what makes the ground feel like paper by contrast. Sections are separated by *changing the ground* — cream to linen to charcoal — and full-bleed colour bands are the primary rhythm device. Full-bleed photography is welcome inside a band; imagery should be warm-toned, slightly desaturated, film-like — never cool, clinical, or heavily blue-filtered. Black-and-white is acceptable for portraits.

**Headline print effects (v2).** `tokens/effects.css`, global. Only on Flapjack/Dreamboat at 34px+, one effect per headline, never on body, labels or components: `.fx-extrude` (yolk, 6px tomato extrusion — on cobalt), `.fx-misreg` (cobalt with a tomato off-register ghost; set `data-text` to the headline), `.fx-vertical` (spine-style rotated label). `.halftone-field` fills a panel with tomato dots.

**Corners.** 4px (checkboxes, tooltips), 6px (buttons, fields — the source value), 12px (cards — source value), 20px (dialogs), pill (badges, tags, switches). Never a sharp 0px corner and never anything above 20px on a rectangle.

**Cards.** Linen ground, 12px radius, 28/32 padding, **no border and no shadow by default**. Flat paper is the default; `elevated` swaps to a white ground with `--shadow-md` and is for genuinely floating things only. There is no "coloured left border" card in this brand.

**Borders.** Hairline `1px rgba(54,59,68,.14)` for structural separation; `1.5px` solid `--dark-slate` for anything interactive and outlined (secondary button, field, checkbox) — the 1.5px weight is a signature and should not be snapped to 1 or 2. `3px` reserved for emphasis rules.

**Shadows.** Three steps, all warm-neutral (`rgba(54,59,68,…)`), all soft and low-contrast — `--shadow-sm` (1/2, .08), `--shadow-md` (4/14, .10), `--shadow-lg` (14/40, .14). Used sparingly: dialogs, the switch knob, elevated cards. There is no inner-shadow system beyond `--shadow-inset`, a 1px top highlight used on nothing by default.

**States.** Hover darkens rather than lightens — `--accent-1` → `--blue-gray-dark`; the secondary button *inverts* (transparent → dark-slate ground, cream text). Press is a 1px downward nudge, no colour change, no scale. Disabled is opacity `.45` with `cursor: not-allowed` — never a grey re-colour. Focus is a 2px `--accent-1` outline at 2px offset, on everything.

**Motion.** Fast and unshowy: 120ms for colour, 200ms for position, 360ms only for something entering the page, all on `cubic-bezier(.2,.8,.3,1)`. Fades and short slides only. No bounce, no spring, no parallax, no scroll-jacking, no entrance animation on body copy.

**Transparency & blur.** Almost never. The one sanctioned use is the dialog scrim: charcoal at 45% with a 2px backdrop blur. No frosted-glass panels, no translucent headers. Text over imagery uses a solid colour band or a full-bleed charcoal panel — not a protection gradient and not a blurred capsule.

---

## Iconography

**Interim: Phosphor Icons, until custom riso icons exist.** No icons or logo were supplied. Custom risograph icons are planned; until then the system uses **Phosphor** (MIT), loaded from CDN by `tokens/icons.css` and wrapped by the `Icon` component (`components/core/Icon.jsx`). Swapping in the custom set later means replacing what `Icon` renders; call sites stay the same.

- **Core set (semantic names):** mail, search, arrow, arrowUpRight, rss, phone, download, menu, plus, minus, close, plus brand marks github and linkedin. Any other Phosphor name also works, but keep to the set.
- **Weights:** `regular` (single ink, `currentColor`) is the default. `duotone` adds a second ink behind the stroke (tomato by default, yolk on cobalt). Use duotone for at most one feature icon per view; never in nav rows or lists.
- **Size:** 20px default; 16px inside buttons; 24–28px for a feature icon. No icon-only nav: icons sit beside a word.
- **Colour:** inherits the text or control colour. Never decorative rainbow colouring.
- **Unicode as icon:** still fine for typographic marks: `·` separators, `×` close, `→` inline links, set in Karla.
- **Emoji: never.**
- **Milo (mascot):** `components/brand/Milo.jsx`. Vector riso illustration (`assets/milo/milo-point.svg`, `fill=currentColor`) recoloured via CSS masks (`tokens/milo.css`); `assets/milo/milo-point-shape-mask.png` fills the white of his coat (`fill="cream"`) on dark grounds. `milo-point-tomato.svg` is a fixed-colour copy for use outside the system. One pose so far: point.
- **Logo:** none. The wordmark is "Caroline Brewer" set in `--font-hero`. Do not draw a mark.
- **Imagery placeholders:** labelled linen plates in the kit stand in for project photography, not Milo.

## Open questions for Caroline

1. Is there a logo/wordmark file? The system currently sets the name in Flapjack.
2. Does an icon set exist, or should Lucide stand in permanently?
3. Is the personal-site UI kit the right surface, or should it be a portfolio/deck/newsletter instead?
