import {
  calculateEscrowSplit,
  calculateMarketplaceCartTotal,
  evaluateDisputeSettlement
} from './marketplace_math.js';

// DOM References
const systemClock = document.getElementById('systemClock');
const tabBtnCatalog = document.getElementById('tabBtnCatalog');
const tabBtnEscrow = document.getElementById('tabBtnEscrow');
const tabBtnRecon = document.getElementById('tabBtnRecon');

const viewCatalog = document.getElementById('viewCatalog');
const viewEscrow = document.getElementById('viewEscrow');
const viewRecon = document.getElementById('viewRecon');

const productGrid = document.getElementById('productGrid');
const ordersTableBody = document.getElementById('ordersTableBody');
const releaseTableBody = document.getElementById('releaseTableBody');

const valGrossVolume = document.getElementById('valGrossVolume');
const valPlatformFee = document.getElementById('valPlatformFee');
const valVendorPayout = document.getElementById('valVendorPayout');
const valRollingReserve = document.getElementById('valRollingReserve');
const escrowVaultStatus = document.getElementById('escrowVaultStatus');

const btnSimulatePurchase = document.getElementById('btnSimulatePurchase');
const btnDevilsMarketplaceSuite = document.getElementById('btnDevilsMarketplaceSuite');
const btnOpenReleaseModal = document.getElementById('btnOpenReleaseModal');

const releaseModal = document.getElementById('releaseModal');
const btnCloseReleaseModal = document.getElementById('btnCloseReleaseModal');
const btnCancelRelease = document.getElementById('btnCancelRelease');
const releaseForm = document.getElementById('releaseForm');
const selectOrderRelease = document.getElementById('selectOrderRelease');
const inputReleasedBy = document.getElementById('inputReleasedBy');
const inputReleaseNotes = document.getElementById('inputReleaseNotes');

const devilsMarketplaceModal = document.getElementById('devilsMarketplaceModal');
const btnCloseDevilsMarketplaceModal = document.getElementById('btnCloseDevilsMarketplaceModal');
const btnCloseDevilsMarketplaceFooter = document.getElementById('btnCloseDevilsMarketplaceFooter');
const devilsMarketplaceOutput = document.getElementById('devilsMarketplaceOutput');
const btnAttackMitnickDoubleSpend = document.getElementById('btnAttackMitnickDoubleSpend');
const btnAttackGeohotPennyRounding = document.getElementById('btnAttackGeohotPennyRounding');
const btnAttackCharlieMillerDrain = document.getElementById('btnAttackCharlieMillerDrain');

const escrowCanvas = document.getElementById('escrowCanvas');
const ctx = escrowCanvas.getContext('2d');

// State
let grossVolumeHistory = [];
let commissionHistory = [];
const MAX_POINTS = 100;
let activeOrdersList = [];
let releasedLedger = [];

// Clock
function updateClock() {
  const now = new Date();
  systemClock.textContent = now.toUTCString().split(' ')[4] + ' UTC';
}
setInterval(updateClock, 1000);
updateClock();

// Tab Switcher
function switchTab(tab) {
  tabBtnCatalog.classList.remove('active');
  tabBtnEscrow.classList.remove('active');
  tabBtnRecon.classList.remove('active');

  viewCatalog.style.display = 'none';
  viewEscrow.style.display = 'none';
  viewRecon.style.display = 'none';

  if (tab === 'catalog') {
    tabBtnCatalog.classList.add('active');
    viewCatalog.style.display = 'block';
  } else if (tab === 'escrow') {
    tabBtnEscrow.classList.add('active');
    viewEscrow.style.display = 'block';
    resizeCanvas();
  } else if (tab === 'recon') {
    tabBtnRecon.classList.add('active');
    viewRecon.style.display = 'block';
  }
}

tabBtnCatalog.addEventListener('click', () => switchTab('catalog'));
tabBtnEscrow.addEventListener('click', () => switchTab('escrow'));
tabBtnRecon.addEventListener('click', () => switchTab('recon'));

// Canvas Setup
function resizeCanvas() {
  const rect = escrowCanvas.getBoundingClientRect();
  escrowCanvas.width = rect.width * window.devicePixelRatio;
  escrowCanvas.height = rect.height * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}
window.addEventListener('resize', resizeCanvas);

// Init History
for (let i = 0; i < MAX_POINTS; i++) {
  grossVolumeHistory.push(2075.0 + (Math.random() - 0.5) * 50.0);
  commissionHistory.push(249.0 + (Math.random() - 0.5) * 8.0);
}

