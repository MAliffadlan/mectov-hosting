import { useState, useEffect, useRef } from 'react';
import { getProjectLogs } from '@/api/api';
import { Terminal, RefreshCcw } from 'lucide-react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const LogModal = ({ projectId, projectName, onClose }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const logEndRef = useRef(null);

  const fetchLogs = async () => {
    try {
      const { data } = await getProjectLogs(projectId);
      setLogs(data.logs);
    } catch (err) {
      console.error('Failed to fetch logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    let interval;
    if (autoRefresh) {
      interval = setInterval(fetchLogs, 3000);
    }
    return () => clearInterval(interval);
  }, [projectId, autoRefresh]);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const getLevelClass = (level) => {
    switch (level) {
      case 'INFO': return 'level-info';
      case 'WARN': return 'level-warn';
      case 'DEBUG': return 'level-debug';
      case 'ERROR': return 'level-error';
      default: return 'level-info';
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl flex flex-col max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Terminal className="mr-2 h-5 w-5" />
            Logs — {projectName}
          </DialogTitle>
          <DialogDescription>
            {logs.length} entries. Real-time container output.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col bg-muted/30 border rounded-md">
          {loading ? (
            <div className="flex-1 flex items-center justify-center p-10">
              <span className="spinner mr-3" />
              <span className="text-sm text-muted-foreground">Loading logs...</span>
            </div>
          ) : logs.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-10">
              <span className="text-sm text-muted-foreground">No logs available. Start the project.</span>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 log-container !border-0 !rounded-none min-h-[300px]">
              {logs.map((log, i) => (
                <div key={i} className="log-line">
                  <span className="time">
                    [{new Date(log.timestamp).toLocaleTimeString()}]
                  </span>{' '}
                  <span className={getLevelClass(log.level)}>
                    [{log.level.padEnd(5)}]
                  </span>{' '}
                  <span className="text-muted-foreground">
                    {log.message}
                  </span>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-between items-center mt-2">
          <label className="flex items-center text-sm font-medium cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 rounded border-primary text-primary focus:ring-primary"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            <RefreshCcw className="h-3 w-3 mr-1.5" />
            Auto-refresh
          </label>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogModal;
