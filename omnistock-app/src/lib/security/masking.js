/**
 * Field masking utilities for PII display (KAMKAR-01, KAMKAR-MKT-02).
 */

/** Mask phone: 09171234567 -> 0917***4567 */
export function maskPhone(phone) {
  if (!phone || phone.length < 7) return phone;
  return phone.slice(0, 4) + '***' + phone.slice(-4);
}

/** Mask email: juan@example.com -> ju***@example.com */
export function maskEmail(email) {
  if (!email || !email.includes('@')) return email;
  const [name, domain] = email.split('@');
  return name.slice(0, 2) + '***@' + domain;
}

/** Mask address: "123 Main St, Quezon City" -> "123 M***..." */
export function maskAddress(address) {
  if (!address || address.length < 10) return address;
  return address.slice(0, 6) + '***';
}

/** Mask TIN: 123-456-789-000 -> 123-***-***-000 */
export function maskTin(tin) {
  if (!tin || tin.length < 8) return tin;
  return tin.slice(0, 4) + '***' + tin.slice(-3);
}

/** Mask bank account: 1234567890 -> ****7890 */
export function maskBankAccount(account) {
  if (!account || account.length < 4) return account;
  return '****' + account.slice(-4);
}

/**
 * Apply masking to a customer record for display.
 */
export function maskCustomerRecord(record) {
  if (!record) return record;
  return {
    ...record,
    phone: record.phone ? maskPhone(record.phone) : record.phone,
    email: record.email ? maskEmail(record.email) : record.email,
    address: record.address ? maskAddress(record.address) : record.address,
  };
}

/**
 * Apply masking to an array of customer records.
 */
export function maskCustomerRecords(records) {
  if (!Array.isArray(records)) return records;
  return records.map(maskCustomerRecord);
}

/**
 * Mask CSV export columns (KAMKAR-MKT-02).
 * Only includes columns approved for export; requires justification.
 */
export function maskExportRow(row, allowedColumns = ['name', 'loyalty_points', 'status']) {
  const masked = {};
  for (const col of allowedColumns) {
    if (col in row) masked[col] = row[col];
  }
  // Phone and email are masked, not included raw
  if ('phone' in row) masked.phone = maskPhone(row.phone);
  if ('email' in row) masked.email = maskEmail(row.email);
  return masked;
}