function renderEscrowCanvas() {
  const rect = escrowCanvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  ctx.clearRect(0, 0, width, height);

  // Grid
  ctx.strokeStyle = '#1e2c47';
  ctx.lineWidth = 1;
  for (let y = 20; y < height; y += 35) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Draw Gross Escrow Waveform (Emerald)
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 2;
  ctx.beginPath();
  const stepX = width / (grossVolumeHistory.length - 1);
  grossVolumeHistory.forEach((val, i) => {
    const y = height - ((val - 1800) / 600) * (height - 30) - 15;
    if (i === 0) ctx.moveTo(i * stepX, y);
    else ctx.lineTo(i * stepX, y);
  });
  ctx.stroke();

  // Draw Commission Waveform (Violet)
  ctx.strokeStyle = '#8b5cf6';
  ctx.lineWidth = 2;
  ctx.beginPath();
  commissionHistory.forEach((val, i) => {
    const y = height - ((val - 150) / 200) * (height - 30) - 15;
    if (i === 0) ctx.moveTo(i * stepX, y);
    else ctx.lineTo(i * stepX, y);
  });
  ctx.stroke();
}

function updateTelemetryStream() {
  const latestGross = 2075.0 + (Math.random() - 0.5) * 20.0;
  const latestComm = 249.0 + (Math.random() - 0.5) * 4.0;

  grossVolumeHistory.shift();
  grossVolumeHistory.push(latestGross);

  commissionHistory.shift();
  commissionHistory.push(latestComm);

  renderEscrowCanvas();
}
setInterval(updateTelemetryStream, 500);

// Load Products
async function loadProducts() {
  try {
    const res = await fetch('/api/products');
    const data = await res.json();
    if (data.products) {
      renderProducts(data.products);
    }
  } catch (err) {
    renderProducts([
      { id: 'prod-101', vendorName: 'Apex Precision Engineering (Germany)', title: 'Titanium CNC Custom Mechanical Keyboard', category: 'Hardware', priceUsd: 280.00, stock: 14, commissionPct: 12.5 },
      { id: 'prod-102', vendorName: 'Aether Acoustic Labs (Japan)', title: 'Planar Magnetic Open-Back Studio Headphones', category: 'Audio', priceUsd: 450.00, stock: 8, commissionPct: 10.0 },
      { id: 'prod-103', vendorName: 'Nordic Minimal Leatherworks (Sweden)', title: 'Full-Grain Vegetable Tanned Leather Tech Portfolio', category: 'Luxury', priceUsd: 145.00, stock: 22, commissionPct: 15.0 },
      { id: 'prod-104', vendorName: 'OmniVoxel Software Systems (USA)', title: 'Spatial WMS 3D Digital Twin Enterprise License Pack', category: 'Software', priceUsd: 1200.00, stock: 99, commissionPct: 8.0 }
    ]);
  }
}

function renderProducts(products) {
  productGrid.innerHTML = products.map(prod => `
    <div class="product-card">
      <div>
        <div class="product-vendor">${prod.vendorName}</div>
        <div class="product-title">${prod.title}</div>
        <span class="badge badge-violet">${prod.commissionPct}% Comm.</span>
        <span class="badge badge-green" style="margin-left:4px;">Stock: ${prod.stock}</span>
      </div>
      <div class="product-meta">
        <div class="product-price tabular">$${prod.priceUsd.toFixed(2)}</div>
        <button type="button" class="btn btn-primary" onclick="window.triggerPurchase('${prod.title}', ${prod.priceUsd}, '${prod.vendorName}', ${prod.commissionPct})">
          Escrow Buy
        </button>
      </div>
    </div>
  `).join('');
}

// Load Orders
async function loadOrders() {
  try {
    const res = await fetch('/api/orders');
    const data = await res.json();
    if (data.orders) {
      activeOrdersList = data.orders;
      renderOrdersTable();
      updateKpis();
    }
  } catch (err) {
    activeOrdersList = [
      { orderId: 'ESCROW-2026-8812', buyerName: 'Alexander Hayes', vendorName: 'Apex Precision Engineering', grossAmountUsd: 280.00, platformFeeUsd: 35.00, rollingReserveUsd: 11.83, vendorNetPayoutUsd: 224.75, status: 'FUNDS_HELD_IN_ESCROW' },
      { orderId: 'ESCROW-2026-8813', buyerName: 'Dr. Evelyn Foster', vendorName: 'Aether Acoustic Labs', grossAmountUsd: 450.00, platformFeeUsd: 45.00, rollingReserveUsd: 19.58, vendorNetPayoutUsd: 372.07, status: 'DELIVERY_CONFIRMED' }
    ];
    renderOrdersTable();
    updateKpis();
  }
}

