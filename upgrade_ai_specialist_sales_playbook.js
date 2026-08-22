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
    
    // Add new FAQ answers for sandbox, starter tier, and partner program
    const newFaqEntries = `
    sandbox: "🎁 <strong>Free 48-Hour Custom Enterprise Sandbox:</strong> We build an interactive, branded proof-of-concept digital twin of your exact warehouse floorplan, hospital telemetry, or construction project within 48 hours — 100% free with zero purchasing obligation. Click <strong>'Free 48h Sandbox'</strong> in the navbar or contact Founder Mharc Gatan directly (+63 962 281 2703).",
    partner: "🤝 <strong>Authorized Solutions Partner Program:</strong> IT consultants, construction advisors, and healthcare agencies earn <strong>25% to 30% direct deal commission (₱50,000 – ₱150,000+ per deal)</strong> introducing our sovereign platforms to their clients. We do 100% of the engineering and migration!",
    starter: "⚡ <strong>Starter Self-Hosted Tier ($199 / ₱9,990):</strong> Instant single-site Docker container license with zero recurring SaaS fees, ideal for boutique clinics, subcontractors, and single-facility operators.",`;

    if (!content.includes('sandbox:')) {
      content = content.replace(
        'const FAQ_ANSWERS = {',
        'const FAQ_ANSWERS = {' + newFaqEntries
      );
    }

    // Add matchers
    if (!content.includes("qLower.includes('sandbox')")) {
      content = content.replace(
        "if (qLower.includes('migration')",
        "if (qLower.includes('sandbox') || qLower.includes('poc') || qLower.includes('trial') || qLower.includes('free custom')) return FAQ_ANSWERS.sandbox;\n    if (qLower.includes('partner') || qLower.includes('reseller') || qLower.includes('agency') || qLower.includes('commission')) return FAQ_ANSWERS.partner;\n    if (qLower.includes('starter') || qLower.includes('199') || qLower.includes('9990') || qLower.includes('cheap') || qLower.includes('entry')) return FAQ_ANSWERS.starter;\n    if (qLower.includes('migration')"
      );
    }

    fs.writeFileSync(f, content, 'utf8');
    console.log(`✅ Enhanced AI Demo Specialist in ${f}`);
  }
});

console.log('🎉 ALL AI DEMO SPECIALISTS UPGRADED WITH SANDBOX, STARTER & PARTNER KNOWLEDGE!');
