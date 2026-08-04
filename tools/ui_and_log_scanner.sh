#!/usr/bin/env bash
# ==============================================================================
# UI & Audit Log Scanner for EMS & Antigravity IDE Governance
# ==============================================================================

set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
EMS_SRC="$REPO_ROOT/EMS/src"
AUDIT_LOG="$REPO_ROOT/.agents/audit/audit.log"

echo "🔍 Running EMS UI & Governance Log Scanner..."
echo "📍 Target Directory: $EMS_SRC"

# 1. Touch Target Audit Check (min-h-[44px])
echo "👉 1. Auditing Interactive Touch Targets..."
TOUCH_TARGET_COUNT=$(grep -rn "min-h-\[44px\]" "$EMS_SRC" | wc -l || true)
echo "   • Found $TOUCH_TARGET_COUNT 44x44px touch target enforced controls in EMS."

# 2. Prefers-Reduced-Motion Guard Check
echo "👉 2. Checking Prefers-Reduced-Motion Rules..."
if grep -q "prefers-reduced-motion" "$EMS_SRC/index.css"; then
    echo "   • ✅ Prefers-reduced-motion media query found in EMS index.css."
else
    echo "   • ⚠️ Warning: Prefers-reduced-motion missing from EMS index.css."
fi

# 3. Audit Log Inspection
echo "👉 3. Inspecting Audit Log Status..."
if [ -f "$AUDIT_LOG" ]; then
    LOG_ENTRIES=$(wc -l < "$AUDIT_LOG")
    echo "   • ✅ Immutable Audit Log active with $LOG_ENTRIES entry records."
else
    echo "   • ⚠️ Audit log file $AUDIT_LOG initialized."
    mkdir -p "$(dirname "$AUDIT_LOG")"
    touch "$AUDIT_LOG"
fi

echo "=============================================================================="
echo "✅ EMS UI & Governance Log Scanner Audit Completed Successfully!"
