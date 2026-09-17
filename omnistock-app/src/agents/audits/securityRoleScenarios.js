/**
 * Security Scenarios — Devil's Team Role Threat Modeling
 * Defines 7 security-focused role personas with multi-scenario coverage across
 * incident response, threat modeling, and compliance audit workflows.
 *
 * Roles:
 * 1. CISO (Chief Information Security Officer)
 * 2. Security Engineer
 * 3. Incident Responder
 * 4. Penetration Tester
 * 5. Compliance Officer
 * 6. SOC Analyst
 * 7. Data Protection Officer (DPO)
 */

export const SECURITY_ROLES = [
  {
    id: 'ciso',
    title: 'Chief Information Security Officer',
    subtitle: 'Executive Security Strategy & Governance',
    badge: 'Executive',
    color: 'emerald',
    iconName: 'ShieldCheck',
    operationalScope: 'Owns the organization-wide security posture, approves security architecture decisions, reports risk to the board, and drives the security program across people, process, and technology.',

    featureBlueprint: {
      overview: 'The CISO requires a unified security command center providing executive-level risk visibility, board-ready reporting, and the ability to translate technical threats into business impact metrics.',
      categories: [
        {
          name: '1. Executive Risk Dashboard & Board Reporting',
          features: [
            {
              title: 'Real-Time Organizational Risk Score',
              description: 'Aggregated risk scoring across all business units, factoring in open vulnerabilities, threat intelligence feeds, and compliance gaps, presented as a single executive KPI.',
              metric: 'Target: <3.5 organizational risk score (0-10 scale)'
            },
            {
              title: 'Board-Ready Security Posture Reports',
              description: 'One-click generation of quarterly board reports translating technical metrics (MTTR, vulnerability density, patch compliance) into financial impact and business risk language.',
              metric: 'Auto-generated NACD-format executive summary'
            }
          ]
        },
        {
          name: '2. Security Architecture & Investment Governance',
          features: [
            {
              title: 'Security Tool ROI & Coverage Matrix',
              description: 'Maps every security investment to its coverage area (endpoint, network, cloud, identity), highlighting overlap and gaps in the defense-in-depth stack.',
              metric: 'Zero blind spots in security coverage map'
            },
            {
              title: 'Zero-Trust Architecture Policy Engine',
              description: 'Centralized policy definition for zero-trust network access (ZTNA), enforcing least-privilege access, continuous verification, and micro-segmentation across all environments.',
              metric: '100% of critical assets behind ZTNA'
            }
          ]
        }
      ]
    },

    realLifeScenarios: [
      {
        id: 'sec-ciso-ir-1',
        scenarioType: 'incident_response',
        title: 'Board-Level Breach Escalation & Crisis Decision',
        context: 'A ransomware group claims to have exfiltrated 2TB of customer data from the primary cloud environment. The CISO must make the call: pay, negotiate, or refuse — while briefing the CEO and board within 2 hours.',
        workflow: [
          'Step 1: SOC alerts CISO that ransomware group "LockBit" posted a claim on their leak site with sample data proofs.',
          'Step 2: CISO opens Executive Risk Dashboard to assess blast radius: 340,000 customer records, 12,000 employee PII records, and 3 proprietary source code repositories potentially exposed.',
          'Step 3: CISO convenes crisis war room with Legal, DPO, CEO, and PR — initiates 72-hour regulatory breach notification clock under GDPR Article 33.',
          'Step 4: CISO authorizes Incident Responder to isolate affected cloud segments, deploys DLP to monitor dark web for leaked data, and briefs the board with a financial impact estimate of $4.2M.'
        ],
        businessImpact: 'Limits regulatory exposure to $4.2M vs. potential $12M+ in fines and reputational damage if the breach response is delayed or mishandled.'
      },
      {
        id: 'sec-ciso-tm-1',
        scenarioType: 'threat_modeling',
        title: 'Annual Security Architecture Threat Model Review',
        context: 'The organization is migrating 60% of workloads to a multi-cloud environment. The CISO must lead a threat modeling exercise to identify new attack surfaces and prioritize security controls before migration begins.',
        workflow: [
          'Step 1: CISO convenes Security Engineer, Cloud Architect, and Penetration Tester for a STRIDE-based threat modeling workshop.',
          'Step 2: Team maps the new multi-cloud attack surface: 4 new API gateways, 2 container orchestration clusters, and 3 third-party SaaS integrations.',
          'Step 3: CISO prioritizes threats using DREAD scoring: API gateway token replay (9.2), container escape (8.7), and SaaS supply chain compromise (8.4) top the list.',
          'Step 4: CISO approves $280K budget for API gateway WAF, container runtime security, and SaaS CASB deployment before migration proceeds.'
        ],
        businessImpact: 'Prevents an estimated $8M in potential breach costs by closing critical attack surfaces before the cloud migration goes live.'
      },
      {
        id: 'sec-ciso-ca-1',
        scenarioType: 'compliance_audit',
        title: 'SOC 2 Type II Audit Preparation & Evidence Collection',
        context: 'The organization must pass a SOC 2 Type II audit to retain its largest enterprise customer ($15M ARR). The CISO must ensure all security controls are documented, evidenced, and operating effectively over a 12-month observation period.',
        workflow: [
          'Step 1: CISO opens Compliance Dashboard and maps all 64 SOC 2 Trust Services Criteria to existing controls.',
          'Step 2: System identifies 8 controls lacking sufficient evidence: 3 access review gaps, 2 patch management exceptions, and 3 incident response test gaps.',
          'Step 3: CISO assigns remediation owners with 30-day deadlines and auto-generates evidence collection requests for each control.',
          'Step 4: After remediation, CISO runs a mock audit, passes all 64 criteria, and submits the evidence package to the external auditor.'
        ],
        businessImpact: 'Secures $15M ARR enterprise contract renewal and avoids $2M+ in audit failure remediation costs.'
      }
    ],

    devilsTeamThreats: [
      {
        titanId: 'mitnick',
        titanName: 'Kevin Mitnick',
        vector: 'Executive Security Dashboard Session Hijacking',
        description: 'Attacker compromises the CISO\'s browser session via spear-phishing, gaining access to the organizational risk score, board reports, and security investment data.',
        defense: 'Enforce hardware-key MFA (WebAuthn/FIDO2) for all executive security dashboard access, with session binding to the registered device fingerprint.'
      },
      {
        titanId: 'geohot',
        titanName: 'George Hotz (Geohot)',
        vector: 'Risk Score Calculation Race Condition',
        description: 'Concurrent risk score recalculations across multiple business units create race conditions, producing an artificially low organizational risk score that masks critical vulnerabilities.',
        defense: 'Atomic risk score aggregation with distributed transaction locks and deterministic merge conflict resolution.'
      },
      {
        titanId: 'miller',
        titanName: 'Charlie Miller',
        vector: 'Security Policy Injection via Fuzzed Architecture Config',
        description: 'Malicious actor injects a zero-trust policy with allow-all rules disguised as a legitimate config update, silently disabling micro-segmentation.',
        defense: 'Strict Zod validation on security policy schemas: deny-all default, explicit allowlist with maximum privilege scope enforcement, and dual-authorization for policy changes.'
      },
      {
        titanId: 'jack',
        titanName: 'Barnaby Jack',
        vector: 'Offline Security Audit Log Tampering',
        description: 'Exploiting a network partition to modify local security audit logs before cloud sync, erasing evidence of a failed access review or missing patch.',
        defense: 'Cryptographic hash chain (Merkle tree) on all audit log entries with server-side verification on sync — missing or tampered entries trigger immediate alert.'
      },
      {
        titanId: 'kamkar',
        titanName: 'Samy Kamkar',
        vector: 'Board Report PII Exposure in Cached Executive Views',
        description: 'Executive security reports containing employee PII and vulnerability details cached in browser IndexedDB, accessible to any script running on the executive\'s machine.',
        defense: 'Zero-persistence for executive security reports — all data rendered via ephemeral encrypted streams with automatic purge on session end.'
      }
    ]
  },

  {
    id: 'security_engineer',
    title: 'Security Engineer',
    subtitle: 'Infrastructure Hardening, Patching & Access Control',
    badge: 'Engineering',
    color: 'blue',
    iconName: 'Wrench',
    operationalScope: 'Implements and maintains security controls across infrastructure, deploys patches, configures firewalls and WAFs, manages secrets and certificates, and hardens systems against known and emerging threats.',

    featureBlueprint: {
      overview: 'The Security Engineer requires automated hardening pipelines, infrastructure-as-code security scanning, and real-time configuration drift detection to maintain a defensible security baseline.',
      categories: [
        {
          name: '1. Infrastructure Hardening & Patch Management',
          features: [
            {
              title: 'Automated Vulnerability Scanning & Patch Prioritization',
              description: 'Continuous scanning of all assets (servers, containers, cloud resources) with CVSS-based patch prioritization and automated remediation workflows for critical vulnerabilities.',
              metric: 'Critical patches deployed within 48 hours of release'
            },
            {
              title: 'Infrastructure-as-Code Security Scanning',
              description: 'Pre-deployment scanning of Terraform, CloudFormation, and Kubernetes manifests for misconfigurations, exposed secrets, and non-compliant resource definitions.',
              metric: 'Zero IaC templates with critical findings reach production'
            }
          ]
        },
        {
          name: '2. Access Control & Secrets Management',
          features: [
            {
              title: 'Centralized Secrets Vault with Auto-Rotation',
              description: 'All API keys, database credentials, and certificates stored in an encrypted vault with automated rotation policies and just-in-time access grants.',
              metric: 'Zero hardcoded secrets in source code or config files'
            },
            {
              title: 'Configuration Drift Detection & Auto-Remediation',
              description: 'Continuous comparison of live infrastructure state against the approved security baseline, with automatic rollback of unauthorized configuration changes.',
              metric: 'Drift detected and remediated within 15 minutes'
            }
          ]
        }
      ]
    },

    realLifeScenarios: [
      {
        id: 'sec-se-ir-1',
        scenarioType: 'incident_response',
        title: 'Emergency Patch Deployment During Active Exploitation',
        context: 'A zero-day RCE vulnerability (CVE-2026-XXXX) in the main web framework is being actively exploited in the wild. The Security Engineer must deploy an emergency patch across 120 production servers within 4 hours.',
        workflow: [
          'Step 1: SOC alerts Security Engineer of active exploitation attempts targeting the web framework vulnerability.',
          'Step 2: Engineer opens Patch Management Dashboard, identifies 120 affected servers across 3 cloud regions.',
          'Step 3: Engineer deploys emergency WAF rules to block exploit payloads, then initiates canary patch deployment on 5 servers.',
          'Step 4: After canary validation, Engineer triggers automated rolling patch deployment across all 120 servers with zero-downtime, verifying exploit attempts drop to zero.'
        ],
        businessImpact: 'Prevents full system compromise and an estimated $6M in breach costs from the active zero-day exploitation campaign.'
      },
      {
        id: 'sec-se-tm-1',
        scenarioType: 'threat_modeling',
        title: 'Container Orchestration Attack Surface Mapping',
        context: 'The organization is deploying a new Kubernetes cluster for microservices. The Security Engineer must map the attack surface and implement security controls before production launch.',
        workflow: [
          'Step 1: Engineer runs IaC security scan on the Kubernetes manifest definitions, identifying 7 misconfigurations including overly permissive RBAC and missing network policies.',
          'Step 2: Engineer maps the container attack surface: 24 microservices, 3 ingress controllers, and 2 container registries with potential escape vectors.',
          'Step 3: Engineer implements Pod Security Standards (restricted), network segmentation with Calico, and deploys container runtime security (Falco) for runtime threat detection.',
          'Step 4: Engineer runs a final compliance check — all 7 misconfigurations remediated, cluster passes CIS Kubernetes Benchmark with 94% score.'
        ],
        businessImpact: 'Closes 7 critical misconfigurations before production launch, preventing container escape and lateral movement attacks.'
      },
      {
        id: 'sec-se-ca-1',
        scenarioType: 'compliance_audit',
        title: 'Secrets Management Audit & Hardcoded Credential Sweep',
        context: 'A pre-acquisition due diligence audit requires evidence that no hardcoded secrets exist in any source code repository or CI/CD pipeline across 47 repositories.',
        workflow: [
          'Step 1: Engineer deploys automated secret scanning across all 47 repositories, scanning git history for API keys, passwords, and private keys.',
          'Step 2: Scanner identifies 12 hardcoded secrets across 8 repositories — 4 AWS access keys, 5 database passwords, and 3 JWT signing keys.',
          'Step 3: Engineer rotates all 12 secrets, migrates them to the centralized vault, and implements pre-commit hooks to prevent future hardcoded secret commits.',
          'Step 4: Engineer generates a secrets management compliance report showing 0 hardcoded secrets remaining and 100% vault coverage for the due diligence package.'
        ],
        businessImpact: 'Passes acquisition due diligence and eliminates 12 credential leak vectors that could have enabled full system compromise.'
      }
    ],

    devilsTeamThreats: [
      {
        titanId: 'mitnick',
        titanName: 'Kevin Mitnick',
        vector: 'SSH Key Theft via Compromised CI/CD Runner',
        description: 'Attacker gains access to a CI/CD runner and extracts the SSH private key used for production deployments, enabling direct server access bypassing all network controls.',
        defense: 'Just-in-time SSH access with short-lived certificates issued by a certificate authority — no persistent SSH keys on CI/CD runners, all access logged and time-bound.'
      },
      {
        titanId: 'geohot',
        titanName: 'George Hotz (Geohot)',
        vector: 'Concurrent Patch Deployment Race on Shared Stateful Service',
        description: 'Simultaneous patch deployments to a stateful database cluster create a race condition, causing split-brain and data corruption during the rolling update.',
        defense: 'Distributed consensus-based rolling update coordinator with leader election and serialized node-by-node patch application for stateful services.'
      },
      {
        titanId: 'miller',
        titanName: 'Charlie Miller',
        vector: 'IaC Template Injection via Fuzzed Terraform Variables',
        description: 'Injecting malicious Terraform variable values (e.g. overly permissive CIDR blocks like 0.0.0.0/0) through a compromised CI/CD pipeline parameter.',
        defense: 'Strict Zod validation on all IaC variables: CIDR blocks must not include 0.0.0.0/0, security group rules must follow least-privilege, and all templates require security scan approval.'
      },
      {
        titanId: 'jack',
        titanName: 'Barnaby Jack',
        vector: 'Configuration Drift Suppression During Network Partition',
        description: 'Exploiting a network partition to make unauthorized configuration changes that are never detected because drift detection fails to sync with the central baseline.',
        defense: 'Local drift detection agents with cryptographic state hashing — even during network partitions, drift is logged locally and reconciled on reconnection with alert escalation.'
      },
      {
        titanId: 'kamkar',
        titanName: 'Samy Kamkar',
        vector: 'Secrets Vault Token Cached in CI/CD Pipeline Logs',
        description: 'Vault access tokens accidentally logged in CI/CD pipeline output, exposing them to anyone with read access to the pipeline logs.',
        defense: 'Automated secret redaction in all CI/CD log outputs with pattern-based masking — vault tokens are never persisted in plaintext logs.'
      }
    ]
  },

  {
    id: 'incident_responder',
    title: 'Incident Responder',
    subtitle: 'Breach Containment, Forensics & Recovery',
    badge: 'Response',
    color: 'rose',
    iconName: 'Siren',
    operationalScope: 'Leads real-time breach containment, performs digital forensics, reconstructs attack chains, coordinates cross-team incident response, and drives post-incident recovery and lessons learned.',

    featureBlueprint: {
      overview: 'The Incident Responder requires a unified incident command platform with real-time forensics, automated containment actions, and collaborative war-room coordination to minimize breach impact.',
      categories: [
        {
          name: '1. Real-Time Incident Command & Containment',
          features: [
            {
              title: 'One-Click Asset Isolation & Containment',
              description: 'Instant isolation of compromised hosts, network segments, or cloud resources with a single command, cutting off attacker access while preserving forensic evidence.',
              metric: 'Containment action executed within 60 seconds of confirmation'
            },
            {
              title: 'Live Attack Chain Reconstruction',
              description: 'Automated correlation of SIEM alerts, EDR telemetry, and network flow data to reconstruct the attacker\'s kill chain progression in real-time.',
              metric: 'Attack chain visualized within 5 minutes of first alert'
            }
          ]
        },
        {
          name: '2. Digital Forensics & Evidence Preservation',
          features: [
            {
              title: 'Chain-of-Custody Evidence Vault',
              description: 'Cryptographically hashed forensic evidence (memory dumps, disk images, network captures) with tamper-proof chain-of-custody tracking for legal proceedings.',
              metric: '100% evidence integrity verifiable in court'
            },
            {
              title: 'Post-Incident Timeline & Root Cause Analysis',
              description: 'Automated generation of incident timelines, root cause analysis reports, and remediation recommendations with lessons-learned tracking.',
              metric: 'Post-incident report within 48 hours of resolution'
            }
          ]
        }
      ]
    },

    realLifeScenarios: [
      {
        id: 'sec-ir-ir-1',
        scenarioType: 'incident_response',
        title: 'Live Ransomware Containment in Healthcare Environment',
        context: 'A hospital\'s EMR system is hit by ransomware during business hours. The Incident Responder must contain the spread while maintaining critical patient care systems online.',
        workflow: [
          'Step 1: SOC detects mass file encryption on 8 servers in the EMR cluster — Incident Responder is paged immediately.',
          'Step 2: Responder opens Incident Command and isolates the 8 affected servers from the network while keeping the backup EMR system online for patient care.',
          'Step 3: Responder captures volatile memory from affected hosts before isolation, preserving ransomware process artifacts for forensic analysis.',
          'Step 4: Responder coordinates with IT to restore from immutable backups, verifies the ransomware variant against threat intel, and confirms no data exfiltration occurred.'
        ],
        businessImpact: 'Maintains patient care continuity, recovers all systems within 6 hours, and preserves forensic evidence for law enforcement.'
      },
      {
        id: 'sec-ir-tm-1',
        scenarioType: 'threat_modeling',
        title: 'Attack Chain Reconstruction from Multi-Stage Breach',
        context: 'A sophisticated APT group breached the network through a phishing campaign, established persistence, and moved laterally for 30 days before detection. The Incident Responder must reconstruct the full attack chain.',
        workflow: [
          'Step 1: Responder pulls 30 days of SIEM logs, EDR telemetry, and network flow data into the Attack Chain Reconstruction tool.',
          'Step 2: System correlates initial phishing email → credential theft → VPN access → lateral movement → domain admin escalation → data staging.',
          'Step 3: Responder identifies 4 persistence mechanisms (scheduled tasks, registry keys, WMI subscriptions, rogue service) and 3 exfiltration channels.',
          'Step 4: Responder generates a MITRE ATT&CK-mapped attack timeline with IOCs for threat intel sharing and creates a remediation playbook for each stage.'
        ],
        businessImpact: 'Reconstructs the full 30-day attack chain, identifies all persistence mechanisms, and feeds IOCs to the SOC for future detection.'
      },
      {
        id: 'sec-ir-ca-1',
        scenarioType: 'compliance_audit',
        title: 'Incident Response Plan Audit & Tabletop Exercise',
        context: 'The organization must demonstrate to regulators that its incident response plan is tested, effective, and compliant with NIST SP 800-61 requirements.',
        workflow: [
          'Step 1: Responder opens the IR Plan Audit module and maps all NIST SP 800-61 requirements to existing IR procedures.',
          'Step 2: System identifies 3 gaps: no documented escalation criteria for CISO notification, missing evidence preservation procedures for cloud environments, and no post-incident lessons-learned tracking.',
          'Step 3: Responder updates the IR plan to close all 3 gaps and conducts a tabletop exercise simulating a cloud data breach with 12 participants.',
          'Step 4: Tabletop exercise results show 92% effectiveness score, with 2 improvement actions logged for the next quarterly review cycle.'
        ],
        businessImpact: 'Passes regulatory IR plan audit and improves incident response readiness from 78% to 92% effectiveness.'
      }
    ],

    devilsTeamThreats: [
      {
        titanId: 'mitnick',
        titanName: 'Kevin Mitnick',
        vector: 'Incident Responder Credential Theft via Forensic Tool Exploit',
        description: 'Attacker exploits a vulnerability in a forensic analysis tool to steal the responder\'s credentials, gaining access to all incident evidence and containment controls.',
        defense: 'Forensic tools run in isolated air-gapped analysis environments with no network access — credentials are hardware-token based and never stored on analysis machines.'
      },
      {
        titanId: 'geohot',
        titanName: 'George Hotz (Geohot)',
        vector: 'Concurrent Containment Action Race on Shared Infrastructure',
        description: 'Two responders issue conflicting containment commands (isolate vs. preserve) on the same host simultaneously, causing the evidence to be destroyed during isolation.',
        defense: 'Distributed lock on containment actions with mandatory evidence snapshot before isolation — no two responders can act on the same asset without serialized coordination.'
      },
      {
        titanId: 'miller',
        titanName: 'Charlie Miller',
        vector: 'Forensic Evidence File Path Injection',
        description: 'Malicious actor injects a path traversal payload into the evidence collection script, causing forensic data to be written to an attacker-controlled location.',
        defense: 'Strict Zod validation on all evidence file paths: canonical path resolution, no traversal sequences (../), and write-only access to the evidence vault.'
      },
      {
        titanId: 'jack',
        titanName: 'Barnaby Jack',
        vector: 'Evidence Vault Desynchronization During Network Partition',
        description: 'Exploiting a network partition to modify or delete forensic evidence in the local vault before it syncs to the central evidence repository.',
        defense: 'Write-once-read-many (WORM) storage for all forensic evidence with local cryptographic hashing — any modification attempt is detected on sync reconciliation.'
      },
      {
        titanId: 'kamkar',
        titanName: 'Samy Kamkar',
        vector: 'Attack Chain Data Exposure in Shared Incident Workspace',
        description: 'Attack chain reconstruction data containing sensitive IOCs and internal network topology cached in the incident workspace accessible to unauthorized team members.',
        defense: 'Role-based access control on all incident data with need-to-know enforcement — attack chain data is encrypted and accessible only to assigned incident responders.'
      }
    ]
  },

  {
    id: 'pen_tester',
    title: 'Penetration Tester',
    subtitle: 'Red Team Operations & Vulnerability Discovery',
    badge: 'Red Team',
    color: 'purple',
    iconName: 'Crosshair',
    operationalScope: 'Conducts authorized red team engagements, discovers exploitable vulnerabilities through manual and automated testing, validates remediation effectiveness, and produces actionable findings reports.',

    featureBlueprint: {
      overview: 'The Penetration Tester requires a comprehensive testing platform with attack simulation, vulnerability validation, and detailed reporting to continuously test the organization\'s defensive posture.',
      categories: [
        {
          name: '1. Attack Simulation & Vulnerability Discovery',
          features: [
            {
              title: 'Automated + Manual Exploit Framework Integration',
              description: 'Integration with industry-standard frameworks (Metasploit, Burp Suite, Nuclei) with custom exploit module development for organization-specific attack vectors.',
              metric: 'Zero false positives in validated exploit findings'
            },
            {
              title: 'Red Team Campaign Orchestrator',
              description: 'Multi-week red team engagement planning with attack objective tracking, IOC management, and blue team detection gap analysis.',
              metric: 'Average detection time measured for each attack objective'
            }
          ]
        },
        {
          name: '2. Findings Validation & Reporting',
          features: [
            {
              title: 'Exploit Reproducibility & Impact Scoring',
              description: 'Every finding includes a step-by-step reproduction guide, CVSS v3.1 score, and business impact assessment with remediation verification.',
              metric: '100% of findings reproducible by remediation team'
            },
            {
              title: 'Detection Gap Analysis & Purple Team Feedback',
              description: 'Cross-references each successful attack technique with SOC detection rules, identifying which attacks were caught vs. missed, feeding improvements back to the blue team.',
              metric: 'Detection coverage improved by 25% per engagement'
            }
          ]
        }
      ]
    },

    realLifeScenarios: [
      {
        id: 'sec-pt-ir-1',
        scenarioType: 'incident_response',
        title: 'Post-Breach Exploit Verification & Scope Assessment',
        context: 'Following a confirmed breach, the Penetration Tester is brought in to verify whether the attacker exploited a known vulnerability or a zero-day, and to assess what other systems are at risk.',
        workflow: [
          'Step 1: Pen Tester receives the incident forensics report identifying the initial entry point as an external-facing API.',
          'Step 2: Pen Tester reproduces the exploit against a test instance of the API, confirming it is CVE-2026-XXXX with a CVSS 9.8 score.',
          'Step 3: Pen Tester scans all external-facing systems for the same vulnerability, identifying 3 additional affected endpoints across 2 business units.',
          'Step 4: Pen Tester produces an exploit verification report with reproduction steps, affected asset list, and emergency remediation recommendations for the Incident Responder.'
        ],
        businessImpact: 'Identifies 3 additional vulnerable endpoints before the attacker does, enabling proactive patching and preventing further breach expansion.'
      },
      {
        id: 'sec-pt-tm-1',
        scenarioType: 'threat_modeling',
        title: 'Red Team Engagement: Multi-Stage Attack Path Discovery',
        context: 'A 4-week red team engagement targets the organization\'s cloud infrastructure. The Penetration Tester must discover and document the full attack path from external exposure to sensitive data access.',
        workflow: [
          'Step 1: Pen Tester begins reconnaissance: identifies 12 external-facing services, 3 exposed S3 buckets, and 2 leaked API keys in public GitHub repos.',
          'Step 2: Pen Tester leverages the leaked API key to gain read access to the cloud environment, then exploits a misconfigured IAM role for privilege escalation.',
          'Step 3: Pen Tester moves laterally to a database server using stolen credentials and extracts a sample of 500 customer records (with data masking to prevent real exposure).',
          'Step 4: Pen Tester documents the full attack path with MITRE ATT&CK mapping, detection timestamps, and produces a purple team report showing the SOC detected only 2 of 8 attack stages.'
        ],
        businessImpact: 'Identifies a critical multi-stage attack path and improves SOC detection coverage from 25% to 75% through purple team feedback.'
      },
      {
        id: 'sec-pt-ca-1',
        scenarioType: 'compliance_audit',
        title: 'PCI-DSS Penetration Test Compliance Reporting',
        context: 'The organization processes credit card payments and must pass an annual PCI-DSS penetration test covering all systems within the cardholder data environment (CDE).',
        workflow: [
          'Step 1: Pen Tester scopes the PCI-DSS assessment: 8 servers, 3 network segments, and 2 applications within the CDE boundary.',
          'Step 2: Pen Tester conducts network, application, and wireless penetration tests over 2 weeks, discovering 4 medium and 2 high-severity findings.',
          'Step 3: Pen Tester validates all findings with proof-of-concept exploits and produces a PCI-DSS Requirement 11.4 compliance report.',
          'Step 4: After remediation, Pen Tester re-tests all 6 findings, confirms closure, and issues the final attestation report for the QSA auditor.'
        ],
        businessImpact: 'Passes PCI-DSS annual penetration test requirement and avoids $5,000-$100,000 monthly non-compliance fines.'
      }
    ],

    devilsTeamThreats: [
      {
        titanId: 'mitnick',
        titanName: 'Kevin Mitnick',
        vector: 'Red Team Credential Reuse After Engagement',
        description: 'Test credentials created during a red team engagement are not properly rotated, and an attacker later discovers and reuses them for real intrusion.',
        defense: 'All red team credentials are time-bound with automatic expiry at engagement end, and a post-engagement credential rotation is mandatory and verified.'
      },
      {
        titanId: 'geohot',
        titanName: 'George Hotz (Geohot)',
        vector: 'Concurrent Exploit Execution Race on Shared Test Target',
        description: 'Running two exploit modules simultaneously against the same target creates a race condition, causing one exploit to crash the service and corrupting the other\'s evidence.',
        defense: 'Serialized exploit execution queue with target-level locking — no two exploit modules can execute against the same target simultaneously.'
      },
      {
        titanId: 'miller',
        titanName: 'Charlie Miller',
        vector: 'Exploit Payload Injection via Fuzzed Test Parameters',
        description: 'Injecting malicious parameters into the penetration testing framework itself, causing it to execute arbitrary commands on the tester\'s machine.',
        defense: 'Strict Zod validation on all test parameters: payloads must match expected patterns, no arbitrary command execution, and all test inputs are sandboxed.'
      },
      {
        titanId: 'jack',
        titanName: 'Barnaby Jack',
        vector: 'Findings Report Desynchronization & Evidence Loss',
        description: 'Exploiting a sync failure to alter or delete penetration test findings before they are submitted to the central reporting system.',
        defense: 'Findings are written to WORM storage with local cryptographic hashing — any tampering attempt is detected on sync and escalated to the engagement lead.'
      },
      {
        titanId: 'kamkar',
        titanName: 'Samy Kamkar',
        vector: 'Exploit Code & IOCs Leaked via Test Report Cache',
        description: 'Penetration test reports containing exploit code, IOCs, and internal network diagrams cached in an unencrypted local workspace accessible to unauthorized users.',
        defense: 'All test reports are encrypted at rest with role-based decryption — exploit code and network diagrams are need-to-know restricted and auto-purged after report delivery.'
      }
    ]
  },

  {
    id: 'compliance_officer',
    title: 'Compliance Officer',
    subtitle: 'Regulatory Frameworks, Audit Readiness & Policy Enforcement',
    badge: 'Compliance',
    color: 'amber',
    iconName: 'Scale',
    operationalScope: 'Manages regulatory compliance across GDPR, SOC 2, ISO 27001, PCI-DSS, HIPAA, and industry-specific frameworks, conducts internal audits, and ensures policy enforcement across all business units.',

    featureBlueprint: {
      overview: 'The Compliance Officer requires a unified compliance management platform with framework mapping, automated evidence collection, and real-time gap detection to maintain continuous audit readiness.',
      categories: [
        {
          name: '1. Framework Mapping & Gap Analysis',
          features: [
            {
              title: 'Multi-Framework Control Mapping',
              description: 'Maps a single control to multiple compliance frameworks (GDPR, SOC 2, ISO 27001, PCI-DSS, HIPAA), eliminating redundant evidence collection and reducing audit effort.',
              metric: '60% reduction in duplicate evidence collection'
            },
            {
              title: 'Real-Time Compliance Gap Detection',
              description: 'Continuous monitoring of control implementation status against framework requirements, with automated gap alerts and remediation task assignment.',
              metric: 'Zero compliance gaps undetected for >30 days'
            }
          ]
        },
        {
          name: '2. Evidence Collection & Audit Management',
          features: [
            {
              title: 'Automated Evidence Collection Pipeline',
              description: 'Auto-gathers control evidence (access logs, config snapshots, policy acknowledgments) on a scheduled basis, eliminating manual evidence gathering for audits.',
              metric: '90% of evidence collected automatically'
            },
            {
              title: 'Audit Finding Tracker with Remediation SLA',
              description: 'Tracks all audit findings with severity-based remediation SLAs, automated escalation for overdue items, and auditor-visible status dashboards.',
              metric: 'Critical findings remediated within 15 days'
            }
          ]
        }
      ]
    },

    realLifeScenarios: [
      {
        id: 'sec-co-ir-1',
        scenarioType: 'incident_response',
        title: 'GDPR 72-Hour Breach Notification Compliance',
        context: 'A data breach is confirmed at 2:00 AM involving 50,000 EU customer records. The Compliance Officer must ensure GDPR Article 33 notification to the supervisory authority within 72 hours.',
        workflow: [
          'Step 1: Incident Responder confirms the breach scope: 50,000 EU customer records including names, emails, and partial payment data.',
          'Step 2: Compliance Officer opens the GDPR Notification module and starts the 72-hour countdown clock with milestone tracking.',
          'Step 3: Officer assesses notification requirements: breach nature, data categories, approximate affected individuals, likely consequences, and mitigation measures.',
          'Step 4: Officer files the notification with the Irish DPC within 68 hours, documents the notification reference number, and prepares the customer communication plan under Article 34.'
        ],
        businessImpact: 'Meets the 72-hour GDPR notification deadline and avoids fines of up to €10M or 2% of global annual turnover.'
      },
      {
        id: 'sec-co-tm-1',
        scenarioType: 'threat_modeling',
        title: 'Compliance Gap Analysis for New Product Launch',
        context: 'The organization is launching a new mobile payment product in the EU and US markets. The Compliance Officer must identify all regulatory requirements and ensure compliance before launch.',
        workflow: [
          'Step 1: Officer opens the Framework Mapping module and selects the new product scope: mobile payments, EU + US markets, customer financial data.',
          'Step 2: System identifies applicable frameworks: PSD2 (EU payments), PCI-DSS (card data), GDPR (EU customer data), CCPA (CA customer data), and GLBA (US financial).',
          'Step 3: Officer runs a gap analysis: 23 requirements identified, 8 currently unmet — primarily around strong customer authentication (PSD2 SCA) and data residency.',
          'Step 4: Officer creates a compliance remediation plan with 12-week timeline, assigns owners for each gap, and sets a launch gate requiring 100% compliance before go-live.'
        ],
        businessImpact: 'Prevents regulatory violations at product launch and avoids potential fines of €20M+ for PSD2 and GDPR non-compliance.'
      },
      {
        id: 'sec-co-ca-1',
        scenarioType: 'compliance_audit',
        title: 'ISO 27001 Surveillance Audit Preparation',
        context: 'The organization faces its annual ISO 27001 surveillance audit. The Compliance Officer must ensure all 114 Annex A controls are implemented, evidenced, and operating effectively.',
        workflow: [
          'Step 1: Officer opens the ISO 27001 Compliance Dashboard and maps all 114 Annex A controls to existing implementations.',
          'Step 2: Automated evidence collection pipeline gathers 92% of required evidence: access reviews, risk assessments, policy acknowledgments, and security training records.',
          'Step 3: Officer identifies 5 controls with insufficient evidence and assigns remediation tasks with 2-week deadlines before the audit date.',
          'Step 4: After remediation, Officer generates the complete evidence package, conducts an internal audit, and confirms 100% control coverage for the surveillance auditor.'
        ],
        businessImpact: 'Passes ISO 27001 surveillance audit and maintains certification critical for $25M enterprise contracts requiring ISO compliance.'
      }
    ],

    devilsTeamThreats: [
      {
        titanId: 'mitnick',
        titanName: 'Kevin Mitnick',
        vector: 'Compliance Dashboard Access via Stolen Auditor Credentials',
        description: 'Attacker steals the Compliance Officer\'s credentials and accesses the compliance dashboard, exposing all regulatory findings, gap analyses, and remediation plans.',
        defense: 'Step-up MFA for compliance dashboard access with role-based access control — auditor credentials are hardware-token bound with session timeout after 15 minutes of inactivity.'
      },
      {
        titanId: 'geohot',
        titanName: 'George Hotz (Geohot)',
        vector: 'Concurrent Evidence Collection Race on Shared Control',
        description: 'Two evidence collection jobs run simultaneously against the same control, producing conflicting evidence snapshots that confuse the audit trail.',
        defense: 'Serialized evidence collection with distributed locks on control IDs — no two collection jobs can target the same control simultaneously.'
      },
      {
        titanId: 'miller',
        titanName: 'Charlie Miller',
        vector: 'Compliance Framework Injection via Fuzzed Control Mapping',
        description: 'Injecting a malicious control mapping that links a non-existent control to a critical framework requirement, creating a false compliance signal.',
        defense: 'Strict Zod validation on all control-to-framework mappings: control IDs must exist in the control registry, framework IDs must be from an approved list, and mappings require dual-authorization.'
      },
      {
        titanId: 'jack',
        titanName: 'Barnaby Jack',
        vector: 'Audit Evidence Tampering During Sync Failure',
        description: 'Exploiting a sync failure to modify or delete audit evidence before it reaches the central evidence repository, masking non-compliance.',
        defense: 'WORM storage for all audit evidence with local cryptographic hashing — tampering is detected on sync reconciliation and escalated to the audit committee.'
      },
      {
        titanId: 'kamkar',
        titanName: 'Samy Kamkar',
        vector: 'Regulatory Finding Data Exposure in Compliance Report Cache',
        description: 'Compliance reports containing regulatory findings, gap analyses, and remediation plans cached in unencrypted browser storage accessible to unauthorized users.',
        defense: 'All compliance reports are server-side generated and delivered via ephemeral encrypted streams — no regulatory data is persisted in client-side storage.'
      }
    ]
  },

  {
    id: 'soc_analyst',
    title: 'SOC Analyst',
    subtitle: 'Security Operations Center — Detection & Triage',
    badge: 'SOC',
    color: 'cyan',
    iconName: 'Radar',
    operationalScope: 'Monitors security events in real-time, triages alerts, performs initial incident investigation, tunes detection rules, and escalates confirmed threats to the Incident Response team.',

    featureBlueprint: {
      overview: 'The SOC Analyst requires a high-fidelity SIEM with intelligent alert triage, automated enrichment, and low false-positive rates to maintain effective 24/7 threat detection.',
      categories: [
        {
          name: '1. Real-Time Threat Detection & Alert Triage',
          features: [
            {
              title: 'AI-Assisted Alert Triage & Enrichment',
              description: 'Machine learning models auto-triage alerts by correlating with threat intel, user behavior baselines, and historical false-positive patterns, reducing analyst fatigue.',
              metric: '70% reduction in false-positive alert volume'
            },
            {
              title: 'Unified SIEM & EDR Correlation Console',
              description: 'Single pane of glass correlating SIEM log events, EDR endpoint telemetry, network IDS alerts, and cloud security events with automated IOC enrichment.',
              metric: 'Mean time to detect (MTTD) < 10 minutes for critical threats'
            }
          ]
        },
        {
          name: '2. Detection Engineering & Threat Hunting',
          features: [
            {
              title: 'Detection Rule Lifecycle Management',
              description: 'Version-controlled detection rule repository with CI/CD testing, false-positive tracking, and automated performance scoring per rule.',
              metric: 'Every detection rule tested before deployment'
            },
            {
              title: 'Proactive Threat Hunting Workbench',
              description: 'Interactive threat hunting interface with SIEM query builder, IOC search across all data sources, and hypothesis-driven hunt tracking.',
              metric: 'Minimum 2 threat hunts per week per analyst'
            }
          ]
        }
      ]
    },

    realLifeScenarios: [
      {
        id: 'sec-soc-ir-1',
        scenarioType: 'incident_response',
        title: 'Real-Time Credential Stuffing Attack Detection & Triage',
        context: 'At 3:00 AM, the SOC detects a massive credential stuffing attack targeting the customer login API — 50,000 login attempts from 2,000 IPs in 15 minutes.',
        workflow: [
          'Step 1: SIEM fires a high-severity alert: anomalous login velocity — 50,000 attempts in 15 minutes with a 0.3% success rate (150 accounts compromised).',
          'Step 2: SOC Analyst opens the alert in the triage console — AI enrichment identifies the IP cluster as a known botnet and cross-references with threat intel feeds.',
          'Step 3: Analyst triggers automated containment: rate-limiting on the login API, automatic password reset for the 150 compromised accounts, and IP blocklist update.',
          'Step 4: Analyst escalates to Incident Responder with a full triage report, creates a detection rule for this botnet\'s fingerprint, and documents the event for the daily SOC handoff.'
        ],
        businessImpact: 'Contains the credential stuffing attack within 15 minutes, protects 150 compromised accounts, and prevents unauthorized access to customer data.'
      },
      {
        id: 'sec-soc-tm-1',
        scenarioType: 'threat_modeling',
        title: 'Threat Intelligence Feed Analysis & Detection Gap Identification',
        context: 'A new threat intelligence report describes a novel attack technique targeting cloud IAM services. The SOC Analyst must analyze the report and identify detection gaps.',
        workflow: [
          'Step 1: Analyst receives a CISA alert about a new cloud IAM attack technique (APT-29 TTP) involving temporary token abuse.',
          'Step 2: Analyst opens the Threat Hunting Workbench and searches historical SIEM data for indicators of this technique over the past 90 days.',
          'Step 3: Analyst identifies 3 suspicious IAM token usage patterns that were not caught by existing detection rules — confirming a detection gap.',
          'Step 4: Analyst writes and tests 3 new detection rules targeting the IAM token abuse pattern, deploys them via the detection rule CI/CD pipeline, and validates zero false positives.'
        ],
        businessImpact: 'Closes a critical detection gap for a novel APT technique and improves cloud IAM threat detection coverage by 15%.'
      },
      {
        id: 'sec-soc-ca-1',
        scenarioType: 'compliance_audit',
        title: 'Log Retention & Monitoring Compliance Verification',
        context: 'An upcoming audit requires evidence that all security logs are retained for 12 months and that critical alerts are monitored 24/7 with documented response times.',
        workflow: [
          'Step 1: Analyst opens the Log Retention Compliance module and selects the 12-month audit window.',
          'Step 2: System verifies log retention: 100% of SIEM logs retained for 12 months, 98.7% of EDR telemetry retained (1.3% gap due to a storage outage in March).',
          'Step 3: Analyst documents the 1.3% retention gap with root cause analysis and remediation evidence (storage capacity increased, redundancy added).',
          'Step 4: Analyst generates a 24/7 monitoring compliance report showing average alert response time of 8 minutes (SLA: 15 minutes) and 99.97% monitoring uptime.'
        ],
        businessImpact: 'Passes log retention and monitoring compliance audit with documented evidence, avoiding $50K+ in non-compliance penalties.'
      }
    ],

    devilsTeamThreats: [
      {
        titanId: 'mitnick',
        titanName: 'Kevin Mitnick',
        vector: 'SOC Analyst Credential Theft via Phishing Lure',
        description: 'Attacker sends a convincing phishing email disguised as a SIEM alert notification, tricking the analyst into entering credentials on a fake login page.',
        defense: 'SIEM alert notifications never contain login links — all alerts are accessed through the authenticated SIEM console with hardware-token MFA.'
      },
      {
        titanId: 'geohot',
        titanName: 'George Hotz (Geohot)',
        vector: 'Alert Triage Race Condition on Concurrent Alert Updates',
        description: 'Two analysts triage the same alert simultaneously, causing conflicting status updates and potentially closing an alert that should be escalated.',
        defense: 'Distributed lock on alert IDs — once an analyst opens an alert for triage, it is locked to that analyst until they release it or time out.'
      },
      {
        titanId: 'miller',
        titanName: 'Charlie Miller',
        vector: 'Detection Rule Injection via Fuzzed SIEM Query Parameters',
        description: 'Injecting malicious SIEM query parameters that cause the detection engine to execute arbitrary commands or exfiltrate data through query results.',
        defense: 'Strict Zod validation on all SIEM query parameters: queries must match allowed patterns, no arbitrary command execution, and all query inputs are parameterized.'
      },
      {
        titanId: 'jack',
        titanName: 'Barnaby Jack',
        vector: 'SIEM Log Ingestion Gap During Network Partition',
        description: 'Exploiting a network partition to drop security logs before they reach the SIEM, creating a blind spot during the partition window.',
        defense: 'Local log buffering with cryptographic sequencing — all logs are queued locally during partitions and reconciled on reconnection with gap detection alerts.'
      },
      {
        titanId: 'kamkar',
        titanName: 'Samy Kamkar',
        vector: 'Alert Triage Data Exposure in Shared SOC Dashboard',
        description: 'Alert triage data containing IOCs, internal IP addresses, and user activity cached in the SOC dashboard accessible to unauthorized users.',
        defense: 'Role-based access control on all SOC data with need-to-know enforcement — alert data is encrypted and accessible only to assigned SOC analysts.'
      }
    ]
  },

  {
    id: 'dpo',
    title: 'Data Protection Officer',
    subtitle: 'Privacy Governance, DPIA & Data Subject Rights',
    badge: 'Privacy',
    color: 'indigo',
    iconName: 'FileLock',
    operationalScope: 'Ensures compliance with data protection regulations (GDPR, CCPA), conducts Data Protection Impact Assessments (DPIAs), manages data subject rights requests, and advises on privacy-by-design principles.',

    featureBlueprint: {
      overview: 'The DPO requires a comprehensive privacy management platform with data flow mapping, automated DPIA workflows, and data subject rights fulfillment to maintain continuous privacy compliance.',
      categories: [
        {
          name: '1. Data Flow Mapping & Privacy Impact Assessment',
          features: [
            {
              title: 'Automated Data Flow Discovery & Mapping',
              description: 'Discovers and maps all personal data flows across systems, databases, and third-party processors, maintaining a live data processing register (Record of Processing Activities).',
              metric: '100% of personal data flows mapped and documented'
            },
            {
              title: 'DPIA Workflow with Risk Scoring',
              description: 'Structured Data Protection Impact Assessment workflow with automated risk scoring, residual risk calculation, and DPA (Data Processing Agreement) tracking for third parties.',
              metric: 'DPIA completed before any high-risk processing begins'
            }
          ]
        },
        {
          name: '2. Data Subject Rights & Breach Response',
          features: [
            {
              title: 'Automated Data Subject Rights Fulfillment',
              description: 'One-click fulfillment for access, rectification, erasure, portability, and objection requests with automated data discovery across all systems and 30-day SLA tracking.',
              metric: '100% of DSR requests fulfilled within 30 days'
            },
            {
              title: 'Privacy Breach Impact Assessment Engine',
              description: 'Automated assessment of whether a security breach constitutes a personal data breach requiring regulatory notification, with risk-to-rights-and-freedoms scoring.',
              metric: 'Privacy impact assessed within 24 hours of breach confirmation'
            }
          ]
        }
      ]
    },

    realLifeScenarios: [
      {
        id: 'sec-dpo-ir-1',
        scenarioType: 'incident_response',
        title: 'Data Breach Privacy Impact Assessment & Notification Decision',
        context: 'A security breach has exposed a database containing 80,000 customer records including names, emails, phone numbers, and purchase histories. The DPO must determine if this constitutes a notifiable personal data breach under GDPR.',
        workflow: [
          'Step 1: DPO opens the Privacy Breach Impact Assessment module and inputs the breach details: 80,000 records, data types, and exposure duration.',
          'Step 2: System performs automated risk scoring: likelihood of identity theft (medium), financial loss (low), and reputational damage (high) — overall risk to rights and freedoms: HIGH.',
          'Step 3: DPO determines this is a notifiable personal data breach under GDPR Article 33 and coordinates with the Compliance Officer for the 72-hour notification.',
          'Step 4: DPO prepares the data subject communication plan under Article 34 (high risk to rights and freedoms requires notification to affected individuals) and documents the full DPIA.'
        ],
        businessImpact: 'Ensures GDPR-compliant breach response, avoids €10M+ in potential fines, and protects affected individuals through timely notification.'
      },
      {
        id: 'sec-dpo-tm-1',
        scenarioType: 'threat_modeling',
        title: 'Privacy Threat Modeling for New AI Analytics Feature',
        context: 'The product team wants to launch an AI-powered customer analytics feature that processes behavioral data to generate insights. The DPO must conduct a DPIA to identify privacy risks before launch.',
        workflow: [
          'Step 1: DPO opens the DPIA Workflow module and defines the processing: behavioral data analysis, 500K users, automated profiling, and third-party AI processor involvement.',
          'Step 2: System identifies privacy risks: automated decision-making without explicit consent (high), data minimization violation (medium), and third-party processor risk (medium).',
          'Step 3: DPO recommends privacy-by-design controls: explicit opt-in consent, data minimization through aggregation, differential privacy on outputs, and DPA with the AI processor.',
          'Step 4: DPO signs off on the DPIA with residual risk = LOW (after controls), approves the feature launch with conditions, and files the DPIA in the processing register.'
        ],
        businessImpact: 'Enables AI feature launch with privacy-by-design controls, avoiding GDPR Article 22 violations and potential €20M fines for automated decision-making without safeguards.'
      },
      {
        id: 'sec-dpo-ca-1',
        scenarioType: 'compliance_audit',
        title: 'GDPR Data Subject Rights Audit & Response SLA Verification',
        context: 'The organization faces a regulatory audit of its data subject rights (DSR) handling. The DPO must demonstrate that all DSR requests were fulfilled within the 30-day GDPR requirement.',
        workflow: [
          'Step 1: DPO opens the DSR Compliance Dashboard and selects the 12-month audit period.',
          'Step 2: System shows 342 DSR requests received: 180 access requests, 95 erasure requests, 42 portability requests, and 25 objection requests — all with response timestamps.',
          'Step 3: DPO identifies 3 requests that exceeded the 30-day SLA (31, 33, and 35 days) and documents the root cause: a legacy system data discovery delay.',
          'Step 4: DPO generates the DSR compliance report showing 99.1% on-time fulfillment rate, remediation evidence for the 3 late requests, and process improvements implemented.'
        ],
        businessImpact: 'Passes regulatory DSR audit with 99.1% compliance rate and documented remediation, avoiding fines and maintaining customer trust.'
      }
    ],

    devilsTeamThreats: [
      {
        titanId: 'mitnick',
        titanName: 'Kevin Mitnick',
        vector: 'DPO Credential Theft via Fake DSR Request Email',
        description: 'Attacker sends a fake data subject rights request email with a malicious attachment, tricking the DPO into opening it and compromising their credentials.',
        defense: 'All DSR requests must be submitted through the authenticated DSR portal — email submissions are quarantined and verified before processing, with hardware-token MFA for DPO access.'
      },
      {
        titanId: 'geohot',
        titanName: 'George Hotz (Geohot)',
        vector: 'Concurrent DSR Fulfillment Race on Shared Customer Record',
        description: 'Two concurrent DSR requests (erasure + portability) for the same customer create a race condition, causing partial data deletion and incomplete export.',
        defense: 'Serialized DSR processing with customer-level locks — no two DSR requests can process the same customer simultaneously, with automatic queueing.'
      },
      {
        titanId: 'miller',
        titanName: 'Charlie Miller',
        vector: 'DPIA Risk Score Manipulation via Fuzzed Assessment Inputs',
        description: 'Injecting manipulated risk assessment inputs to artificially lower the DPIA risk score, enabling high-risk processing to proceed without proper safeguards.',
        defense: 'Strict Zod validation on all DPIA inputs: risk likelihood and impact must be from an approved enum, scoring is server-side computed, and results require dual DPO sign-off for high-risk processing.'
      },
      {
        titanId: 'jack',
        titanName: 'Barnaby Jack',
        vector: 'Data Flow Map Desynchronization During Network Partition',
        description: 'Exploiting a network partition to modify the data processing register before sync, hiding a new data processing activity from regulatory visibility.',
        defense: 'Cryptographic hash chain on all data processing register entries — any modification during or after a partition is detected on sync reconciliation and escalated.'
      },
      {
        titanId: 'kamkar',
        titanName: 'Samy Kamkar',
        vector: 'Customer PII Exposure in DSR Response Cache',
        description: 'DSR fulfillment responses containing exported customer data (access requests, portability exports) cached in unencrypted browser storage accessible to unauthorized users.',
        defense: 'All DSR responses are server-side generated and delivered via encrypted download links with time-limited access — no customer data is persisted in client-side storage.'
      }
    ]
  }
];

