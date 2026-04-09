# 🏠 Mectov Hosting Panel v1

A self-hosted web panel to manage and deploy applications on your personal server.

**Single-user internal tool** — like a mini Coolify or cPanel.

![Tech Stack](https://img.shields.io/badge/Node.js-Express-green) ![Frontend](https://img.shields.io/badge/React-Vite-blue) ![Style](https://img.shields.io/badge/Tailwind-v4-cyan)

---

## ✨ Features

- 🔐 JWT-based authentication (single-user)
- 📦 Project management (create, delete, list)
- ⚙️ Simulated Docker control (start, stop, restart)
- 📜 Log viewer with auto-refresh
- 📊 Server monitoring (CPU, RAM, Disk)
- 🌐 Nginx config generator (simulated)
- 🎨 Modern dark UI with glassmorphism

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### 1. Clone & Setup Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on **http://localhost:3001**

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:5173**

### 3. Login

Open **http://localhost:5173** in your browser.

```
Username: admin
Password: admin123
```

---

## 📁 Project Structure

```
mectov_hosting/
├── backend/
│   ├── server.js              # Express entry point
│   ├── config/
│   │   └── auth.js            # JWT + credentials config
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification
│   ├── routes/
│   │   ├── authRoutes.js      # POST /api/login
│   │   ├── projectRoutes.js   # Project CRUD & control
│   │   └── serverRoutes.js    # Server stats
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── serverController.js
│   ├── services/
│   │   ├── projectService.js  # JSON file CRUD
│   │   ├── dockerService.js   # Mocked Docker ops
│   │   ├── logService.js      # Mocked log generation
│   │   └── serverService.js   # Mocked server stats
│   └── data/
│       └── projects.json      # Persistent storage
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── index.css           # Design system + Tailwind
    │   ├── api/
    │   │   └── api.js          # Axios API client
    │   ├── context/
    │   │   └── AuthContext.jsx # Auth state management
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProjectCard.jsx
    │   │   ├── ServerStatus.jsx
    │   │   ├── LogModal.jsx
    │   │   ├── NginxModal.jsx
    │   │   └── ProtectedRoute.jsx
    │   └── pages/
    │       ├── LoginPage.jsx
    │       ├── DashboardPage.jsx
    │       └── AddProjectPage.jsx
```

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/login` | ❌ | Login, returns JWT |
| GET | `/api/projects` | ✅ | List all projects |
| POST | `/api/projects` | ✅ | Create project |
| DELETE | `/api/projects/:id` | ✅ | Delete project |
| POST | `/api/projects/:id/start` | ✅ | Start project |
| POST | `/api/projects/:id/stop` | ✅ | Stop project |
| POST | `/api/projects/:id/restart` | ✅ | Restart project |
| GET | `/api/projects/:id/logs` | ✅ | Get project logs |
| GET | `/api/projects/:id/nginx-config` | ✅ | Get nginx config |
| GET | `/api/server/status` | ✅ | Server stats |

---

## 🔧 Replacing Mocks with Real Docker

All mock services are clearly marked with `// TODO: Replace with real implementation` comments.

### Docker Operations (`services/dockerService.js`)

Replace the simulated delays with real Docker commands:

```javascript
// Before (mocked):
await simulateDelay(delay);
projectService.updateStatus(id, 'running');

// After (real):
const { exec } = require('child_process');
exec(`docker start ${project.name}`, (err, stdout, stderr) => {
  if (err) throw new Error(stderr);
  projectService.updateStatus(id, 'running');
});
```

### Server Stats (`services/serverService.js`)

Replace with real system metrics:

```javascript
const os = require('os');

const getStatus = () => {
  const cpus = os.cpus();
  const cpu = os.loadavg()[0] / cpus.length * 100;
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const ram = ((totalMem - freeMem) / totalMem) * 100;

  // For disk usage:
  const { execSync } = require('child_process');
  const diskOutput = execSync("df -h / | awk 'NR==2 {print $5}'").toString().trim();
  const disk = parseFloat(diskOutput);

  return { cpu, ram, disk };
};
```

### Container Logs (`services/logService.js`)

Replace with real Docker logs:

```javascript
const { exec } = require('child_process');

const getLogs = (projectId) => {
  return new Promise((resolve, reject) => {
    exec(`docker logs --tail 100 ${containerName}`, (err, stdout) => {
      if (err) reject(err);
      resolve(stdout.split('\n').map(line => ({
        timestamp: new Date().toISOString(),
        level: 'INFO',
        message: line,
      })));
    });
  });
};
```

### Nginx Config

To apply real nginx configs:

```bash
# Save config to nginx
sudo cp config.conf /etc/nginx/sites-available/project-domain
sudo ln -s /etc/nginx/sites-available/project-domain /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

---

## 📄 License

MIT — Built with ❤️ by Mectov
