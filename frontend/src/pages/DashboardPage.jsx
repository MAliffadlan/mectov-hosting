import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, startProject, stopProject, restartProject, deleteProject } from '@/api/api';
import ProjectCard from '@/components/ProjectCard';
import ServerStatus from '@/components/ServerStatus';
import LogModal from '@/components/LogModal';
import NginxModal from '@/components/NginxModal';
import { Package, Plus, Rocket } from 'lucide-react';
import { toast } from "sonner";

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
    try {
      await startProject(id);
      toast.success('Project started successfully');
      await fetchProjects();
    } catch (err) {
      toast.error('Failed to start project');
    }
  };

  const handleStop = async (id) => {
    try {
      await stopProject(id);
      toast.success('Project stopped');
      await fetchProjects();
    } catch (err) {
      toast.error('Failed to stop project');
    }
  };

  const handleRestart = async (id) => {
    try {
      await restartProject(id);
      toast.success('Project restarted');
      await fetchProjects();
    } catch (err) {
      toast.error('Failed to restart project');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      toast.success('Project deleted');
      await fetchProjects();
    } catch (err) {
      toast.error('Failed to delete project');
    }
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
    <div className="space-y-8 w-full pb-8">
      
      {/* Server Status */}
      <ServerStatus />

      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-gray-800 flex items-center">
            <Package className="mr-3 h-7 w-7 text-green-700" />
            Projects
          </h2>
          <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
            <span>{projects.length} total</span>
            <span className="flex items-center text-green-600">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              {runningCount} running
            </span>
            <span className="flex items-center text-gray-400">
              <span className="h-2 w-2 rounded-full border-2 border-gray-400 mr-2" />
              {stoppedCount} stopped
            </span>
          </div>
        </div>

        <button 
          onClick={() => window.location.href = '/add'}
          className="pill-button inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold bg-white text-gray-800 shadow-sm border border-gray-200/60 hover:bg-gray-50 hover:border-gray-300"
        >
          <Plus className="mr-2 h-4 w-4 text-green-600" />
          New Project
        </button>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-panel p-6 flex flex-col gap-4 animate-pulse">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="h-6 w-32 bg-gray-200 rounded-lg"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
                </div>
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-24 w-full bg-gray-100 rounded-xl mt-2"></div>
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 glass-panel border border-dashed border-gray-300/50">
          <div className="h-16 w-16 rounded-full bg-green-100/50 flex items-center justify-center mb-5">
            <Rocket className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">No projects yet</h3>
          <p className="text-sm font-medium text-gray-500 mb-8 max-w-sm text-center">
            Deploy your first application and let Mectov handle the rest.
          </p>
          <button 
            onClick={() => window.location.href = '/add'}
            className="pill-button inline-flex items-center justify-center px-6 py-3 text-sm font-bold bg-green-600 text-white shadow-lg shadow-green-600/20 hover:bg-green-700"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create Project
          </button>
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
