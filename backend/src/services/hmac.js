import crypto from 'crypto';
import { config } from '../config/env.js';

/**
 * HMAC-SHA256 signing service for receipts and void tokens.
 * Used for Merkle hash chaining (JACK-OWNER-01) and single-use void token signing (JACK-MGR-02).
 */

/**
 * Sign arbitrary data with HMAC-SHA256.
 * @param {string} data
 * @returns {string} hex digest
 */
export function sign(data) {
  return crypto
    .createHmac('sha256', config.hmac.secret)
    .update(data)
    .digest('hex');
}

/**
 * Verify a signature against data.
 * @param {string} data
 * @param {string} signature
 * @returns {boolean}
 */
export function verify(data, signature) {
  const expected = sign(data);
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, 'hex'),
      Buffer.from(signature, 'hex'),
    );
  } catch {
    return false;
  }
}

/**
 * Generate a single-use void token signed with HMAC.
 * Includes a UUID and timestamp window for replay protection.
 * @param {string} transactionId
 * @returns {{ token: string, uuid: string, timestamp: number, expiresAt: number }}
 */
export function generateVoidToken(transactionId) {
  const uuid = crypto.randomUUID();
  const timestamp = Date.now();
  const expiresAt = timestamp + 24 * 60 * 60 * 1000; // 24 hours
  const payload = `${transactionId}:${uuid}:${timestamp}`;
  const signature = sign(payload);
  return { token: `${payload}.${signature}`, uuid, timestamp, expiresAt };
}

/**
 * Verify a void token and check it hasn't expired (>24h).
 * @param {string} token
 * @param {string} transactionId
 * @returns {{ valid: boolean, reason?: string }}
 */
export function verifyVoidToken(token, transactionId) {
  const parts = token.split('.');
  if (parts.length !== 4) return { valid: false, reason: 'Malformed token' };

  const [txId, uuid, ts, sig] = parts;
  const payload = `${txId}:${uuid}:${ts}`;

  if (!verify(payload, sig)) return { valid: false, reason: 'Invalid signature' };
  if (txId !== transactionId) return { valid: false, reason: 'Transaction ID mismatch' };

  const timestamp = parseInt(ts, 10);
  if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
    return { valid: false, reason: 'Token expired (>24h)' };
  }

  return { valid: true };
}

/**
 * Compute a Merkle-style hash chain for receipts.
 * Each receipt hash includes the previous receipt's hash, creating an immutable chain.
 * @param {object} receipt - receipt data
 * @param {string|null} previousHash - hash of the previous receipt in sequence
 * @returns {string} hash of this receipt
 */
export function computeReceiptHash(receipt, previousHash = null) {
  const receiptData = JSON.stringify({
    id: receipt.id,
    transaction_number: receipt.transaction_number,
    total_amount: receipt.total_amount,
    payment_method: receipt.payment_method,
    timestamp: receipt.created_date,
    previous_hash: previousHash,
  });
  return crypto.createHash('sha256').update(receiptData).digest('hex');
}
