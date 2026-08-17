import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  User, 
  Bed, 
  Sparkles, 
  ArrowRight, 
  Command, 
  UserPlus, 
  Radio, 
  ShieldAlert, 
  FileSpreadsheet, 
  Building2, 
  Keyboard,
  Settings
} from 'lucide-react';
import { db } from '../db';
import { clinicalAudio } from '../utils/clinicalAudio';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBed: (bedId: string, roomName: string) => void;
  onOpenAdmission: () => void;
  onToggleCodeBlue: () => void;
  onOpenEvac: () => void;
  onOpenAcls: () => void;
  onOpenFacility: () => void;
  onOpenShortcuts: () => void;
  onOpenSettings?: () => void;
  isCodeBlue?: boolean;
}

interface SearchItem {
  id: string;
  category: 'Patient' | 'Bed' | 'Action' | 'Clinical Order';
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onSelectBed,
  onOpenAdmission,
  onToggleCodeBlue,
  onOpenEvac,
  onOpenAcls,
  onOpenFacility,
  onOpenShortcuts,
  onOpenSettings,
  isCodeBlue = false
}) => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      clinicalAudio.playDrawerSwoosh();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchSearchData = async () => {
      const allBeds = await db.beds.toArray();
      const allRooms = await db.rooms.toArray();
      const searchList: SearchItem[] = [];

      // 1. Quick Clinical Actions
      searchList.push({
        id: 'action-admit',
        category: 'Action',
        title: 'New Patient Intake & Triage Admission',
        subtitle: 'Admit an inbound ER / trauma patient into an open bay (Alt+A)',
        badge: 'INTAKE',
        badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
        icon: <UserPlus size={18} className="text-blue-600" />,
        action: () => {
          onClose();
          onOpenAdmission();
        }
      });

      searchList.push({
        id: 'action-code-blue',
        category: 'Action',
        title: isCodeBlue ? 'Deactivate Code Blue Emergency' : 'Broadcast STAT Ward Code Blue Alarm',
        subtitle: isCodeBlue ? 'Return ward to standard operational state' : 'Trigger hospital-wide cardiac arrest strobe & audio sirens (Alt+C)',
        badge: isCodeBlue ? 'STAND DOWN' : 'STAT ALARM',
        badgeColor: isCodeBlue ? 'text-slate-700 bg-slate-100 border-slate-300' : 'text-rose-700 bg-rose-50 border-rose-200',
        icon: <Radio size={18} className={isCodeBlue ? 'text-slate-600' : 'text-rose-600 animate-pulse'} />,
        action: () => {
          onClose();
          onToggleCodeBlue();
        }
      });

      searchList.push({
        id: 'action-evac',
        category: 'Action',
        title: 'Evacuation Blueprint Scanner',
        subtitle: 'Scan and digitize architectural ward plans (Alt+E)',
        badge: 'SCANNER',
        badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        icon: <ShieldAlert size={18} className="text-emerald-600" />,
        action: () => {
          onClose();
          onOpenEvac();
        }
      });

      searchList.push({
        id: 'action-acls',
        category: 'Action',
        title: 'ACLS Resuscitation Debrief Logs',
        subtitle: 'View timestamped CPR and code event audit trail',
        badge: 'AUDIT',
        badgeColor: 'text-rose-700 bg-rose-50 border-rose-200',
        icon: <FileSpreadsheet size={18} className="text-rose-600" />,
        action: () => {
          onClose();
          onOpenAcls();
        }
      });

      searchList.push({
        id: 'action-facility',
        category: 'Action',
        title: 'Facility Provisioning & Reset Wizard',
        subtitle: 'Customize ward dimensions, beds, and purge baseline (Gate 21)',
        badge: 'CONFIG',
        badgeColor: 'text-purple-700 bg-purple-50 border-purple-200',
        icon: <Building2 size={18} className="text-purple-600" />,
        action: () => {
          onClose();
          onOpenFacility();
        }
      });

      searchList.push({
        id: 'action-shortcuts',
        category: 'Action',
        title: 'ER Keyboard Command Deck',
        subtitle: 'View all keyboard shortcuts and rapid hotkeys (?)',
        badge: 'HOTKEYS',
        badgeColor: 'text-cyan-700 bg-cyan-50 border-cyan-200',
        icon: <Keyboard size={18} className="text-cyan-600" />,
        action: () => {
          onClose();
          onOpenShortcuts();
        }
      });

      if (onOpenSettings) {
        searchList.push({
          id: 'action-settings',
          category: 'Action',
          title: 'System Settings & AI Rules Engine',
          subtitle: 'Configure isolation SLA, EVS dispatch weights, and account profile',
          badge: 'SETTINGS',
          badgeColor: 'text-slate-700 bg-slate-100 border-slate-200',
          icon: <Settings size={18} className="text-slate-600" />,
          action: () => {
            onClose();
            onOpenSettings();
          }
        });
      }

      // 2. Active Patients
      allBeds.filter(b => b.status === 'occupied' && b.patientName).forEach(bed => {
        const safety = bed.patientSafety;
        searchList.push({
          id: `patient-${bed.id}`,
          category: 'Patient',
          title: bed.patientName || 'Unknown Patient',
          subtitle: `${bed.id} (${bed.room}) • ${safety?.chiefComplaint || 'Occupied Bay'} • ${safety?.mrn || ''}`,
          badge: safety?.triageLevel === 1 ? 'ESI L1 CRITICAL' : safety?.triageLevel === 2 ? 'ESI L2 EMERGENT' : 'STABLE',
          badgeColor: safety?.triageLevel && safety.triageLevel <= 2 ? 'text-rose-700 bg-rose-50 border-rose-200' : 'text-blue-700 bg-blue-50 border-blue-200',
          icon: <User size={18} className="text-blue-600" />,
          action: () => {
            onClose();
            onSelectBed(bed.id, bed.room);
          }
        });
      });

      // 3. Beds & Rooms
      allBeds.forEach(bed => {
        const room = allRooms.find(r => r.name === bed.room);
        searchList.push({
          id: `bed-${bed.id}`,
          category: 'Bed',
          title: `Hospital Bay ${bed.id}`,
          subtitle: `${bed.room} • ${room?.department || 'Department'} • Status: ${bed.status.toUpperCase()}`,
          badge: bed.status.toUpperCase(),
          badgeColor: bed.status === 'occupied' ? 'text-blue-700 bg-blue-50 border-blue-200' : bed.status === 'cleaning' ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-emerald-700 bg-emerald-50 border-emerald-200',
          icon: <Bed size={18} className="text-slate-600" />,
          action: () => {
            onClose();
            onSelectBed(bed.id, bed.room);
          }
        });
      });

      // 4. Clinical Orders / Active Telemetry
      allBeds.filter(b => b.patientSafety?.pendingDoctorOrders?.length).forEach(bed => {
        bed.patientSafety?.pendingDoctorOrders?.forEach((order, idx) => {
          searchList.push({
            id: `order-${bed.id}-${idx}`,
            category: 'Clinical Order',
            title: order,
            subtitle: `Target: ${bed.patientName} (${bed.id}) • Stat MD Directive`,
            badge: 'ORDER',
            badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
            icon: <Sparkles size={18} className="text-amber-600" />,
            action: () => {
              onClose();
              onSelectBed(bed.id, bed.room);
            }
          });
        });
      });

      // Filter by query
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const filtered = searchList.filter(item => 
          item.title.toLowerCase().includes(q) || 
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
        setItems(filtered);
      } else {
        setItems(searchList);
      }
    };

    if (isOpen) {
      fetchSearchData();
    }
  }, [isOpen, query, isCodeBlue, onClose, onSelectBed, onOpenAdmission, onToggleCodeBlue, onOpenEvac, onOpenAcls, onOpenFacility, onOpenShortcuts]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < items.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : items.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (items[selectedIndex]) {
        items[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[150] bg-slate-900/40 flex items-start justify-center pt-24 px-4 font-sans"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.15 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-white border-2 border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans text-slate-900"
        >
          {/* Spotlight Search Header */}
          <div className="p-4 bg-slate-100 border-b-2 border-slate-300 flex items-center gap-3">
            <Search size={20} className="text-slate-600 font-bold" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search patient name, MRN, bed bay, doctor order, or command..."
              className="flex-1 bg-transparent border-none outline-none text-slate-950 text-base font-black placeholder:text-slate-500 font-sans"
            />
            <div className="flex items-center gap-1.5 text-xs font-mono font-black text-slate-700 bg-white border-2 border-slate-300 px-2 py-1 rounded-lg shadow-xs">
              <Command size={12} /> K
            </div>
          </div>

          {/* Results List */}
          <div className="max-h-[420px] overflow-y-auto custom-scrollbar p-2 space-y-1 bg-slate-50">
            {items.length === 0 ? (
              <div className="py-12 text-center text-slate-600 font-mono text-sm font-bold">
                No matching patients, beds, or clinical commands found for "{query}".
              </div>
            ) : (
              items.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => item.action()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-blue-100 border-2 border-blue-400 shadow-sm text-slate-950' 
                        : 'text-slate-800 hover:bg-slate-200/70 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-white border-2 border-slate-300 flex items-center justify-center flex-shrink-0 shadow-xs font-black">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-slate-950 truncate font-display">{item.title}</span>
                          {item.badge && (
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border-2 font-mono ${item.badgeColor || 'text-slate-900 bg-slate-200 border-slate-400'}`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 truncate mt-0.5 font-mono font-bold">{item.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                      <span className="text-[10px] font-mono text-slate-600 uppercase font-black">{item.category}</span>
                      <ArrowRight size={14} className={isSelected ? 'text-blue-700 font-black' : 'text-slate-400'} />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Guide */}
          <div className="p-3 bg-slate-100 border-t-2 border-slate-300 flex items-center justify-between text-xs text-slate-700 font-mono font-bold">
            <div className="flex items-center gap-3">
              <span><kbd className="px-1.5 py-0.5 bg-white rounded-md border-2 border-slate-300 text-slate-950 font-black shadow-xs">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white rounded-md border-2 border-slate-300 text-slate-950 font-black shadow-xs">↓</kbd> Navigate</span>
              <span><kbd className="px-1.5 py-0.5 bg-white rounded-md border-2 border-slate-300 text-slate-950 font-black shadow-xs">Enter</kbd> Select</span>
              <span><kbd className="px-1.5 py-0.5 bg-white rounded-md border-2 border-slate-300 text-slate-950 font-black shadow-xs">Esc</kbd> Close</span>
            </div>
            <span className="text-blue-800 font-black flex items-center gap-1">
              <Sparkles size={13} className="text-blue-700" /> Spotlight Quick Jump
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
