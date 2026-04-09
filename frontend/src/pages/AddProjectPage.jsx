import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '@/api/api';
import { toast } from "sonner";
import { ArrowLeft } from 'lucide-react';

const AddProjectPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', repoUrl: '', domain: '', port: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProject(formData);
      toast.success('Deployment created');
      navigate('/');
    } catch (err) { toast.error(err.response?.data?.error || 'Failed'); }
    finally { setLoading(false); }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="max-w-[700px] w-full pb-12">
      <button onClick={() => navigate('/')} className="flex items-center text-[12px] text-[#525252] hover:text-white transition-colors mb-6">
        <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to overview
      </button>

      <h1 className="text-[20px] font-bold text-white tracking-tight mb-1">Create Deployment</h1>
      <p className="text-[13px] text-[#525252] mb-8">Deploy a new application from a Git repository.</p>

      <div className="surface-elevated overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-6 md:p-8 space-y-5">
            <div>
              <label className="block text-[12px] font-medium text-[#a1a1a1] mb-2">Deployment Name</label>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="my-awesome-app" required className="input-field" />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#a1a1a1] mb-2">Git Repository</label>
              <input name="repoUrl" value={formData.repoUrl} onChange={handleChange} placeholder="https://github.com/user/repo.git" required className="input-field font-mono text-[13px]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-[#a1a1a1] mb-2">Domain</label>
                <input name="domain" value={formData.domain} onChange={handleChange} placeholder="app.example.com" className="input-field font-mono text-[13px]" />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#a1a1a1] mb-2">Port</label>
                <input name="port" value={formData.port} onChange={handleChange} placeholder="3000" required type="number" className="input-field font-mono text-[13px]" />
              </div>
            </div>
          </div>

          <div className="px-6 md:px-8 py-4 bg-[#0e0e0e] border-t border-[#1e1e1e] flex justify-end gap-3">
            <button type="button" onClick={() => navigate('/')} className="btn-ghost">Cancel</button>
            <button type="submit" disabled={loading} className={`btn-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
              {loading ? <><div className="spinner"></div> Deploying...</> : 'Deploy'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectPage;
