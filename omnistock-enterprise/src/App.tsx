import { useState, useEffect } from 'react';
import { db } from './services/db';
import type { BinSlot, SkuItem, PickOrder, ClientAccount, WarehouseStats } from './types';
import { NavigationHeader } from './components/NavigationHeader';
import { SidebarNav } from './components/SidebarNav';
import type { TabId } from './components/SidebarNav';
import { useUrlTabNavigation } from './hooks/useUrlTabNavigation';
import { ExitSurveyModal } from './components/ExitSurveyModal';
import { useEnterpriseTrial } from './hooks/useEnterpriseTrial';
import { TrialExpiryCoDesignModal } from './components/TrialExpiryCoDesignModal';
import { codeIntegrityGuardian } from './utils/codeIntegrityGuardian';

import { SpatialWarehouseCAD } from './components/SpatialWarehouseCAD';
import { BinDetailDrawer } from './components/BinDetailDrawer';
import { BarcodeScannerModal } from './components/BarcodeScannerModal';
import { WavePickOptimizerModal } from './components/WavePickOptimizerModal';
import { LicensingDeploymentModal } from './components/LicensingDeploymentModal';
import { CleanSweepModal } from './components/CleanSweepModal';
import { UniversalWmsMigrationModal } from './components/UniversalWmsMigrationModal';
import { SupplierRestockNegotiatorModal } from './components/SupplierRestockNegotiatorModal';
import { WarehouseInactivityLock, PRESET_STAFF, type WarehouseStaffSession } from './components/WarehouseInactivityLock';

import { InventoryCatalogView } from './pages/InventoryCatalogView';
import { WavePickingView } from './pages/WavePickingView';
import { InboundReceivingView } from './pages/InboundReceivingView';
import { ThreePlBillingView } from './pages/ThreePlBillingView';
import { SopAnalyticsView } from './pages/SopAnalyticsView';
import { SettingsView } from './pages/SettingsView';

import { initOmniStockVisitorBeacon } from './utils/visitorEmailBeacon';

const VALID_TABS: readonly TabId[] = ['cad', 'inventory', 'picking', 'receiving', 'clients', 'analytics', 'settings'] as const;

