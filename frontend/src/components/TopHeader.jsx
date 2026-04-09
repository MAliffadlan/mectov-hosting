import { Search, Bell, MessageSquareMore } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const TopHeader = () => {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between w-full pb-4">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Hello, M Alif fadlan!
        </h1>
        <p className="text-sm font-medium text-gray-500 mt-0.5">
          Explore information and activity about your property
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-64 hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <Search className="h-4 w-4 text-green-700" />
          </div>
          <input 
            type="search" 
            placeholder="Search..." 
            className="w-full pl-10 pr-4 h-11 bg-white/70 border border-white focus:bg-white rounded-[2rem] focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm font-medium text-sm text-gray-700"
          />
        </div>

        <button className="h-11 w-11 rounded-full bg-white/70 flex items-center justify-center shadow-sm text-green-700 hover:text-green-800 hover:bg-white transition-colors border border-white">
          <MessageSquareMore className="h-5 w-5" />
        </button>
        
        <button className="h-11 w-11 rounded-full bg-white/70 flex items-center justify-center shadow-sm text-green-700 hover:text-green-800 hover:bg-white transition-colors border border-white relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full shadow-sm" />
        </button>
      </div>
    </header>
  );
};

export default TopHeader;
