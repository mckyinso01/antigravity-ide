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
    status: 'remediated',
    remediatedAt: '2026-09-18',
    remediation: 'DOMPurify installed and wrapped in src/lib/security/sanitize.js (sanitizeHtml with strict tag whitelist + sanitizeText for plain text). Recipes.jsx and Suppliers.jsx import and apply sanitizeText() to all user-supplied text fields (names, notes, addresses, contact persons).',
    verifiedAt: '2026-09-18',
    auditPass,
    verificationNote: 'sanitize.js: import DOMPurify, STRICT_CONFIG with ALLOWED_TAGS/FORBID_TAGS. Recipes.jsx: sanitizeText(recipe.name), sanitizeText(recipe.product_name). Suppliers.jsx: sanitizeText(s.name), sanitizeText(s.contact_person), sanitizeText(s.address), sanitizeText(s.notes). All user text rendered through DOMPurify.',
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
    status: 'remediated',
    remediatedAt: '2026-09-18',
    remediation: 'Inventory.jsx calls api.security.filterProductsByRole() to apply backend ABAC field filtering (strips cost_price, markup, supplier_cost for cashiers). ProductCard.jsx has client-side canViewCost ABAC gate that hides cost/margin for non-privileged roles. Backend /products/filter endpoint wired and called from client.',
    verifiedAt: '2026-09-18',
    auditPass,
    verificationNote: 'Inventory.jsx loadData: const filtered = await api.security.filterProductsByRole(p || []). ProductCard.jsx: canViewCost = [inventory, analyst, owner, admin].includes(role). Cost/margin only rendered when canViewCost. Backend rbac.js filterFieldsByRole strips cost_price, markup, supplier_cost.',
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
    status: 'remediated',
    remediatedAt: '2026-09-18',
    remediation: 'SalesReport.jsx generatePDF() calls wipeCanvas() after doc.save() to clear jsPDF internal canvas references from browser heap memory.',
    verifiedAt: '2026-09-18',
    auditPass,
    verificationNote: 'SalesReport.jsx: import { wipeCanvas } from "@/lib/security/storageMonitor". After doc.save(): const pdfCanvas = doc.internal?.canvas; if (pdfCanvas) wipeCanvas(pdfCanvas). Confirmed in source.',
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
    status: 'remediated',
    remediatedAt: '2026-09-18',
    remediation: 'POS.jsx customer search dropdown now applies maskPhone() for non-privileged roles via canViewPII check, matching Customers.jsx masking pattern.',
    verifiedAt: '2026-09-18',
    auditPass,
    verificationNote: 'POS.jsx: canViewPII = [owner, admin, manager].includes(userRole). Customer dropdown: {canViewPII ? (c.phone || "No phone") : (c.phone ? maskPhone(c.phone) : "No phone")}. maskPhone imported from @/lib/security/masking. Confirmed.',
    category: 'PII Exposure',
    attackVector: 'Cashier searches customer by name and sees full unmasked phone number in the dropdown, bypassing the masking applied on the Customers page.'
  });

  return findings;
}

export default auditKamkar;
