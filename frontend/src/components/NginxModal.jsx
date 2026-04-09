import { useState, useEffect } from 'react';
import { getNginxConfig } from '../api/api';

/**
 * NginxModal
 * Displays simulated Nginx reverse proxy config for a project
 */
const NginxModal = ({ projectId, projectName, onClose }) => {
  const [config, setConfig] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await getNginxConfig(projectId);
        setConfig(data.config);
      } catch (err) {
        console.error('Failed to fetch nginx config:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, [projectId]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleCopy = () => {
    navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div>
            <h3 className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              ⚙️ Nginx Config — {projectName}
            </h3>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
              Simulated reverse proxy configuration
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleCopy} className="btn btn-sm btn-primary">
              {copied ? '✅ Copied!' : '📋 Copy'}
            </button>
            <button onClick={onClose} className="btn btn-sm btn-ghost">✕</button>
          </div>
        </div>

        {/* Config Content */}
        <div className="flex-1 overflow-hidden p-4">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="spinner" />
              <span className="ml-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Generating config...
              </span>
            </div>
          ) : (
            <pre className="log-container" style={{
              whiteSpace: 'pre-wrap',
              color: 'var(--color-primary)',
              fontSize: '12px',
              lineHeight: '1.8',
            }}>
              {config}
            </pre>
          )}
        </div>

        {/* Footer note */}
        <div className="p-4" style={{ borderTop: '1px solid var(--color-border)' }}>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            ⚠️ This config is simulated. To use in production, save to{' '}
            <code style={{ color: 'var(--color-accent)' }}>/etc/nginx/sites-available/</code>{' '}
            and run <code style={{ color: 'var(--color-accent)' }}>nginx -t && systemctl reload nginx</code>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NginxModal;
