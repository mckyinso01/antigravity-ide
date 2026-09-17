/**
 * Audit Report Export Utilities
 * Generates downloadable CSV and PDF reports from the Devil's Team audit state.
 */
import { jsPDF } from 'jspdf';

function timestamp() {
  return new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
}

function csvEscape(value) {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

/**
 * Export audit findings as a downloadable CSV file.
 * @param {object} auditState - The audit result object from engine state
 */
export function exportAuditCSV(auditState) {
  const headers = [
    'Finding ID', 'Titan', 'Role', 'Severity', 'Status',
    'Finding', 'Component', 'Recommendation', 'Attack Vector'
  ];

  const rows = (auditState.findings || []).map(f => [
    f.id, f.titan, f.role, f.severity, f.status,
    f.finding, f.component, f.recommendation, f.attackVector || ''
  ].map(csvEscape));

  const csv = [headers.map(csvEscape).join(','), ...rows.map(r => r.join(','))].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `devils-team-audit-${timestamp()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Export audit findings as a downloadable PDF report.
 * Uses jsPDF for client-side generation with no server dependency.
 * @param {object} auditState - The audit result object from engine state
 */
export function exportAuditPDF(auditState) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - margin * 2;
  let y = 20;

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text("Devil's Team Audit Report", margin, y);
  y += 10;

  // Meta info
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, margin, y); y += 6;
  doc.text(`Audit Mode: ${auditState.mode || 'N/A'}`, margin, y); y += 6;
  doc.text(`Duration: ${auditState.durationMs || 0}ms`, margin, y); y += 6;

  // Gate decision
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  const gateColor = auditState.gateDecision === 'BLOCKED' ? [220, 38, 38] : [22, 163, 74];
  doc.setTextColor(...gateColor);
  doc.text(`Gate Decision: ${auditState.gateDecision || 'N/A'}`, margin, y);
  doc.setTextColor(0, 0, 0);
  y += 10;

  // Metrics summary
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const m = auditState.metrics || {};
  doc.text(
    `Total: ${m.total || 0}  |  Critical: ${m.critical || 0}  |  High: ${m.high || 0}  |  Medium: ${m.medium || 0}`,
    margin, y
  ); y += 6;
  doc.text(
    `Remediated: ${m.remediated || 0}  |  Waived: ${m.waived || 0}`,
    margin, y
  ); y += 10;

  // Override info
  if (auditState.overrideActive && auditState.overrideDetails) {
    doc.setFont('helvetica', 'bold');
    doc.text(`Admin Override Active: ${auditState.overrideDetails.author}`, margin, y); y += 6;
    doc.setFont('helvetica', 'normal');
    const overrideReasonLines = doc.splitTextToSize(`Reason: ${auditState.overrideDetails.reason}`, maxWidth);
    doc.text(overrideReasonLines, margin, y); y += overrideReasonLines.length * 5 + 4;
  }

  // Separator
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // Findings grouped by titan
  const titanOrder = ['mitnick', 'geohot', 'kamkar', 'miller', 'jack'];
  const titanNames = {
    mitnick: 'Kevin Mitnick — Access Control & Social Eng.',
    geohot: 'George Hotz — System Edge Cases & Concurrency',
    kamkar: 'Samy Kamkar — Data Exposure & Client Storage',
    miller: 'Charlie Miller — Fuzzing & Input Validation',
    jack: 'Barnaby Jack — Infrastructure & Fault Tolerance',
  };

  titanOrder.forEach(titanId => {
    const findings = (auditState.findings || []).filter(f => f.titan === titanId);
    if (findings.length === 0) return;

    // Titan header
    if (y > 270) { doc.addPage(); y = 20; }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(titanNames[titanId] || titanId, margin, y);
    y += 7;
    doc.setFontSize(9);
    doc.text(`${findings.length} finding(s)`, margin, y);
    y += 8;

    // Individual findings
    findings.forEach(f => {
      if (y > 260) { doc.addPage(); y = 20; }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      const severityLabel = `[${(f.severity || 'unknown').toUpperCase()}] ${f.id}`;
      doc.text(severityLabel, margin, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      const findingLines = doc.splitTextToSize(f.finding || '', maxWidth);
      doc.text(findingLines, margin, y);
      y += findingLines.length * 4 + 2;

      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      const compLines = doc.splitTextToSize(`Component: ${f.component || 'N/A'}`, maxWidth);
      doc.text(compLines, margin, y);
      y += compLines.length * 4;

      doc.setTextColor(60, 60, 60);
      const recLines = doc.splitTextToSize(`Recommendation: ${f.recommendation || 'N/A'}`, maxWidth);
      doc.text(recLines, margin, y);
      y += recLines.length * 4;

      if (f.attackVector) {
        const avLines = doc.splitTextToSize(`Attack Vector: ${f.attackVector}`, maxWidth);
        doc.text(avLines, margin, y);
        y += avLines.length * 4;
      }

      doc.setTextColor(0, 0, 0);
      doc.text(`Status: ${f.status || 'open'}  |  Role: ${f.roleName || f.role || 'all'}`, margin, y);
      y += 8;
    });

    y += 4;
  });

  doc.save(`devils-team-audit-${timestamp()}.pdf`);
}

// ═══════════════════════════════════════════════════════════════
// COMBINED EXPORT — All Scenario Sets (Devil's Team + F&B + Security)
// ═══════════════════════════════════════════════════════════════

/**
 * Export combined findings from all scenario sets as CSV.
 * @param {object} data - { findings: [{scenarioSet, role, titan, titanName, vector, severity, status, defense, defenseSchemaName, violations}], metrics }
 */
export function exportCombinedCSV(data) {
  const headers = [
    'Scenario Set', 'Role', 'Titan', 'Vector', 'Severity',
    'Status', 'Defense Mechanism', 'Defense Schema', 'Violations'
  ];

  const rows = (data.findings || []).map(f => [
    f.scenarioSet, f.role, f.titanName || f.titan, f.vector, f.severity,
    f.status, f.defense, f.defenseSchemaName,
    (f.violations || []).join('; ')
  ].map(csvEscape));

  const csv = [headers.map(csvEscape).join(','), ...rows.map(r => r.join(','))].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `combined-scenarios-audit-${timestamp()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Export combined findings from all scenario sets as PDF.
 * Groups by scenario set, then by titan.
 * @param {object} data - { findings: [...], metrics: {total, intercepted, breached, critical, high, medium} }
 */
export function exportCombinedPDF(data) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - margin * 2;
  let y = 20;

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('Combined Scenarios Audit Report', margin, y);
  y += 10;

  // Meta
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, margin, y); y += 6;

  // Metrics summary
  const m = data.metrics || {};
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Aggregate Metrics', margin, y); y += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(
    `Total Threats: ${m.total || 0}  |  Intercepted: ${m.intercepted || 0}  |  Breached: ${m.breached || 0}`,
    margin, y
  ); y += 6;
  doc.text(
    `Critical: ${m.critical || 0}  |  High: ${m.high || 0}  |  Medium: ${m.medium || 0}`,
    margin, y
  ); y += 10;

  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // Group by scenario set
  const setOrder = ["Devil's Team", 'F&B Management', 'Security Scenarios'];
  const titanOrder = ['mitnick', 'geohot', 'kamkar', 'miller', 'jack'];
  const titanNames = {
    mitnick: 'Kevin Mitnick',
    geohot: 'George Hotz',
    kamkar: 'Samy Kamkar',
    miller: 'Charlie Miller',
    jack: 'Barnaby Jack',
  };

  setOrder.forEach(setName => {
    const setFindings = (data.findings || []).filter(f => f.scenarioSet === setName);
    if (setFindings.length === 0) return;

    if (y > 270) { doc.addPage(); y = 20; }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(setName, margin, y); y += 7;
    doc.setFontSize(9);
    doc.text(`${setFindings.length} finding(s)`, margin, y); y += 8;

    // Group by titan within this set
    titanOrder.forEach(titanId => {
      const titanFindings = setFindings.filter(f => f.titan === titanId);
      if (titanFindings.length === 0) return;

      if (y > 265) { doc.addPage(); y = 20; }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(titanNames[titanId] || titanId, margin, y); y += 6;

      titanFindings.forEach(f => {
        if (y > 260) { doc.addPage(); y = 20; }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text(`[${(f.severity || 'unknown').toUpperCase()}] ${f.status.toUpperCase()}`, margin, y); y += 5;

        doc.setFont('helvetica', 'normal');
        const vecLines = doc.splitTextToSize(f.vector || '', maxWidth);
        doc.text(vecLines, margin, y); y += vecLines.length * 4 + 1;

        doc.setFontSize(8);
        doc.setTextColor(80, 80, 80);
        doc.text(`Role: ${f.role || 'N/A'}`, margin, y); y += 4;
        doc.text(`Schema: ${f.defenseSchemaName || 'N/A'}`, margin, y); y += 4;

        doc.setTextColor(60, 60, 60);
        const defLines = doc.splitTextToSize(`Defense: ${f.defense || 'N/A'}`, maxWidth);
        doc.text(defLines, margin, y); y += defLines.length * 4;

        if (f.violations && f.violations.length > 0) {
          doc.setTextColor(180, 60, 60);
          const violText = f.violations.join('; ');
          const violLines = doc.splitTextToSize(`Violations: ${violText}`, maxWidth);
          doc.text(violLines, margin, y); y += violLines.length * 4;
        }

        doc.setTextColor(0, 0, 0);
        y += 4;
      });

      y += 3;
    });

    y += 5;
  });

  doc.save(`combined-scenarios-audit-${timestamp()}.pdf`);
}
