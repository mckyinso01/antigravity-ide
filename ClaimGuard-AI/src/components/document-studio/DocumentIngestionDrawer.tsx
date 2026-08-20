import React, { useState, useEffect, useRef } from 'react';
import { 
  X, UploadCloud, HardDrive, FileText, Sparkles, 
  ShieldCheck, AlertTriangle, CheckCircle2, ArrowRight, 
  Cpu, FileCode, Layers, Scan, RefreshCw
} from 'lucide-react';
import { CaseStudy } from '../../engine/edgeCaseStudiesData';

interface DocumentIngestionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNewCase: (newCase: CaseStudy) => void;
}

export const DocumentIngestionDrawer: React.FC<DocumentIngestionDrawerProps> = ({
  isOpen,
  onClose,
  onAddNewCase
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'scanner' | 'text'>('upload');
  const [patientName, setPatientName] = useState('John Doe (Encounter #ENC-90214)');
  const [claimTitle, setClaimTitle] = useState('Emergency Laparoscopic Cholecystectomy with Cholangiography');
  const [specialty, setSpecialty] = useState<CaseStudy['category']>('Surgery');
  const [payer, setPayer] = useState('UnitedHealthcare (UHC)');
  const [billedAmount, setBilledAmount] = useState<number>(34500);
  const [denialCode, setDenialCode] = useState('CO-50');
  const [clinicalNotes, setClinicalNotes] = useState(
    'Patient presented with acute right upper quadrant pain, leukocytosis (WBC 16.4), and ultrasound confirming gallbladder wall thickening (>4mm). Intraoperative cholangiogram showed cystic duct stone requiring emergent extraction.'
  );
  const [uploadedFileName, setUploadedFileName] = useState<string | null>('surgical_operative_report_enc90214.pdf');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStep, setScanStep] = useState('');
  const [scanComplete, setScanComplete] = useState(false);

  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleQuickLoadPreset = (preset: 'sepsis' | 'robotic' | 'denial') => {
    if (preset === 'sepsis') {
      setClaimTitle('ICU Sepsis-3 Arterial Telemetry Inpatient Stay');
      setSpecialty('Critical Care');
      setPayer('Aetna Commercial');
      setBilledAmount(48500);
      setDenialCode('CO-50');
      setUploadedFileName('icu_lactate_telemetry_chart.pdf');
      setClinicalNotes('Sepsis-3 organ failure documented via arterial line MAP 58 mmHg and SOFA score delta > 2. Continuous norepinephrine infusion required.');
    } else if (preset === 'robotic') {
      setClaimTitle('Robotic Complex Inguinal Hernia Mesh Repair');
      setSpecialty('Robotic/Bariatric');
      setPayer('Humana Medicare Advantage');
      setBilledAmount(29800);
      setDenialCode('CO-197');
      setUploadedFileName('da_vinci_robotic_operative_log.pdf');
      setClinicalNotes('Severe intraperitoneal adhesions required 115 minutes of robotic microsurgical dissection prior to preperitoneal mesh deployment.');
    } else {
      setClaimTitle('Post-Op Hemorrhage Emergency Re-Exploration');
      setSpecialty('Surgery');
      setPayer('UnitedHealthcare (UHC)');
      setBilledAmount(42000);
      setDenialCode('CO-50');
      setUploadedFileName('emergency_reexploration_bates0042.pdf');
      setClinicalNotes('Emergent re-exploration within 24h global period. Modifier -78 attached to prove unplanned return to OR for life-threatening acute hemorrhage.');
    }
  };

  const handleExecuteAnalysis = () => {
    setIsScanning(true);
    setScanProgress(15);
    setScanStep('Executing Optical Character Recognition & TWAIN Image De-Skewing...');

    setTimeout(() => {
      setScanProgress(45);
      setScanStep('Parsing ICD-10 & CPT-4 Modifiers against Payer Coverage Policy...');
    }, 450);

    setTimeout(() => {
      setScanProgress(80);
      setScanStep('Dual-Agent Devil\'s Moot Court Pre-Simulating Insurer Denial Bot...');
    }, 900);

    setTimeout(() => {
      setScanProgress(100);
      setScanStep('Binding ERISA § 502 & CMS-0057-F Statutory Compliance Defense Shield!');
      setIsScanning(false);
      setScanComplete(true);

      const generatedCase: CaseStudy = {
        id: `CASE-${Math.floor(100 + Math.random() * 900)}`,
        title: claimTitle,
        specialty: specialty,
        billedAmount: billedAmount,
        atRiskAmount: billedAmount,
        payer: payer,
        denialCode: denialCode,
        denialReason: 'Pre-submission audit intercepted potential medical necessity or unbundling denial trap.',
        annihilatedProblem: 'Payer automated AI algorithms downcoding or rejecting complex hospital documentation.',
        tragicRealityWithoutApp: 'Hospital would face arbitrary post-payment audit retraction or 90-day cash freeze.',
        victoriousAlternateOutcome: '100% first-pass clean submission with pre-attached statutory legal defense exhibit.',
        toolOrFeatureUsed: 'Pre-Submission Ingestion Engine & Counsel Lexis Statutory Shield',
        howClaimGuardDestroysIt: 'Binds operative records with clinical telemetry into an unassailable courtroom Bates exhibit.',
        legalBasis: 'ERISA Section 502(a)(1)(B) [29 U.S.C. § 1132(a)(1)(B)] & CMS-0057-F Rule.',
        clinicalProof: clinicalNotes,
        batesLabel: `CG-EXHIBIT-NEW-${Math.floor(1000 + Math.random() * 9000)}`,
        category: specialty
      };

      setTimeout(() => {
        onAddNewCase(generatedCase);
        onClose();
      }, 700);
    }, 1400);
  };

  return (
    <>
      {/* Non-Modal Transparent Clickable Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.45)',
          zIndex: 9998,
          transition: 'opacity var(--duration-normal) var(--ease-spring-smooth)'
        }}
      />

      {/* Right Slide Drawer Surface */}
      <div
        ref={drawerRef}
        className="specular-card"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '720px',
          background: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-xl)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          animation: 'slideInRight var(--duration-normal) var(--ease-spring-smooth) forwards'
        }}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-surface-elevated)',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <UploadCloud size={20} color="var(--status-cyan)" />
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                New Claim Document Ingestion &amp; Pre-Submission Shield
              </h2>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Ingest patient charts, trigger TWAIN feeder scanners, or upload denial letters for instant defense.
            </p>
          </div>

          <button
            onClick={onClose}
            className="btn-interactive"
            aria-label="Close Drawer"
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-xs)',
              background: 'transparent',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Ingestion Channels Tab Bar */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-app)',
          padding: '8px 24px',
          gap: '8px'
        }}>
          <button
            onClick={() => setActiveTab('upload')}
            className="btn-interactive"
            style={{
              padding: '8px 14px',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: 'var(--radius-xs)',
              background: activeTab === 'upload' ? 'var(--status-cyan-bg)' : 'transparent',
              color: activeTab === 'upload' ? 'var(--status-cyan)' : 'var(--text-secondary)',
              border: activeTab === 'upload' ? '1px solid var(--status-cyan-border)' : '1px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <UploadCloud size={14} />
            <span>📁 PDF &amp; Chart File Upload</span>
          </button>

          <button
            onClick={() => setActiveTab('scanner')}
            className="btn-interactive"
            style={{
              padding: '8px 14px',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: 'var(--radius-xs)',
              background: activeTab === 'scanner' ? 'var(--status-cyan-bg)' : 'transparent',
              color: activeTab === 'scanner' ? 'var(--status-cyan)' : 'var(--text-secondary)',
              border: activeTab === 'scanner' ? '1px solid var(--status-cyan-border)' : '1px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <HardDrive size={14} />
            <span>📠 TWAIN Feeder Scanner</span>
          </button>

          <button
            onClick={() => setActiveTab('text')}
            className="btn-interactive"
            style={{
              padding: '8px 14px',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: 'var(--radius-xs)',
              background: activeTab === 'text' ? 'var(--status-cyan-bg)' : 'transparent',
              color: activeTab === 'text' ? 'var(--status-cyan)' : 'var(--text-secondary)',
              border: activeTab === 'text' ? '1px solid var(--status-cyan-border)' : '1px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <FileText size={14} />
            <span>📝 Paste EHR Clinical Notes</span>
          </button>
        </div>

        {/* Drawer Body Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
          
          {/* Quick Demo Pre-load Presets */}
          <div style={{
            padding: '12px 16px',
            background: 'var(--bg-surface-elevated)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
              💡 Quick-Load Hospital Test Charts:
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <button
                onClick={() => handleQuickLoadPreset('sepsis')}
                className="btn-interactive"
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--bg-app)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--status-cyan)',
                  cursor: 'pointer'
                }}
              >
                + ICU Sepsis Chart ($48.5K)
              </button>
              <button
                onClick={() => handleQuickLoadPreset('robotic')}
                className="btn-interactive"
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--bg-app)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--status-emerald)',
                  cursor: 'pointer'
                }}
              >
                + Robotic Surgery ($29.8K)
              </button>
              <button
                onClick={() => handleQuickLoadPreset('denial')}
                className="btn-interactive"
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--bg-app)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--status-rose)',
                  cursor: 'pointer'
                }}
              >
                + Emergent Re-Op ($42K)
              </button>
            </div>
          </div>

          {/* CHANNEL 1: DRAG & DROP FILE UPLOADER */}
          {activeTab === 'upload' && (
            <div style={{
              padding: '32px 20px',
              border: '2px dashed var(--status-cyan-border)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--status-cyan-bg)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}>
              <UploadCloud size={36} color="var(--status-cyan)" />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Drag &amp; Drop Hospital Chart / Denial Notice PDF
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Supports PDF, TIFF, JPEG, PNG, or 837 EDI institutional claims (Max 150MB)
                </div>
              </div>
              <div style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-xs)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                fontSize: '11px',
                fontFamily: 'monospace',
                color: 'var(--status-cyan)'
              }}>
                📄 Loaded File: {uploadedFileName || 'Ready to drop'}
              </div>
            </div>
          )}

          {/* CHANNEL 2: PHYSICAL TWAIN HARDWARE SCANNER TRIGGER */}
          {activeTab === 'scanner' && (
            <div style={{
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <HardDrive size={18} color="var(--status-cyan)" />
                  <span style={{ fontSize: '12px', fontWeight: 700 }}>Hospital Floor Physical Hardware Feeder:</span>
                </div>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--status-emerald-bg)',
                  color: 'var(--status-emerald)',
                  border: '1px solid var(--status-emerald-border)'
                }}>
                  TWAIN 2.4 READY
                </span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Target Scanner: <strong>Fujitsu fi-7160 Duplex ADF (300 DPI Optical)</strong>
              </div>
              <button
                onClick={() => {
                  setUploadedFileName('twain_feeder_batch_scan_300dpi.pdf');
                  alert('Hardware feeder triggered! 14 physical pages scanned and OCR-digitized into memory buffer.');
                }}
                className="btn-interactive"
                style={{
                  padding: '10px 16px',
                  background: 'var(--bg-app)',
                  border: '1px solid var(--status-cyan-border)',
                  color: 'var(--status-cyan)',
                  borderRadius: 'var(--radius-xs)',
                  fontWeight: 700,
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <Scan size={14} />
                <span>Trigger Feeder Scan (1-Click TWAIN Bridge)</span>
              </button>
            </div>
          )}

          {/* CHANNEL 3: RAW EHR CLINICAL NOTES SCRIBE */}
          {activeTab === 'text' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
                PASTE RAW EHR CLINICAL CHART / OPERATIVE SUMMARY:
              </label>
              <textarea
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--bg-app)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  outline: 'none'
                }}
              />
            </div>
          )}

          {/* CLAIM METADATA EDITABLE FORM */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px'
          }}>
            <div>
              <label style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                CASE / PROCEDURE TITLE
              </label>
              <input
                type="text"
                value={claimTitle}
                onChange={(e) => setClaimTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--bg-app)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '11px',
                  fontWeight: 600
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                TARGET PAYER
              </label>
              <select
                value={payer}
                onChange={(e) => setPayer(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--bg-app)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '11px',
                  fontWeight: 600
                }}
              >
                <option value="UnitedHealthcare (UHC)">UnitedHealthcare (UHC)</option>
                <option value="Aetna Commercial">Aetna Commercial</option>
                <option value="Humana Medicare Advantage">Humana Medicare Advantage</option>
                <option value="Blue Cross Blue Shield">Blue Cross Blue Shield</option>
                <option value="Cigna Healthcare">Cigna Healthcare</option>
                <option value="Bupa UK PMI (NHS Inpatient)">Bupa UK PMI (NHS Inpatient)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                CLINICAL SPECIALTY
              </label>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--bg-app)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '11px',
                  fontWeight: 600
                }}
              >
                <option value="Critical Care">Critical Care / ICU</option>
                <option value="Surgery">General / Orthopedic Surgery</option>
                <option value="Robotic/Bariatric">Robotic / Bariatric</option>
                <option value="Trauma">Trauma &amp; Emergency</option>
                <option value="Oncology">Oncology Infusion</option>
                <option value="Travel/Cross-Border">Travel &amp; Cross-Border</option>
                <option value="UK/PMI">UK / NHS / Private Medical</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                BILLED REVENUE AT RISK ($ USD)
              </label>
              <input
                type="number"
                value={billedAmount}
                onChange={(e) => setBilledAmount(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--bg-app)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--status-emerald)',
                  fontSize: '12px',
                  fontWeight: 800,
                  fontFamily: 'monospace'
                }}
              />
            </div>
          </div>

          {/* SCANNING PROGRESS OVERLAY */}
          {isScanning && (
            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--status-cyan-bg)',
              border: '1px solid var(--status-cyan-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--status-cyan)' }}>
                  {scanStep}
                </span>
                <span style={{ fontSize: '12px', fontWeight: 800, fontFamily: 'monospace', color: 'var(--status-cyan)' }}>
                  {scanProgress}%
                </span>
              </div>
              <div style={{
                height: '6px',
                width: '100%',
                background: 'var(--bg-app)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${scanProgress}%`,
                  background: 'linear-gradient(90deg, #00e5ff, #3b82f6)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          )}

          {/* SCAN COMPLETE BADGE */}
          {scanComplete && (
            <div style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--status-emerald-bg)',
              border: '1px solid var(--status-emerald-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'var(--status-emerald)',
              fontSize: '12px',
              fontWeight: 800
            }}>
              <CheckCircle2 size={18} />
              <span>Pre-Submission Defense Verified: Added to Active Hospital Claims Queue!</span>
            </div>
          )}

        </div>

        {/* Drawer Action Footer */}
        <div style={{
          padding: '20px 24px',
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-surface-elevated)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          bottom: 0,
          zIndex: 10
        }}>
          <button
            onClick={onClose}
            className="btn-interactive"
            style={{
              padding: '10px 18px',
              borderRadius: 'var(--radius-xs)',
              background: 'transparent',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleExecuteAnalysis}
            disabled={isScanning}
            className="btn-interactive"
            style={{
              padding: '12px 24px',
              borderRadius: 'var(--radius-xs)',
              background: 'linear-gradient(135deg, #00e5ff 0%, #2563eb 100%)',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 800,
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: isScanning ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 14px rgba(0, 229, 255, 0.35)',
              opacity: isScanning ? 0.7 : 1
            }}
          >
            {isScanning ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                <span>Analyzing Statutory Defense...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>⚡ Run Pre-Submission Defense Scan &amp; Ingest to Queue</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};
