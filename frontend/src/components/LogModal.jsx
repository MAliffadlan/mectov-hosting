import { useState, useEffect, useRef } from 'react';
import { getProjectLogs } from '@/api/api';
import { Download, RefreshCw, X } from 'lucide-react';

const LogModal = ({ projectId, projectName, onClose }) => {
  const [logs, setLogs] = useState('');
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  const fetchLogs = async () => {
    try { setLoading(true); const { data } = await getProjectLogs(projectId); setLogs(data.logs); if (ref.current) setTimeout(() => { ref.current.scrollTop = ref.current.scrollHeight; }, 100); }
    catch { setLogs('Error: Failed to connect to container stdout.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchLogs(); }, [projectId]);

  const handleDownload = () => {
    const blob = new Blob([logs], { type: 'text/plain' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `${projectName}.log`; a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
      <div className="surface-elevated w-full max-w-4xl flex flex-col overflow-hidden shadow-2xl max-h-[85vh]">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1e1e1e]">
          <div>
            <h2 className="text-[13px] font-semibold text-white">Logs</h2>
            <p className="text-[11px] font-mono text-[#525252]">{projectName}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleDownload} className="btn-ghost text-[11px] py-1.5 px-3"><Download className="w-3 h-3" /> Save</button>
            <button onClick={fetchLogs} disabled={loading} className="btn-ghost text-[11px] py-1.5 px-3"><RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Refresh</button>
            <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#525252] hover:text-white hover:bg-[#1a1a1a] transition-all"><X className="w-4 h-4" /></button>
          </div>
        </div>
        <div ref={ref} className="flex-1 bg-[#0a0a0a] p-4 overflow-y-auto font-mono text-[12px] leading-[1.8] text-[#a1a1a1] whitespace-pre-wrap break-all min-h-[400px]">
          {loading && !logs ? <div className="flex items-center justify-center h-full"><div className="spinner"></div></div> : logs || <span className="text-[#333]">No output.</span>}
        </div>
      </div>
    </div>
  );
};

export default LogModal;
