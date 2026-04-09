import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, startProject, stopProject, restartProject, deleteProject } from '@/api/api';
import ProjectCard from '@/components/ProjectCard';
import ServerStatus from '@/components/ServerStatus';
import LogModal from '@/components/LogModal';
import NginxModal from '@/components/NginxModal';
import { Package, Plus, Rocket } from 'lucide-react';
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logModal, setLogModal] = useState(null);
  const [nginxModal, setNginxModal] = useState(null);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Server Status */}
      <ServerStatus />

      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight flex items-center">
            <Package className="mr-2 h-6 w-6" />
            Projects
          </h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{projects.length} total</span>
            <span className="flex items-center text-green-500">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5" />
              {runningCount} running
            </span>
            <span className="flex items-center text-destructive">
              <span className="h-1.5 w-1.5 rounded-full border border-destructive mr-1.5" />
              {stoppedCount} stopped
            </span>
          </div>
        </div>

        <Button onClick={() => window.location.href = '/add'}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-32 border rounded-xl border-dashed">
          <span className="spinner mr-3" />
          <span className="text-sm text-muted-foreground">Loading projects...</span>
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 border rounded-xl border-dashed bg-muted/20">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Rocket className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-1">No projects yet</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Create your first project to get started.
          </p>
          <Button onClick={() => window.location.href = '/add'}>
            <Plus className="mr-2 h-4 w-4" />
            Create Project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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

      {/* Modals */}
      {logModal && (
        <LogModal
          projectId={logModal.id}
          projectName={logModal.name}
          onClose={() => setLogModal(null)}
        />
      )}

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
