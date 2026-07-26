# OK Criteria Gate for 5-Hour Rapid Release (Strict Yes/No Gating Framework)

**Purpose:** Strict binary YES/NO gating framework for rapid 5-hour releases. Every item MUST be answered **YES** before proceeding to the next release step. If any item is **NO**, the release is placed on **HOLD** and the automated remediation/abort flow is executed immediately.

---

### 1. Prelaunch Required Gates (Complete Before T0)

| **Criterion** | **Owner** | **Evidence Required** | **If NO** |
|---|---:|---|---|
| **PM Approval on KPIs and Rollback Plan** | Product Manager | Signed approval note; KPI baseline doc | Hold release; PM must resolve |
| **CI Build Green** | Dev Lead | CI link showing all tests passed | Block deploy; fix CI failures |
| **SAST/DAST Quick Scan No Critical** | Security Lead | SAST/DAST summary; Trivy output | Block; triage critical immediately |
| **Secrets Scan Clean** | Security Lead | TruffleHog / secret-scan report | Block; rotate secrets and re-scan |
| **Observability Dashboards & Runbooks Present** | SRE | Dashboard links; runbook links | Hold; create runbooks before T0 |
| **Support Rota & Slack Channel Ready** | Ops/CS | Rota screenshot; channel link | Hold; assign staff before T0 |

*All items must be **YES** to start T0.*

---

### 2. Canary 1 Gate (After Deploy to 1–5% Traffic)

| **Criterion** | **Owner** | **Evidence Required** | **If NO** |
|---|---:|---|---|
| **Smoke Tests Pass** (capture ➔ lead ➔ CRM) | QA | Smoke test logs | Immediate abort; flip feature flag |
| **Error Rate Within Threshold** (≤ 2× baseline) | SRE | Grafana snapshot | Abort if sustained 5 min |
| **p95 Latency Within SLA** | SRE | Latency graph | Abort if > SLA for 15 min |
| **CRM Sync Success Rate Acceptable** (≥ 99%) | Data Eng | CRM webhook logs | Abort; investigate sync pipeline |
| **No Critical Security Alerts** | Security | DAST quick report; alert log | Abort; security triage |

*All items must be **YES** to expand to Canary 2.*

---

### 3. Canary 2 Gate (After 25% Traffic)

| **Criterion** | **Owner** | **Evidence Required** | **If NO** |
|---|---:|---|---|
| **Conversion & Activation Trending OK** (no >20% drop) | PM / Data Eng | Hourly KPI snapshot | Hold; extend canary or rollback |
| **Background Jobs & Queues Stable** | SRE | Queue length and worker metrics | Abort if backlog grows > threshold |
| **Telemetry Ingestion Lag < 60s** | Data Eng | Event pipeline logs | Hold; fix ingestion before full rollout |
| **No New High Severity Vulnerabilities** | Security | Latest scan + red team notes | Abort; fix or risk-accept with exec sign-off |
| **HITL Gating Functioning** (gated actions blocked) | Product / Ops | HITL logs showing blocked actions | Abort; fix gating logic |

*All items must be **YES** to proceed to full rollout decision.*

---

### 4. Full Rollout Decision Gate

| **Criterion** | **Owner** | **Evidence Required** | **If NO** |
|---|---:|---|---|
| **Cross-Team Decision Meeting Approves** | Release Manager | Meeting note with signatures | Delay rollout; follow remediation plan |
| **Kill Switch Verified** | SRE | Kill switch test log | Do not roll out until fixed |
| **Support Readiness Confirmed** | Ops/CS | Support queue and SLA doc | Delay until coverage ensured |
| **Risk Acceptance Documented for Residual Issues** | PM + Security | Signed risk acceptance entries | Must be YES or abort |

*All items must be **YES** to ramp to 100%.*

---

### 5. Post Launch 5-Hour Monitoring Gate (Continuous Checks)
*These checks are polled continuously; any NO triggers immediate rollback within 10 minutes:*
- **Automated Smoke Tests** every 15 minutes all green (Owner: QA).  
- **Error Rate** remains ≤ 2× baseline (Owner: SRE).  
- **p95 Latency** within SLA (Owner: SRE).  
- **CRM Sync Success** ≥ 99% (Owner: Data Eng).  
- **No Critical Security Alerts** (Owner: Security).  
- **Support First Response SLA Met** (15 min for critical tickets) (Owner: Ops/CS).

---

### 6. Enforcement & Automation Rules
- **Binary Answers Only**: YES / NO. Zero partial passes.  
- **Automated Gating**: CI/CD and monitoring tools auto-evaluate numeric gates (tests, latency, error rates, sync rates), auto-setting YES/NO status and attaching evidence links.  
- **Manual Sign-Offs**: PM, Security, and Release Manager provide explicit YES via timestamped Slack reaction or ticket comment.  
- **Abort Automation**: If any gate flips to NO, automated workflow posts Abort Alert, flips feature flag OFF, and triggers rollback playbook. SRE must confirm rollback within 10 minutes.  
- **Risk Acceptance Protocol**: Only allowed for LOW severity items; must be signed by PM + Security + Exec and recorded in risk tracker. Risk acceptance NEVER bypasses critical safety/security gates.

---

### 7. Ticketing Template (Copy-Paste)
Columns: `Gate, Criterion, Owner, Due, Answer (YES/NO), Evidence Link, Notes`

*Example Row:*
```
Prelaunch, CI build green, @dev_lead, 2026-07-25T09:00Z, YES, https://ci.example/build/123, All tests passed
```

---

### 8. Quick Decision Flow Summary
1. **Prelaunch**: All prelaunch gates YES ➔ T0 start.  
2. **Canary 1**: All Canary 1 gates YES ➔ Expand to Canary 2.  
3. **Canary 2**: All Canary 2 gates YES ➔ Decision meeting.  
4. **Full Rollout**: Decision YES + Kill switch verified ➔ Ramp to 100%.  
5. **Post Launch**: Continuous YES checks for 5 hours; any NO ➔ Immediate 10-minute rollback.
