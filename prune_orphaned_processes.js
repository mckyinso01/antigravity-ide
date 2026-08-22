/**
 * 🧹 PRUNE ORPHANED NODE & TEST PROCESSES
 * Retains essential background daemons and IDE tasks while freeing system RAM.
 */

const { execSync } = require('child_process');

console.log('--- SCANNING NODE PROCESSES ---');
try {
  const currentPid = process.pid;
  const parentPid = process.ppid;

  // Find PIDs listening on ports
  const netstat = execSync('netstat -ano', { encoding: 'utf8' });
  const keepPids = new Set([currentPid, parentPid]);

  // Keep processes listening on ports 8089 (Master Hub)
  netstat.split('\n').forEach(line => {
    if (line.includes(':8089') && line.includes('LISTENING')) {
      const parts = line.trim().split(/\s+/);
      const pid = parseInt(parts[parts.length - 1], 10);
      if (pid) keepPids.add(pid);
    }
  });

  // Find daemons
  const wmicOutput = execSync('wmic process where "name=\'node.exe\'" get ProcessId,CommandLine /format:csv', { encoding: 'utf8' });
  wmicOutput.split('\n').forEach(line => {
    if (line.includes('hourlyMasterDaemon.js') || line.includes('leadsuite_24_7_continuous_dispatch_daemon.js') || line.includes('antigravity') || line.includes('gemini') || line.includes('language-server') || line.includes('extension')) {
      const parts = line.trim().split(',');
      const pid = parseInt(parts[parts.length - 1], 10);
      if (pid) keepPids.add(pid);
    }
  });

  console.log(`Protected PIDs (${keepPids.size}):`, Array.from(keepPids).join(', '));

  // Get all node processes
  const tasklist = execSync('tasklist /FI "IMAGENAME eq node.exe" /FO CSV /NH', { encoding: 'utf8' });
  let killedCount = 0;
  tasklist.split('\n').forEach(line => {
    if (!line.trim()) return;
    const parts = line.replace(/"/g, '').split(',');
    const pid = parseInt(parts[1], 10);
    if (pid && !keepPids.has(pid)) {
      try {
        process.kill(pid, 'SIGTERM');
        killedCount++;
      } catch (e) {
        // ignore
      }
    }
  });

  console.log(`✅ Successfully pruned ${killedCount} orphaned background processes.`);
} catch (e) {
  console.log('Error during process prune:', e.message);
}
