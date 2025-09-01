import React from 'react';
import NavigationBar from './NavigationBar';
import { useAppContext } from '../../hooks/useAppContext';

interface MobileLayoutProps {
    children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
    const { screenTitle } = useAppContext();
    const showHeader = !!screenTitle;

    return (
        <div className="w-full h-screen max-w-4xl mx-auto flex flex-col">
            {showHeader && (
                <header className="flex-shrink-0 p-4 bg-black/10 backdrop-blur-md border-b border-white/10">
                    <h1 className="text-lg font-semibold text-slate-100 truncate text-center">{screenTitle}</h1>
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