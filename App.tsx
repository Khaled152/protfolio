
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
  const [operatorRole, setOperatorRole] = useState('Fullstack Engineer');
  const [resumeUrl, setResumeUrl] = useState('#');
  const [operatorBio, setOperatorBio] = useState(INITIAL_BIO);
  const [tacticalTags, setTacticalTags] = useState<string[]>(DEFAULT_TACTICAL_TAGS);
  
  // Stats State
  const [yearsExperience, setYearsExperience] = useState('8+ Years');
  const [projectsCompleted, setProjectsCompleted] = useState('50+ Completed');
  const [location, setLocation] = useState('San Francisco, CA');

  // Footer State
  const [copyrightYear, setCopyrightYear] = useState(new Date().getFullYear().toString());
  const [footerOwnerName, setFooterOwnerName] = useState(INITIAL_NAME);
  const [footerBrandName, setFooterBrandName] = useState('Portfolio');
  const [footerText, setFooterText] = useState('Built with React & Tailwind');

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
        if (parsed.operatorRole) setOperatorRole(parsed.operatorRole);
        if (parsed.resumeUrl) setResumeUrl(parsed.resumeUrl);
        if (parsed.operatorBio) setOperatorBio(parsed.operatorBio);
        if (parsed.tacticalTags) setTacticalTags(parsed.tacticalTags);
        if (parsed.yearsExperience) setYearsExperience(parsed.yearsExperience);
        if (parsed.projectsCompleted) setProjectsCompleted(parsed.projectsCompleted);
        if (parsed.location) setLocation(parsed.location);
        if (parsed.copyrightYear) setCopyrightYear(parsed.copyrightYear);
        if (parsed.footerOwnerName) setFooterOwnerName(parsed.footerOwnerName);
        if (parsed.footerBrandName) setFooterBrandName(parsed.footerBrandName);
        if (parsed.footerText) setFooterText(parsed.footerText);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.experience) setExperience(parsed.experience);
        if (parsed.skills) setSkills(parsed.skills);
        if (parsed.contactData) setContactData(parsed.contactData);
      } catch (e) { console.error("Persistence Load Error", e); }
    }
  }, []);

  const saveAllData = useCallback(() => {
    const data = { 
      appTitle, 
      operatorName, 
      operatorRole, 
      resumeUrl, 
      operatorBio, 
      tacticalTags, 
      yearsExperience,
      projectsCompleted,
      location,
      copyrightYear,
      footerOwnerName,
      footerBrandName,
      footerText,
      projects, 
      experience, 
      skills, 
      contactData 
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [appTitle, operatorName, operatorRole, resumeUrl, operatorBio, tacticalTags, yearsExperience, projectsCompleted, location, copyrightYear, footerOwnerName, footerBrandName, footerText, projects, experience, skills, contactData]);

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
      <Header 
        operatorName={operatorName} 
        operatorRole={operatorRole} 
        resumeUrl={resumeUrl}
      />
      
      <div className="flex-1 flex overflow-hidden w-full px-6 py-6 gap-6">
        <Sidebar activeSection={activeSection} onNavigate={setActiveSection} isAdminUnlocked={isAdminUnlocked} />
        
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto pr-2 custom-scroll">
            <div className="w-full space-y-6 pb-6">
              {activeSection === NavSection.STATUS && (
                <StatusPanel 
                  operatorBio={operatorBio} 
                  tacticalTags={tacticalTags}
                  yearsExperience={yearsExperience}
                  projectsCompleted={projectsCompleted}
                  location={location}
                />
              )}
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
                  operatorRole={operatorRole} setOperatorRole={setOperatorRole}
                  resumeUrl={resumeUrl} setResumeUrl={setResumeUrl}
                  operatorBio={operatorBio} setOperatorBio={setOperatorBio}
                  tacticalTags={tacticalTags} setTacticalTags={setTacticalTags}
                  yearsExperience={yearsExperience} setYearsExperience={setYearsExperience}
                  projectsCompleted={projectsCompleted} setProjectsCompleted={setProjectsCompleted}
                  location={location} setLocation={setLocation}
                  copyrightYear={copyrightYear} setCopyrightYear={setCopyrightYear}
                  footerOwnerName={footerOwnerName} setFooterOwnerName={setFooterOwnerName}
                  footerBrandName={footerBrandName} setFooterBrandName={setFooterBrandName}
                  footerText={footerText} setFooterText={setFooterText}
                  contactData={contactData} setContactData={setContactData}
                  appTitle={appTitle} setAppTitle={setAppTitle}
                  onSave={saveAllData}
                />
              )}
            </div>
          </div>
        </main>
      </div>

      <footer className="py-10 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-2">
        <button 
          onClick={() => setIsAdminUnlocked(!isAdminUnlocked)}
          className="text-xs text-slate-400 hover:text-blue-500 transition-colors cursor-default select-none group text-center px-4"
        >
          © {copyrightYear} {footerOwnerName} <span className="group-hover:text-blue-400 font-medium transition-colors">{footerBrandName}</span>. {footerText}.
        </button>
        {isAdminUnlocked && (
          <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest animate-pulse">
            [ Admin Mode Active ]
          </span>
        )}
      </footer>
    </div>
  );
};

export default App;
