// LinkableAI 48-Hour Full-Access Sandbox Trial Engine
(function() {
  const TRIAL_KEY = 'linkable_sandbox_trial_session';

  function initTrialEngine() {
    try {
      let session = JSON.parse(localStorage.getItem(TRIAL_KEY) || 'null');
      if (!session) {
        session = {
          trialId: 'TRIAL-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
          startedAt: Date.now(),
          expiresAt: Date.now() + (48 * 60 * 60 * 1000), // 48 Hours
          status: 'ACTIVE_TRIAL'
        };
        localStorage.setItem(TRIAL_KEY, JSON.stringify(session));
      }
      window.LinkableTrialSession = session;
    } catch (e) {
      console.warn('Trial engine initialization deferred', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTrialEngine);
  } else {
    initTrialEngine();
  }
})();
