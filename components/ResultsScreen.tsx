import React, { useMemo, useEffect } from 'react';
import { marked } from 'marked';
import { Answers, ProfileType, Question, Score, HistoryItem } from '../types';
import { PROFILE_DETAILS } from '../constants';
import { HomeIcon, PrintIcon, ShareIcon } from './icons';
import useGeminiAnalysis from '../hooks/useGeminiAnalysis';
import ScoreChart from './ScoreChart';

interface ResultsScreenProps {
  testResult: HistoryItem;
  questions: Question[];
  onRestart: () => void;
  onAnalysisGenerated: (id: string, analysis: string) => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ testResult, questions, onRestart, onAnalysisGenerated }) => {
  const { participantName, answers, id: testId, analysis: savedAnalysis } = testResult;

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

  const { analysis, loading, error, generateAnalysis } = useGeminiAnalysis({ 
    scores, 
    participantName, 
    savedAnalysis 
  });
  
  useEffect(() => {
    if (analysis && !savedAnalysis) {
      onAnalysisGenerated(testId, analysis);
    }
  }, [analysis, savedAnalysis, testId, onAnalysisGenerated]);


  const dominantProfileDetails = scores.length > 0 ? PROFILE_DETAILS[scores[0].profile] : null;

  const handlePrint = () => window.print();

  const handleShare = () => {
    if (!dominantProfileDetails) return;
    const text = `Meu perfil DISC é ${dominantProfileDetails.name}! Descubra o seu também.`;
    if (navigator.share) {
      navigator.share({ title: 'Resultado Teste DISC', text }).catch(console.error);
    } else {
      navigator.clipboard.writeText(text).then(() => alert('Resultado copiado!'));
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-500 dark:text-slate-400">Gerando sua análise personalizada...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-10 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <p className="text-red-600 dark:text-red-400 font-semibold">Ocorreu um erro</p>
          <p className="text-slate-500 dark:text-slate-400 mt-2 mb-4">{error}</p>
          <button onClick={generateAnalysis} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition">
            Tentar Novamente
          </button>
        </div>
      );
    }
    
    if (analysis) {
        const analysisHtml = marked.parse(analysis);
        return <div className="prose prose-slate dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: analysisHtml as string }} />;
    }

    return null;
  };

  if (!dominantProfileDetails) {
    return (
       <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg text-center">
        <p className="mb-4">Ocorreu um erro ao calcular os resultados.</p>
        <button onClick={onRestart} className="flex items-center justify-center gap-2 bg-slate-200 font-bold py-2 px-6 rounded-lg">
          <HomeIcon /> Voltar ao Início
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg animate-fade-in">
      <style>{`@media print{body{background-color:#fff!important}#app-container{display:block!important;min-height:0!important;padding:0!important;background-color:#fff!important}.print-hidden,#app-container>footer,#app-container>button{display:none!important}main{max-width:100%!important;margin:0!important;padding:0!important}.print-container{box-shadow:none!important;border:1px solid #e2e8f0!important;padding:0!important;color:#000!important}.dark .print-container,.dark .prose-invert,.dark .bg-white{background-color:#fff!important;color:#000!important}.dark .text-slate-200,.dark .text-slate-400,.dark .text-slate-700,.dark .text-slate-500{color:#000!important}.prose{max-width:100%!important;color:#000!important}.prose h2,.prose h3,.prose p,.prose ul,.prose li{color:#000!important}@page{margin:.75in}}.prose{max-width:100%!important}.prose h3{margin-top:1.5em;margin-bottom:.5em}.prose h4{margin-top:1.25em;margin-bottom:.25em}.prose p,.prose ul{margin-top:.5em;margin-bottom:.5em}`}</style>
      <div className="print-container">
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-2 text-center">
          Resultado de {participantName}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 text-center">Aqui está a análise do seu perfil comportamental.</p>
        
        <ScoreChart scores={scores} />

        <div className="mt-8">
            {renderContent()}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-center items-center gap-4 print-hidden">
        <button onClick={onRestart} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-200 font-bold py-2 px-6 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition">
          <HomeIcon /> Voltar ao Início
        </button>
        <button onClick={handlePrint} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition">
          <PrintIcon /> Imprimir
        </button>
         <button onClick={handleShare} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-600 transition">
          <ShareIcon /> Compartilhar
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
