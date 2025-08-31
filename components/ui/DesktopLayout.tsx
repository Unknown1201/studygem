import React from 'react';
import Sidebar from './Sidebar';

interface DesktopLayoutProps {
    children: React.ReactNode;
}

const DesktopLayout: React.FC<DesktopLayoutProps> = ({ children }) => {
    return (
        <div className="w-full h-screen flex p-4 gap-4">
            <Sidebar />
            <main className="flex-grow w-full h-full overflow-hidden relative bg-black/20 backdrop-blur-lg border border-white/10 rounded-3xl">
                 <div className="absolute inset-0 overflow-y-auto">
                    <div className="max-w-4xl mx-auto py-8">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DesktopLayout;