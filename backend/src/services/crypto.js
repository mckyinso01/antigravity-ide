import crypto from 'crypto';

/**
 * Server-side encryption utilities for sensitive PII.
 * Uses AES-256-GCM for authenticated encryption.
 * In production, the key comes from environment; in dev, a derived key is used.
 */

const ENCRYPTION_KEY = process.env.PII_ENCRYPTION_KEY
  ? Buffer.from(process.env.PII_ENCRYPTION_KEY, 'hex')
  : crypto.scryptSync('omnistock-dev-key', 'salt', 32);

const ALGORITHM = 'aes-256-gcm';

/**
 * Encrypt a plaintext string.
 * @param {string} plaintext
 * @returns {string} base64-encoded encrypted blob (iv:authTag:ciphertext)
 */
export function encrypt(plaintext) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([iv, authTag, encrypted]).toString('base64');
}

/**
 * Decrypt an encrypted blob.
 * @param {string} encryptedB64
 * @returns {string} plaintext
 */
export function decrypt(encryptedB64) {
  const buf = Buffer.from(encryptedB64, 'base64');
  const iv = buf.subarray(0, 12);
  const authTag = buf.subarray(12, 28);
  const ciphertext = buf.subarray(28);
  const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  decipher.setAuthTag(authTag);
  return decipher.update(ciphertext, undefined, 'utf8') + decipher.final('utf8');
}

/**
 * Mask a phone number: 09171234567 -> 0917***4567
 */
export function maskPhone(phone) {
  if (!phone || phone.length < 7) return phone;
  return phone.slice(0, 4) + '***' + phone.slice(-4);
}

/**
 * Mask an email: juan@example.com -> ju***@example.com
 */
export function maskEmail(email) {
  if (!email || !email.includes('@')) return email;
  const [name, domain] = email.split('@');
  return name.slice(0, 2) + '***@' + domain;
}
