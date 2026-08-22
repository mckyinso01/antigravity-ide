const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// 1. Add openDirectWireModal helper
const targetCheckoutDef = `    function openPayMongoCheckout(planName, priceUsd, pricePhp) {
      openPayPalCheckout(planName, priceUsd, pricePhp);
    }`;

const newCheckoutDef = `    function openPayMongoCheckout(planName, priceUsd, pricePhp) {
      openPayPalCheckout(planName, priceUsd, pricePhp);
    }

    function openDirectWireModal(planName, priceUsd, pricePhp) {
      openPayPalCheckout(planName || 'Enterprise Single Deployment ($48.5k)', priceUsd || 48500, pricePhp || 2716000);
      switchPaymentTab('bank');
    }`;

if (html.includes(targetCheckoutDef)) {
  html = html.replace(targetCheckoutDef, newCheckoutDef);
  console.log('✅ openDirectWireModal wired up!');
}

// 2. Fix WhatsApp link in fulfillment vault
html = html.replace(/https:\/\/wa\.me\/639622816533/g, 'https://wa.me/639622812703');

// Synchronize all 4 files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 100% HARDENED & SYNCHRONIZED ACROSS ALL 4 FILES!');
