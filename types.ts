export interface UserData {
    name: string;
    userId: string;
    class: string;
    rollNumber: string;
    currentStandard: string;
    currentExam: string;
    currentSubject: string;
    currentChapter: string;
}

export interface Progress {
    [taskId: string]: boolean;
}

export interface Syllabus {
    [standard: string]: {
        [exam: string]: {
            [subject: string]: {
                [chapter: string]: string[];
            };
        };
    } | null;
}

export type Screen = 'welcome' | 'onboarding' | 'userid' | 'standard' | 'exam' | 'subject' | 'chapter' | 'task' | 'profile';

export type Theme = 'light' | 'dark';