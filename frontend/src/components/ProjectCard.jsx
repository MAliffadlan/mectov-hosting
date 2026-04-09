import { useState } from 'react';
import { 
  Play, Square, RotateCw, FileText, Settings, Trash2, 
  Globe, Cable, Clock 
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ProjectCard = ({ project, onStart, onStop, onRestart, onDelete, onViewLogs, onViewNginx }) => {
  const [loading, setLoading] = useState(null); // 'start' | 'stop' | 'restart' | 'delete' | null
  const isRunning = project.status === 'running';

  const handleAction = async (action, callback) => {
    setLoading(action);
    try {
      await callback();
    } finally {
      setLoading(null);
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold flex items-center">
              {project.name}
            </CardTitle>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              Created {new Date(project.createdAt).toLocaleDateString()}
            </div>
          </div>
          <Badge 
            variant={isRunning ? "default" : "secondary"} 
            className={isRunning ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" : "bg-destructive/10 text-destructive hover:bg-destructive/20"}
          >
            <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${isRunning ? 'bg-green-500' : 'bg-destructive'}`} />
            {isRunning ? 'Running' : 'Stopped'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4 flex-1">
        <div className="grid grid-cols-2 gap-3 bg-muted/50 rounded-lg p-3">
          <div className="space-y-1">
            <span className="flex items-center text-xs text-muted-foreground">
              <Globe className="mr-1.5 h-3 w-3" /> Domain
            </span>
            <span className="text-sm font-medium tracking-tight truncate block" title={project.domain}>
              {project.domain}
            </span>
          </div>
          <div className="space-y-1 border-l pl-3">
            <span className="flex items-center text-xs text-muted-foreground">
              <Cable className="mr-1.5 h-3 w-3" /> Port
            </span>
            <span className="text-sm font-medium font-mono text-primary">
              :{project.port}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex flex-wrap gap-2">
        {!isRunning ? (
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20 hover:text-green-600"
            disabled={loading !== null}
            onClick={() => handleAction('start', () => onStart(project.id))}
          >
            {loading === 'start' ? <span className="spinner mr-2" /> : <Play className="mr-2 h-3.5 w-3.5 fill-current" />} Start
          </Button>
        ) : (
          <Button 
            size="sm" 
            variant="outline"
            className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20 hover:text-destructive"
            disabled={loading !== null}
            onClick={() => handleAction('stop', () => onStop(project.id))}
          >
            {loading === 'stop' ? <span className="spinner mr-2" /> : <Square className="mr-2 h-3.5 w-3.5 fill-current" />} Stop
          </Button>
        )}

        <Button 
          size="sm" 
          variant="outline"
          disabled={loading !== null}
          onClick={() => handleAction('restart', () => onRestart(project.id))}
        >
          {loading === 'restart' ? <span className="spinner mr-2" /> : <RotateCw className="mr-2 h-3.5 w-3.5" />} Restart
        </Button>

        <Button 
          size="sm" 
          variant="ghost"
          disabled={loading !== null}
          onClick={() => onViewLogs(project.id)}
        >
          <FileText className="mr-2 h-3.5 w-3.5" /> Logs
        </Button>

        <Button 
          size="sm" 
          variant="ghost"
          disabled={loading !== null}
          onClick={() => onViewNginx(project.id)}
        >
          <Settings className="mr-2 h-3.5 w-3.5" /> Nginx
        </Button>

        <div className="flex-1" />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              size="sm" 
              variant="ghost"
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              disabled={loading !== null}
            >
              {loading === 'delete' ? <span className="spinner" /> : <Trash2 className="h-4 w-4" />}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will delete the <strong className="text-foreground">{project.name}</strong> project from the panel. 
                This will also terminate the running mock container (if any).
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => handleAction('delete', () => onDelete(project.id))}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete Project
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
