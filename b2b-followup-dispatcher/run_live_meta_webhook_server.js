// ==========================================================================
// RUNTIME DAEMON: META CAPI GATEWAY & SPEED-TO-LEAD WEBHOOK LISTENER
// Port 3009 - Compliant with Meta Developer Policies
// ==========================================================================

import { createMetaWebhookServer } from './src/meta_webhook_listener.js';

const PORT = process.env.PORT || 3009;
const server = createMetaWebhookServer({
  verifyToken: 'linkable_secure_meta_token_2026',
  appSecret: 'linkable_meta_secret_sample'
});

server.listen(PORT, () => {
  console.log('='.repeat(70));
  console.log(`🚀 META CAPI & SPEED-TO-LEAD WEBHOOK SERVER RUNNING ON PORT ${PORT}`);
  console.log(`📡 Handshake Endpoint: http://localhost:${PORT}/webhook/meta`);
  console.log(`📡 CAPI Dispatcher:    http://localhost:${PORT}/api/capi/dispatch`);
  console.log('='.repeat(70));
});
