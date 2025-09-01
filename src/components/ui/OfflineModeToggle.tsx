import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { CloudOfflineIcon } from './icons';

const OfflineModeToggle: React.FC = () => {
    const { isOffline, toggleOfflineMode } = useAppContext();

    return (
        <button
            onClick={toggleOfflineMode}
            className="relative inline-flex items-center h-8 w-14 rounded-full bg-black/30 border border-white/10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Toggle Offline Mode"
        >
            <span
                className={`absolute inset-0.5 flex items-center justify-center transition-transform duration-300 transform ${
                    isOffline ? 'translate-x-6' : 'translate-x-0'
                }`}
            >
                <span className="h-6 w-6 rounded-full bg-slate-800 shadow-md flex items-center justify-center">
                    {isOffline ? (
                         <CloudOfflineIcon className="w-4 h-4 text-sky-300" />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-green-400">
                           <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
                        </svg>
                    )}
                </span>
            </span>
        </button>
    );
};

export default OfflineModeToggle;
