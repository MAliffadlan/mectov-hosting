import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Settings, LogOut, Hexagon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { name: 'Overview', path: '/', icon: LayoutDashboard },
    { name: 'Deploy', path: '/add', icon: PlusCircle },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-[220px] h-full bg-[#0a0a0a] border-r border-[#1e1e1e] flex flex-col py-5 flex-shrink-0 z-40">
      {/* Brand */}
      <div className="px-5 mb-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22c55e] to-[#16a34a] flex items-center justify-center shadow-lg shadow-green-500/20">
          <Hexagon className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <div className="text-[14px] font-bold text-white tracking-tight">Mectov</div>
          <div className="text-[11px] text-[#525252] font-medium">Hosting Panel</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 px-3 flex-1">
        <div className="text-[10px] font-semibold text-[#525252] uppercase tracking-widest px-3 mb-2">
          Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                isActive(item.path)
                  ? 'bg-[#1a1a1a] text-white border border-[#262626]'
                  : 'text-[#737373] hover:text-[#a1a1a1] hover:bg-[#111]'
              }`}
            >
              <Icon className="w-4 h-4" strokeWidth={isActive(item.path) ? 2 : 1.5} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 mt-auto">
        <div className="border-t border-[#1e1e1e] pt-3">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-[#525252] hover:text-[#ff6369] hover:bg-[#1a1111] transition-all w-full"
          >
            <LogOut className="w-4 h-4" strokeWidth={1.5} />
            Sign Out
          </button>
        </div>
        <div className="px-3 mt-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-[11px] font-bold text-white shadow-lg shadow-purple-500/20">
            MA
          </div>
          <div>
            <div className="text-[12px] font-semibold text-[#ededed]">Alif Fadlan</div>
            <div className="text-[10px] text-[#525252]">Administrator</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
