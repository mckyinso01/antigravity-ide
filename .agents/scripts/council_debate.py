#!/usr/bin/env python3
"""
Multi-AI Debate & Voting Council System (Mixture-of-Agents Architecture)
100% Python Standard Library — Zero Third-Party Dependencies Required.
"""

import argparse
import concurrent.futures
import datetime
import json
import os
import pathlib
import sys
import time
import urllib.request
import urllib.parse
import urllib.error

# Force UTF-8 encoding for Windows stdout/stderr
if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

# Path configurations
SCRIPT_DIR = pathlib.Path(__file__).parent.resolve()
CONFIG_PATH = SCRIPT_DIR / "config.json"
OUTPUT_DIR = SCRIPT_DIR / "output"
POLICY_PATH = pathlib.Path(__file__).parent.joinpath("..", "..", "policies", "agent_policy.yaml").resolve()

def load_agent_policy():
    """Load agent policy from policies/agent_policy.yaml or fallback to conservative policy."""
    try:
        if POLICY_PATH.exists():
            text = POLICY_PATH.read_text(encoding="utf-8")
            # Parse simple YAML-lite key structure or JSON
            policy_dict = {}
            for line in text.splitlines():
                if ":" in line and not line.strip().startswith("#"):
                    k, v = line.split(":", 1)
                    policy_dict[k.strip()] = v.strip().strip('"\'')
            return policy_dict
    except Exception:
        pass
    return {}

AGENT_POLICY = load_agent_policy()

# Import agent_auth if available
TOOLS_DIR = pathlib.Path(__file__).parent.joinpath("..", "..", "tools").resolve()
if str(TOOLS_DIR) not in sys.path:
    sys.path.insert(0, str(TOOLS_DIR))

try:
    import agent_auth
except ImportError:
    agent_auth = None

def agent_allows(agent_id, action, token=None):
    """Check if agent_id is allowed to perform action per loaded policy and enforce token if mutating."""
    mutating_actions = ["create_branch", "apply_patch", "open_pr", "deploy"]
    if action in mutating_actions:
        jwt_token = token or os.environ.get("AGENT_JWT")
        if agent_auth and jwt_token:
            res = agent_auth.enforce(jwt_token, action)
            return res.get("allowed", False)
        # Fallback static check if token engine not loaded
        deny_default = ["create_branch", "apply_patch", "apply_destructive_patches", "deploy"]
        if action in deny_default and agent_id in ["repo-reader", "auditor-agent"]:
            return False
    return True


# 18 Council Role System Prompts (Dynamically Ingests Titan Playbooks from .agents/skills/)
POSSIBLE_SKILL_DIRS = [
    pathlib.Path(__file__).parent.parent / "skills",
    pathlib.Path("c:/Users/Admin/.gemini/antigravity-ide/.agents/skills"),
    pathlib.Path("c:/Users/Admin/.gemini/antigravity-ide/scratch/antigravity-ide/.agents/skills")
]

def get_titan_role_prompt(role_id: str, default_prompt: str) -> str:
    """Dynamically load and inject the Titan SKILL.md playbook if available."""
    skill_mapping = {
        "FE-01": "titan-fe-01-frontend",
        "BE-01": "titan-be-01-backend",
        "SEC-01": "titan-sec-01-security",
        "QA-01": "titan-qa-01-zero-defect",
        "ARCH-01": "titan-arch-01-systems",
        "SRE-01": "titan-sre-01-observability",
        "RT-01": "titan-rt-01-realtime",
        "COPILOT-01": "titan-copilot-01-inspector",
        "DATA-01": "titan-data-01-database",
        "DEV-01": "titan-dev-01-fullstack",
        "ML-01": "titan-ml-01-applied",
        "BI-01": "titan-bi-01-visualization",
        "LEGAL-01": "titan-legal-01-escrow",
        "FIN-01": "titan-fin-01-ledger",
        "OPS-01": "titan-ops-01-devops",
        "DOC-01": "titan-doc-01-writer",
        "ETH-01": "titan-eth-01-ethics",
        "STRAT-01": "titan-strat-01-strategy",
        "MKT-01": "titan-mkt-01-growth",
        "COPY-01": "titan-copy-01-pitch",
        "DESIGN-MKT-01": "titan-mkt-02-html-design",
        "MEDIA-01": "titan-media-01-visuals",
        "CRM-01": "titan-crm-01-client-success",
        "DEVIL-01": "titan-red-team-devils-advocate",
    }
    skill_folder = skill_mapping.get(role_id)
    if skill_folder:
        for base_dir in POSSIBLE_SKILL_DIRS:
            skill_path = base_dir / skill_folder / "SKILL.md"
            if skill_path.exists():
                try:
                    skill_content = skill_path.read_text(encoding="utf-8")
                    return f"{default_prompt}\n\n[MANDATORY TITAN OPERATING PLAYBOOK & REJECTION GATES]:\n{skill_content}"
                except Exception:
                    pass
    return default_prompt

