// ============================================================
// Autonomous Revenue Pipeline & Closed Cash Tracker
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LEADS_FILE = path.join(__dirname, 'leads.json');

export function auditPipeline() {
  if (!fs.existsSync(LEADS_FILE)) {
    throw new Error('Leads file not found!');
  }

  const leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));

  let totalPipelineUSD = 0;
  const breakdownByVertical = {};
  const stageCounts = {};

  leads.forEach((lead) => {
    // Parse numeric budget
    const budgetStr = lead.budget || '$0';
    const match = budgetStr.match(/\$([0-9,]+)/);
    const amount = match ? parseInt(match[1].replace(/,/g, ''), 10) : 4999;

    totalPipelineUSD += amount;

    const campaign = lead.campaign.toUpperCase();
    breakdownByVertical[campaign] = (breakdownByVertical[campaign] || 0) + amount;

    const status = lead.status || 'UNASSIGNED';
    stageCounts[status] = (stageCounts[status] || 0) + 1;
  });

  return {
    totalLeads: leads.length,
    totalPipelineUSD,
    breakdownByVertical,
    stageCounts,
    timestamp: new Date().toISOString()
  };
}

const stats = auditPipeline();
console.log('='.repeat(60));
console.log('💰 REVENUE PIPELINE & CASH FLOW EXECUTIVE LEDGER');
console.log('='.repeat(60));
console.log(`Total Active Target Leads: ${stats.totalLeads}`);
console.log(`Total Active Pipeline Value: $${stats.totalPipelineUSD.toLocaleString()} USD`);
console.log('\n📊 Breakdown by Solution Vertical:');
Object.entries(stats.breakdownByVertical).forEach(([vert, amt]) => {
  console.log(`  • ${vert.padEnd(15)} : $${amt.toLocaleString()} USD`);
});
console.log('\n🎯 Target Stages:');
Object.entries(stats.stageCounts).forEach(([stage, count]) => {
  console.log(`  • ${stage.padEnd(25)} : ${count} leads`);
});
console.log('='.repeat(60));
