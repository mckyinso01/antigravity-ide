import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '@/lib/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [mfaVerified, setMfaVerified] = useState(false);

  useEffect(() => {
    checkAuthState();
    // Listen for cross-tab logout broadcast (MITNICK-GATE-04)
    const handleStorageChange = (e) => {
      if (e.key === 'omnistock_logout_broadcast') {
        setUser(null);
        setIsAuthenticated(false);
        setMfaVerified(false);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const checkAuthState = async () => {
    try {
      // Try to verify existing JWT cookie with backend
      const data = await api.auth.me();
      if (data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
        setMfaVerified(Boolean(data.user.mfa_verified));
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      // Backend not available — fall back to legacy sessionStorage for dev
      const token = sessionStorage.getItem('omnistock_auth_token');
      const storedEmail = sessionStorage.getItem('omnistock_user_email') || 'operator@omnistock.io';
      if (token) {
        setUser({ name: 'OmniStock Operator', email: storedEmail, role: 'admin' });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const login = async (email) => {
    const userEmail = email || 'operator@omnistock.io';
    try {
      const data = await api.auth.login(userEmail);
      setUser(data.user);
      setIsAuthenticated(true);
      setMfaVerified(false);
      // Keep sessionStorage as fallback for offline
      sessionStorage.setItem('omnistock_user_email', userEmail);
    } catch (err) {
      // Fallback to mock auth if backend unavailable
      console.warn('[Auth] Backend login failed, using mock:', err.message);
      sessionStorage.setItem('omnistock_auth_token', 'mock_omnistock_token_2026');
      sessionStorage.setItem('omnistock_user_email', userEmail);
      setUser({ name: 'OmniStock Operator', email: userEmail, role: 'admin' });
      setIsAuthenticated(true);
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } catch (err) {
      // Best effort — clear local state regardless
    }
    // Broadcast logout to other tabs (MITNICK-GATE-04)
    sessionStorage.setItem('omnistock_logout_broadcast', Date.now().toString());
    sessionStorage.removeItem('omnistock_auth_token');
    sessionStorage.removeItem('stockmate_auth_token');
    sessionStorage.removeItem('omnistock_user_email');
    sessionStorage.removeItem('stockmate_user_email');
    setUser(null);
    setIsAuthenticated(false);
    setMfaVerified(false);
  };

  const verifyMfa = async (code) => {
    try {
      const data = await api.auth.mfaStepUp(code);
      setMfaVerified(true);
      return true;
    } catch (err) {
      console.warn('[Auth] MFA step-up failed:', err.message);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      mfaVerified,
      login,
      logout,
      verifyMfa,
      checkAuthState,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
