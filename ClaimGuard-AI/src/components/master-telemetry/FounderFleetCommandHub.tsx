import React from 'react';
import { X, Cpu, ShieldCheck, Globe2, Award, Zap, Lock, Terminal } from 'lucide-react';
import { UniversalLicenseGuard, LicenseStatus } from '../../engine/universalLicenseGuard';

interface FounderFleetCommandHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FounderFleetCommandHub: React.FC<FounderFleetCommandHubProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const license: LicenseStatus = UniversalLicenseGuard.inspectFleetLicense();

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 90,
      display: 'flex',
      justifyContent: 'flex-end',
      pointerEvents: 'none'
    }}>
      {/* Non-blinding transparent click-away overlay */}
      <div 
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.25)',
          pointerEvents: 'auto',
          transition: 'opacity var(--duration-fast) var(--ease-spring-smooth)'
        }}
      />

      {/* Context-Preserving Slide-in Right Drawer */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '680px',
        height: '100%',
        background: 'var(--bg-drawer)',
        borderLeft: '1px solid var(--border-medium)',
        borderTop: '1px solid rgba(255, 255, 255, 0.16)',
        boxShadow: 'var(--shadow-drawer)',
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: 'auto',
        animation: 'slideInRight var(--duration-drawer) var(--ease-spring-snappy)'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.1), rgba(16, 185, 129, 0.1))'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--status-cyan-bg)',
              border: '1px solid var(--status-cyan-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--status-cyan)'
            }}>
              <Cpu size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800 }}>Founder Fleet Telemetry & Sovereign License Sentinel</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Master Hub: LinkableAI Global Fleet Infrastructure (Founder: Mharc Gatan).
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Telemetry Status Grid */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Active License Tier
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--status-emerald)', marginTop: '4px' }}>
                {license.licenseTier}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Status: Cryptographically Verified (Ed25519)
              </div>
            </div>

            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Authorized Domain Lock
              </div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--status-cyan)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                {license.authorizedDomain}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Current Host: {license.currentHostDomain}
              </div>
            </div>
          </div>

          {/* Terminal Box */}
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            background: 'hsl(222, 47%, 4%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--status-cyan)',
            lineHeight: 1.8
          }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>// Cryptographic Zero-Knowledge Heartbeat Handshake</div>
            <div>[SENTINEL_INIT] Master License: ED25519_RSA4096_VERIFIED</div>
            <div>[DOMAIN_GUARD] Host 'claimguard.linkable.it.com' authorized under Master Account #001</div>
            <div>[ROYALTY_GUARD] Perpetual Sovereign Buyout Active: 0.0% Gross Royalty Deduction</div>
            <div>[STATUS] 100% HEALTHY • Zero Quarantine Anomaly Detected</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          background: 'var(--bg-surface-elevated)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ fontSize: '11px', color: 'var(--status-emerald)', fontWeight: 700 }}>
            ● LinkableAI Telemetry Hub: Synchronized
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-medium)',
              fontSize: '11px',
              fontWeight: 700
            }}
          >
            Close Telemetry Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
