// ==========================================================================
// RUN META AD FATIGUE & BIOMETRIC CRO SCANNER
// Scans Active Advertisers, Generates 1-Page Heatmap Audits & Fast CRO Offers
// ==========================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateAdAuditReport } from './src/meta_ad_fatigue_cro_engine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_ADVERTISERS = [
  {
    brandName: "LuxeSkin Aesthetics Clinic",
    industry: "High-Ticket Medical Aesthetics",
    monthlyAdSpendUsd: 7500,
    email: "marketing@luxeskinclinic.ph",
    adDetails: {
      adTitle: "Signature Ultra-Lift HIFU Treatment (Save 40%)",
      daysRunning: 42,
      visualNoiseScore: 72,
      ctaContrastRatio: 2.8,
      textDensityPct: 52
    }
  },
  {
    brandName: "HydraFlask Direct PH",
    industry: "E-Commerce Outdoor & Drinkware",
    monthlyAdSpendUsd: 12000,
    email: "growth@hydraflask.ph",
    adDetails: {
      adTitle: "Insulated Thermal Tumbler (Buy 1 Get 1 Flash Sale)",
      daysRunning: 58,
      visualNoiseScore: 65,
      ctaContrastRatio: 3.1,
      textDensityPct: 40
    }
  },
  {
    brandName: "Apex Solar Energy Systems",
    industry: "Residential Solar & Battery Storage",
    monthlyAdSpendUsd: 15000,
    email: "inquiries@apexsolarenergy.ph",
    adDetails: {
      adTitle: "Slash Your Electric Bill to Zero (Free Solar Assessment)",
      daysRunning: 31,
      visualNoiseScore: 58,
      ctaContrastRatio: 3.5,
      textDensityPct: 48
    }
  },
  {
    brandName: "Kinetics Ergonomic Chairs",
    industry: "Office Furniture & Ergonomics",
    monthlyAdSpendUsd: 9000,
    email: "sales@kineticsergo.com",
    adDetails: {
      adTitle: "Mesh Executive Lumbar Pro Chair (10-Year Warranty)",
      daysRunning: 49,
      visualNoiseScore: 60,
      ctaContrastRatio: 3.0,
      textDensityPct: 38
    }
  }
];

function runAdCroScanner() {
  console.log('='.repeat(70));
  console.log('👁️ EXECUTING META AD FATIGUE & BIOMETRIC CRO SCANNER (STRATEGY 2)');
  console.log('='.repeat(70));

  let totalWastedSpendDiscovered = 0;
  let auditSummaries = [];

  TARGET_ADVERTISERS.forEach((adv, i) => {
    console.log(`\n[${i + 1}/${TARGET_ADVERTISERS.length}] Analyzing Brand: ${adv.brandName} (${adv.industry})`);
    console.log(` -> Ad Creative: "${adv.adDetails.adTitle}" (${adv.adDetails.daysRunning} days active)`);
    console.log(` -> Monthly Spend: $${adv.monthlyAdSpendUsd.toLocaleString()} USD/mo`);

    const result = generateAdAuditReport(adv);
    const audit = result.auditData;

    totalWastedSpendDiscovered += audit.estimatedWastedSpendMonthlyUsd;

    console.log(` -> 🛑 Fatigue Status: ${audit.fatigueLevel}`);
    console.log(` -> 👁️ CTA Fixation: ${audit.ctaFixationPct}% | BG Cannibalization: ${audit.backgroundDistractionPct}%`);
    console.log(` -> 📈 Projected CVR Lift: +${audit.projectedCvrLiftPct}%`);
    console.log(` -> 💸 Estimated Wasted Monthly Spend: $${audit.estimatedWastedSpendMonthlyUsd.toLocaleString()} USD`);
    console.log(` -> 📄 1-Page Audit Saved: ${path.basename(result.reportFilePath)}`);

    auditSummaries.push({
      brandName: adv.brandName,
      auditId: result.auditId,
      file: result.reportFilePath,
      projectedCvrLiftPct: audit.projectedCvrLiftPct,
      wastedSpendUsd: audit.estimatedWastedSpendMonthlyUsd
    });
  });

  console.log('\n' + '='.repeat(70));
  console.log(`🎉 BATCH SCAN COMPLETE!`);
  console.log(`📊 Total Brands Audited: ${TARGET_ADVERTISERS.length}`);
  console.log(`💸 Total Wasted Ad Spend Identified: $${totalWastedSpendDiscovered.toLocaleString()} USD/mo`);
  console.log(`💼 Total Fast-Cash Offer Pipeline ($450 each): $${(TARGET_ADVERTISERS.length * 450).toLocaleString()} USD`);
  console.log(`💼 Total Monthly Retainer Pipeline ($1,500/mo each): $${(TARGET_ADVERTISERS.length * 1500).toLocaleString()} USD/mo`);
  console.log('='.repeat(70));
}

runAdCroScanner();
