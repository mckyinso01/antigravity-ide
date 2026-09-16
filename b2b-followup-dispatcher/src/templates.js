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
  },
  apex: {
    1: {
      subject: (company) => `Re: Predictive OBD-II Telematics & Fleet Maintenance OS — ${company}`,
      body: (lead) => `Dear ${lead.executiveName || lead.contactName || 'Fleet Operations Leadership'},

Following up on our note regarding the Apex Autotech Fleet CRM for ${lead.organization || lead.company || lead.companyName}.

When commercial vehicles experience unscheduled roadside breakdowns, roadside towing costs and missed delivery SLA penalties quickly chew into quarterly fleet margins.

We deployed an interactive live sandbox for your fleet superintendents:

👉 Live Interactive Demo: ${lead.demoUrl || 'https://apex-autotech.linkable.it.com'}

Key Capabilities:
• Real-time OBD-II DTC diagnostic fault interception & sensor stream telemetry
• Automated PM (Preventive Maintenance) scheduling based on actual engine run-hours & mileage
• 1-Click Repair Order & Parts Inventory Dispatch
• Driver safety scoring and fuel efficiency optimization ledger

⚡ 48-HOUR FLEET PILOT:
We offer a dedicated 48-hour pilot pre-loaded with your vehicle classifications for a flat $500 USD refundable pilot deposit (100% credited towards perpetual deployment).

Would your fleet operations team be open to a 10-minute demonstration this week?

Best regards,
Mharc Gatan
Lead Solutions Architect | Apex Autotech
Direct: mharcgatan@linkable.it.com`
    },
    2: {
      subject: (company) => `Re: Cutting unscheduled fleet downtime at ${company}`,
      body: (lead) => `Dear ${lead.executiveName || lead.contactName},

Quick follow-up on how Apex Autotech Fleet CRM (${lead.demoUrl || 'https://apex-autotech.linkable.it.com'}) automates maintenance schedules and reduces repair shop turn-around times by 28%.

Would you like a private sandbox walk-through for your dispatch and maintenance team?

Best regards,
Mharc Gatan
Lead Solutions Architect | Apex Autotech
Direct: mharcgatan@linkable.it.com`
    },
    3: {
      subject: (company) => `Closing file for ${company} fleet telematics`,
      body: (lead) => `Dear ${lead.executiveName || lead.contactName},

Assuming commercial fleet management automation isn't an immediate focus right now, I'll close out your file.

You can test the live system anytime at: ${lead.demoUrl || 'https://apex-autotech.linkable.it.com'}

Best regards,
Mharc Gatan
Lead Solutions Architect | Apex Autotech
Direct: mharcgatan@linkable.it.com`
    }
  },
  linkable: {
    1: {
      subject: (company) => `Re: Rapid 24-48h Custom Web App & SaaS Delivery — ${company}`,
      body: (lead) => `Hi ${lead.executiveName || lead.contactName || 'Executive Leadership'},

Saw your operations at ${lead.organization || lead.company || lead.companyName}.

Instead of traditional agencies requiring 3-month discovery phases or bloated retainers, we deliver production web platforms, SaaS portals, and automation tools on rapid 24-48 hour functional sprint cycles.

👉 Live Architecture Portfolio: ${lead.demoUrl || 'https://linkable.it.com'}

Key Highlights:
• 100/100 Lighthouse Performance & Sub-0.4s First Contentful Paint
• Zero-Vendor-Lockin clean Node.js & modern frontend architecture
• High-converting responsive UX with zero template bloat
• Milestone-based Escrow terms (Start with a refundable $650 sprint deposit; balance only upon 100% verified delivery)

What software feature or internal tool does ${lead.organization || lead.company || lead.companyName} need built or fixed first? I can turn around an interactive prototype within 24 hours.

Best regards,
Mharc Gatan
Lead Full-Stack Architect | Linkable Systems
Direct: mharcgatan@linkable.it.com`
    },
    2: {
      subject: (company) => `Re: Eliminating software delivery delays at ${company}`,
      body: (lead) => `Hi ${lead.executiveName || lead.contactName},

Following up on our rapid 24-48 hour software delivery sprints (${lead.demoUrl || 'https://linkable.it.com'}).

If you have an MVP, dashboard, or client portal needing immediate deployment, we can launch a dedicated functional sprint this week.

Let me know if you'd like a quick 5-minute overview!

Best regards,
Mharc Gatan
Lead Full-Stack Architect | Linkable Systems
Direct: mharcgatan@linkable.it.com`
    },
    3: {
      subject: (company) => `Closing file for ${company}`,
      body: (lead) => `Hi ${lead.executiveName || lead.contactName},

I haven't heard back, so I assume you're fully covered on the engineering front.

Feel free to bookmark our live architecture portfolio: ${lead.demoUrl || 'https://linkable.it.com'}

Best regards,
Mharc Gatan
Lead Full-Stack Architect | Linkable Systems
Direct: mharcgatan@linkable.it.com`
    }
  },
  aeroturbine: {
    1: {
      subject: (company) => `Re: Gas Turbine MRO Lifecycle & FAA Part 145 Traceability — ${company}`,
      body: (lead) => `Dear ${lead.executiveName || lead.contactName || 'Maintenance & Quality Leadership'},

Following up on our note regarding AeroTurbine MRO Guard for ${lead.organization || lead.company || lead.companyName}.

Managing gas turbine overhaul cycles, hot-section boroscope inspections, and FAA/EASA airworthiness compliance logs across multiple stations often creates costly component quarantine delays.

We deployed an interactive live sandbox for your technical engineering team:

👉 Live Interactive Demo: ${lead.demoUrl || 'https://aeroturbine.linkable.it.com'}

Key Capabilities:
• Real-time Gas Turbine Rotor & Stator Life-Limited Part (LLP) cycle tracking
• Automated FAA Form 8130-3 and EASA Form 1 dual-release compliance dossiers
• Boroscope inspection image annotation with sub-millimeter crack depth logs
• 48-Hour Private Sandbox Pilot ($950 refundable deposit)

Would your MRO engineering team be open for a 10-minute walkthrough this week?

Best regards,
Mharc Gatan
Lead Solutions Architect | AeroTurbine MRO Guard
Direct: mharcgatan@linkable.it.com`
    },
    2: {
      subject: (company) => `Re: Slashing turbine MRO turnaround time at ${company}`,
      body: (lead) => `Dear ${lead.executiveName || lead.contactName},

Quick note on how AeroTurbine MRO Guard accelerates repair station throughput and prevents parts traceability bottlenecks.

Let me know if your team would like a private evaluation sandbox!

Best regards,
Mharc Gatan
Lead Solutions Architect | AeroTurbine MRO Guard
Direct: mharcgatan@linkable.it.com`
    },
    3: {
      subject: (company) => `Closing file on ${company} turbine maintenance`,
      body: (lead) => `Dear ${lead.executiveName || lead.contactName},

Assuming turbine maintenance tracking isn't a current priority, I'll close out your file.

Best regards,
Mharc Gatan
Lead Solutions Architect | AeroTurbine MRO Guard
Direct: mharcgatan@linkable.it.com`
    }
  },
  webaudit: {
    1: {
      subject: (company) => `Re: Mobile Speed & Core Web Vitals Audit for ${company}`,
      body: (lead) => `Hi ${lead.executiveName || lead.contactName || 'Leadership Team'},

Noticed ${lead.organization || lead.company || lead.companyName} is losing up to 35% of mobile traffic due to Core Web Vitals layout shifts and render delays.

We built an automated speed remediation sprint delivering guaranteed sub-0.4s DOM paint:

👉 Live Audit Sandbox: ${lead.demoUrl || 'https://audit.linkable.it.com'}

• 100/100 Mobile & Desktop PageSpeed Optimization
• Fixes Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS)
• Flat $350 USD refundable sprint deposit via Escrow

Would you be open for a quick 5-minute visual report for your website?

Best regards,
Mharc Gatan
Lead Performance Engineer | Linkable Systems
Direct: mharcgatan@linkable.it.com`
    },
    2: {
      subject: (company) => `Re: Boosting conversion rates at ${company}`,
      body: (lead) => `Hi ${lead.executiveName || lead.contactName},

Following up on our performance optimization sprint for ${lead.organization || lead.company || lead.companyName}.

Let me know if you'd like us to run a free audit on your main conversion landing pages!

Best regards,
Mharc Gatan
Lead Performance Engineer | Linkable Systems
Direct: mharcgatan@linkable.it.com`
    },
    3: {
      subject: (company) => `Closing file for ${company}`,
      body: (lead) => `Hi ${lead.executiveName || lead.contactName},

Closing out your file for now. You can check our performance tools anytime at: ${lead.demoUrl || 'https://audit.linkable.it.com'}

Best regards,
Mharc Gatan
Lead Performance Engineer | Linkable Systems
Direct: mharcgatan@linkable.it.com`
    }
  }
};

