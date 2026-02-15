
import React from 'react';

interface StatusPanelProps {
  operatorBio: string;
  tacticalTags: string[];
}

const StatusPanel: React.FC<StatusPanelProps> = ({ operatorBio, tacticalTags }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">About Me</h2>
        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
          {operatorBio.split('\n').map((para, i) => (
            <p key={i} className="mb-4">{para}</p>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Core Focus</h3>
        <div className="flex flex-wrap gap-2">
          {tacticalTags.map(tag => (
            <span key={tag} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-600 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-700 grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="space-y-1">
          <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Experience</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">8+ Years</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Projects</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">50+ Completed</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Location</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">San Francisco, CA</p>
        </div>
      </div>
    </div>
  );
};

export default StatusPanel;
