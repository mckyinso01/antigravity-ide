// 🚀 OMNISTOCK MASTER AUTONOMOUS OUTREACH & 5-HOUR MONITORING DAEMON
// Runs continuously 24/7 in the background:
// 1. Dispatches hourly micro-batches (5 emails/hour with 35-55s jitter delay).
// 2. Executes deep IMAP audit every 5 hours (reply sentiment analysis, bounce filtering, executive email report).
// 3. Executes Automated Day 2 / Day 4 Follow-Up Sequences for engaged prospects.

const { runScheduledOmniStockBatch } = require('./omnistockCronDispatcher');
const { runOmniStockAudit } = require('./omnistockFiveHourMonitor');
const { runOmniStockFollowUpCycle } = require('./omnistockFollowUpEngine');

const HOURLY_INTERVAL_MS = 60 * 60 * 1000;       // 1 Hour
const FIVE_HOUR_INTERVAL_MS = 5 * 60 * 60 * 1000; // 5 Hours
const FOLLOWUP_INTERVAL_MS = 3 * 60 * 60 * 1000;  // 3 Hours

console.log('🌟 ========================================================');
console.log('🤖 OMNISTOCK AUTONOMOUS B2B OUTREACH & 5-HOUR MONITOR ACTIVE');
console.log(`⏰ Daemon Started: ${new Date().toLocaleString()}`);
console.log('========================================================\n');

// 1. Initial 5-Hour Audit on Startup
runOmniStockAudit().catch(console.error);

// 2. Schedule Recurring 5-Hour Audit
setInterval(() => {
  console.log('\n⏰ [OMNISTOCK 5-HOUR TIMER TRIGGER] Running scheduled audit...');
  runOmniStockAudit().catch(console.error);
}, FIVE_HOUR_INTERVAL_MS);

// 3. Schedule Recurring 3-Hour Follow-Up Cycle
setInterval(() => {
  console.log('\n⏰ [OMNISTOCK FOLLOW-UP TRIGGER] Checking eligible 48h-120h leads...');
  runOmniStockFollowUpCycle().catch(console.error);
}, FOLLOWUP_INTERVAL_MS);

// 4. Hourly Dispatch Loop
async function hourlyDispatchCycle() {
  console.log('\n📦 [OMNISTOCK HOURLY DISPATCH CYCLE] Checking queue and executing batch...');
  try {
    await runScheduledOmniStockBatch();
  } catch (err) {
    console.error('⚠️ OmniStock hourly dispatch error:', err.message);
  }
}

// Run first batch immediately if triggered with --start-now
if (process.argv.includes('--start-now')) {
  hourlyDispatchCycle();
}

// Schedule hourly cycles
setInterval(hourlyDispatchCycle, HOURLY_INTERVAL_MS);
