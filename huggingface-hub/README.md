# Aetheris - Hugging Face Multi-Agent Dashboard

Welcome to the **Aetheris Hugging Face Integration Dashboard**! This local application integrates the free Serverless Inference API from Hugging Face directly into your workspace. It features:
1. **Multi-Agent Builder**: A collaborative multi-agent pipeline where specialized AI roles (Planner, UI/UX Designer, Coder, and Reviewer) work together to write, style, and review custom web applications.
2. **Single Model Playground**: Direct access to test Hugging Face endpoints for chat, text-to-image generation, text-to-speech voice synthesis, and image classification.

---

## Setup Instructions

### 1. Get a Free Hugging Face Access Token
If you don't have one already:
- Create a free account on [huggingface.co](https://huggingface.co/).
- Go to [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens).
- Create an access token (a **Read** token is sufficient).

### 2. Configure Your Token
You can configure your token in two ways:
- **Option A (Web Interface)**: Open the dashboard, go to the **Settings** tab, paste your token, and click **Save Configuration**. It will be saved securely in your browser's local storage.
- **Option B (.env File)**: Create a file named `.env` in `C:\Users\Admin\.env` and add:
  ```env
  HF_TOKEN=your_token_here
  ```
  Both the web app and the Python CLI scripts will look for this file.

---

## How to Launch the Dashboard

You can open the dashboard directly in your browser or run it using Python's built-in HTTP server (highly recommended to prevent browser CORS block issues on file inputs):

### Run with Python (Recommended)
1. Open your terminal/PowerShell.
2. Run the following command:
   ```powershell
   python -m http.server -d "C:\Users\Admin\huggingface-hub" 8000
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

---

## Python CLI Scripts

We have also provided CLI tools in `C:\Users\Admin\.gemini\config\skills\huggingface\scripts\`.

### 1. Multi-Agent CLI Builder
Run the full 4-agent software pipeline from your terminal:
```powershell
python "C:\Users\Admin\.gemini\config\skills\huggingface\scripts\multi_agent.py" --prompt "A premium Pomodoro Timer" --output-dir "C:\Users\Admin\pomodoro-app"
```

### 2. Single Task CLI Utility
Execute individual tasks via CLI:
```powershell
# Text to Image
python "C:\Users\Admin\.gemini\config\skills\huggingface\scripts\query_hf.py" --task text-to-image --input "a glowing blue neon butterfly" --output "butterfly.png"

# Text to Speech
python "C:\Users\Admin\.gemini\config\skills\huggingface\scripts\query_hf.py" --task text-to-speech --input "Hello from the Antigravity integration" --output "voice.wav"
```
