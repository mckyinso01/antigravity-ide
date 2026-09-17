import auditMitnick from './mitnick';
import auditGeohot from './geohot';
import auditKamkar from './kamkar';
import auditMiller from './miller';
import auditJack from './jack';

export * from './roleScenarios';

export const TITANS = [
  { id: 'mitnick', name: 'Kevin Mitnick', role: 'Access Control & Social Eng.', avatar: '🛡️', color: 'emerald' },
  { id: 'geohot', name: 'George Hotz', role: 'System Edge Cases & Concurrency', avatar: '⚡', color: 'blue' },
  { id: 'kamkar', name: 'Samy Kamkar', role: 'Data Exposure & Client Storage', avatar: '👁️', color: 'purple' },
  { id: 'miller', name: 'Charlie Miller', role: 'Fuzzing & Input Validation', avatar: '🎯', color: 'amber' },
  { id: 'jack', name: 'Barnaby Jack', role: 'Infrastructure & Fault Tolerance', avatar: '⚓', color: 'cyan' },
];

const LOCAL_STORAGE_KEY_AUDIT_STATE = 'omnistock_devils_audit_state';
const LOCAL_STORAGE_KEY_GATE_OVERRIDE = 'omnistock_gate_override';

export function runDevilsTeamAudit(mode = 'continuous', context = {}) {
  const t0 = performance.now();
  const allFindings = [
    ...auditMitnick(context, mode),
    ...auditGeohot(context, mode),
    ...auditKamkar(context, mode),
    ...auditMiller(context, mode),
    ...auditJack(context, mode),
  ];

  // Merge persisted waivers only — audit modules are source of truth for open/remediated status
  const savedState = getPersistedAuditState();
  const mergedFindings = allFindings.map(f => {
    const existing = savedState?.findings?.find(ef => ef.id === f.id);
    // Only preserve user-applied waivers from previous runs
    if (existing && existing.status === 'waived') {
      return { ...f, status: 'waived', waivedReason: existing.waivedReason };
    }
    return f;
  });

  const durationMs = Math.round(performance.now() - t0);
  const criticalCount = mergedFindings.filter(f => f.severity === 'critical' && f.status === 'open').length;
  const highCount = mergedFindings.filter(f => f.severity === 'high' && f.status === 'open').length;
  const mediumCount = mergedFindings.filter(f => f.severity === 'medium' && f.status === 'open').length;
  const remediatedCount = mergedFindings.filter(f => f.status === 'remediated').length;
  const waivedCount = mergedFindings.filter(f => f.status === 'waived').length;

  const override = getGateOverride();
  const isGateBlocked = mode === 'strict_gate' ? (criticalCount > 0 && !override?.active) : false;

  const result = {
    id: `dt-audit-${Date.now()}`,
    timestamp: new Date().toISOString(),
    mode,
    auditPass: allFindings[0]?.auditPass || 1,
    durationMs,
    findings: mergedFindings,
    metrics: {
      total: mergedFindings.length,
      critical: criticalCount,
      high: highCount,
      medium: mediumCount,
      remediated: remediatedCount,
      waived: waivedCount,
    },
    gateDecision: isGateBlocked ? 'BLOCKED' : 'PASSED',
    overrideActive: Boolean(override?.active),
    overrideDetails: override || null,
  };

  saveAuditState(result);
  return result;
}

export function getPersistedAuditState() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_AUDIT_STATE);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveAuditState(state) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_AUDIT_STATE, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save audit state:', e);
  }
}

export function updateFindingStatus(findingId, status, extra = {}) {
  const state = getPersistedAuditState();
  if (!state || !state.findings) return null;

  state.findings = state.findings.map(f => {
    if (f.id === findingId) {
      return { ...f, status, ...extra };
    }
    return f;
  });

  // Recompute counts
  const criticalCount = state.findings.filter(f => f.severity === 'critical' && f.status === 'open').length;
  state.metrics.critical = criticalCount;
  state.metrics.remediated = state.findings.filter(f => f.status === 'remediated').length;
  state.metrics.waived = state.findings.filter(f => f.status === 'waived').length;

  const override = getGateOverride();
  state.gateDecision = (criticalCount > 0 && !override?.active) ? 'BLOCKED' : 'PASSED';

  saveAuditState(state);
  return state;
}

export function applyGateOverride(author, reason) {
  const override = {
    active: true,
    author: author || 'Mharc Gatan (Admin)',
    reason: reason || 'Production deployment waiver granted under supervised monitoring',
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(LOCAL_STORAGE_KEY_GATE_OVERRIDE, JSON.stringify(override));

  const state = getPersistedAuditState();
  if (state) {
    state.overrideActive = true;
    state.overrideDetails = override;
    state.gateDecision = 'PASSED';
    saveAuditState(state);
  }
  return override;
}

export function revokeGateOverride() {
  localStorage.removeItem(LOCAL_STORAGE_KEY_GATE_OVERRIDE);
  const state = getPersistedAuditState();
  if (state) {
    state.overrideActive = false;
    state.overrideDetails = null;
    const criticalCount = state.findings.filter(f => f.severity === 'critical' && f.status === 'open').length;
    state.gateDecision = criticalCount > 0 ? 'BLOCKED' : 'PASSED';
    saveAuditState(state);
  }
}

export function getGateOverride() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_GATE_OVERRIDE);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}
