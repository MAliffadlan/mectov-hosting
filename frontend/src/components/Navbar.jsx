import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Navbar
 * Top navigation bar with branding and nav links
 */
const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40" style={{
      background: 'linear-gradient(135deg, rgba(10, 14, 26, 0.95) 0%, rgba(17, 24, 39, 0.95) 100%)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--color-border)',
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
                color: 'white',
              }}>
              M
            </div>
            <div>
              <span className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
                Mectov
              </span>
              <span className="text-lg font-light ml-1" style={{ color: 'var(--color-primary)' }}>
                Panel
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="btn btn-sm"
              style={{
                background: isActive('/') ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                color: isActive('/') ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                border: isActive('/') ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid transparent',
                textDecoration: 'none',
              }}
            >
              📊 Dashboard
            </Link>
            <Link
              to="/add"
              className="btn btn-sm"
              style={{
                background: isActive('/add') ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                color: isActive('/add') ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                border: isActive('/add') ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid transparent',
                textDecoration: 'none',
              }}
            >
              ➕ New Project
            </Link>

            {/* User Menu */}
            <div className="flex items-center gap-3 ml-4 pl-4" style={{ borderLeft: '1px solid var(--color-border)' }}>
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                👤 {user?.username}
              </span>
              <button
                onClick={logout}
                className="btn btn-sm btn-ghost"
                style={{ color: 'var(--color-danger)' }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
