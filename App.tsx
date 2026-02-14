
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

const STORAGE_KEY = 'operator_os_data_v1';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavSection>(NavSection.STATUS);
  const [bootSequence, setBootSequence] = useState(true);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showOverrideNotice, setShowOverrideNotice] = useState(false);
  
  // Dynamic Portfolio State
  const [appTitle, setAppTitle] = useState('Operator-OS // Portfolio');
  const [operatorName, setOperatorName] = useState(INITIAL_NAME);
  const [operatorBio, setOperatorBio] = useState(INITIAL_BIO);
  const [tacticalTags, setTacticalTags] = useState<string[]>(DEFAULT_TACTICAL_TAGS);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [experience, setExperience] = useState<Experience[]>(INITIAL_EXPERIENCE);
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);
  const [contactData, setContactData] = useState({
    email: 'OPERATOR@NEXUS-CORP.DEV',
    phone: '+1 (555) 010-0242',
    hireMeUrl: 'mailto:OPERATOR@NEXUS-CORP.DEV',
    socials: [
      { label: 'LINKEDIN', url: 'https://linkedin.com' },
      { label: 'GITHUB', url: 'https://github.com' },
      { label: 'X-TWITTER', url: 'https://x.com' }
    ]
  });

  // Load data from LocalStorage on mount
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
      } catch (e) {
        console.error("Failed to load persistent data", e);
      }
    }
  }, []);

  // Save data whenever it changes
  const saveAllData = useCallback(() => {
    const dataToSave = {
      appTitle,
      operatorName,
      operatorBio,
      tacticalTags,
      projects,
      experience,
      skills,
      contactData
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [appTitle, operatorName, operatorBio, tacticalTags, projects, experience, skills, contactData]);

  // Sync document title
  useEffect(() => {
    document.title = appTitle;
  }, [appTitle]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('auth') === 'override') {
      setIsAdminUnlocked(true);
      setActiveSection(NavSection.ADMIN);
      setShowOverrideNotice(true);
      setTimeout(() => setShowOverrideNotice(false), 3000);
    }
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.shiftKey && e.altKey && e.key.toLowerCase() === 'a') {
      setIsAdminUnlocked(prev => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    const timer = setTimeout(() => setBootSequence(false), 1200);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [handleKeyDown]);

  const handleSecretTrigger = () => {
    setClickCount(prev => {
      const next = prev + 1;
      if (next >= 5) {
        setIsAdminUnlocked(true);
        return 0;
      }
      return next;
    });
    setTimeout(() => setClickCount(0), 2000);
  };

  if (bootSequence) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center text-cyan-400 font-hud">
        <div className="w-64 h-2 bg-slate-800 relative overflow-hidden mb-4 border border-cyan-900/50">
          <div className="absolute inset-y-0 left-0 bg-cyan-500 animate-[pulse_1s_infinite] w-full origin-left"></div>
        </div>
        <div className="tracking-[0.2em] text-xs uppercase">Initialising_Operator_OS_v4.2.0</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col p-2 md:p-4 gap-4 overflow-hidden max-h-screen relative ${isAdminUnlocked && activeSection === NavSection.ADMIN ? 'selection:bg-amber-500/30' : 'selection:bg-cyan-500/30'}`}>
      {showOverrideNotice && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[100] bg-amber-500 text-black font-hud text-[10px] px-4 py-2 border border-black shadow-[0_0_20px_rgba(245,158,11,0.5)] animate-bounce uppercase">
          [!] SECURITY_BYPASS_DETECTED: ROOT_OVERRIDE_ACTIVE
        </div>
      )}
      
      <Header operatorName={operatorName} />
      
      <div className="flex-1 flex gap-4 overflow-hidden">
        <Sidebar activeSection={activeSection} onNavigate={setActiveSection} isAdminUnlocked={isAdminUnlocked} />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto pr-2 custom-scroll pb-4">
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
        </main>
      </div>

      <footer className="h-6 flex justify-between items-center text-[10px] uppercase opacity-50 px-2 border-t border-cyan-900/30">
        <div className="flex gap-4">
          <span onClick={handleSecretTrigger} className="cursor-help hover:opacity-100 transition-opacity select-none">ENCRYPTED_ID: J-D-9901-X</span>
          <span className={isAdminUnlocked ? "text-amber-500 font-bold animate-pulse" : ""}>
            {isAdminUnlocked ? "ROOT_ACCESS_ENABLED" : "SESSION: ENCRYPTED"}
          </span>
        </div>
        <div>CONNECTION: STABLE</div>
        <div>AUTH: {isAdminUnlocked ? "OVERRIDE_ACTIVE" : "BIOMETRIC_VERIFIED"}</div>
      </footer>
    </div>
  );
};

export default App;
