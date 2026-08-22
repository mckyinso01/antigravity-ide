const { execSync } = require('child_process');
const path = require('path');

const targets = [
  { folder: 'clinical-pristine', domain: 'clinical.linkable.it.com', buildCmd: 'npm run build', distDir: 'dist' },
  { folder: 'SiteSafe-AI', domain: 'sitesafe.linkable.it.com', buildCmd: 'npm run build', distDir: 'dist' },
  { folder: 'omnistock-enterprise', domain: 'omnistock.linkable.it.com', buildCmd: 'npm run build', distDir: 'dist' },
  { folder: 'ClaimGuard-AI', domain: 'claimguard.linkable.it.com', buildCmd: 'npm run build', distDir: 'dist' },
  { folder: 'Saccade-UI-evaluator', domain: 'saccade.linkable.it.com', buildCmd: 'npm run build', distDir: 'dist' },
  { folder: 'gatzdevs-cinematic', domain: 'linkable.it.com', buildCmd: '', distDir: '.' }
];

targets.forEach(t => {
  const dir = path.join(__dirname, t.folder);
  console.log(`\n==================================================`);
  console.log(`🚀 Deploying ${t.folder} to ${t.domain}`);
  console.log(`==================================================`);

  if (t.buildCmd) {
    console.log(`Building in ${dir}...`);
    execSync(t.buildCmd, { cwd: dir, stdio: 'inherit' });
  }

  const deployDir = path.join(dir, t.distDir);
  console.log(`Publishing ${deployDir} to ${t.domain}...`);
  execSync(`npx -y surge ${t.distDir} ${t.domain}`, { cwd: dir, stdio: 'inherit' });
  console.log(`✅ ${t.domain} DEPLOYED SUCCESSFULLY!`);
});

console.log('\n🎉 ALL 5 FLAGSHIP APPS & MASTER HUB FULLY DEPLOYED TO DEDICATED DOMAINS!');
