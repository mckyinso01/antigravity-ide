# Agent Governance & Policy Enforcement Specification

This document details the lifecycle, minting, enforcement, verification, key rotation, and incident response procedures for agent capability tokens in Antigravity IDE.

## 🔐 Token Lifecycle & Minting

1. **Generation of RSA Keypair**:
   ```bash
   openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048
   openssl rsa -pubout -in private.pem -out public.pem
   export CONTROLLER_PRIVATE_KEY="$(cat private.pem)"
   export CONTROLLER_PUBLIC_KEY="$(cat public.pem)"
   ```

2. **Minting Short-Lived Capability Token**:
   ```bash
   python tools/token_controller/mint_token.py \
     --agent-id=remediation-agent \
     --caps=create_branch,apply_patch,open_pr \
     --ttl-seconds=120 \
     --policy-hash=$(bash scripts/policy_hash.sh) \
     --out-file=agent_token.jwt
   ```

3. **Runtime Enforcement**:
   - Before executing mutating actions (`create_branch`, `apply_patch`, `open_pr`, `deploy`), `council_debate.py` calls `tools/agent_auth.py:enforce()`.
   - `enforce()` checks signature, policy hash alignment, and capabilities.
   - All attempts log to `.agents/audit/audit.log`.

## 🔄 Key Rotation & Revocation

- **Key Rotation**: Update `CONTROLLER_PUBLIC_KEY` in environment / GitHub Secrets. Old tokens automatically become invalid upon key rotation.
- **Token Revocation**: Since tokens are short-lived (TTL <= 120s), policy hash updates instantly invalidate older tokens.
