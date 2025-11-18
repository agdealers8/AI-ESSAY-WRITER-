
import React from 'react';
import { EssayLevel, EssayLength, TargetLanguage } from '../types';
import { LoadingSpinner } from './LoadingSpinner';

interface InputFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  level: EssayLevel;
  setLevel: (level: EssayLevel) => void;
  essayLength: EssayLength;
  setEssayLength: (length: EssayLength) => void;
  customWordCount: string;
  setCustomWordCount: (count: string) => void;
  targetLanguage: TargetLanguage;
  setTargetLanguage: (language: TargetLanguage) => void;
  requirements: string;
  setRequirements: (requirements: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({
  topic,
  setTopic,
  level,
  setLevel,
  essayLength,
  setEssayLength,
  customWordCount,
  setCustomWordCount,
  targetLanguage,
  setTargetLanguage,
  requirements,
  setRequirements,
  onSubmit,
  isLoading,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800 p-6 rounded-lg shadow-lg">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-slate-300 mb-2">
          Essay Topic
        </label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., The Impact of Artificial Intelligence on Society"
          className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
          required
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="level" className="block text-sm font-medium text-slate-300 mb-2">
          Academic Level
        </label>
        <select
          id="level"
          value={level}
          onChange={(e) => setLevel(e.target.value as EssayLevel)}
          className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
          aria-label="Select academic level"
        >
          {Object.values(EssayLevel).map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="essayLength" className="block text-sm font-medium text-slate-300 mb-2">
          Essay Length
        </label>
        <select
          id="essayLength"
          value={essayLength}
          onChange={(e) => setEssayLength(e.target.value as EssayLength)}
          className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
          aria-label="Select essay length"
        >
          {Object.values(EssayLength).map((len) => (
            <option key={len} value={len}>
              {len}
            </option>
          ))}
        </select>
        {essayLength === EssayLength.CUSTOM && (
          <div className="mt-4">
            <label htmlFor="customWordCount" className="block text-sm font-medium text-slate-300 mb-2">
              Custom Word Count
            </label>
            <input
              type="number"
              id="customWordCount"
              value={customWordCount}
              onChange={(e) => setCustomWordCount(e.target.value)}
              placeholder="e.g., 750"
              min="50"
              className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              aria-label="Enter custom word count"
            />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="targetLanguage" className="block text-sm font-medium text-slate-300 mb-2">
          Translate to Language
        </label>
        <select
          id="targetLanguage"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value as TargetLanguage)}
          className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
          aria-label="Select target language for translation"
        >
          {Object.values(TargetLanguage).map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="requirements" className="block text-sm font-medium text-slate-300 mb-2">
          Optional Requirements
        </label>
        <textarea
          id="requirements"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          rows={4}
          placeholder="e.g., Mention specific authors, focus on ethical implications, or specify a word count..."
          className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
          aria-label="Enter optional essay requirements"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out disabled:bg-sky-800 disabled:cursor-not-allowed"
        aria-live="polite"
        aria-busy={isLoading}
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            Generating...
          </>
        ) : (
          'Generate Essay'
        )}
      </button>
    </form>
  );
};