/**
 * Security Cross-Role Interaction Scenarios
 * Adversarial interactions between 2+ security roles where their workflow
 * collision creates exploitable threat surfaces.
 */
export const SECURITY_CROSS_ROLE_SCENARIOS = [
  {
    id: 'sec-crossrole-1',
    title: 'SOC Analyst + Incident Responder: Live Breach Triage Handoff',
    participatingRoles: ['soc_analyst', 'incident_responder'],
    context: 'During a live breach, the SOC Analyst detects and triages the attack, then hands off to the Incident Responder for containment. The handoff boundary is where critical details can be lost or manipulated.',
    workflow: [
      'Step 1: SOC Analyst detects anomalous lateral movement and triages the alert as a confirmed incident with high confidence.',
      'Step 2: Analyst escalates to Incident Responder with a triage report — but the handoff occurs via a shared chat channel without cryptographic integrity verification.',
      'Step 3: Attacker intercepts the chat channel and modifies the triage report to downplay the severity, causing the Responder to deprioritize containment.',
      'Step 4: The 30-minute delay in containment allows the attacker to exfiltrate an additional 20GB of data before isolation is executed.'
    ],
    crossRoleThreats: [
      {
        titanId: 'mitnick',
        vector: 'Triage Report Interception via Compromised Communication Channel',
        description: 'The SOC-to-IR handoff occurs over an unencrypted chat channel that an attacker can intercept and modify, altering the severity assessment.',
        defense: 'All incident handoffs must occur through the authenticated incident command platform with cryptographic message integrity — no handoff data via unencrypted channels.'
      },
      {
        titanId: 'geohot',
        vector: 'Concurrent Triage & Containment Race on Same Asset',
        description: 'The SOC Analyst is still triaging an asset when the Incident Responder initiates containment, causing the triage data to be lost during isolation.',
        defense: 'Mandatory evidence snapshot before any containment action — the SOC triage state is preserved atomically before the IR containment command can execute.'
      }
    ],
    businessImpact: 'A 30-minute handoff delay during a live breach can result in 20GB+ of additional data exfiltration and $500K+ in additional breach costs.'
  },
  {
    id: 'sec-crossrole-2',
    title: 'Compliance Officer + CISO: Audit Finding Suppression',
    participatingRoles: ['compliance_officer', 'ciso'],
    context: 'A compliance audit reveals critical findings that would delay a major product launch. The CISO and Compliance Officer must navigate the tension between business pressure and regulatory compliance.',
    workflow: [
      'Step 1: Compliance Officer identifies 3 critical PCI-DSS findings that would block the product launch.',
      'Step 2: CISO faces pressure from the CEO to proceed with the launch, and requests the Compliance Officer to downgrade the findings to "medium".',
      'Step 3: Compliance Officer modifies the finding severity in the compliance dashboard, bypassing the dual-authorization control.',
      'Step 4: The product launches with unresolved critical compliance gaps, and a subsequent breach exploits one of the suppressed findings.'
    ],
    crossRoleThreats: [
      {
        titanId: 'mitnick',
        vector: 'Finding Severity Manipulation via CISO Pressure',
        description: 'The CISO leverages their executive authority to pressure the Compliance Officer into downgrading findings, bypassing the governance process.',
        defense: 'Finding severity changes require dual-authorization (Compliance Officer + independent audit committee) with immutable audit logging — no single person can modify finding severity.'
      },
      {
        titanId: 'jack',
        vector: 'Audit Evidence Suppression During Sync Delay',
        description: 'The Compliance Officer exploits a sync delay to delete the original high-severity finding evidence before it reaches the central audit repository.',
        defense: 'WORM storage for all audit findings with cryptographic hashing — any deletion or modification is detected on sync and escalated to the audit committee.'
      }
    ],
    businessImpact: 'Suppressing critical compliance findings to enable a product launch can result in $5M+ in regulatory fines and breach costs if the finding is later exploited.'
  },
  {
    id: 'sec-crossrole-3',
    title: 'Penetration Tester + Security Engineer: Exploit Code Leakage',
    participatingRoles: ['pen_tester', 'security_engineer'],
    context: 'After a red team engagement, the Penetration Tester hands exploit code and findings to the Security Engineer for remediation. The transfer of exploit code creates a data leakage risk.',
    workflow: [
      'Step 1: Pen Tester completes the engagement and produces a findings report with exploit code, IOCs, and network diagrams.',
      'Step 2: Pen Tester shares the report with the Security Engineer via a shared drive with broad access permissions.',
      'Step 3: A developer with access to the shared drive copies the exploit code into a public repository for "reference", leaking the organization\'s vulnerabilities.',
      'Step 4: An external attacker discovers the exploit code in the public repo and uses it to compromise the organization before patches are deployed.'
    ],
    crossRoleThreats: [
      {
        titanId: 'kamkar',
        vector: 'Exploit Code Leakage via Overly Permissive Shared Drive',
        description: 'The shared drive containing exploit code and findings has broad access permissions, allowing non-security personnel to access and leak sensitive attack data.',
        defense: 'Need-to-know access control on all red team deliverables — exploit code is encrypted and accessible only to assigned security personnel with auto-purge after remediation verification.'
      },
      {
        titanId: 'miller',
        vector: 'Exploit Code Injection via Fuzzed Remediation Ticket',
        description: 'An attacker injects malicious code into a remediation ticket disguised as exploit code, causing the Security Engineer to execute it during analysis.',
        defense: 'All exploit code in remediation tickets is sandboxed and validated — no code execution outside isolated analysis environments, with strict input validation on all ticket attachments.'
      }
    ],
    businessImpact: 'Leaking exploit code before remediation can enable external attackers to compromise the organization, resulting in $3M+ in breach costs.'
  },
  {
    id: 'sec-crossrole-4',
    title: 'DPO + Incident Responder: Privacy Impact vs. Forensic Preservation Conflict',
    participatingRoles: ['dpo', 'incident_responder'],
    context: 'During a breach investigation, the Incident Responder needs to preserve all forensic evidence including customer PII, while the DPO needs to minimize PII exposure and potentially erase data under GDPR erasure principles.',
    workflow: [
      'Step 1: Incident Responder captures a forensic disk image containing 50,000 customer PII records as evidence.',
      'Step 2: DPO identifies that the forensic evidence contains unencrypted PII and requests immediate erasure or encryption to comply with data minimization principles.',
      'Step 3: Responder argues that erasing or encrypting the evidence would compromise the investigation and potential legal proceedings.',
      'Step 4: Both roles must agree on a compromise: PII is encrypted in the forensic evidence vault with access restricted to authorized investigators, with a documented legal basis for retention.'
    ],
    crossRoleThreats: [
      {
        titanId: 'kamkar',
        vector: 'PII Exposure in Forensic Evidence Vault',
        description: 'The forensic evidence vault containing customer PII is accessible to all incident responders, violating the data minimization principle.',
        defense: 'Role-based access control on forensic evidence with PII field-level encryption — only specifically authorized investigators can decrypt PII fields, with full access logging.'
      },
      {
        titanId: 'jack',
        vector: 'Evidence Retention Period Manipulation',
        description: 'The DPO\'s retention enforcement system deletes forensic evidence before the legal retention period expires, destroying evidence needed for prosecution.',
        defense: 'Legal hold flags on all forensic evidence that override retention policies — evidence with an active legal hold cannot be deleted until the hold is released by legal counsel.'
      }
    ],
    businessImpact: 'Balancing privacy compliance with forensic preservation prevents both GDPR violations and destruction of evidence needed for legal proceedings.'
  }
];

