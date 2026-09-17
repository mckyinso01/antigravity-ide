/**
 * Zod validation middleware factory.
 * Usage: router.post('/checkout', validateBody(posCheckoutSchema), handler)
 */
import { z } from 'zod';

export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: result.error.issues.map((i) => ({
          path: i.path.join('.'),
          message: i.message,
        })),
      });
    }
    req.validatedBody = result.data;
    next();
  };
}

export function validateQuery(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({
        error: 'Query validation failed',
        details: result.error.issues.map((i) => ({
          path: i.path.join('.'),
          message: i.message,
        })),
      });
    }
    req.validatedQuery = result.data;
    next();
  };
}

// ─── Shared Zod Schemas ──────────────────────────────────────────────────

/** POS cart line item — rejects negative, NaN, Infinity, non-integer */
export const cartItemSchema = z.object({
  product_id: z.string().min(1),
  product_name: z.string().max(200),
  quantity: z.number().int().positive().finite().max(99999),
  unit_price: z.number().finite().min(0),
  unit_cost: z.number().finite().min(0).optional(),
  subtotal: z.number().finite().min(0),
  discount: z.number().finite().min(0).default(0),
});

/** POS checkout / transaction */
export const posCheckoutSchema = z.object({
  transaction_number: z.string().min(1).max(50),
  type: z.enum(['sale', 'refund', 'void']).default('sale'),
  items: z.array(cartItemSchema).min(1),
  subtotal: z.number().finite().min(0),
  discount_amount: z.number().finite().min(0).default(0),
  tax_amount: z.number().finite().min(0).default(0),
  total_amount: z.number().finite().min(0),
  amount_tendered: z.number().finite().min(0).optional(),
  change_amount: z.number().finite().min(0).default(0),
  payment_method: z.string().min(1),
  payment_details: z.string().optional(),
  customer_name: z.string().max(200).optional(),
  status: z.enum(['completed', 'pending', 'voided', 'refunded']).default('completed'),
  idempotency_key: z.string().uuid().optional(),
});

/** Stock adjustment — rejects negative, NaN, astronomical values */
export const stockAdjustmentSchema = z.object({
  product_id: z.string().min(1),
  product_name: z.string().max(200),
  adjustment_type: z.enum(['add', 'subtract', 'set']),
  quantity_before: z.number().finite().min(0).default(0),
  quantity_change: z.number().finite().positive().max(10000, 'Quantity cannot exceed 10,000 units'),
  quantity_after: z.number().finite().min(0).default(0),
  reason: z.enum(['restock', 'damaged', 'expired', 'lost', 'theft', 'correction', 'returned', 'other']),
  notes: z.string().max(2000).optional(),
});

/** Tax rate — strict bounds 0-35% */
export const taxRateSchema = z.object({
  name: z.string().min(1).max(100),
  rate: z.number().finite().min(0).max(35, 'Tax rate cannot exceed 35%'),
  is_default: z.boolean().default(false),
});

/** Discount / promo — clamped 0-100% */
export const discountSchema = z.object({
  type: z.enum(['amount', 'percent']),
  value: z.number().finite().min(0).max(100, 'Discount cannot exceed 100%'),
});

/** Barcode lookup — capped at 48 chars, printable only */
export const barcodeLookupSchema = z.object({
  barcode: z.string()
    .min(1)
    .max(48, 'Barcode cannot exceed 48 characters')
    .regex(/^[\x20-\x7E]+$/, 'Barcode contains invalid characters'),
});

/** Referral code — alphanumeric whitelist only */
export const referralCodeSchema = z.object({
  ref: z.string()
    .max(50)
    .regex(/^[A-Za-z0-9_-]*$/, 'Referral code must be alphanumeric')
    .optional(),
});

/** Bulk import — sanitize keys to reject prototype pollution */
export const bulkImportSchema = z.object({
  records: z.array(z.record(z.string(), z.unknown())).max(50000),
}).refine((data) => {
  // Reject any record containing __proto__, constructor, or prototype keys
  for (const record of data.records) {
    for (const key of Object.keys(record)) {
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        return false;
      }
    }
  }
  return true;
}, 'Import contains forbidden keys (__proto__, constructor, prototype)');

/** Customer PII — for server-side validation before encryption */
export const customerSchema = z.object({
  name: z.string().min(1).max(200),
  phone: z.string().max(20).optional(),
  email: z.string().email().max(200).optional(),
  address: z.string().max(500).optional(),
  loyalty_points: z.number().int().min(0).default(0),
  status: z.enum(['active', 'inactive']).default('active'),
});

/** Promo code — alphanumeric whitelist, 3-20 chars */
export const promoCodeSchema = z.object({
  code: z.string()
    .min(3)
    .max(20)
    .regex(/^[A-Z0-9_-]+$/, 'Promo code must be alphanumeric uppercase'),
});

/** Void token verification */
export const voidTokenSchema = z.object({
  transaction_id: z.string().min(1),
  token: z.string().min(1),
});

/** Write-off sign-off — dual party for amounts > $100 */
export const writeOffSchema = z.object({
  product_id: z.string().min(1),
  product_name: z.string().max(200),
  quantity_change: z.number().finite().positive().max(10000),
  reason: z.enum(['damaged', 'expired', 'lost', 'theft', 'other']),
  value_estimate: z.number().finite().min(0),
  notes: z.string().max(2000).optional(),
  // Required if value_estimate > 100
  supervisor_id: z.string().optional(),
  supervisor_signature: z.string().optional(),
}).refine((data) => {
  if (data.value_estimate > 100) {
    return !!data.supervisor_id && !!data.supervisor_signature;
  }
  return true;
}, 'Dual-party sign-off required for write-offs exceeding $100');
