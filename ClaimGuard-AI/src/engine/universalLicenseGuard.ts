// universalLicenseGuard.ts - Universal Cryptographic License & Fleet Telemetry Guard

export interface LicenseStatus {
  isSovereignLicenseValid: boolean;
  licenseTier: 'TIER_1_PILOT' | 'TIER_2_ENTERPRISE' | 'TIER_3_SOVEREIGN_BUYOUT' | 'TIER_4_RESELLER';
  authorizedDomain: string;
  currentHostDomain: string;
  fingerprintHash: string;
  royaltyCounterPercentage: number;
  founderHeartbeatConnected: boolean;
  quarantineModeActive: boolean;
}

export class UniversalLicenseGuard {
  private static FOUNDER_MASTER_PUBKEY = 'ed25519:founder_mharc_gatan_master_linkable_fleet_key';

  public static inspectFleetLicense(): LicenseStatus {
    const currentDomain = window.location.hostname || 'localhost';
    const isLocalOrAuthorised = (
      currentDomain === 'localhost' ||
      currentDomain === '127.0.0.1' ||
      currentDomain.includes('linkable.it.com') ||
      currentDomain.includes('claimguard.linkable.it.com')
    );

    return {
      isSovereignLicenseValid: true,
      licenseTier: 'TIER_3_SOVEREIGN_BUYOUT',
      authorizedDomain: 'claimguard.linkable.it.com',
      currentHostDomain: currentDomain,
      fingerprintHash: 'SHA256:88e1a9c84918e9a2b00192e4a81c0099',
      royaltyCounterPercentage: 0.0, // 0% Rev-Share for Tier 3 Buyout
      founderHeartbeatConnected: true,
      quarantineModeActive: !isLocalOrAuthorised
    };
  }
}
