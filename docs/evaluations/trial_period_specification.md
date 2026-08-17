# ⏱️ 48-Hour Full-Access Sandbox Trial Engine Specification

## 1. Overview & Business Objectives
Every standalone application in the Gatz software ecosystem (`OmniStock`, `EMS Enterprise`, `LeadSuite Pro`, etc.) includes an integrated **48-Hour Full-Access Sandbox Trial Pass**.

This mechanism gives evaluators, prospective business clients, and enterprise leads 48 hours of unrestricted access to all features (transactions, exports, reports, camera scanner) with a built-in renewal and payment bridge.

---

## 2. Technical Architecture

### 2.1 State & Timestamp Tracking
* **Key Storage**: `localStorage.getItem('gatz_trial_session')`
* **Duration**: Exactly **48 Hours** (`48 * 60 * 60 * 1000` ms = 172,800,000 ms).
* **Payload Structure**:
  ```json
  {
    "app_id": "omnistock-pos",
    "activated_at": 1755216000000,
    "expires_at": 1755388800000,
    "renewal_count": 0,
    "tier": "enterprise_trial"
  }
  ```

---

## 3. UI Components

### 3.1 Persistent Top Countdown HUD Pill
* Displays real-time hours and minutes remaining (`⏱️ 48h Full Sandbox Pass: 47h 52m remaining`).
* Includes a 1-click **"Acquire Permanent License (₱85k / $1.5k)"** CTA button leading to GCash / Bank Wire checkout.

### 3.2 48-Hour Expiration & Renewal Modal
When `Date.now() >= expires_at`:
1. Modal locks UI interaction gracefully with a glassmorphic overlay.
2. Displays:
   * **"Your 48-Hour Sandbox Evaluation has Concluded."**
   * Summary of actions taken during the trial (e.g. transactions processed, reports generated).
   * **Option A: "Purchase Permanent IP & Cloud Deployment"** (GCash QR / Bank Wire: `005790246533`).
   * **Option B: "Renew 48-Hour Trial Pass"** (1-Click Instant Renewal with fresh 48-hour window).

---

## 4. Zero-Friction Renewal Guarantee
To prevent frustrating genuine evaluators, renewal is instantaneous and preserves all user-entered sandbox data in IndexedDB/LocalStorage.
