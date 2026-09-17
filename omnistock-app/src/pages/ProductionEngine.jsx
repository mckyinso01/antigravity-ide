import React, { useState, useEffect } from 'react';
import {
  Shield, ShieldAlert, ShieldCheck, Zap, Terminal, CheckCircle2,
  AlertTriangle, RefreshCw, Play, SkipForward, ArrowRight, BookOpen,
  Lock, Cpu, Eye, Target, Anchor, Filter, Clock, ChevronRight,
  Sparkles, Layers, Check, X, FileCode, ExternalLink, AlertOctagon
} from 'lucide-react';
import lifecycleConfig from '../agents/production-lifecycle.json';
import skillsCatalog from '../agents/skills-catalog.json';
import {
  getEngineState, subscribeEngine, setPhase, toggleSkillSkip,
  executeSkill, runAutoPhase, getExecutionLogs, getAllPatterns, addCustomPattern, resetEngineState
} from '../agents/engine';
import {
  runDevilsTeamAudit, updateFindingStatus, applyGateOverride, revokeGateOverride, getGateOverride
} from '../agents/audits';

const TITAN_ICONS = {
  mitnick: Shield,
  geohot: Zap,
  kamkar: Eye,
  miller: Target,
  jack: Anchor
};

const SEVERITY_COLORS = {
  critical: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
  medium: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  low: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  info: 'bg-slate-500/20 text-slate-400 border-slate-500/40',
};

