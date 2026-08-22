// 🤖 LINKABLEAI ELITE B2B SAAS AI SALES SPECIALIST & CLOSING AGENT ("ALEXIS VANCE")
// Armed with The Challenger Sale, SPIN Selling, and MEDDPICC methodologies.
// Integrates Full-Thread Conversation Context, 100% Free Custom Modifications,
// 3-Gives Milestone Escrow, Real-Time Gmail Forwarding, and Founder Escalations.

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const { queryGemini, classifyInboundReply } = require('./geminiService');
const { 
  getOrCreateThread, 
  appendMessage, 
  formatThreadContextForPrompt, 
  normalizeEmail 
} = require('./conversationThreadManager');

// Load environment configuration
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...vals] = trimmed.split('=');
      if (key && vals.length) {
        process.env[key.trim()] = vals.join('=').trim();
      }
    }
  });
}

const CONFIG = {
  smtp: {
    host: process.env.SPACEMAIL_HOST || 'mail.spacemail.com',
    port: parseInt(process.env.SPACEMAIL_SMTP_PORT || '465', 10),
    secure: true,
    auth: {
      user: process.env.SPACEMAIL_USER || 'mharcgatan@linkable.it.com',
      pass: process.env.SPACEMAIL_PASS || 'Melonjuice01!'
    }
  },
  senderName: 'Alexis Vance • LinkableAI Enterprise Specialist',
  senderEmail: process.env.SPACEMAIL_USER || 'mharcgatan@linkable.it.com',
  founderEmail: 'mckinsyo01@gmail.com',
  officialFounderBranding: 'Mharc Gatan <mharcgatan@linkable.it.com>',
  hubUrl: 'https://linkable.it.com',
  commandUrl: 'https://agent.linkable.it.com'
};

const transporter = nodemailer.createTransport(CONFIG.smtp);

/**
 * World-Class Enterprise B2B SaaS Closing System Prompt
 */
const SALES_SPECIALIST_SYSTEM_PROMPT = `
You are Alexis Vance, Senior Executive AI Sales & Client Solutions Specialist at LinkableAI, reporting directly to Founder & Principal AI Architect Mharc Gatan.

YOUR MISSION:
Engage C-level healthcare, construction, logistics, and digital marketing executives, address their technical questions, handle objections with world-class finesse, and steer them toward a closed enterprise contract or a private architecture walkthrough with Founder Mharc Gatan.

SALES METHODOLOGY GUIDELINES:
1. THE CHALLENGER SALE (Teach, Tailor, Take Control):
   - Do NOT just list features. Reframe the prospect's legacy assumptions.
   - Expose the "Hidden Subscription Tax" of legacy software (e.g. Epic Systems $500k+, Procore $65k/yr, Manhattan $250k+, Tobii $35k/yr).
   - Position LinkableAI's 5/10th Pricing Formula: exactly 50% lower than legacy giants, with 100% perpetual code ownership and ZERO per-seat recurring taxes.

2. SPIN SELLING (Situation, Problem, Implication, Need-Payoff):
   - Diagnose their operational bottlenecks (medication dosage errors, $2,500/day liquidated damages, FEFO expiration spoilage, weak CRO gaze conversion).
   - Magnify the Cost of Inaction and demonstrate how LinkableAI unlocks immediate positive ROI.

3. MEDDPICC RIGOR & RISK ELIMINATION:
   - 100% FREE CUSTOM MODIFICATIONS: Guarantee that Founder Mharc Gatan and our engineering team will customize database schemas, FHIR/REST APIs, and workflow UI for ₱0 / $0 additional charge until 100% fulfilled.
   - 3-GIVES MILESTONE ESCROW SCHEDULE: 30% Initiation Retainer, 35% Custom Modification Sign-Off in staging, 35% Live Production Launch.
   - TIER 3 SOVEREIGN BUYOUT: For clients seeking 100% Git source code ownership, private on-prem deployment, and unrestricted commercial resale rights without royalties.

CORE PRODUCT MATRIX:
- 🏥 Clinical Pristine ICU OS (https://clinical.linkable.it.com): 5-Rights eMAR verification, real-time waveform telemetry, $48.5k flat perpetual buyout vs $500k+ Epic.
- 🏗️ SiteSafe StructuraPro (https://sitesafe.linkable.it.com): Dynamic Critical Path Method (CPM) Gantt, automated NOAA certified weather delay claims, $24.5k flat perpetual vs $65k/yr Procore.
- 📦 OmniStock Spatial WMS (https://omnistock.linkable.it.com): 3D WebGL Voxel Digital Twin, strict automated FEFO expiration quarantine, $38.5k flat perpetual vs $250k+ Manhattan.
- 👁️ Saccade-UI Biometric CRO (https://saccade.linkable.it.com): Biological Itti-Koch visual saliency algorithms, sub-50ms client-side attention heatmaps, $9.5k flat perpetual vs $35k/yr Tobii Pro.

COMMUNICATION TONE & FORMAT:
- Executive, confident, respectful, consultative, crisp.
- Under 150 words. No corporate fluff or generic pleasantries.
- Always include clear, actionable next steps.
`;

