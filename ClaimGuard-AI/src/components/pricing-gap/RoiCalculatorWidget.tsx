import React, { useState } from 'react';
import { ShieldCheck, Zap, Scale, DollarSign, ArrowRight } from 'lucide-react';

interface RoiPreset {
  label: string;
  team: number;
  fee: number;
  inflation: number;
  name: string;
}

interface RoiCalculatorWidgetProps {
  appName?: string;
  defaultBuyoutPrice?: number;
  defaultBuyoutTierName?: string;
  presets?: RoiPreset[];
  onSelectTier?: (tierName: string, priceFormatted: string) => void;
}

const DEFAULT_LEGAL_PRESETS: RoiPreset[] = [
  { label: 'Optum360 Claims', team: 25, fee: 36000, inflation: 10, name: 'Optum360 Revenue Cycle & Appeals Stack' },
  { label: 'Waystar Enterprise', team: 40, fee: 52000, inflation: 12, name: 'Waystar Claims & Clearinghouse Suite' },
  { label: 'Experian Health', team: 30, fee: 44000, inflation: 10, name: 'Experian Health Denials & Appeals' },
  { label: 'Regional Medical Group', team: 15, fee: 21000, inflation: 8, name: 'Independent Practice RCM Stack' },
];

export const RoiCalculatorWidget: React.FC<RoiCalculatorWidgetProps> = ({
  appName = 'ClaimGuard AI Legal Defense',
  defaultBuyoutPrice = 28500,
  defaultBuyoutTierName = 'Tier 2: Multi-Facility ERISA Defense ($28,500)',
  presets = DEFAULT_LEGAL_PRESETS,
  onSelectTier,
}) => {
  const [teamSize, setTeamSize] = useState(25);
  const [annualFee, setAnnualFee] = useState(36000);
  const [inflationRate, setInflationRate] = useState(10);
  const [activePreset, setActivePreset] = useState<string | null>('Optum360 Claims');

  // Mathematical 3-Year Compounding Model
  const rate = inflationRate / 100;
  const y1 = annualFee;
  const y2 = y1 * (1 + rate);
  const y3 = y2 * (1 + rate);
  const legacyTotal = Math.round(y1 + y2 + y3);

  // Dynamic Tier Assignment
  let buyoutPrice = defaultBuyoutPrice;
  let targetTierName = defaultBuyoutTierName;
  if (annualFee <= 20000 && teamSize <= 15) {
    buyoutPrice = 9500;
    targetTierName = 'Tier 1: Single Facility Provider ($9,500)';
  } else if (annualFee <= 50000 && teamSize <= 45) {
    buyoutPrice = 28500;
    targetTierName = 'Tier 2: Multi-Facility ERISA Defense ($28,500)';
  } else {
    buyoutPrice = 65000;
    targetTierName = 'Tier 3: 100% Commercial IP & Model Buyout ($65,000)';
  }

  const netSavings = Math.max(0, legacyTotal - buyoutPrice);
  const pctSavings = legacyTotal > 0 ? ((netSavings / legacyTotal) * 100).toFixed(1) : '90.0';
  const paybackMonths = annualFee > 0 ? ((buyoutPrice / annualFee) * 12).toFixed(1) : '2.4';

  const handleApplyPreset = (p: RoiPreset) => {
    setActivePreset(p.label);
    setTeamSize(p.team);
    setAnnualFee(p.fee);
    setInflationRate(p.inflation);
  };

  return (
    <div style={{
      padding: '24px',
      borderRadius: 'var(--radius-lg, 16px)',
      background: 'var(--bg-surface-elevated, #101626)',
      border: '1px solid var(--border-medium, #202b42)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--border-subtle, #1a2336)'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: '999px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#10b981',
            fontSize: '10px',
            fontFamily: 'monospace',
            fontWeight: 800,
            marginBottom: '6px'
          }}>
            <Scale size={12} />
            <span>EXECUTIVE RCM &amp; ERISA ROI ENGINE</span>
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: 0 }}>
            Zero-SaaS Buyout vs Annual RCM &amp; Appeals Vendor Taxes
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted, #94a3b8)', margin: '4px 0 0 0' }}>
            Calculate 3-year retained reimbursement cash flow switching to {appName} sovereign ownership.
          </p>
        </div>

        {/* Presets */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => handleApplyPreset(p)}
              style={{
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '11px',
                fontFamily: 'monospace',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: activePreset === p.label ? 'var(--status-emerald, #10b981)' : '#0c1220',
                color: activePreset === p.label ? '#000' : '#94a3b8',
                border: '1px solid #1e293b'
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sliders Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Team Size */}
          <div style={{ padding: '14px', borderRadius: '12px', background: '#090e1a', border: '1px solid #1a2336' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'monospace', marginBottom: '6px' }}>
              <span style={{ color: '#94a3b8' }}>RCM Specialists &amp; Coders:</span>
              <span style={{ color: '#10b981', fontWeight: 800 }}>{teamSize} Appeals Seats</span>
            </div>
            <input
              type="range"
              min="5"
              max="150"
              step="5"
              value={teamSize}
              onChange={(e) => {
                setTeamSize(Number(e.target.value));
                setActivePreset(null);
              }}
              style={{ width: '100%', accentColor: '#10b981', cursor: 'pointer' }}
            />
          </div>

          {/* Current Legacy Fee */}
          <div style={{ padding: '14px', borderRadius: '12px', background: '#090e1a', border: '1px solid #1a2336' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'monospace', marginBottom: '6px' }}>
              <span style={{ color: '#94a3b8' }}>Current Legacy Vendor Annual Spend:</span>
              <span style={{ color: '#f43f5e', fontWeight: 800 }}>${annualFee.toLocaleString()} / year</span>
            </div>
            <input
              type="range"
              min="5000"
              max="150000"
              step="1000"
              value={annualFee}
              onChange={(e) => {
                setAnnualFee(Number(e.target.value));
                setActivePreset(null);
              }}
              style={{ width: '100%', accentColor: '#f43f5e', cursor: 'pointer' }}
            />
          </div>

          {/* Annual Price Increase */}
          <div style={{ padding: '14px', borderRadius: '12px', background: '#090e1a', border: '1px solid #1a2336' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'monospace', marginBottom: '6px' }}>
              <span style={{ color: '#94a3b8' }}>Projected Vendor Price Escalation:</span>
              <span style={{ color: '#f59e0b', fontWeight: 800 }}>{inflationRate}% / year compounding</span>
            </div>
            <input
              type="range"
              min="5"
              max="20"
              step="1"
              value={inflationRate}
              onChange={(e) => {
                setInflationRate(Number(e.target.value));
                setActivePreset(null);
              }}
              style={{ width: '100%', accentColor: '#f59e0b', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Results Card */}
        <div style={{
          padding: '20px',
          borderRadius: '16px',
          background: '#090e1a',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontFamily: 'monospace', paddingBottom: '8px', borderBottom: '1px solid #1a2336' }}>
              <span style={{ color: '#94a3b8' }}>Target Buyout Tier</span>
              <span style={{ color: '#10b981', fontWeight: 800, background: '#0c1a2e', padding: '2px 8px', borderRadius: '4px' }}>
                {targetTierName.split('(')[0]}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontFamily: 'monospace', textAlign: 'center' }}>
              <div style={{ padding: '10px', borderRadius: '10px', background: '#13121f', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>3-Yr SaaS Drain</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#f43f5e', marginTop: '2px' }}>${legacyTotal.toLocaleString()}</div>
              </div>

              <div style={{ padding: '10px', borderRadius: '10px', background: '#0c1a24', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>1-Time Buyout</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#10b981', marginTop: '2px' }}>${buyoutPrice.toLocaleString()}</div>
              </div>
            </div>

            {/* Net Savings Box */}
            <div style={{
              padding: '16px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 78, 59, 0.3) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '10px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#10b981' }}>
                Net 3-Year Retained Reimbursement
              </div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#fff', fontFamily: 'monospace', marginTop: '4px' }}>
                +${netSavings.toLocaleString()}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', fontSize: '11px', fontFamily: 'monospace', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <span style={{ color: '#6ee7b7', fontWeight: 700 }}>{pctSavings}% Saved</span>
                <span style={{ color: '#64748b' }}>•</span>
                <span style={{ color: '#38bdf8', fontWeight: 700 }}>{paybackMonths} Mo Breakeven</span>
              </div>
            </div>
          </div>

          {onSelectTier && (
            <button
              type="button"
              onClick={() => onSelectTier(targetTierName, `$${buyoutPrice.toLocaleString()}`)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#000',
                fontFamily: 'monospace',
                fontWeight: 800,
                fontSize: '12px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 16px rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Zap size={14} />
              <span>Acquire ERISA Defense License (${buyoutPrice.toLocaleString()})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
