import { useState, useEffect, useRef } from 'react';
import { getProjectLogs } from '../api/api';

/**
 * LogModal
 * Displays scrollable project logs with auto-refresh
 */
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

  // Auto-scroll to bottom
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div>
            <h3 className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              📜 Logs — {projectName}
            </h3>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
              {logs.length} entries
            </p>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-xs"
              style={{ color: 'var(--color-text-muted)' }}>
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="accent-cyan-400"
              />
              Auto-refresh
            </label>
            <button onClick={onClose} className="btn btn-sm btn-ghost">✕</button>
          </div>
        </div>

        {/* Log Content */}
        <div className="flex-1 overflow-hidden p-4">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="spinner" />
              <span className="ml-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Loading logs...
              </span>
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                No logs available. Start the project to generate logs.
              </p>
            </div>
          ) : (
            <div className="log-container">
              {logs.map((log, i) => (
                <div key={i} className="log-line">
                  <span className="time">
                    [{new Date(log.timestamp).toLocaleTimeString()}]
                  </span>{' '}
                  <span className={getLevelClass(log.level)}>
                    [{log.level.padEnd(5)}]
                  </span>{' '}
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    {log.message}
                  </span>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogModal;
