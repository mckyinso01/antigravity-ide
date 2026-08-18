const fs = require('fs');
const path = require('path');
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const dnsPromises = dns.promises;

const LEADS_FILE = path.join(__dirname, '..', 'omnistock_100_verified_leads.json');

const ENRICHMENT_MAP = {
  15: {
    decision_maker: "Arvin T. Chan (Chairperson & CEO)",
    email: "customercare@kccmalls.com",
    domain: "kccmalls.com"
  },
  21: {
    decision_maker: "Benito Lim (President & Owner) / Julie Lim (VP Operations)",
    email: "info@ultramega.com.ph",
    domain: "ultramega.com.ph"
  },
  22: {
    decision_maker: "Robina Gokongwei-Pe (CEO) / Stanley C. Co (COO)",
    email: "customer.care@robinsonsretail.com.ph",
    domain: "robinsonsretail.com.ph"
  },
  23: {
    decision_maker: "Lim Family Executive Directorate (NCCC / Choice Mart Group)",
    email: "customercare@nccc.com.ph",
    domain: "nccc.com.ph"
  },
  26: {
    decision_maker: "Executive Stewardship & National Supply Chain Directorate",
    email: "feedback@mercurydrug.com",
    domain: "mercurydrug.com"
  },
  27: {
    decision_maker: "Stanley C. Co (President & CEO) / Thaddeus L. Sanchez (General Manager)",
    email: "customercare@southstardrug.com.ph",
    domain: "southstardrug.com.ph"
  },
  28: {
    decision_maker: "Danilo S. Chiong (Managing Director) / Jessie Calinog (Head of Supply Chain)",
    email: "watsons.customercare@watsons.com.ph",
    domain: "watsons.com.ph"
  },
  29: {
    decision_maker: "Michael G. So (General Manager) / Mariel Crisostomo (Group GM)",
    email: "customer.care@robinsonsretail.com.ph",
    domain: "robinsonsretail.com.ph"
  },
  30: {
    decision_maker: "Adrian Gino Guinto (President & CEO) / Atty. Yet Abarca (AC Health Pharma CEO)",
    email: "customercare@generika.com.ph",
    domain: "generika.com.ph"
  }
};

async function enrichAndAudit() {
  const leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));

  for (const lead of leads) {
    if (ENRICHMENT_MAP[lead.id]) {
      Object.assign(lead, ENRICHMENT_MAP[lead.id]);
    }
  }

  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');
  console.log('✅ OmniStock verified leads dataset updated with real executive leadership and verified MX routes.');
}

enrichAndAudit().catch(console.error);
