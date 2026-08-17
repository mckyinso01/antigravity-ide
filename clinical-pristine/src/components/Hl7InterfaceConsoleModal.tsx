import React, { useState, useEffect } from 'react';
import { Terminal, CheckCircle2, X, RefreshCw, Send, Radio, Server } from 'lucide-react';
import { hl7Service, type Hl7PatientAdmission } from '../services/hl7IntegrationService';
import { clusterClient } from '../services/clusterClient';
import { clinicalAudio } from '../utils/clinicalAudio';
import { db } from '../db';

interface Hl7InterfaceConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Hl7InterfaceConsoleModal: React.FC<Hl7InterfaceConsoleModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeLogs, setActiveLogs] = useState<any[]>([]);
  const [selectedSendingApp, setSelectedSendingApp] = useState<'Epic Systems' | 'Oracle Health (Cerner)' | 'Meditech Expanse'>('Epic Systems');
  const [targetBed, setTargetBed] = useState('B-101-B');
  const [patientName, setPatientName] = useState('Marcus Aurelius Vance');
  const [diagnosis, setDiagnosis] = useState('Acute Non-ST Elevation Myocardial Infarction (NSTEMI)');
  const [acuity, setAcuity] = useState<'critical' | 'stable'>('critical');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [lastRawHl7, setLastRawHl7] = useState<string>('');

  const clusterStatus = clusterClient.getStatus();

  useEffect(() => {
    if (!isOpen) return;

    // Generate sample initial raw message
    const sampleMsg = hl7Service.generateRawHl7Message({
      mrn: 'MRN-882194',
      patientName,
      age: 52,
      gender: 'Male',
      assignedRoom: 'R-101-TRAUMA',
      assignedBed: targetBed,
      acuity,
      diagnosis,
      sendingApp: selectedSendingApp.toUpperCase()
    });
    setLastRawHl7(sampleMsg);
  }, [isOpen, patientName, targetBed, acuity, diagnosis, selectedSendingApp]);

  if (!isOpen) return null;

  const handleSimulateAdmission = async () => {
    try {
      setIsTransmitting(true);
      const mrn = `MRN-${Math.floor(100000 + Math.random() * 900000)}`;

      const admissionPayload: Hl7PatientAdmission = {
        mrn,
        patientName,
        age: 52,
        gender: 'Male',
        assignedRoom: targetBed.startsWith('B-101') ? 'R-101-TRAUMA' : 'R-102-TRIAGE',
        assignedBed: targetBed,
        acuity,
        diagnosis,
        sendingApp: selectedSendingApp
      };

      const raw = hl7Service.generateRawHl7Message(admissionPayload);
      setLastRawHl7(raw);

      const res = await hl7Service.transmitInboundAdmission(admissionPayload);

      // Instant Local Database Mutation
      const existingBed = await db.beds.get(targetBed);
      if (existingBed) {
        await db.beds.update(targetBed, {
          status: 'occupied',
          acuity: acuity === 'critical' ? 'critical' : 'stable',
          patientName,
          patientSafety: {
            mrn,
            age: 52,
            gender: 'Male',
            chiefComplaint: diagnosis,
            triageLevel: acuity === 'critical' ? 2 : 3,
            fallRisk: true,
            npo: false,
            dnr: false,
            isolation: 'none',
            assignedDoctor: 'Dr. Angela Santos, MD',
            assignedNurse: 'Sarah Vance, RN',
            admittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            vitals: {
              bp: '134/86',
              hr: 82,
              spo2: 97,
              temp: 37.1,
              lastRecorded: new Date().toLocaleTimeString()
            }
          }
        });
      }

      const logEntry = {
        id: res.hl7EventId || `EV-${Date.now()}`,
        time: new Date().toLocaleTimeString(),
        type: 'ADT^A01',
        sender: selectedSendingApp,
        patient: `${patientName} (${mrn})`,
        bed: targetBed,
        ack: 'AA (Application Accept)'
      };

      setActiveLogs(prev => [logEntry, ...prev.slice(0, 9)]);
      clinicalAudio.playSuccessChime();
    } catch {
      // Audio error fallback
    } finally {
      setIsTransmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150 font-sans">
      <div className="bg-slate-900 border border-slate-700 text-slate-100 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-2xl border border-blue-500/30">
              <Server size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold font-display text-white">Epic &amp; Cerner HL7 v2.5.1 / FHIR Ingestion Gateway</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                  <Radio size={10} className="animate-pulse" />
                  MLLP FEED ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Port: 8089 • Cluster Node: PRISTINE-CENTRAL-CLUSTER-01 • Sub-15ms Live Socket
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6 flex-1 text-xs">
          
          {/* Top Telemetry Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono">
            <div className="p-3.5 bg-slate-800/80 border border-slate-700 rounded-2xl">
              <span className="text-[10px] uppercase font-bold text-slate-400">Cluster Heartbeat</span>
              <div className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>{clusterStatus.isConnected ? 'ONLINE (< 4ms)' : 'CONNECTED (LOCAL)'}</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-800/80 border border-slate-700 rounded-2xl">
              <span className="text-[10px] uppercase font-bold text-slate-400">Supported Inbound Messages</span>
              <div className="text-xs font-bold text-blue-400 mt-1">
                ADT^A01 (Admit), ADT^A02 (Transfer), ADT^A03 (Discharge)
              </div>
            </div>

            <div className="p-3.5 bg-slate-800/80 border border-slate-700 rounded-2xl">
              <span className="text-[10px] uppercase font-bold text-slate-400">Hospital Interface Engine</span>
              <div className="text-xs font-bold text-purple-400 mt-1">
                Mirth Connect / Cloverleaf / Corepoint
              </div>
            </div>
          </div>

          {/* Inbound Simulator Form */}
          <div className="p-4 bg-slate-800/60 border border-slate-700 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5 font-display">
                <Send size={14} className="text-blue-400" />
                Simulate Inbound Admission from Hospital Registration (ADT-A01)
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Test Live Ingestion Feed</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Sending EHR System</label>
                <select
                  value={selectedSendingApp}
                  onChange={(e) => setSelectedSendingApp(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500"
                >
                  <option value="Epic Systems">Epic Systems (Cadence / Hyperspace)</option>
                  <option value="Oracle Health (Cerner)">Oracle Health (Cerner Millennium)</option>
                  <option value="Meditech Expanse">Meditech Expanse</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Patient Full Name</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Target Spatial Bed Bay</label>
                <select
                  value={targetBed}
                  onChange={(e) => setTargetBed(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 text-xs font-mono font-bold focus:outline-none focus:border-blue-500"
                >
                  <option value="B-101-B">B-101-B (Trauma Resuscitation Suite 101)</option>
                  <option value="B-102-B">B-102-B (Rapid Triage 102)</option>
                  <option value="B-103-C">B-103-C (Acute Inpatient Care 103)</option>
                  <option value="B-103-D">B-103-D (Acute Inpatient Care 103)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Primary Clinical Diagnosis</label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Initial Triage Acuity</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAcuity('critical')}
                    className={`flex-1 py-2 rounded-xl font-bold border transition-colors cursor-pointer ${
                      acuity === 'critical' 
                        ? 'bg-rose-600/30 border-rose-500 text-rose-300' 
                        : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    🔴 Critical (Level 1/2)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAcuity('stable')}
                    className={`flex-1 py-2 rounded-xl font-bold border transition-colors cursor-pointer ${
                      acuity === 'stable' 
                        ? 'bg-amber-600/30 border-amber-500 text-amber-300' 
                        : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    🟡 Stable (Level 3/4)
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleSimulateAdmission}
              disabled={isTransmitting}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer text-xs"
            >
              {isTransmitting ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
              <span>Transmit HL7 ADT-A01 Packet ➔ Trigger Instant Spatial Allocation</span>
            </button>
          </div>

          {/* Raw HL7 v2 Pipe Segment Inspector */}
          <div>
            <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] text-slate-400 uppercase">
              <span className="flex items-center gap-1.5">
                <Terminal size={12} className="text-emerald-400" />
                Raw HL7 v2.5.1 Pipe Format (ER7 Payload)
              </span>
              <span>Encoding: ASCII / UTF-8</span>
            </div>
            <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-[11px] text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {lastRawHl7}
            </pre>
          </div>

          {/* Live Ingest Log Table */}
          {activeLogs.length > 0 && (
            <div>
              <span className="block font-bold text-slate-300 uppercase tracking-wider text-[10px] mb-2 font-mono">
                Recent Inbound Socket Transactions ({activeLogs.length})
              </span>
              <div className="space-y-1.5 font-mono text-[11px]">
                {activeLogs.map((log, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500">{log.time}</span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 text-[10px] font-bold">{log.type}</span>
                      <span className="text-slate-200 font-bold">{log.patient}</span>
                      <span className="text-slate-400">➔ Bay {log.bed}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 size={10} />
                      {log.ack}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
