import { Search, Bell, Command } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const TopHeader = () => {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between w-full pb-6 pt-2">
      <div className="flex flex-col">
        <h1 className="text-[22px] font-semibold tracking-tight text-[#171717]">
          Hello, M Alif fadlan!
        </h1>
        <p className="text-[13px] font-medium text-[#737373] mt-0.5">
          Explore information and activity about your property
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-64 hidden xl:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-3.5 w-3.5 text-[#a3a3a3]" />
          </div>
          <input 
            type="search" 
            placeholder="Quick search..." 
            className="neo-input w-full pl-9 pr-10 py-2 text-[13px] font-medium"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <span className="text-[10px] bg-[#F5F5F0] text-[#737373] border border-[#E5E3D8] px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <Command className="w-3 h-3" />K
            </span>
          </div>
        </div>
        
        <button className="h-[34px] w-[34px] rounded-full bg-white flex items-center justify-center border border-[#D1D0C9] text-[#525252] hover:text-[#171717] hover:border-[#a3a3a3] transition-colors relative shadow-sm">
          <Bell className="h-[15px] w-[15px]" strokeWidth={2} />
          <span className="absolute top-[8px] right-[8px] w-1.5 h-1.5 bg-[#dc2626] rounded-full shadow-[0_0_0_2px_#fff]" />
        </button>
      </div>
    </header>
  );
};

export default TopHeader;
