
import React from 'react';
import { Experience } from '../types';

interface ExperiencePanelProps {
  experience: Experience[];
}

const ExperiencePanel: React.FC<ExperiencePanelProps> = ({ experience }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 border-b border-cyan-900/50 pb-2 mb-2">
        <h3 className="font-hud text-lg text-cyan-400 tracking-widest">CAREER_LOGS</h3>
        <div className="h-[1px] flex-1 bg-cyan-900/30" />
        <div className="text-[10px] text-cyan-700">TOTAL_ENTRIES: {experience.length}</div>
      </div>

      <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-4 before:w-[1px] before:bg-cyan-900/30">
        {experience.map((exp) => (
          <div key={exp.id} className="relative pl-12">
            <div className="absolute left-[13px] top-2 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#22d3ee] z-10" />
            
            <div className="hud-border hud-border-tl p-5 hover:bg-cyan-900/10 transition-colors">
              <div className="flex flex-col md:flex-row md:justify-between mb-4">
                <div>
                  <h4 className="font-hud text-xl text-cyan-200">{exp.role}</h4>
                  <div className="text-cyan-500 font-hud text-xs uppercase tracking-widest">{exp.company}</div>
                </div>
                <div className="text-cyan-600 font-hud text-sm mt-1 md:mt-0">{exp.period}</div>
              </div>

              <p className="text-cyan-100/70 text-sm leading-relaxed mb-4 italic">
                {exp.description}
              </p>

              <div className="space-y-2">
                {exp.achievements.map((ach, j) => (
                  <div key={j} className="flex gap-3 text-xs text-cyan-300/80">
                    <span className="text-cyan-500 font-hud shrink-0">&gt;&gt;</span>
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperiencePanel;
