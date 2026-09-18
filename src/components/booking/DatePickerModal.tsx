import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Moon, Sparkles } from 'lucide-react';

export interface DatePickerModalProps {
  checkIn: string;
  checkOut: string;
  onChange: (dates: { checkIn: string; checkOut: string; nights: number }) => void;
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  checkIn,
  checkOut,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDateFriendly = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const calculateNights = (inDate: string, outDate: string) => {
    const d1 = new Date(inDate);
    const d2 = new Date(outDate);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const currentNights = calculateNights(checkIn, checkOut);

  const setQuickDates = (nightsCount: number, offsetDays = 0) => {
    const today = new Date();
    const inDate = new Date(today);
    inDate.setDate(today.getDate() + offsetDays);

    const outDate = new Date(inDate);
    outDate.setDate(inDate.getDate() + nightsCount);

    const checkInStr = inDate.toISOString().split('T')[0];
    const checkOutStr = outDate.toISOString().split('T')[0];

    onChange({
      checkIn: checkInStr,
      checkOut: checkOutStr,
      nights: nightsCount,
    });
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger matching live site booking mask */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 py-3 bg-[#0A0A0A] hover:bg-[#151515] border border-[#333333] hover:border-white transition-colors flex items-center justify-between cursor-pointer"
      >
        <div className="overflow-hidden pr-2">
          <span className="block text-[11px] font-bold uppercase tracking-[1.1px] text-gray-400">
            Arrival & Departure
          </span>
          <span className="block text-sm font-semibold text-white truncate mt-0.5">
            {formatDateFriendly(checkIn)} – {formatDateFriendly(checkOut)} ({currentNights}nt)
          </span>
          <span className="block text-[10px] text-[#49D67C] font-medium tracking-wide truncate">
            Become a member to get the discounts
          </span>
        </div>
        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
      </button>

      {/* Date Picker Dropdown Window */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 md:min-w-[340px] mt-1 z-50 bg-[#000000] border border-white shadow-2xl p-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-[#222222] pb-3 mb-3">
            <div className="text-xs font-bold uppercase tracking-[1.2px] text-white">Select Stay Dates</div>
            <div className="text-xs text-[#49D67C] font-bold">{currentNights} {currentNights === 1 ? 'Night' : 'Nights'}</div>
          </div>

          {/* Quick presets */}
          <div className="grid grid-cols-3 gap-1.5 mb-4">
            <button
              type="button"
              onClick={() => setQuickDates(1, 0)}
              className="px-2 py-1.5 bg-[#151515] hover:bg-white hover:text-black text-[11px] font-semibold text-gray-300 border border-[#333333] transition-colors cursor-pointer"
            >
              Tonight (1nt)
            </button>
            <button
              type="button"
              onClick={() => setQuickDates(1, 1)}
              className="px-2 py-1.5 bg-[#151515] hover:bg-white hover:text-black text-[11px] font-semibold text-gray-300 border border-[#333333] transition-colors cursor-pointer"
            >
              Tomorrow (1nt)
            </button>
            <button
              type="button"
              onClick={() => setQuickDates(2, 4)}
              className="px-2 py-1.5 bg-[#151515] hover:bg-white hover:text-black text-[11px] font-semibold text-gray-300 border border-[#333333] transition-colors cursor-pointer"
            >
              Weekend (2nt)
            </button>
          </div>

          {/* Custom Date Inputs */}
          <div className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Check-in Date
              </label>
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => {
                  const newIn = e.target.value;
                  const newNights = calculateNights(newIn, checkOut);
                  onChange({ checkIn: newIn, checkOut, nights: newNights });
                }}
                className="w-full bg-[#111111] border border-[#333333] text-white text-xs px-3 py-2 focus:outline-none focus:border-[#49D67C]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Check-out Date
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => {
                  const newOut = e.target.value;
                  const newNights = calculateNights(checkIn, newOut);
                  onChange({ checkIn, checkOut: newOut, nights: newNights });
                }}
                className="w-full bg-[#111111] border border-[#333333] text-white text-xs px-3 py-2 focus:outline-none focus:border-[#49D67C]"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full mt-4 bg-[#49D67C] text-black font-extrabold uppercase tracking-wider py-2 text-xs hover:bg-white transition-colors cursor-pointer"
          >
            Apply Dates
          </button>
        </div>
      )}
    </div>
  );
};
