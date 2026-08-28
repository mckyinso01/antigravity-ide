// ==========================================================================
// TEST SUITE: META MCP 15-MINUTE SNIPER ENGINE
// Automated Grievance Ingestion & Weapon Matching Verification
// ==========================================================================

import {
  matchGrievanceToWeapon,
  generateSniperPitch
} from './meta_mcp_sniper_engine.js';

console.log('='.repeat(65));
console.log('🎯 TESTING META MCP 15-MINUTE SNIPER REVENUE ENGINE');
console.log('='.repeat(65));

// Test 1: Car Dealership Grievance Matching
console.log('\nTest 1: Car Dealership Grievance');
const post1 = "Looking for someone to build a car dealership used car inventory and fleet tracking web app. Need lot aging tracking and mechanic dispatch.";
const match1 = matchGrievanceToWeapon(post1);
console.log(` -> Matched: ${match1.matchedWeapon.title} (Confidence: ${match1.confidenceScore}%) | Keywords: ${match1.matchingKeywords.join(', ')}`);
if (match1.matchedWeapon.weaponId === 'APEX_AUTOTECH') {
  console.log(' -> Status: ✅ PASS (Matched Apex AutoTech Flagship)');
} else {
  console.error(' -> Status: ❌ FAIL');
  process.exit(1);
}

// Test 2: Multi-Vendor Marketplace Grievance Matching
console.log('\nTest 2: Multi-Vendor Marketplace Grievance');
const post2 = "Need a full stack developer for our multi-vendor marketplace platform with vendor commission payouts and buyer escrow.";
const match2 = matchGrievanceToWeapon(post2);
console.log(` -> Matched: ${match2.matchedWeapon.title} (Confidence: ${match2.confidenceScore}%) | Keywords: ${match2.matchingKeywords.join(', ')}`);
if (match2.matchedWeapon.weaponId === 'BAZAAR_TRUST') {
  console.log(' -> Status: ✅ PASS (Matched BazaarTrust Flagship)');
} else {
  console.error(' -> Status: ❌ FAIL');
  process.exit(1);
}

// Test 3: Meta Ad Fatigue CRO Grievance Matching
console.log('\nTest 3: Meta Ad Fatigue & High CPC Grievance');
const post3 = "Our Meta ads CPC is getting so high and ad fatigue is killing our Shopify conversion rate and CVR. Need creative fix.";
const match3 = matchGrievanceToWeapon(post3);
console.log(` -> Matched: ${match3.matchedWeapon.title} (Confidence: ${match3.confidenceScore}%) | Keywords: ${match3.matchingKeywords.join(', ')}`);
if (match3.matchedWeapon.weaponId === 'SACCADE_CRO') {
  console.log(' -> Status: ✅ PASS (Matched Saccade-UI CRO Flagship)');
} else {
  console.error(' -> Status: ❌ FAIL');
  process.exit(1);
}

// Test 4: End-to-End Sniper Pitch Generation
console.log('\nTest 4: Instant Sniper Pitch & Escrow Contract Generation');
const leadSample = {
  clientName: "David Sterling",
  company: "Sterling Motors",
  platformSource: "Facebook Group: Used Car Dealers Network",
  grievance: "Looking for an automotive inventory and used car lot aging tracker with OBD-II mechanic inspection logs."
};
const pitch = generateSniperPitch(leadSample);
console.log(` -> Proposal Ref: ${pitch.proposalRef} | Target Subdomain: ${pitch.tailoredSubdomain} | Deposit: $${pitch.pilotDeposit}`);
if (pitch.tailoredSubdomain === 'https://sterlingmotors.linkable.it.com' && pitch.pilotDeposit === 650) {
  console.log(' -> Status: ✅ PASS (End-to-End Proposal & Subdomain Generated)');
} else {
  console.error(' -> Status: ❌ FAIL');
  process.exit(1);
}

console.log('\n' + '='.repeat(65));
console.log('🎉 ALL 15-MINUTE SNIPER ENGINE TESTS PASSED!');
console.log('='.repeat(65));
