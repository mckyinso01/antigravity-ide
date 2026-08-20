// vendorDiagnosticEngine.ts - Vendor Archetype Diagnostic Engine

export interface VendorArchetype {
  id: string;
  name: string;
  dangerLevel: 'CRITICAL_EXTORTION' | 'SEVERE_VENDOR_LOCKIN' | 'HIGH_FRICTION';
  modusOperandi: string;
  hiddenCosts: string;
  howClaimGuardAnnihilatesThem: string;
}

export class VendorDiagnosticEngine {
  public static getArchetypes(): VendorArchetype[] {
    return [
      {
        id: 'ARCH-01',
        name: 'The 4%-12% Rev-Share Extortionist (R1, Ensemble, Optum BPO)',
        dangerLevel: 'CRITICAL_EXTORTION',
        modusOperandi: 'Claims to provide free software, but takes 4% to 12% of every dollar the hospital collects, costing $30M+ over 5 years.',
        hiddenCosts: 'Drains $6,000,000 every single year for a 300-bed hospital without granting any software ownership.',
        howClaimGuardAnnihilatesThem: 'Replaces revenue-share with 100% Perpetual Sovereign Buyout ($485K One-Time) with $0 Rev-Share in Years 2-5+.'
      },
      {
        id: 'ARCH-02',
        name: 'The Post-Denial Scrambler (Waystar, Experian Health)',
        dangerLevel: 'SEVERE_VENDOR_LOCKIN',
        modusOperandi: 'Does nothing to prevent denials. Waits until the insurer rejects the claim, then forces billers to write manual appeal letters.',
        hiddenCosts: '$350,000/yr recurring SaaS subscriptions plus $270,000 implementation consulting fees.',
        howClaimGuardAnnihilatesThem: 'Pre-Submission Devil\'s Moot Court pre-debates the claim before transmission, stopping denials before they happen.'
      },
      {
        id: 'ARCH-03',
        name: 'The 4,000-Click Monolith (Epic / Cerner Native Modules)',
        dangerLevel: 'HIGH_FRICTION',
        modusOperandi: 'Traps billing staff in 20 nested sub-menus, requiring 40+ clicks per claim and creating severe administrative burnout.',
        hiddenCosts: 'High coder turnover and $150K training programs for complex legacy UI.',
        howClaimGuardAnnihilatesThem: 'Emil Kowalski single-screen frictionless split-pane workspace with 1-click batch patches and keyboard velocity.'
      }
    ];
  }
}
