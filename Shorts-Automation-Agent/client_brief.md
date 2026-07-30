# Client Research Brief & Functional System Specification

**Project**: Antigravity Autonomous Short-Form Video Automation Platform
**Target Niche**: Daily Filipino Tech Shorts, Trending News & Educational Tech Tips
**Platforms**: YouTube Shorts, TikTok, Facebook Reels
**Status**: Stage 1 Complete (360° Client Research & Feasibility Gate)

---

## 1. Executive Summary & Core Objectives

The client requires an end-to-end autonomous agent system capable of:
1. **Discovering Trending Topics**: Scanning Google Trends, RSS feeds, platform trending charts, and tech news every 30 minutes.
2. **Topic Safety & Scoring**: Filtering topics using a multi-factor score (Novelty, Relevance, Safety $\ge 0.7$).
3. **Parametric Video Rendering**: Drafting scripts, captions, thumbnail ideas, and rendering copyright-safe short-form video variants using parameterized templates and approved asset DB items.
4. **Dual Copyright Fingerprinting**: Performing automated audio and visual fingerprinting against known copyrighted media to block any content with $>30\%$ similarity and flag $10-30\%$ similarity items for human review.
5. **Human-in-the-Loop Auto-Approval**: Auto-approving posts when predicted engagement $\ge 0.8$, copyright similarity $<10\%$, and toxicity $<0.05$. Borderline posts route to a prioritized micro-review queue.
6. **Smart Human-like Cadence Posting**: Rate-limited posting ($\le 3$ posts/day, $\le 10$ posts/week per account) with randomized interval windows (2–6 hours).
7. **48-Hour Post-Publication Monitoring & Auto-Rollback**: Continuous monitoring for takedown notices or negative signals; automatic unpublishing upon adverse detection.
8. **Cost Optimization**: Model cascading (cheap models for drafts/A-B variants, premium models for final top candidate renders), output caching, and cost-per-revenue throttling ($\le 70\%$).

---

## 2. 360° Market, Technical & Compliance Research

### A. Platform API & Compliance Constraints

- **YouTube Shorts Data API v3**:
  - Daily quota: 10,000 units default. Direct video upload costs 1,600 units.
  - Constraint: Strict rate-limit handling and randomized posting window to avoid spam classifier triggers.
- **TikTok Content Posting API**:
  - Requires Creator account OAuth2 permissions.
  - Video spec: Vertical 9:16, 1080x1920, H.264 MP4, 30/60 fps, duration 15s–60s.
- **Facebook Reels Graph API**:
  - Requires Page Access Token with `pages_manage_posts` and `instagram_content_publish`.
  - Content must adhere to Meta Monetization Standards and Partner Policy.

### B. Copyright & Licensing Safeguards

- **Zero Unlicensed Assets**: Only assets with verified metadata (Source, License Type, Expiry, Exclusivity, Proof of Purchase) in the **Approved Asset DB** are accessible to rendering templates.
- **Dual Fingerprinting Architecture**:
  - Visual: Perceptual Hashing (pHash) + Frame Feature Embeddings.
  - Audio: Chromagram / Acoustic Fingerprint Spectrogram matching.

### C. Cost Ceiling & Token Budgeting

- **Drafting Stage**: Hugging Face free inference / lightweight LLMs for script & metadata variants.
- **Render Stage**: Local FFmpeg parametric rendering pipelines using zero-cost GPU hardware / open-source codecs.
- **Model Cascading**: Top 20% candidates move to high-tier rendering; cost-per-video tracked in real-time.

---

## 3. Feasibility Matrix & Risk Assessment

| Feature Module | Feasibility | Risk Level | Mitigation Strategy |
| --- | --- | --- | --- |
| Trend Signal Aggregator | 100% High | Low | RSS + Google Trends API fallback mock mode |
| Copyright Fingerprinting | 95% High | Medium | FFmpeg + pHash + Chromagram audio matcher |
| Video Template Renderer | 100% High | Low | Node.js / Python Canvas + FFmpeg parametric engine |
| Multi-Platform Posting | 90% High | Medium | Official API integration + Human micro-approval queue |
| 48h Post Watchdog | 95% High | Low | Background Cron task auditing video status & metrics |

---

## 4. Stage 1 Sign-Off Criteria

- [x] Full Client Brief & 360° Technical Research documented.
- [x] Operational parameters & safety thresholds mapped to system architecture.
- [x] Client Profile JSON persisted to `client_profile.json`.
