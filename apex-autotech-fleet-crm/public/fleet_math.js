// ==========================================================================
// APEX AUTOTECH FLEET & DEALERSHIP MATHEMATICAL ENGINE
// OBD-II Diagnostics, Fleet Telemetry, Holding Cost & Margin Algorithms
// ==========================================================================

export const AIR_FUEL_RATIO_GASOLINE = 14.7; // Stoichiometric ratio for gasoline
export const GASOLINE_DENSITY_LBS_GAL = 6.17; // Density of gasoline (lbs / gallon)
export const GRAMS_PER_POUND = 453.592;

export const OBD_TROUBLE_CODES = {
  'P0300': { description: 'Random/Multiple Cylinder Misfire Detected', severity: 'CRITICAL', serviceAction: 'Immediate Spark Plug/Ignition Coil Inspection' },
  'P0420': { description: 'Catalyst System Efficiency Below Threshold (Bank 1)', severity: 'WARNING', serviceAction: 'O2 Sensor / Catalytic Converter Diagnostic' },
  'P0171': { description: 'System Too Lean (Bank 1)', severity: 'WARNING', serviceAction: 'Vacuum Leak / Mass Air Flow Sensor Clean' },
  'P0500': { description: 'Vehicle Speed Sensor (VSS) Malfunction', severity: 'CRITICAL', serviceAction: 'ABS / Speed Sensor Harness Verification' },
  'P0128': { description: 'Coolant Thermostat Below Regulating Temperature', severity: 'LOW', serviceAction: 'Engine Coolant Thermostat Replacement' }
};

/**
 * Calculates Instantaneous Fuel Economy (MPG) from OBD-II Mass Air Flow (MAF) and Vehicle Speed (VSS).
 * @param {number} speedMph - Vehicle speed in Miles Per Hour
 * @param {number} mafGramsPerSec - Mass Air Flow rate in grams/second
 * @returns {{ fuelFlowGph: number, instantMpg: number }}
 */
export function calculateInstantFuelEconomy(speedMph, mafGramsPerSec) {
  if (mafGramsPerSec <= 0 || speedMph <= 0) {
    return { fuelFlowGph: 0.0, instantMpg: 0.0 };
  }

  // Fuel Flow (Gallons Per Hour) = (MAF * 3600) / (14.7 * 453.592 * 6.17)
  const fuelFlowGph = (mafGramsPerSec * 3600) / (AIR_FUEL_RATIO_GASOLINE * GRAMS_PER_POUND * GASOLINE_DENSITY_LBS_GAL);
  const instantMpg = speedMph / fuelFlowGph;

  return {
    fuelFlowGph: Number(fuelFlowGph.toFixed(2)),
    instantMpg: Number(instantMpg.toFixed(1))
  };
}

/**
 * Calculates Dealership Lot Holding Cost and Net Gross Margin for Inventory.
 * @param {number} acquisitionCostUsd - Initial purchase price at wholesale auction/trade-in
 * @param {number} targetSalePriceUsd - List / Sticker retail price
 * @param {number} reconditioningCostUsd - Service, detailing & safety inspection spend
 * @param {number} daysOnLot - Number of days inventory has sat in dealer lot
 * @param {number} [dailyHoldingRate=0.00045] - Daily floor-plan financing & depreciation rate
 * @returns {{ holdingCostUsd: number, netGrossMarginUsd: number, marginPct: number, agingStatus: string }}
 */
export function calculateDealershipMargin(
  acquisitionCostUsd,
  targetSalePriceUsd,
  reconditioningCostUsd,
  daysOnLot,
  dailyHoldingRate = 0.00045
) {
  const holdingCostUsd = acquisitionCostUsd * dailyHoldingRate * daysOnLot;
  const totalCostBasis = acquisitionCostUsd + reconditioningCostUsd + holdingCostUsd;
  const netGrossMarginUsd = targetSalePriceUsd - totalCostBasis;
  const marginPct = (netGrossMarginUsd / targetSalePriceUsd) * 100;

  let agingStatus = 'FRESH_LOT';
  if (daysOnLot > 60) {
    agingStatus = 'LIQUIDATION_URGENT';
  } else if (daysOnLot > 30) {
    agingStatus = 'AGED_INVENTORY';
  }

  return {
    holdingCostUsd: Number(holdingCostUsd.toFixed(2)),
    totalCostBasis: Number(totalCostBasis.toFixed(2)),
    netGrossMarginUsd: Number(netGrossMarginUsd.toFixed(2)),
    marginPct: Number(marginPct.toFixed(2)),
    agingStatus
  };
}

/**
 * Evaluates OBD-II Diagnostic Fault Codes and Fleet Dispatch Readiness.
 * @param {string[]} activeDtcCodes - Array of active OBD-II codes
 * @returns {{ isDispatchCleared: boolean, criticalFaults: number, warningFaults: number, faultDetails: Array<any> }}
 */
export function evaluateFleetDispatchReadiness(activeDtcCodes = []) {
  let criticalFaults = 0;
  let warningFaults = 0;
  const faultDetails = [];

  activeDtcCodes.forEach(code => {
    const dtcInfo = OBD_TROUBLE_CODES[code] || { description: 'Generic Powertrain Fault', severity: 'WARNING', serviceAction: 'Inspect Powertrain Module' };
    if (dtcInfo.severity === 'CRITICAL') criticalFaults++;
    if (dtcInfo.severity === 'WARNING') warningFaults++;
    faultDetails.push({ code, ...dtcInfo });
  });

  const isDispatchCleared = criticalFaults === 0;

  return {
    isDispatchCleared,
    criticalFaults,
    warningFaults,
    faultDetails
  };
}

/**
 * Predicts Brake Pad Thickness (mm) and Remaining Service Miles.
 * @param {number} currentMileage - Odometer in miles
 * @param {number} lastServiceMileage - Mileage when 12.0mm new pads were installed
 * @param {number} [wearRatePerThousandMiles=0.08] - Normal wear rate (mm/1k miles)
 * @returns {{ estimatedPadThicknessMm: number, remainingMilesUntilService: number, isServiceRequired: boolean }}
 */
export function calculateBrakePadLife(currentMileage, lastServiceMileage, wearRatePerThousandMiles = 0.08) {
  const milesDriven = Math.max(0, currentMileage - lastServiceMileage);
  const padWearMm = (milesDriven / 1000) * wearRatePerThousandMiles;
  const estimatedPadThicknessMm = Math.max(1.0, 12.0 - padWearMm);
  
  // Replace pads when <= 3.0mm
  const remainingMmUntilReplacement = Math.max(0, estimatedPadThicknessMm - 3.0);
  const remainingMilesUntilService = (remainingMmUntilReplacement / wearRatePerThousandMiles) * 1000;

  return {
    estimatedPadThicknessMm: Number(estimatedPadThicknessMm.toFixed(2)),
    remainingMilesUntilService: Math.round(remainingMilesUntilService),
    isServiceRequired: estimatedPadThicknessMm <= 3.0
  };
}
