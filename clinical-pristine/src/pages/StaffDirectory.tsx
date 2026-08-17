import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Upload, 
  Download, 
  Phone, 
  MapPin, 
  Clock, 
  UserCheck, 
  LayoutGrid,
  Table as TableIcon,
  Stethoscope,
  HeartPulse,
  Camera
} from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type StaffMember } from '../db';
import { useToast } from '../contexts/ToastContext';
import { clinicalAudio } from '../utils/clinicalAudio';
import { NewStaffModal } from '../components/NewStaffModal';
import { BulkStaffMigrationModal } from '../components/BulkStaffMigrationModal';
import { StaffPhotoModal } from '../components/StaffPhotoModal';

export const StaffDirectory: React.FC = () => {
  const { showToast } = useToast();

  const staffList = useLiveQuery(() => db.staff.toArray(), []) || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedShift, setSelectedShift] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const [showNewStaffModal, setShowNewStaffModal] = useState(false);
  const [showBulkMigrationModal, setShowBulkMigrationModal] = useState(false);
  const [editingStaffPhoto, setEditingStaffPhoto] = useState<StaffMember | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  // Departments List
  const departments = useMemo(() => {
    const set = new Set<string>();
    staffList.forEach(s => { if (s.department) set.add(s.department); });
    return Array.from(set);
  }, [staffList]);

  // Filtered Staff
  const filteredStaff = useMemo(() => {
    return staffList.filter(s => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        s.fullName.toLowerCase().includes(q) ||
        s.employeeId.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q) ||
        s.jobTitle.toLowerCase().includes(q) ||
        (s.licenseNumber && s.licenseNumber.toLowerCase().includes(q));

      const matchesRole = selectedRole === 'all' || s.role === selectedRole;
      const matchesDept = selectedDept === 'all' || s.department === selectedDept;
      const currentShift = s.shiftStatus || 'on-duty';
      const matchesShift = selectedShift === 'all' || currentShift === selectedShift;

      return matchesSearch && matchesRole && matchesDept && matchesShift;
    });
  }, [staffList, searchQuery, selectedRole, selectedDept, selectedShift]);

  // Statistics
  const onDutyCount = staffList.filter(s => (s.shiftStatus || 'on-duty') === 'on-duty').length;
  const onCallCount = staffList.filter(s => s.shiftStatus === 'on-call').length;
  const doctorsCount = staffList.filter(s => s.role === 'doctor').length;
  const nursesCount = staffList.filter(s => s.role === 'nurse').length;

  // 1-Click Shift Status Toggle
  const handleToggleShiftStatus = async (staff: StaffMember) => {
    const nextStatusMap: Record<string, 'on-duty' | 'on-call' | 'break' | 'off-duty'> = {
      'on-duty': 'break',
      'break': 'on-call',
      'on-call': 'off-duty',
      'off-duty': 'on-duty'
    };
    const current = staff.shiftStatus || 'on-duty';
    const nextStatus = nextStatusMap[current] || 'on-duty';

    try {
      await db.staff.update(staff.id, {
        shiftStatus: nextStatus
      });
      clinicalAudio.playDrawerSwoosh();
      showToast(`Updated ${staff.fullName} shift status to ${nextStatus.toUpperCase()}`, 'info');
    } catch (err) {
      console.error(err);
    }
  };

  // Export Staff Directory to CSV
  const handleExportCSV = () => {
    if (staffList.length === 0) return;

    const headers = ['fullName', 'employeeId', 'role', 'jobTitle', 'department', 'age', 'sex', 'mobileNumber', 'homeAddress', 'licenseNumber', 'shiftStatus', 'assignedFloor'];
    const rows = staffList.map(s => [
      `"${s.fullName}"`,
      `"${s.employeeId}"`,
      `"${s.role}"`,
      `"${s.jobTitle}"`,
      `"${s.department}"`,
      s.age || '',
      `"${s.sex || ''}"`,
      `"${s.phone || s.mobileNumber || ''}"`,
      `"${s.homeAddress || ''}"`,
      `"${s.licenseNumber || ''}"`,
      `"${s.shiftStatus || 'on-duty'}"`,
      s.assignedFloor || 1
    ].join(','));

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Pristine_Hospital_Staff_Directory_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported Staff Directory to CSV', 'success');
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F4F5F7]">
      
      {/* 1. TOP TELEMETRY & ACTIONS BANNER */}
      <div className="bg-white border-b border-slate-200 p-4 md:px-6 shrink-0 flex flex-col gap-4">
        
        {/* Title & Action Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
                <Users size={20} />
              </div>
              <div>
                <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  Hospital Personnel &amp; Staff Telemetry
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold font-mono">
                    {staffList.length} Registered
                  </span>
                </h1>
                <p className="text-xs text-slate-500">
                  Full clinical credentialing, real-time shift status, contact telemetry, and roster management.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Deck */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowBulkMigrationModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer border border-slate-300 shadow-2xs"
              title="Bulk import employee roster via CSV or JSON"
            >
              <Upload size={14} className="text-blue-600" />
              <span>Bulk Migration</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer border border-slate-300 shadow-2xs"
              title="Export roster to CSV"
            >
              <Download size={14} className="text-slate-600" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => setShowNewStaffModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <Plus size={15} />
              <span>Register Employee</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Telemetry Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Active On-Duty</span>
              <span className="text-lg font-black text-emerald-700 font-mono">{onDutyCount} Staff</span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <UserCheck size={16} />
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">STAT On-Call</span>
              <span className="text-lg font-black text-amber-700 font-mono">{onCallCount} Providers</span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock size={16} />
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Attending Physicians</span>
              <span className="text-lg font-black text-blue-700 font-mono">{doctorsCount} MDs</span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Stethoscope size={16} />
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Clinical Nursing Staff</span>
              <span className="text-lg font-black text-indigo-700 font-mono">{nursesCount} RNs</span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <HeartPulse size={16} />
            </div>
          </div>
        </div>

      </div>

      {/* 2. FILTER & SEARCH CONTROL BAR */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-6 py-3 shrink-0 flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, employee ID, department, license..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          
          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 outline-none cursor-pointer"
          >
            <option value="all">All Departments ({departments.length})</option>
            {departments.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 outline-none cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="doctor">Doctors / Surgeons</option>
            <option value="nurse">Nurses (BSN/RN)</option>
            <option value="evs">EVS Sanitization</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="respiratory">Respiratory (RRT)</option>
            <option value="admin">Administration</option>
          </select>

          {/* Shift Status */}
          <select
            value={selectedShift}
            onChange={(e) => setSelectedShift(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 outline-none cursor-pointer"
          >
            <option value="all">All Shifts</option>
            <option value="on-duty">On-Duty</option>
            <option value="on-call">On-Call</option>
            <option value="break">On Break</option>
            <option value="off-duty">Off-Duty</option>
          </select>

          <div className="h-4 w-px bg-slate-300 mx-1 hidden md:block"></div>

          {/* View Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-300">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-white shadow-2xs text-blue-700 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid Cards View"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-white shadow-2xs text-blue-700 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Dense Telemetry Table View"
            >
              <TableIcon size={15} />
            </button>
          </div>

        </div>

      </div>

      {/* 3. STAFF DIRECTORY CONTENT (GRID VS TABLE) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
        
        {filteredStaff.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-white rounded-2xl border border-dashed border-slate-300">
            <Users size={32} className="text-slate-400 mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No matching staff members found</h3>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your search terms, role filters, or import a fresh roster.</p>
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredStaff.map((staff) => {
              const currentShift = staff.shiftStatus || 'on-duty';
              const shiftBadgeClass = 
                currentShift === 'on-duty' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                currentShift === 'on-call' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                currentShift === 'break' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                'bg-slate-100 text-slate-600 border-slate-300';

              const roleBadgeColor = 
                staff.role === 'doctor' ? 'bg-purple-100 text-purple-800' :
                staff.role === 'nurse' ? 'bg-blue-100 text-blue-800' :
                staff.role === 'evs' ? 'bg-emerald-100 text-emerald-800' :
                staff.role === 'pharmacy' ? 'bg-amber-100 text-amber-800' :
                'bg-slate-100 text-slate-700';

              return (
                <div 
                  key={staff.id}
                  className="bg-white rounded-2xl border border-slate-300 shadow-2xs hover:shadow-md transition-all p-4 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Avatar + Status + Role */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        {/* Interactive Profile Photo Container with (+) Button UI/UX */}
                        <div 
                          onClick={() => setEditingStaffPhoto(staff)}
                          className="relative cursor-pointer group/avatar shrink-0"
                          title="Click to upload or change profile photo"
                        >
                          {staff.photoUrl && !imgErrors[staff.id] ? (
                            <img 
                              src={staff.photoUrl} 
                              alt={staff.fullName} 
                              onError={() => setImgErrors(prev => ({ ...prev, [staff.id]: true }))}
                              className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-xs group-hover/avatar:ring-2 group-hover/avatar:ring-blue-500 transition-all" 
                            />
                          ) : (
                            <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${staff.avatarColor || 'from-blue-600 to-indigo-700'} text-white font-black text-sm flex items-center justify-center shadow-xs group-hover/avatar:ring-2 group-hover/avatar:ring-blue-500 transition-all`}>
                              {staff.avatarInitials || staff.fullName.slice(0, 2).toUpperCase()}
                            </div>
                          )}

                          {/* Dynamic (+) / Camera Upload Badge */}
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white shadow-xs border-2 border-white transition-all ${
                            staff.photoUrl && !imgErrors[staff.id]
                              ? 'bg-slate-800/80 group-hover/avatar:bg-blue-600 group-hover/avatar:scale-110 opacity-80 group-hover/avatar:opacity-100' 
                              : 'bg-blue-600 hover:bg-blue-700 group-hover/avatar:scale-115 animate-pulse'
                          }`}>
                            {staff.photoUrl && !imgErrors[staff.id] ? <Camera size={10} /> : <Plus size={11} strokeWidth={3} />}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 leading-tight">
                            {staff.fullName}
                          </h3>
                          <span className="text-[11px] font-semibold text-slate-600 block mt-0.5">
                            {staff.jobTitle}
                          </span>
                        </div>
                      </div>

                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${roleBadgeColor}`}>
                        {staff.role}
                      </span>
                    </div>

                    {/* Department & Unit Badge */}
                    <div className="mb-3 p-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Department / Unit</span>
                      <span className="font-bold text-slate-800 block truncate" title={staff.department}>
                        {staff.department}
                      </span>
                    </div>

                    {/* Telemetry Details Grid */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-medium mb-3">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Employee ID</span>
                        <span className="font-mono font-bold text-slate-800">{staff.employeeId}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Assigned Floor</span>
                        <span className="font-bold text-blue-700">Level {staff.assignedFloor || 1}</span>
                      </div>
                      {staff.age && (
                        <div>
                          <span className="text-[10px] text-slate-400 block">Demographics</span>
                          <span className="font-semibold text-slate-700">{staff.age} yo • {staff.sex || 'F'}</span>
                        </div>
                      )}
                      {staff.licenseNumber && (
                        <div>
                          <span className="text-[10px] text-slate-400 block">License No.</span>
                          <span className="font-mono text-slate-700 truncate block">{staff.licenseNumber}</span>
                        </div>
                      )}
                    </div>

                    {/* Contact Telemetry */}
                    <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      {(staff.phone || staff.mobileNumber) && (
                        <div className="flex items-center gap-2 text-[11px]">
                          <Phone size={12} className="text-emerald-600 shrink-0" />
                          <a href={`tel:${staff.phone || staff.mobileNumber}`} className="font-mono hover:text-blue-600 hover:underline">
                            {staff.phone || staff.mobileNumber}
                          </a>
                        </div>
                      )}
                      {staff.homeAddress && (
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <MapPin size={12} className="text-slate-400 shrink-0" />
                          <span className="truncate" title={staff.homeAddress}>{staff.homeAddress}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Shift Status Toggle Button */}
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => handleToggleShiftStatus(staff)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold transition-all cursor-pointer ${shiftBadgeClass}`}
                      title="Click to cycle shift status: On-Duty -> Break -> On-Call -> Off-Duty"
                    >
                      <span className={`w-2 h-2 rounded-full ${
                        currentShift === 'on-duty' ? 'bg-emerald-500 animate-pulse' :
                        currentShift === 'on-call' ? 'bg-amber-500' :
                        currentShift === 'break' ? 'bg-blue-500' : 'bg-slate-400'
                      }`}></span>
                      <span className="capitalize">{currentShift}</span>
                    </button>

                    <span className="text-[10px] font-mono text-slate-400">
                      PIN: {staff.pin || '123'}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* DENSE TABLE VIEW */
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50/80 border-b border-slate-200 font-bold text-slate-500 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Staff Member</th>
                  <th className="py-3 px-3">Employee ID</th>
                  <th className="py-3 px-3">Clinical Role</th>
                  <th className="py-3 px-3">Department</th>
                  <th className="py-3 px-3">Floor</th>
                  <th className="py-3 px-3">Demographics</th>
                  <th className="py-3 px-3">Mobile Contact</th>
                  <th className="py-3 px-3">License No.</th>
                  <th className="py-3 px-4 text-right">Shift Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredStaff.map((staff) => {
                  const currentShift = staff.shiftStatus || 'on-duty';
                  const shiftBadgeClass = 
                    currentShift === 'on-duty' ? 'bg-emerald-100 text-emerald-800' :
                    currentShift === 'on-call' ? 'bg-amber-100 text-amber-800' :
                    currentShift === 'break' ? 'bg-blue-100 text-blue-800' :
                    'bg-slate-100 text-slate-600';

                  return (
                    <tr key={staff.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div 
                            onClick={() => setEditingStaffPhoto(staff)}
                            className="relative cursor-pointer group/tabavatar shrink-0"
                            title="Click to upload or change photo"
                          >
                            {staff.photoUrl && !imgErrors[staff.id] ? (
                              <img 
                                src={staff.photoUrl} 
                                alt="" 
                                onError={() => setImgErrors(prev => ({ ...prev, [staff.id]: true }))}
                                className="w-7 h-7 rounded-full object-cover border border-slate-200" 
                              />
                            ) : (
                              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold flex items-center justify-center">
                                {staff.avatarInitials || staff.fullName[0]}
                              </div>
                            )}
                            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px] font-black border border-white">
                              +
                            </div>
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{staff.fullName}</span>
                            <span className="text-[10px] text-slate-400 font-normal">{staff.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-700">{staff.employeeId}</td>
                      <td className="py-2.5 px-3">
                        <span className="block font-semibold text-slate-800">{staff.jobTitle}</span>
                        <span className="text-[10px] uppercase font-bold text-blue-600">{staff.role}</span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-700">{staff.department}</td>
                      <td className="py-2.5 px-3 font-bold text-blue-700 font-mono">L{staff.assignedFloor || 1}</td>
                      <td className="py-2.5 px-3 text-slate-600">{staff.age ? `${staff.age} yo (${staff.sex || 'F'})` : '—'}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">
                        <a href={`tel:${staff.phone || staff.mobileNumber}`} className="hover:text-blue-600 hover:underline">
                          {staff.phone || staff.mobileNumber || '—'}
                        </a>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">{staff.licenseNumber || '—'}</td>
                      <td className="py-2.5 px-4 text-right">
                        <button
                          onClick={() => handleToggleShiftStatus(staff)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer ${shiftBadgeClass}`}
                        >
                          {currentShift}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* 4. MODALS */}
      <NewStaffModal
        isOpen={showNewStaffModal}
        onClose={() => setShowNewStaffModal(false)}
        onStaffRegistered={(staff) => {
          showToast(`✓ Registered and onboarded ${staff.fullName}!`, 'success');
        }}
      />

      <BulkStaffMigrationModal
        isOpen={showBulkMigrationModal}
        onClose={() => setShowBulkMigrationModal(false)}
        onImportComplete={(count) => {
          showToast(`✓ Imported ${count} staff members into directory!`, 'success');
        }}
      />

      <StaffPhotoModal
        isOpen={!!editingStaffPhoto}
        staff={editingStaffPhoto}
        onClose={() => setEditingStaffPhoto(null)}
        onPhotoUpdated={() => {
          // Live query auto updates
        }}
      />

    </div>
  );
};
