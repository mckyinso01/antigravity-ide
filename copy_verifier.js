const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'hospital_leads_database', 'deepSmtpVerifier.js');
const dst = path.join(__dirname, 'omnistock_leads_database', 'deepSmtpVerifier.js');

fs.copyFileSync(src, dst);
console.log('✅ Copied deepSmtpVerifier.js to omnistock_leads_database');
