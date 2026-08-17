import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  ShieldAlert, 
  Flame, 
  CheckCircle2
} from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import { useEmergency } from '../../contexts/EmergencyContext';

interface SecurityAlertsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ClinicalAlert {
  id: string;
  type: 'code-blue' | 'fall-risk' | 'telemetry-alert' | 'isolation-breach' | 'equipment';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  location: string;
  timestamp: string;
  acknowledged: boolean;
}

const INITIAL_ALERTS: ClinicalAlert[] = [
  {
    id: 'ALT-101',
    type: 'fall-risk',
    severity: 'warning',
    title: 'Bed Exit Sensor Triggered — High Fall Risk',
    location: 'Room 100 • Bed B-100',
    timestamp: '08:42 AM',
    acknowledged: false
  },
  {
    id: 'ALT-102',
    type: 'telemetry-alert',
    severity: 'critical',
    title: 'SpO2 Desaturation (<89%) & Tachycardia Alert',
    location: 'Room 100 • Bed B-100',
    timestamp: '08:40 AM',
    acknowledged: false
  },
  {
    id: 'ALT-103',
    type: 'isolation-breach',
    severity: 'warning',
    title: 'C. Diff Colitis Room Access Alert — PPE Required',
    location: 'Room 101 • Bed B-102',
    timestamp: '08:15 AM',
    acknowledged: true
  }
];

export const SecurityAlertsDrawer: React.FC<SecurityAlertsDrawerProps> = ({
  isOpen,
  onClose
}) => {
  const { showToast } = useToast();
  const { isCodeBlue, triggerCodeBlue, standDownCodeBlue } = useEmergency();
  const [alerts, setAlerts] = useState<ClinicalAlert[]>(INITIAL_ALERTS);

  const handleAcknowledge = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
    showToast('Alert acknowledged and logged to clinical audit trail', 'info');
  };

  if (!isOpen) return null;

  return (
    <motion.aside
      initial={{ x: '100%', opacity: 0.7 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0.7 }}
      transition={{ duration: 0.13, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-0 top-0 bottom-0 w-[440px] max-w-[90vw] bg-white border-l border-slate-200 shadow-2xl z-40 flex flex-col font-sans"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/90 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
            <ShieldAlert size={18} />
          </div>
          <div>
            <h2 className="font-bold text-sm text-slate-900 leading-tight">Security & Clinical Alarms</h2>
            <p className="text-[11px] text-slate-500 font-mono">Real-Time Patient Safety Feed</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          title="Close Drawer (Esc)"
        >
          <X size={18} />
        </button>
      </div>

      {/* Emergency Code Blue Broadcast Banner */}
      <div className="p-3 bg-rose-50 border-b border-rose-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame size={18} className="text-rose-600 animate-pulse shrink-0" />
          <div>
            <div className="text-xs font-bold text-rose-900">HOSPITAL CODE BLUE SYSTEM</div>
            <div className="text-[10px] text-rose-700 font-mono">
              Status: {isCodeBlue ? 'ACTIVE EMERGENCY RESUSCITATION' : 'STANDBY READY'}
            </div>
          </div>
        </div>

        <button
          onClick={() => isCodeBlue ? standDownCodeBlue() : triggerCodeBlue('Emergency Alarm Panel')}
          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer font-mono ${
            isCodeBlue
              ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
              : 'bg-white hover:bg-rose-100 text-rose-700 border border-rose-300'
          }`}
        >
          {isCodeBlue ? 'Stand Down' : 'Trigger Stat'}
        </button>
      </div>

      {/* Alerts Feed */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {alerts.map(alert => {
          const isCrit = alert.severity === 'critical';

          return (
            <div
              key={alert.id}
              className={`p-3 rounded-xl border transition-all ${
                isCrit 
                  ? 'bg-rose-50/60 border-rose-200 shadow-2xs' 
                  : alert.acknowledged
                  ? 'bg-slate-50 border-slate-200 opacity-80'
                  : 'bg-amber-50/50 border-amber-200 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isCrit ? 'bg-rose-500 animate-ping' : 'bg-amber-500'}`} />
                  <span className="font-bold text-xs font-mono text-slate-900">{alert.id}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">{alert.timestamp}</span>
              </div>

              <div className="font-bold text-xs text-slate-800 mb-1">{alert.title}</div>
              <div className="text-[11px] text-slate-600 font-mono mb-2">{alert.location}</div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                {alert.acknowledged ? (
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 size={11} /> Acknowledged by Clinical Team
                  </span>
                ) : (
                  <button
                    onClick={() => handleAcknowledge(alert.id)}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[10px] font-bold shadow-2xs cursor-pointer"
                  >
                    Acknowledge Alert
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.aside>
  );
};
