// dynamicChecklistsData.ts - Dynamic Clinical Specialty Compliance Checklists

export interface ChecklistItem {
  id: string;
  label: string;
  isCompleted: boolean;
  statutoryRuleRef: string;
  sourceDocFound: boolean;
}

export interface SpecialtyChecklist {
  specialty: string;
  requiredItems: ChecklistItem[];
}

export const SPECIALTY_CHECKLISTS: Record<string, SpecialtyChecklist> = {
  'ICU_SEPSIS': {
    specialty: 'Critical Care Sepsis (DRG 870)',
    requiredItems: [
      { id: 'CHK-01', label: 'Arterial line MAP telemetry logged <= hr 3', isCompleted: true, statutoryRuleRef: 'UHC Med Policy 2026.04', sourceDocFound: true },
      { id: 'CHK-02', label: 'SOFA Organ Failure Delta score >= 2 calculated', isCompleted: true, statutoryRuleRef: 'Sepsis-3 Consensus Guidelines', sourceDocFound: true },
      { id: 'CHK-03', label: 'Lactate level repeated within 4 hours', isCompleted: true, statutoryRuleRef: 'CMS SEP-1 Measure', sourceDocFound: true },
      { id: 'CHK-04', label: 'Broad-spectrum antibiotics administered <= 1 hr', isCompleted: true, statutoryRuleRef: 'SEP-1 Protocol', sourceDocFound: true }
    ]
  },
  'SPINE_SURGERY': {
    specialty: 'Spine Fusion & Decompression',
    requiredItems: [
      { id: 'CHK-11', label: '6 weeks continuous physical therapy logs attached', isCompleted: true, statutoryRuleRef: 'Aetna CPB 0016 / InterQual', sourceDocFound: true },
      { id: 'CHK-12', label: 'Dynamic flexion/extension radiograph reports', isCompleted: true, statutoryRuleRef: 'InterQual 2026 Inpatient', sourceDocFound: true },
      { id: 'CHK-13', label: 'Documented failed NSAID / steroid trial', isCompleted: true, statutoryRuleRef: 'Step-Therapy Statute CA 1367.241', sourceDocFound: true }
    ]
  }
};
