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
                            # Extract token value, stripping quotes
                            val = line.split("HF_TOKEN=", 1)[1].strip()
                            if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
                                val = val[1:-1]
                            return val
            except Exception:
                pass
    return None

def query_api(model, payload, token, is_binary_input=False, content_type="application/json"):
    url = f"https://api-inference.huggingface.co/models/{model}"
    headers = {
        "Content-Type": content_type
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
        
    if is_binary_input:
        data = payload
    else:
        data = json.dumps(payload).encode("utf-8")
        
    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    
    retries = 5
    wait_time = 15
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req) as response:
                return response.read()
        except urllib.error.HTTPError as e:
            status = e.code
            err_body = e.read().decode("utf-8", errors="ignore")
            try:
                err_json = json.loads(err_body)
            except Exception:
                err_json = {}
            
            # Catch cold start (503)
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

def query_chat_api(model, messages, token):
    url = "https://api-inference.huggingface.co/v1/chat/completions"
    headers = {
        "Content-Type": "application/json"
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    payload = {
        "model": model,
        "messages": messages,
        "max_tokens": 2048
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    
    retries = 5
    wait_time = 15
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req) as response:
                return response.read()
        except urllib.error.HTTPError as e:
            status = e.code
            err_body = e.read().decode("utf-8", errors="ignore")
            try:
                err_json = json.loads(err_body)
            except Exception:
                err_json = {}
            
            if status == 503 and "loading" in err_json.get("error", "").lower():
                est_time = err_json.get("estimated_time", wait_time)
                print(f"[HF API] Chat model {model} is loading. Waiting {est_time:.1f}s (attempt {attempt+1}/{retries})...", file=sys.stderr)
                time.sleep(max(5, min(est_time, 30)))
                continue
            else:
                print(f"[HF API Error] Status {status}: {err_body}", file=sys.stderr)
                raise RuntimeError(f"HF API returned status {status}: {err_body}")
        except Exception as e:
            print(f"[HF API Connection Error]: {e}", file=sys.stderr)
            raise
    raise RuntimeError("Chat model failed to load after multiple retries")

def main():
    parser = argparse.ArgumentParser(description="Query Hugging Face Serverless Inference API")
    parser.add_argument("--task", required=True, choices=["chat", "text-to-image", "text-to-speech", "image-classification"], help="AI task type")
    parser.add_argument("--model", help="Hugging Face model ID")
    parser.add_argument("--input", required=True, help="Input prompt text OR image file path for classification")
    parser.add_argument("--output", help="Output file path (required for image/audio)")
    
    args = parser.parse_args()
    
    token = load_env_token()
    if not token:
        print("[WARNING] HF_TOKEN was not found in environment or .env file. Queries may fail or be heavily rate-limited.", file=sys.stderr)
        
    # Default models
    defaults = {
        "chat": "Qwen/Qwen2.5-72B-Instruct",
        "text-to-image": "black-forest-labs/FLUX.1-schnell",
        "text-to-speech": "facebook/mms-tts-eng",
        "image-classification": "google/vit-base-patch16-224"
    }
    
    model = args.model if args.model else defaults[args.task]
    
    try:
        if args.task == "chat":
            messages = [{"role": "user", "content": args.input}]
            print(f"Querying chat model: {model}...")
            response_bytes = query_chat_api(model, messages, token)
            response_json = json.loads(response_bytes.decode("utf-8"))
            content = response_json["choices"][0]["message"]["content"]
            print(content)
            if args.output:
                with open(args.output, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"\nSaved chat response to {args.output}")
                
        elif args.task == "text-to-image":
            if not args.output:
                print("Error: --output file path is required for text-to-image task.", file=sys.stderr)
                sys.exit(1)
            print(f"Generating image using model: {model}...")
            payload = {"inputs": args.input}
            img_bytes = query_api(model, payload, token)
            os.makedirs(os.path.dirname(os.path.abspath(args.output)), exist_ok=True)
            with open(args.output, "wb") as f:
                f.write(img_bytes)
            print(f"Success! Image saved to {args.output}")
            
        elif args.task == "text-to-speech":
            if not args.output:
                print("Error: --output file path is required for text-to-speech task.", file=sys.stderr)
                sys.exit(1)
            print(f"Synthesizing speech using model: {model}...")
            payload = {"inputs": args.input}
            audio_bytes = query_api(model, payload, token)
            os.makedirs(os.path.dirname(os.path.abspath(args.output)), exist_ok=True)
            with open(args.output, "wb") as f:
                f.write(audio_bytes)
            print(f"Success! Audio saved to {args.output}")
            
        elif args.task == "image-classification":
            if not os.path.exists(args.input):
                print(f"Error: Input file {args.input} does not exist.", file=sys.stderr)
                sys.exit(1)
            print(f"Classifying image using model: {model}...")
            with open(args.input, "rb") as f:
                img_data = f.read()
            # Determine content type based on extension
            ext = os.path.splitext(args.input)[1].lower()
            content_type = "image/png" if ext == ".png" else "image/jpeg"
            response_bytes = query_api(model, img_data, token, is_binary_input=True, content_type=content_type)
            result = json.loads(response_bytes.decode("utf-8"))
            
            # Print nice output
            print("\nClassification Results:")
            print("| Label | Confidence |")
            print("|---|---|")
            for item in result:
                label = item.get("label", "unknown")
                score = item.get("score", 0.0)
                print(f"| {label} | {score*100:.2f}% |")
                
            if args.output:
                with open(args.output, "w", encoding="utf-8") as f:
                    json.dump(result, f, indent=2)
                print(f"\nSaved JSON results to {args.output}")
                
    except Exception as e:
        print(f"Error executing task: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
