import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../api/api';

/**
 * AddProjectPage
 * Form to create a new project
 */
const AddProjectPage = () => {
  const [name, setName] = useState('');
  const [port, setPort] = useState('');
  const [domain, setDomain] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate port
    const portNum = parseInt(port, 10);
    if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
      setError('Port must be a number between 1 and 65535.');
      return;
    }

    setLoading(true);
    try {
      await createProject({ name, port: portNum, domain });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create project.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="btn btn-ghost btn-sm mb-4"
        >
          ← Back to Dashboard
        </button>
        <h2 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
          ➕ New Project
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
          Deploy a new application to your server
        </p>
      </div>

      <div className="glass-card p-8 animate-fade-in">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-6 p-4 rounded-lg text-sm" style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: 'var(--color-danger)',
            }}>
              {error}
            </div>
          )}

          {/* Project Name */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Project Name
            </label>
            <input
              id="project-name"
              type="text"
              className="input"
              placeholder="e.g., my-portfolio"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              required
            />
            <p className="text-xs mt-1.5" style={{ color: 'var(--color-text-muted)' }}>
              A friendly name for your project
            </p>
          </div>

          {/* Port */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Port
            </label>
            <input
              id="project-port"
              type="number"
              className="input"
              placeholder="e.g., 3000"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              min="1"
              max="65535"
              required
            />
            <p className="text-xs mt-1.5" style={{ color: 'var(--color-text-muted)' }}>
              The port your application runs on (1-65535)
            </p>
          </div>

          {/* Domain */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Domain
            </label>
            <input
              id="project-domain"
              type="text"
              className="input"
              placeholder="e.g., app.example.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              required
            />
            <p className="text-xs mt-1.5" style={{ color: 'var(--color-text-muted)' }}>
              The domain name to route traffic to this project
            </p>
          </div>

          {/* Preview */}
          {name && port && domain && (
            <div className="mb-6 p-4 rounded-xl animate-fade-in" style={{
              background: 'rgba(6, 182, 212, 0.05)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
            }}>
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-primary)' }}>
                📋 Preview
              </p>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="text-xs block" style={{ color: 'var(--color-text-muted)' }}>Name</span>
                  <span style={{ color: 'var(--color-text-primary)' }}>{name}</span>
                </div>
                <div>
                  <span className="text-xs block" style={{ color: 'var(--color-text-muted)' }}>Port</span>
                  <span style={{ color: 'var(--color-accent)' }}>:{port}</span>
                </div>
                <div>
                  <span className="text-xs block" style={{ color: 'var(--color-text-muted)' }}>Domain</span>
                  <span style={{ color: 'var(--color-primary)' }}>{domain}</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center gap-3">
            <button
              id="create-project-button"
              type="submit"
              className="btn btn-primary py-3 px-8 text-sm font-semibold"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="spinner" /> Creating...
                </span>
              ) : (
                '🚀 Create Project'
              )}
            </button>
            <button
              type="button"
              className="btn btn-ghost py-3 px-6"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectPage;
