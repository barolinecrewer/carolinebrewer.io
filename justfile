# carolinebrewer.io — dev commands (bun + astro)

default: dev

dev:
    GITHUB_TOKEN="${GITHUB_TOKEN:-$(gh auth token 2>/dev/null)}" bun run dev

build:
    bun run build

preview:
    bun run preview

clean:
    bun run clean
