import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'normal' | 'large';
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
  radius?: '2xl' | '3xl';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'normal',
  shadow = 'lg',
  radius = '3xl',
}) => {
  const paddings = {
    none: 'p-0',
    small: 'p-4',
    normal: 'p-8',
    large: 'p-12',
  };

  const shadows = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.01)]',
    xl: 'shadow-xl',
  };

  const radii = {
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
  };

  return (
    <div className={`bg-white border border-gray-100 ${radii[radius]} ${paddings[padding]} ${shadows[shadow]} ${className}`}>
      {children}
    </div>
  );
};
