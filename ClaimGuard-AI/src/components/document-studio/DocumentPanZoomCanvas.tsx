import React, { useState, useRef } from 'react';
import { 
  X, ZoomIn, ZoomOut, Maximize2, Move, Tag, 
  CheckCircle2, Stamp, Layers, Eye
} from 'lucide-react';
import { CaseStudy } from '../../engine/edgeCaseStudiesData';
import { DocumentAnnotationEngine, DocumentAnnotation } from '../../engine/documentAnnotationEngine';

interface DocumentPanZoomCanvasProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudy | null;
}

export const DocumentPanZoomCanvas: React.FC<DocumentPanZoomCanvasProps> = ({
  isOpen,
  onClose,
  caseStudy
}) => {
  if (!isOpen || !caseStudy) return null;

  const [zoomLevel, setZoomLevel] = useState(100); // 25% to 500%
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [batesStamped, setBatesStamped] = useState(true);
  const [activeAnnotationId, setActiveAnnotationId] = useState<string | null>(null);

  const annotations: DocumentAnnotation[] = DocumentAnnotationEngine.getAnnotationsForClaim(caseStudy.id);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoom = (delta: number) => {
    setZoomLevel(prev => Math.min(500, Math.max(25, prev + delta)));
  };

  const resetViewport = () => {
    setZoomLevel(100);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 85,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1240px',
        height: '92vh',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'fadeIn var(--duration-fast) var(--ease-spring-smooth)'
      }}>
        {/* Studio Topbar */}
        <div style={{
          padding: '16px 24px',
          background: 'var(--bg-surface-elevated)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
              <Move size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800 }}>Document Pan & Optical Zoom Studio</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {caseStudy.title} • Exhibit: <span style={{ color: 'var(--status-cyan)', fontFamily: 'var(--font-mono)' }}>{caseStudy.batesLabel}</span>
              </p>
            </div>
          </div>

          {/* Zoom Controls & Tools */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-sm)',
              padding: '4px 8px',
              border: '1px solid var(--border-subtle)'
            }}>
              <button onClick={() => handleZoom(-25)} style={{ padding: '4px 8px', color: 'var(--text-primary)' }} title="Zoom Out">
                <ZoomOut size={16} />
              </button>
              <span style={{ fontSize: '12px', fontWeight: 700, minWidth: '48px', textAlign: 'center' }}>
                {zoomLevel}%
              </span>
              <button onClick={() => handleZoom(25)} style={{ padding: '4px 8px', color: 'var(--text-primary)' }} title="Zoom In">
                <ZoomIn size={16} />
              </button>
              <button onClick={resetViewport} style={{ padding: '4px 8px', color: 'var(--text-secondary)' }} title="Reset Viewport">
                <Maximize2 size={15} />
              </button>
            </div>

            {/* Bates Stamper Toggle */}
            <button
              onClick={() => setBatesStamped(!batesStamped)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                background: batesStamped ? 'var(--status-emerald-bg)' : 'var(--bg-surface)',
                border: batesStamped ? '1px solid var(--status-emerald-border)' : '1px solid var(--border-subtle)',
                color: batesStamped ? 'var(--status-emerald)' : 'var(--text-secondary)',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Stamp size={14} />
              <span>{batesStamped ? 'Bates Stamps: ON' : 'Bates Stamps: OFF'}</span>
            </button>

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
        </div>

        {/* Studio Canvas Area (Infinite Pan / Zoom) */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            flex: 1,
            position: 'relative',
            background: 'var(--bg-app)',
            overflow: 'hidden',
            cursor: isDragging ? 'grabbing' : 'grab',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Document Sheet */}
          <div
            style={{
              width: '720px',
              minHeight: '960px',
              background: '#ffffff',
              color: '#0f172a',
              borderRadius: 'var(--radius-xs)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.45)',
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel / 100})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform var(--duration-fast) var(--ease-spring-smooth)',
              padding: '48px',
              fontFamily: "'Courier Prime', 'Courier New', monospace",
              position: 'relative',
              userSelect: 'none'
            }}
          >
            {/* Bates Courtroom Stamp Header */}
            {batesStamped && (
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '24px',
                padding: '4px 10px',
                border: '2px solid #dc2626',
                borderRadius: '4px',
                color: '#dc2626',
                fontWeight: 800,
                fontSize: '11px',
                letterSpacing: '1px',
                transform: 'rotate(-2deg)'
              }}>
                [ EXHIBIT A-1 ] • BATES: {caseStudy.batesLabel}-P1
              </div>
            )}

            {/* Document Header */}
            <div style={{ borderBottom: '2px solid #0f172a', paddingBottom: '16px', marginBottom: '24px' }}>
              <div style={{ fontSize: '16px', fontWeight: 800 }}>ST. JUDE REGIONAL MEDICAL CENTER</div>
              <div style={{ fontSize: '11px', color: '#475569' }}>Department of Surgery & Inpatient Telemetry Logs</div>
              <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px' }}>
                PATIENT MRN: 8819204 • DOB: 1954-04-12 • DOS: 2026-08-18
              </div>
            </div>

            {/* Document Body */}
            <div style={{ fontSize: '12px', lineHeight: 1.8 }}>
              <p><strong>ATTENDING CLINICAL NARRATIVE:</strong></p>
              <p style={{ marginTop: '8px' }}>
                Patient presented with acute physiological decompensation. Continuous arterial telemetry initiated via left radial line at 01:15.
              </p>

              {/* Highlighted Bounding Box 1 */}
              <div style={{
                marginTop: '12px',
                marginBottom: '12px',
                padding: '12px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '2px dashed #059669',
                borderRadius: '4px'
              }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#047857', display: 'block', marginBottom: '4px' }}>
                  [ AI ANNOTATION: CLINICAL PROOF ANCHOR ]
                </span>
                "{caseStudy.clinicalProof}"
              </div>

              <p style={{ marginTop: '16px' }}>
                <strong>STATUTORY COMPLIANCE CITATION:</strong><br />
                Under {caseStudy.legalBasis}, patient satisfies all inpatient level-of-care criteria. All step-therapy prerequisites fulfilled.
              </p>

              <p style={{ marginTop: '24px' }}>
                <strong>OPERATIVE DETAILS & SURGICAL PATHOLOGY:</strong><br />
                Multi-level decompression completed with continuous neuro-monitoring. Zero complications observed. Patient transferred to ICU.
              </p>
            </div>

            {/* Footer Signatures */}
            <div style={{ marginTop: '48px', paddingTop: '16px', borderTop: '1px solid #cbd5e1', fontSize: '11px', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
              <div>Signed electronically: Dr. Rajesh Patel, MD (NPI: 1841294810)</div>
              <div>Hour-0 Inpatient Order: 21:14 LOCK</div>
            </div>
          </div>

          {/* Floating Mini-Map Viewport Radar */}
          <div style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px',
            width: '160px',
            height: '210px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Eye size={12} />
              Mini-Map Radar
            </div>
            <div style={{
              flex: 1,
              background: 'var(--bg-surface-elevated)',
              borderRadius: 'var(--radius-xs)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Thumbnail representation */}
              <div style={{
                position: 'absolute',
                top: '20%',
                left: '15%',
                width: '70%',
                height: '60%',
                border: '1px solid var(--status-cyan)',
                background: 'var(--status-cyan-bg)'
              }} />
            </div>
          </div>
        </div>

        {/* Annotations Bar Footer */}
        <div style={{
          padding: '14px 24px',
          background: 'var(--bg-surface-elevated)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>Semantic Citation Deep-Linker:</span>
            <button
              onClick={() => { setZoomLevel(200); setPanOffset({ x: 0, y: 120 }); }}
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--status-emerald-bg)',
                color: 'var(--status-emerald)',
                border: '1px solid var(--status-emerald-border)',
                fontWeight: 700,
                fontSize: '11px'
              }}
            >
              🎯 Jump to Clinical Telemetry (Page 1 Line 8)
            </button>
            <button
              onClick={() => { setZoomLevel(150); setPanOffset({ x: 0, y: -180 }); }}
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--status-cyan-bg)',
                color: 'var(--status-cyan)',
                border: '1px solid var(--status-cyan-border)',
                fontWeight: 700,
                fontSize: '11px'
              }}
            >
              📜 Jump to Hour-0 Order (Page 1 Line 28)
            </button>
          </div>

          <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
            Bates Numbering Range: <span style={{ fontFamily: 'var(--font-mono)' }}>CG-0001 to CG-0084</span>
          </div>
        </div>
      </div>
    </div>
  );
};
