// ==========================================================================
// BUNKERTRUST MARITIME • ZERO-MOCK MATHEMATICAL PHYSICS ENGINE
// ISO 8217:2024, EU ETS Directive 2023/959, FuelEU Maritime Reg 2023/1805
// ==========================================================================

export const EUA_CARBON_PRICE_EUR = 75.50; // Current EU ETS Carbon Allowance Price (€ / t-CO2)
export const VLSFO_STANDARD_DENSITY_KG_M3 = 991.0; // ISO 8217 max density for RMG 380 VLSFO @ 15°C
export const VLSFO_PRICE_USD_PER_MT = 620.0; // Benchmark bunker fuel price ($ / Metric Ton)

// FuelEU Maritime Regulatory Constants (Regulation EU 2023/1805)
export const FUELEU_TARGET_GHG_2025_G_MJ = 91.16; // 2% reduction from 93.00 g-CO2eq/MJ baseline
export const FUELEU_PENALTY_RATE_EUR_PER_MT = 2400.0; // Statutory penalty per metric ton of VLSFO-equivalent deficit

// IMO & FuelEU Fuel Physical Characteristics (Lower Calorific Value & Well-to-Wake GHG Intensity)
export const FUEL_PROPERTIES = {
  'VLSFO': {
    emissionFactorCO2: 3.114, // t-CO2 / t-Fuel
    lcvMJPerKg: 41.0, // Lower Calorific Value (MJ/kg)
    ghgIntensityGMJ: 93.00 // Well-to-Wake GHG Intensity (g-CO2eq/MJ)
  },
  'MGO': {
    emissionFactorCO2: 3.206,
    lcvMJPerKg: 42.7,
    ghgIntensityGMJ: 91.50
  },
  'LNG': {
    emissionFactorCO2: 2.750,
    lcvMJPerKg: 48.0,
    ghgIntensityGMJ: 87.00
  },
  'BIO_METHANOL': {
    emissionFactorCO2: 0.000,
    lcvMJPerKg: 19.9,
    ghgIntensityGMJ: 0.00 // 100% Decarbonized zero-rating
  }
};

// ISO 8217:2024 Marine Fuel Benchmark Specifications
export const ISO_8217_SPEC = {
  maxSulfurGlobalPct: 0.50,
  maxSulfurSecaPct: 0.10,
  maxDensityKgM3: 991.0,
  minFlashpointCelsius: 60.0,
  maxCatFinesAlSiMgKg: 60.0,
  maxWaterContentPct: 0.50
};

/**
 * Calculates instantaneous apparent density and aeration theft deficit ("Cappuccino Effect").
 */
export function calculateCoriolisAeration(
  massFlowRateMtHr,
  volumetricFlowRateM3Hr,
  standardDensityKgM3 = VLSFO_STANDARD_DENSITY_KG_M3,
  fuelPriceUsdMt = VLSFO_PRICE_USD_PER_MT
) {
  if (volumetricFlowRateM3Hr <= 0) {
    return {
      apparentDensityKgM3: standardDensityKgM3,
      aerationPct: 0,
      massDeficitMtHr: 0,
      dollarLossRateUsdHr: 0
    };
  }

  const apparentDensityKgM3 = (massFlowRateMtHr * 1000) / volumetricFlowRateM3Hr;
  const expectedMassMtHr = (volumetricFlowRateM3Hr * standardDensityKgM3) / 1000;
  const massDeficitMtHr = Math.max(0, expectedMassMtHr - massFlowRateMtHr);
  const aerationPct = Math.max(0, ((standardDensityKgM3 - apparentDensityKgM3) / standardDensityKgM3) * 100);
  const dollarLossRateUsdHr = massDeficitMtHr * fuelPriceUsdMt;

  return {
    apparentDensityKgM3: Number(apparentDensityKgM3.toFixed(2)),
    aerationPct: Number(aerationPct.toFixed(2)),
    massDeficitMtHr: Number(massDeficitMtHr.toFixed(3)),
    dollarLossRateUsdHr: Number(dollarLossRateUsdHr.toFixed(2))
  };
}

