#!/bin/bash

# Auto-update docs script
# This script pulls the latest documentation from strategiz-core and updates the docs site

set -e

DOCS_DIR="/Users/cuztomizer/Documents/GitHub/strategiz-docs"
CORE_DIR="/Users/cuztomizer/Documents/GitHub/strategiz-core"

echo "🕐 $(date): Starting automatic documentation update..."

# Change to docs directory
cd "$DOCS_DIR"

# Pull latest changes from strategiz-core (optional - only if it's a git repo)
if [ -d "$CORE_DIR/.git" ]; then
    echo "📥 Pulling latest changes from strategiz-core..."
    cd "$CORE_DIR"
    git pull origin main || echo "⚠️  Warning: Could not pull latest changes from strategiz-core"
    cd "$DOCS_DIR"
fi

# Run the documentation generation script
echo "🔄 Regenerating documentation from strategiz-core..."
node scripts/generate-docs.js

# Log completion
echo "✅ $(date): Documentation update completed successfully!"
echo "📊 Documentation site updated with latest module structure and READMEs"
echo "🌐 View at: http://localhost:3000"