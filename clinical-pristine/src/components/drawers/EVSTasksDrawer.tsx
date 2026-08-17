import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ShieldCheck
} from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type EVSTask } from '../../db';
import { useToast } from '../../contexts/ToastContext';

interface EVSTasksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EVSTasksDrawer: React.FC<EVSTasksDrawerProps> = ({
  isOpen,
  onClose
}) => {
  const { showToast } = useToast();
  const tasks = useLiveQuery(() => db.evsTasks.toArray(), []) || [];
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');

  const filteredTasks = tasks.filter(t => {
    if (filter !== 'all' && t.status !== filter) return false;
    return true;
  });

  const handleStartTask = async (task: EVSTask) => {
    await db.evsTasks.update(task.id, { 
      status: 'in-progress',
      assignedTo: 'Active Responder'
    });
    showToast(`Started disinfection for ${task.bedId || task.room} (${task.room})`, 'info');
  };

  const handleCompleteTask = async (task: EVSTask) => {
    await db.evsTasks.update(task.id, { status: 'completed' });
    // Update the corresponding bed in Dexie to empty/sanitized
    if (task.bedId) {
      const bed = await db.beds.get(task.bedId);
      if (bed) {
        await db.beds.update(task.bedId, {
          status: 'empty',
          acuity: 'none',
          evsStatus: undefined,
          tat: undefined
        });
      }
    }
    showToast(`Disinfection completed! Bed ${task.bedId || task.room} is now Clean & Ready.`, 'success');
  };

  if (!isOpen) return null;

  return (
    <motion.aside
      initial={{ x: '100%', opacity: 0.7 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0.7 }}
      transition={{ duration: 0.13, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-0 top-0 bottom-0 w-[440px] max-w-[90vw] bg-white border-l-2 border-slate-700 shadow-2xl z-40 flex flex-col font-sans text-slate-900"
    >
      {/* Header */}
      <div className="p-4 border-b-2 border-slate-300 bg-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white text-amber-700 flex items-center justify-center border-2 border-slate-300 shadow-xs font-black">
            <Sparkles size={18} />
          </div>
          <div>
            <h2 className="font-black text-sm text-slate-950 leading-tight">EVS Field App &amp; Sanitization</h2>
            <p className="text-[11px] text-slate-600 font-mono font-bold">Terminal Cleaning &amp; Biohazard TAT</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-950 border-2 border-slate-300 bg-white transition-colors cursor-pointer"
          title="Close Drawer (Esc)"
        >
          <X size={18} />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-2.5 bg-slate-50 border-b-2 border-slate-200 text-xs font-bold">
        {[
          { id: 'all', label: 'All Tasks' },
          { id: 'pending', label: 'Pending / STAT' },
          { id: 'in-progress', label: 'In-Progress' },
          { id: 'completed', label: 'Done' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-3 py-1 rounded-xl border-2 transition-all cursor-pointer text-[11px] font-black ${
              filter === tab.id
                ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300 hover:border-slate-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs font-bold">
            <ShieldCheck size={36} className="mx-auto mb-2 text-emerald-600" />
            <p className="font-black text-slate-950 text-sm">All Wards Clean &amp; Sanitized</p>
            <p className="text-[11px] text-slate-600 mt-1">No pending disinfection tasks in the current queue.</p>
          </div>
        ) : (
          filteredTasks.map(task => {
            const isStat = task.priority === 'stat';
            const isUrgent = task.priority === 'urgent';
            const isDone = task.status === 'completed';
            const isInProgress = task.status === 'in-progress';

            return (
              <div
                key={task.id}
                className={`p-3.5 rounded-2xl border-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                  isStat
                    ? 'bg-rose-50 border-rose-300'
                    : isUrgent
                    ? 'bg-amber-50 border-amber-300'
                    : 'bg-white border-slate-300'
                }`}
              >
                {/* Top Info */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs font-mono text-slate-950">{task.bedId}</span>
                    <span className="text-[10px] text-slate-800 font-mono px-2 py-0.5 rounded-md bg-white border-2 border-slate-300 font-bold">
                      {task.room}
                    </span>
                  </div>

                  <div>
                    {isStat ? (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-rose-200 text-rose-950 border-2 border-rose-400 animate-pulse">
                        STAT DISINFECTION
                      </span>
                    ) : isUrgent ? (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-200 text-amber-950 border-2 border-amber-400">
                        URGENT
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-slate-200 text-slate-900 border-2 border-slate-400">
                        ROUTINE
                      </span>
                    )}
                  </div>
                </div>

                {/* Protocol */}
                {task.dischargeReason && (
                  <div className="text-xs text-slate-900 mb-2 font-bold">
                    {task.dischargeReason}
                  </div>
                )}

                {task.chemicalProtocol && (
                  <div className="p-2.5 rounded-xl bg-white border-2 border-slate-300 text-[10px] font-mono text-slate-900 mb-2">
                    <div className="text-slate-600 font-black mb-0.5">CHEMICAL PROTOCOL:</div>
                    <div className="font-bold">{task.chemicalProtocol}</div>
                  </div>
                )}

                {/* PPE Badges */}
                {task.ppeRequired && task.ppeRequired.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2.5">
                    {task.ppeRequired.map((ppe, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-white text-slate-800 text-[10px] font-mono font-bold border-2 border-slate-300 flex items-center gap-1">
                        <ShieldCheck size={11} className="text-emerald-700" /> {ppe}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t-2 border-slate-200">
                  <div className="text-[11px] text-slate-700 font-mono font-bold flex items-center gap-1">
                    <Clock size={12} /> {task.requestTime}
                  </div>

                  {isDone ? (
                    <span className="text-xs text-emerald-700 font-black flex items-center gap-1">
                      <CheckCircle2 size={14} /> Cleaned &amp; Released
                    </span>
                  ) : isInProgress ? (
                    <button
                      onClick={() => handleCompleteTask(task)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center gap-1 border-2 border-emerald-700 shadow-xs cursor-pointer uppercase"
                    >
                      <CheckCircle2 size={14} /> Complete Disinfection
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStartTask(task)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black flex items-center gap-1 border-2 border-blue-700 shadow-xs cursor-pointer uppercase"
                    >
                      Start Task
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </motion.aside>
  );
};
