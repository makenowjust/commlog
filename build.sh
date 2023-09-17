#!/bin/bash

set -ex

# Install Bun
curl -fsSL https://bun.sh/install | bash
export BUN_INSTALL=$HOME/.bun
export PATH=$BUN_INSTALL/bin:$PATH
bun --version

# Install deps
bun install --frozen-lockfile

# Build
bun x nuxi generate
