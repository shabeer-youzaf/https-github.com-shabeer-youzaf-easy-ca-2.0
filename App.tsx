
import React, { useState, useCallback, useEffect } from 'react';
import SubjectsPage from './components/SubjectsPage.tsx';
import HomePage from './components/HomePage.tsx';
import ChapterPage from './components/ChapterPage.tsx';
import DeveloperInfoPage from './components/DeveloperInfoPage.tsx';
import MockExamPage from './components/MockExamPage.tsx';
import ExamResultsPage from './components/ExamResultsPage.tsx';
import { Home, RefreshCw, Sun, Moon, HelpCircle } from './components/Icons.tsx';
import type { Chapter, MockQuestion, UserAnswer } from './types.ts';
import { chapters } from './data/chapters.ts';
import { mockQuestions } from './data/mockExamQuestions.ts';
import { maMockQuestions } from './data/maMockQuestions.ts';

type View = 'subjects' | 'home' | 'chapter' | 'developer' | 'mockExam' | 'examResults';
type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [view, setView] = useState<View>('subjects');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  
  // State for exam results
  const [examResults, setExamResults] = useState<{
      score: number;
      totalMarks: number;
      userAnswers: UserAnswer[];
      questions: MockQuestion[];
  } | null>(null);

  const [examId, setExamId] = useState(0);

  const [theme, setTheme] = useState<Theme>(() => {
      if (typeof window !== 'undefined') {
          return (localStorage.getItem('theme') as Theme) || 'dark';
      }
      return 'dark';
  });

  const [chapterScores, setChapterScores] = useState<{ [key: number]: { score: number, totalQuestions: number } }>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const saved = localStorage.getItem('acca_chapter_scores');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Failed to load chapter scores", e);
      return {};
    }
  });

  const [showRefreshConfirm, setShowRefreshConfirm] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('acca_chapter_scores', JSON.stringify(chapterScores));
  }, [chapterScores]);

  const handleThemeToggle = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleSelectSubject = useCallback((subjectId: string) => {
    setSelectedSubject(subjectId);
    setView('home');
  }, []);

  const handleGoRoot = useCallback(() => {
      setSelectedSubject(null);
      setSelectedChapter(null);
      setView('subjects');
  }, []);

  const handleGoSubjectDashboard = useCallback(() => {
    setSelectedChapter(null);
    setView('home');
  }, []);

  const handleSelectChapter = useCallback((chapter: Chapter) => {
    setSelectedChapter(chapter);
    setView('chapter');
  }, []);

  const handleStartMockExam = useCallback(() => {
      setExamId(prev => prev + 1);
      setView('mockExam');
  }, []);

  const handleFinishExam = useCallback((score: number, totalMarks: number, userAnswers: UserAnswer[], questions: MockQuestion[]) => {
      setExamResults({ score, totalMarks, userAnswers, questions });
      setView('examResults');
  }, []);

  const handleUpdateChapterScore = useCallback((chapterId: number, score: number, totalQuestions: number) => {
    setChapterScores(prev => ({
      ...prev,
      [chapterId]: { score, totalQuestions }
    }));
  }, []);

  const handleRefreshClick = useCallback(() => {
    setShowRefreshConfirm(true);
  }, []);
  
  const confirmRefresh = useCallback(() => {
      localStorage.removeItem('acca_chapter_scores');
      localStorage.removeItem('acca_exam_results');
      window.location.reload();
  }, []);
  
  const handleDeveloperClick = useCallback(() => {
      setView('developer');
  }, []);

  const renderContent = () => {
    switch (view) {
      case 'subjects':
        return <SubjectsPage onSelectSubject={handleSelectSubject} onSelectChapter={handleSelectChapter} onHelpClick={handleDeveloperClick} />;
      case 'developer':
        return <DeveloperInfoPage onBack={handleGoRoot} />;
      case 'chapter':
        return <ChapterPage chapter={selectedChapter!} onGoHome={handleGoSubjectDashboard} onUpdateChapterScore={handleUpdateChapterScore} />;
      case 'mockExam':
        const subjectNameMock = selectedSubject === 'BT' ? 'Business & Technology' : selectedSubject === 'MA' ? 'Management Accounting' : 'ACCA Exam';
        const subjectQuestions = selectedSubject === 'MA' ? maMockQuestions : mockQuestions;
        return <MockExamPage 
          key={examId} 
          questions={subjectQuestions} 
          subjectName={subjectNameMock} 
          onFinishExam={handleFinishExam} 
          onGoHome={handleGoSubjectDashboard} 
        />;
      case 'examResults':
        return <ExamResultsPage results={examResults!} onRestart={handleStartMockExam} onGoHome={handleGoSubjectDashboard} />;
      case 'home':
      default:
        const filteredChapters = chapters.filter(ch => ch.subjectId === selectedSubject);
        const subjectName = selectedSubject === 'BT' ? 'Business & Technology' : selectedSubject === 'MA' ? 'Management Accounting' : 'Accounting';
        
        return <HomePage 
          chapters={filteredChapters} 
          subjectName={subjectName}
          onSelectChapter={handleSelectChapter} 
          onStartMockExam={handleStartMockExam}
          chapterScores={chapterScores} 
          onBack={handleGoRoot} 
          onHelpClick={handleDeveloperClick}
        />;
    }
  };

  const RefreshModal = () => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[100] animate-fade-in p-4">
        <div className="bg-surface border border-border p-6 sm:p-8 rounded-2xl shadow-2xl text-center max-w-sm mx-auto">
            <h3 className="text-xl font-bold text-text-main mb-4">Reset Progress?</h3>
            <p className="text-text-muted mb-8 leading-relaxed">
              Are you sure you want to reset your progress? All your chapter scores will be permanently lost.
            </p>
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => setShowRefreshConfirm(false)}
                    className="btn-secondary py-2 px-6 rounded-xl"
                >
                    Cancel
                </button>
                <button
                    onClick={confirmRefresh}
                    className="py-2 px-6 font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-lg shadow-red-500/20 transition-all"
                >
                    Yes, Reset
                </button>
            </div>
        </div>
    </div>
  );

  let currentContext = "General ACCA Business & Technology Dashboard";
  if (view === 'chapter' && selectedChapter) {
      currentContext = `Chapter ${selectedChapter.id}: ${selectedChapter.title}`;
  } else if (view === 'subjects') {
      currentContext = "Subject Selection Screen";
  } else if (view === 'mockExam') {
      currentContext = "Taking ACCA Mock Exam";
  }

  return (
    <div className="min-h-screen text-text-main font-sans bg-background relative selection:bg-primary/30 selection:text-white">
      {/* Ambient Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {showRefreshConfirm && <RefreshModal />}
      
      {/* Fixed Glass Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 bg-background/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex justify-between items-center">
          
          <div onClick={handleGoRoot} className="cursor-pointer flex items-center gap-3 group">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                <Home className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                  <span className="font-black tracking-widest uppercase text-sm leading-none text-text-main group-hover:text-primary transition-colors">
                    EASY CA
                  </span>
                  <span className="text-[10px] text-text-muted font-medium tracking-wide">
                    ACCA Study Companion
                  </span>
              </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
                onClick={handleDeveloperClick}
                className="hidden md:flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full text-text-muted hover:text-text-main hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
            >
                <HelpCircle className="w-4 h-4" />
                <span>Help</span>
            </button>

            <div className="h-6 w-px bg-border mx-1 hidden sm:block"></div>

            <div className="theme-switch-wrapper">
              <Sun className="h-4 w-4 text-yellow-500" />
              <label className="theme-switch">
                  <input type="checkbox" checked={theme === 'dark'} onChange={handleThemeToggle} />
                  <span className="slider round"></span>
              </label>
              <Moon className="h-4 w-4 text-primary" />
            </div>

            <button
              onClick={handleRefreshClick}
              className="p-2 rounded-full hover:bg-white/5 text-text-muted hover:text-red-400 transition-colors"
              aria-label="Reset progress"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content with Top Padding for Header */}
      <main className="relative z-10 max-w-7xl mx-auto pt-24 sm:pt-28 px-4 sm:px-6 min-h-[calc(100vh-80px)]">
        {renderContent()}
      </main>
      
      <footer className="relative z-10 text-center py-8 text-xs text-text-muted/50 font-medium">
         <p>© {new Date().getFullYear()} Easy CA. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
