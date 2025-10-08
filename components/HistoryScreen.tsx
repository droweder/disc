
import React, { useState, useMemo } from 'react';
import { HistoryItem, Question, ProfileType, Score, Answers } from '../types';
import AnalysisReport from './AnalysisReport';
import { ArrowLeftIcon, TrashIcon, RestartIcon } from './icons';

interface HistoryScreenProps {
  questions: Question[];
  onBack: () => void;
  onRerunTest: (item: HistoryItem) => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ questions, onBack, onRerunTest }) => {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const savedHistory = localStorage.getItem('discTestHistory');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.error("Failed to load history:", error);
      return [];
    }
  });

  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  const clearHistory = () => {
    if (window.confirm('Tem certeza que deseja apagar todo o histórico? Esta ação não pode ser desfeita.')) {
      localStorage.removeItem('discTestHistory');
      setHistory([]);
      setSelectedItem(null);
    }
  };

  const calculateScores = (answers: Answers): Score[] => {
    const calculatedScores: Record<ProfileType, number> = { D: 0, I: 0, S: 0, C: 0 };
    questions.forEach((q) => {
      if (answers[q.id]) {
        calculatedScores[q.profile] += answers[q.id];
      }
    });

    const scoresArray = (Object.keys(calculatedScores) as ProfileType[]).map((profile) => ({
      profile: profile,
      value: calculatedScores[profile],
    }));
    
    return scoresArray.sort((a, b) => b.value - a.value);
  };

  const selectedScores = useMemo(() => {
    if (!selectedItem) return [];
    return calculateScores(selectedItem.answers);
  }, [selectedItem, questions]);


  if (selectedItem) {
    return (
       <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg animate-fade-in">
        <button 
            onClick={() => setSelectedItem(null)} 
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-4 font-semibold">
            <ArrowLeftIcon />
            Voltar para o Histórico
        </button>
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-2 text-center">
          Resultado de {selectedItem.participantName}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 text-center">
            Realizado em: {new Date(selectedItem.date).toLocaleString('pt-BR')}
        </p>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <AnalysisReport scores={selectedScores} questions={questions} answers={selectedItem.answers} />
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => onRerunTest(selectedItem)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              <RestartIcon />
              Ver Resultado Novamente
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4 text-center">Histórico de Testes</h2>
      
      {history.length > 0 ? (
        <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {history.map(item => (
            <li key={item.id}>
              <button 
                onClick={() => setSelectedItem(item)}
                className="w-full text-left p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              >
                <p className="font-bold text-slate-800 dark:text-slate-100">{item.participantName}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {new Date(item.date).toLocaleString('pt-BR')}
                </p>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 dark:text-slate-400 text-center my-8">Nenhum teste foi realizado ainda.</p>
      )}

      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-center items-center gap-4">
         <button
          onClick={onBack}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-200 font-bold py-2 px-6 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition"
        >
          <ArrowLeftIcon />
          Voltar ao Início
        </button>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition"
          >
            <TrashIcon />
            Limpar Histórico
          </button>
        )}
      </div>
    </div>
  );
};

export default HistoryScreen;