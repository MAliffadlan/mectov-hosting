/**
 * Server Service (MOCKED)
 *
 * Returns simulated server statistics.
 * Values fluctuate slightly on each call for realism.
 *
 * // TODO: Replace with real system metrics
 * // Example:
 * // const os = require('os');
 * // const cpu = os.loadavg()[0] / os.cpus().length * 100;
 * // const totalMem = os.totalmem();
 * // const freeMem = os.freemem();
 * // const ram = ((totalMem - freeMem) / totalMem) * 100;
 * //
 * // For disk usage:
 * // const { exec } = require('child_process');
 * // exec("df -h / | awk 'NR==2 {print $5}'", (err, stdout) => { ... });
 */

// Base values for realistic fluctuation
let cpuBase = 25 + Math.random() * 30;
let ramBase = 35 + Math.random() * 20;
let diskBase = 42 + Math.random() * 15;

/**
 * Get simulated server stats
 */
const getStatus = () => {
  // Add slight fluctuation on each call
  cpuBase += (Math.random() - 0.5) * 8;
  ramBase += (Math.random() - 0.5) * 4;
  diskBase += (Math.random() - 0.5) * 1;

  // Clamp values to realistic ranges
  cpuBase = Math.max(5, Math.min(95, cpuBase));
  ramBase = Math.max(20, Math.min(85, ramBase));
  diskBase = Math.max(30, Math.min(75, diskBase));

  return {
    cpu: Math.round(cpuBase * 10) / 10,
    ram: Math.round(ramBase * 10) / 10,
    disk: Math.round(diskBase * 10) / 10,
    uptime: formatUptime(process.uptime()),
    hostname: 'mectov-server',
    platform: process.platform,
    nodeVersion: process.version,
  };
};

/**
 * Format uptime in human-readable form
 */
const formatUptime = (seconds) => {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const parts = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);

  return parts.join(' ');
};

module.exports = {
  getStatus,
};
