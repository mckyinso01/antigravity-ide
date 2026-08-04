#!/bin/bash
# Compute SHA256 Hash of policies/agent_policy.yaml
POLICY_FILE="$(dirname "$0")/../policies/agent_policy.yaml"

if [ ! -f "$POLICY_FILE" ]; then
  echo "Error: Policy file $POLICY_FILE not found." >&2
  exit 1
fi

if command -v sha256sum >/dev/null 2>&1; then
  sha256sum "$POLICY_FILE" | awk '{print $1}'
elif command -v shasum >/dev/null 2>&1; then
  shasum -a 256 "$POLICY_FILE" | awk '{print $1}'
else
  python3 -c "import hashlib; print(hashlib.sha256(open('$POLICY_FILE', 'rb').read()).hexdigest())"
fi
