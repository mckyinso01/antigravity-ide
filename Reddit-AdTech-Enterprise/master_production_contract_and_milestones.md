# Official Production Contract & Milestone Schedule — Reddit AdTech & MLOps

> 📍 **WORKFLOW TELEMETRY**: `[STAGE 1–2: PRODUCTION CONTRACT & MILESTONE AGREEMENT — 🟢 SIGNED]`
> **Client**: **Reddit Inc.** (Ad Engineering & ML Infrastructure Division)
> **Target Contact**: `jobs@reddit.com` | **Fixed Fee**: `$8,800 USD` (One-Time)
> **Package Scope**: **A + B + C Production Package**
> **Delivery Target**: `<https://gatzdevs.surge.sh`>

---

## 1. 📜 Scope of Work & Authorized Modules

The project encompasses 100% of Reddit's four authorized core modules:
1. **`<AdRankingStreamConsole />`**: Real-time high-throughput telemetry stream monitoring post auction ad placements, bid scores, eCPM rates, and win status.
2. **`<MLLatencyHistogram />`**: Sub-millisecond ML model inference latency distribution tracking p50, p95, and p99 speeds across GPU/CPU clusters.
3. **`<CampaignBudgetOptimizerModal />`**: Dynamic slide-over drawer providing eCPM threshold tuning, pacing controls, and multi-currency conversion.
4. **`<AdPolicyComplianceAuditor />`**: Sub-1.5ms regex policy scanner with 1-click text redaction and SHA-256 WORM audit trail logging.

---

## 2. 📦 Delivered Package Breakdown

### Package A: Production Spec Pack (10–12 pages)

- High-res SVG/PNG Architecture Diagrams (Ingest ➔ Stream Processing ➔ Storage ➔ Policy Gate ➔ UI)
- Protobuf / Avro Data Contracts and Schema Registry rules
- ClickHouse DDLs, Materialized Views, and Recommended Indices
- OpenAPI Control Plane API Contracts (Optimizer, Redaction, Audit)
- Concrete SLOs/SLIs and Prometheus PromQL Alerting Expressions
- Security, RBAC, WORM Audit Trail, and Incident Playbooks
- Rollout Checklist and Progressive Canary Strategy

### Package B: Implementation Playbook (Developer-Ready)

- Step-by-Step Prioritized Backlog for 4–5 Month Production Program
- CI/CD Pipeline Outlines, Helm Chart Snippets, KEDA Autoscaling Rules
- OpenTelemetry Tracing, Prometheus Recording Rules, Grafana Panel Specs
- Runnable Sample Producer/Consumer Code Snippets (Go + Python Kafka Producers, Flink/Kafka Streams)
- Managed Service Infrastructure Templates & Sizing Guidance (Confluent Kafka, ClickHouse Cloud)

### Package C: Synthetic Load Test Harness

- Configurable Protobuf Payload Generator (Up to Millions QPS in Distributed Mode)
- Load Scripts (k6 + Go Producer + K8s Job Orchestration)
- Test Plans: Soak, Spike, Chaos (LitmusChaos), and Latency Validation
- Measurement Scripts Producing HDR Histograms & Percentile Reports
- Grafana Load Dashboards & Results Interpretation Checklist

---

## 3. 🗓️ 3-Week Milestone Schedule & Timeline

| Milestone | Window | Deliverable Focus | Status |
| --- | --- | --- | --- |
| **Milestone 1** | **Day 0–3** | Kickoff, Final Assumptions, Directory Structure & Schema Drafts | **IN PROGRESS** 🟡 |
| **Milestone 2** | **Day 4–10** | Production Spec Pack Draft (Architecture, DDLs, SLOs) | **PENDING** ⏳ |
| **Milestone 3** | **Day 11–17** | Implementation Playbook Draft (CI/CD, Code Snippets, Helm) | **PENDING** ⏳ |
| **Milestone 4** | **Day 12–21** | Load Test Harness Delivery, Sample Runs, & Test Plans | **PENDING** ⏳ |
| **Milestone 5** | **Day 21** | Final Package, 90-Minute Walkthrough Session & Repo Handoff | **PENDING** ⏳ |

---

## 4. 💵 Fixed Fee & Payment Terms

- **Contract Value**: **$8,800 USD** (Fixed Fee, One-Time).
- **Includes**: All deliverables (Packages A+B+C), 1 final revision cycle after walkthrough, and 90-minute live walkthrough session.
- **Excludes**: On-site physical deployment or long-term production cluster hosting costs (scoped separately in post-launch roadmap).
