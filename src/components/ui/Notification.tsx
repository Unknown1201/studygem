import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { InfoIcon } from './icons';

const Notification: React.FC = () => {
    const { notification } = useAppContext();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (notification) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    return (
        <div 
            className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}
        >
            {notification && (
                <div className="flex items-center gap-3 bg-black/30 backdrop-blur-lg border border-white/20 rounded-full shadow-2xl px-5 py-2.5 text-slate-100">
                    <div className="w-5 h-5 text-sky-400 rounded-full shadow-[0_0_10px_theme(colors.sky.500)]">
                       <InfoIcon />
                    </div>
                    <span className="text-sm font-medium">{notification.message}</span>
                </div>
            )}
        </div>
    );
};

export default Notification;