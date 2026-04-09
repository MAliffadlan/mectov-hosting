import { useState, useEffect } from 'react';
import { getServerStatus } from '@/api/api';
import { Cpu, MemoryStick, HardDrive, Clock, Box } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const ServerStatus = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      const { data } = await getServerStatus();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch server status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const getIndicatorColor = (value) => {
    if (value < 40) return "bg-green-500";
    if (value < 70) return "bg-yellow-500";
    return "bg-destructive";
  };

  const StatItem = ({ label, value, icon: Icon }) => (
    <div className="flex-1 space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center text-muted-foreground">
          <Icon className="mr-2 h-4 w-4" />
          {label}
        </span>
        <span className="font-semibold">{value}%</span>
      </div>
      <Progress value={value} indicatorColor={getIndicatorColor(value)} className="h-2" />
    </div>
  );

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-6">
          <span className="spinner mr-2" />
          <span className="text-sm text-muted-foreground">Loading server stats...</span>
        </CardContent>
      </Card>
    );
  }

  if (!stats) return null;

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center">
          <Box className="h-4 w-4 mr-2" />
          Server Status
        </CardTitle>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground font-mono">{stats.hostname}</span>
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2" />
            Online
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <StatItem label="CPU Usage" value={stats.cpu} icon={Cpu} />
          <StatItem label="RAM Usage" value={stats.ram} icon={MemoryStick} />
          <StatItem label="Disk Usage" value={stats.disk} icon={HardDrive} />
        </div>
        
        <div className="flex items-center gap-6 text-xs text-muted-foreground pt-4 border-t">
          <span className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Uptime: {stats.uptime}
          </span>
          <span className="flex items-center">
            <Box className="h-3.5 w-3.5 mr-1" />
            Node.js {stats.nodeVersion}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServerStatus;
