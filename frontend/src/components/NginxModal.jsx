import { useState, useEffect } from 'react';
import { getNginxConfig } from '@/api/api';
import { Settings, Copy, Check } from 'lucide-react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const NginxModal = ({ projectId, projectName, onClose }) => {
  const [config, setConfig] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await getNginxConfig(projectId);
        setConfig(data.config);
      } catch (err) {
        console.error('Failed to fetch nginx config:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, [projectId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl flex flex-col max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Nginx Config — {projectName}
          </DialogTitle>
          <DialogDescription>
            Simulated reverse proxy configuration for this domain.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col mt-2">
          {loading ? (
            <div className="flex-1 flex items-center justify-center p-10 border rounded-md">
              <span className="spinner mr-3" />
              <span className="text-sm text-muted-foreground">Generating config...</span>
            </div>
          ) : (
            <div className="relative flex-1">
              <pre className="h-full overflow-y-auto p-4 log-container !text-primary min-h-[300px]">
                {config}
              </pre>
              <Button 
                size="sm" 
                variant="secondary" 
                className="absolute top-4 right-4 shadow-sm"
                onClick={handleCopy}
              >
                {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          )}
        </div>

        <DialogFooter className="mt-4 sm:justify-start">
          <p className="text-xs text-muted-foreground bg-muted p-3 rounded-md w-full">
            <strong className="text-foreground">Note:</strong> This config is simulated. To use in production, save to <code className="bg-background px-1 py-0.5 rounded border">/etc/nginx/sites-available/</code> and run <code className="bg-background px-1 py-0.5 rounded border">nginx -t && systemctl reload nginx</code>.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NginxModal;
