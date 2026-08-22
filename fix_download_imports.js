const fs = require('fs');
const path = require('path');

// Fix SystemSpecsModal in clinical-pristine
const clinicalSpecsPath = path.join(__dirname, 'clinical-pristine', 'src', 'components', 'SystemSpecsModal.tsx');
let clinical = fs.readFileSync(clinicalSpecsPath, 'utf8');
if (!clinical.includes('Download,')) {
  clinical = clinical.replace(
    'Printer,',
    'Printer,\n  Download,'
  );
  fs.writeFileSync(clinicalSpecsPath, clinical, 'utf8');
  console.log('✅ Added Download import to clinical-pristine SystemSpecsModal.tsx');
}

// Fix Saccade LicensingModal
const saccadeModalPath = path.join(__dirname, 'Saccade-UI-evaluator', 'src', 'components', 'LicensingModal.tsx');
let saccade = fs.readFileSync(saccadeModalPath, 'utf8');
if (!saccade.includes('Download,')) {
  saccade = saccade.replace(
    'Sparkles,',
    'Sparkles,\n  Download,'
  );
  fs.writeFileSync(saccadeModalPath, saccade, 'utf8');
  console.log('✅ Added Download import to Saccade LicensingModal.tsx');
}

// Fix OmniStock LicensingDeploymentModal
const omniModalPath = path.join(__dirname, 'omnistock-enterprise', 'src', 'components', 'LicensingDeploymentModal.tsx');
let omni = fs.readFileSync(omniModalPath, 'utf8');
if (!omni.includes('Download,')) {
  omni = omni.replace(
    'Printer,',
    'Printer,\n  Download,'
  );
  fs.writeFileSync(omniModalPath, omni, 'utf8');
  console.log('✅ Added Download import to omnistock LicensingDeploymentModal.tsx');
}
