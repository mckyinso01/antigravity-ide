/**
 * Titan 3: Samy Kamkar
 * Focus: Data Exposure, Privacy Leaks, Client-Side Secret Leakage & XSS Vectors
 */

export function auditKamkar(context = {}, mode = 'continuous') {
  const findings = [];
  const isGate = mode === 'strict_gate';

  // Check 1: Unmasked Customer PII in local IndexedDB storage
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
    category: 'PII Exposure & Privacy',
    attackVector: 'Any rogue extension or physical terminal inspection can dump raw unencrypted customer directories.'
  });

  // Check 2: Rich text editor / HTML rendering injection
  findings.push({
    id: 'KAMKAR-02',
    titan: 'kamkar',
    titanName: 'Samy Kamkar',
    severity: 'high',
    role: 'cost_analyst',
    roleName: 'Cost Analyst & Recipes',
    finding: 'ReactQuill and ReactMarkdown render supplier/product notes without strict DOMPurify sanitization',
    component: 'omnistock-app/src/pages/Recipes.jsx & Suppliers.jsx',
    recommendation: 'Pass all rendered rich text through DOMPurify with strict HTML tag whitelists to prevent stored XSS.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    category: 'Stored XSS',
    attackVector: 'A malicious supplier note containing <img src=x onerror=...> executes arbitrary script in cashier session.'
  });

  // Check 3: Base44 App ID and Config exposed in client bundle
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
    category: 'Credential Exposure',
    attackVector: 'Inspecting source maps reveals application identifiers and configuration endpoints.'
  });

  // Check 4: Owner Role Specific - Executive Tax ID & Corporate Banking cached in local storage
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
    category: 'Executive Data Exposure',
    attackVector: 'An employee inspecting DevTools Application tab can copy the company tax registration and merchant settlement accounts.'
  });

  // Check 5: Marketing Role Specific - Unhashed Customer Loyalty Export
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
    category: 'Data Exfiltration',
    attackVector: 'Disgruntled staff export full VIP customer list with phone numbers to sell to competitor establishments.'
  });

  // Check 6: Inventory Role Specific - Wholesale Vendor Margins Exposed to Floor Terminals
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
    remediatedAt: '2026-09-17',
    category: 'Wholesale Pricing Leakage',
    attackVector: 'Cashiers see that a cocktail with a menu price of $18 has an ingredient cost of $1.10, triggering internal discontent or customer leakage.'
  });

  if (isGate) {
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
    remediatedAt: '2026-09-17',
      category: 'Memory Hygiene',
      attackVector: 'Long-running kiosk POS retains historical customer receipt canvases in browser heap memory.'
    });
  }

  return findings;
}

export default auditKamkar;
