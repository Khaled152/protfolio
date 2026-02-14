
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
  const [showLiveView, setShowLiveView] = useState(false);

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
        // Automatically open live view if a link exists
        if (selected.links?.live) {
          setTimeout(() => setShowLiveView(true), 500);
        }
        setTimeout(() => {
          setIsScanning(false);
          setScanStatus('IDLE');
        }, 1500);
      }
    }, intervalTime);
  };

  if (!selected) return <div className="text-cyan-900 font-hud">NO_PROJECT_DATA_AVAILABLE</div>;

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full relative">
      {/* Live Preview Modal */}
      {showLiveView && selected.links?.live && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 flex flex-col p-4 md:p-10 animate-in fade-in zoom-in duration-300">
          <div className="hud-border hud-border-tl hud-border-tr hud-border-bl hud-border-br flex-1 flex flex-col overflow-hidden relative">
            <div className="h-10 border-b border-cyan-500/30 flex items-center justify-between px-4 bg-cyan-950/20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 animate-pulse rounded-full" />
                <span className="text-[10px] font-hud text-cyan-400 uppercase tracking-widest">LIVE_UPLINK_ESTABLISHED: {selected.title}</span>
              </div>
              <button 
                onClick={() => setShowLiveView(false)}
                className="text-cyan-500 hover:text-rose-500 font-hud text-xs tracking-widest transition-colors uppercase"
              >
                [ TERMINATE_SESSION ]
              </button>
            </div>
            <div className="flex-1 bg-black relative">
               <div className="absolute inset-0 pointer-events-none border-4 border-cyan-500/10 z-10" />
               <iframe 
                src={selected.links.live} 
                className="w-full h-full border-none grayscale-[0.2] hover:grayscale-0 transition-all"
                title={`Live Preview: ${selected.title}`}
               />
            </div>
            <div className="h-8 border-t border-cyan-500/30 bg-cyan-950/40 flex items-center px-4 justify-between">
                <div className="text-[8px] text-cyan-700 font-hud">ENCRYPTION: AES_256 // TUNNEL: SECURE</div>
                <div className="text-[8px] text-cyan-700 font-hud">REMOTE_HOST: {new URL(selected.links.live).hostname}</div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full md:w-1/3 flex flex-col gap-2">
        <div className="text-[10px] text-cyan-600 mb-1 uppercase px-1 font-hud">Active_Tasks</div>
        <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-2 custom-scroll">
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
                  ? 'bg-cyan-500/10 border-cyan-400 text-cyan-200 shadow-[inset_0_0_10px_rgba(34,211,238,0.1)]' 
                  : 'bg-slate-900/40 border-cyan-900/30 text-cyan-700 hover:border-cyan-700'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] opacity-50 font-hud tracking-tighter">ID: {p.id}</span>
                <span className={`text-[8px] px-1 border font-hud ${
                  p.status === 'ONLINE' ? 'border-emerald-500 text-emerald-500' : 
                  p.status === 'STANDBY' ? 'border-amber-500 text-amber-500' : 'border-rose-500 text-rose-500'
                }`}>{p.status}</span>
              </div>
              <div className="text-sm font-hud truncate uppercase">{p.title}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 hud-border hud-border-tr p-6 relative overflow-hidden flex flex-col min-h-[500px]">
        <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-cyan-500/10 pointer-events-none" />
        
        {/* Project Visuals */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <div className="text-[10px] text-cyan-500/50 font-hud mb-1 tracking-widest uppercase">NAME_STR: {selected.title}</div>
              <h2 className="text-3xl font-hud text-cyan-400 mb-0 uppercase tracking-wider">{selected.title}</h2>
              {selected.subtitle && (
                <div className="text-[10px] text-amber-500 font-hud uppercase tracking-[0.3em] mb-4 mt-1">
                  {selected.subtitle}
                </div>
              )}
              <div className="flex flex-wrap gap-2 mb-6">
                {selected.technologies.map(tech => (
                  <span key={tech} className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 border border-cyan-500/30 font-hud uppercase">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-sm text-cyan-300/80 leading-relaxed font-light">
                {selected.description}
              </p>
            </div>
          </div>
          
          <div className="relative group overflow-hidden border border-cyan-500/20 bg-black/40 h-48 xl:h-auto">
             {selected.imageUrl ? (
               <img src={selected.imageUrl} alt={selected.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0" />
             ) : (
               <div className="w-full h-full flex items-center justify-center text-cyan-900 font-hud text-[10px]">NO_VISUAL_AVAILABLE</div>
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
             <div className="absolute bottom-2 left-2 text-[8px] text-cyan-500/50 font-hud uppercase">Visual_Reference_ID: {selected.id}</div>
          </div>
        </div>

        {selected.links && (Object.values(selected.links).some(Boolean)) && (
          <div className="mb-8 flex flex-col gap-2">
            <div className="text-[10px] text-cyan-700 font-hud uppercase tracking-widest">External_Uplinks</div>
            <div className="flex gap-4">
              {selected.links.live && (
                <a 
                  href={selected.links.live} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 border border-cyan-500 text-[10px] font-hud text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all flex items-center gap-2 uppercase tracking-widest shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  Live_Deploy
                </a>
              )}
              {selected.links.github && (
                <a 
                  href={selected.links.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 border border-cyan-900 text-[10px] font-hud text-cyan-600 hover:border-cyan-400 hover:text-cyan-400 transition-all flex items-center gap-2 uppercase tracking-widest"
                >
                   <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  Repository
                </a>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 border-t border-cyan-900/30 pt-6 mt-auto">
          {Object.entries(selected.metrics).map(([key, val]) => (
            <div key={key}>
              <div className="text-[9px] text-cyan-500/50 uppercase mb-1 font-hud tracking-widest">{key}</div>
              <div className="text-xl font-hud text-cyan-400">{val}%</div>
              <div className="w-full h-1 bg-cyan-900/30 mt-1">
                <div 
                  className="h-full bg-cyan-500 transition-all duration-1000 shadow-[0_0_8px_rgba(34,211,238,0.5)]" 
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
            className={`relative px-8 py-3 border font-hud text-sm transition-all overflow-hidden min-w-[200px] tracking-widest uppercase ${
              scanStatus === 'SUCCESS' 
                ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10' 
                : 'border-cyan-400 text-cyan-400 hover:bg-cyan-400/10'
            } ${isScanning ? 'cursor-wait' : 'cursor-pointer active:scale-95'}`}
          >
            {isScanning && (
              <div 
                className="absolute inset-0 bg-cyan-500/20 transition-all duration-30"
                style={{ width: `${scanProgress}%` }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isScanning && <span className="w-2 h-2 bg-cyan-400 animate-ping rounded-full" />}
              {scanStatus === 'SUCCESS' ? 'UPLINK_ENGAGED' : isScanning ? `INITIALIZING_${scanProgress}%` : 'EXECUTE_INTERFACE'}
            </span>
          </button>
          
          {selected.links?.live && !isScanning && scanStatus !== 'SUCCESS' && (
             <button 
              onClick={() => setShowLiveView(true)}
              className="px-6 py-3 border border-amber-500/30 text-amber-500 font-hud text-[10px] hover:bg-amber-500/10 transition-all tracking-widest uppercase"
             >
               DIRECT_UPLINK
             </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPanel;
