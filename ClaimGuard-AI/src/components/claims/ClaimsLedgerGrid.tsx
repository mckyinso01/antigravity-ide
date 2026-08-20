import React, { useState } from 'react';
import { 
  AlertCircle, ShieldCheck, Clock, Search, Filter, 
  ChevronRight, ArrowUpDown, Sparkles, FileText, Globe, UploadCloud
} from 'lucide-react';
import { EDGE_CASE_STUDIES, CaseStudy } from '../../engine/edgeCaseStudiesData';

interface ClaimsLedgerGridProps {
  onSelectCase: (caseStudy: CaseStudy) => void;
  selectedCaseId?: string;
  cases?: CaseStudy[];
  onOpenIngestion?: () => void;
}

export const ClaimsLedgerGrid: React.FC<ClaimsLedgerGridProps> = ({
  onSelectCase,
  selectedCaseId,
  cases = EDGE_CASE_STUDIES,
  onOpenIngestion
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filteredCases = cases.filter(c => {
    const matchesSearch = (
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.payer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.denialCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.legalBasis.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesCategory = categoryFilter === 'ALL' || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalAtRisk = cases.reduce((acc, curr) => acc + curr.atRiskAmount, 0);

  const categories = [
    'ALL',
    'Critical Care',
    'Surgery',
    'Trauma',
    'Oncology',
    'Travel/Cross-Border',
    'Eligibility',
    'Pediatrics',
    'Behavioral',
    'UK/PMI'
  ];

  return (
    <section className="specular-card" style={{
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Header & Metric Bar */}
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
            <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Active Hospital Claims Defense Queue</h2>
            <span style={{
              fontSize: '12px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--status-cyan-bg)',
              color: 'var(--status-cyan)',
              border: '1px solid var(--status-cyan-border)'
            }}>
              24 Master Pre-Submission Cases
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Expanded pre-submission legal defense matrix spanning US Inpatient, Outpatient, Cross-Border Travel, and UK NHS/PMI.
          </p>
        </div>

        {/* Total Recoverable Revenue Ticker */}
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
              Total Revenue Shielded (24 Cases)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--status-emerald)', letterSpacing: '-0.5px' }}>
                ${totalAtRisk.toLocaleString()}
              </span>
              <svg width="64" height="24" viewBox="0 0 64 24" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="sparklineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--status-cyan)" />
                    <stop offset="100%" stopColor="var(--status-emerald)" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 18 Q 12 12, 24 16 T 44 6 T 64 2"
                  fill="none"
                  stroke="url(#sparklineGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="64" cy="2" r="3" fill="var(--status-emerald)" style={{ animation: 'pulseGlow 2s infinite' }} />
              </svg>
            </div>
          </div>
          <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              First-Pass Clean Rate
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--status-cyan)', letterSpacing: '-0.5px' }}>
                99.7%
              </span>
              <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--status-emerald)', background: 'var(--status-emerald-bg)', padding: '2px 6px', borderRadius: 'var(--radius-xs)' }}>
                ▲ +14.2%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1', maxWidth: '640px', flexWrap: 'wrap' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-surface-elevated)',
            padding: '8px 14px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            flex: '1',
            minWidth: '260px'
          }}>
            <Search size={16} color="var(--text-muted)" />
            <input
              id="claims-search-input"
              name="claimsSearch"
              aria-label="Search active hospital claims by diagnosis, payer, statute, or CPT"
              type="text"
              placeholder="Search all cases by diagnosis, payer, statute, or CPT..."
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

          {onOpenIngestion && (
            <button
              onClick={onOpenIngestion}
              className="btn-interactive"
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                background: 'linear-gradient(135deg, #00e5ff 0%, #2563eb 100%)',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 800,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(0, 229, 255, 0.35)',
                whiteSpace: 'nowrap'
              }}
            >
              <UploadCloud size={15} />
              <span>+ Ingest Document / Scan Chart</span>
            </button>
          )}
        </div>

        {/* Category Pills (Fitts's Law 34px ergonomic tap target) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              style={{
                minHeight: '34px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '12px',
                fontWeight: 600,
                background: categoryFilter === cat ? 'var(--status-cyan-bg)' : 'var(--bg-surface-elevated)',
                color: categoryFilter === cat ? 'var(--status-cyan)' : 'var(--text-secondary)',
                border: categoryFilter === cat ? '1px solid var(--status-cyan-border)' : '1px solid var(--border-subtle)',
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

      {/* High-Density Claims Table */}
      <div style={{
        overflowX: 'auto',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        maxHeight: '620px'
      }}>
        {filteredCases.length === 0 ? (
          <div style={{
            padding: '48px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            background: 'var(--bg-surface-elevated)'
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
              Zero Matching Claims in Current Filter
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', maxWidth: '420px', lineHeight: 1.5 }}>
              No claims match your search query for "{searchTerm}". Clear your search term or switch categories to inspect all 24 active high-dollar cases.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setCategoryFilter('ALL'); }}
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
              Reset Filters & View All 24 Cases
            </button>
          </div>
        ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
            <tr style={{
              background: 'var(--bg-surface-elevated)',
              borderBottom: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              <th style={{ padding: '12px 16px' }}>Claim ID & Case Title</th>
              <th style={{ padding: '12px 16px' }}>Clinical Specialty</th>
              <th style={{ padding: '12px 16px' }}>Payer & Policy Code</th>
              <th style={{ padding: '12px 16px' }}>Billed vs At-Risk</th>
              <th style={{ padding: '12px 16px' }}>Denial Reason</th>
              <th style={{ padding: '12px 16px' }}>Pre-Submission Defense</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((item) => {
              const isSelected = selectedCaseId === item.id;

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectCase(item)}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    background: isSelected ? 'var(--bg-surface-elevated)' : 'transparent',
                    transition: 'background var(--duration-fast) var(--ease-spring-smooth)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.background = 'var(--bg-surface-elevated)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {/* Case Title */}
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        color: 'var(--status-cyan)',
                        fontSize: '11px'
                      }}>
                        {item.id}
                      </span>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                        {item.title}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Exhibit: {item.batesLabel} • <span style={{ color: 'var(--text-secondary)' }}>{item.category}</span>
                    </div>
                  </td>

                  {/* Specialty */}
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>
                    {item.specialty}
                  </td>

                  {/* Payer */}
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600 }}>{item.payer}</div>
                    <div style={{ fontSize: '10px', color: 'var(--status-amber)' }}>Code: {item.denialCode}</div>
                  </td>

                  {/* Amount */}
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 800, color: 'var(--status-rose)' }}>
                      ${item.atRiskAmount.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      Billed: ${item.billedAmount.toLocaleString()}
                    </div>
                  </td>

                  {/* Denial Reason */}
                  <td style={{ padding: '14px 16px', maxWidth: '240px', color: 'var(--text-secondary)' }}>
                    <p style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      fontSize: '11px'
                    }}>
                      {item.denialReason}
                    </p>
                  </td>

                  {/* Defense Status */}
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--status-emerald-bg)',
                      color: 'var(--status-emerald)',
                      border: '1px solid var(--status-emerald-border)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <ShieldCheck size={12} />
                      STATUTORY SHIELD READY
                    </span>
                  </td>

                  {/* Action Button */}
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCase(item);
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-xs)',
                        background: 'var(--status-cyan-bg)',
                        border: '1px solid var(--status-cyan-border)',
                        color: 'var(--status-cyan)',
                        fontSize: '11px',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>Inspect</span>
                      <ChevronRight size={12} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        )}
      </div>
    </section>
  );
};
