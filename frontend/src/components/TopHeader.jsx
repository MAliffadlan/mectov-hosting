import { Search, Bell } from 'lucide-react';

const TopHeader = () => {
  return (
    <header className="flex items-center justify-between w-full pb-6">
      <div>
        <h1 className="text-[20px] font-bold text-white tracking-tight">
          Welcome back, Alif 👋
        </h1>
        <p className="text-[13px] text-[#525252] mt-0.5">
          Here's what's happening with your deployments.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden xl:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#525252]" />
          <input 
            type="text" 
            placeholder="Search deployments..." 
            className="input-field pl-9 pr-4 py-2 text-[13px] w-[240px]"
          />
        </div>
        
        <button className="w-9 h-9 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center text-[#525252] hover:text-white hover:border-[#404040] transition-all relative">
          <Bell className="w-4 h-4" strokeWidth={1.5} />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#ef4444] rounded-full border-2 border-[#0a0a0a] text-[8px] font-bold text-white flex items-center justify-center">2</span>
        </button>
      </div>
    </header>
  );
};

export default TopHeader;
