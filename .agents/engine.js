import lifecycleConfig from './production-lifecycle.json';
import skillsCatalog from './skills-catalog.json';
import patternsData from './patterns/patterns.json';
import { runDevilsTeamAudit, getPersistedAuditState, updateFindingStatus, applyGateOverride, revokeGateOverride, getGateOverride } from './audits';
import { dispatchConnectorAction } from './connectors';

const LOCAL_STORAGE_KEY_ENGINE_STATE = 'omnistock_maestro_engine_state';
const LOCAL_STORAGE_KEY_EXEC_LOGS = 'omnistock_maestro_exec_logs';
const LOCAL_STORAGE_KEY_CUSTOM_PATTERNS = 'omnistock_custom_patterns';

const listeners = new Set();

function notifyListeners() {
  const state = getEngineState();
  listeners.forEach(cb => cb(state));
}

export function subscribeEngine(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function initializeDefaultState() {
  const phaseSkills = {};
  lifecycleConfig.phases.forEach(phase => {
    phaseSkills[phase.id] = [
      ...phase.autoSkills.map(skillId => ({
        skillId,
        auto: true,
        status: 'pending', // 'pending' | 'running' | 'completed' | 'skipped'
        logs: [],
        startedAt: null,
        completedAt: null,
        durationMs: null
      })),
      ...(phase.optionalSkills || []).map(skillId => ({
        skillId,
        auto: false,
        status: 'pending',
        logs: [],
        startedAt: null,
        completedAt: null,
        durationMs: null
      }))
    ];
  });

  return {
    currentPhase: 'intake',
    phaseStates: phaseSkills,
    activeSkillRunning: null,
    continuousAuditActive: true,
    lastAuditResult: getPersistedAuditState() || runDevilsTeamAudit('continuous'),
    isAutoRunning: false,
  };
}

export function getEngineState() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_ENGINE_STATE);
    if (!raw) {
      const initial = initializeDefaultState();
      saveEngineState(initial);
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    return initializeDefaultState();
  }
}

export function saveEngineState(state) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_ENGINE_STATE, JSON.stringify(state));
    notifyListeners();
  } catch (e) {
    console.warn('Failed to save engine state:', e);
  }
}

export function resetEngineState() {
  const initial = initializeDefaultState();
  saveEngineState(initial);
  return initial;
}

export function setPhase(phaseId) {
  const state = getEngineState();
  if (state.currentPhase !== phaseId) {
    state.currentPhase = phaseId;
    saveEngineState(state);
  }
}

export function toggleSkillSkip(phaseId, skillId) {
  const state = getEngineState();
  const list = state.phaseStates[phaseId] || [];
  const item = list.find(s => s.skillId === skillId);
  if (item) {
    item.status = item.status === 'skipped' ? 'pending' : 'skipped';
    saveEngineState(state);
  }
}

export async function executeSkill(phaseId, skillId) {
  const state = getEngineState();
  const list = state.phaseStates[phaseId] || [];
  const item = list.find(s => s.skillId === skillId);
  if (!item) return;

  const skillInfo = skillsCatalog.find(s => s.id === skillId) || { name: skillId, description: '' };

  item.status = 'running';
  item.startedAt = new Date().toISOString();
  item.logs = [`[${new Date().toLocaleTimeString()}] Invoking Maestro skill: ${skillInfo.name}...`];
  state.activeSkillRunning = skillId;
  saveEngineState(state);

  // Simulated structured execution conforming to the skill's SKILL.md protocol
  await new Promise(r => setTimeout(r, 600));

  item.logs.push(`[${new Date().toLocaleTimeString()}] Establishing execution context and reading .maestro.md...`);
  await new Promise(r => setTimeout(r, 600));

  if (skillId === 'diagnose') {
    item.logs.push(`[${new Date().toLocaleTimeString()}] Evaluating 5 dimensions: Prompt (4/5), Context (4/5), Tool (3/5), Arch (4/5), Safety (3/5).`);
  } else if (skillId === 'zero-defect') {
    item.logs.push(`[${new Date().toLocaleTimeString()}] Enforcing 8 Precision Rules & Pre-Commit Verification Gate.`);
  } else if (skillId === 'fortify') {
    item.logs.push(`[${new Date().toLocaleTimeString()}] Adding defensive circuit breakers and Dexie retry wrappers.`);
  } else if (skillId === 'guard') {
    item.logs.push(`[${new Date().toLocaleTimeString()}] Enforcing strict Zod boundary guards & PII scrubbing.`);
  } else if (skillId === 'extract-pattern') {
    item.logs.push(`[${new Date().toLocaleTimeString()}] Absorbed pattern: 'Dual-Mode Devil's Team Gatekeeper' into pattern library.`);
  } else {
    item.logs.push(`[${new Date().toLocaleTimeString()}] Completed execution pass with verified contract conformance.`);
  }

  const durationMs = 1200 + Math.floor(Math.random() * 400);
  item.status = 'completed';
  item.completedAt = new Date().toISOString();
  item.durationMs = durationMs;
  item.logs.push(`[${new Date().toLocaleTimeString()}] Skill ${skillId} execution successful (${durationMs}ms).`);

  // Record in execution log
  appendExecutionLog({
    skillId,
    skillName: skillInfo.name,
    phase: phaseId,
    timestamp: new Date().toISOString(),
    durationMs,
    status: 'success'
  });

  state.activeSkillRunning = null;
  saveEngineState(state);
}

