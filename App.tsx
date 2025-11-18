
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { EssayDisplay } from './components/EssayDisplay';
import { EssayHistorySidebar } from './components/EssayHistorySidebar';
import { SampleEssays } from './components/SampleEssays';
import { EssayLevel, EssayLength, TargetLanguage, EssayParagraph, HistoryEntry, SampleEssay } from './types';
import { generateEssay as generateEssayService } from './services/geminiService';

// Sample essays for initial user experience
const sampleEssays: SampleEssay[] = [
  {
    topic: 'The Importance of Renewable Energy',
    level: EssayLevel.HIGH_SCHOOL,
    essayLength: EssayLength.MEDIUM,
    targetLanguage: TargetLanguage.ENGLISH,
    requirements: 'Focus on solar and wind power, mention environmental benefits.',
    essayContent: [
      {
        heading: 'Introduction: A Sustainable Future',
        content: 'The global reliance on fossil fuels has led to severe environmental consequences, necessitating a shift towards sustainable alternatives. Renewable energy sources, such as solar and wind power, offer a promising path to mitigate climate change and ensure a healthier planet for future generations. This essay explores the critical importance of embracing renewable energy, highlighting its environmental benefits and potential for a sustainable future.'
      },
      {
        heading: 'Harnessing Solar Power',
        content: 'Solar energy, derived from the sun\'s radiation, is a virtually inexhaustible resource. Photovoltaic (PV) panels convert sunlight directly into electricity, making it a clean and efficient power source. The installation of solar panels on residential and commercial buildings reduces dependence on the grid and lowers carbon footprints. Furthermore, large-scale solar farms can generate significant amounts of electricity, contributing to national energy grids. The declining cost of solar technology makes it increasingly accessible and economically viable for widespread adoption.'
      },
      {
        heading: 'The Power of Wind Energy',
        content: 'Wind power, harnessed through wind turbines, is another leading renewable energy solution. These turbines convert the kinetic energy of wind into electricity without producing greenhouse gas emissions. Wind farms, whether onshore or offshore, can generate electricity on a large scale, providing a consistent supply of clean power. Advances in turbine design have increased efficiency and reduced their environmental impact, making wind power a crucial component of a diversified renewable energy portfolio.'
      },
      {
        heading: 'Environmental Benefits and Global Impact',
        content: 'The primary advantage of renewable energy sources is their minimal environmental impact. Unlike fossil fuels, solar and wind power do not release harmful pollutants or greenhouse gases into the atmosphere, directly combating air pollution and climate change. By reducing carbon emissions, these energy sources help preserve biodiversity, protect ecosystems, and improve public health. The global transition to renewables is essential for achieving international climate targets and fostering a more resilient and sustainable world.'
      },
      {
        heading: 'Conclusion: Paving the Way for Sustainability',
        content: 'In conclusion, the importance of renewable energy, particularly solar and wind power, cannot be overstated. These clean energy sources provide a sustainable alternative to fossil fuels, offering significant environmental benefits and contributing to a healthier planet. Continued investment in research, development, and infrastructure for renewable energy is vital to accelerate the transition away from conventional power sources and pave the way for a truly sustainable and prosperous future.'
      }
    ]
  },
  {
    topic: 'The Role of Technology in Modern Education',
    level: EssayLevel.UNIVERSITY,
    essayLength: EssayLength.LONG,
    targetLanguage: TargetLanguage.ENGLISH,
    requirements: 'Discuss personalized learning, access to information, and challenges.',
    essayContent: [
      {
        heading: 'Introduction: Revolutionizing Learning',
        content: 'The integration of technology into education has fundamentally reshaped teaching and learning processes, transitioning from traditional chalkboards to interactive digital platforms. This paradigm shift offers unprecedented opportunities to enhance engagement, personalize learning experiences, and democratize access to knowledge globally. However, alongside these advancements, significant challenges related to digital equity, teacher training, and the potential for distraction must be addressed. This essay explores the multifaceted role of technology in modern education, analyzing its benefits, challenges, and future implications.'
      },
      {
        heading: 'Personalized Learning Experiences',
        content: 'One of the most transformative aspects of technology in education is its capacity to facilitate personalized learning. Adaptive learning software, artificial intelligence-driven tutors, and data analytics allow educators to tailor content and pace to individual student needs and learning styles. This approach moves beyond a one-size-fits-all model, enabling students to progress at their own speed, focus on areas where they require more support, and engage with material that aligns with their interests. Consequently, personalized learning fosters deeper understanding, improves retention, and cultivates a more student-centric educational environment.'
      },
      {
        heading: 'Enhanced Access to Information and Resources',
        content: 'Technology has broken down geographical and socioeconomic barriers to information, providing students with unparalleled access to educational resources. The internet offers vast repositories of knowledge, including academic journals, digital libraries, online courses (MOOCs), and open educational resources (OERs). This democratization of information empowers students to conduct in-depth research, explore diverse perspectives, and engage with global experts. Furthermore, digital tools enable collaborative learning across continents, preparing students for an increasingly interconnected world. The sheer volume of accessible information enriches the learning process far beyond the confines of a physical classroom.'
      },
      {
        heading: 'Fostering Collaboration and Creativity',
        content: 'Digital tools have revolutionized how students collaborate and express their creativity. Platforms for shared document editing, virtual whiteboards, and online discussion forums enable seamless teamwork, irrespective of physical location. Students can co-create projects, peer-review assignments, and engage in constructive dialogue, thereby developing essential communication and critical thinking skills. Moreover, multimedia software, graphic design applications, and coding environments provide new avenues for creative expression, allowing students to produce dynamic presentations, digital art, and even interactive programs. Technology thus acts as a catalyst for innovative pedagogical approaches that prioritize active learning and problem-solving.'
      },
      {
        heading: 'Challenges and Equitable Implementation',
        content: 'Despite its profound benefits, the integration of technology in education is not without its challenges. The "digital divide" remains a significant concern, as unequal access to devices and reliable internet connectivity can exacerbate existing educational inequalities, particularly in underserved communities. Moreover, the effectiveness of technology largely depends on proper implementation and teacher training. Educators require ongoing professional development to effectively integrate digital tools into their curricula and harness their full potential. Over-reliance on technology without thoughtful pedagogical design can also lead to superficial learning or increased distraction, underscoring the need for balanced and purposeful integration.'
      },
      {
        heading: 'Ethical Considerations and Digital Citizenship',
        content: 'The pervasive use of technology in educational settings also raises crucial ethical considerations and highlights the importance of digital citizenship. Issues such as data privacy, online safety, cyberbullying, and the responsible use of digital information must be actively addressed. Educational institutions have a responsibility to teach students how to navigate the digital world ethically, critically evaluate online sources, and contribute positively to digital communities. Fostering strong digital literacy skills is paramount to preparing students not only for academic success but also for responsible participation in an increasingly digital society, ensuring that technology serves as a tool for empowerment rather than a source of vulnerability.'
      },
      {
        heading: 'Conclusion: Navigating the Future of Learning',
        content: 'In conclusion, technology plays an indispensable and transformative role in modern education, offering immense potential for personalized learning, enhanced access to information, and fostering collaboration and creativity. While challenges related to equitable access, effective implementation, and ethical considerations persist, strategic planning, ongoing teacher support, and a focus on digital citizenship can mitigate these obstacles. As technology continues to evolve, its thoughtful integration will be crucial in preparing students with the skills and knowledge necessary to thrive in the 21st century, making education more dynamic, accessible, and engaging than ever before.'
      }
    ]
  },
  {
    topic: 'Climate Change Impacts on Coastal Cities',
    level: EssayLevel.PROFESSIONAL,
    essayLength: EssayLength.SHORT,
    targetLanguage: TargetLanguage.SPANISH, // Sample in Spanish
    requirements: 'Brief overview of sea-level rise and extreme weather.',
    essayContent: [
      {
        heading: 'Introducción: Ciudades Costeras en Riesgo',
        content: 'Las ciudades costeras de todo el mundo enfrentan amenazas crecientes debido al cambio climático. El aumento del nivel del mar y la intensificación de los fenómenos meteorológicos extremos representan desafíos significativos para su infraestructura, economías y poblaciones. Este ensayo examina brevemente los impactos clave del cambio climático en estas vulnerables áreas urbanas y la urgente necesidad de estrategias de adaptación.'
      },
      {
        heading: 'Aumento del Nivel del Mar',
        content: 'El calentamiento global provoca la expansión térmica del agua oceánica y el derretimiento de los glaciares y capas de hielo, lo que resulta en un aumento constante del nivel del mar. Para las ciudades costeras, esto significa una mayor frecuencia y severidad de las inundaciones costeras, la intrusión de agua salada en los acuíferos de agua dulce y la erosión de las costas. Estas consecuencias comprometen la habitabilidad y la infraestructura crítica, como puertos y sistemas de transporte.'
      },
      {
        heading: 'Fenómenos Meteorológicos Extremos',
        content: 'Además del aumento del nivel del mar, las ciudades costeras son cada vez más susceptibles a fenómenos meteorológicos extremos exacerbados por el cambio climático, incluyendo huracanes, tormentas tropicales y marejadas ciclónicas más potentes. Estos eventos pueden causar daños catastróficos, interrupciones en los servicios esenciales y pérdidas económicas substanciales. La combinación de marejadas ciclónicas y altos niveles del mar incrementa drásticamente el riesgo de inundaciones a gran escala.'
      },
      {
        heading: 'Conclusión: La Urgencia de la Adaptación',
        content: 'En resumen, el aumento del nivel del mar y la prevalencia de fenómenos meteorológicos extremos plantean una amenaza existencial para las ciudades costeras. La necesidad de desarrollar e implementar estrategias de adaptación robustas, como la construcción de defensas costeras, la planificación urbana resiliente y los sistemas de alerta temprana, es más apremiante que nunca para proteger a estas comunidades y garantizar su viabilidad a largo plazo.'
      }
    ]
  }
];


