#!/usr/bin/env bash
set -euo pipefail

pass() { printf '\033[32m[PASS]\033[0m %s\n' "$1"; }
warn() { printf '\033[33m[WARN]\033[0m %s\n' "$1"; }
fail() { printf '\033[31m[FAIL]\033[0m %s\n' "$1"; exit 1; }

if grep -qi microsoft /proc/version; then
  pass "WSL environment detected"
else
  warn "WSL environment not detected (script still works on native Linux)"
fi

command -v node >/dev/null 2>&1 || fail "Node.js is not installed"
command -v pnpm >/dev/null 2>&1 || fail "pnpm is not installed"
command -v docker >/dev/null 2>&1 && pass "docker installed" || warn "docker not installed (only needed for container workflow)"

NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
if [ "$NODE_MAJOR" -ge 20 ]; then
  pass "Node.js version is $(node -v) (>=20)"
else
  fail "Node.js version $(node -v) is too old. Use >=20"
fi

if [ -f .env.dev ]; then
  pass ".env.dev exists"
else
  warn ".env.dev missing - copy from .env and adjust API endpoints"
fi

pass "WSL doctor completed"
