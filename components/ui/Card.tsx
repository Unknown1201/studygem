
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

// DEPRECATED: This component is no longer in use.
// The new design uses a full-panel approach via AnimatedScreen.
const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`p-6 sm:p-8 ${className}`}>
            {children}
        </div>
    );
};

export default Card;