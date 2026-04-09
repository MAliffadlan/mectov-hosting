import { useState } from 'react';

const SettingsPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-[800px] mx-auto w-full pb-12 pt-4">
      <div className="mb-6 border-b border-[#E5E3D8] pb-6">
        <h1 className="text-[20px] font-semibold text-[#171717] tracking-tight">
          System Preferences
        </h1>
        <p className="text-[13px] text-[#737373] mt-1">
          Manage panel configuration and security settings.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Authentication Settings */}
        <div className="neo-panel overflow-hidden">
          <div className="bg-[#FAFAFA] px-6 py-4 border-b border-[#E5E3D8]">
            <h2 className="text-[14px] font-semibold text-[#171717]">
              Security
            </h2>
            <p className="text-[12px] text-[#737373] mt-0.5">Update host access credentials.</p>
          </div>
          
          <div className="p-6 md:p-8 space-y-5">
            <div className="max-w-md">
              <label className="block text-[13px] font-medium text-[#171717] mb-1.5">New Password</label>
              <input 
                type="password" 
                className="neo-input w-full px-3 py-2 text-[14px]"
              />
            </div>
            <div className="max-w-md">
              <label className="block text-[13px] font-medium text-[#171717] mb-1.5">Confirm Password</label>
              <input 
                type="password" 
                className="neo-input w-full px-3 py-2 text-[14px]"
              />
            </div>
            <div className="pt-2">
              <button 
                onClick={handleSave} 
                disabled={loading}
                className="neo-btn-secondary px-4 py-2 text-[13px]"
              >
                {loading ? 'Saving...' : 'Update Password'}
              </button>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="neo-panel overflow-hidden">
          <div className="bg-[#FAFAFA] px-6 py-4 border-b border-[#E5E3D8]">
            <h2 className="text-[14px] font-semibold text-[#171717]">
              Engine Configuration
            </h2>
            <p className="text-[12px] text-[#737373] mt-0.5">Advanced network toggles.</p>
          </div>
          
          <div className="p-6 md:p-8 flex flex-col gap-0 border-b border-[#E5E3D8]/50">
            <div className="flex items-center justify-between py-4 border-b border-[#f5f5f0]">
              <div>
                <h4 className="text-[13px] font-medium text-[#171717]">Automatic Nginx Reload</h4>
                <p className="text-[12px] text-[#737373] mt-1">Zero downtime proxy reconfiguration on changes.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-8 h-4 bg-[#d4d4d4] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#1a2a22]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between py-4">
              <div>
                <h4 className="text-[13px] font-medium text-[#171717]">Verbose Logging</h4>
                <p className="text-[12px] text-[#737373] mt-1">Retain detailed standard output dumps.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-8 h-4 bg-[#d4d4d4] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#1a2a22]"></div>
              </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
