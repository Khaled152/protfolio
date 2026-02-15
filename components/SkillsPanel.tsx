
import React, { useState, useEffect } from 'react';
import { Skill } from '../types';

interface SkillsPanelProps {
  skills: Skill[];
}

const SkillsPanel: React.FC<SkillsPanelProps> = ({ skills }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Technical Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {skills.map((skill, i) => (
            <div key={i} className="space-y-3 group">
              <div className="flex justify-between items-end">
                <h4 className="font-semibold text-slate-700 dark:text-slate-300">{skill.name}</h4>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{skill.level}%</span>
              </div>
              
              <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: mounted ? `${skill.level}%` : '0%', 
                    backgroundColor: skill.color || '#3b82f6'
                  }}
                />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                {skill.details}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Tools & Setup</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Workstation', value: 'M2 Max Macbook' },
            { label: 'Primary IDE', value: 'VS Code' },
            { label: 'Deployment', value: 'Vercel / AWS' },
            { label: 'Source Control', value: 'GitHub Enterprise' },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
              <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">{item.label}</div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsPanel;
