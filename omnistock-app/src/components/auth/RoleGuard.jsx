/**
 * RoleGuard HOC — enforces RBAC on protected routes (MITNICK-02).
 * Wraps a component and checks the user's role before rendering.
 */
import React from 'react';
import { useAuth } from '@/lib/AuthContext';
import { ShieldAlert } from 'lucide-react';

const ROLE_ACCESS = {
  // Route path -> allowed roles
  '/monetization': ['owner', 'admin'],
  '/settings': ['owner', 'admin', 'manager'],
  '/sales-report': ['owner', 'admin', 'manager', 'analyst'],
  '/production-engine': ['owner', 'admin'],
  '/suppliers': ['owner', 'admin', 'inventory', 'analyst'],
  '/recipes': ['owner', 'admin', 'inventory', 'analyst'],
  '/stock-adjustments': ['owner', 'admin', 'inventory', 'manager'],
  '/purchase-orders': ['owner', 'admin', 'inventory', 'manager'],
  '/customers': ['owner', 'admin', 'manager', 'marketing'],
  '/pricing': ['owner', 'admin', 'manager', 'marketing'],
  '/analytics': ['owner', 'admin', 'manager', 'analyst', 'marketing'],
};

export function getRequiredRoles(path) {
  return ROLE_ACCESS[path] || null;
}

export function hasRouteAccess(userRole, path) {
  const required = getRequiredRoles(path);
  if (!required) return true; // No restriction
  if (userRole === 'admin') return true;
  return required.includes(userRole);
}

export function RoleGuard({ children, path }) {
  const { user } = useAuth();
  const role = user?.role || 'cashier';

  if (!hasRouteAccess(role, path)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-300 p-8">
        <ShieldAlert className="w-12 h-12 text-rose-400 mb-4" />
        <h2 className="text-lg font-bold text-white mb-2">Access Denied</h2>
        <p className="text-sm text-slate-400 text-center max-w-sm">
          Your role ({role}) does not have permission to access this page.
          Contact an administrator if you believe this is an error.
        </p>
      </div>
    );
  }

  return children;
}
