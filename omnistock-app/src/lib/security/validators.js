/**
 * Client-side input validation utilities using Zod.
 * Centralized schemas matching the backend validation.
 */
import { z } from 'zod';

// ─── Cart item validation (MILLER-01, MILLER-CASH-02) ─────────────────────
export const cartItemSchema = z.object({
  product_id: z.string().min(1),
  product_name: z.string().max(200),
  quantity: z.number().int().positive().finite().max(99999, 'Quantity too large'),
  unit_price: z.number().finite().min(0),
  unit_cost: z.number().finite().min(0).optional(),
  subtotal: z.number().finite().min(0),
  discount: z.number().finite().min(0).default(0),
});

// ─── Stock adjustment validation (MILLER-01, MILLER-INV-03) ───────────────
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

// ─── Tax rate validation (MILLER-OWNER-01) ────────────────────────────────
export const taxRateSchema = z.object({
  name: z.string().min(1).max(100),
  rate: z.number().finite().min(0).max(35, 'Tax rate cannot exceed 35%'),
  is_default: z.boolean().default(false),
});

// ─── Discount validation (MILLER-GATE-04) ────────────────────────────────
export const discountSchema = z.object({
  type: z.enum(['amount', 'percent']),
  value: z.number().finite().min(0).max(100, 'Discount cannot exceed 100%'),
});

// ─── Barcode validation (MILLER-03) ──────────────────────────────────────
export const barcodeSchema = z.string()
  .min(1)
  .max(48, 'Barcode cannot exceed 48 characters')
  .regex(/^[\x20-\x7E]+$/, 'Barcode contains invalid characters');

// ─── Referral code sanitization (MITNICK-03) ────────────────────────────
export const referralCodeSchema = z.string()
  .max(50)
  .regex(/^[A-Za-z0-9_-]*$/, 'Referral code must be alphanumeric')
  .optional();

// ─── Promo code validation (MITNICK-MKT-03) ─────────────────────────────
export const promoCodeSchema = z.string()
  .min(3)
  .max(20)
  .regex(/^[A-Z0-9_-]+$/, 'Promo code must be alphanumeric uppercase');

// ─── Bulk import prototype pollution protection (MILLER-02) ─────────────
export function sanitizeImportKeys(records) {
  if (!Array.isArray(records)) return [];
  const forbidden = ['__proto__', 'constructor', 'prototype'];
  return records.map((record) => {
    const clean = {};
    for (const [key, value] of Object.entries(record)) {
      if (!forbidden.includes(key)) {
        clean[key] = value;
      }
    }
    return clean;
  });
}

// ─── Write-off validation (JACK-INV-03) ──────────────────────────────────
export const writeOffSchema = z.object({
  product_id: z.string().min(1),
  product_name: z.string().max(200),
  quantity_change: z.number().finite().positive().max(10000),
  reason: z.enum(['damaged', 'expired', 'lost', 'theft', 'other']),
  value_estimate: z.number().finite().min(0),
  notes: z.string().max(2000).optional(),
  supervisor_id: z.string().optional(),
  supervisor_signature: z.string().optional(),
}).refine((data) => {
  if (data.value_estimate > 100) {
    return !!data.supervisor_id && !!data.supervisor_signature;
  }
  return true;
}, 'Dual-party sign-off required for write-offs exceeding $100');

/**
 * Validate and return { success, data, error } tuple.
 */
export function validate(schema, value) {
  const result = schema.safeParse(value);
  if (result.success) return { success: true, data: result.data };
  return {
    success: false,
    error: result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; '),
  };
}
