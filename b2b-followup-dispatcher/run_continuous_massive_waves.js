// ============================================================
// CONTINUOUS MASSIVE WAVES DISPATCHER
// Chains Wave 3 (Remaining 25 StructuraPro GCs) & Wave 4 (Remaining 25 OmniStock 3PLs)
// ============================================================

import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOG_FILE = path.join(__dirname, 'src', 'dispatch_log.json');

function runScript(args) {
  return new Promise((resolve, reject) => {
    console.log(`\n============================================================`);
    console.log(`🚀 STARTING WAVE: node dispatch_massive_featured_apps.js ${args.join(' ')}`);
    console.log(`============================================================\n`);

    const proc = spawn('node', ['dispatch_massive_featured_apps.js', ...args], {
      cwd: __dirname,
      stdio: 'inherit',
      shell: true
    });

    proc.on('close', (code) => {
      if (code === 0) {
        console.log(`\n✅ Wave completed successfully with exit code 0.`);
        resolve();
      } else {
        console.error(`\n❌ Wave exited with code ${code}`);
        resolve(); // Continue to next wave anyway
      }
    });

    proc.on('error', (err) => {
      console.error(`\n❌ Process error:`, err);
      resolve();
    });
  });
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  console.log(`============================================================`);
  console.log(`🌊 CONTINUOUS AUTOMATED ENTERPRISE WAVES DISPATCH ENGINE`);
  console.log(`   North Star: Total 100 Enterprise Leads Dispatched`);
  console.log(`============================================================`);

  // Run Wave 3: Remaining 25 StructuraPro Commercial Construction GCs
  console.log(`\n--- 🏗️ TRIGGERING WAVE 3: Remaining 25 StructuraPro GCs ---`);
  await runScript(['--campaign=sitesafe', '--limit=25']);

  console.log(`\n⏸️ Resting 5 seconds between waves to ensure pristine SMTP deliverability...`);
  await sleep(5000);

  // Run Wave 4: Remaining 25 OmniStock 3PL & Cold Storage Giants
  console.log(`\n--- 📦 TRIGGERING WAVE 4: Remaining 25 OmniStock 3PL Giants ---`);
  await runScript(['--campaign=wms', '--limit=25']);

  // Summary
  if (fs.existsSync(LOG_FILE)) {
    const logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
    const sitesafeCount = logs.filter(l => (l.demoUrl || '').includes('sitesafe') && l.status === 'SUCCESS').length;
    const omnistockCount = logs.filter(l => (l.demoUrl || '').includes('omnistock') && l.status === 'SUCCESS').length;
    console.log(`\n============================================================`);
    console.log(`🏆 ALL CONTINUOUS WAVES EXECUTED!`);
    console.log(`   - Total Verified StructuraPro Dispatches: ${sitesafeCount}`);
    console.log(`   - Total Verified OmniStock Dispatches: ${omnistockCount}`);
    console.log(`   - Grand Total Dispatched in System: ${logs.length}`);
    console.log(`============================================================`);
  }
}

main().catch(console.error);
