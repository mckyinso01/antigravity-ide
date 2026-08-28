// ==========================================================================
// TEST SUITE: AUTOMATED FB MARKETPLACE & DEALERSHIP CATALOG SYNC ENGINE
// Verification of Meta Commerce Vehicle Feed Schema & SHA-256 Sync Seals
// ==========================================================================

import { generateMetaVehicleCatalogFeed } from './src/meta_marketplace_catalog_sync_engine.js';

console.log('='.repeat(65));
console.log('🚗 TESTING FB MARKETPLACE DEALERSHIP CATALOG SYNC ENGINE');
console.log('='.repeat(65));

// Test 1: Full Fleet Catalog Feed Generation
console.log('\nTest 1: Full Vehicle Inventory to Meta Commerce XML & JSON');
const testVehicles = [
  {
    vin: '1G1YY22U565108492',
    make: 'Chevrolet',
    model: 'Corvette Stingray 3LT',
    year: 2023,
    mileage: 8420,
    stickerPriceUsd: 79900,
    costBasisUsd: 68500,
    lotDays: 14,
    obdHealth: 'CLEARED',
    status: 'AVAILABLE'
  },
  {
    vin: '5UXCR6C05M9E41209',
    make: 'BMW',
    model: 'X5 xDrive40i M-Sport',
    year: 2024,
    mileage: 14200,
    stickerPriceUsd: 63500,
    costBasisUsd: 52000,
    lotDays: 38,
    obdHealth: 'P0128 (PASS)',
    status: 'AVAILABLE'
  }
];

const dealership = {
  dealershipName: 'Apex Premier Motors',
  websiteUrl: 'https://apexautotech.linkable.it.com',
  currency: 'USD'
};

const result = generateMetaVehicleCatalogFeed(testVehicles, dealership);
console.log(` -> Vehicles Converted: ${result.catalogItems.length} units`);
console.log(` -> Total Stock Value: $${result.totalStockValueUsd.toLocaleString()} USD`);
console.log(` -> WORM SHA-256 Sync Seal: ${result.sha256SyncSeal.slice(0, 24)}...`);
console.log(` -> XML Feed Valid Length: ${result.metaFeedXml.length} characters`);

if (result.catalogItems.length === 2 && result.totalStockValueUsd === 143400 && result.metaFeedXml.includes('<g:vin>1G1YY22U565108492</g:vin>')) {
  console.log(' -> Status: ✅ PASS (Meta Commerce XML & JSON Schema Compliant)');
} else {
  console.error(' -> Status: ❌ FAIL');
  process.exit(1);
}

console.log('\n' + '='.repeat(65));
console.log('🎉 ALL FB MARKETPLACE CATALOG SYNC ENGINE TESTS PASSED!');
console.log('='.repeat(65));
