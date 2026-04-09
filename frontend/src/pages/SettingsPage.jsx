import { useState } from 'react';

const SettingsPage = () => {
  const [loading, setLoading] = useState(false);
  const handleSave = () => { setLoading(true); setTimeout(() => setLoading(false), 1000); };

  return (
    <div className="max-w-[700px] w-full pb-12">
      <h1 className="text-[20px] font-bold text-white tracking-tight mb-1">Settings</h1>
      <p className="text-[13px] text-[#525252] mb-8">Manage panel configuration and security.</p>

      <div className="space-y-6">
        {/* Security */}
        <div className="surface-elevated overflow-hidden">
          <div className="px-6 py-4 border-b border-[#1e1e1e]">
            <h2 className="text-[14px] font-semibold text-white">Security</h2>
            <p className="text-[11px] text-[#525252] mt-0.5">Update access credentials</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="max-w-sm">
              <label className="block text-[12px] font-medium text-[#a1a1a1] mb-2">New Password</label>
              <input type="password" className="input-field" />
            </div>
            <div className="max-w-sm">
              <label className="block text-[12px] font-medium text-[#a1a1a1] mb-2">Confirm</label>
              <input type="password" className="input-field" />
            </div>
            <button onClick={handleSave} disabled={loading} className="btn-ghost mt-2">
              {loading ? 'Saving...' : 'Update Password'}
            </button>
          </div>
        </div>

        {/* Engine */}
        <div className="surface-elevated overflow-hidden">
          <div className="px-6 py-4 border-b border-[#1e1e1e]">
            <h2 className="text-[14px] font-semibold text-white">Engine</h2>
            <p className="text-[11px] text-[#525252] mt-0.5">System-level configurations</p>
          </div>
          <div className="divide-y divide-[#1e1e1e]">
            <div className="px-6 py-5 flex items-center justify-between">
              <div>
                <div className="text-[13px] font-medium text-[#ededed]">Auto Nginx Reload</div>
                <div className="text-[11px] text-[#525252] mt-1">Reload proxy on config changes</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-[#262626] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#525252] after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#22c55e] peer-checked:after:bg-white"></div>
              </label>
            </div>
            <div className="px-6 py-5 flex items-center justify-between">
              <div>
                <div className="text-[13px] font-medium text-[#ededed]">Verbose Logging</div>
                <div className="text-[11px] text-[#525252] mt-1">Extended stdout output</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-9 h-5 bg-[#262626] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#525252] after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#22c55e] peer-checked:after:bg-white"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
