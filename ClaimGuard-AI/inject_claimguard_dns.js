const https = require('https');

const API_KEY = 'cjcocU6AE1XU3yHA29rR';
const API_SECRET = '2Df2ATR6EfFYLcCmnYpNm3oy1yyUCsuNstT2Xie3ZJSX0TpCyMYf8wjdA8Xwpzj5';
const DOMAIN = 'linkable.it.com';

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const dataString = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'spaceship.dev',
      port: 443,
      path: path,
      method: method,
      headers: {
        'X-API-Key': API_KEY,
        'X-API-Secret': API_SECRET,
        'Content-Type': 'application/json',
        ...(dataString ? { 'Content-Length': Buffer.byteLength(dataString) } : {})
      }
    }, (res) => {
      let responseBody = '';
      res.on('data', chunk => responseBody += chunk);
      res.on('end', () => {
        try {
          const parsed = responseBody ? JSON.parse(responseBody) : {};
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject({ statusCode: res.statusCode, error: parsed, raw: responseBody });
          }
        } catch (e) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(responseBody);
          } else {
            reject({ statusCode: res.statusCode, raw: responseBody });
          }
        }
      });
    });

    req.on('error', reject);
    if (dataString) req.write(dataString);
    req.end();
  });
}

async function run() {
  console.log(`🔍 Fetching current DNS records for ${DOMAIN}...`);
  const current = await request('GET', `/api/v1/dns/records/${DOMAIN}?take=100&skip=0`);
  console.log(`Found ${current.items.length} total DNS records.`);

  // Filter only custom records
  const customRecords = current.items.filter(item => item.group?.type === 'custom');
  console.log(`Found ${customRecords.length} custom DNS records.`);

  // Format existing custom items for PUT schema
  const formattedItems = customRecords.map(r => {
    const item = {
      type: r.type,
      name: r.name,
      ttl: r.ttl
    };
    if (r.type === 'CNAME') item.cname = r.cname;
    if (r.type === 'A') item.address = r.address;
    if (r.type === 'TXT') item.value = r.value;
    return item;
  });

  // Check if claimguard already exists
  const existingClaimguard = formattedItems.find(i => i.name === 'claimguard' && i.type === 'CNAME');
  if (!existingClaimguard) {
    formattedItems.push({
      type: 'CNAME',
      name: 'claimguard',
      cname: 'na-bootstrap1.surge.sh',
      ttl: 1800
    });
    console.log(`➕ Added 'claimguard' -> CNAME 'na-bootstrap1.surge.sh' (TTL: 1800)`);
  } else {
    console.log(`ℹ️ 'claimguard' CNAME already exists in list.`);
  }

  console.log(`🚀 Sending PUT request to Spaceship API with ${formattedItems.length} records...`);
  const result = await request('PUT', `/api/v1/dns/records/${DOMAIN}`, { items: formattedItems });
  console.log('✅ Spaceship API PUT Response Success:', result);

  console.log(`\n🔍 Verifying updated records from Spaceship API...`);
  const updated = await request('GET', `/api/v1/dns/records/${DOMAIN}?take=100&skip=0`);
  console.log('=== UPDATED ACTIVE DNS RECORDS ON SPACESHIP ===');
  updated.items.forEach((r, idx) => {
    console.log(`[${idx + 1}] Type: ${r.type.padEnd(5)} | Name: ${r.name.padEnd(22)} | Target: ${r.cname || r.address || r.value || r.target || ''}`);
  });
}

run().catch(err => {
  console.error('❌ Failed to update DNS:', JSON.stringify(err, null, 2));
});
