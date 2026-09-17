import React, { useState } from 'react';
import {
  Crown, UserCheck, Package, ShieldCheck,
  Shield, Zap, Eye, Target, Anchor, Play, RefreshCw, CheckCircle2,
  AlertTriangle, ChevronRight, Check, AlertOctagon, Terminal, X,
  Users, ShieldAlert, Lock, UtensilsCrossed, ClipboardCheck, Truck
} from 'lucide-react';
import {
  FB_MANAGEMENT_ROLES, FB_CROSS_ROLE_SCENARIOS,
  getFBThreatSeverity, TITANS
} from '../../agents/audits';
import { validateAgainstThreat } from '../../agents/defenses';

const FB_ROLE_ICONS = {
  fb_director: Crown,
  restaurant_manager: UserCheck,
  purchasing_manager: Package,
  qa_manager: ShieldCheck,
};

const TITAN_ICONS = {
  mitnick: Shield,
  geohot: Zap,
  kamkar: Eye,
  miller: Target,
  jack: Anchor
};

const FB_ROLE_COLORS = {
  fb_director: { gradient: 'from-emerald-600 to-emerald-900', text: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/40' },
  restaurant_manager: { gradient: 'from-blue-600 to-blue-900', text: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/40' },
  purchasing_manager: { gradient: 'from-purple-600 to-purple-900', text: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/40' },
  qa_manager: { gradient: 'from-amber-600 to-amber-900', text: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/40' },
};

const SCENARIO_TYPES = [
  { id: 'pos_fraud', label: 'POS & Payment Fraud', color: 'rose', icon: Lock },
  { id: 'inventory_supply_chain', label: 'Inventory & Supply Chain', color: 'amber', icon: Truck },
  { id: 'food_safety_compliance', label: 'Food Safety & Compliance', color: 'emerald', icon: ClipboardCheck },
];

const SCENARIO_TYPE_COLORS = {
  pos_fraud: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
  inventory_supply_chain: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  food_safety_compliance: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
};

const OPERATION_TYPE_LABELS = {
  fine_dining: 'Fine Dining',
  qsr: 'QSR / Fast Food',
  hotel_banquet: 'Hotel F&B / Banquet',
};

export default function FBManagementScenariosTab() {
  const [selectedRoleId, setSelectedRoleId] = useState('fb_director');
  const [activeScenarioType, setActiveScenarioType] = useState('pos_fraud');
  const [simulatingTitan, setSimulatingTitan] = useState(null);
  const [simulationLogs, setSimulationLogs] = useState([]);
  const [simulationResult, setSimulationResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const selectedRole = FB_MANAGEMENT_ROLES.find(r => r.id === selectedRoleId) || FB_MANAGEMENT_ROLES[0];
  const RoleIcon = FB_ROLE_ICONS[selectedRole.id] || Crown;
  const roleColor = FB_ROLE_COLORS[selectedRole.id] || FB_ROLE_COLORS.fb_director;

  const filteredScenarios = selectedRole.realLifeScenarios.filter(s => s.scenarioType === activeScenarioType);

  const getSamplePayload = (roleId, titanId) => {
    const payloads = {
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
    return JSON.stringify(payloads[roleId]?.[titanId] || { action: 'EXPLOIT', role: roleId, titan: titanId }, null, 2);
  };

  const handleRunSimulation = async (titanId) => {
    const titan = TITANS.find(t => t.id === titanId) || TITANS[0];
    const threat = selectedRole.devilsTeamThreats.find(t => t.titanId === titanId) || selectedRole.devilsTeamThreats[0];

    setIsSimulating(true);
    setSimulatingTitan(titan);
    setSimulationResult(null);
    setSimulationLogs([
      `[${new Date().toLocaleTimeString()}] [F&B SIM] Initializing adversarial test against: ${selectedRole.title}`,
      `[${new Date().toLocaleTimeString()}] [TITAN: ${titan.name}] Targeting vector: "${threat.vector}"`,
    ]);

    await new Promise(r => setTimeout(r, 600));
    setSimulationLogs(prev => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Injecting adversarial payload into F&B operational surface...`,
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
      {/* F&B Role Navigation */}
      <div className="bg-slate-900/80 border border-amber-500/20 p-3 rounded-2xl">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
              F&B Management Scenarios — 4 Roles × 3 Operation Types × 3 Threat Categories
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            4 F&B Management Roles Active
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {FB_MANAGEMENT_ROLES.map((role) => {
            const Icon = FB_ROLE_ICONS[role.id] || Crown;
            const isSelected = selectedRoleId === role.id;
            const color = FB_ROLE_COLORS[role.id];

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
                    ? 'bg-amber-600/20 border-amber-500 shadow-lg ring-1 ring-amber-500/50'
                    : 'bg-[#0B1C30]/80 border-slate-800 hover:border-amber-500/30 hover:bg-slate-800/50'
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

                <div className="mt-2 text-[10px] font-mono flex items-center gap-1 text-amber-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  5 Threats
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Role Hero Card */}
      <div className="bg-gradient-to-r from-[#0B1C30] via-slate-900 to-[#0B1C30] border border-amber-500/30 rounded-2xl p-5 shadow-xl">
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
              className="px-4 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              <Zap className="w-4 h-4" />
              <span>Simulate Attack</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feature Blueprint */}
      <div className="bg-[#0B1C30]/90 border border-amber-500/20 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>F&B Feature Blueprint for {selectedRole.title}</span>
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
              <div className="text-xs font-bold text-amber-400 uppercase font-mono tracking-wide">
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
      <div className="bg-[#0B1C30]/90 border border-amber-500/20 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">
              F&B Scenarios: {selectedRole.title}
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {filteredScenarios.length} {activeScenarioType.replace(/_/g, ' ')} scenarios
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
            <div key={scen.id} className="bg-slate-900/60 border border-amber-500/20 rounded-xl p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    scen.scenarioType === 'pos_fraud' ? 'bg-rose-400' :
                    scen.scenarioType === 'inventory_supply_chain' ? 'bg-amber-400' : 'bg-emerald-400'
                  }`}></span>
                  {scen.title}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border bg-blue-500/20 text-blue-400 border-blue-500/40">
                    {OPERATION_TYPE_LABELS[scen.operationType] || scen.operationType}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${SCENARIO_TYPE_COLORS[scen.scenarioType]}`}>
                    {scen.scenarioType.replace(/_/g, ' ')}
                  </span>
                </div>
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
                      <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
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
      <div className="bg-[#0B1C30]/95 border border-amber-500/30 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Devil's Team 5-Titan Adversarial Threat Matrix ({selectedRole.title})
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulated attack vectors targeting this F&B management role's workflow and tools.
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-amber-400 bg-amber-950/50 px-3 py-1 rounded-lg border border-amber-800/60 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>5 Titans Armed</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          {selectedRole.devilsTeamThreats.map((threat) => {
            const titan = TITANS.find(t => t.id === threat.titanId) || TITANS[0];
            const TitanIcon = TITAN_ICONS[threat.titanId] || Shield;
            const threatSeverity = getFBThreatSeverity(selectedRole.id, threat.titanId);
            const severityColorClass = {
              critical: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
              high: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
              medium: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
              low: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
            }[threatSeverity] || 'bg-slate-500/20 text-slate-400 border-slate-500/40';

            return (
              <div
                key={threat.titanId}
                className="bg-slate-900/80 border border-amber-500/20 rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/40 transition-all space-y-3"
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
                      className="px-2.5 py-1 bg-amber-600/30 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-500/40 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center gap-1 disabled:opacity-50"
                    >
                      <Play className="w-3 h-3" /> Test Vector
                    </button>
                  </div>

                  <div className="text-xs font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
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

      {/* Cross-Role F&B Collision Scenarios */}
      <div className="bg-[#0B1C30]/90 border border-amber-500/20 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Cross-Role F&B Management Collision Scenarios
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Adversarial interactions between 2+ F&B management roles — where workflow overlap creates exploitable threat surfaces.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {FB_CROSS_ROLE_SCENARIOS.length} Collision Scenarios
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {FB_CROSS_ROLE_SCENARIOS.map((scen) => {
            const roles = scen.participatingRoles.map(rid => {
              const role = FB_MANAGEMENT_ROLES.find(r => r.id === rid);
              const Icon = FB_ROLE_ICONS[rid] || Crown;
              const color = FB_ROLE_COLORS[rid] || FB_ROLE_COLORS.fb_director;
              return { role, Icon, color, id: rid };
            });

            return (
              <div key={scen.id} className="bg-slate-900/60 border border-amber-500/20 rounded-xl overflow-hidden">
                <div className={`bg-gradient-to-r ${roles[0]?.color.gradient || 'from-slate-800 to-slate-900'} p-4`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {roles.map(({ id, Icon, color }) => (
                          <div key={id} className={`p-1.5 rounded-lg ${color.bg} ${color.text} border ${color.border}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                        ))}
                        <div className="text-amber-400 font-bold text-lg">⚡</div>
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
                          <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
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
                        <div key={tIdx} className="bg-slate-950/60 border border-amber-900/30 rounded-lg p-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{titan.avatar}</span>
                            <TitanIcon className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-bold text-amber-300">{threat.vector}</span>
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

                  <div className="bg-amber-950/30 border border-amber-500/20 p-2.5 rounded-lg text-xs text-amber-200 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
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
        <div className="bg-slate-950 border border-amber-500/50 rounded-2xl p-5 shadow-2xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>F&B Adversarial Simulation Terminal:</span>
                  <span className="text-amber-400">{simulatingTitan?.name} vs {selectedRole.title}</span>
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
                    : log.includes('F&B SIM')
                    ? 'text-amber-400 font-bold'
                    : 'text-slate-300'
                }
              >
                {log}
              </div>
            ))}
            {isSimulating && (
              <div className="flex items-center gap-2 text-amber-400 animate-pulse">
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
