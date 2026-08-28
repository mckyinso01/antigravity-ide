// ==========================================================================
// META MCP 15-MINUTE SNIPER ENGINE (STRATEGY 1)
// Automated High-Intent Pain Point Harvester, Weapon Matcher & Pilot Generator
// ==========================================================================

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const LINKABLE_ARSENAL = [
  {
    weaponId: 'APEX_AUTOTECH',
    title: 'Apex AutoTech Fleet & CRM OS',
    domain: 'https://apexautotech.linkable.it.com',
    keywords: ['car dealership', 'automotive inventory', 'fleet tracking', 'obd-ii', 'used car', 'lot aging', 'vehicle handover', 'mechanic dispatch'],
    targetIndustry: 'Automotive Dealerships & Fleet Operators',
    standardPrice: 4500,
    pilotDeposit: 650
  },
  {
    weaponId: 'BAZAAR_TRUST',
    title: 'BazaarTrust Multi-Vendor Marketplace OS',
    domain: 'https://bazaartrust.linkable.it.com',
    keywords: ['multi-vendor', 'marketplace platform', 'vendor commission', 'buyer escrow', 'e-commerce multi-store', 'storefront catalog'],
    targetIndustry: 'Online Marketplaces & Commerce Aggregators',
    standardPrice: 4000,
    pilotDeposit: 650
  },
  {
    weaponId: 'PHARMA_GUARD',
    title: 'PharmaGuard 21-CFR Excursion OS',
    domain: 'https://pharmaguard.linkable.it.com',
    keywords: ['cold storage', 'temperature excursion', 'usp 1079', '21 cfr part 11', 'pharmaceutical warehouse', 'fda capa', 'nist sensor'],
    targetIndustry: 'Pharmaceutical Logistics & Cold-Chain Storage',
    standardPrice: 6500,
    pilotDeposit: 750
  },
  {
    weaponId: 'BUNKER_TRUST',
    title: 'BunkerTrust Maritime Fuel & Emissions OS',
    domain: 'https://bunkertrust.linkable.it.com',
    keywords: ['bunkering', 'marine fuel', 'coriolis', 'fuel anomaly', 'eu ets', 'fueleu maritime', 'chartering', 'vessel telemetry'],
    targetIndustry: 'Maritime Shipping & Bunkering Fleets',
    standardPrice: 8500,
    pilotDeposit: 950
  },
  {
    weaponId: 'SACCADE_CRO',
    title: 'Saccade-UI Biometric Visual Fixation OS',
    domain: 'https://saccade.linkable.it.com',
    keywords: ['meta ads cpc', 'ad fatigue', 'landing page dropoff', 'ctr low', 'shopify conversion', 'cvr low', 'eye tracking', 'ad creative'],
    targetIndustry: 'E-Commerce Brands & Performance Media Buyers',
    standardPrice: 1500,
    pilotDeposit: 450
  }
];

/**
 * Matches an unstructured grievance/post to our high-demand Linkable flagship weapon.
 * @param {string} postContent - Raw text from Facebook Group or Community Post
 * @returns {{ matchedWeapon: object, confidenceScore: number, matchingKeywords: string[] }}
 */
export function matchGrievanceToWeapon(postContent) {
  const normalized = postContent.toLowerCase();
  let bestMatch = null;
  let highestScore = 0;
  let matchedKeywords = [];

  LINKABLE_ARSENAL.forEach(weapon => {
    let score = 0;
    const hits = [];

    weapon.keywords.forEach(kw => {
      if (normalized.includes(kw.toLowerCase())) {
        score += 25;
        hits.push(kw);
      }
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = weapon;
      matchedKeywords = hits;
    }
  });

  // Fallback to Master Hub if generic
  if (!bestMatch || highestScore === 0) {
    bestMatch = {
      weaponId: 'LINKABLE_MASTER',
      title: 'Linkable Industrial Enterprise Supermarket',
      domain: 'https://linkable.it.com',
      targetIndustry: 'Custom Enterprise Software',
      standardPrice: 5000,
      pilotDeposit: 750
    };
    highestScore = 15;
  }

  const confidenceScore = Math.min(100, highestScore);

  return {
    matchedWeapon: bestMatch,
    confidenceScore,
    matchingKeywords: matchedKeywords
  };
}

/**
 * Generates an instant high-converting client proposal and 15-minute response pitch.
 * @param {{ clientName: string, company: string, platformSource: string, grievance: string }} lead 
 * @returns {{ proposalRef: string, tailoredSubdomain: string, pitchScript: string, escrowLink: string }}
 */
export function generateSniperPitch(lead) {
  const matchResult = matchGrievanceToWeapon(lead.grievance);
  const weapon = matchResult.matchedWeapon;
  const proposalRef = `SNIPER-${Date.now().toString().slice(-6)}`;
  
  const clientSlug = lead.company.toLowerCase().replace(/[^a-z0-9]/g, '');
  const tailoredSubdomain = `https://${clientSlug}.linkable.it.com`;
  const escrowLink = `https://linkable.it.com/escrow/deposit?ref=${proposalRef}&amount=${weapon.pilotDeposit}`;

  const pitchScript = `Hi ${lead.clientName.split(' ')[0]},

Saw your post regarding ${lead.company}'s search for a reliable ${weapon.targetIndustry.toLowerCase()} solution.

Instead of sending generic slides or proposals, our engineering team has a live, battle-tested platform running that solves this exact problem:

👉 Live Interactive Sandbox: ${weapon.domain}
👉 Custom Deployment Target for ${lead.company}: ${tailoredSubdomain}

What is already built & running:
• Sub-second real-time state management & 100/100 Lighthouse performance
• Automated compliance & mathematical reconciliation engine
• Zero-vendor lock-in: 100% full source code ownership upon project completion

⚡ 48-HOUR FAST-START PILOT ($${weapon.pilotDeposit} USD REFUNDABLE DEPOSIT):
We can deploy a private, white-labeled sandbox pre-configured with ${lead.company}'s parameters in 48 hours. The $${weapon.pilotDeposit} deposit is 100% credited towards the final $${weapon.standardPrice.toLocaleString()} handover.

👉 Instant Pilot Escrow Contract:
${escrowLink}

Would you be open for a brief 10-minute live demonstration this week?

Best regards,
Mharc Gatan
Lead Solutions Architect | Linkable Systems
Direct: mharcgatan@linkable.it.com
Master Portfolio: https://linkable.it.com`;

  return {
    proposalRef,
    matchedWeaponId: weapon.weaponId,
    matchedWeaponTitle: weapon.title,
    tailoredSubdomain,
    confidenceScore: matchResult.confidenceScore,
    matchingKeywords: matchResult.matchingKeywords,
    pitchScript,
    escrowLink,
    standardPrice: weapon.standardPrice,
    pilotDeposit: weapon.pilotDeposit
  };
}
