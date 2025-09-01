import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { syllabus } from '../../data/syllabus';
import ListItem from '../ui/ListItem';
import CircularProgress from '../ui/CircularProgress';

const ChapterScreen: React.FC = () => {
    const { userData, selectChapter, calculateProgress } = useAppContext();
    const chapters = syllabus[userData.currentStandard]?.[userData.currentExam]?.[userData.currentSubject]
        ? Object.keys(syllabus[userData.currentStandard]![userData.currentExam][userData.currentSubject])
        : [];

    return (
        <div className="p-4 space-y-3">
            {chapters.map(chapter => {
                const progress = calculateProgress('chapter', {
                    standard: userData.currentStandard,
                    exam: userData.currentExam,
                    subject: userData.currentSubject,
                    chapter
                });
                return (
                    <ListItem key={chapter} onClick={() => selectChapter(chapter)}>
                         <div className="flex-grow pr-4">
                            <h3 className="font-semibold text-slate-100">{chapter}</h3>
                        </div>
                        <CircularProgress progress={progress} size={48} strokeWidth={4} />
                    </ListItem>
                );
            })}
        </div>
    );
};

export default ChapterScreen;