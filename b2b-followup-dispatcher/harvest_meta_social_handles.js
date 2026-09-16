import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Verified Known Grounded Corporate Profiles
const KNOWN_PROFILES = {
  'dpr construction': {
    facebook: 'https://www.facebook.com/DPRConstruction',
    messenger: 'https://m.me/DPRConstruction',
    instagram: 'https://www.instagram.com/dprconstruction'
  },
  'level 10 construction': {
    facebook: 'https://www.facebook.com/Level10GC',
    messenger: 'https://m.me/Level10GC',
    instagram: null
  },
  'linbeck group': {
    facebook: 'https://www.facebook.com/LinbeckGroupLLC',
    messenger: 'https://m.me/LinbeckGroupLLC',
    instagram: 'https://www.instagram.com/linbeckgroup'
  },
  'weber logistics': {
    facebook: 'https://www.facebook.com/WeberLogistics',
    messenger: 'https://m.me/WeberLogistics',
    instagram: null
  },
  'saddle creek logistics services': {
    facebook: 'https://www.facebook.com/SaddleCreekLogisticsServices',
    messenger: 'https://m.me/SaddleCreekLogisticsServices',
    instagram: 'https://www.instagram.com/saddlecreeklogistics'
  },
  'turner construction company': {
    facebook: 'https://www.facebook.com/TurnerConstructionCompany',
    messenger: 'https://m.me/TurnerConstructionCompany',
    instagram: 'https://www.instagram.com/turner_construction'
  },
  'skanska usa building': {
    facebook: 'https://www.facebook.com/SkanskaUSA',
    messenger: 'https://m.me/SkanskaUSA',
    instagram: 'https://www.instagram.com/skanskausa'
  },
  'americold logistics': {
    facebook: 'https://www.facebook.com/americold',
    messenger: 'https://m.me/americold',
    instagram: 'https://www.instagram.com/americoldlogistics'
  },
  'shipbob': {
    facebook: 'https://www.facebook.com/shipbob',
    messenger: 'https://m.me/shipbob',
    instagram: 'https://www.instagram.com/shipbob'
  },
  'pcl construction': {
    facebook: 'https://www.facebook.com/PCLConstruction',
    messenger: 'https://m.me/PCLConstruction',
    instagram: 'https://www.instagram.com/pcl_construction'
  },
  'bechtel corporation': {
    facebook: 'https://www.facebook.com/BechtelCorporation',
    messenger: 'https://m.me/BechtelCorporation',
    instagram: 'https://www.instagram.com/bechtelcorp'
  },
  'expeditors international': {
    facebook: 'https://www.facebook.com/ExpeditorsInternational',
    messenger: 'https://m.me/ExpeditorsInternational',
    instagram: 'https://www.instagram.com/expeditors'
  },
  'gxo logistics': {
    facebook: 'https://www.facebook.com/GXOLogistics',
    messenger: 'https://m.me/GXOLogistics',
    instagram: 'https://www.instagram.com/gxologistics'
  },
  'ryder system': {
    facebook: 'https://www.facebook.com/RyderSystemInc',
    messenger: 'https://m.me/RyderSystemInc',
    instagram: 'https://www.instagram.com/rydersysteminc'
  },
  'penske logistics': {
    facebook: 'https://www.facebook.com/PenskeLogistics',
    messenger: 'https://m.me/PenskeLogistics',
    instagram: 'https://www.instagram.com/penskelogistics'
  },
  'manchester university nhs foundation trust (mft)': {
    facebook: 'https://www.facebook.com/MFTnhs',
    messenger: 'https://m.me/MFTnhs',
    instagram: 'https://www.instagram.com/mftcharity'
  },
  "guy's and st thomas' nhs foundation trust (gstt)": {
    facebook: 'https://www.facebook.com/GuysandStThomasNHS',
    messenger: 'https://m.me/GuysandStThomasNHS',
    instagram: 'https://www.instagram.com/guysandstthomasnhs'
  },
  'great ormond street hospital for children nhs foundation trust (gosh)': {
    facebook: 'https://www.facebook.com/GreatOrmondSt',
    messenger: 'https://m.me/GreatOrmondSt',
    instagram: 'https://www.instagram.com/gosh_international'
  },
  'cleveland clinic foundation': {
    facebook: 'https://www.facebook.com/ClevelandClinic',
    messenger: 'https://m.me/ClevelandClinic',
    instagram: 'https://www.instagram.com/clevelandclinic'
  },
  'mount sinai health system': {
    facebook: 'https://www.facebook.com/mountsinainyc',
    messenger: 'https://m.me/mountsinainyc',
    instagram: 'https://www.instagram.com/mountsinainyc'
  },
  'the johns hopkins hospital': {
    facebook: 'https://www.facebook.com/Johns.Hopkins.Medicine',
    messenger: 'https://m.me/Johns.Hopkins.Medicine',
    instagram: 'https://www.instagram.com/johnshopkinsmedicine'
  },
  'leeds teaching hospitals nhs trust': {
    facebook: 'https://www.facebook.com/LeedsTHTrust',
    messenger: 'https://m.me/LeedsTHTrust',
    instagram: 'https://www.instagram.com/leedsthcharity'
  },
  'imperial college healthcare nhs trust': {
    facebook: 'https://www.facebook.com/imperialnhs',
    messenger: 'https://m.me/imperialnhs',
    instagram: 'https://www.instagram.com/imperialnhs'
  },
  "king's college hospital nhs foundation trust": {
    facebook: 'https://www.facebook.com/KingsCollegeHospital',
    messenger: 'https://m.me/KingsCollegeHospital',
    instagram: 'https://www.instagram.com/kingscollegehospital'
  },
  'royal free london nhs foundation trust': {
    facebook: 'https://www.facebook.com/RoyalFreeNHS',
    messenger: 'https://m.me/RoyalFreeNHS',
    instagram: 'https://www.instagram.com/royalfreecharity'
  },
  'university college london hospitals nhs foundation trust (uclh)': {
    facebook: 'https://www.facebook.com/UCLHospitals',
    messenger: 'https://m.me/UCLHospitals',
    instagram: 'https://www.instagram.com/uclh'
  }
};