// Severity ratings for security role + titan threat combinations
const SECURITY_THREAT_SEVERITY_MAP = {
  'ciso_mitnick': 'critical',
  'ciso_geohot': 'high',
  'ciso_miller': 'critical',
  'ciso_jack': 'critical',
  'ciso_kamkar': 'critical',
  'security_engineer_mitnick': 'critical',
  'security_engineer_geohot': 'high',
  'security_engineer_miller': 'critical',
  'security_engineer_jack': 'high',
  'security_engineer_kamkar': 'high',
  'incident_responder_mitnick': 'critical',
  'incident_responder_geohot': 'high',
  'incident_responder_miller': 'high',
  'incident_responder_jack': 'critical',
  'incident_responder_kamkar': 'high',
  'pen_tester_mitnick': 'high',
  'pen_tester_geohot': 'medium',
  'pen_tester_miller': 'high',
  'pen_tester_jack': 'medium',
  'pen_tester_kamkar': 'critical',
  'compliance_officer_mitnick': 'critical',
  'compliance_officer_geohot': 'medium',
  'compliance_officer_miller': 'critical',
  'compliance_officer_jack': 'critical',
  'compliance_officer_kamkar': 'critical',
  'soc_analyst_mitnick': 'high',
  'soc_analyst_geohot': 'high',
  'soc_analyst_miller': 'high',
  'soc_analyst_jack': 'high',
  'soc_analyst_kamkar': 'medium',
  'dpo_mitnick': 'high',
  'dpo_geohot': 'high',
  'dpo_miller': 'critical',
  'dpo_jack': 'critical',
  'dpo_kamkar': 'critical',
};

export function getSecurityThreatSeverity(roleId, titanId) {
  return SECURITY_THREAT_SEVERITY_MAP[`${roleId}_${titanId}`] || 'medium';
}

export function getSecurityRoleById(roleId) {
  return SECURITY_ROLES.find(r => r.id === roleId) || SECURITY_ROLES[0];
}

export function getAllSecurityRoles() {
  return SECURITY_ROLES;
}

export function getSecurityCrossRoleScenarios() {
  return SECURITY_CROSS_ROLE_SCENARIOS;
}
