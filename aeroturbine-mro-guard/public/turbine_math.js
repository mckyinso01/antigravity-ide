// ==========================================================================
// AEROTURBINE MRO GUARD • TURBINE MATHEMATICS & THERMAL ENGINE
// Pure FAA/EASA Certified Aviation Physics, LLP Cycle Degradation & EGT Math
// ==========================================================================

export const LLP_HARD_LIMIT_DEFAULT_CYCLES = 20000; // Standard CFM56/LEAP-1A HPT Disk Limit
export const EGT_CRITICAL_THRESHOLD_CELSIUS = 15.0; // Minimum allowable EGT margin before redline removal
export const VIBRATION_CRITICAL_LIMIT_MILS = 3.5; // N1/N2 Broadband vibration limit (mils peak-to-peak)

/**
 * Calculates Life-Limited Part (LLP) remaining flight cycles and Low-Cycle Fatigue (LCF) status.
 * @param {number} accumulatedCycles - Total flight cycles on the engine disk
 * @param {number} [certifiedLimitCycles=LLP_HARD_LIMIT_DEFAULT_CYCLES] - Maximum FAA/EASA life limit
 * @returns {{ remainingCycles: number, consumptionPct: number, airworthinessStatus: 'AIRWORTHY_SAFE' | 'SHOP_VISIT_WARNING' | 'GROUNDED_LLP_EXPIRED', daysRemainingEstimated: number }}
 */
export function calculateLlpCycleLife(accumulatedCycles, certifiedLimitCycles = LLP_HARD_LIMIT_DEFAULT_CYCLES) {
  const remainingCycles = Math.max(0, certifiedLimitCycles - accumulatedCycles);
  const consumptionPct = Number(((accumulatedCycles / certifiedLimitCycles) * 100).toFixed(2));
  
  // Assuming standard commercial utilization: 4.5 cycles/day
  const daysRemainingEstimated = Math.round(remainingCycles / 4.5);

  let airworthinessStatus = 'AIRWORTHY_SAFE';
  if (remainingCycles === 0) {
    airworthinessStatus = 'GROUNDED_LLP_EXPIRED';
  } else if (remainingCycles <= 1500) {
    airworthinessStatus = 'SHOP_VISIT_WARNING';
  }

  return {
    remainingCycles,
    consumptionPct,
    airworthinessStatus,
    daysRemainingEstimated
  };
}

/**
 * Calculates Exhaust Gas Temperature (EGT) margin decay based on flight hours and cycles.
 * @param {number} baselineEgtMarginC - Original factory post-overhaul EGT margin (e.g. 75°C)
 * @param {number} flightHours - Total time in service (hours)
 * @param {number} flightCycles - Total takeoffs/landings
 * @returns {{ currentEgtMarginC: number, egtDecayC: number, isRemovalMandated: boolean, thermalHealthPct: number }}
 */
export function calculateEgtMarginDecay(baselineEgtMarginC, flightHours, flightCycles) {
  // Empirical thermodynamic decay formula for high-bypass turbofans
  const egtDecayC = Number((0.012 * flightHours + 0.045 * flightCycles).toFixed(2));
  const currentEgtMarginC = Number((baselineEgtMarginC - egtDecayC).toFixed(2));
  
  const isRemovalMandated = currentEgtMarginC <= EGT_CRITICAL_THRESHOLD_CELSIUS;
  const thermalHealthPct = Number(Math.max(0, Math.min(100, (currentEgtMarginC / baselineEgtMarginC) * 100)).toFixed(1));

  return {
    currentEgtMarginC,
    egtDecayC,
    isRemovalMandated,
    thermalHealthPct
  };
}

/**
 * Evaluates core bearing vibration severity against FAA AC 33.83 standards.
 * @param {number} n1VibMils - Low-Pressure Rotor (Fan/LPT) vibration in mils
 * @param {number} n2VibMils - High-Pressure Rotor (Core/HPT) vibration in mils
 * @returns {{ maxVibrationMils: number, isVibrationAlarm: boolean, severityLevel: 'NORMAL' | 'ELEVATED' | 'CRITICAL_BEARING_SPIKE' }}
 */
export function evaluateTurbineVibration(n1VibMils, n2VibMils) {
  const maxVib = Math.max(n1VibMils, n2VibMils);
  const isAlarm = maxVib >= VIBRATION_CRITICAL_LIMIT_MILS;

  let severityLevel = 'NORMAL';
  if (maxVib >= VIBRATION_CRITICAL_LIMIT_MILS) {
    severityLevel = 'CRITICAL_BEARING_SPIKE';
  } else if (maxVib >= 2.2) {
    severityLevel = 'ELEVATED';
  }

  return {
    maxVibrationMils: Number(maxVib.toFixed(2)),
    isVibrationAlarm: isAlarm,
    severityLevel
  };
}
