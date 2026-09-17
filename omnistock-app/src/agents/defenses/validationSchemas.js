/**
 * Hybrid Defense: Executable Zod Schema Validators
 *
 * These schemas enforce the boundary constraints described in the descriptive
 * defense text within roleScenarios.js. Each schema corresponds to a specific
 * Devil's Team threat vector and validates the attack payload shape.
 */
import { z } from 'zod';

// === OWNER SCHEMAS ===

// Owner_Miller: Tax Rate Boundary Fuzzing & Negative Tax Injection
export const taxConfigSchema = z.object({
  action: z.literal('UPDATE_TAX_CONFIG'),
  branch_id: z.string().min(1, 'Branch ID is required'),
  vat_rate: z.number().min(0, 'Tax rate must be >= 0% — negative rates are blocked').max(35, 'Tax rate must be <= 35%'),
  allow_negative_memo: z.boolean().refine(v => v === false, 'Negative tax memos are not allowed'),
});

// Owner_Geohot: Multi-Branch Revenue Consolidation Race Condition
export const revenueSyncSchema = z.object({
  action: z.literal('SYNC_CONCURRENT_REVENUE'),
  nodes: z.array(z.string().min(1)).min(1, 'At least one node is required'),
  amount: z.number().positive('Amount must be positive'),
  timestamp_delta_ms: z.number().positive('Concurrent submissions with 0ms delta are blocked — idempotency key required'),
  idempotency_key: z.string().min(1, 'Idempotency key is required for atomic ledger transactions'),
});

// Owner_Mitnick/Kamkar/Jack: Executive Dashboard Session Hijacking & Financial Draw Access
export const financialDrawSchema = z.object({
  action: z.literal('FETCH_FINANCIAL_DRAW'),
  requester_role: z.string().refine(r => r === 'owner', 'Only owner role can access financial draw data'),
  pin_bypass: z.boolean().refine(v => v === false, 'PIN bypass is not permitted — MFA required'),
  mfa_token: z.string().min(1, 'WebAuthn/Hardware MFA token is required'),
});

// === BRANCH MANAGER SCHEMAS ===

// All Branch Manager: Manager Override Discount / PIN Exploitation
export const discountOverrideSchema = z.object({
  action: z.literal('OVERRIDE_DISCOUNT'),
  percent: z.number().min(0, 'Discount cannot be negative').max(50, 'Manager discount cannot exceed 50% — owner approval required for >50%'),
  supervisor_pin: z.string().refine(pin => !/^(0000|1234|1111|9999)$/.test(pin), 'Static/weak PINs are not allowed — dynamic TOTP required'),
  order_id: z.string().min(1, 'Order ID is required'),
  otp_token: z.string().min(6, 'Dynamic TOTP token is required for supervisor overrides'),
});

// === CASHIER SCHEMAS ===

// All Cashier: Negative Cart Quantity / Double-Tender / Offline Manipulation
export const cartItemSchema = z.object({
  action: z.literal('ADD_LINE_ITEM'),
  sku: z.string().min(1, 'SKU is required'),
  qty: z.number().int('Quantity must be an integer').positive('Quantity must be greater than 0 — negative quantities are blocked'),
  unit_price: z.number().nonnegative('Unit price cannot be negative'),
  line_total: z.number().nonnegative('Line total cannot be negative — negative balance checkouts are blocked'),
});

// === INVENTORY SPECIALIST SCHEMAS ===

// All Inventory: Stock Adjustment / Ghost Write-Off / Overflow
export const stockAdjustmentSchema = z.object({
  action: z.literal('STOCK_ADJUSTMENT'),
  sku: z.string().min(1, 'SKU is required'),
  delta_units: z.number().int('Delta must be an integer').refine(n => Math.abs(n) <= 10000, 'Stock adjustment cannot exceed ±10,000 units — supervisor confirmation required'),
  reason: z.string().min(1, 'Reason code is required'),
  supervisor_approval: z.boolean().refine(v => v === true, 'Supervisor approval is required for stock adjustments'),
});

// === COST ANALYST SCHEMAS ===

// All Cost Analyst: Recipe Yield / Division-by-Zero / UOM Mismatch
export const recipeYieldSchema = z.object({
  action: z.literal('COMPUTE_RECIPE_YIELD'),
  recipe_id: z.string().min(1, 'Recipe ID is required'),
  cooking_shrinkage_yield: z.number().min(0.01, 'Yield must be strictly positive (min 0.01%) — division by zero blocked').max(200, 'Yield cannot exceed 200%'),
  raw_weight_kg: z.number().positive('Raw weight must be a positive value'),
});

// === MARKETING STRATEGIST SCHEMAS ===

const promoCodePattern = z.string().regex(/^[A-Z0-9_-]{3,20}$/, 'Promo code must be alphanumeric [A-Z0-9_-], 3-20 characters');

// All Marketing: Coupon Stacking / Promo Fuzzing / Single-Use Race
export const promoApplySchema = z.object({
  action: z.literal('APPLY_COUPONS'),
  codes: z.array(promoCodePattern).max(1, 'Only one promo code can be applied — stacking is not allowed'),
  cart_subtotal: z.number().positive('Cart Subtotal must be positive'),
});

// === SECURITY ROLE SCHEMAS ===