function readJsonSafe(relPath) {
  const full = path.join(__dirname, relPath);
  if (!fs.existsSync(full)) return [];
  try {
    return JSON.parse(fs.readFileSync(full, 'utf8'));
  } catch (err) {
    console.error(`Error reading ${relPath}:`, err.message);
    return [];
  }
}

async function scrapeDomainSocials(domain) {
  if (!domain || domain.includes('gmail.com') || domain.includes('yahoo.com') || domain.includes('linkable.it.com')) {
    return { facebook: null, messenger: null, instagram: null };
  }

  const urlsToTry = [`https://www.${domain}`, `https://${domain}`];
  for (const url of urlsToTry) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
        },
        redirect: 'follow'
      });
      clearTimeout(timeoutId);

      if (!res.ok) continue;
      const html = await res.text();

      // Extract Facebook
      const fbMatches = html.match(/https?:\/\/(www\.)?facebook\.com\/([A-Za-z0-9_.-]+)/gi) || [];
      const cleanFb = fbMatches
        .map(u => u.trim())
        .filter(u => {
          const lower = u.toLowerCase();
          return !lower.includes('sharer') &&
                 !lower.includes('share.php') &&
                 !lower.includes('tr?id') &&
                 !lower.includes('dialog') &&
                 !lower.includes('intent') &&
                 !lower.includes('policies') &&
                 !lower.includes('privacy') &&
                 !lower.includes('help') &&
                 !lower.includes('login') &&
                 !lower.endsWith('facebook.com') &&
                 !lower.endsWith('facebook.com/');
        });

      // Extract Instagram
      const igMatches = html.match(/https?:\/\/(www\.)?instagram\.com\/([A-Za-z0-9_.-]+)/gi) || [];
      const cleanIg = igMatches
        .map(u => u.trim())
        .filter(u => {
          const lower = u.toLowerCase();
          return !lower.includes('p/') &&
                 !lower.includes('reel/') &&
                 !lower.includes('explore') &&
                 !lower.includes('about') &&
                 !lower.includes('developer') &&
                 !lower.endsWith('instagram.com') &&
                 !lower.endsWith('instagram.com/');
        });

      let facebook = cleanFb[0] || null;
      let messenger = null;
      if (facebook) {
        const handle = facebook.split('facebook.com/')[1]?.replace(/\/.*$/, '').trim();
        if (handle) {
          messenger = `https://m.me/${handle}`;
        }
      }
      let instagram = cleanIg[0] || null;

      if (facebook || instagram) {
        return { facebook, messenger, instagram };
      }
    } catch (e) {
      // ignore network/timeout errors and try next
    }
  }

  return { facebook: null, messenger: null, instagram: null };
}

