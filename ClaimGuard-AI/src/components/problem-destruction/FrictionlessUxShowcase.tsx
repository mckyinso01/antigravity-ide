import React from 'react';
import { MousePointerClick, HeartHandshake, Eye, Sparkles, CheckCircle2 } from 'lucide-react';

export const FrictionlessUxShowcase: React.FC = () => {
  const pillars = [
    {
      id: 'UX-01',
      title: 'Eliminate 4,000-Click Fatigue',
      subtitle: 'Single-Screen Velocity Surface',
      desc: 'Instead of navigating 20 nested sub-menus across legacy EHRs, ClaimGuard AI is a unified split-pane command surface with batch 1-click patches and instant keyboard shortcuts.',
      icon: MousePointerClick,
      stat: '92% Click Reduction'
    },
    {
      id: 'UX-02',
      title: 'End the Physician-Coder War',
      subtitle: 'Zero Doctor-Coder Friction',
      desc: '1-Tap Mobile Addendum Scribe: Surgeons record a 10-second voice memo between cases; Counsel Lexis automatically translates it into an MCG-compliant statutory addendum.',
      icon: HeartHandshake,
      stat: '0 Interrupted Surgeries'
    },
    {
      id: 'UX-03',
      title: '0% Blocking Popups / Zero Context Loss',
      subtitle: 'Non-Modal Split-Pane Canvas',
      desc: 'No blinding centered modal popups or background blurs. The Counsel Lexis inspector slides in from the right while 100% of the Claims Ledger remains visible, clickable, and responsive.',
      icon: Eye,
      stat: '100% Context Retention'
    },
    {
      id: 'UX-04',
      title: 'Ergonomic Sensory Display Controls',
      subtitle: 'Dynamic Luminance & Contrast',
      desc: 'Dual Swiss Light and Dark Obsidian modes with dynamic 70%-130% brightness and contrast tuning to eliminate retinal fatigue during grueling 10-hour hospital shifts.',
      icon: Sparkles,
      stat: 'Zero Eye Strain'
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
          <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Anti-Burnout & Frictionless Hospital UX Architecture</h2>
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--status-cyan-bg)',
            color: 'var(--status-cyan)',
            border: '1px solid var(--status-cyan-border)'
          }}>
            EMIL KOWALSKI STANDARD
          </span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
          Built specifically to eliminate hospital coder turnover and protect physicians from administrative exhaustion.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px'
      }}>
        {pillars.map((p) => {
          const Icon = p.icon;

          return (
            <div
              key={p.id}
              style={{
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                borderTop: '1px solid rgba(255, 255, 255, 0.16)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
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
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--status-cyan-bg)',
                    color: 'var(--status-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={18} />
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--status-emerald-bg)',
                    color: 'var(--status-emerald)'
                  }}>
                    {p.stat}
                  </span>
                </div>

                <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {p.title}
                </h3>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--status-cyan)', marginBottom: '8px' }}>
                  {p.subtitle}
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {p.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
