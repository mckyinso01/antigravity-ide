// ============================================================
// 24/7 Autonomous Programmatic Audit & Auto-Fulfillment Daemon
// Automatically scans targets, generates reports, and arms outreach
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { scanDomain } from './audit_scanner.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGETS_FILE = path.join(__dirname, 'targets.json');
const REPORTS_DIR = path.join(__dirname, 'reports');

if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

async function runDaemon() {
  console.log('='.repeat(65));
  console.log('🤖 24/7 PROGRAMMATIC AUDIT BOT ACTIVATED');
  console.log('='.repeat(65));

  if (!fs.existsSync(TARGETS_FILE)) {
    console.error('❌ targets.json not found!');
    return;
  }

  const targets = JSON.parse(fs.readFileSync(TARGETS_FILE, 'utf-8'));
  let completed = 0;

  for (let i = 0; i < targets.length; i++) {
    const item = targets[i];
    if (item.status === 'AUDITED') {
      console.log(`⏩ [Skipping] ${item.domain} already audited.`);
      continue;
    }

    console.log(`\n🎯 [${i + 1}/${targets.length}] Auditing: ${item.domain} (${item.businessName})...`);
    const { metrics, report } = await scanDomain(item.domain);

    const safeDomain = item.domain.replace(/[^a-zA-Z0-9.-]/g, '_');
    const reportFilename = `audit_${safeDomain}_${Date.now()}.md`;
    const reportPath = path.join(REPORTS_DIR, reportFilename);

    fs.writeFileSync(reportPath, report.reportMarkdown, 'utf-8');
    console.log(`📄 Saved Executive Report -> ${reportPath}`);

    item.status = 'AUDITED';
    item.lastAuditedAt = new Date().toISOString();
    item.reportFile = reportFilename;
    item.loadTimeMs = metrics.loadTimeMs;
    completed++;
  }

  fs.writeFileSync(TARGETS_FILE, JSON.stringify(targets, null, 2), 'utf-8');
  console.log('\n' + '='.repeat(65));
  console.log(`✅ Daemon Cycle Finished: ${completed} domains audited with 1-click $299 checkout links!`);
  console.log('='.repeat(65));
}

runDaemon().catch(console.error);
