import React, { useState, useEffect } from 'react';
import { X, Send, Radio, CheckCircle2, ShieldCheck, FileCheck, RefreshCw } from 'lucide-react';
import { EFaxTelecomEngine, FaxTransmissionReceipt } from '../../engine/eFaxTelecomEngine';

interface EFaxDispatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EFaxDispatcherModal: React.FC<EFaxDispatcherModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [selectedPayer, setSelectedPayer] = useState('UnitedHealthcare Appeals');
  const [faxNumber, setFaxNumber] = useState('1-866-555-8819');
  const [isSending, setIsSending] = useState(false);
  const [receipt, setReceipt] = useState<FaxTransmissionReceipt | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSendFax = async () => {
    setIsSending(true);
    setReceipt(null);
    const res = await EFaxTelecomEngine.transmitAppealFax('CLM-8819', selectedPayer, faxNumber, 6);
    setIsSending(false);
    setReceipt(res);
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
        maxWidth: '560px',
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
              <Radio size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800 }}>HIPAA Inbound/Outbound e-Fax Gateway</h3>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                RightFax / eFax Enterprise API with RFC 3198 cryptographic tokens
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
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Target Insurance Payer Legal Fax Line:
            </label>
            <select
              value={selectedPayer}
              onChange={(e) => {
                setSelectedPayer(e.target.value);
                if (e.target.value.includes('UnitedHealthcare')) setFaxNumber('1-866-555-8819');
                if (e.target.value.includes('Aetna')) setFaxNumber('1-800-555-4421');
                if (e.target.value.includes('Cigna')) setFaxNumber('1-877-555-9933');
                if (e.target.value.includes('Humana')) setFaxNumber('1-888-555-1100');
                if (e.target.value.includes('BCBS')) setFaxNumber('1-855-555-7722');
              }}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                fontSize: '12px',
                fontWeight: 600
              }}
            >
              <option value="UnitedHealthcare Appeals">UnitedHealthcare Expedited Legal Appeals</option>
              <option value="Aetna Level-1 Appeals">Aetna Clinical Arbitration Unit</option>
              <option value="Cigna National Appeals">Cigna National Appeals Dispute Unit</option>
              <option value="Humana Pre-Submission">Humana Medicare Advantage Grievance Desk</option>
              <option value="BCBS Special Inquiries">Blue Cross Blue Shield Federal Plan Appeals</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Verified Statutory Telecom Fax Number:
            </label>
            <input
              type="text"
              value={faxNumber}
              onChange={(e) => setFaxNumber(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700
              }}
            />
          </div>

          {/* Legal Packet Summary */}
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            fontSize: '12px'
          }}>
            <div style={{ fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
              Attached Statutory Brief Packet (6 Pages):
            </div>
            <ul style={{ paddingLeft: '18px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li>Page 1: Formal CMS-0057-F Statutory Notice of Appeal</li>
              <li>Page 2: Full Clinical Necessity Statement & Sepsis-3 Telemetry</li>
              <li>Page 3: Bariatric Robotic Operative Report & da Vinci Logs</li>
              <li>Page 4: 90-Day Stability Attestation (Cross-Border Insurance)</li>
              <li>Page 5: ERISA § 502 Federal Circuit Precedent Citations</li>
              <li>Page 6: Cryptographic Provider Signature & NPI Certification</li>
            </ul>
          </div>

          {/* Receipt Banner */}
          {receipt && (
            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--status-emerald-bg)',
              border: '1px solid var(--status-emerald-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--status-emerald)', fontWeight: 800, fontSize: '13px' }}>
                <CheckCircle2 size={16} />
                <span>Statutory RFC 3198 Delivery Confirmed</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                Target: <strong>{receipt.recipientPayer}</strong> ({receipt.destinationFaxNumber})
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                Delivery Timestamp: {receipt.statutorySubmissionTimestamp} ({receipt.pagesSent} pages)
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--status-emerald)',
                background: 'rgba(0, 0, 0, 0.2)',
                padding: '6px 8px',
                borderRadius: 'var(--radius-xs)',
                wordBreak: 'break-all'
              }}>
                Proof Token: {receipt.cryptographicDeliveryToken}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
            <ShieldCheck size={14} color="var(--status-emerald)" />
            <span>HIPAA Safe Harbor & RFC 3198 Encrypted</span>
          </div>

          <button
            onClick={handleSendFax}
            disabled={isSending}
            style={{
              padding: '10px 18px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, var(--status-cyan), var(--status-indigo))',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              opacity: isSending ? 0.7 : 1
            }}
          >
            {isSending ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                <span>Transmitting via Carrier PRI...</span>
              </>
            ) : (
              <>
                <Send size={14} />
                <span>Transmit Legal Defense Brief via e-Fax</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