/**
 * Generates tailored LinkedIn InMail / Connection Note Pitch
 */
export function getLinkedInPitch(appKey, lead) {
  const company = lead.companyName || lead.company || lead.organization || 'your organization';
  const name = lead.executiveName && lead.executiveName !== 'Executive Leadership' ? lead.executiveName.split(' ')[0] : 'there';
  const demoUrl = lead.demoUrl || 'https://linkable.it.com';

  switch ((appKey || '').toLowerCase()) {
    case 'pharmaguard':
      return `Hi ${name}, saw your quality operations at ${company}. We built a zero-lockin OS for USP <1079> Arrhenius excursion math & FDA Part 11 CAPA: ${demoUrl}. We offer a 48-hr pilot backed by refundable escrow. Open to a 5-min look?`;
    case 'bunkertrust':
      return `Hi ${name}, noticed your bunker operations at ${company}. We engineered an automated Coriolis aeration intercept & EU ETS €75.50/t ledger: ${demoUrl}. Available for a quick 48-hr pilot. Open to connecting?`;
    case 'apex':
      return `Hi ${name}, saw your fleet operations at ${company}. We deployed an automated OBD-II telematics & preventive maintenance OS: ${demoUrl}. Cuts unscheduled downtime by 28%. Open to a 5-min demo?`;
    case 'sitesafe':
      return `Hi ${name}, noticed your jobsites at ${company}. We built an automated NOAA weather delay claim & OSHA 300 compliance engine: ${demoUrl}. Open to a quick 5-min walkthrough?`;
    case 'saccade':
      return `Hi ${name}, noticed your campaigns at ${company}. Saccade-UI uses biological eye-tracking to predict ad visual fixation in sub-5ms: ${demoUrl}. Can generate a free creative audit if interested!`;
    default:
      return `Hi ${name}, noticed your work at ${company}. We deliver production web platforms and custom SaaS on rapid 24-48h sprints with refundable escrow terms: ${demoUrl}. Open to exploring?`;
  }
}

