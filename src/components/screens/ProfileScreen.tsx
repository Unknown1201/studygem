import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import Button from '../ui/Button';
import { LoaderIcon, LogoutIcon, UserIcon } from '../ui/icons';
import ThemeToggle from '../ui/ThemeToggle';
import OfflineModeToggle from '../ui/OfflineModeToggle';

const ProfileScreen: React.FC = () => {
    const { userData, updateUser, logoutUser, isLoading, isGuest, startGuestSync } = useAppContext();
    const [name, setName] = useState(userData.name);
    const [userClass, setUserClass] = useState(userData.class);
    const [rollNumber, setRollNumber] = useState(userData.rollNumber);

    useEffect(() => {
        setName(userData.name);
        setUserClass(userData.class);
        setRollNumber(userData.rollNumber);
    }, [userData]);
    
    const canSubmit = (name.trim().length >= 2 && userClass.trim().length > 0 && rollNumber.trim().length > 0) && 
                      (name !== userData.name || userClass !== userData.class || rollNumber !== userData.rollNumber);

    const handleUpdate = async () => {
        if (!canSubmit || isLoading) return;
        await updateUser({ name: name.trim(), userClass: userClass.trim(), rollNumber: rollNumber.trim() });
    };

    const inputClasses = "w-full bg-black/20 backdrop-blur-sm border border-white/20 rounded-full px-5 py-3.5 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-300";
    const labelClasses = "text-sm font-medium text-slate-300 mb-1.5 block pl-4";

    if (isGuest) {
        return (
            <div className="h-full flex flex-col justify-center items-center text-center p-4">
                <div className="w-24 h-24 mb-6 bg-sky-500/10 rounded-full flex items-center justify-center shadow-[0_0_40px_theme(colors.sky.500/40%)]">
                     <UserIcon className="w-12 h-12 text-sky-300" />
                </div>
                <h2 className="text-3xl font-bold text-white">You're a Guest</h2>
                <p className="text-slate-300 mt-2 max-w-xs">Your progress is currently saved only on this device.</p>
                <div className="w-full max-w-sm mt-8 space-y-3">
                    <Button onClick={startGuestSync}>Create Account to Sync</Button>
                    <Button variant="danger" onClick={logoutUser}>Exit Guest Mode</Button>
                </div>
                 <div className="w-full max-w-sm mt-8 border-t border-white/10 pt-6">
                    <div className="flex items-center justify-between px-4">
                         <label className="text-sm font-medium text-slate-300">Appearance</label>
                         <ThemeToggle />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col justify-between p-4">
            <div className="space-y-6">
                 <div>
                    <label htmlFor="userid-display" className={labelClasses}>Your Study ID</label>
                    <div id="userid-display" className="w-full bg-black/20 backdrop-blur-sm border border-white/20 rounded-full px-4 py-3 text-cyan-300 font-mono tracking-widest text-center">
                        {userData.userId}
                    </div>
                </div>
                 <div>
                    <label htmlFor="name-input" className={labelClasses}>Name</label>
                    <input
                        id="name-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className={inputClasses}
                    />
                </div>
                <div>
                    <label htmlFor="class-input" className={labelClasses}>Class</label>
                    <input
                        id="class-input"
                        type="text"
                        value={userClass}
                        onChange={(e) => setUserClass(e.target.value)}
                        placeholder="e.g., 12th"
                        className={inputClasses}
                    />
                </div>
                 <div>
                    <label htmlFor="roll-input" className={labelClasses}>Roll Number</label>
                    <input
                        id="roll-input"
                        type="text"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        placeholder="Enter your roll number"
                        className={inputClasses}
                    />
                </div>
                 <Button onClick={handleUpdate} disabled={!canSubmit || isLoading}>
                     {isLoading ? <LoaderIcon /> : 'Save Changes'}
                </Button>

                <div className="border-t border-white/10 pt-6 space-y-4">
                    <div className="flex items-center justify-between px-4">
                         <label className="text-sm font-medium text-slate-300">Appearance</label>
                         <ThemeToggle />
                    </div>
                     <div className="flex items-center justify-between px-4">
                         <label className="text-sm font-medium text-slate-300">Network</label>
                         <OfflineModeToggle />
                    </div>
                </div>
            </div>
            
            <div className="pt-6">
                 <Button variant="danger" onClick={logoutUser}>
                     <LogoutIcon className="w-5 h-5 mr-2" />
                     Logout
                 </Button>
            </div>

        </div>
    );
};

export default ProfileScreen;