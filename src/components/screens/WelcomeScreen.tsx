import React from 'react';
import { GemIcon, ArrowRightIcon } from '../ui/icons';
import { useAppContext } from '../../hooks/useAppContext';
import Button from '../ui/Button';

const WelcomeScreen: React.FC = () => {
    const { setScreen, loginAsGuest } = useAppContext();

    return (
        <div className="w-full h-full text-center flex flex-col items-center justify-center p-8">
            <div className="flex-grow flex flex-col items-center justify-center">
                <div className="w-32 h-32 mb-6 bg-sky-500/10 rounded-full flex items-center justify-center shadow-[0_0_40px_theme(colors.sky.500/40%)]">
                    <div className="w-28 h-28 bg-sky-500/20 rounded-full flex items-center justify-center">
                        <GemIcon className="w-14 h-14 text-sky-300" />
                    </div>
                </div>
                <h1 className="text-6xl font-extrabold text-white tracking-tight">StudyGem</h1>
                <p className="text-lg text-slate-300 mt-3 max-w-sm">Your academic journey, reimagined.</p>
            </div>
            <div className="w-full max-w-sm space-y-3">
                <Button onClick={() => setScreen('onboarding')} className="flex items-center justify-center gap-2 text-lg">
                    Get Started
                    <ArrowRightIcon className="w-5 h-5" />
                </Button>
                <Button variant="secondary" onClick={loginAsGuest}>Continue as Guest</Button>
                <Button variant="secondary" onClick={() => setScreen('dbtest')}>DB Connection Test</Button>
                 <p className="text-xs text-slate-600 pt-2">A DevDigital Creation by @asli_devv</p>
            </div>
        </div>
    );
};

export default WelcomeScreen;
