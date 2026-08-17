import type { BinSlot, SkuItem, PickOrder, InventoryMovementLog, ClientAccount, WarehouseStats } from '../types';

const STORAGE_KEYS = {
  BINS: 'omnistock_bins_v1',
  SKUS: 'omnistock_skus_v1',
  ORDERS: 'omnistock_orders_v1',
  LOGS: 'omnistock_logs_v1',
  CLIENTS: 'omnistock_clients_v1',
  ACTIVE_WAREHOUSE: 'omnistock_active_wh_v1'
};

// Initial Seed Data: Warehouse Alpha (Main Northeast Distribution Hub)
function generateInitialBins(): BinSlot[] {
  const bins: BinSlot[] = [];
  const aisles = ['A', 'B', 'C', 'D', 'E', 'F'];


  let idCounter = 1;
  aisles.forEach((aisle, aisleIdx) => {
    for (let bay = 1; bay <= 8; bay++) {
      for (let level = 1; level <= 4; level++) {
        const isAisleFast = aisle === 'A' || aisle === 'B';
        const isCold = aisle === 'E';
        const isHazmat = aisle === 'F';
        
        let status: BinSlot['status'] = 'OCCUPIED';
        if (bay > 6 && level > 2) status = 'EMPTY';
        if (bay === 4 && level === 4) status = 'RESERVED';
        if (isHazmat && bay === 8) status = 'QUARANTINE';

        const code = `${aisle}-${String(bay).padStart(2, '0')}-L${level}`;
        const x = 80 + (aisleIdx * 110) + (bay % 2 === 0 ? 30 : 0);
        const y = 60 + (bay * 45);

        bins.push({
          id: `bin-${idCounter++}`,
          code,
          aisle,
          bay,
          level,
          zone: isHazmat ? 'Hazmat Cage' : isCold ? 'Cold Vault' : isAisleFast ? 'Fast-Mover High Bay' : 'Standard Pallet Racks',
          x,
          y,
          status,
          capacityKg: 1200,
          currentWeightKg: status === 'OCCUPIED' ? Math.floor(Math.random() * 600 + 300) : 0,
          quantity: status === 'OCCUPIED' ? Math.floor(Math.random() * 120 + 24) : 0,
          velocityClass: isAisleFast ? 'A' : aisle === 'C' || aisle === 'D' ? 'B' : 'C',
          lastAudited: new Date(Date.now() - Math.random() * 864000000).toISOString().split('T')[0]
        });
      }
    }
  });

  return bins;
}

const INITIAL_SKUS: SkuItem[] = [
  {
    id: 'sku-1',
    skuCode: 'MED-N95-3M-2000',
    name: '3M Aura N95 Particulate Respirator (Case of 240)',
    category: 'PPE & Infection Control',
    barcode: '051131497118',
    rfidTag: 'E28011606000020478B40A12',
    unitCost: 142.50,
    retailPrice: 220.00,
    stockQty: 840,
    allocatedQty: 120,
    safetyStock: 150,
    reorderPoint: 300,
    leadTimeDays: 5,
    primaryBin: 'A-01-L1',
    clientId: 'client-1',
    weightKg: 14.2,
    turnoverRate: 18.4,
    stockoutRisk: 'LOW'
  },
  {
    id: 'sku-2',
    skuCode: 'ELEC-LITH-48V-BAT',
    name: '48V 100Ah Lithium Iron Phosphate Battery Pack',
    category: 'Industrial Electronics',
    barcode: '840194829104',
    rfidTag: 'E28011606000020478B40B34',
    unitCost: 890.00,
    retailPrice: 1450.00,
    stockQty: 48,
    allocatedQty: 12,
    safetyStock: 15,
    reorderPoint: 25,
    leadTimeDays: 14,
    primaryBin: 'B-02-L2',
    clientId: 'client-2',
    weightKg: 42.0,
    turnoverRate: 9.2,
    stockoutRisk: 'LOW'
  },
  {
    id: 'sku-3',
    skuCode: 'PHARM-VACC-ULTRA-20',
    name: 'Pfizer-BioNTech COVID Vaccine Vials (-80°C Storage)',
    category: 'Cold Chain Pharma',
    barcode: '006931548291',
    rfidTag: 'E28011606000020478B40C56',
    unitCost: 320.00,
    retailPrice: 480.00,
    stockQty: 320,
    allocatedQty: 180,
    safetyStock: 100,
    reorderPoint: 200,
    leadTimeDays: 3,
    primaryBin: 'E-01-L1',
    clientId: 'client-1',
    weightKg: 8.5,
    turnoverRate: 24.1,
    stockoutRisk: 'LOW'
  },
  {
    id: 'sku-4',
    skuCode: 'AUTO-HYDR-CYL-500',
    name: 'Parker Hannifin Heavy Duty Hydraulic Cylinder 500bar',
    category: 'Heavy Machinery & Parts',
    barcode: '749281048291',
    rfidTag: 'E28011606000020478B40D78',
    unitCost: 450.00,
    retailPrice: 720.00,
    stockQty: 18,
    allocatedQty: 16,
    safetyStock: 20,
    reorderPoint: 30,
    leadTimeDays: 21,
    primaryBin: 'C-04-L1',
    clientId: 'client-3',
    weightKg: 68.0,
    turnoverRate: 5.4,
    stockoutRisk: 'CRITICAL'
  },
  {
    id: 'sku-5',
    skuCode: 'CHEM-ISOPROP-99-DRUM',
    name: 'Isopropanol 99.8% Electronic Grade (55 Gal Drum)',
    category: 'Hazmat & Solvents',
    barcode: '381920491823',
    rfidTag: 'E28011606000020478B40E90',
    unitCost: 280.00,
    retailPrice: 420.00,
    stockQty: 34,
    allocatedQty: 10,
    safetyStock: 12,
    reorderPoint: 20,
    leadTimeDays: 7,
    primaryBin: 'F-02-L1',
    clientId: 'client-2',
    weightKg: 185.0,
    turnoverRate: 12.0,
    stockoutRisk: 'LOW'
  }
];

