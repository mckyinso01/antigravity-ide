---
type: Global Workflow Rule
title: Parallel Swarm Orchestration
status: active
---

# Parallel Subagent Swarming (The Opus Multi-Core Capability)

When a complex full-stack feature is requested, the Master Orchestrator MUST NEVER think linearly or execute sequentially.
1. Spawn specialized subagents in parallel (Frontend, Backend, Database).
2. Synthesize all outputs natively before handing off to the user.
