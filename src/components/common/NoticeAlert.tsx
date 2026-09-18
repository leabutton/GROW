import React from 'react';
import { AlertCircle, Car, Waves, Sparkles, CheckCircle2 } from 'lucide-react';

export type NoticeType = 'parking' | 'leisure' | 'housekeeping' | 'revolution' | 'info';

export interface NoticeAlertProps {
  type?: NoticeType;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const NoticeAlert: React.FC<NoticeAlertProps> = ({
  type = 'info',
  title,
  description,
  actionText,
  onAction,
  className = '',
}) => {
  const configs = {
    parking: {
      icon: <Car className="w-5 h-5 text-[#FF6A0C] flex-shrink-0" />,
      border: 'border-[#FF6A0C]/40',
      bg: 'bg-[#FF6A0C]/10',
      titleColor: 'text-[#FF6A0C]',
    },
    leisure: {
      icon: <Waves className="w-5 h-5 text-[#3DB5E6] flex-shrink-0" />,
      border: 'border-[#3DB5E6]/40',
      bg: 'bg-[#3DB5E6]/10',
      titleColor: 'text-[#3DB5E6]',
    },
    housekeeping: {
      icon: <Sparkles className="w-5 h-5 text-[#F5A623] flex-shrink-0" />,
      border: 'border-[#F5A623]/40',
      bg: 'bg-[#F5A623]/10',
      titleColor: 'text-[#F5A623]',
    },
    revolution: {
      icon: <CheckCircle2 className="w-5 h-5 text-[#49D67C] flex-shrink-0" />,
      border: 'border-[#49D67C]/40',
      bg: 'bg-[#49D67C]/10',
      titleColor: 'text-[#49D67C]',
    },
    info: {
      icon: <AlertCircle className="w-5 h-5 text-gray-300 flex-shrink-0" />,
      border: 'border-gray-700',
      bg: 'bg-[#222222]',
      titleColor: 'text-white',
    }
  };

  const current = configs[type];

  return (
    <div className={`p-4 rounded-lg border ${current.border} ${current.bg} flex items-start gap-3.5 ${className}`}>
      <div className="mt-0.5">{current.icon}</div>
      <div className="flex-1 text-sm">
        <h4 className={`font-semibold ${current.titleColor} flex items-center gap-2`}>
          {title}
        </h4>
        <p className="text-gray-300 text-xs md:text-sm mt-0.5 leading-relaxed">
          {description}
        </p>
        {actionText && (
          <button
            onClick={onAction}
            className="mt-2 text-xs font-bold underline hover:opacity-80 transition-opacity"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};
