import { useState, useEffect, useRef } from 'react';
import { getProjectLogs } from '@/api/api';
import { Terminal, X, RefreshCw, Download } from 'lucide-react';

const LogModal = ({ projectId, projectName, onClose }) => {
  const [logs, setLogs] = useState('');
  const [loading, setLoading] = useState(true);
  const logContainerRef = useRef(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const { data } = await getProjectLogs(projectId);
      setLogs(data.logs);
      
      // Auto-scroll to bottom
      if (logContainerRef.current) {
        setTimeout(() => {
          logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }, 100);
      }
    } catch (err) {
      setLogs('Failed to fetch logs. The container might be stopped or does not exist.');
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
    a.download = `${projectName}-logs.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-full flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center mr-3 shadow-inner">
              <Terminal className="w-5 h-5 text-gray-100" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Container Logs</h2>
              <p className="text-xs font-mono text-gray-500 mt-0.5">{projectName}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handleDownload}
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-white rounded-full transition-colors shadow-sm border border-transparent hover:border-gray-200"
              title="Download Logs"
            >
              <Download className="w-4 h-4" />
            </button>
            <button 
              onClick={fetchLogs}
              disabled={loading}
              className={`p-2 text-gray-500 hover:text-green-600 hover:bg-white rounded-full transition-colors shadow-sm border border-transparent hover:border-gray-200 ${loading ? 'opacity-50' : ''}`}
              title="Refresh Logs"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <div className="w-px h-6 bg-gray-200 mx-1"></div>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 bg-white overflow-hidden flex flex-col min-h-[400px]">
          {loading && !logs ? (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-900 rounded-xl">
              <div className="spinner text-white mb-4"></div>
              <p className="text-sm font-mono text-gray-400">Connecting to log stream...</p>
            </div>
          ) : (
            <div className="flex-1 relative bg-gray-900 rounded-xl shadow-inner border border-gray-800 overflow-hidden">
              {/* Terminal Header Bar */}
              <div className="h-8 bg-gray-950 flex items-center px-4 border-b border-gray-800 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="text-[10px] text-gray-500 font-mono ml-2 uppercase tracking-wider -mt-0.5">Bash</span>
              </div>
              
              <div 
                ref={logContainerRef}
                className="h-[calc(100%-2rem)] p-4 overflow-y-auto font-mono text-xs leading-relaxed text-gray-300 whitespace-pre-wrap break-all scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
              >
                {logs || <span className="text-gray-600 italic">No logs available for this container.</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogModal;
