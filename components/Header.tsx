
import React from 'react';

interface HeaderProps {
  operatorName: string;
}

const Header: React.FC<HeaderProps> = ({ operatorName }) => {
  return (
    <header className="h-20 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
          {operatorName.charAt(0)}
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-none">{operatorName}</h1>
          <p className="text-xs text-slate-500 mt-1">Fullstack Engineer</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Available for new projects
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all shadow-md">
          Download Resume
        </button>
      </div>
    </header>
  );
};

export default Header;
