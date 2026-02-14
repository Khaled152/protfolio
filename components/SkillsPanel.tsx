
import React, { useState, useEffect } from 'react';
import { Skill } from '../types';

interface SkillsPanelProps {
  skills: Skill[];
}

const SkillsPanel: React.FC<SkillsPanelProps> = ({ skills }) => {
  const [mounted, setMounted] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
      {skills.map((skill, i) => (
        <div 
          key={i} 
          className="hud-border hud-border-tl hud-border-br p-4 relative group cursor-crosshair transition-all duration-300 hover:bg-cyan-900/10"
          onMouseEnter={() => setHoveredSkill(i)}
          onMouseLeave={() => setHoveredSkill(null)}
        >
          <div className="flex justify-between items-end mb-2">
            <h4 className="font-hud text-sm text-cyan-300">{skill.name}</h4>
            <span className="text-xs font-hud" style={{ color: skill.color }}>{skill.level}%</span>
          </div>
          
          <div className="h-4 bg-slate-900/50 border border-cyan-900/30 relative overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 transition-all duration-[1500ms] ease-out shadow-[0_0_15px_rgba(34,211,238,0.2)]"
              style={{ 
                width: mounted ? `${skill.level}%` : '0%', 
                backgroundColor: skill.color, 
                opacity: 0.6 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
            <div className="absolute inset-0 flex justify-between pointer-events-none">
              {[...Array(10)].map((_, j) => (
                <div key={j} className="w-[1px] h-full bg-slate-950/40" />
              ))}
            </div>
          </div>

          <div className={`mt-3 transition-all duration-300 overflow-hidden ${hoveredSkill === i ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="text-[10px] text-cyan-400 font-mono leading-relaxed border-t border-cyan-900/30 pt-2 italic">
              <span className="text-cyan-600 mr-2">DETAILS:</span>
              {skill.details}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {['REACT', 'TYPESCRIPT', 'TAILWIND', 'VITE'].slice(0, 3 + (i % 2)).map(tag => (
              <span key={tag} className="text-[8px] border border-cyan-800/30 px-1 py-0.5 text-cyan-600 font-hud">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}

      <div className="hud-border p-4 col-span-1 md:col-span-2">
        <h4 className="text-[10px] text-cyan-600 mb-4 uppercase tracking-[0.2em]">Deployment_Hardware</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Workstation', value: 'M2_MAX_64GB' },
            { label: 'Display', value: '4K_144HZ_X2' },
            { label: 'Peripheral', value: 'HHKB_HYBRID' },
            { label: 'Audio', value: 'DAC_AMP_HD600' },
          ].map((item, i) => (
            <div key={i} className="bg-cyan-950/20 p-2 border-l border-cyan-500/50 hover:bg-cyan-900/30 transition-colors cursor-default group">
              <div className="text-[9px] text-cyan-500/50 uppercase font-hud">{item.label}</div>
              <div className="text-xs font-hud text-cyan-300 group-hover:text-cyan-100 transition-colors">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsPanel;
