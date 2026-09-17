/**
 * Titan 1: Kevin Mitnick
 * Focus: Authentication, Authorization, Social Engineering, Session Management & Privilege Escalation
 *
 * Re-audited: 2026-09-17 (2nd pass)
 * Verifier: Source code inspection of AuthContext.jsx, App.jsx, RoleGuard.jsx, apiClient.js,
 *           backend/routes/auth.js, backend/middleware/rbac.js
 */

export function auditMitnick(context = {}, mode = 'continuous') {
  const findings = [];
  const isGate = mode === 'strict_gate';
  const auditDate = '2026-09-17';
  const auditPass = 2;

  // ─── ORIGINAL FINDINGS (verified against source) ────────────────────────

  // MITNICK-01: Mock session auth → JWT/HTTP-only cookies
  // VERIFIED: AuthContext.jsx uses api.auth.login/me/logout with JWT cookies.
  // Backend issues httpOnly JWT cookies with token revocation on logout.
  // NOTE: Dev fallback to sessionStorage mock still exists when backend is unreachable.
  findings.push({
    id: 'MITNICK-01',
    titan: 'mitnick',
    titanName: 'Kevin Mitnick',
    severity: isGate ? 'critical' : 'high',
    role: 'all',
    roleName: 'All Roles',
    finding: 'Client-side mock authentication active via unencrypted sessionStorage token',
    component: 'omnistock-app/src/lib/AuthContext.jsx',
    recommendation: 'Enforce server-validated JWT session with HTTP-only cookies and cryptographically signed claims prior to production release.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'Replaced client-side mock auth with server-validated JWT in HTTP-only cookies via Express backend. Backend revokes tokens on logout.',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'JWT auth via apiClient.js confirmed. Backend httpOnly cookie + revocation list active. Dev fallback to sessionStorage remains for offline mode.',
    category: 'Access Control',
    attackVector: 'An attacker with DOM/DevTools access can spoof omnistock_user_email and access privileged POS manager and pricing routes.'
  });

  // MITNICK-02: RBAC on protected routes
  // VERIFIED: RoleGuard wraps 11 sensitive routes. POS/dashboard intentionally open to cashiers.
  findings.push({
    id: 'MITNICK-02',
    titan: 'mitnick',
    titanName: 'Kevin Mitnick',
    severity: 'high',
    role: 'owner',
    roleName: 'Owner of Establishments',
    component: 'omnistock-app/src/App.jsx',
    finding: 'Monetization and Settings routes lack granular role-based authorization (RBAC)',
    recommendation: 'Implement RoleGuard higher-order component checking claims (owner, manager, cashier) before rendering route views.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'RoleGuard HOC implemented with ROLE_ACCESS map covering 11 sensitive routes. Backend requireRole() middleware enforces server-side.',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'RoleGuard wraps /monetization, /settings, /sales-report, /pricing, /suppliers, /recipes, /customers, /purchase-orders, /stock-adjustments, /analytics, /production-engine. POS/dashboard intentionally accessible to cashiers.',
    category: 'Privilege Escalation',
    attackVector: 'A cashier user can manually navigate to /monetization or /settings and mutate enterprise pricing tier or tax configuration.'
  });

  // MITNICK-03: Referral code sanitization
  // VERIFIED: App.jsx sanitizes with regex + Zod referralCodeSchema.
  findings.push({
    id: 'MITNICK-03',
    titan: 'mitnick',
    titanName: 'Kevin Mitnick',
    severity: 'medium',
    role: 'marketing',
    roleName: 'Marketing Strategist',
    component: 'omnistock-app/src/App.jsx:AuthenticatedApp',
    finding: 'Unsanitized referral code stored directly into sessionStorage from URL search params',
    recommendation: 'Sanitize query parameters against an alphanumeric regex whitelist before sessionStorage persistence.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'Referral codes sanitized via regex replace + Zod referralCodeSchema validation before sessionStorage persistence.',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'App.jsx line: ref.replace(/[^A-Za-z0-9_-]/g, "").slice(0,50) + referralCodeSchema.safeParse(). Confirmed in source.',
    category: 'Input Spoofing',
    attackVector: 'Potential DOM clobbering or referral attribution manipulation via crafted ?ref= payloads.'
  });

  // MITNICK-OWNER-01: MFA step-up for executive financial dashboard
  // REOPENED: MFA infrastructure exists (verifyMfa, mfaStepUp endpoint) but is NOT enforced
  // on SalesReport.jsx or Settings.jsx. No mfaVerified check before rendering.
  findings.push({
    id: 'MITNICK-OWNER-01',
    titan: 'mitnick',
    titanName: 'Kevin Mitnick',
    severity: isGate ? 'critical' : 'high',
    role: 'owner',
    roleName: 'Owner of Establishments',
    component: 'omnistock-app/src/pages/SalesReport.jsx & Settings.jsx',
    finding: 'Executive financial dashboard lacks Multi-Factor Step-Up Authentication for Owner tax & net profit draws',
    recommendation: 'Require biometric or WebAuthn/TOTP challenge before unlocking quarterly VAT records, banking details, or owner capital draw reports.',
    status: 'open',
    remediatedAt: null,
    remediation: null,
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'MFA infrastructure exists (AuthContext.verifyMfa, backend /auth/mfa-stepup, requireStepUp middleware) but is NOT enforced. SalesReport.jsx and Settings.jsx render without checking mfaVerified. requireStepUp middleware is defined but not used on any backend route.',
    category: 'Executive Privilege & Step-Up Auth',
    attackVector: 'An unlocked office tablet allows branch managers to view consolidated corporate net profit, owner draws, and private tax filings.'
  });

  // MITNICK-MGR-02: Supervisor PIN → dynamic OTP
  // REOPENED: Backend endpoint exists but POS doesn't enforce supervisor override for voids.
  findings.push({
    id: 'MITNICK-MGR-02',
    titan: 'mitnick',
    titanName: 'Kevin Mitnick',
    severity: 'high',
    role: 'branch_manager',
    roleName: 'Team Manager / Branch Supervisor',
    component: 'omnistock-app/src/pages/POS.jsx',
    finding: 'Supervisor PIN override allows cashier impersonation for high-value voids and drawer pops',
    recommendation: 'Replace static 4-digit supervisor PINs with dynamic time-based OTP or contactless NFC supervisor badge swipe.',
    status: 'open',
    remediatedAt: null,
    remediation: null,
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'Backend /auth/supervisor-override endpoint exists (issues 5-min override token). apiClient has supervisorOverride(otp). BUT POS.jsx and RefundModal do not call supervisorOverride before voiding or refunding. The endpoint is unused.',
    category: 'Supervisor Impersonation',
    attackVector: 'Cashiers shoulder-surf static manager PINs to void completed cash orders and pocket the register funds.'
  });

  // MITNICK-MKT-03: Coupon stacking abuse
  // VERIFIED: Single discount field inherently prevents stacking.
  findings.push({
    id: 'MITNICK-MKT-03',
    titan: 'mitnick',
    titanName: 'Kevin Mitnick',
    severity: 'medium',
    role: 'marketing',
    roleName: 'Marketing Strategist',
    component: 'omnistock-app/src/pages/Pricing.jsx & POS.jsx',
    finding: 'Promotional discount engine lacks anti-stacking exclusion matrix',
    recommendation: 'Enforce exclusive promotion rule flags ensuring percentage coupons and VIP tier discounts cannot be combined on the same transaction.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'POS checkout supports only a single discount (amount OR percent), inherently preventing stacking. Discount validated via Zod discountSchema (0-100%).',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'POS.jsx has single discount field with discountType toggle. No multi-discount UI exists. Zod discountSchema clamps 0-100.',
    category: 'Promotion Stacking Exploit',
    attackVector: 'Customers stack a 25% promo code on top of a 20% happy hour discount and a $10 voucher, taking items below supplier wholesale cost.'
  });

  // MITNICK-GATE-04: Session logout backend notification
  // VERIFIED: logout() calls api.auth.logout() + sessionStorage broadcast.
  findings.push({
    id: 'MITNICK-GATE-04',
    titan: 'mitnick',
    titanName: 'Kevin Mitnick',
    severity: 'low',
    role: 'cashier',
    roleName: 'Cashier',
    component: 'omnistock-app/src/components/layout/TopBar.jsx',
    finding: 'Session logout does not notify backend token revocation endpoint',
    recommendation: 'Trigger server-side token invalidation and broadcast logout to shared tabs on sign-out.',
    status: 'remediated',
    remediatedAt: '2026-09-17',
    remediation: 'logout() calls api.auth.logout() (backend revokes JWT) + broadcasts via sessionStorage storage event for cross-tab sync.',
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'AuthContext.logout: await api.auth.logout() + sessionStorage.setItem(omnistock_logout_broadcast). TopBar handleLogout calls logout() + navigate.',
    category: 'Session Lifetime',
    attackVector: 'Stale sessions on shared kiosk POS terminals remain valid until browser close.'
  });

  // ─── NEW FINDINGS (2nd pass) ─────────────────────────────────────────────

  // NEW-MITNICK-05: Mock auth fallback grants admin role without backend
  findings.push({
    id: 'MITNICK-05',
    titan: 'mitnick',
    titanName: 'Kevin Mitnick',
    severity: isGate ? 'critical' : 'high',
    role: 'all',
    roleName: 'All Roles',
    component: 'omnistock-app/src/lib/AuthContext.jsx',
    finding: 'AuthContext fallback grants admin role via mock sessionStorage token when backend is unreachable',
    recommendation: 'Remove admin role from mock fallback. Default to cashier role with read-only POS access. Display a visible "OFFLINE MODE" banner when backend is unavailable.',
    status: 'open',
    remediatedAt: null,
    remediation: null,
    verifiedAt: auditDate,
    auditPass,
    verificationNote: 'AuthContext.login catch block: sessionStorage.setItem(omnistock_auth_token, mock_omnistock_token_2026) + setUser({role: admin}). Any user can set this sessionStorage key in DevTools to gain admin access to all RoleGuard-protected routes.',
    category: 'Authentication Bypass',
    attackVector: 'Attacker sets sessionStorage omnistock_auth_token to any value when backend is down, gaining admin role and access to /monetization, /settings, /production-engine.'
  });

  return findings;
}

export default auditMitnick;
