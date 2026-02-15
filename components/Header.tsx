
import React from 'react';

interface HeaderProps {
  operatorName: string;
  operatorRole: string;
  resumeUrl: string;
}

const Header: React.FC<HeaderProps> = ({ operatorName, operatorRole, resumeUrl }) => {
  return (
    <header className="h-16 md:h-20 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">
      <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-base md:text-lg shadow-lg shrink-0">
          {operatorName.charAt(0)}
        </div>
        <div className="truncate">
          <h1 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white leading-none truncate">{operatorName}</h1>
          <p className="text-[10px] md:text-xs text-slate-500 mt-0.5 md:mt-1 truncate">{operatorRole}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-sm text-slate-600 dark:text-slate-400">
          <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]"></span>
          <span className="hidden sm:inline">Available for hire</span>
        </div>
        <a 
          href={resumeUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-5 py-1.5 md:py-2 rounded-lg text-[10px] md:text-sm font-bold transition-all shadow-md inline-block whitespace-nowrap"
        >
          Resume
        </a>
      </div>
    </header>
  );
};

export default Header;
