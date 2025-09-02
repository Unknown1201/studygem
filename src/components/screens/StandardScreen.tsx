import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { syllabus } from '../../data/syllabus';
import ListItem from '../ui/ListItem';

const StandardScreen: React.FC = () => {
    const { selectStandard } = useAppContext();
    
    return (
        <div className="p-4 space-y-3">
            <h1 className="text-2xl font-bold px-4 pb-2 text-white md:hidden">Select Standard</h1>
            {Object.keys(syllabus).map(standard => {
                const isAvailable = syllabus[standard] !== null;
                return (
                    <ListItem
                        key={standard}
                        onClick={() => isAvailable && selectStandard(standard)}
                        disabled={!isAvailable}
                    >
                        <span className="font-semibold text-lg">{standard}th Standard</span>
                        {!isAvailable && (
                            <span className="ml-3 text-xs font-medium bg-sky-500/20 text-sky-300 px-2.5 py-1 rounded-full">Upcoming</span>
                        )}
                    </ListItem>
                );
            })}
        </div>
    );
};

export default StandardScreen;
