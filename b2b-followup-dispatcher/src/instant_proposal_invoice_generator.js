// ==========================================================================
// INSTANT PROPOSAL & FAST-CASH INVOICE GENERATOR
// Automated Generation of Binding Pilot Agreements & PayPal Escrow Links
// ==========================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INVOICES_DIR = path.join(__dirname, '../invoices');
if (!fs.existsSync(INVOICES_DIR)) {
  fs.mkdirSync(INVOICES_DIR, { recursive: true });
}

export function generateCustomProposalAndInvoice(lead) {
  const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
  const date = new Date().toISOString().split('T')[0];
  const depositAmount = lead.pilotDeposit || 650;
  const fullLicenseAmount = lead.fullLicensePrice || 48000;

  const proposalMarkdown = `# 📋 MASTER SERVICES AGREEMENT & FAST-START PILOT PROPOSAL
**Agreement Reference:** ${invoiceNumber}  
**Date:** ${date}  
**Service Provider:** Linkable Systems (Lead Solutions Architect: Mharc Gatan)  
**Client:** ${lead.clientName} (${lead.company || "Direct Client"})  
**Target Solution:** ${lead.matchedWeapon || "Linkable Industrial Operating System"}  
**Live Sandbox Reference:** ${lead.liveDemoLink || "https://linkable.it.com"}  

---

## 🎯 1. PROJECT SCOPE & IMMEDIATE OBJECTIVES
The Client requires rapid deployment and functional integration for:
> **"${lead.scope || "Custom automated enterprise operating system deployment"}"**

### Deliverables within 48-Hour Sprint:
1. **Dedicated Cloud/Local Sandbox Instance:** Pre-configured with Client's exact data parameters and branding.
2. **Core Anomaly & Operational Logic:** Complete implementation of real-time telemetry, regulatory calculation models, and audit logs.
3. **Dual-Witness Cryptographic Integrity:** Implementation of WORM SHA-256 immutable records and role-based credential gates.
4. **Air-Gapped / Zero-Vendor-Lockin Guarantee:** Client retains 100% ownership of source code, data, and deployment containers with zero recurring mandatory seat fees.

---

## 💳 2. FINANCIAL TERMS & ESCROW MILESTONES

| Milestone | Deliverable | Amount (USD) | Payment Status |
| :--- | :--- | :--- | :--- |
| **Milestone 1: 48-Hour Functional Pilot** | Private sandbox deployment, live walkthrough & verification | **$${depositAmount}.00** | ⏳ **DUE UPON SIGNING** (100% Refundable Guarantee) |
| **Milestone 2: Production Handover** | Full enterprise source code, documentation & perpetual license | **$${(fullLicenseAmount - depositAmount).toLocaleString()}.00** | Due upon final client sign-off |
| **Total Value** | **Full Perpetual Enterprise Operating System** | **$${fullLicenseAmount.toLocaleString()}.00** | — |

---

## 🛡️ 3. 100% RISK-FREE PILOT GUARANTEE
If the 48-Hour Functional Sandbox does not meet 100% of the technical specifications outlined above, the $${depositAmount} USD pilot deposit will be refunded immediately with zero questions asked.

---

## ✍️ 4. AUTHORIZATION & INSTANT PAYMENT LINK

👉 **Direct Pilot Deposit Payment Link (PayPal Escrow):**  
[Click to Pay $${depositAmount}.00 USD via PayPal Escrow](https://www.paypal.com/paypalme/mharcgatan/${depositAmount}USD)

**Signed on behalf of Linkable Systems:**  
*Mharc Gatan*  
Lead Solutions Architect | Linkable Systems  
mharcgatan@linkable.it.com  
https://linkable.it.com
`;

  const invoiceFilePath = path.join(INVOICES_DIR, `${invoiceNumber}_${lead.clientName.replace(/[^a-zA-Z0-9]/g, '_')}.md`);
  fs.writeFileSync(invoiceFilePath, proposalMarkdown, 'utf8');

  console.log(`\n📄 [PROPOSAL GENERATED] Created official proposal agreement: ${invoiceFilePath}`);
  return { invoiceNumber, invoiceFilePath, proposalMarkdown };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const sampleLead = {
    clientName: "Ramon Castillo",
    company: "Castillo Brands E-Commerce",
    matchedWeapon: "Saccade-UI Biometric CRO Engine",
    liveDemoLink: "https://saccade.linkable.it.com",
    scope: "Meta Ads high CPC / low ROAS optimization and Shopify landing page eye-tracking audit",
    pilotDeposit: 450,
    fullLicensePrice: 9500
  };

  generateCustomProposalAndInvoice(sampleLead);
}
