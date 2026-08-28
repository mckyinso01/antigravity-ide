import dns from 'dns';
import net from 'net';

const dnsPromises = dns.promises;
dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', '10minutemail.com', 'guerrillamail.com', 'sharklasers.com',
  'temp-mail.org', 'yopmail.com', 'trashmail.com', 'dispostable.com'
]);

/**
 * Validates syntax, disposable domains, and live DNS MX records.
 * @param {string} email
 * @returns {Promise<{isValid: boolean, reason: string, mxHost?: string}>}
 */
export async function verifyEmailPreFlight(email) {
  if (!email || typeof email !== 'string') {
    return { isValid: false, reason: 'EMPTY_EMAIL' };
  }

  const cleanEmail = email.trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(cleanEmail)) {
    return { isValid: false, reason: 'INVALID_SYNTAX' };
  }

  const parts = cleanEmail.split('@');
  const user = parts[0];
  const domain = parts[1];

  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { isValid: false, reason: 'DISPOSABLE_DOMAIN' };
  }

  // Common blackhole/role-only dummy filters if unmonitored
  if (user === 'noreply' || user === 'no-reply' || user === 'donotreply') {
    return { isValid: false, reason: 'UNMONITORED_NO_REPLY' };
  }

  try {
    const mxRecords = await dnsPromises.resolveMx(domain);
    if (!mxRecords || mxRecords.length === 0) {
      return { isValid: false, reason: 'NO_MX_RECORDS' };
    }

    mxRecords.sort((a, b) => a.priority - b.priority);
    const primaryMx = mxRecords[0].exchange;

    return {
      isValid: true,
      reason: 'VERIFIED_ACTIVE_MX',
      mxHost: primaryMx,
      totalMx: mxRecords.length
    };
  } catch (err) {
    if (err.code === 'ENOTFOUND' || err.code === 'ENODATA') {
      return { isValid: false, reason: 'DOMAIN_NOT_FOUND' };
    }
    return { isValid: false, reason: `DNS_ERROR: ${err.code || err.message}` };
  }
}
