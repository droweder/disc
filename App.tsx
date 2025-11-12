import React, { useState, useMemo, useCallback } from 'react';
import { AppScreen, Answers, ProfileType, HistoryItem } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import InstructionsScreen from './components/InstructionsScreen';
import QuestionnaireScreen from './components/QuestionnaireScreen';
import ResultsScreen from './components/ResultsScreen';
import HistoryScreen from './components/HistoryScreen';
import ThemeToggle from './components/ThemeToggle';
import { QUESTION_BLOCKS } from './constants';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.WELCOME);
  const [participantName, setParticipantName] = useState<string>('');
  const [answers, setAnswers] = useState<Answers>({});

  const allQuestions = useMemo(() => QUESTION_BLOCKS.flatMap(block => block.questions), []);

  const resetState = useCallback(() => {
    setParticipantName('');
    setAnswers({});
    setCurrentScreen(AppScreen.WELCOME);
  }, []);

  const handleStart = (name: string) => {
    if (name.trim()) {
      setParticipantName(name);
      setCurrentScreen(AppScreen.INSTRUCTIONS);
    }
  };

  const handleFinish = (finalAnswers: Answers) => {
    const newHistoryItem: HistoryItem = {
      id: new Date().toISOString(),
      participantName,
      answers: finalAnswers,
      date: new Date().toISOString(),
    };

    try {
      const existingHistory = localStorage.getItem('discTestHistory');
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      history.unshift(newHistoryItem);
      localStorage.setItem('discTestHistory', JSON.stringify(history.slice(0, 50))); // Limit history to 50 entries
    } catch (error) {
      console.error("Failed to save test history:", error);
    }
    
    setCurrentScreen(AppScreen.RESULTS);
  };


  const handleRerunTest = (item: HistoryItem) => {
    setParticipantName(item.participantName);
    setAnswers(item.answers);
    setCurrentScreen(AppScreen.RESULTS);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.WELCOME:
        return <WelcomeScreen onStart={handleStart} onShowHistory={() => setCurrentScreen(AppScreen.HISTORY)} />;
      case AppScreen.INSTRUCTIONS:
        return <InstructionsScreen onContinue={() => setCurrentScreen(AppScreen.QUESTIONNAIRE)} />;
      case AppScreen.QUESTIONNAIRE:
        return (
          <QuestionnaireScreen
            answers={answers}
            setAnswers={setAnswers}
            onFinish={handleFinish}
          />
        );
      case AppScreen.RESULTS:
        return (
          <ResultsScreen
            participantName={participantName}
            answers={answers}
            questions={allQuestions}
            onRestart={resetState}
          />
        );
      case AppScreen.HISTORY:
        return <HistoryScreen questions={allQuestions} onBack={resetState} onRerunTest={handleRerunTest} />;
      default:
        return <WelcomeScreen onStart={handleStart} onShowHistory={() => setCurrentScreen(AppScreen.HISTORY)} />;
    }
  };

  return (
    <div id="app-container" className="bg-slate-100 dark:bg-slate-900 min-h-screen flex flex-col items-center justify-center font-sans p-4 text-slate-800 dark:text-slate-200 transition-colors duration-300">
        <main className="w-full max-w-2xl mx-auto">
          {renderScreen()}
        </main>
        <footer className="text-center text-slate-500 dark:text-slate-400 mt-8 text-sm print-hidden">
          <p>&copy; {new Date().getFullYear()} DISC Fácil. Todos os direitos reservados.</p>
        </footer>
        <ThemeToggle />
    </div>
  );
};

export default App;
