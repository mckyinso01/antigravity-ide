import { verifyToken } from '../services/jwt.js';
import { config } from '../config/env.js';

/**
 * JWT authentication middleware.
 * Extracts token from HTTP-only cookie or Authorization header.
 * Attaches req.user with { email, role, name }.
 */
export function authRequired(req, res, next) {
  const token = req.cookies?.[config.jwt.cookieName]
    || (req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.slice(7)
      : null);

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const { valid, payload, reason } = verifyToken(token);
  if (!valid) {
    return res.status(401).json({ error: reason || 'Invalid token' });
  }

  req.user = payload;
  next();
}

/**
 * Optional auth — attaches user if token is valid, but doesn't block.
 */
export function optionalAuth(req, res, next) {
  const token = req.cookies?.[config.jwt.cookieName]
    || (req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.slice(7)
      : null);

  if (token) {
    const { valid, payload } = verifyToken(token);
    if (valid) req.user = payload;
  }
  next();
}
