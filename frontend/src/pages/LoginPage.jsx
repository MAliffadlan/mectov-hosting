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
  
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data } = await login(username, password);
      authLogin(data.token);
      toast.success('Logged in successfully');
      
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      toast.error('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EAE9E3] p-4">
      <div className="w-full max-w-[380px]">
        {/* Logo/Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-[#171717] rounded-xl flex items-center justify-center mb-6 shadow-sm">
            <Hexagon className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-[20px] font-semibold text-[#171717] tracking-tight">Mectov Panel</h1>
          <p className="text-[13px] text-[#737373] mt-1">Sign in to your instance</p>
        </div>

        {/* Login Form */}
        <div className="neo-panel overflow-hidden p-6 md:p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="neo-input w-full px-3 py-2 text-[14px]"
                autoComplete="username"
              />
            </div>
            
            <div>
              <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="neo-input w-full px-3 py-2 text-[14px]"
                autoComplete="current-password"
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`neo-btn-primary w-full py-2.5 text-[13px] ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-[11px] text-[#a3a3a3]">Terminal-grade secure proxy panel</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
