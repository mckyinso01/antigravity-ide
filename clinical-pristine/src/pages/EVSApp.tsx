import { useState, useEffect, memo } from 'react';
import { useToast } from '../contexts/ToastContext';
import { 
  Sparkles, 
  Users, 
  Clock, 
  CheckCircle2, 
  Plus, 
  ShieldCheck, 
  Zap, 
  Play
} from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type EVSTask } from '../db';
import { clinicalAudio } from '../utils/clinicalAudio';
import { StaffDirectory } from './StaffDirectory';
import { EvsBedsideVerifyModal } from '../components/EvsBedsideVerifyModal';

export const EVSApp = memo(() => {
  const { showToast } = useToast();
  const tasks = useLiveQuery(() => db.evsTasks.toArray(), []) || [];

  const [activeTab, setActiveTab] = useState<'staff' | 'evs'>('staff');
  const [activeTimerSeconds, setActiveTimerSeconds] = useState(0);
  const [verifyingTask, setVerifyingTask] = useState<EVSTask | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimerSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  const handleStartTask = async (task: EVSTask) => {
    try {
      await db.evsTasks.update(task.id, {
        status: 'in-progress',
        assignedTo: 'Maria S. (Clean Team 1)',
        startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      clinicalAudio.playDrawerSwoosh();
      showToast(`Started terminal disinfection for ${task.room} (${task.bedId})`, 'info');
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerifiedRelease = async (data: { scannedQr: string; disinfectantLot: string; evsBadgePin: string }) => {
    if (!verifyingTask) return;
    try {
      await db.evsTasks.update(verifyingTask.id, {
        status: 'completed',
        cleaningDurationSeconds: activeTimerSeconds
      });

      if (verifyingTask.bedId) {
        await db.beds.update(verifyingTask.bedId, {
          status: 'empty',
          acuity: 'none',
          evsStatus: 'completed',
          patientName: undefined,
          patientSafety: undefined
        });
      }

      clinicalAudio.playSuccessChime();
      showToast(`✨ ${verifyingTask.bedId || verifyingTask.room} physically verified (${data.scannedQr}) with lot ${data.disinfectantLot}! Bed is VACANT.`, 'success');
      setVerifyingTask(null);
    } catch (err) {
      console.error(err);
      showToast('Failed to complete verification.', 'error');
    }
  };

  const handleAutoDispatch = async () => {
    if (pendingTasks.length === 0) {
      showToast('No pending disinfection tasks in queue.', 'info');
      return;
    }

    for (const t of pendingTasks.slice(0, 2)) {
      await db.evsTasks.update(t.id, {
        status: 'in-progress',
        assignedTo: 'Autonomous UV-C Disinfection Robot'
      });
    }

    clinicalAudio.playSuccessChime();
    showToast('Autonomous UV-C Decontamination Units Dispatched!', 'success');
  };

  const handleAddSampleClean = async () => {
    const newId = `EVS-${Date.now().toString().slice(-4)}`;
    await db.evsTasks.add({
      id: newId,
      room: 'ICU Resuscitation Suite 101',
      bedId: 'B-11',
      floorNumber: 1,
      priority: 'stat',
      status: 'pending',
      isolationType: 'airborne',
      dischargeReason: 'STAT Disinfection & Terminal Quaternary Clean',
      ppeRequired: ['N95 Respirator', 'Fluid Gown', 'Gloves'],
      chemicalProtocol: 'Terminal UV-C Purge & Bleach Wipe',
      requestTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      elapsedMinutes: 0
    });
    showToast(`Added STAT Disinfection Task ${newId}`, 'info');
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F4F5F7]">
      {/* TOP TAB NAV BAR */}
      <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-300">
            <button
              onClick={() => { setActiveTab('staff'); clinicalAudio.playDrawerSwoosh(); }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'staff'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users size={15} />
              <span>Personnel Directory &amp; Telemetry</span>
            </button>

            <button
              onClick={() => { setActiveTab('evs'); clinicalAudio.playDrawerSwoosh(); }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'evs'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles size={15} />
              <span>EVS Sanitization Tasks</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800">
                {pendingTasks.length + inProgressTasks.length}
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === 'evs' && (
            <>
              <button 
                onClick={handleAutoDispatch}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold shadow-2xs transition-all cursor-pointer border border-slate-300"
              >
                <Zap size={14} className="text-blue-600" /> Auto-Dispatch Units
              </button>

              <button 
                onClick={handleAddSampleClean}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                <Plus size={14} /> New EVS Task
              </button>
            </>
          )}

          {/* USER AVATAR */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              SV
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">Sarah Vance, RN</span>
              <span className="text-[10px] text-slate-500 font-medium">Charge Nurse</span>
            </div>
          </div>
        </div>
      </header>

      {/* BODY CONTENT */}
      {activeTab === 'staff' ? (
        <StaffDirectory />
      ) : (
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 custom-scrollbar">
          
          {/* TOP STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 block">Pending Cleaning Queue</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-amber-600 font-sans">{pendingTasks.length}</span>
                  <span className="text-xs text-slate-400 font-medium">Bays Queued</span>
                </div>
              </div>
              <span className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
                <Clock size={20} />
              </span>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 block">Active Decontaminations</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-blue-600 font-sans">{inProgressTasks.length}</span>
                  <span className="text-xs text-blue-600 font-bold">In-Progress</span>
                </div>
              </div>
              <span className="p-2.5 rounded-xl bg-blue-50 text-blue-700">
                <Sparkles size={20} />
              </span>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 block">Terminal Cleans Completed</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-emerald-700 font-sans">{completedTasks.length}</span>
                  <span className="text-xs text-emerald-700 font-bold">Passed UV-C Assay</span>
                </div>
              </div>
              <span className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800">
                <ShieldCheck size={20} />
              </span>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 block">Average Turnaround Time</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-slate-900 font-sans">18.4</span>
                  <span className="text-xs text-slate-400 font-medium">Minutes / Bay</span>
                </div>
              </div>
              <span className="p-2.5 rounded-xl bg-purple-50 text-purple-700">
                <Zap size={20} />
              </span>
            </div>

          </div>

          {/* 3-COLUMN WORKFLOW BOARD */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
            
            {/* 1. PENDING QUEUE */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  Pending EVS Request Queue ({pendingTasks.length})
                </span>
              </div>

              <div className="space-y-3">
                {pendingTasks.map(task => (
                  <div key={task.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{task.room}</span>
                        <span className="text-[11px] font-mono text-slate-500 font-semibold">{task.bedId || 'Entire Suite'}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        task.priority === 'stat' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1">
                      <p className="font-medium text-slate-800">{task.dischargeReason}</p>
                      <p className="text-[11px] text-slate-500">Protocol: <span className="font-semibold text-slate-700">{task.chemicalProtocol}</span></p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-[10px] text-slate-400 font-medium">Requested: {task.requestTime}</span>
                      <button 
                        onClick={() => handleStartTask(task)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Play size={12} fill="white" /> Start Cleaning
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. IN-PROGRESS ACTIVE CLEANS */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                  Active Decontaminations ({inProgressTasks.length})
                </span>
              </div>

              <div className="space-y-3">
                {inProgressTasks.map(task => (
                  <div key={task.id} className="bg-white rounded-2xl p-4 border border-blue-200 shadow-xs flex flex-col gap-3 ring-1 ring-blue-500/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{task.room}</span>
                        <span className="text-[11px] font-mono text-blue-700 font-bold">{task.bedId || 'Suite'}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 animate-pulse">
                        In Progress
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-blue-900">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold">{task.assignedTo || 'Specialist Maria S.'}</span>
                        <span className="font-mono text-[10px] font-bold text-blue-700">Elapsed: 8m</span>
                      </div>
                      <span className="text-[11px] block text-blue-800">{task.chemicalProtocol}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-[10px] text-slate-400 font-medium">Started: {task.startedAt || 'Recently'}</span>
                      <button 
                        onClick={() => setVerifyingTask(task)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                      >
                        <CheckCircle2 size={14} />
                        <span>Bedside QR Verify &amp; Release</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. VERIFIED TERMINAL CLEANS & LOGS */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Completed &amp; Released ({completedTasks.length})
                </span>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col gap-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">EVS Staff Deployment Status</span>
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                    <span className="font-semibold text-slate-800">Clean Team 1 (Maria S.)</span>
                    <span className="text-blue-600 font-bold">Cleaning ICU Bay 101</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                    <span className="font-semibold text-slate-800">Autonomous UV-C Bot 1</span>
                    <span className="text-emerald-700 font-bold">UV-C Purging B-17</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                    <span className="font-semibold text-slate-800">Unit Bravo (Carlos R.)</span>
                    <span className="text-slate-500 font-medium">Standby in Supply Station</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800 mt-4 flex items-center gap-2">
                  <Sparkles size={16} className="text-blue-600 shrink-0" />
                  <span>Next automated UV-C surface sweep scheduled in <strong>24 minutes</strong>.</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* Bedside Physical QR / Chemical Lot Verification Modal Gate */}
      <EvsBedsideVerifyModal
        isOpen={!!verifyingTask}
        onClose={() => setVerifyingTask(null)}
        task={verifyingTask}
        onVerifiedRelease={handleVerifiedRelease}
      />
    </div>
  );
});
