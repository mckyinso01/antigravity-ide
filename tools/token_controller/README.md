# Token Controller Service

The Token Controller Service provides CLI utilities to mint and verify RS256 signed JWT capability tokens for agents operating within the Antigravity IDE ecosystem.

## Setup & Dependencies

```bash
pip install -r tools/token_controller/requirements.txt
```

## Minting Capability Tokens

```bash
# Mint a 120-second token for remediation-agent
python tools/token_controller/mint_token.py \
  --agent-id=remediation-agent \
  --caps=create_branch,apply_patch,open_pr \
  --ttl-seconds=120 \
  --policy-hash=$(bash scripts/policy_hash.sh) \
  --out-file=agent_token.jwt
```

## Verifying Tokens

```bash
python tools/token_controller/verify_token.py --token="$(cat agent_token.jwt)"
```
