// 📡 LINKABLEAI DIRECT TELEGRAM & CLOUD VISITOR TELEMETRY BEACON
// Version: 2.1.0 (Zero FormSubmit Activation & Full Type-Safe Method Exports)

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
        org: data.org || "Enterprise ISP / Network"
      };
    }
  } catch {
    // Silent fallback
  }
  return {
    ip: "Protected",
    city: "Unknown",
    region: "Unknown",
    country: "Global/VPN",
    org: "Protected ISP"
  };
}

export async function logVisitorTelemetry(appName: string = "LinkableAI App") {
  if (sessionStorage.getItem(`linkable_beacon_${appName}`)) {
    return;
  }
  sessionStorage.setItem(`linkable_beacon_${appName}`, "true");

  setTimeout(async () => {
    try {
      const geo = await fetchGeoContext();
      const urlParams = new URLSearchParams(window.location.search);
      const prospect = urlParams.get('prospect') || 'Direct Visitor';

      const alertPayload = {
        app: appName,
        prospect: prospect,
        location: `${geo.city}, ${geo.region}, ${geo.country}`,
        ip: geo.ip,
        network: geo.org,
        url: window.location.href,
        timestamp: new Date().toISOString()
      };

      window.dispatchEvent(new CustomEvent('linkable_visitor_event', { detail: alertPayload }));
      console.log(`[LinkableAI Beacon] Live event:`, alertPayload);
    } catch {
      // Non-blocking
    }
  }, 1200);
}

export async function trackLeadAction(actionName: string, metadata: Record<string, unknown> = {}) {
  try {
    console.log(`[LinkableAI Action Tracked] ${actionName}:`, metadata);
    window.dispatchEvent(new CustomEvent('linkable_action_event', { detail: { actionName, metadata, timestamp: new Date().toISOString() } }));
  } catch {
    // Non-blocking
  }
}

// Named exports for specific app compatibility:
export const initClinicalVisitorBeacon = (appName: string = "Clinical Pristine OS") => logVisitorTelemetry(appName);
export const initOmniStockVisitorBeacon = (appName: string = "OmniStock Spatial WMS") => logVisitorTelemetry(appName);
export const initSiteSafeVisitorBeacon = (appName: string = "SiteSafe Industrial OS") => logVisitorTelemetry(appName);
export const initSaccadeVisitorBeacon = (appName: string = "Saccade Biometric CRO") => logVisitorTelemetry(appName);

export const trackHighIntentAction = (action: string, meta?: Record<string, unknown>) => trackLeadAction(action, meta);
export const trackSiteSafeLeadAction = (action: string, meta?: Record<string, unknown>) => trackLeadAction(action, meta);
export const trackSaccadeIntentAction = (action: string, meta?: Record<string, unknown>) => trackLeadAction(action, meta);
export const trackClinicalIntentAction = (action: string, meta?: Record<string, unknown>) => trackLeadAction(action, meta);
