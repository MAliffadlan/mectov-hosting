import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '@/api/api';
import { ArrowLeft, Rocket, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const AddProjectPage = () => {
  const [name, setName] = useState('');
  const [port, setPort] = useState('');
  const [domain, setDomain] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const portNum = parseInt(port, 10);
    if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
      setError('Port must be a number between 1 and 65535.');
      return;
    }

    setLoading(true);
    try {
      await createProject({ name, port: portNum, domain });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create project.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => navigate('/')}
        className="text-muted-foreground -ml-2"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">New Project</CardTitle>
          <CardDescription>Deploy a new application to your server</CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                placeholder="e.g., my-portfolio"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              />
              <p className="text-[0.8rem] text-muted-foreground">
                A friendly display name for your project
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-port">Port</Label>
              <Input
                id="project-port"
                type="number"
                placeholder="e.g., 3000"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                min="1"
                max="65535"
                required
              />
              <p className="text-[0.8rem] text-muted-foreground">
                The local port your application runs on
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-domain">Domain</Label>
              <Input
                id="project-domain"
                placeholder="e.g., app.example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                required
              />
              <p className="text-[0.8rem] text-muted-foreground">
                The external domain name to route traffic to this project
              </p>
            </div>

            {/* Preview Section */}
            {name && port && domain && (
              <div className="bg-muted p-4 rounded-md border text-sm mt-6">
                <div className="font-semibold text-xs text-primary mb-3">PREVIEW</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground block">Name</span>
                    <span className="font-medium text-foreground">{name}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground block">Route</span>
                    <span className="font-mono text-primary flex items-center">
                      {domain} <ArrowLeft className="h-3 w-3 mx-1 inline rotate-180" /> :{port}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="pt-2 border-t mt-6 flex justify-between">
            <Button variant="ghost" type="button" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner mr-2" /> Creating...
                </>
              ) : (
                <>
                  <Rocket className="mr-2 h-4 w-4" /> Create Project
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
    </div>
  );
};

export default AddProjectPage;
