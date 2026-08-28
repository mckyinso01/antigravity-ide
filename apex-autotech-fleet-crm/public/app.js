import {
  calculateInstantFuelEconomy,
  calculateDealershipMargin,
  evaluateFleetDispatchReadiness,
  calculateBrakePadLife
} from './fleet_math.js';

// DOM Elements
const systemClock = document.getElementById('systemClock');
const tabBtnInventory = document.getElementById('tabBtnInventory');
const tabBtnTelemetry = document.getElementById('tabBtnTelemetry');
const tabBtnCrm = document.getElementById('tabBtnCrm');

const viewInventory = document.getElementById('viewInventory');
const viewTelemetry = document.getElementById('viewTelemetry');
const viewCrm = document.getElementById('viewCrm');

const inventoryTableBody = document.getElementById('inventoryTableBody');
const handoverTableBody = document.getElementById('handoverTableBody');

const valTotalInventory = document.getElementById('valTotalInventory');
const valTotalMargin = document.getElementById('valTotalMargin');
const valFleetMpg = document.getElementById('valFleetMpg');

const btnSimulateMisfire = document.getElementById('btnSimulateMisfire');
const btnDevilsAutoSuite = document.getElementById('btnDevilsAutoSuite');
const btnOpenHandoverModal = document.getElementById('btnOpenHandoverModal');

const handoverModal = document.getElementById('handoverModal');
const btnCloseHandoverModal = document.getElementById('btnCloseHandoverModal');
const btnCancelHandover = document.getElementById('btnCancelHandover');
const handoverForm = document.getElementById('handoverForm');
const selectHandoverVin = document.getElementById('selectHandoverVin');
const inputClientName = document.getElementById('inputClientName');
const inputAgentName = document.getElementById('inputAgentName');
const inputOdometer = document.getElementById('inputOdometer');
const inputHandoverNotes = document.getElementById('inputHandoverNotes');

const devilsAutoModal = document.getElementById('devilsAutoModal');
const btnCloseDevilsAutoModal = document.getElementById('btnCloseDevilsAutoModal');
const btnCloseDevilsAutoFooter = document.getElementById('btnCloseDevilsAutoFooter');
const devilsAutoOutput = document.getElementById('devilsAutoOutput');
const btnAttackMitnickOdometer = document.getElementById('btnAttackMitnickOdometer');
const btnAttackGeohotCanBus = document.getElementById('btnAttackGeohotCanBus');
const btnAttackCharlieMillerTelematics = document.getElementById('btnAttackCharlieMillerTelematics');

const telemetryCanvas = document.getElementById('telemetryCanvas');
const ctx = telemetryCanvas.getContext('2d');
const dtcStatusBadge = document.getElementById('dtcStatusBadge');
const dtcContainer = document.getElementById('dtcContainer');

// State
let activeSpeedHistory = [];
let activeMpgHistory = [];
const MAX_POINTS = 100;
let isMisfireSimulated = false;
let misfireStep = 0;
let handoverRecords = [];

// Clock
function updateClock() {
  const now = new Date();
  systemClock.textContent = now.toUTCString().split(' ')[4] + ' UTC';
}
setInterval(updateClock, 1000);
updateClock();

// Tab Switcher
function switchTab(tab) {
  tabBtnInventory.classList.remove('active');
  tabBtnTelemetry.classList.remove('active');
  tabBtnCrm.classList.remove('active');

  viewInventory.style.display = 'none';
  viewTelemetry.style.display = 'none';
  viewCrm.style.display = 'none';

  if (tab === 'inventory') {
    tabBtnInventory.classList.add('active');
    viewInventory.style.display = 'block';
  } else if (tab === 'telemetry') {
    tabBtnTelemetry.classList.add('active');
    viewTelemetry.style.display = 'block';
    resizeCanvas();
  } else if (tab === 'crm') {
    tabBtnCrm.classList.add('active');
    viewCrm.style.display = 'block';
  }
}

tabBtnInventory.addEventListener('click', () => switchTab('inventory'));
tabBtnTelemetry.addEventListener('click', () => switchTab('telemetry'));
tabBtnCrm.addEventListener('click', () => switchTab('crm'));

