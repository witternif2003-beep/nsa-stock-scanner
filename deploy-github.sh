#!/usr/bin/env bash
# deploy-github.sh — Push nsa-stock-scanner to GitHub and trigger auto-deploy to Vercel
set -euo pipefail
cd "$(dirname "$0")"

REMOTE="https://github.com/witternif2003-beep/nsa-stock-scanner.git"

if [ ! -d .git ]; then
  git init -b main
fi

git remote remove origin 2>/dev/null || true
git remote add origin "$REMOTE"

git add -A
git commit -m "NSA Serenity-Ω P1 Tier-1 Scanner: Microstructure tape, security gate, and Vercel auto-deploy pipeline" || echo "No changes to commit"

if [ -n "${GH_TOKEN:-}" ]; then
  git push "https://${GH_TOKEN}@github.com/witternif2003-beep/nsa-stock-scanner.git" main --force
else
  git push origin main --force
fi

echo "✅ Deployed to GitHub → ${REMOTE%.git}"
echo "⚡ Connected to Vercel for continuous deployment on push"
