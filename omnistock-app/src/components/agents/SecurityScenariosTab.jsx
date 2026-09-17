import React, { useState } from 'react';
import {
  ShieldCheck, Wrench, Siren, Crosshair, Scale, Radar, FileLock,
  Shield, Zap, Eye, Target, Anchor, Play, RefreshCw, CheckCircle2,
  AlertTriangle, ChevronRight, Check, AlertOctagon, Terminal, X,
  Users, ShieldAlert, Lock, ShieldOff
} from 'lucide-react';
import {
  SECURITY_ROLES, SECURITY_CROSS_ROLE_SCENARIOS,
  getSecurityThreatSeverity, TITANS
} from '../../agents/audits';
import { validateAgainstThreat } from '../../agents/defenses';

const SECURITY_ROLE_ICONS = {
  ciso: ShieldCheck,
  security_engineer: Wrench,
  incident_responder: Siren,
  pen_tester: Crosshair,
  compliance_officer: Scale,
  soc_analyst: Radar,
  dpo: FileLock,
};

const TITAN_ICONS = {
  mitnick: Shield,
  geohot: Zap,
  kamkar: Eye,
  miller: Target,
  jack: Anchor
};

const SECURITY_ROLE_COLORS = {
  ciso: { gradient: 'from-emerald-600 to-emerald-900', text: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/40' },
  security_engineer: { gradient: 'from-blue-600 to-blue-900', text: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/40' },
  incident_responder: { gradient: 'from-rose-600 to-rose-900', text: 'text-rose-400', bg: 'bg-rose-500/20', border: 'border-rose-500/40' },
  pen_tester: { gradient: 'from-purple-600 to-purple-900', text: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/40' },
  compliance_officer: { gradient: 'from-amber-600 to-amber-900', text: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/40' },
  soc_analyst: { gradient: 'from-cyan-600 to-cyan-900', text: 'text-cyan-400', bg: 'bg-cyan-500/20', border: 'border-cyan-500/40' },
  dpo: { gradient: 'from-indigo-600 to-indigo-900', text: 'text-indigo-400', bg: 'bg-indigo-500/20', border: 'border-indigo-500/40' },
};

const SCENARIO_TYPES = [
  { id: 'incident_response', label: 'Incident Response', color: 'rose', icon: Siren },
  { id: 'threat_modeling', label: 'Threat Modeling', color: 'amber', icon: ShieldAlert },
  { id: 'compliance_audit', label: 'Compliance Audit', color: 'emerald', icon: ShieldCheck },
];

const SCENARIO_TYPE_COLORS = {
  incident_response: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
  threat_modeling: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  compliance_audit: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
};

export default function SecurityScenariosTab() {
  const [selectedRoleId, setSelectedRoleId] = useState('ciso');
  const [activeScenarioType, setActiveScenarioType] = useState('incident_response');
  const [simulatingTitan, setSimulatingTitan] = useState(null);
  const [simulationLogs, setSimulationLogs] = useState([]);
  const [simulationResult, setSimulationResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const selectedRole = SECURITY_ROLES.find(r => r.id === selectedRoleId) || SECURITY_ROLES[0];
  const RoleIcon = SECURITY_ROLE_ICONS[selectedRole.id] || ShieldCheck;
  const roleColor = SECURITY_ROLE_COLORS[selectedRole.id] || SECURITY_ROLE_COLORS.ciso;

  const filteredScenarios = selectedRole.realLifeScenarios.filter(s => s.scenarioType === activeScenarioType);

  const getSamplePayload = (roleId, titanId) => {
    const payloads = {
      ciso: {
        mitnick: { action: 'EXEC_POLICY', requester_role: 'branch_manager', mfa_token: '', policy_type: 'zero_trust', allow_all: true, session_bound: false },
        geohot: { action: 'RECALC_RISK', requester_role: 'ciso', mfa_token: 'tok', policy_type: 'risk_score', allow_all: false, session_bound: true },
        miller: { action: 'UPDATE_POLICY', requester_role: 'ciso', mfa_token: 'tok', policy_type: 'zero_trust', allow_all: true, session_bound: true },
        jack: { action: 'SYNC_AUDIT', requester_role: 'ciso', mfa_token: 'tok', policy_type: 'access_review', allow_all: false, session_bound: true },
        kamkar: { action: 'FETCH_REPORT', requester_role: 'ciso', mfa_token: 'tok', policy_type: 'board_report', allow_all: false, session_bound: false },
      },
      security_engineer: {
        mitnick: { action: 'DEPLOY_PATCH', target_asset: 'srv-01', patch_id: 'CVE-2026', cidr_block: '10.0.0.0/24', secrets_in_logs: false, vault_rotation: false, drift_baseline: true },
        geohot: { action: 'ROLLING_UPDATE', target_asset: 'db-cluster', patch_id: 'CVE-2026', cidr_block: '10.0.0.0/24', secrets_in_logs: false, vault_rotation: true, drift_baseline: true },
        miller: { action: 'APPLY_IAC', target_asset: 'k8s-prod', patch_id: 'N/A', cidr_block: '0.0.0.0/0', secrets_in_logs: false, vault_rotation: true, drift_baseline: true },
        jack: { action: 'DRIFT_CHECK', target_asset: 'srv-01', patch_id: 'N/A', cidr_block: '10.0.0.0/24', secrets_in_logs: false, vault_rotation: true, drift_baseline: false },
        kamkar: { action: 'VIEW_LOGS', target_asset: 'ci-runner', patch_id: 'N/A', cidr_block: '10.0.0.0/24', secrets_in_logs: true, vault_rotation: true, drift_baseline: true },
      },
      incident_responder: {
        mitnick: { action: 'RUN_FORENSIC', target_asset: 'srv-01', evidence_snapshot: false, forensic_isolation: false, file_path: '/evidence/dump.mem', worm_storage: true, responder_lock: true },
        geohot: { action: 'CONTAIN', target_asset: 'srv-01', evidence_snapshot: false, forensic_isolation: true, file_path: '/evidence/dump.mem', worm_storage: true, responder_lock: false },
        miller: { action: 'COLLECT_EVIDENCE', target_asset: 'srv-01', evidence_snapshot: true, forensic_isolation: true, file_path: '../../../etc/passwd', worm_storage: true, responder_lock: true },
        jack: { action: 'SYNC_EVIDENCE', target_asset: 'srv-01', evidence_snapshot: true, forensic_isolation: true, file_path: '/evidence/dump.mem', worm_storage: false, responder_lock: true },
        kamkar: { action: 'VIEW_CHAIN', target_asset: 'srv-01', evidence_snapshot: true, forensic_isolation: true, file_path: '/evidence/dump.mem', worm_storage: true, responder_lock: false },
      },
      pen_tester: {
        mitnick: { action: 'RUN_EXPLOIT', target_asset: 'api-gw', exploit_serialized: true, credentials_time_bound: false, payload_sandboxed: true, findings_worm: true, report_encrypted: true },
        geohot: { action: 'RUN_EXPLOIT', target_asset: 'api-gw', exploit_serialized: false, credentials_time_bound: true, payload_sandboxed: true, findings_worm: true, report_encrypted: true },
        miller: { action: 'RUN_EXPLOIT', target_asset: 'api-gw', exploit_serialized: true, credentials_time_bound: true, payload_sandboxed: false, findings_worm: true, report_encrypted: true },
        jack: { action: 'SYNC_FINDINGS', target_asset: 'api-gw', exploit_serialized: true, credentials_time_bound: true, payload_sandboxed: true, findings_worm: false, report_encrypted: true },
        kamkar: { action: 'VIEW_REPORT', target_asset: 'api-gw', exploit_serialized: true, credentials_time_bound: true, payload_sandboxed: true, findings_worm: true, report_encrypted: false },
      },
      compliance_officer: {
        mitnick: { action: 'VIEW_DASHBOARD', control_id: 'A.1.1', framework_id: 'soc2', dual_authorization: true, evidence_worm: true, mfa_token: '', session_timeout: 10 },
        geohot: { action: 'COLLECT_EVIDENCE', control_id: 'A.1.1', framework_id: 'soc2', dual_authorization: true, evidence_worm: true, mfa_token: 'tok', session_timeout: 30 },
        miller: { action: 'MAP_CONTROL', control_id: 'FAKE-CTRL', framework_id: 'invalid', dual_authorization: false, evidence_worm: true, mfa_token: 'tok', session_timeout: 10 },
        jack: { action: 'SYNC_EVIDENCE', control_id: 'A.1.1', framework_id: 'soc2', dual_authorization: true, evidence_worm: false, mfa_token: 'tok', session_timeout: 10 },
        kamkar: { action: 'EXPORT_REPORT', control_id: 'A.1.1', framework_id: 'soc2', dual_authorization: true, evidence_worm: true, mfa_token: 'tok', session_timeout: 20 },
      },
      soc_analyst: {
        mitnick: { action: 'TRIAGE_ALERT', alert_id: 'AL-001', query_parameterized: true, alert_locked: true, log_buffered: true, need_to_know: true, mfa_token: '' },
        geohot: { action: 'TRIAGE_ALERT', alert_id: 'AL-001', query_parameterized: true, alert_locked: false, log_buffered: true, need_to_know: true, mfa_token: 'tok' },
        miller: { action: 'RUN_QUERY', alert_id: 'AL-001', query_parameterized: false, alert_locked: true, log_buffered: true, need_to_know: true, mfa_token: 'tok' },
        jack: { action: 'INGEST_LOGS', alert_id: 'AL-001', query_parameterized: true, alert_locked: true, log_buffered: false, need_to_know: true, mfa_token: 'tok' },
        kamkar: { action: 'VIEW_ALERT', alert_id: 'AL-001', query_parameterized: true, alert_locked: true, log_buffered: true, need_to_know: false, mfa_token: 'tok' },
      },
      dpo: {
        mitnick: { action: 'PROCESS_DSR', customer_id: 'CUST-001', dsr_lock: true, risk_level: 'high', dual_signoff: true, hash_chain: true, response_encrypted: true, mfa_token: '' },
        geohot: { action: 'PROCESS_DSR', customer_id: 'CUST-001', dsr_lock: false, risk_level: 'high', dual_signoff: true, hash_chain: true, response_encrypted: true, mfa_token: 'tok' },
        miller: { action: 'RUN_DPIA', customer_id: 'CUST-001', dsr_lock: true, risk_level: 'invalid', dual_signoff: false, hash_chain: true, response_encrypted: true, mfa_token: 'tok' },
        jack: { action: 'SYNC_REGISTER', customer_id: 'CUST-001', dsr_lock: true, risk_level: 'high', dual_signoff: true, hash_chain: false, response_encrypted: true, mfa_token: 'tok' },
        kamkar: { action: 'EXPORT_DSR', customer_id: 'CUST-001', dsr_lock: true, risk_level: 'high', dual_signoff: true, hash_chain: true, response_encrypted: false, mfa_token: 'tok' },
      },
    };
    return JSON.stringify(payloads[roleId]?.[titanId] || { action: 'EXPLOIT', role: roleId, titan: titanId }, null, 2);
  };

  const handleRunSimulation = async (titanId) => {
    const titan = TITANS.find(t => t.id === titanId) || TITANS[0];
    const threat = selectedRole.devilsTeamThreats.find(t => t.titanId === titanId) || selectedRole.devilsTeamThreats[0];

    setIsSimulating(true);
    setSimulatingTitan(titan);
    setSimulationResult(null);
    setSimulationLogs([
      `[${new Date().toLocaleTimeString()}] [SECURITY SIM] Initializing adversarial test against: ${selectedRole.title}`,
      `[${new Date().toLocaleTimeString()}] [TITAN: ${titan.name}] Targeting vector: "${threat.vector}"`,
    ]);

    await new Promise(r => setTimeout(r, 600));
    setSimulationLogs(prev => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Injecting adversarial payload into security surface...`,
      `[PAYLOAD]: ${getSamplePayload(selectedRole.id, titanId)}`
    ]);

    await new Promise(r => setTimeout(r, 800));
    setSimulationLogs(prev => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Evaluating runtime boundary defenses: Zod schema validators & access controls...`
    ]);

    await new Promise(r => setTimeout(r, 700));
    const payload = JSON.parse(getSamplePayload(selectedRole.id, titanId));
    const validation = validateAgainstThreat(selectedRole.id, titanId, payload);

    const newLogs = [
      `[${new Date().toLocaleTimeString()}] [SCHEMA]: ${validation.defenseSchemaName}`,
    ];

    if (validation.intercepted) {
      newLogs.push(`[${new Date().toLocaleTimeString()}] [GATE VERDICT]: Intercepted! ${validation.violations.length} violation(s) detected by Zod schema.`);
      validation.violations.forEach(v => newLogs.push(`  ✗ ${v}`));
      newLogs.push(`[DEFENSE ACTIVE]: ${threat.defense}`);
    } else {
      newLogs.push(`[${new Date().toLocaleTimeString()}] [GATE VERDICT]: BREACH! Payload bypassed ${validation.defenseSchemaName}.`);
      newLogs.push(`[DEFENSE GAP]: ${threat.defense}`);
    }

    setSimulationLogs(prev => [...prev, ...newLogs]);

    setSimulationResult({
      titan,
      threat,
      intercepted: validation.intercepted,
      violations: validation.violations,
      defenseSchemaName: validation.defenseSchemaName,
      remediationSummary: validation.intercepted
        ? `Neutralized vector: ${threat.vector}. ${validation.violations.length} schema violation(s) caught.`
        : `BREACH: Payload bypassed ${validation.defenseSchemaName}. Defense gap requires immediate attention.`,
    });
    setIsSimulating(false);
  };

  return (
    <div className="space-y-6">
      {/* Security Role Navigation Carousel */}
      <div className="bg-slate-900/80 border border-rose-500/20 p-3 rounded-2xl">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <ShieldOff className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
              Security Scenarios — 7 Specialist Roles & Adversarial Threat Defense
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            7 Security Roles Active
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {SECURITY_ROLES.map((role) => {
            const Icon = SECURITY_ROLE_ICONS[role.id] || ShieldCheck;
            const isSelected = selectedRoleId === role.id;
            const color = SECURITY_ROLE_COLORS[role.id];

            return (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRoleId(role.id);
                  setSimulationResult(null);
                  setSimulationLogs([]);
                }}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-rose-600/20 border-rose-500 shadow-lg ring-1 ring-rose-500/50'
                    : 'bg-[#0B1C30]/80 border-slate-800 hover:border-rose-500/30 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className={`p-1.5 rounded-lg ${isSelected ? `${color.bg} ${color.text}` : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                    {role.badge}
                  </span>
                </div>
                <div className="font-bold text-xs text-white truncate">{role.title}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{role.subtitle}</div>

                <div className="mt-2 text-[10px] font-mono flex items-center gap-1 text-rose-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  5 Threats
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Role Hero Card */}
      <div className="bg-gradient-to-r from-[#0B1C30] via-slate-900 to-[#0B1C30] border border-rose-500/30 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className={`p-3 ${roleColor.bg} border ${roleColor.border} rounded-xl ${roleColor.text}`}>
              <RoleIcon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded ${roleColor.bg} ${roleColor.text} border ${roleColor.border}`}>
                  {selectedRole.badge} Persona
                </span>
                <span className="text-xs font-mono text-slate-400">
                  ID: /{selectedRole.id}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">{selectedRole.title}</h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {selectedRole.operationalScope}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => handleRunSimulation('miller')}
              disabled={isSimulating}
              className="px-4 py-2.5 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              <Zap className="w-4 h-4" />
              <span>Simulate Attack</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feature Blueprint */}
      <div className="bg-[#0B1C30]/90 border border-rose-500/20 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-rose-400" />
            <span>Security Feature Blueprint for {selectedRole.title}</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">
            {selectedRole.featureBlueprint.categories.length} Core Modules
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {selectedRole.featureBlueprint.overview}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedRole.featureBlueprint.categories.map((cat, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="text-xs font-bold text-rose-400 uppercase font-mono tracking-wide">
                {cat.name}
              </div>
              <div className="space-y-2.5">
                {cat.features.map((feat, fIdx) => (
                  <div key={fIdx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                    <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {feat.description}
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-emerald-400/90 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/40 inline-block">
                      {feat.metric}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Scenario Section with Type Filter Pills */}
      <div className="bg-[#0B1C30]/90 border border-rose-500/20 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-rose-400" />
            <h3 className="text-sm font-bold text-white">
              Security Scenarios: {selectedRole.title}
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {filteredScenarios.length} {activeScenarioType.replace('_', ' ')} scenarios
          </span>
        </div>

        {/* Scenario Type Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {SCENARIO_TYPES.map((type) => {
            const Icon = type.icon;
            const isActive = activeScenarioType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setActiveScenarioType(type.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  isActive
                    ? SCENARIO_TYPE_COLORS[type.id]
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{type.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filtered Scenario Cards */}
        <div className="grid grid-cols-1 gap-4">
          {filteredScenarios.map((scen) => (
            <div key={scen.id} className="bg-slate-900/60 border border-rose-500/20 rounded-xl p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    scen.scenarioType === 'incident_response' ? 'bg-rose-400' :
                    scen.scenarioType === 'threat_modeling' ? 'bg-amber-400' : 'bg-emerald-400'
                  }`}></span>
                  {scen.title}
                </h4>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${SCENARIO_TYPE_COLORS[scen.scenarioType]}`}>
                  {scen.scenarioType.replace('_', ' ')}
                </span>
              </div>

              <div className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800 leading-relaxed">
                <span className="font-mono text-slate-400 font-bold block mb-1">Operational Context:</span>
                {scen.context}
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400 font-bold block mb-2">Step-by-Step Scenario Execution:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {scen.workflow.map((step, sIdx) => (
                    <div key={sIdx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-lg text-xs text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Business Impact:</strong> {scen.businessImpact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5-Titan Adversarial Threat Matrix */}
      <div className="bg-[#0B1C30]/95 border border-rose-500/30 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Devil's Team 5-Titan Adversarial Threat Matrix ({selectedRole.title})
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulated attack vectors targeting this security role's workflow and tools.
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-rose-400 bg-rose-950/50 px-3 py-1 rounded-lg border border-rose-800/60 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>5 Titans Armed</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          {selectedRole.devilsTeamThreats.map((threat) => {
            const titan = TITANS.find(t => t.id === threat.titanId) || TITANS[0];
            const TitanIcon = TITAN_ICONS[threat.titanId] || Shield;
            const threatSeverity = getSecurityThreatSeverity(selectedRole.id, threat.titanId);
            const severityColorClass = {
              critical: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
              high: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
              medium: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
              low: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
            }[threatSeverity] || 'bg-slate-500/20 text-slate-400 border-slate-500/40';

            return (
              <div
                key={threat.titanId}
                className="bg-slate-900/80 border border-rose-500/20 rounded-xl p-4 flex flex-col justify-between hover:border-rose-500/40 transition-all space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{titan.avatar}</span>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          {threat.titanName}
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${severityColorClass}`}>
                            {threatSeverity}
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">{titan.role}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRunSimulation(threat.titanId)}
                      disabled={isSimulating}
                      className="px-2.5 py-1 bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center gap-1 disabled:opacity-50"
                    >
                      <Play className="w-3 h-3" /> Test Vector
                    </button>
                  </div>

                  <div className="text-xs font-bold text-rose-300 mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>{threat.vector}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60">
                    {threat.description}
                  </p>
                </div>

                <div className="bg-blue-950/40 border border-blue-500/30 p-2.5 rounded-lg text-xs text-blue-200">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#00E5FF] uppercase font-bold mb-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Zero-Defect Defense Mechanism:</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {threat.defense}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cross-Role Security Collision Scenarios */}
      <div className="bg-[#0B1C30]/90 border border-rose-500/20 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-rose-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Cross-Role Security Collision Scenarios
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Adversarial interactions between 2+ security roles — where workflow overlap creates exploitable threat surfaces.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {SECURITY_CROSS_ROLE_SCENARIOS.length} Collision Scenarios
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {SECURITY_CROSS_ROLE_SCENARIOS.map((scen) => {
            const roles = scen.participatingRoles.map(rid => {
              const role = SECURITY_ROLES.find(r => r.id === rid);
              const Icon = SECURITY_ROLE_ICONS[rid] || ShieldCheck;
              const color = SECURITY_ROLE_COLORS[rid] || SECURITY_ROLE_COLORS.ciso;
              return { role, Icon, color, id: rid };
            });

            return (
              <div key={scen.id} className="bg-slate-900/60 border border-rose-500/20 rounded-xl overflow-hidden">
                <div className={`bg-gradient-to-r ${roles[0]?.color.gradient || 'from-slate-800 to-slate-900'} p-4`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {roles.map(({ id, Icon, color }) => (
                          <div key={id} className={`p-1.5 rounded-lg ${color.bg} ${color.text} border ${color.border}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                        ))}
                        <div className="text-rose-400 font-bold text-lg">⚡</div>
                      </div>
                      <h4 className="text-sm font-bold text-white">{scen.title}</h4>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/30 text-white/80 border border-white/20 shrink-0">
                      {scen.id}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {roles.map(({ id, role, color }) => (
                      <span key={id} className={`text-[10px] font-mono px-2 py-0.5 rounded ${color.bg} ${color.text} border ${color.border}`}>
                        {role?.title || id}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800 leading-relaxed">
                    <span className="font-mono text-slate-400 font-bold block mb-1">Collision Context:</span>
                    {scen.context}
                  </div>

                  <div>
                    <span className="text-xs font-mono text-slate-400 font-bold block mb-2">Collision Workflow:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {scen.workflow.map((step, sIdx) => (
                        <div key={sIdx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-slate-400 font-bold block">Cross-Role Threat Vectors:</span>
                    {scen.crossRoleThreats.map((threat, tIdx) => {
                      const titan = TITANS.find(t => t.id === threat.titanId) || TITANS[0];
                      const TitanIcon = TITAN_ICONS[threat.titanId] || Shield;
                      return (
                        <div key={tIdx} className="bg-slate-950/60 border border-rose-900/30 rounded-lg p-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{titan.avatar}</span>
                            <TitanIcon className="w-4 h-4 text-rose-400" />
                            <span className="text-xs font-bold text-rose-300">{threat.vector}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed">{threat.description}</p>
                          <div className="bg-blue-950/40 border border-blue-500/30 p-2 rounded-lg text-[11px] text-slate-300 flex items-start gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF] shrink-0 mt-0.5" />
                            <span>{threat.defense}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-rose-950/30 border border-rose-500/20 p-2.5 rounded-lg text-xs text-rose-200 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span><strong>Business Impact:</strong> {scen.businessImpact}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulation Terminal */}
      {(isSimulating || simulationResult) && (
        <div className="bg-slate-950 border border-rose-500/50 rounded-2xl p-5 shadow-2xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-5 h-5 text-rose-400" />
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Security Adversarial Simulation Terminal:</span>
                  <span className="text-rose-400">{simulatingTitan?.name} vs {selectedRole.title}</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-400">
                  Real-time attack injection and defensive verification
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setSimulationResult(null);
                setSimulationLogs([]);
                setIsSimulating(false);
              }}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono"
            >
              Close Terminal
            </button>
          </div>

          <div className="bg-black/90 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 max-h-60 overflow-y-auto space-y-1.5">
            {simulationLogs.map((log, idx) => (
              <div
                key={idx}
                className={
                  log.includes('PAYLOAD')
                    ? 'text-amber-400 whitespace-pre-wrap'
                    : log.includes('Intercepted')
                    ? 'text-emerald-400 font-bold'
                    : log.includes('SECURITY SIM')
                    ? 'text-rose-400 font-bold'
                    : 'text-slate-300'
                }
              >
                {log}
              </div>
            ))}
            {isSimulating && (
              <div className="flex items-center gap-2 text-rose-400 animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Simulating attack payload execution...</span>
              </div>
            )}
          </div>

          {simulationResult && (
            <div className={`p-3.5 rounded-xl flex items-center justify-between gap-4 ${
              simulationResult.intercepted
                ? 'bg-emerald-950/60 border border-emerald-500/50'
                : 'bg-rose-950/60 border border-rose-500/50'
            }`}>
              <div className="flex items-start gap-3">
                {simulationResult.intercepted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className={`text-xs font-bold ${simulationResult.intercepted ? 'text-emerald-200' : 'text-rose-200'}`}>
                    {simulationResult.intercepted ? 'Defensive Barrier Confirmed: Exploit Neutralized' : 'BREACH: Defense Gap Detected'}
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    {simulationResult.remediationSummary}
                  </div>
                  {simulationResult.violations?.length > 0 && (
                    <div className="mt-2 space-y-0.5">
                      {simulationResult.violations.map((v, i) => (
                        <div key={i} className="text-[11px] font-mono text-rose-300/90 flex items-start gap-1">
                          <X className="w-3 h-3 text-rose-400 shrink-0 mt-0.5" />
                          <span>{v}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <span className={`px-2.5 py-1 text-white font-mono text-xs font-bold rounded-lg shrink-0 ${
                simulationResult.intercepted ? 'bg-emerald-600' : 'bg-rose-600'
              }`}>
                {simulationResult.intercepted ? 'PASSED (0 BREACH)' : 'BREACH DETECTED'}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
