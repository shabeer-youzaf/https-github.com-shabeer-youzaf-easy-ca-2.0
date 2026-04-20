
import React, { useState, useMemo } from 'react';
import { Lock, Briefcase, BarChart, Shield, Globe, TrendingUp, Layers, Target, FileText, Users, Search, ChevronRight, Plus, Minus, MessageSquare } from './Icons.tsx';
import { chapters } from '../data/chapters.ts';
import type { Chapter } from '../types.ts';

interface Subject {
  id: string;
  name: string;
  code: string;
  active: boolean;
  progress: number;
}

interface Module {
  title: string;
  tabLabel: string;
  description?: string;
  subjects?: Subject[];
  groups?: { title: string; subjects: Subject[] }[];
}

const modules: Module[] = [
  {
    title: "Applied Knowledge",
    tabLabel: "Knowledge",
    description: "Build your essential understanding of finance and accounting.",
    subjects: [
      { id: 'BT', name: 'Business and Technology', code: 'BT', active: true, progress: 0 },
      { id: 'FA', name: 'Financial Accounting', code: 'FA', active: false, progress: 0 },
      { id: 'MA', name: 'Management Accounting', code: 'MA', active: true, progress: 0 },
    ]
  },
  {
    title: "Applied Skills",
    tabLabel: "Skills",
    description: "Develop strong, broad, and practical finance skills.",
    subjects: [
      { id: 'LW', name: 'Corporate Law', code: 'LW', active: false, progress: 0 },
      { id: 'TX', name: 'Taxation', code: 'TX', active: false, progress: 0 },
      { id: 'FR', name: 'Financial Reporting', code: 'FR', active: false, progress: 0 },
      { id: 'PM', name: 'Performance Mgmt', code: 'PM', active: false, progress: 0 },
      { id: 'FM', name: 'Financial Mgmt', code: 'FM', active: false, progress: 0 },
      { id: 'AA', name: 'Audit & Assurance', code: 'AA', active: false, progress: 0 },
    ]
  },
  {
    title: "Strategic Professional",
    tabLabel: "Strategic",
    description: "Prepare for future leadership positions with strategic vision.",
    groups: [
      {
        title: "Essentials",
        subjects: [
          { id: 'SBR', name: 'Strategic Reporting', code: 'SBR', active: false, progress: 0 },
          { id: 'SBL', name: 'Strategic Leader', code: 'SBL', active: false, progress: 0 },
        ]
      },
      {
        title: "Options",
        subjects: [
          { id: 'AFM', name: 'Adv. Financial Mgmt', code: 'AFM', active: false, progress: 0 },
          { id: 'AAA', name: 'Adv. Audit & Assurance', code: 'AAA', active: false, progress: 0 },
          { id: 'ATX', name: 'Adv. Taxation', code: 'ATX', active: false, progress: 0 },
          { id: 'APM', name: 'Adv. Performance Mgmt', code: 'APM', active: false, progress: 0 },
        ]
      }
    ]
  }
];

const getAllSubjects = (): Subject[] => {
    const all: Subject[] = [];
    modules.forEach(mod => {
        if (mod.subjects) all.push(...mod.subjects);
        if (mod.groups) mod.groups.forEach(g => all.push(...g.subjects));
    });
    return all;
};

const displayModules: Module[] = [
    {
        title: "All Subjects",
        tabLabel: "All Modules",
        description: "Explore the complete ACCA curriculum.",
        subjects: getAllSubjects()
    },
    ...modules
];

const getIcon = (code: string) => {
    const className = "w-6 h-6"; 
    switch(code) {
        case 'BT': return <Briefcase className={className} />;
        case 'MA': return <TrendingUp className={className} />;
        case 'FA': return <BarChart className={className} />;
        case 'LW': return <Shield className={className} />;
        case 'PM': return <Target className={className} />;
        case 'TX': return <Layers className={className} />;
        case 'FR': return <FileText className={className} />;
        case 'AA': return <Search className={className} />;
        case 'FM': return <TrendingUp className={className} />;
        case 'SBR': return <FileText className={className} />;
        case 'SBL': return <Users className={className} />;
        case 'AFM': return <BarChart className={className} />;
        case 'APM': return <Target className={className} />;
        case 'ATX': return <Layers className={className} />;
        case 'AAA': return <Search className={className} />;
        default: return <Globe className={className} />;
    }
};

interface SubjectsPageProps {
  onSelectSubject: (id: string) => void;
  onSelectChapter: (chapter: Chapter) => void;
  onHelpClick: () => void;
}

