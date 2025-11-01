#!/bin/bash

# Sync Diagrams Script
# Copies .drawio.png diagrams from strategiz-core and strategiz-ui to the docs site

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DOCS_ROOT="$SCRIPT_DIR/.."
CORE_REPO="$DOCS_ROOT/../strategiz-core"
UI_REPO="$DOCS_ROOT/../strategiz-ui"

DIAGRAMS_DIR="$DOCS_ROOT/static/diagrams"

echo "🎨 Syncing diagrams from source repositories..."

# Create diagrams directories
mkdir -p "$DIAGRAMS_DIR/strategiz-core"
mkdir -p "$DIAGRAMS_DIR/strategiz-ui/auth"
mkdir -p "$DIAGRAMS_DIR/strategiz-ui/screens"

# Sync Strategiz Core diagrams
echo "📦 Syncing Strategiz Core diagrams..."
if [ -d "$CORE_REPO/docs/diagrams" ]; then
    rsync -av --include='*.drawio.png' --include='*.svg' --exclude='*' \
        "$CORE_REPO/docs/diagrams/" \
        "$DIAGRAMS_DIR/strategiz-core/"
    PNG_COUNT=$(find "$CORE_REPO/docs/diagrams" -name '*.drawio.png' 2>/dev/null | wc -l)
    SVG_COUNT=$(find "$CORE_REPO/docs/diagrams" -name '*.svg' 2>/dev/null | wc -l)
    echo "✅ Copied $PNG_COUNT PNG diagram(s) and $SVG_COUNT SVG diagram(s)"
else
    echo "⚠️  Core diagrams directory not found: $CORE_REPO/docs/diagrams"
fi

# Sync Strategiz UI high-level diagrams
echo "📦 Syncing Strategiz UI diagrams..."
if [ -d "$UI_REPO/docs/diagrams" ]; then
    # Copy auth diagrams
    if [ -d "$UI_REPO/docs/diagrams/auth" ]; then
        rsync -av --include='*.drawio.png' --exclude='*' \
            "$UI_REPO/docs/diagrams/auth/" \
            "$DIAGRAMS_DIR/strategiz-ui/auth/"
    fi

    # Copy screen diagrams
    if [ -d "$UI_REPO/docs/diagrams/screens" ]; then
        rsync -av --include='*.drawio.png' --exclude='*' \
            "$UI_REPO/docs/diagrams/screens/" \
            "$DIAGRAMS_DIR/strategiz-ui/screens/"
    fi

    # Copy root-level UI diagrams
    rsync -av --include='*.drawio.png' --exclude='*' --exclude='auth/' --exclude='screens/' \
        "$UI_REPO/docs/diagrams/" \
        "$DIAGRAMS_DIR/strategiz-ui/"

    echo "✅ Copied $(find "$UI_REPO/docs/diagrams" -name '*.drawio.png' | wc -l) UI diagram(s)"
else
    echo "⚠️  UI diagrams directory not found: $UI_REPO/docs/diagrams"
fi

# Sync feature-specific diagrams from strategiz-ui
echo "📦 Syncing feature-specific diagrams..."
FEATURES=("auth" "landing" "dashboard" "portfolio" "labs" "live-strategies" "marketplace" "profile" "learn")

for feature in "${FEATURES[@]}"; do
    FEATURE_DIAGRAMS="$UI_REPO/src/features/$feature/docs/diagrams"
    if [ -d "$FEATURE_DIAGRAMS" ]; then
        TARGET_DIR="$DIAGRAMS_DIR/strategiz-ui/$feature"
        mkdir -p "$TARGET_DIR"
        rsync -av --include='*.drawio.png' --exclude='*' \
            "$FEATURE_DIAGRAMS/" \
            "$TARGET_DIR/"
        COUNT=$(find "$FEATURE_DIAGRAMS" -name '*.drawio.png' 2>/dev/null | wc -l)
        if [ "$COUNT" -gt 0 ]; then
            echo "  ✅ $feature: Copied $COUNT diagram(s)"
        fi
    fi
done

echo ""
echo "🎉 Diagram sync complete!"
echo ""
echo "📊 Summary:"
echo "  - Core diagrams: $(find "$DIAGRAMS_DIR/strategiz-core" -name '*.drawio.png' 2>/dev/null | wc -l)"
echo "  - UI diagrams: $(find "$DIAGRAMS_DIR/strategiz-ui" -name '*.drawio.png' 2>/dev/null | wc -l)"
echo ""
