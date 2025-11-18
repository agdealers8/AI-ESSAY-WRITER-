
import React from 'react';
import { SampleEssay } from '../types';

interface SampleEssaysProps {
  samples: SampleEssay[];
  onSelectSample: (sample: SampleEssay) => void;
}

const LoadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 19V5M5 12l7-7 7 7"/>
    </svg>
);

export const SampleEssays: React.FC<SampleEssaysProps> = ({ samples, onSelectSample }) => {
  return (
    <div className="space-y-4 bg-slate-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-slate-100 mb-4">Explore Samples</h3>
      {samples.length === 0 ? (
        <p className="text-slate-400 text-center">No sample essays available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {samples.map((sample, index) => (
            <div key={index} className="bg-slate-700 p-4 rounded-md border border-slate-600 flex flex-col justify-between">
              <div>
                <p className="text-lg font-semibold text-sky-300 mb-1">{sample.topic}</p>
                <p className="text-sm text-slate-400 mb-2">Level: {sample.level}</p>
                <p className="text-sm text-slate-400">Length: {sample.essayLength}</p>
              </div>
              <button
                onClick={() => onSelectSample(sample)}
                className="mt-4 w-full flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-3 rounded-md transition duration-300 ease-in-out text-sm"
                aria-label={`Load sample essay: ${sample.topic}`}
              >
                <LoadIcon className="w-4 h-4 mr-2 transform rotate-180" /> Load Sample
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
