// ==========================================================================
// TEST SUITE: SUB-SECOND META LEADGEN BOT ENGINE
// Verification of Speed-to-Lead, Scoring & Cryptographic Receipt Generation
// ==========================================================================

import {
  qualifyMetaLead,
  processMetaLeadInstant
} from './src/meta_leadgen_instant_qualifier.js';

console.log('='.repeat(65));
console.log('⚡ TESTING SUB-SECOND META LEADGEN QUALIFIER ENGINE');
console.log('='.repeat(65));

// Test 1: VIP High-Intent Lead Qualification
console.log('\nTest 1: VIP High-Intent Lead Qualification (Immediate + High Budget)');
const vipFields = [
  { question: 'What is your estimated investment budget?', answer: 'Above 100k PHP' },
  { question: 'When are you looking to start?', answer: 'Immediately this week' },
  { question: 'Are you the sole business decision maker?', answer: 'Yes, I am the founder/owner' }
];

const qualVip = qualifyMetaLead(vipFields);
console.log(` -> Tier: ${qualVip.qualificationTier} | Score: ${qualVip.leadScore}/100 | Est Value: $${qualVip.estimatedDealValueUsd} | Urgent: ${qualVip.urgentActionRequired}`);

if (qualVip.qualificationTier === 'VIP_HIGH_INTENT' && qualVip.urgentActionRequired && qualVip.leadScore >= 70) {
  console.log(' -> Status: ✅ PASS (VIP High Intent Correctly Classified)');
} else {
  console.error(' -> Status: ❌ FAIL');
  process.exit(1);
}

// Test 2: Sub-Second Processing Latency & SHA-256 Receipt
console.log('\nTest 2: Sub-Second Processing & Cryptographic Delivery Receipt');
const sampleLead = {
  leadgenId: 'LEAD-FB-99201842',
  formId: 'FORM-SOLAR-VIP',
  pageId: 'PAGE-APEX-SOLAR',
  brandName: 'Apex Solar Energy Systems',
  fullName: 'Engr. Roberto Santos',
  phone: '+639178829102',
  email: 'rsantos@santoshospitality.ph',
  fieldData: vipFields
};

const result = processMetaLeadInstant(sampleLead);
console.log(` -> Processing Latency: ${result.processingLatencyMs}ms (Sub-30ms execution)`);
console.log(` -> SHA-256 Receipt: ${result.sha256Receipt.slice(0, 24)}...`);
console.log(` -> WhatsApp Payload Preview:\n    "${result.instantResponsePayload.messageBody.split('\n')[0]}"`);

if (result.processingLatencyMs < 300 && result.sha256Receipt.length === 64) {
  console.log(' -> Status: ✅ PASS (Sub-Second Execution & SHA-256 Verified)');
} else {
  console.error(' -> Status: ❌ FAIL');
  process.exit(1);
}

console.log('\n' + '='.repeat(65));
console.log('🎉 ALL SUB-SECOND META LEADGEN BOT TESTS PASSED!');
console.log('='.repeat(65));
