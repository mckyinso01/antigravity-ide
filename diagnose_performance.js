/**
 * ⚡ DIAGNOSE PLATFORM SLOWDOWN & BOTTLENECKS
 */

const os = require('os');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { execSync } = require('child_process');

console.log('========================================================================');
console.log('🔍 PERFORMANCE BOTTLENECK & SLOWDOWN DEEP AUDIT');
console.log(`⏰ Timestamp: ${new Date().toISOString()}`);
console.log('========================================================================\n');

// 1. System Memory & CPU Load
console.log('💻 1. SYSTEM RESOURCE UTILIZATION:');
const totalMem = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
const freeMem = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);
const usedMem = (totalMem - freeMem).toFixed(2);
const memPercent = ((usedMem / totalMem) * 100).toFixed(1);

console.log(`   ├─ Total RAM:      ${totalMem} GB`);
console.log(`   ├─ Used RAM:       ${usedMem} GB (${memPercent}%)`);
console.log(`   ├─ Free RAM:       ${freeMem} GB`);
console.log(`   ├─ CPU Cores:      ${os.cpus().length}`);
console.log(`   └─ OS Load Avg:    ${os.loadavg ? os.loadavg().map(l => l.toFixed(2)).join(', ') : 'N/A'}`);

// 2. Active Node Processes
console.log('\n⚙️ 2. ACTIVE NODE.JS / SERVER PROCESSES:');
try {
  const tasklist = execSync('tasklist /FI "IMAGENAME eq node.exe" /FO CSV /NH', { encoding: 'utf8' }).trim();
  const lines = tasklist.split('\n').filter(Boolean);
  console.log(`   ├─ Total Node Processes: ${lines.length}`);
  lines.forEach(l => {
    console.log(`   │  ${l.replace(/"/g, '')}`);
  });
} catch (e) {
  console.log('   ⚠️ Error getting tasklist:', e.message);
}

// 3. Frontend Polling & DOM Asset Inspection
console.log('\n🌐 3. FRONTEND SCRIPT & POLLING FREQUENCY AUDIT:');
const hubAppJs = path.join(__dirname, 'titan-flagship-hub', 'app.js');
if (fs.existsSync(hubAppJs)) {
  const content = fs.readFileSync(hubAppJs, 'utf8');
  const setIntervalMatches = content.match(/setInterval\([^,]+,\s*([0-9]+)\)/g);
  console.log('   ├─ titan-flagship-hub/app.js intervals:');
  if (setIntervalMatches) {
    setIntervalMatches.forEach(m => console.log(`   │  ├─ ${m}`));
  } else {
    console.log('   │  └─ No setInterval found');
  }

  // Check video preloading tags in HTML
  const hubHtml = path.join(__dirname, 'titan-flagship-hub', 'index.html');
  if (fs.existsSync(hubHtml)) {
    const html = fs.readFileSync(hubHtml, 'utf8');
    const videos = html.match(/<video[^>]*>/gi);
    console.log(`   └─ Video Tags in Hub: ${videos ? videos.length : 0}`);
    if (videos) {
      videos.forEach((v, i) => {
        console.log(`      ├─ Video #${i + 1}: ${v}`);
      });
    }
  }
}

// 4. Subdomains Latency & Response Size
console.log('\n⚡ 4. CLOUD & LOCAL ENDPOINT LATENCY PROFILE:');
const TARGETS = [
  'https://linkable.it.com',
  'https://claimguard.linkable.it.com',
  'https://clinical.linkable.it.com',
  'https://sitesafe.linkable.it.com',
  'https://omnistock.linkable.it.com',
  'https://saccade.linkable.it.com',
  'http://localhost:8089',
  'http://localhost:4173',
  'http://localhost:4174',
  'http://localhost:4179',
  'http://localhost:8094',
  'http://localhost:8095'
];

async function measureEndpoint(u) {
  return new Promise((resolve) => {
    const start = Date.now();
    const client = u.startsWith('https') ? https : http;
    const req = client.get(u, { timeout: 10000 }, (res) => {
      let bytes = 0;
      res.on('data', chunk => { bytes += chunk.length; });
      res.on('end', () => {
        const dur = Date.now() - start;
        resolve({ url: u, status: res.statusCode, duration: dur, bytes: (bytes / 1024).toFixed(1) });
      });
    });
    req.on('error', (e) => resolve({ url: u, status: 0, duration: 9999, bytes: 0, error: e.message }));
    req.on('timeout', () => { req.destroy(); resolve({ url: u, status: 408, duration: 10000, bytes: 0, error: 'TIMEOUT' }); });
  });
}

(async () => {
  for (const t of TARGETS) {
    const r = await measureEndpoint(t);
    const badge = r.duration < 300 ? '🚀 FAST' : r.duration < 1000 ? '⚠️ MODERATE' : '🐌 SLOW';
    console.log(`   ${badge.padEnd(12)} ${r.url.padEnd(36)} -> ${r.duration}ms | HTTP ${r.status} | Size: ${r.bytes} KB`);
  }
  console.log('\n========================================================================');
})();
