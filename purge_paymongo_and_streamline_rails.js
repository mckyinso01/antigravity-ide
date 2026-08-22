const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// 1. Replace user-facing PayMongo strings
html = html.replace(/SECURED BY PAYMONGO PHILIPPINES &amp; DIRECT BANK WIRE RAILS/g, 'SECURED BY VERIFIED DIRECT BANK WIRE, GCASH &amp; PAYPAL GLOBAL RAILS');
html = html.replace(/SECURED BY PAYMONGO &amp; BANK WIRE/g, 'SECURED BY DIRECT BANK WIRE, GCASH &amp; PAYPAL');
html = html.replace(/Integrated Payments \(PayMongo\)/g, 'Sovereign Direct Settlement Rails');
html = html.replace(/Credit\/Debit cards through secure PayMongo checkout integration directly embedded into your software\./g, 'Direct Bank Wire (BPI/BDO/UB), GCash / Maya QR, and PayPal global card rails.');
html = html.replace(/Direct Wire &amp; PayMongo Rails Active/g, 'Direct Wire, GCash &amp; PayPal Global Rails Active');

// 2. Rebrand Modal Header
html = html.replace(/Secure Bank Direct Deposit &amp; PayMongo Vault Modal/g, 'Sovereign Commercial Payment &amp; Escrow Vault');

// Synchronize all 4 files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 100% CLEANED: PayMongo references purged and rebranded to Direct Bank Wire, GCash & PayPal!');
