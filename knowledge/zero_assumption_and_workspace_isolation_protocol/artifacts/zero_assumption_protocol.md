# Zero-Assumption Policy & Independent Workspace Isolation Protocol

## Core Purpose & Scope
To permanently eliminate wasted AI quota, wasted time, broken software builds, overwritten client applications, and un-clarified assumptions across all current and future workspace tasks.

---

## 📜 The 3 Mandatory Governance Directives

### 1. STRICT ZERO-ASSUMPTION POLICY
- **NO GUESSWORK**: The agent MUST NEVER assume user intent, directory scope, deployment targets, or feature parameters.
- **MANDATORY CLARIFICATION GATE**: If any requirement or instruction is underspecified, ambiguous, or unclear, the agent MUST IMMEDIATELY STOP and ask the user for explicit written clarification before invoking any code modification tools.

### 2. MANDATORY INDEPENDENT NEW PROJECT WORKSPACE ISOLATION
- **STRICT DIRECTORY ISOLATION**: Whenever starting a *"Bagong Proyekto"* (New Project), the agent MUST ALWAYS initialize a brand-new, dedicated workspace directory (e.g., `c:\Users\Admin\.antigravity-ide\<NewProjectName>\`).
- **PROHIBITION AGAINST RE-USING CODEBASES**: Modifying `src/App.jsx` or overwriting existing component files in a previously completed client project is classified as a severe workflow violation.

### 3. IMMUTABLE COMPLETED CLIENT CODEBASE PRESERVATION
- **PERMANENT BASELINE IMMUTABILITY**: Completed client products (e.g., RevenueCat-AI) are permanently frozen, zero-mock audited, and immutable.
- **ZERO CONTAMINATION**: A new client's components, brand identity, or feature logic MUST NEVER pollute or touch a previously completed project's repository.
