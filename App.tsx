
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
import AuthPanel from './components/AuthPanel';

const STORAGE_KEY = 'portfolio_data_v2';
const AUTH_KEY = 'portfolio_auth_session';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavSection>(NavSection.STATUS);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authError, setAuthError] = useState('');
  
  // Dynamic Portfolio State
  const [appTitle, setAppTitle] = useState('Professional Portfolio');
  const [operatorName, setOperatorName] = useState(INITIAL_NAME);
  const [operatorRole, setOperatorRole] = useState('Fullstack Engineer');
  const [resumeUrl, setResumeUrl] = useState('#');
  const [operatorBio, setOperatorBio] = useState(INITIAL_BIO);
  const [tacticalTags, setTacticalTags] = useState<string[]>(DEFAULT_TACTICAL_TAGS);
  const [adminPassword, setAdminPassword] = useState('admin123'); // Default password
  
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

  // Load persistence on mount
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
        if (parsed.adminPassword) setAdminPassword(parsed.adminPassword);
      } catch (e) { console.error("Persistence Load Error", e); }
    }

    // Check existing session
    const session = localStorage.getItem(AUTH_KEY);
    if (session === 'true') {
      setIsAdminAuthenticated(true);
    }

    // Special Root Check
    if (window.location.hash === '#admin') {
      setShowAuthModal(true);
      window.location.hash = ''; // Clear for aesthetics
    }
  }, []);

  // Save logic
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
      contactData,
      adminPassword
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [
    appTitle, operatorName, operatorRole, resumeUrl, operatorBio, tacticalTags, 
    yearsExperience, projectsCompleted, location, copyrightYear, 
    footerOwnerName, footerBrandName, footerText, projects, experience, 
    skills, contactData, adminPassword
  ]);

  // Auto-save whenever state changes
  useEffect(() => {
    saveAllData();
  }, [saveAllData]);

  useEffect(() => {
    document.title = appTitle;
  }, [appTitle]);

  const handleAuth = (password: string) => {
    if (password === adminPassword) {
      setIsAdminAuthenticated(true);
      setShowAuthModal(false);
      setAuthError('');
      localStorage.setItem(AUTH_KEY, 'true');
      setActiveSection(NavSection.ADMIN);
    } else {
      setAuthError('Invalid passkey. Access denied.');
    }
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
    setActiveSection(NavSection.STATUS);
  };

  const triggerAuth = () => {
    if (isAdminAuthenticated) {
      setActiveSection(NavSection.ADMIN);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.shiftKey && e.altKey && e.key.toLowerCase() === 's') {
      triggerAuth();
    }
  }, [isAdminAuthenticated]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors pb-20 md:pb-0">
      <Header 
        operatorName={operatorName} 
        operatorRole={operatorRole} 
        resumeUrl={resumeUrl}
      />
      
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden w-full px-4 md:px-6 py-4 md:py-6 gap-4 md:gap-6">
        <Sidebar 
          activeSection={activeSection} 
          onNavigate={(section) => {
            if (section === NavSection.ADMIN && !isAdminAuthenticated) {
              setShowAuthModal(true);
            } else {
              setActiveSection(section);
            }
          }} 
          isAdminUnlocked={isAdminAuthenticated} 
        />
        
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto pr-0 md:pr-2 custom-scroll">
            <div className="w-full space-y-4 md:space-y-6 pb-6">
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
              {isAdminAuthenticated && activeSection === NavSection.ADMIN && (
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
                  adminPassword={adminPassword} setAdminPassword={setAdminPassword}
                  onLogout={handleLogout}
                  onSave={saveAllData}
                />
              )}
            </div>
          </div>
        </main>
      </div>

      <footer className="hidden md:flex py-10 border-t border-slate-200 dark:border-slate-800 flex-col items-center gap-2">
        <button 
          onClick={triggerAuth}
          className="text-xs text-slate-400 hover:text-blue-500 transition-colors cursor-default select-none group text-center px-4"
        >
          © {copyrightYear} {footerOwnerName} <span className="group-hover:text-blue-400 font-medium transition-colors">{footerBrandName}</span>. {footerText}.
        </button>
        {isAdminAuthenticated && (
          <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest animate-pulse">
            [ Admin Session Active ]
          </span>
        )}
      </footer>

      {showAuthModal && (
        <AuthPanel 
          onVerify={handleAuth} 
          onCancel={() => { setShowAuthModal(false); setAuthError(''); }} 
          error={authError} 
        />
      )}
    </div>
  );
};

export default App;
