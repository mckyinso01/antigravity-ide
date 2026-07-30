import os
import sys
import json
import time
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

print("===========================================================================")
print("🚀 OMNISTOCK BATCH OUTREACH ENGINE: 200 ADDITIONAL REAL STORE & RETAIL BUYERS")
print("===========================================================================")

# Load 200 Verified Additional Buyers Matrix
matrix_path = os.path.join(os.path.dirname(__file__), "..", "..", "omnistock", "verified_200_additional_buyers_matrix.json")

if not os.path.exists(matrix_path):
    print(f"❌ Error: {matrix_path} not found.")
    sys.exit(1)

with open(matrix_path, 'r', encoding='utf-8') as f:
    buyers = json.load(f)

print(f"▶ Successfully Loaded {len(buyers)} Verified Additional Business Buyers.\n")

# SMTP Configuration
sender_email = "mckinsyo01@gmail.com"
app_password = "lrqjsqnmwzaunjho" # Verified Google App Password

try:
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(sender_email, app_password)
    print("✅ Authenticated via Google App Password SSL/TLS Transport.\n")
except Exception as e:
    print(f"❌ SMTP Authentication Failed: {e}")
    sys.exit(1)

dispatched_count = 0
failed_count = 0

for idx, buyer in enumerate(buyers, 1):
    company = buyer.get("company", "Valued Business Outlet")
    verified_emails = buyer.get("verified_emails", [])
    domain = buyer.get("domain", "")

    subject = f"Executive Proposal: OmniStock Enterprise POS & Multi-Store Inventory Engine for {company}"

    for recipient_email in verified_emails:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = f"OmniStock Software Factory <{sender_email}>"
        msg['To'] = recipient_email

        body_plain = f"""
Dear Executive Management Team of {company},

We noticed your active retail and multi-store operations in the market. In modern retail and commercial store operations, maintaining zero-defect Point of Sale (POS) and real-time inventory management is critical to eliminating stock shrinkage, accelerating cashier checkout speeds, and optimizing profit margins.

OmniStock POS is an autonomous, enterprise-grade Point of Sale and Inventory Management Engine designed specifically for high-volume retail stores, supermarkets, pharmacies, hardware outlets, and multi-tenant chain businesses.

Key Enterprise Features & Direct Business Value:

1. Real-Time Daily Reporting & Net Profit Calculation:
   - Instant automated end-of-day sales rollups, Cost of Goods Sold (COGS) tracking, and net profit computation across single or multi-outlet locations.

2. Automated Recipe, Ingredient & Stock Portion Control:
   - Tracks ingredient-level and unit-level consumption with precision (grams/ml/units). Automatically flags anomalous stock discrepancies and potential pilferage before it affects your bottom line.

3. Instant Low-Stock Telemetry & Theft Discrepancy Guard:
   - Sends real-time notifications when critical stock thresholds are reached, preventing stockouts and highlighting unauthorized inventory variance.

4. Sub-10ms Barcode Telemetry & GTIN/EAN Scanner HUD:
   - High-performance barcode parsing supporting multi-format optical scanners for rapid cashier checkout.

5. Interactive 80mm Thermal Receipt Generator:
   - Instant thermal receipt generation with custom store headers, tax breakdown, and QR code integration.

6. 100% Offline-Ready Register (Dexie.js Sync Engine):
   - Uninterrupted offline transaction capabilities. Local store operations continue seamlessly during internet outages and automatically sync to the cloud upon reconnection.

7. Multi-Tenant Role Access & Transaction Audit Ledger:
   - Granular cashier, store manager, and executive access permissions backed by an immutable transaction audit log.

8. ASC 606 GAAP Revenue & Inventory Analytics:
   - Comprehensive accounting compliance analytics, gross margin reports, and real-time stock turnover metrics.

9. Flexible Commercial Licensing Models:
   - Hosted Cloud SaaS: $299 USD / month (Fully managed infrastructure, automatic cloud backups, 99.99% SLA).
   - Enterprise Self-Hosted & IP Licensing: $4,999 USD (One-time payment, full codebase deployment on your private servers).

We invite you to inspect and test the live interactive demonstration of OmniStock POS:
Live Demo: https://omnistock-pos.surge.sh
Showcase Launcher Hub: https://gatzdevs.surge.sh

We would welcome the opportunity to schedule a brief 15-minute executive demonstration for {company}.

Sincerely,

OmniStock Software Factory & Enterprise Solutions Team
Contact Email: mckinsyo01@gmail.com
Live System: https://omnistock-pos.surge.sh
"""

        body_html = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{ font-family: 'Segoe UI', Arial, sans-serif; background-color: #050811; color: #F8FAFC; margin: 0; padding: 20px; }}
    .container {{ max-width: 650px; background: #0B1C30; border: 1px solid rgba(37, 99, 235, 0.4); border-radius: 12px; padding: 30px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }}
    .header {{ font-size: 22px; font-weight: 700; color: #00E5FF; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; border-bottom: 1px solid rgba(37,99,235,0.3); padding-bottom: 10px; }}
    .highlight {{ color: #F9E006; font-weight: 600; }}
    .feature-list {{ list-style-type: none; padding: 0; margin: 20px 0; }}
    .feature-item {{ background: rgba(7, 19, 34, 0.7); border-left: 3px solid #2563EB; margin-bottom: 10px; padding: 12px 15px; border-radius: 4px; font-size: 14px; line-height: 1.5; }}
    .feature-title {{ font-weight: 700; color: #FFFFFF; font-size: 15px; }}
    .cta-button {{ display: inline-block; background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); color: #FFFFFF !important; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 16px; margin-top: 20px; border: 1px solid #60A5FA; box-shadow: 0 0 15px rgba(37,99,235,0.5); }}
    .footer {{ font-size: 12px; color: #94A3B8; margin-top: 30px; border-top: 1px solid rgba(37,99,235,0.2); padding-top: 15px; }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">OmniStock Enterprise POS System</div>
    <p>Dear Executive Team of <span class="highlight">{company}</span>,</p>
    <p>In modern retail and multi-tenant store operations, maintaining real-time inventory precision, zero cashier friction, and automated profit reporting is paramount to long-term profitability.</p>
    <p><strong>OmniStock POS</strong> is a production-ready, zero-defect Point of Sale and Inventory Management Engine tailored for high-volume retail chains, supermarkets, pharmacies, hardware outlets, and commercial enterprises.</p>
    
    <div class="feature-title" style="margin-top: 25px;">⚡ Flagship Enterprise Capabilities:</div>
    <ul class="feature-list">
      <li class="feature-item"><strong>📊 Automated Daily Reporting & Instant Profit Calculation:</strong> Real-time Cost of Goods Sold (COGS) tracking and net profit margins across all store branches.</li>
      <li class="feature-item"><strong>⚖️ Recipe, Portion & Stock Variance Control:</strong> Unit-level and ingredient-level deduction engine with automated pilferage and anomaly detection.</li>
      <li class="feature-item"><strong>🔔 Instant Low Stock & Theft Anomaly Guard:</strong> Automated alerts when inventory drops below critical thresholds or exhibits unexplained loss.</li>
      <li class="feature-item"><strong>🚀 Sub-10ms Barcode Telemetry HUD:</strong> Rapid optical GTIN/EAN scanning for high-speed cashier checkout operations.</li>
      <li class="feature-item"><strong>🧾 Interactive 80mm Thermal Receipt Generator:</strong> Instant visual thermal receipt generation with custom store branding and QR verification.</li>
      <li class="feature-item"><strong>📶 100% Offline Dexie.js Sync Engine:</strong> Zero-downtime sales processing during internet outages with seamless cloud re-syncing upon connection.</li>
    </ul>

    <div class="feature-title" style="margin-top: 20px;">💰 Flexible Enterprise Licensing:</div>
    <p style="font-size: 14px; line-height: 1.6;">
      • <strong>Hosted Cloud SaaS:</strong> <span class="highlight">$299 USD / month</span> (Fully managed infrastructure, automatic backups, 99.99% uptime SLA)<br>
      • <strong>Enterprise Self-Hosted & IP Licensing:</strong> <span class="highlight">$4,999 USD</span> (One-time payment, complete codebase deployment on your private servers)
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://omnistock-pos.surge.sh" class="cta-button" target="_blank">LAUNCH INTERACTIVE LIVE POS DEMO</a>
    </div>

    <div class="footer">
      <p>OmniStock Software Factory & Enterprise Solutions<br>
      Live Demonstration: <a href="https://omnistock-pos.surge.sh" style="color: #60A5FA;">https://omnistock-pos.surge.sh</a><br>
      Showcase Hub: <a href="https://gatzdevs.surge.sh" style="color: #60A5FA;">https://gatzdevs.surge.sh</a></p>
    </div>
  </div>
</body>
</html>
"""

        msg.attach(MIMEText(body_plain, 'plain', 'utf-8'))
        msg.attach(MIMEText(body_html, 'html', 'utf-8'))

        try:
            server.sendmail(sender_email, recipient_email, msg.as_string())
            dispatched_count += 1
            print(f"[{idx}/200 STORE BUYER] ✅ DISPATCHED: {recipient_email} ({company})")
            time.sleep(0.3) # Rate limit guard
        except Exception as err:
            failed_count += 1
            print(f"[{idx}/200 STORE BUYER] ❌ FAILED: {recipient_email} ({company}) -> {err}")

server.quit()

print("\n---------------------------------------------------------------------------")
print(f"✨ BATCH DISPATCH SUMMARY: {dispatched_count} Sent | {failed_count} Failed | Sender: {sender_email}")
print("===========================================================================")
