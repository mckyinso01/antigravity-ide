// ==========================================================================
// BAZAARTRUST MARKETPLACE & ESCROW TEST SUITE
// Automated Unit Verification of Commission Splits, Escrow & Dispute Logic
// ==========================================================================

import {
  calculateEscrowSplit,
  calculateMarketplaceCartTotal,
  evaluateDisputeSettlement
} from './public/marketplace_math.js';

console.log('='.repeat(56));
console.log('🛍️ TESTING BAZAARTRUST MULTI-VENDOR MARKETPLACE & ESCROW');
console.log('='.repeat(56));

// Test 1: Standard Commission Split Calculation
console.log('\nTest 1: Multi-Vendor Commission Split on $250.00 Order');
const split250 = calculateEscrowSplit(250.00, 12.5, 5.0);
console.log(` -> Gross: $250.00 => Platform (12.5%): $${split250.platformFeeUsd} | Gateway (2.9%+$0.30): $${split250.gatewayFeeUsd} | 5% Reserve: $${split250.rollingReserveUsd} | Vendor Net: $${split250.vendorNetPayoutUsd}`);
if (split250.platformFeeUsd === 31.25 && split250.gatewayFeeUsd === 7.55 && split250.vendorNetPayoutUsd === 200.64) {
  console.log(' -> Status: ✅ PASS (Exact Integer-Cent Split Verified)');
} else {
  console.error(` -> Status: ❌ FAIL (Unexpected Split Result)`);
  process.exit(1);
}

// Test 2: Multi-Item Shopping Cart Calculation
console.log('\nTest 2: Multi-Vendor Shopping Cart Total');
const cart = [
  { id: 'prod-1', name: 'Precision CNC Mechanical Keyboard', vendorId: 'v-01', unitPriceUsd: 180.00, quantity: 1 },
  { id: 'prod-2', name: 'Artisan Resin Keycap Set', vendorId: 'v-02', unitPriceUsd: 45.00, quantity: 2 }
];
const cartTotal = calculateMarketplaceCartTotal(cart, 8.25);
console.log(` -> Subtotal: $${cartTotal.subtotalUsd} | Tax (8.25%): $${cartTotal.taxUsd} | Total Escrow: $${cartTotal.totalEscrowGrossUsd} (${cartTotal.itemCount} items)`);
if (cartTotal.subtotalUsd === 270.00 && cartTotal.taxUsd === 22.28 && cartTotal.totalEscrowGrossUsd === 292.28) {
  console.log(' -> Status: ✅ PASS (Multi-Item Cart Tax & Escrow Verified)');
} else {
  console.error(` -> Status: ❌ FAIL (Unexpected Cart Total)`);
  process.exit(1);
}

// Test 3: Dispute Settlement Evaluation
console.log('\nTest 3: Buyer Dispute & Merchant Chargeback Settlement');
const disputeFull = evaluateDisputeSettlement(120.00, 'FULL_REFUND', 15.00);
console.log(` -> Full Refund: Buyer Refund: $${disputeFull.buyerRefundUsd} | Vendor Charge: $${disputeFull.vendorChargeUsd} | Platform Fee: $${disputeFull.platformRetainedFeeUsd}`);
if (disputeFull.buyerRefundUsd === 120.00 && disputeFull.vendorChargeUsd === 135.00 && disputeFull.platformRetainedFeeUsd === 15.00) {
  console.log(' -> Status: ✅ PASS (Full Refund Dispute Surcharge Verified)');
} else {
  console.error(` -> Status: ❌ FAIL (Unexpected Dispute Result)`);
  process.exit(1);
}

console.log('\n' + '='.repeat(56));
console.log('🎉 ALL BAZAARTRUST MARKETPLACE TESTS PASSED!');
console.log('='.repeat(56));
