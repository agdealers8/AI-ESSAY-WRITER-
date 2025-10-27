
import React from 'react';

const FeatherIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
        <line x1="16" y1="8" x2="2" y2="22"></line>
        <line x1="17.5" y1="15" x2="9" y2="15"></line>
    </svg>
);


export const Header: React.FC = () => {
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
        </div>
      </div>
    </header>
  );
};
