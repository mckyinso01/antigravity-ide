# Authoritative Project Learnings, User Findings & Preventative Directives

> 📍 **OKF V0.2 KNOWLEDGE BASE ITEM**: `revenuecat_and_software_factory_learnings`
> **Persisted Date**: `2026-07-27T04:26:00.462314+00:00`
> **Status**: `Permanent Knowledge Base Artifact & Core Brain Rule`

---

## 🔍 USER FINDINGS & CORRECTIONS SUMMARY

1. **Zero-Mock Data Standard**: Purged sample mock data across all components. Enforced 1-click `🔌 Real Live DB Ingest Mode (0 Mock Data)` ready to ingest real production webhooks, StoreKit 2 receipts, and database connection URIs.
2. **Clickable Hard-Copy Evidence Proofs**: Built `<TransactionEvidenceModal />` so clicking ANY transaction line pops up the exact cryptographic JWS receipt proof certificate with downloadable `.txt` legal proofs.
3. **Live Real SMTP Dispatch & IMAP SSL Audit**: Enforced 100% real SMTP TLS email dispatches (`send_real_email.py`) verified by IMAP SSL bounce auditing (`audit_revenuecat_bounce_status.py`) with 0 bounces.
4. **Direct Module Hash Deep-Linking**: Integrated dynamic Hash Deep-Linking in `src/App.jsx` (`/#/receipts`, `/#/webhooks`, `/#/mrr`, `/#/entitlements`, `/#/docs`, `/#/settings`) for 1-click navigation without landing page scrolling.
5. **Automated Error Telemetry Sentinel**: Built `<TelemetryErrorLogger />` to harvest uncaught browser exceptions and auto-dispatch diagnostic alerts to `mckinsyo01@gmail.com`.

---

## 🛡️ THE 5 PREVENTATIVE DIRECTIVES (MANDATORY WORKSPACE CORE RULES)

1. **Directive 1 (Zero-Mock Default)**: Default all new web applications to Clean Zero-Mock Database Ingest Mode from Minute 1.
2. **Directive 2 (Clickable Evidence Files)**: Make every transaction or log row 100% interactive & clickable to open printable statements or downloadable proof certificates.
3. **Directive 3 (Pre-Dispatch Gate)**: Never fire external network emails without displaying the full pitch draft in chat and getting explicit user confirmation (`"isend na!"`).
4. **Directive 4 (Hash Deep-Linking)**: Support Hash Deep-Linking (`/#/view_name`) in `App.jsx` from Minute 1 for 1-click proposal deep-links.
5. **Directive 5 (Telemetry Error Logger)**: Mount `<TelemetryErrorLogger />` at the root layout from Minute 1 to auto-alert `mckinsyo01@gmail.com` on runtime errors.
