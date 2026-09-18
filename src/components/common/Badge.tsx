import React from 'react';

export type BadgeVariant = 
  | 'orange' 
  | 'gym' 
  | 'hiit' 
  | 'pub' 
  | 'vworks' 
  | 'events' 
  | 'revolution' 
  | 'neutral'
  | 'outline';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  children,
  size = 'md',
  icon,
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded',
    md: 'text-xs font-semibold tracking-wide px-2.5 py-1 rounded-md',
  };

  const variantStyles: Record<BadgeVariant, string> = {
    orange: 'bg-[#FF6A0C]/15 text-[#FF6A0C] border border-[#FF6A0C]/30',
    gym: 'bg-[#3DB5E6]/15 text-[#3DB5E6] border border-[#3DB5E6]/30',
    hiit: 'bg-[#A8E000]/15 text-[#A8E000] border border-[#A8E000]/30',
    pub: 'bg-[#F5A623]/15 text-[#F5A623] border border-[#F5A623]/30',
    vworks: 'bg-[#6B7280]/20 text-[#D1D5DB] border border-[#6B7280]/40',
    events: 'bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30',
    revolution: 'bg-[#49D67C]/15 text-[#49D67C] border border-[#49D67C]/40 font-bold',
    neutral: 'bg-[#2A2A2A] text-gray-300 border border-[#3E3E3E]',
    outline: 'bg-transparent text-gray-300 border border-gray-600'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 uppercase font-medium select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
