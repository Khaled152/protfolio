
import React, { useState, useEffect } from 'react';
import { OPERATOR_NAME } from '../constants';

const Header: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 flex items-center justify-between px-4 hud-border hud-border-tl hud-border-tr">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 border border-cyan-500/50 flex items-center justify-center">
          <div className="w-6 h-6 bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <div className="w-2 h-2 bg-cyan-400 animate-ping rounded-full" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-hud font-bold tracking-[0.2em] text-cyan-400 uppercase">{OPERATOR_NAME}</h1>
          <div className="text-[10px] text-cyan-500/70 flex gap-4 font-hud">
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 bg-emerald-500 rounded-full" />
              STATUS: ONLINE
            </span>
            <span className="hidden sm:block">RANK: SENIOR_ARCHITECT</span>
            <span className="hidden md:block">EXP_POINTS: 85,200</span>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex flex-col items-end font-hud text-sm">
        <div className="text-cyan-300 flex items-baseline gap-2">
           <span className="text-[10px] opacity-40">UTC_SIGNAL:</span>
           {time.toLocaleTimeString([], { hour12: false })}
        </div>
        <div className="text-[10px] text-cyan-500/50">SECTOR: HUB_71</div>
      </div>
    </header>
  );
};

export default Header;
