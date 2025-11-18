
import React from 'react';
import { HistoryEntry } from '../types';

interface EssayHistorySidebarProps {
  history: HistoryEntry[];
  onLoadEssay: (entry: HistoryEntry) => void;
  onDeleteEntry: (id: string) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const LoadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 19V5M5 12l7-7 7 7"/>
    </svg>
);

const DeleteIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
);

export const EssayHistorySidebar: React.FC<EssayHistorySidebarProps> = ({
  history,
  onLoadEssay,
  onDeleteEntry,
  onClearAll,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-slate-800 text-slate-200 shadow-xl z-30 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-sky-400">Essay History</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-200"
            aria-label="Close history sidebar"
          >
            <CloseIcon className="w-6 h-6 text-slate-300" />
          </button>
        </div>
        <div className="flex-grow p-4 overflow-y-auto" style={{ maxHeight: 'calc(100% - 120px)' }}> {/* Adjust max-height */}
          {history.length === 0 ? (
            <p className="text-slate-400 text-center mt-4">No essay history yet.</p>
          ) : (
            <ul className="space-y-3">
              {history.map((entry) => (
                <li key={entry.id} className="bg-slate-700 p-3 rounded-md border border-slate-600">
                  <p className="text-lg font-semibold text-sky-300 leading-tight">{entry.topic}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(entry.timestamp).toLocaleString()}
                  </p>
                  <div className="flex justify-end space-x-2 mt-3">
                    <button
                      onClick={() => onLoadEssay(entry)}
                      className="flex items-center text-sm px-3 py-1 bg-sky-600 hover:bg-sky-700 rounded-md text-white transition-colors duration-200"
                      aria-label={`Load essay on topic: ${entry.topic}`}
                    >
                      <LoadIcon className="w-4 h-4 mr-1 transform rotate-180" /> Load
                    </button>
                    <button
                      onClick={() => onDeleteEntry(entry.id)}
                      className="flex items-center text-sm px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-white transition-colors duration-200"
                      aria-label={`Delete essay on topic: ${entry.topic}`}
                    >
                      <DeleteIcon className="w-4 h-4 mr-1" /> Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-700 absolute bottom-0 w-full bg-slate-800">
            <button
              onClick={onClearAll}
              className="w-full flex items-center justify-center text-sm px-4 py-2 bg-red-700 hover:bg-red-800 rounded-md text-white transition-colors duration-200"
              aria-label="Clear all essay history"
            >
              <DeleteIcon className="w-4 h-4 mr-2" /> Clear All History
            </button>
          </div>
        )}
      </div>
    </>
  );
};
