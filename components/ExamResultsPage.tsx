
import React, { useState, useEffect, useRef } from 'react';
import type { MockQuestion, UserAnswer, SingleChoiceQuestion, MultiChoiceQuestion, MatchingQuestion, DropdownQuestion, ScenarioQuestion, UserAnswerValue, MatchingAnswer, DropdownAnswer } from '../types.ts';
import { Frown, RefreshCw, CheckCircle, XCircle, ChevronRight, ArrowLeft, ImageIcon, Home, Trophy, Target } from './Icons.tsx';

interface ExamResultsPageProps {
  results: {
    score: number;
    totalMarks: number;
    userAnswers: UserAnswer[];
    questions: MockQuestion[];
  };
  onRestart: () => void;
  onGoHome: () => void;
}

const ExamResultsPage: React.FC<ExamResultsPageProps> = ({ results, onRestart, onGoHome }) => {
  const { score, totalMarks, userAnswers, questions } = results;
  const percentage = Math.round((score / totalMarks) * 100);
  const passed = percentage >= 50;
  const [expandedQ, setExpandedQ] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simple Confetti Implementation
    if (passed && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: any[] = [];
        const particleCount = 150;
        const colors = ['#818CF8', '#F472B6', '#34D399', '#FBBF24', '#FFFFFF'];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                vx: Math.random() * 4 - 2,
                vy: Math.random() * 4 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 8 + 2,
                rotation: Math.random() * 360,
                vRotation: Math.random() * 10 - 5
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, i) => {
                p.y += p.vy;
                p.x += p.vx;
                p.rotation += p.vRotation;

                if (p.y > canvas.height) {
                    p.y = -20;
                    p.x = Math.random() * canvas.width;
                }

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();
            });
            requestAnimationFrame(animate);
        };
        
        const animId = requestAnimationFrame(animate);
        
        // Stop animation after 5 seconds to save resources
        const timeoutId = setTimeout(() => {
            cancelAnimationFrame(animId);
            if(canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 8000);

        return () => {
            cancelAnimationFrame(animId);
            clearTimeout(timeoutId);
        };
    }
  }, [passed]);

  const toggleExplain = (id: string) => {
      setExpandedQ(expandedQ === id ? null : id);
  };

  const isCorrect = (q: MockQuestion, uAns: UserAnswerValue): boolean => {
      if (!uAns) return false;
      if (q.type === 'single') return (uAns as string) === (q as SingleChoiceQuestion).correctAnswer;
      if (q.type === 'multi') {
          const user = uAns as string[];
          const correct = (q as MultiChoiceQuestion).correctAnswers;
          return user.length === correct.length && user.every(v => correct.includes(v));
      }
      if (q.type === 'matching') {
          const user = uAns as MatchingAnswer;
          const pairs = (q as MatchingQuestion).pairs;
          return pairs.every(p => user[p.left] === p.right);
      }
      if (q.type === 'dropdown') {
          const user = uAns as DropdownAnswer;
          const parts = (q as DropdownQuestion).parts;
          let idx = 0;
          return parts.every(part => {
              if (!part.options) { idx++; return true; } // text part
              const res = user[idx] === part.correctAnswer;
              idx++;
              return res;
          });
      }
      return false;
  };

  const getCorrectText = (q: MockQuestion): string => {
      if (q.type === 'single') return (q as SingleChoiceQuestion).correctAnswer;
      if (q.type === 'multi') return (q as MultiChoiceQuestion).correctAnswers.join(', ');
      if (q.type === 'matching') return (q as MatchingQuestion).pairs.map(p => `${p.left} -> ${p.right}`).join(' | ');
      if (q.type === 'dropdown') return (q as DropdownQuestion).parts.filter(p => p.correctAnswer).map(p => p.correctAnswer).join(', ');
      return '';
  };
  
  const getUserText = (q: MockQuestion, uAns: UserAnswerValue): string => {
      if (!uAns) return '(No Answer)';
      if (q.type === 'single') return uAns as string;
      if (q.type === 'multi') return (uAns as string[]).join(', ');
      if (q.type === 'matching') {
          const map = uAns as MatchingAnswer;
          return Object.entries(map).map(([k, v]) => `${k} -> ${v}`).join(' | ');
      }
      if (q.type === 'dropdown') {
           const map = uAns as DropdownAnswer;
           return Object.values(map).join(', ');
      }
      return '';
  };

  const renderReviewItem = (q: Exclude<MockQuestion, ScenarioQuestion>, index: number) => {
      const uAnsEntry = userAnswers.find(a => a.questionId === q.id);
      const uAns = uAnsEntry?.answer;
      const correct = isCorrect(q, uAns);
      
      return (
          <div key={q.id} className={`border rounded-xl p-4 mb-4 text-left transition-all ${
              correct 
              ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
              : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
          }`}>
              <div className="flex justify-between items-start gap-4 cursor-pointer" onClick={() => !correct && toggleExplain(q.id)}>
                  <div className="flex gap-3">
                      <div className="mt-1">
                          {correct 
                            ? <CheckCircle className="text-green-600 dark:text-green-400 w-6 h-6" /> 
                            : <XCircle className="text-red-500 dark:text-red-400 w-6 h-6" />
                          }
                      </div>
                      <div>
                          <p className="font-bold text-dark text-sm mb-1">Question {index + 1} <span className="font-normal text-slate-500 dark:text-slate-400">({q.type.toUpperCase()})</span></p>
                          <p className="text-dark font-medium mb-2">{q.question}</p>
                          
                          <div className="text-sm space-y-1">
                              <p><span className="font-semibold text-slate-600 dark:text-slate-300">Your Answer:</span> {getUserText(q, uAns)}</p>
                              {!correct && (
                                  <p><span className="font-semibold text-slate-600 dark:text-slate-300">Correct Answer:</span> {getCorrectText(q)}</p>
                              )}
                          </div>
                      </div>
                  </div>
                  {!correct && <ChevronRight className={`w-5 h-5 text-slate-400 dark:text-slate-500 transition-transform ${expandedQ === q.id ? 'rotate-90' : ''}`} />}
              </div>
              
              {/* Explanation only for wrong answers */}
              {!correct && expandedQ === q.id && (
                  <div className="mt-4 pt-4 border-t border-red-200 dark:border-red-800 animate-fade-in">
                      <p className="font-bold text-red-700 dark:text-red-300 text-sm mb-1">Explanation:</p>
                      <p className="text-red-800 dark:text-red-200 text-sm leading-relaxed">{q.explanation}</p>
                  </div>
              )}
          </div>
      );
  };

  return (
    <div className="max-w-4xl mx-auto text-center pb-20 relative">
        {/* Confetti Canvas */}
        {passed && <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />}

        {/* Score Header */}
        <div className={`card p-8 mb-10 bg-surface shadow-2xl overflow-hidden relative border-t-8 ${passed ? 'border-t-green-500' : 'border-t-red-500'}`}>
            
            {passed ? (
                <div className="flex flex-col items-center justify-center animate-pop-in">
                    <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-green-500 blur-3xl opacity-20 rounded-full"></div>
                        <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-4 rounded-full shadow-lg relative z-10">
                            <Trophy className="w-16 h-16 text-white" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-black text-dark mb-2 tracking-tight">Exam Passed! 🎉</h2>
                    <p className="text-slate-500 text-lg mb-8 font-medium">Outstanding work, Nasrin! You are ready to ace the real exam.</p>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center animate-fade-in">
                    <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 rounded-full"></div>
                        <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-full shadow-lg relative z-10 border-4 border-white dark:border-slate-600">
                            <Target className="w-16 h-16 text-red-500" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-black text-dark mb-2 tracking-tight">Keep Going! 💪</h2>
                    <p className="text-slate-500 text-lg mb-8 font-medium">Don't be discouraged. Review your mistakes below and try again. You've got this!</p>
                </div>
            )}
            
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-10 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                <div className="text-center">
                    <p className="text-4xl font-black text-dark">{score}</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Your Score</p>
                </div>
                 <div className="text-center border-l border-r border-slate-200 dark:border-slate-700">
                    <p className="text-4xl font-black text-slate-400 dark:text-slate-500">{totalMarks}</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Total Marks</p>
                </div>
                 <div className="text-center">
                    <p className={`text-4xl font-black ${passed ? 'text-green-500' : 'text-red-500'}`}>{percentage}%</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Result</p>
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={onRestart} className="btn-primary flex items-center justify-center gap-2 py-3 px-8 shadow-lg shadow-primary/20"><RefreshCw className="w-5 h-5"/> Retake Exam</button>
                <button onClick={onGoHome} className="btn-secondary flex items-center justify-center gap-2 py-3 px-8"><Home className="w-5 h-5"/> Back Home</button>
            </div>
        </div>

        {/* Review Section */}
        <div className="text-left animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1 bg-primary rounded-full"></div>
                <h3 className="text-2xl font-bold text-dark">Detailed Review</h3>
            </div>
            
            {questions.map((q, i) => {
                if (q.type === 'scenario') {
                    const sq = q as ScenarioQuestion;
                    return (
                        <div key={sq.id} className="mb-8 bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-slate-300 dark:bg-slate-600"></div>
                            <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-700">
                                <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-md uppercase tracking-wider">Scenario</span>
                                <p className="mt-3 text-slate-700 dark:text-slate-300 text-base leading-relaxed">{sq.scenario}</p>
                            </div>
                            {sq.questions.map((subQ, subI) => renderReviewItem(subQ, i + subI))} 
                        </div>
                    );
                }
                return renderReviewItem(q as Exclude<MockQuestion, ScenarioQuestion>, i);
            })}
        </div>
    </div>
  );
};

export default ExamResultsPage;
