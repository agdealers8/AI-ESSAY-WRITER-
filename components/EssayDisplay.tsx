
import React from 'react';
import { EssayParagraph } from '../types';

interface EssayDisplayProps {
  essay: EssayParagraph[] | null;
  isLoading: boolean;
  error: string | null;
  onDownload: () => void;
}

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);


export const EssayDisplay: React.FC<EssayDisplayProps> = ({ essay, isLoading, error, onDownload }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-sky-400"></div>
          <p className="text-slate-400">Crafting your essay, please wait...</p>
        </div>
      );
    }
    if (error) {
      return <p className="text-red-400 text-center">{error}</p>;
    }
    if (essay && essay.length > 0) {
      return (
        <div className="prose prose-invert max-w-none text-slate-300">
            {essay.map((paragraph, index) => (
                <div key={index} className="mb-6"> {/* Added margin bottom for spacing between paragraphs */}
                    <h3 className="text-xl font-semibold text-sky-300 mb-2">{paragraph.heading}</h3>
                    <p className="leading-relaxed">{paragraph.content}</p>
                </div>
            ))}
        </div>
      );
    }
    return (
      <div className="text-center text-slate-500">
        <p>Your generated essay will appear here.</p>
        <p className="mt-2 text-sm">Fill in the details and click "Generate Essay" to begin.</p>
      </div>
    );
  };
  
  return (
    <div className="relative bg-slate-800 p-6 rounded-lg shadow-lg min-h-[400px] flex flex-col">
      <div className="flex-grow overflow-y-auto pr-2">
        {renderContent()}
      </div>
      {essay && essay.length > 0 && !isLoading && (
        <div className="pt-4 mt-4 border-t border-slate-700">
          <button
            onClick={onDownload}
            className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out"
          >
            <DownloadIcon className="w-5 h-5 mr-2" />
            Download Essay (.txt)
          </button>
        </div>
      )}
    </div>
  );
};
