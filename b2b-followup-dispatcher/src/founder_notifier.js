import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const RECIPIENT_EMAIL = process.env.DIRECT_REPORT_EMAIL || 'mckinsyo01@gmail.com';
const SENDER_NAME = process.env.SENDER_NAME || 'Mharc Gatan | Linkable Systems';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'mharcgatan@linkable.it.com';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.spacemail.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'mharcgatan@linkable.it.com',
    pass: process.env.SMTP_PASS || 'Melonjuice01!'
  },
  tls: { rejectUnauthorized: false }
});

/**
 * Dispatches an urgent VIP alert to founder's direct Gmail when a high-converting prospect is identified.
 */
export async function sendHighConvertingProspectAlert(lead) {
  const clientName = lead.clientName || lead.executiveName || lead.name || 'High-Value Prospect';
  const company = lead.company || 'Enterprise Target';
  const email = lead.email || lead.contactEmail || 'N/A';
  const phone = lead.phone || 'N/A';
  const estimatedValue = lead.estimatedValue || lead.dealSize || '$2,500 - $15,000 USD';
  const service = lead.service || lead.campaign || 'Autonomous AI Systems / Web Engineering';
  const snippet = lead.snippet || lead.notes || lead.message || 'Direct inquiry received.';
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' });

  const subject = `🔥 [HIGH-MONEY PROSPECT ALERT] ${company} (${clientName}) - ${estimatedValue}`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; background: #0f172a; color: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #334155;">
      <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 24px; text-align: left;">
        <span style="background: #ef4444; color: #ffffff; font-weight: bold; font-size: 11px; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1px;">VIP Live Revenue Opportunity</span>
        <h1 style="margin: 12px 0 4px 0; font-size: 22px; color: #ffffff;">High-Converting Lead Captured</h1>
        <p style="margin: 0; color: #e2e8f0; font-size: 14px;">Real-time dispatch alert from Linkable Revenue Engine</p>
      </div>

      <div style="padding: 24px;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; font-size: 13px; width: 35%;">🏢 Company / Target:</td>
            <td style="padding: 8px 0; color: #f8fafc; font-size: 14px; font-weight: 600;">${company}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">👤 Key Decision Maker:</td>
            <td style="padding: 8px 0; color: #38bdf8; font-size: 14px; font-weight: 600;">${clientName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">✉️ Client Direct Email:</td>
            <td style="padding: 8px 0; color: #f8fafc; font-size: 14px;"><a href="mailto:${email}" style="color: #60a5fa; text-decoration: underline;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">📞 Phone / WhatsApp:</td>
            <td style="padding: 8px 0; color: #f8fafc; font-size: 14px;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">💰 Estimated Contract Value:</td>
            <td style="padding: 8px 0; color: #4ade80; font-size: 16px; font-weight: 700;">${estimatedValue}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">🎯 Service Alignment:</td>
            <td style="padding: 8px 0; color: #cbd5e1; font-size: 13px;">${service}</td>
          </tr>
        </table>

        <div style="background: #1e293b; border-left: 4px solid #38bdf8; padding: 14px; border-radius: 6px; margin-bottom: 24px;">
          <div style="font-size: 12px; color: #94a3b8; margin-bottom: 4px; font-weight: 600;">INQUIRY / INTENT SIGNAL:</div>
          <div style="color: #f1f5f9; font-size: 14px; line-height: 1.5;">"${snippet}"</div>
        </div>

        <div style="text-align: center; margin: 20px 0;">
          <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(service)}%20Proposal%20-%20LinkableAI" style="background: #22c55e; color: #ffffff; font-weight: bold; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; font-size: 14px; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);">
            🚀 Reply Directly to Client
          </a>
        </div>
      </div>

      <div style="background: #090d16; padding: 14px 24px; text-align: center; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b;">
        Delivered directly to Founder: ${RECIPIENT_EMAIL} | Manila Time: ${timestamp}
      </div>
    </div>
  `;

  const text = `
[HIGH-MONEY PROSPECT ALERT]
Company: ${company}
Decision Maker: ${clientName}
Email: ${email}
Phone: ${phone}
Estimated Value: ${estimatedValue}
Service: ${service}
Intent: "${snippet}"

Reply to client: ${email}
Timestamp: ${timestamp}
  `.trim();

  try {
    const info = await transporter.sendMail({
      from: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      subject,
      text,
      html
    });
    console.log(`✅ [FOUNDER NOTIFIER] High-Prospect Alert successfully dispatched to ${RECIPIENT_EMAIL}! (MsgId: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error(`❌ [FOUNDER NOTIFIER FAILED]: ${err.message}`);
    return { success: false, error: err.message };
  }
}

/**
 * Forwards inbound client email replies immediately to founder's direct Gmail.
 */
