// ehrFhirAdapter.ts - FHIR R4 Clinical Data Normalizer & Epic/Cerner Bridge

export interface FhirClaimResource {
  resourceType: 'Claim' | 'ExplanationOfBenefit' | 'Condition' | 'Procedure';
  id: string;
  status: 'active' | 'draft';
  patient: { reference: string; display: string };
  billablePeriod: { start: string; end: string };
  total: { value: number; currency: 'USD' | 'GBP' };
  insurance: { coverage: { display: string } };
  item: Array<{
    sequence: number;
    productOrService: { coding: Array<{ system: string; code: string; display: string }> };
    unitPrice?: { value: number };
  }>;
}

export class EhrFhirAdapter {
  public static normalizeFhirBundle(rawBundleJson: string): FhirClaimResource[] {
    try {
      const parsed = JSON.parse(rawBundleJson);
      if (Array.isArray(parsed.entry)) {
        return parsed.entry.map((e: any) => e.resource);
      }
      return [parsed];
    } catch {
      return [];
    }
  }
}
