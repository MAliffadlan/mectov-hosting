import { useState, useEffect } from 'react';
import { getNginxConfig, updateNginxConfig } from '@/api/api';
import { FileCode2, Save, X } from 'lucide-react';
import { toast } from "sonner";

const NginxModal = ({ projectId, projectName, onClose }) => {
  const [config, setConfig] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await getNginxConfig(projectId);
        setConfig(data.config);
      } catch (err) {
        toast.error('Failed to load Nginx config');
        setConfig('# Error loading configuration file\n# Does the file exist?');
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, [projectId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateNginxConfig(projectId, config);
      toast.success('Nginx config saved successfully');
      onClose();
    } catch (err) {
      toast.error('Failed to save config');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-full flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 shadow-inner shadow-blue-500/10">
              <FileCode2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Nginx Configuration</h2>
              <p className="text-xs font-mono text-gray-500 mt-0.5">{projectName}.conf</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 bg-gray-50 overflow-hidden flex flex-col min-h-[400px]">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="spinner text-blue-600 mb-4 h-8 w-8"></div>
              <p className="text-sm font-medium text-gray-500">Reading configuration...</p>
            </div>
          ) : (
            <div className="flex-1 relative rounded-xl shadow-sm border border-gray-200 overflow-hidden bg-[#1e1e1e]">
              <div className="h-9 bg-[#2d2d2d] flex items-center px-4 border-b border-[#1e1e1e]">
                <span className="text-xs text-gray-400 font-mono">/etc/nginx/sites-available/{projectName}.conf</span>
              </div>
              <textarea
                value={config}
                onChange={(e) => setConfig(e.target.value)}
                className="w-full h-[calc(100%-2.25rem)] bg-transparent text-[#d4d4d4] font-mono text-sm p-4 focus:outline-none resize-none leading-relaxed"
                spellCheck="false"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-between items-center">
          <p className="text-xs text-yellow-600 font-medium bg-yellow-50 px-3 py-1.5 rounded-md border border-yellow-100">
            Warning: Invalid syntax may crash the Nginx service.
          </p>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="pill-button px-5 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={loading || saving}
              className={`pill-button px-6 py-2 text-sm font-bold shadow-md shadow-blue-600/20 text-white flex items-center ${
                loading || saving ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {saving ? (
                <>
                  <div className="spinner w-4 h-4 mr-2 border-white/20 border-r-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Configuration
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NginxModal;
