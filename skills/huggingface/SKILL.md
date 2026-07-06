---
name: huggingface-multi-agent
description: >-
  Uses free Hugging Face Serverless Inference API models to generate code, text,
  images, speech, or perform analysis in order to offload heavy tasks and save AI credits.
---

# Hugging Face Multi-Agent Orchestration Skill

> [!IMPORTANT]
> **MANDATORY CREDIT-SAVING DELEGATION POLICY**:
> Whenever the user requests a new code file, script, layout, voice synthesis, or asset generation task, you **MUST** delegate the core creation, drafting, and styling to the Hugging Face skill (`huggingface-multi-agent`) using the local helper scripts (`multi_agent.py` or `query_hf.py`). 
> Offload all heavy token generation (HTML, CSS, JS, Python drafts) to the free Hugging Face API first, rather than writing it yourself. After the scripts run, inspect the output in the workspace, resolve any integrations, and finalize the code. This is mandatory to prevent depletion of the user's Antigravity credits and avoid hitting API quota limits.

## Safe Credentials Verification

Before executing any Hugging Face models, you MUST verify that the `HF_TOKEN` is present in the environmental variable or the `.env` file at `C:\Users\Admin\.env`.
Check for the token in the script execution or check with the user. Do not read the token value into your chat context.

## How to Run Tasks

You can run the multi-agent pipeline using the Python script `multi_agent.py` located at `C:\Users\Admin\.gemini\config\skills\huggingface\scripts\multi_agent.py`.

### 1. Multi-Agent Code & Application Generation
When the user asks to build an application, script, or layout, run the multi-agent orchestration script to generate the design, code, and documentation. This runs a collaborative chain of specialized agents (Planner, UI/UX Designer, Coder, Reviewer) using free Hugging Face models.

**Command Syntax**:
```powershell
python "C:\Users\Admin\.gemini\config\skills\huggingface\scripts\multi_agent.py" --prompt "Description of the app you want to build" --output-dir "C:\Users\Admin\desired-output-folder"
```

Once the command finishes, it will create the following files in the target directory:
- `plan.md`: The architectural plan.
- `index.html`, `styles.css`, `app.js`: The code files (if it's a web app).
- `main.py` or script files (if it's a CLI/backend app).
- `review.md`: The reviewer's feedback and recommendations.

You should then inspect the files, write any final integrations, and present the completed project to the user.

### 2. Single Model Generation
For quick text, image, or audio generation, run the `query_hf.py` script:
```powershell
python "C:\Users\Admin\.gemini\config\skills\huggingface\scripts\query_hf.py" --task <task> --input "prompt or input content" --output "output_file_path"
```
Tasks supported:
- `text-to-image`: Saves a generated image (default model: `black-forest-labs/FLUX.1-schnell`).
- `text-to-speech`: Saves generated speech as a WAV file (default model: `facebook/mms-tts-eng`).
- `image-classification`: Classifies an image file (default model: `google/vit-base-patch16-224`).
- `chat`: Direct query to LLMs (default model: `Qwen/Qwen2.5-72B-Instruct`).

### 3. Always-On Background Watcher Service
An always-on file watcher is running on the Antigravity platform that monitors `C:\Users\Admin\agent-tasks`.
- To trigger a new multi-agent build, create a `.txt` file (e.g. `pomodoro-timer.txt`) in that folder containing the description of the app you want to build.
- The watcher service will automatically detect it, rename it to `.processing`, run the multi-agent pipeline (`multi_agent.py`), save the completed project in a folder named after the text file (e.g. `C:\Users\Admin\agent-tasks\pomodoro-timer`), and rename the file to `.processed` when finished.
- If a task fails, the file will be renamed to `.failed` and detailed tracebacks will be written to `<task-name>_error.txt`.
