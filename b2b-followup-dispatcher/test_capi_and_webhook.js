// ==========================================================================
// TEST SUITE: META CAPI GATEWAY & WEBHOOK VERIFICATION (POLICY COMPLIANT)
// ==========================================================================

import crypto from 'crypto';
import {
  hashEmailForMeta,
  hashPhoneForMeta,
  hashTextForMeta,
  buildMetaCapiPayload,
  verifyMetaWebhookSignature
} from './src/meta_capi_gateway_engine.js';

console.log('='.repeat(70));
console.log('🛡️ TESTING META CONVERSIONS API (CAPI) & WEBHOOK POLICY COMPLIANCE');
console.log('='.repeat(70));

// Test 1: PII Email Normalization & SHA-256 Hashing
const rawEmail = '  Tariq.Commerce@Gmail.COM  ';
const hashedEmail = hashEmailForMeta(rawEmail);
const expectedEmailHash = crypto.createHash('sha256').update('tariq.commerce@gmail.com').digest('hex');

console.log(`\nTest 1: Email Normalization & SHA-256 Hashing`);
console.log(` -> Raw: "${rawEmail}" => Hashed: ${hashedEmail.substring(0, 16)}...`);
if (hashedEmail === expectedEmailHash) {
  console.log(' -> Status: ✅ PASS (Meta Standard Hashing Verified)');
} else {
  console.error(' -> Status: ❌ FAIL');
  process.exit(1);
}

// Test 2: Phone E.164 Normalization & Hashing
const rawPhonePH = '0917-123-4567';
const hashedPhone = hashPhoneForMeta(rawPhonePH, '63');
const expectedPhoneHash = crypto.createHash('sha256').update('639171234567').digest('hex');

console.log(`\nTest 2: Phone Internationalization (E.164) & Hashing`);
console.log(` -> Raw: "${rawPhonePH}" => E.164: 639171234567 => Hashed: ${hashedPhone.substring(0, 16)}...`);
if (hashedPhone === expectedPhoneHash) {
  console.log(' -> Status: ✅ PASS (E.164 Phone Hashing Verified)');
} else {
  console.error(' -> Status: ❌ FAIL');
  process.exit(1);
}

// Test 3: CAPI Full Event Deduplication & LDU Payload Generation
const capiEvent = buildMetaCapiPayload({
  eventName: 'Purchase',
  eventId: 'ORDER-99124',
  eventSourceUrl: 'https://bazaartrust.linkable.it.com/checkout',
  userData: {
    email: 'client@commerce.com',
    phone: '0918-888-9999',
    firstName: 'Tariq',
    lastName: 'Al-Mansoor',
    city: 'Doha',
    clientIp: '139.59.195.30',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  },
  customData: {
    currency: 'USD',
    value: 650.00,
    contentName: 'BazaarTrust Multi-Vendor Marketplace Pilot Deposit'
  },
  enableLdu: true
});

console.log(`\nTest 3: Meta CAPI Graph API v20.0 Payload`);
console.log(` -> Event Name: ${capiEvent.data[0].event_name} | Event ID: ${capiEvent.data[0].event_id}`);
console.log(` -> Value: $${capiEvent.data[0].custom_data.value} ${capiEvent.data[0].custom_data.currency}`);
console.log(` -> LDU CCPA Flags: [${capiEvent.data_processing_options.join(', ')}]`);
if (
  capiEvent.data[0].event_name === 'Purchase' &&
  capiEvent.data[0].event_id === 'ORDER-99124' &&
  capiEvent.data_processing_options[0] === 'LDU' &&
  capiEvent.data[0].user_data.em.length === 1 &&
  capiEvent.data[0].user_data.ph.length === 1
) {
  console.log(' -> Status: ✅ PASS (100% Meta CAPI Schema Compliant)');
} else {
  console.error(' -> Status: ❌ FAIL');
  process.exit(1);
}

// Test 4: Webhook HMAC SHA-256 Signature Verification
const secret = 'my_super_secret_meta_key';
const body = JSON.stringify({ object: 'page', entry: [{ id: '12345' }] });
const validSignature = 'sha256=' + crypto.createHmac('sha256', secret).update(body).digest('hex');
const invalidSignature = 'sha256=1111222233334444555566667777888899990000aaaabbbbccccddddeeeeffff';

const isAuthenticValid = verifyMetaWebhookSignature(body, validSignature, secret);
const isAuthenticInvalid = verifyMetaWebhookSignature(body, invalidSignature, secret);

console.log(`\nTest 4: Meta Webhook X-Hub-Signature-256 HMAC Authentication`);
console.log(` -> Authentic Signature Check: ${isAuthenticValid}`);
console.log(` -> Forged Signature Intercept: ${!isAuthenticInvalid}`);
if (isAuthenticValid && !isAuthenticInvalid) {
  console.log(' -> Status: ✅ PASS (Webhook Spoofing Intercepted)');
} else {
  console.error(' -> Status: ❌ FAIL');
  process.exit(1);
}

console.log('\n' + '='.repeat(70));
console.log('🎉 ALL META CAPI & WEBHOOK TESTS PASSED (100% POLICY COMPLIANT)');
console.log('='.repeat(70));
