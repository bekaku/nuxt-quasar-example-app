# Contributing

## Submitting Changes Upstream

This repository is a fork of [bekaku/nuxt-quasar-example-app](https://github.com/bekaku/nuxt-quasar-example-app).

To propose changes from this fork to the upstream project:

1. Visit the comparison URL:  
   https://github.com/bekaku/nuxt-quasar-example-app/compare/main...edumgt:nuxt-quasar-example-app:main

2. Click **"Create pull request"** and use the template below.

---

## WSL Ubuntu Compatibility — Upstream PR Template

**Title:** `refactor: improve WSL Ubuntu compatibility and fix font asset path`

**Body:**

```
## Summary

This PR adds first-class WSL (Windows Subsystem for Linux) support so developers
running the project from a Windows-mounted drive get a smooth experience out of
the box.

## Changes (6 files, +96 / -12 lines)

### `.gitattributes` (new)
Enforce LF line endings for `.sh`, `.bash`, `.env`, `.yml`, `.yaml`, `.ts`, `.vue`
files so scripts never break when checked out on Windows.

### `README.md`
Add a **WSL Ubuntu Quick Start** section with step-by-step setup instructions
(Node ≥20, corepack, pnpm install, `pnpm wsl:doctor`, `pnpm dev:wsl`).

### `app/assets/css/app.scss`
Fix broken font reference: `@/assets/font/` → `@/assets/fonts/`
(the actual directory is `fonts`, not `font`).

### `build-app.sh`
- Use `#!/usr/bin/env bash` and `set -euo pipefail` for robustness
- Name Docker vars (`IMAGE_NAME`, `TAG`, `BUILD_DIR`) for readability
- Guard `docker rmi` so it doesn't fail when the image doesn't exist yet
- Support both Docker Compose v2 (`docker compose`) and v1 (`docker-compose`)

### `package.json`
- Bind dev server to `--host 0.0.0.0 --port 3003` for WSL network access
- Add `dev:wsl` script — runs the dev server with `CHOKIDAR_USEPOLLING=1`
  and `WATCHPACK_POLLING=true` to catch file changes on NTFS mounts
- Add `wsl:doctor` script — runs the environment check script

### `scripts/wsl-doctor.sh` (new)
Diagnostic script that checks:
- WSL environment detection
- Node.js ≥20
- pnpm installed
- Docker installed (optional, only needed for container workflow)
- `.env.dev` present

## Testing

Run on WSL Ubuntu 22.04 with Node 20 and pnpm 9:

```bash
pnpm wsl:doctor   # all checks pass
pnpm dev:wsl      # dev server starts and hot-reloads correctly
```
```

---

## Development Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Run environment checks (WSL)
pnpm wsl:doctor

# 3. Start dev server
pnpm dev          # native Linux / macOS
pnpm dev:wsl      # WSL / Windows mounted drive
```
