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

## Notes
- App renders and is navigable with placeholder env vars (UI uses Dexie.js + mock auth).
- Base44 SDK API calls will fail until real credentials are provided.
- Login page accepts any email — mock auth via sessionStorage.
