// pricingGapEngine.ts - 5-Year Cumulative TCO & Pricing Gap Engine

export interface PricingPlan {
  tierName: string;
  badge: string;
  year1Cost: number;
  year3Cost: number;
  year5Cost: number;
  revSharePercentage: number;
  isSovereign: boolean;
  highlightText: string;
}

export class PricingGapEngine {
  public static getEnterpriseComparison(netPatientRevenue: number = 120000000) {
    const annualBpoShare = netPatientRevenue * 0.05; // 5% of $120M = $6,000,000/yr

    return {
      netPatientRevenue,
      bpo5YearTotal: annualBpoShare * 5, // $30,000,000
      legacySaas5YearTotal: 620000 + (350000 * 4), // $2,020,000
      claimGuardBuyout5YearTotal: 485000, // $485,000 Flat
      totalBuyoutSavingsVsBpo: (annualBpoShare * 5) - 485000, // $29,515,000 Saved!
      totalBuyoutSavingsVsSaas: 2020000 - 485000, // $1,535,000 Saved!
      paybackDays: 45 // Less than 45 days ROI break-even
    };
  }
}
