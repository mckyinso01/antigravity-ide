import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RADAR_FILE = path.join(__dirname, 'META_ENTERPRISE_PROSPECT_RADAR.json');

function loadRadar() {
  if (!fs.existsSync(RADAR_FILE)) {
    console.error('Radar file not found. Run harvest_meta_social_handles.js first.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(RADAR_FILE, 'utf8'));
}

function saveRadar(data) {
  fs.writeFileSync(RADAR_FILE, JSON.stringify(data, null, 2), 'utf8');
}

const args = process.argv.slice(2);
const command = args[0] || '--next';

const radar = loadRadar();

if (command === '--next') {
  const pending = radar.filter(l => l.pitchStatus === 'READY_TO_PITCH' && (l.facebookPage || l.instagramHandle));
  if (pending.length === 0) {
    console.log('🎉 No pending Meta leads ready to pitch!');
    process.exit(0);
  }

  const lead = pending[0];
  console.log('\n================================================================');
  console.log(`🎯 NEXT TARGET LEAD FOR 1-BY-1 META MULTI-PITCH:`);
  console.log(`================================================================`);
  console.log(`ID:              ${lead.id}`);
  console.log(`Company:         ${lead.company}`);
  console.log(`Category:        ${lead.category}`);
  console.log(`Campaign:        ${lead.campaign}`);
  console.log(`Demo URL:        ${lead.demoUrl}`);
  console.log(`Executive/Lead:  ${lead.executiveName || 'N/A'} (${lead.title || 'N/A'})`);
  console.log(`Facebook Page:   ${lead.facebookPage || 'N/A'}`);
  console.log(`Messenger URL:   ${lead.messengerUrl || 'N/A'}`);
  console.log(`Instagram:       ${lead.instagramHandle || 'N/A'}`);
  console.log(`----------------------------------------------------------------`);
  console.log(`📝 TAILORED PITCH COPY:`);
  console.log(`----------------------------------------------------------------`);
  console.log(lead.pitchMessage);
  console.log(`================================================================\n`);
  console.log(`To record dispatch, run:`);
  console.log(`node dispatch_meta_social_pitch.js --record ${lead.id} [CHANNEL] "[NOTES]"`);
} else if (command === '--record') {
  const targetId = args[1];
  const channel = args[2] || 'FACEBOOK_MESSENGER';
  const notes = args[3] || 'Pitch dispatched successfully';

  const lead = radar.find(l => l.id === targetId);
  if (!lead) {
    console.error(`Lead with ID ${targetId} not found.`);
    process.exit(1);
  }

  lead.pitchStatus = 'PITCH_SENT';
  lead.dispatchedAt = new Date().toISOString();
  lead.dispatchedChannel = channel;
  lead.notes = notes;

  saveRadar(radar);

  console.log(`\n✅ RECORDED DISPATCH FOR: ${lead.company} (${lead.id})`);
  console.log(`Channel:   ${channel}`);
  console.log(`Timestamp: ${lead.dispatchedAt}`);
  console.log(`Notes:     ${notes}\n`);
} else if (command === '--summary') {
  const total = radar.length;
  const withFb = radar.filter(l => l.facebookPage).length;
  const withIg = radar.filter(l => l.instagramHandle).length;
  const sent = radar.filter(l => l.pitchStatus === 'PITCH_SENT').length;
  const pending = radar.filter(l => l.pitchStatus === 'READY_TO_PITCH' && (l.facebookPage || l.instagramHandle)).length;

  console.log('\n================================================================');
  console.log('📊 META PROSPECT RADAR SUMMARY:');
  console.log('================================================================');
  console.log(`Total Leads in Radar:        ${total}`);
  console.log(`With Verified Facebook:      ${withFb}`);
  console.log(`With Verified Instagram:     ${withIg}`);
  console.log(`Pending Ready to Pitch:      ${pending}`);
  console.log(`Pitches Sent & Recorded:     ${sent}`);
  console.log('================================================================\n');
} else {
  console.log('Usage:');
  console.log('  node dispatch_meta_social_pitch.js --next');
  console.log('  node dispatch_meta_social_pitch.js --record <id> <channel> <notes>');
  console.log('  node dispatch_meta_social_pitch.js --summary');
}