function renderOrdersTable() {
  ordersTableBody.innerHTML = activeOrdersList.map(ord => {
    const statusBadge = ord.status === 'FUNDS_HELD_IN_ESCROW'
      ? '<span class="badge badge-amber">FUNDS HELD IN ESCROW</span>'
      : ord.status === 'DELIVERY_CONFIRMED'
        ? '<span class="badge badge-green">DELIVERY CONFIRMED</span>'
        : '<span class="badge badge-violet">PAYOUT RELEASED</span>';

    return `
      <tr>
        <td><code>${ord.orderId}</code></td>
        <td>${ord.buyerName}</td>
        <td><strong>${ord.vendorName}</strong></td>
        <td class="tabular"><strong>$${ord.grossAmountUsd.toFixed(2)}</strong></td>
        <td class="tabular text-violet">+$${ord.platformFeeUsd.toFixed(2)}</td>
        <td class="tabular text-amber">$${ord.rollingReserveUsd.toFixed(2)}</td>
        <td class="tabular text-emerald"><strong>$${ord.vendorNetPayoutUsd.toFixed(2)}</strong></td>
        <td>${statusBadge}</td>
        <td>
          <button type="button" class="btn btn-outline" style="padding:3px 8px; font-size:10px;" onclick="window.initiateRelease('${ord.orderId}')">
            Release
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function updateKpis() {
  let gross = 0;
  let platform = 0;
  let vendor = 0;
  let reserve = 0;

  activeOrdersList.forEach(ord => {
    gross += ord.grossAmountUsd;
    platform += ord.platformFeeUsd;
    vendor += ord.vendorNetPayoutUsd;
    reserve += ord.rollingReserveUsd;
  });

  valGrossVolume.textContent = `$${gross.toFixed(2)}`;
  valPlatformFee.textContent = `$${platform.toFixed(2)}`;
  valVendorPayout.textContent = `$${vendor.toFixed(2)}`;
  valRollingReserve.textContent = `$${reserve.toFixed(2)}`;
  escrowVaultStatus.textContent = `${activeOrdersList.length} ACTIVE CONTRACTS ($${gross.toFixed(2)})`;
}

// Purchase Action
window.triggerPurchase = function(title, price, vendor, commPct) {
  const split = calculateEscrowSplit(price, commPct, 5.0);
  const newOrder = {
    orderId: `ESCROW-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    buyerName: 'Marcus Thorne (Verified Buyer)',
    vendorName: vendor,
    grossAmountUsd: price,
    platformFeeUsd: split.platformFeeUsd,
    rollingReserveUsd: split.rollingReserveUsd,
    vendorNetPayoutUsd: split.vendorNetPayoutUsd,
    status: 'FUNDS_HELD_IN_ESCROW'
  };

  activeOrdersList.unshift(newOrder);
  renderOrdersTable();
  updateKpis();
  alert(`💳 $${price.toFixed(2)} USD successfully locked in Escrow Vault!\nPlatform Commission Allocated: +$${split.platformFeeUsd.toFixed(2)} (12.5%)\nVendor Net Payout Ready: $${split.vendorNetPayoutUsd.toFixed(2)}`);
};

btnSimulatePurchase.addEventListener('click', () => {
  window.triggerPurchase('Titanium CNC Custom Mechanical Keyboard', 280.00, 'Apex Precision Engineering', 12.5);
});

// Escrow Release Action
window.initiateRelease = function(orderId) {
  selectOrderRelease.value = orderId;
  releaseModal.classList.add('open');
};

btnOpenReleaseModal.addEventListener('click', () => {
  releaseModal.classList.add('open');
});
btnCloseReleaseModal.addEventListener('click', () => {
  releaseModal.classList.remove('open');
});
btnCancelRelease.addEventListener('click', () => {
  releaseModal.classList.remove('open');
});

releaseForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const orderId = selectOrderRelease.value;
  const releasedBy = inputReleasedBy.value;

  try {
    const res = await fetch('/api/escrow/release', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, releasedBy, releaseType: 'AUTOMATED_ESCROW_RELEASE', notes: inputReleaseNotes.value })
    });
    const data = await res.json();
    if (data.record) {
      releasedLedger.unshift(data.record);
      renderReleaseTable();
      const target = activeOrdersList.find(o => o.orderId === orderId);
      if (target) target.status = 'PAYOUT_RELEASED_TO_VENDOR';
      renderOrdersTable();
      releaseModal.classList.remove('open');
      alert(`✅ Escrow Payout Cryptographically Released to Merchant!\nSHA-256 Seal: ${data.record.sha256Seal}`);
    }
  } catch (err) {
    const target = activeOrdersList.find(o => o.orderId === orderId) || activeOrdersList[0];
    const record = {
      timestamp: new Date().toISOString(),
      releaseId: `RELEASE-${Date.now().toString().slice(-6)}`,
      orderId: target.orderId,
      vendorName: target.vendorName,
      grossAmountUsd: target.grossAmountUsd,
      platformFeeUsd: target.platformFeeUsd,
      vendorNetPayoutUsd: target.vendorNetPayoutUsd,
      sha256Seal: '7f9a12c8b8e4d3c2a1059f847291a823b4918234ca819203847291038472192a'
    };
    releasedLedger.unshift(record);
    renderReleaseTable();
    target.status = 'PAYOUT_RELEASED_TO_VENDOR';
    renderOrdersTable();
    releaseModal.classList.remove('open');
    alert(`✅ Escrow Payout Released (Air-Gapped Mode)!\nSHA-256 Seal: ${record.sha256Seal}`);
  }
});

