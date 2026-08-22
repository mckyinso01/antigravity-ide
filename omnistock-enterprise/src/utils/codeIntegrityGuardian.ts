// codeIntegrityGuardian.ts - Anti-Tamper & Memory Integrity Guardian for OmniStock Spatial WMS OS
// Author: LinkableAI Core Systems (Founder: Mharc Gatan)

export class CodeIntegrityGuardian {
  private static instance: CodeIntegrityGuardian;
  private isInitialized = false;
  private tamperDetected = false;
  private readonly appSignature = 'OMNISTOCK_SECURE_KERNEL_2026';

  private constructor() {}

  public static getInstance(): CodeIntegrityGuardian {
    if (!CodeIntegrityGuardian.instance) {
      CodeIntegrityGuardian.instance = new CodeIntegrityGuardian();
    }
    return CodeIntegrityGuardian.instance;
  }

  public initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') return;
    this.isInitialized = true;

    try {
      // 1. Freeze Core Prototype References to prevent Prototype Poisoning
      Object.freeze(Object.prototype);
      Object.freeze(Array.prototype);
      Object.freeze(Function.prototype);

      // 2. Anti-Clock Tampering Detection
      this.monitorClockIntegrity();

      // 3. Runtime Script Injection & Mutation Observer
      this.monitorDomScriptInjections();

      console.log('🛡️ [SECURITY] OmniStock Enterprise Anti-Tamper Code Guardian Active (Zero Telemetry Leak Mode).');
    } catch (e) {
      // Graceful fallback for strict environments
    }
  }

  private monitorClockIntegrity(): void {
    const lastKnownTime = parseInt(localStorage.getItem('omnistock_guardian_last_heartbeat') || `${Date.now()}`, 10);
    const now = Date.now();

    // If clock went backwards by more than 24 hours (clock tampering attempt)
    if (now < lastKnownTime - 86400000) {
      this.handleTamperEvent('SYSTEM_CLOCK_REWIND_DETECTED');
    } else {
      localStorage.setItem('omnistock_guardian_last_heartbeat', `${now}`);
    }

    // Heartbeat check every 60 seconds
    setInterval(() => {
      const currentTime = Date.now();
      localStorage.setItem('omnistock_guardian_last_heartbeat', `${currentTime}`);
    }, 60000);
  }

  private monitorDomScriptInjections(): void {
    if (typeof MutationObserver === 'undefined') return;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const node = mutation.addedNodes[i];
          if (node.nodeName === 'SCRIPT') {
            const script = node as HTMLScriptElement;
            if (script.src && !script.src.includes('linkable.it.com') && !script.src.includes('surge.sh') && !script.src.includes(window.location.origin)) {
              this.handleTamperEvent(`UNAUTHORIZED_SCRIPT_INJECTION: ${script.src}`);
            }
          }
        }
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  public handleTamperEvent(reason: string): void {
    if (this.tamperDetected) return;
    this.tamperDetected = true;
    console.warn(`🚨 [SECURITY ALERT] Code Tamper Attempt Detected: ${reason}`);

    const securityLogs = JSON.parse(localStorage.getItem('omnistock_security_tamper_log') || '[]');
    securityLogs.push({
      timestamp: new Date().toISOString(),
      reason: reason,
      origin: window.location.href
    });
    localStorage.setItem('omnistock_security_tamper_log', JSON.stringify(securityLogs));

    window.dispatchEvent(new CustomEvent('omnistock:security:tamper', { detail: { reason } }));
  }

  public getSignature(): string {
    return this.appSignature;
  }
}

export const codeIntegrityGuardian = CodeIntegrityGuardian.getInstance();
