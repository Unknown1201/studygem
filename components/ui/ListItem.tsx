import React from 'react';
import { ChevronRightIcon } from './icons';

interface ListItemProps {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ children, onClick, disabled = false }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-full flex items-center justify-between bg-black/20 backdrop-blur-md hover:bg-white/10 p-4 pl-6 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group text-slate-100"
        >
            <div className="flex-grow flex items-center text-left">
                {children}
            </div>
             <ChevronRightIcon className="w-6 h-6 text-slate-500 group-hover:text-slate-300 transition-colors duration-200 flex-shrink-0" />
        </button>
    );
};

export default ListItem;