const INITIAL_CLIENTS: ClientAccount[] = [
  {
    id: 'client-1',
    companyName: 'Apex Health Logistics',
    contactPerson: 'Marcus Vance (VP Operations)',
    email: 'm.vance@apexhealth.com',
    activePallets: 142,
    monthlyStorageRate: 24.50,
    handlingFeePerPick: 4.20,
    currentMonthBilled: 8420.00,
    contractTier: 'STRATEGIC_3PL',
    joinedDate: '2025-01-15'
  },
  {
    id: 'client-2',
    companyName: 'VoltEdge Industrial Energy',
    contactPerson: 'Sarah Lin (Supply Chain Director)',
    email: 's.lin@voltedge.io',
    activePallets: 88,
    monthlyStorageRate: 28.00,
    handlingFeePerPick: 5.00,
    currentMonthBilled: 5120.00,
    contractTier: 'ENTERPRISE_VIP',
    joinedDate: '2025-03-10'
  },
  {
    id: 'client-3',
    companyName: 'Titan Heavy Machinery OEM',
    contactPerson: 'David K. Hoffman (Parts Manager)',
    email: 'hoffman@titanheavy.com',
    activePallets: 64,
    monthlyStorageRate: 35.00,
    handlingFeePerPick: 7.50,
    currentMonthBilled: 4280.00,
    contractTier: 'STANDARD',
    joinedDate: '2025-06-01'
  }
];

const INITIAL_ORDERS: PickOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'ORD-2026-0941',
    clientName: 'Apex Health Logistics',
    clientId: 'client-1',
    destination: 'Boston General Hospital • Dock 4',
    priority: 'STAT',
    status: 'OPTIMIZED',
    totalWeightKg: 42.6,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    assignedPicker: 'Dave Miller (Cart #4)',
    optimalRoutePath: ['A-01-L1', 'A-02-L2', 'E-01-L1'],
    items: [
      { skuId: 'sku-1', skuCode: 'MED-N95-3M-2000', name: '3M Aura N95 Respirator', quantity: 24, pickedQuantity: 0, binLocation: 'A-01-L1', status: 'PENDING' },
      { skuId: 'sku-3', skuCode: 'PHARM-VACC-ULTRA-20', name: 'Pfizer COVID Vaccine Vials', quantity: 12, pickedQuantity: 0, binLocation: 'E-01-L1', status: 'PENDING' }
    ]
  },
  {
    id: 'ord-102',
    orderNumber: 'ORD-2026-0942',
    clientName: 'VoltEdge Industrial Energy',
    clientId: 'client-2',
    destination: 'Tesla Gigafactory Texas • Gate 12',
    priority: 'RUSH',
    status: 'IN_PICK',
    totalWeightKg: 126.0,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    assignedPicker: 'Elena Rostova (Forklift #2)',
    optimalRoutePath: ['B-02-L2', 'F-02-L1'],
    items: [
      { skuId: 'sku-2', skuCode: 'ELEC-LITH-48V-BAT', name: '48V 100Ah LiFePO4 Battery Pack', quantity: 3, pickedQuantity: 2, binLocation: 'B-02-L2', status: 'PENDING' },
      { skuId: 'sku-5', skuCode: 'CHEM-ISOPROP-99-DRUM', name: 'Isopropanol 99.8% (55 Gal Drum)', quantity: 1, pickedQuantity: 0, binLocation: 'F-02-L1', status: 'PENDING' }
    ]
  }
];

