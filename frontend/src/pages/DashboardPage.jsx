import { useState, useEffect, useCallback } from 'react';
import { getProjects, startProject, stopProject, restartProject, deleteProject } from '../api/api';
import ProjectCard from '../components/ProjectCard';
import ServerStatus from '../components/ServerStatus';
import LogModal from '../components/LogModal';
import NginxModal from '../components/NginxModal';

/**
 * DashboardPage
 * Main page showing all projects and server status
 */
const DashboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logModal, setLogModal] = useState(null); // { id, name }
  const [nginxModal, setNginxModal] = useState(null); // { id, name }

  const fetchProjects = useCallback(async () => {
    try {
      const { data } = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleStart = async (id) => {
    await startProject(id);
    await fetchProjects();
  };

  const handleStop = async (id) => {
    await stopProject(id);
    await fetchProjects();
  };

  const handleRestart = async (id) => {
    await restartProject(id);
    await fetchProjects();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    await deleteProject(id);
    await fetchProjects();
  };

  const handleViewLogs = (id) => {
    const project = projects.find((p) => p.id === id);
    setLogModal({ id, name: project?.name || 'Unknown' });
  };

  const handleViewNginx = (id) => {
    const project = projects.find((p) => p.id === id);
    setNginxModal({ id, name: project?.name || 'Unknown' });
  };

  const runningCount = projects.filter((p) => p.status === 'running').length;
  const stoppedCount = projects.filter((p) => p.status === 'stopped').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Server Status */}
      <div className="mb-8">
        <ServerStatus />
      </div>

      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            📦 Projects
          </h2>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {projects.length} total
            </span>
            <span className="text-xs" style={{ color: 'var(--color-success)' }}>
              ● {runningCount} running
            </span>
            <span className="text-xs" style={{ color: 'var(--color-danger)' }}>
              ○ {stoppedCount} stopped
            </span>
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => window.location.href = '/add'}
        >
          ➕ New Project
        </button>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="spinner" />
          <span className="ml-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Loading projects...
          </span>
        </div>
      ) : projects.length === 0 ? (
        <div className="glass-card p-12 text-center animate-fade-in">
          <div className="text-5xl mb-4">🚀</div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
            No projects yet
          </h3>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
            Create your first project to get started.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.href = '/add'}
          >
            ➕ Create Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onStart={handleStart}
              onStop={handleStop}
              onRestart={handleRestart}
              onDelete={handleDelete}
              onViewLogs={handleViewLogs}
              onViewNginx={handleViewNginx}
            />
          ))}
        </div>
      )}

      {/* Log Modal */}
      {logModal && (
        <LogModal
          projectId={logModal.id}
          projectName={logModal.name}
          onClose={() => setLogModal(null)}
        />
      )}

      {/* Nginx Modal */}
      {nginxModal && (
        <NginxModal
          projectId={nginxModal.id}
          projectName={nginxModal.name}
          onClose={() => setNginxModal(null)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
