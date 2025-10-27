
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { EssayDisplay } from './components/EssayDisplay';
import { EssayLevel } from './types';
import { generateEssay as generateEssayService } from './services/geminiService';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [level, setLevel] = useState<EssayLevel>(EssayLevel.HIGH_SCHOOL);
  const [requirements, setRequirements] = useState<string>('');
  const [essay, setEssay] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateEssay = useCallback(async () => {
    if (!topic.trim()) {
      setError('Please enter a topic for the essay.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEssay('');

    try {
      const generatedEssay = await generateEssayService(topic, level, requirements);
      setEssay(generatedEssay);
    } catch (err) {
      setError('Failed to generate essay. Please check your connection and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [topic, level, requirements]);

  const handleDownload = () => {
    if (!essay) return;
    const blob = new Blob([essay], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeTopic = topic.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.download = `${safeTopic}_essay.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans antialiased">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-6">
            <h2 className="text-2xl font-bold text-sky-400">Essay Details</h2>
            <InputForm
              topic={topic}
              setTopic={setTopic}
              level={level}
              setLevel={setLevel}
              requirements={requirements}
              setRequirements={setRequirements}
              onSubmit={handleGenerateEssay}
              isLoading={isLoading}
            />
          </div>
          <div className="flex flex-col space-y-6">
            <h2 className="text-2xl font-bold text-sky-400">Generated Essay</h2>
            <EssayDisplay
              essay={essay}
              isLoading={isLoading}
              error={error}
              onDownload={handleDownload}
            />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
