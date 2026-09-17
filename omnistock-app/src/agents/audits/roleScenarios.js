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
      },
      {
        id: 'scenario-mgr-2',
        title: 'Multi-Branch Shift Handoff Reconciliation Discrepancy',
        context: 'At closing time, Branch #1 reports a cash drawer overage of $340 while Branch #3 reports a shortage of $215. The manager must reconcile both before end-of-day bank deposit.',
        workflow: [
          'Step 1: Manager opens Shift Reconciliation Dashboard showing both branches side-by-side.',
          'Step 2: Branch #1 overage traced to a $340 cash sale that was mistakenly ringed up under "dine-in" instead of "takeout" (different VAT category).',
          'Step 3: Branch #3 shortage traced to a voided transaction that was approved but never logged to the audit trail due to a terminal sync delay.',
          'Step 4: Manager corrects the VAT categorization at Branch #1, retrieves the void audit log from Branch #3 offline buffer, and signs the dual-branch reconciliation.'
        ],
        businessImpact: 'Ensures accurate tax reporting across branches and prevents $215 unexplained cash shortage from escalating to an audit flag.'
      },
      {
        id: 'scenario-mgr-3',
        title: 'Regulatory Health Inspection Audit Trail Response',
        context: 'A municipal health inspector arrives unannounced and requests 90 days of temperature logs, supplier receiving records, and employee food handling certifications.',
        workflow: [
          'Step 1: Manager accesses Compliance Audit Dashboard and selects the 90-day reporting window.',
          'Step 2: System compiles batch receiving temperature logs, cold-storage monitoring records, and staff certification expiry calendar.',
          'Step 3: Inspector flags two expired food handler certifications and one missing cold-chain temperature reading from 3 weeks ago.',
          'Step 4: Manager generates corrective action report, schedules re-certification for the two staff members, and submits the digital compliance response via the inspector tablet.'
        ],
        businessImpact: 'Avoids regulatory fines of up to $5,000 per violation and maintains the establishment operating license.'
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
      },
      {
        id: 'scenario-cashier-2',
        title: 'Split Payment Dispute and Chargeback Resolution',
        context: 'A customer disputes a $145 charge claiming they only authorized $100 on their card and $45 in cash. The cashier must produce proof of the split-tender agreement.',
        workflow: [
          'Step 1: Cashier retrieves the original transaction receipt #TRX-7741 showing the split-tender breakdown.',
          'Step 2: System displays the timestamped payment log: $45.00 CASH (12:03:15 PM) + $100.00 VISA ****1234 (12:03:22 PM).',
          'Step 3: Cashier prints the digital receipt with the customer signature capture and split-tender confirmation.',
          'Step 4: Manager reviews the evidence package and submits a chargeback dispute response to the payment processor with the receipt attachment.'
        ],
        businessImpact: 'Resolves the chargeback dispute with documented evidence and prevents $100 in fraudulent reversal.'
      },
      {
        id: 'scenario-cashier-3',
        title: 'End-of-Shift Cash Drawer Overage Investigation',
        context: 'At end-of-shift reconciliation, the cashier counts $847 in the drawer, but the system expected $812 — a $35 unexplained overage.',
        workflow: [
          'Step 1: Cashier performs blind count; system reports $35 overage vs expected float.',
          'Step 2: Manager reviews the shift transaction log and identifies a customer who was charged twice for a $17.50 combo meal due to a network retry.',
          'Step 3: System flags the duplicate charge (same idempotency key, two successful responses) and generates a refund authorization.',
          'Step 4: Manager approves the $17.50 refund, logs the overage root cause, and the remaining $17.50 is attributed to an unrecorded cash sale from a manual entry.'
        ],
        businessImpact: 'Identifies a double-charge system bug, issues a customer refund, and maintains drawer accuracy for audit compliance.'
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
    auditRoleAliases: ['inventory'],
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
      },
      {
        id: 'scenario-inv-2',
        title: 'Cross-Branch Emergency Stock Transfer During Peak Demand',
        context: 'Branch #4 runs out of premium ribeye steaks on a Saturday night with 30 orders still in the kitchen. Branch #2 (3km away) has 40 units in stock.',
        workflow: [
          'Step 1: Branch #4 inventory system triggers a stock-out alert and queries the inter-branch availability matrix.',
          'Step 2: System identifies Branch #2 has 40 units of ribeye and auto-generates an Inter-Branch Transfer Order #XFER-3391.',
          'Step 3: Branch #2 inventory specialist confirms dispatch with tamper-seal ID and digital signature on the transfer manifest.',
          'Step 4: Branch #4 receives the transfer, scans the tamper seal, and the system updates both branch stock ledgers atomically.'
        ],
        businessImpact: 'Prevents 30 cancelled orders ($2,100 in lost revenue) and maintains customer satisfaction during peak service.'
      },
      {
        id: 'scenario-inv-3',
        title: 'Perishable Batch Expiry Mass Write-Off Event',
        context: 'A refrigeration unit failure at Branch #1 compromises 60 units of dairy and meat products worth $1,800. The inventory specialist must execute a compliant mass write-off.',
        workflow: [
          'Step 1: Cold-storage IoT sensor alerts that Unit B temperature exceeded 8°C for 4+ hours, triggering a food safety quarantine flag.',
          'Step 2: Inventory specialist scans all affected batch/lot barcodes into the Quarantine Write-Off module.',
          'Step 3: System generates a mass write-off journal entry with reason code "REFRIGERATION_FAILURE", attaches the IoT temperature log as evidence, and routes for manager approval.',
          'Step 4: Manager approves the $1,800 write-off; system updates the stock ledger, notifies the Cost Analyst for margin impact, and files the insurance claim documentation.'
        ],
        businessImpact: 'Ensures food safety compliance, prevents spoiled product from reaching customers, and triggers insurance recovery for $1,800 in losses.'
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
      },
      {
        id: 'scenario-cost-2',
        title: 'Menu Engineering Quarterly Review and Item Retirement Decision',
        context: 'Quarterly menu analysis reveals 6 menu items classified as "Dogs" (low profitability, low popularity) collectively contributing only 3% of revenue but consuming 12% of prep labor hours.',
        workflow: [
          'Step 1: Analyst opens the BCG Menu Matrix and filters for items in the "Dog" quadrant over the last 90 days.',
          'Step 2: System ranks the 6 Dog items by total contribution margin: bottom 3 items net negative margin after labor allocation.',
          'Step 3: Analyst simulates removing the 3 worst items and projects a 4% labor cost reduction with only 1.2% revenue loss.',
          'Step 4: Generates a retirement recommendation report with replacement menu candidates from the "Star" and "Plowhorse" quadrants for the next menu cycle.'
        ],
        businessImpact: 'Optimizes kitchen labor utilization by 4% and improves overall menu profitability by $3,200/month.'
      },
      {
        id: 'scenario-cost-3',
        title: 'Standard vs Actual Variance Investigation — Kitchen Over-Pouring',
        context: 'Monthly variance report shows actual liquor usage exceeded theoretical consumption by $2,400 — a 7% variance well above the 2% tolerance threshold.',
        workflow: [
          'Step 1: Analyst opens the Standard vs Actual Variance Report and filters for the spirits category.',
          'Step 2: System pinpoints the top 3 SKUs with the highest variance: premium vodka (+18%), gin (+12%), and whiskey (+9%).',
          'Step 3: Analyst cross-references with POS pour-size settings and discovers the bartender is free-pouring instead of using the calibrated 1.5oz jiggers.',
          'Step 4: Generates a corrective action memo recommending calibrated pour spouts and weekly variance monitoring for the bar station.'
        ],
        businessImpact: 'Recovers $2,400/month in over-pour losses and establishes a 2% variance monitoring threshold for all bar operations.'
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
    auditRoleAliases: ['marketing'],
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
      },
      {
        id: 'scenario-mkt-2',
        title: 'Loyalty Program Point Drain Fraud Detection',
        context: 'A customer account redeems $320 worth of loyalty rewards across 4 separate visits in a single day, far exceeding normal redemption patterns.',
        workflow: [
          'Step 1: Anti-fraud engine flags the account "CUST-88412" for abnormal redemption velocity (4 redemptions in 6 hours).',
          'Step 2: System freezes the account pending investigation and alerts the marketing strategist.',
          'Step 3: Analyst reviews the redemption log: all 4 redemptions were processed at the same terminal by the same cashier, suggesting staff-assisted point draining.',
          'Step 4: Analyst triggers an SMS OTP verification requirement for all future high-value redemptions and files an incident report for the cashier investigation.'
        ],
        businessImpact: 'Prevents $320 in fraudulent reward redemption and closes a staff-collusion loyalty drain vulnerability.'
      },
      {
        id: 'scenario-mkt-3',
        title: 'Multi-Channel Campaign Attribution and ROAS Reconciliation',
        context: 'Marketing ran simultaneous campaigns across SMS, Facebook Ads, and in-store QR codes. Finance demands proof of which channel drove the $18,500 weekend revenue spike.',
        workflow: [
          'Step 1: Analyst opens the Multi-Channel Attribution Dashboard and selects the campaign date range.',
          'Step 2: System attributes revenue by channel: SMS (38%), Facebook Ads (44%), QR codes (18%) using last-touch attribution.',
          'Step 3: Cross-references ad spend: SMS ($450), Facebook ($1,200), QR ($50) — calculating ROAS of 15.6x, 6.8x, and 66.6x respectively.',
          'Step 4: Generates a channel optimization report recommending budget reallocation: increase SMS spend, maintain Facebook, and expand QR code placements.'
        ],
        businessImpact: 'Optimizes marketing spend allocation and demonstrates $18,500 in attributable revenue with clear ROAS per channel.'
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

/**
 * Cross-Role Interaction Scenarios
 * Models adversarial interactions between 2+ enterprise roles where the
 * collision between their workflows creates exploitable threat surfaces.
 */
export const CROSS_ROLE_SCENARIOS = [
  {
    id: 'crossrole-1',
    title: 'Cashier + Manager Void Fraud Collusion',
    participatingRoles: ['cashier', 'branch_manager'],
    context: 'A cashier and a branch manager collude to split pocketed cash: the cashier voids completed orders after payment, and the manager approves the voids without inspection in exchange for a cut.',
    workflow: [
      'Step 1: Cashier completes a $120 cash order and pockets the money.',
      'Step 2: Cashier initiates a post-tender void, claiming the customer cancelled.',
      'Step 3: Manager approves the void with a static PIN — no inspection of kitchen timestamps or delivery confirmation.',
      'Step 4: Inventory ledger shows the items as "voided" but physical stock was consumed, creating a shrinkage gap the manager attributes to "waste".'
    ],
    crossRoleThreats: [
      {
        titanId: 'mitnick',
        vector: 'Static PIN Sharing Enables Collusive Void Approval',
        description: 'The manager shares their static 4-digit PIN with the cashier, allowing self-approved voids without any actual manager oversight.',
        defense: 'Dynamic TOTP on manager device + mandatory kitchen timestamp verification before void approval — no static PINs.'
      },
      {
        titanId: 'kamkar',
        vector: 'Void Audit Trail Suppression via Shared Session',
        description: 'Manager stays logged into the POS terminal, allowing the cashier to use the elevated session to approve their own voids.',
        defense: 'Ephemeral single-action privilege elevation: manager session auto-reverts to cashier within 30 seconds of each override.'
      }
    ],
    businessImpact: 'Collusive void fraud can drain $2,000-$5,000/month per branch if the PIN-sharing pattern goes undetected.'
  },
  {
    id: 'crossrole-2',
    title: 'Inventory Specialist + Cost Analyst Margin Manipulation to Hide Shrinkage',
    participatingRoles: ['inventory_specialist', 'cost_analyst'],
    context: 'An inventory specialist and a cost analyst collude to mask theft by adjusting standard recipe costs upward, making actual vs theoretical variance appear normal despite physical stock disappearing.',
    workflow: [
      'Step 1: Inventory specialist removes high-value liquor bottles from the storeroom without logging a transaction.',
      'Step 2: Cost analyst inflates the standard recipe yield loss percentage for the affected SKUs, making the theoretical consumption appear higher.',
      'Step 3: The variance between theoretical and actual usage shrinks, hiding the theft in "acceptable" variance thresholds.',
      'Step 4: Monthly margin reports show normal food cost ratios, while actual profitability is eroded by the unrecorded shrinkage.'
    ],
    crossRoleThreats: [
      {
        titanId: 'mitnick',
        vector: 'Dual-Role Standard Cost Manipulation Without Dual Authorization',
        description: 'The cost analyst modifies standard recipe costs without requiring a second approver, enabling single-actor margin manipulation.',
        defense: 'Standard cost master records locked behind strict dual-authorization workflow with immutable audit logging.'
      },
      {
        titanId: 'jack',
        vector: 'Inventory Ledger Gap From Unlogged Stock Removal',
        description: 'Physical stock is removed without a corresponding ledger journal entry, creating an untraceable gap between system and reality.',
        defense: 'Immutable double-entry inventory ledger: stock levels are derived exclusively from sum of auditable transaction events — no direct quantity edits.'
      }
    ],
    businessImpact: 'Undetected collusion can mask $3,000-$8,000/month in stolen inventory and corrupt menu engineering decisions with false cost data.'
  },
  {
    id: 'crossrole-3',
    title: 'Marketing Strategist + Cashier Promo Code Abuse Stacking',
    participatingRoles: ['marketing_strategist', 'cashier'],
    context: 'A marketing strategist leaks a high-value internal promo code to a cashier, who applies it alongside customer discounts to pocket the difference in cash.',
    workflow: [
      'Step 1: Marketing strategist creates a "STAFF100" promo code worth $100 off, intended for employee meal comp.',
      'Step 2: Cashier applies STAFF100 to a regular customer $85 order, charges the customer $85 cash, and voids the $100 discount as a "staff meal".',
      'Step 3: The $15 overage goes into the drawer, and the cashier extracts it during shift close.',
      'Step 4: Promo code redemption reports show normal staff meal patterns, masking the abuse.'
    ],
    crossRoleThreats: [
      {
        titanId: 'miller',
        vector: 'Internal Promo Code Parameter Fuzzing and Misuse',
        description: 'The STAFF100 code has no usage cap, no role-restriction, and no per-shift limit, allowing unlimited exploitation.',
        defense: 'Strict promo code schema: alphanumeric [A-Z0-9_-]{3,20}, role-restricted, usage-capped, with 500ms rate limiting.'
      },
      {
        titanId: 'geohot',
        vector: 'Concurrent Redemption Race on Single-Use Staff Code',
        description: 'If the code is single-use, the cashier races to redeem it before the legitimate staff member, or exploits a sync delay to redeem twice.',
        defense: 'Distributed atomic compare-and-swap (CAS) lock ensuring single execution of single-use promo codes.'
      }
    ],
    businessImpact: 'Unrestricted internal promo codes can drain $500-$1,500/month in fraudulent discounts per cashier.'
  },
  {
    id: 'crossrole-4',
    title: 'Owner + Manager Cash Skimming Cover-Up',
    participatingRoles: ['owner', 'branch_manager'],
    context: 'A branch manager systematically skims $50-$100 per shift from cash drawers. When the owner investigates the variance, the manager manipulates the reconciliation reports to show the shortages as "supplier short-deliveries".',
    workflow: [
      'Step 1: Manager skims $80 from Branch #2 cash drawer during Friday night shift.',
      'Step 2: Owner notices a recurring $60-$100 weekly variance pattern at Branch #2 and requests an explanation.',
      'Step 3: Manager attributes the variance to supplier short-deliveries and generates false receiving discrepancy reports to cover the gap.',
      'Step 4: Owner cross-references with the inventory specialist PO matching records and discovers no corresponding supplier discrepancy claims exist.'
    ],
    crossRoleThreats: [
      {
        titanId: 'mitnick',
        vector: 'Reconciliation Report Falsification via Manager Access Level',
        description: 'The manager has write access to reconciliation reports, enabling them to fabricate supplier discrepancy explanations.',
        defense: 'Reconciliation reports must be cryptographically signed and immutable once submitted; supplier discrepancies must cross-reference PO matching records automatically.'
      },
      {
        titanId: 'jack',
        vector: 'Cash Drawer Float Manipulation Across Shifts',
        description: 'Manager exploits the gap between opening and closing float counts across shifts, skimming small amounts that fall within the $2 variance tolerance.',
        defense: 'Cumulative variance tracking: individual variances within tolerance but recurring patterns trigger escalation alerts above $20/week cumulative drift.'
      }
    ],
    businessImpact: 'Systematic cash skimming can drain $1,500-$4,000/month per branch if reconciliation falsification goes undetected.'
  },
  {
    id: 'crossrole-5',
    title: 'Inventory Specialist + Cashier Stock Theft via POS Manipulation',
    participatingRoles: ['inventory_specialist', 'cashier'],
    context: 'An inventory specialist and cashier collude to steal high-value items: the inventory specialist marks stock as "damaged/expired" in the write-off ledger, and the cashier sells the same items as off-menu cash sales with no receipt.',
    workflow: [
      'Step 1: Inventory specialist marks 5 bottles of premium whiskey ($450 value) as "broken during restocking" in the write-off ledger.',
      'Step 2: Instead of disposing the bottles, the specialist hands them to the cashier.',
      'Step 3: Cashier sells the whiskey to regular customers as off-menu items, pocketing the cash with no POS record.',
      'Step 4: Inventory ledger shows the whiskey as written off, and POS shows no corresponding sale — the theft is invisible in standard reports.'
    ],
    crossRoleThreats: [
      {
        titanId: 'jack',
        vector: 'Write-Off Ledger Entry Without Physical Evidence Verification',
        description: 'The inventory specialist logs a write-off without requiring photo evidence or supervisor physical verification of the damaged goods.',
        defense: 'Mandatory photo upload for all write-offs + supervisor physical verification signature + random audit sampling of 10% of write-offs.'
      },
      {
        titanId: 'kamkar',
        vector: 'Off-Menu Cash Sales Invisible to POS Audit Trail',
        description: 'Cashier processes sales outside the POS system, leaving no digital transaction record to cross-reference against inventory.',
        defense: 'Reconcile cash drawer float against POS transaction volume — unexplained cash overages trigger investigation alerts.'
      }
    ],
    businessImpact: 'Collusive stock theft via write-off manipulation can drain $2,000-$6,000/month in high-value inventory per branch.'
  }
];

export function getCrossRoleScenarios() {
  return CROSS_ROLE_SCENARIOS;
}

export function getRoleById(roleId) {
  return ENTERPRISE_ROLES.find(r => r.id === roleId) || ENTERPRISE_ROLES[0];
}

export function getAllRoleScenarios() {
  return ENTERPRISE_ROLES;
}

// Severity ratings for each role+titan threat combination
// Critical = financial fraud, data exposure, tampering | High = race conditions, credential theft | Medium = fuzzing, precision, leakage
const THREAT_SEVERITY_MAP = {
  'owner_mitnick': 'critical',
  'owner_geohot': 'high',
  'owner_miller': 'critical',
  'owner_kamkar': 'critical',
  'owner_jack': 'critical',
  'branch_manager_mitnick': 'high',
  'branch_manager_geohot': 'high',
  'branch_manager_miller': 'high',
  'branch_manager_kamkar': 'medium',
  'branch_manager_jack': 'high',
  'cashier_mitnick': 'high',
  'cashier_geohot': 'high',
  'cashier_miller': 'critical',
  'cashier_kamkar': 'critical',
  'cashier_jack': 'critical',
  'inventory_specialist_mitnick': 'high',
  'inventory_specialist_geohot': 'high',
  'inventory_specialist_miller': 'medium',
  'inventory_specialist_kamkar': 'medium',
  'inventory_specialist_jack': 'critical',
  'cost_analyst_mitnick': 'high',
  'cost_analyst_geohot': 'medium',
  'cost_analyst_miller': 'medium',
  'cost_analyst_kamkar': 'high',
  'cost_analyst_jack': 'medium',
  'marketing_strategist_mitnick': 'high',
  'marketing_strategist_geohot': 'high',
  'marketing_strategist_miller': 'medium',
  'marketing_strategist_kamkar': 'critical',
  'marketing_strategist_jack': 'high',
};

export function getThreatSeverity(roleId, titanId) {
  return THREAT_SEVERITY_MAP[`${roleId}_${titanId}`] || 'medium';
}