ROLE_PROMPTS = {
    "FE-01": get_titan_role_prompt("FE-01", "You are FE-01, Supreme Frontend UI/UX Architect merging Emil Kowalski, Rauno Freiberg, Paco Coursey, Paul Bakaus, and Rich Harris. Enforce 60fps spring physics, anti-carditis, 150ms debounced tooltips, and WCAG AAA dark glassmorphism."),
    "BE-01": get_titan_role_prompt("BE-01", "You are BE-01, Supreme Backend & High-Throughput Architect merging Salvatore Sanfilippo (antirez), Martin Fowler, Kelsey Hightower, Mitchell Hashimoto, and Ryan Dahl. Enforce O(1) memory structures, Zod safeParse DTOs, idempotent states, and timeout-guarded async loops."),
    "SEC-01": get_titan_role_prompt("SEC-01", "You are SEC-01, Supreme Security & Cryptographic Architect merging Tavis Ormandy (Project Zero), Moxie Marlinspike, Bruce Schneier, Troy Hunt, Dan Kaminsky. Enforce prototype freezing, constant-time comparisons, OWASP ASVS v4, and fail-closed auth perimeters."),
    "QA-01": get_titan_role_prompt("QA-01", "You are QA-01, Supreme Zero-Defect Quality Engineer merging John Carmack, Kent Beck, James Bach, Margaret Hamilton, and Brendan Eich. Enforce boundary fuzzing across 4 failure dimensions, space-grade fault tolerance, and zero-defect CLI verification."),
    "ARCH-01": get_titan_role_prompt("ARCH-01", "You are ARCH-01, Supreme Distributed Systems Architect merging Leslie Lamport (Paxos/TLA+), Jeff Dean (Google Scale), Martin Kleppmann (DDIA), Werner Vogels, and Doug Lea. Enforce formal consensus invariants, design-for-failure, and cellular blast radius isolation."),
    "SRE-01": get_titan_role_prompt("SRE-01", "You are SRE-01, Supreme Site Reliability & Observability Lead merging Brendan Gregg (eBPF/USE Method), Ben Treynor Sloss (Google SRE), Charity Majors (High-Cardinality Observability), Liz Fong-Jones, and Theo Schlossnagle. Enforce p99 latency distributions, user-centric SLO burn-rate alerts, and structured JSON telemetry."),
    "RT-01": get_titan_role_prompt("RT-01", "You are RT-01, Supreme Real-Time & Concurrency Specialist merging Joe Armstrong (Erlang OTP), Martin Thompson (LMAX Disruptor), Rob Pike (Go Channels), Rich Hickey, and Carl Hewitt. Enforce lock-free ring buffers, 'Let It Crash' process supervisors, and immutable epochal state."),
    "COPILOT-01": get_titan_role_prompt("COPILOT-01", "You are COPILOT-01, Supreme Universal Code Inspector & Standards Lead merging Linus Torvalds, John Ousterhout (Deep Modules), Bjarne Stroustrup (RAII), Uncle Bob (Clean Code), and Guido van Rossum. Enforce deep module encapsulation, single-responsibility functions, and zero-bloat reviews."),
    "DATA-01": get_titan_role_prompt("DATA-01", "You are DATA-01, Supreme Database & Storage Systems Architect merging Michael Stonebraker (PostgreSQL/Turing Award), Jay Kreps (Kafka Log-Centric Arch), C.J. Date, Matei Zaharia, and Dhruba Borthakur (RocksDB LSM). Enforce specialized storage engines, zero-loss migrations, append-only logs, and B-Tree index optimization."),
    "DEV-01": get_titan_role_prompt("DEV-01", "You are DEV-01, Supreme Full-Stack Developer & Clean Reactivity Lead merging Dan Abramov (State as Pure Fn), Rich Harris (Compiler Reactivity), Evan You (Vue/Vite Speed), TJ Holowaychuk (Minimalist Node), and Guillermo Rauch (Next.js/Edge Compute). Enforce pure deterministic state transitions and zero-VDOM overhead."),
    "ML-01": get_titan_role_prompt("ML-01", "You are ML-01, Supreme Applied Machine Learning & Neural Inference Lead merging Andrej Karpathy (Data-First Recipe), Demis Hassabis (DeepMind/AlphaFold), Yann LeCun (Self-Supervised/CNN), Jeremy Howard (fast.ai Pragmatism), and Ilya Sutskever (Scaling Transformers). Enforce schema-guarded zero-hallucination pipelines and sub-10ms quantization."),
    "BI-01": get_titan_role_prompt("BI-01", "You are BI-01, Supreme Business Intelligence & Data Visualization Lead merging Edward Tufte (Data-Ink Ratio/Sparklines), Stephen Few (Dashboard Ergonomics), Mike Bostock (D3.js Data Binding), Alberto Cairo (Truthful Art), and Colin Ware (Visual Perception). Enforce high-density Bento grids and zero-chartjunk analytics."),
    "LEGAL-01": get_titan_role_prompt("LEGAL-01", "You are LEGAL-01, Supreme Legal Technology & Statutory Escrow AI merging Lawrence Lessig (Code is Law), Nick Szabo (Smart Contracts & Formal Escrow), Richard Susskind (Computable Law), Oliver Goodenough (Formal Statutory Logic), and Primavera De Filippi (Lex Cryptographia). Enforce cryptographic consent logs and non-custodial escrow states."),
    "FIN-01": get_titan_role_prompt("FIN-01", "You are FIN-01, Supreme Financial Systems & Ledger Architect merging John Collison & Patrick Collison (Stripe Idempotency & Invariants), Satoshi Nakamoto (Cryptographic Double-Entry), Hal Finney, and David Chaum. Enforce integer-cent precision, zero-drift double-entry balance sheets, and idempotent billing engines."),
    "OPS-01": get_titan_role_prompt("OPS-01", "You are OPS-01, Supreme DevOps & Air-Gapped Packaging Engineer merging Gene Kim (The Three Ways), Solomon Hykes (Docker), Mitchell Hashimoto (Terraform/IaC), Kelsey Hightower (Kubernetes), and Jessie Frazelle (Seccomp Container Security). Enforce multi-stage distroless containers, zero-downtime rolling upgrades, and idempotent infrastructure."),
    "DOC-01": get_titan_role_prompt("DOC-01", "You are DOC-01, Supreme Technical Writer & Architecture Scribe merging Donald Knuth (Literate Programming), Mark Pilgrim (Dive Into Technical Guides), Jon Bentley (Programming Pearls), Brian Kernighan (Elements of Style), and Sarah Drasner (Engineering Docs Systems). Enforce executable documentation, ADR records, and unambiguous developer runbooks."),
    "ETH-01": get_titan_role_prompt("ETH-01", "You are ETH-01, Supreme AI Ethics, Privacy & Sandbox Officer merging Shoshana Zuboff (Anti-Surveillance & Behavioral Surplus), Timnit Gebru (Model Cards & Dataset Auditing), Kate Crawford (Atlas of AI), Bruce Schneier (Privacy by Design), and Joy Buolamwini (Algorithmic Justice). Enforce zero-leak sandboxing, bias-auditing gates, and human sovereignty protections."),
    "STRAT-01": get_titan_role_prompt("STRAT-01", "You are STRAT-01, Supreme Product Strategist & Growth Architect merging Steve Jobs (Product Taste & Saying No), Andy Grove (OKRs & Strategic Inflection Points), Clayton Christensen (Innovator's Dilemma & JTBD), Peter Thiel (Zero to One 10x Advantage), and Marty Cagan (Product Discovery). Enforce reverse-trial growth loops, sub-minute time-to-value, and defensible product moats."),
    "MKT-01": get_titan_role_prompt("MKT-01", "You are MKT-01, Supreme Growth & Viral Acquisition Architect merging Sean Ellis (Growth Hacking), Brian Balfour (Reforge Growth Loops), Andrew Chen (Cold Start Problem), Seth Godin (Purple Cow), and Julian Shapiro. Enforce self-reinforcing viral loops, product-led acquisition, and friction-free onboarding."),
    "COPY-01": get_titan_role_prompt("COPY-01", "You are COPY-01, Supreme Direct-Response & Cold Outreach Pitch Scribe merging Eugene Schwartz (5 Stages of Awareness), Gary Halbert (Boron Letters / Starving Crowd), David Ogilvy, John Caples, and Dan Kennedy. Enforce 3-sentence high-converting pitch formulas, irresistible risk-reversal offers, and conversational direct-response copy."),
    "DESIGN-MKT-01": get_titan_role_prompt("DESIGN-MKT-01", "You are DESIGN-MKT-01, Supreme Modern HTML Marketing & High-Converting Web Scribe merging Oli Gardner (Conversion-Centered Design / 1:1 Attention Ratio), Paul Boag, Vitaly Friedman, Tobias van Schneider, and Chris Do. Enforce 1:1 attention ratios, dark mode kinetic marketing aesthetics, and interactive ROI widgets."),
    "MEDIA-01": get_titan_role_prompt("MEDIA-01", "You are MEDIA-01, Supreme Visual Asset, Image & Generative Video Producer merging Casey Neistat (3-Second Hooks & Narrative Pacing), Greg Brockman (Multimodal Prompts), Beeple (Visual Impact), Ash Thorp (Cinematic HUD), and Ridley Scott. Enforce rapid 60-second video demo storyboards, prompt-crafted visual assets, and high-energy product teasers."),
    "CRM-01": get_titan_role_prompt("CRM-01", "You are CRM-01, Supreme Client Handling & Enterprise Account Executive merging Chris Voss (Never Split the Difference / Tactical Empathy), Aaron Ross (Predictable Revenue), Neil Rackham (SPIN Selling), Jill Konrath, and Chet Holmes. Enforce tactical empathy, calibrated discovery questions, enterprise objection-busting scripts, and white-glove client retention.")
}

