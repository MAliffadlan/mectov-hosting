import { useState } from 'react';
import { Play, Square, RotateCw, Trash2, Box, Globe, Activity, TerminalSquare, Settings } from 'lucide-react';

const ProjectCard = ({ project, onStart, onStop, onRestart, onDelete, onViewLogs, onViewNginx }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isRunning = project.status === 'running';

  return (
    <>
      <div className="glass-panel p-6 flex flex-col group transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg text-gray-800 tracking-tight">{project.name}</h3>
            <div className="flex items-center text-xs font-medium text-gray-500 mt-1">
              <Activity className="w-3 h-3 mr-1" />
              Created {new Date(project.created_at).toLocaleDateString()}
            </div>
          </div>
          
          <div className={`px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${
            isRunning 
            ? 'bg-green-100 text-green-700' 
            : 'bg-gray-100 text-gray-500'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isRunning ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-gray-400 border border-gray-500'}`}></span>
            {isRunning ? 'Running' : 'Stopped'}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 my-4 text-sm">
          <div>
            <div className="flex items-center text-gray-500 text-xs font-semibold mb-1">
              <Globe className="w-3.5 h-3.5 mr-1" /> Domain
            </div>
            <div className="font-medium text-gray-800 break-all">{project.domain || '-'}</div>
          </div>
          
          <div className="pl-4 border-l border-gray-200/60">
            <div className="flex items-center text-gray-500 text-xs font-semibold mb-1">
              <Box className="w-3.5 h-3.5 mr-1" /> Port
            </div>
            <div className="font-mono text-gray-800 bg-gray-100/50 px-1.5 rounded inline-block">:{project.port}</div>
          </div>
        </div>

        <div className="flex-grow"></div>
        <hr className="border-gray-200/60 my-4" />

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {!isRunning ? (
              <button 
                onClick={() => onStart(project.id)}
                className="pill-button px-3.5 py-1.5 text-xs font-semibold bg-gray-800 text-white hover:bg-black inline-flex items-center"
              >
                <Play className="w-3.5 h-3.5 mr-1.5" /> Start
              </button>
            ) : (
              <button 
                onClick={() => onStop(project.id)}
                className="pill-button px-3.5 py-1.5 text-xs font-semibold bg-white border border-gray-200 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 inline-flex items-center"
              >
                <Square className="w-3.5 h-3.5 mr-1.5" /> Stop
              </button>
            )}

            <button 
              onClick={() => onRestart(project.id)}
              disabled={!isRunning}
              className={`pill-button px-3.5 py-1.5 text-xs font-semibold border inline-flex items-center ${
                isRunning 
                ? 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50' 
                : 'bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed opacity-50'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5 mr-1.5" /> Restart
            </button>
          </div>
          
          <div className="flex space-x-1">
            <button 
              onClick={() => onViewLogs(project.id)}
              className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors tooltip-trigger"
              title="View Logs"
            >
              <TerminalSquare className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onViewNginx(project.id)}
              className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
              title="Nginx Config"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              title="Delete Project"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Custom Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Project</h2>
              <p className="text-gray-500 text-sm">
                Are you sure you want to delete <strong>{project.name}</strong>? This action cannot be undone. All containers, files, and configurations will be permanently removed.
              </p>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 rounded-b-2xl border-t border-gray-100">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="pill-button px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  onDelete(project.id);
                  setShowDeleteModal(false);
                }}
                className="pill-button px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-600/20"
              >
                Yes, delete project
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
