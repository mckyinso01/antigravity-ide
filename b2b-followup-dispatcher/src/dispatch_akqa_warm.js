import nodemailer from 'nodemailer';
import dns from 'dns';
import dotenv from 'dotenv';
dotenv.config();

const dnsPromises = dns.promises;

async function executeStep1AKQA() {
  console.log('====================================================');
  console.log('🚀 STEP 1: AKQA EXECUTIVE WARM OUTREACH');
  console.log('====================================================');

  const recipient = 'raj@akqa.com';
  const domain = recipient.split('@')[1];

  console.log(`\n[1/3] Verifying MX Records for domain: ${domain}...`);
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
    const mxRecords = await dnsPromises.resolveMx(domain);
    mxRecords.sort((a, b) => a.priority - b.priority);
    console.log(`✅ MX Active: Found ${mxRecords.length} mail exchangers:`);
    mxRecords.slice(0, 3).forEach(mx => console.log(`   - Priority ${mx.priority}: ${mx.exchange}`));
  } catch (err) {
    console.error(`❌ MX Resolution failed: ${err.message}`);
    process.exit(1);
  }

  console.log(`\n[2/3] Preparing Transporter & Executive Message...`);
  const transporter = nodemailer.createTransport({
    host: 'mail.spacemail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER || 'mharcgatan@linkable.it.com',
      pass: process.env.SMTP_PASS || 'Melonjuice01!'
    }
  });

  const emailSubject = "Re: AKQA Digital Experience & CRO Architecture (Ref: Ajaz Ahmed)";
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6; }
    .container { max-width: 620px; margin: 0 auto; padding: 20px; }
    .badge { display: inline-block; background: #e0e7ff; color: #3730a3; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 600; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0; }
    .btn { display: inline-block; background: #0f172a; color: #ffffff !important; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; }
    .footer { font-size: 13px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <span class="badge">DIRECT REFERRAL</span>
    <p>Hi Raj,</p>
    <p>I reached out to Ajaz regarding our cognitive gaze heatmap and Core Web Vitals optimization framework for AKQA's global client accounts, and his office noted to contact you directly while he is travelling.</p>
    
    <div class="card">
      <h3 style="margin-top:0; color:#0f172a;">⚡ What We Deliver for AKQA Enterprise Clients:</h3>
      <ul>
        <li><strong>Sub-50ms INP / CWV Stabilization:</strong> Eliminating script bottlenecks on high-traffic client deployments.</li>
        <li><strong>Predictive Gaze & Attention Mapping:</strong> Pre-evaluating landing page conversion architectures before staging release.</li>
        <li><strong>Zero-Friction Technical Remediation:</strong> Direct engineering sprints with guaranteed SLA escrow protection.</li>
      </ul>
    </div>

    <p>Would you or your technical team be open to a brief 5-minute interactive walkthrough of the diagnostic model this week?</p>

    <p>Best regards,</p>
    <div class="footer">
      <strong>Mharc Gatan</strong><br>
      Lead Solutions Architect | Linkable AI<br>
      Direct Email: <a href="mailto:mharcgatan@linkable.it.com">mharcgatan@linkable.it.com</a><br>
      Verified Infrastructure: <a href="https://omnistock.linkable.it.com">linkable.it.com</a>
    </div>
  </div>
</body>
</html>
  `;

  const textContent = `Hi Raj,\n\nI reached out to Ajaz regarding our cognitive gaze heatmap and Core Web Vitals optimization framework for AKQA's global client accounts, and his office noted to contact you directly while he is travelling.\n\nWe specialize in sub-50ms INP/CWV stabilization, predictive gaze mapping, and rapid engineering remediation for enterprise client web apps.\n\nWould you or your technical team be open to a brief 5-minute walkthrough of the diagnostic model this week?\n\nBest regards,\nMharc Gatan\nLead Solutions Architect | Linkable AI\nmharcgatan@linkable.it.com`;

  console.log(`[3/3] Dispatching to ${recipient}...`);
  try {
    const info = await transporter.sendMail({
      from: `"Mharc Gatan | Linkable" <${process.env.SMTP_USER || 'mharcgatan@linkable.it.com'}>`,
      to: recipient,
      subject: emailSubject,
      text: textContent,
      html: htmlContent
    });

    console.log('\n====================================================');
    console.log('✅ STEP 1 SUCCESS: EMAIL DISPATCHED & LOGGED');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Accepted: ${info.accepted.join(', ')}`);
    console.log(`   Response: ${info.response}`);
    console.log('====================================================\n');
  } catch (err) {
    console.error(`❌ Dispatch Failed: ${err.message}`);
    process.exit(1);
  }
}

executeStep1AKQA().catch(console.error);
