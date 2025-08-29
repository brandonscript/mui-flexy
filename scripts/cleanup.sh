#!/bin/bash

# cleanup.sh - Clean up test artifacts, reports, and ephemeral files

set -e

echo "🧹 Cleaning up test artifacts and ephemeral files..."

# Define the project root directory
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

# Remove specific test result directories
echo "Removing test result directories..."
rm -rf tests/e2e/test-results \
       tests/e2e/html-report \
       tests/e2e/docs-test-results \
       tests/e2e/docs-html-report \
       docs/test-results \
       docs/html-report \
       playwright-report

# Find and remove any test-results directories recursively
echo "Removing any additional test-results directories..."
find . -name 'test-results' -type d -exec rm -rf {} + 2>/dev/null || true

# Find and remove any *-report directories within test directories
echo "Removing report directories..."
find . -name '*-report' -type d -path '*/test*' -exec rm -rf {} + 2>/dev/null || true
find . -name 'playwright-report' -type d -exec rm -rf {} + 2>/dev/null || true

# Find and remove test-related video files
echo "Removing test videos..."
find . \( -name '*.mp4' -o -name '*.webm' -o -name '*.avi' -o -name '*.mov' \) \
    -path '*/test*' -exec rm -f {} + 2>/dev/null || true

# Find and remove test-related trace files
echo "Removing test traces..."
find . -name '*.zip' -path '*/test*' -exec rm -f {} + 2>/dev/null || true

# Remove any Jest coverage directories
echo "Removing coverage directories..."
find . -name 'coverage' -type d -exec rm -rf {} + 2>/dev/null || true

# Remove any .nyc_output directories
echo "Removing .nyc_output directories..."
find . -name '.nyc_output' -type d -exec rm -rf {} + 2>/dev/null || true

# Clean up any temporary files
echo "Removing temporary files..."
find . -name '*.tmp' -o -name '*.temp' -o -name '.DS_Store' -exec rm -f {} + 2>/dev/null || true

echo "✅ Cleanup complete!"