/**
 * Formats a clean HTML executive email body
 */
function wrapSalesEmailHtml(recipientName, replyBody, targetAppUrl) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px 12px; color: #1e293b; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; box-shadow: 0 4px 20px -2px rgba(0,0,0,0.05); }
    .header { border-bottom: 2px solid #00F5FF; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; }
    .badge { font-size: 11px; font-family: monospace; background: #ecfeff; color: #0891b2; padding: 4px 8px; border-radius: 6px; border: 1px solid #cffafe; font-weight: bold; }
    .content { font-size: 14px; line-height: 1.65; color: #334155; }
    .content p { margin-bottom: 16px; }
    .btn { display: inline-block; background: #0f172a; color: #ffffff !important; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 24px; border-radius: 10px; margin-top: 12px; }
    .footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="logo">⚡ LinkableAI <span style="font-weight: 400; color: #64748b; font-size: 14px;">| Enterprise Solutions</span></div>
      <div class="badge">CHALLENGER_CLOSING_OS</div>
    </div>
    
    <div class="content">
      ${replyBody}
      
      ${targetAppUrl ? `<p><a href="${targetAppUrl}" class="btn" target="_blank">Access Dedicated Interactive Sandbox &rarr;</a></p>` : ''}
    </div>

    <div class="footer">
      <strong>Alexis Vance</strong> • Senior Executive AI Sales Specialist<br/>
      Executive Office of <strong>Mharc Gatan</strong> (Founder &amp; Principal AI Architect)<br/>
      <a href="${CONFIG.hubUrl}" style="color: #0284c7; text-decoration: none;">linkable.it.com</a> • Perpetual Enterprise AI Systems
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Sends an instant STAT priority notification to Founder Mharc Gatan
 */
async function escalateToFounder(leadThread, latestInboundMsg, aiAnalysis) {
  console.log(`\n🚨 STAT ALERT: Escalating High-Intent Deal to Founder Mharc Gatan!`);
  console.log(`   👤 Lead: ${leadThread.leadName} (${leadThread.organization})`);
  console.log(`   🎯 Reason: ${aiAnalysis.summary}`);

  const statSubject = `🚨 STAT High-Intent Prospect: ${leadThread.organization} (${leadThread.leadName}) - ${aiAnalysis.intent}`;
  const statHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 2px solid #ef4444; border-radius: 12px; padding: 24px; background: #fff;">
      <div style="background: #fee2e2; color: #991b1b; padding: 10px 16px; border-radius: 8px; font-weight: bold; margin-bottom: 16px;">
        🚨 HIGH-PRIORITY FOUNDER ACTION REQUIRED
      </div>
      <h2 style="margin-top: 0; color: #0f172a;">${leadThread.organization} - ${leadThread.leadName}</h2>
      <p><strong>Title / Role:</strong> ${leadThread.role}</p>
      <p><strong>Email:</strong> <a href="mailto:${leadThread.leadEmail}">${leadThread.leadEmail}</a></p>
      <p><strong>Vertical:</strong> ${leadThread.vertical.toUpperCase()}</p>
      <p><strong>Lead Score:</strong> ${leadThread.leadScore}/100</p>
      
      <div style="background: #f8fafc; border-left: 4px solid #0284c7; padding: 14px; margin: 18px 0;">
        <strong style="color: #0369a1;">AI Intent Analysis:</strong><br/>
        ${aiAnalysis.summary}<br/>
        <em>Recommended Next Action:</em> <strong>${aiAnalysis.suggestedAction}</strong>
      </div>

      <div style="background: #f1f5f9; padding: 14px; border-radius: 8px; font-size: 13px;">
        <strong>Latest Inbound Message:</strong><br/>
        <p style="white-space: pre-wrap; color: #334155;">${latestInboundMsg.body}</p>
      </div>

      <div style="margin-top: 24px;">
        <a href="mailto:${leadThread.leadEmail}?subject=Re:%20${encodeURIComponent(latestInboundMsg.subject)}" 
           style="background: #0284c7; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
          Reply Directly to Client &rarr;
        </a>
      </div>
    </div>
  `;

  try {
    const alertInfo = await transporter.sendMail({
      from: `"${CONFIG.senderName}" <${CONFIG.senderEmail}>`,
      to: [CONFIG.founderEmail, process.env.FOUNDER_EMAIL || 'mharcgatan@linkable.it.com'],
      subject: statSubject,
      html: statHtml
    });
    console.log(`   ✅ STAT Founder Alert delivered! Message ID: ${alertInfo.messageId}`);
    return true;
  } catch (err) {
    console.error(`   ❌ Failed to send STAT Alert to founder:`, err.message);
    return false;
  }
}

/**
 * Real-Time Email Forwarding Relay to Founder's Gmail
 */
async function forwardRawEmailToGmail(fromEmail, subject, body, aiAnalysis) {
  const fwdSubject = `[FWD from mharcgatan@linkable.it.com] ${subject}`;
  const fwdHtml = `
    <div style="font-family: Arial, sans-serif; border-left: 4px solid #00F5FF; padding: 12px; background: #f8fafc;">
      <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">
        ⚡ <strong>LinkableAI Real-Time Inbound Relay</strong> | Received at <code>mharcgatan@linkable.it.com</code>
      </div>
      <p><strong>From:</strong> ${fromEmail}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>AI Intent Tag:</strong> <code>${aiAnalysis.intent || 'INQUIRY'}</code> (Urgency: ${aiAnalysis.urgency || 'NORMAL'})</p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 12px 0;" />
      <div style="white-space: pre-wrap; font-size: 13px; color: #1e293b;">${body}</div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"${CONFIG.senderName}" <${CONFIG.senderEmail}>`,
      to: CONFIG.founderEmail,
      subject: fwdSubject,
      html: fwdHtml
    });
    console.log(`   📬 Inbound Email relayed in real-time to ${CONFIG.founderEmail}`);
  } catch (err) {
    console.error(`   ⚠️ Failed to relay email to Gmail:`, err.message);
  }
}

/**
 * Processes an inbound client email, updates memory, and generates an autonomous sales reply
 */
async function processInboundAndGenerateSalesReply(inboundMsg) {
  const normSender = normalizeEmail(inboundMsg.from || inboundMsg.sender);
  console.log(`\n======================================================`);
  console.log(`🧠 AI SALES CLOSER (Alexis Vance): Processing Inbound`);
  console.log(`📨 From: ${normSender} | Subject: ${inboundMsg.subject}`);
  console.log(`======================================================\n`);

  // 1. Get or create thread memory
  const thread = getOrCreateThread(normSender, {
    name: inboundMsg.senderName,
    hospital: inboundMsg.organization,
    vertical: inboundMsg.vertical
  });

  // 2. Classify intent via Gemini NLP
  const analysis = await classifyInboundReply(normSender, inboundMsg.subject, inboundMsg.body);
  console.log(`🔍 Intent Classified: [${analysis.intent}] | Urgency: [${analysis.urgency}]`);

  // 3. Forward real-time copy to Founder's Gmail
  await forwardRawEmailToGmail(normSender, inboundMsg.subject, inboundMsg.body, analysis);

  // 4. Record inbound message in conversation memory
  appendMessage(normSender, {
    sender: normSender,
    recipient: CONFIG.senderEmail,
    direction: 'INBOUND',
    subject: inboundMsg.subject,
    body: inboundMsg.body,
    intent: analysis.intent,
    leadScoreDelta: analysis.intent === 'DEMO_REQUEST' ? 25 : 10
  });

  // 5. Check if immediate Founder Escalation is triggered
  const isHighIntent = analysis.intent === 'DEMO_REQUEST' || 
                       inboundMsg.body.toLowerCase().includes('demo') || 
                       inboundMsg.body.toLowerCase().includes('call') ||
                       inboundMsg.body.toLowerCase().includes('mharc') ||
                       inboundMsg.body.toLowerCase().includes('contract') ||
                       inboundMsg.body.toLowerCase().includes('quote') ||
                       inboundMsg.body.toLowerCase().includes('price');

  if (isHighIntent) {
    await escalateToFounder(thread, inboundMsg, analysis);
  }

  // 6. Generate contextual multi-turn sales reply using full thread memory stack
  const threadContext = formatThreadContextForPrompt(normSender);
  const prompt = `
${threadContext}

LATEST INBOUND MESSAGE FROM PROSPECT:
From: ${normSender}
Subject: ${inboundMsg.subject}
Message Body:
${inboundMsg.body}

TASK:
Draft an executive, persuasive, consultative email reply from Alexis Vance (Senior Executive AI Sales Specialist) to this prospect.
Apply The Challenger Sale and SPIN Selling. Emphasize our 100% Free Custom Modification System and 3-Gives Milestone Escrow Schedule if relevant to their questions.
If they asked for a demo or call with Founder Mharc Gatan, warmly confirm and provide a calendar invite link or confirm that Founder Mharc Gatan has been alerted.
Format as HTML paragraphs (use <p> tags). Do NOT include generic markdown backticks or outer <html> tags.
  `;

  const aiReplyHtml = await queryGemini(prompt, SALES_SPECIALIST_SYSTEM_PROMPT);
  const cleanReply = aiReplyHtml ? aiReplyHtml.replace(/```html/g, '').replace(/```/g, '').trim() : 
    `<p>Thank you for reaching out. Founder Mharc Gatan and our engineering team have reviewed your inquiry and will follow up directly with your custom architecture specs.</p>`;

  let appUrl = `${CONFIG.hubUrl}`;
  if (thread.vertical === 'clinical') appUrl = 'https://clinical.linkable.it.com';
  if (thread.vertical === 'sitesafe') appUrl = 'https://sitesafe.linkable.it.com';
  if (thread.vertical === 'omnistock') appUrl = 'https://omnistock.linkable.it.com';
  if (thread.vertical === 'saccade') appUrl = 'https://saccade.linkable.it.com';

  const fullEmailHtml = wrapSalesEmailHtml(thread.leadName, cleanReply, appUrl);
  const replySubject = inboundMsg.subject.toLowerCase().startsWith('re:') ? inboundMsg.subject : `Re: ${inboundMsg.subject}`;

  // 7. Dispatch reply via Spacemail SMTP
  try {
    const dispatchInfo = await transporter.sendMail({
      from: `"${CONFIG.senderName}" <${CONFIG.senderEmail}>`,
      to: normSender,
      subject: replySubject,
      html: fullEmailHtml,
      inReplyTo: inboundMsg.messageId || undefined,
      references: inboundMsg.messageId || undefined
    });

    console.log(`✅ Autonomous Sales Reply successfully dispatched! Message ID: ${dispatchInfo.messageId}`);

    // 8. Record outbound reply in conversation thread memory
    appendMessage(normSender, {
      sender: CONFIG.senderEmail,
      recipient: normSender,
      direction: 'OUTBOUND',
      subject: replySubject,
      body: cleanReply,
      salesMethodology: 'CHALLENGER_SPIN_INTEGRATED_CLOSER',
      escalationTriggered: isHighIntent
    });

    return {
      status: 'SUCCESS',
      messageId: dispatchInfo.messageId,
      intent: analysis.intent,
      isEscalated: isHighIntent,
      replyContent: cleanReply
    };
  } catch (err) {
    console.error(`❌ Failed to dispatch sales reply to ${normSender}:`, err.message);
    return {
      status: 'FAILED',
      error: err.message
    };
  }
}

module.exports = {
  processInboundAndGenerateSalesReply,
  escalateToFounder,
  forwardRawEmailToGmail
};

if (require.main === module) {
  console.log('🤖 Alexis Vance AI Sales Specialist Module Loaded.');
  console.log('Use with real inbound prospect events via inboundReplyParserDaemon.js.');
}