// CISO: Executive Security Policy & Dashboard Access
export const securityPolicySchema = z.object({
  action: z.string().min(1, 'Action is required'),
  requester_role: z.string().refine(r => r === 'ciso', 'Only CISO role can modify security policies'),
  mfa_token: z.string().min(1, 'Hardware-key MFA token is required for executive security access'),
  policy_type: z.enum(['zero_trust', 'access_review', 'risk_score', 'board_report'], 'Invalid policy type'),
  allow_all: z.boolean().refine(v => v === false, 'Allow-all policies are blocked — deny-all default enforced'),
  session_bound: z.boolean().refine(v => v === true, 'Session must be device-bound for executive access'),
});

// Security Engineer: Infrastructure Hardening & Patch Management
export const infraHardeningSchema = z.object({
  action: z.string().min(1, 'Action is required'),
  target_asset: z.string().min(1, 'Target asset is required'),
  patch_id: z.string().min(1, 'Patch ID is required'),
  cidr_block: z.string().refine(c => c !== '0.0.0.0/0', '0.0.0.0/0 CIDR blocks are not allowed — least-privilege required'),
  secrets_in_logs: z.boolean().refine(v => v === false, 'Secrets must not be persisted in CI/CD logs'),
  vault_rotation: z.boolean().refine(v => v === true, 'Vault auto-rotation must be enabled'),
  drift_baseline: z.boolean().refine(v => v === true, 'Configuration drift baseline must be verified'),
});

// Incident Responder: Containment & Forensic Evidence
export const incidentContainmentSchema = z.object({
  action: z.string().min(1, 'Action is required'),
  target_asset: z.string().min(1, 'Target asset is required'),
  evidence_snapshot: z.boolean().refine(v => v === true, 'Evidence snapshot must be captured before containment'),
  forensic_isolation: z.boolean().refine(v => v === true, 'Forensic tools must run in isolated air-gapped environments'),
  file_path: z.string().refine(p => !p.includes('../'), 'Path traversal sequences are blocked in evidence file paths'),
  worm_storage: z.boolean().refine(v => v === true, 'Forensic evidence must use WORM storage'),
  responder_lock: z.boolean().refine(v => v === true, 'Asset-level responder lock must be acquired'),
});

// Penetration Tester: Exploit Execution & Findings
export const penTestSchema = z.object({
  action: z.string().min(1, 'Action is required'),
  target_asset: z.string().min(1, 'Target asset is required'),
  exploit_serialized: z.boolean().refine(v => v === true, 'Exploit execution must be serialized — no concurrent attacks on same target'),
  credentials_time_bound: z.boolean().refine(v => v === true, 'Red team credentials must be time-bound with automatic expiry'),
  payload_sandboxed: z.boolean().refine(v => v === true, 'Test payloads must be sandboxed — no arbitrary command execution'),
  findings_worm: z.boolean().refine(v => v === true, 'Findings must be written to WORM storage'),
  report_encrypted: z.boolean().refine(v => v === true, 'Test reports must be encrypted with need-to-know access'),
});

// Compliance Officer: Framework Mapping & Evidence
export const complianceAuditSchema = z.object({
  action: z.string().min(1, 'Action is required'),
  control_id: z.string().min(1, 'Control ID must exist in the control registry'),
  framework_id: z.enum(['gdpr', 'soc2', 'iso27001', 'pci_dss', 'hipaa', 'ccpa', 'psd2'], 'Framework ID must be from approved list'),
  dual_authorization: z.boolean().refine(v => v === true, 'Control-to-framework mapping requires dual authorization'),
  evidence_worm: z.boolean().refine(v => v === true, 'Audit evidence must use WORM storage'),
  mfa_token: z.string().min(1, 'Step-up MFA token is required for compliance dashboard access'),
  session_timeout: z.number().max(15, 'Session timeout must not exceed 15 minutes for compliance access'),
});

// SOC Analyst: Alert Triage & Detection
export const socAlertSchema = z.object({
  action: z.string().min(1, 'Action is required'),
  alert_id: z.string().min(1, 'Alert ID is required'),
  query_parameterized: z.boolean().refine(v => v === true, 'SIEM queries must be parameterized — no arbitrary command execution'),
  alert_locked: z.boolean().refine(v => v === true, 'Alert must be locked to the triaging analyst'),
  log_buffered: z.boolean().refine(v => v === true, 'Logs must be locally buffered during network partitions'),
  need_to_know: z.boolean().refine(v => v === true, 'Alert data must be need-to-know restricted'),
  mfa_token: z.string().min(1, 'Hardware-token MFA is required for SIEM access'),
});

// DPO: Data Subject Rights & Privacy Impact Assessment
export const dpoPrivacySchema = z.object({
  action: z.string().min(1, 'Action is required'),
  customer_id: z.string().min(1, 'Customer ID is required'),
  dsr_lock: z.boolean().refine(v => v === true, 'Customer-level DSR lock must be acquired — no concurrent requests'),
  risk_level: z.enum(['low', 'medium', 'high'], 'Risk level must be from approved enum — server-side computed'),
  dual_signoff: z.boolean().refine(v => v === true, 'High-risk DPIA requires dual DPO sign-off'),
  hash_chain: z.boolean().refine(v => v === true, 'Data processing register must use cryptographic hash chain'),
  response_encrypted: z.boolean().refine(v => v === true, 'DSR responses must be delivered via encrypted download links'),
  mfa_token: z.string().min(1, 'Hardware-token MFA is required for DPO access'),
});
