import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { ChevronLeftIcon, UserIcon, HomeIcon } from './icons';

const NavigationBar: React.FC = () => {
    const { currentScreen, goBack, setScreen } = useAppContext();

    if (currentScreen === 'dbtest') {
        return null;
    }

    const showBackButton = ![
        'welcome',
        'onboarding',
        'standard',
    ].includes(currentScreen);

    const showProfileButton = ![
        'welcome',
        'onboarding',
        'userid',
        'profile'
    ].includes(currentScreen);
    
    const showHomeButton = currentScreen !== 'standard' && !['welcome', 'onboarding', 'userid'].includes(currentScreen);

    const NavButton: React.FC<{onClick: () => void, children: React.ReactNode, 'aria-label': string}> = ({ onClick, children, 'aria-label': ariaLabel }) => (
        <button 
            onClick={onClick}
            aria-label={ariaLabel}
            className="w-14 h-14 flex items-center justify-center text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-all duration-200"
        >
            {children}
        </button>
    );

    return (
        <nav className="w-full h-20 bg-black/20 backdrop-blur-lg border-t border-white/10 p-2 flex items-center justify-around">
            <div className="w-1/3 flex justify-center">
                 {showBackButton && (
                     <NavButton onClick={goBack} aria-label="Go Back">
                        <ChevronLeftIcon className="w-8 h-8" />
                    </NavButton>
                 )}
            </div>
            <div className="w-1/3 flex justify-center">
                 {showHomeButton && (
                    <button 
                        onClick={() => setScreen('standard')}
                        aria-label="Go Home"
                        className="w-16 h-16 flex items-center justify-center text-white bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full shadow-lg shadow-sky-500/30 hover:shadow-sky-500/40 hover:scale-105 transition-all duration-300"
                    >
                        <HomeIcon className="w-8 h-8" />
                    </button>
                 )}
            </div>
            <div className="w-1/3 flex justify-center">
                {showProfileButton && (
                    <NavButton onClick={() => setScreen('profile')} aria-label="Open Profile">
                        <UserIcon className="w-8 h-8" />
                    </NavButton>
                )}
            </div>
        </nav>
    );
};

export default NavigationBar;
