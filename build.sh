#!/bin/bash

set -e

# Install Bun
curl -fsSL https://bun.sh/install | bash
export BUN_INSTALL=$HOME/.bun
export PATH=$BUN_INSTALL/bin:$PATH

echo "bun --version"
bun --version

# Install deps
bun install --frozen-lockfile

echo "Build"
bun run build
