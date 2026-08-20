// documentAnnotationEngine.ts - Document Annotator & Semantic Citation Deep-Linker

export interface DocumentAnnotation {
  id: string;
  pageNumber: number;
  boundingBox: {
    xPct: number;
    yPct: number;
    widthPct: number;
    heightPct: number;
  };
  highlightColor: 'ROSE_VULNERABILITY' | 'AMBER_WARNING' | 'EMERALD_PROOF' | 'CYAN_STATUTE';
  label: string;
  extractedSnippet: string;
  statutoryAnchorRef?: string;
  batesTag?: string;
}

export class DocumentAnnotationEngine {
  public static getAnnotationsForClaim(claimId: string): DocumentAnnotation[] {
    return [
      {
        id: `ANNOT-${claimId}-01`,
        pageNumber: 1,
        boundingBox: { xPct: 12, yPct: 34, widthPct: 76, heightPct: 14 },
        highlightColor: 'EMERALD_PROOF',
        label: 'Clinical Proof: Arterial Line MAP 58 mmHg (SOFA=4)',
        extractedSnippet: 'Arterial line continuous telemetry confirms MAP 58 mmHg at hr 1.2 post-presentation.',
        statutoryAnchorRef: 'ERISA § 502(a)(1)(B)',
        batesTag: 'CG-0001'
      },
      {
        id: `ANNOT-${claimId}-02`,
        pageNumber: 2,
        boundingBox: { xPct: 15, yPct: 55, widthPct: 70, heightPct: 12 },
        highlightColor: 'CYAN_STATUTE',
        label: 'Signed Physician Hour-0 Admission Order',
        extractedSnippet: 'Inpatient Admission Order signed by Attending Physician at 21:14 (42 CFR § 412.3).',
        statutoryAnchorRef: '42 CFR § 412.3 Two-Midnight Rule',
        batesTag: 'CG-0002'
      },
      {
        id: `ANNOT-${claimId}-03`,
        pageNumber: 3,
        boundingBox: { xPct: 10, yPct: 20, widthPct: 80, heightPct: 18 },
        highlightColor: 'AMBER_WARNING',
        label: 'Patched Vulnerability: Step-Therapy PT Logs',
        extractedSnippet: '14 Outpatient Physical Therapy encounters verified from external FHIR connector.',
        statutoryAnchorRef: 'CPB 0016 / InterQual Criteria',
        batesTag: 'CG-0003'
      }
    ];
  }
}
