/**
 * Titan 3: Samy Kamkar
 * Focus: Data Exposure, Privacy Leaks, Client-Side Secret Leakage & XSS Vectors
 *
 * Re-audited: 2026-09-17 (2nd pass)
 * Verifier: Source code inspection of Customers.jsx, Suppliers.jsx, Recipes.jsx, masking.js,
 *           crypto.js, storageMonitor.js, index.html
 */

export function auditKamkar(context = {}, mode = 'continuous') {
  const findings = [];
  const isGate = mode === 'strict_gate';
  const auditDate = '2026-09-17';
  const auditPass = 2;

  // ─── ORIGINAL FINDINGS (verified against source) ────────────────────────

  // KAMKAR-01: Unmasked customer PII
  // VERIFIED: maskPhone/maskEmail for non-privileged roles, encryptPII before Dexie write.
  findings.push({
    id: 'KAMKAR-01',
    titan: 'kamkar',
    titanName: 'Samy Kamkar',
    severity: isGate ? 'critical' : 'high',
    role: 'marketing',
    roleName: 'Marketing Strategist & Customers',
    finding: 'Customer phone numbers, emails, and address fields stored unmasked in plain IndexedDB tables',
    component: 'omnistock-app/src/pages/Customers.jsx & Dexie DB',
    recommendation: 'Mask customer contact data in standard views and encrypt sensitive PII before writing to Dexie IndexedDB.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'Customers.jsx uses maskPhone/maskEmail for non-privileged roles (canViewPII check). encryptPII() encrypts phone/email via AES-GCM before Dexie write.',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'Customers.jsx: canViewPII = [owner, admin, manager].includes(userRole). Display uses maskPhone/maskEmail conditionally. handleSave calls encryptPII for phone_enc/email_enc. Confirmed.',
    category: 'PII Exposure & Privacy',
    attackVector: 'Any rogue extension or physical terminal inspection can dump raw unencrypted customer directories.'
  });

  // KAMKAR-02: Rich text XSS via DOMPurify
  // REOPENED: DOMPurify is NOT imported or used anywhere in the codebase.
  findings.push({
    id: 'KAMKAR-02',
    titan: 'kamkar',
    titanName: 'Samy Kamkar',
    severity: isGate ? 'critical' : 'high',
    role: 'cost_analyst',
    roleName: 'Cost Analyst & Recipes',
    finding: 'ReactQuill and ReactMarkdown render supplier/product notes without strict DOMPurify sanitization',
    component: 'omnistock-app/src/pages/Recipes.jsx & Suppliers.jsx',
    recommendation: 'Pass all rendered rich text through DOMPurify with strict HTML tag whitelists to prevent stored XSS.',
    status: 'open',
    remediatedAt: null,
    remediation: null,
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'No import of DOMPurify found in any source file. Suppliers.jsx renders notes as plain text (low risk). Recipes.jsx renders ingredients without sanitization. If rich text editors are added, stored XSS is exploitable via supplier/recipe notes.',
    category: 'Stored XSS',
    attackVector: 'A malicious supplier note containing <img src=x onerror=...> executes arbitrary script in cashier session.'
  });

  // KAMKAR-03: Base44 App ID exposed in client bundle
  // VERIFIED: Only public publishable keys use VITE_ prefix.
  findings.push({
    id: 'KAMKAR-03',
    titan: 'kamkar',
    titanName: 'Samy Kamkar',
    severity: 'medium',
    role: 'all',
    roleName: 'All Roles',
    finding: 'Public VITE_ environment variables visible in client-side bundle introspection',
    component: 'omnistock-app/.env.base44-defaults & vite.config.js',
    recommendation: 'Verify that only public publishable keys use VITE_ prefix; route all secret operations through backend proxy.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'Only VITE_BASE44_APP_ID and VITE_BASE44_APP_BASE_URL use VITE_ prefix (public identifiers). All secrets (JWT, HMAC, encryption keys) are server-side only.',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'Confirmed: .env.base44-defaults contains only VITE_BASE44_APP_ID and VITE_BASE44_APP_BASE_URL. JWT_SECRET, HMAC_SECRET, PII_ENCRYPTION_KEY are in backend environment only.',
    category: 'Credential Exposure',
    attackVector: 'Inspecting source maps reveals application identifiers and configuration endpoints.'
  });

  // KAMKAR-OWNER-01: Executive TIN & banking in local storage
  // VERIFIED: No TIN/bank fields in UI. Masking utilities ready if added.
  findings.push({
    id: 'KAMKAR-OWNER-01',
    titan: 'kamkar',
    titanName: 'Samy Kamkar',
    severity: isGate ? 'critical' : 'high',
    role: 'owner',
    roleName: 'Owner of Establishments',
    component: 'omnistock-app/src/pages/Settings.jsx & Dexie DB',
    finding: 'Executive Tax Identification Numbers (TIN) & corporate bank account details cached unencrypted in browser Dexie',
    recommendation: 'Strip banking account details and TIN from client-side persistent databases; request ephemeral masked tokens for fiscal receipting.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'No TIN or bank account fields exist in Settings.jsx or Dexie schema. maskTin() and maskBankAccount() utilities ready for future use. Backend ABAC filters tin/bank_account fields to owner/admin only.',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'Settings.jsx has no TIN/bank fields. db.js schema has no tin/bank_account columns. Backend rbac.js FIELD_ACCESS restricts tin/bank_account to owner/admin. No exposure surface exists.',
    category: 'Executive Data Exposure',
    attackVector: 'An employee inspecting DevTools Application tab can copy the company tax registration and merchant settlement accounts.'
  });

  // KAMKAR-MKT-02: Unhashed customer loyalty export
  // VERIFIED: handleExportCSV checks canViewPII, uses maskExportRow.
  findings.push({
    id: 'KAMKAR-MKT-02',
    titan: 'kamkar',
    titanName: 'Samy Kamkar',
    severity: 'high',
    role: 'marketing',
    roleName: 'Marketing Strategist',
    component: 'omnistock-app/src/pages/Customers.jsx',
    finding: 'Customer loyalty directory export exposes unmasked phone numbers, emails, and purchasing habits without audit log',
    recommendation: 'Enforce column masking on CSV exports and require manager justification before exporting customer marketing lists.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'handleExportCSV checks canViewPII (owner/admin/manager only). maskExportRow() limits columns to name, loyalty_points, status + masked phone/email.',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'Customers.jsx: if (!canViewPII) return alert("Manager or admin authorization required..."). maskExportRow masks phone/email, limits columns. Confirmed.',
    category: 'Data Exfiltration',
    attackVector: 'Disgruntled staff export full VIP customer list with phone numbers to sell to competitor establishments.'
  });

  // KAMKAR-INV-03: Wholesale vendor margins exposed to floor terminals
  // REOPENED: Backend ABAC exists but client-side product cards don't filter cost/margin by role.
  findings.push({
    id: 'KAMKAR-INV-03',
    titan: 'kamkar',
    titanName: 'Samy Kamkar',
    severity: 'medium',
    role: 'inventory',
    roleName: 'Inventory Specialist',
    component: 'omnistock-app/src/pages/Suppliers.jsx & Inventory.jsx',
    finding: 'Supplier wholesale pricing, vendor discounts, and markups exposed to untrusted front-of-house floor terminals',
    recommendation: 'Implement attribute-level access control (ABAC) stripping cost_price and markup fields from cashier-scoped queries.',
    status: 'open',
    remediatedAt: null,
    remediation: null,
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'Backend rbac.js has filterFieldsByRole() stripping cost_price, markup, supplier_cost for non-privileged roles. BUT client-side Inventory.jsx ProductCard and Suppliers.jsx render all fields regardless of role. The /products/filter endpoint exists but is not called from the client.',
    category: 'Wholesale Pricing Leakage',
    attackVector: 'Cashiers see that a cocktail with a menu price of $18 has an ingredient cost of $1.10, triggering internal discontent or customer leakage.'
  });

  // KAMKAR-GATE-04: PDF receipt canvas memory
  // REOPENED: wipeCanvas() exists but SalesReport.jsx doesn't call it after PDF generation.
  findings.push({
    id: 'KAMKAR-GATE-04',
    titan: 'kamkar',
    titanName: 'Samy Kamkar',
    severity: 'low',
    role: 'cashier',
    roleName: 'Cashier',
    finding: 'PDF receipts generated via html2canvas retain customer billing data in uncollected canvas buffers',
    component: 'omnistock-app/src/pages/SalesReport.jsx (jspdf / html2canvas)',
    recommendation: 'Explicitly wipe canvas memory references after PDF dispatch to prevent memory scraping.',
    status: 'open',
    remediatedAt: null,
    remediation: null,
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'storageMonitor.js exports wipeCanvas(canvas) but SalesReport.jsx generatePDF() does not call it. jsPDF doc.save() downloads the file but canvas references remain in browser heap memory.',
    category: 'Memory Hygiene',
    attackVector: 'Long-running kiosk POS retains historical customer receipt canvases in browser heap memory.'
  });

  // ─── NEW FINDINGS (2nd pass) ─────────────────────────────────────────────

  // NEW-KAMKAR-05: Customer search dropdown shows unmasked phone for non-privileged users
  findings.push({
    id: 'KAMKAR-05',
    titan: 'kamkar',
    titanName: 'Samy Kamkar',
    severity: 'medium',
    role: 'cashier',
    roleName: 'Cashier',
    component: 'omnistock-app/src/pages/POS.jsx',
    finding: 'POS customer search dropdown displays unmasked phone numbers to cashiers',
    recommendation: 'Apply maskPhone() to customer search results in the POS customer assignment dropdown, same as Customers.jsx does for card display.',
    status: 'open',
    remediatedAt: null,
    remediation: null,
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'POS.jsx filteredCustomers dropdown: {c.phone || "No phone"} — rendered raw without maskPhone(). Customers.jsx correctly masks for non-privileged roles, but POS customer search does not apply the same masking.',
    category: 'PII Exposure',
    attackVector: 'Cashier searches customer by name and sees full unmasked phone number in the dropdown, bypassing the masking applied on the Customers page.'
  });

  return findings;
}

export default auditKamkar;
