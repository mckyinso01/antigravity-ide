import { useState, useEffect, useCallback } from 'react';

export interface ProspectSessionInfo {
  organization: string;
  name: string;
  email: string;
  title: string;
  vertical: string;
  source: string;
}

export function useUrlTabNavigation<T extends string>(
  defaultTab: T,
  validTabs: readonly T[],
  vertical: string = 'general'
) {
  // 1. Capture & Persist Prospect Campaign Session from URL Query Params
  const [prospectSession, setProspectSession] = useState<ProspectSessionInfo>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlOrg = params.get('org') || params.get('hospital') || params.get('company') || '';
      const urlName = params.get('name') || params.get('contact') || '';
      const urlEmail = params.get('email') || '';
      const urlTitle = params.get('title') || params.get('role') || '';
      const urlSource = params.get('ref') || params.get('utm_source') || 'direct_demo';

      if (urlOrg || urlEmail || urlName) {
        const session: ProspectSessionInfo = {
          organization: decodeURIComponent(urlOrg),
          name: decodeURIComponent(urlName),
          email: decodeURIComponent(urlEmail),
          title: decodeURIComponent(urlTitle),
          vertical,
          source: urlSource
        };
        localStorage.setItem(`linkable_prospect_${vertical}`, JSON.stringify(session));
        return session;
      }

      const cached = localStorage.getItem(`linkable_prospect_${vertical}`);
      if (cached) return JSON.parse(cached);
    } catch {}

    return {
      organization: '',
      name: '',
      email: '',
      title: '',
      vertical,
      source: 'direct_demo'
    };
  });

  // 2. Read initial Tab from URL Hash e.g. /#inventory -> 'inventory'
  const getTabFromHash = useCallback((): T => {
    const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0] as T;
    if (hash && validTabs.includes(hash)) {
      return hash;
    }
    return defaultTab;
  }, [defaultTab, validTabs]);

  const [activeTab, setActiveTabState] = useState<T>(getTabFromHash);

  // 3. Setter that pushes hash to Browser History Stack
  const setActiveTab = useCallback((newTab: T) => {
    if (!validTabs.includes(newTab)) return;
    setActiveTabState(newTab);
    
    // Only push state if hash actually changed
    const currentHash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
    if (currentHash !== newTab) {
      window.history.pushState({ tab: newTab }, '', `#${newTab}`);
    }
  }, [validTabs]);

  // 4. Handle Browser Back & Forward (popstate & hashchange)
  useEffect(() => {
    const handlePopState = () => {
      const targetTab = getTabFromHash();
      setActiveTabState(targetTab);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    // If initial URL had no hash, set default cleanly
    if (!window.location.hash) {
      window.history.replaceState({ tab: defaultTab }, '', `#${defaultTab}`);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, [defaultTab, getTabFromHash]);

  return {
    activeTab,
    setActiveTab,
    prospectSession,
    setProspectSession
  };
}
