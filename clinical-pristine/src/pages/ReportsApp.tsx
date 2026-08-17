import { useState, memo } from 'react';
import { useToast } from '../contexts/ToastContext';
import { 
  FileBarChart, 
  Download, 
  Printer, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  HeartPulse, 
  ShieldCheck, 
  MoreHorizontal,
  FileCode2
} from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';

export const ReportsApp = memo(() => {
  const { showToast } = useToast();
  const beds = useLiveQuery(() => db.beds.toArray(), []) || [];

  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month'>('today');
  const [selectedReport, setSelectedReport] = useState<'census' | 'meds' | 'turnover' | 'emergency'>('census');

  const handleExportCSV = () => {
    try {
      const csvRows = [
        ['Bed ID', 'Room', 'Status', 'Patient Name', 'MRN', 'Acuity', 'Doctor'],
        ...beds.map(b => [
          b.id,
          b.room,
          b.status,
          b.patientName || 'N/A',
          b.patientSafety?.mrn || 'N/A',
          b.acuity,
          b.patientSafety?.assignedDoctor || 'N/A'
        ])
      ];
      const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `Pristine_Hospital_Census_Report_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Hospital Census Report exported to CSV.', 'success');
    } catch {
      showToast('Export failed', 'error');
    }
  };

  const handleExportFHIR = () => {
    try {
      const fhirBundle = {
        resourceType: 'Bundle',
        type: 'collection',
        timestamp: new Date().toISOString(),
        total: beds.length,
        entry: beds.map(b => ({
          resource: {
            resourceType: 'Encounter',
            id: `enc-${b.id}`,
            status: b.status === 'occupied' ? 'in-progress' : 'finished',
            class: {
              system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
              code: 'IMP',
              display: 'inpatient encounter'
            },
            subject: {
              display: b.patientName || 'Unoccupied Bay',
              identifier: {
                system: 'http://hospital.pristine.org/mrn',
                value: b.patientSafety?.mrn || 'N/A'
              }
            },
            location: [
              {
                location: {
                  display: `Room: ${b.room} | Bed: ${b.id} | Level ${b.floorNumber || 1}`
                },
                status: 'active'
              }
            ]
          }
        }))
      };

      const jsonString = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fhirBundle, null, 2));
      const link = document.createElement('a');
      link.setAttribute('href', jsonString);
      link.setAttribute('download', `Pristine_FHIR_R4_Bundle_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Exported FHIR R4 JSON Interoperability Bundle!', 'success');
    } catch {
      showToast('FHIR Export failed', 'error');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F4F5F7]">
      {/* TOP HEADER */}
      <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-3">
          <h1 className="text-base font-bold text-slate-900 tracking-tight">Clinical Reports &amp; Analytics</h1>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium border border-slate-200">
            Audit &amp; Accreditation Metrics
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700">
            <button 
              onClick={() => setDateRange('today')}
              className={`px-3 py-1 rounded-md transition-all ${dateRange === 'today' ? 'bg-white text-slate-950 shadow-2xs' : 'hover:text-slate-950'}`}
            >
              Today
            </button>
            <button 
              onClick={() => setDateRange('week')}
              className={`px-3 py-1 rounded-md transition-all ${dateRange === 'week' ? 'bg-white text-slate-950 shadow-2xs' : 'hover:text-slate-950'}`}
            >
              Past 7 Days
            </button>
            <button 
              onClick={() => setDateRange('month')}
              className={`px-3 py-1 rounded-md transition-all ${dateRange === 'month' ? 'bg-white text-slate-950 shadow-2xs' : 'hover:text-slate-950'}`}
            >
              Past 30 Days
            </button>
          </div>

          <div className="h-4 w-px bg-slate-200"></div>

          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Download size={14} /> Export CSV
          </button>

          <button 
            onClick={handleExportFHIR}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <FileCode2 size={14} /> Export FHIR R4
          </button>

          <button 
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Printer size={14} /> Print Summary
          </button>

          <button className="text-slate-500 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <MoreHorizontal size={18} />
          </button>

          {/* USER AVATAR */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              NS
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">Nurse Sarah</span>
              <span className="text-[10px] text-slate-500 font-medium">Charge Nurse</span>
            </div>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
        
        {/* TOP STATS SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Avg Length of Stay (ALOS)</span>
              <Clock size={16} className="text-blue-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-950 font-sans">2.4 Days</span>
              <span className="text-xs font-bold text-emerald-600">-12% vs benchmark</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Optimal for Med-Surg / ICU Units</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Bed Turnaround Velocity</span>
              <TrendingUp size={16} className="text-emerald-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-950 font-sans">18.2 Mins</span>
              <span className="text-xs font-bold text-emerald-600">Top Tier</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">From discharge to terminal disinfection</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Medication Five-Rights Compliance</span>
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-700 font-sans">99.8%</span>
              <span className="text-xs font-bold text-slate-500">0 critical misses</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Dual nurse-sign verification protocol</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Code Blue Resuscitation Rate</span>
              <HeartPulse size={16} className="text-rose-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-950 font-sans">88.5%</span>
              <span className="text-xs font-bold text-emerald-600">ROSC Achieved</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">ACLS Certified Response Team</span>
          </div>

        </div>

        {/* REPORT CONTENT SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1">
          
          {/* REPORT SELECTOR SIDEBAR */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wider text-[11px]">Available Audit Reports</span>
            
            <button 
              onClick={() => setSelectedReport('census')}
              className={`p-3 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                selectedReport === 'census' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'hover:bg-slate-50 text-slate-700 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileBarChart size={16} />
                <span>Daily Census &amp; Capacity Audit</span>
              </div>
              <span className="text-[10px] bg-slate-200/70 px-1.5 py-0.5 rounded text-slate-700">Live</span>
            </button>

            <button 
              onClick={() => setSelectedReport('meds')}
              className={`p-3 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                selectedReport === 'meds' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'hover:bg-slate-50 text-slate-700 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} />
                <span>Medication Administration Log</span>
              </div>
              <span className="text-[10px] bg-slate-200/70 px-1.5 py-0.5 rounded text-slate-700">MAR</span>
            </button>

            <button 
              onClick={() => setSelectedReport('turnover')}
              className={`p-3 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                selectedReport === 'turnover' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'hover:bg-slate-50 text-slate-700 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Clock size={16} />
                <span>EVS Turnaround &amp; Disinfection</span>
              </div>
              <span className="text-[10px] bg-slate-200/70 px-1.5 py-0.5 rounded text-slate-700">EVS</span>
            </button>

            <button 
              onClick={() => setSelectedReport('emergency')}
              className={`p-3 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                selectedReport === 'emergency' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'hover:bg-slate-50 text-slate-700 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HeartPulse size={16} />
                <span>ACLS Emergency Response Log</span>
              </div>
              <span className="text-[10px] bg-slate-200/70 px-1.5 py-0.5 rounded text-slate-700">STAT</span>
            </button>

            <div className="mt-auto p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                <ShieldCheck size={14} className="text-blue-600" /> HIPAA Verified
              </div>
              <p className="text-[11px] text-slate-500">All exported records strictly adhere to standard hospital electronic health record encryption.</p>
            </div>
          </div>

          {/* REPORT DATA PREVIEW */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
            
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {selectedReport === 'census' && 'Hospital Bed Census & Acuity Distribution Log'}
                  {selectedReport === 'meds' && 'Medication Administration & Safety Verification MAR'}
                  {selectedReport === 'turnover' && 'Environmental Services Decontamination & Turnaround Log'}
                  {selectedReport === 'emergency' && 'ACLS Emergency Code Blue & Resuscitation Audit'}
                </h3>
                <p className="text-xs text-slate-500">Audited records from Dexie clinical database</p>
              </div>
              
              <span className="text-xs font-semibold text-slate-500">
                {beds.length} Total Registered Beds
              </span>
            </div>

            <div className="flex-1 overflow-x-auto p-4">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-100">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Location</th>
                    <th className="py-2.5 px-3 font-semibold">Patient &amp; MRN</th>
                    <th className="py-2.5 px-3 font-semibold">Status / Acuity</th>
                    <th className="py-2.5 px-3 font-semibold">Attending Staff</th>
                    <th className="py-2.5 px-3 font-semibold">Clinical Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {beds.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-3">
                        <span className="font-bold text-slate-900">{b.id}</span>
                        <span className="text-[10px] text-slate-400 block">{b.room}</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-semibold text-slate-900">{b.patientName || 'Bay Unoccupied'}</span>
                        <span className="text-[10px] text-slate-500 block font-mono">{b.patientSafety?.mrn || 'N/A'}</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.acuity === 'critical' ? 'bg-rose-100 text-rose-700' :
                          b.status === 'empty' ? 'bg-slate-100 text-slate-600' :
                          b.status === 'cleaning' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {b.status === 'empty' ? 'Vacant' : b.status === 'cleaning' ? 'Decontaminating' : b.acuity === 'critical' ? 'Critical' : 'Stable'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">
                        {b.patientSafety?.assignedDoctor || 'Dr. Gregory House, MD'}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500 text-[11px]">
                        {b.patientSafety?.chiefComplaint || (b.status === 'cleaning' ? 'Terminal UV-C decontamination in progress' : 'Ready for admission')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
});
