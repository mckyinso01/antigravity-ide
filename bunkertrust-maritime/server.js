import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  calculateCoriolisAeration,
  calculateEUETSLiability,
  evaluateCIIRating,
  validateISO8217Spec
} from './public/maritime_math.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-Memory Immutable BDN Audit Ledger
const bdnAuditLedger = [
  {
    timestamp: '2026-08-28T14:15:22.081Z',
    bdnNumber: 'BDN-RTD-2026-8941',
    vesselImo: 'IMO 9844210 (M/V ATLANTIC VANGUARD)',
    portTerminal: 'Port of Rotterdam (Bunker Quay 4)',
    bunkerType: 'VLSFO (RMG 380)',
    invoicedMassMt: 850.0,
    coriolisVerifiedMassMt: 848.8,
    aerationDeficitPct: 0.14,
    dollarLossUsd: 744.00,
    chiefEngineer: 'Chief Eng. Torsten Lindqvist',
    bargeMaster: 'Capt. Pieter Van Dijk (Bunker Barge VITA-02)',
    sha256Seal: '9c4f81a7b8e4d3c2a1059f847291a823b4918234ca819203847291038472192a',
    regulatoryStatus: 'CLEARED_FOR_DEPARTURE'
  }
];

// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    service: 'BunkerTrust Maritime OS',
    standard: 'ISO 8217:2024 & EU Directive 2023/959',
    timestamp: new Date().toISOString()
  });
});

// Electronic BDN Signature Endpoint with SHA-256 Seal
app.post('/api/bdn/sign', (req, res) => {
  const {
    bdnNumber,
    vesselImo,
    portTerminal,
    bunkerType,
    invoicedMassMt,
    coriolisVerifiedMassMt,
    aerationDeficitPct,
    dollarLossUsd,
    chiefEngineer,
    chiefEngineerPin,
    bargeMaster,
    justificationNotes
  } = req.body;

  if (!bdnNumber || !chiefEngineer || !bargeMaster) {
    return res.status(400).json({ error: 'Missing required dual-witness signing credentials.' });
  }

  const timestamp = new Date().toISOString();
  const rawPayload = `${timestamp}|${bdnNumber}|${vesselImo}|${invoicedMassMt}|${coriolisVerifiedMassMt}|${aerationDeficitPct}|${chiefEngineer}|${bargeMaster}|${justificationNotes || ''}`;
  const sha256Seal = crypto.createHash('sha256').update(rawPayload).digest('hex');

  const record = {
    timestamp,
    bdnNumber,
    vesselImo: vesselImo || 'IMO 9844210 (M/V ATLANTIC VANGUARD)',
    portTerminal: portTerminal || 'Port of Rotterdam (Bunker Quay 4)',
    bunkerType: bunkerType || 'VLSFO (RMG 380)',
    invoicedMassMt: Number(invoicedMassMt) || 0,
    coriolisVerifiedMassMt: Number(coriolisVerifiedMassMt) || 0,
    aerationDeficitPct: Number(aerationDeficitPct) || 0,
    dollarLossUsd: Number(dollarLossUsd) || 0,
    chiefEngineer,
    bargeMaster,
    sha256Seal,
    regulatoryStatus: Number(aerationDeficitPct) > 2.0 ? 'DISCREPANCY_FLAGGED_FOR_CHARTERER' : 'CLEARED_FOR_DEPARTURE'
  };

  bdnAuditLedger.unshift(record);
  res.json({ success: true, record });
});

// Get Audit Trail
app.get('/api/bdn/ledger', (req, res) => {
  res.json({ ledger: bdnAuditLedger });
});

app.listen(PORT, () => {
  console.log('=================================================================');
  console.log('⚓ BUNKERTRUST MARITIME COMMAND ENGINE ONLINE (LIGHT MODE)');
  console.log(`📍 Localhost URL: http://localhost:${PORT}`);
  console.log('🛡️ Standard: ISO 8217:2024, EU ETS Directive 2023/959, IMO CII');
  console.log('=================================================================');
});
