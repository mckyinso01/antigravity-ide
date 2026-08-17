/**
 * Gatz 48-Hour Full-Access Sandbox Trial Engine
 * Provides persistent 48-hour evaluation tracking, live countdown HUD, and instant renewal mechanics.
 */
(function () {
  const TRIAL_DURATION_MS = 48 * 60 * 60 * 1000; // 48 Hours in milliseconds
  const STORAGE_KEY = 'gatz_sandbox_trial_v1';

  function getTrialSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('Error reading trial storage:', e);
    }
    
    // Initialize new 48-hour session
    const now = Date.now();
    const newSession = {
      activated_at: now,
      expires_at: now + TRIAL_DURATION_MS,
      renewals: 0,
      tier: 'Full Enterprise Sandbox'
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
    } catch (e) {}
    return newSession;
  }

  function renewTrial() {
    const now = Date.now();
    const current = getTrialSession();
    current.activated_at = now;
    current.expires_at = now + TRIAL_DURATION_MS;
    current.renewals = (current.renewals || 0) + 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    
    // Dismiss expired modal if present
    const modal = document.getElementById('gatz-trial-expired-modal');
    if (modal) modal.remove();
    
    updateHud();
    if (typeof showToast === 'function') {
      showToast('🎉 Your 48-Hour Full-Access Sandbox Pass has been renewed!', 'success');
    }
  }

  function formatTimeRemaining(ms) {
    if (ms <= 0) return 'Expired';
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }

  function createHudPill() {
    if (document.getElementById('gatz-trial-hud-pill')) return;

    const pill = document.createElement('div');
    pill.id = 'gatz-trial-hud-pill';
    pill.className = 'fixed bottom-4 left-4 z-40 bg-slate-950/90 border border-emerald-500/40 backdrop-blur-xl px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-3 font-mono text-xs text-white select-none transition-all hover:scale-105';
    
    pill.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="text-on-surface-variant text-[10px] hidden sm:inline">SANDBOX PASS:</span>
        <span class="font-bold text-emerald-400" id="gatz-trial-countdown-text">48h 00m</span>
      </div>
      <div class="h-4 w-px bg-slate-800"></div>
      <button type="button" id="gatz-trial-renew-btn" class="text-[10px] text-accent-cyan hover:underline flex items-center gap-1 cursor-pointer">
        <span class="material-symbols-outlined text-xs">autorenew</span>
        <span>Renew 48h</span>
      </button>
      <button type="button" id="gatz-trial-buy-btn" class="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold px-2.5 py-1 rounded-lg text-[10px] transition-all shadow-md cursor-pointer">
        Unlock Lifetime
      </button>
    `;

    document.body.appendChild(pill);

    document.getElementById('gatz-trial-renew-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      renewTrial();
    });

    document.getElementById('gatz-trial-buy-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      if (typeof openPayMongoCheckout === 'function') {
        openPayMongoCheckout('Starter Plan', 1500, 85000);
      } else {
        window.location.hash = '#pricing';
      }
    });
  }

  function showExpiredModal() {
    if (document.getElementById('gatz-trial-expired-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'gatz-trial-expired-modal';
    modal.className = 'fixed inset-0 bg-black/95 backdrop-blur-2xl z-50 flex items-center justify-center p-4 select-none font-body';
    
    modal.innerHTML = `
      <div class="bg-[#0B1C30] border border-blue-500/50 p-8 rounded-3xl max-w-md w-full shadow-2xl text-center relative overflow-hidden">
        <div class="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4">
          <span class="material-symbols-outlined text-3xl">timer_off</span>
        </div>
        <div class="text-[10px] font-mono text-amber-400 uppercase tracking-widest mb-1">EVALUATION CONCLUDED</div>
        <h3 class="text-2xl font-bold text-white font-display mb-2">48-Hour Trial Concluded</h3>
        <p class="text-xs text-on-surface-variant font-mono mb-6 leading-relaxed">
          Your 48-hour evaluation sandbox pass has reached its limit. You can acquire a permanent full IP license or renew your trial pass for another 48 hours.
        </p>

        <div class="space-y-3">
          <button type="button" id="gatz-expired-buy-cta" class="w-full py-3.5 bg-gradient-to-r from-accent-electric to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:opacity-95 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer">
            <span class="material-symbols-outlined text-sm">payments</span>
            <span>Get Permanent License (₱85k / $1.5k)</span>
          </button>

          <button type="button" id="gatz-expired-renew-cta" class="w-full py-2.5 bg-slate-900 text-slate-300 hover:text-white border border-slate-800 rounded-xl font-mono text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer">
            <span class="material-symbols-outlined text-xs">refresh</span>
            <span>Renew Trial for 48 Hours (Free)</span>
          </button>
        </div>

        <div class="mt-6 text-[10px] font-mono text-on-surface-variant flex items-center justify-center gap-2">
          <span>GCash</span> • <span>Bank Wire (005790246533)</span> • <span>PayMongo</span>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('gatz-expired-renew-cta').addEventListener('click', renewTrial);
    document.getElementById('gatz-expired-buy-cta').addEventListener('click', () => {
      modal.remove();
      if (typeof openPayMongoCheckout === 'function') {
        openPayMongoCheckout('Starter Plan', 1500, 85000);
      } else {
        window.location.hash = '#pricing';
      }
    });
  }

  function updateHud() {
    const session = getTrialSession();
    const remainingMs = session.expires_at - Date.now();
    const countdownEl = document.getElementById('gatz-trial-countdown-text');

    if (remainingMs <= 0) {
      if (countdownEl) countdownEl.innerText = 'Expired';
      showExpiredModal();
    } else {
      if (countdownEl) {
        countdownEl.innerText = formatTimeRemaining(remainingMs);
      }
    }
  }

  // Initialize upon DOM readiness
  document.addEventListener('DOMContentLoaded', () => {
    createHudPill();
    updateHud();
    setInterval(updateHud, 60000); // Check every minute
  });

  // Expose global renewal hook
  window.gatzRenewTrial = renewTrial;
})();
