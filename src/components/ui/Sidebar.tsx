import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { GemIcon, HomeIcon, LogoutIcon, UserIcon, CloudOfflineIcon } from './icons';
import ThemeToggle from './ThemeToggle';

const Sidebar: React.FC = () => {
    const { userData, currentScreen, setScreen, logoutUser, isOffline } = useAppContext();
    const isLoggedIn = userData.userId && !['welcome', 'onboarding', 'userid', 'dbtest'].includes(currentScreen);

    const NavButton: React.FC<{ screen: string, icon: React.ReactNode, label: string }> = ({ screen, icon, label }) => {
        const isActive = currentScreen === screen;
        return (
            <button
                onClick={() => setScreen(screen as any)}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive
                        ? 'bg-sky-500/20 text-cyan-200 shadow-[0_0_15px_theme(colors.sky.500/50%)]'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
            >
                <span className="mr-3">{icon}</span>
                {label}
            </button>
        )
    }

    return (
        <aside className="w-64 h-full flex-shrink-0 bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl flex flex-col p-4">
            <div className="flex items-center gap-2 px-2 pb-4 mb-4 border-b border-white/10">
                <GemIcon className="w-8 h-8 text-sky-400" />
                <h1 className="text-xl font-bold text-white">StudyGem</h1>
            </div>

            <nav className="flex-grow space-y-2">
                {isLoggedIn && (
                    <>
                        <NavButton screen="standard" icon={<HomeIcon className="w-5 h-5"/>} label="Home" />
                        <NavButton screen="profile" icon={<UserIcon className="w-5 h-5"/>} label="Profile" />
                    </>
                )}
            </nav>

            <div className="flex-shrink-0 space-y-4">
                 {isLoggedIn && (
                    <div className="flex items-center justify-between px-2">
                         <div className="text-sm">
                            <p className="font-semibold text-slate-100 flex items-center gap-2">
                                {userData.name}
                                {isOffline && <span title="Offline Mode"><CloudOfflineIcon className="w-4 h-4 text-slate-400" /></span>}
                            </p>
                            <p className="text-slate-400">{userData.userId}</p>
                         </div>
                         <ThemeToggle />
                    </div>
                 )}
                 {isLoggedIn && (
                    <button 
                        onClick={logoutUser}
                        className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-full text-red-400 hover:bg-red-500/20"
                    >
                       <LogoutIcon className="w-5 h-5 mr-3"/>
                       Logout
                    </button>
                 )}
            </div>
        </aside>
    );
};

export default Sidebar;