const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [level, setLevel] = useState<EssayLevel>(EssayLevel.HIGH_SCHOOL);
  const [essayLength, setEssayLength] = useState<EssayLength>(EssayLength.MEDIUM);
  const [customWordCount, setCustomWordCount] = useState<string>('');
  const [targetLanguage, setTargetLanguage] = useState<TargetLanguage>(TargetLanguage.ENGLISH);
  const [requirements, setRequirements] = useState<string>('');
  const [essay, setEssay] = useState<EssayParagraph[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [essayHistory, setEssayHistory] = useState<HistoryEntry[]>(() => {
    try {
      const storedHistory = localStorage.getItem('essayHistory');
      return storedHistory ? JSON.parse(storedHistory) : [];
    } catch (error) {
      console.error("Failed to parse essay history from localStorage", error);
      return [];
    }
  });
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('essayHistory', JSON.stringify(essayHistory));
    } catch (error) {
      console.error("Failed to save essay history to localStorage", error);
    }
  }, [essayHistory]);

  const handleGenerateEssay = useCallback(async () => {
    if (!topic.trim()) {
      setError('Please enter a topic for the essay.');
      return;
    }
    if (essayLength === EssayLength.CUSTOM && (!customWordCount || parseInt(customWordCount) <= 0)) {
        setError('Please enter a valid custom word count (greater than 0).');
        return;
    }

    setIsLoading(true);
    setError(null);
    setEssay(null); // Reset essay to null

    try {
      const generatedEssay = await generateEssayService(
        topic,
        level,
        requirements,
        essayLength,
        customWordCount,
        targetLanguage
      );
      setEssay(generatedEssay);

      // Add to history
      const newHistoryEntry: HistoryEntry = {
        id: Date.now().toString(), // Simple unique ID
        timestamp: new Date().toISOString(),
        topic,
        level,
        essayLength,
        customWordCount: essayLength === EssayLength.CUSTOM ? customWordCount : undefined,
        targetLanguage,
        requirements,
        essayContent: generatedEssay,
      };
      setEssayHistory((prev) => [newHistoryEntry, ...prev].slice(0, 20)); // Keep last 20 essays
    } catch (err) {
      setError('Failed to generate essay. Please check your connection and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [topic, level, requirements, essayLength, customWordCount, targetLanguage, setEssayHistory]);

  const handleDownload = () => {
    if (!essay || essay.length === 0) return;

    // Format the structured essay into a plain text string for download
    const formattedEssay = essay
      .map(paragraph => `${paragraph.heading}\n\n${paragraph.content}`)
      .join('\n\n\n'); // Separate paragraphs with an extra newline and a heading

    const blob = new Blob([formattedEssay], { type: 'text/plain;charset=utf-8' });
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

  const loadEssayFromHistory = useCallback((entry: HistoryEntry) => {
    setTopic(entry.topic);
    setLevel(entry.level);
    setEssayLength(entry.essayLength);
    setCustomWordCount(entry.customWordCount || '');
    setTargetLanguage(entry.targetLanguage || TargetLanguage.ENGLISH);
    setRequirements(entry.requirements || '');
    setEssay(entry.essayContent);
    setError(null);
    setIsLoading(false);
    setIsHistoryOpen(false); // Close history sidebar after loading
  }, []);

  const deleteHistoryEntry = useCallback((id: string) => {
    setEssayHistory((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  const clearAllHistory = useCallback(() => {
    if (window.confirm("Are you sure you want to clear all essay history? This action cannot be undone.")) {
      setEssayHistory([]);
    }
  }, []);

  const loadSampleEssay = useCallback((sample: SampleEssay) => {
    setTopic(sample.topic);
    setLevel(sample.level);
    setEssayLength(sample.essayLength);
    setCustomWordCount(sample.customWordCount || '');
    setTargetLanguage(sample.targetLanguage || TargetLanguage.ENGLISH);
    setRequirements(sample.requirements || '');
    setEssay(sample.essayContent);
    setError(null);
    setIsLoading(false);
  }, []);

  const toggleHistory = useCallback(() => {
    setIsHistoryOpen((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans antialiased flex flex-col">
      <Header onToggleHistory={toggleHistory} />
      <main className="flex-grow container mx-auto p-4 md:p-8 relative z-0">
        <div className={`grid grid-cols-1 ${isHistoryOpen ? 'lg:grid-cols-[1fr_300px]' : 'lg:grid-cols-2'} gap-8 transition-all duration-300 ease-in-out`}>
          <div className="flex flex-col space-y-6">
            <h2 className="text-2xl font-bold text-sky-400">Essay Details</h2>
            <InputForm
              topic={topic}
              setTopic={setTopic}
              level={level}
              setLevel={setLevel}
              essayLength={essayLength}
              setEssayLength={setEssayLength}
              customWordCount={customWordCount}
              setCustomWordCount={setCustomWordCount}
              targetLanguage={targetLanguage}
              setTargetLanguage={setTargetLanguage}
              requirements={requirements}
              setRequirements={setRequirements}
              onSubmit={handleGenerateEssay}
              isLoading={isLoading}
            />
            <h2 className="text-2xl font-bold text-sky-400 mt-8">Sample Essays</h2>
            <SampleEssays samples={sampleEssays} onSelectSample={loadSampleEssay} />
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
      <EssayHistorySidebar
        history={essayHistory}
        onLoadEssay={loadEssayFromHistory}
        onDeleteEntry={deleteHistoryEntry}
        onClearAll={clearAllHistory}
        isOpen={isHistoryOpen}
        onClose={toggleHistory}
      />
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
