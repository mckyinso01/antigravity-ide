# 🧠 Multi-AI Debate & Voting Council System (0-Quota / Free Swarm)

A local Mixture-of-Agents (MoA) Council System for Antigravity IDE. Sends tasks to multiple free-tier AI models in parallel (DeepSeek-R1, Qwen 2.5 Coder, GPT-4o, Llama 3.3 70B, Gemini 2.0 Flash), gathers independent proposals, and synthesizes a single superior answer.

---

## 🚀 Quick Setup & Free API Keys

1. Open `c:\Users\Admin\.antigravity-ide\.agents\scripts\config.json`
2. Add your free API keys:

| Provider | Free Key URL | Notes |
| --- | --- | --- |
| **GitHub Models API** | [github.com/settings/tokens](https://github.com/settings/tokens) | Personal Access Token (classic). Grants access to DeepSeek-R1, Qwen 2.5, GPT-4o, Llama 3.3 70B. |
| **Groq API** | [console.groq.com/keys](https://console.groq.com/keys) | Instant key. Ultra-fast Llama 3.3 70B & Mixtral inference. |
| **Google AI Studio** | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) | Free key. Grants access to Gemini 2.0 Flash. |

*Note: If no API keys are entered, the script automatically operates in local simulation mode.*

---

## 💻 Command Usage Examples

### 1. Full Council Debate Mode (4 Models + 1 Judge)

```bash
python .agents/scripts/council_debate.py --task "Design offline inventory sync schema for OmniStock POS" --role "ARCH-01" --mode debate
```

### 2. Quick Pair Debate (2 Fast Models + 1 Judge)

```bash
python .agents/scripts/council_debate.py --task "Check dark mode contrast ratio" --file "omnistock/src/index.css" --role "FE-01" --mode quick
```

### 3. Security Audit with File Context

```bash
python .agents/scripts/council_debate.py --task "Audit for XSS, CSRF, and secret leaks" --file "omnistock/src/App.jsx" --role "SEC-01"
```

---

## 📂 Output Artifacts

- **Full Debate Transcript**: `.agents/scripts/output/last_debate.md`
- **Synthesized Winning Verdict**: `.agents/scripts/output/last_verdict.md`
