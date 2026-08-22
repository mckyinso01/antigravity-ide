import { useState } from 'react';

export interface ProspectSessionInfo {
  organization: string;
  name: string;
  email: string;
  title: string;
  vertical: string;
  source: string;
}

export function useUrlProspectSession(vertical: string = 'hospital'): ProspectSessionInfo {
  const [prospectSession] = useState<ProspectSessionInfo>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlOrg = params.get('org') || params.get('hospital') || params.get('health_system') || '';
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

  return prospectSession;
}
