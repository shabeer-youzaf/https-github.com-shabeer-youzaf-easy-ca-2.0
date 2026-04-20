import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Chapter } from '../types.ts';
import QATab from './QATab.tsx';
import { ArrowLeft, HelpCircle, Play, Pause, Activity } from './Icons.tsx';

interface ChapterPageProps {
  chapter: Chapter;
  onGoHome: () => void;
  onUpdateChapterScore: (chapterId: number, score: number, totalQuestions: number) => void;
}

const ChapterPage: React.FC<ChapterPageProps> = ({ chapter, onGoHome, onUpdateChapterScore }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [chapter.id]);

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setAudioError(false);
  }, [chapter.id]);

  const togglePlayPause = useCallback(() => {
    if (audioRef.current && !audioError) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => {
            console.error("Play error:", e);
            setAudioError(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying, audioError]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setAudioError(false);
    }
  }, []);
  
  const handleAudioError = useCallback(() => {
      setAudioError(true);
      setIsPlaying(false);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto pb-24">
      
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onGoHome}
          className="group flex items-center gap-2 text-text-muted hover:text-white transition-colors text-xs font-bold uppercase tracking-wide mb-6 bg-white/5 px-4 py-2 rounded-full border border-white/10 w-fit"
        >
          <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Chapters</span>
        </button>

        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-3 pl-1">
             <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
             Chapter {chapter.id}
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
             {chapter.title}
        </h1>
        <p className="text-lg text-text-muted font-medium leading-relaxed max-w-3xl border-l-2 border-primary/30 pl-4">
             {chapter.description}
        </p>
      </div>
      
      {/* Premium Audio Player */}
      {chapter.malayalamAudioUrl && (
        <div className="relative mb-12 group">
          {/* Ambient Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-700"></div>
          
          <div className="relative bg-slate-900 border border-white/10 rounded-[2rem] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl overflow-hidden">
             
             {/* Play Button Container */}
             <div className="relative flex-shrink-0">
                 <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-pulse"></div>
                 <button 
                    onClick={togglePlayPause}
                    disabled={audioError}
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl transition-all transform hover:scale-105 active:scale-95 z-10 ${audioError ? 'bg-red-500/20 text-red-400 cursor-not-allowed border-2 border-red-500/50' : 'bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-white/10'}`}
                 >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 pl-1" />}
                 </button>
             </div>

             <div className="flex-1 w-full space-y-4">
                 <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded-md bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider">Audio Lesson</span>
                            {isPlaying && <span className="flex items-center gap-1 text-green-400 text-[10px] font-bold uppercase tracking-wider"><Activity className="w-3 h-3 animate-pulse" /> Playing</span>}
                        </div>
                        <h3 className="font-bold text-white text-lg sm:text-xl">Malayalam Explanation</h3>
                    </div>
                    
                    {/* Visualizer Bars (CSS Animation) */}
                    <div className="flex items-end gap-1 h-8">
                        {[...Array(8)].map((_, i) => (
                            <div 
                                key={i} 
                                className="w-1 bg-primary rounded-full opacity-60" 
                                style={{ 
                                    height: isPlaying ? '100%' : '20%', 
                                    animation: isPlaying ? `equalizer 0.8s ease-in-out infinite alternate` : 'none',
                                    animationDelay: `${i * 0.1}s` 
                                }}
                            ></div>
                        ))}
                    </div>
                 </div>

                 {!audioError && (
                     <div className="space-y-2">
                        <div className="relative h-1.5 group/slider flex items-center cursor-pointer">
                             {/* Background Track */}
                             <div className="absolute inset-0 bg-white/10 rounded-full"></div>
                             
                             {/* Active Progress */}
                             <div 
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full" 
                                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                             ></div>

                             {/* Interactive Range Input */}
                             <input 
                                type="range" 
                                min="0" 
                                max={duration || 0} 
                                step="0.1"
                                value={currentTime}
                                onChange={handleSeek}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                aria-label="Seek audio"
                             />
                             
                             {/* Thumb Knob */}
                             <div 
                                className="absolute h-4 w-4 bg-white rounded-full shadow-lg pointer-events-none opacity-0 group-hover/slider:opacity-100 transition-opacity duration-200 z-10"
                                style={{ 
                                    left: `${duration ? (currentTime / duration) * 100 : 0}%`, 
                                    transform: 'translateX(-50%)' 
                                }} 
                             ></div>
                        </div>

                        <div className="flex justify-between text-xs font-medium text-slate-500">
                             <span>{formatTime(currentTime)}</span>
                             <span>{formatTime(duration)}</span>
                        </div>
                     </div>
                 )}
                 <audio 
                    ref={audioRef} 
                    src={chapter.malayalamAudioUrl} 
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onError={handleAudioError}
                    preload="metadata" 
                />
             </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="glass-panel p-6 sm:p-10 rounded-[2.5rem] min-h-[500px] animate-slide-up border border-white/5 bg-slate-900/50">
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
                <HelpCircle className="h-6 w-6" />
            </div>
            <div>
                <h2 className="text-2xl font-black text-white">Mock Exam</h2>
                <p className="text-sm text-text-muted">Test your knowledge with chapter questions</p>
            </div>
        </div>
        <QATab questions={chapter.content.questions} chapterId={chapter.id} onUpdateScore={onUpdateChapterScore} />
      </div>

    </div>
  );
};

export default ChapterPage;