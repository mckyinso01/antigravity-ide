/**
 * Client-side AES-GCM encryption via Web Crypto API (KAMKAR-01, KAMKAR-OWNER-01).
 * Encrypts sensitive PII before writing to Dexie IndexedDB.
 */

let cryptoKey = null;

async function getKey() {
  if (cryptoKey) return cryptoKey;

  // Derive key from a stable passphrase (dev). In production, key comes from backend.
  const passphrase = 'omnistock-client-encryption-v1';
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey'],
  );

  cryptoKey = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: enc.encode('omnistock-salt'), iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );

  return cryptoKey;
}

/**
 * Encrypt a plaintext string using AES-GCM.
 * @param {string} plaintext
 * @returns {Promise<string>} base64 encoded (iv:ciphertext)
 */
export async function encryptPII(plaintext) {
  if (!plaintext) return null;
  const key = await getKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const enc = new TextEncoder();
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(plaintext),
  );

  // Combine iv + ciphertext
  const combined = new Uint8Array(iv.length + ciphertext.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(ciphertext), iv.length);

  // Convert to base64
  return btoa(String.fromCharCode(...combined));
}

/**
 * Decrypt an encrypted PII value.
 * @param {string} encryptedB64
 * @returns {Promise<string>} plaintext
 */
export async function decryptPII(encryptedB64) {
  if (!encryptedB64) return null;
  const key = await getKey();
  const combined = Uint8Array.from(atob(encryptedB64), (c) => c.charCodeAt(0));
  const iv = combined.slice(0, 12);
  const ciphertext = combined.slice(12);

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext,
  );

  return new TextDecoder().decode(decrypted);
}

/**
 * Check if a value is encrypted (base64 blob with iv prefix).
 */
export function isEncrypted(value) {
  if (!value || typeof value !== 'string') return false;
  try {
    const decoded = atob(value);
    return decoded.length >= 12;
  } catch {
    return false;
  }
}
