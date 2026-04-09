import { useState, useEffect } from 'react';
import { getServerStatus } from '../api/api';

/**
 * ServerStatus
 * Displays real-time (mocked) server CPU, RAM, and Disk usage
 */
const ServerStatus = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      const { data } = await getServerStatus();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch server status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // Refresh every 5 seconds
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const getBarColor = (value) => {
    if (value < 40) return 'linear-gradient(90deg, #10b981 0%, #34d399 100%)';
    if (value < 70) return 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)';
    return 'linear-gradient(90deg, #ef4444 0%, #f87171 100%)';
  };

  const StatItem = ({ label, value, icon }) => (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
          {icon} {label}
        </span>
        <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          {value}%
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${value}%`, background: getBarColor(value) }}
        />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="glass-card p-5">
        <div className="flex items-center gap-2">
          <div className="spinner" />
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Loading server stats...
          </span>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          🖥️ Server Status
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            {stats.hostname}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: 'rgba(16, 185, 129, 0.15)',
              color: 'var(--color-success)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
            }}>
            ● Online
          </span>
        </div>
      </div>

      <div className="flex gap-6">
        <StatItem label="CPU" value={stats.cpu} icon="⚡" />
        <StatItem label="RAM" value={stats.ram} icon="🧠" />
        <StatItem label="Disk" value={stats.disk} icon="💾" />
      </div>

      <div className="mt-3 flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
        <span>⏱ Uptime: {stats.uptime}</span>
        <span>📦 Node {stats.nodeVersion}</span>
      </div>
    </div>
  );
};

export default ServerStatus;