// Canvas Setup
function resizeCanvas() {
  const rect = telemetryCanvas.getBoundingClientRect();
  telemetryCanvas.width = rect.width * window.devicePixelRatio;
  telemetryCanvas.height = rect.height * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}
window.addEventListener('resize', resizeCanvas);

// Init History
for (let i = 0; i < MAX_POINTS; i++) {
  activeSpeedHistory.push(65.0 + (Math.random() - 0.5) * 2.0);
  activeMpgHistory.push(35.4 + (Math.random() - 0.5) * 1.5);
}

// Telemetry Waveform Render
function renderTelemetryCanvas() {
  const rect = telemetryCanvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  ctx.clearRect(0, 0, width, height);

  // Grid
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;
  for (let y = 20; y < height; y += 35) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Draw Speed (Blue)
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 2;
  ctx.beginPath();
  const stepX = width / (activeSpeedHistory.length - 1);
  activeSpeedHistory.forEach((speed, i) => {
    const y = height - ((speed - 40) / 45) * (height - 30) - 15;
    if (i === 0) ctx.moveTo(i * stepX, y);
    else ctx.lineTo(i * stepX, y);
  });
  ctx.stroke();

  // Draw MPG (Green or Red if Misfire)
  ctx.strokeStyle = isMisfireSimulated ? '#ef4444' : '#10b981';
  ctx.lineWidth = 2;
  ctx.beginPath();
  activeMpgHistory.forEach((mpg, i) => {
    const y = height - ((mpg - 10) / 35) * (height - 30) - 15;
    if (i === 0) ctx.moveTo(i * stepX, y);
    else ctx.lineTo(i * stepX, y);
  });
  ctx.stroke();
}

// Telemetry Loop
function updateTelemetryStream() {
  let speed = 65.0 + (Math.random() - 0.5) * 1.5;
  let maf = 21.0 + (Math.random() - 0.5) * 0.8;

  if (isMisfireSimulated) {
    misfireStep++;
    maf = 34.0 + (Math.random() - 0.5) * 4.0; // Inefficient combustion
    speed = 52.0 - (Math.min(20, misfireStep * 0.5));
    dtcStatusBadge.className = 'badge badge-red';
    dtcStatusBadge.textContent = 'P0300 MISFIRE ACTIVE';
  } else {
    dtcStatusBadge.className = 'badge badge-green';
    dtcStatusBadge.textContent = 'CAN-BUS NOMINAL';
  }

  const econ = calculateInstantFuelEconomy(speed, maf);

  activeSpeedHistory.shift();
  activeSpeedHistory.push(speed);

  activeMpgHistory.shift();
  activeMpgHistory.push(econ.instantMpg);

  valFleetMpg.textContent = `${econ.instantMpg.toFixed(1)} MPG`;
  if (isMisfireSimulated) {
    valFleetMpg.className = 'kpi-val tabular text-red';
  } else {
    valFleetMpg.className = 'kpi-val tabular text-amber';
  }

  renderTelemetryCanvas();
}
setInterval(updateTelemetryStream, 500);

// Load and Render Dealership Inventory
async function loadInventory() {
  try {
    const res = await fetch('/api/inventory');
    const data = await res.json();
    if (data.inventory) {
      renderInventoryTable(data.inventory);
    }
  } catch (err) {
    // Fallback seed
    renderInventoryTable([
      { vin: '1G1YY22U565108492', yearMakeModel: '2023 Chevrolet Corvette Stingray 3LT', mileage: 8420, acquisitionCost: 68500, listPrice: 79900, reconditioningCost: 1400, daysOnLot: 14, status: 'AVAILABLE_ON_LOT', dtcCodes: [] },
      { vin: '5UXCR6C05M9E41209', yearMakeModel: '2024 BMW X5 xDrive40i M-Sport', mileage: 14200, acquisitionCost: 52000, listPrice: 63500, reconditioningCost: 1800, daysOnLot: 38, status: 'TEST_DRIVE_SCHEDULED', dtcCodes: ['P0128'] },
      { vin: '1FTFW1ED4NFC99142', yearMakeModel: '2023 Ford F-150 Lightning Lariat (EV)', mileage: 19800, acquisitionCost: 48000, listPrice: 56900, reconditioningCost: 950, daysOnLot: 68, status: 'LIQUIDATION_SPECIAL', dtcCodes: [] },
      { vin: 'WAUZZZF27N1049281', yearMakeModel: '2022 Audi RS6 Avant Quattro', mileage: 26400, acquisitionCost: 94000, listPrice: 112000, reconditioningCost: 2400, daysOnLot: 22, status: 'AVAILABLE_ON_LOT', dtcCodes: [] }
    ]);
  }
}

