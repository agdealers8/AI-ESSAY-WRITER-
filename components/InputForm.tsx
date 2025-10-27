
import React from 'react';
import { EssayLevel } from '../types';
import { LoadingSpinner } from './LoadingSpinner';

interface InputFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  level: EssayLevel;
  setLevel: (level: EssayLevel) => void;
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
        >
          {Object.values(EssayLevel).map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
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
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out disabled:bg-sky-800 disabled:cursor-not-allowed"
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
