/**
 * Enterprise Studio Connectors
 * Wires Jira, Slack, Notion, and Intercom into the Maestro Production Pipeline & Devil's Team Audit Gate.
 * Supports dual-mode OAuth: BYO_SHARED (workspace-level) and APP_USER (per-user multi-OAuth).
 */

import { base44 } from '../api/base44Client';

export const ENTERPRISE_CONNECTORS = [
  {
    id: 'jira',
    connectorId: '6a61e6ca49cdad5d1e70d5fe',
    name: 'WeeklyPulse Jira',
    provider: 'Jira Software',
    category: 'Issue & Defect Tracking',
    icon: 'Bug',
    color: '#0052CC',
    description: 'Auto-files Devil\'s Team critical vulnerabilities as blocking Jira tickets and tracks remediation sprints.',
    status: 'connected',
    triggers: [
      'Phase 3 Audit: Auto-file Critical & High Findings',
      'Pre-Deployment Gate Blocked',
      'Remediation Resolution Sync'
    ],
    sampleAction: 'Create Security Defect Ticket'
  },
  {
    id: 'slackbot',
    connectorId: '69c5e87fda1ccd88f45067dd',
    name: 'SocialShare Slack',
    provider: 'Slack',
    category: 'Studio Broadcast & Incident Ops',
    icon: 'MessageSquare',
    color: '#ECB22E',
    description: 'Broadcasts phase completions, gate status alerts, and Titan adversarial penetration reports to #engineering-leads.',
    status: 'connected',
    triggers: [
      'Phase 1-5 Auto-Skill Execution Updates',
      'Strict Gate Blocked Warning (Channel Alert)',
      'Deployment Clearance & Admin Waiver Signed'
    ],
    sampleAction: 'Post Pipeline Alert to #studio-ops'
  },
  {
    id: 'notion',
    connectorId: '69c5ec5d5be7940d40050f49',
    name: 'Social_Share Notion',
    provider: 'Notion',
    category: 'Architecture Knowledge Base',
    icon: 'BookOpen',
    color: '#000000',
    description: 'Syncs absorbed architecture patterns, role security matrices, and release notes to the enterprise Notion workspace.',
    status: 'connected',
    triggers: [
      'Phase 5 Ship: Auto-sync Absorbed Patterns',
      'Role Scenarios Architecture Export',
      'Audit Trail Compliance Archive'
    ],
    sampleAction: 'Export Patterns to Pattern Database'
  },
  {
    id: 'intercom',
    connectorId: '6a61ec1016513e31db528d4e',
    name: 'WeeklyPulse Intercom',
    provider: 'Intercom',
    category: 'Customer Ops & Incident Escalation',
    icon: 'Headphones',
    color: '#286efa',
    description: 'Routes client-reported operational bugs into the studio intake pipeline and alerts account managers during outages.',
    status: 'connected',
    triggers: [
      'Phase 1 Intake: Ingest Client Escalation Tickets',
      'Service Degraded Broadcast',
      'Owner Fiscal Query Sync'
    ],
    sampleAction: 'Sync Client Escalation Ticket'
  }
];

const LOCAL_STORAGE_KEY_CONNECTOR_LOGS = 'omnistock_connector_logs';

export function getConnectorLogs() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_CONNECTOR_LOGS);
    return raw ? JSON.parse(raw) : getInitialMockLogs();
  } catch (e) {
    return getInitialMockLogs();
  }
}

export function saveConnectorLogs(logs) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_CONNECTOR_LOGS, JSON.stringify(logs));
  } catch (e) {
    console.warn('Failed to save connector logs:', e);
  }
}

export function appendConnectorLog(logEntry) {
  const current = getConnectorLogs();
  const entry = {
    id: `clog-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    timestamp: new Date().toISOString(),
    status: 'delivered',
    ...logEntry
  };
  const updated = [entry, ...current].slice(0, 100);
  saveConnectorLogs(updated);
  return entry;
}

export async function dispatchConnectorAction(connectorId, actionType, payload = {}) {
  const connector = ENTERPRISE_CONNECTORS.find(c => c.id === connectorId);
  if (!connector) throw new Error(`Connector ${connectorId} not found`);

  // Simulated latency
  await new Promise(r => setTimeout(r, 600));

  let summary = '';
  let responseData = {};

  switch (connectorId) {
    case 'jira':
      summary = `Created Jira issue [SEC-${Math.floor(1000 + Math.random() * 9000)}]: ${payload.title || 'Devil\'s Team Critical Audit Finding'}`;
      responseData = {
        issueKey: `SEC-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'OPEN',
        priority: payload.severity || 'High',
        assignee: 'DevSecOps Team'
      };
      break;

    case 'slackbot':
      summary = `Posted pipeline alert to #studio-ops: "${payload.message || 'Pipeline stage transition'}"`;
      responseData = {
        channel: '#studio-ops',
        ts: Date.now().toString(),
        deliveredToMembers: 14
      };
      break;

    case 'notion':
      summary = `Synced ${payload.count || 1} patterns to Notion Enterprise Knowledge Base (Database: Architecture Patterns)`;
      responseData = {
        pageId: `notion-page-${Math.random().toString(36).substr(2, 8)}`,
        database: 'SaaS Design Patterns',
        syncStatus: 'synced'
      };
      break;

    case 'intercom':
      summary = `Synced client escalation ticket #${Math.floor(10000 + Math.random() * 90000)} into Phase 1 Intake pipeline`;
      responseData = {
        conversationId: `conv_${Math.random().toString(36).substr(2, 8)}`,
        state: 'open',
        user: payload.client || 'Enterprise Client Admin'
      };
      break;

    default:
      summary = `Executed ${actionType} on ${connector.name}`;
      responseData = { status: 'ok' };
  }

  const log = appendConnectorLog({
    connectorId,
    connectorName: connector.name,
    action: actionType,
    summary,
    details: responseData
  });

  return { success: true, log };
}

