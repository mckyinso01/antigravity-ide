# Session: Google OAuth & Gmail Live Integration

Date: 2026-07-17

## Overview

Automated Google Cloud Console credentials generation, enabled the Gmail API, configured project test users, and implemented a server-side interceptor middleware that enables seamless live email campaigns via `gatzaitools@gmail.com` using the background refresh token, bypassing localhost redirect limitations.

## Decisions

- **Direct Google API Call Interceptor**: Created middleware in `server.ts` that intercepts requests carrying mock tokens and automatically refreshes and injects the live Google token if `GOOGLE_REFRESH_TOKEN` is found in `.env`.
- **Port 3005 Callback**: Selected `<http://localhost:3005/oauth-callback`> for temporary token retrieval to avoid conflict with Vite on port 3000.

## Files Changed

- `Lead-gen/src/App.tsx` — Replaced Firebase auth redirection with direct OAuth 2.0 flow and added header toggle.
- `Lead-gen/server.ts` — Added live token fallback in request interceptor middleware.
- `Lead-gen/scripts/authenticate_gmail.cjs` — CommonJS authenticator for offline background refresh token.
- `Lead-gen/.env` — Appended OAuth client keys and refresh token.

## Next Steps

1. Create a live test campaign targeting 5-10 dentist leads in Metro Manila.
2. Select them in the table, click AI Enrich & Qualify, and verify contact email generation.
3. Click Bulk Send Outreach to confirm dispatch to real inboxes.
