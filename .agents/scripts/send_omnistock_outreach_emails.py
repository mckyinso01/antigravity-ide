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

# Lead Target Prospects Matrix for OmniStock POS & Inventory Engine
targets = [
    {
        "name": "OmniStock Developer & Owner Direct Alert",
        "email": "mckinsyo01@gmail.com",
        "business": "Gatz Systems Studio & Retail Partners",
        "role": "Owner / Lead Architect"
    }
]

print("===========================================================================")
print("🚀 OMNISTOCK POS LIVE OUTREACH & EMAIL DISPATCH ENGINE")
print("===========================================================================")
print(f"▶ Authenticating Gmail SMTP Server (smtp.gmail.com:587) as {sender_email}...")

dispatched_count = 0
failed_count = 0

for idx, t in enumerate(targets, 1):
    try:
        msg = MIMEMultipart('alternative')
        msg['From'] = f"Gatz Systems Studio <{sender_email}>"
        msg['To'] = t['email']
        msg['Subject'] = f"🚨 OmniStock POS Live Deployment Verified: Enterprise POS & Inventory Engine ({t['business']})"

        body_text = f"""Dear {t['name']} ({t['role']}),

We are thrilled to announce that OmniStock Enterprise POS & Inventory System is now OFFICIALLY LIVE ONLINE!

---

### 🌐 LIVE APPLICATION & SHOWCASE LINKS:
- 🛒 Live OmniStock POS App: https://omnistock-pos.surge.sh
- 🏢 Studio Showcase Hub: https://gatzdevs.surge.sh

---

### 🛡️ KEY FEATURES IN THIS PRODUCTION RELEASE:
1. ⚡ Barcode Telemetry & GTIN/EAN Scanner HUD (Sub-10ms Lookup)
2. 📄 80mm Thermal Receipt Visual Preview Modal & Printer Engine
3. 🔌 Dexie.js Offline DB Sync Status Header Badge (100% Offline-Ready)
4. 💰 Commercial Pricing Tiers (₱299/mo Basic, ₱599/mo Pro, $299/mo Cloud, $4,999 Self-Hosted)
5. 📧 Instant Owner Notification Alert Dispatcher to mckinsyo01@gmail.com

---

Best regards,

Gatz Systems Studio
Lead Architect: mckinsyo01@gmail.com
Studio Showcase: https://gatzdevs.surge.sh
"""
        msg.attach(MIMEText(body_text, 'plain', 'utf-8'))

        server = smtplib.SMTP('smtp.gmail.com', 587, timeout=15)
        server.starttls()
        server.login(sender_email, password)
        server.sendmail(sender_email, t['email'], msg.as_string())
        server.quit()

        dispatched_count += 1
        print(f"[{idx}/{len(targets)}] ✅ DISPATCHED SUCCESS: {t['email']} ({t['business']})")
        time.sleep(1)

    except Exception as e:
        failed_count += 1
        print(f"[{idx}/{len(targets)}] ❌ DISPATCH FAILED: {t['email']} -> {e}")

print("---------------------------------------------------------------------------")
print(f"✨ DISPATCH RESULTS: {dispatched_count} Sent | {failed_count} Failed | Sender: {sender_email}")
print("===========================================================================")
