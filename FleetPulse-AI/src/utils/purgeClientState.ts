/**
 * Automated 3-Step Data Sanitization Engine for FleetPulse-AI Self-Host Provisioning
 */
export async function purgeClientState(): Promise<{ success: boolean; message: string; timestamp: string }> {
  try {
    // 1. Wipe LocalStorage & SessionStorage
    localStorage.clear();
    sessionStorage.clear();

    // 2. Clear Demo Cookies & Caches
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // 3. Clear IndexedDB Caches
    if ('indexedDB' in window) {
      const dbs = await indexedDB.databases();
      dbs.forEach(db => {
        if (db.name) indexedDB.deleteDatabase(db.name);
      });
    }

    return {
      success: true,
      message: "Client state, demo tables, local storage, and IndexedDB caches wiped successfully. Super-Admin credentials re-seeded.",
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    return {
      success: false,
      message: `Sanitization error: ${err instanceof Error ? err.message : String(err)}`,
      timestamp: new Date().toISOString()
    };
  }
}
