import React, { useState } from 'react';
import {
  Crown, UserCheck, CreditCard, Package, TrendingUp, Megaphone,
  Shield, Zap, Eye, Target, Anchor, Play, RefreshCw, CheckCircle2,
  AlertTriangle, ArrowRight, DollarSign, Receipt, Calculator, Building,
  FileText, Check, AlertOctagon, Terminal, Sparkles, ChevronRight,
  BarChart3, Lock, ShieldAlert, ShieldCheck, X, Users
} from 'lucide-react';
import { ENTERPRISE_ROLES, TITANS, getThreatSeverity, CROSS_ROLE_SCENARIOS } from '../../agents/audits';
import { validateAgainstThreat } from '../../agents/defenses';

const ROLE_ICONS = {
  owner: Crown,
  branch_manager: UserCheck,
  cashier: CreditCard,
  inventory_specialist: Package,
  cost_analyst: TrendingUp,
  marketing_strategist: Megaphone,
};

const TITAN_ICONS = {
  mitnick: Shield,
  geohot: Zap,
  kamkar: Eye,
  miller: Target,
  jack: Anchor
};

const ROLE_COLORS = {
  owner: { gradient: 'from-emerald-600 to-emerald-900', text: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/40' },
  branch_manager: { gradient: 'from-blue-600 to-blue-900', text: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/40' },
  cashier: { gradient: 'from-amber-600 to-amber-900', text: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/40' },
  inventory_specialist: { gradient: 'from-purple-600 to-purple-900', text: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/40' },
  cost_analyst: { gradient: 'from-cyan-600 to-cyan-900', text: 'text-cyan-400', bg: 'bg-cyan-500/20', border: 'border-cyan-500/40' },
  marketing_strategist: { gradient: 'from-rose-600 to-rose-900', text: 'text-rose-400', bg: 'bg-rose-500/20', border: 'border-rose-500/40' },
};

export default function RoleScenariosTab({ onSelectRoleInAudit, auditFindings = [] }) {
  const [selectedRoleId, setSelectedRoleId] = useState('owner');
  const [simulatingTitan, setSimulatingTitan] = useState(null);
  const [simulationLogs, setSimulationLogs] = useState([]);
  const [simulationResult, setSimulationResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Owner Financial Interactive Calculator State
  const [ownerGrossRevenue, setOwnerGrossRevenue] = useState(250000);
  const [ownerCogsPercent, setOwnerCogsPercent] = useState(30);
  const [ownerOpexPercent, setOwnerOpexPercent] = useState(38);
  const [ownerVatRate, setOwnerVatRate] = useState(12);

  const selectedRole = ENTERPRISE_ROLES.find(r => r.id === selectedRoleId) || ENTERPRISE_ROLES[0];
  const RoleIcon = ROLE_ICONS[selectedRole.id] || Crown;

  // Filter findings for this role
  const roleFindings = auditFindings.filter(f => f.role === selectedRole.id || f.role === 'all' || selectedRole.auditRoleAliases?.includes(f.role));
  const criticalRoleFindings = roleFindings.filter(f => f.severity === 'critical' && f.status === 'open');

  // Computed financial figures for Owner
  const cogsAmount = Math.round((ownerGrossRevenue * ownerCogsPercent) / 100);
  const opexAmount = Math.round((ownerGrossRevenue * ownerOpexPercent) / 100);
  const grossProfit = ownerGrossRevenue - cogsAmount;
  const netProfit = grossProfit - opexAmount;
  const netMarginPercent = Math.round((netProfit / ownerGrossRevenue) * 100);
  const outputVat = Math.round((ownerGrossRevenue * ownerVatRate) / (100 + ownerVatRate));
  const estimatedInputVat = Math.round((cogsAmount * 0.7 * (ownerVatRate / 100)));
  const netVatPayable = Math.max(0, outputVat - estimatedInputVat);

  const handleRunSimulation = async (titanId) => {
    const titan = TITANS.find(t => t.id === titanId) || TITANS[0];
    const threat = selectedRole.devilsTeamThreats.find(t => t.titanId === titanId) || selectedRole.devilsTeamThreats[0];
    
    setIsSimulating(true);
    setSimulatingTitan(titan);
    setSimulationResult(null);
    setSimulationLogs([
      `[${new Date().toLocaleTimeString()}] [DEVIL'S TEAM] Initializing adversarial test suite against role: ${selectedRole.title}`,
      `[${new Date().toLocaleTimeString()}] [TITAN: ${titan.name}] Targeting vector: "${threat.vector}"`,
    ]);

    await new Promise(r => setTimeout(r, 600));
    setSimulationLogs(prev => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Injecting adversarial payload into client surface...`,
      `[PAYLOAD]: ${getSamplePayload(selectedRole.id, titanId)}`
    ]);

    await new Promise(r => setTimeout(r, 800));
    setSimulationLogs(prev => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Evaluating runtime boundary defenses: Zod schema validators & Dexie transaction mutex...`
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

  const getSamplePayload = (roleId, titanId) => {
    switch (roleId) {
      case 'owner':
        if (titanId === 'miller') return JSON.stringify({ action: "UPDATE_TAX_CONFIG", branch_id: "BR-02", vat_rate: -0.12, allow_negative_memo: true }, null, 2);
        if (titanId === 'geohot') return JSON.stringify({ action: "SYNC_CONCURRENT_REVENUE", nodes: ["POS-01", "POS-02"], amount: 15420.50, timestamp_delta_ms: 0 }, null, 2);
        return JSON.stringify({ action: "FETCH_FINANCIAL_DRAW", requester_role: "branch_manager", pin_bypass: true }, null, 2);
      case 'branch_manager':
        return JSON.stringify({ action: "OVERRIDE_DISCOUNT", percent: 105.0, supervisor_pin: "0000", order_id: "ORD-9912" }, null, 2);
      case 'cashier':
        return JSON.stringify({ action: "ADD_LINE_ITEM", sku: "STEAK-WAGYU-01", qty: -5, unit_price: 65.00, line_total: -325.00 }, null, 2);
      case 'inventory_specialist':
        return JSON.stringify({ action: "STOCK_ADJUSTMENT", sku: "VODKA-GREYGOOSE", delta_units: 999999999999, reason: "BREAKAGE_WRITE_OFF" }, null, 2);
      case 'cost_analyst':
        return JSON.stringify({ action: "COMPUTE_RECIPE_YIELD", recipe_id: "DISH-CALAMARI", cooking_shrinkage_yield: 0.0, raw_weight_kg: -1.5 }, null, 2);
      case 'marketing_strategist':
        return JSON.stringify({ action: "APPLY_COUPONS", codes: ["VIP25", "HAPPYHOUR20", "WELCOME10_USD"], cart_subtotal: 18.00 }, null, 2);
      default:
        return JSON.stringify({ action: "EXPLOIT_VECTOR", role: roleId, titan: titanId }, null, 2);
    }
  };

  return (
    <div className="space-y-6">
      {/* Role Navigation Carousel */}
      <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
              Devil's Team Role Scenarios & Threat Defense
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            6 Enterprise Roles Active
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {ENTERPRISE_ROLES.map((role) => {
            const Icon = ROLE_ICONS[role.id] || Crown;
            const isSelected = selectedRoleId === role.id;
            const count = auditFindings.filter(f => (f.role === role.id || role.auditRoleAliases?.includes(f.role)) && f.status === 'open').length;

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
                    ? 'bg-blue-600/20 border-[#00E5FF] shadow-lg ring-1 ring-[#00E5FF]/50'
                    : 'bg-[#0B1C30]/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#00E5FF]/20 text-[#00E5FF]' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                    {role.badge}
                  </span>
                </div>
                <div className="font-bold text-xs text-white truncate">{role.title}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{role.subtitle}</div>

                {count > 0 && (
                  <div className="mt-2 text-[10px] font-mono flex items-center gap-1 text-rose-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                    {count} Open Risks
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Role Hero Card */}
      <div className="bg-gradient-to-r from-[#0B1C30] via-slate-900 to-[#0B1C30] border border-blue-500/30 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-blue-600/20 border border-blue-500/40 rounded-xl text-[#00E5FF]">
              <RoleIcon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-blue-500/20 text-[#00E5FF] border border-blue-500/40">
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
              <span>Simulate Devil's Attack</span>
            </button>

            {onSelectRoleInAudit && (
              <button
                onClick={() => onSelectRoleInAudit(selectedRole.id)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-all flex items-center gap-2"
              >
                <Shield className="w-4 h-4 text-[#00E5FF]" />
                <span>Audit Findings ({roleFindings.length})</span>
                {criticalRoleFindings.length > 0 && (
                  <span className="px-1.5 py-0.2 bg-rose-500 text-white font-mono text-[10px] rounded-full">
                    {criticalRoleFindings.length} CRIT
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SPECIAL FEATURE MATRIX FOR OWNER ROLE: COSTS, INCOME & TAXES */}
      {selectedRole.id === 'owner' && (
        <div className="bg-[#0B1C30]/95 border border-emerald-500/40 rounded-2xl p-5 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  Owner Financial Command Center: Costs, Income & Taxes
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Core executive architectural requirements for total fiscal clarity, cost containment, and statutory compliance.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-800/60">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Fullstack Audit Ready</span>
            </div>
          </div>

          {/* Interactive Live Financial Simulator for Owner */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-slate-200 uppercase">
                  Interactive Owner Financial Model (Live Costs, Income & Tax Accrual)
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Adjust sliders to model fiscal impact
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400 font-mono">Gross Sales:</span>
                  <span className="text-white font-mono font-bold">${ownerGrossRevenue.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="1000000"
                  step="10000"
                  value={ownerGrossRevenue}
                  onChange={(e) => setOwnerGrossRevenue(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400 font-mono">COGS Ratio:</span>
                  <span className="text-amber-400 font-mono font-bold">{ownerCogsPercent}% (${cogsAmount.toLocaleString()})</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="50"
                  step="1"
                  value={ownerCogsPercent}
                  onChange={(e) => setOwnerCogsPercent(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400 font-mono">OPEX Ratio:</span>
                  <span className="text-blue-400 font-mono font-bold">{ownerOpexPercent}% (${opexAmount.toLocaleString()})</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="60"
                  step="1"
                  value={ownerOpexPercent}
                  onChange={(e) => setOwnerOpexPercent(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400 font-mono">Statutory VAT:</span>
                  <span className="text-purple-400 font-mono font-bold">{ownerVatRate}% (Net: ${netVatPayable.toLocaleString()})</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="1"
                  value={ownerVatRate}
                  onChange={(e) => setOwnerVatRate(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>

            {/* Simulated Live KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-900">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Gross Profit</span>
                <span className="text-base font-bold font-mono text-white">${grossProfit.toLocaleString()}</span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">{(100 - ownerCogsPercent)}% Margin</span>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Net EBITDA Profit</span>
                <span className={`text-base font-bold font-mono ${netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  ${netProfit.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{netMarginPercent}% Net Margin</span>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Output VAT Collected</span>
                <span className="text-base font-bold font-mono text-purple-300">${outputVat.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Consumer tax collected</span>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Net Tax Payable (Accrued)</span>
                <span className="text-base font-bold font-mono text-amber-300">${netVatPayable.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">After input credit deduction</span>
              </div>
            </div>
          </div>

          {/* Detailed 3-Pillar Architecture Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedRole.featureBlueprint.categories.map((cat, idx) => (
              <div key={idx} className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-[#00E5FF] uppercase font-mono tracking-wide mb-3 flex items-center gap-1.5">
                    {idx === 0 && <DollarSign className="w-4 h-4 text-amber-400" />}
                    {idx === 1 && <BarChart3 className="w-4 h-4 text-emerald-400" />}
                    {idx === 2 && <Receipt className="w-4 h-4 text-purple-400" />}
                    <span>{cat.name}</span>
                  </div>

                  <div className="space-y-3">
                    {cat.features.map((feat, fIdx) => (
                      <div key={fIdx} className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
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
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FEATURE BLUEPRINT FOR ALL OTHER ROLES */}
      {selectedRole.id !== 'owner' && (
        <div className="bg-[#0B1C30]/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00E5FF]" />
              <span>Required Feature Blueprint for {selectedRole.title}</span>
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
                <div className="text-xs font-bold text-[#00E5FF] uppercase font-mono tracking-wide">
                  {cat.name}
                </div>
                <div className="space-y-2.5">
                  {cat.features.map((feat, fIdx) => (
                    <div key={fIdx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                      <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{feat.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        {feat.description}
                      </p>
                      <div className="mt-2 text-[10px] font-mono text-blue-400/90 bg-blue-950/40 px-2 py-0.5 rounded border border-blue-900/40 inline-block">
                        {feat.metric}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REAL-LIFE OPERATIONAL SCENARIOS */}
      <div className="bg-[#0B1C30]/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">
              Real-Life Operational Scenarios: Day in the Life of {selectedRole.title}
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {selectedRole.realLifeScenarios.length} Scenarios Documented
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {selectedRole.realLifeScenarios.map((scen) => (
            <div key={scen.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {scen.title}
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                  Business Impact Verified
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
                      <ChevronRight className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
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

      {/* DEVIL'S TEAM 5-TITAN ADVERSARIAL THREAT MATRIX FOR THIS ROLE */}
      <div className="bg-[#0B1C30]/95 border border-rose-500/30 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Devil's Team 5-Titan Adversarial Threat Matrix ({selectedRole.title})
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulated attack vectors, privilege escalation, and boundary exploits targeted at this role.
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
            const threatSeverity = getThreatSeverity(selectedRole.id, threat.titanId);
            const severityColorClass = {
              critical: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
              high: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
              medium: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
              low: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
            }[threatSeverity] || 'bg-slate-500/20 text-slate-400 border-slate-500/40';

            return (
              <div
                key={threat.titanId}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all space-y-3"
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

      {/* CROSS-ROLE INTERACTION SCENARIOS */}
      <div className="bg-[#0B1C30]/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-[#00E5FF]" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Cross-Role Interaction Scenarios
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Adversarial collisions between 2+ enterprise roles — where workflow overlap creates exploitable threat surfaces.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {CROSS_ROLE_SCENARIOS.length} Collision Scenarios
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {CROSS_ROLE_SCENARIOS.map((scen) => {
            const roles = scen.participatingRoles.map(rid => {
              const role = ENTERPRISE_ROLES.find(r => r.id === rid);
              const Icon = ROLE_ICONS[rid] || Crown;
              const color = ROLE_COLORS[rid] || ROLE_COLORS.owner;
              return { role, Icon, color, id: rid };
            });

            return (
              <div key={scen.id} className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
                {/* Split-color gradient header */}
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

                {/* Body */}
                <div className="p-4 space-y-3">
                  <div className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800 leading-relaxed">
                    <span className="font-mono text-slate-400 font-bold block mb-1">Collision Context:</span>
                    {scen.context}
                  </div>

                  <div>
                    <span className="text-xs font-mono text-slate-400 font-bold block mb-2">Collusion Workflow:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {scen.workflow.map((step, sIdx) => (
                        <div key={sIdx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cross-role threats */}
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

      {/* LIVE INTERACTIVE SIMULATION RUNNER MODAL / DRAWER */}
      {(isSimulating || simulationResult) && (
        <div className="bg-slate-950 border border-blue-500/50 rounded-2xl p-5 shadow-2xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-5 h-5 text-[#00E5FF]" />
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Adversarial Simulation Terminal:</span>
                  <span className="text-[#00E5FF]">{simulatingTitan?.name} vs {selectedRole.title}</span>
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
                    : log.includes('DEVIL\'S TEAM')
                    ? 'text-rose-400 font-bold'
                    : 'text-slate-300'
                }
              >
                {log}
              </div>
            ))}
            {isSimulating && (
              <div className="flex items-center gap-2 text-[#00E5FF] animate-pulse">
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
