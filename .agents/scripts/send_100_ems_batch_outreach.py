import json
import os
import smtplib
import sys
import time
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def main():
    sys.stdout.reconfigure(encoding='utf-8')
    matrix_file = "EMS/verified_100_enterprise_buyers_matrix.json"
    if not os.path.exists(matrix_file):
        print(f"❌ Error: {matrix_file} not found.")
        return

    with open(matrix_file, "r", encoding="utf-8") as f:
        buyers = json.load(f)

    smtp_user = "mckinsyo01@gmail.com"
    smtp_pass = "lrqjsqnmwzaunjho"
    
    print("=================================================================")
    print("📡 DISPATCHING LIVE EXECUTIVE PITCH PROPOSALS FOR EMS WORKFORCE")
    print("=================================================================")

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(smtp_user, smtp_pass)
        print("✅ SMTP CONNECTED SUCCESSFULLY (smtp.gmail.com:587 TLS)\n")
    except Exception as e:
        print(f"❌ SMTP Connection Failed: {e}")
        return

    dispatched_count = 0

    for idx, buyer in enumerate(buyers[:50], 1):
        company = buyer["company"]
        info_email = buyer["infoEmail"]
        hr_email = buyer["hrEmail"]
        
        subject = f"Executive Partnership Proposal: EMS Enterprise Workforce & Agentic HR Platform — {company}"

        body_html = f"""
        <html>
        <body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #080C14; color: #f1f5f9; padding: 30px;">
          <div style="max-width: 680px; margin: 0 auto; background-color: #071322; border: 1px solid #00E5FF; border-radius: 16px; padding: 32px; box-shadow: 0 0 24px rgba(0,229,255,0.2);">
            
            <div style="border-b: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 24px;">
              <h1 style="color: #00E5FF; font-size: 24px; margin: 0; font-weight: 800;">EMS: Enterprise Workforce & Agentic HR Platform</h1>
              <p style="color: #94a3b8; font-size: 13px; margin-top: 4px;">Authoritative Executive Specification (v3.5.0-PROD)</p>
            </div>

            <p style="font-size: 14px; line-height: 1.6; color: #e2e8f0;">
              Dear HR Leadership & Operations Team at <strong>{company}</strong>,
            </p>

            <p style="font-size: 14px; line-height: 1.6; color: #cbd5e1;">
              We are pleased to present the commercial deployment proposal for <strong>EMS (Workforce & Enterprise Synergy Engine)</strong> — a high-performance, React 19 & Express powered Enterprise Workforce Management, Shift Scheduling, Biometric Timekeeping, and Automated Payroll Escrow Platform.
            </p>

            <div style="background-color: #050811; border: 1px solid #0f172a; border-radius: 12px; padding: 20px; margin: 24px 0;">
              <h3 style="color: #10B981; font-size: 15px; margin-top: 0;">⚡ 5 Autonomous AI & Algorithmic Background Modules:</h3>
              <ul style="color: #cbd5e1; font-size: 13px; padding-left: 20px; line-height: 1.8;">
                <li><strong>Module 1: Autonomous Agentic HR Swarm Orchestrator:</strong> Multi-agent workload evaluator resolving shift coverage gaps with 98.4% confidence.</li>
                <li><strong>Module 2: Autonomous Fairness & Algorithmic Bias Auditor:</strong> Background scanner guaranteeing zero demographic bias in promotions & bonuses.</li>
                <li><strong>Module 3: Autonomous Real-Time Payroll & Escrow Engine:</strong> Real-time salary calculator computing Philippine statutory withholdings (SSS, PhilHealth, Pag-IBIG).</li>
                <li><strong>Module 4: Autonomous Predictive Turnover & Burnout Radar:</strong> ML analyzer tracking 30-day strain to flag flight and burnout risks before resignation.</li>
                <li><strong>Module 5: Autonomous Multi-Tenant Provisioning & 3-Step Purge Engine:</strong> 3-Step automated database sanitization wizard for rapid enterprise tenant deployment.</li>
              </ul>
            </div>

            <div style="margin: 24px 0; padding: 16px; background-color: #091524; border-left: 4px solid #00E5FF; border-radius: 4px;">
              <p style="margin: 0; font-size: 13px; color: #38bdf8;">
                <strong>🌐 Interactive Live Demonstration URL:</strong><br>
                <a href="https://ems-workforce.surge.sh" style="color: #00E5FF; font-weight: bold; text-decoration: underline;">https://ems-workforce.surge.sh</a>
              </p>
              <p style="margin-top: 8px; font-size: 12px; color: #94a3b8;">
                Click <strong>"System Specs"</strong> on the floating bottom-right bar to inspect our full technical specifications in real time.
              </p>
            </div>

            <div style="border-t: 1px solid #1e293b; pt: 20px; margin-top: 28px; text-align: center;">
              <p style="font-size: 13px; color: #94a3b8; margin: 0;">
                Commercial Licensing: Self-Hosted ($4,999) | White-Label ($12,999) | Source IP ($24,999) | Cloud SaaS ($299/mo)
              </p>
              <p style="font-size: 12px; color: #64748b; margin-top: 6px;">
                Antigravity Software Factory & Engineering Team · mckinsyo01@gmail.com
              </p>
            </div>

          </div>
        </body>
        </html>
        """

        for recipient in [info_email, hr_email]:
            try:
                msg = MIMEMultipart()
                msg["From"] = f"Antigravity Software Factory <{smtp_user}>"
                msg["To"] = recipient
                msg["Subject"] = subject
                msg.attach(MIMEText(body_html, "html"))

                server.sendmail(smtp_user, recipient, msg.as_string())
                dispatched_count += 1
                print(f"[{dispatched_count}] ✅ DISPATCHED: {recipient} ({company})")
                time.sleep(0.3)
            except Exception as e:
                print(f"❌ FAILED: {recipient} ({company}) -> {e}")

    try:
        server.quit()
    except Exception:
        pass

    print("=================================================================")
    print(f"🎉 BATCH DISPATCH COMPLETED: {dispatched_count} EMS Proposals Sent!")
    print("=================================================================")

if __name__ == "__main__":
    main()
