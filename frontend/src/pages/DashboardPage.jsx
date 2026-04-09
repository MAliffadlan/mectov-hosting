import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, startProject, stopProject, restartProject, deleteProject } from '@/api/api';
import ProjectCard from '@/components/ProjectCard';
import ServerStatus from '@/components/ServerStatus';
import LogModal from '@/components/LogModal';
import NginxModal from '@/components/NginxModal';
import { Package, Plus, Rocket } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
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
    // Note: Delete confirmation is now handled inside ProjectCard using AlertDialog
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
    <div className="space-y-6 w-full pb-4">
      
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-5 w-16" />
                </div>
              </CardHeader>
              <CardContent className="pb-4 flex-1">
                <Skeleton className="h-16 w-full rounded-lg" />
              </CardContent>
            </Card>
          ))}
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
