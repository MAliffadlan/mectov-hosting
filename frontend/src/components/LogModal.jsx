import { useState, useEffect, useRef } from 'react';
import { getProjectLogs } from '@/api/api';
import { Download, RefreshCw, X } from 'lucide-react';

const LogModal = ({ projectId, projectName, onClose }) => {
  const [logs, setLogs] = useState('');
  const [loading, setLoading] = useState(true);
  const logContainerRef = useRef(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const { data } = await getProjectLogs(projectId);
      setLogs(data.logs);
      
      if (logContainerRef.current) {
        setTimeout(() => {
          logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }, 100);
      }
    } catch (err) {
      setLogs('Failed to resolve log stream. Process terminated.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [projectId]);

  const handleDownload = () => {
    const blob = new Blob([logs], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName}.log`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#f5f5f0]/80 backdrop-blur-[2px] animate-in fade-in duration-200">
      <div className="neo-panel w-full max-w-4xl max-h-full flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#E5E3D8] bg-[#FAFAFA]">
          <div>
            <h2 className="text-[13px] font-semibold text-[#171717]">Container Standard Output</h2>
            <p className="text-[11px] font-mono text-[#737373] mt-0.5">{projectName} // stdout</p>
          </div>
          
          <div className="flex items-center gap-1.5">
            <button 
              onClick={handleDownload}
              className="px-2.5 py-1.5 text-[11px] font-medium text-[#525252] border border-[#d4d4d4] rounded bg-white hover:bg-[#f5f5f0] transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3 h-3" /> Save
            </button>
            <button 
              onClick={fetchLogs}
              disabled={loading}
              className="px-2.5 py-1.5 text-[11px] font-medium text-[#525252] border border-[#d4d4d4] rounded bg-white hover:bg-[#f5f5f0] transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <div className="w-px h-4 bg-[#d4d4d4] mx-1"></div>
            <button 
              onClick={onClose}
              className="p-1.5 text-[#a3a3a3] hover:text-[#dc2626] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-[450px] bg-[#0A0A0A]">
          {loading && !logs ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="spinner text-white mb-4"></div>
              <p className="text-[11px] font-mono text-[#737373] uppercase tracking-widest">Attaching to tty...</p>
            </div>
          ) : (
            <div className="flex-1 relative overflow-hidden flex flex-col">
              <div 
                ref={logContainerRef}
                className="flex-1 p-4 overflow-y-auto font-mono text-[12px] leading-relaxed text-[#d4d4d4] whitespace-pre-wrap break-all"
              >
                {logs || <span className="text-[#525252] italic">// log stream empty</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogModal;
