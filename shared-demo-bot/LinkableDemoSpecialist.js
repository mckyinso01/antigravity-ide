/**
 * LinkableAI Autonomous AI Demo Specialist & Interactive Tour Guide
 * Version: 2.4.0 (Enterprise Suite)
 * Author: LinkableAI Core Systems (Founder: Mharc Gatan)
 *
 * Capabilities:
 * - Shadow-DOM encapsulated floating AI avatar & interactive tour widget
 * - Automated DOM spotlighting with smooth-scroll & cutout visual highlighting
 * - Web Speech API voice synthesis narration (with Mute/Unmute toggle)
 * - URL Parameter Prospect Recognition (?prospect=HospitalName&name=ExecutiveName)
 * - Real-time conversational AI Q&A tailored to product vertical
 * - 1-Click Co-Design & Enterprise Meeting Booking modal
 */

(function () {
  if (window.__LINKABLE_DEMO_SPECIALIST_LOADED__) return;
  window.__LINKABLE_DEMO_SPECIALIST_LOADED__ = true;

  // 1. Detect Environment & Host Product Context
  const urlParams = new URLSearchParams(window.location.search);
  const prospectName = urlParams.get('prospect') || urlParams.get('company') || 'Enterprise Partner';
  const executiveName = urlParams.get('name') || urlParams.get('contact') || 'Executive';
  const hostDomain = window.location.hostname.toLowerCase();
  const currentPath = window.location.pathname.toLowerCase();

  let productContext = 'general';
  let productTitle = 'LinkableAI Enterprise Hub';
  let badgeColor = '#00F5FF';

  if (hostDomain.includes('clinical') || currentPath.includes('clinical')) {
    productContext = 'clinical';
    productTitle = 'Clinical AI • ICU Telemetry & EHR OS';
    badgeColor = '#6366F1';
  } else if (hostDomain.includes('sitesafe') || currentPath.includes('sitesafe')) {
    productContext = 'sitesafe';
    productTitle = 'SiteSafe AI • Industrial Safety & Hazard OS';
    badgeColor = '#3B82F6';
  } else if (hostDomain.includes('omnistock') || currentPath.includes('omnistock')) {
    productContext = 'omnistock';
    productTitle = 'OmniStock • Spatial 3D WMS & Logistics';
    badgeColor = '#10B981';
  } else if (hostDomain.includes('saccade') || currentPath.includes('saccade')) {
    productContext = 'saccade';
    productTitle = 'Saccade AI • Visual Attention & Biometric CRO';
    badgeColor = '#F43F5E';
  }

  // 2. Product-Specific Tour Steps
  const TOUR_SCENARIOS = {
    clinical: [
      {
        title: "ICU Real-Time Telemetry & Vitals",
        text: "Real-time biometric telemetry tracking heart rate, SpO2, and MAP with predictive hemodynamic instability alarms.",
        selector: "header, .vitals-container, [data-demo='vitals'], .grid",
        actionText: "Check Hemodynamic Stream"
      },
      {
        title: "FHIR & HL7 Smart EHR Bridging",
        text: "Seamless two-way integration with Epic Systems, Cerner Millennium, and MEDITECH with zero duplicate clinical entry.",
        selector: "nav, .ehr-bridge, [data-demo='ehr'], main",
        actionText: "Verify EHR Bridge"
      },
      {
        title: "Autonomous Clinical Scribe & Co-Design",
        text: "Ambient voice scribe generating structured SOAP notes with automated HIPAA-compliant cryptographic audit trails.",
        selector: "table, .soap-notes, [data-demo='scribe'], footer",
        actionText: "Book Clinical Co-Design"
      }
    ],
    sitesafe: [
      {
        title: "Computer Vision Hazard Detection",
        text: "Autonomous video inference monitoring PPE compliance, perimeter breaches, and heavy machinery collision vectors in sub-15ms.",
        selector: "header, .hazard-feed, [data-demo='hazard'], .grid",
        actionText: "Inspect Live Incident Feed"
      },
      {
        title: "Autonomous Weather & Evacuation Delays",
        text: "Predictive microclimate radar tracking lightning radii, wind shear, and heat stress thresholds to prevent OSHA stop-work fines.",
        selector: "nav, .weather-radar, [data-demo='weather'], main",
        actionText: "Run Safety Protocol"
      },
      {
        title: "Enterprise Safety Certification & Audit",
        text: "Tamper-proof compliance logs with automated digital sign-offs for general contractors and insurance underwriters.",
        selector: "table, .compliance-log, [data-demo='compliance'], footer",
        actionText: "Request Safety Pilot"
      }
    ],
    omnistock: [
      {
        title: "3D Spatial Warehouse Digital Twin",
        text: "Real-time isometric 3D mapping of bin racks, pallet velocity, and AGV automated guided vehicle routes.",
        selector: "header, canvas, .warehouse-grid, [data-demo='3d-view']",
        actionText: "Explore 3D Racks"
      },
      {
        title: "Predictive Stockout & FIFO Optimization",
        text: "Algorithmic replenishment schedules that eliminate stockouts and optimize picker travel distance by up to 34%.",
        selector: "nav, .inventory-table, [data-demo='inventory'], main",
        actionText: "Analyze Pick Paths"
      },
      {
        title: "Multi-Location Enterprise Sync",
        text: "Sub-second cross-warehouse synchronization with ERP connectors (SAP, NetSuite, and Microsoft Dynamics 365).",
        selector: "table, .sync-status, [data-demo='sync'], footer",
        actionText: "Schedule WMS Demo"
      }
    ],
    saccade: [
      {
        title: "Neural Attention & Saccade Gaze Simulation",
        text: "Bio-inspired visual attention engine predicting user fixation heatmaps, visual hierarchy, and CTA prominence in real-time.",
        selector: "header, canvas, .gaze-canvas, [data-demo='gaze']",
        actionText: "Run Attention Simulation"
      },
      {
        title: "Predictive CRO & Micro-Friction Scoring",
        text: "Automated scoring of cognitive load and visual clutter to optimize conversion rates before going live.",
        selector: "nav, .cro-metrics, [data-demo='metrics'], main",
        actionText: "View Friction Score"
      },
      {
        title: "Automated Visual A/B Variant Optimizer",
        text: "Generates high-converting UI layout variations backed by biometric eye-tracking machine learning models.",
        selector: "table, .variant-grid, [data-demo='variants'], footer",
        actionText: "Book CRO Strategy Call"
      }
    ],
    general: [
      {
        title: "Welcome to LinkableAI",
        text: "Enterprise Autonomous Software & Applied Artificial Intelligence. 4 production-grade systems operating on dedicated custom subdomains.",
        selector: "header, h1, .hero-section",
        actionText: "Explore Products"
      },
      {
        title: "Independent Enterprise Products",
        text: "Clinical Healthcare OS, SiteSafe Industrial Safety, OmniStock Spatial WMS, and Saccade Biometric Attention Engine.",
        selector: "#products, .products-grid, section",
        actionText: "Tour Products"
      },
      {
        title: "Founder & Applied AI Architecture",
        text: "Architected by Mharc Gatan. Direct co-design partnerships and dedicated enterprise deployment support.",
        selector: "#contact, footer, .contact-section",
        actionText: "Partner with Us"
      }
    ]
  };

  // 3. Inject CSS Styles & Shadow Container
  const container = document.createElement('div');
  container.id = 'linkable-ai-demo-specialist-root';
  document.body.appendChild(container);

  const shadow = container.attachShadow({ mode: 'open' });

  const style = document.createElement('style');
  style.textContent = `
    * { box-sizing: border-box; font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    
    /* Floating Launcher Button */
    .ai-launcher {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999990;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 18px 10px 12px;
      background: rgba(11, 15, 25, 0.88);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(0, 245, 255, 0.35);
      border-radius: 9999px;
      box-shadow: 0 12px 36px -6px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 245, 255, 0.2);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
    }
    .ai-launcher:hover {
      transform: translateY(-3px) scale(1.02);
      border-color: #00F5FF;
      box-shadow: 0 16px 40px -6px rgba(0, 0, 0, 0.85), 0 0 28px rgba(0, 245, 255, 0.4);
    }
    .ai-avatar-ring {
      position: relative;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, #00F5FF, #6366F1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 18px;
      box-shadow: 0 0 12px rgba(0, 245, 255, 0.6);
    }
    .pulse-dot {
      position: absolute;
      top: -2px;
      right: -2px;
      width: 11px;
      height: 11px;
      background: #10B981;
      border: 2px solid #0B0F19;
      border-radius: 50%;
      animation: pulse-ring 1.8s infinite;
    }
    @keyframes pulse-ring {
      0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
      70% { transform: scale(1.1); box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
      100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }
    .launcher-text {
      text-align: left;
    }
    .launcher-title {
      font-size: 13px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: -0.01em;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .launcher-subtitle {
      font-size: 10px;
      color: #94A3B8;
      font-family: monospace;
    }

    /* Modal / Demo Hub Window */
    .ai-modal-panel {
      position: fixed;
      bottom: 86px;
      right: 24px;
      width: 380px;
      max-width: calc(100vw - 32px);
      max-height: 600px;
      background: rgba(11, 15, 25, 0.95);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 20px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 245, 255, 0.15);
      z-index: 999995;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
      pointer-events: none;
      transform: translateY(20px) scale(0.96);
    }
    .ai-modal-panel.open {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0) scale(1);
    }

    /* Panel Header */
    .panel-header {
      padding: 16px;
      background: rgba(15, 23, 42, 0.85);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .header-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .header-title {
      font-size: 14px;
      font-weight: 700;
      color: #FFFFFF;
    }
    .header-badge {
      font-size: 9px;
      font-family: monospace;
      padding: 2px 6px;
      background: rgba(0, 245, 255, 0.12);
      color: #00F5FF;
      border: 1px solid rgba(0, 245, 255, 0.25);
      border-radius: 6px;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .icon-btn {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #94A3B8;
      border-radius: 8px;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.2s ease;
    }
    .icon-btn:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #FFFFFF;
    }

    /* Personalized Greeting Banner */
    .prospect-greeting-banner {
      margin: 12px 14px 0 14px;
      padding: 10px 12px;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(0, 245, 255, 0.1));
      border: 1px solid rgba(99, 102, 241, 0.3);
      border-radius: 12px;
      font-size: 11px;
      color: #E2E8F0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Panel Body (Scrollable Chat & Tour Steps) */
    .panel-body {
      padding: 14px;
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    /* Message Bubble */
    .bot-bubble {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 14px;
      padding: 12px;
      color: #CBD5E1;
      font-size: 12px;
      line-height: 1.5;
    }
    .bot-bubble strong {
      color: #FFFFFF;
    }

    /* Interactive Tour Navigator Card */
    .tour-card {
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(0, 245, 255, 0.25);
      border-radius: 14px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .tour-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11px;
      font-weight: 700;
      color: #00F5FF;
      font-family: monospace;
    }
    .tour-title {
      font-size: 13px;
      font-weight: 700;
      color: #FFFFFF;
    }
    .tour-desc {
      font-size: 11px;
      color: #94A3B8;
      line-height: 1.4;
    }
    .tour-controls {
      display: flex;
      gap: 6px;
      margin-top: 4px;
    }
    .btn-action {
      flex: 1;
      background: linear-gradient(135deg, #00F5FF, #3B82F6);
      color: #030712;
      font-weight: 700;
      font-size: 11px;
      padding: 8px 12px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }
    .btn-action:hover {
      opacity: 0.92;
      transform: scale(0.99);
    }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.08);
      color: #FFFFFF;
      font-size: 11px;
      padding: 8px 10px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.16);
    }

    /* Quick Question Pills */
    .quick-pills-label {
      font-size: 10px;
      font-family: monospace;
      color: #64748B;
      text-transform: uppercase;
      margin-top: 4px;
    }
    .quick-pills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .pill-btn {
      background: rgba(30, 41, 59, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #94A3B8;
      font-size: 11px;
      padding: 6px 10px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: left;
    }
    .pill-btn:hover {
      background: rgba(99, 102, 241, 0.2);
      border-color: rgba(99, 102, 241, 0.4);
      color: #FFFFFF;
    }

    /* Panel Footer (Input & Booker) */
    .panel-footer {
      padding: 12px 14px;
      background: rgba(15, 23, 42, 0.9);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .input-row {
      display: flex;
      gap: 6px;
    }
    .chat-input {
      flex: 1;
      background: rgba(3, 7, 18, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      padding: 8px 12px;
      color: #FFFFFF;
      font-size: 12px;
      outline: none;
    }
    .chat-input:focus {
      border-color: #00F5FF;
    }
    .chat-submit {
      background: #00F5FF;
      color: #030712;
      border: none;
      border-radius: 8px;
      padding: 0 12px;
      font-weight: 700;
      cursor: pointer;
      font-size: 12px;
    }

    /* Full Spotlight Cutout Overlay */
    .spotlight-overlay {
      position: fixed;
      inset: 0;
      z-index: 999980;
      pointer-events: none;
      transition: all 0.3s ease;
    }
    .spotlight-highlight-ring {
      position: fixed;
      border: 2px solid #00F5FF;
      border-radius: 12px;
      box-shadow: 0 0 0 9999px rgba(3, 7, 18, 0.75), 0 0 25px rgba(0, 245, 255, 0.6);
      pointer-events: none;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 999985;
      display: none;
    }
  `;
  shadow.appendChild(style);

  // 4. HTML Template
  const steps = TOUR_SCENARIOS[productContext] || TOUR_SCENARIOS.general;
  let currentStepIdx = 0;
  let voiceEnabled = true;

  shadow.innerHTML += `
    <!-- Highlight Ring -->
    <div class="spotlight-highlight-ring" id="spotlight-ring"></div>

    <!-- Floating Launcher -->
    <div class="ai-launcher" id="ai-launcher">
      <div class="ai-avatar-ring">
        <span>🤖</span>
        <span class="pulse-dot"></span>
      </div>
      <div class="launcher-text">
        <div class="launcher-title">
          <span>AI Demo Specialist</span>
          <span style="color: ${badgeColor};">●</span>
        </div>
        <div class="launcher-subtitle">Live Interactive Tour & Q&A</div>
      </div>
    </div>

    <!-- Modal Panel -->
    <div class="ai-modal-panel" id="ai-panel">
      <!-- Header -->
      <div class="panel-header">
        <div class="header-info">
          <div class="ai-avatar-ring" style="width: 28px; height: 28px; font-size: 14px;">
            <span>⚡</span>
          </div>
          <div>
            <div class="header-title">Linkable AI Specialist</div>
            <div class="header-badge" style="color: ${badgeColor}; border-color: ${badgeColor}40;">${productTitle}</div>
          </div>
        </div>
        <div class="header-actions">
          <button class="icon-btn" id="voice-toggle" title="Toggle Voice Narration">🔊</button>
          <button class="icon-btn" id="panel-close" title="Close Panel">✕</button>
        </div>
      </div>

      <!-- Prospect Greeting Banner -->
      ${prospectName !== 'Enterprise Partner' ? `
        <div class="prospect-greeting-banner">
          <span>🏛️</span>
          <div>
            <strong>Welcome, ${executiveName}!</strong> Specialized demo sandbox for <strong>${prospectName}</strong>.
          </div>
        </div>
      ` : ''}

      <!-- Body -->
      <div class="panel-body" id="panel-body">
        <div class="bot-bubble">
          👋 Hello! I am your <strong>Autonomous AI Demo Specialist</strong>. I can guide you through a step-by-step interactive demonstration of our live system, answer technical architectural questions, or schedule a co-design session with our Founder, <strong>Mharc Gatan</strong>.
        </div>

        <!-- Guided Tour Card -->
        <div class="tour-card" id="tour-card">
          <div class="tour-header">
            <span>INTERACTIVE PRODUCT TOUR</span>
            <span id="step-counter">STEP 1 OF ${steps.length}</span>
          </div>
          <div class="tour-title" id="step-title">${steps[0].title}</div>
          <div class="tour-desc" id="step-desc">${steps[0].text}</div>
          <div class="tour-controls">
            <button class="btn-action" id="btn-next-step">
              <span id="step-btn-text">Spotlight & Next ➔</span>
            </button>
            <button class="btn-secondary" id="btn-prev-step">Back</button>
          </div>
        </div>

        <!-- Quick FAQs -->
        <div class="quick-pills-label">Executive & Technical Inquiries:</div>
        <div class="quick-pills-grid">
          <button class="pill-btn" data-faq="hipaa">🔒 HIPAA & Security</button>
          <button class="pill-btn" data-faq="fhir">⚡ HL7 / FHIR APIs</button>
          <button class="pill-btn" data-faq="pricing">💰 Pricing & Economics</button>
          <button class="pill-btn" data-faq="founder">👨‍💻 Founder Co-Design</button>
        </div>
      </div>

      <!-- Footer -->
      <div class="panel-footer">
        <div class="input-row">
          <input type="text" class="chat-input" id="chat-input" placeholder="Ask any question about this software..." />
          <button class="chat-submit" id="chat-submit">Ask</button>
        </div>
      </div>
    </div>
  `;

  // 5. DOM References
  const launcher = shadow.getElementById('ai-launcher');
  const panel = shadow.getElementById('ai-panel');
  const closeBtn = shadow.getElementById('panel-close');
  const voiceToggle = shadow.getElementById('voice-toggle');
  const stepCounter = shadow.getElementById('step-counter');
  const stepTitle = shadow.getElementById('step-title');
  const stepDesc = shadow.getElementById('step-desc');
  const nextBtn = shadow.getElementById('btn-next-step');
  const prevBtn = shadow.getElementById('btn-prev-step');
  const spotlightRing = shadow.getElementById('spotlight-ring');
  const panelBody = shadow.getElementById('panel-body');
  const chatInput = shadow.getElementById('chat-input');
  const chatSubmit = shadow.getElementById('chat-submit');

  // 6. Speech Narration Function
  function speak(text) {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }

  // 7. Interactive Spotlight Highlighting
  function updateSpotlight(step) {
    if (!step.selector) {
      spotlightRing.style.display = 'none';
      return;
    }
    const el = document.querySelector(step.selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const rect = el.getBoundingClientRect();
      spotlightRing.style.display = 'block';
      spotlightRing.style.top = `${Math.max(0, rect.top - 8)}px`;
      spotlightRing.style.left = `${Math.max(0, rect.left - 8)}px`;
      spotlightRing.style.width = `${rect.width + 16}px`;
      spotlightRing.style.height = `${rect.height + 16}px`;
    } else {
      spotlightRing.style.display = 'none';
    }
  }

  function renderStep(idx) {
    currentStepIdx = idx;
    const step = steps[currentStepIdx];
    stepCounter.textContent = `STEP ${currentStepIdx + 1} OF ${steps.length}`;
    stepTitle.textContent = step.title;
    stepDesc.textContent = step.text;

    updateSpotlight(step);
    speak(`${step.title}. ${step.text}`);
  }

  // 8. Event Listeners
  launcher.addEventListener('click', () => {
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) {
      renderStep(currentStepIdx);
    } else {
      spotlightRing.style.display = 'none';
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  });

  closeBtn.addEventListener('click', () => {
    panel.classList.remove('open');
    spotlightRing.style.display = 'none';
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  });

  voiceToggle.addEventListener('click', () => {
    voiceEnabled = !voiceEnabled;
    voiceToggle.textContent = voiceEnabled ? '🔊' : '🔇';
    if (!voiceEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentStepIdx < steps.length - 1) {
      renderStep(currentStepIdx + 1);
    } else {
      // Completed tour -> append completion bubble
      appendBotMessage(`🎉 <strong>Tour complete!</strong> Would you like to schedule a 15-minute technical architecture walk with <strong>Mharc Gatan</strong> or explore our source code? <br><br><a href="mailto:mharcgatan@linkable.it.com?subject=Enterprise%20Co-Design%20Inquiry%20from%20${encodeURIComponent(prospectName)}" style="color: #00F5FF; font-weight: bold; text-decoration: underline;">Schedule Founder Call ➔</a>`);
      spotlightRing.style.display = 'none';
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentStepIdx > 0) {
      renderStep(currentStepIdx - 1);
    }
  });

  // 9. FAQ Responses
  const FAQ_ANSWERS = {
    hipaa: "🔒 <strong>HIPAA & Security:</strong> All data is protected with AES-256 encryption at rest and TLS 1.3 in transit. We support on-premise Kubernetes or dedicated VPC deployments with zero external data telemetry leakage.",
    fhir: "⚡ <strong>HL7 & FHIR APIs:</strong> Fully compliant with HL7 v2.x and FHIR R4/R5 protocols. Compatible with Epic FHIR endpoints, Cerner Millennium, and MEDITECH.",
    pricing: "💰 <strong>High-ROI Economics:</strong> We eliminate traditional 7-figure enterprise consulting retainers by providing turnkey standalone software licenses with direct founder-level SLA support.",
    founder: "👨‍💻 <strong>Founder Co-Design:</strong> Our systems are designed directly with client leadership. Contact <strong>Mharc Gatan</strong> at <code>mharcgatan@linkable.it.com</code> to tailor a custom deployment."
  };

  shadow.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-faq');
      if (FAQ_ANSWERS[type]) {
        appendBotMessage(FAQ_ANSWERS[type]);
        speak(FAQ_ANSWERS[type].replace(/<[^>]*>/g, ''));
      }
    });
  });

  function appendBotMessage(html) {
    const bubble = document.createElement('div');
    bubble.className = 'bot-bubble';
    bubble.innerHTML = html;
    panelBody.appendChild(bubble);
    panelBody.scrollTop = panelBody.scrollHeight;
  }

  function handleUserQuery() {
    const query = chatInput.value.trim();
    if (!query) return;

    // User Bubble
    const uBubble = document.createElement('div');
    uBubble.className = 'bot-bubble';
    uBubble.style.background = 'rgba(0, 245, 255, 0.1)';
    uBubble.style.borderColor = 'rgba(0, 245, 255, 0.3)';
    uBubble.style.color = '#FFFFFF';
    uBubble.innerHTML = `<strong>You:</strong> ${query}`;
    panelBody.appendChild(uBubble);
    chatInput.value = '';

    // Smart Keyword Responder
    setTimeout(() => {
      let resp = `Thank you for asking about "<em>${query}</em>". This capability is fully supported across our enterprise architecture. For custom sandbox configurations, you can email founder Mharc Gatan directly at <strong>mharcgatan@linkable.it.com</strong>.`;
      const qLower = query.toLowerCase();
      if (qLower.includes('hipaa') || qLower.includes('security') || qLower.includes('privacy')) {
        resp = FAQ_ANSWERS.hipaa;
      } else if (qLower.includes('api') || qLower.includes('fhir') || qLower.includes('hl7') || qLower.includes('integration')) {
        resp = FAQ_ANSWERS.fhir;
      } else if (qLower.includes('price') || qLower.includes('cost') || qLower.includes('licens') || qLower.includes('rate')) {
        resp = FAQ_ANSWERS.pricing;
      } else if (qLower.includes('founder') || qLower.includes('mharc') || qLower.includes('call') || qLower.includes('demo')) {
        resp = FAQ_ANSWERS.founder;
      }
      appendBotMessage(resp);
      speak(resp.replace(/<[^>]*>/g, ''));
    }, 400);
  }

  chatSubmit.addEventListener('click', handleUserQuery);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleUserQuery();
  });

  // Auto-open if query param ?mode=demo is present
  if (urlParams.get('mode') === 'demo' || urlParams.get('prospect')) {
    setTimeout(() => {
      panel.classList.add('open');
      renderStep(0);
    }, 1000);
  }
})();
