/**
 * Role-Based Access Control (RBAC) middleware.
 * Usage: router.get('/settings', authRequired, requireRole('owner', 'admin'), handler)
 */

/**
 * Create middleware that allows only specified roles.
 * @param  {...string} roles
 */
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Admin bypasses all role checks
    if (req.user.role === 'admin') return next();

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Insufficient permissions',
        required: roles,
        current: req.user.role,
      });
    }
    next();
  };
}

/**
 * Step-up auth: requires a fresh token (issued within last 5 minutes)
 * or an MFA-verified flag. Used for Owner tax & financial views.
 */
export function requireStepUp(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  // Check if token has mfa_verified flag
  if (req.user.mfa_verified) return next();

  // Check if token is fresh (issued within 5 min)
  const tokenIat = req.user.iat ? req.user.iat * 1000 : 0;
  const fiveMinAgo = Date.now() - 5 * 60 * 1000;
  if (tokenIat > fiveMinAgo) return next();

  return res.status(403).json({
    error: 'Step-up authentication required',
    requiresMfa: true,
  });
}

/**
 * Attribute-Based Access Control (ABAC) field filter.
 * Strips sensitive fields from response objects based on user role.
 * @param {string} userRole
 * @param {object} record
 * @returns {object} filtered record
 */
export const FIELD_ACCESS = {
  // cost_price and markup are only visible to inventory, analyst, owner, admin
  cost_price: ['inventory', 'analyst', 'owner', 'admin'],
  markup: ['inventory', 'analyst', 'owner', 'admin'],
  // banking and TIN only visible to owner, admin
  tin: ['owner', 'admin'],
  bank_account: ['owner', 'admin'],
  // supplier wholesale pricing
  supplier_cost: ['inventory', 'analyst', 'owner', 'admin'],
};

export function filterFieldsByRole(userRole, record) {
  if (!record || userRole === 'admin') return record;

  const filtered = { ...record };
  for (const [field, allowedRoles] of Object.entries(FIELD_ACCESS)) {
    if (!allowedRoles.includes(userRole) && field in filtered) {
      delete filtered[field];
    }
  }
  return filtered;
}

export function filterListFieldsByRole(userRole, records) {
  if (!records || userRole === 'admin') return records;
  return records.map((r) => filterFieldsByRole(userRole, r));
}
