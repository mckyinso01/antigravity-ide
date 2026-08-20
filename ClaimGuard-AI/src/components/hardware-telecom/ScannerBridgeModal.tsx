import React, { useState, useEffect } from 'react';
import { X, Printer, RefreshCw, CheckCircle2, FileText, ArrowRight, HardDrive } from 'lucide-react';
import { ScannerBridgeEngine, ScannerDeviceInfo, ScanJobResult } from '../../engine/scannerBridgeEngine';

interface ScannerBridgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScannerBridgeModal: React.FC<ScannerBridgeModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const scanners: ScannerDeviceInfo[] = ScannerBridgeEngine.listAvailableScanners();
  const [selectedScannerId, setSelectedScannerId] = useState(scanners[0].deviceId);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanJobResult | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleStartScan = async () => {
    setIsScanning(true);
    setScanResult(null);
    const res = await ScannerBridgeEngine.triggerHardwareScan(selectedScannerId, 8);
    setIsScanning(false);
    setScanResult(res);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 80,
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
        maxWidth: '580px',
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
        {/* Sticky Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-surface-elevated)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--status-cyan-bg)',
              color: 'var(--status-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <HardDrive size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800 }}>TWAIN / WIA Hardware Feeder Bridge</h3>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Direct physical scanner driver bridge for hospital floor intake
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-xs)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Detected Floor Paper Feeders (TWAIN 2.4 & WIA 2.0 Drivers):
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {scanners.map((s) => (
                <div
                  key={s.deviceId}
                  onClick={() => setSelectedScannerId(s.deviceId)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: selectedScannerId === s.deviceId ? 'var(--status-cyan-bg)' : 'var(--bg-surface-elevated)',
                    border: selectedScannerId === s.deviceId ? '1px solid var(--status-cyan)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all var(--duration-fast) var(--ease-spring-smooth)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Printer size={18} color={selectedScannerId === s.deviceId ? 'var(--status-cyan)' : 'var(--text-muted)'} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '12px' }}>{s.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        Driver: {s.driverType} • {s.resolutionDpi} DPI Duplex • Status: <span style={{ color: 'var(--status-emerald)' }}>{s.status}</span>
                      </div>
                    </div>
                  </div>
                  {selectedScannerId === s.deviceId && (
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--status-cyan)' }}>
                      SELECTED
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Scanner Optical Parameters */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            fontSize: '11px'
          }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Resolution:</span>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>300 DPI Duplex</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Color Depth:</span>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>24-Bit Bitonal OCR</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Feeder Mode:</span>
              <div style={{ fontWeight: 700, color: 'var(--status-emerald)' }}>Auto-Deskew Active</div>
            </div>
          </div>

          {/* Scan Results Card */}
          {scanResult && (
            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--status-emerald-bg)',
              border: '1px solid var(--status-emerald-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--status-emerald)', fontWeight: 800, fontSize: '13px' }}>
                <CheckCircle2 size={16} />
                <span>Duplex Hardware Scan & OCR Ingestion Complete</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                Job ID: <strong>{scanResult.jobId}</strong> • Pages: {scanResult.pagesScanned} • OCR Confidence: <strong>{scanResult.ocrConfidence}%</strong>
              </div>
              <div style={{
                background: 'rgba(0, 0, 0, 0.25)',
                padding: '10px',
                borderRadius: 'var(--radius-xs)',
                fontSize: '11px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)'
              }}>
                Bates Start Stamp: {scanResult.batesStartNumber} • Scanned At: {scanResult.scannedAt}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-surface-elevated)'
        }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Hardware protocol: <strong>TWAIN DSM 2.4.0</strong>
          </div>

          <button
            onClick={handleStartScan}
            disabled={isScanning}
            style={{
              padding: '10px 18px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, var(--status-cyan), var(--status-emerald))',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              opacity: isScanning ? 0.7 : 1
            }}
          >
            {isScanning ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                <span>Feeding Paper Feeder...</span>
              </>
            ) : (
              <>
                <Printer size={14} />
                <span>Trigger Floor Scanner Feeder</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
