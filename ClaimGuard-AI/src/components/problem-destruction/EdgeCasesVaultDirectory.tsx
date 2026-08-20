import React, { useState } from 'react';
import { 
  Search, ShieldAlert, CheckCircle2, AlertTriangle, 
  Sparkles, Scale, Eye, FileText, ArrowRight, SlidersHorizontal, 
  ExternalLink, Zap, HelpCircle
} from 'lucide-react';
import { EDGE_CASE_STUDIES, CaseStudy } from '../../engine/edgeCaseStudiesData';

interface EdgeCasesVaultDirectoryProps {
  onSelectCase: (caseStudy: CaseStudy) => void;
  onOpenMootCourt: (caseStudy: CaseStudy) => void;
  onOpenDocStudio: (caseStudy: CaseStudy) => void;
}

export const EdgeCasesVaultDirectory: React.FC<EdgeCasesVaultDirectoryProps> = ({
  onSelectCase,
  onOpenMootCourt,
  onOpenDocStudio
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>(EDGE_CASE_STUDIES[0].id);

  const categories = [
    'ALL',
    'Travel/Cross-Border',
    'Critical Care',
    'Surgery',
    'Trauma',
    'Oncology',
    'Pediatrics',
    'Behavioral',
    'Robotic/Bariatric',
    'Eligibility',
    'UK/PMI'
  ];

  const filteredCases = EDGE_CASE_STUDIES.filter(c => {
    const matchesSearch = (
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.payer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.denialCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.toolOrFeatureUsed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.legalBasis.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesCategory = activeCategory === 'ALL' || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const totalAtRisk = EDGE_CASE_STUDIES.reduce((acc, curr) => acc + curr.atRiskAmount, 0);

  return (
    <section className="specular-card" style={{
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Directory Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Master Edge Cases Directory & Alternate Reality Simulator</h2>
            <span style={{
              fontSize: '11px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--status-cyan-bg)',
              color: 'var(--status-cyan)',
              border: '1px solid var(--status-cyan-border)'
            }}>
              50 REAL-WORLD CASES VAULT
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Interactive before-and-after audit demonstrating how ClaimGuard AI rewrites hospital and patient financial outcomes.
          </p>
        </div>

        {/* Global At-Risk Metric */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '10px 16px',
          background: 'var(--bg-surface-elevated)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Total 50-Case Vault Value Protected
            </div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--status-emerald)', letterSpacing: '-0.5px' }}>
              ${totalAtRisk.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--bg-surface-elevated)',
          padding: '8px 14px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)',
          flex: '1',
          maxWidth: '420px'
        }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            id="edge-cases-search-input"
            name="edgeCasesSearch"
            aria-label="Search all 50 edge cases by issue, statute, tool, or payer"
            type="text"
            placeholder="Search all 50 edge cases by issue, statute, tool, or payer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '12px',
              width: '100%'
            }}
          />
          <kbd style={{
            fontSize: '10px',
            background: 'rgba(255, 255, 255, 0.08)',
            padding: '2px 6px',
            borderRadius: 'var(--radius-xs)',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            whiteSpace: 'nowrap'
          }}>
            Ctrl+K
          </kbd>
        </div>

        {/* Category Pills (Fitts's Law 34px touch target) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                minHeight: '34px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '12px',
                fontWeight: 600,
                background: activeCategory === cat ? 'var(--status-cyan-bg)' : 'var(--bg-surface-elevated)',
                color: activeCategory === cat ? 'var(--status-cyan)' : 'var(--text-secondary)',
                border: activeCategory === cat ? '1px solid var(--status-cyan-border)' : '1px solid var(--border-subtle)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cases Cards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredCases.length === 0 ? (
          <div style={{
            padding: '48px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            background: 'var(--bg-surface-elevated)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--status-cyan-bg)',
              color: 'var(--status-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Search size={24} />
            </div>
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Zero Matching Edge Case Studies Found
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', maxWidth: '420px', lineHeight: 1.5 }}>
              No edge cases match your search term "{searchTerm}". Reset filters to explore all 50 adversarial payer scenarios and their statutory defenses.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('ALL'); }}
              style={{
                marginTop: '6px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                background: 'linear-gradient(135deg, var(--status-cyan), var(--status-indigo))',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 700
              }}
            >
              Reset Filters & View All 50 Edge Cases
            </button>
          </div>
        ) : (
        filteredCases.map((caseItem) => {
          const isExpanded = expandedCaseId === caseItem.id;

          return (
            <div
              key={caseItem.id}
              style={{
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface-elevated)',
                border: isExpanded ? '1px solid var(--status-cyan-border)' : '1px solid var(--border-subtle)',
                boxShadow: isExpanded ? 'var(--shadow-md)' : 'none',
                transition: 'all var(--duration-fast) var(--ease-spring-smooth)',
                overflow: 'hidden'
              }}
            >
              {/* Card Collapsed Bar / Header */}
              <div
                onClick={() => setExpandedCaseId(isExpanded ? null : caseItem.id)}
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  background: isExpanded ? 'var(--bg-app)' : 'transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    color: 'var(--status-cyan)',
                    fontSize: '12px'
                  }}>
                    {caseItem.id}
                  </span>
                  <div>
                    <span style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-primary)' }}>
                      {caseItem.title}
                    </span>
                    <span style={{
                      marginLeft: '8px',
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--status-cyan-bg)',
                      color: 'var(--status-cyan)'
                    }}>
                      {caseItem.category}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontWeight: 800, fontSize: '14px', color: 'var(--status-rose)' }}>
                      ${caseItem.atRiskAmount.toLocaleString()}
                    </span>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      {caseItem.payer}
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {isExpanded ? '▲ Collapse' : '▼ Expand Alternate Reality'}
                  </span>
                </div>
              </div>

              {/* Card Expanded Body (The Alternate Reality Simulator) */}
              {isExpanded && (
                <div style={{
                  padding: '20px 24px',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  animation: 'fadeIn var(--duration-fast) var(--ease-spring-smooth)'
                }}>
                  {/* Tool Attribution Badge */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '8px',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.1), rgba(16, 185, 129, 0.1))',
                    border: '1px solid var(--status-cyan-border)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Zap size={16} color="var(--status-cyan)" />
                      <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--status-cyan)', textTransform: 'uppercase' }}>
                        EXACT TOOL & FEATURE DEPLOYED:
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {caseItem.toolOrFeatureUsed}
                      </span>
                    </div>

                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--status-emerald)' }}>
                      Courtroom Exhibit: {caseItem.batesLabel}
                    </span>
                  </div>

                  {/* 2-Column Alternate Reality Comparison */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {/* Column 1: The Tragic Reality */}
                    <div style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--status-rose-bg)',
                      border: '1px solid var(--status-rose-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: 'var(--status-rose)' }}>
                        <ShieldAlert size={16} />
                        <span>❌ THE REALITY WITHOUT CLAIMGUARD AI (THE TRAGEDY):</span>
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                        {caseItem.tragicRealityWithoutApp}
                      </p>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', fontStyle: 'italic' }}>
                        Payer Denial Pretext: "{caseItem.denialReason}"
                      </div>
                    </div>

                    {/* Column 2: The Victorious Alternate Reality */}
                    <div style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--status-emerald-bg)',
                      border: '1px solid var(--status-emerald-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: 'var(--status-emerald)' }}>
                        <CheckCircle2 size={16} />
                        <span>🛡️ THE OUTCOME WITH CLAIMGUARD AI (THE VICTORY):</span>
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                        {caseItem.victoriousAlternateOutcome}
                      </p>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: 600 }}>
                        {caseItem.howClaimGuardDestroysIt}
                      </div>
                    </div>
                  </div>

                  {/* Statutory Proof & Clinical Evidence Bar */}
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    fontSize: '11px'
                  }}>
                    <div>
                      <strong style={{ color: 'var(--status-cyan)' }}>Statutory Legal Shield: </strong>
                      <span style={{ fontFamily: 'var(--font-mono)' }}>{caseItem.legalBasis}</span>
                    </div>
                    <div>
                      <strong style={{ color: 'var(--status-emerald)' }}>Verbatim Clinical Telemetry Anchor: </strong>
                      <span style={{ fontStyle: 'italic' }}>"{caseItem.clinicalProof}"</span>
                    </div>
                  </div>

                  {/* Action Triggers */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '4px' }}>
                    <button
                      onClick={() => onSelectCase(caseItem)}
                      style={{
                        padding: '7px 14px',
                        borderRadius: 'var(--radius-xs)',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-medium)',
                        color: 'var(--text-primary)',
                        fontSize: '11px',
                        fontWeight: 700
                      }}
                    >
                      Open Case in Legal Drawer
                    </button>
                    <button
                      onClick={() => onOpenMootCourt(caseItem)}
                      style={{
                        padding: '7px 14px',
                        borderRadius: 'var(--radius-xs)',
                        background: 'linear-gradient(135deg, var(--status-rose), var(--status-indigo))',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 800
                      }}
                    >
                      Run Devil's Pre-Debate
                    </button>
                    <button
                      onClick={() => onOpenDocStudio(caseItem)}
                      style={{
                        padding: '7px 14px',
                        borderRadius: 'var(--radius-xs)',
                        background: 'var(--status-cyan)',
                        color: 'var(--text-inverse)',
                        fontSize: '11px',
                        fontWeight: 800
                      }}
                    >
                      Open Pan/Zoom Studio
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        }))}
      </div>
    </section>
  );
};
