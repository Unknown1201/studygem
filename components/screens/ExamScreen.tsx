import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { syllabus } from '../../data/syllabus';
import ListItem from '../ui/ListItem';
import CircularProgress from '../ui/CircularProgress';

const ExamScreen: React.FC = () => {
    const { userData, selectExam, calculateProgress } = useAppContext();
    const exams = syllabus[userData.currentStandard] ? Object.keys(syllabus[userData.currentStandard]!) : [];

    return (
         <div className="p-4 space-y-3">
            {exams.map(exam => {
                const progress = calculateProgress('exam', { standard: userData.currentStandard, exam });
                return (
                    <ListItem key={exam} onClick={() => selectExam(exam)}>
                        <div className="flex-grow">
                            <h3 className="font-semibold text-lg text-slate-100">{exam}</h3>
                            <p className="text-sm text-slate-400">Overall Progress</p>
                        </div>
                        <CircularProgress progress={progress} />
                    </ListItem>
                );
            })}
        </div>
    );
};

export default ExamScreen;