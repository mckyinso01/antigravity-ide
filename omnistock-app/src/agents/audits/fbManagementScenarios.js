/**
 * F&B Management Scenarios — Devil's Team Multi-Role Threat Modeling
 *
 * Defines 4 Food & Beverage management role personas with multi-scenario coverage
 * across 3 operation types (Fine Dining, QSR/Fast Food, Hotel F&B/Banquet) and
 * 3 security threat categories (POS & Payment Fraud, Inventory & Supply Chain,
 * Food Safety & Compliance).
 *
 * Roles:
 * 1. F&B Director — Strategic multi-unit oversight & P&L governance
 * 2. Restaurant Manager — Day-to-day floor operations & service execution
 * 3. Purchasing Manager — Procurement, supplier vetting & supply chain integrity
 * 4. Quality Assurance Manager — Food safety, HACCP compliance & allergen control
 */

export const FB_MANAGEMENT_ROLES = [
  // ═══════════════════════════════════════════════════════════════
  // ROLE 1: F&B DIRECTOR
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'fb_director',
    title: 'F&B Director',
    subtitle: 'Strategic Multi-Unit Oversight & P&L Governance',
    badge: 'Executive',
    color: 'emerald',
    iconName: 'Crown',
    operationalScope: 'Owns the F&B P&L across all outlets — fine dining, QSR, and hotel banquet. Sets menu pricing strategy, approves capital expenditure, monitors franchise compliance, and consolidates multi-format revenue with tax and cost governance.',

    featureBlueprint: {
      overview: 'The F&B Director requires a unified command center consolidating financial performance, franchise compliance, and operational risk across all three F&B formats — fine dining, QSR, and hotel banquet — with real-time margin visibility and cross-format benchmarking.',
      categories: [
        {
          name: '1. Multi-Format P&L Consolidation',
          features: [
            {
              title: 'Cross-Format Revenue Attribution Dashboard',
              description: 'Real-time consolidation of revenue, COGS, and labor costs across fine dining ($85 AOV), QSR ($12 AOV), and hotel banquet ($45k/event) with format-specific margin benchmarks.',
              metric: 'Target: 68% blended gross margin across all formats'
            },
            {
              title: 'Franchise Royalty & Compliance Engine',
              description: 'Automated franchise royalty calculation (6% gross sales), marketing fund contributions (2%), and compliance scorecard tracking across all QSR franchise locations.',
              metric: 'Zero franchise compliance gaps >30 days'
            }
          ]
        },
        {
          name: '2. Capital Allocation & Risk Governance',
          features: [
            {
              title: 'Banquet Revenue Optimization & Forecasting',
              description: 'Predictive banquet revenue modeling based on hotel occupancy, event pipeline, and seasonal demand — with minimum guaranteed revenue clauses and attrition tracking.',
              metric: 'Banquet revenue forecast accuracy within ±8%'
            },
            {
              title: 'Cross-Format Fraud Risk Heat Map',
              description: 'Aggregated fraud risk scoring across POS skimming, void abuse, inventory shrinkage, and food safety violations — benchmarked by format and location.',
              metric: 'Organizational fraud risk score <3.0 (0-10 scale)'
            }
          ]
        }
      ]
    },

    realLifeScenarios: [
      {
        id: 'fb-director-pos-1',
        scenarioType: 'pos_fraud',
        operationType: 'fine_dining',
        title: 'Fine Dining Multi-Outlet P&L Consolidation with POS Skimming Detection',
        context: 'The F&B Director oversees 3 fine dining restaurants generating $2.8M/month combined. During monthly P&L consolidation, payment gateway settlements don\'t match POS recorded revenue at the flagship location.',
        workflow: [
          'Step 1: Director opens Consolidated P&L Dashboard — flagship location shows $980K recorded POS revenue but bank deposits total only $942K, a $38K variance.',
          'Step 2: Cross-references payment gateway settlement reports against POS transaction logs — identifies 142 transactions with card-present flags but no corresponding settlement batch.',
          'Step 3: Director drills into terminal-level data: Terminal #3 at the bar shows anomalous void patterns — 28 post-tender voids in one month vs. 4 average at other terminals.',
          'Step 4: Director freezes Terminal #3, initiates forensic POS audit, and implements dual-control settlement reconciliation across all fine dining outlets.'
        ],
        businessImpact: 'Recovers $38K in skimming losses, prevents an estimated $120K annual revenue leak, and closes a critical POS fraud vector across the fine dining portfolio.'
      },
      {
        id: 'fb-director-inv-1',
        scenarioType: 'inventory_supply_chain',
        operationType: 'qsr',
        title: 'QSR Franchise Supply Chain Compliance Audit & Royalty Verification',
        context: 'The F&B Director manages 12 QSR franchise locations. A routine franchise compliance audit reveals that 3 locations are sourcing ingredients from unauthorized suppliers to avoid royalty-linked purchasing rebates.',
        workflow: [
          'Step 1: Director opens Franchise Compliance Dashboard — 3 locations show ingredient cost variances 22% below the approved supplier price list.',
          'Step 2: Cross-references supplier invoice records against the approved vendor list — Location #7, #9, and #12 have 47 invoices from unapproved suppliers over 60 days.',
          'Step 3: Director calculates underreported royalties: $14,200 in unpaid royalties and $4,800 in missed marketing fund contributions across the 3 locations.',
          'Step 4: Director issues compliance notices, requires immediate supplier transition, and implements automated supplier invoice matching against the approved vendor database.'
        ],
        businessImpact: 'Recovers $19K in franchise royalties, enforces supply chain integrity across 12 locations, and prevents brand quality dilution from unauthorized ingredients.'
      },
      {
        id: 'fb-director-fsc-1',
        scenarioType: 'food_safety_compliance',
        operationType: 'hotel_banquet',
        title: 'Hotel Banquet Food Safety Incident & Revenue Impact Assessment',
        context: 'A 300-guest corporate banquet at the hotel F&B outlet results in 14 guests reporting food poisoning symptoms. The F&B Director must manage the incident, assess revenue impact, and ensure regulatory compliance.',
        workflow: [
          'Step 1: Director receives incident report — 14 of 300 guests reported norovirus symptoms within 24 hours of the banquet event.',
          'Step 2: Director opens the Banquet Incident Management module, quarantines all food samples from the event, and initiates HACCP traceback to identify the contamination source.',
          'Step 3: HACCP traceback identifies the contamination source: improperly stored oysters from a new supplier that bypassed cold-chain temperature verification.',
          'Step 4: Director files the regulatory incident report within 24 hours, cancels 3 upcoming banquet events using the same supplier ($135K revenue impact), and implements mandatory cold-chain verification for all banquet seafood.'
        ],
        businessImpact: 'Limits regulatory exposure to $25K in fines (vs. $200K+ if unmanaged), protects the hotel\'s 4-star banquet rating, and prevents an estimated $400K in future banquet cancellation losses.'
      }
    ],

    devilsTeamThreats: [
      {
        titanId: 'mitnick',
        titanName: 'Kevin Mitnick',
        vector: 'Executive P&L Dashboard Session Hijacking via Phished SSO',
        description: 'Attacker sends a targeted spear-phishing email impersonating the franchise compliance team, tricking the F&B Director into entering SSO credentials on a fake login page, gaining access to the consolidated P&L dashboard and franchise royalty data.',
        defense: 'Enforce hardware-key MFA (WebAuthn/FIDO2) for all executive dashboard access, with device fingerprint binding and SSO session timeout after 15 minutes of inactivity.'
      },
      {
        titanId: 'geohot',
        titanName: 'George Hotz (Geohot)',
        vector: 'Concurrent Banquet Allocation Race on Shared Venue Calendar',
        description: 'Two banquet coordinators simultaneously book the same venue slot for different events, creating a double-booking race condition that corrupts the revenue allocation ledger.',
        defense: 'Distributed mutex lock on venue calendar slots with atomic compare-and-swap — no two bookings can commit the same slot without serialized coordination.'
      },
      {
        titanId: 'miller',
        titanName: 'Charlie Miller',
        vector: 'Franchise Compliance Score Fuzzing via Manipulated Audit Inputs',
        description: 'A franchisee injects manipulated compliance audit data (e.g. negative violation counts, oversized supplier approval ratings) to artificially inflate their compliance score.',
        defense: 'Strict Zod validation on all compliance inputs: violation counts must be non-negative integers, ratings bounded to 0-100, and scores are server-side computed from raw audit data.'
      },
      {
        titanId: 'jack',
        titanName: 'Barnaby Jack',
        vector: 'Offline Franchise Royalty Omission via Sync Queue Tampering',
        description: 'A franchise location exploits offline mode to record high-value cash sales, then selectively drops the offline transaction journal before cloud sync, underreporting royalty-bearing revenue.',
        defense: 'Cryptographic hash chain (Merkle-style receipt log) on all offline transactions — missing sequence numbers immediately flag journal tampering on sync reconciliation.'
      },
      {
        titanId: 'kamkar',
        titanName: 'Samy Kamkar',
        vector: 'Franchise Financial Data Exposure in Cached Executive Views',
        description: 'Consolidated P&L reports containing franchise royalty data, supplier pricing, and outlet profit margins cached in unencrypted browser IndexedDB on the director\'s device.',
        defense: 'Zero-persistence for executive financial reports — all data delivered via ephemeral encrypted streams with automatic purge on session end, no client-side caching.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // ROLE 2: RESTAURANT MANAGER
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'restaurant_manager',
    title: 'Restaurant Manager',
    subtitle: 'Day-to-Day Floor Operations & Service Execution',
    badge: 'Operations',
    color: 'blue',
    iconName: 'UserCheck',
    operationalScope: 'Manages daily floor operations across all F&B formats — oversees service quality, approves voids and comps, manages shift scheduling, handles customer complaints, and ensures food safety protocols are followed during service hours.',

    featureBlueprint: {
      overview: 'The Restaurant Manager requires real-time floor management tools with void authorization controls, service recovery workflows, and integrated food safety monitoring to maintain operational excellence across fine dining, QSR, and hotel F&B outlets.',
      categories: [
        {
          name: '1. Service Operations & Void Control',
          features: [
            {
              title: 'Smart Void & Comp Authorization Engine',
              description: 'Context-aware void approval requiring manager PIN + reason code + photo evidence for post-tender voids, with automatic pattern analysis for fraud detection.',
              metric: 'Post-tender void rate <2% of total transactions'
            },
            {
              title: 'Real-Time Service Recovery Tracker',
              description: 'Tracks customer complaints, comp meals, and service recovery actions with automatic escalation for repeat issues and trend analysis by server.',
              metric: 'Service recovery resolution within 5 minutes'
            }
          ]
        },
        {
          name: '2. Shift Management & Food Safety Monitoring',
          features: [
            {
              title: 'Dynamic Shift Scheduling with Labor Cost Caps',
              description: 'AI-assisted shift scheduling based on forecasted covers, with real-time labor cost percentage tracking and automatic alerts when labor exceeds 30% of revenue.',
              metric: 'Labor cost maintained at 25-28% of revenue'
            },
            {
              title: 'Live Service-Time Food Safety Alerts',
              description: 'Real-time temperature monitoring of holding stations, buffet lines, and cold display cases with automatic alerts when food enters the temperature danger zone (5°C-60°C).',
              metric: 'Zero food safety violations during service hours'
            }
          ]
        }
      ]
    },

    realLifeScenarios: [
      {
        id: 'fb-rm-pos-1',
        scenarioType: 'pos_fraud',
        operationType: 'qsr',
        title: 'QSR Drive-Thru Cash Reconciliation & Void Fraud Investigation',
        context: 'A QSR drive-thru location processes 800+ transactions daily. The Restaurant Manager notices a recurring $15-$25 cash drawer shortage pattern on weekend shifts handled by the same cashier.',
        workflow: [
          'Step 1: Manager opens Shift Reconciliation Dashboard — weekend shifts show 6 consecutive shortages averaging $22, totaling $132 over 3 weekends.',
          'Step 2: Cross-references void log: the cashier has 14 "customer cancelled" voids on weekend shifts vs. 2 average on weekdays, all within 10 minutes of payment.',
          'Step 3: Manager reviews drive-thru camera footage for 3 void timestamps — confirms customer received food and drove away before the void was processed.',
          'Step 4: Manager implements mandatory post-tender void freeze (requires manager approval with 2-minute delay), reviews footage for all future voids, and files an internal investigation report.'
        ],
        businessImpact: 'Stops an estimated $200/month cash theft, identifies a void fraud pattern across 3 weekends, and implements preventive dual-control void authorization.'
      },
      {
        id: 'fb-rm-inv-1',
        scenarioType: 'inventory_supply_chain',
        operationType: 'fine_dining',
        title: 'Fine Dining Service Recovery with Inventory Shrinkage Investigation',
        context: 'At a fine dining restaurant, the Restaurant Manager notices that premium wine inventory is depleting 15% faster than POS sales data suggests. A VIP guest complaint about wine quality triggers a deeper investigation.',
        workflow: [
          'Step 1: Manager opens Inventory Variance Report — 8 premium wine SKUs show negative variance totaling $3,400 over 30 days.',
          'Step 2: Cross-references with the VIP complaint: guest reported a 2018 Cabernet tasting "off" — manager checks the bottle log and finds it was opened but not sold through POS.',
          'Step 3: Manager reviews server station camera footage — identifies a sommelier pouring premium wine for personal consumption during service hours without ringing it through POS.',
          'Step 4: Manager implements mandatory wine bottle tracking with unique QR codes per bottle, requires POS ring-up before any bottle leaves the cellar, and initiates disciplinary action.'
        ],
        businessImpact: 'Recovers $3,400/month in wine shrinkage, prevents brand damage from compromised wine service, and closes a high-value inventory theft vector.'
      },
      {
        id: 'fb-rm-fsc-1',
        scenarioType: 'food_safety_compliance',
        operationType: 'hotel_banquet',
        title: 'Hotel Room Service HACCP Compliance During Peak Service',
        context: 'During a fully booked hotel weekend, the Restaurant Manager must ensure room service orders maintain HACCP temperature compliance while delivery times stretch to 25+ minutes due to volume.',
        workflow: [
          'Step 1: Manager opens the Live Food Safety Dashboard — 3 holding stations show temperatures in the danger zone (8°C and 55°C) during the 7 PM dinner rush.',
          'Step 2: Manager immediately discards 12 portions of held food worth $340, logs the disposal with reason code "TEMP_DANGER_ZONE", and notifies the kitchen supervisor.',
          'Step 3: Manager reviews room service delivery logs — 8 orders took >25 minutes, entering the HACCP 4-hour time/temperature abuse window.',
          'Step 4: Manager implements insulated delivery bags with thermal data loggers, reduces the room service menu to hot-hold stable items during peak hours, and files a HACCP deviation report.'
        ],
        businessImpact: 'Prevents an estimated 15-20 guest food poisoning incidents, avoids $50K+ in liability and reputational damage, and maintains the hotel\'s food safety certification.'
      }
    ],

    devilsTeamThreats: [
      {
        titanId: 'mitnick',
        titanName: 'Kevin Mitnick',
        vector: 'Manager PIN Shoulder-Surfing at POS Terminal',
        description: 'A cashier observes the Restaurant Manager entering their 4-digit override PIN during a busy service period and later uses it to approve fraudulent voids and comps without oversight.',
        defense: 'Dynamic TOTP on manager mobile device or NFC badge tap instead of static PINs — all override approvals require a time-based one-time code that expires in 30 seconds.'
      },
      {
        titanId: 'geohot',
        titanName: 'George Hotz (Geohot)',
        vector: 'Concurrent Void Approval Race on Shared Order Ticket',
        description: 'Two managers simultaneously approve a void on the same large banquet ticket from different terminals, causing a double-void that refunds the customer twice.',
        defense: 'Atomic distributed lock on ticket status with optimistic version checking — once a void is approved, the ticket is locked and no second approval can commit.'
      },
      {
        titanId: 'miller',
        titanName: 'Charlie Miller',
        vector: 'HACCP Temperature Threshold Fuzzing & Negative Temperature Injection',
        description: 'A kitchen staff member injects a negative temperature reading (-5°C) into the holding station monitor, suppressing the danger zone alert while food sits at 55°C.',
        defense: 'Strict Zod validation on all temperature readings: values must be within physical bounds (-40°C to 120°C), danger zone alerts cannot be suppressed, and all readings are cryptographically signed by the IoT sensor.'
      },
      {
        titanId: 'jack',
        titanName: 'Barnaby Jack',
        vector: 'Offline Room Service Order Manipulation During Hotel WiFi Outage',
        description: 'During a hotel WiFi outage, a staff member modifies room service order prices in the local offline database before sync, charging guests premium prices while logging standard prices.',
        defense: 'Cryptographic HMAC signature on all order line items at ring-in time — server rejects any offline orders where the HMAC doesn\'t match the original price data.'
      },
      {
        titanId: 'kamkar',
        titanName: 'Samy Kamkar',
        vector: 'Customer Payment Data Exposure in Room Service POS Cache',
        description: 'Room service POS terminals cache customer credit card numbers and room numbers in browser localStorage, accessible to any staff member using the terminal.',
        defense: 'PCI-DSS tokenized payment iframe — card data never touches the POS application memory, and room numbers are masked in all cached views (e.g. "Room ***12").'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // ROLE 3: PURCHASING MANAGER
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'purchasing_manager',
    title: 'Purchasing Manager',
    subtitle: 'Procurement, Supplier Vetting & Supply Chain Integrity',
    badge: 'Procurement',
    color: 'purple',
    iconName: 'Package',
    operationalScope: 'Manages all F&B procurement across formats — vets and approves suppliers, negotiates contracts, manages purchase orders, oversees cold-chain logistics, and ensures supply chain compliance with food safety and franchise standards.',

    featureBlueprint: {
      overview: 'The Purchasing Manager requires an integrated procurement platform with supplier vetting workflows, automated PO matching, cold-chain monitoring, and kickback detection to maintain supply chain integrity across all F&B operations.',
      categories: [
        {
          name: '1. Supplier Management & PO Control',
          features: [
            {
              title: 'Supplier Vetting & Approval Workflow',
              description: 'Multi-stage supplier onboarding with food safety certification verification, franchise compliance check, price benchmarking, and dual-approval workflow for new vendors.',
              metric: 'All suppliers vetted within 5 business days'
            },
            {
              title: 'Automated 3-Way PO Matching & Discrepancy Alerts',
              description: 'Automatic matching of Purchase Order, supplier delivery note, and received goods — with real-time discrepancy alerts for quantity, price, or quality variances.',
              metric: 'PO discrepancy rate <2%'
            }
          ]
        },
        {
          name: '2. Cold-Chain & Supply Chain Risk',
          features: [
            {
              title: 'IoT Cold-Chain Temperature Monitoring',
              description: 'Real-time temperature tracking from supplier dispatch to receiving dock, with automatic rejection alerts for cold-chain breaks and integration with HACCP logging.',
              metric: 'Zero cold-chain breaks undetected >15 minutes'
            },
            {
              title: 'Supplier Kickback Detection & Price Variance Analysis',
              description: 'Statistical analysis of supplier pricing vs. market benchmarks, with automatic flags for suspicious pricing patterns, single-source dependencies, and vendor concentration risk.',
              metric: 'Price variance >8% from market benchmark triggers audit'
            }
          ]
        }
      ]
    },

    realLifeScenarios: [
      {
        id: 'fb-pm-inv-1',
        scenarioType: 'inventory_supply_chain',
        operationType: 'fine_dining',
        title: 'Fine Dining Specialty Supplier Vetting & Kickback Investigation',
        context: 'The Purchasing Manager discovers that a new truffle supplier was approved without the standard food safety certification check. The supplier\'s prices are 35% above market rate, and the requesting chef received unexplained luxury gifts.',
        workflow: [
          'Step 1: Manager opens the Supplier Approval Audit Trail — supplier "TruffleCo" was approved via a single-signature workflow bypassing the required dual-approval and certification verification.',
          'Step 2: Price benchmarking shows TruffleCo charges $2,800/kg vs. market average of $2,050/kg — a 35% premium totaling $11,200 in overcharges over 4 months.',
          'Step 3: Manager cross-references with HR records — the executive chef who approved the supplier received 3 luxury hotel stays from TruffleCo during the approval period.',
          'Step 4: Manager suspends TruffleCo, initiates a kickback investigation, transitions to the backup supplier, and implements mandatory dual-approval with price benchmark verification for all specialty suppliers.'
        ],
        businessImpact: 'Recovers $11,200 in overcharges, exposes a supplier kickback scheme, and closes a procurement fraud vector that could have cost $33K+/year.'
      },
      {
        id: 'fb-pm-fsc-1',
        scenarioType: 'food_safety_compliance',
        operationType: 'qsr',
        title: 'QSR Centralized Commissary Cold-Chain Compliance Audit',
        context: 'The Purchasing Manager oversees a centralized commissary supplying 8 QSR locations. A routine cold-chain audit reveals temperature logs showing gaps during overnight transport to 3 locations.',
        workflow: [
          'Step 1: Manager opens the Cold-Chain Monitoring Dashboard — 3 transport routes show temperature excursions above 5°C for 45-90 minutes during overnight deliveries.',
          'Step 2: IoT data loggers confirm: Route B (dairy), Route D (meat), and Route F (prepared items) all breached cold-chain during a 2-week period.',
          'Step 3: Manager quarantines $8,400 worth of delivered product from the affected routes, initiates HACCP deviation reports, and notifies the 3 receiving locations.',
          'Step 4: Manager upgrades transport vehicles with active refrigeration monitoring, implements real-time temperature alerts during transit, and requires receiving temperature verification before product acceptance.'
        ],
        businessImpact: 'Prevents an estimated 40+ foodborne illness cases, avoids $75K in liability, and ensures cold-chain integrity across 8 QSR locations.'
      },
      {
        id: 'fb-pm-pos-1',
        scenarioType: 'pos_fraud',
        operationType: 'hotel_banquet',
        title: 'Hotel Banquet Bulk Purchasing PO Manipulation & Ghost Vendor Detection',
        context: 'The Purchasing Manager processes banquet procurement for a 500-guest wedding. Post-event audit reveals a $18K PO to a vendor that doesn\'t exist in the approved supplier database and has no physical delivery records.',
        workflow: [
          'Step 1: Manager opens the PO Audit Trail for the wedding event — PO #WB-4471 for $18K was issued to "Elite Banquet Supplies" with no receiving documentation.',
          'Step 2: Cross-references the supplier database — "Elite Banquet Supplies" is not in the approved vendor list and was added 2 days before the event with a single-signature approval.',
          'Step 3: Manager traces the PO approval to a banquet coordinator who is also listed as a co-owner of "Elite Banquet Supplies" in the corporate registry.',
          'Step 4: Manager freezes the $18K payment, initiates a ghost vendor investigation, implements mandatory vendor verification against the corporate registry, and requires dual-approval for all POs >$5K.'
        ],
        businessImpact: 'Prevents $18K in ghost vendor fraud, exposes a procurement collusion scheme, and implements preventive vendor verification controls for all banquet purchasing.'
      }
    ],

    devilsTeamThreats: [
      {
        titanId: 'mitnick',
        titanName: 'Kevin Mitnick',
        vector: 'Supplier Portal Credential Theft via Fake Vendor Onboarding Email',
        description: 'Attacker sends a convincing email impersonating a new supplier onboarding request, tricking the Purchasing Manager into entering procurement portal credentials on a fake page, gaining access to all supplier contracts and pricing data.',
        defense: 'All supplier communications go through the authenticated supplier portal — email-based onboarding links are quarantined and verified, with hardware-token MFA for procurement portal access.'
      },
      {
        titanId: 'geohot',
        titanName: 'George Hotz (Geohot)',
        vector: 'Concurrent PO Approval Race on Shared Budget Allocation',
        description: 'Two purchasers simultaneously approve POs against the same banquet budget allocation, exceeding the budget cap by $12K before either transaction commits the balance check.',
        defense: 'Distributed atomic lock on budget allocations — PO approvals are serialized against the budget pool with real-time balance verification before commit.'
      },
      {
        titanId: 'miller',
        titanName: 'Charlie Miller',
        vector: 'PO Quantity Fuzzing & Negative Price Injection',
        description: 'A malicious actor injects a negative unit price (-$15.00) on a PO line item, causing the total to be artificially reduced and enabling the purchaser to pocket the difference.',
        defense: 'Strict Zod validation on all PO line items: unit price must be positive, quantity must be a positive integer, and line total must equal quantity × unit price with no rounding drift.'
      },
      {
        titanId: 'jack',
        titanName: 'Barnaby Jack',
        vector: 'Cold-Chain Temperature Log Suppression During Transport',
        description: 'A transport driver exploits a cellular dead zone to suppress cold-chain temperature breach logs before they sync to the central monitoring system, hiding a 2-hour temperature excursion.',
        defense: 'IoT data loggers with local cryptographic logging — temperature readings are stored locally with timestamps and hash-chained, syncing on reconnection with gap detection alerts for any missing data.'
      },
      {
        titanId: 'kamkar',
        titanName: 'Samy Kamkar',
        vector: 'Supplier Contract & Pricing Data Exposure in Procurement Portal Cache',
        description: 'Procurement portal caches supplier contract terms, wholesale pricing, and rebate structures in browser localStorage, accessible to any staff member with portal access.',
        defense: 'Role-based field masking on supplier pricing data — wholesale prices visible only to Purchasing Managers and F&B Directors, with all cached data encrypted and session-bound.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // ROLE 4: QUALITY ASSURANCE MANAGER
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'qa_manager',
    title: 'Quality Assurance Manager',
    subtitle: 'Food Safety, HACCP Compliance & Allergen Control',
    badge: 'Quality',
    color: 'amber',
    iconName: 'ShieldCheck',
    operationalScope: 'Ensures food safety compliance across all F&B formats — manages HACCP plans, conducts internal audits, oversees allergen labeling, monitors temperature controls, and handles health inspection readiness.',

    featureBlueprint: {
      overview: 'The QA Manager requires a comprehensive food safety management platform with real-time HACCP monitoring, allergen tracking, audit evidence collection, and inspection readiness workflows to maintain compliance across fine dining, QSR, and hotel F&B operations.',
      categories: [
        {
          name: '1. HACCP & Temperature Control',
          features: [
            {
              title: 'Real-Time HACCP Critical Control Point Monitoring',
              description: 'Continuous monitoring of all CCPs — cooking temperatures, cold holding, hot holding, cooling times — with automatic deviation alerts and corrective action workflows.',
              metric: 'Zero HACCP critical deviations unaddressed >30 minutes'
            },
            {
              title: 'Automated Temperature Log & Calibration Tracking',
              description: 'Digital temperature logging with probe calibration scheduling, automated data integrity checks, and tamper-evident audit trails for health inspection evidence.',
              metric: '100% temperature logs with cryptographic integrity'
            }
          ]
        },
        {
          name: '2. Allergen Management & Inspection Readiness',
          features: [
            {
              title: 'Menu Allergen Matrix & Cross-Contamination Tracking',
              description: 'Dynamic allergen database linked to recipe BOMs, with automatic allergen flag updates when ingredients change and cross-contamination risk assessment per dish.',
              metric: 'Zero allergen mislabeling incidents'
            },
            {
              title: 'Health Inspection Readiness Dashboard',
              description: 'One-click compilation of 90-day temperature logs, supplier receiving records, staff certification status, and corrective action history for unannounced health inspections.',
              metric: 'Inspection-ready evidence package in <5 minutes'
            }
          ]
        }
      ]
    },

    realLifeScenarios: [
      {
        id: 'fb-qa-fsc-1',
        scenarioType: 'food_safety_compliance',
        operationType: 'fine_dining',
        title: 'Fine Dining Allergen Management & Cross-Contamination Incident',
        context: 'A fine dining guest with a severe shellfish allergy experiences anaphylaxis after eating a pasta dish that was prepared using the same cutting board as shrimp. The QA Manager must investigate and prevent recurrence.',
        workflow: [
          'Step 1: QA Manager receives the allergen incident report — guest was assured the pasta was shellfish-free but developed anaphylaxis requiring EMT response.',
          'Step 2: Manager opens the Allergen Matrix and traces the dish: the pasta BOM shows no shellfish ingredients, but the preparation log shows the cutting board was used for shrimp 10 minutes prior.',
          'Step 3: Manager identifies the root cause: the kitchen used a shared cutting board without the required allergen-sanitization protocol, and the allergen flag was not displayed on the POS for the pasta dish.',
          'Step 4: Manager implements color-coded allergen-sanitized equipment stations, mandates POS allergen flag display for all dishes, and adds mandatory allergen training to all kitchen staff certifications.'
        ],
        businessImpact: 'Prevents future anaphylaxis incidents, avoids an estimated $500K+ in liability, and maintains the restaurant\'s health inspection rating.'
      },
      {
        id: 'fb-qa-pos-1',
        scenarioType: 'pos_fraud',
        operationType: 'qsr',
        title: 'QSR Temperature Control System Manipulation & Inspection Evidence Falsification',
        context: 'A QSR location is preparing for a health inspection. The QA Manager discovers that the location\'s temperature logs for the past 30 days show suspiciously perfect readings — no deviations ever recorded.',
        workflow: [
          'Step 1: Manager opens the Temperature Log Integrity Dashboard — Location #4 shows 30 consecutive days of readings exactly at 4.0°C with zero variance, statistically impossible.',
          'Step 2: Cross-references with IoT sensor calibration records — the sensor was last calibrated 8 months ago (required every 3 months), and the data shows no natural fluctuation pattern.',
          'Step 3: Manager conducts a surprise site visit and discovers the location manager has been manually overriding temperature readings in the POS system, entering 4.0°C for all checks.',
          'Step 4: Manager invalidates the 30-day temperature log, requires immediate recalibration, implements IoT-automated temperature logging that cannot be manually overridden, and files a compliance violation report.'
        ],
        businessImpact: 'Prevents health inspection fraud, identifies a systematic temperature log falsification scheme, and ensures regulatory compliance across 12 QSR locations.'
      },
      {
        id: 'fb-qa-inv-1',
        scenarioType: 'inventory_supply_chain',
        operationType: 'hotel_banquet',
        title: 'Hotel Banquet HACCP Compliance & Expired Stock Relabeling Detection',
        context: 'During a pre-banquet quality check for a 200-guest corporate event, the QA Manager discovers that 15 kg of premium beef in the walk-in cooler has been relabeled with a new expiry date 5 days after the original.',
        workflow: [
          'Step 1: Manager conducts pre-banquet HACCP verification and scans beef batch labels — the QR code trace shows original expiry was 5 days ago, but the physical label shows a new date.',
          'Step 2: Manager opens the Batch Tracking System and traces the beef: received 12 days ago, original expiry 7 days ago, but the label was reprinted with a 5-day extension.',
          'Step 3: Manager quarantines the 15 kg of beef ($1,200 value), traces the label reprint to a kitchen supervisor, and discovers the supervisor relabeled expired stock to avoid waste write-off.',
          'Step 4: Manager discards the expired beef, files a HACCP critical deviation report, implements tamper-evident batch labels with QR codes that cannot be reprinted, and requires QA approval for all label modifications.'
        ],
        businessImpact: 'Prevents serving expired meat to 200 guests, avoids an estimated $300K in liability and reputational damage, and closes an expired stock relabeling fraud vector.'
      }
    ],

    devilsTeamThreats: [
      {
        titanId: 'mitnick',
        titanName: 'Kevin Mitnick',
        vector: 'HACCP System Credential Theft via Fake Health Inspector Visit',
        description: 'An attacker impersonates a health inspector and requests access to the HACCP system to "verify compliance," stealing the QA Manager\'s credentials and gaining access to all food safety records.',
        defense: 'All health inspector visits must be verified through the regulatory authority\'s official portal before system access is granted — no on-site credential sharing, with hardware-token MFA for HACCP system access.'
      },
      {
        titanId: 'geohot',
        titanName: 'George Hotz (Geohot)',
        vector: 'Concurrent Temperature Log Entry Race on Shared CCP Station',
        description: 'Two staff members simultaneously log temperature readings for the same critical control point from different tablets, creating conflicting records that confuse the HACCP audit trail.',
        defense: 'Distributed lock on CCP station IDs — once a temperature reading is initiated for a station, it is locked to that device until submitted or timed out, with automatic queueing.'
      },
      {
        titanId: 'miller',
        titanName: 'Charlie Miller',
        vector: 'HACCP Temperature Reading Fuzzing & Out-of-Range Suppression',
        description: 'A staff member enters a temperature reading of "999°C" or "0K" into the HACCP log, crashing the compliance calculation and suppressing deviation alerts for the station.',
        defense: 'Strict Zod validation on all temperature readings: values must be within physical bounds (-40°C to 120°C), out-of-range readings automatically trigger deviation alerts, and all readings are IoT-sensor signed.'
      },
      {
        titanId: 'jack',
        titanName: 'Barnaby Jack',
        vector: 'Offline HACCP Log Tampering During Network Outage',
        description: 'A location exploits a network outage to modify or delete HACCP temperature logs before they sync to the central compliance system, hiding a critical temperature deviation.',
        defense: 'Local cryptographic hash chain on all HACCP log entries — any modification or deletion during a network outage is detected on sync reconciliation and escalated to the QA Manager.'
      },
      {
        titanId: 'kamkar',
        titanName: 'Samy Kamkar',
        vector: 'Allergen Matrix Data Exposure in Unencrypted POS Display',
        description: 'The allergen matrix containing proprietary recipe ingredient data and cross-contamination risk assessments is cached in the POS system in plaintext, accessible to any staff member.',
        defense: 'Role-based access control on allergen data — full allergen matrix visible only to QA Managers and chefs, with POS displaying only customer-facing allergen flags (contains: shellfish, nuts, etc.).'
      }
    ]
  }
];

// ═══════════════════════════════════════════════════════════════
// CROSS-ROLE F&B MANAGEMENT COLLISION SCENARIOS
// ═══════════════════════════════════════════════════════════════

export const FB_CROSS_ROLE_SCENARIOS = [
  {
    id: 'fb-crossrole-1',
    title: 'Purchasing Manager + QA Manager: Substandard Supplier Approval Collusion',
    participatingRoles: ['purchasing_manager', 'qa_manager'],
    context: 'A Purchasing Manager and QA Manager collude to approve a substandard seafood supplier that fails HACCP cold-chain certification, splitting the savings from the lower-priced supplier as kickbacks while exposing guests to food safety risk.',
    workflow: [
      'Step 1: Purchasing Manager receives a quote from "OceanBudget Seafood" at 40% below market rate but without HACCP cold-chain certification.',
      'Step 2: QA Manager bypasses the mandatory food safety certification check and approves the supplier with a single-signature override.',
      'Step 3: Purchasing Manager processes POs at the discounted rate, and the two split the $6,800 monthly savings as kickbacks.',
      'Step 4: After a banquet food poisoning incident, the HACCP traceback reveals the uncertified supplier, exposing the collusion.'
    ],
    crossRoleThreats: [
      {
        titanId: 'mitnick',
        vector: 'Dual-Role Single-Signature Bypass of Supplier Vetting',
        description: 'The QA Manager uses their credential to bypass the food safety certification requirement without a second approver, enabling the substandard supplier to enter the supply chain.',
        defense: 'Mandatory dual-authorization for all supplier approvals — the Purchasing Manager and QA Manager cannot be the same approver, and food safety certification is a hard gate that cannot be overridden.'
      },
      {
        titanId: 'kamkar',
        vector: 'Supplier Pricing Data Masking to Hide Kickback Pattern',
        description: 'The Purchasing Manager masks the true market price comparison in the procurement portal, making the kickback-inflated "savings" appear legitimate in audit reports.',
        defense: 'Automated price benchmarking against independent market data sources — all supplier prices are compared against external benchmarks, and variances >8% trigger automatic audit flags regardless of internal reporting.'
      }
    ],
    businessImpact: 'Collusive supplier approval can expose guests to foodborne illness (liability $300K+ per incident) while draining $6,800+/month in kickback-driven overcharges.'
  },
  {
    id: 'fb-crossrole-2',
    title: 'Restaurant Manager + F&B Director: Cash Variance Cover-Up Across Formats',
    participatingRoles: ['restaurant_manager', 'fb_director'],
    context: 'A Restaurant Manager systematically skims $50-$100 per shift from QSR drive-thru cash drawers. When the F&B Director investigates the recurring variance, the Manager manipulates the reconciliation reports to show the shortages as "supplier short-deliveries," and the Director accepts the explanation to avoid reporting a fraud incident to ownership.',
    workflow: [
      'Step 1: Restaurant Manager skims $75 from the QSR drive-thru cash drawer during a Friday night shift.',
      'Step 2: F&B Director notices a recurring $60-$100 weekly variance pattern at the QSR location and requests an explanation.',
      'Step 3: Restaurant Manager attributes the variance to supplier short-deliveries and generates false receiving discrepancy reports. The Director accepts the explanation without cross-referencing PO matching records.',
      'Step 4: An external audit later cross-references the reconciliation reports with inventory PO matching data and discovers no corresponding supplier discrepancies exist, exposing both the skimming and the cover-up.'
    ],
    crossRoleThreats: [
      {
        titanId: 'mitnick',
        vector: 'Reconciliation Report Falsification via Director Access Level',
        description: 'The F&B Director has write access to reconciliation reports, enabling them to approve falsified supplier discrepancy explanations without independent verification.',
        defense: 'Reconciliation reports must be cryptographically signed and immutable once submitted — supplier discrepancies must automatically cross-reference PO matching records, and any mismatch triggers an independent audit flag.'
      },
      {
        titanId: 'jack',
        vector: 'Cash Drawer Float Manipulation Across Shift Boundaries',
        description: 'The Restaurant Manager exploits the gap between opening and closing float counts across shifts, skimming small amounts that fall within the $2 individual variance tolerance but accumulate to $300+/week.',
        defense: 'Cumulative variance tracking — individual variances within tolerance but recurring patterns trigger escalation alerts when cumulative drift exceeds $20/week, regardless of individual shift tolerance.'
      }
    ],
    businessImpact: 'Collusive cash skimming and cover-up can drain $2,400-$4,000/month per location while corrupting the financial reporting integrity of the entire F&B portfolio.'
  },
  {
    id: 'fb-crossrole-3',
    title: 'Purchasing Manager + Restaurant Manager: Expired Stock Relabeling & Waste Write-Off Fraud',
    participatingRoles: ['purchasing_manager', 'restaurant_manager'],
    context: 'A Purchasing Manager and Restaurant Manager collude to relabel expired food stock as fresh, avoiding waste write-off costs. The Purchasing Manager reprints batch labels with extended expiry dates, and the Restaurant Manager serves the expired product to guests, splitting the "saved" write-off costs as performance bonuses.',
    workflow: [
      'Step 1: 20 kg of premium beef expires in the walk-in cooler — a $1,600 waste write-off that would negatively impact both managers\' performance metrics.',
      'Step 2: Purchasing Manager reprints the batch labels with a 7-day expiry extension using their access to the inventory label system.',
      'Step 3: Restaurant Manager serves the expired beef to guests, and both managers report the "waste prevention" as a cost-saving achievement.',
      'Step 4: A guest food poisoning complaint triggers a HACCP traceback, which reveals the batch label was reprinted 5 days after the original expiry date.'
    ],
    crossRoleThreats: [
      {
        titanId: 'jack',
        vector: 'Batch Label Reprinting Without Tamper-Evident Controls',
        description: 'The Purchasing Manager can reprint batch labels with new expiry dates without any tamper-evident logging, making the relabeling invisible to the QA Manager\'s HACCP audit.',
        defense: 'Tamper-evident QR-coded batch labels — once a label is printed, the QR code is cryptographically signed and cannot be reprinted. Any label modification requires QA Manager approval and creates an immutable audit log entry.'
      },
      {
        titanId: 'miller',
        vector: 'Expiry Date Fuzzing & Future-Date Injection',
        description: 'The Purchasing Manager injects a future expiry date (e.g. year 2099) into the batch label system, making the expired stock appear perpetually fresh in the inventory system.',
        defense: 'Strict Zod validation on all expiry dates: maximum shelf life per product category is enforced, dates must be within approved ranges, and any modification requires dual-authorization with QA Manager sign-off.'
      }
    ],
    businessImpact: 'Expired stock relabeling fraud can serve unsafe food to hundreds of guests (liability $300K+ per incident) while falsely inflating both managers\' performance metrics by $1,600+/month in avoided write-offs.'
  }
];

// Severity ratings for F&B management role + titan threat combinations
const FB_THREAT_SEVERITY_MAP = {
  'fb_director_mitnick': 'critical',
  'fb_director_geohot': 'high',
  'fb_director_miller': 'critical',
  'fb_director_jack': 'critical',
  'fb_director_kamkar': 'critical',
  'restaurant_manager_mitnick': 'high',
  'restaurant_manager_geohot': 'high',
  'restaurant_manager_miller': 'critical',
  'restaurant_manager_jack': 'critical',
  'restaurant_manager_kamkar': 'high',
  'purchasing_manager_mitnick': 'critical',
  'purchasing_manager_geohot': 'high',
  'purchasing_manager_miller': 'critical',
  'purchasing_manager_jack': 'critical',
  'purchasing_manager_kamkar': 'high',
  'qa_manager_mitnick': 'critical',
  'qa_manager_geohot': 'medium',
  'qa_manager_miller': 'critical',
  'qa_manager_jack': 'critical',
  'qa_manager_kamkar': 'high',
};

export function getFBThreatSeverity(roleId, titanId) {
  return FB_THREAT_SEVERITY_MAP[`${roleId}_${titanId}`] || 'medium';
}

export function getFBRoleById(roleId) {
  return FB_MANAGEMENT_ROLES.find(r => r.id === roleId) || FB_MANAGEMENT_ROLES[0];
}

export function getAllFBManagementRoles() {
  return FB_MANAGEMENT_ROLES;
}

export function getFBCrossRoleScenarios() {
  return FB_CROSS_ROLE_SCENARIOS;
}
