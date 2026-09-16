import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db1Path = path.join(__dirname, 'MASTER_UK_HOSPITALS_COMPREHENSIVE_DATABASE.json');
const db2Path = path.join(__dirname, 'UK_HOSPITALS_BATCH_2_EXHAUSTIVE_DATABASE.json');
const logPath = path.join(__dirname, 'src', 'dispatch_log.json');

const db1 = fs.existsSync(db1Path) ? JSON.parse(fs.readFileSync(db1Path, 'utf-8')) : [];
const db2 = fs.existsSync(db2Path) ? JSON.parse(fs.readFileSync(db2Path, 'utf-8')) : [];
const logs = fs.existsSync(logPath) ? JSON.parse(fs.readFileSync(logPath, 'utf-8')) : [];

const delivered1 = db1.filter(h => h.status === 'DELIVERED');
const delivered2 = db2.filter(h => h.status === 'DELIVERED');

console.log(`📊 UK Database 1 Delivered: ${delivered1.length}`);
console.log(`📊 UK Database 2 Delivered: ${delivered2.length}`);
console.log(`📊 Total UK Hospitals Delivered Clinical Pristine: ${delivered1.length + delivered2.length}`);

// Check for existing addendums
const addendumSent = new Set(logs.filter(l => l.type === 'CLAIM_GUARD_HOSPITAL_ADDENDUM').map(l => l.email.toLowerCase()));
console.log(`📊 ClaimGuard Addendums Sent So Far: ${addendumSent.size}`);

const pendingAddendum = [...delivered1, ...delivered2].filter(h => !addendumSent.has(h.sample_email.toLowerCase()));
console.log(`🎯 Ready for ClaimGuard Dual-Pitch Addendum: ${pendingAddendum.length} UK NHS Trusts & Boards`);
