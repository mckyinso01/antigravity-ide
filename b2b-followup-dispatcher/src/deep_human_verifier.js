import imaps from 'imap-simple';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  imap: {
    user: process.env.SMTP_USER || 'mharcgatan@linkable.it.com',
    password: process.env.SMTP_PASS || 'Melonjuice01!',
    host: 'mail.spacemail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 25000
  }
};

async function findTrueHumanReplies() {
  console.log('=== CONNECTING TO LIVE IMAP ===');
  const connection = await imaps.connect(config);
  
  const mailboxes = ['INBOX', 'Archive', 'Trash', 'Spam'];
  const humanMessages = [];
  const systemAutomations = [];
  const bounces = [];

  for (const box of mailboxes) {
    try {
      await connection.openBox(box);
      const messages = await connection.search(['ALL'], { bodies: ['HEADER', 'TEXT'], markSeen: false });
      console.log(`Checking [${box}] (${messages.length} total messages)...`);
      
      for (const m of messages) {
        const header = m.parts.find(p => p.which === 'HEADER')?.body;
        if (!header) continue;
        const from = (header.from?.[0] || '').trim();
        const subject = (header.subject?.[0] || '').trim();
        const date = (header.date?.[0] || '').trim();
        const textPart = m.parts.find(p => p.which === 'TEXT')?.body || '';

        const fromLower = from.toLowerCase();
        const subjLower = subject.toLowerCase();

        const isBounce = fromLower.includes('daemon') || 
                         fromLower.includes('postmaster') || 
                         fromLower.includes('bounce') || 
                         subjLower.includes('delivery status notification') || 
                         subjLower.includes('undelivered') || 
                         subjLower.includes('undeliverable');

        const isSystemAlert = fromLower.includes('google') || 
                              fromLower.includes('zendesk') || 
                              fromLower.includes('linkableai') ||
                              fromLower.includes('noreply') ||
                              fromLower.includes('no-reply');

        if (isBounce) {
          bounces.push({ box, from, subject, date });
        } else if (isSystemAlert) {
          systemAutomations.push({ box, from, subject, date });
        } else {
          // Potential True Human
          humanMessages.push({
            box,
            from,
            subject,
            date,
            snippet: textPart.slice(0, 300).replace(/\s+/g, ' ')
          });
        }
      }
    } catch (e) {
      console.log(`Notice for ${box}: ${e.message}`);
    }
  }

  connection.end();

  console.log('\n======================================================');
  console.log(`TOTAL BOUNCES / UNDELIVERED NOTICES: ${bounces.length}`);
  console.log(`TOTAL SYSTEM / AUTOMATION EMAILS: ${systemAutomations.length}`);
  console.log(`TOTAL NON-DAEMON / POTENTIAL HUMAN EMAILS: ${humanMessages.length}`);
  console.log('======================================================\n');

  if (humanMessages.length > 0) {
    console.log('🔍 DETAILS OF POTENTIAL HUMAN MESSAGES:');
    humanMessages.forEach((msg, idx) => {
      console.log(`\n[#${idx + 1}] Mailbox: ${msg.box}`);
      console.log(`   From: ${msg.from}`);
      console.log(`   Subject: ${msg.subject}`);
      console.log(`   Date: ${msg.date}`);
      console.log(`   Snippet: ${msg.snippet}`);
    });
  } else {
    console.log('⚠️ ZERO true human replies found across all mailboxes.');
  }

  if (systemAutomations.length > 0) {
    console.log('\n🤖 SYSTEM / SERVICE EMAILS SUMMARY:');
    systemAutomations.slice(0, 10).forEach((msg, idx) => {
      console.log(`   ${idx + 1}. [${msg.box}] ${msg.from} -> "${msg.subject}"`);
    });
    if (systemAutomations.length > 10) {
      console.log(`   ...and ${systemAutomations.length - 10} more.`);
    }
  }
}

findTrueHumanReplies().catch(console.error);
