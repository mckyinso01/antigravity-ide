import type { BinSlot, SkuItem, PickOrder, InventoryMovementLog, ClientAccount, WarehouseStats, AisleSignage, FacilityZone } from '../types';

const STORAGE_KEYS = {
  BINS: 'omnistock_bins_v1',
  SKUS: 'omnistock_skus_v1',
  ORDERS: 'omnistock_orders_v1',
  LOGS: 'omnistock_logs_v1',
  CLIENTS: 'omnistock_clients_v1',
  ACTIVE_WAREHOUSE: 'omnistock_active_wh_v1',
  AISLE_SIGNS: 'omnistock_aisle_signs_v1',
  ZONES: 'omnistock_zones_v1'
};

const DEFAULT_AISLE_SIGNS: AisleSignage[] = [
  { aisle: 'A', name: 'Pharma & PPE Supplies', icon: '💊', color: '#06B6D4', department: 'Healthcare & Safety' },
  { aisle: 'B', name: 'EV Lithium Batteries', icon: '⚡', color: '#3B82F6', department: 'Electronics & Energy' },
  { aisle: 'C', name: 'Hydraulics & Heavy Cylinders', icon: '🧰', color: '#10B981', department: 'Industrial Equipment' },
  { aisle: 'D', name: 'Precision Ball Bearings', icon: '⚙️', color: '#F59E0B', department: 'Hardware & Machinery' },
  { aisle: 'E', name: 'Cold Chain Vaccines (-80°C)', icon: '❄️', color: '#38BDF8', department: 'Cold Vault Biologics' },
  { aisle: 'F', name: 'Hazmat Chemicals & Solvents', icon: '☣️', color: '#A855F7', department: 'Hazardous Materials' },
  { aisle: 'G', name: 'Noodles, Milk & Canned Goods', icon: '🥫', color: '#EC4899', department: 'Food & Dry Provisions' },
  { aisle: 'H', name: 'Soaps, Shampoos & Detergents', icon: '🧼', color: '#14B8A6', department: 'Household & Sanitization' },
];

