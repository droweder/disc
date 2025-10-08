import React from 'react';

interface InstructionsScreenProps {
  onContinue: () => void;
}

const InstructionsScreen: React.FC<InstructionsScreenProps> = ({ onContinue }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4 text-center">Instruções</h2>
      <p className="text-slate-600 dark:text-slate-300 mb-4">
        Você verá uma série de grupos de características. Em cada grupo, marque o grau de identificação de acordo com seu jeito de agir e pensar.
      </p>
      <p className="text-slate-600 dark:text-slate-300 mb-6">
        Não existe resposta certa ou errada! Escolha com sinceridade uma das opções para cada grupo:
      </p>
      <div className="space-y-4 mb-6">
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <p className="font-semibold text-blue-600 dark:text-blue-400">Muito a ver comigo</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <p className="font-semibold text-amber-600 dark:text-amber-400">Mais ou menos a ver comigo</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <p className="font-semibold text-emerald-600 dark:text-emerald-400">Um pouco a ver comigo</p>
          </div>
           <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <p className="font-semibold text-red-600 dark:text-red-400">Nada a ver comigo</p>
          </div>
      </div>

      <div className="bg-amber-100 dark:bg-amber-900/30 border-l-4 border-amber-500 text-amber-800 dark:text-amber-200 p-4 my-6 rounded-r-lg" role="alert">
        <p className="font-bold">Atenção!</p>
        <p>Em cada bloco de 4 características, você deve usar cada uma das opções de resposta <strong>uma única vez</strong>. Ao selecionar uma resposta, ela não estará mais disponível para as outras características do mesmo bloco.</p>
      </div>

      <div className="text-center">
        <button
          onClick={onContinue}
          className="bg-blue-600 text-white font-bold py-3 px-10 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Entendi, vamos lá!
        </button>
      </div>
    </div>
  );
};

export default InstructionsScreen;