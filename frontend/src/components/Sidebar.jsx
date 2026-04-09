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
    <aside className="w-16 my-auto ml-4 bg-card rounded-[2rem] shadow-sm flex flex-col items-center py-5 gap-2 flex-shrink-0 z-40 border border-border/50">
      {/* App Logo */}
      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mb-1">
        <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
          <span className="bg-primary rounded-[2px]" />
          <span className="bg-primary/70 rounded-[2px]" />
          <span className="bg-primary/50 rounded-[2px]" />
          <span className="bg-primary/30 rounded-[2px]" />
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-1.5 w-full px-3">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            title={item.name}
            className={`flex items-center justify-center w-full aspect-square rounded-xl transition-all duration-200 ${
              isActive(item.path)
                ? 'bg-foreground text-background shadow-md'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
          >
            {item.icon}
          </Link>
        ))}
      </nav>

      {/* Divider */}
      <div className="w-6 h-px bg-border my-1" />

      {/* Bottom */}
      <div className="flex flex-col gap-1.5 w-full px-3">
        <button
          onClick={logout}
          title="Logout"
          className="flex items-center justify-center w-full aspect-square rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="h-5 w-5" />
        </button>

        <div className="w-10 h-10 mx-auto rounded-full bg-secondary flex items-center justify-center overflow-hidden border">
          <User className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
