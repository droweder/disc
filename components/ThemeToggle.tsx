
import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from './icons';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 bg-white dark:bg-slate-700 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-slate-700 dark:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 transition-transform transform hover:scale-110"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-6 h-6 overflow-hidden">
        <SunIcon className={`absolute transition-all duration-300 ease-in-out ${theme === 'light' ? 'transform-none opacity-100' : 'transform -translate-y-full opacity-0'}`} />
        <MoonIcon className={`absolute transition-all duration-300 ease-in-out ${theme === 'dark' ? 'transform-none opacity-100' : 'transform translate-y-full opacity-0'}`} />
      </div>
    </button>
  );
};

export default ThemeToggle;
