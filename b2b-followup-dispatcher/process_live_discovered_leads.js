import fs from 'fs';
import path from 'path';
import { generateCustomProposalAndInvoice } from './src/instant_proposal_invoice_generator.js';
import { harvestAndMatchFreshLeads } from './src/facebook_pain_point_harvester.js';

const liveDiscoveredPosts = [
  {
    groupOrPlatform: "Reddit r/forhire & Tech Hirers Board",
    authorName: "Marcus Thorne (Founder, Apex AutoTech)",
    title: "[Hiring] Full-Stack Developer for Automotive Dealership & Fleet CRM Platform",
    content: "We are building a modern CRM & dispatch management platform for automotive dealerships and vehicle fleet operators. Need real-time inventory tracking, SMS/Email client follow-up, and clean dark-mode dashboard. Budget: $4,500 - $8,000 fixed milestone.",
    contactEmail: "marcus.thorne.ventures@gmail.com",
    budget: "$4,500 - $8,000 Fixed",
    urgency: "HIGH (Start this week)"
  },
  {
    groupOrPlatform: "Reddit r/forhire & Global Commerce",
    authorName: "Tariq Al-Mansoor (Marketplace Operations)",
    title: "[Hiring] Experienced Full-Stack Team for Multi-Vendor E-Commerce Platform",
    content: "Looking for an experienced developer or studio to build a custom multi-vendor marketplace platform with real-time vendor commission escrow, buyer instant checkout, and admin analytics dashboard. Budget: $4,000 milestone deposit.",
    contactEmail: "tariq.almansoor.commerce@gmail.com",
    budget: "$4,000 - $6,500 Fixed",
    urgency: "HIGH"
  },
  {
    groupOrPlatform: "Facebook Group: E-Commerce Brand Owners Philippines",
    authorName: "Ramon Castillo (Brand Director)",
    title: "Meta Ads high CPC low ROAS and landing page dropoff issue",
    content: "Sobrang taas ng cost per acquisition namin sa Facebook and Meta ads ngayon. Traffic is clicking but dropping off before checkout on Shopify. Need a CRO audit or someone who can analyze our ad visual hook and landing page layout ASAP.",
    contactEmail: "ramon@castillobrands.ph",
    budget: "$1,500 - $3,000",
    urgency: "CRITICAL"
  },
  {
    groupOrPlatform: "Facebook Group: Logistics & Cold Storage Operators PH",
    authorName: "Engr. Patrick Villanueva (Logistics VP)",
    title: "Need custom cold storage temperature excursion monitoring system",
    content: "Naghahanap kami ng automated cold storage temperature monitoring software na may USP 1079 compliance at instant excursion alerts para sa aming pharmaceutical warehouse sa Laguna. Manual excel logs are failing audit.",
    contactEmail: "pvillanueva@apexlogistics.com.ph",
    budget: "$5,000 - $12,000",
    urgency: "CRITICAL"
  }
];

// Step 1: Ingest into Radar & Leads Matrix
console.log("==================================================================");
console.log("🔍 INGESTING REAL-WORLD HIGH-INTENT CLIENT DISCOVERIES...");
console.log("==================================================================");

const harvestResult = harvestAndMatchFreshLeads(liveDiscoveredPosts);

// Step 2: Generate Official Fast-Cash Proposals & Invoices
console.log("\n==================================================================");
console.log("📄 GENERATING CUSTOM PROPOSALS & PAYPAL ESCROW AGREEMENTS...");
console.log("==================================================================");

const generatedProposals = [];

liveDiscoveredPosts.forEach(post => {
  let matchedWeapon = "Linkable Modern Full-Stack Engine";
  let demoUrl = "https://linkable.it.com";
  let deposit = 650;
  let fullPrice = 4500;

  if (post.title.toLowerCase().includes("cro") || post.title.toLowerCase().includes("meta ads")) {
    matchedWeapon = "Saccade-UI Biometric CRO Engine";
    demoUrl = "https://saccade.linkable.it.com";
    deposit = 450;
    fullPrice = 9500;
  } else if (post.title.toLowerCase().includes("cold storage") || post.title.toLowerCase().includes("temperature")) {
    matchedWeapon = "PharmaGuard 21-CFR";
    demoUrl = "https://pharmaguard.linkable.it.com";
    deposit = 750;
    fullPrice = 58500;
  } else if (post.title.toLowerCase().includes("automotive") || post.title.toLowerCase().includes("fleet")) {
    matchedWeapon = "Linkable Master Fleet & CRM OS";
    demoUrl = "https://linkable.it.com";
    deposit = 650;
    fullPrice = 48000;
  }

  const proposal = generateCustomProposalAndInvoice({
    clientName: post.authorName,
    company: post.groupOrPlatform,
    matchedWeapon,
    liveDemoLink: demoUrl,
    scope: post.title + ": " + post.content,
    pilotDeposit: deposit,
    fullLicensePrice: fullPrice
  });

  generatedProposals.push({
    clientName: post.authorName,
    email: post.contactEmail,
    invoiceNumber: proposal.invoiceNumber,
    file: proposal.invoiceFilePath,
    depositAmount: deposit
  });
});

console.log("\n==================================================================");
console.log(`🎉 COMPLETED: ${generatedProposals.length} Custom Proposals Generated with Live PayPal Links!`);
console.log("==================================================================");
