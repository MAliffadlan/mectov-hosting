import { useState, useEffect } from 'react';
import { getServerStatus } from '@/api/api';
import { Cpu, HardDrive, Clock, Wifi } from 'lucide-react';

const ServerStatus = () => {
  const [stats, setStats] = useState({
    cpu: 0, ram: 0, disk: 0, uptime: '0s', node_version: ''
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

  const getColor = (v) => {
    if (v > 80) return 'gradient-red';
    if (v > 60) return 'gradient-amber';
    return 'gradient-green';
  };

  const metrics = [
    { label: 'CPU', value: stats.cpu, icon: Cpu },
    { label: 'Memory', value: stats.ram, icon: HardDrive },
    { label: 'Storage', value: stats.disk, icon: HardDrive },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {/* Status Card */}
      <div className="surface p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <Wifi className="w-4 h-4 text-[#4ade80]" />
          <div className="badge badge-success">
            <span className="glow-dot"></span>
            Live
          </div>
        </div>
        <div>
          <div className="text-[22px] font-bold text-white">{stats.uptime || '—'}</div>
          <div className="text-[12px] text-[#525252] mt-1">Uptime</div>
        </div>
      </div>

      {/* Metric Cards */}
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div key={m.label} className="surface p-5">
            <div className="flex items-center justify-between mb-4">
              <Icon className="w-4 h-4 text-[#525252]" />
              <span className="text-[22px] font-bold text-white">{m.value || 0}%</span>
            </div>
            <div className="progress-track mb-2">
              <div className={`progress-fill ${getColor(m.value)}`} style={{ width: `${m.value || 0}%` }} />
            </div>
            <div className="text-[12px] text-[#525252]">{m.label} Usage</div>
          </div>
        );
      })}
    </div>
  );
};

export default ServerStatus;
