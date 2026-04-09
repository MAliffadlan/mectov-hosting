import { useState, useEffect } from 'react';
import { getNginxConfig, updateNginxConfig } from '@/api/api';
import { X } from 'lucide-react';
import { toast } from "sonner";

const NginxModal = ({ projectId, projectName, onClose }) => {
  const [config, setConfig] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try { const { data } = await getNginxConfig(projectId); setConfig(data.config); }
      catch { setConfig('# Error loading config'); }
      finally { setLoading(false); }
    })();
  }, [projectId]);

  const handleSave = async () => {
    setSaving(true);
    try { await updateNginxConfig(projectId, config); toast.success('Saved'); onClose(); }
    catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
      <div className="surface-elevated w-full max-w-4xl flex flex-col overflow-hidden shadow-2xl max-h-[85vh]">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1e1e1e]">
          <div>
            <h2 className="text-[13px] font-semibold text-white">Nginx Config</h2>
            <p className="text-[11px] font-mono text-[#525252]">{projectName}.conf</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#525252] hover:text-white hover:bg-[#1a1a1a] transition-all"><X className="w-4 h-4" /></button>
        </div>
        <div className="flex-1 bg-[#0a0a0a] overflow-hidden min-h-[400px]">
          {loading ? <div className="flex items-center justify-center h-full"><div className="spinner"></div></div> : (
            <textarea value={config} onChange={e => setConfig(e.target.value)} className="w-full h-full bg-transparent text-[#a1a1a1] font-mono text-[12px] p-5 focus:outline-none resize-none leading-[1.8]" spellCheck="false" />
          )}
        </div>
        <div className="px-5 py-3 border-t border-[#1e1e1e] flex justify-between items-center">
          <p className="text-[11px] text-[#b45309]">⚠ Syntax errors will crash Nginx</p>
          <div className="flex gap-2">
            <button onClick={onClose} className="btn-ghost text-[11px] py-1.5">Discard</button>
            <button onClick={handleSave} disabled={saving} className={`btn-primary text-[11px] py-1.5 ${saving ? 'opacity-70' : ''}`}>{saving ? 'Saving...' : 'Commit'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NginxModal;
