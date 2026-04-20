import React from 'react';
import { ArrowLeft, WhatsApp, MessageSquare, Globe } from './Icons.tsx';

interface DeveloperInfoPageProps {
  onBack: () => void;
}

const DeveloperInfoPage: React.FC<DeveloperInfoPageProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-slate-500 hover:text-primary transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Subjects
        </button>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-dark tracking-tight">Help & Developer Support</h1>
        <p className="mt-2 text-text-light max-w-xl mx-auto">
          We are committed to making this the best learning platform for you. Let us know how we can improve!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Developer Profile Card */}
        <div className="card bg-white dark:bg-slate-800 p-8 shadow-xl border border-slate-200 dark:border-slate-700 relative overflow-hidden text-center flex flex-col items-center">
            {/* Background Decoration */}
            <div className="absolute top-0 w-full h-32 bg-gradient-to-r from-violet-600 to-indigo-600"></div>
            
            <div className="relative mt-12 mb-6">
                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-lg overflow-hidden bg-white">
                    <img 
                        src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg" 
                        alt="Developer" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-dark mb-1">App Developer</h2>
            <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-6">Easy CA</p>
            
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                Found an error or have a suggestion? Feel free to contact me. You can message in English or Malayalam.
            </p>

            <a 
                href="https://wa.me/919048666355" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-lg shadow-green-500/20"
            >
                <WhatsApp className="w-6 h-6" />
                Chat on WhatsApp
            </a>
            <p className="mt-4 text-xs text-slate-400">Response time: Usually within an hour</p>
        </div>

        {/* Support Options */}
        <div className="space-y-6">
            <div className="card p-6 flex items-start gap-4 hover:shadow-md transition-all border border-slate-100 dark:border-slate-700">
                <div className="p-3 bg-red-100 text-red-600 rounded-lg shrink-0">
                    <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-dark">Report an Error</h3>
                    <p className="text-slate-500 text-sm mt-1">Found a mistake in a question or a bug in the app? Send us a screenshot or description.</p>
                </div>
            </div>

            <div className="card p-6 flex items-start gap-4 hover:shadow-md transition-all border border-slate-100 dark:border-slate-700">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg shrink-0">
                    <Globe className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-dark">Suggest Improvement</h3>
                    <p className="text-slate-500 text-sm mt-1">Have an idea for a new feature? We'd love to hear your thoughts on how to make learning easier.</p>
                </div>
            </div>

            <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 text-center border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-dark mb-2">Technical Support</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-0">
                    For urgent technical issues preventing you from accessing the course, please contact us directly via WhatsApp for the fastest resolution.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default DeveloperInfoPage;