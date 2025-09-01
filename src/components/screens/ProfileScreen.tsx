import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import Button from '../ui/Button';
import { LoaderIcon, LogoutIcon } from '../ui/icons';
import ThemeToggle from '../ui/ThemeToggle';

const ProfileScreen: React.FC = () => {
    const { userData, updateUser, logoutUser, isLoading } = useAppContext();
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