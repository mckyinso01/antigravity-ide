import os
import sys
import json
import time
import urllib.request
import urllib.parse
import urllib.error
import argparse

def load_env_token():
    if os.environ.get("HF_TOKEN"):
        return os.environ.get("HF_TOKEN")
    
    env_paths = [
        os.path.join(os.path.expanduser("~"), ".env"),
        "C:\\Users\\Admin\\.env",
        ".env"
    ]
    for path in env_paths:
        if os.path.exists(path):
            try:
                with open(path, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if line.startswith("HF_TOKEN="):
                            val = line.split("HF_TOKEN=", 1)[1].strip()
                            if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
                                val = val[1:-1]
                            return val
            except Exception:
                pass
    return None

def query_chat_api(model, messages, token):
    url = "https://router.huggingface.co/v1/chat/completions"
    headers = {
        "Content-Type": "application/json"
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    payload = {
        "model": model,
        "messages": messages,
        "max_tokens": 2500,
        "temperature": 0.2
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    
    retries = 5
    wait_time = 15
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req) as response:
                res_bytes = response.read()
                res_json = json.loads(res_bytes.decode("utf-8"))
                return res_json["choices"][0]["message"]["content"]
        except urllib.error.HTTPError as e:
            status = e.code
            err_body = e.read().decode("utf-8", errors="ignore")
            try:
                err_json = json.loads(err_body)
            except Exception:
                err_json = {}
            
            if status == 503 and "loading" in err_json.get("error", "").lower():
                est_time = err_json.get("estimated_time", wait_time)
                print(f"[HF API] Model {model} is loading. Waiting {est_time:.1f}s (attempt {attempt+1}/{retries})...", file=sys.stderr)
                time.sleep(max(5, min(est_time, 30)))
                continue
            else:
                print(f"[HF API Error] Status {status}: {err_body}", file=sys.stderr)
                raise RuntimeError(f"HF API returned status {status}: {err_body}")
        except Exception as e:
            print(f"[HF API Connection Error]: {e}", file=sys.stderr)
            raise
    raise RuntimeError("Model failed to load after multiple retries")

def extract_code_block(text, lang_tags):
    for tag in lang_tags:
        start_tag = f"```{tag}"
        if start_tag in text:
            try:
                parts = text.split(start_tag, 1)
                code_content = parts[1].split("```", 1)[0]
                return code_content.strip()
            except Exception:
                pass
    # Try a raw block
    if "```" in text:
        try:
            parts = text.split("```", 1)
            code_content = parts[1].split("```", 1)[0]
            # Strip initial line if it names a language
            lines = code_content.split("\n")
            if lines and len(lines[0]) < 15 and not lines[0].startswith(" ") and not lines[0].startswith("<"):
                return "\n".join(lines[1:]).strip()
            return code_content.strip()
        except Exception:
            pass
    return text.strip()

def load_guideline(role):
    knowledge_dir = "C:\\Users\\Admin\\huggingface-hub\\knowledge"
    file_map = {
        "planner": "planning_guidelines.md",
        "uiux": "uiux_guidelines.md",
        "coder": "coding_guidelines.md",
        "reviewer": "reviewer_guidelines.md",
        "marketing": "marketing_guidelines.md"
    }
    file_path = os.path.join(knowledge_dir, file_map.get(role, ""))
    if os.path.exists(file_path):
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                return "\n\nAdditional Role Guidelines:\n" + f.read().strip()
        except Exception:
            pass
    return ""

def load_memory_context():
    memory_dir = "C:\\Users\\Admin\\huggingface-hub\\memory"
    if not os.path.exists(memory_dir):
        os.makedirs(memory_dir, exist_ok=True)
        return ""
    
    past_projects = []
    try:
        files = os.listdir(memory_dir)
        for file in files:
            if file.endswith(".json"):
                file_path = os.path.join(memory_dir, file)
                with open(file_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    proj_name = data.get("name", "Unknown")
                    proj_desc = data.get("prompt", "")
                    past_projects.append(f"- Project: {proj_name}\n  Description: {proj_desc}")
    except Exception:
        pass
        
    if past_projects:
        return "\n\nReferenced Past Successful Projects (Memory):\n" + "\n".join(past_projects[:5])
    return ""

def save_project_memory(name, prompt, plan, html, css, js):
    memory_dir = "C:\\Users\\Admin\\huggingface-hub\\memory"
    os.makedirs(memory_dir, exist_ok=True)
    memory_file = os.path.join(memory_dir, f"{name.lower().replace(' ', '_')}.json")
    try:
        data = {
            "name": name,
            "prompt": prompt,
            "plan": plan,
            "html": html,
            "css": css,
            "js": js
        }
        with open(memory_file, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        print(f"[*] Project saved to memory bank: {memory_file}")
    except Exception as e:
        print(f"[!] Warning: Failed to save memory: {e}", file=sys.stderr)

def run_pipeline(prompt, output_dir, models, token):
    os.makedirs(output_dir, exist_ok=True)
    print(f"\n[Multi-Agent Pipeline] Initializing build under: {output_dir}")
    
    # ------------------ STEP 1: PLANNING ------------------
    print("\n--- STEP 1: PLANNING AGENT ---")
    print(f"Running Planning with {models['planner']}...")
    memory_context = load_memory_context()
    planner_system = (
        "You are the Lead Technical Planner Agent. Your job is to take a user prompt and design a comprehensive software "
        "architecture plan. Specify the files needed, layout structure, color palettes (use HSL modern gradients, premium dark theme), "
        "state management, and feature requirements. Do not write full code. Output your response as a detailed Markdown plan."
    ) + load_guideline("planner") + memory_context
    planner_messages = [
        {"role": "system", "content": planner_system},
        {"role": "user", "content": f"Create an implementation plan for: {prompt}"}
    ]
    plan_output = query_chat_api(models["planner"], planner_messages, token)
    
    plan_path = os.path.join(output_dir, "plan.md")
    with open(plan_path, "w", encoding="utf-8") as f:
        f.write(plan_output)
    print(f"Planner finished. Plan written to: {plan_path}")
    
    # ------------------ STEP 2: UI/UX DESIGN ------------------
    print("\n--- STEP 2: UI/UX DESIGN AGENT ---")
    print(f"Running UI/UX design with {models['uiux']}...")
    uiux_system = (
        "You are the Expert UI/UX Designer Agent. Take the app idea and the Technical Plan, and design the complete visually stunning UI layout. "
        "Use modern typography, custom animations, fluid layouts, vibrant glowing gradient headers, and premium glassmorphism styling. "
        "Output the COMPLETE HTML content and the COMPLETE CSS content. "
        "Format the HTML inside: ```html ... ``` and the CSS inside: ```css ... ```. Do not cut off or truncate the styles."
    ) + load_guideline("uiux")
    uiux_user = f"App Idea: {prompt}\n\nTechnical Plan:\n{plan_output}\n\nGenerate the complete HTML structure and CSS stylesheet files. Remember, UI aesthetics are critical, make it premium!"
    uiux_messages = [
        {"role": "system", "content": uiux_system},
        {"role": "user", "content": uiux_user}
    ]
    uiux_output = query_chat_api(models["uiux"], uiux_messages, token)
    
    html_content = extract_code_block(uiux_output, ["html", "xml"])
    css_content = extract_code_block(uiux_output, ["css"])
    
    # Fallback parsing if combined
    if not html_content or len(html_content) < 50:
        print("[Warning] HTML extraction failed or was too small, saving raw UI output instead.", file=sys.stderr)
        html_content = uiux_output
        
    html_path = os.path.join(output_dir, "index.html")
    css_path = os.path.join(output_dir, "styles.css")
    
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    if css_content and len(css_content) > 50:
        with open(css_path, "w", encoding="utf-8") as f:
            f.write(css_content)
        print(f"UI/UX Agent finished. Created: {html_path} and {css_path}")
    else:
        print(f"UI/UX Agent finished. Created: {html_path} (CSS may be embedded)")
        
    # ------------------ STEP 3: CODING & LOGIC (Self-Healing Loop) ------------------
    max_loops = 2
    loop_count = 0
    
    html_block = html_content
    css_block = css_content if css_content else ""
    js_block = ""
    review_output = ""
    
    while loop_count < max_loops:
        loop_count += 1
        print(f"\n--- STEP 3 (Iteration {loop_count}/{max_loops}): CODING & LOGIC AGENT ---")
        print(f"Running Coding with {models['coder']}...")
        coder_system = (
            "You are the Senior Software Coder Agent. Your job is to take the Technical Plan, the HTML layout, and the CSS stylesheet, "
            "and write the COMPLETE, robust JavaScript logic. Implement all interactive features, state management, "
            "API calls, input validation, and animations. Make sure there are NO placeholders or incomplete functions. "
            "Return the complete JavaScript code inside a markdown block: ```javascript ... ```."
        ) + load_guideline("coder")
        
        if loop_count > 1:
            coder_user = (
                f"App Idea: {prompt}\n\n"
                f"HTML Structure:\n{html_block}\n\n"
                f"CSS Styling:\n{css_block}\n\n"
                f"Previous JS Logic:\n{js_block}\n\n"
                f"Reviewer Feedback (Fix all these bugs!):\n{review_output}\n\n"
                f"Generate the corrected and fully complete javascript code without placeholders."
            )
        else:
            coder_user = (
                f"App Idea: {prompt}\n\n"
                f"HTML Structure:\n{html_block}\n\n"
                f"CSS Styling:\n{css_block}\n\n"
                f"Generate the complete, robust javascript code to wire up this UI."
            )
            
        coder_messages = [
            {"role": "system", "content": coder_system},
            {"role": "user", "content": coder_user}
        ]
        coder_output = query_chat_api(models["coder"], coder_messages, token)
        js_block = extract_code_block(coder_output, ["javascript", "js"])
        
        js_path = os.path.join(output_dir, "app.js")
        with open(js_path, "w", encoding="utf-8") as f:
            f.write(js_block if js_block else coder_output)
        print(f"Coder Agent finished. Javascript written to: {js_path}")
        
        # ------------------ STEP 4: CODE REVIEWER ------------------
        print(f"\n--- STEP 4 (Iteration {loop_count}/{max_loops}): CODE REVIEWER AGENT ---")
        print(f"Running Code Review with {models['reviewer']}...")
        reviewer_system = (
            "You are the Expert Code Reviewer Agent. Review the generated index.html, styles.css, and app.js. "
            "Check for logical bugs, visual inconsistencies, integration errors, or formatting problems. "
            "Suggest optimizations and list your recommendations. Output your final feedback in a markdown report."
        ) + load_guideline("reviewer")
        reviewer_user = (
            f"HTML Code:\n{html_block}\n\n"
            f"CSS Code:\n{css_block}\n\n"
            f"JS Code:\n{js_block}\n\n"
            f"Review these files, spot bugs/improvements, and output your review report."
        )
        reviewer_messages = [
            {"role": "system", "content": reviewer_system},
            {"role": "user", "content": reviewer_user}
        ]
        review_output = query_chat_api(models["reviewer"], reviewer_messages, token)
        
        review_path = os.path.join(output_dir, "review.md")
        with open(review_path, "w", encoding="utf-8") as f:
            f.write(review_output)
        print(f"Reviewer Agent finished. Report saved to: {review_path}")
        
        # Check if we need to heal code
        if "CRITICAL BUG:" in review_output or "critical bug" in review_output.lower():
            print(f"[Self-Healing Loop] Critical bugs detected. Restarting coding loop iteration {loop_count+1}...")
        else:
            print("[Self-Healing Loop] Code is clean or has no critical bugs. Proceeding.")
            break

    # ------------------ STEP 5: MARKETING & MONETIZATION ------------------
    print("\n--- STEP 5: MARKETING & MONETIZATION AGENT ---")
    print(f"Running Marketing with {models['marketing']}...")
    marketing_system = (
        "You are the Expert Marketing & Monetization Agent. Your job is to analyze the user's application prompt, "
        "the technical plan, and the final generated code files (HTML, CSS, JS), and design a complete income generation "
        "and product growth strategy. Brainstorm SaaS subscription tiers, freemium conversion points, launching channels "
        "(Product Hunt, social media hooks), and SEO optimization keywords. Output your report in a detailed markdown document."
    ) + load_guideline("marketing")
    marketing_user = (
        f"App Prompt: {prompt}\n\n"
        f"Technical Plan:\n{plan_output}\n\n"
        f"HTML Structure:\n{html_block}\n\n"
        f"CSS Styling:\n{css_block}\n\n"
        f"JS Code:\n{js_block}\n\n"
        f"Review Report:\n{review_output}\n\n"
        f"Design the monetization channels and launch marketing strategy for this project."
    )
    marketing_messages = [
        {"role": "system", "content": marketing_system},
        {"role": "user", "content": marketing_user}
    ]
    marketing_output = query_chat_api(models["marketing"], marketing_messages, token)
    
    marketing_path = os.path.join(output_dir, "marketing_strategy.md")
    with open(marketing_path, "w", encoding="utf-8") as f:
        f.write(marketing_output)
    print(f"Marketing Agent finished. Report saved to: {marketing_path}")
    
    # Save project to Memory Bank
    proj_name = os.path.basename(output_dir)
    save_project_memory(proj_name, prompt, plan_output, html_block, css_block, js_block)
    
    print(f"\n[Multi-Agent Pipeline] BUILD COMPLETED SUCCESSFULLY inside {output_dir}!")

def main():
    parser = argparse.ArgumentParser(description="Hugging Face Multi-Agent Orchestrator")
    parser.add_argument("--prompt", required=True, help="Detailed app requirements/idea")
    parser.add_argument("--output-dir", required=True, help="Workspace directory to save generated files")
    parser.add_argument("--planner-model", default="meta-llama/Llama-3.3-70B-Instruct", help="Model for Planning role")
    parser.add_argument("--uiux-model", default="Qwen/Qwen2.5-72B-Instruct", help="Model for UI/UX Designer role")
    parser.add_argument("--coder-model", default="Qwen/Qwen2.5-Coder-32B-Instruct", help="Model for Coder role")
    parser.add_argument("--reviewer-model", default="Qwen/Qwen2.5-Coder-32B-Instruct", help="Model for Reviewer role")
    parser.add_argument("--marketing-model", default="meta-llama/Llama-3.3-70B-Instruct", help="Model for Marketing role")
    
    args = parser.parse_args()
    
    token = load_env_token()
    if not token:
        print("[WARNING] HF_TOKEN was not found in environment or .env file. API queries will likely hit rate limits or fail.", file=sys.stderr)
        
    models = {
        "planner": args.planner_model,
        "uiux": args.uiux_model,
        "coder": args.coder_model,
        "reviewer": args.reviewer_model,
        "marketing": args.marketing_model
    }
    
    try:
        run_pipeline(args.prompt, args.output_dir, models, token)
    except Exception as e:
        print(f"[Multi-Agent Pipeline Failed]: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