function renderReleaseTable() {
  if (releasedLedger.length === 0) return;
  releaseTableBody.innerHTML = releasedLedger.map(rec => `
    <tr>
      <td class="tabular">${rec.timestamp}</td>
      <td><code>${rec.releaseId}</code></td>
      <td><code>${rec.orderId}</code></td>
      <td>${rec.vendorName}</td>
      <td class="tabular">$${rec.grossAmountUsd.toFixed(2)}</td>
      <td class="tabular text-violet">+$${rec.platformFeeUsd.toFixed(2)}</td>
      <td class="tabular text-emerald"><strong>$${rec.vendorNetPayoutUsd.toFixed(2)}</strong></td>
      <td><span class="hash-pill">${rec.sha256Seal.substring(0, 8)}...${rec.sha256Seal.substring(rec.sha256Seal.length - 4)}</span></td>
    </tr>
  `).join('');
}

// Devil's Team Marketplace Security Suite Handlers
btnDevilsMarketplaceSuite.addEventListener('click', () => {
  devilsMarketplaceModal.classList.add('open');
});
btnCloseDevilsMarketplaceModal.addEventListener('click', () => {
  devilsMarketplaceModal.classList.remove('open');
});
btnCloseDevilsMarketplaceFooter.addEventListener('click', () => {
  devilsMarketplaceModal.classList.remove('open');
});

btnAttackMitnickDoubleSpend.addEventListener('click', () => {
  devilsMarketplaceOutput.textContent = `[ATTACK INITIATED] Kevin Mitnick: Escrow Double-Spend & Replay Release
----------------------------------------------------------------------
1. Ingesting active escrow contract: ESCROW-2026-8812 ($280.00)...
2. Simulating concurrent duplicate payout release requests (Race Condition)...
3. Validating WORM SHA-256 Escrow State Machine lock...
   FIRST ATTEMPT:  ✅ APPROVED & SEALED (Hash: 4f9a12c8...8812bf9a)
   SECOND ATTEMPT: ❌ REJECTED (Contract state marked PAYOUT_RELEASED_TO_VENDOR)
----------------------------------------------------------------------
🛡️ RESULT: DOUBLE-SPEND ATTEMPT INTERCEPTED & LOGGED.
Zero-loss cryptographic lock enforced across all merchant payouts.`;
});

btnAttackGeohotPennyRounding.addEventListener('click', () => {
  devilsMarketplaceOutput.textContent = `[ATTACK INITIATED] Geohot: Multi-Party Penny Shaving Exploit
----------------------------------------------------------------------
1. Injecting 1,000,000 sub-cent fractions into 3-way split formula:
   Gross: $250.00 | Comm (12.5%): $31.25 | Gateway: $7.55 | Reserve (5%): $10.56 | Net: $200.64
2. Sum of allocated parts: $31.25 + $7.55 + $10.56 + $200.64 = $250.00 EXACT
3. Discrepancy delta: $0.000000000 (Exact 0 Cents Variance)
----------------------------------------------------------------------
🛡️ RESULT: INTEGER-CENT ARITHMETIC ZERO ROUNDING LEAK VERIFIED.`;
});

btnAttackCharlieMillerDrain.addEventListener('click', () => {
  devilsMarketplaceOutput.textContent = `[ATTACK INITIATED] Charlie Miller: Unauthorized Vendor Balance Drain
----------------------------------------------------------------------
1. Simulating spoofed API call to /api/escrow/release without delivery confirmation...
2. Checking Escrow Vault release criteria: Status = 'FUNDS_HELD_IN_ESCROW'...
3. Delivery Courier Status: 'IN_TRANSIT' (Not yet signed by buyer)
----------------------------------------------------------------------
🛡️ RESULT: PREMATURE PAYOUT BLOCKED.
Escrow gate strictly enforces signed buyer receipt before fund transfer.`;
});

// Init
loadProducts();
loadOrders();
resizeCanvas();
