/**
 * Storage quota monitor for IndexedDB (JACK-GATE-04).
 * Queries navigator.storage.estimate() and triggers pruning at 80% quota.
 */

const QUOTA_THRESHOLD = 0.80; // 80%

/**
 * Check current storage usage.
 * @returns {Promise<{ usage: number, quota: number, percentage: number }>}
 */
export async function checkStorageQuota() {
  if (!navigator.storage?.estimate) {
    return { usage: 0, quota: 0, percentage: 0 };
  }
  const estimate = await navigator.storage.estimate();
  const usage = estimate.usage || 0;
  const quota = estimate.quota || 0;
  const percentage = quota > 0 ? usage / quota : 0;
  return { usage, quota, percentage };
}

/**
 * Check if storage is near quota and trigger pruning if needed.
 * @param {Function} pruneFn - async function to prune old data
 * @returns {Promise<{ pruned: boolean, percentage: number }>}
 */
export async function monitorAndPrune(pruneFn) {
  const { percentage } = await checkStorageQuota();
  if (percentage >= QUOTA_THRESHOLD) {
    console.warn(`[StorageMonitor] Quota at ${(percentage * 100).toFixed(1)}%, pruning old data...`);
    if (pruneFn) await pruneFn();
    return { pruned: true, percentage };
  }
  return { pruned: false, percentage };
}

/**
 * Wipe canvas memory after PDF generation (KAMKAR-GATE-04).
 * @param {HTMLCanvasElement} canvas
 */
export function wipeCanvas(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  // Remove from DOM to allow GC
  if (canvas.parentNode) {
    canvas.parentNode.removeChild(canvas);
  }
}
