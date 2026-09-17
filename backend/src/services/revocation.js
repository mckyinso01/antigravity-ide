/**
 * In-memory token revocation list.
 * In production this would be Redis or a DB; for dev/dev-prod this is sufficient.
 * Tokens are stored with their expiry timestamp and pruned periodically.
 */

const revokedTokens = new Map(); // token -> exp (ms)

/** Prune expired entries every 5 minutes */
setInterval(() => {
  const now = Date.now();
  for (const [token, exp] of revokedTokens) {
    if (exp <= now) revokedTokens.delete(token);
  }
}, 5 * 60 * 1000).unref?.();

export function revokeToken(token) {
  // Store with a default 8h expiry if we can't decode
  revokedTokens.set(token, Date.now() + 8 * 60 * 60 * 1000);
}

export function isTokenRevoked(token) {
  return revokedTokens.has(token);
}

export function getRevokedCount() {
  return revokedTokens.size;
}
