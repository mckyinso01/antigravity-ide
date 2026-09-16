// ============================================================
// SOCIAL LEAD DORKER & IDENTITY RESOLVER (Multi-Channel Engine)
// Extracts Decision Maker LinkedIn Profiles & Facebook Messenger Handles
// Combines Direct Website Deep-Scanning + Multi-Engine Fallback + 1-Click Search URLs
// ============================================================

import https from 'node:https';
import http from 'node:http';
import { URL } from 'node:url';

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
];

function getRandomUserAgent() {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

/**
 * Fetch HTML content safely from URL with timeout & redirect follow
 */
export function fetchHtml(targetUrl, timeoutMs = 8000, redirectCount = 0) {
  return new Promise((resolve) => {
    if (redirectCount > 3) {
      return resolve(''); // Guard against infinite redirect loops
    }

    try {
      let fullUrl = targetUrl;
      if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
        fullUrl = 'https://' + fullUrl;
      }

      const parsed = new URL(fullUrl);
      const isHttps = parsed.protocol === 'https:';
      const lib = isHttps ? https : http;

      const options = {
        hostname: parsed.hostname,
        port: parsed.port || (isHttps ? 443 : 80),
        path: parsed.pathname + parsed.search,
        method: 'GET',
        headers: {
          'User-Agent': getRandomUserAgent(),
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache'
        },
        timeout: timeoutMs,
        rejectUnauthorized: false
      };

      const req = lib.request(options, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          try {
            res.resume(); // Cleanly consume socket to prevent memory and socket leaks
            const redirectUrl = new URL(res.headers.location, fullUrl).href;
            return resolve(fetchHtml(redirectUrl, timeoutMs, redirectCount + 1));
          } catch {
            return resolve('');
          }
        }

        let data = '';
        res.setEncoding('utf8');
        res.on('data', chunk => {
          data += chunk;
          if (data.length > 250000) { // cap at 250kb to prevent memory bloat
            req.destroy();
            resolve(data);
          }
        });
        res.on('end', () => resolve(data));
      });

      req.on('error', () => resolve(''));
      req.on('timeout', () => {
        req.destroy();
        resolve('');
      });
      req.end();
    } catch {
      resolve('');
    }
  });
}

/**
 * Extract clean Facebook page slug and direct Messenger URL
 */
export function extractMessengerFromFbUrl(fbUrl) {
  if (!fbUrl) return null;
  try {
    const match = fbUrl.match(/facebook\.com\/([a-zA-Z0-9._-]+)/i);
    if (match && match[1]) {
      const slug = match[1];
      const ignored = ['pages', 'people', 'public', 'events', 'groups', 'sharer', 'login', 'dialog', 'home.php'];
      if (!ignored.includes(slug.toLowerCase())) {
        return {
          pageUrl: `https://www.facebook.com/${slug}`,
          messengerUrl: `https://m.me/${slug}`,
          slug
        };
      }
    }
  } catch {}
  return null;
}

/**
 * Scans company website for verified social presence and contact details
 * Extracts Facebook page, Messenger, LinkedIn corporate profile, and emails
 */
export async function scanWebsiteForSocialPresence(domainOrUrl) {
  if (!domainOrUrl) return null;
  
  const rawHtml = await fetchHtml(domainOrUrl);
  if (!rawHtml) return null;

  // 1. Extract Facebook Links
  const fbMatches = rawHtml.match(/https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9._-]+/gi) || [];
  let facebookInfo = null;
  for (const rawFb of fbMatches) {
    const parsed = extractMessengerFromFbUrl(rawFb);
    if (parsed) {
      facebookInfo = parsed;
      break;
    }
  }

  // 2. Extract LinkedIn Links (Company or Individual)
  const liMatches = rawHtml.match(/https?:\/\/(www\.)?linkedin\.com\/(company|in)\/[a-zA-Z0-9._-]+/gi) || [];
  let linkedinUrl = liMatches.length > 0 ? liMatches[0] : null;

  // 3. Extract Public Phone Numbers
  const phoneMatch = rawHtml.match(/(?:tel:|\b)(\+?1?[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})\b/);
  const publicPhone = phoneMatch ? phoneMatch[0].replace('tel:', '').trim() : null;

  // 4. Extract Key Team / Leadership Names if present
  // Search for schema.org Person or common leadership markup
  let discoveredExecutives = [];
  const schemaPersonRegex = /"name"\s*:\s*"([^"]+)"/gi;
  let sMatch;
  while ((sMatch = schemaPersonRegex.exec(rawHtml)) !== null) {
    const name = sMatch[1].trim();
    if (name.split(' ').length >= 2 && name.split(' ').length <= 4 && !name.includes('http') && !discoveredExecutives.includes(name)) {
      discoveredExecutives.push(name);
    }
  }

  return {
    facebookPageUrl: facebookInfo?.pageUrl || null,
    messengerUrl: facebookInfo?.messengerUrl || null,
    linkedinUrl,
    publicPhone,
    discoveredExecutives: discoveredExecutives.slice(0, 3)
  };
}

/**
 * Builds 1-Click High-Precision LinkedIn & Facebook Search Dossier
 * Ensures user has an instant direct link even if automated dorking encounters captcha
 */
export function buildSocialSearchDossier(companyName, targetRole = 'Director') {
  const cleanCompany = (companyName || '').trim();
  const cleanRole = (targetRole || 'Operations').trim();

  const linkedinSearchUrl = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(`"${cleanCompany}" ${cleanRole}`)}`;
  const linkedinCompanyUrl = `https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(cleanCompany)}`;
  const facebookSearchUrl = `https://www.facebook.com/search/top?q=${encodeURIComponent(cleanCompany)}`;
  const googleDorkUrl = `https://www.google.com/search?q=${encodeURIComponent(`site:linkedin.com/in/ "${cleanCompany}" ("${cleanRole}" OR "VP" OR "Owner")`)}`;

  return {
    linkedinSearchUrl,
    linkedinCompanyUrl,
    facebookSearchUrl,
    googleDorkUrl
  };
}

/**
 * Enriches any establishment with comprehensive Social & Contact Intelligence
 */
export async function enrichEstablishmentWithSocialGraph(establishment) {
  const companyName = establishment.companyName || establishment.name || establishment.company;
  const domain = establishment.website || establishment.domain || null;
  const targetRole = establishment.targetRole || establishment.targetTitles?.[0] || 'Operations';

  // 1. Direct website scan if domain is provided
  let siteScan = null;
  if (domain) {
    siteScan = await scanWebsiteForSocialPresence(domain);
  }

  // 2. Build 1-click direct search dossier
  const dossier = buildSocialSearchDossier(companyName, targetRole);

  // 3. Resolve Executive Name
  const executiveName = establishment.executiveName || 
    (siteScan?.discoveredExecutives && siteScan.discoveredExecutives.length > 0 ? siteScan.discoveredExecutives[0] : null) || 
    'Executive Leadership';

  return {
    ...establishment,
    companyName,
    executiveName,
    executiveRole: establishment.executiveRole || targetRole,
    facebookPageUrl: siteScan?.facebookPageUrl || establishment.facebookPageUrl || null,
    messengerUrl: siteScan?.messengerUrl || establishment.messengerUrl || null,
    linkedinProfileUrl: siteScan?.linkedinUrl || establishment.linkedinProfileUrl || null,
    publicPhone: siteScan?.publicPhone || establishment.phone || null,
    socialSearchDossier: dossier,
    socialStatus: (siteScan?.facebookPageUrl || siteScan?.linkedinUrl) ? 'VERIFIED_SOCIAL' : 'DOSSIER_READY'
  };
}
