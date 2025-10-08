
import React, { useState } from 'react';
import { HistoryIcon } from './icons';

interface WelcomeScreenProps {
  onStart: (name: string) => void;
  onShowHistory: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onShowHistory }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name);
    } else {
      setError(true);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg text-center animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-700 dark:text-slate-200 mb-2">DISC – Perfil Comportamental</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6">Descubra mais sobre seus padrões de comportamento.</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="name" className="sr-only">Seu Nome</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if(error) setError(false);
          }}
          placeholder="Digite seu nome para começar"
          className={`w-full max-w-sm px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 ${error ? 'border-red-500 ring-red-300' : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500'}`}
        />
        {error && <p className="text-red-500 text-sm mt-2">Por favor, insira seu nome.</p>}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-3 px-10 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Iniciar Teste
          </button>
          <button
            type="button"
            onClick={onShowHistory}
            className="flex items-center justify-center gap-2 bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 font-bold py-3 px-10 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
          >
            <HistoryIcon />
            Ver Histórico
          </button>
        </div>
      </form>
    </div>
  );
};

export default WelcomeScreen;