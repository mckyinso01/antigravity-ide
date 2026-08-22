// 🧪 LIVE TEST RUNNER FOR WHATSAPP EXECUTIVE NOTIFICATIONS
const { sendWhatsAppMessage, sendWhatsAppExecutiveDigest, sendWhatsAppInboundAlert } = require('./whatsappNotificationEngine');

async function testWhatsApp() {
  console.log('======================================================');
  console.log('🧪 TESTING TITAN WHATSAPP AUTONOMOUS NOTIFICATION ENGINE');
  console.log('======================================================\n');

  console.log('1. Checking configured environment variables...');
  const phone = process.env.WHATSAPP_PHONE;
  const key = process.env.WHATSAPP_API_KEY;
  console.log(`   • WHATSAPP_PHONE:   ${phone ? '+' + phone.replace(/[^0-9]/g, '') : '⚠️ NOT SET'}`);
  console.log(`   • WHATSAPP_API_KEY: ${key ? '****** (CONFIGURED)' : '⚠️ NOT SET'}\n`);

  if (!phone || !key) {
    console.log('ℹ️ To test live dispatch, set WHATSAPP_PHONE and WHATSAPP_API_KEY in hospital_leads_database/.env');
    console.log('Example:');
    console.log('WHATSAPP_PHONE=+639171234567');
    console.log('WHATSAPP_API_KEY=123456\n');
    return;
  }

  console.log('2. Dispatching sample hourly executive digest...');
  const result = await sendWhatsAppExecutiveDigest({
    totalHospitals: 129,
    subdomainResults: [
      { url: 'https://linkable.it.com', healthy: true, latency: 14 },
      { url: 'https://claimguard.linkable.it.com', healthy: true, latency: 18 },
      { url: 'https://clinical.linkable.it.com', healthy: true, latency: 15 },
      { url: 'https://sitesafe.linkable.it.com', healthy: true, latency: 22 },
      { url: 'https://omnistock.linkable.it.com', healthy: true, latency: 16 },
      { url: 'https://saccade.linkable.it.com', healthy: true, latency: 15 }
    ],
    unreadInbound: 0
  });

  console.log('\n3. Result:', result);
}

testWhatsApp()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Test error:', err);
    process.exit(1);
  });
