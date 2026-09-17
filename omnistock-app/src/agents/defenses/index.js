/**
 * Hybrid Defense Engine — validateAgainstThreat
 *
 * Maps (roleId, titanId) to the corresponding Zod schema and runs safeParse()
 * on the attack payload. Returns structured validation results that the
 * simulation terminal renders as pass/fail with specific Zod error messages.
 */
import {
  taxConfigSchema,
  revenueSyncSchema,
  financialDrawSchema,
  discountOverrideSchema,
  cartItemSchema,
  stockAdjustmentSchema,
  recipeYieldSchema,
  promoApplySchema,
  securityPolicySchema,
  infraHardeningSchema,
  incidentContainmentSchema,
  penTestSchema,
  complianceAuditSchema,
  socAlertSchema,
  dpoPrivacySchema,
  posReconciliationSchema,
  supplierOrderSchema,
  haccpComplianceSchema,
  banquetAllocationSchema,
  franchiseComplianceSchema,
  coldChainSchema,
} from './validationSchemas';

// Lookup table mirroring THREAT_SEVERITY_MAP structure
const THREAT_SCHEMA_MAP = {
  // Owner
  'owner_mitnick': { schema: financialDrawSchema, name: 'Financial Draw MFA Schema' },
  'owner_geohot': { schema: revenueSyncSchema, name: 'Revenue Sync Atomic Ledger Schema' },
  'owner_miller': { schema: taxConfigSchema, name: 'Tax Configuration Bounds Schema' },
  'owner_kamkar': { schema: financialDrawSchema, name: 'Financial Draw MFA Schema' },
  'owner_jack': { schema: financialDrawSchema, name: 'Financial Draw MFA Schema' },
  // Branch Manager
  'branch_manager_mitnick': { schema: discountOverrideSchema, name: 'Discount Override TOTP Schema' },
  'branch_manager_geohot': { schema: discountOverrideSchema, name: 'Discount Override TOTP Schema' },
  'branch_manager_miller': { schema: discountOverrideSchema, name: 'Discount Override TOTP Schema' },
  'branch_manager_kamkar': { schema: discountOverrideSchema, name: 'Discount Override TOTP Schema' },
  'branch_manager_jack': { schema: discountOverrideSchema, name: 'Discount Override TOTP Schema' },
  // Cashier
  'cashier_mitnick': { schema: cartItemSchema, name: 'Cart Item Integrity Schema' },
  'cashier_geohot': { schema: cartItemSchema, name: 'Cart Item Integrity Schema' },
  'cashier_miller': { schema: cartItemSchema, name: 'Cart Item Integrity Schema' },
  'cashier_kamkar': { schema: cartItemSchema, name: 'Cart Item Integrity Schema' },
  'cashier_jack': { schema: cartItemSchema, name: 'Cart Item Integrity Schema' },
  // Inventory Specialist
  'inventory_specialist_mitnick': { schema: stockAdjustmentSchema, name: 'Stock Adjustment Bounds Schema' },
  'inventory_specialist_geohot': { schema: stockAdjustmentSchema, name: 'Stock Adjustment Bounds Schema' },
  'inventory_specialist_miller': { schema: stockAdjustmentSchema, name: 'Stock Adjustment Bounds Schema' },
  'inventory_specialist_kamkar': { schema: stockAdjustmentSchema, name: 'Stock Adjustment Bounds Schema' },
  'inventory_specialist_jack': { schema: stockAdjustmentSchema, name: 'Stock Adjustment Bounds Schema' },
  // Cost Analyst
  'cost_analyst_mitnick': { schema: recipeYieldSchema, name: 'Recipe Yield Domain Schema' },
  'cost_analyst_geohot': { schema: recipeYieldSchema, name: 'Recipe Yield Domain Schema' },
  'cost_analyst_miller': { schema: recipeYieldSchema, name: 'Recipe Yield Domain Schema' },
  'cost_analyst_kamkar': { schema: recipeYieldSchema, name: 'Recipe Yield Domain Schema' },
  'cost_analyst_jack': { schema: recipeYieldSchema, name: 'Recipe Yield Domain Schema' },
  // Marketing Strategist
  'marketing_strategist_mitnick': { schema: promoApplySchema, name: 'Promo Anti-Stacking Schema' },
  'marketing_strategist_geohot': { schema: promoApplySchema, name: 'Promo Anti-Stacking Schema' },
  'marketing_strategist_miller': { schema: promoApplySchema, name: 'Promo Anti-Stacking Schema' },
  'marketing_strategist_kamkar': { schema: promoApplySchema, name: 'Promo Anti-Stacking Schema' },
  'marketing_strategist_jack': { schema: promoApplySchema, name: 'Promo Anti-Stacking Schema' },
  // === SECURITY ROLES ===
  // CISO
  'ciso_mitnick': { schema: securityPolicySchema, name: 'Executive Security Policy MFA Schema' },
  'ciso_geohot': { schema: securityPolicySchema, name: 'Executive Security Policy MFA Schema' },
  'ciso_miller': { schema: securityPolicySchema, name: 'Executive Security Policy MFA Schema' },
  'ciso_jack': { schema: securityPolicySchema, name: 'Executive Security Policy MFA Schema' },
  'ciso_kamkar': { schema: securityPolicySchema, name: 'Executive Security Policy MFA Schema' },
  // Security Engineer
  'security_engineer_mitnick': { schema: infraHardeningSchema, name: 'Infrastructure Hardening Schema' },
  'security_engineer_geohot': { schema: infraHardeningSchema, name: 'Infrastructure Hardening Schema' },
  'security_engineer_miller': { schema: infraHardeningSchema, name: 'Infrastructure Hardening Schema' },
  'security_engineer_jack': { schema: infraHardeningSchema, name: 'Infrastructure Hardening Schema' },
  'security_engineer_kamkar': { schema: infraHardeningSchema, name: 'Infrastructure Hardening Schema' },
  // Incident Responder
  'incident_responder_mitnick': { schema: incidentContainmentSchema, name: 'Incident Containment & Forensics Schema' },
  'incident_responder_geohot': { schema: incidentContainmentSchema, name: 'Incident Containment & Forensics Schema' },
  'incident_responder_miller': { schema: incidentContainmentSchema, name: 'Incident Containment & Forensics Schema' },
  'incident_responder_jack': { schema: incidentContainmentSchema, name: 'Incident Containment & Forensics Schema' },
  'incident_responder_kamkar': { schema: incidentContainmentSchema, name: 'Incident Containment & Forensics Schema' },
  // Penetration Tester
  'pen_tester_mitnick': { schema: penTestSchema, name: 'Penetration Test Exploit Schema' },
  'pen_tester_geohot': { schema: penTestSchema, name: 'Penetration Test Exploit Schema' },
  'pen_tester_miller': { schema: penTestSchema, name: 'Penetration Test Exploit Schema' },
  'pen_tester_jack': { schema: penTestSchema, name: 'Penetration Test Exploit Schema' },
  'pen_tester_kamkar': { schema: penTestSchema, name: 'Penetration Test Exploit Schema' },
  // Compliance Officer
  'compliance_officer_mitnick': { schema: complianceAuditSchema, name: 'Compliance Framework Audit Schema' },
  'compliance_officer_geohot': { schema: complianceAuditSchema, name: 'Compliance Framework Audit Schema' },
  'compliance_officer_miller': { schema: complianceAuditSchema, name: 'Compliance Framework Audit Schema' },
  'compliance_officer_jack': { schema: complianceAuditSchema, name: 'Compliance Framework Audit Schema' },
  'compliance_officer_kamkar': { schema: complianceAuditSchema, name: 'Compliance Framework Audit Schema' },
  // SOC Analyst
  'soc_analyst_mitnick': { schema: socAlertSchema, name: 'SOC Alert Triage Schema' },
  'soc_analyst_geohot': { schema: socAlertSchema, name: 'SOC Alert Triage Schema' },
  'soc_analyst_miller': { schema: socAlertSchema, name: 'SOC Alert Triage Schema' },
  'soc_analyst_jack': { schema: socAlertSchema, name: 'SOC Alert Triage Schema' },
  'soc_analyst_kamkar': { schema: socAlertSchema, name: 'SOC Alert Triage Schema' },
  // DPO
  'dpo_mitnick': { schema: dpoPrivacySchema, name: 'DPO Privacy Protection Schema' },
  'dpo_geohot': { schema: dpoPrivacySchema, name: 'DPO Privacy Protection Schema' },
  'dpo_miller': { schema: dpoPrivacySchema, name: 'DPO Privacy Protection Schema' },
  'dpo_jack': { schema: dpoPrivacySchema, name: 'DPO Privacy Protection Schema' },
  'dpo_kamkar': { schema: dpoPrivacySchema, name: 'DPO Privacy Protection Schema' },
  // === F&B MANAGEMENT ROLES ===
  // F&B Director
  'fb_director_mitnick': { schema: posReconciliationSchema, name: 'POS Reconciliation & MFA Schema' },
  'fb_director_geohot': { schema: banquetAllocationSchema, name: 'Banquet Allocation Mutex Schema' },
  'fb_director_miller': { schema: franchiseComplianceSchema, name: 'Franchise Compliance Bounds Schema' },
  'fb_director_jack': { schema: franchiseComplianceSchema, name: 'Franchise Compliance Hash Chain Schema' },
  'fb_director_kamkar': { schema: posReconciliationSchema, name: 'POS Reconciliation Zero-Persistence Schema' },
  // Restaurant Manager
  'restaurant_manager_mitnick': { schema: posReconciliationSchema, name: 'POS Reconciliation TOTP Schema' },
  'restaurant_manager_geohot': { schema: posReconciliationSchema, name: 'POS Reconciliation Atomic Lock Schema' },
  'restaurant_manager_miller': { schema: haccpComplianceSchema, name: 'HACCP Temperature Bounds Schema' },
  'restaurant_manager_jack': { schema: posReconciliationSchema, name: 'POS Reconciliation HMAC Schema' },
  'restaurant_manager_kamkar': { schema: posReconciliationSchema, name: 'POS Reconciliation PCI Schema' },
  // Purchasing Manager
  'purchasing_manager_mitnick': { schema: supplierOrderSchema, name: 'Supplier Order MFA Schema' },
  'purchasing_manager_geohot': { schema: supplierOrderSchema, name: 'Supplier Order Budget Lock Schema' },
  'purchasing_manager_miller': { schema: supplierOrderSchema, name: 'Supplier Order Bounds Schema' },
  'purchasing_manager_jack': { schema: coldChainSchema, name: 'Cold-Chain IoT Hash Chain Schema' },
  'purchasing_manager_kamkar': { schema: supplierOrderSchema, name: 'Supplier Order Data Masking Schema' },
  // QA Manager
  'qa_manager_mitnick': { schema: haccpComplianceSchema, name: 'HACCP Inspector Verification Schema' },
  'qa_manager_geohot': { schema: haccpComplianceSchema, name: 'HACCP CCP Lock Schema' },
  'qa_manager_miller': { schema: haccpComplianceSchema, name: 'HACCP Temperature Fuzzing Schema' },
  'qa_manager_jack': { schema: haccpComplianceSchema, name: 'HACCP Offline Hash Chain Schema' },
  'qa_manager_kamkar': { schema: supplierOrderSchema, name: 'Allergen Matrix Access Control Schema' },
};

/**
 * Validates an attack payload against the Zod schema mapped to the given role+titan threat.
 * @param {string} roleId - The enterprise role ID (e.g. 'owner', 'cashier')
 * @param {string} titanId - The titan ID (e.g. 'mitnick', 'miller')
 * @param {object} payload - The attack payload to validate
 * @returns {{ intercepted: boolean, violations: string[], defenseSchemaName: string }}
 */
export function validateAgainstThreat(roleId, titanId, payload) {
  const entry = THREAT_SCHEMA_MAP[`${roleId}_${titanId}`];
  if (!entry) {
    return { intercepted: false, violations: ['No defense schema mapped for this threat vector'], defenseSchemaName: 'none' };
  }

  const result = entry.schema.safeParse(payload);
  if (result.success) {
    return { intercepted: false, violations: [], defenseSchemaName: entry.name };
  }

  const violations = result.error.issues.map(issue => {
    const path = issue.path.length > 0 ? issue.path.join('.') : '(root)';
    return `[${path}] ${issue.message}`;
  });

  return { intercepted: true, violations, defenseSchemaName: entry.name };
}

export { THREAT_SCHEMA_MAP };
