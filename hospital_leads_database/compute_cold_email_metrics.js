const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Admin\\.gemini\\antigravity-ide\\scratch\\antigravity-ide\\hospital_leads_database';

const outreachLog = JSON.parse(fs.readFileSync(path.join(dir, 'outreach_dispatch_log.json'), 'utf8'));
const followupLog = JSON.parse(fs.readFileSync(path.join(dir, 'hospital_followup_log.json'), 'utf8'));
const verifiedLeads = JSON.parse(fs.readFileSync(path.join(dir, 'verified_100_us_uk_hospitals.json'), 'utf8'));

const allSentRecipients = new Set();
outreachLog.forEach(item => {
  if (item.recipient) allSentRecipients.add(item.recipient.toLowerCase().trim());
});

const bouncedEmails = new Set([
  'gary.smith@skagitregionalhealth.org',
  'steve.baker@crh.org',
  'drew.early@memorial.health',
  'ryan.venier@ksbhospital.com'
]);

const cleanDelivered = [];
const bounced = [];

Array.from(allSentRecipients).forEach(email => {
  const lead = verifiedLeads.find(l => (l.email || l.verified_email || '').toLowerCase().trim() === email) || {};
  const dispatchItem = outreachLog.find(o => o.recipient?.toLowerCase().trim() === email) || {};
  
  const record = {
    email,
    hospital: lead.hospital_name || dispatchItem.hospital || lead.name || 'Hospital',
    location: lead.location || lead.state || 'US',
    decisionMaker: lead.contact_name || lead.executive_name || lead.name || 'Hospital Executive',
    title: lead.title || lead.role || 'Chief Information / Operations Officer',
    sentAt: dispatchItem.timestamp || 'N/A'
  };

  if (bouncedEmails.has(email)) {
    bounced.push(record);
  } else {
    cleanDelivered.push(record);
  }
});

console.log('JSON_RESULT_START');
console.log(JSON.stringify({
  totalSent: allSentRecipients.size,
  cleanDeliveredCount: cleanDelivered.length,
  bouncedCount: bounced.length,
  deliveryRate: ((cleanDelivered.length / allSentRecipients.size) * 100).toFixed(1) + '%',
  totalInitialEmailsSent: outreachLog.length,
  totalFollowupsSent: followupLog.length,
  totalEmailTouches: outreachLog.length + followupLog.length,
  cleanDelivered,
  bounced
}, null, 2));
console.log('JSON_RESULT_END');
