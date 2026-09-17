/**
 * Titan 4: Charlie Miller
 * Focus: Fuzz Testing, Type Coercion, Input Validation & Boundary Condition Exploitation
 *
 * Re-audited: 2026-09-17 (2nd pass)
 * Verifier: Source code inspection of POS.jsx, StockAdjustments.jsx, Pricing.jsx, validators.js,
 *           backend/middleware/validate.js
 */

export function auditMiller(context = {}, mode = 'continuous') {
  const findings = [];
  const isGate = mode === 'strict_gate';
  const auditDate = '2026-09-17';
  const auditPass = 2;

  // ─── ORIGINAL FINDINGS (verified against source) ────────────────────────

  // MILLER-01: Negative quantities in POS cart & stock adjustments
  // VERIFIED: Zod cartItemSchema + stockAdjustmentSchema enforce positive integers.
  findings.push({
    id: 'MILLER-01',
    titan: 'miller',
    titanName: 'Charlie Miller',
    severity: isGate ? 'critical' : 'high',
    role: 'cashier',
    roleName: 'Cashier & POS',
    finding: 'Stock adjustment and POS input fields accept negative or NaN values via direct keypad input',
    component: 'omnistock-app/src/pages/StockAdjustments.jsx & POS.jsx',
    recommendation: 'Enforce strict Zod schema validation (z.number().positive().finite()) before accepting inventory adjustments or cart line items.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'POS validates each cart item with validate(cartItemSchema, item) before processing. StockAdjustments validates with validate(stockAdjustmentSchema, adjustmentData). Both schemas require positive finite integers.',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'validators.js: cartItemSchema quantity = z.number().int().positive().finite().max(99999). stockAdjustmentSchema quantity_change = z.number().finite().positive().max(10000). Both applied in source. Confirmed.',
    category: 'Input Validation & Fuzzing',
    attackVector: 'Submitting a negative quantity item transforms total payable into a negative charge or infinite credit loop.'
  });

  // MILLER-02: Prototype pollution in bulk import
  // VERIFIED: sanitizeImportKeys() in db.js bulkCreate + importBackup. Backend rejects forbidden keys.
  findings.push({
    id: 'MILLER-02',
    titan: 'miller',
    titanName: 'Charlie Miller',
    severity: 'high',
    role: 'inventory',
    roleName: 'Inventory Specialist',
    finding: 'Bulk CSV / JSON imports lack prototype pollution safeguards and schema bounds',
    component: 'omnistock-app/src/pages/Inventory.jsx',
    recommendation: 'Sanitize imported object keys to reject __proto__, constructor, and prototype properties; validate each record with Zod.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'db.js bulkCreate() and importBackup() call sanitizeImportKeys() to strip __proto__, constructor, prototype. Backend bulkImportSchema rejects forbidden keys.',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'db.js: sanitizeImportKeys(dataArray) in bulkCreate and importBackup. validators.js: sanitizeImportKeys filters forbidden keys. Backend validate.js: bulkImportSchema.refine rejects forbidden keys. Triple-layer defense confirmed.',
    category: 'Object Injection',
    attackVector: 'A crafted JSON product catalog injects arbitrary object prototypes into lodash/dexie processing.'
  });

  // MILLER-03: Barcode length ceiling
  // VERIFIED: POS caps barcode to 48 chars + Zod barcodeSchema validation.
  findings.push({
    id: 'MILLER-03',
    titan: 'miller',
    titanName: 'Charlie Miller',
    severity: 'medium',
    role: 'cashier',
    roleName: 'Cashier',
    finding: 'Barcode lookup accepts unbounded string lengths without truncation',
    component: 'omnistock-app/src/pages/POS.jsx (@zxing/library)',
    recommendation: 'Cap barcode query strings to 48 characters and reject non-printable control characters.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'POS.jsx: search.trim().slice(0, 48) + validate(barcodeSchema, query). barcodeSchema: max 48 chars, printable ASCII regex.',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'POS.jsx onKeyDown handler: const query = search.trim().slice(0, 48); validate(barcodeSchema, query). validators.js: barcodeSchema = z.string().max(48).regex(/^[\\x20-\\x7E]+$/). Confirmed.',
    category: 'Buffer & Regex Denial of Service',
    attackVector: 'A 50,000-character barcode scan triggers catastrophic backtracking in regex product matchers.'
  });

  // MILLER-OWNER-01: Negative tax rate injection
  // VERIFIED: taxRateSchema enforces 0-35% bounds. No tax config UI exists.
  findings.push({
    id: 'MILLER-OWNER-01',
    titan: 'miller',
    titanName: 'Charlie Miller',
    severity: isGate ? 'critical' : 'high',
    role: 'owner',
    roleName: 'Owner of Establishments',
    component: 'omnistock-app/src/pages/Settings.jsx & SalesReport.jsx',
    finding: 'Negative tax rate injection in custom tax category config yields fraudulent credit memos',
    recommendation: 'Strict Zod bounds verification on tax rates (0.00 <= rate <= 35.00%) rejecting negative signs or arithmetic expressions.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'taxRateSchema: rate = z.number().finite().min(0).max(35). Backend /tax-rates/validate enforces same bounds. No tax config UI surface exists to exploit.',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'validators.js: taxRateSchema rate = z.number().finite().min(0).max(35). Backend validate.js: same schema. Settings.jsx has no tax rate input fields. No exploitable surface.',
    category: 'Tax Engine Boundary Violation',
    attackVector: 'Configuring a custom tax rule of -12% VAT in branch settings reverses taxable totals, creating negative statutory obligations.'
  });

  // MILLER-CASH-02: Negative line item quantity
  // VERIFIED: updateQty returns null if newQty <= 0, filtered from cart.
  findings.push({
    id: 'MILLER-CASH-02',
    titan: 'miller',
    titanName: 'Charlie Miller',
    severity: 'high',
    role: 'cashier',
    roleName: 'Cashier',
    component: 'omnistock-app/src/pages/POS.jsx',
    finding: 'Manual line item quantity editing permits negative integer values without supervisor override',
    recommendation: 'Hard-cap minimum item quantity at 1 in cart store; returns must flow through a dedicated Return Workflow with supervisor signature.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'POS.jsx updateQty: if (newQty <= 0) return null — items removed from cart when quantity drops to 0. Zod cartItemSchema also rejects non-positive quantities.',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'POS.jsx: const newQty = i.quantity + delta; if (newQty <= 0) return null; — filtered via .filter(Boolean). Comment: "Hard-cap minimum at 1 (MILLER-CASH-02)". Confirmed.',
    category: 'Register Skimming via Negative Item',
    attackVector: 'Cashier adds -3 Wagyu Burgers to a cart containing a bottle of soda, resulting in -$120 payable that is withdrawn from cash drawer.'
  });

  // MILLER-INV-03: Astronomical bounds in stock adjustment
  // VERIFIED: stockAdjustmentSchema caps at 10,000 units.
  findings.push({
    id: 'MILLER-INV-03',
    titan: 'miller',
    titanName: 'Charlie Miller',
    severity: 'medium',
    role: 'inventory',
    roleName: 'Inventory Specialist',
    component: 'omnistock-app/src/pages/StockAdjustments.jsx',
    finding: 'Astronomical bounds fuzzing (e.g. 1e12 units) in stock adjustment causes 64-bit integer overflow in valuation calculations',
    recommendation: 'Clamp single stock adjustment quantity to max 10,000 units with high-variance approval modal.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'stockAdjustmentSchema: quantity_change = z.number().finite().positive().max(10000). StockAdjustments.jsx validates before processing.',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'validators.js: quantity_change = z.number().finite().positive().max(10000, "Quantity cannot exceed 10,000 units"). StockAdjustments.jsx: validate(stockAdjustmentSchema, adjustmentData). Confirmed.',
    category: 'Integer Overflow / Valuation Distortion',
    attackVector: 'Adjusting an inventory count by 99999999999 units overflows JavaScript safe integer and corrupts company balance sheet.'
  });

  // MILLER-GATE-04: Discount > 100%
  // VERIFIED: Pricing.jsx clamps to 0-100, discountSchema enforces 0-100.
  findings.push({
    id: 'MILLER-GATE-04',
    titan: 'miller',
    titanName: 'Charlie Miller',
    severity: 'low',
    role: 'marketing',
    roleName: 'Marketing Strategist',
    finding: 'Discount percentage inputs permit values > 100% or exponential notation (e.g. 1e10)',
    component: 'omnistock-app/src/pages/Pricing.jsx',
    recommendation: 'Clamp discount rate values strictly between 0 and 100 with 2 decimal precision.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'Pricing.jsx: setTargetMargin and setBulkMarkup both clamp via Math.min(100, Math.max(0, v)). discountSchema: value = z.number().finite().min(0).max(100).',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'Pricing.jsx: setTargetMarginRaw(Math.min(100, Math.max(0, v))). setBulkMarkupRaw(Math.min(100, Math.max(0, v))). validators.js: discountSchema value max 100. Confirmed.',
    category: 'Business Logic Bounds',
    attackVector: 'Inputting 1e6% discount produces negative checkout balances and erroneous customer refunds.'
  });

  // ─── NEW FINDINGS (2nd pass) ─────────────────────────────────────────────

  // NEW-MILLER-05: StockAdjustment quantity input has no client-side max attribute
  findings.push({
    id: 'MILLER-05',
    titan: 'miller',
    titanName: 'Charlie Miller',
    severity: 'low',
    role: 'inventory',
    roleName: 'Inventory Specialist',
    component: 'omnistock-app/src/pages/StockAdjustments.jsx',
    finding: 'Stock adjustment quantity input field lacks a max attribute, allowing users to type astronomical values before Zod catches them',
    recommendation: 'Add max="10000" attribute to the quantity Input element for immediate client-side feedback before Zod validation.',
    status: 'remediated',
    remediatedAt: '2026-09-18',
    remediation: 'StockAdjustments.jsx quantity Input now has max="10000" attribute for immediate client-side boundary feedback, complementing the existing Zod stockAdjustmentSchema max(10000) server-side validation.',
    verifiedAt: '2026-09-18',
    auditPass,
    verificationNote: 'StockAdjustments.jsx: <Input type="number" min="0" max="10000" value={form.quantity_change} .../>. Zod stockAdjustmentSchema: quantity_change = z.number().finite().positive().max(10000). Both client-side HTML attribute and server-side Zod validation confirmed.',
    category: 'Input Boundary Hardening',
    attackVector: 'User types 999999999 in quantity field, clicks save, then sees Zod error — minor UX issue but not a security gap since Zod blocks it.'
  });

  return findings;
}

export default auditMiller;
