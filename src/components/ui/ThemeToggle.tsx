import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { SunIcon, MoonIcon } from './icons';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useAppContext();

    return (
        <button
            onClick={toggleTheme}
            className="relative inline-flex items-center h-8 w-14 rounded-full bg-black/30 border border-white/10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Toggle theme"
        >
            <span
                className={`absolute inset-0.5 flex items-center justify-center transition-transform duration-300 transform ${
                    theme === 'light' ? 'translate-x-0' : 'translate-x-6'
                }`}
            >
                <span className="h-6 w-6 rounded-full bg-slate-800 shadow-md flex items-center justify-center">
                    {theme === 'light' ? (
                         <SunIcon className="w-4 h-4 text-yellow-400" />
                    ) : (
                         <MoonIcon className="w-4 h-4 text-sky-300" />
                    )}
                </span>
            </span>
        </button>
    );
};

export default ThemeToggle;