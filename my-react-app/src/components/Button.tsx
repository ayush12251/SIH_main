import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'google';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-full font-semibold text-[1rem] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-brand-indigo text-white hover:bg-brand-dark focus:ring-brand-indigo',
    secondary: 'bg-white text-neutral-600 border border-gray-200 hover:bg-neutral-bg focus:ring-gray-200',
    outline: 'bg-transparent text-brand-indigo border border-brand-indigo hover:bg-brand-light focus:ring-brand-indigo',
    google: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-200 rounded-lg py-3.5',
  };

  const spacing = variant === 'google' ? 'px-4' : 'px-6 py-3';
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${spacing} ${widthClass} ${className}`}
      {...props}
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      {children}
    </button>
  );
};