/**
 * Calculates EU ETS Carbon Tax Liability under EU Directive 2023/959.
 */
export function calculateEUETSLiability(
  fuelConsumedMt,
  fuelType = 'VLSFO',
  isIntraEU = false,
  euaPriceEur = EUA_CARBON_PRICE_EUR
) {
  const prop = FUEL_PROPERTIES[fuelType] ?? FUEL_PROPERTIES['VLSFO'];
  const totalEmissionsMtCO2 = fuelConsumedMt * prop.emissionFactorCO2;
  
  const scopePct = isIntraEU ? 100 : 50;
  const taxableEmissionsMtCO2 = totalEmissionsMtCO2 * (scopePct / 100);
  const totalCarbonTaxEur = taxableEmissionsMtCO2 * euaPriceEur;

  return {
    totalEmissionsMtCO2: Number(totalEmissionsMtCO2.toFixed(2)),
    taxableEmissionsMtCO2: Number(taxableEmissionsMtCO2.toFixed(2)),
    totalCarbonTaxEur: Number(totalCarbonTaxEur.toFixed(2)),
    scopePct
  };
}

/**
 * Calculates FuelEU Maritime Compliance Balance (CB) & Statutory Penalty under Regulation EU 2023/1805.
 * @param {number} fuelConsumedMt - Total fuel consumed in Metric Tons
 * @param {string} fuelType - 'VLSFO' | 'MGO' | 'LNG' | 'BIO_METHANOL'
 * @param {number} [targetGhg=FUELEU_TARGET_GHG_2025_G_MJ] - In g-CO2eq/MJ
 * @returns {{ energyConsumedMJ: number, actualGhgIntensity: number, complianceBalanceGCO2: number, penaltyEur: number, isCompliant: boolean }}
 */
export function calculateFuelEUBalance(
  fuelConsumedMt,
  fuelType = 'VLSFO',
  targetGhg = FUELEU_TARGET_GHG_2025_G_MJ
) {
  const prop = FUEL_PROPERTIES[fuelType] ?? FUEL_PROPERTIES['VLSFO'];
  
  // Total Energy in Megajoules (MJ) = Mass in kg * LCV in MJ/kg
  const energyConsumedMJ = fuelConsumedMt * 1000 * prop.lcvMJPerKg;
  
  // Compliance Balance in grams CO2eq = (Target - Actual) * Total Energy
  const complianceBalanceGCO2 = (targetGhg - prop.ghgIntensityGMJ) * energyConsumedMJ;
  
  let penaltyEur = 0;
  const isCompliant = complianceBalanceGCO2 >= 0;

  if (!isCompliant) {
    // Penalty = (|CB| / (Actual GHG Intensity * 41.0)) * 2,400 EUR/t
    const deficitTonsVlsfoEq = Math.abs(complianceBalanceGCO2) / (prop.ghgIntensityGMJ * 41.0 * 1000);
    penaltyEur = deficitTonsVlsfoEq * FUELEU_PENALTY_RATE_EUR_PER_MT;
  }

  return {
    energyConsumedMJ: Number(energyConsumedMJ.toFixed(1)),
    actualGhgIntensity: prop.ghgIntensityGMJ,
    complianceBalanceGCO2: Number(complianceBalanceGCO2.toFixed(1)),
    penaltyEur: Number(penaltyEur.toFixed(2)),
    isCompliant
  };
}

/**
 * Evaluates Onboard Multi-Tank Bunker Compatibility to prevent asphaltene sludge precipitation.
 * @param {Array<{ tankId: string, fuelType: string, viscosityCSt: number, massMt: number }>} tanks 
 * @returns {{ isCompatible: boolean, warnings: string[] }}
 */
