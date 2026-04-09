import { useState, useEffect } from 'react';
import { getServerStatus } from '@/api/api';
import { Server, Cpu, MemoryStick, HardDrive } from 'lucide-react';

const ServerStatus = () => {
  const [stats, setStats] = useState({
    cpu: 0,
    ram: 0,
    disk: 0,
    uptime: '0s',
    os: '',
    node_version: ''
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await getServerStatus();
        setStats({
          cpu: data.cpuUsage,
          ram: data.memoryUsage,
          disk: data.diskUsage,
          uptime: data.uptime,
          os: data.os,
          node_version: data.nodeVersion
        });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value) => {
    if (value > 80) return 'bg-red-500';
    if (value > 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="glass-panel w-full overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white/50">
        <div className="flex items-center space-x-2">
          <Server className="w-5 h-5 text-gray-700" />
          <h2 className="text-sm font-bold text-gray-800">Server Status</h2>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">mectov-server</span>
          <div className="px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 bg-green-100 text-green-700">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            Online
          </div>
        </div>
      </div>
      
      <div className="px-6 py-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4">
          
          <div className="flex-1 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center text-gray-600 font-medium">
                <Cpu className="w-4 h-4 mr-1.5 text-gray-400" /> CPU Usage
              </span>
              <span className="font-bold text-gray-800">{stats.cpu}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-1.5 rounded-full transition-all duration-1000 ease-in-out ${getStatusColor(stats.cpu)}`} 
                style={{ width: `${stats.cpu}%` }} 
              />
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center text-gray-600 font-medium">
                <MemoryStick className="w-4 h-4 mr-1.5 text-gray-400" /> RAM Usage
              </span>
              <span className="font-bold text-gray-800">{stats.ram}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-1.5 rounded-full transition-all duration-1000 ease-in-out ${getStatusColor(stats.ram)}`} 
                style={{ width: `${stats.ram}%` }} 
              />
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center text-gray-600 font-medium">
                <HardDrive className="w-4 h-4 mr-1.5 text-gray-400" /> Disk Usage
              </span>
              <span className="font-bold text-gray-800">{stats.disk}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-1.5 rounded-full transition-all duration-1000 ease-in-out ${getStatusColor(stats.disk)}`} 
                style={{ width: `${stats.disk}%` }} 
              />
            </div>
          </div>

        </div>
      </div>

      <div className="px-6 py-3 bg-gray-50/50 flex flex-wrap gap-4 text-xs font-medium text-gray-500">
        <div className="flex items-center">
          <span className="w-max">Uptime: <span className="text-gray-700 ml-1">{stats.uptime}</span></span>
        </div>
        <div className="flex items-center">
          <span className="w-max">Node.js <span className="text-gray-700 ml-1">{stats.node_version}</span></span>
        </div>
      </div>
    </div>
  );
};

export default ServerStatus;
