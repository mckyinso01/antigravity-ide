// ============================================================
// B2B Multi-Touchpoint & Fast-Cash Pilot Email Templates Matrix
// Incorporating the $650 Refundable Pilot Sprint & 3-Gives Terms
// ============================================================

export const TEMPLATES = {
  clinical: {
    1: {
      subject: (company) => `Re: ICU Waveform & Zero-Lockin EHR Architecture — ${company}`,
      body: (lead) => `Dear ${lead.executiveName || lead.contactName || 'Clinical Leadership'},

I wanted to quickly follow up on our previous note regarding Clinical Pristine ICU OS for ${lead.organization || lead.company}.

Given the operational focus on ${lead.priorityHook || 'eliminating telemetry latency and reducing clinician EHR charting overhead'}, we deployed an interactive live sandbox for your informatics team to evaluate:

👉 Live Interactive Demo: ${lead.demoUrl || 'https://clinical.linkable.it.com'}

Key Highlights:
• Sub-second 60fps continuous multi-waveform telemetry (ECG, Arterial Line, SpO2)
• Zero-Vendor-Lock-in 1-Click HL7/FHIR EHR data migration
• Offline-first edge security with zero cloud patient data leakage

⚡ FAST-START PILOT OPTION:
To avoid long procurement cycles, we offer a 48-Hour Private Sandbox Deployment for a flat $650 USD refundable pilot deposit (credited 100% towards the $48,500 perpetual license upon rollout).

Would you be open to a 10-minute technical walkthrough with our engineering team this week?

Best regards,
Mharc Gatan
Lead Solutions Architect | Clinical Pristine
Direct: mharcgatan@linkable.it.com`
    },
    2: {
      subject: (company) => `Re: Bedside Medication Safety & 5-Rights Verification for ${company}`,
      body: (lead) => `Dear ${lead.executiveName || lead.contactName || 'Clinical Leadership'},

Following up on how Clinical Pristine (${lead.demoUrl || 'https://clinical.linkable.it.com'}) prevents bedside charting delays and medication administration discrepancies.

Our system incorporates:
1. Automated 5-Rights eMAR narcotic dual-witness electronic verification.
2. Direct local hospital network telemetry with sub-millisecond edge failover.
3. Rapid deployment without disrupting existing Cerner/Epic core infrastructure.

We can set up a private 48-hour pilot instance pre-configured for your ward protocols.

Would your clinical informatics team be open for a quick 10-minute demo this week?

Best regards,
Mharc Gatan
Lead Solutions Architect | Clinical Pristine
Direct: mharcgatan@linkable.it.com`
    },
    3: {
      subject: (company) => `Permission to close file on ${company} ICU modernization?`,
      body: (lead) => `Dear ${lead.executiveName || lead.contactName || 'Clinical Leadership'},

I haven't heard back, so I assume ICU telemetry and EHR decoupling isn't an active priority for ${lead.organization || lead.company} at this moment.

I won't follow up again so I don't clutter your inbox.

If your team ever needs a zero-lockin ICU clinical operating system, you can always test our live platform here: ${lead.demoUrl || 'https://clinical.linkable.it.com'}

Wishing your clinical staff continued excellence!

Best regards,
Mharc Gatan
Lead Solutions Architect | Clinical Pristine
Direct: mharcgatan@linkable.it.com`
    }
  },
  sitesafe: {
    1: {
      subject: (company) => `Re: OSHA 300 Telemetry & NOAA Weather Claim Engine — ${company}`,
      body: (lead) => `Hi ${lead.executiveName || lead.contactName || 'Safety & Operations Team'},

Following up on our note regarding SiteSafe StructuraPro for ${lead.organization || lead.company}.

I know managing subcontractor safety compliance and automated weather delay insurance claims is critical for active project margins. We deployed a live interactive sandbox:

👉 Live Interactive Demo: ${lead.demoUrl || 'https://sitesafe.linkable.it.com'}

Key Capabilities:
• Dynamic CPM interactive Gantt & automated NOAA certified weather delay insurance claim generator
• Geofenced jobsite access & real-time OSHA 300 / 300A compliance logs
• Instant 1-Click Subcontractor Hazard Telemetry

⚡ FAST-START PILOT: We can deploy a dedicated project sandbox pre-loaded with your active project sites for a flat $499 USD pilot deposit.

Would you be open for a 10-minute demo this Thursday or Friday?

Best regards,
Mharc Gatan
Lead Solutions Architect | SiteSafe AI
Direct: mharcgatan@linkable.it.com`
    },
    2: {
      subject: (company) => `Re: Eliminating jobsite delay disputes for ${company}`,
      body: (lead) => `Hi ${lead.executiveName || lead.contactName},

Most general contractors lose tens of thousands per project due to un-certified weather delay disputes and manual safety tracking logs.

With SiteSafe StructuraPro (${lead.demoUrl || 'https://sitesafe.linkable.it.com'}), field superintendents generate tamper-proof, NOAA-stamped weather delay claim packets in under 60 seconds.

Would you like a private demonstration tailored to your current project pipeline?

Best regards,
Mharc Gatan
Lead Solutions Architect | SiteSafe AI
Direct: mharcgatan@linkable.it.com`
    },
    3: {
      subject: (company) => `Closing file on ${company} safety automation`,
      body: (lead) => `Hi ${lead.executiveName || lead.contactName},

I haven't heard back, so I'll step back and assume modernizing jobsite hazard telemetry isn't a current focus.

You can always review the live platform here: ${lead.demoUrl || 'https://sitesafe.linkable.it.com'}

Best regards,
Mharc Gatan
Lead Solutions Architect | SiteSafe AI
Direct: mharcgatan@linkable.it.com`
    }
  },
  omnistock: {
    1: {
      subject: (company) => `Re: POS & Inventory Shrinkage System — Quick Demo for ${company}`,
      body: (lead) => `Hi ${lead.contactName || lead.executiveName || 'Store Operations Team'},

I wanted to quickly bump my note regarding the OmniStock POS & Inventory Automation Engine for ${lead.company || lead.organization}.

I know store managers deal with stock discrepancies and slow cashier queues during peak hours. We deployed an interactive live sandbox so you can test the full 11-feature suite directly in your browser:

👉 Live Sandbox Demo: https://omnistock-pos.surge.sh

Key Features You Can Test:
• Real-time Barcode Scanning & Offline Cashiering
• Ingredient & Recipe Portion Shrinkage Tracking
• Multi-Branch Stock Reorder Thresholds

⚡ FAST-ONBOARDING OPTIONS:
• $299/mo Cloud Managed Suite (Includes automatic updates & support)
• 1-Time Self-Hosted Enterprise License ($4,999 USD or ₱75,000 PHP) with zero recurring fees

Are you open for a 10-minute quick walkthrough this Thursday or Friday?

Best regards,
Mharc Gatan
Lead Solutions Architect | OmniStock POS
Direct: mharcgatan@linkable.it.com`
    },
    2: {
      subject: (company) => `Re: Slashing inventory discrepancies by 18% at ${company}`,
      body: (lead) => `Hi ${lead.contactName || lead.executiveName || 'Store Operations Team'},

Most retail and supermarket chains lose 2% to 4% of gross margins annually due to un-tracked recipe portioning, manual barcode mismatches, and delayed stock reconciliations.

With OmniStock POS (https://omnistock-pos.surge.sh):
1. Cashiers process checkout tickets 35% faster with zero-lag offline caching.
2. Store managers get automated SMS/Email low-stock alerts before items stock out.
3. 1-Click financial reports cut end-of-day audit time from 2 hours to 5 minutes.

Would you like me to set up a private test database loaded with your sample SKU catalogue for your store team to test?

Best regards,
Mharc Gatan
Lead Solutions Architect | OmniStock POS
Direct: mharcgatan@linkable.it.com`
    },
    3: {
      subject: (company) => `Permission to close file on ${company}?`,
      body: (lead) => `Hi ${lead.contactName || lead.executiveName || 'Store Operations Team'},

I haven't heard back, so I assume modernizing your POS and inventory tracking isn't a top priority for ${lead.company || lead.organization} right now.

I won't follow up again so I don't clutter your inbox.

If anything changes down the road and you'd like to test our offline-first POS suite, you can always test the live engine here: https://omnistock-pos.surge.sh

Wishing your team continued success!

Best regards,
Mharc Gatan
Lead Solutions Architect | OmniStock POS
Direct: mharcgatan@linkable.it.com`
    }
  },
  ems: {
    1: {
      subject: (company) => `Re: Automated Shift Scheduling & Payroll Escrow — ${company}`,
      body: (lead) => `Hi ${lead.contactName || lead.executiveName || 'HR Leadership Team'},

Following up on my previous message regarding automating shift scheduling and payroll processing for ${lead.company || lead.organization}.

Most operations and HR teams lose 15+ hours weekly manually reconciling biometric logs, graveyard differential, and dispute resolutions.

We deployed an interactive live sandbox of our EMS Workforce Engine for your team to evaluate:

👉 Live Interactive Demo: https://ems-workforce.surge.sh

Key Capabilities:
• Automated Biometric & Shift Roster Optimizer (Zero manual overlap)
• Autonomous Payroll Escrow Engine with 1-Click Tax/Deduction exports
• Real-time Agent Attendance & Overtime Sentinel

⚡ FAST PILOT SPRINT: We can spin up a custom private instance connected to your sandbox roster for a $499 deposit.

Are you available for a brief 10-minute demo call this week?

Best regards,
Mharc Gatan
Lead Systems Architect | EMS Workforce
Direct: mharcgatan@linkable.it.com`
    },
    2: {
      subject: (company) => `Re: Eliminating payroll disputes & shift conflicts at ${company}`,
      body: (lead) => `Hi ${lead.contactName || lead.executiveName || 'HR Leadership Team'},

When managing high-headcount agent rosters, even a 1% error in overtime calculation or graveyard differential can trigger employee disputes and payroll recalculation bottlenecks.

Our EMS platform (https://ems-workforce.surge.sh) automates:
• Algorithmic shift scheduling based on real-time call volume peaks.
• Instant biometric cross-matching with zero ghost attendance.
• Automated dispute resolution audit trail.

Would you be open to a quick 10-minute demo this week to see how this integrates with your current HR workflow?

Best regards,
Mharc Gatan
Lead Systems Architect | EMS Workforce
Direct: mharcgatan@linkable.it.com`
    },
    3: {
      subject: (company) => `Closing file for ${company} HR automation`,
      body: (lead) => `Hi ${lead.contactName || lead.executiveName || 'HR Leadership Team'},

I'm guessing your workforce management and payroll workflows are already fully streamlined, or this simply isn't the right time.

I'll step back and close your file for now.

If you ever need an enterprise workforce scheduling engine with zero-knowledge payroll escrow, you can test our live platform anytime at: https://ems-workforce.surge.sh

Thanks for your time!

Best regards,
Mharc Gatan
Lead Systems Architect | EMS Workforce
Direct: mharcgatan@linkable.it.com`
    }
  },
  wms: {
    1: {
      subject: (company) => `Re: 3D Voxel Warehouse Twin & FEFO Cold Storage — ${company}`,
      body: (lead) => `Hi ${lead.executiveName || lead.contactName || 'Supply Chain Operations'},

Following up on our note regarding OmniStock Spatial WMS for ${lead.organization || lead.company}.

We built an interactive 3D WebGL Digital Twin sandbox designed to cut forklift transit miles by up to 34% and automate FEFO cold storage quarantine:

👉 Live Interactive Demo: ${lead.demoUrl || 'https://omnistock.linkable.it.com'}

Key Highlights:
• Real-time 3D Voxel Warehouse Layout & Multi-Tier Pallet Tracking
• Sub-millisecond SKU relocation & slotting optimization
• Air-gapped offline barcode scanning & batch quarantine

Offered as a Flat Perpetual Enterprise License ($38,500) or a $650 48-Hour Custom Deployment Pilot.

Are you available for a brief 10-minute demo this week?

Best regards,
Mharc Gatan
Lead Solutions Architect | OmniStock Spatial WMS
Direct: mharcgatan@linkable.it.com`
    },
    2: {
      subject: (company) => `Re: Slashing cold storage slotting friction at ${company}`,
      body: (lead) => `Hi ${lead.executiveName || lead.contactName},

Quick note on how our spatial WMS digital twin optimizes warehouse throughput and prevents inventory expiration bottlenecks.

Would your logistics engineering team be open to testing a sandbox pre-loaded with your facility layout?

Best regards,
Mharc Gatan
Lead Solutions Architect | OmniStock Spatial WMS
Direct: mharcgatan@linkable.it.com`
    },
    3: {
      subject: (company) => `Permission to close file on ${company} WMS?`,
      body: (lead) => `Hi ${lead.executiveName || lead.contactName},

Assuming this isn't a priority right now, I'll close out your file.

If your team ever needs spatial warehouse twin optimization, you can test the live demo anytime: ${lead.demoUrl || 'https://omnistock.linkable.it.com'}

Best regards,
Mharc Gatan
Lead Solutions Architect | OmniStock Spatial WMS
Direct: mharcgatan@linkable.it.com`
    }
  },
  saccade: {
    1: {
      subject: (company) => `Re: Biological Eye-Tracking & Itti-Koch CRO Engine — ${company}`,
      body: (lead) => `Hi ${lead.executiveName || lead.contactName || 'Creative Leadership'},

Following up on our previous note regarding Saccade-UI Biometric CRO for ${lead.organization || lead.company}.

Our engine uses the biological Itti-Koch visual attention algorithm to generate instant GPU heatmaps for advertising campaigns and UI conversion funnels:

👉 Live Interactive Demo: ${lead.demoUrl || 'https://saccade.linkable.it.com'}

Perpetual License: $9,500 (Or $450 Pilot Campaign Audit).

Would you be open for a quick 10-minute demo?

Best regards,
Mharc Gatan
Lead Solutions Architect | Saccade-UI
Direct: mharcgatan@linkable.it.com`
    },
    2: {
      subject: (company) => `Re: Instant creative ad conversion heatmaps for ${company}`,
      body: (lead) => `Hi ${lead.executiveName || lead.contactName},

Testing how Saccade-UI predicts visual fixations in sub-5ms client-side GPU processing.

Let me know if you'd like a test run on your upcoming creative campaign assets!

Best regards,
Mharc Gatan
Lead Solutions Architect | Saccade-UI
Direct: mharcgatan@linkable.it.com`
    },
    3: {
      subject: (company) => `Closing file on ${company} visual attention audits`,
      body: (lead) => `Hi ${lead.executiveName || lead.contactName},

I'll step back and close your file. You can always test the platform here: ${lead.demoUrl || 'https://saccade.linkable.it.com'}

Best regards,
Mharc Gatan
Lead Solutions Architect | Saccade-UI
Direct: mharcgatan@linkable.it.com`
    }
  },
  bunkertrust: {
    1: {
      subject: (company) => `Re: Coriolis MFM Aeration Theft Prevention & EU ETS Carbon Tax — ${company}`,
      body: (lead) => `Dear ${lead.executiveName || lead.contactName || 'Technical & Bunker Operations Leadership'},

I wanted to quickly follow up regarding BunkerTrust Maritime for ${lead.organization || lead.company}.

With the active enforcement of EU Directive 2023/959 (EU ETS €75.50/t-CO2) and FuelEU Maritime (Regulation EU 2023/1805), marine fuel verification is now a multi-million dollar regulatory and margin issue.

We deployed an interactive live sandbox for your technical superintendents and bunker desk:

👉 Live Interactive Demo: ${lead.demoUrl || 'https://bunkertrust.linkable.it.com'}

Key Highlights:
• Real-time Coriolis MFM apparent density aeration intercept (saving $40K–$100K per bunkering event by eliminating the "Cappuccino effect")
• Automated 100% Intra-EU / 50% Extra-EU EU ETS carbon allowance tax liability calculator
• Statutory FuelEU Maritime GHG intensity and €2,400/t VLSFO-equivalent penalty ledger
• Dual-witness STCW III/2 WORM cryptographic SHA-256 Bunker Delivery Note (BDN) seal

⚡ 48-HOUR SPRINT PILOT:
We offer a dedicated vessel trial instance for a flat $750 USD refundable pilot deposit (100% credited towards the $48,000 perpetual license).

Would your technical management team be open to a 10-minute walkthrough this week?

Best regards,
Mharc Gatan
Lead Solutions Architect | BunkerTrust Maritime
Direct: mharcgatan@linkable.it.com`
    },
    2: {
      subject: (company) => `Re: Slashing bunker aeration theft & EU ETS liability at ${company}`,
      body: (lead) => `Dear ${lead.executiveName || lead.contactName},

Following up on how BunkerTrust Maritime (${lead.demoUrl || 'https://bunkertrust.linkable.it.com'}) automates bunker delivery note reconciliation and protects charterers against micro-bubble fuel displacement.

Would you be open to running a test audit on your next bunkering operation in Rotterdam, Singapore, or Antwerp?

Best regards,
Mharc Gatan
Lead Solutions Architect | BunkerTrust Maritime
Direct: mharcgatan@linkable.it.com`
    },
    3: {
      subject: (company) => `Permission to close file on ${company} marine fuel audit?`,
      body: (lead) => `Dear ${lead.executiveName || lead.contactName},

Assuming maritime emissions compliance and bunker aeration verification aren't active priorities right now, I will close out your file.

You can explore the live sandbox anytime at: ${lead.demoUrl || 'https://bunkertrust.linkable.it.com'}

Fair winds and safe voyages!

Best regards,
Mharc Gatan
Lead Solutions Architect | BunkerTrust Maritime
Direct: mharcgatan@linkable.it.com`
    }
  },
  pharmaguard: {
    1: {
      subject: (company) => `Re: USP <1079> Arrhenius Excursion & FDA 21 CFR Part 11 CAPA — ${company}`,
      body: (lead) => `Dear ${lead.executiveName || lead.contactName || 'Quality & Regulatory Leadership'},

Following up on our note regarding PharmaGuard 21-CFR for ${lead.organization || lead.company}.

When cryogenic mRNA or monoclonal antibody cold storage experiences compressor fluctuations, calculating true chemical kinetic degradation using USP <1079> Arrhenius Mean Kinetic Temperature (MKT) prevents unnecessary disposal of multi-million dollar biologic batches.

We deployed an interactive live sandbox for your QA informatics team:

👉 Live Interactive Demo: ${lead.demoUrl || 'https://pharmaguard.linkable.it.com'}

Key Highlights:
• Continuous 60fps thermal waveform telemetry with kinetic non-linear activation energy math (ΔH = 83.144 kJ/mol)
• Embedded NIST ISO/IEC 17025 Sensor Calibration Health HUD
• Automated 5-Whys root-cause Ishikawa triage and FDA Form 483-defensive CAPA dossier export
• Dual-witness GMP-qualified (SOP-CC-042) electronic signatures with SHA-256 cryptographic seal

⚡ 48-HOUR PILOT SPRINT:
We can deploy a private QA validation instance for a flat $750 USD refundable pilot deposit (credited towards the $58,500 perpetual license).

Would you be open to a 10-minute technical evaluation call this week?

Best regards,
Mharc Gatan
Lead Solutions Architect | PharmaGuard 21-CFR
Direct: mharcgatan@linkable.it.com`
    },
    2: {
      subject: (company) => `Re: Preventing biologic batch quarantine waste at ${company}`,
      body: (lead) => `Dear ${lead.executiveName || lead.contactName},

Quick follow-up on how PharmaGuard 21-CFR (${lead.demoUrl || 'https://pharmaguard.linkable.it.com'}) helps biologic manufacturers defend batch stability during cold-chain temperature excursions.

Let me know if your validation team would like a 10-minute live demonstration!

Best regards,
Mharc Gatan
Lead Solutions Architect | PharmaGuard 21-CFR
Direct: mharcgatan@linkable.it.com`
    },
    3: {
      subject: (company) => `Closing file on ${company} cold-chain compliance`,
      body: (lead) => `Dear ${lead.executiveName || lead.contactName},

I'll step back and close your file for now.

You can test our live validation engine anytime at: ${lead.demoUrl || 'https://pharmaguard.linkable.it.com'}

Best regards,
Mharc Gatan
Lead Solutions Architect | PharmaGuard 21-CFR
Direct: mharcgatan@linkable.it.com`
    }
  }
};
