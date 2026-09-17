# Base44 Dev Environment — OmniStock

## What this is
The OmniStock POS app was cloned from `github.com/mckyinso01/omnistock` into `omnistock-app/`.
The original repo (`antigravity-ide`) is a monorepo of standalone Node apps; OmniStock is the app we run.

## Stack
- Vite 6 + React 18 + TailwindCSS
- Base44 SDK (`@base44/sdk`, `@base44/vite-plugin`) — proxy to Base44 backend
- Dexie.js (IndexedDB) for offline-first local data
- Mock session-based auth (sessionStorage, no real Base44 auth needed to view UI)

## Running
```
docker compose -f docker-compose.base44.yml up -d
```
- Vite dev server on port 5173, mapped to host port 3000
- Source bind-mounted from `omnistock-app/`
- `npm install` runs at container startup
- Live reload enabled (Vite HMR)

## Environment variables
- `VITE_BASE44_APP_ID` — Base44 app ID (placeholder in `.env.base44-defaults`)
- `VITE_BASE44_APP_BASE_URL` — Base44 backend URL (must be valid URL format; placeholder in `.env.base44-defaults`)
- Both need real values from the Base44 Builder dashboard for API calls to work.
- The Vite proxy crashes if `VITE_BASE44_APP_BASE_URL` is not a valid URL — do NOT put a random string there.
- Generated development secrets for these were NOT used because random strings break the Vite proxy. Only `.env.base44-defaults` is in env_file.

## Maestro Production Engine & Devil's Team Audit Gate
- Production lifecycle config: `.agents/production-lifecycle.json` & `omnistock-app/src/agents/production-lifecycle.json`
- Skills catalog: `.agents/skills-catalog.json` (25 skills categorized across 5 production phases)
- Devil's Team 5-Titan audit modules: `.agents/audits/` & `omnistock-app/src/agents/audits/` (Mitnick, Geohot, Kamkar, Miller, Jack)
- Compounding pattern library: `.agents/patterns/patterns.json` & `omnistock-app/src/agents/patterns/`
- Command Center route: `/production-engine` (accessible from Sidebar under 'Studio Engine' and TopBar Gate status pill)
- Gate policy: Strict pre-deployment gate blocks deployment if any open critical vulnerabilities exist; supports signed admin override.
- Enterprise Connectors: Jira (`WeeklyPulse Jira`), Slack (`SocialShare Slack`), Notion (`Social_Share Notion`), Intercom (`WeeklyPulse Intercom`) wired into pipeline phases for automated ticket creation, telemetry broadcasts, and pattern exports.
- Dual-Mode OAuth: BYO_SHARED (workspace-level shared credentials for automated pipeline dispatches) + APP_USER multi-OAuth (per-user personal account linking via `base44.connectors.connectAppUser` / `disconnectAppUser`). Falls back to localStorage mock when SDK credentials are placeholders.
- Enterprise Role Scenarios: 6 personas (Owner, Team Manager, Cashier, Inventory Specialist, Cost Analyst, Marketing Strategist) with full operational day-in-the-life simulations, feature blueprints (including Owner Costs, Income & Tax Accrual command center), and 5-Titan threat defense matrix.

## Notes
- App renders and is navigable with placeholder env vars (UI uses Dexie.js + mock auth).
- Base44 SDK API calls will fail until real credentials are provided.
- Login page accepts any email — mock auth via sessionStorage.
