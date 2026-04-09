import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, startProject, stopProject, restartProject, deleteProject } from '@/api/api';
import ProjectCard from '@/components/ProjectCard';
import ServerStatus from '@/components/ServerStatus';
import LogModal from '@/components/LogModal';
import NginxModal from '@/components/NginxModal';
import { toast } from "sonner";
import { Plus } from 'lucide-react';

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

  return (
    <div className="w-full max-w-[1200px] mx-auto pb-12">
      
      {/* Server Status Header Component */}
      <ServerStatus />

      {/* Dashboard Section Title */}
      <div className="flex justify-between items-end mb-6 border-b border-[#E5E3D8] pb-4">
        <div>
          <h2 className="text-[18px] font-semibold text-[#171717] tracking-tight">Deployments</h2>
          <p className="text-[13px] text-[#737373] mt-1">Manage and monitor your application instances.</p>
        </div>
        <button 
          onClick={() => window.location.href = '/add'}
          className="neo-btn-primary px-4 py-2 text-[12px] flex items-center gap-2"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
          Create Deployment
        </button>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="neo-panel p-5 animate-pulse">
              <div className="h-4 w-2/3 bg-[#F5F5F0] rounded mb-2"></div>
              <div className="h-3 w-1/4 bg-[#F5F5F0] rounded mb-6"></div>
              <div className="space-y-3 mb-8">
                <div className="h-2.5 w-full bg-[#fcfcfc] rounded"></div>
                <div className="h-2.5 w-4/5 bg-[#fcfcfc] rounded"></div>
              </div>
              <div className="h-8 w-full bg-[#F5F5F0] rounded-md"></div>
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="w-full border border-dashed border-[#d1d0c9] rounded-xl py-24 flex flex-col items-center justify-center bg-[#fafafa]">
          <h3 className="text-[14px] font-semibold text-[#171717] mb-1">No deployments found</h3>
          <p className="text-[13px] text-[#737373] mb-6">Get started by creating a new web application deployment.</p>
          <button 
            onClick={() => window.location.href = '/add'}
            className="neo-btn-secondary px-4 py-2 text-[12px]"
          >
            Create Deployment
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
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
