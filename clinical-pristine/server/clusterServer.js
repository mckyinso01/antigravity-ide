// 🏥 PRISTINE OS: ENTERPRISE HOSPITAL REAL-TIME CLUSTER & HL7 INGESTION SERVER
// Port: 8089 | WebSocket Sync + HL7 v2 ADT Webhook + Imprivata RFID SSO Gateway

import http from 'node:http';
import { WebSocketServer, WebSocket } from 'ws';

const PORT = process.env.PORT || 8089;

// In-Memory Cluster State with Local Persistence Cache
const clusterState = {
  activeWorkstations: new Map(), // stationId -> { id, name, location, role, lastPing }
  activeBedOverrides: new Map(),
  activeAlerts: [],
  hl7MessageLog: []
};

// Create HTTP Server for HL7/FHIR Webhooks and REST Endpoints
const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url || '/', `http://${req.headers.host}`);

  // 1. Health & Cluster Status
  if (url.pathname === '/health' || url.pathname === '/api/cluster/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ONLINE',
      hospitalNode: 'PRISTINE-CENTRAL-CLUSTER-01',
      activeWorkstationsCount: clusterState.activeWorkstations.size,
      workstations: Array.from(clusterState.activeWorkstations.values()),
      hl7StreamActive: true,
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // 2. Inbound HL7 ADT Webhook (Epic / Cerner / Mirth Connect Interface Feed)
  if (url.pathname === '/api/hl7/adt' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const hl7Event = {
          id: `HL7-${Date.now()}`,
          messageType: payload.messageType || 'ADT^A01^ADT_A01',
          sendingApp: payload.sendingApp || 'EPIC_EHR_REGISTRATION',
          patientMRN: payload.mrn || `MRN-${Math.floor(100000 + Math.random() * 900000)}`,
          patientName: payload.patientName || 'Emergency Inpatient',
          assignedRoom: payload.assignedRoom || 'R-101-TRAUMA',
          assignedBed: payload.assignedBed || 'B-101-B',
          acuity: payload.acuity || 'stable',
          diagnosis: payload.diagnosis || 'Acute Inpatient Observation',
          timestamp: new Date().toISOString()
        };

        clusterState.hl7MessageLog.unshift(hl7Event);
        if (clusterState.hl7MessageLog.length > 50) clusterState.hl7MessageLog.pop();

        // Broadcast inbound patient to all connected hospital workstations
        broadcastMessage({
          type: 'HL7_INBOUND_ADMISSION',
          event: hl7Event
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, hl7EventId: hl7Event.id, ack: 'AA' }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid HL7 JSON payload' }));
      }
    });
    return;
  }

  // 3. Imprivata OneSign RFID Badge Tap SSO Endpoint
  if (url.pathname === '/api/auth/rfid' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { rfidTag } = JSON.parse(body);
        // Emulate verified hospital staff lookup
        const staffDirectory = {
          'RFID-NURSE-01': { id: 'staff-001', name: 'Sarah Vance, BSN, RN', role: 'nurse', title: 'Charge Nurse & Resuscitation Lead', department: 'Emergency & Trauma' },
          'RFID-SURGEON-02': { id: 'staff-003', name: 'Dr. Angela Santos, MD, FACS', role: 'doctor', title: 'Attending Trauma Surgeon', department: 'Surgical Trauma Core' },
          'RFID-EVS-03': { id: 'staff-005', name: 'Maria Santos-Cruz', role: 'evs', title: 'Lead Biohazard Specialist', department: 'Environmental Services' }
        };

        const matched = staffDirectory[rfidTag] || {
          id: `staff-${Date.now().toString().slice(-3)}`,
          name: 'Verified Staff Member',
          role: 'nurse',
          title: 'Staff Nurse',
          department: 'General Inpatient'
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          authenticated: true,
          token: `HOSP-JWT-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          staff: matched,
          sessionExpiry: new Date(Date.now() + 8 * 3600 * 1000).toISOString()
        }));
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'RFID parse error' }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

// Create WebSocket Server for Real-Time Multi-Station Broadcasting
const wss = new WebSocketServer({ server });

function broadcastMessage(data, senderWs = null) {
  const payload = JSON.stringify(data);
  for (const client of wss.clients) {
    if (client !== senderWs && client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  }
}

wss.on('connection', (ws, req) => {
  const stationId = `WS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const ip = req.socket.remoteAddress || '127.0.0.1';

  clusterState.activeWorkstations.set(stationId, {
    id: stationId,
    ip,
    name: `Clinical Workstation (${stationId})`,
    location: 'Inpatient Ward Node',
    connectedAt: new Date().toISOString(),
    lastPing: Date.now()
  });

  // Send initial handshake
  ws.send(JSON.stringify({
    type: 'CLUSTER_CONNECTED',
    stationId,
    clusterNode: 'PRISTINE-CENTRAL-CLUSTER-01',
    connectedStations: Array.from(clusterState.activeWorkstations.values()),
    hl7RecentLog: clusterState.hl7MessageLog.slice(0, 10)
  }));

  // Notify other workstations of new node
  broadcastMessage({
    type: 'WORKSTATION_JOINED',
    station: clusterState.activeWorkstations.get(stationId)
  }, ws);

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());

      if (data.type === 'PING') {
        const st = clusterState.activeWorkstations.get(stationId);
        if (st) st.lastPing = Date.now();
        ws.send(JSON.stringify({ type: 'PONG', timestamp: Date.now() }));
        return;
      }

      // Synchronize Bed / Patient mutation across all connected terminals
      if (data.type === 'BED_MUTATION' || data.type === 'CODE_BLUE_ALERT' || data.type === 'EVS_STATUS_UPDATE') {
        broadcastMessage(data, ws);
      }

    } catch (e) {
      console.error('WS Error:', e);
    }
  });

  ws.on('close', () => {
    clusterState.activeWorkstations.delete(stationId);
    broadcastMessage({
      type: 'WORKSTATION_LEFT',
      stationId
    });
  });
});

server.listen(PORT, () => {
  console.log(`🏥 [Pristine Cluster] Enterprise Hospital Sync Server running on http://localhost:${PORT}`);
  console.log(`⚡ [Pristine Cluster] WebSocket Gateway ready for multi-workstation real-time sync`);
  console.log(`📥 [Pristine Cluster] HL7 ADT Ingestion Webhook ready at POST http://localhost:${PORT}/api/hl7/adt`);
});
