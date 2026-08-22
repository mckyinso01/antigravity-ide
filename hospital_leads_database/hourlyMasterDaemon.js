// 🚀 LINKABLEAI 24/7 UNIFIED MASTER AUTONOMOUS DAEMON v4.0
// Founder: Mharc Gatan <mharcgatan@linkable.it.com>
// Dual Escalation: mckinsyo01@gmail.com
//
// Integrated Subsystems:
// 1. Inbound Prospect Reply Parser & AI Closer (Every 10 mins)
// 2. Co-Design Follow-Up & Sandbox Pitch (Every 60 mins)
// 3. Hourly Executive Comprehensive Report (Every 60 mins)
// 4. Self-Healing Bounce Recovery (Every 2 hours)
// 5. LeadSuite Pro Hunter & Refill (Every 4 hours)

const { auditAndParseInboundReplies } = require('./inboundReplyParserDaemon');
const { runFollowUpBatch } = require('./coDesignFollowUpCronEngine');
const { generateAndDispatchHourlyReport } = require('./hourlyExecutiveReportEngine');
const { runSelfHealingBounceRecovery } = require('./selfHealingBounceEngine');
const { autoRefillNextBatch } = require('./leadAutoRefillEngine');
const { runLeadHunterCycle } = require('./leadSuiteProHunter');
const { runSubmittedFormsParserJob } = require('./submittedFormsParserCron');
const { runTimezoneAwareDispatchCycle } = require('./timezoneAwareDispatchScheduler');

// Intervals (ms)
const INBOUND_INTERVAL_MS = 10 * 60 * 1000;         // 10 mins
const FORMS_SURVEY_INTERVAL_MS = 15 * 60 * 1000;    // 15 mins (Submitted Evaluations)
const HOURLY_REPORT_INTERVAL_MS = 60 * 60 * 1000;   // 60 mins
const TIMEZONE_OUTBOUND_INTERVAL_MS = 60 * 60 * 1000; // 60 mins (Golden Hour Dispatcher)
const CODESIGN_INTERVAL_MS = 60 * 60 * 1000;       // 60 mins
const BOUNCE_INTERVAL_MS = 2 * 60 * 60 * 1000;      // 2 hours
const HUNTER_INTERVAL_MS = 4 * 60 * 60 * 1000;      // 4 hours

console.log('================================================================');
console.log('🤖 LINKABLEAI 24/7 MASTER AUTONOMOUS DAEMON v5.0 ACTIVE');
console.log(`⏰ Startup: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })} PHT`);
console.log(`👤 Executive Owner: Mharc Gatan (mharcgatan@linkable.it.com)`);
console.log(`🌍 Timezone-Aware Golden Hour Dispatcher: ACTIVE (Every 60 mins)`);
console.log(`📋 Submitted Form & Evaluation Ingestion: ACTIVE (Every 15 mins)`);
console.log(`📊 Hourly Comprehensive Report: ACTIVE (Every 60 mins)`);
console.log('================================================================\n');

// 1. Inbound Reply Parser
async function safeInbound() {
  try {
    console.log(`\n📨 [10-MIN CRON] Checking Inbound Replies & AI Closer at ${new Date().toLocaleTimeString()}...`);
    await auditAndParseInboundReplies();
  } catch (e) {
    console.error('⚠️ Inbound error:', e.message);
  }
}

// 2. Submitted Form & Evaluation Ingestion
async function safeFormsParser() {
  try {
    console.log(`\n📋 [15-MIN CRON] Ingesting Submitted Exit Surveys & Evaluations at ${new Date().toLocaleTimeString()}...`);
    await runSubmittedFormsParserJob();
  } catch (e) {
    console.error('⚠️ Submitted forms parser error:', e.message);
  }
}

// 3. Hourly Report
async function safeHourlyReport() {
  try {
    console.log(`\n📊 [HOURLY CRON] Dispatching Hourly Executive Report at ${new Date().toLocaleTimeString()}...`);
    await generateAndDispatchHourlyReport();
  } catch (e) {
    console.error('⚠️ Hourly report error:', e.message);
  }
}

// 4. Timezone-Aware Outbound Golden Hour Dispatcher
async function safeTimezoneOutbound() {
  try {
    console.log(`\n🌍 [60-MIN CRON] Running Timezone-Aware Golden Hour Dispatch at ${new Date().toLocaleTimeString()}...`);
    await runTimezoneAwareDispatchCycle({ maxBatchSize: 3, dryRun: false });
  } catch (e) {
    console.error('⚠️ Timezone outbound error:', e.message);
  }
}

// 5. Co-Design Follow-Up
async function safeCoDesign() {
  try {
    console.log(`\n📬 [60-MIN CRON] Checking Co-Design Follow-Ups at ${new Date().toLocaleTimeString()}...`);
    await runFollowUpBatch();
  } catch (e) {
    console.error('⚠️ CoDesign error:', e.message);
  }
}

// 6. Self-Healing Bounces
async function safeBounce() {
  try {
    console.log(`\n🛡️ [2-HR CRON] Running Bounce Recovery at ${new Date().toLocaleTimeString()}...`);
    await runSelfHealingBounceRecovery();
  } catch (e) {
    console.error('⚠️ Bounce error:', e.message);
  }
}

// 7. Lead Hunter & Refill
async function safeHunter() {
  try {
    console.log(`\n🌐 [4-HR CRON] Running LeadSuite Hunter & Refill at ${new Date().toLocaleTimeString()}...`);
    await autoRefillNextBatch();
    await runLeadHunterCycle({ vertical: 'clinical' });
  } catch (e) {
    console.error('⚠️ Hunter error:', e.message);
  }
}

// Register Intervals
setInterval(safeInbound, INBOUND_INTERVAL_MS);
setInterval(safeFormsParser, FORMS_SURVEY_INTERVAL_MS);
setInterval(safeHourlyReport, HOURLY_REPORT_INTERVAL_MS);
setInterval(safeTimezoneOutbound, TIMEZONE_OUTBOUND_INTERVAL_MS);
setInterval(safeCoDesign, CODESIGN_INTERVAL_MS);
setInterval(safeBounce, BOUNCE_INTERVAL_MS);
setInterval(safeHunter, HUNTER_INTERVAL_MS);

console.log('✅ All 7 Background Cron Schedulers are registered and running.');

// Keep process alive
process.stdin.resume();
