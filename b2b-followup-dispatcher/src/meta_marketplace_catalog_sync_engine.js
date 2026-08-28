// ==========================================================================
// AUTOMATED FB MARKETPLACE & DEALERSHIP CATALOG SYNC ENGINE (STRATEGY 4)
// Real-Time Automotive Inventory to Meta Commerce Catalog Transformer & Sync
// ==========================================================================

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const FEEDS_DIR = path.join(__dirname, 'src/meta_catalog_feeds');
if (!fs.existsSync(FEEDS_DIR)) fs.mkdirSync(FEEDS_DIR, { recursive: true });

/**
 * Transforms automotive inventory into standard Meta Commerce Vehicles Catalog feed format.
 * @param {Array<{ vin: string, make: string, model: string, year: number, mileage: number, stickerPriceUsd: number, costBasisUsd: number, lotDays: number, obdHealth: string, status: string }>} vehicles 
 * @param {{ dealershipName: string, websiteUrl: string, currency: string }} dealershipInfo 
 * @returns {{ catalogItems: Array, metaFeedJson: object, metaFeedXml: string, totalStockValueUsd: number, sha256SyncSeal: string }}
 */
export function generateMetaVehicleCatalogFeed(vehicles, dealershipInfo) {
  let totalStockValueUsd = 0;
  const catalogItems = [];

  vehicles.forEach(veh => {
    totalStockValueUsd += veh.stickerPriceUsd;

    const item = {
      id: veh.vin,
      vin: veh.vin,
      title: `${veh.year} ${veh.make} ${veh.model}`,
      description: `Certified Pre-Owned ${veh.year} ${veh.make} ${veh.model}. Mileage: ${veh.mileage.toLocaleString()} mi. Verified OBD-II Status: ${veh.obdHealth}. Inspected by ${dealershipInfo.dealershipName}.`,
      availability: veh.status === 'SOLD' ? 'out_of_stock' : 'in_stock',
      condition: 'certified_preowned',
      price: `${veh.stickerPriceUsd.toFixed(2)} ${dealershipInfo.currency || 'USD'}`,
      link: `${dealershipInfo.websiteUrl}?vin=${veh.vin}`,
      image_link: `${dealershipInfo.websiteUrl}/images/${veh.vin}.jpg`,
      brand: veh.make,
      vehicle_type: 'car_truck',
      year: veh.year,
      mileage: {
        value: veh.mileage,
        unit: 'MI'
      },
      fb_page_id: dealershipInfo.fbPageId || '10992817290124',
      custom_label_0: veh.lotDays < 30 ? 'FRESH_ARRIVAL' : 'SPECIAL_OFFER',
      custom_label_1: veh.obdHealth === 'CLEARED' ? 'CLEAN_TELEMETRICS' : 'INSPECTION_PENDING'
    };

    catalogItems.push(item);
  });

  const timestamp = new Date().toISOString();
  const metaFeedJson = {
    dealership: dealershipInfo.dealershipName,
    syncTimestampUtc: timestamp,
    vehicleCount: catalogItems.length,
    totalStockValueUsd,
    feedSchema: 'meta_commerce_vehicle_catalog_v2',
    vehicles: catalogItems
  };

  // Generate XML Feed for Meta Catalog scheduled fetch
  const xmlItems = catalogItems.map(item => `
    <item>
      <g:id>${item.id}</g:id>
      <g:vin>${item.vin}</g:vin>
      <g:title><![CDATA[${item.title}]]></g:title>
      <g:description><![CDATA[${item.description}]]></g:description>
      <g:availability>${item.availability}</g:availability>
      <g:condition>${item.condition}</g:condition>
      <g:price>${item.price}</g:price>
      <g:link>${item.link}</g:link>
      <g:image_link>${item.image_link}</g:image_link>
      <g:brand>${item.brand}</g:brand>
      <g:year>${item.year}</g:year>
      <g:mileage>${item.mileage.value} ${item.mileage.unit}</g:mileage>
      <g:custom_label_0>${item.custom_label_0}</g:custom_label_0>
      <g:custom_label_1>${item.custom_label_1}</g:custom_label_1>
    </item>`).join('');

  const metaFeedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${dealershipInfo.dealershipName} Auto Inventory Feed</title>
    <link>${dealershipInfo.websiteUrl}</link>
    <description>Automated Meta Marketplace & Instagram Shopping Vehicle Catalog</description>
    <lastBuildDate>${timestamp}</lastBuildDate>
    ${xmlItems}
  </channel>
</rss>`;

  const sha256SyncSeal = crypto.createHash('sha256').update(JSON.stringify(metaFeedJson)).digest('hex');

  return {
    catalogItems,
    metaFeedJson,
    metaFeedXml,
    totalStockValueUsd,
    sha256SyncSeal
  };
}
