# Launch Readiness Checklist for 5-Hour Rapid Release (Hard Gate Protocol)

Use as a hard gate before public deployment. Everything marked **Required** must be green before the 5-hour window starts. Each item specifies **Owner**, **Pass Criteria**, and **Evidence**.

---

### 1. Prelaunch Required Gates (Complete Before T0)

- **PM Sign-Off** — **Owner:** Product Manager. **Pass:** KPIs and rollback decision documented; pilot highlights attached. **Evidence:** PM approval note; pilot summary. **Required**
- **Security Quick-Scan Sign-Off** — **Owner:** Security Lead. **Pass:** No critical vulns in last SAST/DAST run; secrets scan clean. **Evidence:** SAST/DAST summary; Trivy/TruffleHog output. **Required**
- **CI Green** — **Owner:** Dev Lead. **Pass:** All unit, integration, and E2E smoke tests passed in latest build. **Evidence:** CI build link. **Required**
- **Canary Deployment Plan** — **Owner:** Release Manager. **Pass:** Canary percentages, abort thresholds, and rollback steps documented. **Evidence:** Rollout playbook. **Required**
- **Observability Ready** — **Owner:** SRE. **Pass:** Dashboards for errors, latency, conversion; alerts and runbooks linked. **Evidence:** Dashboard links; runbook doc. **Required**
- **Support and Escalation** — **Owner:** Ops/CS. **Pass:** Support rota for 5 hours; dedicated Slack channel and escalation path. **Evidence:** Rota + Slack channel. **Required**

---

### 2. T0 to T+30 Minutes Preflight Checks

- **Deploy to Canary 1 (1–5% Traffic)** — **Owner:** SRE. **Action:** Deploy, enable feature flag for internal users first. **Monitor:** p95 latency, error rate, lead capture success, CRM sync. **Abort if:** Error rate > 2× baseline or p95 > SLA. **Evidence:** Deployment log; Grafana snapshot.
- **Automated Smoke Tests** — **Owner:** QA. **Action:** Run scripted smoke flows: capture ➔ lead created ➔ CRM mapping ➔ inbox. **Pass:** All flows succeed. **Evidence:** Smoke test run output.
- **Security Quick DAST Authenticated Scan** — **Owner:** Security. **Action:** Run fast authenticated scan on critical endpoints. **Pass:** No critical findings. **Evidence:** DAST quick report.

---

### 3. T+30 to T+90 Minutes Canary Expansion & Validation

- **Expand Canary to 25% Traffic** — **Owner:** Release Manager. **Action:** Increase traffic if Canary 1 green. **Monitor:** Same metrics plus conversion and SLA for routing. **Abort if:** Sustained KPI regressions or CRM sync failures. **Evidence:** Monitoring snapshots.
- **Performance Smoke** — **Owner:** Perf Eng. **Action:** Run short k6 script for p95/p99 checks under current load. **Pass:** p95 within SLA; error rate < 1%. **Evidence:** k6 report.
- **Data and Analytics Check** — **Owner:** Data Eng. **Action:** Verify event ingestion for capture events and `lead.created` webhook. **Pass:** Events appear in pipeline within 1 minute. **Evidence:** Event logs.

---

### 4. T+90 to T+180 Minutes Full Rollout Decision & Execution

- **Decision Checkpoint** — **Owner:** Release Manager + PM + SRE + Security. **Action:** 15-minute sync to review canary metrics and decide full rollout. **Pass:** All gates green. **Evidence:** Meeting note.
- **Full Rollout to 100%** (or staged ramp to 100% over 30 minutes) — **Owner:** SRE. **Action:** Ramp per plan; keep feature flag kill switch ready. **Monitor:** Continuous. **Abort if:** Any critical threshold breached. **Evidence:** Deployment logs.
- **Support Readiness** — **Owner:** Ops/CS. **Action:** Triage queue open; first response SLA 15 minutes for critical tickets. **Evidence:** Support queue snapshot.

---

### 5. Post-Launch First 5 Hours Monitoring & Actions

- **Automated Smoke Tests Cadence** — **Owner:** QA. **Action:** Run smoke tests every 15 minutes for first 2 hours, then every 30 minutes until hour 5. **Evidence:** Test logs.
- **KPI Checks Cadence** — **Owner:** PM/Data Eng. **Action:** Hourly snapshots of Activation, Capture Success Rate, Time to First Contact. **Pass Thresholds:** Activation trending toward target; Capture Success ≥ 98%; Time to First Contact ≤ 2 hours for MQLs. **Evidence:** Dashboard snapshots.
- **Incident Response** — **Owner:** On-Call SRE. **Action:** Any alert triggers runbook; critical incidents escalate to Release Manager immediately. **Evidence:** Incident ticket link.
- **Rollback Criteria** — **Owner:** Release Manager. **Action:** If abort thresholds hit, flip feature flag and execute rollback playbook within 10 minutes. **Evidence:** Rollback execution log.

---

### 6. Quick Abort and Rollback Triggers

- Critical security finding discovered post-deploy.
- Error rate > 3× baseline sustained for 10 minutes.
- p95 latency > SLA for 15 minutes and impacting conversions.
- CRM sync failures causing lost leads or duplicates.
*If any trigger occurs, immediately execute rollback and notify stakeholders.*

---

### 7. Minimal Evidence Keys to Attach per Gate

- **Attach these links for each gate:** CI build, SAST/DAST summary, k6 report, Grafana dashboard snapshot, smoke test run, deployment log, support channel link.
- **Annotate designs with these data keys for Antigravity:** `lead.id`, `lead.email`, `lead.score`, `campaign.id`, `crm.sync_status`, `consent.timestamp`.

---

### 8. One-Line Operational Summary

**Only release if all Required gates are green, canary checks pass, and the team commits to 5-hour intensive monitoring with a ready rollback within 10 minutes.**
