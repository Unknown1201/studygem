import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    children: React.ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
    const baseClasses = "w-full text-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-4 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] py-3.5 px-6 text-base";

    const variantClasses = {
        primary: 'bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-500/20 hover:shadow-xl hover:shadow-sky-500/30 focus:ring-sky-500/50',
        secondary: 'bg-white/10 text-slate-100 backdrop-blur-md border border-white/20 hover:bg-white/20 focus:ring-white/30',
        danger: 'bg-red-500/10 text-red-400 backdrop-blur-md border border-red-500/20 hover:bg-red-500/20 focus:ring-red-500/50',
    };

    return (
        <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;