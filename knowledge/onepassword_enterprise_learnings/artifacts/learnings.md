# 1Password® Enterprise AI Platform — Retrospective System Learnings

> 📍 **AUTHORITATIVE KNOWLEDGE ITEM**: `onepassword_enterprise_learnings`
> **Status**: STABLE

---

## 🛡️ Core Architectural Learnings & Enforcement Rules

1. **Independent Workspace Isolation Standard**:
   - Every new client project MUST be initialized in a dedicated standalone folder (`c:\Users\Admin\.antigravity-ide\OnePassword-Enterprise-AI\`).
   - Re-using existing client project folders (`ReservaHost-AI`, `RevenueCat-AI`) or mutating shared `src/App.jsx` across projects is strictly prohibited.

2. **120+ Exhaustive User Journey Scenarios Rule**:
   - Every project MUST map out at least 120 User Journey Scenarios (30 per component across 4 core components) covering Reporting, Analytics, Automations, Views, Modals, Drawers, and Connectors before code drafting.

3. **100% Zero-Mock Database Mode**:
   - Web applications MUST start with clean, empty states (`secretsList = []`, `logs = []`) by default.
   - Evaluators test real-time Web Crypto AES-256-GCM encryption and SHA-256 log chain creation without hardcoded placeholder emails or keys.

4. **Authenticated Gmail SMTP Dispatch Protocol**:
   - When a live email dispatch is requested, execute an authenticated Python SMTP script utilizing `smtp.gmail.com:587` with TLS and 16-character App Password to guarantee 100% actual delivery into the recipient's Inbox and Sentbox.

5. **Single Live Deployment Target (`<https://gatzdevs.surge.sh`>)**:
   - All production builds MUST deploy cleanly to `<https://gatzdevs.surge.sh`> with 0 `localhost` URLs in public proposals or communications.
