import { useState } from 'react';
import { Play, Square, RotateCw, Trash2, TerminalSquare, Settings, ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ project, onStart, onStop, onRestart, onDelete, onViewLogs, onViewNginx }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isRunning = project.status === 'running';

  return (
    <>
      <div className="neo-panel p-5 flex flex-col group transition-transform duration-200 hover:-translate-y-[2px]">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-[15px] text-[#171717] tracking-tight hover:underline cursor-pointer flex items-center gap-1 group/title">
              {project.name}
              <ArrowUpRight className="w-3 h-3 text-[#a3a3a3] opacity-0 -translate-y-1 group-hover/title:opacity-100 group-hover/title:translate-y-0 transition-all" />
            </h3>
            <div className="text-[11px] font-medium text-[#a3a3a3] mt-0.5 uppercase tracking-widest">
              ID: {project.id.split('-')[0]}
            </div>
          </div>
          
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-[#10b981]' : 'bg-[#d4d4d4]'}`}></span>
            <span className="text-[11px] font-semibold text-[#737373] uppercase tracking-wider">{isRunning ? 'Running' : 'Stopped'}</span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between py-1 border-b border-[#f5f5f0] border-dashed">
            <span className="text-[12px] text-[#737373]">Domain</span>
            <span className="text-[12px] font-medium text-[#171717]">{project.domain || '-'}</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-[12px] text-[#737373]">Internal Port</span>
            <span className="text-[12px] font-mono font-medium text-[#171717] bg-[#f5f5f0] px-1.5 py-0.5 rounded">:{project.port}</span>
          </div>
        </div>

        <div className="flex-grow"></div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E5E3D8]">
          <div className="flex space-x-2">
            {!isRunning ? (
              <button 
                onClick={() => onStart(project.id)}
                className="neo-btn-primary px-3 py-1.5 text-[11px] uppercase tracking-wider inline-flex items-center"
              >
                Start
              </button>
            ) : (
              <button 
                onClick={() => onStop(project.id)}
                className="neo-btn-secondary px-3 py-1.5 text-[11px] uppercase tracking-wider inline-flex items-center text-[#dc2626] hover:bg-[#fff1f2] hover:border-[#fecdd3]"
              >
                Stop
              </button>
            )}

            <button 
              onClick={() => onRestart(project.id)}
              disabled={!isRunning}
              className={`neo-btn-secondary px-3 py-1.5 text-[11px] uppercase tracking-wider inline-flex items-center ${
                !isRunning ? 'opacity-40 cursor-not-allowed hidden' : ''
              }`}
            >
              Restart
            </button>
          </div>
          
          <div className="flex space-x-1">
            <button 
              onClick={() => onViewLogs(project.id)}
              className="p-1.5 text-[#a3a3a3] hover:text-[#171717] transition-colors"
              title="Logs"
            >
              <TerminalSquare className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => onViewNginx(project.id)}
              className="p-1.5 text-[#a3a3a3] hover:text-[#171717] transition-colors"
              title="Config"
            >
              <Settings className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="p-1.5 text-[#a3a3a3] hover:text-[#dc2626] transition-colors"
              title="Destroy"
            >
              <Trash2 className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Extreme Minimal Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="neo-panel w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <h2 className="text-[16px] font-semibold text-[#171717] mb-2">Destroy {project.name}?</h2>
              <p className="text-[13px] text-[#737373] leading-relaxed mb-6">
                This will permanently delete the application container, source files, and reverse proxy routes. This action cannot be undone.
              </p>
              
              <div className="flex gap-2 w-full">
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="neo-btn-secondary flex-1 py-2 text-[12px]"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    onDelete(project.id);
                    setShowDeleteModal(false);
                  }}
                  className="neo-btn-primary flex-1 py-2 text-[12px] bg-[#dc2626] border-[#dc2626] hover:bg-[#b91c1c] hover:border-[#b91c1c]"
                >
                  Destroy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
