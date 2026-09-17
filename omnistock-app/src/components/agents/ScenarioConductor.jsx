/**
 * ScenarioConductor — Sequential Audit Runner
 *
 * Runs all three scenario sets sequentially:
 *   Phase 1: Devil's Team 5-Titan audit (runDevilsTeamAudit)
 *   Phase 2: F&B Management roles × 5 titan threats (validateAgainstThreat)
 *   Phase 3: Security roles × 5 titan threats (validateAgainstThreat)
 *
 * Findings stream live into a unified panel with severity badges and
 * intercepted/breached status pills. After completion, a summary dashboard
 * displays aggregate metrics with CSV/PDF export buttons.
 */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Shield, Zap, Eye, Target, Anchor, Play, RefreshCw, CheckCircle2,
  AlertTriangle, AlertOctagon, Download, FileText, X,
  Layers, UtensilsCrossed, Lock, Crown
} from 'lucide-react';
import {
  runDevilsTeamAudit, FB_MANAGEMENT_ROLES, SECURITY_ROLES,
  getFBThreatSeverity, getSecurityThreatSeverity, TITANS
} from '../../agents/audits';
import { validateAgainstThreat } from '../../agents/defenses';
import { exportCombinedCSV, exportCombinedPDF } from '../../utils/auditExport';

const TITAN_ICONS = {
  mitnick: Shield,
  geohot: Zap,
  kamkar: Eye,
  miller: Target,
  jack: Anchor,
};

const SEVERITY_COLORS = {
  critical: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
  medium: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  low: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  info: 'bg-slate-500/20 text-slate-400 border-slate-500/40',
};

const PHASES = [
  { id: 1, name: "Devil's Team 5-Titan Audit", icon: Shield, color: 'blue' },
  { id: 2, name: 'F&B Management Scenarios', icon: UtensilsCrossed, color: 'amber' },
  { id: 3, name: 'Security Scenarios', icon: Lock, color: 'rose' },
];

