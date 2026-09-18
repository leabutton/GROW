import React from 'react';
import { CopilotChatMessage } from '../../types/booking';
import { PackageComparisonCard } from './PackageComparisonCard';
import { AnprPassCard } from './AnprPassCard';
import { BookingRecordCard } from './BookingRecordCard';
import { Sparkles, ShieldCheck } from 'lucide-react';

export interface CopilotMessageProps {
  message: CopilotChatMessage;
  onSelectPackage: (packageType: 'room-club' | 'room-standard') => void;
  onActivatePlate: (plate: string) => void;
  onOpenDetails?: () => void;
}

export const CopilotMessage: React.FC<CopilotMessageProps> = ({
  message,
  onSelectPackage,
  onActivatePlate,
  onOpenDetails,
}) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} my-2.5`}>
      <div className="flex items-start gap-2 max-w-[92%] sm:max-w-[85%]">
        {!isUser && (
          <div className="w-7 h-7 rounded-full bg-[#FF6A0C] flex items-center justify-center flex-shrink-0 text-black font-black text-xs shadow-md mt-0.5" title="Dozie">
            D
          </div>
        )}

        <div className="space-y-1.5 flex-1">
          {/* Main message bubble */}
          <div
            className={`px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
              isUser
                ? 'bg-[#FF6A0C] text-black font-semibold rounded-br-xs shadow-md'
                : 'bg-[#141414] border border-[#2B2B2B] text-gray-200 rounded-bl-xs shadow-md'
            }`}
          >
            {/* Format message lines */}
            <div className="whitespace-pre-line">
              {message.text}
            </div>
          </div>

          {/* Time & Sender */}
          <div className={`text-[10px] text-gray-500 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {message.timestamp}
          </div>
        </div>
      </div>

      {/* Embedded Widgets if present */}
      {message.widgetType === 'package_comparison' && (
        <div className="w-full pl-9 pr-1 mt-1">
          <PackageComparisonCard
            nights={message.widgetData?.nights}
            adults={message.widgetData?.adults}
            onSelectPackage={onSelectPackage}
          />
        </div>
      )}

      {message.widgetType === 'anpr_pass' && (
        <div className="w-full pl-9 pr-1 mt-1">
          <AnprPassCard
            initialPlate={message.widgetData?.plate}
            onActivatePlate={onActivatePlate}
          />
        </div>
      )}

      {message.widgetType === 'booking_record' && message.widgetData && (
        <div className="w-full pl-9 pr-1 mt-1">
          <BookingRecordCard
            booking={message.widgetData}
            onOpenDetails={onOpenDetails}
          />
        </div>
      )}

      {message.widgetType === 'booking_confirmed' && message.widgetData && (
        <div className="w-full pl-9 pr-1 mt-1">
          <div className="bg-[#0E2014] border border-[#49D67C] rounded-xl p-3.5 text-xs text-white space-y-2 shadow-xl">
            <div className="flex items-center gap-2 text-[#49D67C] font-extrabold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Reservation Confirmed & Saved to Database</span>
            </div>
            <p className="text-gray-300">
              Ref: <strong className="text-white font-mono">{message.widgetData.bookingReference}</strong> at {message.widgetData.hotelName} ({message.widgetData.roomTitle}).
            </p>
            {message.widgetData.anprSafePass?.vehicleReg && (
              <div className="bg-black/60 p-2 rounded border border-[#2B3B2B] text-[11px] text-[#FFDC00] font-mono font-bold tracking-wider">
                ANPR SafePass Guaranteed: {message.widgetData.anprSafePass.vehicleReg}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
