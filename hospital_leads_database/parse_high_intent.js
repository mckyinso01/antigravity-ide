const imaps = require('imap-simple');

const SENDER_EMAIL = 'mckinsyo01@gmail.com';
const SENDER_PASS = 'ldiibghudivdkboq';

const imapConfig = {
  imap: {
    user: SENDER_EMAIL,
    password: SENDER_PASS,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
  }
};

async function parseAllSubmissions() {
  const connection = await imaps.connect(imapConfig);
  await connection.openBox('INBOX');

  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - 14);

  const searchCriteria = [['SINCE', sinceDate]];
  const fetchOptions = { bodies: ['HEADER', 'TEXT'], struct: false, markSeen: false };

  const messages = await connection.search(searchCriteria, fetchOptions);
  console.log('Total messages analyzed: ' + messages.length);

  const highIntentForms = [];
  const telemetryBeacons = [];

  for (const msg of messages) {
    const header = msg.parts.find(p => p.which === 'HEADER')?.body;
    const textPart = msg.parts.find(p => p.which === 'TEXT')?.body || '';
    const from = header?.from?.[0] || '';
    const subject = header?.subject?.[0] || '';
    const date = header?.date?.[0] || '';

    if (from.toLowerCase().includes('formsubmit') || subject.toLowerCase().includes('lead') || subject.toLowerCase().includes('form') || subject.toLowerCase().includes('demo')) {
      // Check if it's an automated beacon vs user-submitted text/email
      const hasCustomInputs = 
        textPart.includes('email') && 
        !textPart.includes('Unknown, Global/VPN') && 
        (textPart.includes('name:') || textPart.includes('phone:') || textPart.includes('message:') || textPart.includes('company:'));

      if (subject.toLowerCase().includes('demo') || subject.toLowerCase().includes('pilot') || subject.toLowerCase().includes('contact') || hasCustomInputs) {
        highIntentForms.push({ date, subject, from, preview: textPart.substring(0, 300) });
      } else {
        telemetryBeacons.push({ date, subject });
      }
    }
  }

  console.log('=== HIGH INTENT FORM SUBMISSIONS (' + highIntentForms.length + ') ===');
  highIntentForms.forEach((f, i) => {
    console.log('[' + (i + 1) + '] Date: ' + f.date);
    console.log('Subject: ' + f.subject);
    console.log('Body Preview:\n' + f.preview);
    console.log('-------------------------------------------');
  });

  console.log('\n=== TELEMETRY / VISIT BEACONS (' + telemetryBeacons.length + ') ===');
  console.log('Recent 5 Beacons:');
  telemetryBeacons.slice(-5).forEach(b => console.log(b.date + ' | ' + b.subject));

  connection.end();
}

parseAllSubmissions().catch(console.error);
