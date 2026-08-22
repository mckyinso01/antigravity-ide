const net = require('net');
const dns = require('dns').promises;

/**
 * Deep SMTP Mailbox Verifier
 * Performs a real-time RFC 5321 socket handshake:
 * 1. Syntax check & Role/Alias blacklist
 * 2. DNS MX lookup
 * 3. Socket connect to Port 25
 * 4. HELO -> MAIL FROM -> RCPT TO -> QUIT
 * 
 * Returns: { deliverable: boolean, code: number, reason: string, mx: string }
 */
async function verifyMailboxDeep(email, options = {}) {
  const timeoutMs = options.timeout || 6000;
  const fromEmail = options.fromEmail || 'verify@linkable.it.com';
  const heloHost = options.heloHost || 'mail.linkable.it.com';

  // 1. Syntax Validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    return { deliverable: false, code: 400, reason: 'INVALID_SYNTAX', mx: null };
  }

  const [localPart, domain] = email.toLowerCase().split('@');

  // 2. Strict Role / Blacklist Filter
  const strictBlacklist = [
    'catch-all', 'all', 'everyone', 'postmaster', 'mailer-daemon',
    'no-reply', 'noreply', 'do-not-reply', 'system', 'daemon',
    'abuse', 'spam', 'root', 'security', 'null'
  ];

  if (strictBlacklist.includes(localPart)) {
    return { deliverable: false, code: 403, reason: `GENERIC_ALIAS_BLOCKED (${localPart}@)`, mx: null };
  }

  // 3. DNS MX Resolution
  let mxRecords;
  try {
    mxRecords = await dns.resolveMx(domain);
    if (!mxRecords || mxRecords.length === 0) {
      return { deliverable: false, code: 404, reason: 'NO_MX_RECORDS_FOR_DOMAIN', mx: null };
    }
    // Sort by priority (lowest number = highest priority)
    mxRecords.sort((a, b) => a.priority - b.priority);
  } catch (err) {
    return { deliverable: false, code: 404, reason: `DNS_MX_LOOKUP_FAILED: ${err.message}`, mx: null };
  }

  const primaryMx = mxRecords[0].exchange;

  // 4. Socket Level SMTP RCPT TO Handshake
  return new Promise((resolve) => {
    let socket;
    let step = 0;
    let isResolved = false;

    const finish = (deliverable, code, reason) => {
      if (isResolved) return;
      isResolved = true;
      try {
        if (socket) {
          socket.write('QUIT\r\n');
          socket.end();
          socket.destroy();
        }
      } catch (e) {}
      resolve({ deliverable, code, reason, mx: primaryMx });
    };

    const timer = setTimeout(() => {
      // Timeout on port 25 usually means ISP/Firewall blocked port 25 or greylisting
      finish(false, 408, `SMTP_SOCKET_TIMEOUT (${timeoutMs}ms on ${primaryMx})`);
    }, timeoutMs);

    try {
      socket = net.createConnection(25, primaryMx);

      socket.on('error', (err) => {
        clearTimeout(timer);
        finish(false, 500, `SMTP_SOCKET_ERROR: ${err.message}`);
      });

      socket.on('data', (chunk) => {
        const response = chunk.toString();
        const statusCode = parseInt(response.substring(0, 3), 10);

        if (step === 0) {
          // Greeting received
          if (statusCode === 220) {
            step = 1;
            socket.write(`HELO ${heloHost}\r\n`);
          } else {
            clearTimeout(timer);
            finish(false, statusCode, `UNEXPECTED_GREETING: ${response.trim()}`);
          }
        } else if (step === 1) {
          // HELO response received
          if (statusCode === 250) {
            step = 2;
            socket.write(`MAIL FROM:<${fromEmail}>\r\n`);
          } else {
            clearTimeout(timer);
            finish(false, statusCode, `HELO_REJECTED: ${response.trim()}`);
          }
        } else if (step === 2) {
          // MAIL FROM response received
          if (statusCode === 250) {
            step = 3;
            socket.write(`RCPT TO:<${email}>\r\n`);
          } else {
            clearTimeout(timer);
            finish(false, statusCode, `MAIL_FROM_REJECTED: ${response.trim()}`);
          }
        } else if (step === 3) {
          // RCPT TO response received (THE DEFINITIVE MAILBOX TEST)
          clearTimeout(timer);
          if (statusCode === 250 || statusCode === 251) {
            finish(true, 250, 'MAILBOX_VERIFIED_EXISTS_250_OK');
          } else if (statusCode === 550 || statusCode === 551 || statusCode === 552 || statusCode === 553 || statusCode === 501) {
            finish(false, statusCode, `MAILBOX_DOES_NOT_EXIST_${statusCode}: ${response.trim()}`);
          } else {
            // Greylisted or policy rejection
            finish(false, statusCode, `SMTP_POLICY_OR_GREYLIST_${statusCode}: ${response.trim()}`);
          }
        }
      });
    } catch (err) {
      clearTimeout(timer);
      finish(false, 500, `CONNECTION_EXCEPTION: ${err.message}`);
    }
  });
}

module.exports = {
  verifyMailboxDeep
};
