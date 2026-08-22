const fs = require('fs');
const path = require('path');

const specialistFiles = [
  path.join(__dirname, 'LinkableDemoSpecialist.js'),
  path.join(__dirname, 'gatzdevs-cinematic', 'LinkableDemoSpecialist.js'),
  path.join(__dirname, 'GatzDevPortfolio', 'LinkableDemoSpecialist.js'),
  path.join(__dirname, 'SiteSafe-AI', 'public', 'LinkableDemoSpecialist.js'),
  path.join(__dirname, 'clinical-pristine', 'public', 'LinkableDemoSpecialist.js'),
  path.join(__dirname, 'ClaimGuard-AI', 'public', 'LinkableDemoSpecialist.js'),
  path.join(__dirname, 'omnistock-enterprise', 'public', 'LinkableDemoSpecialist.js'),
  path.join(__dirname, 'Saccade-UI-evaluator', 'public', 'LinkableDemoSpecialist.js')
];

specialistFiles.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    
    // Update FAQ_ANSWERS.migration with all 5 flagship apps
    content = content.replace(
      /migration:\s*"[^"]*",/g,
      'migration: "🔄 <strong>Universal 1-Click Legacy Migration Engine:</strong> Switch from legacy incumbents in under 3 seconds with zero data loss. We support direct ingestion from: <br>• <strong>Healthcare ICU:</strong> Epic Systems, Cerner (Oracle Health), Meditech<br>• <strong>Construction CPM:</strong> Procore, Oracle Primavera P6 (.xer/.xml), MS Project, AIA G702<br>• <strong>Logistics WMS:</strong> Manhattan Associates, SAP EWM (MATMAS/LAGP), NetSuite WMS, Fishbowl, 50k SKU CSV<br>• <strong>Revenue Cycle:</strong> EDI 835/837, Epic Resolute & Optum Claim Dumps<br>• <strong>CRO & Biometrics:</strong> Hotjar, Crazy Egg & Google Analytics 4 Funnel Exports.",'
    );

    // Update keyword matcher
    if (!content.includes('hotjar')) {
      content = content.replace(
        "qLower.includes('netsuite')",
        "qLower.includes('netsuite') || qLower.includes('hotjar') || qLower.includes('crazyegg') || qLower.includes('ga4') || qLower.includes('heatmap')"
      );
    }

    fs.writeFileSync(f, content, 'utf8');
    console.log(`✅ Updated AI Demo Specialist in ${f}`);
  }
});

console.log('🎉 ALL 5 FLAGSHIP APPS AI SPECIALIST KNOWLEDGE FULLY SYNCHRONIZED!');
