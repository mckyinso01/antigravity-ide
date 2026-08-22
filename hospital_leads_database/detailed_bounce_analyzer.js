const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'audit_august18_to_22_results.json'), 'utf8'));

const allBounces = [
  ...(data.gmail.bouncesAndAutoReplies || []).map(b => ({ ...b, account: 'Gmail (mckinsyo01@gmail.com)' })),
  ...(data.spacemail.bouncesAndAutoReplies || []).map(b => ({ ...b, account: 'SpaceMail (mharcgatan@linkable.it.com)' }))
];

console.log(`\n========================================`);
console.log(`📊 TOTAL BOUNCE & AUTO-REPLY MESSAGES: ${allBounces.length}`);
console.log(`========================================\n`);

const categorized = {
  userNotFound: [], // 550 5.1.1 User unknown / no mailbox
  domainNotFound: [], // Host or domain name not found / DNS
  blockedOrSpamPolicy: [], // 554 / 550 5.7.1 DMARC / Spam filter / SPF
  mailboxFullOrQuota: [], // 452 / 552 Quota exceeded
  autoReplyOutOfOffice: [], // Out of Office / Vacation
  systemNotification: [], // General delivery status / Mailer daemon
  other: []
};

allBounces.forEach(b => {
  const text = `${b.subject || ''} ${b.from || ''} ${b.excerpt || ''}`;

  // Extract recipient if present
  let targetEmail = 'Unknown Recipient';
  const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  if (emailMatch) {
    // find first non-mailer-daemon email
    const filtered = emailMatch.filter(e => !e.includes('mailer-daemon') && !e.includes('googlemail') && !e.includes('google.com') && !e.includes('spacemail') && !e.includes('linkable.it.com') && !e.includes('mckinsyo01'));
    if (filtered.length > 0) {
      targetEmail = filtered[0];
    }
  }

  const record = {
    date: b.date,
    from: b.from,
    subject: b.subject,
    account: b.account,
    targetEmail,
    excerpt: b.excerpt
  };

  if (/out of office|automatic reply|on vacation|away from the office|auto-reply|autoreply/i.test(text)) {
    categorized.autoReplyOutOfOffice.push(record);
  } else if (/does not exist|user unknown|recipient address rejected|user not found|550 5\.1\.1|550 5\.4\.1|no such user|invalid recipient|mailbox unavailable|550-5\.1\.1/i.test(text)) {
    categorized.userNotFound.push(record);
  } else if (/domain not found|host or domain name not found|dns|nxdomain|no route to host/i.test(text)) {
    categorized.domainNotFound.push(record);
  } else if (/spam|blocked|policy|dmarc|spf|554 5\.7\.1|550 5\.7\.1|reputation|rejected by filter/i.test(text)) {
    categorized.blockedOrSpamPolicy.push(record);
  } else if (/quota|mailbox full|storage exceeded|452|552/i.test(text)) {
    categorized.mailboxFullOrQuota.push(record);
  } else if (/delivery status notification|undeliverable|returned mail|failure notice|mail delivery subsystem/i.test(text)) {
    categorized.systemNotification.push(record);
  } else {
    categorized.other.push(record);
  }
});

console.log(`📌 CATEGORY SUMMARY:`);
console.log(`1. ❌ User / Mailbox Does Not Exist (Hard Bounce): ${categorized.userNotFound.length}`);
console.log(`2. 🚫 Spam Filter / Security Policy / DMARC Rejection: ${categorized.blockedOrSpamPolicy.length}`);
console.log(`3. 🌐 Domain / DNS Not Found: ${categorized.domainNotFound.length}`);
console.log(`4. 📦 Mailbox Full / Quota Exceeded (Soft Bounce): ${categorized.mailboxFullOrQuota.length}`);
console.log(`5. 🌴 Out of Office / Vacation Auto-Reply: ${categorized.autoReplyOutOfOffice.length}`);
console.log(`6. 📬 General Mailer-Daemon System Delivery Notices: ${categorized.systemNotification.length}`);
console.log(`7. ❓ Other / Uncategorized: ${categorized.other.length}`);

console.log(`\n----------------------------------------`);
console.log(`🔍 SAMPLE HARD BOUNCES (User Unknown / Invalid Address):`);
console.log(`----------------------------------------`);
categorized.userNotFound.slice(0, 10).forEach((item, idx) => {
  console.log(`[${idx + 1}] Date: ${item.date} | Account: ${item.account}`);
  console.log(`    Target: ${item.targetEmail}`);
  console.log(`    Subject: ${item.subject}`);
  console.log(`    Reason Excerpt: ${item.excerpt.substring(0, 180)}...\n`);
});

console.log(`\n----------------------------------------`);
console.log(`🔍 SAMPLE SPAM / SECURITY POLICY / BLOCKED:`);
console.log(`----------------------------------------`);
categorized.blockedOrSpamPolicy.slice(0, 10).forEach((item, idx) => {
  console.log(`[${idx + 1}] Date: ${item.date} | Account: ${item.account}`);
  console.log(`    Target: ${item.targetEmail}`);
  console.log(`    Subject: ${item.subject}`);
  console.log(`    Reason Excerpt: ${item.excerpt.substring(0, 180)}...\n`);
});

console.log(`\n----------------------------------------`);
console.log(`🔍 SAMPLE OUT-OF-OFFICE / VACATION AUTO-REPLIES:`);
console.log(`----------------------------------------`);
categorized.autoReplyOutOfOffice.slice(0, 10).forEach((item, idx) => {
  console.log(`[${idx + 1}] Date: ${item.date} | From: ${item.from}`);
  console.log(`    Subject: ${item.subject}`);
  console.log(`    Excerpt: ${item.excerpt.substring(0, 180)}...\n`);
});

// Save complete analyzed JSON report
fs.writeFileSync(path.join(__dirname, 'detailed_bounce_analysis_report.json'), JSON.stringify({
  analyzedAt: new Date().toISOString(),
  totalMessages: allBounces.length,
  counts: {
    userNotFound: categorized.userNotFound.length,
    blockedOrSpamPolicy: categorized.blockedOrSpamPolicy.length,
    domainNotFound: categorized.domainNotFound.length,
    mailboxFullOrQuota: categorized.mailboxFullOrQuota.length,
    autoReplyOutOfOffice: categorized.autoReplyOutOfOffice.length,
    systemNotification: categorized.systemNotification.length,
    other: categorized.other.length
  },
  categorized
}, null, 2));

console.log(`\n💾 Saved detailed report to detailed_bounce_analysis_report.json`);
