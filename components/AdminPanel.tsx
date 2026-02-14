
import React, { useState } from 'react';
import { Project, Experience, Skill } from '../types';

interface AdminPanelProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  experience: Experience[];
  setExperience: React.Dispatch<React.SetStateAction<Experience[]>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  projects, setProjects, 
  skills, setSkills, 
  experience, setExperience 
}) => {
  const [activeTab, setActiveTab] = useState<'PROJECTS' | 'SKILLS' | 'EXPERIENCE'>('PROJECTS');

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const updateSkill = (index: number, value: number) => {
    setSkills(prev => {
      const next = [...prev];
      next[index] = { ...next[index], level: value };
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-6 h-full animate-in fade-in duration-500">
      <div className="flex items-center gap-4 border-b border-amber-900/50 pb-4">
        <div className="p-2 border border-amber-500/50 bg-amber-500/10">
          <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-hud text-amber-500 tracking-[0.3em] uppercase">System_Override_Console</h2>
          <div className="text-[10px] text-amber-700 font-hud">SECURE_ROOT_SESSION: AUTHENTICATED_OPERATOR</div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {(['PROJECTS', 'SKILLS', 'EXPERIENCE'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 border font-hud text-[10px] transition-all ${
              activeTab === tab 
                ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
                : 'border-amber-900/30 text-amber-900 hover:border-amber-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 bg-slate-950/80 border border-amber-900/30 p-6 custom-scroll overflow-y-auto">
        {activeTab === 'PROJECTS' && (
          <div className="space-y-8">
            {projects.map(p => (
              <div key={p.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border-l-2 border-amber-500/30 bg-amber-950/5">
                <div className="space-y-4">
                  <div>
                    <label className="text-[9px] text-amber-700 uppercase block mb-1">Project_Title</label>
                    <input 
                      type="text" 
                      value={p.title}
                      onChange={(e) => updateProject(p.id, 'title', e.target.value)}
                      className="w-full bg-black/60 border border-amber-900/50 p-2 text-xs text-amber-200 font-hud focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-amber-700 uppercase block mb-1">Description</label>
                    <textarea 
                      value={p.description}
                      onChange={(e) => updateProject(p.id, 'description', e.target.value)}
                      className="w-full h-24 bg-black/60 border border-amber-900/50 p-2 text-xs text-cyan-100 font-mono focus:border-amber-500 focus:outline-none resize-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-[9px] text-amber-700 uppercase block mb-1">Status_Protocol</label>
                    <select 
                      value={p.status}
                      onChange={(e) => updateProject(p.id, 'status', e.target.value)}
                      className="w-full bg-black/60 border border-amber-900/50 p-2 text-xs text-amber-500 font-hud focus:border-amber-500 focus:outline-none"
                    >
                      <option value="ONLINE">ONLINE</option>
                      <option value="STANDBY">STANDBY</option>
                      <option value="DEVELOPMENT">DEVELOPMENT</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] text-amber-700 uppercase block mb-1">Performance_Metric ({p.metrics.perf}%)</label>
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={p.metrics.perf}
                      onChange={(e) => updateProject(p.id, 'metrics', { ...p.metrics, perf: parseInt(e.target.value) })}
                      className="w-full accent-amber-500 bg-amber-900/20"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'SKILLS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((s, idx) => (
              <div key={idx} className="p-4 border border-amber-900/20 bg-amber-950/5 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-hud text-amber-400">{s.name}</span>
                  <span className="text-xs font-mono text-amber-600">{s.level}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={s.level}
                  onChange={(e) => updateSkill(idx, parseInt(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'EXPERIENCE' && (
          <div className="space-y-6">
            <div className="text-amber-500/50 text-[10px] italic flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
              HISTORY_LOG_STREAMING_ACTIVE...
            </div>
            {experience.map(exp => (
              <div key={exp.id} className="p-4 border border-amber-900/30 bg-black/40">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-full">
                    <input 
                      type="text" 
                      value={exp.role} 
                      onChange={(e) => setExperience(prev => prev.map(ev => ev.id === exp.id ? {...ev, role: e.target.value} : ev))}
                      className="bg-transparent text-amber-200 font-hud text-lg w-full border-b border-transparent hover:border-amber-900/50 focus:border-amber-500 outline-none"
                    />
                    <div className="text-amber-700 text-[10px] mt-1 uppercase font-hud">{exp.company}</div>
                  </div>
                </div>
                <p className="text-[10px] text-amber-500/70 font-mono italic">{exp.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4 p-4 border-t border-amber-900/30">
        <div className="text-[9px] text-amber-900 font-hud uppercase tracking-widest self-center">
          Warning: Changes_Are_Applied_Real_Time
        </div>
        <button className="px-8 py-2 bg-amber-500 text-black font-hud text-xs hover:bg-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] active:scale-95">
          COMMIT_OVERRIDE
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
