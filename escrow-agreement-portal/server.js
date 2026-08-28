// ============================================================
// Escrow Agreement Portal - Standalone Zero-Dependency Core Server
// Runs natively on Node.js without heavy node_modules
// ============================================================

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // 1. API: Generate Agreement
  if (req.url === '/api/agreements/generate' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        const {
          developerName = 'Solutions Architect',
          developerEmail = 'mharcgatan@linkable.it.com',
          clientName,
          clientCompany = 'Client Organization',
          clientEmail,
          projectTitle,
          totalBudgetUsd,
          scheduleType = '3_GIVES'
        } = data;

        if (!clientName || !projectTitle || !totalBudgetUsd) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'clientName, projectTitle, and totalBudgetUsd are required.' }));
          return;
        }

        const budgetNum = parseFloat(totalBudgetUsd.toString().replace(/[^0-9.]/g, ''));
        if (isNaN(budgetNum) || budgetNum <= 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Please provide a valid numeric total budget.' }));
          return;
        }

        const agreementId = `ESC-${Date.now().toString().slice(-6)}`;
        const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

        let milestones = [];
        let depositAmount = 0;

        if (scheduleType === '3_GIVES') {
          const m1 = Math.round(budgetNum * 0.30);
          const m2 = Math.round(budgetNum * 0.35);
          const m3 = budgetNum - (m1 + m2);
          depositAmount = m1;
          milestones = [
            { name: 'Milestone 1: 30% Architecture Sprint Retainer (Starts Immediately)', amount: `$${m1.toLocaleString()} USD` },
            { name: 'Milestone 2: 35% Custom Staging Sandbox Review & QA Validation', amount: `$${m2.toLocaleString()} USD` },
            { name: 'Milestone 3: 35% Final Production Handover & Full IP Code Transfer', amount: `$${m3.toLocaleString()} USD` }
          ];
        } else if (scheduleType === '50_50') {
          const half = Math.round(budgetNum * 0.50);
          const finalHalf = budgetNum - half;
          depositAmount = half;
          milestones = [
            { name: 'Milestone 1: 50% Initial Retainer (Contract Execution)', amount: `$${half.toLocaleString()} USD` },
            { name: 'Milestone 2: 50% Production Handover Sign-off', amount: `$${finalHalf.toLocaleString()} USD` }
          ];
        } else {
          depositAmount = budgetNum;
          milestones = [
            { name: 'Full Perpetual Buyout Settlement (100% Upfront)', amount: `$${budgetNum.toLocaleString()} USD` }
          ];
        }

        const encodedApp = encodeURIComponent(`${projectTitle} (Milestone 1 Deposit)`);
        const paypalCheckoutUrl = `https://escrow-checkout.surge.sh/?app=${encodedApp}&amount=${depositAmount}`;

        const agreementMarkdown = `# 📄 BINDING MILESTONE SERVICE & ESCROW AGREEMENT
**Agreement ID:** \`${agreementId}\`  
**Execution Date:** ${dateStr}  
**Service Provider:** ${developerName} (\`${developerEmail}\`)  
**Client Entity:** ${clientName} — ${clientCompany} (\`${clientEmail || 'N/A'}\`)  
**Project Scope:** ${projectTitle}  
**Total Valuation:** **$${budgetNum.toLocaleString()} USD**  

---

### 💵 Milestone Escrow Breakdown
${milestones.map((m, idx) => `${idx + 1}. **${m.name}**: \`${m.amount}\``).join('\n')}

---

### 💳 Instant Settlement Rails for Milestone 1 Retainer ($${depositAmount.toLocaleString()} USD)
👉 **1-Click Verified PayPal / Card Escrow:** [Click to Lock Milestone 1 Retainer](${paypalCheckoutUrl})  
👉 **Direct Wire / SWIFT Inquiries:** Contact \`${developerEmail}\`

---

### 🛡️ Core Guarantees & Intellectual Property
1. **Milestone Protection:** Funds for each milestone are held securely and released only upon explicit client review and sign-off.
2. **100% IP Transfer:** Full proprietary source code, credentials, and digital assets transfer to ${clientCompany} upon completion.
3. **Execution Guarantee:** Sprint begins within 24 hours of Milestone 1 settlement confirmation.
`;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          agreementId,
          date: dateStr,
          totalBudgetUsd: budgetNum,
          depositAmount,
          milestones,
          paypalCheckoutUrl,
          markdown: agreementMarkdown
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // 2. Static File Server
  let reqPath = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const filePath = path.join(PUBLIC_DIR, reqPath);
  const ext = path.extname(filePath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`🚀 [EscrowFlow SaaS] Zero-Dependency Server Live on http://localhost:${PORT}`);
});
