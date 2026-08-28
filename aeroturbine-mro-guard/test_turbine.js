// ==========================================================================
// TEST SUITE: AEROTURBINE MRO GUARD (MATHEMATICAL VERIFICATION)
// ==========================================================================

import {
  calculateLlpCycleLife,
  calculateEgtMarginDecay,
  evaluateTurbineVibration
} from './public/turbine_math.js';

console.log('='.repeat(60));
console.log('✈️ TESTING AEROTURBINE MRO GUARD MATHEMATICAL ENGINE');
console.log('='.repeat(60));

// Test 1: Fresh Engine LLP Cycle Life
const freshLlp = calculateLlpCycleLife(2500, 20000);
console.log(`\nTest 1: Fresh Engine LLP Cycles (2,500 / 20,000)`);
console.log(` -> Remaining: ${freshLlp.remainingCycles} cycles | Consumed: ${freshLlp.consumptionPct}% | Status: ${freshLlp.airworthinessStatus}`);
if (freshLlp.remainingCycles === 17500 && freshLlp.airworthinessStatus === 'AIRWORTHY_SAFE') {
  console.log(' -> Status: ✅ PASS (Fresh Engine Airworthy Verification)');
} else {
  console.error(' -> Status: ❌ FAIL');
  process.exit(1);
}

// Test 2: Expired LLP Hard Limit
const expiredLlp = calculateLlpCycleLife(20000, 20000);
console.log(`\nTest 2: Expired LLP Hard Limit (20,000 / 20,000)`);
console.log(` -> Remaining: ${expiredLlp.remainingCycles} cycles | Status: ${expiredLlp.airworthinessStatus}`);
if (expiredLlp.remainingCycles === 0 && expiredLlp.airworthinessStatus === 'GROUNDED_LLP_EXPIRED') {
  console.log(' -> Status: ✅ PASS (Hard Grounding Intercept Verified)');
} else {
  console.error(' -> Status: ❌ FAIL');
  process.exit(1);
}

// Test 3: EGT Margin Thermodynamic Decay
const egtHealthy = calculateEgtMarginDecay(75.0, 1200, 450);
console.log(`\nTest 3: EGT Margin Degradation (1,200 hrs / 450 cycles)`);
console.log(` -> Baseline: 75.0°C | Decay: -${egtHealthy.egtDecayC}°C => Current EGT: ${egtHealthy.currentEgtMarginC}°C | Removal Mandated: ${egtHealthy.isRemovalMandated}`);
if (egtHealthy.currentEgtMarginC === 40.35 && !egtHealthy.isRemovalMandated) {
  console.log(' -> Status: ✅ PASS (Healthy EGT Decay Profile Verified)');
} else {
  console.error(' -> Status: ❌ FAIL');
  process.exit(1);
}

// Test 4: Critical EGT Exhaustion (Near-redline)
const egtCritical = calculateEgtMarginDecay(75.0, 4200, 1800);
console.log(`\nTest 4: Critical EGT Margin Exhaustion (4,200 hrs / 1,800 cycles)`);
console.log(` -> Baseline: 75.0°C | Decay: -${egtCritical.egtDecayC}°C => Current EGT: ${egtCritical.currentEgtMarginC}°C | Removal Mandated: ${egtCritical.isRemovalMandated}`);
if (egtCritical.isRemovalMandated) {
  console.log(' -> Status: ✅ PASS (Critical AOG Engine Removal Mandated)');
} else {
  console.error(' -> Status: ❌ FAIL');
  process.exit(1);
}

// Test 5: Rotor Vibration Boundary
const vibSafe = evaluateTurbineVibration(1.1, 1.4);
const vibSpike = evaluateTurbineVibration(1.2, 3.8);
console.log(`\nTest 5: Rotor Vibration Limits (Safe vs Severe Spike)`);
console.log(` -> Safe: ${vibSafe.maxVibrationMils} mils (${vibSafe.severityLevel})`);
console.log(` -> Spike: ${vibSpike.maxVibrationMils} mils (${vibSpike.severityLevel}) | Alarm: ${vibSpike.isVibrationAlarm}`);
if (!vibSafe.isVibrationAlarm && vibSpike.isVibrationAlarm && vibSpike.severityLevel === 'CRITICAL_BEARING_SPIKE') {
  console.log(' -> Status: ✅ PASS (Bearing Imbalance Alert Triggered)');
} else {
  console.error(' -> Status: ❌ FAIL');
  process.exit(1);
}

console.log('\n' + '='.repeat(60));
console.log('🎉 ALL AEROTURBINE MATHEMATICAL TESTS PASSED (100%)');
console.log('='.repeat(60));
