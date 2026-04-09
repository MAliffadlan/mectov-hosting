import { Link, useLocation } from 'react-router-dom';
import { Server, LayoutDashboard, PlusCircle, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 mr-6 text-foreground">
            <Server className="h-5 w-5 text-primary" />
            <span className="font-semibold tracking-tight">Mectov</span>
            <span className="font-light text-muted-foreground mr-4">Panel</span>
          </Link>

          {/* Desktop Nav */}
          <div className="flex items-center gap-6 text-sm flex-1">
            <Link 
              to="/" 
              className={`flex items-center gap-2 transition-colors hover:text-foreground/80 ${isActive('/') ? 'text-foreground font-medium' : 'text-foreground/60'}`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link 
              to="/add" 
              className={`flex items-center gap-2 transition-colors hover:text-foreground/80 ${isActive('/add') ? 'text-foreground font-medium' : 'text-foreground/60'}`}
            >
              <PlusCircle className="h-4 w-4" />
              New Project
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-2">
            <Link 
              to="/settings"
              className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-accent"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
            <div className="h-4 w-px bg-border mx-2" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground mr-2">
              <User className="h-4 w-4" />
              <span>{user?.username}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
