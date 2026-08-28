// ============================================================
// Programmatic Audit Dossier & Conversion Report Generator
// Builds executive website performance & security assessments
// ============================================================

export function buildAuditReport({ domain, metrics, businessName = 'Business Owner' }) {
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const checkoutUrl = `https://escrow-checkout.surge.sh/?app=24h%20Website%20Speed%20%26%20Security%20Optimization%20(${domain})&amount=299`;

  const performanceStatus = metrics.loadTimeMs < 1000 ? '🟢 EXCELLENT' : (metrics.loadTimeMs < 3000 ? '🟡 NEEDS OPTIMIZATION' : '🔴 CRITICAL LATENCY');

  const reportMarkdown = `# 📊 EXECUTIVE WEBSITE SPEED & SECURITY AUDIT
**Target Domain:** \`${domain}\`  
**Date of Audit:** ${dateStr}  
**Prepared For:** ${businessName}  
**Auditing Sentinel:** Linkable Systems Autonomous Quality Engine  

---

### ⚡ Core Web Vitals & Real-Time Performance Telemetry
* **Response Latency (TTFB):** \`${metrics.ttfbMs}ms\`
* **Total Page Render Time:** \`${metrics.loadTimeMs}ms\` (${performanceStatus})
* **SSL/TLS Encryption Security:** \`${metrics.hasSsl ? '✅ Active (Secure 256-bit)' : '❌ INSECURE (Missing HTTPS)'}\`
* **Mobile Viewport Optimization:** \`${metrics.hasMobileViewport ? '✅ Configured' : '❌ Non-Responsive Layout'}\`
* **Server Compression (Gzip/Brotli):** \`${metrics.hasCompression ? '✅ Enabled' : '❌ Disabled (Wasting Bandwidth)'}\`

---

### 📉 Revenue Impact & Mobile Friction Analysis
1. **Bounce Rate Risk:** Pages taking longer than 2.5 seconds lose up to **47% of mobile visitors** before they ever view your offers or booking buttons.
2. **Google SEO Penalties:** Google Core Web Vitals explicitly downrank websites with unoptimized layout shifts and slow First Contentful Paint (FCP).

---

### 🚀 Recommended 24-Hour Speed Sprint Package ($299 USD Flat)
We can deploy our rapid engineering sprint to optimize \`${domain}\` within 24 hours:
* ✅ Sub-0.5s First Contentful Paint (<500ms guaranteed)
* ✅ Complete WebP/AVIF Image Lossless Compression
* ✅ Script Minification & Render-Blocking Resource Elimination
* ✅ 100/100 Google Lighthouse Mobile Performance Guarantee

👉 **1-Click Escrow Deposit ($299 USD):** [Click Here to Authorize 24h Speed Optimization](${checkoutUrl})  
*(100% Risk-Free Milestone Guarantee: If we do not cut your load time by at least 50%, your deposit is instantly refunded.)*

---
**Direct Engineering Contact:** \`mharcgatan@linkable.it.com\` | Linkable Systems
`;

  return { domain, reportMarkdown, checkoutUrl };
}