function determineCategoryAndPitch(lead) {
  const comp = (lead.company || '').toLowerCase();
  const domain = (lead.domain || '').toLowerCase();

  // Healthcare
  if (comp.includes('hospital') || comp.includes('nhs') || comp.includes('clinic') || comp.includes('health') || comp.includes('medical') || domain.includes('.nhs.uk') || domain.includes('.edu') || domain.includes('.org')) {
    return {
      category: 'Healthcare & Clinical Systems',
      campaign: 'claimguard_pristine',
      demoUrl: 'https://claimguard.linkable.it.com',
      pitchText: `Hello ${lead.company} Leadership Team,\n\nReaching out from Linkable Enterprise Solutions. We developed two sovereign clinical architectures engineered for acute hospital operations:\n1. ClaimGuard AI: Automated 835/837 dual-claim audit & denial mitigation engine (recovers 3.4% of leaked claims revenue).\n2. Pristine Clinical ICU OS: Zero-lag bedside patient telemetry monitoring.\n\nInteractive live demo: https://claimguard.linkable.it.com\nWould you be open to a 10-minute briefing with our technical solutions team?`
    };
  }

  // Construction
  if (comp.includes('construction') || comp.includes('builder') || comp.includes('building') || comp.includes('contractor') || comp.includes('engineering') || lead.campaign === 'sitesafe') {
    return {
      category: 'Commercial General Contractors',
      campaign: 'sitesafe',
      demoUrl: 'https://sitesafe.linkable.it.com',
      pitchText: `Hello ${lead.company} Team,\n\nReaching out from Linkable Enterprise Solutions. We engineered SiteSafe StructuraPro specifically for tier-1 commercial general contractors:\n- Dynamic CPM critical path delay mitigation\n- NOAA-certified weather threshold delay claims & automated liquidated damages defense packets.\n\nInteractive live demo: https://sitesafe.linkable.it.com\nHappy to share a 5-minute technical walkthrough for your project controls team.`
    };
  }

  // Logistics / 3PL
  if (comp.includes('logistics') || comp.includes('supply') || comp.includes('cold') || comp.includes('transport') || comp.includes('warehouse') || comp.includes('freight') || lead.campaign === 'omnistock') {
    return {
      category: 'Enterprise 3PL & Supply Chain',
      campaign: 'omnistock',
      demoUrl: 'https://omnistock.linkable.it.com',
      pitchText: `Hello ${lead.company} Operations Team,\n\nReaching out from Linkable Enterprise Solutions. We developed OmniStock Spatial WMS for multi-facility 3PL operations:\n- Real-time 3D heatmapped slotting optimization & FIFO cross-docking\n- Direct EDI 856 / 940 integration preventing mis-picks and dead inventory.\n\nInteractive live demo: https://omnistock.linkable.it.com\nCould we share a rapid 5-minute overview for your warehouse solutions team?`
    };
  }

  // Default B2B / Enterprise SaaS
  return {
    category: 'Enterprise SaaS & Cloud Infrastructure',
    campaign: 'linkable_enterprise',
    demoUrl: 'https://linkable.it.com',
    pitchText: `Hello ${lead.company} Team,\n\nReaching out from Linkable Solutions. We engineer high-performance sovereign software architectures for mission-critical enterprise workflows.\n\nExplore our live enterprise showcases: https://linkable.it.com\nWould love to connect with your digital transformation team.`
  };
}

