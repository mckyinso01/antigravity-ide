import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { isTokenRevoked, revokeToken } from './revocation.js';

/**
 * Issue a JWT token for an authenticated user.
 * @param {object} payload - { email, role, name }
 * @returns {string} signed JWT
 */
export function issueToken(payload) {
  return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
}

/**
 * Verify a JWT token and check revocation list.
 * @param {string} token
 * @returns {{ valid: boolean, payload?: object, reason?: string }}
 */
export function verifyToken(token) {
  try {
    const payload = jwt.verify(token, config.jwt.secret);
    if (isTokenRevoked(token)) {
      return { valid: false, reason: 'Token has been revoked' };
    }
    return { valid: true, payload };
  } catch (err) {
    return { valid: false, reason: err.message };
  }
}

/**
 * Revoke a token (logout). Adds its jti/exp to the revocation list.
 * @param {string} token
 */
export function revokeJwt(token) {
  revokeToken(token);
}

/**
 * Decode token without verification (for extracting jti on logout).
 */
export function decodeToken(token) {
  return jwt.decode(token);
}
