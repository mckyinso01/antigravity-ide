// 📡 LINKABLEAI ENTERPRISE SYSTEMS: REAL-TIME VISITOR TELEMETRY & EMAIL BEACON
// Sends instant notification to mckinsyo01@gmail.com when prospective clients or hospital directors visit.
// Includes session deduplication to prevent email spam.

(function() {
  const TARGET_EMAIL = "mckinsyo01@gmail.com";
  const BEACON_ENDPOINT = `https://formsubmit.co/ajax/${TARGET_EMAIL}`;

  async function getGeoContext() {
    try {
      const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        return {
          ip: data.ip || "N/A",
          city: data.city || "Unknown City",
          region: data.region || "Unknown Region",
          country: data.country_name || "Unknown Country",
          org: data.org || "Unknown ISP/Org"
        };
      }
    } catch {
      // Fallback if adblocker blocks ipapi
    }
    return {
      ip: "Masked",
      city: "Unknown",
      region: "Unknown",
      country: "Global/VPN",
      org: "Unknown"
    };
  }

  async function sendEmailBeacon(eventType, details = {}) {
    const geo = await getGeoContext();
    const payload = {
      _subject: eventType === 'PAGE_VISIT' 
        ? `🚨 [LinkableAI Lead] New Visitor from ${geo.city}, ${geo.country}`
        : `🔥 [High-Intent Action] ${details.actionName || 'Key Action'} (${geo.city}, ${geo.country})`,
      _template: "table",
      _captcha: "false",
      "Event Type": eventType,
      "Target Page": window.location.href,
      "Estimated Location": `${geo.city}, ${geo.region}, ${geo.country} (IP: ${geo.ip})`,
      "Network Provider / Hospital ISP": geo.org,
      "Referrer Source": document.referrer ? document.referrer : "Direct Entry / Cold Email Proposal",
      "Screen & Viewport": `${window.innerWidth}x${window.innerHeight} (${screen.width}x${screen.height})`,
      "Device Platform": navigator.platform || "Unknown",
      "Browser Info": navigator.userAgent,
      "Timestamp": new Date().toLocaleString(),
      ...details
    };

    try {
      await fetch(BEACON_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn("Telemetry beacon status: local buffer", err);
    }
  }

  // 1. Initial Page Visit (Throttled per session)
  if (!sessionStorage.getItem("linkable_visitor_beacon_sent")) {
    sessionStorage.setItem("linkable_visitor_beacon_sent", "true");
    setTimeout(() => {
      sendEmailBeacon("PAGE_VISIT");
    }, 1500);
  }

  // 2. High-Intent Conversions: Clicks on Launch Demo
  document.addEventListener("click", function(e) {
    const target = e.target.closest("a, button");
    if (!target) return;

    const text = (target.textContent || "").trim();
    const href = target.getAttribute("href") || "";

    if (href.includes("clinical-pristine") || text.includes("Launch Demo")) {
      const demoKey = `demo_clicked_${Date.now()}`;
      if (!sessionStorage.getItem("linkable_demo_beacon_sent")) {
        sessionStorage.setItem("linkable_demo_beacon_sent", "true");
        sendEmailBeacon("DEMO_CLICKED", {
          actionName: "Prospect Clicked Launch Demo (Clinical Pristine OS)",
          targetApp: "Clinical Pristine OS",
          targetUrl: href
        });
      }
    }

    if (href.includes("pm.link") || href.includes("PayMongo") || text.includes("Pay via PayMongo")) {
      sendEmailBeacon("PRICING_TIER_CLICKED", {
        actionName: `Prospect Clicked Commercial Pricing Checkout: ${text}`,
        checkoutUrl: href
      });
    }
  });

})();
