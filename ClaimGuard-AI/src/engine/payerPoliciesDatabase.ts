// payerPoliciesDatabase.ts - Pre-loaded Payer Clinical Coverage Policies & Statutory Regulations

export interface PayerPolicy {
  payerName: string;
  policyCode: string;
  title: string;
  jurisdiction: 'US' | 'UK';
  effectiveYear: number;
  strictClauses: string[];
  statutoryVulnerability: string;
  requiredAttachments: string[];
}

export const PAYER_POLICIES_DATABASE: PayerPolicy[] = [
  {
    payerName: "UnitedHealthcare (UHC)",
    policyCode: "UHC-MED-2026.04",
    title: "Critical Care Sepsis & Organ Dysfunction Policy",
    jurisdiction: "US",
    effectiveYear: 2026,
    strictClauses: [
      "Explicit SOFA score delta >= 2 within first 3 hours of ED presentation required for DRG 870.",
      "Repeat blood lactate level required within 4 hours if initial level >= 2.0 mmol/L.",
      "Hourly Mean Arterial Pressure (MAP) logs required for vasopressor infusion."
    ],
    statutoryVulnerability: "Preempted by ERISA §502(a)(1)(B) when objective physician telemetry proves hemodynamic instability.",
    requiredAttachments: ["Arterial Line Telemetry Flowsheet", "Sequential Organ Failure Assessment (SOFA) Calculator Log"]
  },
  {
    payerName: "Aetna Commercial",
    policyCode: "CPB-0016-SPINE",
    title: "Lumbar Spinal Fusion & Decompression Clinical Policy",
    jurisdiction: "US",
    effectiveYear: 2026,
    strictClauses: [
      "Minimum 6 weeks of continuous documented physical therapy failure within preceding 6 months.",
      "Active daily NSAID or oral steroid trial documented by prescribing physician.",
      "Dynamic flexion/extension radiographs confirming >= 3mm translation or >= 10 degrees angulation."
    ],
    statutoryVulnerability: "Subject to InterQual Criteria & CA Health & Safety Code § 1367.241 Step Therapy Protection.",
    requiredAttachments: ["External PT Attendance Records", "Flexion-Extension Radiograph Report", "Prescription History Log"]
  },
  {
    payerName: "Humana Medicare Advantage",
    policyCode: "HUM-ONC-2026.02",
    title: "Oncology Biologics & Immune Checkpoint Inhibitor Policy",
    jurisdiction: "US",
    effectiveYear: 2026,
    strictClauses: [
      "FDA on-label indication or NCCN Category 1/2A recommendation mandatory.",
      "Next-Generation Sequencing (NGS) or IHC biomarker score must be submitted with initial claim envelope.",
      "Documentation of disease progression on prior standard-of-care line."
    ],
    statutoryVulnerability: "CMS-0057-F Section III.B mandates 72-hour expedited prior authorization compliance for oncology.",
    requiredAttachments: ["CLIA-Certified NGS Pathology Report", "Oncology Staging & Line-of-Therapy Narrative"]
  },
  {
    payerName: "Bupa UK Private Insurance",
    policyCode: "BUPA-SOP-V2540",
    title: "Spinal Interventions & Musculoskeletal Schedule of Procedures",
    jurisdiction: "UK",
    effectiveYear: 2026,
    strictClauses: [
      "Outpatient specialist consultation capped at £1,500 per policy year unless admitted as Day-Case.",
      "MRI lumbar spine must show concordant nerve root impingement before epidural steroid injection.",
      "General Medical Council (GMC) specialist register credentialing for operating clinician."
    ],
    statutoryVulnerability: "NICE Guideline NG59 Day-Case Inpatient Tariff overrides outpatient benefit sub-limits.",
    requiredAttachments: ["Day-Case Theatre Register", "MRI Radiologist Formal Report", "GMC Specialist Registration Proof"]
  },
  {
    payerName: "Medicare / CMS Federal",
    policyCode: "42-CFR-412.3",
    title: "CMS Two-Midnight Inpatient Benchmark Rule",
    jurisdiction: "US",
    effectiveYear: 2026,
    strictClauses: [
      "Admitting physician must document reasonable expectation that medically necessary care will span >= 2 midnights.",
      "Hour-0 formal written inpatient admission order mandatory before patient discharge.",
      "Inpatient-Only (IPO) list procedures are automatically certified for Part A reimbursement."
    ],
    statutoryVulnerability: "Retrospective clawbacks violate CMS-1599-F when Hour-0 physician intent is locked and signed.",
    requiredAttachments: ["Hour-0 Inpatient Admission Order", "Physician 2-Midnight Expectation Statement"]
  }
];
