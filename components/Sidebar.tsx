
import React from 'react';
import { NavSection } from '../types';

interface SidebarProps {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
  isAdminUnlocked?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate, isAdminUnlocked = false }) => {
  const allItems = [
    { id: NavSection.STATUS, label: 'BIO', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: NavSection.SKILLS, label: 'SKILLS', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
    { id: NavSection.EXPERIENCE, label: 'HISTORY', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: NavSection.PROJECTS, label: 'WORKS', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { id: NavSection.CONTACT, label: 'COMM_LINK', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: NavSection.ADMIN, label: 'COMMAND', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  ];

  // Filter items based on unlock status
  const items = allItems.filter(item => item.id !== NavSection.ADMIN || isAdminUnlocked);

  return (
    <nav className="w-16 md:w-20 flex flex-col gap-4 py-4 hud-border hud-border-bl hud-border-tl overflow-y-auto custom-scroll">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`group relative flex flex-col items-center justify-center p-2 transition-all duration-300 shrink-0 ${
            activeSection === item.id 
              ? (item.id === NavSection.ADMIN ? 'text-amber-500 scale-110' : 'text-cyan-400 scale-110')
              : 'text-cyan-900 hover:text-cyan-600'
          }`}
        >
          {activeSection === item.id && (
            <div className={`absolute left-0 w-1 h-full shadow-[0_0_10px] ${
              item.id === NavSection.ADMIN ? 'bg-amber-500 shadow-amber-500' : 'bg-cyan-400 shadow-[#22d3ee]'
            }`} />
          )}
          <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
          </svg>
          <span className="text-[8px] font-hud uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {item.label}
          </span>
          {item.id === NavSection.ADMIN && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_5px_#f59e0b]" />
          )}
        </button>
      ))}
    </nav>
  );
};

export default Sidebar;
