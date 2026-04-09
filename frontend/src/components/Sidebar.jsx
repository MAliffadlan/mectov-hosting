import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Settings, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'New Project', path: '/add', icon: <PlusCircle className="h-5 w-5" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <aside className="w-16 my-auto ml-4 glass-panel bg-white/70 flex flex-col items-center py-5 gap-2 flex-shrink-0 z-40">
      {/* App Logo */}
      <div className="w-9 h-9 rounded-[14px] bg-green-100 flex items-center justify-center mb-1 shadow-inner shadow-green-500/20">
        <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
          <span className="bg-green-600 rounded-[2px]" />
          <span className="bg-green-500 rounded-[2px]" />
          <span className="bg-green-400 rounded-[2px]" />
          <span className="bg-green-300 rounded-[2px]" />
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-2 w-full px-3 mt-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            title={item.name}
            className={`flex items-center justify-center w-full aspect-square rounded-xl transition-all duration-300 ${
              isActive(item.path)
                ? 'bg-gradient-to-br from-green-600 to-green-700 text-white shadow-lg shadow-green-600/30'
                : 'text-gray-400 hover:bg-white hover:text-green-700 hover:shadow-sm'
            }`}
          >
            {item.icon}
          </Link>
        ))}
      </nav>

      <div className="flex-grow"></div>

      {/* Bottom */}
      <div className="flex flex-col gap-2 w-full px-3">
        <button
          onClick={logout}
          title="Logout"
          className="flex items-center justify-center w-full aspect-square rounded-xl text-gray-400 hover:bg-white hover:text-red-500 hover:shadow-sm transition-all duration-300 group"
        >
          <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
        </button>

        <div className="w-10 h-10 mx-auto rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-sm border border-white/50 mt-2">
          <User className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
