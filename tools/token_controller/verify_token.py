#!/usr/bin/env python3
"""
Verify RS256 Signed Agent Capability Tokens CLI
"""
import argparse
import json
import os
import sys
import jwt

def get_public_key(key_path=None):
    if key_path and os.path.exists(key_path):
        with open(key_path, "r", encoding="utf-8") as f:
            return f.read()
    env_key = os.environ.get("CONTROLLER_PUBLIC_KEY")
    if env_key:
        return env_key
    raise ValueError("Public key not found in --key-file or CONTROLLER_PUBLIC_KEY env var.")

def verify_token(token, public_key_pem):
    claims = jwt.decode(token, public_key_pem, algorithms=["RS256"], options={"verify_exp": True})
    return claims

def main():
    parser = argparse.ArgumentParser(description="Verify RS256 Agent Capability Token")
    parser.add_argument("--token", required=True, help="JWT token string")
    parser.add_argument("--key-file", help="Path to RSA public key PEM file")

    args = parser.parse_args()

    try:
        pub_key = get_public_key(args.key_file)
        claims = verify_token(args.token, pub_key)
        print(json.dumps(claims, indent=2))
    except Exception as e:
        print(f"Error verifying token: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
