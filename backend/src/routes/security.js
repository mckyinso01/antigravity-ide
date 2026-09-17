import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { requireRole, requireStepUp, filterFieldsByRole, filterListFieldsByRole } from '../middleware/rbac.js';
import { computeReceiptHash, generateVoidToken, verifyVoidToken } from '../services/hmac.js';
import { encrypt, decrypt, maskPhone, maskEmail } from '../services/crypto.js';
import {
  validateBody,
  posCheckoutSchema,
  stockAdjustmentSchema,
  taxRateSchema,
  discountSchema,
  barcodeLookupSchema,
  bulkImportSchema,
  customerSchema,
  promoCodeSchema,
  voidTokenSchema,
  writeOffSchema,
} from '../middleware/validate.js';

const router = Router();

// ─── Receipts (Merkle hash chain) ────────────────────────────────────────

// In-memory receipt chain (dev). Production: DB.
let lastReceiptHash = null;
const receiptChain = [];

router.post('/receipts/sign', authRequired, validateBody(posCheckoutSchema), (req, res) => {
  const txn = req.validatedBody;
  const receipt = {
    id: crypto.randomUUID(),
    transaction_number: txn.transaction_number,
    total_amount: txn.total_amount,
    payment_method: txn.payment_method,
    created_date: new Date().toISOString(),
  };

  const hash = computeReceiptHash(receipt, lastReceiptHash);
  receipt.hash = hash;
  receipt.previous_hash = lastReceiptHash;
  lastReceiptHash = hash;
  receiptChain.push(receipt);

  res.json({ receipt, hash, sequence: receiptChain.length });
});

router.get('/receipts/verify', authRequired, (req, res) => {
  // Verify chain integrity
  let prevHash = null;
  const broken = [];
  for (let i = 0; i < receiptChain.length; i++) {
    const r = receiptChain[i];
    const expected = computeReceiptHash(r, prevHash);
    if (r.hash !== expected) broken.push(r.id);
    prevHash = r.hash;
  }
  res.json({ total: receiptChain.length, broken_count: broken.length, broken_ids: broken });
});

// ─── Void Tokens (single-use, 24h window) ───────────────────────────────

const usedVoidTokens = new Set();

router.post('/voids/generate', authRequired, (req, res) => {
  const { transaction_id } = req.body;
  if (!transaction_id) return res.status(400).json({ error: 'Transaction ID required' });
  const tokenData = generateVoidToken(transaction_id);
  res.json(tokenData);
});

router.post('/voids/verify', authRequired, validateBody(voidTokenSchema), (req, res) => {
  const { transaction_id, token } = req.validatedBody;

  if (usedVoidTokens.has(token)) {
    return res.status(409).json({ error: 'Void token already used (replay detected)' });
  }

  const { valid, reason } = verifyVoidToken(token, transaction_id);
  if (!valid) return res.status(400).json({ error: reason });

  usedVoidTokens.add(token);
  res.json({ valid: true, message: 'Void authorized' });
});

// ─── Customer PII (encrypt + mask) ───────────────────────────────────────

router.post('/customers', authRequired, validateBody(customerSchema), (req, res) => {
  const data = req.validatedBody;
  const encrypted = {
    ...data,
    phone_enc: data.phone ? encrypt(data.phone) : undefined,
    email_enc: data.email ? encrypt(data.email) : undefined,
    phone: data.phone ? maskPhone(data.phone) : undefined,
    email: data.email ? maskEmail(data.email) : undefined,
  };
  res.json(encrypted);
});

router.post('/customers/decrypt', authRequired, requireRole('owner', 'admin', 'manager'), (req, res) => {
  const { phone_enc, email_enc } = req.body;
  res.json({
    phone: phone_enc ? decrypt(phone_enc) : null,
    email: email_enc ? decrypt(email_enc) : null,
  });
});

// ─── Tax Rate Validation ─────────────────────────────────────────────────

router.post('/tax-rates/validate', authRequired, requireRole('owner', 'admin'), requireStepUp, validateBody(taxRateSchema), (req, res) => {
  res.json({ valid: true, data: req.validatedBody });
});

// ─── Discount Validation ─────────────────────────────────────────────────

router.post('/discounts/validate', authRequired, validateBody(discountSchema), (req, res) => {
  res.json({ valid: true, data: req.validatedBody });
});

// ─── Barcode Lookup ─────────────────────────────────────────────────────

router.post('/barcode/lookup', authRequired, validateBody(barcodeLookupSchema), (req, res) => {
  res.json({ valid: true, barcode: req.validatedBody.barcode });
});

// ─── Bulk Import (prototype pollution protection) ───────────────────────

router.post('/import/validate', authRequired, requireRole('inventory', 'owner', 'admin'), validateBody(bulkImportSchema), (req, res) => {
  res.json({ valid: true, count: req.validatedBody.records.length });
});

// ─── Promo Code Validation ──────────────────────────────────────────────

router.post('/promo/validate', authRequired, validateBody(promoCodeSchema), (req, res) => {
  res.json({ valid: true, code: req.validatedBody.code });
});

// ─── Stock Adjustment ───────────────────────────────────────────────────

router.post('/stock-adjustments/validate', authRequired, validateBody(stockAdjustmentSchema), (req, res) => {
  res.json({ valid: true, data: req.validatedBody });
});

// ─── Write-off (dual-party sign-off) ─────────────────────────────────────

router.post('/writeoffs/validate', authRequired, requireStepUp, validateBody(writeOffSchema), (req, res) => {
  res.json({ valid: true, data: req.validatedBody, requires_dual_signoff: req.validatedBody.value_estimate > 100 });
});

// ─── ABAC field filtering demo ───────────────────────────────────────────

router.post('/products/filter', authRequired, (req, res) => {
  const { records } = req.body;
  if (!Array.isArray(records)) return res.status(400).json({ error: 'records array required' });
  const filtered = filterListFieldsByRole(req.user.role, records);
  res.json({ filtered });
});

export default router;
