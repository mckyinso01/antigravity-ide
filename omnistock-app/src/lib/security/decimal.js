/**
 * Decimal/integer-cents arithmetic for monetary calculations (GEOHOT-02, GEOHOT-COST-02).
 * Avoids floating-point precision drift by working in integer cents.
 */

/**
 * Convert a float amount to integer cents.
 * ₱16.00 -> 1600, ₱12.50 -> 1250
 */
export function toCents(amount) {
  if (typeof amount !== 'number' || !isFinite(amount)) return 0;
  return Math.round(amount * 100);
}

/**
 * Convert integer cents back to a float amount.
 * 1600 -> 16.00, 1250 -> 12.50
 */
export function fromCents(cents) {
  if (typeof cents !== 'number' || !isFinite(cents)) return 0;
  return cents / 100;
}

/**
 * Add two monetary amounts safely.
 */
export function addMoney(a, b) {
  return fromCents(toCents(a) + toCents(b));
}

/**
 * Subtract two monetary amounts safely.
 */
export function subMoney(a, b) {
  return fromCents(toCents(a) - toCents(b));
}

/**
 * Multiply a monetary amount by a quantity (integer).
 */
export function multiplyMoney(amount, qty) {
  return fromCents(toCents(amount) * Math.round(qty));
}

/**
 * Sum an array of monetary amounts.
 */
export function sumMoney(amounts) {
  if (!Array.isArray(amounts)) return 0;
  const totalCents = amounts.reduce((sum, a) => sum + toCents(a), 0);
  return fromCents(totalCents);
}

/**
 * Fixed-point arithmetic for fractional BOM ingredients (GEOHOT-COST-02).
 * Uses 6 decimal places for micro-ingredients (saffron, spices, truffle).
 */
export function toFixed6(value) {
  if (typeof value !== 'number' || !isFinite(value)) return 0;
  return Math.round(value * 1_000_000) / 1_000_000;
}

export function multiplyFixed6(a, b) {
  return toFixed6(toFixed6(a) * toFixed6(b));
}

export function divideFixed6(a, b) {
  if (b === 0) return 0;
  return toFixed6(toFixed6(a) / toFixed6(b));
}

/**
 * Format cents as a currency string.
 */
export function formatCents(cents) {
  return fromCents(cents).toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
