// 📡 OMNISTOCK ERP: REAL-TIME LOGISTICS VISITOR EMAIL BEACON
// Dispatches real-time visitor alerts to mckinsyo01@gmail.com when warehouse executives, 3PL managers, and prospects launch the platform.

const TARGET_EMAIL = 'mckinsyo01@gmail.com';
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
    const res = await fetch('https://ipapi.co/json/', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      return {
        ip: data.ip || 'N/A',
        city: data.city || 'Unknown City',
        region: data.region || 'Unknown Region',
        country: data.country_name || 'Unknown Country',
        org: data.org || 'Logistics ISP / Network'
      };
    }
  } catch {
    // Fallback if blocked
  }
  return {
    ip: 'Protected',
    city: 'Unknown',
    region: 'Unknown',
    country: 'Global/VPN',
    org: 'Protected ISP'
  };
}

export async function initOmniStockVisitorBeacon(appName: string = 'OmniStock ERP') {
  if (sessionStorage.getItem('omnistock_visitor_beacon_sent')) {
    return;
  }
  sessionStorage.setItem('omnistock_visitor_beacon_sent', 'true');

  setTimeout(async () => {
    try {
      const geo = await fetchGeoContext();
      const payload = {
        _subject: `📦 [OmniStock Lead] New 3PL / Logistics Prospect Launched ${appName} (${geo.city}, ${geo.country})`,
        _template: 'table',
        _captcha: 'false',
        'Application': appName,
        'Target Route': window.location.href,
        'Estimated Location': `${geo.city}, ${geo.region}, ${geo.country} (IP: ${geo.ip})`,
        'Enterprise Network / ISP': geo.org,
        'Referrer': document.referrer || 'Cold Outreach Email / Direct Link',
        'Screen Resolution': `${window.innerWidth}x${window.innerHeight}`,
        'Device Platform': navigator.platform || 'Workstation',
        'User Agent': navigator.userAgent,
        'Timestamp': new Date().toLocaleString()
      };

      await fetch(BEACON_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('OmniStock telemetry active', err);
    }
  }, 1500);
}

export async function trackHighIntentAction(actionName: string, details: Record<string, any> = {}) {
  try {
    const geo = await fetchGeoContext();
    const payload = {
      _subject: `🔥 [High-Intent Action] Prospect Clicked: ${actionName} (${geo.city}, ${geo.country})`,
      _template: 'table',
      _captcha: 'false',
      'Action': actionName,
      'Location': `${geo.city}, ${geo.country}`,
      'Timestamp': new Date().toLocaleString(),
      ...details
    };

    await fetch(BEACON_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.warn('Action telemetry buffer', err);
  }
}
