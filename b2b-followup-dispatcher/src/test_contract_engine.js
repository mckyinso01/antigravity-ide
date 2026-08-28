import { generateEscrowContractPackage } from './high_intent_contract_engine.js';

function runContractTest() {
  console.log('====================================================');
  console.log('🚀 STEP 3: HIGH-INTENT ESCROW CONTRACT ENGINE TEST');
  console.log('====================================================\n');

  const contract1 = generateEscrowContractPackage({
    clientName: 'David K.',
    clientCompany: 'David K. Ventures',
    clientEmail: 'david.k.ventures@gmail.com',
    projectTitle: 'Next.js & Tailwind High-Performance SaaS Dashboard',
    totalBudgetUsd: 4500,
    scheduleType: '3_GIVES'
  });

  console.log(contract1.contractSummary);
  console.log('\nGenerated PayPal Checkout URL:');
  console.log(contract1.paypalCheckoutUrl);
}

runContractTest();
