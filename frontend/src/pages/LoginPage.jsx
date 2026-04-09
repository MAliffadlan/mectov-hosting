import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as apiLogin } from '../api/api';

/**
 * LoginPage
 * Full-screen login with glassmorphism card
 */
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await apiLogin(username, password);
      loginUser(data.token, data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: `
          radial-gradient(ellipse at 20% 50%, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
          var(--color-bg-primary)
        `,
      }}>
      <div className="w-full max-w-md animate-slide-up">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl font-bold"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
              color: 'white',
              boxShadow: '0 8px 30px rgba(6, 182, 212, 0.3)',
            }}>
            M
          </div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Mectov <span style={{ color: 'var(--color-primary)' }}>Panel</span>
          </h1>
          <p className="text-sm mt-2" style={{ color: 'var(--color-text-muted)' }}>
            Personal Hosting Management
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-card p-8">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 rounded-lg text-sm" style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: 'var(--color-danger)',
              }}>
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                Username
              </label>
              <input
                id="username"
                type="text"
                className="input"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                className="input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              id="login-button"
              type="submit"
              className="btn btn-primary w-full py-3 text-sm font-semibold"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="spinner" /> Signing in...
                </span>
              ) : (
                'Sign In →'
              )}
            </button>
          </form>

          <p className="text-center text-xs mt-6" style={{ color: 'var(--color-text-muted)' }}>
            Default: admin / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
