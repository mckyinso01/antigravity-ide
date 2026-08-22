const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'hospital_leads_database', 'verified_inbound_replies_detailed.json');
if (fs.existsSync(filePath)) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(`Total verified messages in file: ${data.length}`);
  data.forEach((item, idx) => {
    console.log(`\n======================================================`);
    console.log(`[REPLY #${idx + 1}]`);
    console.log(`Date: ${item.date}`);
    console.log(`From: ${item.from}`);
    console.log(`Subject: ${item.subject}`);
    // Clean snippet of body
    const bodyClean = item.body
      .replace(/<[^>]*>?/gm, ' ')
      .replace(/=0D|=A0|=E2=80=94|=E2=80=A2|=EF=B8=8F|=F0=9F=97=BA|=F0=9F=9B=A1|=F0=9F=92=B0/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    console.log(`Clean Text Preview: ${bodyClean.substring(0, 400)}...`);
  });
}
