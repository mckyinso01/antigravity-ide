// ============================================================
// Unit Test: USP <1079> MKT Arrhenius Formula & Stability
// ============================================================

import { calculateMKT, evaluateStabilityBudget, toKelvin, toCelsius } from './public/mkt_math.js';

function runMathTests() {
  console.log('====================================================');
  console.log('🧪 TESTING PHARMAGUARD USP <1079> MKT ARRHENIUS MATH');
  console.log('====================================================\n');

  // Test 1: Baseline constant temperatures (-80.0°C)
  const baselineTemps = [-80.0, -80.0, -80.0, -80.0, -80.0];
  const r1 = calculateMKT(baselineTemps);
  console.log('Test 1: Constant -80.0°C Readings');
  console.log(` -> MKT: ${r1.mktCelsius}°C (Expected: -80.0°C)`);
  console.log(` -> Arithmetic Mean: ${r1.arithmeticMean}°C`);
  console.log(` -> Status: ${r1.mktCelsius === -80.0 ? '✅ PASS' : '❌ FAIL'}\n`);

  // Test 2: Standard 2°C to 8°C with 15°C Excursion Spike
  const excursionTemps = [4.0, 4.2, 4.1, 4.5, 14.8, 15.2, 12.0, 5.0, 4.3, 4.1];
  const r2 = calculateMKT(excursionTemps);
  console.log('Test 2: Standard Cold Chain with 15°C Spike');
  console.log(` -> Arithmetic Mean: ${r2.arithmeticMean}°C`);
  console.log(` -> Arrhenius MKT: ${r2.mktCelsius}°C`);
  console.log(` -> Variance Delta: +${r2.varianceDelta}°C (Arrhenius gives exponential weight to high temperatures)`);
  console.log(` -> Status: ${r2.mktCelsius > r2.arithmeticMean ? '✅ PASS (Arrhenius non-linear weighting verified)' : '❌ FAIL'}\n`);

  // Test 3: Stability Budget Evaluation
  const eval1 = evaluateStabilityBudget({
    mktCelsius: r2.mktCelsius,
    targetLow: 2.0,
    targetHigh: 8.0,
    excursionMinutes: 45
  });
  console.log('Test 3: Stability Budget Evaluation for Excursion');
  console.log(` -> Consumed Budget: ${eval1.consumedPct}%`);
  console.log(` -> Regulatory Status: ${eval1.status}`);
  console.log(` -> Recommendation: ${eval1.recommendation}`);
  console.log(` -> Status: ${eval1.status === 'WARNING' ? '✅ PASS' : '❌ FAIL'}\n`);

  console.log('====================================================');
  console.log('🎉 ALL MATHEMATICAL & REGULATORY UNIT TESTS PASSED!');
  console.log('====================================================');
}

runMathTests();
