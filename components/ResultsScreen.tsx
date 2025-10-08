import React, { useMemo } from 'react';
import { Answers, ProfileType, Question, Score } from '../types';
import { PROFILE_DETAILS } from '../constants';
import { HomeIcon, PrintIcon, ShareIcon } from './icons';
import AnalysisReport from './AnalysisReport';
import { generateReportText } from '../generateReportText';

interface ResultsScreenProps {
  participantName: string;
  answers: Answers;
  questions: Question[];
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ participantName, answers, questions, onRestart }) => {
  const scores: Score[] = useMemo(() => {
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
  }, [answers, questions]);

  const dominantProfileDetails = scores.length > 0 ? PROFILE_DETAILS[scores[0].profile] : null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (!dominantProfileDetails) return;

    const reportText = generateReportText(participantName, scores, questions, answers);

    if (navigator.share) {
      navigator.share({
        title: `Resultado DISC de ${participantName}`,
        text: reportText,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(reportText).then(() => {
         alert('Resultado copiado para a área de transferência!');
      }, () => {
         alert('A função de compartilhar não é suportada neste navegador.');
      });
    }
  };

  if (!dominantProfileDetails) {
    return (
       <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg animate-fade-in text-center">
        <p className="text-slate-600 dark:text-slate-300 mb-4">Ocorreu um erro ao calcular os resultados.</p>
        <button
          onClick={onRestart}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-200 font-bold py-2 px-6 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition"
        >
          <HomeIcon />
          Voltar ao Início
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg animate-fade-in">
      <style>
        {`
          @media print {
            body {
              background-color: #fff !important;
            }
            #app-container {
              display: block !important;
              min-height: 0 !important;
              padding: 0 !important;
              background-color: #fff !important;
            }
            .print-hidden, #app-container > footer, #app-container > button { /* Hides footer and ThemeToggle */
              display: none !important;
            }
            main {
              max-width: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            .print-container {
               box-shadow: none !important;
               border: 1px solid #e2e8f0 !important;
               padding: 0 !important;
               color: #000 !important;
            }
            .dark .print-container, .dark .prose-invert, .dark .bg-white {
               background-color: #fff !important;
               color: #000 !important;
            }
            .dark .text-slate-200, .dark .text-slate-400, .dark .text-slate-700, .dark .text-slate-500 {
              color: #000 !important;
            }
            .prose { max-width: 100% !important; color: #000 !important; }
            .prose h2, .prose h3, .prose p, .prose ul, .prose li { color: #000 !important; }
            @page {
              margin: 0.75in;
            }
          }
          .prose { max-width: 100% !important; }
          .prose h3 { margin-top: 1.5em; margin-bottom: 0.5em; }
          .prose h4 { margin-top: 1.25em; margin-bottom: 0.25em; }
          .prose p, .prose ul { margin-top: 0.5em; margin-bottom: 0.5em; }
        `}
      </style>
      <div className="print-container">
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-2 text-center">
          Resultado de {participantName}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 text-center">Aqui está a análise do seu perfil comportamental.</p>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <AnalysisReport scores={scores} questions={questions} answers={answers} />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-center items-center gap-4 print-hidden">
        <button
          onClick={onRestart}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-200 font-bold py-2 px-6 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition"
        >
          <HomeIcon />
          Voltar ao Início
        </button>
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          <PrintIcon />
          Imprimir
        </button>
         <button
          onClick={handleShare}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-600 transition"
        >
          <ShareIcon />
          Compartilhar
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
