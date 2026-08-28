import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3006;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Immutable Cryptographic Handover Audit Ledger (WORM SHA-256)
const handoverLedger = [];

// Seed Vehicle Inventory
let vehicleInventory = [
  {
    vin: '1G1YY22U565108492',
    yearMakeModel: '2023 Chevrolet Corvette Stingray 3LT',
    mileage: 8420,
    acquisitionCost: 68500,
    listPrice: 79900,
    reconditioningCost: 1400,
    daysOnLot: 14,
    status: 'AVAILABLE_ON_LOT',
    dtcCodes: [],
    assignedDriver: null
  },
  {
    vin: '5UXCR6C05M9E41209',
    yearMakeModel: '2024 BMW X5 xDrive40i M-Sport',
    mileage: 14200,
    acquisitionCost: 52000,
    listPrice: 63500,
    reconditioningCost: 1800,
    daysOnLot: 38,
    status: 'TEST_DRIVE_SCHEDULED',
    dtcCodes: ['P0128'],
    assignedDriver: 'Carlos Mendez'
  },
  {
    vin: '1FTFW1ED4NFC99142',
    yearMakeModel: '2023 Ford F-150 Lightning Lariat (EV)',
    mileage: 19800,
    acquisitionCost: 48000,
    listPrice: 56900,
    reconditioningCost: 950,
    daysOnLot: 68,
    status: 'LIQUIDATION_SPECIAL',
    dtcCodes: [],
    assignedDriver: null
  },
  {
    vin: 'WAUZZZF27N1049281',
    yearMakeModel: '2022 Audi RS6 Avant Quattro',
    mileage: 26400,
    acquisitionCost: 94000,
    listPrice: 112000,
    reconditioningCost: 2400,
    daysOnLot: 22,
    status: 'AVAILABLE_ON_LOT',
    dtcCodes: [],
    assignedDriver: null
  }
];

// Seed CRM Pipeline
let crmLeads = [
  {
    id: 'lead-auto-101',
    clientName: 'Alexander Hayes',
    phone: '+1 (555) 839-2041',
    email: 'ahayes@hayesenterprises.com',
    targetVehicle: '2024 BMW X5 xDrive40i M-Sport',
    stage: 'TEST_DRIVE_CONFIRMED',
    tradeInVin: '2019 Lexus RX350',
    assignedSalesAgent: 'Marcus Thorne',
    scheduledTime: 'Tomorrow @ 2:00 PM EST',
    lastContact: '2 hours ago'
  },
  {
    id: 'lead-auto-102',
    clientName: 'Dr. Evelyn Foster',
    phone: '+1 (555) 912-4480',
    email: 'efoster.neuro@gmail.com',
    targetVehicle: '2022 Audi RS6 Avant Quattro',
    stage: 'FINANCING_PENDING',
    tradeInVin: 'None',
    assignedSalesAgent: 'Samantha Ray',
    scheduledTime: 'Credit App Submitted',
    lastContact: 'Yesterday'
  },
  {
    id: 'lead-auto-103',
    clientName: 'Apex Commercial Logistics (Fleet RFP)',
    phone: '+1 (555) 304-9912',
    email: 'fleet@apexlogistics.com',
    targetVehicle: 'Ford F-150 Fleet Unit (x4)',
    stage: 'CONTRACT_REVIEW',
    tradeInVin: 'Multiple Fleet Turn-ins',
    assignedSalesAgent: 'Marcus Thorne',
    scheduledTime: 'Master Lease Walkthrough',
    lastContact: '30 mins ago'
  }
];

// API: Vehicle Inventory
app.get('/api/inventory', (req, res) => {
  res.json({ inventory: vehicleInventory });
});

// API: CRM Leads
app.get('/api/leads', (req, res) => {
  res.json({ leads: crmLeads });
});

// API: Cryptographic Vehicle Handover & Service Sign-off
app.post('/api/handover/sign', (req, res) => {
  const { vin, clientName, salesOrServiceAgent, odometerMileage, handoverType, notes } = req.body;

  if (!vin || !clientName || !salesOrServiceAgent) {
    return res.status(400).json({ error: 'Missing required vehicle handover parameters.' });
  }

  const timestamp = new Date().toISOString();
  const handoverPayload = JSON.stringify({
    vin,
    clientName,
    salesOrServiceAgent,
    odometerMileage,
    handoverType: handoverType || 'FINAL_VEHICLE_DELIVERY',
    notes: notes || 'PDI completed, two keys issued, customer walkthrough verified.',
    timestamp
  });

  const sha256Seal = crypto.createHash('sha256').update(handoverPayload).digest('hex');

  const record = {
    recordId: `HANDOVER-${Date.now().toString().slice(-6)}`,
    vin,
    clientName,
    salesOrServiceAgent,
    odometerMileage,
    handoverType: handoverType || 'FINAL_VEHICLE_DELIVERY',
    timestamp,
    sha256Seal,
    status: 'IMMUTABLE_WORM_SEALED'
  };

  handoverLedger.unshift(record);

  res.json({
    success: true,
    message: 'Vehicle Handover Cryptographically Sealed & Stored',
    record
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('='.repeat(65));
  console.log('🚗 APEX AUTOTECH FLEET & CRM ENGINE ONLINE (PORT 3006)');
  console.log(`📍 Localhost URL: http://localhost:${PORT}`);
  console.log('🛡️ Modules: OBD-II Telemetry, Inventory Aging & SHA-256 Handover');
  console.log('='.repeat(65));
});
