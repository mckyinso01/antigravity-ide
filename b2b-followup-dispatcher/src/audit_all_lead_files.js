import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function auditAllLeadsFiles() {
  const root = path.join(__dirname, '..', '..');
  const filesToCheck = [
    path.join(__dirname, 'leads.json'),
    path.join(__dirname, 'dispatch_log.json'),
    path.join(__dirname, '..', 'HOT_LIVE_INBOUND_LEAD_RADAR.json'),
    path.join(root, 'programmatic-web-audit-bot', 'targets.json')
  ];

  console.log('====================================================');
  console.log('🔍 DEEP AUDIT: ALL LEADS IN WORKSPACE');
  console.log('====================================================\n');

  for (const fp of filesToCheck) {
    if (fs.existsSync(fp)) {
      try {
        const raw = fs.readFileSync(fp, 'utf8');
        const data = JSON.parse(raw);
        console.log(`📁 File: ${path.basename(fp)}`);
        console.log(`   Total Entries: ${Array.isArray(data) ? data.length : Object.keys(data).length}`);
        
        if (Array.isArray(data)) {
          let namedHumans = 0;
          let genericRoles = 0;
          let genericEmails = 0;

          data.forEach(item => {
            const name = (item.executiveName || item.clientName || item.contactName || item.name || '').trim();
            const email = (item.email || item.contactEmail || '').toLowerCase();

            const isGenericEmail = email.startsWith('info@') || 
                                   email.startsWith('support@') || 
                                   email.startsWith('sales@') || 
                                   email.startsWith('customercare@') || 
                                   email.startsWith('admin@') || 
                                   email.startsWith('contact@');

            const isGenericName = name.toLowerCase().includes('director') || 
                                  name.toLowerCase().includes('lead') || 
                                  name.toLowerCase().includes('manager') || 
                                  name.toLowerCase().includes('team') || 
                                  name === '';

            if (isGenericEmail) genericEmails++;
            if (!isGenericName && name.length > 2) {
              namedHumans++;
            } else {
              genericRoles++;
            }
          });

          console.log(`   -> Real Person Names (First & Last): ${namedHumans}`);
          console.log(`   -> Generic Title/Role Placeholders: ${genericRoles}`);
          console.log(`   -> Generic Inboxes (info@, support@, etc.): ${genericEmails}`);
        }
        console.log('----------------------------------------------------');
      } catch (err) {
        console.log(`Error parsing ${fp}: ${err.message}`);
      }
    } else {
      console.log(`File not found: ${fp}`);
    }
  }
}

auditAllLeadsFiles();
