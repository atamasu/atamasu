#!/bin/bash
set -euo pipefail

# Only run in remote (web) environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Session start hook for Claude Code on the web
# Add dependency installation commands here as the project grows
echo "Session start hook completed successfully"
