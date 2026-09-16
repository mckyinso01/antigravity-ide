import dns from 'dns';
import net from 'net';

const dnsPromises = dns.promises;
dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', '10minutemail.com', 'guerrillamail.com', 'sharklasers.com',
  'temp-mail.org', 'yopmail.com', 'trashmail.com', 'dispostable.com',
  'getairmail.com', 'throwawaymail.com', 'fakemailgenerator.com', 'inboxkitten.com'
]);

const UNMONITORED_ROLES = new Set([
  'noreply', 'no-reply', 'donotreply', 'billing-notifications', 'alerts', 'bounce'
]);

/**
 * Validates syntax, disposable domains, role accounts, and live DNS MX records.
 * Generates an objective Quality Score (0 - 100) and channel routing advice.
 * @param {string} email
 * @returns {Promise<{isValid: boolean, score: number, route: 'DIRECT_EMAIL'|'ROUTE_TO_SOCIAL_OUTREACH', reason: string, mxHost?: string}>}
 */
export async function verifyEmailPreFlight(email) {
  if (!email || typeof email !== 'string') {
    return { isValid: false, score: 0, route: 'ROUTE_TO_SOCIAL_OUTREACH', reason: 'EMPTY_EMAIL' };
  }

  const cleanEmail = email.trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(cleanEmail)) {
    return { isValid: false, score: 0, route: 'ROUTE_TO_SOCIAL_OUTREACH', reason: 'INVALID_SYNTAX' };
  }

  const parts = cleanEmail.split('@');
  const user = parts[0];
  const domain = parts[1];

  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { isValid: false, score: 10, route: 'ROUTE_TO_SOCIAL_OUTREACH', reason: 'DISPOSABLE_DOMAIN' };
  }

  if (UNMONITORED_ROLES.has(user)) {
    return { isValid: false, score: 20, route: 'ROUTE_TO_SOCIAL_OUTREACH', reason: 'UNMONITORED_ROLE' };
  }

  try {
    const startTime = Date.now();
    const mxRecords = await dnsPromises.resolveMx(domain);
    const latencyMs = Date.now() - startTime;

    if (!mxRecords || mxRecords.length === 0) {
      return { isValid: false, score: 15, route: 'ROUTE_TO_SOCIAL_OUTREACH', reason: 'NO_MX_RECORDS' };
    }

    mxRecords.sort((a, b) => a.priority - b.priority);
    const primaryMx = mxRecords[0].exchange;

    // Quality Scoring calculation
    let score = 90; // baseline for valid MX
    if (mxRecords.length >= 2) score += 5; // redundant mail exchangers
    if (latencyMs < 300) score += 5; // responsive DNS

    // Detect generic info@ or contact@ vs personal named email
    const isNamedAccount = !['info', 'contact', 'admin', 'sales', 'support', 'help', 'service', 'inquiries'].includes(user);
    if (!isNamedAccount) {
      score -= 15; // penalize generic inboxes because they convert poorly
    }

    return {
      isValid: true,
      score,
      route: score >= 75 ? 'DIRECT_EMAIL' : 'ROUTE_TO_SOCIAL_OUTREACH',
      reason: isNamedAccount ? 'VERIFIED_NAMED_MX' : 'VERIFIED_GENERIC_ROLE_MX',
      mxHost: primaryMx,
      totalMx: mxRecords.length,
      dnsLatencyMs: latencyMs
    };
  } catch (err) {
    if (err.code === 'ENOTFOUND' || err.code === 'ENODATA') {
      return { isValid: false, score: 0, route: 'ROUTE_TO_SOCIAL_OUTREACH', reason: 'DOMAIN_NOT_FOUND' };
    }
    return { isValid: false, score: 25, route: 'ROUTE_TO_SOCIAL_OUTREACH', reason: `DNS_ERROR: ${err.code || err.message}` };
  }
}