const DEFAULT_ZONES: FacilityZone[] = [
  { id: 'zone-dock', name: 'DOCK INBOUND', code: 'DOCK-IN', x: 20, y: 340, width: 120, height: 90, color: '#121D36', strokeColor: '#2A4374' },
  { id: 'zone-cold', name: 'COLD VAULT (-80°C)', code: 'COLD-VLT', x: 520, y: 20, width: 130, height: 300, color: 'rgba(6, 182, 212, 0.05)', strokeColor: '#0891B2', isTempControlled: true },
  { id: 'zone-hazmat', name: 'HAZMAT CAGE', code: 'HAZ-CAGE', x: 660, y: 20, width: 120, height: 300, color: 'rgba(168, 85, 247, 0.05)', strokeColor: '#9333EA' },
  { id: 'zone-ship', name: 'PACK & SHIP', code: 'PACK-SHIP', x: 660, y: 340, width: 120, height: 90, color: '#121D36', strokeColor: '#2A4374' }
];

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

        let skuId: string | undefined;
        let skuCode: string | undefined;
        let skuName: string | undefined;
        let skuCategory: string | undefined;
        let batchLot: string | undefined;
        let expiryDate: string | undefined;
        let quantity = 0;
        let shelfPhotoUrl: string | undefined;

        if (status === 'OCCUPIED' || status === 'RESERVED' || status === 'QUARANTINE') {
          if (isCold) {
            skuId = 'sku-3';
            skuCode = 'PHARM-VACC-ULTRA-20';
            skuName = 'Pfizer-BioNTech COVID Vaccine Vials (-80°C Storage)';
            skuCategory = 'Cold Chain Pharma';
            batchLot = `LOT-2026-COV-E${bay}`;
            expiryDate = '2027-06-30';
            quantity = Math.floor(Math.random() * 60 + 20);
          } else if (isHazmat) {
            skuId = 'sku-5';
            skuCode = 'CHEM-ISOPROP-99-DRUM';
            skuName = 'Isopropanol 99.8% Electronic Grade (55 Gal Drum)';
            skuCategory = 'Hazmat & Solvents';
            batchLot = `HAZ-2026-ISO-F${bay}`;
            expiryDate = '2029-12-31';
            quantity = Math.floor(Math.random() * 8 + 2);
          } else if (aisle === 'A') {
            skuId = 'sku-1';
            skuCode = 'MED-N95-3M-2000';
            skuName = '3M Aura N95 Particulate Respirator (Case of 240)';
            skuCategory = 'PPE & Infection Control';
            batchLot = `LOT-2026-N95-A${bay}`;
            expiryDate = '2028-12-31';
            quantity = Math.floor(Math.random() * 100 + 40);
          } else if (aisle === 'B') {
            skuId = 'sku-2';
            skuCode = 'ELEC-LITH-48V-BAT';
            skuName = '48V 100Ah Lithium Iron Phosphate Battery Pack';
            skuCategory = 'Industrial Electronics';
            batchLot = `BAT-48V-LFP-B${bay}`;
            expiryDate = '2031-01-01';
            quantity = Math.floor(Math.random() * 12 + 4);
          } else if (aisle === 'C') {
            skuId = 'sku-4';
            skuCode = 'AUTO-HYDR-CYL-500';
            skuName = 'Parker Hannifin Heavy Duty Hydraulic Cylinder 500bar';
            skuCategory = 'Heavy Machinery & Parts';
            batchLot = `HYD-500-PARK-C${bay}`;
            expiryDate = '2035-12-31';
            quantity = Math.floor(Math.random() * 6 + 2);
          } else {
            // Aisle D - Standard Fasteners & Parts
            skuId = 'sku-6';
            skuCode = 'IND-BEAR-SKF-6205';
            skuName = 'SKF Explorer High-Speed Deep Groove Ball Bearings';
            skuCategory = 'Heavy Machinery & Parts';
            batchLot = `SKF-6205-D${bay}`;
            expiryDate = '2033-08-15';
            quantity = Math.floor(Math.random() * 80 + 30);
          }
        }

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
          skuId,
          skuCode,
          skuName,
          skuCategory,
          quantity,
          batchLot,
          expiryDate,
          velocityClass: isAisleFast ? 'A' : aisle === 'C' || aisle === 'D' ? 'B' : 'C',
          lastAudited: new Date(Date.now() - Math.random() * 864000000).toISOString().split('T')[0],
          shelfPhotoUrl,
          auditLogs: []
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
  },
  {
    id: 'sku-6',
    skuCode: 'IND-BEAR-SKF-6205',
    name: 'SKF Explorer High-Speed Deep Groove Ball Bearings',
    category: 'Heavy Machinery & Parts',
    barcode: '731657051892',
    rfidTag: 'E28011606000020478B40F11',
    unitCost: 38.50,
    retailPrice: 65.00,
    stockQty: 540,
    allocatedQty: 40,
    safetyStock: 80,
    reorderPoint: 120,
    leadTimeDays: 7,
    primaryBin: 'D-02-L1',
    clientId: 'client-3',
    weightKg: 0.85,
    turnoverRate: 15.2,
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

  updateBin(updatedBin: BinSlot) {
    const bins = this.getBins();
    const idx = bins.findIndex(b => b.id === updatedBin.id || b.code === updatedBin.code);
    if (idx !== -1) {
      bins[idx] = updatedBin;
      this.saveBins(bins);
    }
  }

  addOrUpdateSkuToBin(binCode: string, data: {
    skuCode: string;
    skuName: string;
    category: string;
    quantity: number;
    batchLot: string;
    expiryDate: string;
    photoUrl?: string;
  }) {
    const bins = this.getBins();
    const bin = bins.find(b => b.code === binCode);
    if (bin) {
      bin.skuCode = data.skuCode;
      bin.skuName = data.skuName;
      bin.skuCategory = data.category;
      bin.quantity = data.quantity;
      bin.batchLot = data.batchLot;
      bin.expiryDate = data.expiryDate;
      bin.status = data.quantity > 0 ? 'OCCUPIED' : 'EMPTY';
      bin.lastAudited = new Date().toISOString().split('T')[0];
      if (data.photoUrl) {
        bin.shelfPhotoUrl = data.photoUrl;
      }
      this.saveBins(bins);

      // Also ensure SKU exists or is updated in master SKUs list
      const skus = this.getSkus();
      const existingSku = skus.find(s => s.skuCode === data.skuCode);
      if (existingSku) {
        existingSku.stockQty = Math.max(existingSku.stockQty, data.quantity);
        if (data.photoUrl) existingSku.imageUrl = data.photoUrl;
        this.saveSkus(skus);
      } else {
        skus.push({
          id: `sku-${Date.now()}`,
          skuCode: data.skuCode,
          name: data.skuName,
          category: data.category,
          barcode: Math.floor(Math.random() * 900000000000 + 100000000000).toString(),
          rfidTag: `E28011606000020478B40${Math.floor(Math.random() * 900 + 100)}`,
          unitCost: 45.0,
          retailPrice: 75.0,
          stockQty: data.quantity,
          allocatedQty: 0,
          safetyStock: 20,
          reorderPoint: 40,
          leadTimeDays: 7,
          primaryBin: binCode,
          clientId: 'client-1',
          weightKg: 5.0,
          turnoverRate: 12.0,
          stockoutRisk: 'LOW',
          imageUrl: data.photoUrl
        });
        this.saveSkus(skus);
      }

      this.addLog({
        type: 'RECEIVING',
        skuCode: data.skuCode,
        skuName: data.skuName,
        toBin: binCode,
        quantity: data.quantity,
        operator: 'Active Operator',
        notes: `Direct shelf slotting & physical photo verification at ${binCode}`
      });
    }
  }

  recordShelfAudit(binCode: string, newQty: number, auditorName: string, notes: string, photoUrl?: string) {
    const bins = this.getBins();
    const bin = bins.find(b => b.code === binCode);
    if (bin) {
      const prevQty = bin.quantity;
      bin.quantity = newQty;
      bin.status = newQty > 0 ? 'OCCUPIED' : 'EMPTY';
      bin.lastAudited = new Date().toISOString().split('T')[0];
      if (photoUrl) {
        bin.shelfPhotoUrl = photoUrl;
      }
      if (!bin.auditLogs) bin.auditLogs = [];
      bin.auditLogs.unshift({
        id: `audit-${Date.now()}`,
        timestamp: new Date().toISOString(),
        auditorName,
        previousQty: prevQty,
        newQty,
        notes,
        photoUrl
      });
      this.saveBins(bins);

      this.addLog({
        type: 'CYCLE_COUNT',
        skuCode: bin.skuCode || 'GENERIC-ITEM',
        skuName: bin.skuName || 'Rack Item',
        toBin: binCode,
        quantity: newQty - prevQty,
        operator: auditorName,
        notes: `Physical Shelf Audit & Photo Verification: ${notes || 'Cycle count verified'}`
      });
    }
  }

  getTopology(): { aisles: string[]; baysPerAisle: number; tiersCount: number; facilityName: string } {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_WAREHOUSE);
    if (raw) {
      return JSON.parse(raw);
    }
    return {
      aisles: ['A', 'B', 'C', 'D', 'E', 'F'],
      baysPerAisle: 8,
      tiersCount: 4,
      facilityName: 'Warehouse Alpha • Northeast Logistics Hub'
    };
  }

  saveTopology(topology: { aisles: string[]; baysPerAisle: number; tiersCount: number; facilityName: string }) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_WAREHOUSE, JSON.stringify(topology));
  }

  regenerateTopology(aisles: string[], baysPerAisle: number, tiersCount: number) {
    this.saveTopology({
      aisles,
      baysPerAisle,
      tiersCount,
      facilityName: 'Warehouse Alpha • Northeast Logistics Hub'
    });
    
    // Regenerate bins
    const bins: BinSlot[] = [];
    let idCounter = 1;
    aisles.forEach((aisle, aisleIdx) => {
      for (let bay = 1; bay <= baysPerAisle; bay++) {
        for (let level = 1; level <= tiersCount; level++) {
          const isAisleFast = aisle === 'A' || aisle === 'B';
          const isCold = aisle === 'E';
          const isHazmat = aisle === 'F';
          
          let status: BinSlot['status'] = 'OCCUPIED';
          if (bay > Math.floor(baysPerAisle * 0.75) && level > 2) status = 'EMPTY';
          if (bay === 4 && level === tiersCount) status = 'RESERVED';

          const code = `${aisle}-${String(bay).padStart(2, '0')}-L${level}`;
          const x = 80 + (aisleIdx * 110) + (bay % 2 === 0 ? 30 : 0);
          const y = 60 + (bay * 45);

          let skuId: string | undefined;
          let skuCode: string | undefined;
          let skuName: string | undefined;
          let skuCategory: string | undefined;
          let batchLot: string | undefined;
          let expiryDate: string | undefined;
          let quantity = 0;

          if (status === 'OCCUPIED' || status === 'RESERVED') {
            if (isCold) {
              skuId = 'sku-3';
              skuCode = 'PHARM-VACC-ULTRA-20';
              skuName = 'Pfizer-BioNTech COVID Vaccine Vials (-80°C Storage)';
              skuCategory = 'Cold Chain Pharma';
              batchLot = `LOT-2026-COV-E${bay}`;
              expiryDate = '2027-06-30';
              quantity = Math.floor(Math.random() * 60 + 20);
            } else if (isHazmat) {
              skuId = 'sku-5';
              skuCode = 'CHEM-ISOPROP-99-DRUM';
              skuName = 'Isopropanol 99.8% Electronic Grade (55 Gal Drum)';
              skuCategory = 'Hazmat & Solvents';
              batchLot = `HAZ-2026-ISO-F${bay}`;
              expiryDate = '2029-12-31';
              quantity = Math.floor(Math.random() * 8 + 2);
            } else if (aisle === 'A') {
              skuId = 'sku-1';
              skuCode = 'MED-N95-3M-2000';
              skuName = '3M Aura N95 Particulate Respirator (Case of 240)';
              skuCategory = 'PPE & Infection Control';
              batchLot = `LOT-2026-N95-A${bay}`;
              expiryDate = '2028-12-31';
              quantity = Math.floor(Math.random() * 100 + 40);
            } else if (aisle === 'B') {
              skuId = 'sku-2';
              skuCode = 'ELEC-LITH-48V-BAT';
              skuName = '48V 100Ah Lithium Iron Phosphate Battery Pack';
              skuCategory = 'Industrial Electronics';
              batchLot = `BAT-48V-LFP-B${bay}`;
              expiryDate = '2031-01-01';
              quantity = Math.floor(Math.random() * 12 + 4);
            } else if (aisle === 'C') {
              skuId = 'sku-4';
              skuCode = 'AUTO-HYDR-CYL-500';
              skuName = 'Parker Hannifin Heavy Duty Hydraulic Cylinder 500bar';
              skuCategory = 'Heavy Machinery & Parts';
              batchLot = `HYD-500-PARK-C${bay}`;
              expiryDate = '2035-12-31';
              quantity = Math.floor(Math.random() * 6 + 2);
            } else {
              skuId = 'sku-6';
              skuCode = 'IND-BEAR-SKF-6205';
              skuName = 'SKF Explorer High-Speed Deep Groove Ball Bearings';
              skuCategory = 'Heavy Machinery & Parts';
              batchLot = `SKF-6205-D${bay}`;
              expiryDate = '2033-08-15';
              quantity = Math.floor(Math.random() * 80 + 30);
            }
          }

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
            skuId,
            skuCode,
            skuName,
            skuCategory,
            quantity,
            batchLot,
            expiryDate,
            velocityClass: isAisleFast ? 'A' : aisle === 'C' || aisle === 'D' ? 'B' : 'C',
            lastAudited: new Date().toISOString().split('T')[0],
            auditLogs: []
          });
        }
      }
    });

    this.saveBins(bins);
    return bins;
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

  getAisleSigns(): AisleSignage[] {
    const data = localStorage.getItem(STORAGE_KEYS.AISLE_SIGNS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.AISLE_SIGNS, JSON.stringify(DEFAULT_AISLE_SIGNS));
      return DEFAULT_AISLE_SIGNS;
    }
    return JSON.parse(data);
  }

  saveAisleSigns(signs: AisleSignage[]) {
    localStorage.setItem(STORAGE_KEYS.AISLE_SIGNS, JSON.stringify(signs));
  }

  updateAisleSign(aisle: string, update: Partial<AisleSignage>) {
    const current = this.getAisleSigns();
    const updated = current.map(s => s.aisle === aisle ? { ...s, ...update } : s);
    this.saveAisleSigns(updated);
    return updated;
  }

  getZones(): FacilityZone[] {
    const data = localStorage.getItem(STORAGE_KEYS.ZONES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.ZONES, JSON.stringify(DEFAULT_ZONES));
      return DEFAULT_ZONES;
    }
    return JSON.parse(data);
  }

  saveZones(zones: FacilityZone[]) {
    localStorage.setItem(STORAGE_KEYS.ZONES, JSON.stringify(zones));
  }

  addZone(zone: FacilityZone) {
    const zones = this.getZones();
    zones.push(zone);
    this.saveZones(zones);
    return zones;
  }

  deleteZone(zoneId: string) {
    const zones = this.getZones().filter(z => z.id !== zoneId);
    this.saveZones(zones);
    return zones;
  }

  addCustomBin(bin: BinSlot) {
    const bins = this.getBins();
    bins.push(bin);
    this.saveBins(bins);
    return bins;
  }

  deleteBin(binId: string) {
    const bins = this.getBins().filter(b => b.id !== binId);
    this.saveBins(bins);
    return bins;
  }

  updateBinPosition(binId: string, x: number, y: number) {
    const bins = this.getBins().map(b => b.id === binId ? { ...b, x, y } : b);
    this.saveBins(bins);
    return bins;
  }

  renameBin(binId: string, code: string, aisle: string, bay: number, level: number) {
    const bins = this.getBins().map(b => b.id === binId ? { ...b, code, aisle, bay, level } : b);
    this.saveBins(bins);
    return bins;
  }

  resetToDefault() {
    localStorage.removeItem(STORAGE_KEYS.BINS);
    localStorage.removeItem(STORAGE_KEYS.SKUS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.LOGS);
    localStorage.removeItem(STORAGE_KEYS.CLIENTS);
    localStorage.removeItem(STORAGE_KEYS.AISLE_SIGNS);
    localStorage.removeItem(STORAGE_KEYS.ZONES);
    return {
      bins: this.getBins(),
      skus: this.getSkus(),
      orders: this.getOrders(),
      clients: this.getClients(),
      logs: this.getLogs(),
      aisleSigns: this.getAisleSigns(),
      zones: this.getZones()
    };
  }
}

export const db = new WarehouseDB();
