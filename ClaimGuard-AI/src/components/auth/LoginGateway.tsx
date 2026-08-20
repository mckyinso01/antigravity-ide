import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, User, KeyRound, Sparkles, Scale, 
  Building2, CheckCircle2, ArrowRight, ShieldAlert, Zap, Radio
} from 'lucide-react';

interface AuthUser {
  name: string;
  role: string;
  email: string;
  npi: string;
}

interface LoginGatewayProps {
  onLoginSuccess: (user: AuthUser) => void;
}

const DEMO_ACCOUNTS: AuthUser[] = [
  {
    name: 'Dr. Marcus Vance, MD',
    role: 'Chief Medical Officer (Clinical Defense Lead)',
    email: 'm.vance@saintjude-health.org',
    npi: 'NPI-1948201948'
  },
  {
    name: 'Elena Rostova, JD',
    role: 'Lead Hospital Appeals Attorney (ERISA § 502)',
    email: 'e.rostova@saintjude-legal.org',
    npi: 'BAR-TX-882194'
  },
  {
    name: 'Sarah Jenkins, RHIA',
    role: 'Director of Revenue Integrity & Coding',
    email: 's.jenkins@saintjude-rev.org',
    npi: 'RHIA-9920148'
  }
];

export const LoginGateway: React.FC<LoginGatewayProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [rememberStation, setRememberStation] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsLoading(false);
      if (!username) {
        setErrorMessage('Please enter your hospital staff email, NPI, or username.');
        return;
      }

      const found = DEMO_ACCOUNTS.find(
        (a) => a.email.toLowerCase() === username.trim().toLowerCase() || a.name.toLowerCase().includes(username.trim().toLowerCase())
      );

      const authenticatedUser: AuthUser = found || {
        name: username.includes('@') ? username.split('@')[0] : username,
        role: 'Hospital Defense Specialist',
        email: username.includes('@') ? username : `${username}@hospital-system.org`,
        npi: 'NPI-DEMO-2026'
      };

      if (rememberStation) {
        localStorage.setItem('claimguard_auth_user', JSON.stringify(authenticatedUser));
      }
      onLoginSuccess(authenticatedUser);
    }, 200);
  };

  const handleQuickDemoLogin = (account: AuthUser) => {
    if (rememberStation) {
      localStorage.setItem('claimguard_auth_user', JSON.stringify(account));
    }
    onLoginSuccess(account);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'var(--bg-app)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient background glows */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: '25%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15), transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-15%',
        right: '25%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12), transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />

      {/* Main Glassmorphic Login Card */}
      <div style={{
        width: '100%',
        maxWidth: '520px',
        background: 'var(--bg-surface-glass)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--border-medium)',
        borderTop: '1px solid rgba(255, 255, 255, 0.22)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)',
        padding: '36px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        position: 'relative',
        zIndex: 10,
        animation: 'fadeIn var(--duration-normal) var(--ease-spring-smooth)'
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(99, 102, 241, 0.2))',
            border: '1px solid var(--status-cyan-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--status-cyan)',
            boxShadow: '0 0 24px rgba(6, 182, 212, 0.25)'
          }}>
            <Scale size={28} />
          </div>

          <h1 style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px', marginTop: '4px' }}>
            ClaimGuard <span style={{ color: 'var(--status-cyan)' }}>AI</span>
          </h1>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            Pre-Submission Adversarial Healthcare Claims Defense Engine
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '3px 10px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--status-emerald-bg)',
            border: '1px solid var(--status-emerald-border)',
            fontSize: '10px',
            fontWeight: 700,
            color: 'var(--status-emerald)',
            marginTop: '2px'
          }}>
            <ShieldCheck size={12} />
            <span>SOC2 TYPE II • HIPAA SAFE HARBOR ACTIVE</span>
          </div>
        </div>

        {/* 1-Click Demo Accounts Selector */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px'
          }}>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              1-Click Instant Demo Access (Pre-Configured Roles):
            </span>
            <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--status-cyan)', background: 'var(--status-cyan-bg)', padding: '2px 6px', borderRadius: 'var(--radius-xs)' }}>
              NO PASS REQUIRED
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {DEMO_ACCOUNTS.map((acc, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickDemoLogin(acc)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all var(--duration-fast) var(--ease-spring-smooth)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--status-cyan-border)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-sm)',
                    background: idx === 0 ? 'var(--status-cyan-bg)' : idx === 1 ? 'var(--status-amber-bg)' : 'var(--status-emerald-bg)',
                    color: idx === 0 ? 'var(--status-cyan)' : idx === 1 ? 'var(--status-amber)' : 'var(--status-emerald)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '12px'
                  }}>
                    {idx === 0 ? 'MD' : idx === 1 ? 'JD' : 'RH'}
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {acc.name}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      {acc.role}
                    </div>
                  </div>
                </div>

                <div style={{
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'rgba(255, 255, 255, 0.06)',
                  color: 'var(--status-cyan)',
                  fontSize: '10px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span>Log In</span>
                  <ArrowRight size={10} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            Or Manual Staff Auth
          </span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
        </div>

        {/* Manual Login Form */}
        <form onSubmit={handleManualLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {errorMessage && (
            <div style={{
              padding: '10px 12px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--status-rose-bg)',
              border: '1px solid var(--status-rose-border)',
              color: 'var(--status-rose)',
              fontSize: '11px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <ShieldAlert size={14} />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label 
              htmlFor="staff-auth-id"
              style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}
            >
              Hospital Email / Staff NPI:
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--bg-surface-elevated)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-medium)'
            }}>
              <User size={16} color="var(--text-muted)" />
              <input
                id="staff-auth-id"
                name="staffAuthId"
                type="text"
                placeholder="e.g. m.vance@saintjude.org or demo"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  width: '100%'
                }}
              />
            </div>
          </div>

          <div>
            <label 
              htmlFor="workstation-pin"
              style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}
            >
              Workstation PIN / Passcode (Demo: 123):
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--bg-surface-elevated)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-medium)'
            }}>
              <KeyRound size={16} color="var(--text-muted)" />
              <input
                id="workstation-pin"
                name="workstationPin"
                type="password"
                placeholder="Default demo PIN: 123"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  width: '100%'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberStation}
                onChange={(e) => setRememberStation(e.target.checked)}
                style={{ accentColor: 'var(--status-cyan)', cursor: 'pointer' }}
              />
              <span>Remember station session</span>
            </label>

            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              Demo pass: <strong style={{ color: 'var(--status-cyan)' }}>123</strong>
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: '4px',
              padding: '12px 18px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, var(--status-cyan), var(--status-indigo))',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(6, 182, 212, 0.3)',
              cursor: 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            <Lock size={16} />
            <span>{isLoading ? 'Verifying Credentials...' : 'Authenticate Clinical Session'}</span>
          </button>
        </form>

        {/* 1-Click Instant Bypass for Prospective Clients */}
        <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
          <button
            type="button"
            onClick={() => handleQuickDemoLogin(DEMO_ACCOUNTS[0])}
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--status-cyan)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'underline'
            }}
          >
            <Zap size={14} />
            <span>Explore Live Sandbox As Guest (Zero-Click Bypass) ➔</span>
          </button>
        </div>
      </div>
    </div>
  );
};
