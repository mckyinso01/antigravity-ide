"""
LEAD SUITE PRO Repository Integration Test Suite
Verifies canonical design tokens, integration directories, and non-breaking module re-exports.
"""
import pathlib
import pytest

REPO_ROOT = pathlib.Path(__file__).parent.parent.resolve()
GHL_PULSE = REPO_ROOT / "GHL-PULSE"

def test_lead_suite_canonical_structure():
    assert GHL_PULSE.exists(), "Canonical LEAD SUITE PRO (GHL-PULSE) directory must exist"
    app_jsx = GHL_PULSE / "src" / "App.jsx"
    assert app_jsx.exists(), "App.jsx must exist"
    content = app_jsx.read_text(encoding="utf-8")
    assert "/ariax" in content, "App.jsx must contain /ariax integration route"
    assert "/leadgen" in content, "App.jsx must contain /leadgen integration route"

def test_ariax_absorbed_modules():
    ariax_dir = GHL_PULSE / "src" / "integrations" / "ariax"
    assert ariax_dir.exists(), "integrations/ariax directory must exist"
    index_ts = ariax_dir / "index.ts"
    assert index_ts.exists(), "index.ts re-export module must exist"
    content = index_ts.read_text(encoding="utf-8")
    assert "AutonomousAgents" in content, "AutonomousAgents must be exported"
    assert "MarketingWorkflows" in content, "MarketingWorkflows must be exported"

def test_leadgen_absorbed_modules():
    leadgen_dir = GHL_PULSE / "src" / "integrations" / "leadgen"
    assert leadgen_dir.exists(), "integrations/leadgen directory must exist"
    index_ts = leadgen_dir / "index.ts"
    assert index_ts.exists(), "index.ts re-export module must exist"
    content = index_ts.read_text(encoding="utf-8")
    assert "LandingPageScanner" in content, "LandingPageScanner must be exported"
    assert "SpeedToLeadTester" in content, "SpeedToLeadTester must be exported"

def test_legacy_token_mapping():
    token_map = GHL_PULSE / "design" / "tokens" / "legacy_mappings.json"
    assert token_map.exists(), "legacy_mappings.json must exist"
    content = token_map.read_text(encoding="utf-8")
    assert "canonical_master_tokens" in content, "legacy_mappings.json must reference canonical master tokens"
