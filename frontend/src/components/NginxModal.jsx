import { useState, useEffect } from 'react';
import { getNginxConfig, updateNginxConfig } from '@/api/api';
import { X, Save } from 'lucide-react';
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
        setConfig('# Error accessing block configuration.');
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
      toast.success('Configuration overwritten');
      onClose();
    } catch (err) {
      toast.error('Write failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#f5f5f0]/80 backdrop-blur-[2px] animate-in fade-in duration-200">
      <div className="neo-panel w-full max-w-4xl max-h-full flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#E5E3D8] bg-[#FAFAFA]">
          <div>
            <h2 className="text-[13px] font-semibold text-[#171717]">Proxy Configuration</h2>
            <p className="text-[11px] font-mono text-[#737373] mt-0.5">/etc/nginx/sites-available/{projectName}.conf</p>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1.5 text-[#a3a3a3] hover:text-[#dc2626] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white overflow-hidden flex flex-col min-h-[450px]">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="spinner text-[#171717] mb-4"></div>
            </div>
          ) : (
            <textarea
              value={config}
              onChange={(e) => setConfig(e.target.value)}
              className="w-full flex-1 bg-transparent text-[#171717] font-mono text-[12px] p-5 focus:outline-none resize-none leading-relaxed"
              spellCheck="false"
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#FAFAFA] border-t border-[#E5E3D8] flex justify-between items-center">
          <p className="text-[11px] text-[#b45309] font-medium">Syntax errors will prevent Nginx reload.</p>
          <div className="flex gap-2">
            <button 
              onClick={onClose}
              className="neo-btn-secondary px-4 py-1.5 text-[11px]"
            >
              Discard
            </button>
            <button 
              onClick={handleSave}
              disabled={loading || saving}
              className={`neo-btn-primary px-4 py-1.5 text-[11px] flex items-center ${
                loading || saving ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {saving ? 'Writing...' : 'Commit Changes'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NginxModal;
