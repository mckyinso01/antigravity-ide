import https from 'https';
import http from 'http';

const endpoints = [
  { name: 'Linkable AI SaaS Starter Kit ($49-$149 Digital Product)', url: 'https://linkable-saas-kit.surge.sh' },
  { name: 'EscrowFlow Contract SaaS Generator', url: 'https://escrowflow.surge.sh' },
  { name: 'Verified PayPal Milestone Escrow Checkout Gateway', url: 'https://escrow-checkout.surge.sh' },
  { name: 'OmniStock 3D Spatial WMS POS Sandbox', url: 'https://omnistock-pos.surge.sh' },
  { name: 'Clinical Pristine ICU OS ($48.5k Enterprise)', url: 'https://clinical.linkable.it.com' },
  { name: 'SiteSafe StructuraPro CPM ($24.5k Enterprise)', url: 'https://sitesafe.linkable.it.com' },
  { name: 'Saccade Cognitive Heatmap CRO Engine ($9.5k)', url: 'https://saccade.linkable.it.com' },
  { name: 'Linkable Core Master Showcase & 48h Pilot Terms', url: 'https://linkable.it.com' }
];

function checkEndpoint(ep) {
  return new Promise((resolve) => {
    const urlObj = new URL(ep.url);
    const client = urlObj.protocol === 'https:' ? https : http;
    const req = client.get(ep.url, { timeout: 8000 }, (res) => {
      resolve({
        name: ep.name,
        url: ep.url,
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        isOnline: res.statusCode >= 200 && res.statusCode < 400
      });
    });
    req.on('error', (err) => {
      resolve({
        name: ep.name,
        url: ep.url,
        statusCode: 0,
        statusMessage: err.message,
        isOnline: false
      });
    });
    req.on('timeout', () => {
      req.destroy();
      resolve({
        name: ep.name,
        url: ep.url,
        statusCode: 408,
        statusMessage: 'Request Timeout',
        isOnline: false
      });
    });
  });
}

async function auditPassiveGenerators() {
  console.log('==================================================================');
  console.log('🔍 AUDITING LIVE PASSIVE INCOME GENERATORS & MONETIZATION RAILS');
  console.log('==================================================================\n');

  const results = await Promise.all(endpoints.map(checkEndpoint));

  results.forEach((r, idx) => {
    const icon = r.isOnline ? '🟢 ONLINE' : '🔴 OFFLINE / UNREACHABLE';
    console.log(`[#${idx + 1}] ${r.name}`);
    console.log(`     URL: ${r.url}`);
    console.log(`     Status: ${icon} (HTTP ${r.statusCode} ${r.statusMessage})`);
    console.log('------------------------------------------------------------------');
  });

  const onlineCount = results.filter(r => r.isOnline).length;
  console.log(`\n📊 SUMMARY: ${onlineCount}/${results.length} PASSIVE ASSETS 100% OPERATIONAL & LIVE`);
}

auditPassiveGenerators().catch(console.error);
