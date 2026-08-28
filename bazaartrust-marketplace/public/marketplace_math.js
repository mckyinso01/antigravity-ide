// ==========================================================================
// BAZAARTRUST MARKETPLACE & ESCROW MATHEMATICAL ENGINE
// Precise Currency Arithmetic, Commission Splits & Escrow Reserve Models
// ==========================================================================

export const DEFAULT_PLATFORM_COMMISSION_PCT = 12.5; // Standard 12.5% marketplace commission
export const PAYMENT_GATEWAY_VARIABLE_FEE_PCT = 2.9; // Standard 2.9% stripe/paypal card fee
export const PAYMENT_GATEWAY_FIXED_FEE_USD = 0.30; // $0.30 fixed processing charge
export const ESCROW_ROLLING_RESERVE_PCT = 5.0; // 5% reserve holdback for chargeback/return protection

/**
 * Calculates accurate multi-party commission split on integer cents to avoid floating-point errors.
 * @param {number} grossAmountUsd - Total order amount in USD
 * @param {number} [commissionPct=DEFAULT_PLATFORM_COMMISSION_PCT] - Marketplace commission %
 * @param {number} [reservePct=ESCROW_ROLLING_RESERVE_PCT] - Rolling dispute reserve %
 * @returns {{ grossCents: number, platformFeeUsd: number, gatewayFeeUsd: number, rollingReserveUsd: number, vendorNetPayoutUsd: number, effectiveVendorSharePct: number }}
 */
export function calculateEscrowSplit(
  grossAmountUsd,
  commissionPct = DEFAULT_PLATFORM_COMMISSION_PCT,
  reservePct = ESCROW_ROLLING_RESERVE_PCT
) {
  if (grossAmountUsd <= 0) {
    return {
      grossCents: 0,
      platformFeeUsd: 0.0,
      gatewayFeeUsd: 0.0,
      rollingReserveUsd: 0.0,
      vendorNetPayoutUsd: 0.0,
      effectiveVendorSharePct: 0.0
    };
  }

  const grossCents = Math.round(grossAmountUsd * 100);
  
  // Platform Commission in Cents
  const platformFeeCents = Math.round(grossCents * (commissionPct / 100));
  
  // Payment Gateway Fee in Cents (2.9% + $0.30)
  const gatewayFeeCents = Math.round(grossCents * (PAYMENT_GATEWAY_VARIABLE_FEE_PCT / 100)) + Math.round(PAYMENT_GATEWAY_FIXED_FEE_USD * 100);
  
  // Total Deductions
  const totalDeductionsCents = platformFeeCents + gatewayFeeCents;
  const vendorAvailableCents = Math.max(0, grossCents - totalDeductionsCents);
  
  // Rolling Dispute Reserve in Cents
  const rollingReserveCents = Math.round(vendorAvailableCents * (reservePct / 100));
  const vendorImmediatePayoutCents = vendorAvailableCents - rollingReserveCents;

  const platformFeeUsd = platformFeeCents / 100;
  const gatewayFeeUsd = gatewayFeeCents / 100;
  const rollingReserveUsd = rollingReserveCents / 100;
  const vendorNetPayoutUsd = vendorImmediatePayoutCents / 100;
  const effectiveVendorSharePct = Number(((vendorImmediatePayoutCents / grossCents) * 100).toFixed(2));

  return {
    grossCents,
    platformFeeUsd: Number(platformFeeUsd.toFixed(2)),
    gatewayFeeUsd: Number(gatewayFeeUsd.toFixed(2)),
    rollingReserveUsd: Number(rollingReserveUsd.toFixed(2)),
    vendorNetPayoutUsd: Number(vendorNetPayoutUsd.toFixed(2)),
    effectiveVendorSharePct
  };
}

/**
 * Calculates marketplace cart total, multi-vendor tax, and consolidated escrow holding value.
 * @param {Array<{ id: string, name: string, vendorId: string, unitPriceUsd: number, quantity: number }>} items 
 * @param {number} [salesTaxPct=8.25] - Standard sales tax rate %
 * @returns {{ subtotalUsd: number, taxUsd: number, totalEscrowGrossUsd: number, itemCount: number }}
 */
export function calculateMarketplaceCartTotal(items = [], salesTaxPct = 8.25) {
  let subtotalCents = 0;
  let itemCount = 0;

  items.forEach(item => {
    const itemCents = Math.round(item.unitPriceUsd * 100);
    subtotalCents += itemCents * item.quantity;
    itemCount += item.quantity;
  });

  const taxCents = Math.round(subtotalCents * (salesTaxPct / 100));
  const totalGrossCents = subtotalCents + taxCents;

  return {
    subtotalUsd: Number((subtotalCents / 100).toFixed(2)),
    taxUsd: Number((taxCents / 100).toFixed(2)),
    totalEscrowGrossUsd: Number((totalGrossCents / 100).toFixed(2)),
    itemCount
  };
}

/**
 * Evaluates buyer dispute resolution and penalty allocation.
 * @param {number} orderGrossUsd - Original order amount
 * @param {'FULL_REFUND' | 'PARTIAL_REFUND_50' | 'REJECTED_VENDOR_WINS'} resolutionType 
 * @param {number} [disputeFeeUsd=15.0] - Merchant dispute investigation penalty
 * @returns {{ buyerRefundUsd: number, vendorChargeUsd: number, platformRetainedFeeUsd: number }}
 */
export function evaluateDisputeSettlement(orderGrossUsd, resolutionType, disputeFeeUsd = 15.0) {
  const grossCents = Math.round(orderGrossUsd * 100);
  const disputeFeeCents = Math.round(disputeFeeUsd * 100);

  let buyerRefundCents = 0;
  let vendorChargeCents = 0;
  let platformRetainedCents = 0;

  if (resolutionType === 'FULL_REFUND') {
    buyerRefundCents = grossCents;
    vendorChargeCents = grossCents + disputeFeeCents;
    platformRetainedCents = disputeFeeCents; // Platform recovers dispute investigation cost
  } else if (resolutionType === 'PARTIAL_REFUND_50') {
    buyerRefundCents = Math.round(grossCents / 2);
    vendorChargeCents = buyerRefundCents + Math.round(disputeFeeCents / 2);
    platformRetainedCents = Math.round(disputeFeeCents / 2);
  } else {
    // REJECTED_VENDOR_WINS
    buyerRefundCents = 0;
    vendorChargeCents = 0;
    platformRetainedCents = 0;
  }

  return {
    buyerRefundUsd: Number((buyerRefundCents / 100).toFixed(2)),
    vendorChargeUsd: Number((vendorChargeCents / 100).toFixed(2)),
    platformRetainedFeeUsd: Number((platformRetainedCents / 100).toFixed(2))
  };
}
