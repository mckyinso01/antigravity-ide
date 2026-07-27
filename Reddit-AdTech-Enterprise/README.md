# Reddit Enterprise Ad Ranking & MLOps Infrastructure Repository

> 📍 **WORKFLOW TELEMETRY**: `[MILESTONE 1 (DAY 0–3): SKELETON & DRAFTS PUSHED 🟢]`  
> **Client**: **Reddit Inc.** (Ad Engineering & ML Infrastructure Division)  
> **Fixed Fee Contract**: `$8,800 USD` (One-Time)  
> **Target Deployment**: `https://gatzdevs.surge.sh`  

---

## 📁 Repository Structure

```text
/spec
  ├── schemas/
  │   ├── ad_telemetry.proto    # Main 4-module Protobuf telemetry definitions
  │   └── ad_stream.proto       # Low-level auction event & model telemetry Protobuf messages
  └── ddl/
      ├── clickhouse_schema.sql # Multi-tier MergeTree DDLs and percentiles Materialized Views
      └── clickhouse_raw_and_mv.sql # Hot-tier ad auctions raw events and latency agg tables

/playbook
  └── sample_producer.go        # Staging Go Kafka producer pushing Protobuf binary payloads

/load-harness
  └── README.md                 # Distributed load test harness outline & execution instructions
```

---

## 🚀 Quick Start (Local Staging Smoke Test)

1. **Protobuf Compilation**:
   ```bash
   protoc --go_out=. --go_opt=paths=source_relative spec/schemas/ad_stream.proto
   ```
2. **ClickHouse Table Creation**:
   ```bash
   clickhouse-client --queries-file spec/ddl/clickhouse_raw_and_mv.sql
   ```
3. **Run Synthetic Producer**:
   ```bash
   go run playbook/sample_producer.go
   ```

---

## 🗓️ Delivery Milestone Timeline

- [x] **Day 0–3**: Repo skeleton, Protobuf schemas, ClickHouse DDLs, sample Go producer (**COMPLETED 🟢**)
- [ ] **Day 4–10**: Production Spec Pack Draft (Architecture, DDLs, SLOs, PromQL)
- [ ] **Day 11–17**: Implementation Playbook Draft (CI/CD, Helm, OpenTelemetry)
- [ ] **Day 12–21**: Load Test Harness Delivery & Sample Staging Runs
- [ ] **Day 21**: Final Package Handoff & 90-Minute Live Walkthrough
