'use client';

import React, { useState, useEffect } from 'react';
import WelcomeScreen from '@/components/screens/WelcomeScreen';
import OnboardingScreen from '@/components/screens/OnboardingScreen';
import UserIdScreen from '@/components/screens/UserIdScreen';
import StandardScreen from '@/components/screens/StandardScreen';
import ExamScreen from '@/components/screens/ExamScreen';
import SubjectScreen from '@/components/screens/SubjectScreen';
import ChapterScreen from '@/components/screens/ChapterScreen';
import TaskScreen from '@/components/screens/TaskScreen';
import ProfileScreen from '@/components/screens/ProfileScreen';
import DbTestScreen from '@/components/screens/DbTestScreen';
import { useAppContext } from '@/hooks/useAppContext';
import Notification from '@/components/ui/Notification';
import DesktopLayout from '@/components/ui/DesktopLayout';
import MobileLayout from '@/components/ui/MobileLayout';

const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        // Initial check
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        // Listener for changes
        const listener = () => setMatches(media.matches);
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [matches, query]);
    return matches;
};

const ScreenRenderer: React.FC = () => {
    const { currentScreen } = useAppContext();

    const screens: { [key: string]: React.ReactNode } = {
        'welcome': <WelcomeScreen />,
        'onboarding': <OnboardingScreen />,
        'userid': <UserIdScreen />,
        'standard': <StandardScreen />,
        'exam': <ExamScreen />,
        'subject': <SubjectScreen />,
        'chapter': <ChapterScreen />,
        'task': <TaskScreen />,
        'profile': <ProfileScreen />,
        'dbtest': <DbTestScreen />,
    };

    const ScreenComponent = screens[currentScreen] || <WelcomeScreen />;

    return (
        <div key={currentScreen} className="animate-screen-enter w-full h-full">
            {ScreenComponent}
        </div>
    );
};

export default function Page() {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    
    return (
        <div className="h-screen w-full text-slate-50 overflow-hidden">
            {isDesktop ? (
                <DesktopLayout>
                    <ScreenRenderer />
                </DesktopLayout>
            ) : (
                <MobileLayout>
                    <ScreenRenderer />
                </MobileLayout>
            )}
            <Notification />
        </div>
    );
}
