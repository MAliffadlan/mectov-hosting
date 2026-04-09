import { useState } from 'react';

/**
 * ProjectCard
 * Displays project info with control buttons for start/stop/restart
 */
const ProjectCard = ({ project, onStart, onStop, onRestart, onDelete, onViewLogs, onViewNginx }) => {
  const [loading, setLoading] = useState(null); // 'start' | 'stop' | 'restart' | 'delete' | null
  const isRunning = project.status === 'running';

  const handleAction = async (action, callback) => {
    setLoading(action);
    try {
      await callback();
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: '0.05s' }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={isRunning ? 'status-running' : 'status-stopped'} />
          <div>
            <h3 className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {project.name}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
              Created {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <span className="text-xs px-2.5 py-1 rounded-full font-medium"
          style={{
            background: isRunning ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            color: isRunning ? 'var(--color-success)' : 'var(--color-danger)',
            border: `1px solid ${isRunning ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          }}>
          {isRunning ? '● Running' : '○ Stopped'}
        </span>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-lg p-3" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
          <span className="text-xs block" style={{ color: 'var(--color-text-muted)' }}>🌐 Domain</span>
          <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
            {project.domain}
          </span>
        </div>
        <div className="rounded-lg p-3" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
          <span className="text-xs block" style={{ color: 'var(--color-text-muted)' }}>🔌 Port</span>
          <span className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
            :{project.port}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-wrap">
        {!isRunning ? (
          <button
            className="btn btn-sm btn-success"
            disabled={loading !== null}
            onClick={() => handleAction('start', () => onStart(project.id))}
          >
            {loading === 'start' ? <span className="spinner" /> : '▶'} Start
          </button>
        ) : (
          <button
            className="btn btn-sm btn-danger"
            disabled={loading !== null}
            onClick={() => handleAction('stop', () => onStop(project.id))}
          >
            {loading === 'stop' ? <span className="spinner" /> : '⏹'} Stop
          </button>
        )}

        <button
          className="btn btn-sm btn-warning"
          disabled={loading !== null}
          onClick={() => handleAction('restart', () => onRestart(project.id))}
        >
          {loading === 'restart' ? <span className="spinner" /> : '🔄'} Restart
        </button>

        <button
          className="btn btn-sm btn-ghost"
          onClick={() => onViewLogs(project.id)}
          disabled={loading !== null}
        >
          📜 Logs
        </button>

        <button
          className="btn btn-sm btn-ghost"
          onClick={() => onViewNginx(project.id)}
          disabled={loading !== null}
        >
          ⚙️ Nginx
        </button>

        <div className="flex-1" />

        <button
          className="btn btn-sm"
          disabled={loading !== null}
          onClick={() => handleAction('delete', () => onDelete(project.id))}
          style={{
            background: 'transparent',
            color: 'var(--color-text-muted)',
            border: '1px solid transparent',
          }}
          onMouseOver={(e) => {
            e.target.style.color = 'var(--color-danger)';
          }}
          onMouseOut={(e) => {
            e.target.style.color = 'var(--color-text-muted)';
          }}
        >
          {loading === 'delete' ? <span className="spinner" /> : '🗑️'}
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
