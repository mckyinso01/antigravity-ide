/**
 * Idempotency utilities for payment processing (GEOHOT-CASH-03, GEOHOT-01).
 * Generates single-use UUIDs and tracks processed keys to prevent double-submission.
 */

const processedKeys = new Set();

/**
 * Generate a new idempotency UUID.
 */
export function generateIdempotencyKey() {
  return crypto.randomUUID();
}

/**
 * Check if an idempotency key has already been processed.
 */
export function isProcessed(key) {
  return processedKeys.has(key);
}

/**
 * Mark an idempotency key as processed.
 */
export function markProcessed(key) {
  processedKeys.add(key);
  // Auto-expire after 5 minutes
  setTimeout(() => processedKeys.delete(key), 5 * 60 * 1000);
}

/**
 * Execute a function with idempotency protection.
 * If the key was already processed, returns the cached result instead of re-executing.
 * @param {string} key - idempotency UUID
 * @param {Function} fn - async function to execute
 * @returns {Promise<any>}
 */
export async function withIdempotency(key, fn) {
  if (isProcessed(key)) {
    throw new Error('Duplicate request blocked by idempotency guard');
  }
  markProcessed(key);
  return fn();
}

/**
 * Debounce a function call (GEOHOT-GATE-04, GEOHOT-CASH-03).
 * Prevents rapid double-clicks on payment buttons.
 */
export function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Lock a button/action — returns true only on first call within the lock window.
 * Prevents double-click payment submission.
 */
let actionLock = false;
export function acquireActionLock() {
  if (actionLock) return false;
  actionLock = true;
  setTimeout(() => { actionLock = false; }, 2000);
  return true;
}

export function releaseActionLock() {
  actionLock = false;
}
