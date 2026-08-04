"""
Runtime Agent Verification & Enforce Engine
"""
import datetime
import hashlib
import json
import os
import pathlib
import sys
import uuid
import jwt

REPO_ROOT = pathlib.Path(__file__).parent.parent.resolve()
AUDIT_LOG_PATH = REPO_ROOT / ".agents" / "audit" / "audit.log"
POLICY_PATH = REPO_ROOT / "policies" / "agent_policy.yaml"

def compute_current_policy_hash():
    if not POLICY_PATH.exists():
        return ""
    content = POLICY_PATH.read_bytes()
    return hashlib.sha256(content).hexdigest()

def get_public_key():
    env_key = os.environ.get("CONTROLLER_PUBLIC_KEY")
    if env_key:
        return env_key
    pub_file = REPO_ROOT / "tools" / "token_controller" / "keys" / "public.pem"
    if pub_file.exists():
        return pub_file.read_text(encoding="utf-8")
    return None

def get_private_key():
    env_key = os.environ.get("CONTROLLER_PRIVATE_KEY")
    if env_key:
        return env_key
    priv_file = REPO_ROOT / "tools" / "token_controller" / "keys" / "private.pem"
    if priv_file.exists():
        return priv_file.read_text(encoding="utf-8")
    return None

def verify_agent_token(token):
    if not token:
        raise ValueError("No agent token provided.")
    pub_key = get_public_key()
    if not pub_key:
        raise ValueError("Controller public key not configured (CONTROLLER_PUBLIC_KEY or public.pem).")
    
    claims = jwt.decode(token, pub_key, algorithms=["RS256"], options={"verify_exp": True})
    return claims

def enforce(agent_token, action, current_policy_hash=None, request_id=None):
    if current_policy_hash is None:
        current_policy_hash = compute_current_policy_hash()
    if request_id is None:
        request_id = f"req-{uuid.uuid4().hex[:12]}"
    
    timestamp = datetime.datetime.now(datetime.timezone.utc).isoformat()
    allowed = False
    reason = ""
    agent_id = "unknown"
    attestation_jwt = None

    try:
        claims = verify_agent_token(agent_token)
        agent_id = claims.get("agent_id") or claims.get("sub") or "unknown"
        token_policy_hash = claims.get("policy_hash")
        caps = claims.get("caps", [])

        if token_policy_hash != current_policy_hash:
            reason = f"Policy hash mismatch: token has {token_policy_hash}, current is {current_policy_hash}"
        elif action not in caps:
            reason = f"Action '{action}' not authorized in token capabilities: {caps}"
        else:
            allowed = True
            reason = "Authorized"

            # Issue attestation JWT
            priv_key = get_private_key()
            att_payload = {
                "iss": "antigravity-enforcement-engine",
                "sub": agent_id,
                "action": action,
                "policy_hash": current_policy_hash,
                "request_id": request_id,
                "timestamp": timestamp,
                "iat": int(datetime.datetime.now(datetime.timezone.utc).timestamp()),
                "exp": int((datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=15)).timestamp())
            }
            if priv_key:
                attestation_jwt = jwt.encode(att_payload, priv_key, algorithm="RS256")
            else:
                attestation_jwt = f"stub-attestation-{request_id}"

    except Exception as e:
        reason = f"Token verification failed: {str(e)}"

    # Audit Logging - Append JSON line
    AUDIT_LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    audit_entry = {
        "request_id": request_id,
        "agent_id": agent_id,
        "action": action,
        "policy_hash": current_policy_hash,
        "allowed": allowed,
        "reason": reason,
        "timestamp": timestamp,
        "attestation_jwt": attestation_jwt
    }

    with open(AUDIT_LOG_PATH, "a", encoding="utf-8") as f:
        f.write(json.dumps(audit_entry) + "\n")

    if not allowed:
        raise PermissionError(f"Policy Enforcement Denied action '{action}': {reason}")

    return {
        "allowed": True,
        "request_id": request_id,
        "attestation_jwt": attestation_jwt,
        "policy_hash": current_policy_hash
    }
