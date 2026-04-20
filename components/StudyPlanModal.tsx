
import React, { useState, useEffect } from 'react';
import { CalendarCheck, X, Clock, Flag, Trophy, RefreshCw, Calendar, Target } from './Icons.tsx';

interface StudyPlanModalProps {
  onClose: () => void;
}

const TOTAL_CHAPTERS = 24;

const StudyPlanModal: React.FC<StudyPlanModalProps> = ({ onClose }) => {
  const [examDate, setExamDate] = useState('');
  const [planCreated, setPlanCreated] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [chaptersPerWeek, setChaptersPerWeek] = useState(0);

  // Load plan from local storage on mount
  useEffect(() => {
    const savedPlan = localStorage.getItem('acca_study_plan');
    if (savedPlan) {
      const { date } = JSON.parse(savedPlan);
      setExamDate(date);
      calculatePlan(date);
    }
  }, []);

  const calculatePlan = (dateStr: string) => {
    const targetDate = new Date(dateStr);
    const today = new Date();
    // Reset time part for accurate day calculation
    today.setHours(0,0,0,0);
    targetDate.setHours(0,0,0,0);
    
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      const weeks = diffDays / 7;
      const rate = TOTAL_CHAPTERS / weeks;
      setDaysRemaining(diffDays);
      setChaptersPerWeek(Math.ceil(rate * 10) / 10); // Round to 1 decimal
      setPlanCreated(true);
    } else {
      // If date is in past or today
      setDaysRemaining(0);
      setPlanCreated(false);
    }
  };

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examDate) return;
    
    localStorage.setItem('acca_study_plan', JSON.stringify({ date: examDate }));
    calculatePlan(examDate);
  };

  const handleReset = () => {
    localStorage.removeItem('acca_study_plan');
    setExamDate('');
    setPlanCreated(false);
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden relative flex flex-col max-h-[90vh]">
        
        {/* Header Section */}
        <div className="relative bg-primary p-8 pb-12 overflow-hidden shrink-0">
           {/* Abstract Shapes */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-10 -mb-10 blur-xl"></div>
           
           <button 
             onClick={onClose}
             className="absolute top-6 right-6 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors z-20 backdrop-blur-md"
           >
             <X className="w-5 h-5" />
           </button>

           <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner border border-white/20">
                  <CalendarCheck className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight">Study Roadmap</h2>
              <p className="text-white/80 font-medium text-sm mt-2">Plan your path to ACCA success</p>
           </div>
        </div>

        {/* Content Section - Scrollable if needed */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 -mt-6 bg-white dark:bg-slate-900 rounded-t-[2rem] relative z-10">
          
          {!planCreated ? (
            <form onSubmit={handleCreatePlan} className="space-y-8 pt-2">
              <div className="text-center">
                <h3 className="text-xl font-bold text-dark mb-2">When is your exam?</h3>
                <p className="text-slate-500 text-sm">Select your exam date and we'll calculate the perfect pace for you.</p>
              </div>

              <div className="group relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-primary group-focus-within:text-primary transition-colors" />
                </div>
                <input 
                  type="date" 
                  min={todayStr}
                  required
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary/10 transition-all font-bold text-dark outline-none shadow-sm"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-primary hover:bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 transition-all transform hover:-translate-y-1 active:scale-95"
              >
                Create My Plan
              </button>
            </form>
          ) : (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-800/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                      <Clock className="w-16 h-16 text-emerald-600" />
                  </div>
                  <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-1">{daysRemaining}</p>
                  <p className="text-xs font-bold text-emerald-600/60 dark:text-emerald-400/60 uppercase tracking-wider">Days Left</p>
                </div>
                 <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                      <Target className="w-16 h-16 text-indigo-600" />
                  </div>
                  <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mb-1">{chaptersPerWeek}</p>
                  <p className="text-xs font-bold text-indigo-600/60 dark:text-indigo-400/60 uppercase tracking-wider">Chaps / Week</p>
                </div>
              </div>

              {/* Timeline */}
              <div>
                 <h4 className="font-bold text-dark text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                    <div className="w-1 h-4 bg-primary rounded-full"></div>
                    Your Journey
                 </h4>
                 
                 <div className="relative pl-4 space-y-8 before:absolute before:inset-y-0 before:left-[1.35rem] before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                    {/* Start Node */}
                    <div className="relative flex items-center gap-4 opacity-50">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-900 flex items-center justify-center shrink-0 shadow-sm z-10">
                            <Flag className="w-4 h-4 text-slate-400" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-500">Start</p>
                            <p className="text-xs text-slate-400">Beginning of prep</p>
                        </div>
                    </div>

                    {/* Current Node */}
                    <div className="relative flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary text-white border-4 border-white dark:border-slate-900 flex items-center justify-center shrink-0 shadow-lg shadow-primary/30 z-10 ring-2 ring-primary/20">
                            <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex-grow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-extrabold text-primary">Today</p>
                                    <p className="text-xs text-slate-500 mt-0.5">Keep pushing forward!</p>
                                </div>
                                <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-lg">Active</span>
                            </div>
                        </div>
                    </div>

                    {/* Goal Node */}
                    <div className="relative flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white border-4 border-white dark:border-slate-900 flex items-center justify-center shrink-0 shadow-md z-10">
                            <Trophy className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-dark">Exam Day</p>
                            <p className="text-xs text-slate-500 font-medium">
                                {new Date(examDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
                            </p>
                        </div>
                    </div>
                 </div>
              </div>

              <div className="pt-4">
                  <button 
                    onClick={handleReset}
                    className="w-full py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 font-bold text-sm transition-colors flex items-center justify-center gap-2 group"
                  >
                    <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" /> 
                    Recalculate Plan
                  </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyPlanModal;
