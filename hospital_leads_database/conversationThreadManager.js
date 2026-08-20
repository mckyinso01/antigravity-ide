// 🧵 LINKABLEAI FULL-THREAD CONVERSATION MONITORING & MEMORY LEDGER
// Tracks and serializes complete multi-turn conversation histories between prospects,
// Founder Mharc Gatan, and the Elite AI Sales Specialist (Alexis Vance).

const fs = require('fs');
const path = require('path');

const THREADS_FILE = path.join(__dirname, 'conversation_threads.json');

function loadThreads() {
  if (fs.existsSync(THREADS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(THREADS_FILE, 'utf8'));
    } catch (e) {
      console.error('Error reading conversation_threads.json, resetting to empty array:', e.message);
      return [];
    }
  }
  return [];
}

function saveThreads(threads) {
  fs.writeFileSync(THREADS_FILE, JSON.stringify(threads, null, 2), 'utf8');
}

function normalizeEmail(email) {
  if (!email) return '';
  const match = email.match(/<([^>]+)>/) || email.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  return (match ? match[1] : email).toLowerCase().trim();
}

/**
 * Gets or initializes a conversation thread for a given lead
 */
function getOrCreateThread(leadEmail, metadata = {}) {
  const normEmail = normalizeEmail(leadEmail);
  const threads = loadThreads();
  let thread = threads.find(t => normalizeEmail(t.leadEmail) === normEmail);

  if (!thread) {
    const domain = normEmail.includes('@') ? normEmail.split('@')[1] : 'unknown';
    thread = {
      id: `thread-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      leadEmail: normEmail,
      leadName: metadata.name || metadata.contactName || 'Executive Leader',
      role: metadata.role || metadata.title || 'Decision Maker',
      organization: metadata.hospital || metadata.hospitalName || metadata.company || metadata.organization || 'Target Account',
      domain: domain,
      vertical: metadata.vertical || 'clinical',
      dealStatus: 'NEW_OUTREACH', // NEW_OUTREACH | NURTURING | DEMO_SCHEDULED | FOUNDER_ESCALATED | CLOSED_WON | UNQUALIFIED
      leadScore: 50,
      createdAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
      threadHistory: []
    };
    threads.push(thread);
    saveThreads(threads);
  } else {
    // Update any missing metadata
    if (metadata.name && thread.leadName === 'Executive Leader') thread.leadName = metadata.name;
    if (metadata.hospital && thread.organization === 'Target Account') thread.organization = metadata.hospital;
    if (metadata.vertical && !thread.vertical) thread.vertical = metadata.vertical;
    saveThreads(threads);
  }

  return thread;
}

/**
 * Appends a new message (Outbound or Inbound) to a thread
 */
function appendMessage(leadEmail, message) {
  const normEmail = normalizeEmail(leadEmail);
  const threads = loadThreads();
  let thread = threads.find(t => normalizeEmail(t.leadEmail) === normEmail);

  if (!thread) {
    thread = getOrCreateThread(leadEmail, {
      name: message.senderName,
      organization: message.organization,
      vertical: message.vertical
    });
  }

  const msgId = message.id || `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
  const messageEntry = {
    id: msgId,
    sender: message.sender || 'mharcgatan@linkable.it.com',
    recipient: message.recipient || normEmail,
    direction: message.direction || (message.sender?.includes('linkable.it.com') ? 'OUTBOUND' : 'INBOUND'),
    subject: message.subject || '',
    body: message.body || '',
    timestamp: message.timestamp || new Date().toISOString(),
    salesMethodology: message.salesMethodology || null,
    intent: message.intent || null,
    escalationTriggered: message.escalationTriggered || false
  };

  thread.threadHistory.push(messageEntry);
  thread.lastActivityAt = messageEntry.timestamp;
  
  if (message.leadScoreDelta) {
    thread.leadScore = Math.max(0, Math.min(100, (thread.leadScore || 50) + message.leadScoreDelta));
  }
  if (message.dealStatus) {
    thread.dealStatus = message.dealStatus;
  }

  saveThreads(threads);
  return { thread, message: messageEntry };
}

/**
 * Formats full chronological thread history into clean context for Gemini LLM
 */
function formatThreadContextForPrompt(leadEmail) {
  const normEmail = normalizeEmail(leadEmail);
  const threads = loadThreads();
  const thread = threads.find(t => normalizeEmail(t.leadEmail) === normEmail);

  if (!thread || !thread.threadHistory.length) {
    return `[No prior conversation history recorded for ${leadEmail}. This is an initial outreach interaction.]`;
  }

  let formatted = `=== CONVERSATION THREAD HISTORY WITH: ${thread.leadName} (${thread.role} at ${thread.organization}) ===\n`;
  formatted += `Target Domain: ${thread.domain} | Product Vertical: ${thread.vertical.toUpperCase()} | Deal Status: ${thread.dealStatus} | Lead Score: ${thread.leadScore}/100\n\n`;

  thread.threadHistory.forEach((msg, idx) => {
    const roleLabel = msg.direction === 'OUTBOUND' 
      ? 'LINKABLEAI (Mharc Gatan / Alexis Vance)' 
      : `PROSPECT (${thread.leadName})`;
    
    formatted += `--- [Message ${idx + 1} | ${msg.direction}] ${msg.timestamp} ---\n`;
    formatted += `From: ${msg.sender}\n`;
    formatted += `Subject: ${msg.subject}\n`;
    if (msg.salesMethodology) formatted += `Strategy Applied: ${msg.salesMethodology}\n`;
    formatted += `Content:\n${msg.body.trim()}\n\n`;
  });

  formatted += `=== END OF CONVERSATION HISTORY ===\n`;
  return formatted;
}

/**
 * Retrieves thread analytics
 */
function getThreadAnalytics() {
  const threads = loadThreads();
  const totalThreads = threads.length;
  const totalMessages = threads.reduce((acc, t) => acc + (t.threadHistory?.length || 0), 0);
  const statusCounts = {};
  
  threads.forEach(t => {
    statusCounts[t.dealStatus] = (statusCounts[t.dealStatus] || 0) + 1;
  });

  return {
    totalThreads,
    totalMessages,
    statusCounts,
    avgMessagesPerThread: totalThreads ? (totalMessages / totalThreads).toFixed(1) : 0
  };
}

module.exports = {
  getOrCreateThread,
  appendMessage,
  formatThreadContextForPrompt,
  getThreadAnalytics,
  loadThreads,
  normalizeEmail
};
