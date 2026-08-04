/**
 * Deterministic Source Code AST & Compliance Sweep Engine
 * Scans tracked source files (.ts, .tsx, .js, .jsx, .css), evaluates design token rules,
 * detects forbidden color fills, secret leaks, and emits ast-report.json with SHA-256 file manifests.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

interface AuditRuleHit {
  file: string;
  line: number;
  ruleId: string;
  severity: 'ERROR' | 'WARNING';
  message: string;
}

interface FileManifest {
  path: string;
  sha256: string;
  sizeBytes: number;
}

interface ASTAuditReport {
  timestamp: string;
  totalFilesScanned: number;
  totalErrors: number;
  totalWarnings: number;
  manifest: FileManifest[];
  hits: AuditRuleHit[];
  verdict: 'PASS' | 'FAIL';
}

const REPO_ROOT = path.resolve(__dirname, '..');
const SEARCH_DIRS = ['GHL-PULSE/src', 'src', 'EMS/src', 'omnistock/src'];
const ALLOWED_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.css'];

// Rule definitions
const FORBIDDEN_PATTERNS = [
  {
    id: 'FORBIDDEN-PASTEL-CARD-FILL',
    regex: /bg-(?:orange|yellow|violet|slate|gray|red|amber|emerald)-100\b/g,
    severity: 'ERROR' as const,
    message: 'Prohibited light-pastel card background fill on dark mode surface.'
  },
  {
    id: 'FORBIDDEN-WHITE-CARD-FILL',
    regex: /bg-(?:white|#ffffff|#fff)\b/gi,
    severity: 'WARNING' as const,
    message: 'Verify white surface fill does not bleed into dark Cyber Glass mode.'
  },
  {
    id: 'HARDCODED-SECRET-KEY',
    regex: /(?:sk_live_|ghp_|AIzaSy)[A-Za-z0-9_-]{20,}/g,
    severity: 'ERROR' as const,
    message: 'Possible hardcoded API key or token detected.'
  },
  {
    id: 'UNGUARDED-ARRAY-LENGTH',
    regex: /\b([a-zA-Z0-9_]+)\.length\b(?!.*?(\?\.|\|\||\&\&))/g,
    severity: 'WARNING' as const,
    message: 'Check array property access for defensive fallback chaining.'
  }
];

function getAllFiles(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
        results = results.concat(getAllFiles(filePath));
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (ALLOWED_EXTENSIONS.includes(ext)) {
        results.push(filePath);
      }
    }
  });
  return results;
}

function runASTScan(): ASTAuditReport {
  console.log('🔍 Starting Deterministic AST & Token Compliance Sweep...');
  const allFiles: string[] = [];

  SEARCH_DIRS.forEach((sDir) => {
    const fullPath = path.join(REPO_ROOT, sDir);
    if (fs.existsSync(fullPath)) {
      allFiles.push(...getAllFiles(fullPath));
    }
  });

  const manifest: FileManifest[] = [];
  const hits: AuditRuleHit[] = [];
  let totalErrors = 0;
  let totalWarnings = 0;

  allFiles.forEach((filePath) => {
    const relativePath = path.relative(REPO_ROOT, filePath).replace(/\\/g, '/');
    const content = fs.readFileSync(filePath, 'utf-8');
    const sha256 = crypto.createHash('sha256').update(content).digest('hex');
    const sizeBytes = Buffer.byteLength(content, 'utf-8');

    manifest.push({ path: relativePath, sha256, sizeBytes });

    const lines = content.split('\n');
    lines.forEach((lineText, lineIdx) => {
      FORBIDDEN_PATTERNS.forEach((rule) => {
        let match;
        // Reset regex state
        rule.regex.lastIndex = 0;
        while ((match = rule.regex.exec(lineText)) !== null) {
          const displayMatch = rule.id === 'HARDCODED-SECRET-KEY' ? '[REDACTED_SECRET]' : match[0];
          hits.push({
            file: relativePath,
            line: lineIdx + 1,
            ruleId: rule.id,
            severity: rule.severity,
            message: `${rule.message} (Found: "${displayMatch}")`
          });
          if (rule.severity === 'ERROR') totalErrors++;
          if (rule.severity === 'WARNING') totalWarnings++;
        }
      });
    });
  });

  const verdict = totalErrors === 0 ? 'PASS' : 'FAIL';

  const report: ASTAuditReport = {
    timestamp: new Date().toISOString(),
    totalFilesScanned: allFiles.length,
    totalErrors,
    totalWarnings,
    manifest,
    hits,
    verdict
  };

  const outputDir = path.join(REPO_ROOT, 'audits');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const reportPath = path.join(outputDir, 'ast-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`✅ AST Sweep complete. Scanned ${allFiles.length} files. Verdict: ${verdict}`);
  console.log(`📄 Report saved to: ${reportPath}`);

  return report;
}

if (require.main === module) {
  const report = runASTScan();
  if (report.verdict === 'FAIL') {
    process.exit(1);
  }
}

export { runASTScan };
