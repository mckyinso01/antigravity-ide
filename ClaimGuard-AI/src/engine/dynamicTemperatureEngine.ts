// dynamicTemperatureEngine.ts - Virtual Cognitive Temperature Controller

export type CognitiveMode = 'DETERMINISTIC_AUDIT' | 'MOOT_COURT_DEBATE' | 'CLINICAL_SCRIBE' | 'PATIENT_UX';

export interface TemperatureConfig {
  mode: CognitiveMode;
  temperature: number;
  label: string;
  description: string;
  maxTokens: number;
  antiHallucinationFilter: boolean;
}

export class DynamicTemperatureEngine {
  public static getConfig(mode: CognitiveMode): TemperatureConfig {
    switch (mode) {
      case 'DETERMINISTIC_AUDIT':
        return {
          mode,
          temperature: 0.0,
          label: 'Deterministic Statutory Audit (Temp 0.0)',
          description: 'Zero hallucination, 100% mathematical precision, strict adherence to statute and X12 EDI syntax.',
          maxTokens: 2048,
          antiHallucinationFilter: true
        };
      case 'MOOT_COURT_DEBATE':
        return {
          mode,
          temperature: 0.2,
          label: 'Adversarial Moot Court Duel (Temp 0.2)',
          description: 'High-speed adversarial legal logic, cross-examination of clinical ambiguities, and statutory rebuttals.',
          maxTokens: 3072,
          antiHallucinationFilter: true
        };
      case 'CLINICAL_SCRIBE':
        return {
          mode,
          temperature: 0.4,
          label: 'Clinical Physician Scribe (Temp 0.4)',
          description: 'Translates 10s voice memos into structured, MCG-compliant medical necessity addendums.',
          maxTokens: 1536,
          antiHallucinationFilter: true
        };
      case 'PATIENT_UX':
        return {
          mode,
          temperature: 0.3,
          label: 'Patient Plain-Language Explainer (Temp 0.3)',
          description: 'Translates complex ICD/CPT codes and No Surprises Act estimates into clear, compassionate language.',
          maxTokens: 1024,
          antiHallucinationFilter: true
        };
    }
  }
}
