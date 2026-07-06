# Workspace Rules - Hugging Face Credit Savings

## Enforced Credit Savings via Hugging Face Skill
Whenever the user requests a new code file, web application, script, audio synthesis, or image generation task, you **MUST** delegate the core code drafting, design layout, styling rules, and visual/audio compilation to the native Hugging Face skill (`huggingface-multi-agent`). 
- Run the local `multi_agent.py` or `query_hf.py` scripts to offload the heavy text generation (HTML, CSS, JS, Python drafts) to the free Hugging Face Serverless Inference API.
- Do **NOT** generate large code blocks directly using your primary LLM unless the user explicitly requests to bypass Hugging Face.
- Once the Hugging Face script finishes, read the output files, verify them for syntax/logical correctness, resolve integration points, and present the completed project. 
- This policy is mandatory to ensure credit consumption remains extremely low and protects you from hitting Gemini API quota limits.