export default function ProductionEngine() {
  const [engineState, setEngineState] = useState(getEngineState());
  const [activeTab, setActiveTab] = useState('skills'); // 'skills' | 'devils-team' | 'patterns' | 'history'
  const [titanFilter, setTitanFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [selectedFinding, setSelectedFinding] = useState(null);
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);
  const [overrideReason, setOverrideReason] = useState('');
  const [overrideAuthor, setOverrideAuthor] = useState('Mharc Gatan (Founder)');
  const [isPatternModalOpen, setIsPatternModalOpen] = useState(false);
  const [newPatternTitle, setNewPatternTitle] = useState('');
  const [newPatternDesc, setNewPatternDesc] = useState('');
  const [newPatternCategory, setNewPatternCategory] = useState('Architecture & Resiliency');
  const [newPatternSnippet, setNewPatternSnippet] = useState('');
  const [selectedSkillLog, setSelectedSkillLog] = useState(null);

  useEffect(() => {
    const unsub = subscribeEngine((newState) => {
      setEngineState({ ...newState });
    });
    return unsub;
  }, []);

  const currentPhaseConfig = lifecycleConfig.phases.find(p => p.id === engineState.currentPhase) || lifecycleConfig.phases[0];
  const currentSkills = engineState.phaseStates[engineState.currentPhase] || [];
  const auditState = engineState.lastAuditResult || { findings: [], metrics: {}, gateDecision: 'PASSED' };
  const allPatterns = getAllPatterns();
  const execLogs = getExecutionLogs();
  const gateOverride = getGateOverride();

  const isGateBlocked = auditState.gateDecision === 'BLOCKED';

  // Filtered findings
  const filteredFindings = auditState.findings?.filter(f => {
    if (titanFilter !== 'all' && f.titan !== titanFilter) return false;
    if (severityFilter !== 'all') {
      if (severityFilter === 'open' && f.status !== 'open') return false;
      if (severityFilter === 'remediated' && f.status !== 'remediated') return false;
      if (severityFilter === 'critical' && f.severity !== 'critical') return false;
      if (['high', 'medium', 'low'].includes(severityFilter) && f.severity !== severityFilter) return false;
    }
    return true;
  }) || [];

  const handleRunContinuousAudit = () => {
    const res = runDevilsTeamAudit('continuous');
    setEngineState(getEngineState());
  };

  const handleRunGateAudit = () => {
    const res = runDevilsTeamAudit('strict_gate');
    setEngineState(getEngineState());
  };

  const handleRemediate = (findingId) => {
    updateFindingStatus(findingId, 'remediated', { remediatedAt: new Date().toISOString() });
    setEngineState(getEngineState());
  };

  const handleWaive = (findingId) => {
    updateFindingStatus(findingId, 'waived', { waivedReason: 'Admin waiver applied' });
    setEngineState(getEngineState());
  };

  const handleApplyOverride = () => {
    if (!overrideReason.trim()) return;
    applyGateOverride(overrideAuthor, overrideReason);
    setIsOverrideModalOpen(false);
    setOverrideReason('');
    setEngineState(getEngineState());
  };

  const handleRevokeOverride = () => {
    revokeGateOverride();
    setEngineState(getEngineState());
  };

  const handleAddCustomPattern = () => {
    if (!newPatternTitle.trim() || !newPatternDesc.trim()) return;
    addCustomPattern({
      title: newPatternTitle,
      category: newPatternCategory,
      description: newPatternDesc,
      codeSnippet: newPatternSnippet || '// Reusable enterprise production snippet',
      benefit: 'Absorbed directly from interactive production session.',
      tags: ['custom', 'absorbed']
    });
    setIsPatternModalOpen(false);
    setNewPatternTitle('');
    setNewPatternDesc('');
    setNewPatternSnippet('');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-32 sm:pb-36 space-y-6 max-w-7xl mx-auto text-slate-100">
      {/* Top Banner / Studio Identity */}
      <div className="bg-gradient-to-r from-[#0B1C30] via-[#0E2744] to-[#0B1C30] border border-blue-900/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-blue-500/20 text-[#00E5FF] border border-blue-400/30 text-xs font-mono font-bold rounded-lg tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Maestro Studio Engine
              </span>
              <span className="text-xs font-mono text-slate-400">v2.1.0 Enterprise Production</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Enterprise SaaS Production Pipeline
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
              Auto-invoking 25 Maestro skills across 5 lifecycle stages, hardened by the Devil's Team 5-Titan adversarial security gate.
            </p>
          </div>

          {/* Gate Decision & Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <div className={`px-4 py-2.5 rounded-xl border flex items-center gap-3 shadow-lg ${
              isGateBlocked 
                ? 'bg-rose-950/60 border-rose-500/50 text-rose-300 shadow-rose-950/40' 
                : 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300 shadow-emerald-950/40'
            }`}>
              {isGateBlocked ? (
                <ShieldAlert className="w-6 h-6 text-rose-400 animate-pulse" />
              ) : (
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              )}
              <div>
                <div className="text-[10px] uppercase font-mono tracking-wider font-semibold opacity-80">
                  Devil's Team Gate
                </div>
                <div className="text-sm font-bold flex items-center gap-2">
                  {isGateBlocked ? 'DEPLOYMENT BLOCKED' : 'DEPLOYMENT PASS'}
                  {auditState.overrideActive && (
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded">
                      Admin Override Active
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={handleRunContinuousAudit}
              className="px-3.5 py-2.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-600/50 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-2 transition-all shadow hover:text-white"
              title="Run fast lightweight scan on current code"
            >
              <RefreshCw className="w-4 h-4 text-[#00E5FF]" />
              <span>Continuous Scan</span>
            </button>

            <button
              onClick={handleRunGateAudit}
              className="px-3.5 py-2.5 bg-blue-600 hover:bg-blue-500 border border-blue-400/50 rounded-xl text-xs font-semibold text-white flex items-center gap-2 transition-all shadow-md shadow-blue-900/50"
              title="Run strict 5-Titan deployment check"
            >
              <Lock className="w-4 h-4" />
              <span>Strict Gate Audit</span>
            </button>
          </div>
        </div>

        {/* Phase Stepper Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {lifecycleConfig.phases.map((phase, idx) => {
            const isCurrent = phase.id === engineState.currentPhase;
            const phaseSkillsList = engineState.phaseStates[phase.id] || [];
            const completedCount = phaseSkillsList.filter(s => s.status === 'completed').length;
            const totalCount = phaseSkillsList.length;

            return (
              <button
                key={phase.id}
                onClick={() => setPhase(phase.id)}
                className={`text-left p-3 rounded-xl border transition-all relative ${
                  isCurrent
                    ? 'bg-blue-600/20 border-[#00E5FF] shadow-lg shadow-blue-950/50 ring-1 ring-[#00E5FF]/40'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className={`font-bold ${isCurrent ? 'text-[#00E5FF]' : 'text-slate-400'}`}>
                    0{idx + 1}. {phase.id.toUpperCase()}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {completedCount}/{totalCount}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-200 truncate">
                  {phase.name.split(': ')[1] || phase.name}
                </div>
                <div className="mt-2 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      completedCount === totalCount ? 'bg-emerald-500' : isCurrent ? 'bg-[#00E5FF]' : 'bg-blue-600'
                    }`}
                    style={{ width: `${totalCount ? (completedCount / totalCount) * 100 : 0}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'skills'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Phase Auto-Skills ({currentSkills.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('devils-team')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'devils-team'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Devil's Team 5-Titan Audit ({auditState.findings?.length || 0})</span>
            {auditState.metrics?.critical > 0 && (
              <span className="px-1.5 py-0.2 bg-rose-500 text-white text-[10px] rounded-full font-mono">
                {auditState.metrics.critical}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('patterns')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'patterns'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Pattern Absorption Library ({allPatterns.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'history'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Execution Telemetry ({execLogs.length})</span>
          </button>
        </div>

        <button
          onClick={resetEngineState}
          className="text-xs text-slate-400 hover:text-slate-200 underline font-mono flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" /> Reset Pipeline State
        </button>
      </div>

      {/* TAB 1: PHASE AUTO-SKILLS */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/70 border border-slate-800 p-4 rounded-xl">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{currentPhaseConfig.name}</span>
                <span className="text-xs font-mono text-blue-400 px-2 py-0.5 bg-blue-950/60 border border-blue-800/60 rounded">
                  {currentPhaseConfig.trigger}
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">{currentPhaseConfig.description}</p>
            </div>

            <button
              onClick={() => runAutoPhase(engineState.currentPhase)}
              disabled={engineState.isAutoRunning}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                engineState.isAutoRunning
                  ? 'bg-blue-900/50 text-blue-300 cursor-wait'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/50'
              }`}
            >
              {engineState.isAutoRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-blue-200" />
                  <span>Auto-Invoking Pipeline...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Auto-Run Phase Skills</span>
                </>
              )}
            </button>
          </div>

          {/* Skill Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentSkills.map((item) => {
              const skillMeta = skillsCatalog.find(s => s.id === item.skillId) || {
                name: item.skillId,
                description: '',
                category: 'workflow'
              };
              const isRunning = item.status === 'running';
              const isCompleted = item.status === 'completed';
              const isSkipped = item.status === 'skipped';

              return (
                <div
                  key={item.skillId}
                  className={`bg-[#0B1C30]/80 border rounded-xl p-4 flex flex-col justify-between transition-all ${
                    isRunning
                      ? 'border-[#00E5FF] shadow-lg shadow-blue-950/60 ring-1 ring-[#00E5FF]/40'
                      : isCompleted
                      ? 'border-emerald-500/40 bg-[#0B1C30]/90'
                      : isSkipped
                      ? 'border-slate-800 opacity-60'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {item.auto ? 'Auto-Invoked' : 'Optional'}
                      </span>
                      <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded flex items-center gap-1 ${
                        isRunning
                          ? 'bg-blue-500/20 text-[#00E5FF] animate-pulse'
                          : isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : isSkipped
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-slate-800/80 text-slate-400'
                      }`}>
                        {isRunning && <RefreshCw className="w-3 h-3 animate-spin" />}
                        {isCompleted && <CheckCircle2 className="w-3 h-3" />}
                        {item.status.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                      <span>/{item.skillId}</span>
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-3 leading-relaxed">
                      {skillMeta.description}
                    </p>

                    {item.durationMs && (
                      <div className="mt-2 text-[11px] font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>Execution time: {item.durationMs}ms</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedSkillLog(item)}
                      className="text-xs text-[#00E5FF] hover:underline flex items-center gap-1 font-mono"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Logs ({item.logs?.length || 0})</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => toggleSkillSkip(engineState.currentPhase, item.skillId)}
                        disabled={isRunning}
                        title={isSkipped ? 'Unskip skill' : 'Skip skill'}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs"
                      >
                        <SkipForward className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => executeSkill(engineState.currentPhase, item.skillId)}
                        disabled={isRunning || engineState.isAutoRunning}
                        className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1 transition-all"
                      >
                        <Play className="w-3 h-3" />
                        <span>Run</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: DEVIL'S TEAM 5-TITAN ADVERSARIAL AUDIT */}
      {activeTab === 'devils-team' && (
        <div className="space-y-6">
          {/* Gate Alert Block if Blocked */}
          {isGateBlocked && (
            <div className="bg-rose-950/70 border border-rose-500/60 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
              <div className="flex items-start gap-3.5">
                <AlertOctagon className="w-6 h-6 text-rose-400 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h3 className="text-base font-bold text-white">
                    Pre-Deployment Gate Blocked: {auditState.metrics?.critical} Open Critical Vulnerability Found
                  </h3>
                  <p className="text-xs text-rose-200 mt-1 max-w-2xl leading-relaxed">
                    Under the 5-Titan zero-defect policy, SaaS code cannot proceed to client delivery with open critical findings. Remediate with /fortify & /guard, or invoke Admin Override.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOverrideModalOpen(true)}
                  className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-950"
                >
                  Admin Override Gate
                </button>
              </div>
            </div>
          )}

          {auditState.overrideActive && (
            <div className="bg-amber-950/60 border border-amber-500/50 rounded-2xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="text-xs font-bold text-amber-200">
                    Active Deployment Waiver by {auditState.overrideDetails?.author}
                  </div>
                  <div className="text-xs text-amber-300/80">
                    "{auditState.overrideDetails?.reason}" — {new Date(auditState.overrideDetails?.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
              <button
                onClick={handleRevokeOverride}
                className="px-3 py-1.5 bg-amber-900/60 hover:bg-amber-800 border border-amber-600/50 text-amber-200 text-xs font-semibold rounded-lg"
              >
                Revoke Waiver
              </button>
            </div>
          )}

          {/* 5-Titan Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {lifecycleConfig.devilsTeam.titans.map((titan) => {
              const Icon = TITAN_ICONS[titan.id] || Shield;
              const titanFindings = auditState.findings?.filter(f => f.titan === titan.id) || [];
              const critCount = titanFindings.filter(f => f.severity === 'critical' && f.status === 'open').length;
              const isSelected = titanFilter === titan.id;

              return (
                <button
                  key={titan.id}
                  onClick={() => setTitanFilter(isSelected ? 'all' : titan.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-blue-600/20 border-[#00E5FF] shadow-md ring-1 ring-[#00E5FF]/40'
                      : 'bg-[#0B1C30]/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{titan.avatar}</span>
                    {critCount > 0 ? (
                      <span className="px-1.5 py-0.5 bg-rose-500 text-white font-mono text-[10px] font-bold rounded">
                        {critCount} CRIT
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono text-[10px] rounded">
                        CLEAN
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-sm text-white mt-2 truncate">{titan.name}</div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">{titan.focus}</div>
                  <div className="text-[11px] font-mono text-slate-500 mt-2">
                    {titanFindings.length} findings
                  </div>
                </button>
              );
            })}
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 p-3 rounded-xl text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-400 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Severity:
              </span>
              {['all', 'open', 'critical', 'high', 'medium', 'remediated'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-2.5 py-1 rounded-lg font-mono uppercase text-[10px] font-bold transition-all ${
                    severityFilter === sev
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>

            <div className="font-mono text-slate-400">
              Showing {filteredFindings.length} of {auditState.findings?.length || 0} findings
            </div>
          </div>

          {/* Findings List */}
          <div className="space-y-3">
            {filteredFindings.map((finding) => {
              const isRemediated = finding.status === 'remediated';
              const isWaived = finding.status === 'waived';

              return (
                <div
                  key={finding.id}
                  className={`bg-[#0B1C30]/90 border rounded-xl p-4 transition-all ${
                    finding.severity === 'critical' && finding.status === 'open'
                      ? 'border-rose-500/60 shadow-lg shadow-rose-950/20'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${SEVERITY_COLORS[finding.severity]}`}>
                        {finding.severity}
                      </span>
                      <span className="font-mono text-xs text-slate-400">{finding.id}</span>
                      <span className="text-xs font-semibold text-slate-300">Titan: {finding.titanName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
                        isRemediated
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : isWaived
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      }`}>
                        {finding.status}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-white mt-2">{finding.finding}</h4>

                  <div className="mt-2 text-xs font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1.5 rounded border border-slate-800/80 truncate">
                    Component: <span className="text-slate-200">{finding.component}</span>
                  </div>

                  <div className="mt-2 text-xs text-slate-300 bg-blue-950/30 border border-blue-900/30 p-2.5 rounded-lg leading-relaxed">
                    <span className="font-semibold text-[#00E5FF]">Recommendation:</span> {finding.recommendation}
                  </div>

                  {finding.attackVector && (
                    <div className="mt-2 text-xs text-rose-300/90 bg-rose-950/20 border border-rose-900/30 p-2.5 rounded-lg leading-relaxed">
                      <span className="font-semibold text-rose-400">Attack Vector:</span> {finding.attackVector}
                    </div>
                  )}

                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-end gap-2">
                    {finding.status === 'open' && (
                      <>
                        <button
                          onClick={() => handleWaive(finding.id)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-semibold"
                        >
                          Waive
                        </button>
                        <button
                          onClick={() => handleRemediate(finding.id)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold shadow flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Mark Remediated</span>
                        </button>
                      </>
                    )}
                    {finding.status !== 'open' && (
                      <button
                        onClick={() => updateFindingStatus(finding.id, 'open')}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded text-xs"
                      >
                        Reopen Finding
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: PATTERN ABSORPTION LIBRARY */}
      {activeTab === 'patterns' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/70 border border-slate-800 p-4 rounded-xl">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#00E5FF]" />
                <span>Compounding Enterprise Pattern Library</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Every completed project feeds reusable architectural patterns back into the studio library via /extract-pattern.
              </p>
            </div>

            <button
              onClick={() => setIsPatternModalOpen(true)}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Sparkles className="w-4 h-4" />
              <span>Absorb New Pattern</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allPatterns.map((pat) => (
              <div
                key={pat.id}
                className="bg-[#0B1C30]/80 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/60 font-semibold">
                      {pat.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Origin: /{pat.skillOrigin || 'custom'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">{pat.title}</h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{pat.description}</p>

                  <div className="mt-3 bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-[#00E5FF] overflow-x-auto">
                    <pre>{pat.codeSnippet}</pre>
                  </div>

                  <div className="mt-3 text-xs text-emerald-300/90 font-medium">
                    ✓ Benefit: {pat.benefit}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {pat.tags?.map((t) => (
                      <span key={t} className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => navigator.clipboard.writeText(pat.codeSnippet)}
                    className="text-xs text-slate-400 hover:text-white font-mono flex items-center gap-1"
                  >
                    <FileCode className="w-3.5 h-3.5" /> Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: EXECUTION TELEMETRY */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Maestro Skill Execution Telemetry Logs</h2>
            <span className="text-xs font-mono text-slate-400">{execLogs.length} recorded events</span>
          </div>

          <div className="bg-[#0B1C30]/90 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Skill</th>
                  <th className="p-3">Phase</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {execLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40">
                    <td className="p-3 text-slate-400">{new Date(log.timestamp).toLocaleTimeString()}</td>
                    <td className="p-3 font-bold text-white">/{log.skillId}</td>
                    <td className="p-3 uppercase text-blue-400">{log.phase}</td>
                    <td className="p-3">{log.durationMs}ms</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {execLogs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-slate-500">
                      No skill executions recorded yet. Run a phase auto-skill above!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADMIN OVERRIDE MODAL */}
      {isOverrideModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1C30] border border-rose-500/50 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 text-rose-400" />
              <h3 className="text-lg font-bold text-white">Admin Deployment Gate Override</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              This action grants a formal waiver allowing the app to bypass open critical findings. All waivers are immutably signed with your operator credentials and timestamped.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Authorizing Admin:</label>
                <input
                  type="text"
                  value={overrideAuthor}
                  onChange={(e) => setOverrideAuthor(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Justification / Audit Waiver Reason:</label>
                <textarea
                  rows={3}
                  value={overrideReason}
                  placeholder="e.g. Offline demo staging tenant; client penetration team will review in sandbox."
                  onChange={(e) => setOverrideReason(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsOverrideModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyOverride}
                disabled={!overrideReason.trim()}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold disabled:opacity-50"
              >
                Sign & Authorize Waiver
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ABSORB PATTERN MODAL */}
      {isPatternModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1C30] border border-blue-500/50 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-[#00E5FF]" />
              <h3 className="text-lg font-bold text-white">Absorb Pattern into Studio Library</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Feed reusable architecture, security safeguards, or workflow routines back into the studio pattern bank.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Pattern Title:</label>
                <input
                  type="text"
                  placeholder="e.g. Atomic Dexie Write Queue with Exponential Backoff"
                  value={newPatternTitle}
                  onChange={(e) => setNewPatternTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Category:</label>
                <select
                  value={newPatternCategory}
                  onChange={(e) => setNewPatternCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                >
                  <option>Architecture & Resiliency</option>
                  <option>Security & Adversarial QA</option>
                  <option>Input Validation & Integrity</option>
                  <option>Data Hygiene & Privacy</option>
                  <option>Fault Tolerance</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Description:</label>
                <textarea
                  rows={2}
                  placeholder="Summary of how this pattern solves production failure modes..."
                  value={newPatternDesc}
                  onChange={(e) => setNewPatternDesc(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Code / Schema Snippet:</label>
                <textarea
                  rows={3}
                  placeholder="// Paste reusable implementation snippet"
                  value={newPatternSnippet}
                  onChange={(e) => setNewPatternSnippet(e.target.value)}
                  className="w-full bg-slate-950 font-mono border border-slate-700 rounded-lg px-3 py-2 text-xs text-[#00E5FF]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsPatternModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCustomPattern}
                disabled={!newPatternTitle.trim() || !newPatternDesc.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold disabled:opacity-50"
              >
                Save & Absorb
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SKILL LOG MODAL */}
      {selectedSkillLog && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1C30] border border-blue-500/50 rounded-2xl p-6 max-w-xl w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-[#00E5FF]" />
                <h3 className="text-base font-bold text-white">/{selectedSkillLog.skillId} Execution Logs</h3>
              </div>
              <button
                onClick={() => setSelectedSkillLog(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 max-h-72 overflow-y-auto space-y-1.5">
              {selectedSkillLog.logs?.length > 0 ? (
                selectedSkillLog.logs.map((line, i) => (
                  <div key={i} className="text-slate-300">{line}</div>
                ))
              ) : (
                <div className="text-slate-500">No logs for this skill yet. Click 'Run' to invoke.</div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedSkillLog(null)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
