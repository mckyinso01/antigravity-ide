import { Router } from 'express';
import { issueToken, revokeJwt, decodeToken } from '../services/jwt.js';
import { config } from '../config/env.js';
import { authRequired } from '../middleware/auth.js';
import { validateBody, referralCodeSchema } from '../middleware/validate.js';

const router = Router();

// ─── Mock user database (dev) ────────────────────────────────────────────
// In production this would be a real DB lookup. For dev, any email works.
const ROLE_MAP = {
  'owner@omnistock.io': 'owner',
  'manager@omnistock.io': 'manager',
  'cashier@omnistock.io': 'cashier',
  'inventory@omnistock.io': 'inventory',
  'analyst@omnistock.io': 'analyst',
  'marketing@omnistock.io': 'marketing',
  'admin@omnistock.io': 'admin',
};

function resolveRole(email) {
  return ROLE_MAP[email.toLowerCase()] || 'cashier'; // default to cashier
}

function resolveName(email) {
  const base = email.split('@')[0];
  return base.charAt(0).toUpperCase() + base.slice(1);
}

// ─── POST /api/v1/auth/login ─────────────────────────────────────────────
router.post('/login', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const role = resolveRole(email);
  const name = resolveName(email);
  const token = issueToken({ email, role, name });

  res.cookie(config.jwt.cookieName, token, config.jwt.cookieOptions);
  res.json({ token, user: { email, role, name } });
});

// ─── POST /api/v1/auth/mfa-stepup ────────────────────────────────────────
// Issues a fresh token with mfa_verified flag for step-up auth
router.post('/mfa-stepup', authRequired, (req, res) => {
  const { code } = req.body;
  // In dev, any 6-digit code works. In production, verify TOTP/WebAuthn.
  if (!code || !/^\d{6}$/.test(code)) {
    return res.status(400).json({ error: 'Valid 6-digit MFA code required' });
  }

  const { email, role, name } = req.user;
  const token = issueToken({ email, role, name, mfa_verified: true });

  res.cookie(config.jwt.cookieName, token, config.jwt.cookieOptions);
  res.json({ token, mfa_verified: true });
});

// ─── POST /api/v1/auth/logout ────────────────────────────────────────────
router.post('/logout', authRequired, (req, res) => {
  const token = req.cookies?.[config.jwt.cookieName]
    || (req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.slice(7)
      : null);

  if (token) revokeJwt(token);

  res.clearCookie(config.jwt.cookieName, { path: '/' });
  res.json({ success: true });
});

// ─── GET /api/v1/auth/me ─────────────────────────────────────────────────
router.get('/me', authRequired, (req, res) => {
  res.json({ user: req.user });
});

// ─── POST /api/v1/auth/supervisor-override ───────────────────────────────
// Dynamic supervisor override (replaces static PIN)
router.post('/supervisor-override', authRequired, (req, res) => {
  const { otp } = req.body;
  // In dev, any 6-digit code works. In production, verify TOTP.
  if (!otp || !/^\d{6}$/.test(otp)) {
    return res.status(400).json({ error: 'Valid 6-digit OTP required' });
  }

  // Issue a short-lived override token (5 min)
  const { email, role, name } = req.user;
  const overrideToken = issueToken({ email, role, name, supervisor_override: true });

  res.json({ override_token: overrideToken, expires_in: 300 });
});

export default router;
