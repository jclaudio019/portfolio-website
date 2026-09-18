#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="${1:-../credit_risk/portfolio_export}"
TARGET_DIR="public/data/credit-risk"
FILES=(summary model_performance portfolio_risk simulation stress thresholds monitoring metadata)

mkdir -p "$TARGET_DIR"
for name in "${FILES[@]}"; do
  test -f "$SOURCE_DIR/$name.json" || { echo "Missing $SOURCE_DIR/$name.json" >&2; exit 1; }
  cp "$SOURCE_DIR/$name.json" "$TARGET_DIR/$name.json"
done

echo "Synced ${#FILES[@]} credit-risk dashboard exports into $TARGET_DIR"

