// ============================================================
// Instant 1-Click Milestone Escrow & Invoice Generator
// Generates binding, professional payment agreements & invoice specs
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateInvoiceAgreement({
  clientName,
  organization,
  contactEmail,
  projectTitle,
  totalAmount,
  paymentType = 'PILOT_DEPOSIT', // 'PILOT_DEPOSIT', 'MILESTONE_50_50', 'FULL_PERPETUAL'
  currency = 'USD'
}) {
  const invoiceId = `INV-${Date.now().toString().slice(-6)}`;
  const dateStr = new Date().toISOString().split('T')[0];

  let paymentStructure = '';
  let depositAmount = totalAmount;

  if (paymentType === 'PILOT_DEPOSIT') {
    depositAmount = currency === 'USD' ? '$650 USD' : '₱35,000 PHP';
    paymentStructure = `
• Milestone 1 (Immediate Pilot Deposit): ${depositAmount} (Secures dedicated 48h sandbox deployment).
• Milestone 2 (Full Rollout Balance): ${totalAmount} minus ${depositAmount} upon enterprise deployment sign-off.`;
  } else if (paymentType === 'MILESTONE_50_50') {
    paymentStructure = `
• Milestone 1 (50% Upfront Retainer): 50% upon contract execution.
• Milestone 2 (50% Final Release): 50% upon code handover and production server delivery.`;
  } else {
    paymentStructure = `
• Full Perpetual License Payment: ${totalAmount} (100% upfront settlement).`;
  }

  const document = `# 📄 OFFICIAL MILESTONE INVOICE & SERVICE AGREEMENT

**Invoice ID:** \`${invoiceId}\`  
**Date:** ${dateStr}  
**Client:** ${clientName} (${organization})  
**Recipient Email:** \`${contactEmail}\`  
**Provider:** Gatz Solutions Architecture / Linkable Systems  
**Project:** ${projectTitle}  

---

### 💵 Payment Schedule & Escrow Breakdown

${paymentStructure}

---

### 💳 Instant Settlement Rails

#### 🌐 International Clients (USD / EUR / GBP):
* **Stripe 1-Click Payment Link:** \`https://buy.stripe.com/demo_link_${invoiceId}\`
* **Wise Business Direct Transfer:**
  * **Beneficiary:** Mharc Gatan / Solutions Architecture
  * **Routing / SWIFT:** Contact \`mharcgatan@linkable.it.com\` for direct wire coordinates.
* **PayPal Escrow Milestone Invoice:** Sent directly to \`${contactEmail}\`

#### 🇵🇭 Philippine Local Clients (PHP):
* **PayMongo / GCash QR / Online Banking:**
  * **Supported Banks:** BDO, BPI, UnionBank, GCash, Maya
  * **1-Click Checkout Link:** \`https://pm.link/invoice/${invoiceId}\`

---

### 🛡️ Deliverable & SLA Guarantee
1. **Deployment Window:** 48 Hours from initial deposit verification.
2. **IP & Code Ownership:** 100% full intellectual property & source code license transferred upon final milestone completion.
3. **Escrow Safety:** Deposits are held under strict milestone completion guarantees.
`;

  return { invoiceId, document };
}

// CLI Execution Support
if (process.argv.includes('--generate-sample')) {
  const sample = generateInvoiceAgreement({
    clientName: 'Sarah Hatchett (CIO)',
    organization: 'Cleveland Clinic Foundation',
    contactEmail: 'hatches@ccf.org',
    projectTitle: 'Clinical Pristine ICU OS ($48,500 Enterprise License)',
    totalAmount: '$48,500 USD',
    paymentType: 'PILOT_DEPOSIT'
  });

  const outPath = path.join(__dirname, 'sample_invoice_agreement.md');
  fs.writeFileSync(outPath, sample.document, 'utf-8');
  console.log(`✅ Sample Invoice & Escrow Agreement generated at: ${outPath}`);
  console.log(sample.document);
}
