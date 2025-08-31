
import React from 'react';

// DEPRECATED: This component is no longer in use.
// The new Layout component provides a more robust, global structure for all screens.
interface AnimatedScreenProps {
    children: React.ReactNode;
    className?: string;
}

const AnimatedScreen: React.FC<AnimatedScreenProps> = ({ children, className = '' }) => {
    return (
        <div className={`w-full h-full flex flex-col ${className}`}>
            {children}
        </div>
    );
};

export default AnimatedScreen;