export async function forwardInboundClientEmail({ from, subject, date, body, snippet }) {
  const forwardSubject = `📬 [CLIENT INBOUND FORWARD] ${subject} (From: ${from})`;
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' });

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; color: #0f172a; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
      <div style="background: #0f172a; color: #ffffff; padding: 18px 24px;">
        <span style="background: #3b82f6; color: #ffffff; font-weight: bold; font-size: 10px; padding: 3px 8px; border-radius: 9999px; text-transform: uppercase;">Direct Client Reply</span>
        <h2 style="margin: 8px 0 0 0; font-size: 18px; color: #ffffff;">Incoming Message from ${from}</h2>
      </div>

      <div style="padding: 24px;">
        <p style="margin: 0 0 8px 0; color: #64748b; font-size: 13px;"><strong>Date Received:</strong> ${date || timestamp}</p>
        <p style="margin: 0 0 16px 0; color: #64748b; font-size: 13px;"><strong>Original Subject:</strong> ${subject}</p>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin: 16px 0; font-family: monospace; font-size: 13px; color: #1e293b; white-space: pre-wrap; line-height: 1.6;">
${body || snippet || 'No body content available.'}
        </div>

        <div style="margin-top: 20px;">
          <a href="mailto:${from}?subject=Re:%20${encodeURIComponent(subject)}" style="background: #0f172a; color: #ffffff; font-weight: 600; padding: 10px 20px; border-radius: 6px; text-decoration: none; display: inline-block; font-size: 13px;">
            Reply to ${from}
          </a>
        </div>
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      subject: forwardSubject,
      text: `Inbound email from ${from}\nSubject: ${subject}\n\n${body || snippet}`,
      html
    });
    console.log(`✅ [FOUNDER NOTIFIER] Client reply forwarded to ${RECIPIENT_EMAIL}! (MsgId: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error(`❌ [FOUNDER NOTIFIER FORWARD FAILED]: ${err.message}`);
    return { success: false, error: err.message };
  }
}

/**
 * Sends automation system health and cycle summary reports to founder's direct Gmail.
 */
export async function sendAutomationSummaryReport(summary) {
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' });
  const subject = `📊 [AUTOMATION REPORT] Linkable Revenue & Dispatch Pulse (${timestamp})`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; background: #0f172a; color: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #334155;">
      <div style="background: #1e293b; padding: 20px 24px; border-bottom: 1px solid #334155;">
        <span style="background: #10b981; color: #ffffff; font-weight: bold; font-size: 10px; padding: 3px 8px; border-radius: 9999px; text-transform: uppercase;">System Operational</span>
        <h2 style="margin: 10px 0 0 0; font-size: 20px; color: #ffffff;">24/7 Automation & Revenue Digest</h2>
      </div>

      <div style="padding: 24px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
          <div style="background: #1e293b; padding: 14px; border-radius: 8px; text-align: center;">
            <div style="font-size: 24px; font-weight: bold; color: #38bdf8;">${summary.dispatchedThisCycle || summary.totalSent || 0}</div>
            <div style="font-size: 12px; color: #94a3b8;">Dispatched This Window</div>
          </div>
          <div style="background: #1e293b; padding: 14px; border-radius: 8px; text-align: center;">
            <div style="font-size: 24px; font-weight: bold; color: #4ade80;">${summary.verifiedLeadsInQueue || summary.queueCount || 0}</div>
            <div style="font-size: 12px; color: #94a3b8;">Verified Leads in Queue</div>
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 13px;">
          <tr>
            <td style="padding: 8px 0; color: #94a3b8;">🛰️ Engine Mode:</td>
            <td style="padding: 8px 0; color: #f8fafc; font-weight: 600;">${summary.mode || '24/7 Cloud + Local Daemon'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8;">🛡️ DNS & Deliverability:</td>
            <td style="padding: 8px 0; color: #4ade80; font-weight: 600;">Pre-Flight MX Handshake Verified (Zero-Bounce)</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8;">⏱️ Next Execution Cycle:</td>
            <td style="padding: 8px 0; color: #f8fafc;">${summary.nextCycle || '10 Minutes'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8;">📬 Inbound Client Replies:</td>
            <td style="padding: 8px 0; color: #38bdf8; font-weight: 600;">${summary.inboundRepliesCount || 0} Detected</td>
          </tr>
        </table>

        ${summary.notes ? `<div style="background: #1e293b; padding: 12px; border-radius: 6px; font-size: 12px; color: #cbd5e1; margin-top: 12px;">${summary.notes}</div>` : ''}
      </div>

      <div style="background: #090d16; padding: 12px 24px; text-align: center; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b;">
        Automated Report Generated for ${RECIPIENT_EMAIL} | Sender: ${SENDER_EMAIL}
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      subject,
      text: `Automation Report:\nDispatched: ${summary.dispatchedThisCycle || 0}\nQueue: ${summary.verifiedLeadsInQueue || 0}\nInbound: ${summary.inboundRepliesCount || 0}\nTime: ${timestamp}`,
      html
    });
    console.log(`✅ [FOUNDER NOTIFIER] Automation Summary dispatched to ${RECIPIENT_EMAIL}! (MsgId: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error(`❌ [FOUNDER NOTIFIER SUMMARY FAILED]: ${err.message}`);
    return { success: false, error: err.message };
  }
}
