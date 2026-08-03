import os
import json
import shutil
import urllib.error
import urllib.request
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

def test_call_api_http_error_returns_simulated(monkeypatch):
    def raise_http_error(req, timeout=None):
        raise urllib.error.HTTPError(req.get_full_url() if hasattr(req, 'get_full_url') else str(req), 401, "Unauthorized", hdrs=None, fp=None)
    monkeypatch.setattr("urllib.request.urlopen", raise_http_error)
    monkeypatch.setenv("ALLOW_AGENT_NETWORK", "1")
    cfg = council.load_config()
    res = council.call_api("qwen", "sys", "user", cfg)
    assert isinstance(res, dict)
    assert res.get("simulated", True) is True

def test_call_api_with_mocked_provider_response(monkeypatch):
    class FakeResponse:
        def __init__(self, body):
            self._body = body.encode("utf-8")
        def read(self):
            return self._body
        def __enter__(self):
            return self
        def __exit__(self, exc_type, exc, tb):
            return False
    response_body = json.dumps({"choices":[{"message":{"content":"```js\nconsole.log(\"hi\")\n```"}}]})
    monkeypatch.setattr("urllib.request.urlopen", lambda req, timeout=None: FakeResponse(response_body))
    monkeypatch.setenv("ALLOW_AGENT_NETWORK", "1")
    cfg = council.load_config()
    res = council.call_api("qwen", "sys", "user", cfg)
    assert isinstance(res, dict)
    assert res.get("simulated", False) is False
    assert "console.log" in res.get("text", "")

def test_acorn_integration_calls_node(monkeypatch):
    monkeypatch.setenv("ENABLE_ACORN_PARSE", "1")
    monkeypatch.setattr("shutil.which", lambda name: "/usr/bin/node")
    
    acorn_script = Path.cwd() / "scripts" / "parse_code_with_acorn.js"
    acorn_script.parent.mkdir(parents=True, exist_ok=True)
    if not acorn_script.exists():
        acorn_script.write_text("// dummy")

    class FakeProc:
        def __init__(self):
            self.returncode = 0
            self.stdout = b'{"ok":true}'
            self.stderr = b''
    monkeypatch.setattr("subprocess.run", lambda *a, **k: FakeProc())

    class FakeResponse:
        def __init__(self, body):
            self._body = body.encode("utf-8")
        def read(self):
            return self._body
        def __enter__(self):
            return self
        def __exit__(self, exc_type, exc, tb):
            return False
    response_body = json.dumps({"choices":[{"message":{"content":"```js\nconsole.log(\"ok\")\n```"}}]})
    monkeypatch.setattr("urllib.request.urlopen", lambda req, timeout=None: FakeResponse(response_body))

    monkeypatch.setenv("ALLOW_AGENT_NETWORK", "1")
    cfg = council.load_config()
    res_text = council.run_debate_session("task", None, role="FE-01", mode="single", judge_key="deepseek")
    debate_json = OUTPUT_DIR / "last_debate.json"
    data = json.loads(debate_json.read_text(encoding="utf-8"))
    
    found = False
    for p in data.get("proposals", []):
        for cb in p.get("code_blocks", []):
            if cb.get("lang") in ("js", "javascript", ""):
                assert cb.get("parseable", False) is True
                found = True
    assert found