export async function runAutoPhase(phaseId) {
  const state = getEngineState();
  const list = state.phaseStates[phaseId] || [];
  state.isAutoRunning = true;
  saveEngineState(state);

  for (const s of list) {
    if (s.auto && s.status !== 'skipped' && s.status !== 'completed') {
      await executeSkill(phaseId, s.skillId);
    }
  }

  // Auto-dispatch connector notifications based on phase outcomes
  if (phaseId === 'intake') {
    dispatchConnectorAction('intercom', 'Ingest Client Feedback', { client: 'Enterprise Tier-1 Client' }).catch(console.error);
  } else if (phaseId === 'audit') {
    const auditRes = runDevilsTeamAudit('strict_gate');
    const updatedState = getEngineState();
    updatedState.lastAuditResult = auditRes;
    saveEngineState(updatedState);

    // Auto-alert Slack
    const critCount = auditRes.metrics?.critical || 0;
    dispatchConnectorAction('slackbot', 'Audit Gate Alert', {
      message: `Phase 3 Audit Gate: ${critCount > 0 ? `BLOCKED (${critCount} critical findings)` : 'CLEAN PASS'}`
    }).catch(console.error);

    // If critical findings exist, auto-file to Jira
    if (critCount > 0) {
      const firstCrit = auditRes.findings.find(f => f.severity === 'critical' && f.status === 'open');
      dispatchConnectorAction('jira', 'Auto-file Security Ticket', {
        title: firstCrit ? `[Gate Blocker] ${firstCrit.finding}` : 'Critical Vulnerability',
        severity: 'Critical'
      }).catch(console.error);
    }
  } else if (phaseId === 'ship') {
    dispatchConnectorAction('notion', 'Export Reusable Patterns', { count: getAllPatterns().length }).catch(console.error);
    dispatchConnectorAction('slackbot', 'Ship Stage Complete', {
      message: 'Phase 5 Ship: All artifacts verified, patterns absorbed, deployment ready.'
    }).catch(console.error);
  }

  const finalState = getEngineState();
  finalState.isAutoRunning = false;
  saveEngineState(finalState);
}

export function appendExecutionLog(entry) {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_EXEC_LOGS);
    const logs = raw ? JSON.parse(raw) : [];
    logs.unshift({ id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`, ...entry });
    // Keep last 100 logs
    if (logs.length > 100) logs.pop();
    localStorage.setItem(LOCAL_STORAGE_KEY_EXEC_LOGS, JSON.stringify(logs));
  } catch (e) {
    console.warn('Failed to append execution log', e);
  }
}

export function getExecutionLogs() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_EXEC_LOGS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function getAllPatterns() {
  try {
    const customRaw = localStorage.getItem(LOCAL_STORAGE_KEY_CUSTOM_PATTERNS);
    const custom = customRaw ? JSON.parse(customRaw) : [];
    return [...patternsData, ...custom];
  } catch (e) {
    return patternsData;
  }
}

export function addCustomPattern(pattern) {
  try {
    const customRaw = localStorage.getItem(LOCAL_STORAGE_KEY_CUSTOM_PATTERNS);
    const custom = customRaw ? JSON.parse(customRaw) : [];
    const newPat = {
      id: `pat-custom-${Date.now()}`,
      ...pattern,
      absorbedAt: new Date().toISOString()
    };
    custom.unshift(newPat);
    localStorage.setItem(LOCAL_STORAGE_KEY_CUSTOM_PATTERNS, JSON.stringify(custom));
    notifyListeners();
    return newPat;
  } catch (e) {
    console.warn('Failed to save custom pattern', e);
  }
}
