
import React, { useState, useEffect } from 'react';
import { Project } from '../types';

interface ProjectPanelProps {
  projects: Project[];
}

const ensureAbsoluteUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:')) {
    return url;
  }
  return `https://${url}`;
};

const ProjectPanel: React.FC<ProjectPanelProps> = ({ projects }) => {
  const [selectedId, setSelectedId] = useState<string>(projects[0]?.id || '');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState<'IDLE' | 'SUCCESS'>('IDLE');
  const [showLiveView, setShowLiveView] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

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
        if (selected.links?.live) {
          setTimeout(() => {
            setShowLiveView(true);
            setIsMaximized(false); 
          }, 500);
        }
        setTimeout(() => {
          setIsScanning(false);
          setScanStatus('IDLE');
        }, 1500);
      }
    }, intervalTime);
  };

  if (!selected) return <div className="text-cyan-900 font-hud text-xs p-4">NO_PROJECT_DATA_AVAILABLE</div>;

  const liveUrl = ensureAbsoluteUrl(selected.links?.live || '');
  const githubUrl = ensureAbsoluteUrl(selected.links?.github || '');

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full relative">
      {/* HUD Window: Live Preview */}
      {showLiveView && liveUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md pointer-events-auto" onClick={() => setShowLiveView(false)} />
          
          <div className={`hud-border hud-border-tl hud-border-tr hud-border-bl hud-border-br bg-[#020617] flex flex-col overflow-hidden relative shadow-[0_0_100px_rgba(34,211,238,0.2)] pointer-events-auto transition-all duration-500 ease-in-out border-cyan-500/50 ${
            isMaximized ? 'w-full h-full' : 'w-full md:w-[80%] lg:w-[70%] h-[80%] rounded-sm'
          }`}>
            {/* Window Header */}
            <div className="h-10 border-b border-cyan-500/30 flex items-center justify-between px-4 bg-cyan-950/40 select-none">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 animate-pulse rounded-full shadow-[0_0_8px_#10b981]" />
                <span className="text-[10px] font-hud text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                  UPLINK_LIVE // {selected.title}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="text-cyan-500 hover:text-cyan-300 font-hud text-[9px] tracking-[0.2em] transition-all uppercase px-2 py-1 border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/20"
                >
                  {isMaximized ? '[ EXIT_FULLSCREEN ]' : '[ MAXIMIZE_WINDOW ]'}
                </button>
                <button 
                  onClick={() => setShowLiveView(false)}
                  className="text-rose-500 hover:text-rose-400 font-hud text-[9px] tracking-[0.2em] transition-all uppercase px-2 py-1 border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/20"
                >
                  [ TERMINATE ]
                </button>
              </div>
            </div>

            {/* Iframe Viewport */}
            <div className="flex-1 bg-black relative">
               <div className="absolute inset-0 pointer-events-none border-t border-cyan-500/20 z-10" />
               <iframe 
                src={liveUrl} 
                className="w-full h-full border-none bg-slate-900"
                title={`Live Preview: ${selected.title}`}
               />
               {/* Scanning overlay */}
               <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-cyan-500/5 to-transparent h-32 animate-[scan_4s_infinite]" />
            </div>

            {/* Window Footer */}
            <div className="h-8 border-t border-cyan-500/30 bg-cyan-950/40 flex items-center px-4 justify-between">
                <div className="flex gap-4">
                  <div className="text-[8px] text-cyan-700 font-hud uppercase tracking-tighter">SIGNAL: 99% STABLE</div>
                  <div className="text-[8px] text-cyan-700 font-hud uppercase tracking-tighter">HOST: {new URL(liveUrl).hostname}</div>
                </div>
                <div className="text-[8px] text-cyan-700 font-hud uppercase">OS: OPERATOR_RUNTIME_v4.2</div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full md:w-1/3 flex flex-col gap-2">
        <div className="text-[10px] text-cyan-600 mb-1 uppercase px-1 font-hud tracking-[0.2em]">Active_Tactical_Manifest</div>
        <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-2 custom-scroll">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedId(p.id);
                setIsScanning(false);
                setScanStatus('IDLE');
              }}
              className={`text-left p-4 border transition-all duration-300 ${
                selectedId === p.id 
                  ? 'bg-cyan-500/10 border-cyan-400 text-cyan-200 shadow-[inset_0_0_15px_rgba(34,211,238,0.1)] translate-x-1' 
                  : 'bg-slate-900/40 border-cyan-900/30 text-cyan-800 hover:border-cyan-700 hover:text-cyan-600'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] opacity-50 font-hud tracking-tighter">UID: {p.id}</span>
                <span className={`text-[8px] px-1 border font-hud ${
                  p.status === 'ONLINE' ? 'border-emerald-500 text-emerald-500' : 
                  p.status === 'STANDBY' ? 'border-amber-500 text-amber-500' : 'border-rose-500 text-rose-500'
                }`}>{p.status}</span>
              </div>
              <div className="text-sm font-hud truncate uppercase tracking-widest">{p.title}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 hud-border hud-border-tr p-8 relative overflow-hidden flex flex-col min-h-[550px]">
        <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-cyan-500/10 pointer-events-none" />
        
        {/* Project Profile */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <div className="text-[10px] text-cyan-500/50 font-hud mb-1 tracking-[0.3em] uppercase">PROJECT_MODULE // {selected.id}</div>
              <h2 className="text-4xl font-hud text-cyan-400 mb-0 uppercase tracking-[0.2em]">{selected.title}</h2>
              {selected.subtitle && (
                <div className="text-[11px] text-amber-500 font-hud uppercase tracking-[0.4em] mb-4 mt-2 border-b border-amber-500/20 pb-2 inline-block">
                  {selected.subtitle}
                </div>
              )}
              <div className="flex flex-wrap gap-2 mb-6">
                {selected.technologies.map(tech => (
                  <span key={tech} className="text-[9px] bg-cyan-500/5 text-cyan-400 px-3 py-1 border border-cyan-500/20 font-hud uppercase tracking-widest">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-sm text-cyan-300/80 leading-relaxed font-light text-justify">
                {selected.description}
              </p>
            </div>
          </div>
          
          <div className="relative group overflow-hidden border border-cyan-500/20 bg-black/40 h-56 xl:h-auto shadow-2xl">
             {selected.imageUrl ? (
               <img src={selected.imageUrl} alt={selected.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-1000 grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100" />
             ) : (
               <div className="w-full h-full flex items-center justify-center text-cyan-900 font-hud text-[10px]">NO_VISUAL_STREAM</div>
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
             <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                <div className="text-[9px] text-cyan-500/70 font-hud uppercase tracking-widest">VISUAL_FEED: {selected.id}</div>
             </div>
          </div>
        </div>

        {/* Uplink Actions */}
        {(selected.links?.live || selected.links?.github) && (
          <div className="mb-10 flex flex-col gap-3">
            <div className="text-[10px] text-cyan-700 font-hud uppercase tracking-[0.3em] px-1">Tactical_Uplinks</div>
            <div className="flex flex-wrap gap-4">
              {selected.links?.live && (
                <a 
                  href={liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-2 border border-cyan-400 text-[10px] font-hud text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all flex items-center gap-2 uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  Live_Node
                </a>
              )}
              {selected.links?.github && (
                <a 
                  href={githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-2 border border-cyan-900 text-[10px] font-hud text-cyan-700 hover:border-cyan-400 hover:text-cyan-400 transition-all flex items-center gap-2 uppercase tracking-[0.2em]"
                >
                   <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  Repository
                </a>
              )}
            </div>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-6 border-t border-cyan-900/30 pt-8 mt-auto">
          {Object.entries(selected.metrics).map(([key, val]) => (
            <div key={key}>
              <div className="text-[10px] text-cyan-500/40 uppercase mb-2 font-hud tracking-[0.2em]">{key}</div>
              <div className="text-2xl font-hud text-cyan-300 tracking-tighter">{val}%</div>
              <div className="w-full h-1 bg-cyan-950 mt-2 relative overflow-hidden">
                <div 
                  className="h-full bg-cyan-500 transition-all duration-[2000ms] ease-out shadow-[0_0_10px_rgba(34,211,238,0.8)]" 
                  style={{ width: `${val}%` }} 
                />
              </div>
            </div>
          ))}
        </div>

        {/* Execute Action */}
        <div className="mt-10 flex items-center gap-4">
          <button 
            onClick={handleExecute}
            disabled={isScanning}
            className={`relative px-10 py-4 border font-hud text-base transition-all overflow-hidden min-w-[240px] tracking-[0.3em] uppercase ${
              scanStatus === 'SUCCESS' 
                ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10' 
                : 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]'
            } ${isScanning ? 'cursor-wait' : 'cursor-pointer active:scale-95 group'}`}
          >
            {isScanning && (
              <div 
                className="absolute inset-0 bg-cyan-500/20 transition-all duration-30 border-r-2 border-cyan-400"
                style={{ width: `${scanProgress}%` }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-3">
              {isScanning && <span className="w-2.5 h-2.5 bg-cyan-400 animate-ping rounded-full" />}
              {scanStatus === 'SUCCESS' ? 'UPLINK_SUCCESS' : isScanning ? `ESTABLISHING_${scanProgress}%` : 'EXECUTE_INTERFACE'}
            </span>
          </button>
          
          {selected.links?.live && !isScanning && scanStatus !== 'SUCCESS' && (
             <button 
              onClick={() => {
                setShowLiveView(true);
                setIsMaximized(false);
              }}
              className="px-6 py-4 border border-amber-500/20 text-amber-500 font-hud text-[10px] hover:bg-amber-500/10 hover:border-amber-500 transition-all tracking-[0.4em] uppercase"
             >
               VIRTUAL_UPLINK
             </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPanel;
