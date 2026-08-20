// promptPayInterestEngine.ts - State-by-State 1.5% to 2% Statutory Late Penalty Interest Calculator

export interface StatePromptPayStatute {
  stateCode: string;
  stateName: string;
  statutoryDaysCleanClaim: number;
  monthlyInterestRate: number; // e.g. 0.015 = 1.5%
  statuteCitation: string;
  enforcementAgency: string;
}

export const STATE_PROMPT_PAY_LAWS: Record<string, StatePromptPayStatute> = {
  TX: {
    stateCode: 'TX',
    stateName: 'Texas',
    statutoryDaysCleanClaim: 30,
    monthlyInterestRate: 0.015, // 1.5% / month (18% / year)
    statuteCitation: 'Texas Insurance Code § 1301.137 & § 843.342',
    enforcementAgency: 'Texas Department of Insurance (TDI)'
  },
  CA: {
    stateCode: 'CA',
    stateName: 'California',
    statutoryDaysCleanClaim: 30,
    monthlyInterestRate: 0.0125, // 15% / year
    statuteCitation: 'California Health & Safety Code § 1371 & Ins. Code § 10123.13',
    enforcementAgency: 'California Department of Managed Health Care (DMHC)'
  },
  FL: {
    stateCode: 'FL',
    stateName: 'Florida',
    statutoryDaysCleanClaim: 20,
    monthlyInterestRate: 0.0167, // 20% / year
    statuteCitation: 'Florida Statutes § 627.6131',
    enforcementAgency: 'Florida Office of Insurance Regulation (OIR)'
  },
  NY: {
    stateCode: 'NY',
    stateName: 'New York',
    statutoryDaysCleanClaim: 30,
    monthlyInterestRate: 0.01, // 12% / year
    statuteCitation: 'New York Insurance Law § 3224-a (Prompt Pay Law)',
    enforcementAgency: 'New York Department of Financial Services (DFS)'
  }
};

export class PromptPayInterestEngine {
  /**
   * Calculates accumulated statutory late interest for overdue insurance claims
   */
  public static calculatePenaltyInterest(
    claimAmount: number,
    daysSinceSubmission: number,
    stateCode: string = 'TX'
  ): {
    statutoryGraceDays: number;
    daysOverdue: number;
    monthlyRate: number;
    totalInterestPenalty: number;
    totalDemandAmount: number;
    statutoryCitation: string;
  } {
    const law = STATE_PROMPT_PAY_LAWS[stateCode] || STATE_PROMPT_PAY_LAWS['TX'];
    const daysOverdue = Math.max(0, daysSinceSubmission - law.statutoryDaysCleanClaim);
    const monthsOverdue = daysOverdue / 30;

    const totalInterestPenalty = Math.round(claimAmount * (law.monthlyInterestRate * monthsOverdue));
    const totalDemandAmount = claimAmount + totalInterestPenalty;

    return {
      statutoryGraceDays: law.statutoryDaysCleanClaim,
      daysOverdue,
      monthlyRate: law.monthlyInterestRate * 100,
      totalInterestPenalty,
      totalDemandAmount,
      statutoryCitation: law.statuteCitation
    };
  }
}
