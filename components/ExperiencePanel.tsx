
import React from 'react';
import { Experience } from '../types';

interface ExperiencePanelProps {
  experience: Experience[];
}

const ExperiencePanel: React.FC<ExperiencePanelProps> = ({ experience }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-10">Professional History</h2>
        
        <div className="space-y-12 relative before:absolute before:inset-y-0 before:left-0 md:before:left-1/2 before:w-px before:bg-slate-200 dark:before:bg-slate-700 before:-translate-x-px">
          {experience.map((exp, i) => (
            <div key={exp.id} className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className="hidden md:block w-1/2"></div>
              
              <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-slate-800 shadow-md z-10 -translate-x-[7px] md:-translate-x-2"></div>
              
              <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900 transition-all hover:shadow-lg">
                  <div className="text-blue-600 dark:text-blue-400 font-bold text-sm mb-1">{exp.period}</div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{exp.role}</h4>
                  <div className="text-slate-500 dark:text-slate-500 font-medium mb-4">{exp.company}</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 italic leading-relaxed">{exp.description}</p>
                  <ul className={`space-y-2 text-sm text-slate-700 dark:text-slate-300 ${i % 2 === 0 ? 'md:items-end' : 'md:items-start'} flex flex-col`}>
                    {exp.achievements.map((ach, j) => (
                      <li key={j} className="flex gap-2 items-start">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></span>
                        {ach}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperiencePanel;