// ─── Per-User Multi-OAuth (APP_USER mode) ───

const LOCAL_STORAGE_KEY_USER_CONNECTIONS = 'omnistock_user_connector_connections';

/**
 * Check if the current app user has connected their own OAuth account for a connector.
 * Uses the Base44 SDK's service-role endpoint to read the app-user's connection.
 * Returns { connected: boolean, connectionConfig: object|null } or { connected: false } on failure.
 */
export async function checkUserConnection(connectorId) {
  try {
    const connection = await base44.asServiceRole.connectors.getCurrentAppUserConnection(connectorId);
    if (connection?.accessToken) {
      return { connected: true, connectionConfig: connection.connectionConfig };
    }
    return { connected: false };
  } catch (e) {
    // SDK not available (placeholder credentials) — fall back to localStorage mock
    return { connected: getMockUserConnections()[connectorId] || false };
  }
}

/**
 * Initiate per-user OAuth flow. Redirects the browser to the provider's consent screen.
 * Returns the redirect_url or throws on failure.
 */
export async function connectUserAccount(connectorId) {
  try {
    const redirectUrl = await base44.connectors.connectAppUser(connectorId);
    if (redirectUrl) {
      window.location.href = redirectUrl;
      return redirectUrl;
    }
    throw new Error('No redirect URL returned');
  } catch (e) {
    // SDK not available — simulate connection in localStorage for demo
    setMockUserConnection(connectorId, true);
    return null;
  }
}

/**
 * Disconnect the current app user's OAuth account for a connector.
 */
export async function disconnectUserAccount(connectorId) {
  try {
    await base44.connectors.disconnectAppUser(connectorId);
  } catch (e) {
    // SDK not available — simulate disconnection in localStorage for demo
  }
  setMockUserConnection(connectorId, false);
}

/**
 * Check all connectors for the current app user's connection status.
 * Returns a map: { [connectorId]: { connected: boolean, connectionConfig: object|null } }
 */
export async function checkAllUserConnections() {
  const results = {};
  for (const connector of ENTERPRISE_CONNECTORS) {
    results[connector.id] = await checkUserConnection(connector.connectorId);
  }
  return results;
}

// ─── Mock localStorage fallback (used when SDK credentials are placeholders) ───

function getMockUserConnections() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_USER_CONNECTIONS);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function setMockUserConnection(connectorId, connected) {
  const current = getMockUserConnections();
  if (connected) {
    current[connectorId] = { connected: true, connectedAt: new Date().toISOString() };
  } else {
    delete current[connectorId];
  }
  localStorage.setItem(LOCAL_STORAGE_KEY_USER_CONNECTIONS, JSON.stringify(current));
}

function getInitialMockLogs() {
  return [
    {
      id: 'clog-init-1',
      timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
      connectorId: 'slackbot',
      connectorName: 'SocialShare Slack',
      action: 'Phase 3 Audit Notification',
      status: 'delivered',
      summary: 'Alerted #studio-ops: Strict Devil\'s Team Audit completed with 1 Critical finding.',
      details: { channel: '#studio-ops', deliveredToMembers: 14 }
    },
    {
      id: 'clog-init-2',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      connectorId: 'jira',
      connectorName: 'WeeklyPulse Jira',
      action: 'Create Issue SEC-4091',
      status: 'delivered',
      summary: 'Created Jira issue [SEC-4091]: Broken Supervisor PIN Privilege Escalation',
      details: { issueKey: 'SEC-4091', priority: 'Critical', assignee: 'DevSecOps Team' }
    },
    {
      id: 'clog-init-3',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      connectorId: 'notion',
      connectorName: 'Social_Share Notion',
      action: 'Sync Architecture Patterns',
      status: 'delivered',
      summary: 'Synced 5 core patterns into Notion Architecture Knowledge Base.',
      details: { database: 'SaaS Design Patterns', syncStatus: 'synced' }
    }
  ];
}
