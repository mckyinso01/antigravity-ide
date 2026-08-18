// 📡 CLINICAL PRISTINE OS: REAL-TIME HOSPITAL VISITOR EMAIL BEACON
// Sends instant telemetry notification to mckinsyo01@gmail.com when hospital directors, nurses, or evaluators launch the application.

const TARGET_EMAIL = "mckinsyo01@gmail.com";
const BEACON_ENDPOINT = `https://formsubmit.co/ajax/${TARGET_EMAIL}`;

interface GeoInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  org: string;
}

async function fetchGeoContext(): Promise<GeoInfo> {
  try {
    const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      return {
        ip: data.ip || "N/A",
        city: data.city || "Unknown City",
        region: data.region || "Unknown Region",
        country: data.country_name || "Unknown Country",
        org: data.org || "Hospital ISP / Network"
      };
    }
  } catch {
    // Silently fall back if blocked
  }
  return {
    ip: "Protected",
    city: "Unknown",
    region: "Unknown",
    country: "Global/VPN",
    org: "Protected ISP"
  };
}

export async function initClinicalVisitorBeacon(appName: string = "Clinical Pristine OS") {
  if (sessionStorage.getItem("pristine_visitor_beacon_sent")) {
    return;
  }
  sessionStorage.setItem("pristine_visitor_beacon_sent", "true");

  setTimeout(async () => {
    try {
      const geo = await fetchGeoContext();
      const payload = {
        _subject: `🏥 [Hospital Lead] New Visitor Launched ${appName} (${geo.city}, ${geo.country})`,
        _template: "table",
        _captcha: "false",
        "Application": appName,
        "Target Route": window.location.href,
        "Estimated Location": `${geo.city}, ${geo.region}, ${geo.country} (IP: ${geo.ip})`,
        "Healthcare Network / ISP": geo.org,
        "Referrer": document.referrer || "Direct Link / Proposal Submission",
        "Screen Resolution": `${window.innerWidth}x${window.innerHeight}`,
        "Device Platform": navigator.platform || "Workstation",
        "User Agent": navigator.userAgent,
        "Timestamp": new Date().toLocaleString()
      };

      await fetch(BEACON_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn("Clinical telemetry beacon active", err);
    }
  }, 1500);
}

export async function trackClinicalIntentAction(actionName: string, details: Record<string, any> = {}) {
  try {
    const geo = await fetchGeoContext();
    const payload = {
      _subject: `🔥 [Clinical Intent] Hospital Lead Action: ${actionName} (${geo.city}, ${geo.country})`,
      _template: "table",
      _captcha: "false",
      "Action": actionName,
      "Location": `${geo.city}, ${geo.country}`,
      "Timestamp": new Date().toLocaleString(),
      ...details
    };

    await fetch(BEACON_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.warn("Clinical intent telemetry buffered", err);
  }
}
