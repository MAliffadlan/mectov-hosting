import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { login } from '@/api/api';
import { Hexagon } from 'lucide-react';
import { toast } from "sonner";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await login(username, password);
      loginUser(data.token, { username });
      toast.success('Logged in');
      navigate(location.state?.from?.pathname || "/", { replace: true });
    } catch { toast.error('Invalid credentials'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4">
      {/* Subtle gradient background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-br from-[#22c55e]/8 to-[#3b82f6]/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-[380px] relative z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#22c55e] to-[#16a34a] flex items-center justify-center mb-6 shadow-2xl shadow-green-500/30">
            <Hexagon className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-[22px] font-bold text-white tracking-tight">Mectov Panel</h1>
          <p className="text-[13px] text-[#525252] mt-1">Sign in to your hosting instance</p>
        </div>

        <div className="surface-elevated p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[12px] font-medium text-[#a1a1a1] mb-2">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className="input-field" autoComplete="username" />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#a1a1a1] mb-2">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="input-field" autoComplete="current-password" />
            </div>
            <button type="submit" disabled={loading} className={`btn-primary w-full justify-center py-3 text-[14px] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
              {loading ? <><div className="spinner"></div> Authenticating...</> : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] text-[#333] mt-8">Secured with JWT • End-to-end encrypted</p>
      </div>
    </div>
  );
};

export default LoginPage;
