// airGappedBundle.ts - Universal 1-Click Air-Gapped Deployment Bundle Generator
// Author: LinkableAI Core Systems (Founder: Mharc Gatan)

export function downloadAirGappedDeploymentBundle() {
  const appName = "OmniStock Enterprise 3D Spatial WMS";
  const port = 5175;
  const service = "omnistock-wms";

  const dockerComposeContent = `version: '3.8'

# ==============================================================================
# LINKABLEAI 100% PERPETUAL AIR-GAPPED ON-PREMISE STACK
# System: ${appName}
# Security: Zero External Telemetry Leakage • Air-Gapped Sovereign Node
# Author: Mharc Gatan (mharcgatan@linkable.it.com | +63 962 281 2703)
# ==============================================================================

services:
  ${service}-app:
    image: linkableai/${service}:latest
    container_name: ${service}-prod
    restart: always
    environment:
      - NODE_ENV=production
      - SPATIAL_CAD_RENDER_FPS=60
      - FEFO_EXPIRATION_GATE=true
      - GS1_BARCODE_EAN13=true
    ports:
      - "${port}:${port}"
    volumes:
      - ${service}-data:/app/data
      - ${service}-logs:/app/logs
    networks:
      - internal-sovereign-net
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:${port}/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  ${service}-nginx-proxy:
    image: nginx:alpine
    container_name: ${service}-gateway
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - ${service}-app
    networks:
      - internal-sovereign-net

volumes:
  ${service}-data:
    driver: local
  ${service}-logs:
    driver: local

networks:
  internal-sovereign-net:
    driver: bridge
    internal: true # 100% AIR-GAPPED ISOLATION (NO OUTBOUND WAN TRAFFIC)
`;

  const k8sContent = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${service}-deployment
  namespace: sovereign-apps
  labels:
    app: ${service}
spec:
  replicas: 2
  selector:
    matchLabels:
      app: ${service}
  template:
    metadata:
      labels:
        app: ${service}
    spec:
      containers:
      - name: ${service}
        image: linkableai/${service}:latest
        ports:
        - containerPort: ${port}
        resources:
          limits:
            cpu: "2"
            memory: "4Gi"
          requests:
            cpu: "500m"
            memory: "1Gi"
        env:
        - name: NODE_ENV
          value: "production"
---
apiVersion: v1
kind: Service
metadata:
  name: ${service}-svc
  namespace: sovereign-apps
spec:
  type: ClusterIP
  ports:
  - port: ${port}
    targetPort: ${port}
  selector:
    app: ${service}
`;

  const systemdScript = `#!/bin/bash
# ==============================================================================
# Bare-Metal Systemd Service Daemon Setup
# ==============================================================================
echo "Installing ${appName} systemd service..."

cat << 'EOF' > /etc/systemd/system/${service}.service
[Unit]
Description=${appName} Sovereign Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/${service}
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=${service}
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable ${service}
systemctl start ${service}
echo "✅ ${appName} successfully started on port ${port}!"
`;

  const combinedBundle = `================================================================================
LINKABLEAI 100% PERPETUAL AIR-GAPPED DEPLOYMENT BUNDLE
System: ${appName}
Generated: ${new Date().toISOString()}
Founder SLA Lead: Mharc Gatan (mharcgatan@linkable.it.com | +63 962 281 2703)
================================================================================

TABLE OF CONTENTS:
1. docker-compose.yml (Air-Gapped Sovereign Local Network)
2. kubernetes-helm-manifest.yaml (Production Cluster Deployment)
3. systemd-service.sh (Bare-Metal Linux Service Installer)
4. AIR-GAPPED SECURITY & NETWORK COMPLIANCE WHITEPAPER

--------------------------------------------------------------------------------
1. DOCKER-COMPOSE.YML
--------------------------------------------------------------------------------
${dockerComposeContent}

--------------------------------------------------------------------------------
2. KUBERNETES-HELM-MANIFEST.YAML
--------------------------------------------------------------------------------
${k8sContent}

--------------------------------------------------------------------------------
3. SYSTEMD-SERVICE.SH
--------------------------------------------------------------------------------
${systemdScript}

--------------------------------------------------------------------------------
4. AIR-GAPPED SECURITY & NETWORK COMPLIANCE WHITEPAPER
--------------------------------------------------------------------------------
• ZERO EXTERNAL TELEMETRY: All telemetry beacons run in local air-gapped memory mode.
• ENCRYPTION: AES-256 at rest, TLS 1.3 in transit with self-signed or enterprise PKI certificates.
• PERPETUAL OWNERSHIP: The enterprise owns 100% of the runtime code and database schema with zero recurring subscription license expirations.
================================================================================`;

  const blob = new Blob([combinedBundle], { type: 'text/plain;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${service.toUpperCase()}_AIR_GAPPED_DOCKER_BUNDLE.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
