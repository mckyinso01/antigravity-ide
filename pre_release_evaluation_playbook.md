# Complete, Actionable Pre-Release Evaluation & Audit Playbook (Production-Ready Release Gates)

Below is the consolidated, operational pre-release evaluation and audit playbook used to ensure an app is 100% production-ready before public deployment.

---

### 1. Release Gates (Must-Pass)

**Required before public release:**
- **PM Sign-Off**: Product metrics and launch KPIs (activation, 7-day retention, time-to-first-value).
- **Security Sign-Off**: Zero critical/high vulnerabilities outstanding from pen test.
- **Performance Sign-Off**: SLOs met under canary traffic and 2× expected peak load.
- **Compliance Sign-Off**: Legal/privacy checklist completed (GDPR/PDPA/CCPA).
- **Observability & Runbooks**: Real-time alerts, dashboards, and incident runbooks in place.
- **Beta Validation**: Pilot cohort metrics meet target thresholds (Section 3).
**Owner:** Release Manager (coordinates sign-offs).

---

### 2. Automated CI/CD Checks (Pre-Merge / Pre-Release)

**Run on every PR and release build**
- **Static Analysis (SAST)**: Run tools (e.g., SonarQube, Semgrep).
  - **What to run:** Full SAST scan.
  - **Pass:** Zero new critical/major issues; medium issues triaged.
  - **Owner:** Dev team.
- **Dependency Scanning**: (e.g., Dependabot, Snyk).
  - **Pass:** Zero critical CVEs in production dependencies; plan for high/medium.
- **Unit Tests & Coverage**: Run test suite; enforce minimum coverage threshold (70–85%).
  - **Pass:** All tests green; coverage not decreased.
- **Integration Tests**: Contract tests for external services (mocked).
  - **Pass:** All integration tests green.
- **End-to-End Smoke Tests**: Run headless browser smoke flows (login, core task).
  - **Pass:** Smoke flows succeed within time budget.
- **Infrastructure as Code (IaC) Checks**: Terraform plan, policy as code (OPA).
  - **Pass:** Zero policy violations; plan reviewed.
**Owner:** CI/CD Engineer / Dev.

---

### 3. Beta / Pilot Validation (Real Users)

**Purpose:** Validate real usage, integrations, and onboarding.
**How:** Run a 2–6 week pilot with 5–50 customers depending on product.
**Metrics & Thresholds:**
- **Activation Rate** ≥ target (e.g., 40% of invited users complete onboarding).
- **Time-to-First-Value** ≤ target (e.g., < 48 hours).
- **Error Rate** (client/server) < 0.5% of requests.
- **Support Volume**: < X tickets per 100 users per week.
**Deliverables:** Pilot report with telemetry, qualitative feedback, top 10 issues, and remediation plan.
**Owner:** Customer Success + PM.

---

### 4. Usability & Accessibility Audits

**Usability**
- **Moderated Usability Tests:** 5–8 representative users per major flow.
  - **Metrics:** Task success rate ≥ 85%; time-on-task within target; SUS ≥ 70.
  - **Artifacts:** Session recordings, heatmaps, prioritized usability fixes.
- **Unmoderated Tests:** Run with tools (e.g., Maze, UserTesting) for scale.
**Accessibility**
- **Automated Checks:** axe-core, Lighthouse CI.
  - **Pass:** Zero critical WCAG violations; color contrast OK (7:1+ AAA).
- **Manual Audit:** Keyboard navigation, screen reader walkthrough for core flows.
  - **Pass:** All core flows operable via keyboard and readable by screen readers.
**Owner:** UX/Design + Accessibility Specialist.

---

### 5. Security & Privacy Audits (Actual Tests)

**Threat Modeling**
- **Run a STRIDE or PASTA session** for new features; produce threat register and mitigations.
**Penetration Testing**
- **Third-Party Pen Test** (external vendor) covering web, API, auth flows, and infra.
  - **Deliverable:** Report with CVSS scores.
  - **Pass:** No critical/urgent findings; high findings remediated or mitigated with compensating controls.
**Dynamic Scanning (DAST)**
- **Tools:** OWASP ZAP, Burp Suite.
  - **Pass:** No unauthenticated critical vulns; authenticated scans run for privileged flows.
**Secrets & Config**
- **Secrets Scanning:** Git history scan (TruffleHog), runtime secret detection.
  - **Pass:** Zero secrets in repo or container images.
**Data Protection**
- **Privacy Review:** PII mapping, consent capture, data retention policy, encryption at rest/in transit.
  - **Pass:** Documented data flows and consent timestamps; encryption keys managed.
**Dependency & Container Security**
- **Image Scanning:** Clair, Trivy.
  - **Pass:** Zero critical CVEs in images.
**Owner:** Security Team.

---

### 6. Performance, Load, and Resilience Testing (Exact Scripts & Gates)

**Load Testing**
- **Tools:** k6, Gatling, JMeter.
- **Scenarios:** Normal load, peak load (1× expected peak), stress (2×–3×).
- **Metrics to Capture:** p95/p99 latency, error rate, throughput, CPU/memory, DB connections.
- **Pass Criteria:** p95 latency < SLA (e.g., 500ms for API); error rate < 1% at 1× peak; system recovers after stress.
**Soak Testing**
- **Run:** 6–72 hours at expected peak to detect memory leaks and resource exhaustion.
- **Pass:** Zero resource degradation; zero increase in error rate over time.
**Chaos & Resilience**
- **Chaos Experiments:** Kill instances, inject latency, DB failover (LitmusChaos/Chaos Mesh).
- **Pass:** System maintains SLOs or degrades gracefully with documented fallback behavior.
**DB & Cache**
- **DB Load Tests:** Long transactions, connection pool exhaustion tests.
- **Cache Eviction Tests:** Ensure cache warming and cold start behavior acceptable.
**Owner:** SRE / Performance Engineer.

