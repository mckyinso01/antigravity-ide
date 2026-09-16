import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logPath = path.join(__dirname, 'src', 'dispatch_log.json');
const logs = JSON.parse(fs.readFileSync(logPath, 'utf8'));

const commented = logs.filter(l => l.commentPublished).map(l => l.target);
console.log('=== LEADS ALREADY COMMENTED ON (' + commented.length + ') ===');
commented.forEach((c, i) => console.log('  ' + (i + 1) + '. ' + c));

const targetMap = {};
logs.forEach(l => {
  if (l.target) {
    if (!targetMap[l.target]) {
      targetMap[l.target] = { target: l.target, org: l.organization || l.hospital, hasConnection: false, hasComment: false };
    }
    if (l.connectionStatus || l.status === 'PENDING_INVITATION' || l.type === 'LINKEDIN_CONNECTION_OUTREACH') {
      targetMap[l.target].hasConnection = true;
    }
    if (l.commentPublished) {
      targetMap[l.target].hasComment = true;
    }
  }
});

const needsComment = Object.values(targetMap).filter(t => !t.hasComment);
console.log('\n=== CONNECTED LEADS MISSING POST COMMENTS (' + needsComment.length + ') ===');
needsComment.forEach((n, i) => console.log('  ' + (i + 1) + '. ' + n.target + ' (' + (n.org || 'N/A') + ')'));