const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onToggle: () => void }> = ({ question, answer, isOpen, onToggle }) => {
    return (
        <div className={`border-b border-white/5 last:border-0 transition-all duration-300 ${isOpen ? 'bg-white/5 rounded-2xl border-transparent px-4' : 'px-4'}`}>
            <button
                onClick={onToggle}
                className="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
            >
                <span className={`text-sm sm:text-base font-bold transition-colors ${isOpen ? 'text-primary' : 'text-text-main group-hover:text-primary'}`}>
                    {question}
                </span>
                <div className={`p-1 rounded-full transition-all duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-text-muted group-hover:text-primary'}`}>
                     {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
            </button>
            <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
            >
                <p className="text-sm text-text-muted leading-relaxed">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const SubjectCard: React.FC<{ subject: Subject; onClick: (id: string) => void }> = ({ subject, onClick }) => {
  const isActive = subject.active;
  
  return (
    <div className={`group relative h-full ${isActive ? 'cursor-pointer' : 'cursor-not-allowed opacity-70 grayscale-[0.5]'}`}>
        
        {/* Card Background & Border */}
        <button
            onClick={() => isActive && onClick(subject.id)}
            disabled={!isActive}
            className={`relative w-full h-full text-left rounded-3xl p-6 flex flex-col justify-between overflow-hidden transition-all duration-500 border hover:-translate-y-1 ${
                isActive 
                ? 'bg-surface border-border hover:border-primary/50 hover:shadow-lg shadow-sm' 
                : 'bg-surface/50 border-transparent'
            }`}
        >
            {/* Hover Glow Background */}
            {isActive && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            )}

            <div className="relative z-10 w-full">
                <div className="flex justify-between items-start mb-6">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                         isActive 
                         ? 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-primary/20' 
                         : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                     }`}>
                         {isActive ? getIcon(subject.code) : <Lock className="w-5 h-5" />}
                     </div>
                     
                     <div className={`px-2 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase border ${
                         isActive 
                         ? 'bg-primary/10 text-primary border-primary/20' 
                         : 'bg-slate-200 dark:bg-slate-800 text-slate-400 border-transparent'
                     }`}>
                         {subject.code}
                     </div>
                </div>

                <h3 className={`text-xl font-bold leading-tight mb-2 pr-4 ${
                    isActive 
                    ? 'text-text-main group-hover:text-primary transition-colors'
                    : 'text-text-muted'
                }`}>
                    {subject.name}
                </h3>
                
                <p className="text-xs font-medium text-text-muted">
                    {isActive ? 'Click to explore modules' : 'Available soon'}
                </p>
            </div>

            {isActive && (
                <div className="mt-6 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wide group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100">
                    <span>Open</span>
                    <ChevronRight className="w-3 h-3" />
                </div>
            )}
        </button>
    </div>
  );
};

const SubjectsPage: React.FC<SubjectsPageProps> = ({ onSelectSubject, onSelectChapter, onHelpClick }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
      { q: "How do I prepare for the exam?", a: "Study the chapter summaries, use the flashcards for quick revision, and practice with the mock exams." },
      { q: "What resources are included?", a: "We provide detailed syllabus guides, technical articles, specimen exams, and exam team guidance." },
      { q: "How is the exam structured?", a: "The exam is a 2-hour CBE consisting of Section A (Objective Questions) and Section B (Multi-task Scenarios)." },
      { q: "What is the passing mark?", a: "You need to achieve at least 50% to pass the exam." }
  ];

  const { filteredModules } = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    
    let matchingModules: any[] = [];
    if (searchQuery) {
        modules.forEach(mod => {
            if (mod.subjects) {
                const matches = mod.subjects.filter(s => s.name.toLowerCase().includes(lowerQuery) || s.code.toLowerCase().includes(lowerQuery));
                if (matches.length) matchingModules.push({ ...mod, subjects: matches, groups: undefined });
            }
            if (mod.groups) {
                 mod.groups.forEach(grp => {
                     const matches = grp.subjects.filter(s => s.name.toLowerCase().includes(lowerQuery) || s.code.toLowerCase().includes(lowerQuery));
                     if (matches.length) {
                         matchingModules.push({ title: mod.title, groups: [{ ...grp, subjects: matches }] });
                     }
                 })
            }
        });
    } else {
        matchingModules = modules; 
    }
    return { filteredModules: matchingModules };
  }, [searchQuery]);

  return (
    <div className="space-y-12 pb-24 overflow-x-hidden animate-fade-in">
      
      {/* Hero Section */}
      <div className="relative pt-6 pb-6 flex flex-col items-center text-center">
          
          <div className="space-y-4 max-w-4xl mx-auto px-6">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-text-main mb-4">
                Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">ACCA Journey</span>
            </h1>
            <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
                Your intelligent companion for professional accounting exams.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="w-full max-w-lg mt-10 relative group z-10">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-500 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-4 bg-surface border border-border rounded-2xl text-base outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-xl text-text-main placeholder-slate-500 hover:bg-surface-light"
                  placeholder="Find a subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
          </div>
      </div>

      {/* Filter Tabs */}
      {!searchQuery && (
          <div className="flex justify-center px-4 relative z-10">
            <div className="inline-flex p-1 bg-surface-light/50 backdrop-blur-md rounded-2xl border border-white/5">
                {displayModules.map((mod, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                            activeTab === idx
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'text-text-muted hover:text-text-main hover:bg-white/5'
                        }`}
                    >
                        {mod.tabLabel}
                    </button>
                ))}
            </div>
          </div>
      )}

      {/* Modules Grid */}
      <div className="w-full">
           {(searchQuery) ? (
               <div className="max-w-7xl mx-auto px-4 sm:px-6">
                 {filteredModules.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-border rounded-3xl bg-surface/5">
                        <p className="text-text-muted text-lg font-medium">No results for "{searchQuery}"</p>
                        <button onClick={() => setSearchQuery('')} className="mt-4 px-6 py-2 text-primary font-bold hover:bg-white/5 rounded-xl transition-colors">Clear Search</button>
                    </div>
                 ) : (
                    <div className="space-y-12">
                        {filteredModules.map((module: any, mIdx: number) => (
                            <div key={mIdx}>
                                <h3 className="mb-6 text-xs font-black text-text-muted uppercase tracking-[0.2em] pl-2 border-l-2 border-primary">{module.title}</h3>
                                {module.subjects && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {module.subjects.map((subject: Subject) => (
                                            <SubjectCard key={subject.id} subject={subject} onClick={onSelectSubject} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                 )}
               </div>
           ) : (
             <div className="overflow-hidden w-full">
                <div 
                    className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{ transform: `translateX(-${activeTab * 100}%)` }}
                >
                    {displayModules.map((module, idx) => (
                        <div key={idx} className="w-full flex-shrink-0 max-w-7xl mx-auto opacity-100 transition-opacity duration-500 px-4 sm:px-6">
                             <div className="py-4">
                                {module.description && (
                                    <div className="max-w-2xl mx-auto mb-10 text-center">
                                        <p className="text-base text-text-muted">
                                            {module.description}
                                        </p>
                                    </div>
                                )}

                                {module.subjects && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                                        {module.subjects.map(subject => (
                                            <SubjectCard key={subject.id} subject={subject} onClick={onSelectSubject} />
                                        ))}
                                    </div>
                                )}

                                {module.groups && (
                                    <div className="space-y-12 max-w-7xl mx-auto">
                                        {module.groups.map(group => (
                                            <div key={group.title}>
                                                <h3 className="mb-6 text-xs font-black text-text-muted uppercase tracking-[0.2em] flex items-center gap-4 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                                                    {group.title}
                                                </h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                    {group.subjects.map(subject => (
                                                        <SubjectCard key={subject.id} subject={subject} onClick={onSelectSubject} />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                             </div>
                        </div>
                    ))}
                </div>
             </div>
           )}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto pt-12 border-t border-border px-6 mt-8">
          <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-text-main flex items-center justify-center gap-2">
                 FAQs
              </h3>
          </div>
          <div className="bg-surface-light/30 backdrop-blur-sm rounded-3xl p-2 border border-border">
              {faqs.map((item, index) => (
                  <FAQItem 
                      key={index}
                      question={item.q}
                      answer={item.a}
                      isOpen={openFAQ === index}
                      onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
                  />
              ))}
          </div>
      </div>

      {/* Floating Help Button */}
      <button
        onClick={onHelpClick}
        className="fixed bottom-6 right-6 z-40 group flex items-center hover:scale-105 transition-transform duration-300"
      >
        <div className="relative">
            <div className="absolute inset-0 bg-primary/50 rounded-full blur-lg group-hover:blur-xl transition-all duration-300 animate-pulse opacity-50"></div>
            <div className="relative w-14 h-14 bg-surface text-white rounded-full flex items-center justify-center shadow-2xl border border-white/10 transition-transform group-hover:rotate-12 hover:bg-surface-light hover:border-primary/50">
               <MessageSquare className="w-6 h-6 text-text-main" />
            </div>
        </div>
      </button>

    </div>
  );
};

export default SubjectsPage;
