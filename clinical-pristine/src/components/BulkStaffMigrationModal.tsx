import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Users 
} from 'lucide-react';
import { db, type StaffMember } from '../db';
import { useToast } from '../contexts/ToastContext';
import { clinicalAudio } from '../utils/clinicalAudio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete?: (count: number) => void;
}

interface ParsedStaffRow {
  fullName: string;
  employeeId: string;
  role: 'nurse' | 'doctor' | 'admin' | 'evs' | 'respiratory' | 'pharmacy';
  jobTitle: string;
  department: string;
  age?: number;
  sex?: 'Male' | 'Female' | 'Other';
  mobileNumber?: string;
  homeAddress?: string;
  licenseNumber?: string;
  shiftStatus?: 'on-duty' | 'on-call' | 'break' | 'off-duty';
  photoUrl?: string;
  assignedFloor?: number;
}

export const BulkStaffMigrationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onImportComplete
}) => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [rawFileName, setRawFileName] = useState<string | null>(null);
  const [parsedRows, setParsedRows] = useState<ParsedStaffRow[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [importMode, setImportMode] = useState<'append' | 'replace'>('append');

  if (!isOpen) return null;

  // Sample CSV Template Generator
  const handleDownloadTemplate = () => {
    const csvContent = 
`fullName,employeeId,role,jobTitle,department,age,sex,mobileNumber,homeAddress,licenseNumber,shiftStatus,photoUrl,assignedFloor
"Dr. Elizabeth Thorne, MD","EMP-10492","doctor","Attending Trauma Surgeon","Emergency & Trauma Resuscitation",44,"Female","+1 (555) 902-1142","142 Beacon St, Boston, MA","MD-8492041","on-duty","https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",1
"Nurse Marcus Vance, BSN","EMP-20841","nurse","Lead Resuscitation RN","Cardiac & Intensive Care (ICU/CCU)",36,"Male","+1 (555) 819-2041","88 Commonwealth Ave, Boston, MA","RN-9204812","on-duty","https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",3
"Dr. Jonathan Miller, MD","EMP-10511","doctor","Chief of Surgery","Operating Theaters & PACU",52,"Male","+1 (555) 741-9031","12 Marlborough St, Boston, MA","MD-7102941","on-call","https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80",2
"Nurse Chloe Rivera, RN","EMP-20993","nurse","Inpatient Staff Nurse","Internal Medicine & Step-Down",29,"Female","+1 (555) 630-1928","45 Boylston St, Boston, MA","RN-8192039","on-duty","https://images.unsplash.com/photo-1594824813590-78965a14bc77?w=150&auto=format&fit=crop&q=80",5
"Carlos Mendez","EMP-50122","evs","Lead Biohazard & UV-C Specialist","Environmental Services (EVS)",41,"Male","+1 (555) 521-8899","72 Tremont St, Boston, MA","EVS-CERT-4102","on-duty","https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",1
"Dr. Rachel Kim, PharmD","EMP-40182","pharmacy","Clinical Pharmacist Lead","Central Hospital Pharmacy",38,"Female","+1 (555) 412-7788","31 Newbury St, Boston, MA","RPH-4910284","on-duty","https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",17
"David Chen, RRT","EMP-30419","respiratory","Critical Care Respiratory Therapist","Neonatal & Pediatric Intensive Care",33,"Male","+1 (555) 309-6655","19 Huntington Ave, Boston, MA","RRT-391029","break","https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",10`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Pristine_Hospital_Staff_Roster_Template.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded Hospital Staff CSV Template', 'info');
  };

  // CSV / JSON File Parser
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setRawFileName(file.name);
    setIsProcessing(true);
    setValidationErrors([]);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (file.name.endsWith('.json')) {
          parseJSON(text);
        } else {
          parseCSV(text);
        }
      } catch (err: any) {
        setValidationErrors([`File parse error: ${err.message || 'Malformed file format'}`]);
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsText(file);
  };

  // CSV Line Parser with Quoted Field Handling
  const parseCSV = (csvText: string) => {
    const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) {
      setValidationErrors(['CSV file must have a header row and at least one data row.']);
      return;
    }

    const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase().replace(/[^a-z0-9]/g, ''));
    const rows: ParsedStaffRow[] = [];
    const errors: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      if (values.length === 0 || values.every(v => !v.trim())) continue;

      const rowObj: any = {};
      headers.forEach((header, idx) => {
        rowObj[header] = values[idx]?.trim() || '';
      });

      // Map flexible column names
      const fullName = rowObj.fullname || rowObj.name || rowObj.employee || rowObj.staffname || `Staff Member ${i}`;
      const employeeId = rowObj.employeeid || rowObj.empid || rowObj.id || `EMP-${90000 + i}`;
      const roleRaw = (rowObj.role || 'nurse').toLowerCase();
      const role = (['nurse', 'doctor', 'admin', 'evs', 'respiratory', 'pharmacy'].includes(roleRaw) ? roleRaw : 'nurse') as any;
      const jobTitle = rowObj.jobtitle || rowObj.title || rowObj.position || (role === 'doctor' ? 'Attending Physician' : 'Staff Nurse');
      const department = rowObj.department || rowObj.dept || rowObj.unit || 'Emergency & Trauma Resuscitation';
      const age = parseInt(rowObj.age, 10) || 35;
      const sexRaw = (rowObj.sex || rowObj.gender || 'Female').toLowerCase();
      const sex = sexRaw.startsWith('m') ? 'Male' : sexRaw.startsWith('f') ? 'Female' : 'Other';
      const mobileNumber = rowObj.mobilenumber || rowObj.mobile || rowObj.phone || rowObj.contact || '+1 (555) 000-0000';
      const homeAddress = rowObj.homeaddress || rowObj.address || rowObj.location || 'Hospital Residence, Metro Area';
      const licenseNumber = rowObj.licensenumber || rowObj.license || rowObj.lic || `LIC-${Math.floor(100000 + Math.random() * 900000)}`;
      const shiftStatus = (rowObj.shiftstatus || rowObj.shift || rowObj.status || 'on-duty').toLowerCase() as any;
      const photoUrl = rowObj.photourl || rowObj.photo || rowObj.avatar || rowObj.image || undefined;
      const assignedFloor = parseInt(rowObj.assignedfloor || rowObj.floor || '1', 10) || 1;

      rows.push({
        fullName,
        employeeId,
        role,
        jobTitle,
        department,
        age,
        sex,
        mobileNumber,
        homeAddress,
        licenseNumber,
        shiftStatus: ['on-duty', 'on-call', 'break', 'off-duty'].includes(shiftStatus) ? shiftStatus : 'on-duty',
        photoUrl,
        assignedFloor
      });
    }

    if (rows.length === 0) {
      errors.push('No valid employee records could be extracted from this CSV.');
    }

    setParsedRows(rows);
    setValidationErrors(errors);
    clinicalAudio.playDrawerSwoosh();
  };

  const parseCSVLine = (text: string): string[] => {
    const result: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') {
        inQuotes = !inQuotes;
      } else if (c === ',' && !inQuotes) {
        result.push(cur);
        cur = '';
      } else {
        cur += c;
      }
    }
    result.push(cur);
    return result;
  };

  const parseJSON = (jsonText: string) => {
    const data = JSON.parse(jsonText);
    const arr = Array.isArray(data) ? data : data.staff || data.employees || [data];
    const rows: ParsedStaffRow[] = arr.map((item: any, idx: number) => ({
      fullName: item.fullName || item.name || `Staff ${idx + 1}`,
      employeeId: item.employeeId || item.id || `EMP-${90000 + idx}`,
      role: (['nurse', 'doctor', 'admin', 'evs', 'respiratory', 'pharmacy'].includes(item.role?.toLowerCase()) ? item.role.toLowerCase() : 'nurse'),
      jobTitle: item.jobTitle || item.title || 'Staff Nurse',
      department: item.department || 'Emergency',
      age: item.age || 35,
      sex: item.sex || item.gender || 'Female',
      mobileNumber: item.mobileNumber || item.phone || '+1 (555) 000-0000',
      homeAddress: item.homeAddress || item.address || 'Hospital Staff Housing',
      licenseNumber: item.licenseNumber || `LIC-${Math.floor(100000 + Math.random() * 900000)}`,
      shiftStatus: item.shiftStatus || 'on-duty',
      photoUrl: item.photoUrl,
      assignedFloor: item.assignedFloor || 1
    }));

    setParsedRows(rows);
  };

  // Commit to Dexie Database
  const handleExecuteImport = async () => {
    if (parsedRows.length === 0) return;

    try {
      const staffEntities: StaffMember[] = parsedRows.map((r, idx) => {
        const initials = r.fullName
          .split(' ')
          .filter(Boolean)
          .map(n => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase() || 'ST';

        return {
          id: `staff-bulk-${Date.now()}-${idx}`,
          employeeId: r.employeeId,
          username: `user_${r.employeeId.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
          fullName: r.fullName,
          role: r.role,
          jobTitle: r.jobTitle,
          department: r.department,
          assignedFloor: r.assignedFloor || 1,
          pin: '123',
          avatarInitials: initials,
          avatarColor: r.role === 'doctor' ? 'from-purple-600 to-indigo-700' : r.role === 'nurse' ? 'from-blue-600 to-sky-700' : 'from-emerald-600 to-teal-700',
          registeredAt: new Date().toISOString(),
          lastActiveShift: 'Day Shift (07:00 - 19:00)',
          phone: r.mobileNumber,
          mobileNumber: r.mobileNumber,
          email: `${r.employeeId.toLowerCase()}@pristine-hospital.org`,
          age: r.age,
          sex: r.sex,
          homeAddress: r.homeAddress,
          photoUrl: r.photoUrl,
          shiftStatus: r.shiftStatus,
          licenseNumber: r.licenseNumber
        };
      });

      if (importMode === 'replace') {
        await db.staff.clear();
      }

      await db.staff.bulkPut(staffEntities);

      clinicalAudio.playSuccessChime();
      showToast(`✓ Successfully imported ${staffEntities.length} hospital personnel to database!`, 'success');
      onImportComplete?.(staffEntities.length);
      onClose();
    } catch (err) {
      console.error('Failed to import staff roster:', err);
      showToast('Error saving staff records to database', 'error');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150 select-none">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Users size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold">Hospital Personnel Roster Bulk Migration</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                  CSV / JSON Wizard
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Upload your hospital HR employee list to instantly populate the staff telemetry directory.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-5 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
          
          {/* 1. UPLOAD ZONE & TEMPLATE DOWNLOAD */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Drop Zone (2 Columns) */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="md:col-span-2 border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/40 hover:bg-blue-50/70 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept=".csv,.json,text/csv,application/json"
                className="hidden" 
              />
              <div className="p-3 bg-white rounded-xl shadow-xs text-blue-600 mb-2 group-hover:scale-105 transition-transform border border-blue-100">
                <Upload size={24} />
              </div>
              <span className="text-xs font-bold text-slate-900">
                {rawFileName ? `Selected: ${rawFileName}` : 'Drop Hospital Roster CSV / JSON or Click to Browse'}
              </span>
              <span className="text-[11px] text-slate-500 mt-1">
                Auto-detects columns: Name, ID, Department, Role, Age, Sex, Mobile Phone, Shift, Photo
              </span>
            </div>

            {/* Template & Guidelines (1 Column) */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                  Format Template
                </span>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                  Need the exact column schema? Download our ready-to-fill hospital roster template.
                </p>
              </div>

              <button
                type="button"
                onClick={handleDownloadTemplate}
                className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Download size={14} className="text-blue-600" />
                <span>Download Sample CSV</span>
              </button>
            </div>

          </div>

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-900 font-semibold">
              <AlertTriangle size={16} className="text-rose-600 shrink-0" />
              <span>{validationErrors.join(' • ')}</span>
            </div>
          )}

          {/* 2. PARSED ROSTER LIVE PREVIEW */}
          {parsedRows.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Extracted Staff Roster ({parsedRows.length} Members)
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Validated ✓
                  </span>
                </div>

                {/* Import Mode Selector */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500">Mode:</span>
                  <label className="flex items-center gap-1 cursor-pointer font-semibold text-slate-700">
                    <input 
                      type="radio" 
                      name="importMode" 
                      checked={importMode === 'append'} 
                      onChange={() => setImportMode('append')} 
                      className="text-blue-600"
                    />
                    <span>Append / Merge</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer font-semibold text-slate-700">
                    <input 
                      type="radio" 
                      name="importMode" 
                      checked={importMode === 'replace'} 
                      onChange={() => setImportMode('replace')} 
                      className="text-blue-600"
                    />
                    <span>Replace Entire Roster</span>
                  </label>
                </div>
              </div>

              {/* Preview Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs max-h-64 overflow-y-auto custom-scrollbar">
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600">
                    <tr>
                      <th className="py-2 px-3">Staff Name</th>
                      <th className="py-2 px-2">Emp ID</th>
                      <th className="py-2 px-2">Role / Title</th>
                      <th className="py-2 px-2">Department</th>
                      <th className="py-2 px-2">Contact</th>
                      <th className="py-2 px-2">Shift</th>
                      <th className="py-2 px-2 text-right">Floor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {parsedRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-2">
                            {row.photoUrl ? (
                              <img src={row.photoUrl} alt="" className="w-6 h-6 rounded-full object-cover border border-slate-200 shrink-0" />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                                {row.fullName[0]}
                              </div>
                            )}
                            <div>
                              <span className="font-bold text-slate-900 block truncate max-w-[140px]">{row.fullName}</span>
                              <span className="text-[10px] text-slate-400 font-normal">{row.age} yo • {row.sex}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-2 font-mono font-bold text-slate-700">{row.employeeId}</td>
                        <td className="py-2 px-2">
                          <span className="block font-semibold text-slate-800">{row.jobTitle}</span>
                          <span className="text-[10px] uppercase font-bold text-blue-600">{row.role}</span>
                        </td>
                        <td className="py-2 px-2 text-slate-700 truncate max-w-[140px]">{row.department}</td>
                        <td className="py-2 px-2 font-mono text-[11px] text-slate-600">{row.mobileNumber}</td>
                        <td className="py-2 px-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            row.shiftStatus === 'on-duty' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {row.shiftStatus}
                          </span>
                        </td>
                        <td className="py-2 px-2 text-right font-mono font-bold text-slate-600">L{row.assignedFloor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            {parsedRows.length > 0 
              ? `Ready to import ${parsedRows.length} staff records into Dexie IndexedDB` 
              : 'Please select a CSV or JSON roster file to proceed'}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer border border-slate-300"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={parsedRows.length === 0 || isProcessing}
              onClick={handleExecuteImport}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle2 size={15} />
              <span>Import {parsedRows.length} Personnel to Live Directory</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
