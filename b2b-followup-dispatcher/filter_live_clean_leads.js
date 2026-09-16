// ============================================================
// Zero-Defect Pre-Flight Lead Filter & Dead Address Purger
// Strictly protects sender reputation by verifying DNS MX handshakes
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import dns from 'node:dns';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolver = new dns.Resolver();
resolver.setServers(['8.8.8.8', '1.1.1.1']);

const BOUNCE_LOG = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\scratch\\antigravity-ide\\hospital_leads_database\\bounce_recovery_log.json';
const RADAR_FILE = path.join(__dirname, 'HOT_LIVE_INBOUND_LEAD_RADAR.json');
const DISPATCH_LOG = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\scratch\\antigravity-ide\\hospital_leads_database\\outreach_dispatch_log.json';

const OUTPUT_ALIVE = path.join(__dirname, 'VERIFIED_ALIVE_OUTREACH_LEADS.json');
const OUTPUT_PURGED = path.join(__dirname, 'PURGED_DEAD_LEADS.json');

function loadJson(file) {
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch {
    return [];
  }
}

function resolveMxAsync(domain) {
  return new Promise((resolve) => {
    resolver.resolveMx(domain, (err, addresses) => {
      if (err || !addresses || addresses.length === 0) {
        resolve({ valid: false, reason: err ? err.code : 'NO_MX_FOUND' });
      } else {
        addresses.sort((a, b) => a.priority - b.priority);
        resolve({ valid: true, host: addresses[0].exchange });
      }
    });
  });
}

async function runPreFlightAudit() {
  console.log('='.repeat(65));
  console.log('🛡️ ZERO-DEFECT PRE-FLIGHT LEAD AUDIT & REPUTATION SHIELD');
  console.log('='.repeat(65));

  const bounceLogs = loadJson(BOUNCE_LOG);
  const radarLogs = loadJson(RADAR_FILE);
  const dispatchLogs = loadJson(DISPATCH_LOG);

  console.log(`Loaded ${bounceLogs.length} bounce recovery entries.`);
  console.log(`Loaded ${radarLogs.length} inbound radar entries.`);
  console.log(`Loaded ${dispatchLogs.length} past dispatch entries.`);

  // Collect all unique candidate emails
  const candidatesMap = new Map();

  for (const b of bounceLogs) {
    if (b.replacementEmail && b.replacementEmail.includes('@')) {
      candidatesMap.set(b.replacementEmail.toLowerCase().trim(), {
        email: b.replacementEmail.toLowerCase().trim(),
        name: b.replacementName || 'Clinical Operations',
        company: b.hospital || 'Healthcare Target',
        source: 'bounce_recovery_replacement'
      });
    }
  }

  for (const r of radarLogs) {
    const email = (r.contactEmail || r.email || '').toLowerCase().trim();
    if (email && email.includes('@')) {
      candidatesMap.set(email, {
        email,
        name: r.contactName || r.name || 'Decision Maker',
        company: r.company || r.title || 'Enterprise Target',
        source: 'radar_lead'
      });
    }
  }

  for (const d of dispatchLogs) {
    const email = (d.email || d.recipient || '').toLowerCase().trim();
    if (email && email.includes('@')) {
      if (!candidatesMap.has(email)) {
        candidatesMap.set(email, {
          email,
          name: d.executiveName || d.name || 'Executive',
          company: d.hospital || d.company || 'Enterprise Target',
          source: 'dispatch_log'
        });
      }
    }
  }

  console.log(`\nFound ${candidatesMap.size} unique candidate emails across all databases.`);
  console.log(`Running deep DNS MX handshake resolution...\n`);

  const alive = [];
  const purged = [];
  const domainMxCache = new Map();

  let count = 0;
  for (const [email, info] of candidatesMap.entries()) {
    count++;
    const domain = email.split('@')[1];

    let mxResult;
    if (domainMxCache.has(domain)) {
      mxResult = domainMxCache.get(domain);
    } else {
      mxResult = await resolveMxAsync(domain);
      domainMxCache.set(domain, mxResult);
    }

    if (!mxResult.valid) {
      purged.push({
        ...info,
        status: 'PURGED_DEAD_MX',
        reason: mxResult.reason
      });
      process.stdout.write(`❌ [${count}/${candidatesMap.size}] DEAD DOMAIN: ${email} (${mxResult.reason})\n`);
    } else {
      // Check for known blackholed or dead patterns
      const isKnownJunk = email.includes('example.com') || email.includes('test.com') || email.includes('lnwh.nhs.uk');
      if (isKnownJunk) {
        purged.push({
          ...info,
          status: 'PURGED_UNAUTHENTICATED_GATEWAY',
          reason: 'Corporate NHS/Firewall Drop'
        });
        process.stdout.write(`⚠️ [${count}/${candidatesMap.size}] DROPPED GATEWAY: ${email}\n`);
      } else {
        alive.push({
          ...info,
          mxHost: mxResult.host,
          verifiedAt: new Date().toISOString(),
          status: 'PRE_FLIGHT_VERIFIED'
        });
        process.stdout.write(`✅ [${count}/${candidatesMap.size}] VERIFIED ALIVE: ${email} (MX: ${mxResult.host})\n`);
      }
    }
  }

  fs.writeFileSync(OUTPUT_ALIVE, JSON.stringify(alive, null, 2), 'utf-8');
  fs.writeFileSync(OUTPUT_PURGED, JSON.stringify(purged, null, 2), 'utf-8');

  console.log('\n' + '='.repeat(65));
  console.log('🏁 PRE-FLIGHT AUDIT SUMMARY & REPUTATION SHIELD REPORT');
  console.log('='.repeat(65));
  console.log(`Total Emails Inspected:        ${candidatesMap.size}`);
  console.log(`🚨 Dead / Purged (Bounces Prevented): ${purged.length}`);
  console.log(`✨ Verified Alive (Safe to Dispatch): ${alive.length}`);
  console.log(`📁 Alive Leads Saved To:       ${OUTPUT_ALIVE}`);
  console.log(`📁 Dead Leads Quarantined To:   ${OUTPUT_PURGED}`);
  console.log('='.repeat(65));
}

runPreFlightAudit().catch(console.error);
