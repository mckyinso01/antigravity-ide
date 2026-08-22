const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  path.join(__dirname, 'SiteSafe-AI', 'src', 'components', 'CommercialLicensingModal.tsx'),
  path.join(__dirname, 'omnistock-enterprise', 'src', 'components', 'LicensingDeploymentModal.tsx'),
  path.join(__dirname, 'ClaimGuard-AI', 'src', 'components', 'pricing-gap', 'BuyoutEscrowModal.tsx'),
  path.join(__dirname, 'clinical-pristine', 'src', 'components', 'SystemSpecsModal.tsx'),
  path.join(__dirname, 'gatzdevs-cinematic', 'index.html'),
  path.join(__dirname, 'gatzdevs-cinematic', '200.html'),
  path.join(__dirname, 'GatzDevPortfolio', 'index.html'),
  path.join(__dirname, 'GatzDevPortfolio', '200.html')
];

filesToUpdate.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace WhatsApp URL and phone text
    content = content.replace(/https:\/\/wa\.me\/639622816533/g, 'https://wa.me/639622812703');
    content = content.replace(/WhatsApp: \+63 962 281 6533/g, 'WhatsApp: +63 962 281 2703');
    content = content.replace(/Founder Support WhatsApp: \+63 962 281 6533/g, 'Founder Support WhatsApp: +63 962 281 2703');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Updated WhatsApp in:', filePath);
  }
});

console.log('🎉 100% WhatsApp Numbers Synchronized across all Licensing & Installation Managers!');
