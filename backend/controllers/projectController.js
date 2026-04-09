const projectService = require('../services/projectService');
const dockerService = require('../services/dockerService');
const logService = require('../services/logService');

/**
 * Project Controller
 * Handles project CRUD, Docker control, logs, and nginx config
 */

// GET /projects — List all projects
const getAll = async (req, res) => {
  try {
    const projects = projectService.getAll();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /projects — Create a project
const create = async (req, res) => {
  try {
    const { name, port, domain } = req.body;

    if (!name || !port || !domain) {
      return res.status(400).json({ error: 'Name, port, and domain are required.' });
    }

    if (typeof port !== 'number' || port < 1 || port > 65535) {
      return res.status(400).json({ error: 'Port must be a number between 1 and 65535.' });
    }

    const project = projectService.create({ name, port, domain });
    logService.addLog(project.id, 'INFO', `Project "${name}" created.`);

    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /projects/:id — Delete a project
const remove = async (req, res) => {
  try {
    const removed = projectService.remove(req.params.id);
    logService.clearLogs(req.params.id);
    res.json({ message: `Project "${removed.name}" deleted.`, project: removed });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// POST /projects/:id/start — Start a project
const start = async (req, res) => {
  try {
    const project = await dockerService.startProject(req.params.id);
    res.json({ message: `Project "${project.name}" started.`, project });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST /projects/:id/stop — Stop a project
const stop = async (req, res) => {
  try {
    const project = await dockerService.stopProject(req.params.id);
    res.json({ message: `Project "${project.name}" stopped.`, project });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST /projects/:id/restart — Restart a project
const restart = async (req, res) => {
  try {
    const project = await dockerService.restartProject(req.params.id);
    res.json({ message: `Project "${project.name}" restarted.`, project });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /projects/:id/logs — Get project logs
const getLogs = async (req, res) => {
  try {
    const project = projectService.getById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    // Generate some activity logs if project is running
    if (project.status === 'running') {
      logService.generateBatchLogs(req.params.id, 3);
    }

    const logs = logService.getLogs(req.params.id);
    res.json({ projectId: req.params.id, projectName: project.name, logs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /projects/:id/nginx-config — Get simulated nginx config
const getNginxConfig = async (req, res) => {
  try {
    const project = projectService.getById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    const config = `# Nginx reverse proxy configuration for ${project.name}
# File: /etc/nginx/sites-available/${project.domain}

server {
    listen 80;
    server_name ${project.domain};

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ${project.domain};

    # SSL certificates (managed by Certbot)
    ssl_certificate /etc/letsencrypt/live/${project.domain}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${project.domain}/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        proxy_pass http://127.0.0.1:${project.port};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Logging
    access_log /var/log/nginx/${project.domain}.access.log;
    error_log /var/log/nginx/${project.domain}.error.log;
}`;

    res.json({ projectId: project.id, projectName: project.name, config });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  create,
  remove,
  start,
  stop,
  restart,
  getLogs,
  getNginxConfig,
};
