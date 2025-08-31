import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { syllabus } from '../../data/syllabus';
import ListItem from '../ui/ListItem';
import CircularProgress from '../ui/CircularProgress';

const SubjectScreen: React.FC = () => {
    const { userData, selectSubject, calculateProgress } = useAppContext();
    const subjects = syllabus[userData.currentStandard]?.[userData.currentExam] 
        ? Object.keys(syllabus[userData.currentStandard]![userData.currentExam]) 
        : [];
    
    return (
        <div className="p-4 space-y-3">
            {subjects.map(subject => {
                const progress = calculateProgress('subject', {
                    standard: userData.currentStandard,
                    exam: userData.currentExam,
                    subject
                });
                return (
                    <ListItem key={subject} onClick={() => selectSubject(subject)}>
                        <div className="flex-grow">
                            <h3 className="font-semibold text-lg text-slate-100">{subject}</h3>
                             <p className="text-sm text-slate-400">Subject Progress</p>
                        </div>
                        <CircularProgress progress={progress} />
                    </ListItem>
                );
            })}
        </div>
    );
};

export default SubjectScreen;