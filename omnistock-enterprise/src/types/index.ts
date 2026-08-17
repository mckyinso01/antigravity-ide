export type VelocityClass = 'A' | 'B' | 'C';
export type BinStatus = 'OCCUPIED' | 'EMPTY' | 'RESERVED' | 'QUARANTINE' | 'RESTOCKING';
export type OrderPriority = 'STAT' | 'RUSH' | 'STANDARD';
export type OrderStatus = 'PENDING' | 'OPTIMIZED' | 'IN_PICK' | 'PACKED' | 'SHIPPED';
export type MovementType = 'RECEIVING' | 'PICK' | 'TRANSFER' | 'CYCLE_COUNT' | 'QUARANTINE_LOCK';

export interface AuditLog {
  id: string;
  timestamp: string;
  auditorName: string;
  previousQty: number;
  newQty: number;
  notes: string;
  photoUrl?: string;
}

export interface BinSlot {
  id: string;
  code: string; // e.g. A-01-L3 (Aisle A, Bay 1, Level 3)
  aisle: string;
  bay: number;
  level: number; // 1 to 8
  zone: string;
  x: number;
  y: number;
  status: BinStatus;
  capacityKg: number;
  currentWeightKg: number;
  skuId?: string;
  skuCode?: string;
  skuName?: string;
  skuCategory?: string;
  quantity: number;
  batchLot?: string;
  expiryDate?: string;
  velocityClass: VelocityClass;
  lastAudited: string;
  shelfPhotoUrl?: string;
  auditLogs?: AuditLog[];
}

export interface SkuItem {
  id: string;
  skuCode: string;
  name: string;
  category: string;
  barcode: string;
  rfidTag: string;
  unitCost: number;
  retailPrice: number;
  stockQty: number;
  allocatedQty: number;
  safetyStock: number;
  reorderPoint: number;
  leadTimeDays: number;
  primaryBin: string;
  clientId: string; // 3PL Client Owner
  weightKg: number;
  turnoverRate: number; // Annual Turns
  stockoutRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  imageUrl?: string;
}

export interface WarehouseTopology {
  aisles: string[]; // e.g. ['A', 'B', 'C', 'D', 'E', 'F']
  baysPerAisle: number; // e.g. 8
  tiersCount: number; // e.g. 4
  facilityName: string;
  gridWidthMeters: number;
  gridLengthMeters: number;
}

export interface OrderItem {
  skuId: string;
  skuCode: string;
  name: string;
  quantity: number;
  pickedQuantity: number;
  binLocation: string;
  status: 'PENDING' | 'PICKED' | 'SHORTAGE';
}

export interface PickOrder {
  id: string;
  orderNumber: string;
  clientName: string;
  clientId: string;
  destination: string;
  priority: OrderPriority;
  status: OrderStatus;
  items: OrderItem[];
  optimalRoutePath: string[]; // List of bin codes
  assignedPicker?: string;
  totalWeightKg: number;
  createdAt: string;
  completedAt?: string;
}

export interface InventoryMovementLog {
  id: string;
  timestamp: string;
  type: MovementType;
  skuCode: string;
  skuName: string;
  fromBin?: string;
  toBin?: string;
  quantity: number;
  operator: string;
  notes?: string;
}

export interface ClientAccount {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  activePallets: number;
  monthlyStorageRate: number; // per pallet
  handlingFeePerPick: number;
  currentMonthBilled: number;
  contractTier: 'STANDARD' | 'ENTERPRISE_VIP' | 'STRATEGIC_3PL';
  joinedDate: string;
}

export interface WarehouseStats {
  totalCapacityBins: number;
  occupiedBins: number;
  utilizationRate: number;
  totalSkuCount: number;
  activePicksCount: number;
  pendingOrdersCount: number;
  stockoutAlertsCount: number;
  avgPickSpeedMins: number;
}
