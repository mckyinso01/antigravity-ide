const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

console.log('🚀 Initiating Global Canvas Expansion to max-w-[1640px] and High-Impact Typography Scaling...');

// 1. Upgrade Navigation Header width & spacing
html = html.replace(
  '<nav class="flex justify-between items-center h-16 px-6 md:px-16 max-w-7xl mx-auto">',
  '<nav class="flex justify-between items-center h-20 px-6 sm:px-10 lg:px-14 max-w-[1680px] mx-auto w-full">'
);

html = html.replace(
  '<div class="hidden md:flex gap-8 items-center font-mono text-sm">',
  '<div class="hidden md:flex gap-7 lg:gap-10 items-center font-mono text-sm tracking-wide">'
);

// 2. Globally replace all section containers from max-w-7xl to wide-canvas max-w-[1640px]
html = html.replaceAll('max-w-7xl mx-auto px-6 md:px-16', 'max-w-[1640px] mx-auto px-6 sm:px-10 lg:px-14');
html = html.replaceAll('max-w-7xl mx-auto px-6 lg:px-16', 'max-w-[1640px] mx-auto px-6 sm:px-10 lg:px-14');

// 3. Scale up Hero Section typography & spacing
html = html.replace(
  '<main class="pt-28">',
  '<main class="pt-32">'
);

html = html.replace(
  '<div class="max-w-5xl relative z-10">',
  '<div class="max-w-6xl relative z-10">'
);

html = html.replace(
  '<h1 class="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 font-display leading-tight">',
  '<h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 font-display leading-[1.08]">'
);

html = html.replace(
  '<p class="text-on-surface-variant text-base md:text-lg mb-8 leading-relaxed font-sans max-w-3xl">',
  '<p class="text-slate-300 text-lg sm:text-xl mb-10 leading-relaxed font-sans max-w-4xl">'
);

// 4. Boost Quick Launch Sandbox Dock inner container & cards
html = html.replace(
  'class="p-6 md:p-8 rounded-3xl glass-card border border-cyan-500/30 bg-gradient-to-b from-[#0B1C30]/90 via-slate-950/90 to-[#050811] shadow-2xl max-w-5xl mx-auto"',
  'class="p-8 md:p-10 rounded-3xl glass-card border border-cyan-500/30 bg-gradient-to-b from-[#0B1C30]/90 via-slate-950/90 to-[#050811] shadow-2xl w-full mx-auto"'
);

html = html.replace(
  '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono text-xs">',
  '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-mono text-xs">'
);

// 5. Expand Legacy vs Sovereign inner container
html = html.replace(
  '<div class="glass-card spotlight-card p-8 md:p-12 rounded-3xl border border-blue-500/30 relative overflow-hidden bg-gradient-to-b from-[#0B1C30] via-slate-950 to-[#050811]">',
  '<div class="glass-card spotlight-card p-8 sm:p-12 lg:p-16 rounded-3xl border border-blue-500/30 relative overflow-hidden bg-gradient-to-b from-[#0B1C30] via-slate-950 to-[#050811] shadow-2xl">'
);

html = html.replace(
  '<div class="text-center max-w-3xl mx-auto mb-10">',
  '<div class="text-center max-w-4xl mx-auto mb-12">'
);

html = html.replace(
  '<h2 class="text-3xl md:text-5xl font-extrabold text-white font-display tracking-tight mb-4">',
  '<h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight mb-5">'
);

html = html.replace(
  '<div id="comparison-display-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">',
  '<div id="comparison-display-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">'
);

// 6. Expand all 5 SaaS Dossiers and boost typography inside
html = html.replaceAll(
  'class="p-6 md:p-10 rounded-3xl glass-card',
  'class="p-8 sm:p-12 lg:p-14 rounded-3xl glass-card'
);

html = html.replaceAll(
  'class="p-6 sm:p-8 rounded-3xl glass-card',
  'class="p-8 sm:p-12 lg:p-14 rounded-3xl glass-card'
);

// Boost Dossier Headlines
html = html.replaceAll(
  'class="text-2xl md:text-4xl font-extrabold text-white font-display',
  'class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display'
);

html = html.replaceAll(
  'class="text-3xl md:text-4xl font-extrabold text-white font-display',
  'class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display'
);

// 7. Write back to all 4 files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 100% SUCCESS: Wide-Canvas (1640px) and High-Impact Typography deployed across all 4 files!');
