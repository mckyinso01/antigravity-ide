/**
 * Centralized environment configuration for OmniStock backend.
 * All secrets are read from process.env (delivered via /run/base44/app.env or compose environment).
 */

export const config = {
  port: parseInt(process.env.BACKEND_PORT || '4000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
    expiresIn: '8h',
    cookieName: 'omnistock_jwt',
    // SameSite=None requires Secure; in dev (http) we fall back to lax
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 8 * 60 * 60 * 1000, // 8 hours
      path: '/',
    },
  },

  // HMAC signing key for receipts and void tokens
  hmac: {
    secret: process.env.HMAC_SECRET || 'dev-hmac-secret-change-in-production',
  },

  // CORS — allow the Vite dev server origin
  cors: {
    origin: process.env.CORS_ORIGIN || true, // true = reflect request origin in dev
    credentials: true,
  },

  // Enterprise roles
  roles: ['owner', 'manager', 'cashier', 'inventory', 'analyst', 'marketing', 'admin'],
};
