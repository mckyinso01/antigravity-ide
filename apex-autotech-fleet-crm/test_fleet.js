// ==========================================================================
// APEX AUTOTECH FLEET & CRM TEST SUITE
// Automated Unit Verification of OBD-II Physics, Margins & Service Life
// ==========================================================================

import {
  calculateInstantFuelEconomy,
  calculateDealershipMargin,
  evaluateFleetDispatchReadiness,
  calculateBrakePadLife
} from './public/fleet_math.js';

console.log('='.repeat(52));
console.log('🚗 TESTING APEX AUTOTECH FLEET & CRM ENGINE');
console.log('='.repeat(52));

// Test 1: OBD-II MAF to Instantaneous MPG
console.log('\nTest 1: Instantaneous Fuel Economy Calculation');
const econCruising = calculateInstantFuelEconomy(65.0, 21.0); // 65 MPH @ 21.0 g/s MAF
console.log(` -> Speed: 65 MPH | MAF: 21.0 g/s => Fuel Flow: ${econCruising.fuelFlowGph} GPH | MPG: ${econCruising.instantMpg}`);
if (econCruising.instantMpg >= 30.0 && econCruising.instantMpg <= 40.0) {
  console.log(' -> Status: ✅ PASS (Realistic Highway Cruising MPG Verified)');
} else {
  console.error(` -> Status: ❌ FAIL (MPG: ${econCruising.instantMpg} out of expected range)`);
  process.exit(1);
}

// Test 2: Dealership Margin & Lot Aging Cost
console.log('\nTest 2: Dealership Gross Margin & Lot Aging');
const marginFresh = calculateDealershipMargin(24000, 32000, 1200, 15);
console.log(` -> 15 Days on Lot: Margin: $${marginFresh.netGrossMarginUsd} (${marginFresh.marginPct}%) | Aging: ${marginFresh.agingStatus}`);
if (marginFresh.netGrossMarginUsd === 6638 && marginFresh.agingStatus === 'FRESH_LOT') {
  console.log(' -> Status: ✅ PASS (Fresh Inventory Margin Verified)');
} else {
  console.error(` -> Status: ❌ FAIL (Unexpected Margin: ${marginFresh.netGrossMarginUsd})`);
  process.exit(1);
}

const marginAged = calculateDealershipMargin(24000, 32000, 1200, 75);
console.log(` -> 75 Days on Lot: Holding Cost: $${marginAged.holdingCostUsd} | Net Margin: $${marginAged.netGrossMarginUsd} | Aging: ${marginAged.agingStatus}`);
if (marginAged.agingStatus === 'LIQUIDATION_URGENT') {
  console.log(' -> Status: ✅ PASS (Urgent Liquidation Aging Detected)');
} else {
  console.error(' -> Status: ❌ FAIL (Aged inventory failed status check)');
  process.exit(1);
}

// Test 3: OBD-II Dispatch Readiness
console.log('\nTest 3: OBD-II Fleet Dispatch Readiness');
const dispatchClear = evaluateFleetDispatchReadiness(['P0128']); // Low severity
console.log(` -> Minor Code [P0128]: Cleared: ${dispatchClear.isDispatchCleared} | Critical: ${dispatchClear.criticalFaults}`);
if (dispatchClear.isDispatchCleared) {
  console.log(' -> Status: ✅ PASS (Minor code allowed for dispatch)');
} else {
  console.error(' -> Status: ❌ FAIL (Minor code blocked dispatch)');
  process.exit(1);
}

const dispatchBlocked = evaluateFleetDispatchReadiness(['P0300', 'P0420']); // Misfire is critical
console.log(` -> Critical Code [P0300]: Cleared: ${dispatchBlocked.isDispatchCleared} | Critical: ${dispatchBlocked.criticalFaults}`);
if (!dispatchBlocked.isDispatchCleared && dispatchBlocked.criticalFaults === 1) {
  console.log(' -> Status: ✅ PASS (Critical Misfire Intercepted & Dispatch Blocked)');
} else {
  console.error(' -> Status: ❌ FAIL (Critical code not blocked)');
  process.exit(1);
}

// Test 4: Brake Pad Life Wear Model
console.log('\nTest 4: Brake Pad Wear & Service Countdown');
const brakeHealthy = calculateBrakePadLife(45000, 35000); // 10k miles on pads
console.log(` -> 10k Miles on pads: Thickness: ${brakeHealthy.estimatedPadThicknessMm} mm | Remaining: ${brakeHealthy.remainingMilesUntilService} miles`);
if (brakeHealthy.estimatedPadThicknessMm === 11.2 && !brakeHealthy.isServiceRequired) {
  console.log(' -> Status: ✅ PASS (Healthy brake pad prediction verified)');
} else {
  console.error(' -> Status: ❌ FAIL (Brake calculation error)');
  process.exit(1);
}

console.log('\n' + '='.repeat(52));
console.log('🎉 ALL APEX AUTOTECH TESTS PASSED!');
console.log('='.repeat(52));
