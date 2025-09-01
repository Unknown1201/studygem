import React, { createContext, useState, useCallback, useEffect, useMemo } from 'react';
import type { UserData, Progress, Screen, Theme } from '../types';
import { syllabus } from '../data/syllabus';
import * as apiService from '../services/apiService';
import { generateRecoveryPDF as pdfServiceGenerate } from '../services/pdfService';

const initialUserData: UserData = {
    name: '',
    userId: '',
    class: '',
    rollNumber: '',
    currentStandard: '',
    currentExam: '',
    currentSubject: '',
    currentChapter: ''
};

interface AppContextType {
    currentScreen: Screen;
    screenTitle: string;
    userData: UserData;
    progress: Progress;
    notification: { message: string, id: number } | null;
    isLoading: boolean;
    theme: Theme;
    setScreen: (screen: Screen) => void;
    showNotification: (message: string) => void;
    createUser: (name: string, userClass: string, rollNumber: string) => Promise<void>;
    loginUser: (userId: string) => Promise<void>;
    updateUser: (newData: { name: string, userClass: string, rollNumber: string }) => Promise<boolean>;
    logoutUser: () => void;
    selectStandard: (standard: string) => void;
    selectExam: (exam: string) => void;
    selectSubject: (subject: string) => void;
    selectChapter: (chapter: string) => void;
    goBack: () => void;
    toggleTask: (taskId: string, completed: boolean) => void;
    getTaskId: (task: string) => string;
    isTaskCompleted: (taskId: string) => boolean;
    calculateProgress: (level: 'exam' | 'subject' | 'chapter', identifiers: { standard: string; exam: string; subject?: string; chapter?: string }) => number;
    generateRecoveryPDF: () => void;
    toggleTheme: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
    const [userData, setUserData] = useState<UserData>(initialUserData);
    const [progress, setProgress] = useState<Progress>({});
    const [notification, setNotification] = useState<{ message: string, id: number } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('studygem_theme');
            // Default to dark for the new theme
            if (savedTheme === 'light') return 'light';
        }
        return 'dark';
    });

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('studygem_theme', theme);
    }, [theme]);
    
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const setScreen = (screen: Screen) => {
        setCurrentScreen(screen);
    };

    const showNotification = (message: string) => {
        setNotification({ message, id: Date.now() });
    };

    const generateUniqueId = async (name: string, userClass: string, roll: string): Promise<string | null> => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let id = '';
        let isUnique = false;
        let attempts = 0;
        const maxAttempts = 10; // Prevent runaway loops

        while (!isUnique && attempts < maxAttempts) {
            attempts++;
            const namePart = name.substring(0, 1).toUpperCase();
            const classPart = userClass.replace(/[^A-Z0-9]/ig, '').slice(-1).toUpperCase();
            const rollPart = roll.replace(/[^A-Z0-9]/ig, '').slice(-1).toUpperCase();

            let randomPart = '';
            for (let i = 0; i < 2; i++) {
                randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
            }

            const combined = `${namePart}${classPart}${rollPart}${randomPart}`.padEnd(5, 'X');
            id = `SG-${combined.slice(0, 5)}`;

            try {
                const isTaken = await apiService.isUserIdTaken(id);
                isUnique = !isTaken;
            } catch (error) {
                console.error("API error during user ID check. Aborting creation.", error);
                // If the API fails, we cannot safely create a user. Abort.
                return null;
            }
        }

        if (!isUnique) {
            console.error(`Could not generate a unique ID after ${maxAttempts} attempts.`);
            return null;
        }

        return id;
    };


    const getTaskId = useCallback((task: string): string => {
        return `${userData.currentStandard}-${userData.currentExam}-${userData.currentSubject}-${userData.currentChapter}-${task}`;
    }, [userData]);

    const isTaskCompleted = useCallback((taskId: string): boolean => {
        return progress[taskId] === true;
    }, [progress]);

    const calculateChapterProgress = useCallback((standard: string, exam: string, subject: string, chapter: string): number => {
        const tasks = syllabus[standard]?.[exam]?.[subject]?.[chapter];
        if (!tasks || tasks.length === 0) return 0;
        const getFullTaskId = (task: string) => `${standard}-${exam}-${subject}-${chapter}-${task}`;
        const completedTasks = tasks.filter(task => isTaskCompleted(getFullTaskId(task))).length;
        return Math.round((completedTasks / tasks.length) * 100);
    }, [isTaskCompleted]);

    const calculateSubjectProgress = useCallback((standard: string, exam: string, subject: string): number => {
        const chapters = syllabus[standard]?.[exam]?.[subject];
        if (!chapters) return 0;
        const chapterKeys = Object.keys(chapters);
        if (chapterKeys.length === 0) return 0;
        const totalProgress = chapterKeys.reduce((acc, chapter) => acc + calculateChapterProgress(standard, exam, subject, chapter), 0);
        return Math.round(totalProgress / chapterKeys.length);
    }, [calculateChapterProgress]);

    const calculateExamProgress = useCallback((standard: string, exam: string): number => {
        const subjects = syllabus[standard]?.[exam];
        if (!subjects) return 0;
        const subjectKeys = Object.keys(subjects);
        if (subjectKeys.length === 0) return 0;
        const totalProgress = subjectKeys.reduce((acc, subject) => acc + calculateSubjectProgress(standard, exam, subject), 0);
        return Math.round(totalProgress / subjectKeys.length);
    }, [calculateSubjectProgress]);
    
    const calculateProgress = useCallback((level: 'exam' | 'subject' | 'chapter', identifiers: { standard: string; exam: string; subject?: string; chapter?: string }) => {
        const { standard, exam, subject, chapter } = identifiers;
        switch (level) {
            case 'exam':
                return calculateExamProgress(standard, exam);
            case 'subject':
                return subject ? calculateSubjectProgress(standard, exam, subject) : 0;
            case 'chapter':
                return (subject && chapter) ? calculateChapterProgress(standard, exam, subject, chapter) : 0;
            default:
                return 0;
        }
    }, [calculateExamProgress, calculateSubjectProgress, calculateChapterProgress]);

    const toggleTask = useCallback(async (taskId: string, completed: boolean) => {
        // Optimistically update UI
        const newProgress = { ...progress };
        if (completed) {
            newProgress[taskId] = true;
        } else {
            delete newProgress[taskId];
        }
        setProgress(newProgress);
        
        // Send update to the backend
        await apiService.updateProgress(userData.userId, taskId, completed);
    }, [progress, userData.userId]);

    const createUser = async (name: string, userClass: string, rollNumber: string) => {
        setIsLoading(true);
        const userId = await generateUniqueId(name, userClass, rollNumber);

        if (!userId) {
            showNotification("Error: Server issue preventing user creation. Please try again later.");
            setIsLoading(false);
            return;
        }

        const newUserData = { ...initialUserData, userId, name, class: userClass, rollNumber };
        
        const success = await apiService.createUser(newUserData);
        
        if (success) {
            setUserData(newUserData);
            setProgress({});
            localStorage.setItem('studygem_userid', userId);
            setScreen('userid');
        } else {
            showNotification("Error: Could not create user account.");
        }
        setIsLoading(false);
    };
    
    const generateRecoveryPDF = () => {
        pdfServiceGenerate(userData, theme);
    }

    const loginUser = async (userId: string) => {
        setIsLoading(true);
        const data = await apiService.loadUser(userId);
        if (data) {
            setUserData({
                ...initialUserData,
                userId: data.userData.userId,
                name: data.userData.name,
                class: data.userData.class,
                rollNumber: data.userData.rollNumber,
            });
            setProgress(data.progress || {});
            localStorage.setItem('studygem_userid', data.userData.userId);
            setScreen('standard');
        } else {
            showNotification("Invalid Study ID. Please try again.");
        }
        setIsLoading(false);
    };

    const updateUser = async (newData: { name: string, userClass: string, rollNumber: string }): Promise<boolean> => {
        setIsLoading(true);
        const updatedUserData: UserData = { ...userData, name: newData.name, class: newData.userClass, rollNumber: newData.rollNumber };
        
        const result = await apiService.updateUser(updatedUserData);
        
        if (result.success) {
            setUserData(updatedUserData);
            showNotification("Profile updated successfully!");
            setIsLoading(false);
            return true;
        } else {
            showNotification(result.message || "An error occurred.");
            setIsLoading(false);
            return false;
        }
    };

    const logoutUser = () => {
        setUserData(initialUserData);
        setProgress({});
        localStorage.removeItem('studygem_userid');
        setScreen('welcome');
        showNotification("You have been logged out.");
    };

    useEffect(() => {
        const checkCookie = async () => {
            const userId = localStorage.getItem('studygem_userid');
            if (userId) {
                await loginUser(userId);
            } else {
                setIsLoading(false);
            }
        };
        checkCookie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectStandard = (standard: string) => {
        setUserData(d => ({ ...d, currentStandard: standard }));
        setScreen('exam');
    };

    const selectExam = (exam: string) => {
        setUserData(d => ({ ...d, currentExam: exam }));
        setScreen('subject');
    };

    const selectSubject = (subject: string) => {
        setUserData(d => ({ ...d, currentSubject: subject }));
        setScreen('chapter');
    };

    const selectChapter = (chapter: string) => {
        setUserData(d => ({ ...d, currentChapter: chapter }));
        setScreen('task');
    };

    const goBack = () => {
        switch (currentScreen) {
            case 'exam': setScreen('standard'); break;
            case 'subject': setScreen('exam'); break;
            case 'chapter': setScreen('subject'); break;
            case 'task': setScreen('chapter'); break;
            case 'userid': setScreen('onboarding'); break;
            case 'profile': setScreen('standard'); break;
            default: break; // Welcome screen has no back
        }
    };
    
    const screenTitle = useMemo(() => {
        switch (currentScreen) {
            case 'welcome': return '';
            case 'onboarding': return 'Get Started';
            case 'userid': return 'Your Study ID';
            case 'standard': return `Welcome, ${userData.name}!`;
            case 'exam': return 'Select Exam';
            case 'subject': return userData.currentExam;
            case 'chapter': return userData.currentSubject;
            case 'task': return userData.currentChapter;
            case 'profile': return 'Profile & Settings';
            default: return 'StudyGem';
        }
    }, [currentScreen, userData]);


    return (
        <AppContext.Provider value={{
            currentScreen, screenTitle, userData, progress, notification, isLoading, theme,
            setScreen, showNotification, toggleTheme,
            createUser, loginUser, updateUser, logoutUser,
            selectStandard, selectExam, selectSubject, selectChapter,
            goBack, toggleTask, getTaskId, isTaskCompleted, calculateProgress, generateRecoveryPDF
        }}>
            {children}
        </AppContext.Provider>
    );
};