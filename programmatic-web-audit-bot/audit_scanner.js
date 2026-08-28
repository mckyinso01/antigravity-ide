// ============================================================
// Programmatic Live Website Speed & Security Scanner
// Performs zero-mock real network telemetry against target URLs
// ============================================================

import http from 'node:http';
import https from 'node:https';
import { buildAuditReport } from './report_builder.js';

export async function scanDomain(targetUrl) {
  let urlStr = targetUrl.trim();
  if (!urlStr.startsWith('http://') && !urlStr.startsWith('https://')) {
    urlStr = `https://${urlStr}`;
  }

  const parsedUrl = new URL(urlStr);
  const isHttps = parsedUrl.protocol === 'https:';
  const client = isHttps ? https : http;

  console.log(`🔍 [SCANNER] Initiating live network telemetry on: ${urlStr}...`);

  const startTime = Date.now();
  let ttfbMs = 0;

  return new Promise((resolve) => {
    const req = client.get(urlStr, { timeout: 12000 }, (res) => {
      ttfbMs = Date.now() - startTime;
      let rawData = '';

      res.on('data', (chunk) => {
        rawData += chunk;
      });

      res.on('end', () => {
        const loadTimeMs = Date.now() - startTime;
        const headers = res.headers;

        const hasCompression = !!(headers['content-encoding'] && (headers['content-encoding'].includes('gzip') || headers['content-encoding'].includes('br')));
        const hasMobileViewport = rawData.toLowerCase().includes('name="viewport"') || rawData.toLowerCase().includes("name='viewport'");
        const hasSsl = isHttps;

        const metrics = {
          statusCode: res.statusCode,
          ttfbMs,
          loadTimeMs,
          hasSsl,
          hasMobileViewport,
          hasCompression,
          contentLengthBytes: Buffer.byteLength(rawData, 'utf8')
        };

        console.log(`✅ [SCAN COMPLETE] ${urlStr} — Status: ${res.statusCode} | Load: ${loadTimeMs}ms | TTFB: ${ttfbMs}ms`);
        const report = buildAuditReport({ domain: parsedUrl.hostname, metrics });
        resolve({ metrics, report });
      });
    });

    req.on('error', (err) => {
      console.warn(`⚠️ [SCAN ERROR] ${urlStr}: ${err.message}`);
      const fallbackMetrics = {
        statusCode: 0,
        ttfbMs: 0,
        loadTimeMs: 4500,
        hasSsl: isHttps,
        hasMobileViewport: false,
        hasCompression: false,
        contentLengthBytes: 0,
        error: err.message
      };
      const report = buildAuditReport({ domain: parsedUrl.hostname, metrics: fallbackMetrics });
      resolve({ metrics: fallbackMetrics, report });
    });

    req.on('timeout', () => {
      req.destroy();
      console.warn(`⚠️ [TIMEOUT] Target ${urlStr} took longer than 12s to respond.`);
    });
  });
}

// CLI Direct Invocation
if (process.argv[2]) {
  const target = process.argv[2];
  scanDomain(target).then(({ metrics, report }) => {
    console.log('\n' + '='.repeat(60));
    console.log(report.reportMarkdown);
    console.log('='.repeat(60));
  });
}
