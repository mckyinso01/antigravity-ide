import { useState } from 'react';

const TRIAL_STORAGE_KEY = 'omnistock_enterprise_trial_v1';
const TRIAL_DURATION_DAYS = 7;
const TRIAL_DURATION_MS = TRIAL_DURATION_DAYS * 24 * 60 * 60 * 1000;

interface TrialState {
  startDate: number;
  expiryDate: number;
  isUnlockedPerpetual: boolean;
  licenseKey?: string;
  extendedCount: number;
}

export function useEnterpriseTrial() {
  const [trialState, setTrialState] = useState<TrialState>(() => {
    if (typeof window === 'undefined') {
      return {
        startDate: Date.now(),
        expiryDate: Date.now() + TRIAL_DURATION_MS,
        isUnlockedPerpetual: false,
        extendedCount: 0
      };
    }

    try {
      const stored = localStorage.getItem(TRIAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {}

    // Initialize fresh 7-day trial
    const initial: TrialState = {
      startDate: Date.now(),
      expiryDate: Date.now() + TRIAL_DURATION_MS,
      isUnlockedPerpetual: false,
      extendedCount: 0
    };
    try {
      localStorage.setItem(TRIAL_STORAGE_KEY, JSON.stringify(initial));
    } catch (e) {}
    return initial;
  });

  const now = Date.now();
  const msRemaining = Math.max(0, trialState.expiryDate - now);
  const daysRemaining = Math.ceil(msRemaining / (24 * 60 * 60 * 1000));
  const isExpired = !trialState.isUnlockedPerpetual && msRemaining <= 0;

  const saveState = (newState: TrialState) => {
    setTrialState(newState);
    try {
      localStorage.setItem(TRIAL_STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {}
  };

  const unlockPerpetual = (licenseKey: string) => {
    saveState({
      ...trialState,
      isUnlockedPerpetual: true,
      licenseKey: licenseKey
    });
  };

  const requestExtension = () => {
    const extensionMs = 3 * 24 * 60 * 60 * 1000; // +72 Hours
    saveState({
      ...trialState,
      expiryDate: Date.now() + extensionMs,
      extendedCount: (trialState.extendedCount || 0) + 1
    });
  };

  return {
    daysRemaining,
    isExpired,
    isUnlockedPerpetual: trialState.isUnlockedPerpetual,
    licenseKey: trialState.licenseKey,
    extendedCount: trialState.extendedCount || 0,
    unlockPerpetual,
    requestExtension
  };
}
