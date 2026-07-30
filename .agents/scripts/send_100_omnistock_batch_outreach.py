import smtplib
import sys
import time
import json
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

sender_email = "mckinsyo01@gmail.com"
password = "lrqjsqnmwzaunjho"

lead_matrix_path = os.path.join(os.path.dirname(__file__), "..", "..", "omnistock", "verified_100_businesses_matrix.json")

if not os.path.exists(lead_matrix_path):
    print(f"❌ Error: Lead matrix file not found at {lead_matrix_path}")
    sys.exit(1)

with open(lead_matrix_path, 'r', encoding='utf-8') as f:
    businesses = json.load(f)

print("===========================================================================")
print(f"🚀 OMNISTOCK BATCH DISPATCH ENGINE: 100 DUAL-VERIFIED BUSINESSES")
print("===========================================================================")
print(f"▶ Loaded {len(businesses)} Dual-Verified Establishments from verified_100_businesses_matrix.json")
print(f"▶ Authenticating Gmail SMTP Server (smtp.gmail.com:587) as {sender_email}...\n")

dispatched_count = 0
failed_count = 0
dispatched_records = []

# Process batch dispatch for verified emails of each business
for idx, biz in enumerate(businesses, 1):
    for target_email in biz['verified_emails']:
        try:
            msg = MIMEMultipart('alternative')
            msg['From'] = f"Gatz Systems Studio <{sender_email}>"
            msg['To'] = target_email
            msg['Subject'] = f"🚨 Working Prototype Ready: OmniStock POS System for {biz['company']}"

            body_text = f"""Dear Executive Leadership ({biz['company']}),

We noticed your active retail operations on domain ({biz['domain']}) and your need for a modern, zero-defect Point of Sale & Inventory Management System to eliminate stock shrinkage and accelerate cashier checkout speeds.

Rather than sending generic PDF decks or requiring sales calls, we went ahead and pre-built a 100% production-ready, zero-defect Web Application: OmniStock POS — live and interactive right now on the web:

---

### 🌐 DIRECT 1-CLICK LIVE APPLICATION & SHOWCASE:
- 🛒 Live OmniStock POS App: https://omnistock-pos.surge.sh
- 🏢 Studio Showcase Hub: https://gatzdevs.surge.sh

---

### 🛡️ KEY ARCHITECTURAL ADVANTAGES BUILT FOR YOUR STORES:
1. ⚡ Sub-10ms Barcode Telemetry Scanner HUD: Instant GTIN/EAN SKU barcode identification and price lookup.
2. 📄 Interactive 80mm Thermal Receipt Preview Engine: Live pop-up visual receipt inspector with sub-second receipt printing.
3. 🔌 Dexie.js Offline Database Sync: 100% offline-ready store register ensuring zero downtime during internet outages.
4. 🧹 3-Step Automated Client Data Purge Wizard: 1-click database sanitization clearing demo catalogs and provisioning a 100% clean production store register.
5. 💰 Transparent Commercial Pricing: Available via Hosted Cloud ($299/mo) or Enterprise Self-Hosted ($4,999 One-Time Perpetual License).

If there are any custom features, API schema integrations, or receipt layout tweaks you would like adjusted, WE ARE 100% COMMITTED TO REFACTORING AND COMPILING THE CODE TO YOUR EXACT SPECIFICATIONS.

Best regards,

Lead Architect (gatzdevs)
mckinsyo01@gmail.com • https://gatzdevs.surge.sh
"""
            msg.attach(MIMEText(body_text, 'plain', 'utf-8'))

            server = smtplib.SMTP('smtp.gmail.com', 587, timeout=15)
            server.starttls()
            server.login(sender_email, password)
            server.sendmail(sender_email, target_email, msg.as_string())
            server.quit()

            dispatched_count += 1
            print(f"[{idx}/{len(businesses)} BIZ] ✅ DISPATCHED: {target_email} ({biz['company']})")
            time.sleep(0.3)

        except Exception as e:
            failed_count += 1
            print(f"[{idx}/{len(businesses)} BIZ] ❌ DISPATCH FAILED: {target_email} -> {e}")

print("\n---------------------------------------------------------------------------")
print(f"✨ BATCH DISPATCH SUMMARY: {dispatched_count} Sent | {failed_count} Failed | Sender: {sender_email}")
print("===========================================================================")
