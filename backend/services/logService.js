/**
 * Log Service (MOCKED)
 *
 * Generates and stores fake container logs in memory.
 * Each project stores up to MAX_LOGS entries.
 *
 * // TODO: Replace with real Docker logs
 * // Example: exec(`docker logs --tail 100 ${containerName}`)
 */

const MAX_LOGS = 100;

// In-memory log storage: { projectId: [logEntry, ...] }
const logsStore = {};

// Sample log messages for realistic output
const sampleMessages = [
  'Request received: GET /',
  'Request received: GET /api/health',
  'Request received: POST /api/data',
  'Database connection established.',
  'Cache hit for key: session_abc123',
  'Cache miss for key: user_profile_456',
  'Worker process spawned (PID: %PID%)',
  'Static assets served successfully.',
  'WebSocket connection opened.',
  'WebSocket connection closed.',
  'Scheduled task executed: cleanup_temp',
  'Memory usage: %MEM%MB / 512MB',
  'Response time: %MS%ms',
  'Health check passed.',
  'SSL certificate valid for 89 days.',
  'Rate limiter: 42/100 requests used.',
  'Compression: gzip applied to response.',
  'CORS: Allowed origin https://%DOMAIN%',
];

const logLevels = ['INFO', 'INFO', 'INFO', 'INFO', 'DEBUG', 'WARN'];

/**
 * Get current timestamp in ISO format
 */
const getTimestamp = () => new Date().toISOString();

/**
 * Generate a realistic log message with random values
 */
const generateMessage = () => {
  const msg = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
  return msg
    .replace('%PID%', Math.floor(1000 + Math.random() * 9000))
    .replace('%MEM%', Math.floor(50 + Math.random() * 300))
    .replace('%MS%', Math.floor(1 + Math.random() * 500))
    .replace('%DOMAIN%', 'example.com');
};

/**
 * Add a log entry for a project
 */
const addLog = (projectId, level, message) => {
  if (!logsStore[projectId]) {
    logsStore[projectId] = [];
  }

  const entry = {
    timestamp: getTimestamp(),
    level: level || logLevels[Math.floor(Math.random() * logLevels.length)],
    message: message || generateMessage(),
  };

  logsStore[projectId].push(entry);

  // Keep only last MAX_LOGS entries
  if (logsStore[projectId].length > MAX_LOGS) {
    logsStore[projectId] = logsStore[projectId].slice(-MAX_LOGS);
  }

  return entry;
};

/**
 * Get all logs for a project
 */
const getLogs = (projectId) => {
  return logsStore[projectId] || [];
};

/**
 * Clear logs for a project
 */
const clearLogs = (projectId) => {
  logsStore[projectId] = [];
};

/**
 * Generate a batch of fake logs (used when viewing logs for a running project)
 */
const generateBatchLogs = (projectId, count = 10) => {
  for (let i = 0; i < count; i++) {
    addLog(projectId);
  }
  return getLogs(projectId);
};

module.exports = {
  addLog,
  getLogs,
  clearLogs,
  generateBatchLogs,
};
