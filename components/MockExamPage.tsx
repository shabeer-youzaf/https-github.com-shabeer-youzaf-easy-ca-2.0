
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { 
    MockQuestion, 
    SingleChoiceQuestion, 
    MultiChoiceQuestion, 
    MatchingQuestion, 
    DropdownQuestion, 
    ScenarioQuestion,
    UserAnswer,
    UserAnswerValue,
    MatchingAnswer,
    DropdownAnswer
} from '../types.ts';
import { Clock, Loader, ArrowLeft, CheckCircle, Layers, ChevronLeft, ChevronRight, Flag, Target, FileText, Trophy } from './Icons.tsx';

interface MockExamPageProps {
  questions: MockQuestion[];
  onFinishExam: (score: number, totalMarks: number, userAnswers: UserAnswer[], questions: MockQuestion[]) => void;
  onGoHome: () => void;
}

const EXAM_DURATION = 7200; // 2 hours in seconds

// Helper to shuffle arrays
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

// --- Sub-Components for Question Types ---

const SingleChoice: React.FC<{ 
    q: SingleChoiceQuestion; 
    answer: string | undefined; 
    onAnswer: (questionId: string, answer: string) => void; 
}> = ({ q, answer, onAnswer }) => {
    return (
        <div className="space-y-3">
            {q.options.map((option, idx) => (
                <label 
                    key={idx} 
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        answer === option 
                        ? 'border-primary bg-primary/5' 
                        : 'border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                >
                    <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                        answer === option ? 'border-primary' : 'border-slate-300'
                    }`}>
                        {answer === option && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <span className="text-dark font-medium text-sm sm:text-base">{option}</span>
                    <input 
                        type="radio" 
                        name={q.id} 
                        value={option} 
                        checked={answer === option} 
                        onChange={() => onAnswer(q.id, option)} 
                        className="hidden"
                    />
                </label>
            ))}
        </div>
    );
};

const MultiChoice: React.FC<{ 
    q: MultiChoiceQuestion; 
    answer: string[] | undefined; 
    onAnswer: (questionId: string, answer: string[]) => void; 
}> = ({ q, answer, onAnswer }) => {
    const selected = answer || [];
    
    const toggle = (option: string) => {
        if (selected.includes(option)) {
            onAnswer(q.id, selected.filter(s => s !== option));
        } else {
            onAnswer(q.id, [...selected, option]);
        }
    };

    return (
        <div className="space-y-3">
            {q.options.map((option, idx) => (
                <label 
                    key={idx} 
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selected.includes(option)
                        ? 'border-primary bg-primary/5' 
                        : 'border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                >
                    <div className={`w-5 h-5 rounded border-2 mr-4 flex items-center justify-center ${
                        selected.includes(option) ? 'border-primary bg-primary' : 'border-slate-300'
                    }`}>
                         {selected.includes(option) && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span className="text-dark font-medium text-sm sm:text-base">{option}</span>
                    <input 
                        type="checkbox" 
                        checked={selected.includes(option)} 
                        onChange={() => toggle(option)} 
                        className="hidden"
                    />
                </label>
            ))}
        </div>
    );
};

const Matching: React.FC<{
    q: MatchingQuestion;
    answer: MatchingAnswer | undefined;
    onAnswer: (questionId: string, answer: MatchingAnswer) => void;
}> = ({ q, answer, onAnswer }) => {
    const currentAnswer = answer || {};
    const rightOptions = useMemo(() => q.pairs.map(p => p.right).sort(), [q]);

    const handleChange = (left: string, right: string) => {
        onAnswer(q.id, { ...currentAnswer, [left]: right });
    };

    return (
        <div className="space-y-4">
            {q.pairs.map((pair, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                    <div className="flex-1 font-medium text-dark">{pair.left}</div>
                    <div className="hidden sm:block text-slate-400">→</div>
                    <div className="flex-1">
                        <select 
                            className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-dark text-sm focus:ring-2 focus:ring-primary outline-none"
                            value={currentAnswer[pair.left] || ''}
                            onChange={(e) => handleChange(pair.left, e.target.value)}
                        >
                            <option value="">Select match...</option>
                            {rightOptions.map((opt, i) => (
                                <option key={i} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Dropdown: React.FC<{
    q: DropdownQuestion;
    answer: DropdownAnswer | undefined;
    onAnswer: (questionId: string, answer: DropdownAnswer) => void;
}> = ({ q, answer, onAnswer }) => {
    const currentAnswer = answer || {};

    const handleChange = (partIndex: number, value: string) => {
        onAnswer(q.id, { ...currentAnswer, [partIndex]: value });
    };

    return (
        <div className="leading-loose text-lg text-dark">
            {q.parts.map((part, idx) => (
                <span key={idx}>
                    {part.text && <span>{part.text} </span>}
                    {part.options && (
                        <select
                            className="inline-block mx-2 p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary outline-none"
                            value={currentAnswer[idx] || ''}
                            onChange={(e) => handleChange(idx, e.target.value)}
                        >
                             <option value="">Select...</option>
                             {part.options.map((opt, i) => (
                                 <option key={i} value={opt}>{opt}</option>
                             ))}
                        </select>
                    )}
                </span>
            ))}
        </div>
    );
};

const Scenario: React.FC<{
    q: ScenarioQuestion;
    answers: UserAnswer[];
    onAnswer: (questionId: string, answer: UserAnswerValue) => void;
}> = ({ q, answers, onAnswer }) => {
    return (
        <div className="space-y-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
                <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2 uppercase text-xs tracking-wider">Scenario</h4>
                <p className="text-dark leading-relaxed">{q.scenario}</p>
            </div>
            
            <div className="space-y-12">
                {q.questions.map((subQ, idx) => {
                    const ans = answers.find(a => a.questionId === subQ.id)?.answer;
                    return (
                        <div key={subQ.id} className="pl-4 border-l-4 border-slate-200 dark:border-slate-700">
                            <h5 className="font-bold text-slate-500 mb-4 text-sm">Question {idx + 1}</h5>
                            <p className="text-lg font-bold text-dark mb-4">{subQ.question}</p>
                            {subQ.type === 'single' && <SingleChoice q={subQ as SingleChoiceQuestion} answer={ans as string} onAnswer={onAnswer} />}
                            {subQ.type === 'multi' && <MultiChoice q={subQ as MultiChoiceQuestion} answer={ans as string[]} onAnswer={onAnswer} />}
                            {subQ.type === 'matching' && <Matching q={subQ as MatchingQuestion} answer={ans as MatchingAnswer} onAnswer={onAnswer} />}
                            {subQ.type === 'dropdown' && <Dropdown q={subQ as DropdownQuestion} answer={ans as DropdownAnswer} onAnswer={onAnswer} />}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Main Component
const MockExamPage: React.FC<MockExamPageProps> = ({ questions, onFinishExam, onGoHome }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [flagged, setFlagged] = useState<string[]>([]);
  
  // Only shuffle once on mount
  const shuffledQuestions = useMemo(() => shuffleArray(questions), [questions]);

  useEffect(() => {
    if (!hasStarted) return;

    const timer = setInterval(() => {
        setTimeLeft((prev) => {
            if (prev <= 1) {
                clearInterval(timer);
                finishExam();
                return 0;
            }
            return prev - 1;
        });
    }, 1000);
    return () => clearInterval(timer);
  }, [hasStarted]);

  const formatTime = (seconds: number) => {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleAnswer = useCallback((questionId: string, answer: UserAnswerValue) => {
      setAnswers(prev => {
          const existing = prev.findIndex(a => a.questionId === questionId);
          if (existing >= 0) {
              const newAnswers = [...prev];
              newAnswers[existing] = { questionId, answer };
              return newAnswers;
          }
          return [...prev, { questionId, answer }];
      });
  }, []);

  const toggleFlag = () => {
      const currentId = shuffledQuestions[currentQIndex].id;
      if (flagged.includes(currentId)) {
          setFlagged(flagged.filter(id => id !== currentId));
      } else {
          setFlagged([...flagged, currentId]);
      }
  };

  const calculateScore = () => {
      let score = 0;
      let totalMarks = 0;

      // Helper to check correctness
      const checkQuestion = (q: MockQuestion, ans: UserAnswerValue | undefined) => {
          if (!ans) return 0;

          if (q.type === 'single') {
              return ans === (q as SingleChoiceQuestion).correctAnswer ? q.marks : 0;
          }
          if (q.type === 'multi') {
              const userAns = ans as string[];
              const correctAns = (q as MultiChoiceQuestion).correctAnswers;
              if (userAns.length !== correctAns.length) return 0;
              const allCorrect = userAns.every(v => correctAns.includes(v));
              return allCorrect ? q.marks : 0; // Usually all or nothing in simple mocks
          }
          if (q.type === 'matching') {
              const userAns = ans as MatchingAnswer;
              const pairs = (q as MatchingQuestion).pairs;
              const allCorrect = pairs.every(p => userAns[p.left] === p.right);
              return allCorrect ? q.marks : 0;
          }
          if (q.type === 'dropdown') {
              const userAns = ans as DropdownAnswer;
              const parts = (q as DropdownQuestion).parts;
              // Check each part
              let idx = 0;
              const allCorrect = parts.every(part => {
                   if (!part.options) { idx++; return true; }
                   const correct = userAns[idx] === part.correctAnswer;
                   idx++;
                   return correct;
              });
              return allCorrect ? q.marks : 0;
          }
          return 0;
      };

      shuffledQuestions.forEach(q => {
          if (q.type === 'scenario') {
              const sq = q as ScenarioQuestion;
              sq.questions.forEach(subQ => {
                  totalMarks += subQ.marks;
                  const uAns = answers.find(a => a.questionId === subQ.id)?.answer;
                  score += checkQuestion(subQ, uAns);
              });
          } else {
              totalMarks += q.marks;
              const uAns = answers.find(a => a.questionId === q.id)?.answer;
              score += checkQuestion(q, uAns);
          }
      });
      return { score, totalMarks };
  };

  const finishExam = () => {
      const { score, totalMarks } = calculateScore();
      onFinishExam(score, totalMarks, answers, shuffledQuestions);
  };

  const currentQ = shuffledQuestions[currentQIndex];
  const isLast = currentQIndex === shuffledQuestions.length - 1;

  if (!hasStarted) {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
             {/* Background decoration */}
             <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>

             <div className="max-w-2xl w-full bg-surface border border-border rounded-[2rem] shadow-2xl overflow-hidden relative z-10 animate-slide-up">
                 <div className="p-8 sm:p-12 text-center border-b border-border bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm">
                     <div className="w-20 h-20 bg-white dark:bg-slate-700 rounded-3xl shadow-lg mx-auto flex items-center justify-center mb-6 transform rotate-3 border border-slate-100 dark:border-slate-600">
                         <Trophy className="w-10 h-10 text-amber-500" />
                     </div>
                     <h1 className="text-3xl sm:text-4xl font-black text-dark mb-2">ACCA Mock Exam</h1>
                     <p className="text-text-muted font-medium text-lg">Business & Technology (BT)</p>
                 </div>
                 
                 <div className="p-8 sm:p-12 space-y-8">
                     {/* Stats Grid */}
                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                         <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-center border border-blue-100 dark:border-blue-800">
                             <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                             <p className="font-bold text-dark text-lg">120</p>
                             <p className="text-xs text-text-muted uppercase font-bold tracking-wider">Mins</p>
                         </div>
                         <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-center border border-emerald-100 dark:border-emerald-800">
                             <Target className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                             <p className="font-bold text-dark text-lg">50%</p>
                             <p className="text-xs text-text-muted uppercase font-bold tracking-wider">Pass Mark</p>
                         </div>
                         <div className="p-4 rounded-2xl bg-violet-50 dark:bg-violet-900/20 text-center border border-violet-100 dark:border-violet-800">
                             <Trophy className="w-6 h-6 text-violet-600 dark:text-violet-400 mx-auto mb-2" />
                             <p className="font-bold text-dark text-lg">100</p>
                             <p className="text-xs text-text-muted uppercase font-bold tracking-wider">Total Marks</p>
                         </div>
                          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-center border border-amber-100 dark:border-amber-800">
                             <FileText className="w-6 h-6 text-amber-600 dark:text-amber-400 mx-auto mb-2" />
                             <p className="font-bold text-dark text-lg">52</p>
                             <p className="text-xs text-text-muted uppercase font-bold tracking-wider">Questions</p>
                         </div>
                     </div>

                     {/* Structure Info */}
                     <div className="space-y-4">
                         <h3 className="font-bold text-dark uppercase tracking-widest text-xs mb-4">Exam Structure</h3>
                         
                         <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-background/50">
                             <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary text-sm">A</div>
                             <div>
                                 <p className="font-bold text-dark text-sm">Section A: Objective Test</p>
                                 <p className="text-text-muted text-sm mt-1">46 questions (1 or 2 marks each). Total 76 marks.</p>
                             </div>
                         </div>
                         
                         <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-background/50">
                             <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary text-sm">B</div>
                             <div>
                                 <p className="font-bold text-dark text-sm">Section B: Multi-Task Questions</p>
                                 <p className="text-text-muted text-sm mt-1">6 scenario-based questions (4 marks each). Total 24 marks.</p>
                             </div>
                         </div>
                     </div>
                     
                     {/* Instructions */}
                     <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-100 dark:border-orange-900/30 text-sm text-orange-800 dark:text-orange-200 leading-relaxed flex gap-3">
                         <div className="mt-0.5 shrink-0">⚠️</div>
                         <p>
                             Once you start, the timer will begin. You cannot pause the exam. Ensure you have a stable internet connection and 2 hours of uninterrupted time.
                         </p>
                     </div>

                     {/* Actions */}
                     <div className="flex flex-col sm:flex-row gap-4 pt-4">
                         <button onClick={onGoHome} className="btn-secondary w-full justify-center">
                             Cancel
                         </button>
                         <button onClick={() => setHasStarted(true)} className="btn-primary w-full justify-center shadow-lg shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-1 transition-all">
                             Start Exam Now
                         </button>
                     </div>
                 </div>
             </div>
        </div>
    );
  }
  
  return (
    <div className="flex flex-col h-screen fixed inset-0 z-50 bg-background text-text-main animate-fade-in">
        {/* Header */}
        <div className="h-16 border-b border-border bg-surface flex items-center justify-between px-4 sm:px-6 shrink-0">
            <div className="flex items-center gap-4">
                <button onClick={onGoHome} className="p-2 hover:bg-white/5 rounded-full transition-colors text-text-muted">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="hidden sm:block">
                    <h1 className="font-bold text-lg">ACCA Mock Exam</h1>
                    <p className="text-xs text-text-muted">Business & Technology</p>
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold text-lg ${timeLeft < 300 ? 'bg-red-500/10 text-red-500' : 'bg-slate-100 dark:bg-slate-800'}`}>
                    <Clock className="w-5 h-5" />
                    {formatTime(timeLeft)}
                </div>
                <button 
                    onClick={finishExam}
                    className="btn-primary py-2 px-6 text-sm"
                >
                    Submit Exam
                </button>
            </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-20 sm:w-64 border-r border-border bg-surface overflow-y-auto hidden sm:flex flex-col">
                <div className="p-4 border-b border-border">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-text-muted mb-4">Questions</h3>
                    <div className="grid grid-cols-4 gap-2">
                        {shuffledQuestions.map((q, idx) => {
                            const isAnswered = q.type === 'scenario' 
                                ? (q as ScenarioQuestion).questions.every(sq => answers.some(a => a.questionId === sq.id))
                                : answers.some(a => a.questionId === q.id);
                            
                            const isFlagged = flagged.includes(q.id);
                            const isActive = idx === currentQIndex;

                            return (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentQIndex(idx)}
                                    className={`relative h-10 w-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                                        isActive 
                                        ? 'bg-primary text-white ring-2 ring-primary ring-offset-2 ring-offset-surface' 
                                        : isAnswered 
                                            ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30' 
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                                    }`}
                                >
                                    {idx + 1}
                                    {isFlagged && <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border border-surface"></div>}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="p-4 mt-auto">
                    <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
                        <div className="w-3 h-3 bg-emerald-500/20 rounded border border-emerald-500/30"></div> Answered
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
                        <div className="w-3 h-3 bg-slate-100 dark:bg-slate-800 rounded"></div> Unanswered
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                        <div className="w-3 h-3 bg-amber-500 rounded-full"></div> Flagged
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto bg-background/50 p-4 sm:p-8">
                <div className="max-w-3xl mx-auto">
                    {/* Toolbar */}
                    <div className="flex justify-between items-center mb-6">
                        <button 
                            onClick={toggleFlag}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                                flagged.includes(currentQ.id) 
                                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500' 
                                : 'bg-surface hover:bg-surface-light text-text-muted'
                            }`}
                        >
                            <Flag className={`w-4 h-4 ${flagged.includes(currentQ.id) ? 'fill-current' : ''}`} />
                            {flagged.includes(currentQ.id) ? 'Flagged' : 'Flag for Review'}
                        </button>
                        <span className="text-text-muted text-sm font-medium">
                            Question {currentQIndex + 1} of {shuffledQuestions.length}
                        </span>
                    </div>

                    {/* Question Card */}
                    <div className="bg-surface border border-border rounded-2xl p-6 sm:p-10 shadow-sm min-h-[400px]">
                        {currentQ.type === 'scenario' ? (
                            <Scenario 
                                q={currentQ as ScenarioQuestion} 
                                answers={answers} 
                                onAnswer={handleAnswer} 
                            />
                        ) : (
                            <>
                                <div className="mb-8">
                                    <h2 className="text-xl sm:text-2xl font-bold text-dark leading-snug">{currentQ.question}</h2>
                                    <span className="inline-block mt-3 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-text-muted text-xs font-bold rounded-full uppercase tracking-wider">
                                        {currentQ.marks} Marks
                                    </span>
                                </div>

                                {currentQ.type === 'single' && (
                                    <SingleChoice 
                                        q={currentQ as SingleChoiceQuestion} 
                                        answer={answers.find(a => a.questionId === currentQ.id)?.answer as string} 
                                        onAnswer={handleAnswer} 
                                    />
                                )}
                                {currentQ.type === 'multi' && (
                                    <MultiChoice 
                                        q={currentQ as MultiChoiceQuestion} 
                                        answer={answers.find(a => a.questionId === currentQ.id)?.answer as string[]} 
                                        onAnswer={handleAnswer} 
                                    />
                                )}
                                {currentQ.type === 'matching' && (
                                    <Matching 
                                        q={currentQ as MatchingQuestion} 
                                        answer={answers.find(a => a.questionId === currentQ.id)?.answer as MatchingAnswer} 
                                        onAnswer={handleAnswer} 
                                    />
                                )}
                                {currentQ.type === 'dropdown' && (
                                    <Dropdown 
                                        q={currentQ as DropdownQuestion} 
                                        answer={answers.find(a => a.questionId === currentQ.id)?.answer as DropdownAnswer} 
                                        onAnswer={handleAnswer} 
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* Footer Navigation */}
        <div className="h-20 border-t border-border bg-surface flex items-center justify-between px-4 sm:px-6 shrink-0">
            <button
                onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQIndex === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-text-main hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft className="w-5 h-5" />
                Previous
            </button>
            
            <div className="hidden sm:block w-64 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-primary transition-all duration-300" 
                    style={{ width: `${((currentQIndex + 1) / shuffledQuestions.length) * 100}%` }}
                ></div>
            </div>

            {isLast ? (
                <button
                    onClick={finishExam}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20 transition-all"
                >
                    Finish
                    <CheckCircle className="w-5 h-5" />
                </button>
            ) : (
                <button
                    onClick={() => setCurrentQIndex(prev => Math.min(shuffledQuestions.length - 1, prev + 1))}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20 transition-all"
                >
                    Next
                    <ChevronRight className="w-5 h-5" />
                </button>
            )}
        </div>
    </div>
  );
};

export default MockExamPage;
