// ==========================================================================
// AEROTURBINE MRO GUARD • EXPRESS SERVER (PORT 3008)
// Commercial Aviation Turbine Life-Limited Parts & Airworthiness Ledger
// ==========================================================================

import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  calculateLlpCycleLife,
  calculateEgtMarginDecay,
  evaluateTurbineVibration
} from './public/turbine_math.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3008;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-Memory FAA Airworthiness Ledger
const AIRWORTHINESS_RELEASE_LEDGER = [];

// Seed Engine Fleet Data
const ENGINE_FLEET = [
  {
    engineId: 'ENG-CFM-889101',
    model: 'CFM56-7B26',
    aircraft: 'Boeing 737-800 (N881AA)',
    operator: 'American Airlines Fleet',
    position: '#1 (Left Wing)',
    totalHours: 14200,
    totalCycles: 6150,
    baselineEgtMarginC: 75.0,
    hptDiskSerial: 'HPT-SN-99824',
    hptDiskCycles: 6150,
    certifiedLimitCycles: 20000,
    n1VibMils: 1.15,
    n2VibMils: 1.38,
    status: 'ACTIVE_IN_SERVICE'
  },
  {
    engineId: 'ENG-LEAP-990204',
    model: 'CFM LEAP-1A26',
    aircraft: 'Airbus A320neo (RP-C3214)',
    operator: 'Cebu Pacific Air',
    position: '#2 (Right Wing)',
    totalHours: 8400,
    totalCycles: 3820,
    baselineEgtMarginC: 80.0,
    hptDiskSerial: 'LEAP-HPT-44120',
    hptDiskCycles: 3820,
    certifiedLimitCycles: 20000,
    n1VibMils: 0.95,
    n2VibMils: 1.12,
    status: 'ACTIVE_IN_SERVICE'
  },
  {
    engineId: 'ENG-TRENT-771940',
    model: 'Rolls-Royce Trent 1000-TEN',
    aircraft: 'Boeing 787-9 Dreamliner (9V-OJA)',
    operator: 'Scoot / Singapore Airlines',
    position: '#1 (Left Wing)',
    totalHours: 21800,
    totalCycles: 8900,
    baselineEgtMarginC: 68.0,
    hptDiskSerial: 'RR-TRENT-8812',
    hptDiskCycles: 18650, // Approaching 20k hard limit
    certifiedLimitCycles: 20000,
    n1VibMils: 2.35,
    n2VibMils: 2.78,
    status: 'SHOP_VISIT_SCHEDULED'
  }
];

// 1. GET Engine Fleet with Dynamic Calculations
app.get('/api/engines', (req, res) => {
  const enrichedFleet = ENGINE_FLEET.map(eng => {
    const llp = calculateLlpCycleLife(eng.hptDiskCycles, eng.certifiedLimitCycles);
    const thermal = calculateEgtMarginDecay(eng.baselineEgtMarginC, eng.totalHours, eng.totalCycles);
    const vib = evaluateTurbineVibration(eng.n1VibMils, eng.n2VibMils);

    return {
      ...eng,
      llp,
      thermal,
      vibration: vib
    };
  });

  res.json({ success: true, count: enrichedFleet.length, fleet: enrichedFleet });
});

// 2. POST FAA Form 8130-3 / EASA Form 1 Authorized Release Certificate
app.post('/api/release/faa-8130', (req, res) => {
  const { engineId, inspectorName, apLicenseNumber, workPerformed, facilityName } = req.body;

  if (!engineId || !inspectorName || !apLicenseNumber) {
    return res.status(400).json({ success: false, error: 'Missing required FAA release fields.' });
  }

  const engine = ENGINE_FLEET.find(e => e.engineId === engineId);
  if (!engine) {
    return res.status(404).json({ success: false, error: 'Engine ID not found in FAA registry.' });
  }

  const releaseId = `FAA-8130-${Math.floor(100000 + Math.random() * 900000)}`;
  const timestamp = new Date().toISOString();

  const recordPayload = JSON.stringify({
    releaseId,
    engineId,
    model: engine.model,
    hptDiskSerial: engine.hptDiskSerial,
    inspectorName,
    apLicenseNumber,
    workPerformed: workPerformed || '100-Hour / 500-Cycle Heavy Borescope & LLP Life Verification',
    facilityName: facilityName || 'Linkable Global Aerospace MRO (FAA Part 145 Cert #LK9R412X)',
    timestamp
  });

  const sha256Seal = crypto.createHash('sha256').update(recordPayload).digest('hex');

  const certificate = {
    releaseId,
    engineId,
    model: engine.model,
    hptDiskSerial: engine.hptDiskSerial,
    inspectorName,
    apLicenseNumber,
    workPerformed: workPerformed || 'Heavy Borescope & LLP Verification',
    facilityName: facilityName || 'Linkable Global Aerospace MRO (FAA Part 145)',
    timestamp,
    sha256Seal,
    airworthinessStatus: 'APPROVED_RETURN_TO_SERVICE'
  };

  AIRWORTHINESS_RELEASE_LEDGER.unshift(certificate);

  res.json({ success: true, certificate });
});

// 3. GET Airworthiness Ledger
app.get('/api/releases', (req, res) => {
  res.json({ success: true, total: AIRWORTHINESS_RELEASE_LEDGER.length, ledger: AIRWORTHINESS_RELEASE_LEDGER });
});

app.listen(PORT, () => {
  console.log(`🚀 AeroTurbine MRO Guard OS running on port ${PORT}`);
  console.log(`📡 Subdomain Target: https://aeroturbine.linkable.it.com`);
});
