import { useState, useEffect, useCallback } from 'react';
import { getProjects, startProject, stopProject, restartProject, deleteProject } from '@/api/api';
import ProjectCard from '@/components/ProjectCard';
import ServerStatus from '@/components/ServerStatus';
import LogModal from '@/components/LogModal';
import NginxModal from '@/components/NginxModal';
import { toast } from "sonner";
import { Plus, Rocket } from 'lucide-react';

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

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const handleStart = async (id) => { try { await startProject(id); toast.success('Started'); await fetchProjects(); } catch { toast.error('Failed'); } };
  const handleStop = async (id) => { try { await stopProject(id); toast.success('Stopped'); await fetchProjects(); } catch { toast.error('Failed'); } };
  const handleRestart = async (id) => { try { await restartProject(id); toast.success('Restarted'); await fetchProjects(); } catch { toast.error('Failed'); } };
  const handleDelete = async (id) => { try { await deleteProject(id); toast.success('Deleted'); await fetchProjects(); } catch { toast.error('Failed'); } };
  const handleViewLogs = (id) => { const p = projects.find((x) => x.id === id); setLogModal({ id, name: p?.name || 'Unknown' }); };
  const handleViewNginx = (id) => { const p = projects.find((x) => x.id === id); setNginxModal({ id, name: p?.name || 'Unknown' }); };

  return (
    <div className="w-full max-w-[1200px] pb-12">

      {/* Metrics */}
      <ServerStatus />

      {/* Section header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-[16px] font-semibold text-white">Deployments</h2>
          <p className="text-[12px] text-[#525252] mt-0.5">{projects.length} application{projects.length !== 1 ? 's' : ''} deployed</p>
        </div>
        <button onClick={() => window.location.href = '/add'} className="btn-primary">
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} /> New Deploy
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1,2,3].map(i => (
            <div key={i} className="surface p-5 animate-pulse">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-[#1e1e1e]"></div>
                <div>
                  <div className="w-24 h-4 bg-[#1e1e1e] rounded mb-1.5"></div>
                  <div className="w-16 h-3 bg-[#1e1e1e] rounded"></div>
                </div>
              </div>
              <div className="w-full h-3 bg-[#1e1e1e] rounded mb-2"></div>
              <div className="w-2/3 h-3 bg-[#1e1e1e] rounded"></div>
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="surface border-dashed flex flex-col items-center justify-center py-20">
          <div className="w-14 h-14 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center mb-5">
            <Rocket className="w-6 h-6 text-[#525252]" />
          </div>
          <h3 className="text-[14px] font-semibold text-white mb-1">No deployments yet</h3>
          <p className="text-[12px] text-[#525252] mb-6 text-center max-w-xs">Create your first deployment to start serving your application to the world.</p>
          <button onClick={() => window.location.href = '/add'} className="btn-primary">
            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} /> Create Deployment
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map(p => (
            <ProjectCard key={p.id} project={p} onStart={handleStart} onStop={handleStop} onRestart={handleRestart} onDelete={handleDelete} onViewLogs={handleViewLogs} onViewNginx={handleViewNginx} />
          ))}
        </div>
      )}

      {logModal && <LogModal projectId={logModal.id} projectName={logModal.name} onClose={() => setLogModal(null)} />}
      {nginxModal && <NginxModal projectId={nginxModal.id} projectName={nginxModal.name} onClose={() => setNginxModal(null)} />}
    </div>
  );
};

export default DashboardPage;
