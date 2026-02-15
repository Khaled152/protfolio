
import React, { useState } from 'react';
import { Project } from '../types';

interface ProjectPanelProps {
  projects: Project[];
}

const PROJECTS_PER_PAGE = 4;

const ProjectPanel: React.FC<ProjectPanelProps> = ({ projects }) => {
  const [selectedId, setSelectedId] = useState<string>(projects[0]?.id || '');
  const [showLiveView, setShowLiveView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = projects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  const selected = projects.find(p => p.id === selectedId) || projects[0];

  const ensureAbsoluteUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
  };

  const liveUrl = ensureAbsoluteUrl(selected?.links?.live);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of panel if needed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-12">
      {/* Live Preview Modal */}
      {showLiveView && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 w-full max-w-5xl h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="h-16 px-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-white dark:bg-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="font-bold text-slate-900 dark:text-white truncate">{selected?.title} Live View</h3>
              </div>
              <button 
                onClick={() => setShowLiveView(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 bg-slate-100 dark:bg-slate-900 relative">
              <iframe src={liveUrl} className="w-full h-full border-none" title={selected?.title} />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                <div className="bg-white/90 dark:bg-slate-800/90 px-6 py-3 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 backdrop-blur-md">
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center gap-2">
                    Open in New Tab
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header with Results Count */}
      <div className="flex justify-between items-center px-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Selected Works</h2>
          <p className="text-sm text-slate-500">Showing {startIndex + 1}-{Math.min(startIndex + PROJECTS_PER_PAGE, projects.length)} of {projects.length} projects</p>
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {paginatedProjects.map((project) => (
          <div 
            key={project.id}
            onClick={() => setSelectedId(project.id)}
            className={`group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border transition-all cursor-pointer flex flex-col ${
              selectedId === project.id ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-800 hover:shadow-xl'
            }`}
          >
            <div className="h-64 bg-slate-200 dark:bg-slate-700 relative overflow-hidden shrink-0">
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div className="flex gap-2 w-full">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedId(project.id); setShowLiveView(true); }}
                    className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl text-sm font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-95"
                  >
                    Launch Demo
                  </button>
                  <a 
                    href={ensureAbsoluteUrl(project.links?.github)} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white/10 backdrop-blur-md text-white border border-white/20 p-3 rounded-xl hover:bg-white/20 transition-all"
                    title="View Source"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <span className="text-[10px] px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-lg font-bold uppercase tracking-wider border border-slate-200 dark:border-slate-600">{project.category}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
                {project.technologies.map(tech => (
                  <span key={tech} className="text-[9px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest bg-slate-50 dark:bg-slate-900/50 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8 py-4 border-t border-slate-200 dark:border-slate-800">
          <button 
            onClick={() => goToPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-xl transition-all ${
              currentPage === 1 
                ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-500 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button 
            onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-xl transition-all ${
              currentPage === totalPages 
                ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectPanel;
