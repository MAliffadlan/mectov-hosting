import { useState, useEffect } from 'react';
import { getServerStatus } from '@/api/api';

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

  return (
    <div className="neo-panel w-full overflow-hidden mb-8">
      <div className="px-5 py-3 border-b border-[#E5E3D8] flex items-center justify-between">
        <h2 className="text-[13px] font-semibold text-[#171717] tracking-tight">System Status</h2>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-[#737373] uppercase tracking-widest">mectov-srv-01</span>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
            </span>
            <span className="text-[11px] font-semibold text-[#10b981] uppercase tracking-wider">Operational</span>
          </div>
        </div>
      </div>
      
      <div className="px-5 py-5 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E5E3D8] gap-4 md:gap-0">
        
        {/* CPU */}
        <div className="flex flex-col md:pr-6 pt-2 md:pt-0">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-[12px] font-medium text-[#737373]">CPU</span>
            <span className="text-[14px] font-semibold text-[#171717] tracking-tighter">{stats.cpu}%</span>
          </div>
          <div className="w-full bg-[#F5F5F0] h-[3px] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#171717] rounded-full transition-all duration-700 ease-out" 
              style={{ width: `${stats.cpu}%` }} 
            />
          </div>
        </div>

        {/* RAM */}
        <div className="flex flex-col md:px-6 pt-4 md:pt-0">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-[12px] font-medium text-[#737373]">Memory</span>
            <span className="text-[14px] font-semibold text-[#171717] tracking-tighter">{stats.ram}%</span>
          </div>
          <div className="w-full bg-[#F5F5F0] h-[3px] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#171717] rounded-full transition-all duration-700 ease-out" 
              style={{ width: `${stats.ram}%` }} 
            />
          </div>
        </div>

        {/* Disk */}
        <div className="flex flex-col md:pl-6 pt-4 md:pt-0">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-[12px] font-medium text-[#737373]">Storage</span>
            <span className="text-[14px] font-semibold text-[#171717] tracking-tighter">{stats.disk}%</span>
          </div>
          <div className="w-full bg-[#F5F5F0] h-[3px] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#a3a3a3] rounded-full transition-all duration-700 ease-out" 
              style={{ width: `${stats.disk}%` }} 
            />
          </div>
        </div>

      </div>

      <div className="px-5 py-2.5 border-t border-[#E5E3D8] bg-[#FAFAFA] flex items-center justify-between text-[11px] font-medium text-[#737373]">
        <div>Uptime: <span className="text-[#171717]">{stats.uptime}</span></div>
        <div>Engine: <span className="text-[#171717]">{stats.node_version}</span></div>
      </div>
    </div>
  );
};

export default ServerStatus;
