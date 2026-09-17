/**
 * Devil's Team Role Scenarios & Enterprise Threat Modeling
 * Defines the real-life operational scenarios, required feature blueprints, and 5-Titan adversarial attack vectors
 * across the 6 key enterprise establishment roles:
 * 1. Owner of the Establishments (Costs, Income & Taxes)
 * 2. Team Manager / Branch Supervisor
 * 3. Cashier
 * 4. Inventory Specialist
 * 5. Cost Analyst
 * 6. Marketing Strategist
 */

export const ENTERPRISE_ROLES = [
  {
    id: 'owner',
    title: 'Owner of the Establishments',
    subtitle: 'Franchise & Multi-Unit Executive Leadership',
    badge: 'Executive',
    color: 'emerald',
    iconName: 'Crown',
    operationalScope: 'Responsible for overall business solvency, capital allocation, multi-branch profitability, tax compliance, and financial audit defense.',
    
    // Answering the user's specific prompt: "what kind of features does it needs to be able to see its costs, income and taxes."
    featureBlueprint: {
      overview: 'To maintain full operational and fiscal governance, an establishment owner requires an Executive Financial Command Center unifying real-time Cost accounting, Revenue attribution, and automated Tax compliance.',
      categories: [
        {
          name: '1. Cost Intelligence & Expense Control',
          features: [
            {
              title: 'Live Real-Time COGS (Cost of Goods Sold)',
              description: 'Dynamic COGS calculated directly from POS ingredient consumption, automated recipe batch yields, and supplier purchase order unit costs.',
              metric: 'Target: 28% - 32% food/beverage cost ratio'
            },
            {
              title: 'Controllable vs Uncontrollable OPEX Tracking',
              description: 'Categorized breakdown of Fixed Costs (rent, insurance, software licenses, equipment amortization) vs Variable Costs (direct labor hourly wages, utilities, packaging, delivery commission fees).',
              metric: 'Daily breakeven revenue threshold tracking'
            },
            {
              title: 'Supplier Price Variance (PPV) Alerts',
              description: 'Automated early-warning triggers whenever supplier invoice costs for core raw ingredients rise >5% compared to contract baseline.',
              metric: 'Threshold-based vendor push notifications'
            },
            {
              title: 'Waste & Shrinkage Loss Audit',
              description: 'Aggregated financial valuation of logged spoilage, damaged goods, employee meals, and unverified inventory shrinkage by branch location.',
              metric: 'Target: <1.5% of gross inventory'
            }
          ]
        },
        {
          name: '2. Income & Revenue Intelligence',
          features: [
            {
              title: 'Consolidated Multi-Branch P&L Dashboard',
              description: 'Real-time Net Sales, Gross Sales, Gross Profit, and Net EBITDA margin with branch-by-branch side-by-side performance comparison.',
              metric: 'Real-time stream across all terminals'
            },
            {
              title: 'Payment Channel & Gateway Reconciliation',
              description: 'Unified tender reconciliation: Physical cash in drawers vs Credit/Debit card merchant settlements vs E-Wallets (GCash, Maya, Apple Pay) vs 3rd-party delivery aggregators (Grab, FoodPanda), factoring out processing fees.',
              metric: 'Discrepancy alert on >$10 variance'
            },
            {
              title: 'Velocity & Average Order Value (AOV)',
              description: 'Peak sales velocity per hour, revenue per available seat/terminal, customer table turnover rates, and daypart revenue distribution.',
              metric: 'Hourly revenue pacing vs 30-day average'
            },
            {
              title: 'Cash Drawer Float & Safe Drop Audits',
              description: 'Executive visibility into branch opening float counts, mid-day supervisor safe drops, and blind end-of-day register counts before bank deposit.',
              metric: 'Anti-theft cash-on-hand ceiling limits'
            }
          ]
        },
        {
          name: '3. Taxes & Regulatory Compliance Engine',
          features: [
            {
              title: 'Automated VAT / Sales Tax Liability Engine',
              description: 'Real-time tracking of Output VAT (collected on taxable consumer sales) offset against Input VAT (claimed on valid supplier tax invoices), displaying net VAT payable.',
              metric: 'Real-time accrued tax liability reserve'
            },
            {
              title: 'Withholding Tax & Local Business Tax (LBT) Accrual',
              description: 'Automated computation of Expanded Withholding Tax (EWT) on vendor payments and local municipality franchise tax schedules.',
              metric: 'Jurisdiction-specific tax schedule matrix'
            },
            {
              title: 'Official E-Invoicing & Fiscal Tamper-Proof Audit Log',
              description: 'Cryptographically hashed sequential transaction logs complying with statutory fiscal printer requirements (e.g. BIR CAS / IRS / EU fiscal rules), preventing backdated receipt tampering.',
              metric: 'Immutable SHA-256 hash chain per receipt'
            },
            {
              title: 'One-Click Statutory Tax Filing Exports',
              description: 'Pre-formatted export files for monthly/quarterly tax returns (e.g. BIR Forms 2550M/2550Q, 1702, VAT summary lists) ready for corporate accountant audit.',
              metric: 'Audit-ready reconciliation balance sheet'
            }
          ]
        }
      ]
    },

    realLifeScenarios: [
      {
        id: 'scenario-owner-1',
        title: 'Multi-Branch End-of-Month Tax & Net Profit Reconciliation',
        context: 'The establishment operates 5 restaurant branches. At the end of the month, the owner must file Value-Added Tax and corporate returns while reviewing net profits after accounting for a sudden 15% spike in dairy supply costs.',
        workflow: [
          'Step 1: Owner opens Consolidated Financial Dashboard to review gross revenue ($248,500) vs COGS ($78,200) and OPEX ($94,100).',
          'Step 2: Inspects Tax Engine: Total Output VAT collected ($29,820) minus eligible Input VAT from supplier invoices ($9,384) = Net Tax Payable ($20,436).',
          'Step 3: Supplier Price Variance alert flags that Branch #3 suffered an undetected 18% cost spike on imported butter, eroding menu item margins by 6.2%.',
          'Step 4: Owner drills down to Branch #3 purchase orders, discovers unapproved supplier swap, and re-allocates central commissary procurement.'
        ],
        businessImpact: 'Prevents $12,000 in monthly margin erosion and avoids statutory tax penalties from inaccurate manual VAT filing.'
      },
      {
        id: 'scenario-owner-2',
        title: 'Franchise Cash Skimming vs Bank Settlement Variance Detection',
        context: 'Physical cash collected at 3 drive-thru branches does not match bank deposits reported at the end of the week.',
        workflow: [
          'Step 1: Owner triggers Automated Payment Channel Reconciliation.',
          'Step 2: System detects Branch #2 recorded $42,100 in cash sales, but safe drop logs record only $38,900 deposited, flagging a $3,200 cash discrepancy.',
          'Step 3: Owner reviews timestamped supervisor blind cash counts and cross-references cashier shift handovers.',
          'Step 4: Pinpoints unauthorized mid-shift manual cash drawer open events lacking supervisor manager PIN.'
        ],
        businessImpact: 'Recovers missing capital, isolates internal shrink, and enforces mandatory dual-signature register reconciliation.'
      }
    ],

    devilsTeamThreats: [
      {
        titanId: 'mitnick',
        titanName: 'Kevin Mitnick',
        vector: 'Executive Dashboard Session Hijacking & Credential Impersonation',
        description: 'Attacker leverages weak session token storage in browser to impersonate the owner and access privileged tax identification numbers (TIN) and corporate bank accounts.',
        defense: 'Enforce Step-Up Multi-Factor Authentication (MFA) with WebAuthn/Hardware keys for any view containing tax filings, net profit margins, or banking details.'
      },
      {
        titanId: 'geohot',
        titanName: 'George Hotz (Geohot)',
        vector: 'Multi-Branch Asynchronous Revenue Consolidation Race Condition',
        description: 'Simultaneous end-of-day register closing across 20 terminals creates race conditions in aggregate ledger summation, resulting in double-counted revenue deposits or floating-point rounding drift.',
        defense: 'Implement distributed atomic ledger transactions with idempotency keys and decimal/fixed-point integer cents arithmetic.'
      },
      {
        titanId: 'miller',
        titanName: 'Charlie Miller',
        vector: 'Tax Rate Boundary Fuzzing & Negative Tax Injection',
        description: 'Malicious actor injects a negative custom tax rate (-12%) into branch tax configuration, causing the POS to issue fraudulent customer refund credits instead of collecting tax.',
        defense: 'Strict Zod bounds validation: tax rates must be strictly constrained (0.00 <= rate <= 35.00%) with immutable administrative signature.'
      },
      {
        titanId: 'jack',
        titanName: 'Barnaby Jack',
        vector: 'Offline Queue Desynchronization & Silent Tax Omission',
        description: 'Exploiting offline mode to record high-value cash transactions, then selectively dropping or truncating the offline tax transaction journal prior to cloud synchronization.',
        defense: 'Continuous cryptographic hash chain (Merkle-style receipt log) where missing sequence numbers immediately flag offline ledger tampering.'
      },
      {
        titanId: 'kamkar',
        titanName: 'Samy Kamkar',
        vector: 'Executive Financial Data Exposure in Unencrypted IndexedDB',
        description: 'Caching confidential owner net profit draw records, supplier margin contracts, and tax audit sheets in unencrypted browser client storage accessible to any third-party script.',
        defense: 'Zero-persistence of sensitive corporate financial statements on client terminals; all reports delivered via ephemeral, encrypted memory streams.'
      }
    ]
  },

  {
    id: 'branch_manager',
    title: 'Team Manager / Branch Supervisor',
    subtitle: 'Shift Operations, Authorizations & Staff Oversight',
    badge: 'Operations',
    color: 'blue',
    iconName: 'UserCheck',
    operationalScope: 'Supervises daily floor operations, approves voids and high-value refunds, manages shift cash float reconciliation, and oversees employee attendance and meal discounts.',
    
    featureBlueprint: {
      overview: 'Requires shift-level control tools to prevent cashier collusion, ensure register balance integrity, and streamline floor operations without slowing customer service.',
      categories: [
        {
          name: '1. Shift Governance & Cash Float Control',
          features: [
            {
              title: 'Opening / Closing Float Audit with Blind Counts',
              description: 'Cashiers must perform blind count (entering counted denominations without seeing the expected system total) before the manager signs off.',
              metric: 'Auto-flags variances over $2.00'
            },
            {
              title: 'Safe Drop Limits & Drawer Overfill Alerts',
              description: 'Alerts manager to execute a safe drop whenever cash in drawer exceeds $500, minimizing robbery risk.',
              metric: 'Real-time drawer cash ceiling monitoring'
            }
          ]
        },
        {
          name: '2. Supervisory Overrides & Fraud Prevention',
          features: [
            {
              title: 'Cryptographic Manager Override PIN / NFC Badge',
              description: 'Single-use dynamic supervisor approval codes or NFC badge taps required for item voids, returns, manual discounts >10%, and cash drawer pop.',
              metric: 'Zero static shared PINs'
            },
            {
              title: 'Void & Return Audit Trail with Reason Codes',
              description: 'Mandatory reason code selection (e.g. wrong item, customer cancelled, cold food) with mandatory photo upload for item returns.',
              metric: 'Historical void velocity per cashier'
            }
          ]
        }
      ]
    },

    realLifeScenarios: [
      {
        id: 'scenario-mgr-1',
        title: 'Friday Night Rush Void Fraud Attempt',
        context: 'During peak 8:00 PM rush, a cashier attempts to pocket $85 cash by voiding an already-served table order after the customer leaves.',
        workflow: [
          'Step 1: Cashier requests post-tender void of Order #1042.',
          'Step 2: System blocks terminal and demands Branch Manager Authorization.',
          'Step 3: Manager inspects kitchen bump bar timestamp showing order was delivered 25 minutes ago.',
          'Step 4: Manager rejects void, flags suspicious pattern, and logs incident in supervisor journal.'
        ],
        businessImpact: 'Prevents internal cash theft and protects inventory decrement accuracy.'
      }
    ],

    devilsTeamThreats: [
      {
        titanId: 'mitnick',
        titanName: 'Kevin Mitnick',
        vector: 'Manager PIN Shoulder-Surfing & Social Engineering Bypass',
        description: 'Cashier observes manager typing standard 4-digit PIN (1234 or branch postal code) and later uses it to approve fraudulent discounts and drawer pops.',
        defense: 'Implement time-based dynamic OTP (TOTP) on manager mobile device or NFC card badge tap instead of static PINs.'
      },
      {
        titanId: 'geohot',
        titanName: 'George Hotz (Geohot)',
        vector: 'Simultaneous Multi-Terminal Void Request Race',
        description: 'Submitting simultaneous void requests for the same ticket across two synced terminals before the row-level lock is committed in Dexie.',
        defense: 'Atomic distributed mutex locking on ticket status with optimistic version check.'
      },
      {
        titanId: 'miller',
        titanName: 'Charlie Miller',
        vector: '105% Manager Discount Override Fuzzing',
        description: 'Entering arbitrary discount percentages into manager override modal causing negative line item balances and illicit cash payouts.',
        defense: 'Hard upper bounds cap (max 50% discount for managers, >50% requires owner approval).'
      },
      {
        titanId: 'jack',
        titanName: 'Barnaby Jack',
        vector: 'Offline Replay of Manager Authorization Token',
        description: 'Capturing a valid manager authorization payload during offline mode and replaying it against multiple transactions once connectivity restores.',
        defense: 'Cryptographic transaction-specific nonces attached to manager approvals preventing token reuse.'
      },
      {
        titanId: 'kamkar',
        titanName: 'Samy Kamkar',
        vector: 'Supervisor Session Retained on Shared Kiosk POS',
        description: 'Manager logs into POS for an override, but session does not auto-downgrade, leaving elevated privileges active for the next cashier.',
        defense: 'Ephemeral single-action privilege elevation: session automatically reverts to Cashier role within 30 seconds of override completion.'
      }
    ]
  },

  {
    id: 'cashier',
    title: 'Cashier / Front-of-House Operator',
    subtitle: 'Point-of-Sale Checkout, Split Payments & Fast Service',
    badge: 'Front-of-House',
    color: 'amber',
    iconName: 'CreditCard',
    operationalScope: 'Handles customer checkout, rapid product search, barcode scanning, split payments, cash drawer management, and customer receipt printing.',
    
    featureBlueprint: {
      overview: 'Requires ultra-fast, foolproof POS UI with millisecond response time, offline resilience, and automatic guardrails against accidental or intentional checkout errors.',
      categories: [
        {
          name: '1. High-Velocity Order & Payment Processing',
          features: [
            {
              title: 'Sub-Second Touch & Barcode SKU Lookup',
              description: 'Quick-key category grid with instant search and laser barcode scanner integration supporting 60+ items per minute.',
              metric: '<50ms input latency'
            },
            {
              title: 'Flexible Split-Tender Payment Engine',
              description: 'Seamless split between Cash, Credit Card, and Digital Wallets (e.g. $20 cash + $35 card) with automatic change calculation.',
              metric: 'Zero manual mental math required'
            }
          ]
        },
        {
          name: '2. Offline Checkout & Terminal Safety',
          features: [
            {
              title: 'Zero-Downtime Offline Mode with Local Sync Queue',
              description: 'Allows continuous ringing of orders and receipt printing even during total broadband internet outages, queueing transactions in Dexie.',
              metric: '100% checkout uptime guarantee'
            },
            {
              title: 'Auto-Lock Inactivity Screen Timeout',
              description: 'Terminal locks automatically after 45 seconds of inactivity, requiring PIN to resume.',
              metric: 'Prevents walk-away register tampering'
            }
          ]
        }
      ]
    },

    realLifeScenarios: [
      {
        id: 'scenario-cashier-1',
        title: 'Lunch Rush Internet Blackout & Offline Transactions',
        context: 'At 12:30 PM with a line of 15 customers, the main internet fiber connection drops entirely.',
        workflow: [
          'Step 1: Terminal seamlessly switches to Offline Mode without crashing or interrupting active cart.',
          'Step 2: Cashier continues scanning items, accepting cash and pre-authorized offline card tokens.',
          'Step 3: Printed offline receipts display statutory offline serial numbers.',
          'Step 4: Internet reconnects at 1:15 PM; system silently batches and syncs 42 queued transactions with cloud backend without duplicate billing.'
        ],
        businessImpact: 'Zero lost revenue, zero customer walk-outs, and 100% continuity during infrastructure failure.'
      }
    ],

    devilsTeamThreats: [
      {
        titanId: 'miller',
        titanName: 'Charlie Miller',
        vector: 'Negative Cart Quantity Exploit (-5 Ribeye Steaks)',
        description: 'Cashier enters -5 quantity for high-value item, creating a negative total balance of -$250, then executes cash checkout to extract money from drawer.',
        defense: 'Cart engine rejects any quantity <= 0 or non-integer values; negative balance checkouts hard-blocked at schema level.'
      },
      {
        titanId: 'geohot',
        titanName: 'George Hotz (Geohot)',
        vector: 'Rapid Double-Tender Button Click Race',
        description: 'Cashier rapidly double-taps "Complete Payment" button, triggering two parallel API requests that charge customer credit card twice.',
        defense: 'Client-side button debouncing with single-use idempotency UUID per cart session.'
      },
      {
        titanId: 'mitnick',
        titanName: 'Kevin Mitnick',
        vector: 'Unattended Cashier Terminal Hijacking',
        description: 'Cashier steps away to get receipt paper; bystander punches an unauthorized cash refund or discount.',
        defense: 'Presence-sensing auto-lock timer with 30-second screen blanking and biometric quick-unlock.'
      },
      {
        titanId: 'kamkar',
        titanName: 'Samy Kamkar',
        vector: 'Customer Credit Card PAN Cached in DOM or LocalStorage',
        description: 'Card number or customer phone number lingering in browser memory or unmasked in payment confirmation view.',
        defense: 'Zero client-side card data retention; PCI-DSS tokenized iframe gateway where card PAN never touches app memory.'
      },
      {
        titanId: 'jack',
        titanName: 'Barnaby Jack',
        vector: 'Offline IndexedDB Cart Manipulation',
        description: 'Modifying prices in browser IndexedDB before offline sync triggers, paying $1 for $100 items.',
        defense: 'Cryptographic HMAC signature generated over line items at moment of ring-in; server rejects tampered offline payloads.'
      }
    ]
  },

  {
    id: 'inventory_specialist',
    title: 'Inventory Specialist / Stock Controller',
    subtitle: 'Procurement, Stock Takes, Batch Tracking & Shrinkage Control',
    badge: 'Logistics',
    color: 'purple',
    iconName: 'Package',
    operationalScope: 'Oversees warehouse and store stock levels, manages supplier receiving against POs, tracks batch expiry dates, executes stock adjustments, and conducts cycle counts.',
    
    featureBlueprint: {
      overview: 'Requires granular stock ledger accuracy, automated purchase order triggers, and tamper-resistant audit trails for inventory write-offs.',
      categories: [
        {
          name: '1. Inbound Procurement & 3-Way PO Matching',
          features: [
            {
              title: 'Barcode Receiving & Discrepancy Matching',
              description: 'Scan delivered supplier boxes to verify received quantity vs original Purchase Order and vendor delivery receipt.',
              metric: 'Flags short-deliveries immediately'
            },
            {
              title: 'Batch, Lot & Expiry Date Management',
              description: 'Tracks perishable goods with First-In, First-Out (FIFO) warnings before products hit expiration windows.',
              metric: 'Reduces perishable spoilage by >40%'
            }
          ]
        },
        {
          name: '2. Stock Control & Shrinkage Mitigation',
          features: [
            {
              title: 'Automated Reorder Point (ROP) & Safety Stock',
              description: 'Predictive inventory replenishment based on sales velocity and supplier lead times.',
              metric: 'Zero stock-outs on top 20 revenue items'
            },
            {
              title: 'Mandatory Reason Codes & Evidence for Spoilage Write-Offs',
              description: 'Requires explicit categorization (e.g. dropped, expired, damaged) and supervisor approval for all write-offs.',
              metric: 'Full audit chain for shrinkage'
            }
          ]
        }
      ]
    },

    realLifeScenarios: [
      {
        id: 'scenario-inv-1',
        title: 'Short-Delivered Supplier Shipment Dispute Resolution',
        context: 'A seafood supplier delivers 30kg of fresh salmon, but the invoice charges for 50kg ($1,250 vs $750).',
        workflow: [
          'Step 1: Inventory specialist weighs delivery on certified digital scale connected to OmniStock.',
          'Step 2: Scans delivery note barcode; system matches against Purchase Order #PO-8821.',
          'Step 3: System identifies 20kg discrepancy, auto-generates a Supplier Debit Memo for $500, and notifies Cost Analyst and Accounting.',
          'Step 4: Driver signs digital delivery discrepancy form on POS tablet.'
        ],
        businessImpact: 'Instantly saves $500 overbilling and prevents distorted food cost calculations.'
      }
    ],

    devilsTeamThreats: [
      {
        titanId: 'jack',
        titanName: 'Barnaby Jack',
        vector: 'Ghost Stock Write-Off Collusion',
        description: 'Staff member modifies on-hand stock quantities directly in local database without generating a ledger journal entry, stealing physical stock.',
        defense: 'Immutable double-entry inventory ledger: stock levels are derived exclusively from sum of auditable transaction events.'
      },
      {
        titanId: 'geohot',
        titanName: 'George Hotz (Geohot)',
        vector: 'Concurrent Stock Allocation Race During High-Demand Drops',
        description: 'Two separate retail terminals ring up the last available 5 units of a limited SKU simultaneously, causing negative on-hand stock.',
        defense: 'Row-level reservation locks with 2-minute checkout expiry window.'
      },
      {
        titanId: 'miller',
        titanName: 'Charlie Miller',
        vector: 'Integer Overflow / Fuzzed Stock Adjustments (1e12 Units)',
        description: 'Fuzzing the manual stock adjustment input with astronomical numbers (999999999999) causing integer overflow and broken inventory valuation.',
        defense: 'Strict bounds checking: maximum single adjustment quantity capped at 10,000 units with supervisor confirmation.'
      },
      {
        titanId: 'kamkar',
        titanName: 'Samy Kamkar',
        vector: 'Confidential Supplier Wholesale Pricing Exposed to Floor Staff',
        description: 'Cashiers and floor staff viewing product lookup screens can inspect raw supplier purchase costs and trade discount margins.',
        defense: 'Role-based field masking: supplier purchase prices visible strictly to Inventory Specialists, Cost Analysts, and Owners.'
      },
      {
        titanId: 'mitnick',
        titanName: 'Kevin Mitnick',
        vector: 'Inter-Branch Transfer Interception Spoofing',
        description: 'Falsifying in-transit inventory transfer confirmations between Branch A and Branch B to siphon high-value liquor bottles.',
        defense: 'Cryptographic dispatch/receipt handshake: originating branch dispatches with tamper seal ID; destination branch must confirm receipt.'
      }
    ]
  },

  {
    id: 'cost_analyst',
    title: 'Cost Analyst',
    subtitle: 'Recipe Costing, Margin Engineering & Unit Economics',
    badge: 'Finance',
    color: 'cyan',
    iconName: 'TrendingUp',
    operationalScope: 'Calculates Bill of Materials (BOM), recipe yields, standard vs actual food cost variances, menu engineering matrices, and gross margin optimization.',
    
    featureBlueprint: {
      overview: 'Requires dynamic unit-of-measure conversion engines, recipe costing calculators, and variance alert systems to protect profitability against ingredient inflation.',
      categories: [
        {
          name: '1. Recipe BOM & Yield Costing',
          features: [
            {
              title: 'Multi-Tier Sub-Recipe & Ingredient BOM Costing',
              description: 'Calculates true plate cost based on sub-recipes (e.g. marinade sauce -> seasoned meat -> finished dish), factoring in preparation wastage and cooking shrinkage yield %.',
              metric: 'Precise fractional gram/ounce costing'
            },
            {
              title: 'Dynamic Inflation & Supplier Price Fluctuation Impact',
              description: 'Simulates the effect of commodity price increases on all menu items containing affected ingredients, flagging menu items with margins below 65%.',
              metric: 'Predictive margin sensitivity modeling'
            }
          ]
        },
        {
          name: '2. Menu Engineering & Profitability Analysis',
          features: [
            {
              title: 'Boston Consulting Group Menu Matrix (Stars, Dogs, Plowhorses, Puzzles)',
              description: 'Categorizes menu items based on profitability vs popularity, guiding price adjustments and promotion strategy.',
              metric: 'Quarterly menu optimization recommendations'
            },
            {
              title: 'Standard Cost vs Actual Usage Variance (Variance Analysis)',
              description: 'Compares theoretical ingredient consumption (based on sales) vs actual physical stock count usage to isolate portion over-pouring and kitchen waste.',
              metric: 'Pinpoints kitchen yield variances >2%'
            }
          ]
        }
      ]
    },

    realLifeScenarios: [
      {
        id: 'scenario-cost-1',
        title: 'Ingredient Inflation Margin Shock Simulation',
        context: 'Global cooking oil prices surge by 35% overnight. The Cost Analyst must recalculate margins across 24 fried menu items and recommend price adjustments before the weekend.',
        workflow: [
          'Step 1: Analyst updates standard unit cost for cooking oil in Central Recipe Engine.',
          'Step 2: System cascades updated cost across all 24 parent recipes and calculates updated contribution margins.',
          'Step 3: Flags 4 items that dropped below the 60% gross margin target (e.g. Crispy Calamari dropped to 48%).',
          'Step 4: Generates pricing recommendation scenario showing a $0.75 price increase restores target margin while retaining customer volume.'
        ],
        businessImpact: 'Maintains annual gross profit and averts $28,000 in unbudgeted ingredient inflation erosion.'
      }
    ],

    devilsTeamThreats: [
      {
        titanId: 'geohot',
        titanName: 'George Hotz (Geohot)',
        vector: 'Floating Point Precision Drift in Fractional Ingredient Recipes',
        description: 'Micro-ingredients (e.g. 0.0035 kg saffron or 0.00125 L truffle oil) calculated using 64-bit IEEE floats accumulate round-off errors across 50,000 orders.',
        defense: 'Employ high-precision fixed-decimal arithmetic (6 decimal places for fractional BOM units) preventing drift.'
      },
      {
        titanId: 'miller',
        titanName: 'Charlie Miller',
        vector: 'Division-by-Zero / Zero Yield Input in Recipe Calculator',
        description: 'Entering 0% cooking yield or negative raw batch weight crashes recipe computation and generates infinity ($Inf) plate cost.',
        defense: 'Strict mathematical domain verification: yield must be strictly positive (0.01% <= yield <= 200.00%).'
      },
      {
        titanId: 'mitnick',
        titanName: 'Kevin Mitnick',
        vector: 'Unauthorized Standard Cost Manipulation for Incentive Gaming',
        description: 'Kitchen manager alters standard recipe costs downward in system to artificially inflate reported branch bonus metrics.',
        defense: 'Standard cost master records locked behind strict dual-authorization workflow with audit logging.'
      },
      {
        titanId: 'kamkar',
        titanName: 'Samy Kamkar',
        vector: 'Proprietary Recipe BOM Leakage to Unauthenticated APIs',
        description: 'Secret sauce and proprietary seasoning formulas exposed through public catalog query endpoints.',
        defense: 'Isolate sensitive BOM composition behind authenticated server-side calculations; client POS only receives final price and allergen tags.'
      },
      {
        titanId: 'jack',
        titanName: 'Barnaby Jack',
        vector: 'Unit of Measure (UOM) Conversion Mismatch Exploit',
        description: 'Exploiting mismatched unit conversions (grams vs ounces, fluid liters vs dry kilograms) to distort inventory consumption ledgers.',
        defense: 'Rigid dimension-checked UOM conversion tables with verified dimensional analysis validation.'
      }
    ]
  },

  {
    id: 'marketing_strategist',
    title: 'Marketing Strategist',
    subtitle: 'Campaigns, Customer Loyalty, Dynamic Promotions & Retention',
    badge: 'Growth',
    color: 'rose',
    iconName: 'Megaphone',
    operationalScope: 'Designs promotional campaigns, coupon codes, VIP loyalty rewards, happy hour rules, customer segmentation, and computes Return on Marketing Spend (ROAS).',
    
    featureBlueprint: {
      overview: 'Requires rule-based promotional engines with anti-abuse guardrails, customer lifetime value (CLV) analytics, and automated attribution tracking.',
      categories: [
        {
          name: '1. Dynamic Promotions & Anti-Abuse Rules Engine',
          features: [
            {
              title: 'Rule-Based Promo Builder (BOGO, Percentage, Bundles)',
              description: 'Configure complex promotional rules (e.g. Buy 2 Cocktails get 50% off Appetizer between 5 PM - 7 PM, excluding holidays).',
              metric: 'Granular schedule and item exclusivity'
            },
            {
              title: 'Strict Anti-Stacking & Maximum Discount Caps',
              description: 'Prevents customer from stacking multiple discount codes together, and enforces maximum discount ceiling (e.g. max $25 off per ticket).',
              metric: 'Guarantees order never drops below COGS'
            }
          ]
        },
        {
          name: '2. Loyalty Programs & Customer Segmentation',
          features: [
            {
              title: 'Tiered Loyalty Points & Anti-Fraud Redemption',
              description: 'Points earned per dollar spent with SMS OTP verification required for high-value reward redemptions.',
              metric: 'Prevents staff from draining customer balances'
            },
            {
              title: 'RFM Customer Segmentation (Recency, Frequency, Monetary)',
              description: 'Automated cohort targeting (VIPs, Lapsed regulars, Churn risks) with automated SMS/Email re-engagement triggers.',
              metric: 'Increases 60-day customer retention by 18%'
            }
          ]
        }
      ]
    },

    realLifeScenarios: [
      {
        id: 'scenario-mkt-1',
        title: 'Flash Holiday Promo Code Viral Abuse Mitigation',
        context: 'Marketing launches a VIP Influencer 25% off coupon (VIP25). A TikTok post leaks the code, and thousands of customers attempt to use it alongside an existing 20% Happy Hour discount.',
        workflow: [
          'Step 1: Influx of online and in-store checkouts apply VIP25 coupon.',
          'Step 2: OmniStock Anti-Abuse Rules Engine detects coupon stacking attempt with Happy Hour.',
          'Step 3: Engine enforces rule: "Discounts non-cumulative; highest single discount applied".',
          'Step 4: System enforces global budget cap of 500 total redemptions; automatically expires promo when cap is reached.'
        ],
        businessImpact: 'Prevents $45,000 in catastrophic margin loss and preserves promotion ROI.'
      }
    ],

    devilsTeamThreats: [
      {
        titanId: 'mitnick',
        titanName: 'Kevin Mitnick',
        vector: 'Coupon Stacking & Unlimited Discount Exploitation',
        description: 'Applying a 30% discount coupon, an employee 20% discount, and a $10 voucher sequentially on a single $20 cart, requiring store to pay the customer.',
        defense: 'Hard stop in checkout pipeline: cumulative discount cannot exceed 35% of cart subtotal without Owner PIN override.'
      },
      {
        titanId: 'geohot',
        titanName: 'George Hotz (Geohot)',
        vector: 'Concurrency Race on Single-Use Promo Code Redemption',
        description: 'Redeeming a single-use $50 birthday coupon simultaneously across 5 web/POS checkouts in the exact same millisecond before status flips to "used".',
        defense: 'Distributed atomic compare-and-swap (CAS) lock with Redis/DB transaction isolation ensuring single execution.'
      },
      {
        titanId: 'miller',
        titanName: 'Charlie Miller',
        vector: 'Promo Code Parameter Fuzzing & SQL/Regex Injection',
        description: 'Entering malicious regex strings or quote characters in coupon code search box causing regex denial of service (ReDoS).',
        defense: 'Sanitize promo codes against strict alphanumeric whitelist [A-Z0-9_-]{3,20} with 500ms rate limiting.'
      },
      {
        titanId: 'kamkar',
        titanName: 'Samy Kamkar',
        vector: 'Customer Loyalty Database PII Leak via Unsanitized Export',
        description: 'Marketing export tool dumps raw customer phone numbers, home addresses, and credit card purchase patterns into unprotected CSV download.',
        defense: 'Anonymize customer exports with differential privacy; mask phone numbers (e.g. +63 917 *** 1234) and require security officer sign-off.'
      },
      {
        titanId: 'jack',
        titanName: 'Barnaby Jack',
        vector: 'Client-Side Loyalty Point Tampering in Offline POS',
        description: 'Modifying local Dexie DB customer loyalty balance while offline to redeem hundreds of dollars in free store credit.',
        defense: 'Loyalty balance stored with cryptographic HMAC signature signed by central cloud authority; offline points only accrue, never redeem.'
      }
    ]
  }
];

export function getRoleById(roleId) {
  return ENTERPRISE_ROLES.find(r => r.id === roleId) || ENTERPRISE_ROLES[0];
}

export function getAllRoleScenarios() {
  return ENTERPRISE_ROLES;
}
