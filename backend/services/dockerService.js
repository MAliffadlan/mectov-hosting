const projectService = require('./projectService');
const logService = require('./logService');

/**
 * Docker Service (MOCKED)
 *
 * Simulates Docker container operations with realistic delays.
 * Each function returns a Promise that resolves after a fake delay.
 *
 * // TODO: Replace with real Docker implementation using child_process
 * // Example real implementation:
 * // const { exec } = require('child_process');
 * // exec(`docker start ${containerName}`, (err, stdout, stderr) => { ... });
 */

// Simulate async delay (like real Docker operations)
const simulateDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Start a project container
 * // TODO: Replace with: exec(`docker start ${project.name}`)
 */
const startProject = async (id) => {
  const project = projectService.getById(id);
  if (!project) throw new Error('Project not found.');
  if (project.status === 'running') throw new Error('Project is already running.');

  // Simulate Docker pull + start (1.5-3s delay)
  const delay = 1500 + Math.random() * 1500;
  await simulateDelay(delay);

  const updated = projectService.updateStatus(id, 'running');

  // Generate startup logs
  logService.addLog(id, 'INFO', `Container ${project.name} starting...`);
  logService.addLog(id, 'INFO', `Pulling image for ${project.name}...`);
  logService.addLog(id, 'INFO', `Image pulled successfully.`);
  logService.addLog(id, 'INFO', `Container ${project.name} started on port ${project.port}.`);
  logService.addLog(id, 'INFO', `Listening on 0.0.0.0:${project.port}`);

  return updated;
};

/**
 * Stop a project container
 * // TODO: Replace with: exec(`docker stop ${project.name}`)
 */
const stopProject = async (id) => {
  const project = projectService.getById(id);
  if (!project) throw new Error('Project not found.');
  if (project.status === 'stopped') throw new Error('Project is already stopped.');

  // Simulate graceful shutdown (1-2s delay)
  const delay = 1000 + Math.random() * 1000;
  await simulateDelay(delay);

  const updated = projectService.updateStatus(id, 'stopped');

  logService.addLog(id, 'WARN', `Stopping container ${project.name}...`);
  logService.addLog(id, 'INFO', `Graceful shutdown initiated.`);
  logService.addLog(id, 'INFO', `Container ${project.name} stopped.`);

  return updated;
};

/**
 * Restart a project container
 * // TODO: Replace with: exec(`docker restart ${project.name}`)
 */
const restartProject = async (id) => {
  const project = projectService.getById(id);
  if (!project) throw new Error('Project not found.');

  // Simulate restart (2-4s delay)
  const delay = 2000 + Math.random() * 2000;

  logService.addLog(id, 'WARN', `Restarting container ${project.name}...`);
  projectService.updateStatus(id, 'stopped');

  await simulateDelay(delay);

  const updated = projectService.updateStatus(id, 'running');

  logService.addLog(id, 'INFO', `Container ${project.name} restarted successfully.`);
  logService.addLog(id, 'INFO', `Listening on 0.0.0.0:${project.port}`);

  return updated;
};

module.exports = {
  startProject,
  stopProject,
  restartProject,
};
