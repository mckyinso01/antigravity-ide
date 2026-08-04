# 🛡️ New Product Publishing & Website Domain Isolation Protocol

## Executive Summary
This document establishes the mandatory, non-bypassable workflow for adding new products to the GatzDevs software suite and publishing them to the web without corrupting or overwriting the master website (`gatzdevs.surge.sh`).

---

## 🔒 Standalone Application Subdomain Registry

| Application Name | Local Repository Directory | Official Dedicated Live URL | Isolation Boundary |
| :--- | :--- | :--- | :--- |
| **GatzDevs Master Website** | `c:\Users\Admin\.antigravity-ide\GatzDevPortfolio` | **`https://gatzdevs.surge.sh`** | **PROTECTED LAUNCHER HUB** |
| **OmniStock POS** | `c:\Users\Admin\.antigravity-ide\omnistock` | `https://omnistock-pos.surge.sh` | Dedicated POS Subdomain |
| **EMS Workforce Console** | `c:\Users\Admin\.antigravity-ide\EMS` | `https://ems-workforce.surge.sh` | Dedicated EMS Subdomain |
| **LEAD SUITE PRO** | `c:\Users\Admin\.gemini\antigravity\scratch\Lead-suite-Pro` | `https://leadsuite-pro.surge.sh` | Dedicated Lead CRM Subdomain |
| **GuroGen AI Studio** | `c:\Users\Admin\.gemini\antigravity\scratch\gurogen-ai` | `https://gurogen-ai.surge.sh` | Dedicated AI Studio Subdomain |

---

## 📋 The 4-Step Mandatory Publishing Workflow (`NEW-PRODUCT-PUBLISH-PROTOCOL`)

1. **Step 1: Deploy Product to Dedicated Subdomain**
   - Build the new standalone application inside its dedicated repository.
   - Run `npx surge dist <dedicated-subdomain>.surge.sh`.
   - **PROHIBITED**: Never target `gatzdevs.surge.sh` with a standalone app build folder.

2. **Step 2: Add Showcase Card to Master Website (`GatzDevPortfolio`)**
   - Open `c:\Users\Admin\.antigravity-ide\GatzDevPortfolio\index.html`.
   - Insert a new product showcase tile with Stitch Variation B styling, 4-tier commercial pricing, and feature tags.
   - Wire the action button to the product's dedicated live URL: `<a href="https://<dedicated-subdomain>.surge.sh" target="_blank">Launch App</a>`.

3. **Step 3: Update Specs & Governance Index**
   - Record the new product and URL in `specs.md` and `master_component_checklist.md`.

4. **Step 4: Re-Deploy Master Website**
   - Deploy `GatzDevPortfolio` to `https://gatzdevs.surge.sh`.
   - Verification: Confirm `https://gatzdevs.surge.sh` renders the full GatzDevs portfolio displaying the new product card with working launch link.
