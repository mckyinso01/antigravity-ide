import argparse
import json
import sys
import os

def load_config():
    config_path = os.path.join(os.path.dirname(__file__), 'config.json')
    local_config_path = os.path.join(os.path.dirname(__file__), 'local_config.json')
    
    config = {}
    if os.path.exists(config_path):
        with open(config_path, 'r') as f:
            config.update(json.load(f))
            
    if os.path.exists(local_config_path):
        with open(local_config_path, 'r') as f:
            config.update(json.load(f))
            
    return config

def classify_task(task_text):
    task = task_text.lower()
    
    # Keyword sets for classification
    code_keywords = ['code', 'refactor', 'function', 'class', 'debug', 'error', 'typescript', 'react', 'fix', 'test', 'compile']
    logic_keywords = ['math', 'algorithm', 'complex', 'architecture', 'logic', 'calculate', 'database schema']
    ux_keywords = ['design', 'color', 'brand', 'empathy', 'ui', 'ux', 'copywrite', 'slogan', 'suggest', 'brainstorm']
    
    code_score = sum(1 for k in code_keywords if k in task)
    logic_score = sum(1 for k in logic_keywords if k in task)
    ux_score = sum(1 for k in ux_keywords if k in task)
    
    scores = {
        "code": code_score,
        "logic": logic_score,
        "ux": ux_score
    }
    
    max_category = max(scores, key=scores.get)
    max_score = scores[max_category]
    
    if max_score == 0:
        return "analysis" # Default fast analysis
    return max_category

def route_to_model(category):
    routes = {
        "code": {"model": "Qwen-2.5-Coder-32B", "temperature": 0.0, "description": "Strict Code Synthesis"},
        "logic": {"model": "DeepSeek-R1", "temperature": 0.0, "description": "Deep Reasoning & Logic"},
        "ux": {"model": "GPT-4o", "temperature": 0.7, "description": "Creative UI/UX & Empathy"},
        "analysis": {"model": "Llama-3.3-70B", "temperature": 0.2, "description": "Fast Summarization & Analysis"}
    }
    return routes.get(category, routes["analysis"])

def main():
    parser = argparse.ArgumentParser(description="Dynamic Task-to-Model Router")
    parser.add_argument("--task", required=True, help="The user's task prompt")
    args = parser.parse_args()

    config = load_config()
    
    category = classify_task(args.task)
    routing = route_to_model(category)
    
    result = {
        "task_category": category,
        "selected_model": routing["model"],
        "temperature": routing["temperature"],
        "role": routing["description"]
    }
    
    # Print the routing decision so the orchestrator can read it
    print(json.dumps(result, indent=2))
    
    # Check if we actually have API keys to execute. If not, fail so Orchestrator uses fallback.
    has_keys = any(config.get(k) for k in ["groq_api_key", "google_ai_key", "huggingface_token", "github_pat"])
    
    if not has_keys:
        print("\n[ERROR] No valid API keys found in local_config.json. External routing failed.")
        print("FALLBACK_REQUIRED: Orchestrator MUST use Cognitive Persona Shift.")
        sys.exit(1)
        
    print("\n[SUCCESS] API Keys found. Simulated routing successful.")
    sys.exit(0)

if __name__ == "__main__":
    main()
