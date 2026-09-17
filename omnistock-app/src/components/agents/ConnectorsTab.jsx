import React, { useState, useEffect } from 'react';
import {
  Link2, CheckCircle2, RefreshCw, Send, AlertTriangle, ExternalLink,
  MessageSquare, Bug, BookOpen, Headphones, ArrowRight, ShieldAlert,
  Zap, Clock, FileCode, Check, Play, Terminal, UserPlus, UserX, Link as LinkIcon
} from 'lucide-react';
import {
  ENTERPRISE_CONNECTORS,
  getConnectorLogs,
  dispatchConnectorAction,
  checkAllUserConnections,
  connectUserAccount,
  disconnectUserAccount
} from '../../agents/connectors';

const CONNECTOR_ICONS = {
  jira: Bug,
  slackbot: MessageSquare,
  notion: BookOpen,
  intercom: Headphones
};

export default function ConnectorsTab({ auditFindings = [] }) {
  const [logs, setLogs] = useState(getConnectorLogs());
  const [activeDispatching, setActiveDispatching] = useState(null);
  const [actionSuccessMessage, setActionSuccessMessage] = useState(null);
  const [userConnections, setUserConnections] = useState({});
  const [connectingUser, setConnectingUser] = useState(null);

  const criticalFindings = auditFindings.filter(f => f.severity === 'critical' && f.status === 'open');

  // Load per-user connection statuses on mount
  useEffect(() => {
    let mounted = true;
    checkAllUserConnections().then((result) => {
      if (mounted) setUserConnections(result);
    });
    return () => { mounted = false; };
  }, []);

  const handleConnectUser = async (connectorId, realConnectorId) => {
    setConnectingUser(connectorId);
    try {
      await connectUserAccount(realConnectorId);
      const updated = await checkAllUserConnections();
      setUserConnections(updated);
    } catch (e) {
      console.error('Failed to connect user account:', e);
    } finally {
      setConnectingUser(null);
    }
  };

  const handleDisconnectUser = async (connectorId, realConnectorId) => {
    setConnectingUser(connectorId);
    try {
      await disconnectUserAccount(realConnectorId);
      const updated = await checkAllUserConnections();
      setUserConnections(updated);
    } catch (e) {
      console.error('Failed to disconnect user account:', e);
    } finally {
      setConnectingUser(null);
    }
  };

  const handleTriggerAction = async (connectorId, actionName, payload = {}) => {
    setActiveDispatching(connectorId);
    setActionSuccessMessage(null);
    try {
      const res = await dispatchConnectorAction(connectorId, actionName, payload);
      setLogs(getConnectorLogs());
      setActionSuccessMessage({
        connectorId,
        text: res.log.summary
      });
      setTimeout(() => setActionSuccessMessage(null), 4000);
    } catch (e) {
      console.error(e);
    } finally {
      setActiveDispatching(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B1C30] via-slate-900 to-[#0B1C30] border border-blue-500/30 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-blue-600/20 border border-blue-500/40 rounded-xl text-[#00E5FF]">
              <Link2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-blue-500/20 text-[#00E5FF] border border-blue-500/40">
                  Dual-Mode OAuth
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  BYO_SHARED ✓
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-purple-500/20 text-purple-400 border border-purple-500/40">
                  APP_USER Multi-OAuth
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">Enterprise Studio Connectors & Multi-OAuth</h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Each team member connects their own Jira, Slack, Notion & Intercom accounts via per-user OAuth — alongside shared workspace credentials for automated pipeline dispatches.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-2 rounded-xl border border-emerald-800/60">
            <CheckCircle2 className="w-4 h-4" />
            <span>OAuth Tokens Healthy</span>
          </div>
        </div>
      </div>

      {actionSuccessMessage && (
        <div className="bg-emerald-950/70 border border-emerald-500/50 p-3.5 rounded-xl flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2.5 text-xs text-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>Dispatched:</strong> {actionSuccessMessage.text}</span>
          </div>
          <span className="text-[10px] font-mono bg-emerald-800/60 text-emerald-300 px-2 py-0.5 rounded">
            200 OK
          </span>
        </div>
      )}

      {/* Connectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ENTERPRISE_CONNECTORS.map((connector) => {
          const Icon = CONNECTOR_ICONS[connector.id] || Link2;
          const isBusy = activeDispatching === connector.id;

          return (
            <div
              key={connector.id}
              className="bg-[#0B1C30]/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2.5 rounded-xl border flex items-center justify-center text-white"
                      style={{ backgroundColor: `${connector.color}25`, borderColor: `${connector.color}60` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: connector.color === '#000000' ? '#FFFFFF' : connector.color }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white">{connector.name}</h3>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          Shared
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                        {connector.provider} • ID: <span className="text-slate-300">{connector.connectorId.slice(0, 8)}...</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {connector.category}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {connector.description}
                </p>

                {/* Per-User Multi-OAuth Connection Status */}
                <div className="mt-3 bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <LinkIcon className="w-3.5 h-3.5 text-purple-400" />
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        Your Personal OAuth
                      </span>
                    </div>
                    {userConnections[connector.id]?.connected ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Connected
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        Not Linked
                      </span>
                    )}
                  </div>

                  {userConnections[connector.id]?.connected ? (
                    <button
                      onClick={() => handleDisconnectUser(connector.id, connector.connectorId)}
                      disabled={connectingUser === connector.id}
                      className="w-full px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                    >
                      {connectingUser === connector.id ? (
                        <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Disconnecting...</>
                      ) : (
                        <><UserX className="w-3.5 h-3.5" /> Disconnect My Account</>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleConnectUser(connector.id, connector.connectorId)}
                      disabled={connectingUser === connector.id}
                      className="w-full px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                    >
                      {connectingUser === connector.id ? (
                        <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Authorizing...</>
                      ) : (
                        <><UserPlus className="w-3.5 h-3.5" /> Connect My Account via OAuth</>
                      )}
                    </button>
                  )}
                </div>

                {/* Pipeline Triggers */}
                <div className="mt-3.5 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    Automated Pipeline Triggers:
                  </span>
                  <div className="space-y-1">
                    {connector.triggers.map((trig, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300 bg-slate-950/60 px-2 py-1 rounded border border-slate-800/80">
                        <Check className="w-3 h-3 text-[#00E5FF] shrink-0" />
                        <span>{trig}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono text-slate-400">
                  Dispatch via: {userConnections[connector.id]?.connected ? 'Personal OAuth' : 'Shared Workspace'}
                </span>

                <button
                  onClick={() => {
                    if (connector.id === 'jira') {
                      handleTriggerAction('jira', 'File Security Ticket', {
                        title: criticalFindings.length > 0
                          ? `[Devil's Gate] ${criticalFindings[0].finding}`
                          : 'Adversarial Security Assessment Finding',
                        severity: 'Critical'
                      });
                    } else if (connector.id === 'slackbot') {
                      handleTriggerAction('slackbot', 'Broadcast Status', {
                        message: `Maestro Pipeline stage check passed. Devil's Team Gate: ${criticalFindings.length > 0 ? 'BLOCKED' : 'PASSED'}.`
                      });
                    } else if (connector.id === 'notion') {
                      handleTriggerAction('notion', 'Export Patterns', { count: 5 });
                    } else if (connector.id === 'intercom') {
                      handleTriggerAction('intercom', 'Ingest Client Feedback', { client: 'Enterprise Tier 1 Client' });
                    }
                  }}
                  disabled={isBusy}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow disabled:opacity-50"
                >
                  {isBusy ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Dispatching...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3 h-3" />
                      <span>{connector.sampleAction}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Telemetry Dispatch Log Table */}
      <div className="bg-[#0B1C30]/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00E5FF]" />
            <h3 className="text-sm font-bold text-white">Live Connector Telemetry & Dispatch Audit Trail</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {logs.length} Recorded Deliveries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Connector</th>
                <th className="p-3">Action</th>
                <th className="p-3">Summary</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40">
                  <td className="p-3 text-slate-400 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="p-3 font-semibold text-white whitespace-nowrap">
                    {log.connectorName}
                  </td>
                  <td className="p-3 text-[#00E5FF] whitespace-nowrap">
                    {log.action}
                  </td>
                  <td className="p-3 text-slate-200">
                    {log.summary}
                  </td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      {log.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-500">
                    No connector actions dispatched yet. Click any connector test above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
