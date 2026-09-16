linkme := "github.com/ironicbadger/linkme/cmd/linkme@v0.0.0-20260904151423-d58495c470fd"
ds := "/Users/carolinebrewer/crb-cdn"

default:
    @just --list

# Rebuild on change, serve at localhost:3000
dev:
    go run {{linkme}} watch

# One-shot build into dist/
build:
    go run {{linkme}} build

clean:
    rm -rf dist/

# Re-copy fonts and token files from the design system (run when it changes)
sync-ds:
    cp {{quote(ds)}}/assets/fonts/{Flapjack,BigBird,Dreamboat-Light,Dreamboat-Regular}.woff2 assets/fonts/
    mkdir -p design-system
    cp {{quote(ds)}}/tokens/*.css design-system/
    @git diff --stat -- assets/fonts design-system || true