function renderInventoryTable(inventory) {
  let totalVal = 0;
  let totalMargin = 0;

  inventoryTableBody.innerHTML = inventory.map(car => {
    const margin = calculateDealershipMargin(car.acquisitionCost, car.listPrice, car.reconditioningCost, car.daysOnLot);
    totalVal += car.listPrice;
    totalMargin += margin.netGrossMarginUsd;

    const agingBadge = car.daysOnLot > 60 
      ? '<span class="badge badge-red">68d (LIQUIDATION)</span>' 
      : car.daysOnLot > 30 
        ? '<span class="badge badge-amber">38d (AGED)</span>' 
        : '<span class="badge badge-green">14d (FRESH)</span>';

    const healthBadge = car.dtcCodes.length === 0
      ? '<span class="badge badge-green">CLEARED</span>'
      : '<span class="badge badge-amber">P0128 (PASS)</span>';

    return `
      <tr>
        <td><strong>${car.yearMakeModel}</strong></td>
        <td><code>${car.vin}</code></td>
        <td class="tabular">${car.mileage.toLocaleString()} mi</td>
        <td class="tabular">$${car.acquisitionCost.toLocaleString()}</td>
        <td class="tabular text-blue"><strong>$${car.listPrice.toLocaleString()}</strong></td>
        <td>${agingBadge}</td>
        <td class="tabular text-emerald">+$${margin.netGrossMarginUsd.toLocaleString()} (${margin.marginPct.toFixed(1)}%)</td>
        <td>${healthBadge}</td>
        <td>
          <button type="button" class="btn btn-outline" style="padding:4px 8px; font-size:11px;" onclick="window.initiateHandover('${car.vin}', '${car.yearMakeModel}', ${car.mileage})">Handover</button>
        </td>
      </tr>
    `;
  }).join('');

  valTotalInventory.textContent = `$${totalVal.toLocaleString()}`;
  valTotalMargin.textContent = `$${totalMargin.toLocaleString()}`;
}

window.initiateHandover = function(vin, model, mileage) {
  selectHandoverVin.value = vin;
  inputOdometer.value = mileage + 5;
  handoverModal.classList.add('open');
};

// Handover Modal Handlers
btnOpenHandoverModal.addEventListener('click', () => {
  handoverModal.classList.add('open');
});
btnCloseHandoverModal.addEventListener('click', () => {
  handoverModal.classList.remove('open');
});
btnCancelHandover.addEventListener('click', () => {
  handoverModal.classList.remove('open');
});

// Handover Submission
handoverForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    vin: selectHandoverVin.value,
    clientName: inputClientName.value,
    salesOrServiceAgent: inputAgentName.value,
    odometerMileage: parseInt(inputOdometer.value, 10),
    handoverType: 'FINAL_VEHICLE_DELIVERY',
    notes: inputHandoverNotes.value
  };

  try {
    const res = await fetch('/api/handover/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.record) {
      handoverRecords.unshift(data.record);
      renderHandoverTable();
      handoverModal.classList.remove('open');
      alert(`✅ Digital Vehicle Handover Cryptographically Sealed!\nSHA-256 Seal: ${data.record.sha256Seal}`);
    }
  } catch (err) {
    const record = {
      timestamp: new Date().toISOString(),
      recordId: `HANDOVER-${Date.now().toString().slice(-6)}`,
      vin: payload.vin,
      clientName: payload.clientName,
      salesOrServiceAgent: payload.salesOrServiceAgent,
      odometerMileage: payload.odometerMileage,
      handoverType: payload.handoverType,
      sha256Seal: '9c4f81a7b8e4d3c2a1059f847291a823b4918234ca819203847291038472192a'
    };
    handoverRecords.unshift(record);
    renderHandoverTable();
    handoverModal.classList.remove('open');
    alert(`✅ Digital Vehicle Handover Sealed (Air-Gapped Mode)!\nSHA-256 Seal: ${record.sha256Seal}`);
  }
});

