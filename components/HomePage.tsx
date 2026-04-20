
import React, { useState, useCallback, useMemo } from 'react';
import type { Chapter } from '../types.ts';
import { ChevronRight, Clock, Search, ArrowLeft, Lock, BookOpen, Trophy } from './Icons.tsx';

interface HomePageProps {
  chapters: Chapter[];
  subjectName: string;
  onSelectChapter: (chapter: Chapter) => void;
  onStartMockExam: () => void;
  chapterScores: { [key: number]: { score: number, totalQuestions: number } };
  onBack: () => void;
  onHelpClick: () => void;
}

const cardGradients = [
  'from-indigo-500/10 to-purple-500/10',
  'from-emerald-500/10 to-teal-500/10',
  'from-rose-500/10 to-pink-500/10', 
  'from-amber-500/10 to-orange-500/10',
];

const accentColors = [
    'text-indigo-500 dark:text-indigo-400',
    'text-emerald-500 dark:text-emerald-400',
    'text-rose-500 dark:text-rose-400',
    'text-amber-500 dark:text-amber-400'
];

const HomePage: React.FC<HomePageProps> = ({ chapters, subjectName, onSelectChapter, onStartMockExam, chapterScores, onBack, onHelpClick }) => {
  const [chapterSearch, setChapterSearch] = useState('');

  const { availableChapters, lockedChapters } = useMemo(() => {
      let result = [...chapters];
      
      if (chapterSearch) {
          const cleanQuery = chapterSearch.toLowerCase().replace('chapter', '').replace('ch', '').trim();
          const lowerSearch = chapterSearch.toLowerCase();
          result = result.filter(ch => 
              ch.title.toLowerCase().includes(lowerSearch) || 
              ch.id.toString().includes(cleanQuery)
          );
      }

      // Filter based on audio availability as per request
      const available = result.filter(ch => ch.malayalamAudioUrl).sort((a,b) => a.id - b.id);
      const locked = result.filter(ch => !ch.malayalamAudioUrl).sort((a,b) => a.id - b.id);

      return { availableChapters: available, lockedChapters: locked };
  }, [chapters, chapterSearch]);

  const renderActiveChapterCard = (chapter: Chapter) => {
    const colorIndex = (chapter.id - 1) % cardGradients.length;
    const gradient = cardGradients[colorIndex];
    const textColor = accentColors[colorIndex];

    return (
      <button
        key={chapter.id}
        onClick={() => onSelectChapter(chapter)}
        className="group relative w-full text-left h-full min-h-[220px] transition-all duration-500 hover:-translate-y-1"
      >
        {/* Glow effect on hover */}
        <div className={`absolute -inset-0.5 rounded-[2rem] bg-gradient-to-br ${gradient.replace('/10', '/40')} opacity-0 blur-lg group-hover:opacity-100 transition-opacity duration-500`}></div>
        
        {/* Card Content */}
        <div className="relative h-full w-full rounded-[2rem] bg-surface border border-border p-6 sm:p-8 flex flex-col justify-between overflow-hidden group-hover:border-transparent transition-colors shadow-sm">
            
            {/* Ambient Background Gradient inside card */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg bg-surface/50 border border-white/20 shadow-inner ${textColor}`}>
                        {chapter.id}
                    </div>
                    {chapterScores[chapter.id] && (
                        <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            {Math.round((chapterScores[chapter.id].score / chapterScores[chapter.id].totalQuestions) * 100)}%
                        </div>
                    )}
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-text-main mb-2 leading-tight group-hover:text-primary transition-colors">
                    {chapter.title}
                </h3>
                <p className="text-text-muted text-sm line-clamp-2 font-medium leading-relaxed">
                    {chapter.description}
                </p>
            </div>

            <div className="relative z-10 mt-6 flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-all group-hover:gap-3">
                <span className={`${textColor} brightness-90`}>Start Learning</span>
                <ChevronRight className={`w-4 h-4 ${textColor}`} />
            </div>
        </div>
      </button>
    );
  };

  const renderLockedChapterCard = (chapter: Chapter) => {
    return (
      <div
        key={chapter.id}
        className="relative w-full text-left h-full min-h-[220px] rounded-[2rem] bg-surface-light/50 border border-border p-6 sm:p-8 flex flex-col justify-between opacity-80"
      >
            <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center text-text-muted font-bold text-lg border border-border">
                    {chapter.id}
                </div>
                <div className="flex items-center gap-1.5 text-text-muted text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-surface rounded-full border border-border">
                    <Lock className="w-3 h-3" /> Locked
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-text-muted mb-2 leading-tight">
                    {chapter.title}
                </h3>
                <p className="text-text-muted text-sm line-clamp-2 font-medium">
                    {chapter.description}
                </p>
            </div>

            <div className="mt-6 flex items-center justify-center">
                <span className="flex items-center gap-2 px-4 py-2 bg-surface rounded-full text-xs font-bold text-text-muted border border-border">
                    <Clock className="w-3 h-3" /> Available Soon
                </span>
            </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in pb-20">
      
      {/* Header Section */}
      <div className="mb-8">
         <button
              onClick={onBack}
              className="mb-6 flex items-center gap-2 text-text-muted hover:text-text-main transition-colors font-bold text-xs uppercase tracking-wide bg-surface px-4 py-2 rounded-full border border-border w-fit hover:bg-surface-light"
          >
              <ArrowLeft className="w-3 h-3" />
              Back to Subjects
          </button>
          <h1 className="text-3xl sm:text-5xl font-black text-text-main tracking-tight mb-3">
              {subjectName.split(' & ').map((part, i) => (
                  <React.Fragment key={i}>
                      {i > 0 && ' & '}
                      {i === 1 || subjectName.includes('Accounting') && i === 1 ? (
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{part}</span>
                      ) : part}
                  </React.Fragment>
              ))}
          </h1>
          <p className="text-text-muted text-lg font-medium max-w-2xl">
              ACCA Applied Knowledge Level • Detailed notes & voice lessons
          </p>
      </div>
      
      {/* Mock Exam Button - Compact Version */}
      <div className="mb-10 max-w-3xl mx-auto">
          <button 
            onClick={onStartMockExam}
            className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-4 sm:p-5 shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-1 flex items-center justify-between"
          >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex items-center gap-4 relative z-10">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white shadow-inner">
                      <Trophy className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                      <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                          ACCA BT Mock Exam
                          <span className="text-[10px] font-bold bg-white text-indigo-600 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">New</span>
                      </h3>
                      <p className="text-indigo-100 text-xs font-semibold opacity-90">100 Marks • 2 Hours</p>
                  </div>
              </div>

              <div className="relative z-10 bg-white text-indigo-600 p-2 rounded-lg shadow-lg transform group-hover:translate-x-1 transition-transform">
                  <ChevronRight className="w-5 h-5" />
              </div>
          </button>
      </div>

      {/* Filter/Search for Chapters */}
      <div className="w-full mb-6 flex justify-between items-center gap-4">
          <h2 className="text-xl font-bold text-text-main flex items-center gap-2 whitespace-nowrap">
             <BookOpen className="w-5 h-5 text-primary" /> 
             Chapters
          </h2>
          <div className="relative group w-full max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-500 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                  type="text"
                  className="block w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-text-main placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder="Filter chapters..."
                  value={chapterSearch}
                  onChange={(e) => setChapterSearch(e.target.value)}
              />
          </div>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {availableChapters.map((chapter) => renderActiveChapterCard(chapter))}
          {lockedChapters.map((chapter) => renderLockedChapterCard(chapter))}
      </div>

       {availableChapters.length === 0 && lockedChapters.length === 0 && (
            <div className="py-20 text-center border border-dashed border-border rounded-3xl bg-surface/50">
                <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-text-muted font-bold">No chapters found</p>
                <button onClick={() => setChapterSearch('')} className="mt-2 text-primary text-sm hover:underline">Clear Search</button>
            </div>
      )}

    </div>
  );
};

export default HomePage;
