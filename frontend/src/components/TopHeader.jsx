import { Search, Bell, MessageSquareMore } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Input } from "@/components/ui/input";

const TopHeader = () => {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between w-full pb-4">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Hello, {user?.username ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : 'Admin'}!
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Explore information and activity about your property
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-64 hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-10 rounded-full bg-card border-none shadow-sm h-11"
          />
        </div>

        <button className="h-11 w-11 rounded-full bg-card flex items-center justify-center shadow-sm text-muted-foreground hover:text-foreground transition-colors border border-border/50">
          <MessageSquareMore className="h-5 w-5" />
        </button>
        
        <button className="h-11 w-11 rounded-full bg-card flex items-center justify-center shadow-sm text-muted-foreground hover:text-foreground transition-colors border border-border/50 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-destructive border-2 border-card rounded-full" />
        </button>
      </div>
    </header>
  );
};

export default TopHeader;