export function evaluateTankCompatibility(tanks) {
  const warnings = [];
  
  tanks.forEach((tank, idx) => {
    tanks.slice(idx + 1).forEach((otherTank) => {
      if (tank.fuelType !== otherTank.fuelType) {
        const viscRatio = Math.min(tank.viscosityCSt, otherTank.viscosityCSt) / Math.max(tank.viscosityCSt, otherTank.viscosityCSt);
        if (viscRatio < 0.25) {
          warnings.push(`Extreme viscosity delta between ${tank.tankId} (${tank.fuelType} @ ${tank.viscosityCSt} cSt) and ${otherTank.tankId} (${otherTank.fuelType} @ ${otherTank.viscosityCSt} cSt) creates high blending stratification risk.`);
        }
      }
    });
  });

  return {
    isCompatible: warnings.length === 0,
    warnings
  };
}

/**
 * Computes IMO Carbon Intensity Indicator (CII) Rating.
 */
export function evaluateCIIRating(
  totalEmissionsMtCO2,
  vesselDwt,
  distanceNauticalMiles,
  requiredCiiBaseline = 4.80
) {
  if (vesselDwt <= 0 || distanceNauticalMiles <= 0) {
    return {
      attainedCii: 0,
      requiredCii: requiredCiiBaseline,
      ratio: 0,
      rating: 'C',
      complianceStatus: 'STANDBY'
    };
  }

  const co2Grams = totalEmissionsMtCO2 * 1000000;
  const attainedCii = co2Grams / (vesselDwt * distanceNauticalMiles);
  const ratio = attainedCii / requiredCiiBaseline;

  let rating;
  let complianceStatus;

  if (ratio <= 0.83) {
    rating = 'A';
    complianceStatus = 'SUPERIOR (Major Fuel Efficiency)';
  } else if (ratio <= 0.94) {
    rating = 'B';
    complianceStatus = 'MINOR_SUPERIOR (Compliant)';
  } else if (ratio <= 1.06) {
    rating = 'C';
    complianceStatus = 'COMPLIANT (Baseline)';
  } else if (ratio <= 1.19) {
    rating = 'D';
    complianceStatus = 'MINOR_INFERIOR (CAPA Plan Required in 3 Yrs)';
  } else {
    rating = 'E';
    complianceStatus = 'CRITICAL_INFERIOR (Port State Detention Risk)';
  }

  return {
    attainedCii: Number(attainedCii.toFixed(3)),
    requiredCii: requiredCiiBaseline,
    ratio: Number(ratio.toFixed(3)),
    rating,
    complianceStatus
  };
}

/**
 * Validates laboratory test results against ISO 8217:2024 compliance.
 */
export function validateISO8217Spec(labData) {
  const violations = [];
  const maxSulfur = labData.isSecaZone ? ISO_8217_SPEC.maxSulfurSecaPct : ISO_8217_SPEC.maxSulfurGlobalPct;

  if (labData.sulfurPct > maxSulfur) {
    violations.push(`Sulfur (${labData.sulfurPct.toFixed(2)}%) exceeds ${labData.isSecaZone ? 'SECA' : 'Global'} limit of ${maxSulfur.toFixed(2)}% m/m.`);
  }

  if (labData.densityKgM3 > ISO_8217_SPEC.maxDensityKgM3) {
    violations.push(`Density @ 15°C (${labData.densityKgM3.toFixed(1)} kg/m³) exceeds ISO max of ${ISO_8217_SPEC.maxDensityKgM3} kg/m³.`);
  }

  if (labData.flashpointC < ISO_8217_SPEC.minFlashpointCelsius) {
    violations.push(`Flashpoint (${labData.flashpointC.toFixed(1)}°C) fails SOLAS safety minimum of ${ISO_8217_SPEC.minFlashpointCelsius}°C.`);
  }

  if (labData.catFinesMgKg > ISO_8217_SPEC.maxCatFinesAlSiMgKg) {
    violations.push(`Cat Fines Al+Si (${labData.catFinesMgKg.toFixed(1)} mg/kg) exceeds abrasive cylinder wear limit of ${ISO_8217_SPEC.maxCatFinesAlSiMgKg} mg/kg.`);
  }

  if (labData.waterPct > ISO_8217_SPEC.maxWaterContentPct) {
    violations.push(`Water content (${labData.waterPct.toFixed(2)}%) exceeds limit of ${ISO_8217_SPEC.maxWaterContentPct}%.`);
  }

  return {
    isCompliant: violations.length === 0,
    violations
  };
}
