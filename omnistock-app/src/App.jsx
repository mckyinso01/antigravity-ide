import React from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { referralCodeSchema } from '@/lib/security/validators';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { monitorAndPrune } from '@/lib/security/storageMonitor';
import { db } from '@/lib/db';

// Layout
import AppLayout from './components/layout/AppLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import POS from './pages/POS';
import Analytics from './pages/Analytics';
import Pricing from './pages/Pricing';
import Categories from './pages/Categories';
import Suppliers from './pages/Suppliers';
import Recipes from './pages/Recipes';
import Alerts from './pages/Alerts';
import Customers from './pages/Customers';
import PurchaseOrders from './pages/PurchaseOrders';
import StockAdjustments from './pages/StockAdjustments';
import SalesReport from './pages/SalesReport';
import Monetization from './pages/Monetization';
import Settings from './pages/Settings';
import Automations from './pages/Automations';
import ProductionEngine from './pages/ProductionEngine';
import Landing from './pages/Landing';
import Login from './pages/Login';

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <AppLayout />;
};

const AuthenticatedApp = () => {
  const { isAuthenticated, isLoadingAuth, isLoadingPublicSettings, authError, isOffline } = useAuth();

  // Storage quota monitoring on startup + periodic interval (JACK-GATE-04)
  React.useEffect(() => {
    const pruneOldTransactions = async () => {
      try {
        const oldTxns = await db.transactions.orderBy('created_date').limit(100).toArray();
        if (oldTxns.length > 0) {
          await db.transactions.bulkDelete(oldTxns.map(t => t.id));
        }
      } catch (e) { /* best-effort pruning */ }
    };

    // Check on startup
    monitorAndPrune(pruneOldTransactions).catch(() => {});
    // Check every 5 minutes
    const interval = setInterval(() => {
      monitorAndPrune(pruneOldTransactions).catch(() => {});
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Save referral code from URL with alphanumeric sanitization (MITNICK-03)
  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref');
      if (ref) {
        // Sanitize: only allow alphanumeric, underscore, hyphen
        const sanitized = ref.replace(/[^A-Za-z0-9_-]/g, '').slice(0, 50);
        if (sanitized && referralCodeSchema.safeParse(sanitized).success) {
          sessionStorage.setItem('pending_referral', sanitized);
        }
      }
    } catch (err) {
      console.error("App referral code exception:", err);
    }
  }, []);

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#050811] text-slate-100">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-900 border-t-blue-500 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs text-blue-400 font-mono tracking-wide">Loading OmniStock Engine...</p>
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    }
  }

  return (
    <>
      {/* OFFLINE MODE banner — shown when backend is unreachable (MITNICK-05) */}
      {isOffline && isAuthenticated && (
        <div className="bg-amber-500/90 text-black text-xs font-bold text-center py-1.5 px-4 z-50 sticky top-0">
          ⚠ OFFLINE MODE — Backend unavailable. Running with limited cashier-only access. Some features may not work.
        </div>
      )}
      <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/pos" element={<POS />} />
        <Route path="/analytics" element={<RoleGuard path="/analytics"><Analytics /></RoleGuard>} />
        <Route path="/pricing" element={<RoleGuard path="/pricing"><Pricing /></RoleGuard>} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/suppliers" element={<RoleGuard path="/suppliers"><Suppliers /></RoleGuard>} />
        <Route path="/recipes" element={<RoleGuard path="/recipes"><Recipes /></RoleGuard>} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/customers" element={<RoleGuard path="/customers"><Customers /></RoleGuard>} />
        <Route path="/purchase-orders" element={<RoleGuard path="/purchase-orders"><PurchaseOrders /></RoleGuard>} />
        <Route path="/stock-adjustments" element={<RoleGuard path="/stock-adjustments"><StockAdjustments /></RoleGuard>} />
        <Route path="/sales-report" element={<RoleGuard path="/sales-report"><SalesReport /></RoleGuard>} />
        <Route path="/monetization" element={<RoleGuard path="/monetization"><Monetization /></RoleGuard>} />
        <Route path="/settings" element={<RoleGuard path="/settings"><Settings /></RoleGuard>} />
        <Route path="/automations" element={<Automations />} />
        <Route path="/production-engine" element={<RoleGuard path="/production-engine"><ProductionEngine /></RoleGuard>} />
      </Route>
      <Route path="/landing" element={<Landing />} />
      <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App