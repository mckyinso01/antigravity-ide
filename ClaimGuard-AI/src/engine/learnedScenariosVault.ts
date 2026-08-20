// learnedScenariosVault.ts - Self-Expanding Autonomous Scenario Memory

export interface LearnedScenario {
  scenarioId: string;
  specialty: string;
  procedureName: string;
  denialVectorDefeated: string;
  statutoryPatchApplied: string;
  overturnedDollarValue: number;
  dateLearned: string;
}

const STORAGE_KEY = 'claimguard_learned_scenarios_vault';

export class LearnedScenariosVault {
  public static getLearnedScenarios(): LearnedScenario[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial: LearnedScenario[] = [
        {
          scenarioId: 'SCENARIO-AUTO-01',
          specialty: 'Emergency Oncology / Cross-Border',
          procedureName: 'Emergency Ovarian Mass Resection & Staging',
          denialVectorDefeated: 'Payer invoked 90-Day Stability Clause on out-of-country emergency care.',
          statutoryPatchApplied: 'Promissory Estoppel Doctrine & EMTALA emergency stabilization mandate applied.',
          overturnedDollarValue: 108000,
          dateLearned: '2026-08-20'
        },
        {
          scenarioId: 'SCENARIO-AUTO-02',
          specialty: 'Pediatric Cardiac Surgery',
          procedureName: 'Norwood Stage 1 Reconstruction with Sano Shunt',
          denialVectorDefeated: 'Payer claimed high-risk hybrid approach should have been first-line.',
          statutoryPatchApplied: 'STS Congenital Heart Surgery Database mortality risk curve appended.',
          overturnedDollarValue: 185000,
          dateLearned: '2026-08-19'
        },
        {
          scenarioId: 'SCENARIO-AUTO-03',
          specialty: 'Outpatient Surgical Center',
          procedureName: 'Real-Time EDI 270/271 Coordination of Benefits',
          denialVectorDefeated: 'CO-27 termination denial due to unknown primary vs secondary coverage.',
          statutoryPatchApplied: 'NAIC Coordination of Benefits Birthday Rule automatic routing.',
          overturnedDollarValue: 16500,
          dateLearned: '2026-08-20'
        },
        {
          scenarioId: 'SCENARIO-AUTO-04',
          specialty: 'Neuro-Interventional Radiology',
          procedureName: 'Mechanical Thrombectomy with Distal Aspiration',
          denialVectorDefeated: 'Disputed 24-hour stroke therapeutic window under DAWN trial criteria.',
          statutoryPatchApplied: 'CT Perfusion mismatch ratio (ischemic core vs penumbra) verified.',
          overturnedDollarValue: 64200,
          dateLearned: '2026-08-20'
        }
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  public static recordNewScenario(scenario: Omit<LearnedScenario, 'scenarioId' | 'dateLearned'>): LearnedScenario {
    const existing = this.getLearnedScenarios();
    const newEntry: LearnedScenario = {
      ...scenario,
      scenarioId: `SCENARIO-AUTO-${Date.now().toString().slice(-4)}`,
      dateLearned: new Date().toISOString().split('T')[0]
    };
    existing.unshift(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    return newEntry;
  }
}
