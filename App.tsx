import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import WelcomeScreen from './components/screens/WelcomeScreen';
import OnboardingScreen from './components/screens/OnboardingScreen';
import UserIdScreen from './components/screens/UserIdScreen';
import StandardScreen from './components/screens/StandardScreen';
import ExamScreen from './components/screens/ExamScreen';
import SubjectScreen from './components/screens/SubjectScreen';
import ChapterScreen from './components/screens/ChapterScreen';
import TaskScreen from './components/screens/TaskScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import { useAppContext } from './hooks/useAppContext';
import Notification from './components/ui/Notification';
import DesktopLayout from './components/ui/DesktopLayout';
import MobileLayout from './components/ui/MobileLayout';

const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
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
    };

    const ScreenComponent = screens[currentScreen] || <WelcomeScreen />;

    return (
        <div key={currentScreen} className="animate-screen-enter w-full h-full">
            {ScreenComponent}
        </div>
    );
};

const App: React.FC = () => {
    return (
      <AppProvider>
        <AppContent />
      </AppProvider>
    );
};

const AppContent: React.FC = () => {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    
    return (
        <div className="h-screen w-full font-sans text-slate-50 overflow-hidden">
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

export default App;