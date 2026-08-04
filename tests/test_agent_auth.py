"""
Pytest Suite for Agent Capability Token Controller & Enforcement Engine
"""
import os
import pathlib
import sys
import pytest
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa

# Ensure tools directory is on sys.path
TOOLS_DIR = pathlib.Path(__file__).parent.parent / "tools"
if str(TOOLS_DIR) not in sys.path:
    sys.path.insert(0, str(TOOLS_DIR))

import agent_auth
from token_controller.mint_token import mint_token
from token_controller.verify_token import verify_token

@pytest.fixture(scope="module")
def rsa_keypair():
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
    )
    priv_pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    ).decode("utf-8")

    public_key = private_key.public_key()
    pub_pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    ).decode("utf-8")

    return {"priv": priv_pem, "pub": pub_pem}

def test_mint_and_verify(rsa_keypair):
    agent_id = "remediation-agent"
    caps = "create_branch,apply_patch,open_pr"
    ttl_seconds = 120
    policy_hash = "fake-policy-hash-12345"

    token = mint_token(agent_id, caps, ttl_seconds, policy_hash, rsa_keypair["priv"])
    assert token is not None

    claims = verify_token(token, rsa_keypair["pub"])
    assert claims["sub"] == agent_id
    assert claims["policy_hash"] == policy_hash
    assert "apply_patch" in claims["caps"]

def test_enforcement_allowed(rsa_keypair, monkeypatch):
    monkeypatch.setenv("CONTROLLER_PUBLIC_KEY", rsa_keypair["pub"])
    monkeypatch.setenv("CONTROLLER_PRIVATE_KEY", rsa_keypair["priv"])

    policy_hash = "test-hash-999"
    token = mint_token("remediation-agent", "apply_patch,create_branch", 60, policy_hash, rsa_keypair["priv"])

    res = agent_auth.enforce(token, "apply_patch", current_policy_hash=policy_hash)
    assert res["allowed"] is True
    assert "attestation_jwt" in res

def test_enforcement_policy_hash_mismatch(rsa_keypair, monkeypatch):
    monkeypatch.setenv("CONTROLLER_PUBLIC_KEY", rsa_keypair["pub"])

    token = mint_token("remediation-agent", "apply_patch", 60, "old-hash", rsa_keypair["priv"])

    with pytest.raises(PermissionError) as exc_info:
        agent_auth.enforce(token, "apply_patch", current_policy_hash="new-hash")
    assert "Policy hash mismatch" in str(exc_info.value)

def test_enforcement_unauthorized_action(rsa_keypair, monkeypatch):
    monkeypatch.setenv("CONTROLLER_PUBLIC_KEY", rsa_keypair["pub"])

    token = mint_token("remediation-agent", "create_branch", 60, "valid-hash", rsa_keypair["priv"])

    with pytest.raises(PermissionError) as exc_info:
        agent_auth.enforce(token, "deploy", current_policy_hash="valid-hash")
    assert "Action 'deploy' not authorized" in str(exc_info.value)