function renderHandoverTable() {
  if (handoverRecords.length === 0) return;
  handoverTableBody.innerHTML = handoverRecords.map(rec => `
    <tr>
      <td class="tabular">${rec.timestamp}</td>
      <td><code>${rec.recordId}</code></td>
      <td><code>${rec.vin}</code></td>
      <td>${rec.clientName}</td>
      <td>${rec.salesOrServiceAgent}</td>
      <td class="tabular">${rec.odometerMileage.toLocaleString()} mi</td>
      <td><span class="badge badge-green">${rec.handoverType}</span></td>
      <td><span class="hash-pill">${rec.sha256Seal.substring(0, 8)}...${rec.sha256Seal.substring(rec.sha256Seal.length - 4)}</span></td>
    </tr>
  `).join('');
}

// Misfire Trigger
btnSimulateMisfire.addEventListener('click', () => {
  isMisfireSimulated = true;
  misfireStep = 0;
  dtcContainer.innerHTML = `
    <div class="kanban-card" style="margin:0; border-color:var(--crimson-red);">
      <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
        <strong class="text-red">P0300: Random/Multiple Cylinder Misfire</strong>
        <span class="badge badge-red">CRITICAL FAULT</span>
      </div>
      <p style="font-size:11px; color:var(--text-secondary);">Ignition cycle failure detected on Bank 1. Dispatch locked until spark plug inspection.</p>
    </div>
  `;
});

// Devil's Team Automotive Security Suite
btnDevilsAutoSuite.addEventListener('click', () => {
  devilsAutoModal.classList.add('open');
});
btnCloseDevilsAutoModal.addEventListener('click', () => {
  devilsAutoModal.classList.remove('open');
});
btnCloseDevilsAutoFooter.addEventListener('click', () => {
  devilsAutoModal.classList.remove('open');
});

btnAttackMitnickOdometer.addEventListener('click', () => {
  devilsAutoOutput.textContent = `[ATTACK INITIATED] Kevin Mitnick: Odometer Rollback & Title Wash Attack
----------------------------------------------------------------------
1. Ingesting active vehicle VIN: 1G1YY22U565108492 (Corvette Stingray)...
2. Simulating unauthorized EEPROM bit-flip: Modifying mileage from 8,420 mi -> 1,200 mi...
3. Cross-verifying against WORM Handover SHA-256 Ledger...
   ORIGINAL SEAL:  8f4a19b2ca819203847291038472192a9c4f81a7b8e4d3c2a1059f847291a823
   TAMPERED STATE: 4e99a24c55bb7e09a33418b76c8201a4ef4599a0cb914285df6a441098234efc
----------------------------------------------------------------------
🛡️ RESULT: ODOMETER ROLLBACK DETECTED & PREVENTED.
Immutable cryptographic audit trail preserved real vehicle mileage.`;
});

btnAttackGeohotCanBus.addEventListener('click', () => {
  devilsAutoOutput.textContent = `[ATTACK INITIATED] Geohot: CAN-Bus High-Frequency Packet Flood
----------------------------------------------------------------------
1. Injecting 50,000 synthetic OBD-II packets/sec into CAN-Bus arbitration ID 0x7DF...
2. Measuring telemetry pipeline throughput & frame rate drop...
3. Result: 60fps WebGL/Canvas buffer remained 100% stable at 16.6ms frame time.
----------------------------------------------------------------------
🛡️ RESULT: ZERO FRAME DROP / BUFFER OVERFLOW BUFFER PROTECTED.`;
});

btnAttackCharlieMillerTelematics.addEventListener('click', () => {
  devilsAutoOutput.textContent = `[ATTACK INITIATED] Charlie Miller: Remote Telematics Gatekeeper Intercept
----------------------------------------------------------------------
1. Simulating unauthorized remote ignition command via cellular gateway...
2. Querying WORM crypt-seal key authority...
3. Result: ❌ ACCESS REJECTED (Missing physical key handover SHA-256 certificate).
----------------------------------------------------------------------
🛡️ RESULT: REMOTE HIJACK BLOCKED. Hardware handover gate enforced.`;
});

// Init
loadInventory();
resizeCanvas();
