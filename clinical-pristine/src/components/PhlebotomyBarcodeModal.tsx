import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Syringe, 
  Barcode, 
  CheckCircle2, 
  X, 
  FlaskConical,
  ArrowLeft,
  Check,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { db, type BedData } from '../db';
import { clinicalAudio } from '../utils/clinicalAudio';
import { DynamicPatientAvatar } from './DynamicPatientAvatar';

interface PhlebotomyBarcodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  bed: BedData | null;
}

interface SpecimenTube {
  testName: string;
  tubeType: string;
  tubeColor: string; // hex
  borderClass: string;
  bgClass: string;
  additive: string;
  volume: string;
  department: string;
}

export const PhlebotomyBarcodeModal: React.FC<PhlebotomyBarcodeModalProps> = ({
  isOpen,
  onClose,
  bed
}) => {
  const safety = bed?.patientSafety;
  const [collectedTests, setCollectedTests] = useState<string[]>([]);
  const [isLogged, setIsLogged] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      clinicalAudio.playDrawerSwoosh();
    }
  }, [isOpen]);

  if (!isOpen || !bed || !safety) return null;

  // Derive relevant specimen tubes based on pending orders and clinical conditions
  const tubes: SpecimenTube[] = [
    {
      testName: 'Cardiac Troponin-I & Chemistry Panel',
      tubeType: 'Gold Top (SST with Gel Separator)',
      tubeColor: '#EAB308',
      borderClass: 'border-yellow-400',
      bgClass: 'bg-yellow-50 text-yellow-800 border border-yellow-300',
      additive: 'Clot Activator & Polymer Gel',
      volume: '5.0 mL',
      department: 'Clinical Chemistry'
    },
    {
      testName: 'Complete Blood Count (CBC) & Diff',
      tubeType: 'Lavender / Purple Top (K2-EDTA)',
      tubeColor: '#A855F7',
      borderClass: 'border-purple-400',
      bgClass: 'bg-purple-50 text-purple-800 border border-purple-300',
      additive: 'K2-EDTA (Anticoagulant)',
      volume: '4.0 mL',
      department: 'Hematology'
    },
    {
      testName: 'Coagulation Profile (PT / INR & PTT)',
      tubeType: 'Light Blue Top (Sodium Citrate 3.2%)',
      tubeColor: '#0284C7',
      borderClass: 'border-sky-400',
      bgClass: 'bg-sky-50 text-sky-800 border border-sky-300',
      additive: 'Sodium Citrate (9:1 ratio)',
      volume: '2.7 mL',
      department: 'Special Coagulation'
    }
  ];

  const handleToggleCollect = (testName: string) => {
    setCollectedTests(prev => 
      prev.includes(testName) ? prev.filter(t => t !== testName) : [...prev, testName]
    );
  };

  const handleConfirmSentToLab = async () => {
    // Clear the pending blood draw order and mark as sent to lab
    const updatedOrders = (safety.pendingDoctorOrders || []).filter(o => !o.includes('Blood Draw') && !o.includes('Phlebotomy'));
    updatedOrders.push(`Blood Specimens Sent to Central Lab @ ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);

    await db.beds.update(bed.id, {
      patientSafety: {
        ...safety,
        bloodDrawScheduled: undefined,
        pendingDoctorOrders: updatedOrders
      }
    });

    clinicalAudio.playSuccessChime();
    setIsLogged(true);
    setTimeout(() => {
      setIsLogged(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[130] bg-slate-900/40 flex justify-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          onClick={(e) => e.stopPropagation()}
          className={`${
            isFullScreen ? 'w-full' : 'w-full max-w-xl md:max-w-2xl'
          } bg-white border-l-2 border-slate-700 h-full flex flex-col shadow-2xl text-slate-900 font-sans transition-all duration-300`}
        >
          {/* Drawer Header with Breadcrumb */}
          <div className="p-4 bg-slate-100 border-b-2 border-slate-300 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-200 border-2 border-slate-300 bg-white transition-colors flex items-center gap-1.5 text-xs font-mono font-black cursor-pointer"
                title="Return to Patient Chart"
              >
                <ArrowLeft size={16} /> Bay {bed.id}
              </button>
              <div className="w-px h-6 bg-slate-300" />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-slate-950 font-display">Phlebotomy Specimen Tubes</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 border-2 border-blue-300 text-blue-900 text-xs font-mono font-black">
                    LAB BARCODES
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-mono mt-0.5 font-bold">
                  Order-of-Draw &amp; 2D Barcode Label Dispenser • Bay {bed.id}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-2 text-slate-600 hover:text-slate-950 rounded-xl hover:bg-slate-200 border-2 border-slate-300 bg-white transition-colors cursor-pointer"
                title={isFullScreen ? "Restore Standard Drawer" : "Expand Full Screen"}
              >
                {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button 
                onClick={onClose}
                className="p-2 text-slate-600 hover:text-rose-700 rounded-xl hover:bg-rose-50 border-2 border-slate-300 bg-white transition-colors cursor-pointer"
                title="Close Drawer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {isLogged ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <CheckCircle2 size={64} className="text-emerald-600 animate-bounce" />
              <h3 className="text-2xl font-black text-slate-950 font-display">Specimens Dispatched to Central Lab!</h3>
              <p className="text-xs text-slate-700 font-mono max-w-md font-bold">
                Phlebotomy order for {bed.patientName} ({safety.mrn}) marked as collected and routed to Chemistry / Hematology.
              </p>
            </div>
          ) : (
            <div className="flex-1 p-6 space-y-5 overflow-y-auto custom-scrollbar text-sm bg-slate-50/50">
              {/* Patient Barcode Verification Card */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <DynamicPatientAvatar
                    photoUrl={safety.photoUrl}
                    patientName={bed.patientName}
                    bedId={bed.id}
                    size="md"
                    shape="circle"
                    acuity={bed.acuity === 'critical' ? 'critical' : 'stable'}
                    allowUpload={true}
                  />
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-mono block">Patient Specimen Label</span>
                    <div className="font-bold text-slate-900 text-base font-display mt-0.5">{bed.patientName}</div>
                    <div className="text-xs text-slate-500 font-mono mt-1">
                      MRN: <span className="text-blue-700 font-bold">{safety.mrn}</span> • Bay {bed.id}
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
                  <Barcode size={32} className="text-slate-700 mx-auto" />
                  <span className="text-[10px] text-slate-600 block mt-1 tracking-widest font-bold">{safety.mrn}</span>
                </div>
              </div>

              {/* Order of Draw Tubes List */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-700 uppercase font-mono flex items-center justify-between">
                  <span>MANDATORY CLINICAL ORDER-OF-DRAW (CLSI H3-A6)</span>
                  <span className="text-slate-500 font-normal">{collectedTests.length} of {tubes.length} Drawn</span>
                </div>

                {tubes.map((tube, idx) => {
                  const isDrawn = collectedTests.includes(tube.testName);
                  return (
                    <div 
                      key={idx}
                      onClick={() => handleToggleCollect(tube.testName)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isDrawn 
                          ? 'bg-white border-emerald-500 shadow-sm ring-1 ring-emerald-400' 
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Colored Tube Cap Indicator */}
                        <div 
                          className="w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-xs shadow-inner flex-shrink-0"
                          style={{ backgroundColor: `${tube.tubeColor}20`, borderColor: tube.tubeColor, color: tube.tubeColor }}
                        >
                          {idx + 1}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900 font-display truncate">{tube.testName}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono ${tube.bgClass}`}>
                              {tube.volume}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-mono mt-0.5">
                            {tube.tubeType} • Additive: {tube.additive}
                          </p>
                          <p className="text-[11px] text-slate-500 font-mono">
                            Routing: <strong className="text-slate-700">{tube.department}</strong>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                        <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                          isDrawn ? 'bg-emerald-600 border-emerald-600 text-white font-bold' : 'border-slate-300 bg-slate-50 text-transparent'
                        }`}>
                          <Check size={14} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Lab Phlebotomy Protocol Notice */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs font-mono text-slate-600 space-y-1.5 shadow-2xs">
                <div className="font-bold text-slate-900 uppercase flex items-center gap-1.5">
                  <FlaskConical size={14} className="text-blue-600" />
                  SPECIMEN REJECTION PREVENTION PROTOCOL:
                </div>
                <p>• Gently invert tubes 8-10 times immediately after collection (do not shake).</p>
                <p>• Affix printed 2D barcode labels lengthwise along the tube, leaving a clear view of the blood volume window.</p>
              </div>
            </div>
          )}

          {/* Sticky Bottom Action Footer */}
          {!isLogged && (
            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={handleConfirmSentToLab}
                disabled={collectedTests.length === 0}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <Syringe size={16} /> Confirm {collectedTests.length} Tubes Collected &amp; Route to Lab
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
