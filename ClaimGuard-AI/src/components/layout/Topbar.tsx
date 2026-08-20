import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, Moon, Sun, Sliders, Radio, Building2, 
  Sparkles, Globe2, Cpu
} from 'lucide-react';
import { PerSessionSentinelEngine } from '../../engine/perSessionSentinelEngine';

export interface AuthUser {
  name: string;
  role: string;
  email: string;
  npi: string;
}

interface TopbarProps {
  currentTheme: 'dark' | 'light';
  toggleTheme: () => void;
  brightness: number;
  setBrightness: (val: number) => void;
  contrast: number;
  setContrast: (val: number) => void;
  currentJurisdiction: 'US' | 'UK';
  setJurisdiction: (j: 'US' | 'UK') => void;
  onOpenMootCourt: () => void;
  onOpenScanner: () => void;
  onOpenEFax: () => void;
  onOpenPricingGap: () => void;
  onOpenFleetHub: () => void;
  onOpenPromptPay: () => void;
  onOpenIngestion?: () => void;
  authUser?: AuthUser | null;
  onLogout?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  currentTheme,
  toggleTheme,
  brightness,
  setBrightness,
  contrast,
  setContrast,
  currentJurisdiction,
  setJurisdiction,
  onOpenMootCourt,
  onOpenScanner,
  onOpenEFax,
  onOpenPricingGap,
  onOpenFleetHub,
  onOpenPromptPay,
  onOpenIngestion,
  authUser,
  onLogout
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef<HTMLDivElement | null>(null);
  const sentinel = PerSessionSentinelEngine.triggerSessionScan();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };
    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettings]);

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 24px',
      background: 'var(--bg-surface-glass)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      {/* Brand & Hospital Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--status-cyan), var(--status-indigo))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <ShieldCheck size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.5px' }}>ClaimGuard AI</span>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                padding: '2px 6px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--status-emerald-bg)',
                color: 'var(--status-emerald)',
                border: '1px solid var(--status-emerald-border)'
              }}>
                PRE-SUBMISSION SHIELD
              </span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Healthcare Legal Intelligence & Anti-Denial Defense Suite
            </p>
          </div>
        </div>

        {/* Hospital Facility Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-subtle)',
          fontSize: '12px',
          fontWeight: 600
        }}>
          <Building2 size={14} color="var(--status-cyan)" />
          <span>St. Jude Regional Medical Center (320 Beds)</span>
        </div>
      </div>

      {/* Center Action Badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* US / UK Jurisdiction Switcher */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg-surface-elevated)',
          borderRadius: 'var(--radius-full)',
          padding: '2px',
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            onClick={() => setJurisdiction('US')}
            style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '11px',
              fontWeight: 700,
              background: currentJurisdiction === 'US' ? 'var(--status-cyan)' : 'transparent',
              color: currentJurisdiction === 'US' ? 'var(--text-inverse)' : 'var(--text-secondary)'
            }}
          >
            🇺🇸 US (ERISA / CMS)
          </button>
          <button
            onClick={() => setJurisdiction('UK')}
            style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '11px',
              fontWeight: 700,
              background: currentJurisdiction === 'UK' ? 'var(--status-cyan)' : 'transparent',
              color: currentJurisdiction === 'UK' ? 'var(--text-inverse)' : 'var(--text-secondary)'
            }}
          >
            🇬🇧 UK (NHS / Bupa)
          </button>
        </div>

        {/* Live Regulatory Radar Ticker */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--status-cyan-bg)',
          border: '1px solid var(--status-cyan-border)',
          fontSize: '11px',
          color: 'var(--status-cyan)',
          fontWeight: 600
        }}>
          <Radio size={13} style={{ animation: 'pulseGlow 2s infinite' }} />
          <span>Radar: CMS-0057-F & Sepsis-3 Active</span>
        </div>
      </div>

      {/* Right Controls & Quick Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Devil's Moot Court Button */}
        <button
          onClick={onOpenMootCourt}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 12px',
            borderRadius: 'var(--radius-sm)',
            background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.2), rgba(99, 102, 241, 0.2))',
            border: '1px solid var(--status-rose-border)',
            color: 'var(--status-rose)',
            fontSize: '12px',
            fontWeight: 700
          }}
        >
          <Sparkles size={14} />
          <span>Devil's Moot Court</span>
        </button>

        {/* Ingest Claim Document / Scanner */}
        {onOpenIngestion && (
          <button
            onClick={onOpenIngestion}
            style={{
              padding: '7px 12px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(37, 99, 235, 0.2))',
              border: '1px solid var(--status-cyan-border)',
              color: 'var(--status-cyan)',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title="Ingest New Clinical Chart or Scan Document"
          >
            <span>📁 Ingest Document</span>
          </button>
        )}

        {/* Hardware TWAIN Scanner */}
        <button
          onClick={onOpenScanner}
          style={{
            padding: '7px 10px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-medium)',
            color: 'var(--text-primary)',
            fontSize: '12px',
            fontWeight: 600
          }}
          title="Direct TWAIN/WIA Feeder Scanner Bridge"
        >
          📠 Scanner Bridge
        </button>

        {/* e-Fax Telecom */}
        <button
          onClick={onOpenEFax}
          style={{
            padding: '7px 10px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-medium)',
            color: 'var(--text-primary)',
            fontSize: '12px',
            fontWeight: 600
          }}
          title="HIPAA Inbound/Outbound e-Fax Gateway"
        >
          📡 e-Fax Hub
        </button>

        {/* Prompt Pay Interest Tool */}
        <button
          onClick={onOpenPromptPay}
          style={{
            padding: '7px 10px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--status-amber-bg)',
            border: '1px solid var(--status-amber-border)',
            color: 'var(--status-amber)',
            fontSize: '12px',
            fontWeight: 700
          }}
          title="State Statutory 1.5%-2% Prompt Pay Penalty Interest Calculator"
        >
          ⚖️ 2% Prompt Pay
        </button>

        {/* 5-Year Cash Flow & Pricing */}
        <button
          onClick={onOpenPricingGap}
          style={{
            padding: '7px 12px',
            borderRadius: 'var(--radius-sm)',
            background: 'linear-gradient(135deg, var(--status-emerald), var(--status-cyan))',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 800,
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          💰 $485K Buyout ROI
        </button>

        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)'
          }}
          title="Toggle Dark / Light Theme"
        >
          {currentTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Brightness & Contrast Controller Slider Toggle */}
        <div ref={settingsRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setShowSettings(!showSettings)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              background: showSettings ? 'var(--status-cyan-bg)' : 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: showSettings ? 'var(--status-cyan)' : 'var(--text-primary)'
            }}
            title="Display Luminance & Contrast Controls"
          >
            <Sliders size={16} />
          </button>

          {showSettings && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '44px',
              width: '240px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 50,
              animation: 'fadeIn var(--duration-fast) var(--ease-spring-smooth)'
            }}>
              <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '12px' }}>
                Display Ergonomics
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                  <span>Brightness</span>
                  <span>{brightness}%</span>
                </div>
                <input 
                  type="range" 
                  min="70" 
                  max="130" 
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                  <span>Contrast</span>
                  <span>{contrast}%</span>
                </div>
                <input 
                  type="range" 
                  min="80" 
                  max="125" 
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
              <button
                onClick={() => { setBrightness(100); setContrast(100); }}
                style={{
                  width: '100%',
                  padding: '6px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--bg-surface-elevated)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--text-secondary)'
                }}
              >
                Reset to Default
              </button>
            </div>
          )}
        </div>

        {/* Global Fleet Telemetry Sentinel */}
        <button
          onClick={onOpenFleetHub}
          style={{
            padding: '7px 10px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--status-emerald)',
            fontSize: '11px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          title="Universal Cryptographic License Guard & Linkable Master Hub"
        >
          <Cpu size={14} />
          <span>Fleet Active</span>
        </button>

        {/* User Profile Pill & Logout Button */}
        {authUser && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            paddingLeft: '8px',
            borderLeft: '1px solid var(--border-subtle)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 8px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: 'var(--radius-xs)',
                background: 'var(--status-cyan-bg)',
                color: 'var(--status-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '11px'
              }}>
                {authUser.name.charAt(0)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                  {authUser.name}
                </span>
                <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {authUser.npi}
                </span>
              </div>
            </div>

            {onLogout && (
              <button
                onClick={onLogout}
                style={{
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--status-rose)',
                  fontSize: '11px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                title="Sign out of current workstation session"
              >
                <span>Logout</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
