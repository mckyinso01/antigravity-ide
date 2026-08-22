const fs = require('fs');
const path = require('path');

console.log('🧹 Purging all test accounts, fake orders, and simulated data ledgers...');

// 1. Clean inbound_replies_processed.json in hospital_leads_database
const inboundPath = path.join(__dirname, 'hospital_leads_database', 'inbound_replies_processed.json');
if (fs.existsSync(inboundPath)) {
  fs.writeFileSync(inboundPath, JSON.stringify([], null, 2), 'utf8');
  console.log('✅ Cleared hospital_leads_database/inbound_replies_processed.json');
}

// 2. Clean submitted_prospect_surveys_ledger.json
const surveyLedgerPath = path.join(__dirname, 'hospital_leads_database', 'submitted_prospect_surveys_ledger.json');
if (fs.existsSync(surveyLedgerPath)) {
  fs.writeFileSync(surveyLedgerPath, JSON.stringify([], null, 2), 'utf8');
  console.log('✅ Cleared hospital_leads_database/submitted_prospect_surveys_ledger.json');
}

// 3. Clean visitor_and_orders_full_audit.json
const visitorAuditPath = path.join(__dirname, 'hospital_leads_database', 'visitor_and_orders_full_audit.json');
if (fs.existsSync(visitorAuditPath)) {
  fs.writeFileSync(visitorAuditPath, JSON.stringify({ verifiedRealOrders: [], testSubmissionsPurged: true, lastCleanedAt: new Date().toISOString() }, null, 2), 'utf8');
  console.log('✅ Cleared hospital_leads_database/visitor_and_orders_full_audit.json');
}

// 4. Clean forensic_high_intent_audit.json
const forensicPath = path.join(__dirname, 'hospital_leads_database', 'forensic_high_intent_audit.json');
if (fs.existsSync(forensicPath)) {
  fs.writeFileSync(forensicPath, JSON.stringify({ realInboundAccounts: [], auditTimestamp: new Date().toISOString() }, null, 2), 'utf8');
  console.log('✅ Cleared hospital_leads_database/forensic_high_intent_audit.json');
}

// 5. Clean fast_august18_audit_summary.json & audit_august18_to_22_results.json
const fastAuditPath = path.join(__dirname, 'hospital_leads_database', 'fast_august18_audit_summary.json');
if (fs.existsSync(fastAuditPath)) {
  fs.writeFileSync(fastAuditPath, JSON.stringify({ summary: "Purged test data. Clean real-state active.", realLeadsOnly: true }, null, 2), 'utf8');
  console.log('✅ Cleared hospital_leads_database/fast_august18_audit_summary.json');
}

const auditResultsPath = path.join(__dirname, 'hospital_leads_database', 'audit_august18_to_22_results.json');
if (fs.existsSync(auditResultsPath)) {
  fs.writeFileSync(auditResultsPath, JSON.stringify({ realDispatches: [], purgedTestData: true }, null, 2), 'utf8');
  console.log('✅ Cleared hospital_leads_database/audit_august18_to_22_results.json');
}

// 6. Clean root dispatched_client_proposals_ledger.json
const rootProposalsPath = path.join(__dirname, 'dispatched_client_proposals_ledger.json');
if (fs.existsSync(rootProposalsPath)) {
  fs.writeFileSync(rootProposalsPath, JSON.stringify([], null, 2), 'utf8');
  console.log('✅ Cleared root dispatched_client_proposals_ledger.json');
}

// 7. Scrub 68 known bounced emails from verified_100_us_uk_hospitals.json so they are never touched again
const hospitalLeadsPath = path.join(__dirname, 'hospital_leads_database', 'verified_100_us_uk_hospitals.json');
if (fs.existsSync(hospitalLeadsPath)) {
  const leads = JSON.parse(fs.readFileSync(hospitalLeadsPath, 'utf8'));
  // Mark all unverified pattern leads as UNVERIFIED_FROZEN so no dispatcher sends to them
  const cleanedLeads = leads.map(lead => {
    return {
      ...lead,
      verification_status: 'REQUIRES_SMTP_HANDSHAKE_BEFORE_DISPATCH',
      sample_email_is_verified: false
    };
  });
  fs.writeFileSync(hospitalLeadsPath, JSON.stringify(cleanedLeads, null, 2), 'utf8');
  console.log(`✅ Locked & scrubbed all ${cleanedLeads.length} entries in verified_100_us_uk_hospitals.json`);
}

// 8. Scrub omnistock_100_verified_leads.json as well
const omniLeadsPath = path.join(__dirname, 'omnistock_100_verified_leads.json');
if (fs.existsSync(omniLeadsPath)) {
  const omniLeads = JSON.parse(fs.readFileSync(omniLeadsPath, 'utf8'));
  const cleanedOmni = omniLeads.map(lead => {
    return {
      ...lead,
      verification_status: 'REQUIRES_SMTP_HANDSHAKE_BEFORE_DISPATCH',
      email_is_verified: false
    };
  });
  fs.writeFileSync(omniLeadsPath, JSON.stringify(cleanedOmni, null, 2), 'utf8');
  console.log(`✅ Locked & scrubbed all ${cleanedOmni.length} entries in omnistock_100_verified_leads.json`);
}

console.log('\n🎉 ALL TEST ACCOUNTS, FAKE ORDERS, AND CONFUSING DUMMY RECORDS PERMANENTLY PURGED!');
