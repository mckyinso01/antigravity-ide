import React from 'react';
import { 
  ShieldAlert, Sparkles, Scale, Eye, RefreshCw, 
  FileText, ShieldCheck, Zap, HardDrive, Radio 
} from 'lucide-react';

interface ProblemFeaturePair {
  id: string;
  featureName: string;
  problemAnnihilated: string;
  howClaimGuardKillsIt: string;
  icon: any;
  categoryBadge: string;
}

export const ProblemDestructionGrid: React.FC = () => {
  const pairs: ProblemFeaturePair[] = [
    {
      id: 'F-01',
      featureName: 'Dual-Agent Moot Courtroom HUD',
      problemAnnihilated: 'Payer rejection algorithms auto-denying claims post-submission without warning.',
      howClaimGuardKillsIt: 'Simulates hostile insurer bots before transmission, generating a real-time compliance patch ledger.',
      icon: Sparkles,
      categoryBadge: 'PRE-SUBMISSION DEFENSE'
    },
    {
      id: 'F-02',
      featureName: 'Saccade 4-Pane Optical Diff Comparator',
      problemAnnihilated: 'Billing staff manually switching between 4 different software windows to find unbundling errors.',
      howClaimGuardKillsIt: 'Synchronized 4-pane visual alignment across EHR, EDI 837, Payer Policy, and Legal Patch.',
      icon: Eye,
      categoryBadge: 'OPTICAL COGNITION'
    },
    {
      id: 'F-03',
      featureName: 'Direct TWAIN Hardware Scanner Bridge',
      problemAnnihilated: 'Physical paper clinical charts and lab telemetry trapped in high-speed paper feeders.',
      howClaimGuardKillsIt: '1-Click triggers hospital floor Fujitsu/HP feeders at 300 DPI duplex with instant OCR extraction.',
      icon: HardDrive,
      categoryBadge: 'HARDWARE TELECOM'
    },
    {
      id: 'F-04',
      featureName: 'HIPAA Cryptographic e-Fax Dispatcher',
      problemAnnihilated: 'Insurers demanding fax-only appeals and falsely claiming they never received the paperwork.',
      howClaimGuardKillsIt: 'Generates RFC 3198 cryptographic delivery tokens proving exact statutory delivery time.',
      icon: Radio,
      categoryBadge: 'TELECOM GATEWAY'
    },
    {
      id: 'F-05',
      featureName: 'State Prompt Pay 1.5%-2% Penalty Calculator',
      problemAnnihilated: 'Insurers holding $15M in hospital cash for 120+ days without paying mandatory late penalty interest.',
      howClaimGuardKillsIt: 'Auto-calculates statutory late interest under state insurance codes and appends it to legal demands.',
      icon: Scale,
      categoryBadge: 'FINANCIAL ENFORCEMENT'
    },
    {
      id: 'F-06',
      featureName: 'Document Pan/Zoom & Bates Stamper',
      problemAnnihilated: 'Grainy fax scans and unnumbered evidence sheets thrown out by federal arbitration judges.',
      howClaimGuardKillsIt: '25%-500% infinite smooth canvas with 1-click legal Bates exhibit stamps (CG-0001 to CG-0084).',
      icon: FileText,
      categoryBadge: 'COURTROOM EXHIBITS'
    }
  ];

  return (
    <section className="specular-card" style={{
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Problem-Destruction Architecture Matrix</h2>
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--status-rose-bg)',
            color: 'var(--status-rose)',
            border: '1px solid var(--status-rose-border)'
          }}>
            100% EXTERMINATION FORMULA
          </span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
          Every single feature was engineered to destroy a specific predatory payer tactic or administrative trap.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '16px'
      }}>
        {pairs.map((p) => {
          const Icon = p.icon;

          return (
            <div
              key={p.id}
              style={{
                padding: '18px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                borderTop: '1px solid rgba(255, 255, 255, 0.16)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'transform var(--duration-fast) var(--ease-spring-smooth), border-color var(--duration-fast) var(--ease-spring-smooth)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = 'var(--status-cyan-border)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: 'var(--radius-xs)',
                    background: 'var(--status-cyan-bg)',
                    color: 'var(--status-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={16} />
                  </div>
                  <span style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-primary)' }}>
                    {p.featureName}
                  </span>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)' }}>
                  {p.categoryBadge}
                </span>
              </div>

              {/* Problem Destroyed */}
              <div style={{
                padding: '10px 12px',
                borderRadius: 'var(--radius-xs)',
                background: 'var(--status-rose-bg)',
                border: '1px solid var(--status-rose-border)',
                fontSize: '11px',
                color: 'var(--text-primary)'
              }}>
                <span style={{ fontWeight: 800, color: 'var(--status-rose)', display: 'block', marginBottom: '2px' }}>
                  💥 VULNERABILITY DESTROYED:
                </span>
                {p.problemAnnihilated}
              </div>

              {/* How ClaimGuard Destroys It */}
              <div style={{
                padding: '10px 12px',
                borderRadius: 'var(--radius-xs)',
                background: 'var(--status-emerald-bg)',
                border: '1px solid var(--status-emerald-border)',
                fontSize: '11px',
                color: 'var(--text-primary)'
              }}>
                <span style={{ fontWeight: 800, color: 'var(--status-emerald)', display: 'block', marginBottom: '2px' }}>
                  🛡️ HOW CLAIMGUARD OVERTURNS IT:
                </span>
                {p.howClaimGuardKillsIt}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