// ── Sample payloads for Zod validation (consolidated from tab components) ──
const SECURITY_PAYLOADS = {
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

const FB_PAYLOADS = {
  fb_director: {
    mitnick: { action: 'VIEW_PNL', requester_role: 'staff', mfa_token: '', void_reason: '', post_tender: false, settlement_match: true, session_timeout: 10 },
    geohot: { action: 'BOOK_VENUE', venue_slot: 'SLOT-A1', slot_lock: false, event_id: 'EVT-001', guaranteed_revenue: 45000, attrition_tracked: true },
    miller: { action: 'AUDIT_FRANCHISE', franchise_id: 'FR-007', violation_count: -5, compliance_score: 150, royalty_reported: 0, hash_chain: true, server_computed: false },
    jack: { action: 'SYNC_ROYALTY', franchise_id: 'FR-007', violation_count: 2, compliance_score: 85, royalty_reported: 14200, hash_chain: false, server_computed: true },
    kamkar: { action: 'EXPORT_PNL', requester_role: 'fb_director', mfa_token: 'tok', void_reason: 'N/A', post_tender: false, settlement_match: true, session_timeout: 60 },
  },
  restaurant_manager: {
    mitnick: { action: 'APPROVE_VOID', requester_role: 'cashier', mfa_token: '', void_reason: 'cust_cancel', post_tender: true, settlement_match: true, session_timeout: 10 },
    geohot: { action: 'APPROVE_VOID', requester_role: 'restaurant_manager', mfa_token: 'tok', void_reason: 'kitchen_error', post_tender: true, settlement_match: true, session_timeout: 10 },
    miller: { action: 'LOG_TEMP', ccp_id: 'CCP-03', temperature_c: 999, sensor_signed: true, deviation_alert: true, hash_chain: true, ccp_lock: true },
    jack: { action: 'SYNC_OFFLINE', requester_role: 'restaurant_manager', mfa_token: 'tok', void_reason: 'offline_void', post_tender: false, settlement_match: false, session_timeout: 10 },
    kamkar: { action: 'VIEW_PAYMENTS', requester_role: 'restaurant_manager', mfa_token: 'tok', void_reason: 'N/A', post_tender: false, settlement_match: true, session_timeout: 45 },
  },
  purchasing_manager: {
    mitnick: { action: 'APPROVE_PO', supplier_id: 'NEW-001', unit_price: 28.50, quantity: 100, dual_approval: false, price_benchmark_verified: false, supplier_certified: false },
    geohot: { action: 'APPROVE_PO', supplier_id: 'SUP-022', unit_price: 15.00, quantity: 500, dual_approval: true, price_benchmark_verified: true, supplier_certified: true },
    miller: { action: 'CREATE_PO', supplier_id: 'SUP-022', unit_price: -15.00, quantity: 100, dual_approval: true, price_benchmark_verified: true, supplier_certified: true },
    jack: { action: 'LOG_COLDCHAIN', transport_route: 'ROUTE-B', temperature_c: 8.5, iot_logged: true, gap_detected: true, receiving_verified: true, hash_chain: true },
    kamkar: { action: 'VIEW_CONTRACTS', supplier_id: 'SUP-022', unit_price: 15.00, quantity: 100, dual_approval: true, price_benchmark_verified: true, supplier_certified: true },
  },
  qa_manager: {
    mitnick: { action: 'ACCESS_HACCP', ccp_id: 'CCP-01', temperature_c: 4.0, sensor_signed: true, deviation_alert: true, hash_chain: true, ccp_lock: true },
    geohot: { action: 'LOG_TEMP', ccp_id: 'CCP-01', temperature_c: 4.0, sensor_signed: true, deviation_alert: true, hash_chain: true, ccp_lock: false },
    miller: { action: 'LOG_TEMP', ccp_id: 'CCP-01', temperature_c: 999, sensor_signed: false, deviation_alert: false, hash_chain: true, ccp_lock: true },
    jack: { action: 'SYNC_HACCP', ccp_id: 'CCP-01', temperature_c: 4.0, sensor_signed: true, deviation_alert: true, hash_chain: false, ccp_lock: true },
    kamkar: { action: 'VIEW_ALLERGENS', supplier_id: 'SUP-022', unit_price: 15.00, quantity: 100, dual_approval: true, price_benchmark_verified: true, supplier_certified: true },
  },
};

function getPayload(roleId, titanId, scenarioSet) {
  const table = scenarioSet === 'F&B Management' ? FB_PAYLOADS : SECURITY_PAYLOADS;
  return table[roleId]?.[titanId] || { action: 'EXPLOIT', role: roleId, titan: titanId };
}

const DELAY_MS = 120;

export default function ScenarioConductor({ autoStart = false, onReset }) {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [currentRoleName, setCurrentRoleName] = useState('');
  const [findings, setFindings] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const cancelRef = useRef(false);
  const findingsEndRef = useRef(null);

  useEffect(() => {
    if (autoStart && !isRunning && !isComplete && findings.length === 0) {
      runAllScenarios();
    }
  }, [autoStart]);

  useEffect(() => {
    findingsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [findings.length]);

  const appendFinding = useCallback((finding) => {
    setFindings(prev => [...prev, finding]);
  }, []);

  const delay = (ms) => new Promise(r => setTimeout(r, ms));

  const runAllScenarios = useCallback(async () => {
    cancelRef.current = false;
    setIsRunning(true);
    setIsComplete(false);
    setFindings([]);
    const allFindings = [];

    // ── Phase 1: Devil's Team 5-Titan Audit ──
    setCurrentPhase(1);
    setCurrentRoleName('Devil\'s Team Titans');
    await delay(300);

    const dtResult = runDevilsTeamAudit('continuous');
    for (const f of dtResult.findings) {
      if (cancelRef.current) break;
      const finding = {
        scenarioSet: "Devil's Team",
        role: f.roleName || f.role || 'all',
        titan: f.titan,
        titanName: f.titanName || f.titan,
        vector: f.finding,
        severity: f.severity,
        status: f.status === 'remediated' || f.status === 'waived' ? 'intercepted' : 'breached',
        defense: f.recommendation || '',
        defenseSchemaName: 'Devil\'s Team Audit Module',
        violations: f.attackVector ? [f.attackVector] : [],
      };
      allFindings.push(finding);
      appendFinding(finding);
      await delay(DELAY_MS);
    }

    if (cancelRef.current) { setIsRunning(false); return; }

    // ── Phase 2: F&B Management Scenarios ──
    setCurrentPhase(2);
    for (let ri = 0; ri < FB_MANAGEMENT_ROLES.length; ri++) {
      if (cancelRef.current) break;
      const role = FB_MANAGEMENT_ROLES[ri];
      setCurrentRoleName(role.title);
      for (let ti = 0; ti < role.devilsTeamThreats.length; ti++) {
        if (cancelRef.current) break;
        const threat = role.devilsTeamThreats[ti];
        const payload = getPayload(role.id, threat.titanId, 'F&B Management');
        const validation = validateAgainstThreat(role.id, threat.titanId, payload);
        const severity = getFBThreatSeverity(role.id, threat.titanId);
        const finding = {
          scenarioSet: 'F&B Management',
          role: role.title,
          titan: threat.titanId,
          titanName: threat.titanName,
          vector: threat.vector,
          severity,
          status: validation.intercepted ? 'intercepted' : 'breached',
          defense: threat.defense,
          defenseSchemaName: validation.defenseSchemaName,
          violations: validation.violations,
        };
        allFindings.push(finding);
        appendFinding(finding);
        await delay(DELAY_MS);
      }
    }

    if (cancelRef.current) { setIsRunning(false); return; }

    // ── Phase 3: Security Scenarios ──
    setCurrentPhase(3);
    for (let ri = 0; ri < SECURITY_ROLES.length; ri++) {
      if (cancelRef.current) break;
      const role = SECURITY_ROLES[ri];
      setCurrentRoleName(role.title);
      for (let ti = 0; ti < role.devilsTeamThreats.length; ti++) {
        if (cancelRef.current) break;
        const threat = role.devilsTeamThreats[ti];
        const payload = getPayload(role.id, threat.titanId, 'Security Scenarios');
        const validation = validateAgainstThreat(role.id, threat.titanId, payload);
        const severity = getSecurityThreatSeverity(role.id, threat.titanId);
        const finding = {
          scenarioSet: 'Security Scenarios',
          role: role.title,
          titan: threat.titanId,
          titanName: threat.titanName,
          vector: threat.vector,
          severity,
          status: validation.intercepted ? 'intercepted' : 'breached',
          defense: threat.defense,
          defenseSchemaName: validation.defenseSchemaName,
          violations: validation.violations,
        };
        allFindings.push(finding);
        appendFinding(finding);
        await delay(DELAY_MS);
      }
    }

    if (cancelRef.current) { setIsRunning(false); return; }

    setCurrentPhase(0);
    setCurrentRoleName('');
    setIsRunning(false);
    setIsComplete(true);
  }, [appendFinding]);

  const handleReset = () => {
    cancelRef.current = true;
    setIsRunning(false);
    setIsComplete(false);
    setFindings([]);
    setCurrentPhase(0);
    setCurrentRoleName('');
    if (onReset) onReset();
  };

  // ── Aggregate metrics ──
  const interceptedCount = findings.filter(f => f.status === 'intercepted').length;
  const breachedCount = findings.filter(f => f.status === 'breached').length;
  const criticalCount = findings.filter(f => f.severity === 'critical').length;
  const highCount = findings.filter(f => f.severity === 'high').length;
  const mediumCount = findings.filter(f => f.severity === 'medium').length;

  const phaseMetrics = {
    "Devil's Team": findings.filter(f => f.scenarioSet === "Devil's Team"),
    'F&B Management': findings.filter(f => f.scenarioSet === 'F&B Management'),
    'Security Scenarios': findings.filter(f => f.scenarioSet === 'Security Scenarios'),
  };

  const exportData = {
    findings,
    metrics: {
      total: findings.length,
      intercepted: interceptedCount,
      breached: breachedCount,
      critical: criticalCount,
      high: highCount,
      medium: mediumCount,
    },
  };

  return (
    <div className="space-y-5">
      {/* Progress Indicator */}
      <div className="bg-gradient-to-r from-purple-950/40 via-blue-950/40 to-purple-950/40 border border-purple-500/30 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-500/20 border border-purple-500/40 rounded-xl">
              <Layers className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Conduct All Scenarios</h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Sequential execution: Devil's Team → F&B Management → Security Scenarios
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isRunning && (
              <button
                onClick={handleReset}
                className="px-3 py-2 bg-rose-600/80 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <X className="w-3.5 h-3.5" /> Stop
              </button>
            )}
            {!isRunning && !isComplete && (
              <button
                onClick={runAllScenarios}
                className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md"
              >
                <Play className="w-4 h-4" />
                <span>Start All Scenarios</span>
              </button>
            )}
            {isComplete && (
              <button
                onClick={handleReset}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset
              </button>
            )}
          </div>
        </div>

        {/* Phase Segments */}
        <div className="mt-4 flex items-center gap-2">
          {PHASES.map((phase) => {
            const isActive = currentPhase === phase.id;
            const isDone = isComplete || (currentPhase > phase.id);
            const Icon = phase.icon;
            return (
              <div
                key={phase.id}
                className={`flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all ${
                  isActive
                    ? 'bg-purple-600/30 border-purple-400 shadow-lg ring-1 ring-purple-400/40'
                    : isDone
                    ? 'bg-emerald-950/40 border-emerald-500/40'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-300' : isDone ? 'text-emerald-400' : 'text-slate-500'}`} />
                <div className="min-w-0">
                  <div className={`text-[10px] font-mono font-bold uppercase ${isActive ? 'text-purple-300' : isDone ? 'text-emerald-400' : 'text-slate-500'}`}>
                    Phase {phase.id}/3
                  </div>
                  <div className={`text-xs font-semibold truncate ${isActive ? 'text-white' : isDone ? 'text-emerald-300' : 'text-slate-400'}`}>
                    {phase.name}
                  </div>
                </div>
                {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto shrink-0" />}
                {isActive && <RefreshCw className="w-3.5 h-3.5 text-purple-300 animate-spin ml-auto shrink-0" />}
              </div>
            );
          })}
        </div>

        {/* Running tally */}
        {(isRunning || isComplete) && (
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="text-slate-400">
              {isRunning && currentRoleName ? `Testing: ${currentRoleName}` : isComplete ? 'All phases complete' : ''}
            </span>
            <span className="flex items-center gap-1 text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> {criticalCount} critical
            </span>
            <span className="flex items-center gap-1 text-orange-400">
              <span className="w-2 h-2 rounded-full bg-orange-500" /> {highCount} high
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> {mediumCount} medium
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> {interceptedCount} intercepted
            </span>
            <span className="flex items-center gap-1 text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> {breachedCount} breached
            </span>
            <span className="text-slate-300 ml-auto">{findings.length} total findings</span>
          </div>
        )}
      </div>

      {/* Live Findings Panel */}
      {findings.length > 0 && (
        <div className="bg-[#0B1C30]/90 border border-slate-800 rounded-2xl p-4 space-y-2 max-h-[500px] overflow-y-auto">
          <div className="text-xs font-mono text-slate-400 uppercase font-bold mb-2 sticky top-0 bg-[#0B1C30] py-1">
            Live Findings ({findings.length})
          </div>
          {findings.map((f, idx) => {
            const TitanIcon = TITAN_ICONS[f.titan] || Shield;
            return (
              <div
                key={idx}
                className={`bg-slate-900/60 border rounded-lg p-3 flex items-start gap-3 ${
                  f.status === 'breached' ? 'border-rose-500/30' : 'border-emerald-500/20'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  <span className="text-base">{TITANS.find(t => t.id === f.titan)?.avatar || '🛡️'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${SEVERITY_COLORS[f.severity] || SEVERITY_COLORS.info}`}>
                      {f.severity}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                      f.status === 'intercepted'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    }`}>
                      {f.status}
                    </span>
                    <span className="text-[10px] font-mono text-purple-400 bg-purple-950/40 px-1.5 py-0.5 rounded border border-purple-800/40">
                      {f.scenarioSet}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{f.role}</span>
                    <span className="text-[10px] font-mono text-slate-500">· {f.titanName}</span>
                  </div>
                  <div className="text-xs text-white font-medium leading-snug">{f.vector}</div>
                  <div className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                    <span className="text-[#00E5FF] font-mono">Defense:</span> {f.defense}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={findingsEndRef} />
        </div>
      )}

      {/* Empty state */}
      {!isRunning && findings.length === 0 && !isComplete && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center">
          <Layers className="w-12 h-12 text-purple-500/40 mx-auto mb-3" />
          <p className="text-sm text-slate-400">
            Click <span className="text-purple-400 font-semibold">Start All Scenarios</span> to run all three audit phases sequentially.
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Devil's Team (5 Titans) → F&B Management (4 roles × 5 threats) → Security Scenarios (7 roles × 5 threats)
          </p>
        </div>
      )}

      {/* Summary Dashboard */}
      {isComplete && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-emerald-950/40 to-blue-950/40 border border-emerald-500/30 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">All Scenarios Complete — Summary Dashboard</h3>
            </div>

            {/* Metric cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-white">{findings.length}</div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Total Threats</div>
              </div>
              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-emerald-400">{interceptedCount}</div>
                <div className="text-[10px] font-mono text-emerald-400/70 uppercase">Intercepted</div>
              </div>
              <div className="bg-rose-950/40 border border-rose-500/30 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-rose-400">{breachedCount}</div>
                <div className="text-[10px] font-mono text-rose-400/70 uppercase">Breached</div>
              </div>
              <div className="bg-rose-950/30 border border-rose-500/20 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-rose-400">{criticalCount}</div>
                <div className="text-[10px] font-mono text-rose-400/70 uppercase">Critical</div>
              </div>
              <div className="bg-orange-950/30 border border-orange-500/20 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-orange-400">{highCount}</div>
                <div className="text-[10px] font-mono text-orange-400/70 uppercase">High</div>
              </div>
              <div className="bg-amber-950/30 border border-amber-500/20 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-amber-400">{mediumCount}</div>
                <div className="text-[10px] font-mono text-amber-400/70 uppercase">Medium</div>
              </div>
            </div>

            {/* Per-scenario-set breakdown */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.entries(phaseMetrics).map(([setName, setFindings]) => {
                const setIntercepted = setFindings.filter(f => f.status === 'intercepted').length;
                const setBreached = setFindings.filter(f => f.status === 'breached').length;
                return (
                  <div key={setName} className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                    <div className="text-xs font-bold text-white mb-2">{setName}</div>
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="text-slate-400">{setFindings.length} total</span>
                      <span className="text-emerald-400">{setIntercepted} int.</span>
                      <span className="text-rose-400">{setBreached} brch.</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Export buttons */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                onClick={() => exportCombinedCSV(exportData)}
                className="px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-600/50 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-2 transition-all shadow hover:text-white"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Export Combined CSV</span>
              </button>
              <button
                onClick={() => exportCombinedPDF(exportData)}
                className="px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-600/50 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-2 transition-all shadow hover:text-white"
              >
                <Download className="w-4 h-4 text-rose-400" />
                <span>Export Combined PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
