import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { login } from '@/api/api';
import { Hexagon, Lock, User } from 'lucide-react';
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
      toast.success('Welcome back logged in successfully!');
      
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      toast.error('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#CFDFD4] p-4 font-sans">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-xl shadow-black/5 flex items-center justify-center mb-6 transform -rotate-6">
            <Hexagon className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Mectov Panel</h1>
          <p className="text-gray-600 mt-2 font-medium">Personal Hosting Management</p>
        </div>

        {/* Login Form */}
        <div className="glass-panel overflow-hidden">
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="admin"
                    className="w-full pl-10 pr-4 py-3 bg-white/60 border border-white focus:bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-white/60 border border-white focus:bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`pill-button w-full flex justify-center py-3 px-4 shadow-lg shadow-green-600/20 text-sm font-bold text-white transition-colors ${
                loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="spinner mr-2 border-white/20 border-r-white"></div>
                  Authenticating...
                </div>
              ) : 'Sign In'}
            </button>
          </form>
          <div className="px-8 py-4 bg-gray-50/50 border-t border-white/40 text-center">
            <p className="text-xs text-gray-500 font-medium">Secured with JWT authentication</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
