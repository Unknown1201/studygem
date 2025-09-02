import React from 'react';
import NavigationBar from './NavigationBar';
import { useAppContext } from '../../hooks/useAppContext';
import { CloudOfflineIcon } from './icons';

interface MobileLayoutProps {
    children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
    const { screenTitle, isOffline } = useAppContext();
    const showHeader = !!screenTitle;

    return (
        <div className="w-full h-screen max-w-4xl mx-auto flex flex-col">
            {showHeader && (
                <header className="flex-shrink-0 p-4 bg-black/10 backdrop-blur-md border-b border-white/10">
                    <div className="relative flex items-center justify-center">
                        <h1 className="text-lg font-semibold text-slate-100 truncate text-center">{screenTitle}</h1>
                         {isOffline && (
                            <div className="absolute right-0" title="Offline Mode Enabled">
                                <CloudOfflineIcon className="w-6 h-6 text-slate-400" />
                            </div>
                        )}
                    </div>
                </header>
            )}
            
            <main className="flex-grow w-full overflow-hidden relative">
                <div className="absolute inset-0 overflow-y-auto">
                    {children}
                </div>
            </main>

            <footer className="flex-shrink-0">
                <NavigationBar />
            </footer>
        </div>
    );
};

export default MobileLayout;