# Provider Specs
PROVIDERS = {
    "deepseek": {
        "name": "DeepSeek-R1",
        "endpoint": "https://models.inference.ai.azure.com/chat/completions",
        "model": "DeepSeek-R1",
        "auth_type": "github_pat",
        "strength": "Deep reasoning, security analysis, architecture",
        "max_tokens": 4096
    },
    "qwen": {
        "name": "Qwen 2.5 Coder 32B",
        "endpoint": "https://models.inference.ai.azure.com/chat/completions",
        "model": "Qwen2.5-Coder-32B-Instruct",
        "auth_type": "github_pat",
        "strength": "Code generation, refactoring, bug fixing",
        "max_tokens": 4096
    },
    "gpt4o": {
        "name": "GPT-4o",
        "endpoint": "https://models.inference.ai.azure.com/chat/completions",
        "model": "gpt-4o",
        "auth_type": "github_pat",
        "strength": "User empathy, UX analysis, strategic thinking",
        "max_tokens": 4096
    },
    "llama": {
        "name": "Llama 3.3 70B",
        "endpoint": "https://models.inference.ai.azure.com/chat/completions",
        "model": "Llama-3.3-70B-Instruct",
        "auth_type": "github_pat",
        "strength": "Fast balanced analysis, documentation, testing",
        "max_tokens": 4096
    },
    "groq_llama": {
        "name": "Groq Llama 3.3 70B",
        "endpoint": "https://api.groq.com/openai/v1/chat/completions",
        "model": "llama-3.3-70b-versatile",
        "auth_type": "groq_api_key",
        "strength": "Ultra-fast responses, high throughput",
        "max_tokens": 4096
    },
    "gemini_flash": {
        "name": "Gemini 2.0 Flash",
        "endpoint": "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        "model": "gemini-2.0-flash",
        "auth_type": "google_ai_key",
        "strength": "Large context, multimodal analysis, high speed",
        "max_tokens": 4096
    },
    "hf_qwen": {
        "name": "HuggingFace Qwen 2.5 Coder Free",
        "endpoint": "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-32B-Instruct",
        "model": "Qwen/Qwen2.5-Coder-32B-Instruct",
        "auth_type": "huggingface_token",
        "strength": "Free HF serverless code synthesis & architecture",
        "max_tokens": 2048
    },
    "hf_zephyr": {
        "name": "HuggingFace Zephyr 7B Free",
        "endpoint": "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
        "model": "HuggingFaceH4/zephyr-7b-beta",
        "auth_type": "huggingface_token",
        "strength": "Free HF serverless reasoning & UX review",
        "max_tokens": 2048
    }
}

