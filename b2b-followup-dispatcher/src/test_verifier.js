import { verifyEmailPreFlight } from './email_verifier.js';

async function testSuite() {
  console.log('====================================================');
  console.log('🧪 TESTING PRE-FLIGHT EMAIL VERIFIER');
  console.log('====================================================\n');

  const testCases = [
    'raj@akqa.com',
    'mharcgatan@linkable.it.com',
    'support@tobys.com',
    'fake_user@nonexistentdomain123985723.xyz',
    'bot@mailinator.com',
    'no-reply@company.com',
    'invalid-email-format'
  ];

  for (const email of testCases) {
    const result = await verifyEmailPreFlight(email);
    console.log(`Checking: ${email}`);
    console.log(` -> Status: ${result.isValid ? '✅ VALID' : '❌ REJECTED'}`);
    console.log(` -> Reason: ${result.reason}`);
    if (result.mxHost) console.log(` -> Primary MX: ${result.mxHost}`);
    console.log('----------------------------------------------------');
  }
}

testSuite().catch(console.error);
