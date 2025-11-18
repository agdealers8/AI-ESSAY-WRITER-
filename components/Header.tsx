
import React from 'react';

interface HeaderProps {
    onToggleHistory: () => void;
}

const FeatherIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
        <line x1="16" y1="8" x2="2" y2="22"></line>
        <line x1="17.5" y1="15" x2="9" y2="15"></line>
    </svg>
);

const HistoryIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2v10M12 22s-8-4-8-12M12 22s8-4 8-12"></path>
        <circle cx="12" cy="12" r="10"></circle>
    </svg>
);


export const Header: React.FC<HeaderProps> = ({ onToggleHistory }) => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-700/50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <FeatherIcon className="w-8 h-8 text-sky-400" />
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
              AI Essay Writer
            </h1>
          </div>
          <button
            onClick={onToggleHistory}
            className="p-2 rounded-full hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-200"
            aria-label="Toggle essay history"
          >
            <HistoryIcon className="w-6 h-6 text-slate-300" />
          </button>
        </div>
      </div>
    </header>
  );
};
