/**
 * Titan 5: Barnaby Jack
 * Focus: Infrastructure Hardening, Supply Chain, Service Boundaries & Runtime Security
 *
 * Re-audited: 2026-09-17 (2nd pass)
 * Verifier: Source code inspection of docker-compose.base44.yml, index.html, circuitBreaker.js,
 *           hmac.js, storageMonitor.js, db.js, backend/routes/security.js
 */

export function auditJack(context = {}, mode = 'continuous') {
  const findings = [];
  const isGate = mode === 'strict_gate';
  const auditDate = '2026-09-17';
  const auditPass = 2;

  // ─── ORIGINAL FINDINGS (verified against source) ────────────────────────

  // JACK-01: Circuit breaker on SDK calls
  // VERIFIED: withCircuitBreaker wraps cloud sync + receipt signing in POS.
  findings.push({
    id: 'JACK-01',
    titan: 'jack',
    titanName: 'Barnaby Jack',
    severity: isGate ? 'critical' : 'high',
    role: 'cashier',
    roleName: 'Cashier & POS',
    finding: 'Base44 backend SDK calls execute without fallback timeouts or circuit-breaker tripping',
    component: 'omnistock-app/src/api/ & Base44 SDK Client',
    recommendation: 'Wrap cloud synchronization in exponential backoff retry loops with max 3-second timeout and offline Dexie fallback mode.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'circuitBreaker.js: withCircuitBreaker(fn, fallback) — 3 retries, 3s timeout, exponential backoff (500ms/1s/2s). POS wraps cloud sync and receipt signing.',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'POS.jsx: withCircuitBreaker(() => api.security.signReceipt(...)) and withCircuitBreaker(() => base44.entities.Transaction.create(...)). circuitBreaker.js: MAX_RETRIES=3, TIMEOUT_MS=3000, exponential backoff. Confirmed.',
    category: 'Cascading Failure & Fault Tolerance',
    attackVector: 'A transient cloud outage freezes checkout operations on physical POS terminals.'
  });

  // JACK-02: Docker container runs as root
  // REMEDIATED: chown node_modules volume at startup, then su to node user for dev server.
  findings.push({
    id: 'JACK-02',
    titan: 'jack',
    titanName: 'Barnaby Jack',
    severity: 'medium',
    role: 'all',
    roleName: 'Infrastructure',
    finding: 'Container runtime executes as root user in development compose configuration',
    component: 'docker-compose.base44.yml',
    recommendation: 'Add user: node directive in production container specifications to enforce unprivileged execution.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'docker-compose.base44.yml: both web and backend services use named volumes for node_modules. Startup command: chown -R node:node /app/node_modules, then su node -s /bin/sh -c "npm install && <dev server>". Process runs as node user (uid 1000), not root.',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'docker-compose.base44.yml web: command: sh -c "chown -R node:node /app/node_modules; su node -s /bin/sh -c \'npx vite --host 0.0.0.0 --port 5173\'". backend: command: sh -c "chown -R node:node /app/node_modules; su node -s /bin/sh -c \'node --watch src/server.js\'". Both use web_node_modules / backend_node_modules named volumes. Confirmed non-root execution.',
    category: 'Container Hardening',
    attackVector: 'Container breakout vectors allow arbitrary filesystem modifications on the host.'
  });

  // JACK-03: CSP headers
  // VERIFIED: index.html has full CSP meta tag + Referrer-Policy + X-Content-Type-Options.
  findings.push({
    id: 'JACK-03',
    titan: 'jack',
    titanName: 'Barnaby Jack',
    severity: 'medium',
    role: 'all',
    roleName: 'Infrastructure',
    finding: 'Vite server serves index.html without strict Content-Security-Policy or Referrer-Policy headers',
    component: 'omnistock-app/index.html & vite.config.js',
    recommendation: 'Configure CSP meta tags restricting script-src, style-src, and frame-ancestors.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'index.html: CSP meta tag with default-src self, script-src restrictions, frame-ancestors none. Referrer-Policy: strict-origin-when-cross-origin. X-Content-Type-Options: nosniff.',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'index.html: <meta http-equiv="Content-Security-Policy" content="default-src self; script-src self unsafe-inline unsafe-eval ...; frame-ancestors none;">. Referrer-Policy and X-Content-Type-Options also set. Confirmed. Note: unsafe-inline and unsafe-eval are required for Vite dev server.',
    category: 'Header Hardening',
    attackVector: 'Unrestricted script loading permits clickjacking or external asset injection.'
  });

  // JACK-OWNER-01: General Ledger vs POS invariant mismatch
  // VERIFIED: Merkle hash chain via computeReceiptHash + /receipts/sign + /receipts/verify.
  findings.push({
    id: 'JACK-OWNER-01',
    titan: 'jack',
    titanName: 'Barnaby Jack',
    severity: isGate ? 'critical' : 'high',
    role: 'owner',
    roleName: 'Owner of Establishments',
    component: 'omnistock-app/src/pages/SalesReport.jsx & Dexie Schema',
    finding: 'General Ledger vs POS revenue invariant mismatch due to silent offline queue truncation',
    recommendation: 'Enforce cryptographic Merkle hash chaining across all receipts; alert owner instantly on broken sequence IDs.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'Backend hmac.js: computeReceiptHash() creates SHA-256 hash chain. /receipts/sign adds each receipt to chain. /receipts/verify checks integrity. POS calls signReceipt after each transaction.',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'hmac.js: computeReceiptHash(receipt, previousHash) — SHA-256 of id+txn_number+total+payment_method+timestamp+prev_hash. security.js: /receipts/sign appends to chain, /receipts/verify checks for broken links. POS.jsx calls api.security.signReceipt(). Confirmed.',
    category: 'Ledger Invariant Integrity',
    attackVector: 'Corrupted or selectively pruned offline queue rows result in unrecoverable tax audit failure with state revenue agency.'
  });

  // JACK-MGR-02: Offline void replay attack
  // VERIFIED: generateVoidToken with UUID + timestamp + HMAC, 24h expiry, usedVoidTokens Set.
  findings.push({
    id: 'JACK-MGR-02',
    titan: 'jack',
    titanName: 'Barnaby Jack',
    severity: 'high',
    role: 'branch_manager',
    roleName: 'Team Manager / Branch Supervisor',
    component: 'omnistock-app/src/pages/POS.jsx & Dexie sync',
    finding: 'Offline void authorization tokens can be intercepted and replayed across multiple transaction records',
    recommendation: 'Sign every void token with a single-use transaction UUID and timestamp window; reject tokens on sync if timestamp > 24 hours.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'hmac.js: generateVoidToken(transactionId) — UUID + timestamp + HMAC signature, 24h expiry. verifyVoidToken checks signature, transaction ID match, and timestamp. usedVoidTokens Set prevents replay.',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'hmac.js: generateVoidToken returns {token, uuid, timestamp, expiresAt}. verifyVoidToken checks: signature (timingSafeEqual), txId match, timestamp < 24h. security.js: usedVoidTokens.has(token) → 409 Conflict. Confirmed.',
    category: 'Offline Token Replay',
    attackVector: 'Dishonest supervisor approves a single offline void; the authorization token is reused across 10 cash transactions.'
  });

  // JACK-INV-03: Physical inventory write-off sign-off chain
  // REMEDIATED: Supervisor sign-off modal with supervisor_id + supervisor_signature fields.
  findings.push({
    id: 'JACK-INV-03',
    titan: 'jack',
    titanName: 'Barnaby Jack',
    severity: 'medium',
    role: 'inventory',
    roleName: 'Inventory Specialist',
    component: 'omnistock-app/src/pages/StockAdjustments.jsx',
    finding: 'Physical inventory count discrepancies lack cryptographic sign-off chain for shrinkage write-offs',
    recommendation: 'Mandate dual-party digital sign-off (Inventory Specialist + Supervisor) for any write-off exceeding $100.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'StockAdjustments.jsx: replaced confirm() dialog with SupervisorSignOffModal component. handleSignOffConfirm(signOffData) sets adjustmentData.supervisor_id and adjustmentData.supervisor_signature before writing to Dexie. Backend writeOffSchema validates these fields for write-offs > $100.',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'StockAdjustments.jsx: handleSignOffConfirm async (signOffData) => { adjustmentData.supervisor_id = signOffData.supervisor_id; adjustmentData.supervisor_signature = signOffData.supervisor_signature; }. Dexie record includes supervisor_id and supervisor_signature fields. SupervisorSignOffModal rendered with writeOffValue={pendingSignOff.valueEstimate}. Confirmed.',
    category: 'Physical Shrinkage Defense',
    attackVector: 'Inventory controller marks whole cases of premium spirits as "broken in transit" without verifiable photographic proof or supervisor sign-off.'
  });

  // JACK-GATE-04: IndexedDB storage quota monitoring
  // REMEDIATED: monitorAndPrune now called on app startup, periodic interval, and after POS transactions.
  findings.push({
    id: 'JACK-GATE-04',
    titan: 'jack',
    titanName: 'Barnaby Jack',
    severity: 'low',
    role: 'cashier',
    roleName: 'Cashier',
    finding: 'IndexedDB storage quota unmonitored; risk of silent quota breach in high-volume stores',
    component: 'omnistock-app/src/lib/db.js',
    recommendation: 'Query navigator.storage.estimate() and trigger proactive pruning when usage exceeds 80%.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'storageMonitor.js: monitorAndPrune(pruneFn) checks navigator.storage.estimate() at 80% threshold. Now integrated into: (1) App.jsx on startup + 60s periodic interval, (2) POS.jsx after each transaction creation, (3) db.js importBackup. High-volume stores get proactive pruning during regular operation.',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'App.jsx: monitorAndPrune(pruneOldTransactions) on mount + setInterval 60s. POS.jsx: monitorAndPrune(async () => { prune old transactions }) after transaction creation. db.js: monitorAndPrune in importBackup. Confirmed across all three integration points.',
    category: 'Storage Exhaustion',
    attackVector: 'Browser silently drops write operations when disk quota is reached, losing un-synced sales receipts.'
  });

  // ─── NEW FINDINGS (2nd pass) ─────────────────────────────────────────────

  // JACK-05: Backend JWT secret uses hardcoded dev fallback
  // REMEDIATED: Fail-fast guards added for JWT_SECRET, HMAC_SECRET, and PII_ENCRYPTION_KEY in production.
  findings.push({
    id: 'JACK-05',
    titan: 'jack',
    titanName: 'Barnaby Jack',
    severity: 'medium',
    role: 'all',
    roleName: 'Infrastructure',
    component: 'backend/src/config/env.js & backend/src/services/crypto.js',
    finding: 'Backend JWT and HMAC secrets use hardcoded development fallback values when env vars are missing',
    recommendation: 'Fail fast on startup if JWT_SECRET or HMAC_SECRET are not set in production (NODE_ENV=production). Remove hardcoded fallbacks for production builds.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'env.js: jwt.secret getter throws "FATAL: JWT_SECRET must be set in production" when NODE_ENV=production and JWT_SECRET missing. hmac.secret getter throws "FATAL: HMAC_SECRET must be set in production" similarly. crypto.js: ENCRYPTION_KEY throws "FATAL: PII_ENCRYPTION_KEY must be set in production" when NODE_ENV=production and PII_ENCRYPTION_KEY missing. Dev fallbacks remain only for development mode.',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'env.js: if (process.env.NODE_ENV === "production" && !process.env.JWT_SECRET) throw new Error("FATAL: JWT_SECRET must be set in production..."). Same pattern for HMAC_SECRET. crypto.js: if (process.env.NODE_ENV === "production") throw new Error("FATAL: PII_ENCRYPTION_KEY must be set in production..."). Dev fallbacks (scryptSync, dev-secret) only apply when NODE_ENV !== production. Confirmed.',
    category: 'Secret Management',
    attackVector: 'If deployed to production without setting JWT_SECRET, attacker can forge admin JWT tokens using the hardcoded fallback.'
  });

  return findings;
}

export default auditJack;
