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
    <aside className="w-[88px] my-auto ml-6 h-[calc(100vh-3rem)] max-h-[900px] bg-card rounded-[2.5rem] shadow-sm flex flex-col items-center py-6 justify-between flex-shrink-0 z-40 border border-border/50">
      <div className="flex flex-col items-center gap-8 w-full">
        {/* App Logo / Branding Icon equivalent */}
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
          <div className="grid grid-cols-2 gap-1 w-6 h-6">
            <span className="bg-primary rounded-sm shadow-sm" />
            <span className="bg-primary/70 rounded-sm shadow-sm" />
            <span className="bg-primary/50 rounded-sm shadow-sm" />
            <span className="bg-primary/30 rounded-sm shadow-sm" />
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-4 w-full px-5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              title={item.name}
              className={`flex items-center justify-center w-full aspect-square rounded-[1.25rem] transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-foreground text-background shadow-md scale-105'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              {item.icon}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom User Area */}
      <div className="flex flex-col gap-4 w-full px-4">
        <button
          onClick={logout}
          title="Logout"
          className="flex items-center justify-center w-full aspect-square rounded-2xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="h-5 w-5" />
        </button>

        <div className="w-full aspect-square rounded-full bg-secondary flex items-center justify-center overflow-hidden border">
          <User className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
