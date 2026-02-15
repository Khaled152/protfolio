
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
  contactData, setContactData,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<'IDENTITY' | 'PROJECTS' | 'SKILLS' | 'EXPERIENCE' | 'CONTACT' | 'FOOTER'>('IDENTITY');
  const [saveStatus, setSaveStatus] = useState<'IDLE' | 'SAVING' | 'SAVED'>('IDLE');

  const inputClass = "w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all";
  const labelClass = "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2";

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
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col h-full animate-in fade-in duration-500 mb-8">
      <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-white dark:bg-slate-800 z-10 sticky top-0">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Portfolio Settings</h2>
          <p className="text-xs text-slate-500 mt-1">Changes are saved automatically to your device.</p>
        </div>
        <button 
          onClick={handleCommit} 
          disabled={saveStatus !== 'IDLE'}
          className={`${
            saveStatus === 'SAVED' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
          } text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all active:scale-95 flex items-center gap-2 min-w-[140px] justify-center`}
        >
          {saveStatus === 'IDLE' && 'Save Changes'}
          {saveStatus === 'SAVING' && (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          )}
          {saveStatus === 'SAVED' && (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Saved!
            </>
          )}
        </button>
      </div>

      <div className="flex border-b border-slate-100 dark:border-slate-700 overflow-x-auto bg-slate-50 dark:bg-slate-900/50 sticky top-24 z-10">
        {(['IDENTITY', 'PROJECTS', 'SKILLS', 'EXPERIENCE', 'CONTACT', 'FOOTER'] as const).map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            className={`px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${activeTab === tab ? 'border-blue-500 text-blue-600 bg-white dark:bg-slate-800' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 p-8 overflow-y-auto custom-scroll">
        {activeTab === 'IDENTITY' && (
          <div className="space-y-8 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <input type="text" value={operatorRole} onChange={e => setOperatorRole(e.target.value)} className={inputClass} placeholder="e.g. Senior Fullstack Engineer" />
              </div>
              <div>
                <label className={labelClass}>Resume URL</label>
                <input type="text" value={resumeUrl} onChange={e => setResumeUrl(e.target.value)} className={inputClass} placeholder="Link to PDF or cloud file" />
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
               <h3 className={labelClass + " text-blue-500 mb-4"}>Hero Stats</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className={labelClass}>Experience Stat</label>
                  <input type="text" value={yearsExperience} onChange={e => setYearsExperience(e.target.value)} className={inputClass} placeholder="e.g. 8+ Years" />
                </div>
                <div>
                  <label className={labelClass}>Projects Stat</label>
                  <input type="text" value={projectsCompleted} onChange={e => setProjectsCompleted(e.target.value)} className={inputClass} placeholder="e.g. 50+ Completed" />
                </div>
                <div>
                  <label className={labelClass}>Location Stat</label>
                  <input type="text" value={location} onChange={e => setLocation(e.target.value)} className={inputClass} placeholder="e.g. London, UK" />
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>Biography</label>
              <textarea value={operatorBio} onChange={e => setOperatorBio(e.target.value)} className={`${inputClass} h-40 resize-none`} />
            </div>
            <div>
              <label className={labelClass}>Profile Tags</label>
              <div className="flex flex-wrap gap-2 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                {tacticalTags.map((tag, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg shadow-sm">
                    <input 
                      type="text" 
                      value={tag} 
                      onChange={(e) => {
                        const next = [...tacticalTags];
                        next[idx] = e.target.value;
                        setTacticalTags(next);
                      }}
                      className="bg-transparent border-none text-xs font-semibold outline-none w-32" 
                    />
                    <button onClick={() => setTacticalTags(tacticalTags.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
                <button onClick={() => setTacticalTags([...tacticalTags, 'New Focus'])} className="px-4 py-1.5 border border-dashed border-blue-500 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors">+ Add Tag</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'FOOTER' && (
          <div className="space-y-8 max-w-2xl">
            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 mb-6">
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Footer Preview</h3>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center shadow-inner">
                <p className="text-xs text-slate-500">
                  © {copyrightYear} {footerOwnerName} <span className="text-blue-500 font-medium">{footerBrandName}</span>. {footerText}.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Copyright Year</label>
                <input type="text" value={copyrightYear} onChange={e => setCopyrightYear(e.target.value)} className={inputClass} placeholder="e.g. 2026" />
              </div>
              <div>
                <label className={labelClass}>Footer Name</label>
                <input type="text" value={footerOwnerName} onChange={e => setFooterOwnerName(e.target.value)} className={inputClass} placeholder="e.g. JONATHAN DOE" />
              </div>
              <div>
                <label className={labelClass}>Brand Label</label>
                <input type="text" value={footerBrandName} onChange={e => setFooterBrandName(e.target.value)} className={inputClass} placeholder="e.g. Portfolio" />
              </div>
              <div>
                <label className={labelClass}>Footer Tagline</label>
                <input type="text" value={footerText} onChange={e => setFooterText(e.target.value)} className={inputClass} placeholder="e.g. Built with React & Tailwind" />
              </div>
            </div>
            <p className="mt-2 text-[10px] text-slate-400 italic">Edit the specific segments of the footer text above. Your main name in the header remains unchanged.</p>
          </div>
        )}

        {activeTab === 'PROJECTS' && (
          <div className="space-y-8">
            <button 
              onClick={() => setProjects([{ 
                id: `P-${Date.now()}`, 
                title: 'New Project', 
                category: 'Web', 
                description: '', 
                technologies: [], 
                status: 'DEVELOPMENT', 
                metrics: { perf: 80, security: 80, reliability: 80 },
                links: { live: '', github: '' },
                imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
              }, ...projects])} 
              className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-slate-400 font-bold hover:border-blue-500 hover:text-blue-500 transition-all"
            >
              + Create New Project
            </button>
            {projects.map(p => (
              <div key={p.id} className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 relative group">
                <button onClick={() => setProjects(projects.filter(proj => proj.id !== p.id))} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div><label className={labelClass}>Title</label><input type="text" value={p.title} onChange={e => setProjects(projects.map(i => i.id === p.id ? { ...i, title: e.target.value } : i))} className={inputClass} /></div>
                    <div><label className={labelClass}>Category</label><input type="text" value={p.category} onChange={e => setProjects(projects.map(i => i.id === p.id ? { ...i, category: e.target.value } : i))} className={inputClass} /></div>
                    <div><label className={labelClass}>Thumbnail URL</label><input type="text" value={p.imageUrl} onChange={e => setProjects(projects.map(i => i.id === p.id ? { ...i, imageUrl: e.target.value } : i))} className={inputClass} /></div>
                  </div>
                  <div className="space-y-4">
                    <div><label className={labelClass}>Description</label><textarea value={p.description} onChange={e => setProjects(projects.map(i => i.id === p.id ? { ...i, description: e.target.value } : i))} className={`${inputClass} h-32`} /></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'SKILLS' && (
          <div className="space-y-6">
            <button onClick={() => setSkills([{ name: 'New Skill', level: 80, color: '#3b82f6', details: '' }, ...skills])} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:border-blue-500 hover:text-blue-500 transition-all">+ Add Skill Module</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((s, idx) => (
                <div key={idx} className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 relative space-y-4">
                  <button onClick={() => setSkills(skills.filter((_, i) => i !== idx))} className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelClass}>Skill Name</label><input type="text" value={s.name} onChange={e => setSkills(skills.map((item, i) => i === idx ? { ...item, name: e.target.value } : item))} className={inputClass} /></div>
                    <div><label className={labelClass}>Level ({s.level}%)</label><input type="range" min="0" max="100" value={s.level} onChange={e => setSkills(skills.map((item, i) => i === idx ? { ...item, level: parseInt(e.target.value) } : item))} className="w-full accent-blue-600 mt-3" /></div>
                  </div>
                  <div><label className={labelClass}>Short Details</label><input type="text" value={s.details} onChange={e => setSkills(skills.map((item, i) => i === idx ? { ...item, details: e.target.value } : item))} className={inputClass} /></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'EXPERIENCE' && (
          <div className="space-y-8">
            <button onClick={() => setExperience([{ id: `E-${Date.now()}`, role: 'New Role', company: 'Company', period: '20XX - Present', description: '', achievements: [] }, ...experience])} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:border-blue-500 hover:text-blue-500 transition-all">+ Add Job History</button>
            {experience.map(exp => (
              <div key={exp.id} className="p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 relative space-y-6">
                <button onClick={() => setExperience(experience.filter(e => e.id !== exp.id))} className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div><label className={labelClass}>Role</label><input type="text" value={exp.role} onChange={e => setExperience(experience.map(i => i.id === exp.id ? { ...i, role: e.target.value } : i))} className={inputClass} /></div>
                  <div><label className={labelClass}>Company</label><input type="text" value={exp.company} onChange={e => setExperience(experience.map(i => i.id === exp.id ? { ...i, company: e.target.value } : i))} className={inputClass} /></div>
                  <div><label className={labelClass}>Period</label><input type="text" value={exp.period} onChange={e => setExperience(experience.map(i => i.id === exp.id ? { ...i, period: e.target.value } : i))} className={inputClass} /></div>
                </div>
                <div><label className={labelClass}>Description</label><textarea value={exp.description} onChange={e => setExperience(experience.map(i => i.id === exp.id ? { ...i, description: e.target.value } : i))} className={`${inputClass} h-24`} /></div>
                <div>
                    <label className={labelClass}>Achievements</label>
                    <div className="space-y-3">
                        {exp.achievements.map((ach, idx) => (
                            <div key={idx} className="flex gap-2">
                                <input type="text" value={ach} onChange={e => {
                                    const nextAch = [...exp.achievements];
                                    nextAch[idx] = e.target.value;
                                    setExperience(experience.map(i => i.id === exp.id ? { ...i, achievements: nextAch } : i));
                                }} className={inputClass} />
                                <button onClick={() => {
                                    const nextAch = exp.achievements.filter((_, i) => i !== idx);
                                    setExperience(experience.map(i => i.id === exp.id ? { ...i, achievements: nextAch } : i));
                                }} className="text-red-500 px-3 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                            </div>
                        ))}
                        <button onClick={() => {
                            const nextAch = [...exp.achievements, 'New Achievement'];
                            setExperience(experience.map(i => i.id === exp.id ? { ...i, achievements: nextAch } : i));
                        }} className="text-xs font-bold text-blue-600 hover:text-blue-700">+ Add Achievement</button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'CONTACT' && (
          <div className="space-y-8 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className={labelClass}>Email Address</label><input type="email" value={contactData.email} onChange={e => setContactData({ ...contactData, email: e.target.value })} className={inputClass} /></div>
              <div><label className={labelClass}>Phone Number</label><input type="text" value={contactData.phone} onChange={e => setContactData({ ...contactData, phone: e.target.value })} className={inputClass} /></div>
            </div>
            <div><label className={labelClass}>Hire Me Button Link</label><input type="text" value={contactData.hireMeUrl} onChange={e => setContactData({ ...contactData, hireMeUrl: e.target.value })} className={inputClass} /></div>
            <div className="space-y-4">
              <div className="flex justify-between items-center"><label className={labelClass}>Social Networks</label><button onClick={() => setContactData({ ...contactData, socials: [...contactData.socials, { label: 'New', url: 'https://' }] })} className="text-xs font-bold text-blue-600 hover:text-blue-700">+ Add Network</button></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactData.socials.map((social, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3 relative">
                    <button onClick={() => setContactData({ ...contactData, socials: contactData.socials.filter((_, i) => i !== idx) })} className="absolute top-3 right-3 text-red-500 hover:text-red-700"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                    <div><label className="text-[10px] text-slate-400 font-bold mb-1 block">Label</label><input type="text" value={social.label} onChange={e => { const next = [...contactData.socials]; next[idx].label = e.target.value; setContactData({ ...contactData, socials: next }); }} className={inputClass} /></div>
                    <div><label className="text-[10px] text-slate-400 font-bold mb-1 block">URL</label><input type="text" value={social.url} onChange={e => { const next = [...contactData.socials]; next[idx].url = e.target.value; setContactData({ ...contactData, socials: next }); }} className={inputClass} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
