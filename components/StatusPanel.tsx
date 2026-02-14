
import React from 'react';

interface StatusPanelProps {
  operatorBio: string;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ operatorBio }) => {
  return (
    <div className="flex flex-col min-h-full p-2 md:p-4">
      <div className="hud-border hud-border-tl hud-border-br p-6 md:p-10 w-full bg-slate-900/40 backdrop-blur-md relative overflow-hidden group flex-1">
        <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-cyan-500/10 pointer-events-none group-hover:border-cyan-500/30 transition-colors" />
        
        <div className="flex items-center justify-between border-b border-cyan-900/50 pb-6 mb-8">
          <div className="flex flex-col gap-1">
            <h3 className="text-base md:text-lg text-cyan-400 font-hud uppercase tracking-[0.4em]">Operator_Profile</h3>
            <div className="text-[10px] text-cyan-700 font-hud tracking-widest">ENCRYPTION: AES-256-GCM // LEVEL_01_ACCESS</div>
          </div>
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]" />
            <div className="w-2.5 h-2.5 bg-cyan-900 rounded-full" />
            <div className="w-2.5 h-2.5 bg-cyan-900 rounded-full" />
          </div>
        </div>

        <div className="space-y-10">
          <div className="relative">
            <div className="absolute -left-10 -top-10 text-[120px] font-hud text-cyan-500/5 select-none pointer-events-none uppercase">
              Profile
            </div>
            
            <p className="text-lg md:text-xl leading-relaxed text-cyan-100/90 font-light text-justify relative z-10">
              <span className="text-5xl font-hud text-cyan-400 mr-4 float-left mt-2 line-height-1 uppercase border-b-2 border-r-2 border-cyan-500/30 p-2">
                {operatorBio.charAt(0)}
              </span>
              {operatorBio.slice(1)}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 pt-8 border-t border-cyan-900/30">
            {['REMOTE_READY', 'FULL_TIME', 'CONSULTING', 'ARCHITECT', 'FRONTEND_LEAD', 'UI_ENGINEER', 'MISSION_CRITICAL'].map(tag => (
              <span key={tag} className="px-4 py-2 border border-cyan-800 text-xs bg-cyan-900/10 font-hud text-cyan-600 hover:text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all cursor-default tracking-widest">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row justify-between items-end gap-6 opacity-40 hover:opacity-100 transition-opacity">
          <div className="flex flex-col gap-3">
            <div className="flex gap-4 items-center">
              <div className="text-[10px] text-cyan-600 font-hud">SYSTEM_STABILITY:</div>
              <div className="flex gap-1.5">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={`w-4 h-2 ${i < 10 ? 'bg-cyan-500' : 'bg-cyan-950'}`} />
                ))}
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="text-[10px] text-cyan-600 font-hud">CORE_LOAD_LEVEL:</div>
              <div className="flex gap-1.5">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={`w-4 h-2 ${i < 4 ? 'bg-amber-500' : 'bg-cyan-950'}`} />
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-[10px] text-cyan-700 font-mono tracking-tighter mb-1">
              REF_ID: //_OP_X99_JD_//_TIMESTAMP: {new Date().getFullYear()}.04.12
            </div>
            <div className="text-[10px] text-cyan-800 font-hud uppercase">
              Location: [40.7128° N, 74.0060° W]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPanel;
