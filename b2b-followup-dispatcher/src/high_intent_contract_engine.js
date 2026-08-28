import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generates an executive milestone contract with direct Escrow PayPal checkout URLs.
 * @param {Object} params
 * @param {string} params.clientName
 * @param {string} params.clientCompany
 * @param {string} params.clientEmail
 * @param {string} params.projectTitle
 * @param {number} params.totalBudgetUsd
 * @param {'3_GIVES' | '50_50' | '100_UPFRONT'} [params.scheduleType='3_GIVES']
 * @returns {Object}
 */
export function generateEscrowContractPackage({
  clientName,
  clientCompany,
  clientEmail,
  projectTitle,
  totalBudgetUsd,
  scheduleType = '3_GIVES'
}) {
  const budgetNum = Number(totalBudgetUsd);
  if (isNaN(budgetNum) || budgetNum <= 0) {
    throw new Error('Valid totalBudgetUsd is required');
  }

  let m1 = 0, m2 = 0, m3 = 0;
  let milestones = [];

  if (scheduleType === '3_GIVES') {
    m1 = Math.round(budgetNum * 0.30);
    m2 = Math.round(budgetNum * 0.35);
    m3 = budgetNum - (m1 + m2);
    milestones = [
      { step: 1, name: 'Milestone 1: 30% Architecture Sprint Retainer (Immediate Start)', amount: m1, pct: '30%' },
      { step: 2, name: 'Milestone 2: 35% Custom Staging Sandbox Review & QA Validation', amount: m2, pct: '35%' },
      { step: 3, name: 'Milestone 3: 35% Final Production Handover & Full IP Transfer', amount: m3, pct: '35%' }
    ];
  } else if (scheduleType === '50_50') {
    m1 = Math.round(budgetNum * 0.50);
    m2 = budgetNum - m1;
    milestones = [
      { step: 1, name: 'Milestone 1: 50% Initial Retainer (Contract Execution)', amount: m1, pct: '50%' },
      { step: 2, name: 'Milestone 2: 50% Production Handover Sign-off', amount: m2, pct: '50%' }
    ];
  } else {
    m1 = budgetNum;
    milestones = [
      { step: 1, name: 'Full Perpetual Buyout Settlement (100% Upfront)', amount: m1, pct: '100%' }
    ];
  }

  const depositAmount = m1;
  const agreementId = `ESC-${Date.now().toString().slice(-6)}`;
  const encodedApp = encodeURIComponent(`${projectTitle} (Milestone 1 Retainer)`);
  const paypalCheckoutUrl = `https://escrow-checkout.surge.sh/?app=${encodedApp}&amount=${depositAmount}`;
  const portalAgreementUrl = `http://localhost:3001/?agreementId=${agreementId}`;

  const contractSummary = `
================================================================================
📄 EXECUTIVE ESCROW CONTRACT AGREEMENT
Agreement Ref: ${agreementId}
Client: ${clientName} (${clientCompany}) <${clientEmail || 'N/A'}>
Project: ${projectTitle}
Total Fixed Fee: $${budgetNum.toLocaleString()} USD
Schedule: ${scheduleType}
================================================================================
MILESTONE BREAKDOWN:
${milestones.map(m => `  • ${m.name}: $${m.amount.toLocaleString()} USD`).join('\n')}

💰 REQUIRED INITIAL DEPOSIT (Milestone 1): $${depositAmount.toLocaleString()} USD
🔗 DIRECT 1-CLICK PAYPAL ESCROW LINK:
${paypalCheckoutUrl}
================================================================================
`.trim();

  return {
    agreementId,
    clientName,
    clientCompany,
    projectTitle,
    totalBudgetUsd: budgetNum,
    depositAmount,
    milestones,
    paypalCheckoutUrl,
    portalAgreementUrl,
    contractSummary
  };
}
