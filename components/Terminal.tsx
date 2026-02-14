
import React, { useRef, useEffect } from 'react';
import { LogEntry } from '../types';

interface TerminalProps {
  logs: LogEntry[];
}

const Terminal: React.FC<TerminalProps> = ({ logs }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [logs]);

  return (
    <div className="h-32 md:h-40 hud-border hud-border-bl hud-border-br bg-black/80 flex flex-col">
      <div className="h-6 flex items-center justify-end px-3 border-b border-cyan-900/30 bg-cyan-950/20">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
          <div className="w-2 h-2 rounded-full bg-amber-500/50" />
          <div className="w-2 h-2 rounded-full bg-rose-500/50" />
        </div>
      </div>
      <div 
        ref={containerRef}
        className="flex-1 p-2 overflow-y-auto font-mono text-[10px] md:text-xs custom-scroll"
      >
        {logs.map((log, i) => (
          <div key={i} className="flex gap-3 mb-1 animate-in fade-in slide-in-from-left-2 duration-300">
            <span className="text-cyan-900 shrink-0">[{log.timestamp}]</span>
            <span className={`shrink-0 ${
              log.type === 'ERROR' ? 'text-rose-500' : 
              log.type === 'WARNING' ? 'text-amber-500' : 
              log.type === 'SYSTEM' ? 'text-indigo-400' : 'text-cyan-400'
            }`}>
              {log.type}:
            </span>
            <span className="text-cyan-100/70">{log.message}</span>
          </div>
        ))}
        {logs.length === 0 && <div className="text-cyan-900 italic">No activity recorded...</div>}
      </div>
    </div>
  );
};

export default Terminal;
