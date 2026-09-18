import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'revolution' | 'ghost' | 'outline-orange' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold tracking-tight rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
    xl: 'text-lg px-8 py-3.5 gap-3',
  };

  const variantStyles = {
    primary: 'bg-[#FF6A0C] hover:bg-[#E65A00] text-white shadow-sm hover:shadow-glow-sm focus:ring-[#FF6A0C] border border-transparent',
    secondary: 'bg-[#222222] hover:bg-[#2A2A2A] text-white border border-[#3A3A3A] hover:border-[#555555] focus:ring-white',
    revolution: 'bg-[#49D67C] hover:bg-[#3ec470] text-black font-extrabold shadow-sm focus:ring-[#49D67C] border border-transparent',
    ghost: 'bg-transparent hover:bg-white/10 text-white focus:ring-white/20',
    'outline-orange': 'bg-transparent border-2 border-[#FF6A0C] text-[#FF6A0C] hover:bg-[#FF6A0C] hover:text-white focus:ring-[#FF6A0C]',
    dark: 'bg-black hover:bg-[#1A1A1A] text-white border border-[#333333] focus:ring-white'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : leftIcon ? (
        <span className="flex-shrink-0">{leftIcon}</span>
      ) : null}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
};
