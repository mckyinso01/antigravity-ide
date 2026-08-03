import os
import json
import shutil
from pathlib import Path
import pytest

import importlib.util
import sys

MOD_PATH = Path(__file__).resolve().parents[2] / ".agents" / "scripts" / "council_debate.py"
spec = importlib.util.spec_from_file_location("council_debate", str(MOD_PATH))
council = importlib.util.module_from_spec(spec)
sys.modules["council_debate_test"] = council
spec.loader.exec_module(council)

OUTPUT_DIR = Path.cwd() / ".agents" / "scripts" / "output"

def setup_function():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def test_load_config_returns_dict():
    cfg = council.load_config()
    assert isinstance(cfg, dict)
    assert "default_mode" in cfg

def test_run_debate_session_fallback_creates_json(monkeypatch):
    monkeypatch.setenv("ALLOW_AGENT_NETWORK", "0")
    req = "Test task for simulation"
    result = council.run_debate_session(req, None, role="FE-01", mode="single", judge_key="deepseek")
    
    debate_json = OUTPUT_DIR / "last_debate.json"
    assert debate_json.exists()
    data = json.loads(debate_json.read_text(encoding="utf-8"))
    assert "proposals" in data
    for p in data["proposals"]:
        assert p.get("simulated", True) is True
