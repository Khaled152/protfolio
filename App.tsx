
import React, { useState, useEffect, useCallback } from 'react';
import { NavSection, Project, Experience, Skill } from './types';
import { 
  PROJECTS as INITIAL_PROJECTS, 
  EXPERIENCE as INITIAL_EXPERIENCE, 
  SKILLS as INITIAL_SKILLS,
  OPERATOR_NAME as INITIAL_NAME,
  OPERATOR_BIO as INITIAL_BIO,
  DEFAULT_TACTICAL_TAGS
} from './constants';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatusPanel from './components/StatusPanel';
import SkillsPanel from './components/SkillsPanel';
import ProjectPanel from './components/ProjectPanel';
import ExperiencePanel from './components/ExperiencePanel';
import ContactPanel from './components/ContactPanel';
import AdminPanel from './components/AdminPanel';

const STORAGE_KEY = 'portfolio_data_v2';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavSection>(NavSection.STATUS);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  
  // Dynamic Portfolio State
  const [appTitle, setAppTitle] = useState('Professional Portfolio');
  const [operatorName, setOperatorName] = useState(INITIAL_NAME);
  const [operatorBio, setOperatorBio] = useState(INITIAL_BIO);
  const [tacticalTags, setTacticalTags] = useState<string[]>(DEFAULT_TACTICAL_TAGS);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [experience, setExperience] = useState<Experience[]>(INITIAL_EXPERIENCE);
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);
  const [contactData, setContactData] = useState({
    email: 'hello@portfolio.dev',
    phone: '+1 (555) 123-4567',
    hireMeUrl: 'mailto:hello@portfolio.dev',
    socials: [
      { label: 'LinkedIn', url: 'https://linkedin.com' },
      { label: 'GitHub', url: 'https://github.com' },
      { label: 'Twitter', url: 'https://x.com' }
    ]
  });

  // Persistence logic
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.appTitle) setAppTitle(parsed.appTitle);
        if (parsed.operatorName) setOperatorName(parsed.operatorName);
        if (parsed.operatorBio) setOperatorBio(parsed.operatorBio);
        if (parsed.tacticalTags) setTacticalTags(parsed.tacticalTags);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.experience) setExperience(parsed.experience);
        if (parsed.skills) setSkills(parsed.skills);
        if (parsed.contactData) setContactData(parsed.contactData);
      } catch (e) { console.error("Persistence Load Error", e); }
    }
  }, []);

  const saveAllData = useCallback(() => {
    const data = { appTitle, operatorName, operatorBio, tacticalTags, projects, experience, skills, contactData };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [appTitle, operatorName, operatorBio, tacticalTags, projects, experience, skills, contactData]);

  useEffect(() => {
    document.title = appTitle;
  }, [appTitle]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.shiftKey && e.altKey && e.key.toLowerCase() === 's') {
      setIsAdminUnlocked(prev => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors">
      <Header operatorName={operatorName} />
      
      <div className="flex-1 flex overflow-hidden w-full px-6 py-6 gap-6">
        <Sidebar activeSection={activeSection} onNavigate={setActiveSection} isAdminUnlocked={isAdminUnlocked} />
        
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto pr-2 custom-scroll">
            <div className="w-full space-y-6 pb-6">
              {activeSection === NavSection.STATUS && <StatusPanel operatorBio={operatorBio} tacticalTags={tacticalTags} />}
              {activeSection === NavSection.SKILLS && <SkillsPanel skills={skills} />}
              {activeSection === NavSection.EXPERIENCE && <ExperiencePanel experience={experience} />}
              {activeSection === NavSection.PROJECTS && <ProjectPanel projects={projects} />}
              {activeSection === NavSection.CONTACT && <ContactPanel contactData={contactData} />}
              {isAdminUnlocked && activeSection === NavSection.ADMIN && (
                <AdminPanel 
                  projects={projects} setProjects={setProjects}
                  skills={skills} setSkills={setSkills}
                  experience={experience} setExperience={setExperience}
                  operatorName={operatorName} setOperatorName={setOperatorName}
                  operatorBio={operatorBio} setOperatorBio={setOperatorBio}
                  tacticalTags={tacticalTags} setTacticalTags={setTacticalTags}
                  contactData={contactData} setContactData={setContactData}
                  appTitle={appTitle} setAppTitle={setAppTitle}
                  onSave={saveAllData}
                />
              )}
            </div>
          </div>
        </main>
      </div>

      <footer className="py-4 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {operatorName} Portfolio. Built with React & Tailwind.
      </footer>
    </div>
  );
};

export default App;
