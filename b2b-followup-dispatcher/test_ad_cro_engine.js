// ==========================================================================
// TEST SUITE: META AD FATIGUE & CRO SALIENCY ENGINE
// Verification of Biometric Attention Partitioning & Audit Generation
// ==========================================================================

import {
  calculateAdSaliencyAudit,
  generateAdAuditReport
} from './src/meta_ad_fatigue_cro_engine.js';

console.log('='.repeat(65));
console.log('👁️ TESTING META AD FATIGUE & CRO SALIENCY ENGINE');
console.log('='.repeat(65));

// Test 1: Saliency Percentage Partition Sum
console.log('\nTest 1: Saliency Percentage Partition Sum = 100.0%');
const sampleAd = {
  brandName: 'Aura Glow Skincare',
  adTitle: 'Hydra-Boost Peptide Serum (Summer Launch)',
  daysRunning: 38,
  visualNoiseScore: 68,
  ctaContrastRatio: 3.2,
  textDensityPct: 45
};

const audit = calculateAdSaliencyAudit(sampleAd, 8000);
const sumPct = Number((audit.ctaFixationPct + audit.backgroundDistractionPct + audit.headlineFixationPct).toFixed(1));
console.log(` -> CTA: ${audit.ctaFixationPct}% | BG Distraction: ${audit.backgroundDistractionPct}% | Headline: ${audit.headlineFixationPct}% | Total: ${sumPct}%`);
console.log(` -> Projected CVR Lift: +${audit.projectedCvrLiftPct}% | Wasted Monthly Spend: $${audit.estimatedWastedSpendMonthlyUsd}`);

if (Math.abs(sumPct - 100.0) <= 0.2 && audit.projectedCvrLiftPct > 0) {
  console.log(' -> Status: ✅ PASS (Exact 100% Saliency Partition Verified)');
} else {
  console.error(' -> Status: ❌ FAIL');
  process.exit(1);
}

// Test 2: Extreme Fatigue Detection
console.log('\nTest 2: Extreme Ad Fatigue Detection (>45 days active)');
const fatiguedAd = {
  brandName: 'OmniKicks Philippines',
  adTitle: 'Classic Running Sneakers Promo',
  daysRunning: 65,
  visualNoiseScore: 80,
  ctaContrastRatio: 2.1,
  textDensityPct: 55
};
const auditFatigued = calculateAdSaliencyAudit(fatiguedAd, 12000);
console.log(` -> Fatigue Status: ${auditFatigued.fatigueLevel} | Wasted Spend: $${auditFatigued.estimatedWastedSpendMonthlyUsd}`);

if (auditFatigued.fatigueLevel.includes('CRITICAL_FATIGUE') && auditFatigued.estimatedWastedSpendMonthlyUsd > 1000) {
  console.log(' -> Status: ✅ PASS (Critical Fatigue Identified & Quantified)');
} else {
  console.error(' -> Status: ❌ FAIL');
  process.exit(1);
}

// Test 3: Executive 1-Page Audit Report Generation
console.log('\nTest 3: Executive Audit Report File Generation');
const reportResult = generateAdAuditReport({
  brandName: 'Zenith Watches PH',
  industry: 'Luxury Horology & E-Commerce',
  monthlyAdSpendUsd: 10000,
  adDetails: sampleAd
});
console.log(` -> Audit Reference: ${reportResult.auditId} | File: ${reportResult.reportFilePath}`);

if (reportResult.reportMarkdown.includes('BIOMETRIC VISUAL ATTENTION') && reportResult.auditData.projectedCvrLiftPct > 0) {
  console.log(' -> Status: ✅ PASS (1-Page CRO Audit Report Successfully Generated)');
} else {
  console.error(' -> Status: ❌ FAIL');
  process.exit(1);
}

console.log('\n' + '='.repeat(65));
console.log('🎉 ALL META AD FATIGUE & CRO ENGINE TESTS PASSED!');
console.log('='.repeat(65));
