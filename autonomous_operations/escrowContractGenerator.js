/**
 * LinkableAI Autonomous 3-Gives Milestone Escrow Contract Generator
 * Generates binding enterprise software agreements with SHA-256 integrity hash,
 * 100% Free Custom Modification guarantee, and 3-Gives installment schedule.
 */

const crypto = require('crypto');

function generateEscrowContract({ clientName, clientCompany, clientEmail, tierName, amountUSD, amountPHP, appSelected }) {
  const contractId = "ESCROW-" + crypto.randomBytes(4).toString('hex').toUpperCase();
  const timestamp = new Date().toISOString();

  const give1_USD = (amountUSD * 0.30).toLocaleString();
  const give1_PHP = (amountPHP * 0.30).toLocaleString();

  const give2_USD = (amountUSD * 0.35).toLocaleString();
  const give2_PHP = (amountPHP * 0.35).toLocaleString();

  const give3_USD = (amountUSD * 0.35).toLocaleString();
  const give3_PHP = (amountPHP * 0.35).toLocaleString();

  const rawAgreementPayload = `${contractId}|${clientCompany}|${tierName}|${amountUSD}|${timestamp}|LINKABLE_AI_FOUNDER_MHARC_GATAN`;
  const signatureHash = crypto.createHash('sha256').update(rawAgreementPayload).digest('hex');

  const contractMarkdown = `
# 📜 SOVEREIGN SOFTWARE MASTER LICENSING & ESCROW AGREEMENT
**Contract Identifier:** \`${contractId}\`  
**Execution Timestamp:** ${timestamp}  
**Cryptographic SHA-256 Seal:** \`${signatureHash}\`

---

### 1. PARTIES TO THE AGREEMENT
* **Licensor:** LinkableAI Enterprise Ecosystem (Founder & Principal Architect: **Mharc Gatan**)
* **Licensee / Client:** **${clientName}** (${clientCompany}) • Email: \`${clientEmail}\`
* **Target Enterprise Platform:** **${appSelected}**
* **Selected Commercial Tier:** **${tierName}**
* **Total Perpetual Valuation:** **$${amountUSD.toLocaleString()} USD** (₱${amountPHP.toLocaleString()} PHP)

---

### 2. THE 3-GIVES MILESTONE ESCROW PAYMENT SCHEDULE
1. **1st Give (30% Retainer Deposit — $${give1_USD} USD / ₱${give1_PHP} PHP):**
   * *Activation Deliverable:* Instantly triggers dedicated senior systems architecture engineering and provisions a private, isolated cloud fork and custom Git workspace.
   * *Non-Refundable Condition:* Covers initial direct computational infrastructure and senior engineering labor allocated immediately upon contract signing.

2. **2nd Give (35% Modification Approval — $${give2_USD} USD / ₱${give2_PHP} PHP):**
   * *Staging Approval Deliverable:* Due **ONLY** after the client inspects, tests, and approves all custom workflows, schema mappings, and UI tailoring in the staging sandbox.

3. **3rd Give (35% Live Production Handover — $${give3_USD} USD / ₱${give3_PHP} PHP):**
   * *Production Sign-Off Deliverable:* Due **ONLY** when the system is 100% live, operational on client-selected infrastructure, and staff onboarding is fulfilled.

---

### 3. 100% FREE CUSTOM MODIFICATION GUARANTEE
LinkableAI hereby warrants that **all requested custom database schema mappings, external API connectors (HL7 FHIR, ERP, NOAA, 3PL), and branding adjustments are performed at ZERO additional cost (₱0 / $0)** until full organizational acceptance.

---

### 4. SOVEREIGN IP & LIFETIME ZERO-RENT TERMS
* **Perpetual Software Ownership:** Zero monthly recurring software taxes or per-seat penalties.
* **On-Premise / Private Cloud Sovereignty:** Full operational autonomy with 100% offline air-gapped capability.

---
*Digitally Encrypted and Dispatched by LinkableAI Autonomous Enterprise Daemon*
`;

  return {
    contractId,
    timestamp,
    signatureHash,
    contractMarkdown,
    milestones: {
      give1: { percent: 30, usd: give1_USD, php: give1_PHP },
      give2: { percent: 35, usd: give2_USD, php: give2_PHP },
      give3: { percent: 35, usd: give3_USD, php: give3_PHP }
    }
  };
}

module.exports = {
  generateEscrowContract
};