const INITIAL_LOGS: InventoryMovementLog[] = [
  {
    id: 'log-1',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    type: 'RECEIVING',
    skuCode: 'MED-N95-3M-2000',
    skuName: '3M Aura N95 Particulate Respirator',
    toBin: 'A-01-L1',
    quantity: 240,
    operator: 'Marcus Reed',
    notes: 'Inbound PO #8410 from 3M Distribution'
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    type: 'PICK',
    skuCode: 'ELEC-LITH-48V-BAT',
    skuName: '48V 100Ah LiFePO4 Battery Pack',
    fromBin: 'B-02-L2',
    quantity: 2,
    operator: 'Elena Rostova',
    notes: 'Wave Pick execution for ORD-2026-0942'
  }
];

class WarehouseDB {
  getBins(): BinSlot[] {
    const raw = localStorage.getItem(STORAGE_KEYS.BINS);
    if (!raw) {
      const initial = generateInitialBins();
      // Link SKUs to bins
      initial[0].skuId = INITIAL_SKUS[0].id;
      initial[0].skuCode = INITIAL_SKUS[0].skuCode;
      initial[0].skuName = INITIAL_SKUS[0].name;
      initial[0].batchLot = 'LOT-2026-N95-X9';
      initial[0].expiryDate = '2028-12-31';

      initial[12].skuId = INITIAL_SKUS[1].id;
      initial[12].skuCode = INITIAL_SKUS[1].skuCode;
      initial[12].skuName = INITIAL_SKUS[1].name;
      initial[12].batchLot = 'BAT-48V-LFP-09';
      
      this.saveBins(initial);
      return initial;
    }
    return JSON.parse(raw);
  }

  saveBins(bins: BinSlot[]) {
    localStorage.setItem(STORAGE_KEYS.BINS, JSON.stringify(bins));
  }

  getSkus(): SkuItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.SKUS);
    if (!raw) {
      this.saveSkus(INITIAL_SKUS);
      return INITIAL_SKUS;
    }
    return JSON.parse(raw);
  }

  saveSkus(skus: SkuItem[]) {
    localStorage.setItem(STORAGE_KEYS.SKUS, JSON.stringify(skus));
  }

  getOrders(): PickOrder[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) {
      this.saveOrders(INITIAL_ORDERS);
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  }

  saveOrders(orders: PickOrder[]) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }

  getClients(): ClientAccount[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CLIENTS);
    if (!raw) {
      this.saveClients(INITIAL_CLIENTS);
      return INITIAL_CLIENTS;
    }
    return JSON.parse(raw);
  }

  saveClients(clients: ClientAccount[]) {
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
  }

  getLogs(): InventoryMovementLog[] {
    const raw = localStorage.getItem(STORAGE_KEYS.LOGS);
    if (!raw) {
      this.saveLogs(INITIAL_LOGS);
      return INITIAL_LOGS;
    }
    return JSON.parse(raw);
  }

  saveLogs(logs: InventoryMovementLog[]) {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
  }

  addLog(entry: Omit<InventoryMovementLog, 'id' | 'timestamp'>) {
    const logs = this.getLogs();
    logs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...entry
    });
    this.saveLogs(logs);
  }

  getStats(): WarehouseStats {
    const bins = this.getBins();
    const skus = this.getSkus();
    const orders = this.getOrders();

    const occupied = bins.filter(b => b.status === 'OCCUPIED').length;
    const utilization = Math.round((occupied / bins.length) * 100);
    const criticalAlerts = skus.filter(s => s.stockoutRisk === 'CRITICAL' || s.stockQty <= s.reorderPoint).length;
    const activePicks = orders.filter(o => o.status === 'IN_PICK' || o.status === 'OPTIMIZED').length;

    return {
      totalCapacityBins: bins.length,
      occupiedBins: occupied,
      utilizationRate: utilization,
      totalSkuCount: skus.length,
      activePicksCount: activePicks,
      pendingOrdersCount: orders.filter(o => o.status === 'PENDING').length,
      stockoutAlertsCount: criticalAlerts,
      avgPickSpeedMins: 4.2
    };
  }

  resetToDefault() {
    localStorage.removeItem(STORAGE_KEYS.BINS);
    localStorage.removeItem(STORAGE_KEYS.SKUS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.LOGS);
    localStorage.removeItem(STORAGE_KEYS.CLIENTS);
    return {
      bins: this.getBins(),
      skus: this.getSkus(),
      orders: this.getOrders(),
      clients: this.getClients(),
      logs: this.getLogs()
    };
  }
}

export const db = new WarehouseDB();
