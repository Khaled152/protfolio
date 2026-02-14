
import React, { useState } from 'react';
import { Project, Experience, Skill } from '../types';

interface AdminPanelProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  experience: Experience[];
  setExperience: React.Dispatch<React.SetStateAction<Experience[]>>;
  operatorName: string;
  setOperatorName: (name: string) => void;
  operatorBio: string;
  setOperatorBio: (bio: string) => void;
  appTitle: string;
  setAppTitle: (title: string) => void;
  contactData: {
    email: string;
    phone: string;
    hireMeUrl: string;
    socials: { label: string; url: string }[];
  };
  setContactData: React.Dispatch<React.SetStateAction<{ 
    email: string; 
    phone: string; 
    hireMeUrl: string;
    socials: { label: string; url: string }[] 
  }>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  projects, setProjects, 
  skills, setSkills, 
  experience, setExperience,
  operatorName, setOperatorName,
  operatorBio, setOperatorBio,
  appTitle, setAppTitle,
  contactData, setContactData
}) => {
  const [activeTab, setActiveTab] = useState<'IDENTITY' | 'PROJECTS' | 'SKILLS' | 'EXPERIENCE' | 'CONTACT'>('IDENTITY');

  // --- EXPERIENCE CRUD ---
  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperience(prev => prev.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const updateAchievement = (expId: string, idx: number, value: string) => {
    setExperience(prev => prev.map(exp => {
      if (exp.id === expId) {
        const nextAch = [...exp.achievements];
        nextAch[idx] = value;
        return { ...exp, achievements: nextAch };
      }
      return exp;
    }));
  };

  const addAchievement = (expId: string) => {
    setExperience(prev => prev.map(exp => 
      exp.id === expId ? { ...exp, achievements: [...exp.achievements, 'NEW_ACHIEVEMENT_LOG'] } : exp
    ));
  };

  const deleteAchievement = (expId: string, idx: number) => {
    setExperience(prev => prev.map(exp => 
      exp.id === expId ? { ...exp, achievements: exp.achievements.filter((_, i) => i !== idx) } : exp
    ));
  };

  const addExperience = () => {
    const newId = `EXP-${Math.floor(Math.random() * 9000) + 1000}`;
    setExperience(prev => [...prev, {
      id: newId,
      role: 'NEW_ROLE',
      company: 'NEW_CORP',
      period: '2024 - PRESENT',
      description: 'Role mission briefing pending...',
      achievements: ['Initial milestone recorded']
    }]);
  };

  const deleteExperience = (id: string) => {
    if (confirm(`PURGE CAREER LOG ${id}?`)) {
      setExperience(prev => prev.filter(e => e.id !== id));
    }
  };

  // --- SKILLS CRUD ---
  const updateSkill = (idx: number, field: keyof Skill, value: any) => {
    setSkills(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  };

  const addSkill = () => {
    setSkills(prev => [...prev, { 
      name: 'NEW_MODULE', 
      level: 50, 
      color: '#22d3ee', 
      details: 'Module analysis pending...' 
    }]);
  };

  const deleteSkill = (idx: number) => {
    if (confirm("PURGE SKILL MODULE?")) {
      setSkills(prev => prev.filter((_, i) => i !== idx));
    }
  };

  // --- PROJECTS CRUD ---
  const updateProject = (id: string, field: keyof Project, value: any) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const updateProjectLinks = (id: string, type: 'live' | 'github', value: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, links: { ...p.links, [type]: value } } : p));
  };

  const addProject = () => {
    const newId = `P-${Math.floor(Math.random() * 9000) + 1000}`;
    setProjects(prev => [...prev, { 
      id: newId, 
      title: 'NEW_PROJECT', 
      subtitle: 'SUBTITLE // TAGS',
      category: 'UNSET', 
      description: '', 
      technologies: ['React'], 
      status: 'DEVELOPMENT', 
      links: { live: '', github: '' }, 
      metrics: { perf: 50, security: 50, reliability: 50 } 
    }]);
  };

  const deleteProject = (id: string) => confirm(`PURGE ${id}?`) && setProjects(prev => prev.filter(p => p.id !== id));

  // --- CONTACT CRUD ---
  const updateContactField = (field: string, val: any) => setContactData(prev => ({ ...prev, [field]: val }));
  const updateSocialLink = (idx: number, field: 'label' | 'url', val: string) => {
    const next = [...contactData.socials];
    next[idx] = { ...next[idx], [field]: val };
    updateContactField('socials', next);
  };
  const addSocialLink = () => updateContactField('socials', [...contactData.socials, { label: 'NEW_LINK', url: 'https://' }]);
  const deleteSocialLink = (idx: number) => updateContactField('socials', contactData.socials.filter((_, i) => i !== idx));

  return (
    <div className="flex flex-col gap-6 h-full animate-in fade-in duration-500 pb-20">
      <div className="flex items-center gap-4 border-b border-amber-900/50 pb-4">
        <div className="p-2 border border-amber-500/50 bg-amber-500/10">
          <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        </div>
        <div>
          <h2 className="text-xl font-hud text-amber-500 tracking-[0.3em] uppercase">System_Override_Console</h2>
          <div className="text-[10px] text-amber-700 font-hud uppercase tracking-widest">AUTHENTICATED_ACCESS // ROOT</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {(['IDENTITY', 'PROJECTS', 'SKILLS', 'EXPERIENCE', 'CONTACT'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 border font-hud text-[10px] transition-all uppercase tracking-widest ${activeTab === tab ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'border-amber-900/30 text-amber-900 hover:border-amber-700'}`}>{tab}</button>
        ))}
      </div>

      <div className="flex-1 bg-slate-950/80 border border-amber-900/30 p-6 custom-scroll overflow-y-auto min-h-0">
        
        {activeTab === 'IDENTITY' && (
          <div className="space-y-8 max-w-2xl">
            <div>
              <label className="text-[10px] text-amber-700 uppercase font-hud block mb-2 tracking-widest">Application_Title_Protocol</label>
              <input type="text" value={appTitle} onChange={e => setAppTitle(e.target.value)} className="w-full bg-black/60 border border-amber-900/50 p-4 text-amber-200 font-mono text-sm focus:border-amber-500 outline-none uppercase tracking-widest" />
              <div className="text-[8px] text-amber-900 mt-1 uppercase italic font-hud tracking-widest">Sets the text displayed in the browser tab</div>
            </div>
            <div>
              <label className="text-[10px] text-amber-700 uppercase font-hud block mb-2 tracking-widest">Operator_Codename</label>
              <input type="text" value={operatorName} onChange={e => setOperatorName(e.target.value)} className="w-full bg-black/60 border border-amber-900/50 p-4 text-amber-200 font-hud focus:border-amber-500 outline-none uppercase tracking-widest" />
            </div>
            <div>
              <label className="text-[10px] text-amber-700 uppercase font-hud block mb-2 tracking-widest">Operator_Biography</label>
              <textarea value={operatorBio} onChange={e => setOperatorBio(e.target.value)} className="w-full h-40 bg-black/60 border border-amber-900/50 p-4 text-cyan-100 font-mono text-sm leading-relaxed focus:border-amber-500 outline-none resize-none" />
            </div>
          </div>
        )}

        {activeTab === 'PROJECTS' && (
          <div className="space-y-12">
            <button onClick={addProject} className="w-full py-4 border border-amber-500/50 border-dashed text-amber-500 font-hud text-xs hover:bg-amber-500/10 transition-colors mb-6 uppercase tracking-widest">[+] DEPLOY_NEW_PROJECT_MANIFEST</button>
            {projects.map(p => (
              <div key={p.id} className="relative p-6 border border-amber-900/40 bg-black/40 group mb-6">
                <button onClick={() => deleteProject(p.id)} className="absolute top-2 right-2 p-1 text-amber-900 hover:text-rose-500 transition-colors font-hud text-[10px] uppercase tracking-tighter">[DECOMMISSION_PROJECT]</button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="text-[9px] text-amber-700 uppercase block mb-1 font-hud tracking-widest">Project_Title</label>
                      <input type="text" value={p.title} onChange={(e) => updateProject(p.id, 'title', e.target.value)} className="w-full bg-black/60 border border-amber-900/50 p-2 text-xs text-amber-200 font-hud focus:border-amber-500 outline-none uppercase" />
                    </div>
                    <div>
                      <label className="text-[9px] text-amber-700 uppercase block mb-1 font-hud tracking-widest">Subtitle // Tech Summary</label>
                      <input type="text" value={p.subtitle || ''} onChange={(e) => updateProject(p.id, 'subtitle', e.target.value)} placeholder="e.g. REACT // TAILWIND // NODE" className="w-full bg-black/60 border border-amber-900/50 p-2 text-[10px] text-amber-500 font-hud outline-none uppercase tracking-widest" />
                    </div>
                    <div>
                      <label className="text-[9px] text-amber-700 uppercase block mb-1 font-hud tracking-widest">Image_Resource_URL</label>
                      <input type="text" value={p.imageUrl || ''} onChange={(e) => updateProject(p.id, 'imageUrl', e.target.value)} placeholder="https://unsplash.com/..." className="w-full bg-black/60 border border-amber-900/50 p-2 text-[10px] text-amber-600 font-mono outline-none" />
                    </div>
                    <div>
                      <label className="text-[9px] text-amber-700 uppercase block mb-1 font-hud tracking-widest">Manifest_Description</label>
                      <textarea value={p.description} onChange={(e) => updateProject(p.id, 'description', e.target.value)} className="w-full h-24 bg-black/60 border border-amber-900/50 p-2 text-xs text-cyan-100 font-mono focus:border-amber-500 outline-none resize-none" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] text-amber-700 uppercase block mb-1 font-hud tracking-widest">Live_Uplink (Iframe Target)</label>
                        <input type="text" placeholder="https://..." value={p.links?.live || ''} onChange={(e) => updateProjectLinks(p.id, 'live', e.target.value)} className="w-full bg-black/60 border border-amber-900/50 p-2 text-[10px] text-amber-500 font-mono outline-none" />
                      </div>
                      <div>
                        <label className="text-[9px] text-amber-700 uppercase block mb-1 font-hud tracking-widest">Source_Repo</label>
                        <input type="text" placeholder="https://github.com/..." value={p.links?.github || ''} onChange={(e) => updateProjectLinks(p.id, 'github', e.target.value)} className="w-full bg-black/60 border border-amber-900/50 p-2 text-[10px] text-amber-500 font-mono outline-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {['perf', 'security', 'reliability'].map(m => (
                        <div key={m}>
                          <label className="text-[8px] text-amber-700 uppercase block mb-1 font-hud tracking-tighter">{m}</label>
                          <input type="number" min="0" max="100" value={p.metrics[m as keyof typeof p.metrics]} onChange={(e) => updateProject(p.id, 'metrics', { ...p.metrics, [m]: parseInt(e.target.value) })} className="w-full bg-black/60 border border-amber-900/50 p-1 text-[10px] text-amber-400 font-hud" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'EXPERIENCE' && (
          <div className="space-y-12">
            <button onClick={addExperience} className="w-full py-4 border border-amber-500/50 border-dashed text-amber-500 font-hud text-xs hover:bg-amber-500/10 transition-colors mb-6 uppercase tracking-widest">[+] ARCHIVE_NEW_CAREER_LOG</button>
            {experience.map(exp => (
              <div key={exp.id} className="relative p-6 border border-amber-900/40 bg-black/40 group mb-6">
                <button onClick={() => deleteExperience(exp.id)} className="absolute top-2 right-2 p-1 text-amber-900 hover:text-rose-500 transition-colors font-hud text-[10px] uppercase tracking-tighter">[DELETE_LOG]</button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="text-[9px] text-amber-700 uppercase block mb-1 font-hud tracking-widest">Role_Title</label>
                      <input type="text" value={exp.role} onChange={(e) => updateExperience(exp.id, 'role', e.target.value)} className="w-full bg-black/60 border border-amber-900/50 p-2 text-xs text-amber-200 font-hud focus:border-amber-500 outline-none uppercase" />
                    </div>
                    <div>
                      <label className="text-[9px] text-amber-700 uppercase block mb-1 font-hud tracking-widest">HQ_Company</label>
                      <input type="text" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} className="w-full bg-black/60 border border-amber-900/50 p-2 text-xs text-amber-500 font-hud focus:border-amber-500 outline-none uppercase" />
                    </div>
                    <div>
                      <label className="text-[9px] text-amber-700 uppercase block mb-1 font-hud tracking-widest">Time_Period</label>
                      <input type="text" value={exp.period} onChange={(e) => updateExperience(exp.id, 'period', e.target.value)} className="w-full bg-black/60 border border-amber-900/50 p-2 text-xs text-amber-400 font-hud focus:border-amber-500 outline-none uppercase" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[9px] text-amber-700 uppercase block mb-1 font-hud tracking-widest">Briefing_Summary</label>
                      <textarea value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} className="w-full h-24 bg-black/60 border border-amber-900/50 p-2 text-xs text-cyan-100 font-mono focus:border-amber-500 outline-none resize-none" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[9px] text-amber-700 uppercase font-hud tracking-widest">Milestones</label>
                        <button onClick={() => addAchievement(exp.id)} className="text-[8px] text-amber-500 hover:text-amber-300 font-hud tracking-widest">[ADD_ENTRY]</button>
                      </div>
                      <div className="space-y-2">
                        {exp.achievements.map((ach, idx) => (
                          <div key={idx} className="flex gap-2">
                            <input type="text" value={ach} onChange={(e) => updateAchievement(exp.id, idx, e.target.value)} className="flex-1 bg-black/40 border border-amber-900/30 p-1 text-[10px] text-amber-300 font-mono outline-none" />
                            <button onClick={() => deleteAchievement(exp.id, idx)} className="text-rose-500 text-[10px] px-2 hover:bg-rose-500/10 transition-colors">X</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'SKILLS' && (
          <div className="space-y-6">
            <button onClick={addSkill} className="w-full py-4 border border-amber-500/50 border-dashed text-amber-500 font-hud text-xs hover:bg-amber-500/10 transition-colors uppercase tracking-widest">[+] INTEGRATE_NEW_SKILL_MODULE</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((s, idx) => (
                <div key={idx} className="p-4 border border-amber-900/20 bg-amber-950/5 flex flex-col gap-4 relative group">
                  <button onClick={() => deleteSkill(idx)} className="absolute top-2 right-2 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity font-hud text-[8px] uppercase">[PURGE]</button>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] text-amber-700 uppercase block mb-1 font-hud tracking-widest">Module_Name</label>
                      <input type="text" value={s.name} onChange={(e) => updateSkill(idx, 'name', e.target.value.toUpperCase())} className="w-full bg-black/60 border border-amber-900/50 p-2 text-xs text-amber-400 font-hud uppercase outline-none" />
                    </div>
                    <div>
                      <label className="text-[9px] text-amber-700 uppercase block mb-1 font-hud tracking-widest">Efficiency ({s.level}%)</label>
                      <input type="range" min="0" max="100" value={s.level} onChange={(e) => updateSkill(idx, 'level', parseInt(e.target.value))} className="w-full accent-amber-500" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] text-amber-700 uppercase block mb-1 font-hud tracking-widest">Tactical_Details</label>
                    <textarea value={s.details} onChange={(e) => updateSkill(idx, 'details', e.target.value)} className="w-full h-16 bg-black/60 border border-amber-900/50 p-2 text-[10px] text-cyan-200 font-mono resize-none outline-none focus:border-amber-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'CONTACT' && (
          <div className="space-y-10 max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] text-amber-700 uppercase font-hud block mb-2 tracking-widest">Email_Target</label>
                <input type="email" value={contactData.email} onChange={e => updateContactField('email', e.target.value)} className="w-full bg-black/60 border border-amber-900/50 p-3 text-amber-200 font-mono outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="text-[10px] text-amber-700 uppercase font-hud block mb-2 tracking-widest">Phone_Uplink</label>
                <input type="text" value={contactData.phone} onChange={e => updateContactField('phone', e.target.value)} className="w-full bg-black/60 border border-amber-900/50 p-3 text-amber-200 font-mono outline-none focus:border-amber-500" />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-amber-700 uppercase font-hud block mb-2 tracking-widest">Hire_Me_Action_URL</label>
              <input type="text" value={contactData.hireMeUrl} onChange={e => updateContactField('hireMeUrl', e.target.value)} placeholder="mailto:you@example.com" className="w-full bg-black/60 border border-amber-900/50 p-3 text-amber-200 font-mono outline-none focus:border-amber-500" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-amber-900/30 pb-2">
                <label className="text-[10px] text-amber-700 uppercase font-hud tracking-widest">Social_Uplinks</label>
                <button onClick={addSocialLink} className="text-[9px] text-amber-500 hover:text-amber-300 font-hud tracking-widest">[+] ADD_LINK</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactData.socials.map((social, idx) => (
                  <div key={idx} className="p-4 bg-amber-950/5 border border-amber-900/20 space-y-3 relative group">
                    <button onClick={() => deleteSocialLink(idx)} className="absolute top-2 right-2 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-hud">[PURGE]</button>
                    <div>
                      <label className="text-[8px] text-amber-800 uppercase block mb-1">Label</label>
                      <input type="text" value={social.label} onChange={e => updateSocialLink(idx, 'label', e.target.value.toUpperCase())} className="w-full bg-black/40 border border-amber-900/30 p-2 text-[10px] text-amber-400 font-hud outline-none" />
                    </div>
                    <div>
                      <label className="text-[8px] text-amber-800 uppercase block mb-1">URL</label>
                      <input type="text" value={social.url} onChange={e => updateSocialLink(idx, 'url', e.target.value)} className="w-full bg-black/40 border border-amber-900/30 p-2 text-[10px] text-amber-600 font-mono outline-none" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4 p-4 border-t border-amber-900/30">
        <div className="text-[9px] text-amber-900 font-hud uppercase tracking-widest self-center">Warning: Persistent_Data_Override_Mode_Active</div>
        <button className="px-8 py-2 bg-amber-500 text-black font-hud text-xs hover:bg-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] active:scale-95 uppercase tracking-widest">COMMIT_OVERRIDE</button>
      </div>
    </div>
  );
};

export default AdminPanel;
