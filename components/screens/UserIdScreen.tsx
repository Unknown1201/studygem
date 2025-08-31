import React from 'react';
import Button from '../ui/Button';
import { CheckIcon, CopyIcon } from '../ui/icons';
import { useAppContext } from '../../hooks/useAppContext';

const UserIdScreen: React.FC = () => {
    const { userData, setScreen, showNotification, generateRecoveryPDF } = useAppContext();
    
    const copyUserId = () => {
        navigator.clipboard.writeText(userData.userId).then(() => {
            showNotification('Study ID copied to clipboard!');
        });
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-sm text-center">
                <div className="space-y-3 mb-8">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <CheckIcon className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-white">Account Created!</h2>
                    <p className="text-slate-300 max-w-xs mx-auto">Keep this ID safe to sync your progress across devices.</p>
                </div>

                <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-3xl p-6 mb-8">
                    <code className="text-cyan-300 text-4xl font-bold tracking-widest">{userData.userId}</code>
                </div>

                <div className="space-y-3">
                    <Button onClick={() => setScreen('standard')}>Continue to App</Button>
                    <div className="flex space-x-3">
                        <Button variant="secondary" onClick={copyUserId}>
                            <CopyIcon className="w-5 h-5 mr-2" />
                            Copy ID
                        </Button>
                        <Button variant="secondary" onClick={generateRecoveryPDF}>Download PDF</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserIdScreen;