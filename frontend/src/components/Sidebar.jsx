import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Settings, User, LogOut, Hexagon } from 'lucide-react';
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
    <aside className="w-16 my-auto ml-4 neo-panel flex flex-col items-center py-5 gap-4 flex-shrink-0 z-40 h-[calc(100vh-3rem)]">
      {/* App Logo */}
      <Link to="/" className="w-10 h-10 flex items-center justify-center text-[#1a2a22]">
        <Hexagon className="h-6 w-6" strokeWidth={2.5} />
      </Link>

      {/* Nav Links */}
      <nav className="flex flex-col gap-3 w-full px-3 mt-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            title={item.name}
            className={`flex items-center justify-center w-full aspect-square rounded-[10px] transition-all duration-150 ${
              isActive(item.path)
                ? 'bg-[#1a2a22] text-white shadow-sm'
                : 'text-[#525252] hover:bg-[#F5F5F0] hover:text-[#171717]'
            }`}
          >
            {item.icon}
          </Link>
        ))}
      </nav>

      <div className="flex-grow border-l border-[#E5E3D8] h-full w-[1px]"></div>

      {/* Bottom */}
      <div className="flex flex-col gap-3 w-full px-3">
        <button
          onClick={logout}
          title="Logout"
          className="flex items-center justify-center w-full aspect-square rounded-[10px] text-[#525252] hover:bg-[#ffefef] hover:text-[#dc2626] transition-colors"
        >
          <LogOut className="h-4 w-4" strokeWidth={2} />
        </button>

        <div className="w-10 h-10 mx-auto rounded-full bg-[#f5f5f0] flex items-center justify-center border border-[#e5e3d8] overflow-hidden">
          <User className="h-4 w-4 text-[#737373]" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
