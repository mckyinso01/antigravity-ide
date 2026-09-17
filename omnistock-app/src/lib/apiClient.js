/**
 * API client for OmniStock backend.
 * Handles JWT cookie auth, token revocation, and all /api/v1 endpoints.
 */

const API_BASE = '/api/v1';

async function fetchApi(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `API error: ${res.status}`);
  }
  return data;
}

export const api = {
  // Auth
  auth: {
    login: (email) => fetchApi('/auth/login', { method: 'POST', body: JSON.stringify({ email }) }),
    logout: () => fetchApi('/auth/logout', { method: 'POST' }),
    me: () => fetchApi('/auth/me'),
    mfaStepUp: (code) => fetchApi('/auth/mfa-stepup', { method: 'POST', body: JSON.stringify({ code }) }),
    supervisorOverride: (otp) => fetchApi('/auth/supervisor-override', { method: 'POST', body: JSON.stringify({ otp }) }),
  },

  // Security / Validation
  security: {
    signReceipt: (txn) => fetchApi('/receipts/sign', { method: 'POST', body: JSON.stringify(txn) }),
    verifyReceiptChain: () => fetchApi('/receipts/verify'),
    generateVoidToken: (transactionId) => fetchApi('/voids/generate', { method: 'POST', body: JSON.stringify({ transaction_id: transactionId }) }),
    verifyVoidToken: (transactionId, token) => fetchApi('/voids/verify', { method: 'POST', body: JSON.stringify({ transaction_id: transactionId, token }) }),
    encryptCustomer: (data) => fetchApi('/customers', { method: 'POST', body: JSON.stringify(data) }),
    decryptCustomer: (phoneEnc, emailEnc) => fetchApi('/customers/decrypt', { method: 'POST', body: JSON.stringify({ phone_enc: phoneEnc, email_enc: emailEnc }) }),
    validateTaxRate: (data) => fetchApi('/tax-rates/validate', { method: 'POST', body: JSON.stringify(data) }),
    validateDiscount: (data) => fetchApi('/discounts/validate', { method: 'POST', body: JSON.stringify(data) }),
    validateBarcode: (barcode) => fetchApi('/barcode/lookup', { method: 'POST', body: JSON.stringify({ barcode }) }),
    validateImport: (records) => fetchApi('/import/validate', { method: 'POST', body: JSON.stringify({ records }) }),
    validatePromo: (code) => fetchApi('/promo/validate', { method: 'POST', body: JSON.stringify({ code }) }),
    validateStockAdjustment: (data) => fetchApi('/stock-adjustments/validate', { method: 'POST', body: JSON.stringify(data) }),
    validateWriteOff: (data) => fetchApi('/writeoffs/validate', { method: 'POST', body: JSON.stringify(data) }),
    filterProductsByRole: (records) => fetchApi('/products/filter', { method: 'POST', body: JSON.stringify({ records }) }),
  },
};
