const fs = require('fs');
const path = require('path');

const reportPath = path.join(__dirname, 'hospital_leads_database', 'gmail_bounce_audit_report.json');
if (fs.existsSync(reportPath)) {
  const data = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  console.log(`Total Bounces Detected: ${data.totalBounces}`);
  console.log(`Total Prospect Inbound Messages: ${data.totalProspectReplies}`);
  
  // Group bounces by reason
  const reasons = {};
  data.bounces.forEach(b => {
    reasons[b.diagnosticReason] = (reasons[b.diagnosticReason] || 0) + 1;
  });
  console.log('\n--- BOUNCE BREAKDOWN BY REASON ---');
  console.log(JSON.stringify(reasons, null, 2));

  console.log('\n--- SAMPLE RECENT BOUNCES (FIRST 10) ---');
  data.bounces.slice(0, 10).forEach((b, i) => {
    console.log(`\n[BOUNCE #${i + 1}]`);
    console.log(`Date: ${b.date}`);
    console.log(`Failed Recipient: ${b.failedRecipient}`);
    console.log(`Reason: ${b.diagnosticReason}`);
    console.log(`Snippet: ${b.snippet?.substring(0, 180)}`);
  });
}