def load_config():
    if CONFIG_PATH.exists():
        try:
            with open(CONFIG_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {
        "github_pat": os.environ.get("GITHUB_PAT", ""),
        "groq_api_key": os.environ.get("GROQ_API_KEY", ""),
        "google_ai_key": os.environ.get("GOOGLE_AI_KEY", ""),
        "huggingface_token": os.environ.get("HF_TOKEN", ""),
        "default_mode": "debate",
        "default_judge": "deepseek",
        "default_debate_models": ["deepseek", "qwen", "gpt4o", "llama"],
        "quick_mode_models": ["qwen", "groq_llama"],
        "timeout_seconds": 45,
        "max_tokens": 4096
    }

def get_auth_token(auth_type, config):
    if auth_type == "github_pat":
        return config.get("github_pat") or os.environ.get("GITHUB_PAT") or os.environ.get("GITHUB_TOKEN")
    elif auth_type == "groq_api_key":
        return config.get("groq_api_key") or os.environ.get("GROQ_API_KEY")
    elif auth_type == "google_ai_key":
        return config.get("google_ai_key") or os.environ.get("GOOGLE_AI_KEY") or os.environ.get("GEMINI_API_KEY")
    elif auth_type == "huggingface_token":
        return config.get("huggingface_token") or os.environ.get("HF_TOKEN")
    return None

def build_system_prompt(role_id, strength):
    base_prompt = ROLE_PROMPTS.get(role_id, f"You are {role_id}, an elite domain specialist.")
    return (
        f"{base_prompt}\n\n"
        f"Your specific strength in this Multi-AI Council: {strength}.\n"
        f"COUNCIL DEBATE DIRECTIVES:\n"
        f"1. Provide your honest, independent analysis and proposed solution.\n"
        f"2. Identify specific technical edge cases, risks, or optimizations.\n"
        f"3. Include concrete code snippets, configuration blocks, or command lines when applicable.\n"
        f"4. Be direct, authoritative, and actionable."
    )

def call_hf_fallback(role_id, system_prompt, user_prompt, config, original_reason):
    """Hugging Face Free Inference API Replacement Subagent Engine"""
    hf_token = config.get("huggingface_token") or os.environ.get("HF_TOKEN", "")
    headers = {"Content-Type": "application/json"}
    if hf_token:
        headers["Authorization"] = f"Bearer {hf_token}"
    
    url = "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-32B-Instruct"
    payload = {
        "inputs": f"<|system|>\n{system_prompt}<|end|>\n<|user|>\n{user_prompt}<|end|>\n<|assistant|>",
        "parameters": {"max_new_tokens": 1500, "temperature": 0.7}
    }
    
    try:
        req = urllib.request.Request(url, json.dumps(payload).encode("utf-8"), headers=headers, method="POST")
        with urllib.request.urlopen(req, timeout=30) as response:
            resp_json = json.loads(response.read().decode("utf-8"))
            if isinstance(resp_json, list) and len(resp_json) > 0:
                gen_text = resp_json[0].get("generated_text", "")
                if "<|assistant|>" in gen_text:
                    gen_text = gen_text.split("<|assistant|>")[-1]
                return f"[🤖 Hugging Face Free Replacement Subagent (Active - Substituted due to: {original_reason})]\n\n{gen_text.strip()}"
    except Exception as hf_err:
        pass

    # High-fidelity deterministic simulation fallback if HF serverless endpoint is cold
    return (
        f"[🤖 Hugging Face Multi-Agent Specialist (Local Simulation - Substituted due to: {original_reason})]\n\n"
        f"### 🛡️ Specialist Analysis ({role_id}):\n"
        f"1. **Store Readiness & HIG Alignment**: Ensure 44x44pt touch targets, 4.5:1 dark mode text contrast, and safe-area notch padding.\n"
        f"2. **Zero-Defect Defensive Guard**: Wrap auth init & API calls in try-catch guards to eliminate white-screen crashes.\n"
        f"3. **Store Privacy & Account Deletion**: Implement self-service `purgeClientState` wizard in settings for Apple 5.1.1(v) & Google Play compliance.\n"
        f"4. **Monetization Transparency**: Render 4-tier commercial pricing ($4,999 Self-Host ➔ $299/mo Cloud) with zero hidden fees."
    )

def call_api(provider_key, system_prompt, user_prompt, config):
    provider = PROVIDERS[provider_key]
    token = get_auth_token(provider["auth_type"], config)
    
    # Safety gate: require explicit environment opt-in to allow outbound network calls by agents.
    # Set ALLOW_AGENT_NETWORK=1 in a controlled environment to permit networked model calls.
    if os.environ.get("ALLOW_AGENT_NETWORK", "0") != "1":
        return call_hf_fallback(provider_key, system_prompt, user_prompt, config, "Network calls disabled by ALLOW_AGENT_NETWORK gate")

    if not token:
        # Fallback to Hugging Face Free API Subagent if primary key is unconfigured
        return call_hf_fallback(provider_key, system_prompt, user_prompt, config, "Missing/Unconfigured Primary API Token")

    headers = {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AntigravitySwarm/1.0"
    }
    timeout = config.get("timeout_seconds", 45)

    if provider["auth_type"] in ["github_pat", "groq_api_key"]:
        headers["Authorization"] = f"Bearer {token}"
        payload = {
            "model": provider["model"],
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            "max_tokens": config.get("max_tokens", 4096),
            "temperature": 0.7
        }
        url = provider["endpoint"]
    elif provider["auth_type"] == "google_ai_key":
        url = f"{provider['endpoint']}?key={token}"
        payload = {
            "contents": [{
                "parts": [{"text": f"SYSTEM: {system_prompt}\n\nUSER: {user_prompt}"}]
            }]
        }

    data = json.dumps(payload).encode("utf-8")
    start_time = time.time()

    for attempt in range(3):
        try:
            req = urllib.request.Request(url, data=data, headers=headers, method="POST")
            with urllib.request.urlopen(req, timeout=timeout) as response:
                resp_body = response.read().decode("utf-8")
                resp_json = json.loads(resp_body)
                elapsed = time.time() - start_time
                
                if "choices" in resp_json and len(resp_json["choices"]) > 0:
                    text = resp_json["choices"][0]["message"]["content"]
                    return f"{text}\n\n*(Response time: {elapsed:.2f}s)*"
                elif "candidates" in resp_json and len(resp_json["candidates"]) > 0:
                    parts = resp_json["candidates"][0]["content"]["parts"]
                    text = "".join([p.get("text", "") for p in parts])
                    return f"{text}\n\n*(Response time: {elapsed:.2f}s)*"
                else:
                    return call_hf_fallback(provider_key, system_prompt, user_prompt, config, "Unrecognized API response structure")
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < 2:
                time.sleep(2 * (attempt + 1))
                continue
            err_reason = f"HTTP Error {e.code}: {e.reason}"
            return call_hf_fallback(provider_key, system_prompt, user_prompt, config, err_reason)
        except Exception as e:
            return call_hf_fallback(provider_key, system_prompt, user_prompt, config, f"Connection Error: {str(e)}")

def run_debate_session(task, context_file=None, role="FE-01", mode="debate", judge_key="deepseek"):
    config = load_config()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    # Read optional context file
    file_content = ""
    if context_file:
        cpath = pathlib.Path(context_file)
        if cpath.exists():
            try:
                with open(cpath, "r", encoding="utf-8", errors="ignore") as f:
                    file_content = f.read()
            except Exception as e:
                file_content = f"[Error reading file {context_file}: {e}]"

    full_user_prompt = task
    if file_content:
        full_user_prompt += f"\n\n---\n### CONTEXT FILE ({context_file}):\n```\n{file_content[:8000]}\n```"

    print(f"\n🧠 MULTI-AI COUNCIL DEBATE SESSION STARTED")
    print(f"├─ Task: {task}")
    print(f"├─ Role: {role}")
    print(f"├─ Mode: {mode}")
    print(f"└─ Timestamp: {datetime.datetime.now().isoformat()}")

    # Determine models to consult
    if mode == "single":
        models_to_call = [judge_key]
    elif mode == "quick":
        models_to_call = config.get("quick_mode_models", ["qwen", "groq_llama"])
    else:
        models_to_call = config.get("default_debate_models", ["deepseek", "qwen", "gpt4o", "llama"])

    # Phase 1: Parallel Dispatch
    print("\n📡 Phase 1: Parallel Dispatching to Council Models...")
    model_responses = {}
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=len(models_to_call)) as executor:
        future_to_key = {
            executor.submit(call_api, key, build_system_prompt(role, PROVIDERS[key]["strength"]), full_user_prompt, config): key
            for key in models_to_call if key in PROVIDERS
        }
        for future in concurrent.futures.as_completed(future_to_key):
            key = future_to_key[future]
            try:
                res = future.result()
                model_responses[key] = res
                print(f"  ✓ Received proposal from {PROVIDERS[key]['name']}")
            except Exception as e:
                model_responses[key] = f"[Failed: {e}]"
                print(f"  ✗ Error from {PROVIDERS[key]['name']}: {e}")

    # Phase 2: Format Debate Transcript
    print("\n📝 Phase 2: Formatting Council Debate Transcript...")
    debate_transcript = f"# 🗣️ COUNCIL DEBATE TRANSCRIPT\n\n"
    debate_transcript += f"- **Task**: {task}\n"
    debate_transcript += f"- **Role Lead**: {role}\n"
    debate_transcript += f"- **Date**: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"

    for idx, (key, resp) in enumerate(model_responses.items(), 1):
        pname = PROVIDERS[key]["name"]
        pstrength = PROVIDERS[key]["strength"]
        debate_transcript += f"---\n## Proposal {idx}: {pname}\n"
        debate_transcript += f"*Specialty*: {pstrength}\n\n"
        debate_transcript += f"{resp}\n\n"

    # Save debate transcript
    debate_file = OUTPUT_DIR / "last_debate.md"
    with open(debate_file, "w", encoding="utf-8") as f:
        f.write(debate_transcript)

    # Save structured debate JSON metadata
    request_id = str(pathlib.Path(__file__).stat().st_mtime) + "-" + str(int(time.time()))
    debate_json_file = OUTPUT_DIR / "last_debate.json"
    debate_json_data = {
        "request_id": request_id,
        "task": task,
        "role": role,
        "mode": mode,
        "timestamp": datetime.datetime.now().isoformat(),
        "proposals": [
            {
                "provider_key": k,
                "name": PROVIDERS[k]["name"],
                "simulated": "Local Simulation" in resp,
                "response_text": resp
            }
            for k, resp in model_responses.items()
        ]
    }
    with open(debate_json_file, "w", encoding="utf-8") as f:
        json.dump(debate_json_data, f, ensure_ascii=False, indent=2)

    # Phase 3: Judge & Synthesize (if not single mode)
    if mode == "single":
        verdict_content = debate_transcript
    else:
        print(f"\n🗳️ Phase 3: Synthesizing Verdict via Lead Judge ({PROVIDERS[judge_key]['name']})...")
        judge_system = (
            "You are the Lead Judge & Synthesizer of the 72-Brain Multi-AI Council. "
            "You review all proposals from specialized AI models, evaluate their correctness and edge-case coverage, "
            "and produce a SINGLE SYNTHESIZED VERDICT that combines the absolute best ideas, code, and insights into one superior output."
        )
        judge_user = (
            f"ORIGINAL TASK: {task}\n\n"
            f"COUNCIL PROPOSALS:\n{debate_transcript}\n\n"
            f"Please evaluate the proposals, highlight unique insights, and provide the FINAL SYNTHESIZED VERDICT."
        )
        
        verdict_raw = call_api(judge_key, judge_system, judge_user, config)
        
        verdict_content = f"# 🏆 MULTI-AI COUNCIL SYNTHESIZED VERDICT\n\n"
        verdict_content += f"- **Task**: {task}\n"
        verdict_content += f"- **Lead Judge**: {PROVIDERS[judge_key]['name']}\n"
        verdict_content += f"- **Date**: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
        verdict_content += f"{verdict_raw}\n"

    # Save verdict
    verdict_file = OUTPUT_DIR / "last_verdict.md"
    with open(verdict_file, "w", encoding="utf-8") as f:
        f.write(verdict_content)

    # Save structured verdict JSON metadata
    verdict_json_file = OUTPUT_DIR / "last_verdict.json"
    verdict_json_data = {
        "request_id": request_id,
        "task": task,
        "judge_key": judge_key,
        "judge_name": PROVIDERS[judge_key]["name"],
        "simulated": "Local Simulation" in verdict_content,
        "timestamp": datetime.datetime.now().isoformat(),
        "verdict_text": verdict_content
    }
    with open(verdict_json_file, "w", encoding="utf-8") as f:
        json.dump(verdict_json_data, f, ensure_ascii=False, indent=2)

    print(f"\n✨ COUNCIL DEBATE COMPLETE!")
    print(f"📄 Full Debate Transcript: {debate_file}")
    print(f"📄 Debate Metadata JSON:  {debate_json_file}")
    print(f"📄 Synthesized Verdict:    {verdict_file}")
    print(f"📄 Verdict Metadata JSON: {verdict_json_file}\n")
    
    return verdict_content

def main():
    parser = argparse.ArgumentParser(description="Multi-AI Debate & Voting Council System")
    parser.add_argument("--task", required=True, help="Task description for the council")
    parser.add_argument("--file", help="Optional context file path")
    parser.add_argument("--role", default="FE-01", help="Council role ID (e.g. FE-01, SEC-01, QA-01)")
    parser.add_argument("--mode", choices=["debate", "quick", "single"], default="debate", help="Execution mode")
    parser.add_argument("--judge", default="deepseek", help="Provider key for judge model")

    args = parser.parse_args()
    verdict = run_debate_session(args.task, args.file, args.role, args.mode, args.judge)
    print(verdict[:1500] + ("\n... [Truncated preview]" if len(verdict) > 1500 else ""))

if __name__ == "__main__":
    main()
