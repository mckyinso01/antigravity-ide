// ==========================================================================
// META CONVERSIONS API (CAPI) GATEWAY ENGINE
// Compliant with Meta Business Tools Terms, GDPR, CCPA & Graph API v20.0+
// ==========================================================================

import crypto from 'crypto';

/**
 * Normalizes and hashes an email address strictly per Meta CAPI specifications.
 * Rule: Trim leading/trailing whitespace, convert to lowercase, SHA-256 hash.
 * @param {string} email
 * @returns {string} SHA-256 hex string
 */
export function hashEmailForMeta(email) {
  if (!email || typeof email !== 'string') return null;
  const normalized = email.trim().toLowerCase();
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

/**
 * Normalizes and hashes a phone number strictly per Meta CAPI specifications.
 * Rule: Remove all non-digits, include country code (e.g. 639171234567 or 15551234567), SHA-256 hash.
 * @param {string} phone
 * @param {string} [defaultCountryCode='63']
 * @returns {string} SHA-256 hex string
 */
export function hashPhoneForMeta(phone, defaultCountryCode = '63') {
  if (!phone || typeof phone !== 'string') return null;
  let digitsOnly = phone.replace(/\D/g, '');
  
  // Format local PH (09...) to E.164 without plus (639...)
  if (digitsOnly.startsWith('0') && digitsOnly.length === 11) {
    digitsOnly = defaultCountryCode + digitsOnly.substring(1);
  } else if (!digitsOnly.startsWith(defaultCountryCode) && digitsOnly.length === 10) {
    digitsOnly = defaultCountryCode + digitsOnly;
  }

  return crypto.createHash('sha256').update(digitsOnly).digest('hex');
}

/**
 * Normalizes and hashes first/last names or city per Meta CAPI specifications.
 * Rule: Trim whitespace, convert to lowercase, remove punctuation, SHA-256 hash.
 * @param {string} text
 * @returns {string} SHA-256 hex string
 */
export function hashTextForMeta(text) {
  if (!text || typeof text !== 'string') return null;
  const normalized = text.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

/**
 * Builds a 100% Meta Policy-Compliant Conversions API Event Payload.
 * Includes Event Deduplication, Advanced Matching, and Limited Data Use (LDU) flags.
 * 
 * @param {Object} params
 * @param {string} params.eventName - e.g. 'Purchase', 'Lead', 'InitiateCheckout', 'Schedule'
 * @param {string} params.eventId - Unique ID shared between browser pixel & server for deduplication
 * @param {string} params.eventSourceUrl - The page where the conversion occurred
 * @param {Object} params.userData - Raw user data to be normalized & hashed
 * @param {Object} [params.customData] - Value, currency, content_name, order_id, etc.
 * @param {boolean} [params.enableLdu=false] - Limited Data Use for California/CCPA compliance
 * @param {string} [params.testEventCode] - Optional Meta test event code for sandbox verification
 * @returns {Object} Full Graph API v20.0 compliant payload
 */
export function buildMetaCapiPayload({
  eventName,
  eventId,
  eventSourceUrl,
  userData = {},
  customData = {},
  enableLdu = false,
  testEventCode = null
}) {
  if (!eventName || !eventId) {
    throw new Error('Meta CAPI Error: eventName and eventId are mandatory for deduplication.');
  }

  const eventTime = Math.floor(Date.now() / 1000);

  // Advanced Matching Data Layer (Hashed)
  const formattedUserData = {
    em: userData.email ? [hashEmailForMeta(userData.email)] : undefined,
    ph: userData.phone ? [hashPhoneForMeta(userData.phone)] : undefined,
    fn: userData.firstName ? [hashTextForMeta(userData.firstName)] : undefined,
    ln: userData.lastName ? [hashTextForMeta(userData.lastName)] : undefined,
    ct: userData.city ? [hashTextForMeta(userData.city)] : undefined,
    client_ip_address: userData.clientIp || undefined,
    client_user_agent: userData.userAgent || undefined,
    fbc: userData.fbc || undefined, // Click ID from fbclid cookie
    fbp: userData.fbp || undefined  // Browser Pixel ID cookie
  };

  // Clean undefined properties
  Object.keys(formattedUserData).forEach(key => {
    if (formattedUserData[key] === undefined) delete formattedUserData[key];
  });

  const eventRecord = {
    event_name: eventName,
    event_time: eventTime,
    event_id: eventId,
    event_source_url: eventSourceUrl || 'https://linkable.it.com',
    action_source: 'website',
    user_data: formattedUserData,
    custom_data: {
      currency: customData.currency || 'USD',
      value: customData.value !== undefined ? Number(customData.value) : undefined,
      content_name: customData.contentName || undefined,
      content_type: customData.contentType || 'product',
      order_id: customData.orderId || eventId
    }
  };

  // Clean undefined from customData
  Object.keys(eventRecord.custom_data).forEach(key => {
    if (eventRecord.custom_data[key] === undefined) delete eventRecord.custom_data[key];
  });

  const payload = {
    data: [eventRecord]
  };

  // Meta Limited Data Use (LDU) Policy Flag for CCPA Compliance
  if (enableLdu) {
    payload.data_processing_options = ['LDU'];
    payload.data_processing_options_country = 1;
    payload.data_processing_options_state = 1000;
  } else {
    payload.data_processing_options = [];
  }

  if (testEventCode) {
    payload.test_event_code = testEventCode;
  }

  return payload;
}

/**
 * Validates Meta Webhook HMAC SHA-256 Signature (X-Hub-Signature-256).
 * Strictly required by Meta Platform Terms to prevent webhook spoofing.
 * 
 * @param {string} rawBody - Raw unparsed request body string
 * @param {string} signatureHeader - 'sha256=...' header from Meta
 * @param {string} appSecret - Meta App Secret
 * @returns {boolean} True if authentic Meta payload
 */
export function verifyMetaWebhookSignature(rawBody, signatureHeader, appSecret) {
  if (!signatureHeader || !appSecret || !rawBody) return false;

  const parts = signatureHeader.split('=');
  if (parts.length !== 2 || parts[0] !== 'sha256') return false;

  const expectedSignature = crypto
    .createHmac('sha256', appSecret)
    .update(rawBody)
    .digest('hex');

  const receivedSignature = parts[1];
  return crypto.timingSafeEqual(Buffer.from(expectedSignature, 'utf8'), Buffer.from(receivedSignature, 'utf8'));
}
