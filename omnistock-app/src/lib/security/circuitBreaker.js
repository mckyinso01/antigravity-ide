/**
 * Circuit breaker for Base44 SDK calls (JACK-01).
 * Wraps async calls with exponential backoff retry, timeout, and offline fallback.
 */

const MAX_RETRIES = 3;
const TIMEOUT_MS = 3000;
const BASE_DELAY_MS = 500;

/**
 * Sleep helper.
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Execute an async function with circuit breaker protection.
 * @param {Function} fn - async function to execute
 * @param {any} fallback - value to return if all retries fail
 * @returns {Promise<any>}
 */
export async function withCircuitBreaker(fn, fallback = null) {
  let lastError = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const result = await Promise.race([
        fn(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), TIMEOUT_MS),
        ),
      ]);
      return result;
    } catch (err) {
      lastError = err;
      if (attempt < MAX_RETRIES - 1) {
        const delay = BASE_DELAY_MS * Math.pow(2, attempt); // 500ms, 1s, 2s
        await sleep(delay);
      }
    }
  }

  console.warn('[CircuitBreaker] All retries exhausted, using fallback:', lastError?.message);
  return fallback;
}

/**
 * Check if the app is online.
 */
export function isOnline() {
  return navigator.onLine;
}

/**
 * Execute with offline fallback — tries the cloud call, falls back to local Dexie.
 * @param {Function} cloudFn - async cloud API call
 * @param {Function} localFn - async local fallback
 * @returns {Promise<any>}
 */
export async function withOfflineFallback(cloudFn, localFn) {
  if (!isOnline()) {
    return localFn();
  }
  return withCircuitBreaker(cloudFn, localFn());
}