/**
 * Generates direct Facebook Messenger Pitch (m.me/)
 */
export function getFacebookMessengerPitch(appKey, lead) {
  const company = lead.companyName || lead.company || lead.organization || 'your team';
  const demoUrl = lead.demoUrl || 'https://linkable.it.com';

  switch ((appKey || '').toLowerCase()) {
    case 'pharmaguard':
      return `Hello ${company} team! We noticed your cold-chain operations. When temperature excursions happen, proving batch stability to FDA auditors is tough. We built a live Arrhenius MKT calculator & CAPA engine: ${demoUrl}. Can we run a quick 48-hr test pilot for your QA team?`;
    case 'bunkertrust':
      return `Hello ${company} team! Marine fuel aeration & EU ETS compliance are costing shipowners thousands per voyage. We built a live verification ledger: ${demoUrl}. Would your technical superintendents be open to testing a sandbox?`;
    case 'apex':
      return `Hello ${company} team! Unscheduled fleet breakdowns and repair shop delays eat up margins. We built an automated OBD-II fleet maintenance OS: ${demoUrl}. Can we set up a 48-hr pilot for your fleet?`;
    case 'sitesafe':
      return `Hello ${company} team! Weather delay disputes and jobsite OSHA tracking cost general contractors thousands. We built a 1-click NOAA-certified weather claim engine: ${demoUrl}. Let us know if you'd like a quick 5-minute demo!`;
    default:
      return `Hello ${company} team! Need a high-performance web app, customer portal, or custom automation delivered in 24-48 hours? Test our live engine: ${demoUrl}. 100% refundable milestone escrow to start. Let us know what you need built!`;
  }
}

