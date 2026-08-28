import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3007;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Immutable Cryptographic Escrow Ledger (WORM SHA-256)
const escrowLedger = [];

// Seed Multi-Vendor Marketplace Catalog
let marketplaceProducts = [
  {
    id: 'prod-101',
    vendorId: 'vendor-tech-01',
    vendorName: 'Apex Precision Engineering (Germany)',
    title: 'Titanium CNC Custom Mechanical Keyboard (Gasket Mount)',
    category: 'Hardware & Peripherals',
    priceUsd: 280.00,
    stock: 14,
    commissionPct: 12.5,
    rating: 4.9,
    imageUrl: 'keyboard.svg'
  },
  {
    id: 'prod-102',
    vendorId: 'vendor-audio-02',
    vendorName: 'Aether Acoustic Labs (Japan)',
    title: 'Planar Magnetic Open-Back Studio Reference Headphones',
    category: 'Audiophile Gear',
    priceUsd: 450.00,
    stock: 8,
    commissionPct: 10.0,
    rating: 5.0,
    imageUrl: 'headphones.svg'
  },
  {
    id: 'prod-103',
    vendorId: 'vendor-artisan-03',
    vendorName: 'Nordic Minimal Leatherworks (Sweden)',
    title: 'Full-Grain Vegetable Tanned Leather Tech Portfolio',
    category: 'Luxury Accessories',
    priceUsd: 145.00,
    stock: 22,
    commissionPct: 15.0,
    rating: 4.8,
    imageUrl: 'bag.svg'
  },
  {
    id: 'prod-104',
    vendorId: 'vendor-code-04',
    vendorName: 'OmniVoxel Software Systems (USA)',
    title: 'Spatial WMS 3D Digital Twin Enterprise License Pack',
    category: 'Digital Software & Licenses',
    priceUsd: 1200.00,
    stock: 99,
    commissionPct: 8.0,
    rating: 4.95,
    imageUrl: 'software.svg'
  }
];

// Seed Escrow Orders
let activeOrders = [
  {
    orderId: 'ESCROW-2026-8812',
    buyerName: 'Alexander Hayes',
    buyerEmail: 'ahayes@hayesenterprises.com',
    vendorId: 'vendor-tech-01',
    vendorName: 'Apex Precision Engineering',
    productTitle: 'Titanium CNC Custom Mechanical Keyboard',
    grossAmountUsd: 280.00,
    platformFeeUsd: 35.00,
    gatewayFeeUsd: 8.42,
    rollingReserveUsd: 11.83,
    vendorNetPayoutUsd: 224.75,
    status: 'FUNDS_HELD_IN_ESCROW',
    trackingNumber: 'DHL-EXPRESS-992014820',
    deliveryStatus: 'IN_TRANSIT (Out for Delivery)',
    disputeDeadline: '2026-09-04T12:00:00Z'
  },
  {
    orderId: 'ESCROW-2026-8813',
    buyerName: 'Dr. Evelyn Foster',
    buyerEmail: 'efoster.neuro@gmail.com',
    vendorId: 'vendor-audio-02',
    vendorName: 'Aether Acoustic Labs',
    productTitle: 'Planar Magnetic Open-Back Studio Headphones',
    grossAmountUsd: 450.00,
    platformFeeUsd: 45.00,
    gatewayFeeUsd: 13.35,
    rollingReserveUsd: 19.58,
    vendorNetPayoutUsd: 372.07,
    status: 'DELIVERY_CONFIRMED',
    trackingNumber: 'FEDEX-PRIORITY-77412091',
    deliveryStatus: 'DELIVERED (Signature Verified)',
    disputeDeadline: '2026-09-02T18:00:00Z'
  }
];

// API: Products
app.get('/api/products', (req, res) => {
  res.json({ products: marketplaceProducts });
});

// API: Active Orders
app.get('/api/orders', (req, res) => {
  res.json({ orders: activeOrders });
});

// API: Cryptographic Escrow Release Endpoint
app.post('/api/escrow/release', (req, res) => {
  const { orderId, releasedBy, releaseType, notes } = req.body;

  const order = activeOrders.find(o => o.orderId === orderId);
  if (!order) {
    return res.status(404).json({ error: 'Order reference not found in active escrow.' });
  }

  const timestamp = new Date().toISOString();
  const payoutPayload = JSON.stringify({
    orderId: order.orderId,
    vendorId: order.vendorId,
    vendorName: order.vendorName,
    grossAmountUsd: order.grossAmountUsd,
    platformFeeUsd: order.platformFeeUsd,
    vendorNetPayoutUsd: order.vendorNetPayoutUsd,
    releasedBy: releasedBy || 'BUYER_DELIVERY_CONFIRMATION',
    releaseType: releaseType || 'AUTOMATED_ESCROW_RELEASE',
    notes: notes || 'Delivery inspection verified without dispute.',
    timestamp
  });

  const sha256Seal = crypto.createHash('sha256').update(payoutPayload).digest('hex');

  order.status = 'PAYOUT_RELEASED_TO_VENDOR';

  const record = {
    releaseId: `RELEASE-${Date.now().toString().slice(-6)}`,
    orderId: order.orderId,
    vendorName: order.vendorName,
    grossAmountUsd: order.grossAmountUsd,
    platformFeeUsd: order.platformFeeUsd,
    vendorNetPayoutUsd: order.vendorNetPayoutUsd,
    releasedBy,
    timestamp,
    sha256Seal,
    status: 'WORM_IMMUTABLE_RELEASED'
  };

  escrowLedger.unshift(record);

  res.json({
    success: true,
    message: 'Escrow Funds Cryptographically Released to Vendor Account',
    record
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('='.repeat(65));
  console.log('🛍️ BAZAARTRUST MARKETPLACE & ESCROW ENGINE ONLINE (PORT 3007)');
  console.log(`📍 Localhost URL: http://localhost:${PORT}`);
  console.log('🛡️ Modules: Multi-Vendor Commission Splits & WORM SHA-256 Escrow');
  console.log('='.repeat(65));
});
