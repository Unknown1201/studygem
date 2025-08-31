import React, { useState } from 'react';
import Button from '../ui/Button';
import { useAppContext } from '../../hooks/useAppContext';
import { LoaderIcon, ArrowRightIcon } from '../ui/icons';

const OnboardingScreen: React.FC = () => {
    const [mode, setMode] = useState<'new' | 'login'>('new');
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [userClass, setUserClass] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [loginId, setLoginId] = useState('');
    const { createUser, loginUser, isLoading } = useAppContext();

    const handleNextStep = () => {
        if (name.trim().length >= 2) {
            setStep(2);
        }
    };

    const handleCreateUser = () => {
        if (userClass.trim() && rollNumber.trim() && !isLoading) {
            createUser(name.trim(), userClass.trim(), rollNumber.trim());
        }
    };
    
    const handleLoginSubmit = () => {
        if (loginId.trim() && !isLoading) {
            loginUser(loginId.trim().toUpperCase());
        }
    };

    const inputClasses = "w-full bg-black/20 backdrop-blur-sm border border-white/20 rounded-full px-5 py-3.5 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-300";

    const renderNewUserFlow = () => (
        <div className="space-y-6">
            {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                    <h2 className="text-2xl font-bold text-white text-center">What should we call you?</h2>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleNextStep()}
                        placeholder="Enter your name"
                        className={inputClasses}
                        autoFocus
                    />
                    <Button onClick={handleNextStep} disabled={name.trim().length < 2}>
                        Next <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            )}
            {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                    <h2 className="text-2xl font-bold text-white text-center">Tell us more...</h2>
                     <input
                        type="text"
                        value={userClass}
                        onChange={(e) => setUserClass(e.target.value)}
                        placeholder="Your Class (e.g., 12th)"
                        className={inputClasses}
                        autoFocus
                    />
                     <input
                        type="text"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleCreateUser()}
                        placeholder="Your Roll Number"
                        className={inputClasses}
                    />
                    <Button onClick={handleCreateUser} disabled={!userClass.trim() || !rollNumber.trim() || isLoading}>
                        {isLoading ? <LoaderIcon /> : 'Create My Account'}
                    </Button>
                    <Button variant="secondary" onClick={() => setStep(1)}>Go Back</Button>
                </div>
            )}
        </div>
    );

    const renderLoginFlow = () => (
         <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-white text-center">Welcome Back!</h2>
            <input
                type="text"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLoginSubmit()}
                placeholder="SG-XXXXX"
                className={`${inputClasses} uppercase text-center tracking-widest font-mono`}
                autoFocus
            />
            <Button onClick={handleLoginSubmit} disabled={!loginId.trim() || isLoading}>
                 {isLoading ? <LoaderIcon /> : 'Load Progress'}
            </Button>
        </div>
    );

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-full p-1 mb-6 flex">
                     <button
                        onClick={() => { setMode('new'); setStep(1); }}
                        className={`w-1/2 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${mode === 'new' ? 'bg-white/10 text-white' : 'text-slate-400'}`}
                    >
                        I'm New
                    </button>
                    <button
                        onClick={() => setMode('login')}
                        className={`w-1/2 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${mode === 'login' ? 'bg-white/10 text-white' : 'text-slate-400'}`}
                    >
                        I Have an ID
                    </button>
                </div>

                <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-3xl p-6">
                     {mode === 'new' ? renderNewUserFlow() : renderLoginFlow()}
                </div>
            </div>
        </div>
    );
};

export default OnboardingScreen;