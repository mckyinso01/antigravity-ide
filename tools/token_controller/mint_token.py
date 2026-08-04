#!/usr/bin/env python3
"""
Mint RS256 Signed Agent Capability Tokens CLI
"""
import argparse
import datetime
import os
import pathlib
import sys
import jwt

def get_private_key(key_path=None):
    if key_path and os.path.exists(key_path):
        with open(key_path, "r", encoding="utf-8") as f:
            return f.read()
    env_key = os.environ.get("CONTROLLER_PRIVATE_KEY")
    if env_key:
        return env_key
    raise ValueError("Private key not found in --key-file or CONTROLLER_PRIVATE_KEY env var.")

def mint_token(agent_id, caps, ttl_seconds, policy_hash, private_key_pem):
    now = datetime.datetime.now(datetime.timezone.utc)
    payload = {
        "iss": "antigravity-token-controller",
        "sub": agent_id,
        "agent_id": agent_id,
        "caps": [c.strip() for c in caps.split(",") if c.strip()],
        "policy_hash": policy_hash,
        "iat": int(now.timestamp()),
        "exp": int((now + datetime.timedelta(seconds=ttl_seconds)).timestamp())
    }
    token = jwt.encode(payload, private_key_pem, algorithm="RS256")
    return token

def main():
    parser = argparse.ArgumentParser(description="Mint RS256 Agent Capability Token")
    parser.add_argument("--agent-id", required=True, help="Agent Identifier")
    parser.add_argument("--caps", required=True, help="Comma-separated capabilities")
    parser.add_argument("--ttl-seconds", type=int, default=120, help="Token TTL in seconds")
    parser.add_argument("--policy-hash", required=True, help="SHA256 hash of active agent policy")
    parser.add_argument("--key-file", help="Path to RSA private key PEM file")
    parser.add_argument("--out-file", help="Optional output path to write JWT string")

    args = parser.parse_args()

    try:
        priv_key = get_private_key(args.key_file)
        token = mint_token(args.agent_id, args.caps, args.ttl_seconds, args.policy_hash, priv_key)
        if args.out_file:
            pathlib.Path(args.out_file).write_text(token, encoding="utf-8")
        print(token)
    except Exception as e:
        print(f"Error minting token: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
