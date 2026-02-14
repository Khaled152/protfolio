
import React, { useState, useEffect } from 'react';
import { Project } from '../types';

interface ProjectPanelProps {
  projects: Project[];
}

const ProjectPanel: React.FC<ProjectPanelProps> = ({ projects }) => {
  const [selectedId, setSelectedId] = useState<string>(projects[0]?.id || '');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState<'IDLE' | 'SUCCESS'>('IDLE');

  // Ensure selected ID is valid if projects change
  useEffect(() => {
    if (!projects.find(p => p.id === selectedId) && projects.length > 0) {
      setSelectedId(projects[0].id);
    }
  }, [projects, selectedId]);

  const selected = projects.find(p => p.id === selectedId) || projects[0];

  const handleExecute = () => {
    if (isScanning || !selected) return;
    
    setIsScanning(true);
    setScanProgress(0);
    setScanStatus('IDLE');

    const duration = 1500;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setScanProgress(progress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setScanStatus('SUCCESS');
        setTimeout(() => {
          setIsScanning(false);
          setScanStatus('IDLE');
        }, 1500);
      }
    }, intervalTime);
  };

  if (!selected) return <div className="text-cyan-900 font-hud">NO_PROJECT_DATA_AVAILABLE</div>;

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full">
      <div className="w-full md:w-1/3 flex flex-col gap-2">
        <div className="text-[10px] text-cyan-600 mb-1 uppercase px-1">Active_Tasks</div>
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setSelectedId(p.id);
              setIsScanning(false);
              setScanStatus('IDLE');
            }}
            className={`text-left p-3 border transition-all ${
              selectedId === p.id 
                ? 'bg-cyan-500/10 border-cyan-400 text-cyan-200' 
                : 'bg-slate-900/40 border-cyan-900/30 text-cyan-700 hover:border-cyan-700'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] opacity-50 font-hud">ID: {p.id}</span>
              <span className={`text-[8px] px-1 border ${
                p.status === 'ONLINE' ? 'border-emerald-500 text-emerald-500' : 
                p.status === 'STANDBY' ? 'border-amber-500 text-amber-500' : 'border-rose-500 text-rose-500'
              }`}>{p.status}</span>
            </div>
            <div className="text-sm font-hud truncate">{p.title}</div>
          </button>
        ))}
      </div>

      <div className="flex-1 hud-border hud-border-tr p-6 relative overflow-hidden min-h-[400px]">
        <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-cyan-500/20 pointer-events-none" />
        
        <div className="mb-6">
          <div className="text-[10px] text-cyan-500/50 font-hud mb-1">NAME_STR: {selected.title}</div>
          <h2 className="text-3xl font-hud text-cyan-400 mb-2">{selected.title}</h2>
          <div className="flex gap-2 mb-6">
            {selected.technologies.map(tech => (
              <span key={tech} className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 border border-cyan-500/30">
                {tech}
              </span>
            ))}
          </div>
          <p className="text-sm text-cyan-300/80 leading-relaxed max-w-xl">
            {selected.description}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 border-t border-cyan-900/30 pt-6">
          {Object.entries(selected.metrics).map(([key, val]) => (
            <div key={key}>
              <div className="text-[9px] text-cyan-500/50 uppercase mb-1">{key}</div>
              <div className="text-xl font-hud text-cyan-400">{val}%</div>
              <div className="w-full h-1 bg-cyan-900/30 mt-1">
                <div 
                  className="h-full bg-cyan-500 transition-all duration-1000" 
                  style={{ width: `${val}%` }} 
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-4">
          <button 
            onClick={handleExecute}
            disabled={isScanning}
            className={`relative px-8 py-3 border font-hud text-sm transition-all overflow-hidden min-w-[200px] ${
              scanStatus === 'SUCCESS' 
                ? 'border-emerald-500 text-emerald-500' 
                : 'border-cyan-400 text-cyan-400 hover:bg-cyan-400/10'
            } ${isScanning ? 'cursor-wait' : 'cursor-pointer active:scale-95'}`}
          >
            {isScanning && (
              <div 
                className="absolute inset-0 bg-cyan-500/20 transition-all duration-30"
                style={{ width: `${scanProgress}%` }}
              />
            )}
            <span className="relative z-10">
              {scanStatus === 'SUCCESS' ? 'SCAN_SUCCESS' : isScanning ? `SCANNING_${scanProgress}%` : 'EXECUTE_INTERFACE'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectPanel;
