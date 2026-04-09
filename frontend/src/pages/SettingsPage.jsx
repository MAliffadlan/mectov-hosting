import { Settings as SettingsIcon, Save, KeyRound, ServerCrash } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto w-full pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center">
          <SettingsIcon className="w-8 h-8 mr-3 text-green-600" />
          Settings
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Manage panel preferences and system configurations.
        </p>
      </div>

      <div className="space-y-8">
        
        {/* Authentication Settings */}
        <div className="glass-panel overflow-hidden">
          <div className="bg-white/50 px-8 py-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <KeyRound className="w-5 h-5 mr-2 text-gray-400" />
              Authentication
            </h2>
            <p className="text-sm text-gray-500 mt-1">Update your login credentials.</p>
          </div>
          
          <div className="p-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">New Password</label>
              <input 
                type="password" 
                placeholder="Enter new password"
                className="w-full max-w-md px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
              <input 
                type="password" 
                placeholder="Confirm your password"
                className="w-full max-w-md px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm"
              />
            </div>
            <button 
              onClick={handleSave} 
              disabled={loading}
              className="pill-button px-5 py-2.5 text-sm font-bold bg-gray-800 text-white hover:bg-black inline-flex items-center"
            >
              {loading ? (
                 <div className="spinner w-4 h-4 mr-2"></div>
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Update Password
            </button>
          </div>
        </div>

        {/* System Settings */}
        <div className="glass-panel overflow-hidden">
          <div className="bg-white/50 px-8 py-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <ServerCrash className="w-5 h-5 mr-2 text-gray-400" />
              System Settings
            </h2>
            <p className="text-sm text-gray-500 mt-1">Advanced configuration for the host server.</p>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-6">
              <div>
                <h4 className="font-semibold text-gray-800">Automatic Nginx Reload</h4>
                <p className="text-sm text-gray-500 mt-1">Automatically reload nginx when proxy changes are made.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-800">Debug Logging</h4>
                <p className="text-sm text-gray-500 mt-1">Enable verbose logging for troubleshooting.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
