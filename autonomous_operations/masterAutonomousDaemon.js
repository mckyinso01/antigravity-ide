/**
 * LinkableAI Master Autonomous Business Operations Daemon
 * Orchestrates:
 * 1. 24/7 Inbound Enterprise Lead Monitoring & Scoring
 * 2. Automated 3-Gives Milestone Escrow Contract Preparation
 * 3. Immediate Founder Telemetry & Sound/Push Alerting
 * 4. Sub-Second Dedicated Cloud Tenant Provisioning
 */

const http = require('http');
const { getActiveProspects, recordLeadInteraction } = require('./leadProspector');
const { generateEscrowContract } = require('./escrowContractGenerator');
const { dispatchFounderAlert } = require('./telegramAlertDispatcher');
const { provisionClientFork } = require('./cloudForkProvisioner');

const PORT = 4050;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // GET /status
  if (req.method === 'GET' && req.url === '/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      system: "LinkableAI Master Autonomous Business Operations Daemon",
      status: "ONLINE",
      activeProspectsCount: getActiveProspects().length,
      uptimeSeconds: process.uptime()
    }));
    return;
  }

  // POST /leads/capture
  if (req.method === 'POST' && req.url === '/leads/capture') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const lead = JSON.parse(body || '{}');
        const savedLead = recordLeadInteraction(lead);
        
        dispatchFounderAlert({
          eventType: "NEW_ENTERPRISE_LEAD",
          title: `New Inquiry for ${lead.appSelected || 'LinkableAI Platforms'}`,
          clientInfo: { name: lead.name, company: lead.company, email: lead.email, phone: lead.phone },
          amountUSD: lead.budgetUSD || 48500,
          appName: lead.appSelected
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, lead: savedLead }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // POST /contracts/generate
  if (req.method === 'POST' && req.url === '/contracts/generate') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const params = JSON.parse(body || '{}');
        const contract = generateEscrowContract(params);

        dispatchFounderAlert({
          eventType: "CONTRACT_GENERATED",
          title: `3-Gives Escrow Contract Generated for ${params.clientCompany}`,
          clientInfo: { name: params.clientName, company: params.clientCompany, email: params.clientEmail },
          amountUSD: params.amountUSD,
          appName: params.appSelected
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, contract }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // POST /provision/fork
  if (req.method === 'POST' && req.url === '/provision/fork') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const params = JSON.parse(body || '{}');
        const fork = provisionClientFork(params);

        dispatchFounderAlert({
          eventType: "CLOUD_FORK_DEPLOYED",
          title: `Dedicated Tenant Provisioned: ${params.clientCompany}`,
          clientInfo: { company: params.clientCompany },
          appName: params.appSelected
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, deployment: fork }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint Not Found' }));
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🤖 LINKABLEAI MASTER AUTONOMOUS BUSINESS DAEMON`);
  console.log(`⚡ Running locally on http://localhost:${PORT}`);
  console.log(`📡 Endpoints: /status, /leads/capture, /contracts/generate, /provision/fork`);
  console.log(`======================================================\n`);
});
