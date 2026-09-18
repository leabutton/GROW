import React, { useState, useRef, useEffect } from 'react';
import { Users, Plus, Minus, Check } from 'lucide-react';

export interface GuestPickerProps {
  adults: number;
  children: number;
  rooms: number;
  onChange: (counts: { adults: number; children: number; rooms: number }) => void;
}

export const GuestPicker: React.FC<GuestPickerProps> = ({
  adults,
  children,
  rooms,
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

  const updateCount = (key: 'adults' | 'children' | 'rooms', delta: number) => {
    const current = { adults, children, rooms };
    let newVal = current[key] + delta;

    if (key === 'adults') newVal = Math.max(1, Math.min(8, newVal));
    if (key === 'children') newVal = Math.max(0, Math.min(6, newVal));
    if (key === 'rooms') newVal = Math.max(1, Math.min(4, newVal));

    onChange({
      ...current,
      [key]: newVal,
    });
  };

  const totalGuests = adults + children;

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
            Rooms & Guests
          </span>
          <span className="block text-sm font-semibold text-white truncate mt-0.5">
            {rooms} {rooms === 1 ? 'Room' : 'Rooms'}, {adults} {adults === 1 ? 'Adult' : 'Adults'}
            {children > 0 ? `, ${children} ${children === 1 ? 'Child' : 'Children'}` : ''}
          </span>
          <span className="block text-[10px] text-gray-400 font-medium tracking-wide truncate">
            Max 4 guests per room
          </span>
        </div>
        <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
      </button>

      {/* Guest Picker Window */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 md:min-w-[320px] mt-1 z-50 bg-[#000000] border border-white shadow-2xl p-4 animate-in fade-in duration-150">
          <div className="text-xs font-bold uppercase tracking-[1.2px] text-white border-b border-[#222222] pb-3 mb-3">
            Rooms & Guests
          </div>

          <div className="space-y-4">
            {/* Rooms */}
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-white uppercase tracking-wider">Rooms</span>
                <span className="block text-[10px] text-gray-400">Max 4 rooms per booking</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateCount('rooms', -1)}
                  disabled={rooms <= 1}
                  className="w-7 h-7 flex items-center justify-center border border-[#444444] text-white hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-4 text-center text-sm font-bold text-white">{rooms}</span>
                <button
                  type="button"
                  onClick={() => updateCount('rooms', 1)}
                  disabled={rooms >= 4}
                  className="w-7 h-7 flex items-center justify-center border border-[#444444] text-white hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Adults */}
            <div className="flex items-center justify-between border-t border-[#1F1F1F] pt-3">
              <div>
                <span className="block text-xs font-bold text-white uppercase tracking-wider">Adults</span>
                <span className="block text-[10px] text-gray-400">Ages 18+</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateCount('adults', -1)}
                  disabled={adults <= 1}
                  className="w-7 h-7 flex items-center justify-center border border-[#444444] text-white hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-4 text-center text-sm font-bold text-white">{adults}</span>
                <button
                  type="button"
                  onClick={() => updateCount('adults', 1)}
                  disabled={adults >= 8}
                  className="w-7 h-7 flex items-center justify-center border border-[#444444] text-white hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between border-t border-[#1F1F1F] pt-3">
              <div>
                <span className="block text-xs font-bold text-white uppercase tracking-wider">Children</span>
                <span className="block text-[10px] text-gray-400">Ages 0 - 17</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateCount('children', -1)}
                  disabled={children <= 0}
                  className="w-7 h-7 flex items-center justify-center border border-[#444444] text-white hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-4 text-center text-sm font-bold text-white">{children}</span>
                <button
                  type="button"
                  onClick={() => updateCount('children', 1)}
                  disabled={children >= 6}
                  className="w-7 h-7 flex items-center justify-center border border-[#444444] text-white hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full mt-4 bg-[#49D67C] text-black font-extrabold uppercase tracking-wider py-2 text-xs hover:bg-white transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};
