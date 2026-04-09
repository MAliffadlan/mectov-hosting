import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '@/api/api';
import { toast } from "sonner";
import { ArrowLeft, Rocket, GitBranch, Globe, HardDrive } from 'lucide-react';

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
      toast.success('Project created successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-3xl mx-auto w-full pb-12">
      <div className="mb-8">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center">
          <Rocket className="w-8 h-8 mr-3 text-green-600" />
          Deploy New Application
        </h1>
        <p className="text-gray-500 mt-2">
          Configure a new application from a remote git repository or local deployment.
        </p>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="bg-gray-50/50 px-8 py-4 border-b border-gray-100 flex items-center">
          <h2 className="font-semibold text-gray-800">Project Details</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            
            {/* Project Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Project Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. My Awesome App"
                required
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm"
              />
              <p className="text-xs text-gray-500 mt-1.5">A unique identifier for your application.</p>
            </div>

            {/* Repository URL */}
            <div>
              <label htmlFor="repoUrl" className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
                <GitBranch className="w-4 h-4 mr-1.5 text-gray-400" />
                Repository URL
              </label>
              <input
                id="repoUrl"
                name="repoUrl"
                value={formData.repoUrl}
                onChange={handleChange}
                placeholder="https://github.com/username/repo.git"
                required
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm font-mono text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Domain */}
              <div>
                <label htmlFor="domain" className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
                  <Globe className="w-4 h-4 mr-1.5 text-gray-400" />
                  Domain Name
                </label>
                <input
                  id="domain"
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  placeholder="app.example.com"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm font-mono text-sm"
                />
              </div>

              {/* Port */}
              <div>
                <label htmlFor="port" className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
                  <HardDrive className="w-4 h-4 mr-1.5 text-gray-400" />
                  Internal Port
                </label>
                <input
                  id="port"
                  name="port"
                  value={formData.port}
                  onChange={handleChange}
                  placeholder="3000"
                  required
                  type="number"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm font-mono text-sm"
                />
              </div>
            </div>

          </div>
          
          <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="pill-button px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`pill-button px-6 py-2.5 text-sm font-bold shadow-md shadow-green-600/20 text-white ${
                loading 
                ? 'bg-green-400 cursor-not-allowed opacity-80' 
                : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="spinner mr-2 border-white/20 border-r-white"></div>
                  Deploying...
                </div>
              ) : 'Deploy Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectPage;
