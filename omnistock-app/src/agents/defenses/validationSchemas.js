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
  cart_subtotal: z.number().positive('Cart subtotal must be positive'),
});
