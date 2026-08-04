"""
Tests for Policy Invariants
"""
import pathlib
import pytest
import yaml

REPO_ROOT = pathlib.Path(__file__).parent.parent.parent.resolve()
POLICY_PATH = REPO_ROOT / "policies" / "agent_policy.yaml"

def test_policy_file_exists():
    assert POLICY_PATH.exists(), f"Policy file {POLICY_PATH} does not exist."

def test_policy_invariants():
    with open(POLICY_PATH, "r", encoding="utf-8") as f:
        policy_data = yaml.safe_load(f)

    assert "agents" in policy_data, "Policy YAML missing 'agents' root key."
    agents = policy_data["agents"]

    for agent_id, agent_spec in agents.items():
        allowed_actions = agent_spec.get("allowed_actions", [])
        
        # Invariant: If agent is allowed to apply_patch or create_branch,
        # audit_logging MUST be True and review_requirements MUST NOT be empty.
        if "apply_patch" in allowed_actions or "create_branch" in allowed_actions:
            assert agent_spec.get("audit_logging") is True, (
                f"Agent '{agent_id}' has mutating capabilities but audit_logging is not true."
            )
            review_reqs = agent_spec.get("review_requirements", "")
            assert review_reqs and str(review_reqs).strip(), (
                f"Agent '{agent_id}' has mutating capabilities but review_requirements is empty."
            )