export function App() {
  const { activeTab, setActiveTab, prospectSession } = useUrlTabNavigation<TabId>('cad', VALID_TABS, 'omnistock');
  const [warehouseName, setWarehouseName] = useState('Warehouse Alpha • Northeast Logistics Hub');

  // Configurable Auto-Lock & Active Staff Session State
  const [autolockTimeout, setAutolockTimeout] = useState<number>(() => {
    const saved = localStorage.getItem('omnistock_autolock_timeout');
    return saved !== null ? parseInt(saved, 10) : 120; // 120s default configurable
  });

  const [activeStaff, setActiveStaff] = useState<WarehouseStaffSession>(() => {
    const saved = localStorage.getItem('omnistock_active_staff');
    return saved ? JSON.parse(saved) : PRESET_STAFF[0];
  });

  const [isManuallyLocked, setIsManuallyLocked] = useState(false);

  const handleUpdateTimeout = (seconds: number) => {
    setAutolockTimeout(seconds);
    localStorage.setItem('omnistock_autolock_timeout', seconds.toString());
  };

  const handleChangeStaff = (staff: WarehouseStaffSession) => {
    setActiveStaff(staff);
    localStorage.setItem('omnistock_active_staff', JSON.stringify(staff));
  };

  // Core Database State
  const [bins, setBins] = useState<BinSlot[]>([]);
  const [skus, setSkus] = useState<SkuItem[]>([]);
  const [orders, setOrders] = useState<PickOrder[]>([]);
  const [clients, setClients] = useState<ClientAccount[]>([]);
  const [stats, setStats] = useState<WarehouseStats>({
    totalCapacityBins: 192,
    occupiedBins: 140,
    utilizationRate: 73,
    totalSkuCount: 5,
    activePicksCount: 2,
    pendingOrdersCount: 1,
    stockoutAlertsCount: 1,
    avgPickSpeedMins: 4.2
  });

  // UI Interactive States
  const [selectedBin, setSelectedBin] = useState<BinSlot | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isOptimizerOpen, setIsOptimizerOpen] = useState(false);
  const [isCleanSweepOpen, setIsCleanSweepOpen] = useState(false);
  const [isMigrationOpen, setIsMigrationOpen] = useState(false);
  const [isExitSurveyOpen, setIsExitSurveyOpen] = useState(false);
  const [isNegotiatorOpen, setIsNegotiatorOpen] = useState(false);

  // 7-Day Reverse Trial Engine & Code Guardian
  const { daysRemaining, isExpired, isUnlockedPerpetual, requestExtension } = useEnterpriseTrial();
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  useEffect(() => {
    codeIntegrityGuardian.initialize();
  }, []);

  useEffect(() => {
    if (isExpired) {
      setIsTrialModalOpen(true);
    }
  }, [isExpired]);

  // 1. Exit-Intent Mouseleave Listener
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !sessionStorage.getItem('omnistock_survey_shown')) {
        setIsExitSurveyOpen(true);
        sessionStorage.setItem('omnistock_survey_shown', 'true');
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  // 2. Modal Browser Back-Button Trapping (Closes active modal without tab ejection)
  useEffect(() => {
    const isAnyModalOpen = Boolean(selectedBin || isScannerOpen || isSpecsOpen || isOptimizerOpen || isCleanSweepOpen || isExitSurveyOpen);
    if (isAnyModalOpen) {
      window.history.pushState({ modalOpen: true }, '');
      const handleModalPop = () => {
        setSelectedBin(null);
        setIsScannerOpen(false);
        setIsSpecsOpen(false);
        setIsOptimizerOpen(false);
        setIsCleanSweepOpen(false);
        setIsExitSurveyOpen(false);
      };
      window.addEventListener('popstate', handleModalPop, { once: true });
      return () => window.removeEventListener('popstate', handleModalPop);
    }
  }, [selectedBin, isScannerOpen, isSpecsOpen, isOptimizerOpen, isCleanSweepOpen, isExitSurveyOpen]);

  // Initialize DB and Visitor Beacon
  useEffect(() => {
    initOmniStockVisitorBeacon('OmniStock ERP Workstation');
    refreshAllData();
  }, []);

  const refreshAllData = () => {
    const loadedBins = db.getBins();
    const loadedSkus = db.getSkus();
    const loadedOrders = db.getOrders();
    const loadedClients = db.getClients();
    const loadedStats = db.getStats();

    setBins(loadedBins);
    setSkus(loadedSkus);
    setOrders(loadedOrders);
    setClients(loadedClients);
    setStats(loadedStats);
  };

  // Bin update handler
  const handleUpdateBinQuantity = (binId: string, newQty: number) => {
    const updated = bins.map(b => {
      if (b.id === binId) {
        return {
          ...b,
          quantity: newQty,
          status: (newQty === 0 ? 'EMPTY' : 'OCCUPIED') as BinSlot['status'],
          currentWeightKg: newQty > 0 ? Math.floor(newQty * 3.5) : 0
        };
      }
      return b;
    });
    db.saveBins(updated);
    setBins(updated);
    if (selectedBin?.id === binId) {
      setSelectedBin(updated.find(b => b.id === binId) || null);
    }
  };

  // Transfer inventory between bins
  const handleTransferBin = (binId: string, targetBinCode: string, qty: number) => {
    const sourceBin = bins.find(b => b.id === binId);
    const targetBin = bins.find(b => b.code === targetBinCode);

    if (!sourceBin || !targetBin) {
      alert(`⚠️ Target bin ${targetBinCode} not found on current level.`);
      return;
    }

    const updated = bins.map(b => {
      if (b.id === binId) {
        const remaining = Math.max(0, b.quantity - qty);
        return {
          ...b,
          quantity: remaining,
          status: (remaining === 0 ? 'EMPTY' : 'OCCUPIED') as BinSlot['status'],
          currentWeightKg: remaining > 0 ? Math.floor(remaining * 3.5) : 0
        };
      }
      if (b.id === targetBin.id) {
        return {
          ...b,
          skuId: sourceBin.skuId,
          skuCode: sourceBin.skuCode,
          skuName: sourceBin.skuName,
          batchLot: sourceBin.batchLot,
          expiryDate: sourceBin.expiryDate,
          quantity: b.quantity + qty,
          status: 'OCCUPIED' as BinSlot['status'],
          currentWeightKg: (b.quantity + qty) * 3.5
        };
      }
      return b;
    });

    db.saveBins(updated);
    setBins(updated);
    db.addLog({
      type: 'TRANSFER',
      skuCode: sourceBin.skuCode || 'GEN-SKU',
      skuName: sourceBin.skuName || 'Item Transfer',
      fromBin: sourceBin.code,
      toBin: targetBin.code,
      quantity: qty,
      operator: 'Marcus Reed (Forklift #4)'
    });
    refreshAllData();
  };

  // SKU addition handler
  const handleAddSku = (newSku: SkuItem) => {
    const updated = [newSku, ...skus];
    db.saveSkus(updated);
    setSkus(updated);
    refreshAllData();
  };

  // Inbound receiving handler
  const handleReceiveInbound = (skuCode: string, qty: number, targetBinCode: string) => {
    const foundSku = skus.find(s => s.skuCode === skuCode);
    const target = bins.find(b => b.code === targetBinCode);

    // Update SKU stock
    const updatedSkus = skus.map(s => {
      if (s.skuCode === skuCode) {
        return { ...s, stockQty: s.stockQty + qty };
      }
      return s;
    });
    db.saveSkus(updatedSkus);

    // Update Bin
    if (target && foundSku) {
      const updatedBins = bins.map(b => {
        if (b.code === targetBinCode) {
          return {
            ...b,
            skuId: foundSku.id,
            skuCode: foundSku.skuCode,
            skuName: foundSku.name,
            quantity: b.quantity + qty,
            status: 'OCCUPIED' as BinSlot['status'],
            currentWeightKg: (b.quantity + qty) * (foundSku.weightKg || 4)
          };
        }
        return b;
      });
      db.saveBins(updatedBins);
    }

    db.addLog({
      type: 'RECEIVING',
      skuCode,
      skuName: foundSku?.name || skuCode,
      toBin: targetBinCode,
      quantity: qty,
      operator: 'Inbound Staging Operator'
    });

    refreshAllData();
  };

  // Complete pick item
  const handleCompletePickItem = (orderId: string, itemIdx: number) => {
    const updated = orders.map(ord => {
      if (ord.id === orderId) {
        const items = [...ord.items];
        items[itemIdx] = {
          ...items[itemIdx],
          pickedQuantity: items[itemIdx].quantity,
          status: 'PICKED'
        };
        const allDone = items.every(i => i.status === 'PICKED');
        return {
          ...ord,
          items,
          status: (allDone ? 'PACKED' : 'IN_PICK') as PickOrder['status']
        };
      }
      return ord;
    });

    db.saveOrders(updated);
    setOrders(updated);
    refreshAllData();
  };

  // Batch Wave Dispatch
  const handleDispatchWave = (orderIds: string[]) => {
    const updated = orders.map(ord => {
      if (orderIds.includes(ord.id)) {
        return { ...ord, status: 'IN_PICK' as PickOrder['status'] };
      }
      return ord;
    });
    db.saveOrders(updated);
    setOrders(updated);
    refreshAllData();
  };

  // Export JSON
  const handleExportJson = () => {
    const data = {
      warehouseName,
      bins: db.getBins(),
      skus: db.getSkus(),
      orders: db.getOrders(),
      clients: db.getClients(),
      logs: db.getLogs(),
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `omnistock_warehouse_backup_${Date.now()}.json`;
    a.click();
  };

  // Clean Sweep Reset
  const handleCleanSweep = () => {
    db.resetToDefault();
    refreshAllData();
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#070B14] text-slate-100 overflow-hidden font-sans select-none">
      {/* Top Navigation Bar */}
      <NavigationHeader
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenSpecs={() => setIsSpecsOpen(true)}
        onOpenCleanSweep={() => setIsCleanSweepOpen(true)}
        onOpenMigration={() => setIsMigrationOpen(true)}
        onOpenNegotiator={() => setIsNegotiatorOpen(true)}
        onOpenSearch={(q) => {
          if (q) {
            const foundSku = skus.find(s => s.skuCode.toLowerCase().includes(q.toLowerCase()) || s.name.toLowerCase().includes(q.toLowerCase()));
            if (foundSku) {
              const matchingBin = bins.find(b => b.code === foundSku.primaryBin);
              if (matchingBin) setSelectedBin(matchingBin);
            }
          }
        }}
        activeWarehouseName={warehouseName}
        onChangeWarehouse={(name) => setWarehouseName(name)}
        onManualLock={() => setIsManuallyLocked(true)}
        onOpenTimeoutSettings={() => setActiveTab('settings')}
        activeStaffName={activeStaff.name}
        currentTimeoutSeconds={autolockTimeout}
        onOpenExitSurvey={() => setIsExitSurveyOpen(true)}
        trialDaysRemaining={daysRemaining}
        isUnlockedPerpetual={isUnlockedPerpetual}
        onOpenTrialModal={() => setIsTrialModalOpen(true)}
      />

      {/* Main Body Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Rail Navigation */}
        <SidebarNav
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setSelectedBin(null);
          }}
          pendingPicksCount={orders.filter(o => o.status === 'PENDING' || o.status === 'OPTIMIZED').length}
          stockoutAlertsCount={skus.filter(s => s.stockoutRisk === 'CRITICAL').length}
        />

        {/* Center View Dynamic Router */}
        <main className="flex-1 flex overflow-hidden relative">
          {activeTab === 'cad' && (
            <SpatialWarehouseCAD
              bins={bins}
              activeOrder={orders[0]}
              selectedBin={selectedBin}
              onSelectBin={(bin) => setSelectedBin(bin)}
              onOpenOptimizer={() => setIsOptimizerOpen(true)}
              onRefreshBins={refreshAllData}
            />
          )}

          {activeTab === 'inventory' && (
            <InventoryCatalogView
              skus={skus}
              bins={bins}
              onAddSku={handleAddSku}
              onOpenScanner={() => setIsScannerOpen(true)}
            />
          )}

          {activeTab === 'picking' && (
            <WavePickingView
              orders={orders}
              onCompletePickItem={handleCompletePickItem}
              onDispatchWaveModal={() => setIsOptimizerOpen(true)}
            />
          )}

          {activeTab === 'receiving' && (
            <InboundReceivingView
              skus={skus}
              bins={bins}
              onReceiveInbound={handleReceiveInbound}
              onOpenScanner={() => setIsScannerOpen(true)}
            />
          )}

          {activeTab === 'clients' && (
            <ThreePlBillingView
              clients={clients}
              onAddClient={(c) => {
                const updated = [c, ...clients];
                db.saveClients(updated);
                setClients(updated);
              }}
            />
          )}

          {activeTab === 'analytics' && (
            <SopAnalyticsView
              skus={skus}
              stats={stats}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              warehouseName={warehouseName}
              onUpdateWarehouseName={(name) => setWarehouseName(name)}
              onExportJson={handleExportJson}
              onTopologyChanged={refreshAllData}
              currentTimeout={autolockTimeout}
              onUpdateTimeout={handleUpdateTimeout}
              activeStaff={activeStaff}
              onChangeStaff={handleChangeStaff}
            />
          )}

          {/* Right Bin Detail Drawer (Spatial CAD mode) */}
          {activeTab === 'cad' && selectedBin && (
            <BinDetailDrawer
              bin={selectedBin}
              onClose={() => setSelectedBin(null)}
              onUpdateQuantity={handleUpdateBinQuantity}
              onTransfer={handleTransferBin}
              onRefreshBins={refreshAllData}
            />
          )}
        </main>
      </div>

      {/* 🔒 Configurable Warehouse Inactivity & Shift Auto-Lock Watchdog */}
      <WarehouseInactivityLock
        currentTimeout={autolockTimeout}
        onUpdateTimeout={handleUpdateTimeout}
        activeStaff={activeStaff}
        onChangeStaff={handleChangeStaff}
        isManuallyLocked={isManuallyLocked}
        onUnlock={() => setIsManuallyLocked(false)}
        onManualLock={() => setIsManuallyLocked(true)}
      />

      {/* Global Modals */}
      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        skus={skus}
        onScannedSku={(sku) => {
          const matchingBin = bins.find(b => b.code === sku.primaryBin);
          if (matchingBin) setSelectedBin(matchingBin);
        }}
      />

      <WavePickOptimizerModal
        isOpen={isOptimizerOpen}
        onClose={() => setIsOptimizerOpen(false)}
        orders={orders}
        onDispatchWave={handleDispatchWave}
      />

      <LicensingDeploymentModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
      />

      {/* Universal 1-Click WMS Migration Modal */}
      <UniversalWmsMigrationModal
        isOpen={isMigrationOpen}
        onClose={() => setIsMigrationOpen(false)}
        onMigrationComplete={() => refreshAllData()}
      />

      <CleanSweepModal
        isOpen={isCleanSweepOpen}
        onClose={() => setIsCleanSweepOpen(false)}
        onConfirmReset={handleCleanSweep}
      />

      {/* 📋 Exit-Intent & Walkthrough Micro-Survey Modal */}
      <ExitSurveyModal
        isOpen={isExitSurveyOpen}
        onClose={() => setIsExitSurveyOpen(false)}
        prospectSession={prospectSession}
        appName="OmniStock Spatial WMS"
      />

      {/* ⏳ 7-Day Product-Led Reverse Trial & Co-Design Modal */}
      <TrialExpiryCoDesignModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
        daysRemaining={daysRemaining}
        isExpired={isExpired}
        onRequestExtension={requestExtension}
        onOpenLicensingModal={() => setIsSpecsOpen(true)}
      />

      {/* 🤖 Autonomous AI Spot-Quote Supplier Restock & Spatial AR Forklift Modal */}
      <SupplierRestockNegotiatorModal
        isOpen={isNegotiatorOpen}
        onClose={() => setIsNegotiatorOpen(false)}
      />
    </div>
  );
}

export default App;
