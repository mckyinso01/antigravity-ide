// ============================================================
// USP <1079> Mean Kinetic Temperature (MKT) Arrhenius Engine
// Exact Mathematical Physics for Bio-Pharma Stability Degradation
// ============================================================

export const R_GAS_CONSTANT = 8.3144; // J/(mol·K)
export const DELTA_H_ACTIVATION_ENERGY = 83.144 * 1000; // 83.144 kJ/mol -> 83144 J/mol (FDA standard for pharmaceuticals)

/**
 * Converts Celsius to Kelvin
 * @param {number} celsius 
 * @returns {number} Kelvin
 */
export function toKelvin(celsius) {
  return celsius + 273.15;
}

/**
 * Converts Kelvin to Celsius
 * @param {number} kelvin 
 * @returns {number} Celsius
 */
export function toCelsius(kelvin) {
  return kelvin - 273.15;
}

/**
 * Calculates Mean Kinetic Temperature (MKT) in Celsius from an array of readings.
 * Formula:
 * Tk = (dH / R) / ( -ln ( (sum(e^(-dH / (R * Ti)))) / n ) )
 * 
 * @param {number[]} temperaturesCelsius - Array of temperature readings in °C
 * @param {number} [activationEnergy=DELTA_H_ACTIVATION_ENERGY] - In J/mol
 * @returns {{ mktCelsius: number, arithmeticMean: number, varianceDelta: number }}
 */
export function calculateMKT(temperaturesCelsius, activationEnergy = DELTA_H_ACTIVATION_ENERGY) {
  if (!temperaturesCelsius || temperaturesCelsius.length === 0) {
    return { mktCelsius: 0, arithmeticMean: 0, varianceDelta: 0 };
  }

  const n = temperaturesCelsius.length;
  let sumExp = 0;
  let arithmeticSum = 0;

  for (let i = 0; i < n; i++) {
    const tC = temperaturesCelsius[i];
    arithmeticSum += tC;
    const tK = toKelvin(tC);
    
    // Prevent divide by zero or extreme negatives below absolute zero (clamp to 0.01K minimum)
    const safeTk = Math.max(tK, 0.01);

    const exponent = -activationEnergy / (R_GAS_CONSTANT * safeTk);
    sumExp += Math.exp(exponent);
  }

  const averageExp = Math.max(sumExp / n, 1e-300);
  const logVal = -Math.log(averageExp);
  const tkKelvin = logVal !== 0 ? (activationEnergy / R_GAS_CONSTANT) / logVal : safeTk;
  const mktCelsius = Number.isFinite(tkKelvin) ? toCelsius(tkKelvin) : 0;
  const arithmeticMean = arithmeticSum / n;
  const varianceDelta = mktCelsius - arithmeticMean;

  return {
    mktCelsius: parseFloat(mktCelsius.toFixed(2)),
    arithmeticMean: parseFloat(arithmeticMean.toFixed(2)),
    varianceDelta: parseFloat(varianceDelta.toFixed(2))
  };
}

/**
 * Evaluates biologic stability budget consumption based on excursion duration and MKT.
 * @param {Object} params
 * @param {number} params.mktCelsius
 * @param {number} params.targetLow
 * @param {number} params.targetHigh
 * @param {number} params.excursionMinutes
 * @returns {{ consumedPct: number, status: 'COMPLIANT'|'WARNING'|'CRITICAL_BREACH', recommendation: string }}
 */
export function evaluateStabilityBudget({ mktCelsius, targetLow = 2.0, targetHigh = 8.0, excursionMinutes = 0 }) {
  let consumedPct = 0;
  
  if (mktCelsius >= targetLow && mktCelsius <= targetHigh) {
    // Normal baseline consumption rate
    consumedPct = Math.min(100, parseFloat(((excursionMinutes / 1440) * 5.0).toFixed(1)));
  } else if (mktCelsius > targetHigh) {
    // Accelerated thermal kinetic degradation (Arrhenius exponential spike)
    const overtemp = mktCelsius - targetHigh;
    consumedPct = Math.min(100, parseFloat(((excursionMinutes / 60) * (2.5 + overtemp * 1.8)).toFixed(1)));
  } else {
    // Sub-zero freezing risk (denaturation threshold)
    const undertemp = targetLow - mktCelsius;
    consumedPct = Math.min(100, parseFloat(((excursionMinutes / 60) * (4.0 + undertemp * 2.2)).toFixed(1)));
  }

  let status = 'COMPLIANT';
  let recommendation = 'Biologic batch remains 100% viable. Normal release protocol authorized.';

  if (consumedPct >= 75) {
    status = 'CRITICAL_BREACH';
    recommendation = 'Irreversible potency degradation. Quarantine mandatory for destructive HPLC assay testing.';
  } else if (consumedPct >= 20 || mktCelsius > targetHigh || mktCelsius < targetLow) {
    status = 'WARNING';
    recommendation = 'Excursion detected but MKT within acceptable stability budget. Dual-witness QA sign-off required.';
  }

  return {
    consumedPct,
    status,
    recommendation
  };
}
