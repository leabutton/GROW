import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { DestinationDropdown } from './DestinationDropdown';
import { DatePickerModal } from './DatePickerModal';
import { GuestPicker } from './GuestPicker';
import { BookingSearchParams, Hotel } from '../../types';

export interface BookingMaskProps {
  searchParams: BookingSearchParams;
  onUpdateParams: (newParams: Partial<BookingSearchParams>) => void;
  onSearch: () => void;
  onHotelDirectSelect?: (hotel: Hotel) => void;
}

export const BookingMask: React.FC<BookingMaskProps> = ({
  searchParams,
  onUpdateParams,
  onSearch,
  onHotelDirectSelect,
}) => {
  const [activeTab, setActiveTab] = useState<'room' | 'table' | 'meeting'>('room');

  const tabs = [
    { id: 'room', label: 'Book A Room' },
    { id: 'table', label: 'Book a Table' },
    { id: 'meeting', label: 'Book A Meeting' },
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
      {/* Container matching .group-bookingmask-v2 */}
      <div className="bg-[#000000] border border-white/90 shadow-2xl">
        {/* Tabs Row */}
        <div className="flex items-center border-b border-[#2B2B2B] overflow-x-auto bg-[#000000]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as 'room' | 'table' | 'meeting')}
                className={`px-6 sm:px-8 py-3.5 text-xs sm:text-[13px] font-bold tracking-[1.3px] uppercase transition-all whitespace-nowrap cursor-pointer relative ${
                  isActive
                    ? 'bg-[#151515] text-[#49D67C] border-b-2 border-[#49D67C]'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Inputs Row */}
        {activeTab === 'room' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-0 items-stretch divide-y lg:divide-y-0 lg:divide-x divide-[#222222]">
            {/* Field 1: Destination (Cols: 4) */}
            <div className="lg:col-span-4 p-2 sm:p-3 flex items-center">
              <DestinationDropdown
                selectedDestination={searchParams.destination}
                onSelect={(destination, hotel) => {
                  onUpdateParams({ destination });
                  if (hotel && onHotelDirectSelect) {
                    onHotelDirectSelect(hotel);
                  }
                }}
              />
            </div>

            {/* Field 2: Dates (Cols: 3) */}
            <div className="lg:col-span-3 p-2 sm:p-3 flex items-center">
              <DatePickerModal
                checkIn={searchParams.checkIn}
                checkOut={searchParams.checkOut}
                onChange={({ checkIn, checkOut }) => {
                  onUpdateParams({ checkIn, checkOut });
                }}
              />
            </div>

            {/* Field 3: Rooms & Guests (Cols: 3) */}
            <div className="lg:col-span-3 p-2 sm:p-3 flex items-center">
              <GuestPicker
                adults={searchParams.adults}
                children={searchParams.children}
                rooms={searchParams.rooms}
                onChange={(counts) => {
                  onUpdateParams(counts);
                }}
              />
            </div>

            {/* Field 4: Action Button (Cols: 2) */}
            <div className="lg:col-span-2 p-2 sm:p-3 flex items-center justify-center">
              <button
                type="button"
                onClick={onSearch}
                className="w-full h-full min-h-[50px] bg-[#49D67C] hover:bg-white text-black font-extrabold text-sm tracking-[1.4px] uppercase px-6 py-3.5 transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#49D67C] hover:border-white shadow-md active:scale-[0.99]"
              >
                <Search className="w-4 h-4 text-black stroke-[3]" />
                <span>SEARCH</span>
              </button>
            </div>
          </div>
        ) : activeTab === 'table' ? (
          <div className="p-6 text-center space-y-3 bg-[#0A0A0A]">
            <h3 className="text-base font-bold uppercase tracking-wider text-white">
              Book A Table at The Pub & Grill
            </h3>
            <p className="text-xs text-gray-400 max-w-lg mx-auto">
              Delicious craft burgers, sizzling wings, live sports on massive screens, and refreshing draught beers.
            </p>
            <div className="max-w-md mx-auto pt-2">
              <DestinationDropdown
                selectedDestination={searchParams.destination}
                onSelect={(destination, hotel) => {
                  onUpdateParams({ destination });
                  if (hotel && onHotelDirectSelect) {
                    onHotelDirectSelect(hotel);
                  }
                }}
              />
            </div>
          </div>
        ) : (
          <div className="p-6 text-center space-y-3 bg-[#0A0A0A]">
            <h3 className="text-base font-bold uppercase tracking-wider text-white">
              Book A Meeting Room or VWorks Space
            </h3>
            <p className="text-xs text-gray-400 max-w-lg mx-auto">
              Dedicated boardrooms, conference halls, superfast WiFi, and unlimited bean-to-cup coffee.
            </p>
            <div className="max-w-md mx-auto pt-2">
              <DestinationDropdown
                selectedDestination={searchParams.destination}
                onSelect={(destination, hotel) => {
                  onUpdateParams({ destination });
                  if (hotel && onHotelDirectSelect) {
                    onHotelDirectSelect(hotel);
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
