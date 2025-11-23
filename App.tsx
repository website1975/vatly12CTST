
import React, { useState, useEffect, useCallback } from 'react';
import { CURRICULUM } from './constants';
import { Lesson, ContentTab, QuizQuestion, SimulationData } from './types';
import Sidebar from './components/Sidebar';
import { Menu, BookText, Microscope, BrainCircuit, MessageCircleQuestion, HelpCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import { generateLessonTheory, generateLessonQuiz, generateSimulationInfo, checkApiKey } from './services/geminiService';
import MarkdownRenderer from './components/MarkdownRenderer';
import QuizSection from './components/QuizSection';
import ChatAssistant from './components/ChatAssistant';
import SimulationView from './components/SimulationView';
import HelpModal from './components/HelpModal';

const App: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(CURRICULUM[0].lessons[0]);
  const [activeTab, setActiveTab] = useState<ContentTab>(ContentTab.THEORY);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [apiKeyError, setApiKeyError] = useState(false);

  // Content States
  const [theoryContent, setTheoryContent] = useState<string>("");
  const [loadingTheory, setLoadingTheory] = useState(false);

  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  const [simData, setSimData] = useState<SimulationData | null>(null);
  const [loadingSim, setLoadingSim] = useState(false);

  // Check API Key on load
  useEffect(() => {
    const isConfigured = checkApiKey();
    setApiKeyError(!isConfigured);
  }, []);

  // Load Theory
  const loadTheory = useCallback(async () => {
    setLoadingTheory(true);
    const content = await generateLessonTheory(selectedLesson);
    setTheoryContent(content);
    setLoadingTheory(false);
  }, [selectedLesson]);

  // Load Quiz
  const loadQuiz = useCallback(async () => {
    setLoadingQuiz(true);
    const questions = await generateLessonQuiz(selectedLesson);
    setQuizQuestions(questions);
    setLoadingQuiz(false);
  }, [selectedLesson]);

  // Load Simulation
  const loadSim = useCallback(async () => {
    setLoadingSim(true);
    const data = await generateSimulationInfo(selectedLesson);
    setSimData(data);
    setLoadingSim(false);
  }, [selectedLesson]);

  // Initial Data Load when Lesson Changes
  useEffect(() => {
    setTheoryContent(""); 
    setQuizQuestions([]);
    setSimData(null);
    setActiveTab(ContentTab.THEORY); // Reset to theory on new lesson
    
    if (!apiKeyError) {
      loadTheory();
    }
    // Prefetch other tabs if needed, but lazy loading is better for API quotas.
  }, [selectedLesson, loadTheory, apiKeyError]);

  // Auto show help on first visit
  useEffect(() => {
    const hasSeenHelp = localStorage.getItem('hasSeenHelp');
    if (!hasSeenHelp) {
      setHelpOpen(true);
      localStorage.setItem('hasSeenHelp', 'true');
    }
  }, []);

  // Handle Tab Switch (Lazy Load)
  const handleTabChange = (tab: ContentTab) => {
    setActiveTab(tab);
    if (tab === ContentTab.QUIZ && quizQuestions.length === 0 && !loadingQuiz && !apiKeyError) {
      loadQuiz();
    }
    if (tab === ContentTab.SIMULATION && !simData && !loadingSim && !apiKeyError) {
      loadSim();
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        currentLesson={selectedLesson} 
        onSelectLesson={setSelectedLesson}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* API Key Error Banner */}
        {apiKeyError && (
          <div className="bg-red-600 text-white px-4 py-3 shadow-md flex flex-col md:flex-row items-center justify-between z-50 gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle size={24} className="flex-shrink-0" />
              <div>
                <p className="font-bold">Chưa cấu hình API Key!</p>
                <p className="text-xs md:text-sm opacity-90">
                  Vào Vercel {'>'} Settings {'>'} Environment Variables. 
                  Key: <code className="bg-red-800 px-1 rounded">API_KEY</code>.
                </p>
              </div>
            </div>
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-white text-red-600 rounded-lg text-sm font-bold hover:bg-red-50 transition-colors whitespace-nowrap"
            >
              Lấy Key Mới <ExternalLink size={14} />
            </a>
          </div>
        )}

        {/* Header */}
        <header className="bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={20} />
            </button>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{selectedLesson.chapter}</p>
              <h2 className="text-lg md:text-xl font-bold text-slate-800 truncate max-w-[200px] md:max-w-md">
                {selectedLesson.title}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button 
              onClick={() => setHelpOpen(true)}
              className="p-2 text-slate-500 hover:text-primary hover:bg-sky-50 rounded-full transition-colors"
              title="Hướng dẫn sử dụng"
             >
               <HelpCircle size={22} />
             </button>
             <div className="hidden md:block text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              v1.3 - Powered by Gemini
             </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="bg-white border-b border-slate-200 px-4 md:px-8 flex overflow-x-auto no-scrollbar">
          {[
            { id: ContentTab.THEORY, icon: BookText, label: 'Lý thuyết' },
            { id: ContentTab.SIMULATION, icon: Microscope, label: 'Mô phỏng' },
            { id: ContentTab.QUIZ, icon: BrainCircuit, label: 'Trắc nghiệm' },
            { id: ContentTab.CHAT, icon: MessageCircleQuestion, label: 'Hỏi đáp AI' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
              `}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          
          {apiKeyError ? (
             <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-50">
               <AlertTriangle size={64} className="text-slate-300 mb-4" />
               <h3 className="text-xl font-semibold text-slate-500">Ứng dụng chưa được kích hoạt</h3>
               <p className="text-slate-400 mt-2 max-w-md mx-auto">
                 Vui lòng cấu hình API Key trên Vercel theo hướng dẫn ở banner màu đỏ phía trên để bắt đầu sử dụng.
               </p>
             </div>
          ) : (
            <>
              {/* Theory Tab */}
              {activeTab === ContentTab.THEORY && (
                <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-100 min-h-full">
                  {loadingTheory ? (
                    <div className="space-y-4 animate-pulse">
                      <div className="h-8 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-200 rounded w-full"></div>
                      <div className="h-4 bg-slate-200 rounded w-full"></div>
                      <div className="h-40 bg-slate-100 rounded w-full mt-6"></div>
                    </div>
                  ) : (
                    <MarkdownRenderer content={theoryContent} />
                  )}
                </div>
              )}

              {/* Simulation Tab */}
              {activeTab === ContentTab.SIMULATION && (
                <SimulationView data={simData} isLoading={loadingSim} />
              )}

              {/* Quiz Tab */}
              {activeTab === ContentTab.QUIZ && (
                <QuizSection 
                  questions={quizQuestions} 
                  isLoading={loadingQuiz} 
                  onRefresh={loadQuiz}
                />
              )}

              {/* Chat Tab */}
              {activeTab === ContentTab.CHAT && (
                <div className="max-w-4xl mx-auto h-full">
                  <ChatAssistant lessonTitle={selectedLesson.title} />
                </div>
              )}
            </>
          )}

        </main>
      </div>
    </div>
  );
};

export default App;
