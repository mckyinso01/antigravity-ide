import os
import sys
import time
import subprocess
import traceback

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

def main():
    watch_dir = "C:\\Users\\Admin\\agent-tasks"
    os.makedirs(watch_dir, exist_ok=True)
    
    print(f"[*] Hugging Face Task Watcher active.")
    print(f"[*] Monitoring folder: {watch_dir}")
    print(f"[*] To run a task, create a '.txt' file inside this folder.")
    print(f"[*] Exit with Ctrl+C\n")
    
    scripts_dir = os.path.dirname(os.path.abspath(__file__))
    multi_agent_script = os.path.join(scripts_dir, "multi_agent.py")
    
    token = load_env_token()
    if not token:
        print("[!] Warning: HF_TOKEN is not defined in environment or C:\\Users\\Admin\\.env. Serverless calls may fail.", flush=True)

    while True:
        try:
            files = os.listdir(watch_dir)
            for file in files:
                file_path = os.path.join(watch_dir, file)
                
                # Check for standard text files that aren't marked processing/processed/failed
                if (os.path.isfile(file_path) and 
                    file.endswith(".txt") and 
                    not file.endswith(".processed") and 
                    not file.endswith(".processing") and 
                    not file.endswith(".failed") and 
                    not file.endswith("_error.txt")):
                    
                    base_name = os.path.splitext(file)[0]
                    processing_path = os.path.join(watch_dir, f"{base_name}.processing")
                    processed_path = os.path.join(watch_dir, f"{base_name}.processed")
                    failed_path = os.path.join(watch_dir, f"{base_name}.failed")
                    error_log_path = os.path.join(watch_dir, f"{base_name}_error.txt")
                    output_dir = os.path.join(watch_dir, base_name)
                    
                    print(f"\n[+] Found new task: {file}")
                    
                    # Rename to processing state to prevent double-processing
                    try:
                        os.rename(file_path, processing_path)
                    except Exception as e:
                        print(f"[!] Error marking task as processing: {e}")
                        continue
                        
                    # Read prompt
                    try:
                        with open(processing_path, "r", encoding="utf-8") as f:
                            prompt = f.read().strip()
                    except Exception as e:
                        print(f"[!] Error reading file: {e}")
                        os.rename(processing_path, failed_path)
                        continue
                        
                    if not prompt:
                        print("[!] Task file is empty. Skipping.")
                        os.rename(processing_path, failed_path)
                        continue
                        
                    print(f"[*] Processing prompt: \"{prompt[:60]}...\"")
                    print(f"[*] Target output directory: {output_dir}")
                    
                    # Launch multi_agent.py as subprocess
                    cmd = [
                        sys.executable,
                        multi_agent_script,
                        "--prompt", prompt,
                        "--output-dir", output_dir
                    ]
                    
                    try:
                        # Forward output to console
                        result = subprocess.run(cmd, check=True, capture_output=True, text=True)
                        print(result.stdout)
                        
                        # Process success
                        os.rename(processing_path, processed_path)
                        print(f"[+] Task completed successfully! Output saved in: {output_dir}")
                    except subprocess.CalledProcessError as e:
                        print(f"[!] Subprocess failed with exit code {e.returncode}")
                        print(e.stderr)
                        
                        # Log error details
                        with open(error_log_path, "w", encoding="utf-8") as err_file:
                            err_file.write(f"Subprocess exit code: {e.returncode}\n")
                            err_file.write(f"STDOUT:\n{e.stdout}\n")
                            err_file.write(f"STDERR:\n{e.stderr}\n")
                            
                        # Rename to failed state
                        os.rename(processing_path, failed_path)
                        print(f"[!] Task failed. Error log written to {error_log_path}")
                    except Exception as e:
                        tb = traceback.format_exc()
                        print(f"[!] Unexpected error during pipeline: {e}")
                        
                        with open(error_log_path, "w", encoding="utf-8") as err_file:
                            err_file.write(f"Exception: {e}\nTraceback:\n{tb}\n")
                            
                        os.rename(processing_path, failed_path)
                        print(f"[!] Task failed. Error log written to {error_log_path}")
                        
        except Exception as e:
            print(f"[!] Exception in watcher loop: {e}", file=sys.stderr)
            
        time.sleep(3)

if __name__ == "__main__":
    main()
