
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
  operatorRole: string;
  setOperatorRole: (role: string) => void;
  resumeUrl: string;
  setResumeUrl: (url: string) => void;
  operatorBio: string;
  setOperatorBio: (bio: string) => void;
  tacticalTags: string[];
  setTacticalTags: React.Dispatch<React.SetStateAction<string[]>>;
  yearsExperience: string;
  setYearsExperience: (val: string) => void;
  projectsCompleted: string;
  setProjectsCompleted: (val: string) => void;
  location: string;
  setLocation: (val: string) => void;
  copyrightYear: string;
  setCopyrightYear: (val: string) => void;
  footerOwnerName: string;
  setFooterOwnerName: (val: string) => void;
  footerBrandName: string;
  setFooterBrandName: (val: string) => void;
  footerText: string;
  setFooterText: (val: string) => void;
  appTitle: string;
  setAppTitle: (title: string) => void;
  adminPassword?: string;
  setAdminPassword: (pass: string) => void;
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
  onSave?: () => void;
  onLogout?: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  projects, setProjects, 
  skills, setSkills, 
  experience, setExperience,
  operatorName, setOperatorName,
  operatorRole, setOperatorRole,
  resumeUrl, setResumeUrl,
  operatorBio, setOperatorBio,
  tacticalTags, setTacticalTags,
  yearsExperience, setYearsExperience,
  projectsCompleted, setProjectsCompleted,
  location, setLocation,
  copyrightYear, setCopyrightYear,
  footerOwnerName, setFooterOwnerName,
  footerBrandName, setFooterBrandName,
  footerText, setFooterText,
  appTitle, setAppTitle,
  adminPassword, setAdminPassword,
  contactData, setContactData,
  onSave,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'IDENTITY' | 'PROJECTS' | 'SKILLS' | 'EXPERIENCE' | 'CONTACT' | 'FOOTER'>('IDENTITY');
  const [saveStatus, setSaveStatus] = useState<'IDLE' | 'SAVING' | 'SAVED'>('IDLE');

  const inputClass = "w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all";
  const labelClass = "block text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mb-2";

  const handleCommit = () => {
    setSaveStatus('SAVING');
    if (onSave) {
        onSave();
        setTimeout(() => {
          setSaveStatus('SAVED');
          setTimeout(() => setSaveStatus('IDLE'), 2000);
        }, 500);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col h-full animate-in fade-in duration-500 mb-20 md:mb-8">
      <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white dark:bg-slate-800 z-10 sticky top-0 gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">Portfolio Settings</h2>
          <p className="text-[10px] text-slate-500">Auto-saved to device storage.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={onLogout}
            className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-red-500 border border-slate-200 dark:border-slate-700 rounded-xl transition-all"
          >
            Logout
          </button>
          <button 
            onClick={handleCommit} 
            disabled={saveStatus !== 'IDLE'}
            className={`${
              saveStatus === 'SAVED' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
            } flex-1 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold shadow-lg transition-all active:scale-95 flex items-center gap-2 min-w-[120px] justify-center`}
          >
            {saveStatus === 'IDLE' && 'Save Changes'}
            {saveStatus === 'SAVING' && 'Saving...'}
            {saveStatus === 'SAVED' && 'Saved!'}
          </button>
        </div>
      </div>

      <div className="flex border-b border-slate-100 dark:border-slate-700 overflow-x-auto bg-slate-50 dark:bg-slate-900/50 sticky top-[132px] sm:top-[84px] md:top-24 z-10 no-scrollbar">
        {(['IDENTITY', 'PROJECTS', 'SKILLS', 'EXPERIENCE', 'CONTACT', 'FOOTER'] as const).map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            className={`px-6 md:px-8 py-3 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${activeTab === tab ? 'border-blue-500 text-blue-600 bg-white dark:bg-slate-800' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 p-4 md:p-8 overflow-y-auto custom-scroll">
        {activeTab === 'IDENTITY' && (
          <div className="space-y-6 md:space-y-8 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className={labelClass}>App Title</label>
                <input type="text" value={appTitle} onChange={e => setAppTitle(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Full Name</label>
                <input type="text" value={operatorName} onChange={e => setOperatorName(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Professional Role</label>
                <input type="text" value={operatorRole} onChange={e => setOperatorRole(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Admin Passkey</label>
                <input type="password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} className={`${inputClass} font-mono`} placeholder="New Admin Password" />
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 md:p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
               <h3 className={labelClass + " text-blue-500 mb-4"}>Hero Stats</h3>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Experience</label>
                  <input type="text" value={yearsExperience} onChange={e => setYearsExperience(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Projects</label>
                  <input type="text" value={projectsCompleted} onChange={e => setProjectsCompleted(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <input type="text" value={location} onChange={e => setLocation(e.target.value)} className={inputClass} />
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>Biography</label>
              <textarea value={operatorBio} onChange={e => setOperatorBio(e.target.value)} className={`${inputClass} h-32 md:h-40 resize-none`} />
            </div>
            <div>
              <label className={labelClass}>Profile Tags</label>
              <div className="flex flex-wrap gap-2 p-3 md:p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                {tacticalTags.map((tag, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded-lg">
                    <input 
                      type="text" 
                      value={tag} 
                      onChange={(e) => {
                        const next = [...tacticalTags];
                        next[idx] = e.target.value;
                        setTacticalTags(next);
                      }}
                      className="bg-transparent border-none text-[10px] md:text-xs font-semibold outline-none w-24 md:w-32" 
                    />
                    <button onClick={() => setTacticalTags(tacticalTags.filter((_, i) => i !== idx))} className="text-red-500">×</button>
                  </div>
                ))}
                <button onClick={() => setTacticalTags([...tacticalTags, 'New Focus'])} className="px-3 py-1 border border-dashed border-blue-500 text-blue-600 rounded-lg text-[10px] font-bold">+ Tag</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'FOOTER' && (
          <div className="space-y-6 md:space-y-8 max-w-2xl">
            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 md:p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
              <label className={labelClass + " text-blue-600"}>Live Preview</label>
              <p className="text-[10px] md:text-xs text-slate-500 text-center py-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900">
                © {copyrightYear} {footerOwnerName} <span className="text-blue-500 font-medium">{footerBrandName}</span>. {footerText}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div><label className={labelClass}>Year</label><input type="text" value={copyrightYear} onChange={e => setCopyrightYear(e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Footer Name</label><input type="text" value={footerOwnerName} onChange={e => setFooterOwnerName(e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Brand Label</label><input type="text" value={footerBrandName} onChange={e => setFooterBrandName(e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Tagline</label><input type="text" value={footerText} onChange={e => setFooterText(e.target.value)} className={inputClass} /></div>
            </div>
          </div>
        )}

        {activeTab === 'PROJECTS' && (
          <div className="space-y-6">
            <button onClick={() => setProjects([{ id: `P-${Date.now()}`, title: 'New Project', category: 'Web', description: '', technologies: [], status: 'DEVELOPMENT', metrics: { perf: 80, security: 80, reliability: 80 }, imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' }, ...projects])} className="w-full py-3 md:py-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 font-bold text-xs">+ Project</button>
            {projects.map(p => (
              <div key={p.id} className="p-4 md:p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 relative group">
                <button onClick={() => setProjects(projects.filter(proj => proj.id !== p.id))} className="absolute top-4 right-4 text-red-400">Delete</button>
                <div className="grid grid-cols-1 gap-4">
                  <div><label className={labelClass}>Title</label><input type="text" value={p.title} onChange={e => setProjects(projects.map(i => i.id === p.id ? { ...i, title: e.target.value } : i))} className={inputClass} /></div>
                  <div><label className={labelClass}>Category</label><input type="text" value={p.category} onChange={e => setProjects(projects.map(i => i.id === p.id ? { ...i, category: e.target.value } : i))} className={inputClass} /></div>
                  <div><label className={labelClass}>Description</label><textarea value={p.description} onChange={e => setProjects(projects.map(i => i.id === p.id ? { ...i, description: e.target.value } : i))} className={`${inputClass} h-20 md:h-24`} /></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'SKILLS' && (
          <div className="space-y-4">
            <button onClick={() => setSkills([{ name: 'New Skill', level: 80, color: '#3b82f6', details: '' }, ...skills])} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold text-xs">+ Skill</button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((s, idx) => (
                <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex justify-between"><label className={labelClass}>Skill Name</label><button onClick={() => setSkills(skills.filter((_, i) => i !== idx))} className="text-red-400 text-[10px]">Delete</button></div>
                  <input type="text" value={s.name} onChange={e => setSkills(skills.map((item, i) => i === idx ? { ...item, name: e.target.value } : item))} className={inputClass} />
                  <input type="range" min="0" max="100" value={s.level} onChange={e => setSkills(skills.map((item, i) => i === idx ? { ...item, level: parseInt(e.target.value) } : item))} className="w-full accent-blue-600" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
