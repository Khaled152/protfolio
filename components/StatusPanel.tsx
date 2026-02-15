
import React from 'react';

interface StatusPanelProps {
  operatorBio: string;
  tacticalTags: string[];
  yearsExperience: string;
  projectsCompleted: string;
  location: string;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ 
  operatorBio, 
  tacticalTags,
  yearsExperience,
  projectsCompleted,
  location
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-12 border border-slate-200 dark:border-slate-700 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6">About Me</h2>
        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg">
          {operatorBio.split('\n').map((para, i) => (
            <p key={i} className="mb-4">{para}</p>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Core Focus</h3>
        <div className="flex flex-wrap gap-2">
          {tacticalTags.map(tag => (
            <span key={tag} className="px-3 md:px-4 py-1.5 md:py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg md:rounded-full text-xs font-bold border border-slate-200 dark:border-slate-600 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-slate-100 dark:border-slate-700 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div className="space-y-1">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Experience</p>
          <p className="text-sm md:text-lg font-bold text-slate-900 dark:text-white">{yearsExperience}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Projects</p>
          <p className="text-sm md:text-lg font-bold text-slate-900 dark:text-white">{projectsCompleted}</p>
        </div>
        <div className="space-y-1 col-span-2 md:col-span-1">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Location</p>
          <p className="text-sm md:text-lg font-bold text-slate-900 dark:text-white">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusPanel;
