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

lead_matrix_path = os.path.join(os.path.dirname(__file__), "..", "..", "omnistock", "verified_100_buyers_matrix.json")

if not os.path.exists(lead_matrix_path):
    print(f"❌ Error: Lead matrix file not found at {lead_matrix_path}")
    sys.exit(1)

with open(lead_matrix_path, 'r', encoding='utf-8') as f:
    buyers = json.load(f)

print("===========================================================================")
print(f"🚀 OMNISTOCK BATCH DISPATCH ENGINE: 100 VERIFIED F&B & RESTAURANT BUYERS")
print("===========================================================================")
print(f"▶ Loaded {len(buyers)} Dual-Verified F&B Outlets from verified_100_buyers_matrix.json")
print(f"▶ Authenticating Gmail SMTP Server (smtp.gmail.com:587) as {sender_email}...\n")

dispatched_count = 0
failed_count = 0
dispatched_records = []

# Process batch dispatch for verified emails of each buyer outlet
for idx, b in enumerate(buyers, 1):
    for target_email in b['verified_emails']:
        try:
            msg = MIMEMultipart('alternative')
            msg['From'] = f"Gatz Systems Studio <{sender_email}>"
            msg['To'] = target_email
            msg['Subject'] = f"🚨 OmniStock POS: Automated Ingredient Recipe Tracking & Sub-Second Checkout for {b['company']}"

            body_text = f"""Dear Executive Leadership & Operations Team ({b['company']}),

We noticed your active coffee shop, milk tea, restaurant, or retail store operations on domain ({b['domain']}). We pre-built a 100% production-ready Web Application: OmniStock POS — live and interactive right now on the web:

👉 Live App: https://omnistock-pos.surge.sh
👉 Studio Hub: https://gatzdevs.surge.sh

---

### ☕ 1. PAANO NAKAKATULONG ANG PROPER INGREDIENT RECIPE & PORTION TRACKING SA NEGOSYO?

1. 🥛 Automated Ingredient Portion Deduction:
   - Bawat order ng kape o milk tea (hal. Espresso, Pearl Milk Tea) ay awtomatikong nagkakaltas ng eksaktong gramo ng beans (18g), ml ng gatas (150ml), at shots ng syrup.
   
2. 🛡️ Iwas-Tapon at Iwas-Kupit (Waste & Theft Prevention):
   - Pinipigilan ang sobra-sobrang pagbuhos ng sangkap at hindi naitalang libreng inumin, na nagpapataas ng inyong Profit Margin nang hanggang +25% to 30%!

3. 🚨 Real-Time Low Ingredient Alert:
   - Awtomatikong nagbibigay ng babala kapag ang coffee beans, pearls, gatas, o packaging cups ay malapit nang maubos upang hindi maudlot ang benta.

---

### 🛒 2. PAANO MAKAKATULONG SA INYONG RETAIL STORES & BRANCHES ANG OMNISTOCK POS?

1. ⚡ Sub-10ms Barcode Telemetry & Sub-Second Checkout:
   - Mabilis na pag-scan ng SKU barcodes upang maiwasan ang mahabang pila sa cashier counter.

2. 📄 Interactive 80mm Thermal Receipt Printing:
   - Mabilis na pag-print ng resibo na may malinaw na itemized breakdown para sa customer.

3. 🔌 100% Offline-Ready Store Register (Dexie.js DB):
   - Patuloy ang benta at cashier checkout kahit mawalan ng koneksyon sa internet.

4. 💰 Transparent Commercial Pricing:
   - Available via Hosted Cloud ($299/mo) or Enterprise Self-Hosted ($4,999 One-Time Perpetual License with 100% Source Code Ownership).

---

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
            print(f"[{idx}/{len(buyers)} F&B BUYER] ✅ DISPATCHED: {target_email} ({b['company']})")
            time.sleep(0.3)

        except Exception as e:
            failed_count += 1
            print(f"[{idx}/{len(buyers)} F&B BUYER] ❌ DISPATCH FAILED: {target_email} -> {e}")

print("\n---------------------------------------------------------------------------")
print(f"✨ BATCH DISPATCH SUMMARY: {dispatched_count} Sent | {failed_count} Failed | Sender: {sender_email}")
print("===========================================================================")
