# Stage 4: Tools & Technical Stack Matrix Specification

**Project**: Antigravity Autonomous Short-Form Video Automation Platform
**Design System**: V2 Neo-Futuristic Cyber-Glass Deck
**Budget Constraint**: 100% Zero Budget / $0.00 Operational Cost
**Status**: Stage 4 Complete (Complete Package & Architecture Dependency Mapping)

---

## 1. Complete Technical Stack Matrix

| Category | Component / Module | Selected Technology / Library | Version / Spec | Zero-Cost ($0.00) Mechanism |
| --- | --- | --- | --- | --- |
| **Frontend Framework** | Studio UI Dashboard | React 18 + Vite + TypeScript | `react@^18.3.1` | Open-source client app running in browser |
| **Styling & Theme** | Cyber-Glass Aesthetic | Tailwind CSS + Lucide Icons + Framer Motion | `tailwindcss@^3.4` | Built-in CSS backdrop-blur & glowing utility classes |
| **Scripting & Metadata** | Free LLM Generator | Hugging Face Serverless API (`Qwen 2.5 32B`) | `huggingface_hub` | Free inference endpoints via public model access |
| **Voiceover Engine** | Neural Speech Synthesis | Python `edge-tts` | `edge-tts@^6.1.9` | Free Microsoft Edge Neural TTS (Tagalog & English) |
| **Stock Assets Fetcher** | Visual & B-roll Downloader | Pexels API + Pixabay API Wrapper | REST API v1 | Free developer API keys with CC0 metadata |
| **Procedural Video Render** | Canvas & Video Overlay | Node.js `@napi-rs/canvas` + `fluent-ffmpeg` | `ffmpeg-static` | Local CPU/GPU parametric rendering |
| **Audio Processing** | Waveform & Subtitles | Python `pydub` + `srt` subtitle parser | `pydub@^0.25.1` | Local audio slicing, normalization & WebVTT timing |
| **Dual Fingerprinter** | Copyright & Similarity Scan | Python `imagehash` + `librosa` | `imagehash@^4.3.1` | Local pHash visual frame + chromagram audio scan |
| **Audit & Database** | Provenance WORM Ledger | SQLite 3 (`better-sqlite3`) | `better-sqlite3@^9.4` | Local zero-cost embedded database with SHA-256 |
| **API Dispatcher** | Multi-Platform Uploader | `googleapis` (YT Shorts) + Axios (TikTok/Meta) | REST APIs | Official developer API accounts within free tier |
| **Watchdog Cron** | 48h Health Polling | Node.js `node-cron` / Python `schedule` | `node-cron@^3.0` | Local background process polling monetization status |
| **Deployment Host** | Public Web Showcase | Surge CLI | `surge@^0.24` | 100% Free static hosting at `<https://gatzdevs.surge.sh`> |

---

## 2. Environment Configuration & API Keys Schema (`.env.example`)

```env

# ================================================================

# ANTIGRAVITY AUTONOMOUS CONTENT ENGINE CONFIGURATION

# 100% Zero-Budget Setup - All keys use FREE Developer Tier

# ================================================================

# System Mode

NODE_ENV=development
APP_PORT=3000
SURGE_DOMAIN=https://gatzdevs.surge.sh

# Free Script LLM API (Hugging Face)

HF_API_TOKEN=hf_free_tier_token_sample
HF_MODEL_ID=Qwen/Qwen2.5-Coder-32B-Instruct

# Free B-Roll Stock Media APIs

PEXELS_API_KEY=free_pexels_api_key_sample
PIXABAY_API_KEY=free_pixabay_api_key_sample

# Microsoft Edge Free Neural Voice Config

EDGE_TTS_VOICE_FILIPINO=fil-PH-BlessicaNeural
EDGE_TTS_VOICE_ENGLISH=en-US-AndrewNeural

# Multi-Platform API Keys (Free Tier Developer Credentials)

YOUTUBE_CLIENT_ID=sample_google_client_id.apps.googleusercontent.com
YOUTUBE_CLIENT_SECRET=sample_google_client_secret
YOUTUBE_REFRESH_TOKEN=sample_youtube_refresh_token

TIKTOK_CLIENT_KEY=sample_tiktok_client_key
TIKTOK_CLIENT_SECRET=sample_tiktok_client_secret

META_PAGE_ACCESS_TOKEN=sample_meta_page_access_token
META_REELS_PAGE_ID=sample_facebook_page_id

# Fingerprint & Security Compliance Limits

COPYRIGHT_SIMILARITY_MAX_AUTO_APPROVE=0.05
COPYRIGHT_SIMILARITY_MAX_HUMAN_REVIEW=0.20
MIN_PREDICTED_ENGAGEMENT_SCORE=0.80
MAX_POSTS_PER_DAY=3
MAX_POSTS_PER_WEEK=10
```

---

## 3. Package Dependency Tree & Build Manifest (`package.json`)

```json
{
  "name": "short-form-automation-agent",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "render:test": "node scripts/render_pipeline.js",
    "fingerprint:scan": "python scripts/fingerprint_scanner.py",
    "watchdog:run": "node scripts/watchdog_cron.js"
  },
  "dependencies": {
    "@napi-rs/canvas": "^0.1.52",
    "axios": "^1.6.8",
    "better-sqlite3": "^9.4.3",
    "clsx": "^2.1.0",
    "fluent-ffmpeg": "^2.1.2",
    "framer-motion": "^11.0.8",
    "googleapis": "^134.0.0",
    "lucide-react": "^0.354.0",
    "node-cron": "^3.0.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwind-merge": "^2.2.1"
  },
  "devDependencies": {
    "@types/node": "^20.11.24",
    "@types/react": "^18.2.61",
    "@types/react-dom": "^18.2.19",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.18",
    "ffmpeg-static": "^5.2.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3",
    "vite": "^5.1.4"
  }
}
```

---

## 4. Stage 4 Sign-Off Criteria

- [x] Complete technical stack matrix defined with zero-budget ($0.00) guarantees for all tools.
- [x] Environmental configuration schema (`.env.example`) documented.
- [x] Full `package.json` build manifest and script entry points specified.