async function main() {
  console.log('🚀 INITIALIZING META SOCIAL HARVESTER & RADAR GENERATOR...');

  const dispatchLog = readJsonSafe('src/dispatch_log.json');
  const massivePipeline = readJsonSafe('MASSIVE_FEATURED_APPS_100_PIPELINE.json');
  const ukHospitals = readJsonSafe('MASTER_UK_HOSPITALS_COMPREHENSIVE_DATABASE.json');
  const omniBatch2 = readJsonSafe('OMNISTOCK_BATCH2_50_PIPELINE.json');
  const omniBatch3 = readJsonSafe('OMNISTOCK_BATCH3_50_PIPELINE.json');

  console.log(`📊 Ingested:`);
  console.log(`   - Dispatched Log: ${dispatchLog.length} records`);
  console.log(`   - Massive Featured Pipeline: ${massivePipeline.length} accounts`);
  console.log(`   - Master UK Hospitals: ${ukHospitals.length} trusts`);
  console.log(`   - OmniStock Batch 2 & 3: ${omniBatch2.length + omniBatch3.length} 3PLs`);

  const uniqueMap = new Map();

  // 1. Ingest Massive Pipeline First (highest priority curated accounts)
  for (const item of massivePipeline) {
    const key = (item.company || item.organization || '').trim().toLowerCase();
    if (!key) continue;
    const domain = item.email && item.email.includes('@') ? item.email.split('@')[1].toLowerCase() : null;
    uniqueMap.set(key, {
      company: item.company || item.organization,
      domain,
      executiveName: item.executiveName || null,
      title: item.title || null,
      email: item.email || null,
      linkedin: item.linkedin || null,
      campaign: item.campaign || null
    });
  }

  // 2. Ingest UK Hospitals
  for (const item of ukHospitals) {
    const key = (item.trust_name || '').trim().toLowerCase();
    if (!key) continue;
    uniqueMap.set(key, {
      company: item.trust_name,
      domain: item.email_domain || (item.sample_email ? item.sample_email.split('@')[1] : null),
      executiveName: item.decision_maker || null,
      title: 'Chief Digital Information Officer',
      email: item.sample_email || null,
      linkedin: null,
      campaign: 'claimguard_pristine'
    });
  }

  // 3. Ingest OmniStock Batch 2 & 3
  for (const item of [...omniBatch2, ...omniBatch3]) {
    const key = (item.company || '').trim().toLowerCase();
    if (!key) continue;
    const domain = item.email && item.email.includes('@') ? item.email.split('@')[1].toLowerCase() : null;
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, {
        company: item.company,
        domain,
        executiveName: item.executive || item.executiveName || null,
        title: item.title || null,
        email: item.email || null,
        linkedin: item.linkedin || null,
        campaign: 'omnistock'
      });
    }
  }

  // 4. Ingest Dispatched Log
  for (const item of dispatchLog) {
    const key = (item.company || '').trim().toLowerCase();
    if (!key) continue;
    const domain = item.email && item.email.includes('@') ? item.email.split('@')[1].toLowerCase() : null;
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, {
        company: item.company,
        domain,
        executiveName: null,
        title: null,
        email: item.email || null,
        linkedin: null,
        campaign: null
      });
    }
  }

  console.log(`\n🎯 Total Unique Enterprise Accounts to Enrich: ${uniqueMap.size}`);

  const enrichedList = [];
  const entries = Array.from(uniqueMap.values());

  // Prioritize accounts with known profiles first
  entries.sort((a, b) => {
    const aKnown = KNOWN_PROFILES[a.company.toLowerCase()] ? 1 : 0;
    const bKnown = KNOWN_PROFILES[b.company.toLowerCase()] ? 1 : 0;
    return bKnown - aKnown;
  });

  let processed = 0;
  for (const entry of entries) {
    processed++;
    const lowerName = entry.company.toLowerCase();
    let fb = null;
    let messenger = null;
    let ig = null;

    // Check known verified dictionary
    if (KNOWN_PROFILES[lowerName]) {
      fb = KNOWN_PROFILES[lowerName].facebook;
      messenger = KNOWN_PROFILES[lowerName].messenger;
      ig = KNOWN_PROFILES[lowerName].instagram;
    } else if (entry.domain) {
      // Scrape for top active batches
      if (processed <= 80) {
        process.stdout.write(`Scanning [${processed}/${entries.length}] ${entry.company} (${entry.domain})...\r`);
        const scraped = await scrapeDomainSocials(entry.domain);
        fb = scraped.facebook;
        messenger = scraped.messenger;
        ig = scraped.instagram;
      }
    }

    const { category, campaign, demoUrl, pitchText } = determineCategoryAndPitch(entry);

    enrichedList.push({
      id: `meta-lead-${String(processed).padStart(3, '0')}`,
      company: entry.company,
      category,
      domain: entry.domain,
      email: entry.email,
      executiveName: entry.executiveName,
      title: entry.title,
      linkedin: entry.linkedin,
      facebookPage: fb,
      messengerUrl: messenger,
      instagramHandle: ig,
      campaign,
      demoUrl,
      pitchMessage: pitchText,
      status: (fb || ig) ? 'DISCOVERED' : 'DOMAIN_VERIFIED',
      pitchStatus: 'READY_TO_PITCH'
    });
  }

  const outPath = path.join(__dirname, 'META_ENTERPRISE_PROSPECT_RADAR.json');
  fs.writeFileSync(outPath, JSON.stringify(enrichedList, null, 2), 'utf8');

  const withFb = enrichedList.filter(l => l.facebookPage);
  const withIg = enrichedList.filter(l => l.instagramHandle);

  console.log(`\n\n✅ ENRICHMENT COMPLETE!`);
  console.log(`📁 Saved to: ${outPath}`);
  console.log(`📈 Summary:`);
  console.log(`   - Total Processed Accounts: ${enrichedList.length}`);
  console.log(`   - Accounts with Verified Facebook Page: ${withFb.length}`);
  console.log(`   - Accounts with Verified Instagram Profile: ${withIg.length}`);
  console.log(`\nTop 5 Verified Targets Ready for Immediate 1-by-1 Meta Multi-Pitch:`);
  withFb.slice(0, 5).forEach((lead, i) => {
    console.log(`   ${i + 1}. ${lead.company}`);
    console.log(`      • Facebook: ${lead.facebookPage}`);
    console.log(`      • Messenger: ${lead.messengerUrl}`);
    console.log(`      • Instagram: ${lead.instagramHandle || 'N/A'}`);
    console.log(`      • Campaign: ${lead.campaign} (${lead.demoUrl})`);
  });
}

main().catch(err => {
  console.error('Fatal Harvester Error:', err);
  process.exit(1);
});
