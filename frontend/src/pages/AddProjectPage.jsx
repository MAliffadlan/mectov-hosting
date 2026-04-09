import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '@/api/api';
import { toast } from "sonner";
import { ArrowLeft } from 'lucide-react';

const AddProjectPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    repoUrl: '',
    domain: '',
    port: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createProject(formData);
      toast.success('Deployment created successfully');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create deployment');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-[800px] mx-auto w-full pb-12 pt-4">
      <div className="mb-6 border-b border-[#E5E3D8] pb-6">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center text-[12px] font-medium text-[#737373] hover:text-[#171717] transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
        </button>
        <h1 className="text-[20px] font-semibold text-[#171717] tracking-tight">
          Create Deployment
        </h1>
        <p className="text-[13px] text-[#737373] mt-1">
          Deploy a new application from a Git repository to your server instance.
        </p>
      </div>

      <div className="neo-panel overflow-hidden">
        <form onSubmit={handleSubmit}>
          
          <div className="p-6 md:p-8 space-y-6">
            {/* Project Name */}
            <div>
              <label htmlFor="name" className="block text-[13px] font-medium text-[#171717] mb-1.5">
                Deployment Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="project-name"
                required
                className="neo-input w-full px-3 py-2 text-[14px]"
              />
            </div>

            {/* Repository URL */}
            <div>
              <label htmlFor="repoUrl" className="block text-[13px] font-medium text-[#171717] mb-1.5">
                Git Repository
              </label>
              <input
                id="repoUrl"
                name="repoUrl"
                value={formData.repoUrl}
                onChange={handleChange}
                placeholder="https://github.com/username/repo.git"
                required
                className="neo-input w-full px-3 py-2 text-[14px] font-mono text-[#171717]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Domain */}
              <div>
                <label htmlFor="domain" className="block text-[13px] font-medium text-[#171717] mb-1.5">
                  Domain Name
                </label>
                <input
                  id="domain"
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  placeholder="app.example.com"
                  className="neo-input w-full px-3 py-2 text-[14px] font-mono text-[#171717]"
                />
              </div>

              {/* Port */}
              <div>
                <label htmlFor="port" className="block text-[13px] font-medium text-[#171717] mb-1.5">
                  Container Port
                </label>
                <input
                  id="port"
                  name="port"
                  value={formData.port}
                  onChange={handleChange}
                  placeholder="3000"
                  required
                  type="number"
                  className="neo-input w-full px-3 py-2 text-[14px] font-mono text-[#171717]"
                />
              </div>
            </div>

          </div>
          
          <div className="px-6 md:px-8 py-4 bg-[#FAFAFA] border-t border-[#E5E3D8] flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="neo-btn-secondary px-4 py-2 text-[13px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`neo-btn-primary px-5 py-2 text-[13px] ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Deploying...' : 'Deploy'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectPage;
