
import React, { useState, useMemo, useEffect } from 'react';
import type { Question } from '../types.ts';
import { CheckCircle, XCircle, HelpCircle } from './Icons.tsx';

interface QATabProps {
  questions: Question[];
  chapterId: number;
  onUpdateScore: (chapterId: number, score: number, totalQuestions: number) => void;
}

type AnswerStatus = 'unanswered' | 'correct' | 'incorrect';

// Helper to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

const QATab: React.FC<QATabProps> = ({ questions, chapterId, onUpdateScore }) => {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('unanswered');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showRephrase, setShowRephrase] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Randomise order on mount or when questions prop changes significantly
  useEffect(() => {
    if (questions.length > 0) {
        setShuffledQuestions(shuffleArray(questions));
    } else {
        setShuffledQuestions([]);
    }
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswerStatus('unanswered');
    setSelectedAnswer(null);
    setShowRephrase(false);
    setQuizFinished(false);
  }, [questions, chapterId]);

  const currentQuestion = useMemo(() => {
    if (shuffledQuestions.length === 0) return null;
    const q = shuffledQuestions[currentQuestionIndex];
    if (showRephrase && q.rephrase) {
        return q.rephrase!;
    }
    return q;
  }, [currentQuestionIndex, shuffledQuestions, showRephrase]);


  const handleAnswer = (answer: string) => {
    if (answerStatus !== 'unanswered' || !currentQuestion) return;

    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
      setAnswerStatus('correct');
      setShowRephrase(false);
    } else {
      setAnswerStatus('incorrect');
      if (shuffledQuestions[currentQuestionIndex].rephrase && !showRephrase) {
          setShowRephrase(true);
      } else {
          setShowRephrase(false);
      }
    }
  };

  const handleNext = () => {
    if (answerStatus === 'incorrect' && showRephrase) {
        setAnswerStatus('unanswered');
        setSelectedAnswer(null);
        return;
    }
    
    setAnswerStatus('unanswered');
    setSelectedAnswer(null);
    setShowRephrase(false);

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };
  
  const handleRestart = () => {
    // Re-shuffle on restart
    setShuffledQuestions(shuffleArray(questions));
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswerStatus('unanswered');
    setSelectedAnswer(null);
    setShowRephrase(false);
    setQuizFinished(false);
  }
  
  useEffect(() => {
    if (quizFinished) {
      onUpdateScore(chapterId, score, questions.length);
    }
  }, [quizFinished, chapterId, score, questions.length, onUpdateScore]);
  
  const getButtonClass = (option: string) => {
    if (!currentQuestion) return '';
    if (answerStatus === 'unanswered') {
      return 'bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-primary-light dark:hover:bg-slate-600 hover:border-primary text-text-dark';
    }
    if (option === selectedAnswer) {
      return option === currentQuestion.correctAnswer 
        ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-200' 
        : 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200';
    }
    if (option === currentQuestion.correctAnswer) {
      return 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-200';
    }
    return 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-60 cursor-not-allowed text-text-light';
  };

  if (!currentQuestion && !quizFinished) {
      return (
          <div className="card p-10 text-center flex flex-col items-center justify-center text-slate-400 animate-fade-in">
             <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
                 <HelpCircle className="w-8 h-8 text-slate-300 dark:text-slate-600" />
             </div>
             <p className="font-medium text-text-light">No questions available for this chapter yet.</p>
          </div>
      );
  }

  if (quizFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    let feedback = "";
    if (percentage === 100) feedback = "Perfect score! You're a true star, Nasri! 🎉";
    else if (percentage >= 75) feedback = "Excellent work! You have a strong grasp of this chapter. 👍";
    else if (percentage >= 50) feedback = "Good effort! A little more review and you'll nail it. Keep it up! 💪";
    else feedback = "Don't worry, learning is a process. Let's review the chapter and try again. You can do it! ❤️";

    return (
        <div className="text-center p-8 card">
            <h2 className="text-3xl font-bold mb-4 text-dark">Quiz Complete!</h2>
            <p className="text-lg text-text-light mb-2">Your final score is:</p>
            <p className="text-7xl font-extrabold text-primary mb-6">{score} <span className="text-5xl text-dark">/ {questions.length}</span></p>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 relative overflow-hidden border border-border-light mb-4">
                <div 
                  className="bg-primary h-full rounded-full transition-all duration-700 ease-out" 
                  style={{ width: `${percentage}%` }}
                ></div>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white tracking-wider">{percentage}%</span>
            </div>
            <p className="text-lg font-semibold text-dark mb-8">{feedback}</p>
            <button
                onClick={handleRestart}
                className="btn-primary"
            >
                Try Again
            </button>
        </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 card">
        <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-semibold text-text-light">
                Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className="text-sm font-bold text-dark">
                Score: {score}
            </div>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-6 border border-border-light">
            <div className="bg-primary h-full rounded-full" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
        </div>
        
        <div className="animate-fade-in">
            <p className="text-lg font-semibold text-dark mb-6 min-h-[60px]">
                {currentQuestion!.question}
            </p>
            <div className="space-y-3">
                {currentQuestion!.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        disabled={answerStatus !== 'unanswered'}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex justify-between items-center ${getButtonClass(option)}`}
                    >
                        <span className="font-semibold">{option}</span>
                        {selectedAnswer === option && answerStatus === 'correct' && <CheckCircle className="h-6 w-6 text-green-500" />}
                        {selectedAnswer === option && answerStatus === 'incorrect' && <XCircle className="h-6 w-6 text-red-500" />}
                    </button>
                ))}
            </div>
        </div>

        {answerStatus !== 'unanswered' && (
            <div className={`mt-6 p-4 rounded-lg animate-fade-in-up border ${
                answerStatus === 'correct' 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800' 
                : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800'
            }`}>
                <h3 className="font-bold text-lg mb-2 flex items-center">
                    {answerStatus === 'correct' ? <><CheckCircle className="h-5 w-5 mr-2" />Correct! Well done! 🟢</> : <><XCircle className="h-5 w-5 mr-2" />Not quite... 🔁</>}
                </h3>
                <p className="text-sm mb-4 leading-relaxed">{shuffledQuestions[currentQuestionIndex].explanation}</p>
                
                {answerStatus === 'incorrect' && showRephrase && (
                    <p className="text-sm font-semibold italic">Let's try that again from a different angle. Read the new question above carefully!</p>
                )}
                
                {(answerStatus === 'correct' || !showRephrase) && (
                    <button
                        onClick={handleNext}
                        className="w-full mt-2 btn-primary shadow-md"
                    >
                        {currentQuestionIndex === shuffledQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </button>
                )}
            </div>
        )}
    </div>
  );
};

export default QATab;
