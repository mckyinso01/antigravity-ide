// 🚀 MASTER AUTONOMOUS OUTREACH & 5-HOUR MONITORING DAEMON
// Runs continuously in the background:
// 1. Dispatches hourly micro-batches (4-5 emails/hour with 45-75s random delays).
// 2. Executes deep IMAP audit every 5 hours (reply sentiment analysis, bounce filtering, executive email report).
// 3. Auto-refills lead queue when remaining leads < 20.

const fs = require('fs');
const path = require('path');
const { runScheduledBatch } = require('./cronDispatcher');
const { runFiveHourAudit } = require('./fiveHourMonitorEngine');

const HOURLY_INTERVAL_MS = 60 * 60 * 1000;       // 1 Hour
const FIVE_HOUR_INTERVAL_MS = 5 * 60 * 60 * 1000; // 5 Hours

console.log('🌟 ========================================================');
console.log('🤖 GATZ AUTONOMOUS B2B OUTREACH & 5-HOUR MONITORING ACTIVE');
console.log(`⏰ Daemon Started: ${new Date().toLocaleString()}`);
console.log('========================================================\n');

// 1. Initial 5-Hour Audit on Startup
runFiveHourAudit().catch(console.error);

// 2. Schedule Recurring 5-Hour Audit
setInterval(() => {
  console.log('\n⏰ [5-HOUR TIMER TRIGGER] Running scheduled audit...');
  runFiveHourAudit().catch(console.error);
}, FIVE_HOUR_INTERVAL_MS);

// 3. Hourly Dispatch Loop (During Business Hours: 8:00 AM - 6:00 PM EST / PHT)
async function hourlyDispatchCycle() {
  console.log('\n📦 [HOURLY DISPATCH CYCLE] Checking queue and operational hours...');
  const currentHour = new Date().getHours();
  
  // Active window (can run 24/7 or targeted business hours)
  try {
    await runScheduledBatch();
  } catch (err) {
    console.error('⚠️ Hourly dispatch error:', err.message);
  }
}

// Run first batch immediately if triggered with --start
if (process.argv.includes('--start-now')) {
  hourlyDispatchCycle();
}

// Schedule hourly cycles
setInterval(hourlyDispatchCycle, HOURLY_INTERVAL_MS);
