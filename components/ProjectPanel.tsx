
import React, { useState, useEffect } from 'react';
import { Project } from '../types';

interface ProjectPanelProps {
  projects: Project[];
}

/**
 * Ensures URLs are treated as absolute by prefixing https:// if missing.
 * This prevents the browser from prepending the current domain to the URL.
 */
const ensureAbsoluteUrl = (url: string) => {
  if (!url) return '';
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('mailto:')) {
    return trimmed;
  }
  return `https://${trimmed}`;
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
            setIsMaximized(false); // Default to windowed mode as requested
          }, 500);
        }
        setTimeout(() => {
          setIsScanning(false);
          setScanStatus('IDLE');
        }, 1500);
      }
    }, intervalTime);
  };

  if (!selected) return <div className="text-cyan-900 font-hud text-xs p-4 tracking-widest uppercase">No_Project_Data_Detected</div>;

  const liveUrl = ensureAbsoluteUrl(selected.links?.live || '');
  const githubUrl = ensureAbsoluteUrl(selected.links?.github || '');

  // Extract hostname for the UI
  let displayHost = 'UNKNOWN_TARGET';
  try {
    if (liveUrl) displayHost = new URL(liveUrl).hostname;
  } catch(e) {}

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full relative">
      {/* HUD TACTICAL WINDOW: Live Preview */}
      {showLiveView && liveUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl pointer-events-auto" onClick={() => setShowLiveView(false)} />
          
          <div className={`hud-border hud-border-tl hud-border-tr hud-border-bl hud-border-br bg-[#020617] flex flex-col overflow-hidden relative shadow-[0_0_100px_rgba(34,211,238,0.35)] pointer-events-auto transition-all duration-500 ease-in-out border-cyan-500/50 ${
            isMaximized ? 'w-full h-full' : 'w-full md:w-[85%] lg:w-[75%] h-[80%] rounded-sm'
          }`}>
            {/* Window Header */}
            <div className="h-14 border-b border-cyan-500/30 flex items-center justify-between px-6 bg-cyan-950/40 select-none">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-emerald-500 animate-pulse rounded-full shadow-[0_0_12px_#10b981]" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-hud text-cyan-400 uppercase tracking-[0.3em]">UPLINK_LIVE // {selected.title}</span>
                  <span className="text-[8px] text-cyan-700 font-hud uppercase tracking-[0.2em]">Target: {displayHost}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="text-cyan-500 hover:text-cyan-300 font-hud text-[10px] tracking-[0.2em] transition-all uppercase px-4 py-2 border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/20"
                >
                  {isMaximized ? '[ RESTORE_WINDOW ]' : '[ MAXIMIZE_VIEW ]'}
                </button>
                <button 
                  onClick={() => setShowLiveView(false)}
                  className="text-rose-500 hover:text-rose-400 font-hud text-[10px] tracking-[0.2em] transition-all uppercase px-4 py-2 border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/20"
                >
                  [ DISCONNECT ]
                </button>
              </div>
            </div>

            {/* Iframe Viewport with Fallback UI */}
            <div className="flex-1 bg-black relative flex flex-col overflow-hidden">
               {/* Fixed Notification for blocked iframes */}
               <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 px-6 py-3 bg-black/90 border border-amber-500/50 text-amber-500 flex flex-col items-center gap-3 shadow-2xl max-w-[90%] md:max-w-xl">
                 <div className="text-center font-hud text-[9px] tracking-[0.2em] uppercase leading-relaxed">
                   [!] SECURITY_NOTICE: Some platforms (Google, YouTube, etc.) block internal embedding.
                 </div>
                 <a 
                  href={liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-amber-500 text-black font-hud text-[10px] tracking-[0.3em] uppercase hover:bg-amber-400 transition-all font-bold"
                 >
                   MANUAL_OVERRIDE_OPEN_EXTERNAL
                 </a>
               </div>
               
               <div className="absolute inset-0 pointer-events-none border-t border-cyan-500/20 z-10" />
               <iframe 
                src={liveUrl} 
                className="flex-1 w-full border-none bg-slate-900"
                title={`Live Preview: ${selected.title}`}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
               />
               
               {/* Scanning overlay effect */}
               <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-cyan-500/5 to-transparent h-64 animate-[scan_6s_infinite]" />
            </div>

            {/* Window Footer Status Bar */}
            <div className="h-10 border-t border-cyan-500/30 bg-cyan-950/60 flex items-center px-6 justify-between">
                <div className="flex gap-8">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                    <div className="text-[9px] text-cyan-500 font-hud uppercase tracking-widest">SIGNAL: STABLE</div>
                  </div>
                  <div className="text-[9px] text-cyan-700 font-hud uppercase tracking-[0.2em] border-l border-cyan-900/50 pl-8">
                    LINK: {liveUrl.slice(0, 40)}{liveUrl.length > 40 ? '...' : ''}
                  </div>
                </div>
                <div className="text-[9px] text-cyan-800 font-hud uppercase italic tracking-[0.4em]">
                  SECURED_INTERFACE_RUNTIME_v4.2.0
                </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full md:w-1/3 flex flex-col gap-2">
        <div className="text-[10px] text-cyan-600 mb-1 uppercase px-1 font-hud tracking-[0.3em]">Tactical_Asset_Manifest</div>
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
                  ? 'bg-cyan-500/10 border-cyan-400 text-cyan-200 shadow-[inset_0_0_15px_rgba(34,211,238,0.2)] translate-x-1' 
                  : 'bg-slate-900/40 border-cyan-900/30 text-cyan-800 hover:border-cyan-700 hover:text-cyan-600'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] opacity-50 font-hud tracking-tighter">UID: {p.id}</span>
                <span className={`text-[8px] px-1 border font-hud ${
                  p.status === 'ONLINE' ? 'border-emerald-500 text-emerald-500' : 
                  p.status === 'STANDBY' ? 'border-amber-500 text-amber-500' : 'border-rose-500 text-rose-500'
                }`}>{p.status}</span>
              </div>
              <div className="text-sm font-hud truncate uppercase tracking-[0.1em]">{p.title}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 hud-border hud-border-tr p-8 relative overflow-hidden flex flex-col min-h-[550px]">
        <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-cyan-500/10 pointer-events-none" />
        
        {/* Project Detailed View */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-10">
          <div className="space-y-6">
            <div>
              <div className="text-[11px] text-cyan-500/50 font-hud mb-1 tracking-[0.4em] uppercase">MODULE_DATA // {selected.id}</div>
              <h2 className="text-4xl md:text-5xl font-hud text-cyan-400 mb-0 uppercase tracking-[0.2em]">{selected.title}</h2>
              {selected.subtitle && (
                <div className="text-[12px] text-amber-500 font-hud uppercase tracking-[0.5em] mb-4 mt-3 border-b border-amber-500/30 pb-2 inline-block">
                  {selected.subtitle}
                </div>
              )}
              <div className="flex flex-wrap gap-2.5 mb-8">
                {selected.technologies.map(tech => (
                  <span key={tech} className="text-[10px] bg-cyan-500/10 text-cyan-400 px-4 py-1.5 border border-cyan-500/20 font-hud uppercase tracking-widest">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-base text-cyan-100/80 leading-relaxed font-light text-justify">
                {selected.description}
              </p>
            </div>
          </div>
          
          <div className="relative group overflow-hidden border border-cyan-500/20 bg-black/40 h-64 xl:h-auto shadow-[0_0_40px_rgba(0,0,0,0.5)]">
             {selected.imageUrl ? (
               <img src={selected.imageUrl} alt={selected.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100" />
             ) : (
               <div className="w-full h-full flex items-center justify-center text-cyan-900 font-hud text-[11px] uppercase tracking-widest">No_Visual_Feed</div>
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
             <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                <div className="text-[10px] text-cyan-500/70 font-hud uppercase tracking-[0.3em]">VISUAL_STREAM: ACTIVE</div>
             </div>
          </div>
        </div>

        {/* Tactical Uplink Control */}
        <div className="mt-auto">
          <div className="grid grid-cols-3 gap-8 border-t border-cyan-900/40 pt-10 mb-10">
            {Object.entries(selected.metrics).map(([key, val]) => (
              <div key={key}>
                <div className="text-[11px] text-cyan-500/40 uppercase mb-3 font-hud tracking-[0.3em]">{key}</div>
                <div className="text-3xl font-hud text-cyan-300 tracking-tighter">{val}%</div>
                <div className="w-full h-1.5 bg-cyan-950 mt-3 relative overflow-hidden">
                  <div 
                    className="h-full bg-cyan-400 transition-all duration-[2500ms] ease-out shadow-[0_0_15px_rgba(34,211,238,0.9)]" 
                    style={{ width: `${val}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <button 
              onClick={handleExecute}
              disabled={isScanning}
              className={`relative px-12 py-5 border font-hud text-lg transition-all overflow-hidden min-w-[280px] tracking-[0.4em] uppercase ${
                scanStatus === 'SUCCESS' 
                  ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10' 
                  : 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]'
              } ${isScanning ? 'cursor-wait' : 'cursor-pointer active:scale-95 group'}`}
            >
              {isScanning && (
                <div 
                  className="absolute inset-0 bg-cyan-500/30 transition-all duration-30 border-r-2 border-cyan-400"
                  style={{ width: `${scanProgress}%` }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-4">
                {isScanning && <span className="w-3 h-3 bg-cyan-400 animate-ping rounded-full" />}
                {scanStatus === 'SUCCESS' ? 'LINK_ESTABLISHED' : isScanning ? `INITIALIZING_${scanProgress}%` : 'EXECUTE_INTERFACE'}
              </span>
            </button>
            
            {selected.links?.live && !isScanning && scanStatus !== 'SUCCESS' && (
               <button 
                onClick={() => {
                  setShowLiveView(true);
                  setIsMaximized(false);
                }}
                className="px-8 py-5 border border-amber-500/30 text-amber-500 font-hud text-[11px] hover:bg-amber-500/10 hover:border-amber-500 transition-all tracking-[0.5em] uppercase"
               >
                 TACTICAL_OVERLAY
               </button>
            )}

            {selected.links?.github && (
              <a 
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-hud text-cyan-800 hover:text-cyan-400 transition-colors uppercase tracking-[0.3em] flex items-center gap-2"
              >
                [ VIEW_SOURCE_CODE ]
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPanel;
