const fs = require('fs');
const path = require('path');

const saccadeLicensingPath = path.join(__dirname, 'Saccade-UI-evaluator', 'src', 'components', 'LicensingModal.tsx');

if (fs.existsSync(saccadeLicensingPath)) {
  let content = fs.readFileSync(saccadeLicensingPath, 'utf8');
  content = content.replace(/https:\/\/wa\.me\/639622816533/g, 'https://wa.me/639622812703');
  content = content.replace(/Founder Support WhatsApp: \+63 962 281 6533/g, 'Founder Support WhatsApp: +63 962 281 2703');
  fs.writeFileSync(saccadeLicensingPath, content, 'utf8');
  console.log('✅ Updated Saccade-UI LicensingModal.tsx!');
}