---

### 7. Observability, Monitoring, and Incident Readiness

**Instrumentation**
- **Event Taxonomy:** All core events instrumented (user signups, conversions, errors).
- **Tracing:** Distributed tracing (OpenTelemetry) for critical flows.
**Dashboards & Alerts**
- **Dashboards:** Real-time KPIs (errors, latency, traffic, conversion).
- **Alerts:** Actionable alerts with runbook links; alert thresholds tuned to avoid noise.
**Runbooks & Playbooks**
- **Create Runbooks** for top 10 incidents (high latency, DB outage, auth failure).
- **On-Call Rota:** Staffed and tested.
**Incident Drills**
- **Simulated Incident:** Run tabletop and live drills quarterly.
**Owner:** SRE / Ops.

---

### 8. Data Quality & Analytics Verification

**Event Validation**
- **Schema Enforcement:** Use event schema registry (e.g., Snowplow, Segment) and CI checks.
- **Backfill Tests:** Verify analytics pipeline handles late events.
**Dashboard QA**
- **Reconciliation:** Compare raw events → aggregated metrics; sample queries to validate.
**A/B Test Readiness**
- **Experiment Guardrails:** Ensure experiments are instrumented and can be rolled back.
**Owner:** Data Engineering / Analytics.

---

### 9. Compliance, Legal, and Billing Checks

**Legal & Contracts**
- **TOS & Privacy:** Legal review and published links.
- **Data Processing Agreements** in place for vendors.
**Regulatory**
- **Industry Compliance:** SOC2, ISO, HIPAA if required — ensure controls documented.
**Billing**
- **Billing Test:** Test card flows, invoices, refunds, tax calculations.
- **Pass:** Zero failed billing flows; reconciliation test passed.
**Owner:** Legal + Finance.

---

### 10. UX Edge Cases, Error Handling, and Graceful Degradation

**Client Behavior**
- **Offline Mode:** Test app behavior with intermittent connectivity.
- **Form Preservation:** Inputs preserved on network failure.
**Error States**
- **Design Audit:** Every error state has clear copy, retry path, and telemetry.
**Rate Limiting & Spam**
- **Protection:** CAPTCHA/honeypot; rate limit tests.
**Owner:** Product + UX + Dev.

---

### 11. Release & Rollout Plan (Exact Steps)

**Canary Rollout**
1. **Deploy to Canary** (1–5% of traffic). Monitor 30–60 minutes.
2. **If Green**, increase to 25% for 2 hours. Monitor.
3. **If Green**, 100% rollout.
**Feature Flags**
- Release behind flags; enable for internal users first.
**Rollback**
- **Kill Switch:** Immediate flag to disable feature; automated rollback playbook.
**Communication**
- **Status Page** and internal Slack channel for launch.
**Owner:** Release Manager + SRE.

---

### 12. Post-Launch Verification (First 72 Hours)

**Immediate Checks**
- **Smoke Tests** run every 15 minutes for 24 hours.
- **KPIs:** Activation, errors, latency, signups monitored hourly.
- **Support Triage:** Dedicated support channel and escalation path.
**Post-Mortem**
- **If Incident:** 72-hour post-mortem with RCA and action items.
**Owner:** On-Call + PM.

---

### 13. Concrete Templates & Commands (Copy-Paste)

**k6 Load Test Example (Basic)**
```js
import http from 'k6/http';
import { sleep } from 'k6';
export let options = { vus: 100, duration: '5m' };
export default function () {
  http.get('https://api.yourapp.com/health');
  sleep(1);
}
```
**OWASP ZAP Baseline Scan (CLI)**
```bash
zap-baseline.py -t https://staging.yourapp.com -r zap_report.html
```
**Trivy Image Scan**
```bash
trivy image --severity CRITICAL,HIGH yourorg/yourimage:latest
```
**Snyk Test (Node)**
```bash
npx snyk test
```
**Smoke Test Curl (Login Flow)**
```bash
curl -X POST https://staging.yourapp.com/api/login -d '{"email":"test@x.com","password":"P@ssw0rd"}' -H "Content-Type: application/json"
```

---

### 14. Pass/Fail Gating Matrix

| **Gate** | **Who** | **Pass Criteria** |
| --- | ---: | --- |
| Security | Security | No critical/urgent vulns; pen test remediated |
| Performance | SRE | p95/p99 within SLA at 1× peak; recovers after stress |
| Usability | UX | Task success ≥ 85%; accessibility critical issues fixed |
| Beta | PM | Pilot KPIs met; top 10 issues triaged |
| Observability | SRE | Dashboards + runbooks + alerts in place |
| Legal/Billing | Legal/Finance | Contracts & billing flows tested |

---

### 15. Quick Operational Checklist (Hand to Antigravity & Subagents)

- [ ] Run full CI pipeline (SAST, tests, IaC checks).
- [ ] Run dependency & image scans; fix critical CVEs.
- [ ] Execute k6 load tests: 1×, 2×, soak 24h.
- [ ] Run DAST (ZAP) and remediate high/critical findings.
- [ ] Complete third-party pen test and remediate.
- [ ] Run accessibility audit (axe + manual).
- [ ] Deploy to canary (1–5%), monitor 60m, then 25% 2h, then 100%.
- [ ] Enable observability: traces, dashboards, alerts.
- [ ] Run pilot with N customers; collect metrics and feedback.
- [ ] Final sign-offs: PM, Security, SRE, Legal, Finance.
