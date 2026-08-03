import os
import json
import unittest
import pathlib
import sys

SCRIPT_DIR = pathlib.Path(__file__).parent.resolve()
WORKSPACE_ROOT = SCRIPT_DIR.parent.parent
sys.path.insert(0, str(WORKSPACE_ROOT / ".agents" / "scripts"))

import council_debate

class TestCouncilDebate(unittest.TestCase):

    def test_load_config_returns_dict(self):
        cfg = council_debate.load_config()
        self.assertIsInstance(cfg, dict)
        self.assertIn("default_mode", cfg)

    def test_run_debate_session_fallback_creates_json(self):
        os.environ["ALLOW_AGENT_NETWORK"] = "0"
        req = "Test task for simulation fallback"
        verdict = council_debate.run_debate_session(req, None, role="FE-01", mode="single", judge_key="deepseek")
        
        debate_json = WORKSPACE_ROOT / ".agents" / "scripts" / "output" / "last_debate.json"
        self.assertTrue(debate_json.exists())
        with open(debate_json, "r", encoding="utf-8") as f:
            data = json.load(f)
        self.assertIn("proposals", data)
        for p in data["proposals"]:
            self.assertTrue(p.get("simulated", True))

if __name__ == "__main__":
    unittest.main()
