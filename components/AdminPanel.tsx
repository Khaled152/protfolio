
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
  tacticalTags: string[];
  setTacticalTags: React.Dispatch<React.SetStateAction<string[]>>;
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
  operatorBio, setOperatorBio,
  tacticalTags, setTacticalTags,
  appTitle, setAppTitle,
  contactData, setContactData,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<'IDENTITY' | 'PROJECTS' | 'SKILLS' | 'EXPERIENCE' | 'CONTACT'>('IDENTITY');

  // Input styling
  const inputClass = "w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all";
  const labelClass = "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2";

  const handleCommit = () => {
    if (onSave) {
        onSave();
        alert("Portfolio data updated successfully.");
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col h-full animate-in fade-in duration-500">
      <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Portfolio Settings</h2>
          <p className="text-xs text-slate-500 mt-1">Manage your identity and content</p>
        </div>
        <button onClick={handleCommit} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all active:scale-95">
          Save Changes
        </button>
      </div>

      <div className="flex border-b border-slate-100 dark:border-slate-700 overflow-x-auto bg-slate-50 dark:bg-slate-900/50">
        {(['IDENTITY', 'PROJECTS', 'SKILLS', 'EXPERIENCE', 'CONTACT'] as const).map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            className={`px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === tab ? 'border-blue-500 text-blue-600 bg-white dark:bg-slate-800' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 p-8 overflow-y-auto custom-scroll">
        {activeTab === 'IDENTITY' && (
          <div className="space-y-8 max-w-2xl">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>App Title</label>
                <input type="text" value={appTitle} onChange={e => setAppTitle(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Full Name</label>
                <input type="text" value={operatorName} onChange={e => setOperatorName(e.target.value)} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Biography</label>
              <textarea value={operatorBio} onChange={e => setOperatorBio(e.target.value)} className={`${inputClass} h-40 resize-none`} />
            </div>
            <div>
              <label className={labelClass}>Status Tags</label>
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
                      className="bg-transparent border-none text-xs font-semibold outline-none w-24" 
                    />
                    <button onClick={() => setTacticalTags(tacticalTags.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => setTacticalTags([...tacticalTags, 'New Tag'])} 
                  className="px-4 py-1.5 border border-dashed border-blue-500 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors"
                >
                  + Add Tag
                </button>
              </div>
            </div>
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
                metrics: { perf: 80, security: 80, reliability: 80 } 
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
                    <div>
                      <label className={labelClass}>Project Title</label>
                      <input type="text" value={p.title} onChange={e => {
                        setProjects(projects.map(item => item.id === p.id ? { ...item, title: e.target.value } : item));
                      }} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Thumbnail URL</label>
                      <input type="text" value={p.imageUrl} onChange={e => {
                        setProjects(projects.map(item => item.id === p.id ? { ...item, imageUrl: e.target.value } : item));
                      }} className={inputClass} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Description</label>
                      <textarea value={p.description} onChange={e => {
                        setProjects(projects.map(item => item.id === p.id ? { ...item, description: e.target.value } : item));
                      }} className={`${inputClass} h-32`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'CONTACT' && (
          <div className="space-y-8 max-w-2xl">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Primary Email</label>
                <input type="email" value={contactData.email} onChange={e => setContactData({ ...contactData, email: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input type="text" value={contactData.phone} onChange={e => setContactData({ ...contactData, phone: e.target.value })} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Hire Me Button Link</label>
              <input type="text" value={contactData.hireMeUrl} onChange={e => setContactData({ ...contactData, hireMeUrl: e.target.value })} className={inputClass} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className={labelClass}>Social Links</label>
                <button 
                  onClick={() => setContactData({ ...contactData, socials: [...contactData.socials, { label: 'New Link', url: '#' }] })} 
                  className="text-xs font-bold text-blue-600"
                >
                  + Add Link
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactData.socials.map((social, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3 relative group">
                    <button onClick={() => setContactData({ ...contactData, socials: contactData.socials.filter((_, i) => i !== idx) })} className="absolute top-3 right-3 text-slate-300 hover:text-red-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <input type="text" value={social.label} onChange={e => {
                      const next = [...contactData.socials];
                      next[idx].label = e.target.value;
                      setContactData({ ...contactData, socials: next });
                    }} className={inputClass} placeholder="Label" />
                    <input type="text" value={social.url} onChange={e => {
                      const next = [...contactData.socials];
                      next[idx].url = e.target.value;
                      setContactData({ ...contactData, socials: next });
                    }} className={inputClass} placeholder="URL" />
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
