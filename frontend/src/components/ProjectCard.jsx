import { useState } from 'react';
import { Play, Square, RotateCw, Trash2, TerminalSquare, Settings2, Globe, Layers } from 'lucide-react';

const ProjectCard = ({ project, onStart, onStop, onRestart, onDelete, onViewLogs, onViewNginx }) => {
  const [showDelete, setShowDelete] = useState(false);
  const isRunning = project.status === 'running';

  return (
    <>
      <div className="surface-elevated p-0 overflow-hidden group">
        {/* Color accent top bar */}
        <div className={`h-[3px] w-full ${isRunning ? 'gradient-green' : 'bg-[#262626]'}`} />

        <div className="p-5">
          {/* Header */}
          <div className="flex justify-between items-start mb-5">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                isRunning 
                  ? 'bg-gradient-to-br from-[#22c55e]/20 to-[#16a34a]/10 border border-[#22c55e]/20' 
                  : 'bg-[#1a1a1a] border border-[#262626]'
              }`}>
                <Layers className={`w-4 h-4 ${isRunning ? 'text-[#4ade80]' : 'text-[#525252]'}`} strokeWidth={1.5}/>
              </div>
              <div>
                <h3 className="text-[14px] font-semibold text-white tracking-tight">{project.name}</h3>
                <span className="text-[11px] text-[#525252] font-mono">{project.id.slice(0,8)}</span>
              </div>
            </div>
            
            <div className={`badge ${isRunning ? 'badge-success' : 'badge-stopped'}`}>
              {isRunning && <span className="glow-dot"></span>}
              {isRunning ? 'Running' : 'Stopped'}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-3 mb-5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[12px] text-[#525252]">
                <Globe className="w-3.5 h-3.5" /> Domain
              </span>
              <span className="text-[12px] font-medium text-[#a1a1a1]">{project.domain || '—'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[12px] text-[#525252]">
                <Layers className="w-3.5 h-3.5" /> Port
              </span>
              <span className="text-[12px] font-mono text-[#a1a1a1] bg-[#1a1a1a] px-2 py-0.5 rounded border border-[#262626]">:{project.port}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-[#1e1e1e]">
            <div className="flex gap-2">
              {!isRunning ? (
                <button onClick={() => onStart(project.id)} className="btn-primary text-[11px] py-1.5 px-3">
                  <Play className="w-3 h-3" /> Start
                </button>
              ) : (
                <button onClick={() => onStop(project.id)} className="btn-danger text-[11px] py-1.5 px-3">
                  <Square className="w-3 h-3" /> Stop
                </button>
              )}
              {isRunning && (
                <button onClick={() => onRestart(project.id)} className="btn-ghost text-[11px] py-1.5 px-3">
                  <RotateCw className="w-3 h-3" /> Restart
                </button>
              )}
            </div>

            <div className="flex gap-1">
              <button onClick={() => onViewLogs(project.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#525252] hover:text-white hover:bg-[#1a1a1a] transition-all" title="Logs">
                <TerminalSquare className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <button onClick={() => onViewNginx(project.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#525252] hover:text-white hover:bg-[#1a1a1a] transition-all" title="Config">
                <Settings2 className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <button onClick={() => setShowDelete(true)} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#525252] hover:text-[#ff6369] hover:bg-[#1a1111] transition-all" title="Delete">
                <Trash2 className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirmation */}
      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="surface-elevated w-full max-w-sm p-6">
            <div className="w-10 h-10 rounded-full bg-[#1f1315] border border-[#462123] flex items-center justify-center mb-4">
              <Trash2 className="w-5 h-5 text-[#ff6369]" />
            </div>
            <h2 className="text-[16px] font-semibold text-white mb-2">Delete {project.name}?</h2>
            <p className="text-[13px] text-[#737373] leading-relaxed mb-6">
              This will permanently remove the container, source code, and all proxy configurations.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDelete(false)} className="btn-ghost flex-1 justify-center">
                Cancel
              </button>
              <button 
                onClick={() => { onDelete(project.id); setShowDelete(false); }}
                className="btn-danger flex-1 justify-center"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
