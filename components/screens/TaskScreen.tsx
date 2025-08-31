import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { syllabus } from '../../data/syllabus';
import { CheckIcon } from '../ui/icons';
import CircularProgress from '../ui/CircularProgress';

const TaskScreen: React.FC = () => {
    const { userData, toggleTask, getTaskId, isTaskCompleted, calculateProgress } = useAppContext();
    const tasks = syllabus[userData.currentStandard]?.[userData.currentExam]?.[userData.currentSubject]?.[userData.currentChapter] || [];
    const chapterProgress = calculateProgress('chapter', {
        standard: userData.currentStandard,
        exam: userData.currentExam,
        subject: userData.currentSubject,
        chapter: userData.currentChapter
    });
    
    return (
        <div className="h-full flex flex-col">
            <div className="p-4 flex-shrink-0 flex items-center justify-center">
                <CircularProgress progress={chapterProgress} size={80} strokeWidth={6} />
            </div>

            <div className="flex-grow overflow-y-auto px-2 pb-2">
                 <div className="space-y-2 p-2">
                    {tasks.map((task, index) => {
                        const taskId = getTaskId(task);
                        const completed = isTaskCompleted(taskId);

                        return (
                            <label 
                                key={index} 
                                htmlFor={`task-${index}`} 
                                className={`flex items-center p-4 pl-6 transition-all duration-300 cursor-pointer rounded-full border ${completed ? 'bg-white/10 border-white/20' : 'bg-black/20 border-white/10 hover:border-white/20 hover:bg-black/30'}`}
                            >
                                <div className="relative w-7 h-7 flex-shrink-0 mr-4">
                                    <input
                                        id={`task-${index}`}
                                        type="checkbox"
                                        checked={completed}
                                        onChange={(e) => toggleTask(taskId, e.target.checked)}
                                        className="appearance-none w-full h-full rounded-full border-2 border-slate-500/50 transition-all duration-300 peer checked:bg-gradient-to-br checked:from-sky-400 checked:to-cyan-400 checked:border-transparent"
                                    />
                                    <CheckIcon className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 scale-50 transition-all duration-300 peer-checked:opacity-100 peer-checked:scale-100" />
                                </div>
                                <span className={`flex-1 transition-colors duration-200 text-base ${completed ? 'line-through text-slate-400' : 'text-slate-100'}`}>{task}</span>
                            </label>
                        );
                    })}
                 </div>
            </div>
        </div>
    );
};

export default TaskScreen;