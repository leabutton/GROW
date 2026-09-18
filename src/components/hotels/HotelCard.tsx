import React from 'react';
import { Waves, Dumbbell, Utensils, Coffee, Car, ExternalLink } from 'lucide-react';
import { Hotel } from '../../types';

export interface HotelCardProps {
  hotel: Hotel;
  isMember: boolean;
  nightsCount: number;
  onSelectRooms: (hotel: Hotel) => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  isMember,
  nightsCount,
  onSelectRooms,
}) => {
  const displayPrice = isMember ? hotel.memberPrice : hotel.basePrice;

  return (
    <div className="one-hotel bg-black border border-white relative flex flex-col justify-between transition-all duration-300 hover:shadow-2xl group">
      {/* 1. Lead Rate Offset Badge - signature Village Hotels visual anchor */}
      <div className="absolute -top-6 left-5 sm:left-7 z-20 bg-black border border-white/60 px-4 py-2 shadow-lg">
        <span className="block text-[10px] font-bold tracking-[1.5px] uppercase text-gray-300">
          {isMember ? 'MEMBER RATE' : 'FROM'}
        </span>
        <span className="block text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none mt-0.5">
          £{displayPrice.toFixed(2)}
        </span>
      </div>

      {/* Top Container: Image */}
      <div>
        <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-[#111111]">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          {/* Region Tag Top-Right */}
          <div className="absolute top-3 right-3 bg-black/80 border border-white/30 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            {hotel.region}
          </div>
        </div>

        {/* Info Inner Container */}
        <div className="p-6 sm:p-7 space-y-4">
          {/* Hotel Title */}
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight uppercase font-sans group-hover:text-[#49D67C] transition-colors">
              {hotel.name}
            </h3>
            {/* Address */}
            <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
              {hotel.address}
            </p>
          </div>

          {/* Directions & Links Row */}
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider pt-1">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name + ' ' + hotel.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline hover:text-[#49D67C] transition-colors flex items-center gap-1"
            >
              <span>GET DIRECTIONS</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-gray-600">•</span>
            <button
              type="button"
              onClick={() => onSelectRooms(hotel)}
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              View Hotel Details
            </button>
          </div>

          {/* Core Amenities Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-gray-300">
            {hotel.amenities.pool && (
              <span className="bg-[#111111] px-2 py-1 border border-[#2D2D2D] flex items-center gap-1">
                <Waves className="w-3 h-3 text-[#3DB5E6]" /> Heated Pool
              </span>
            )}
            {hotel.amenities.gym && (
              <span className="bg-[#111111] px-2 py-1 border border-[#2D2D2D] flex items-center gap-1">
                <Dumbbell className="w-3 h-3 text-[#A8E000]" /> Village Gym
              </span>
            )}
            {hotel.amenities.pubAndGrill && (
              <span className="bg-[#111111] px-2 py-1 border border-[#2D2D2D] flex items-center gap-1">
                <Utensils className="w-3 h-3 text-[#F5A623]" /> Pub & Grill
              </span>
            )}
            {hotel.amenities.starbucks && (
              <span className="bg-[#111111] px-2 py-1 border border-[#2D2D2D] flex items-center gap-1">
                <Coffee className="w-3 h-3 text-[#49D67C]" /> Starbucks
              </span>
            )}
          </div>

          {/* ANPR Parking & Guest Notice Callout */}
          <div className="bg-[#111111] border border-[#262626] p-2.5 text-[11px] text-gray-400 flex items-start gap-2">
            <Car className="w-3.5 h-3.5 text-[#FF6A0C] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-gray-300">ANPR Parking: </span>
              {hotel.complaintMitigationTips}
            </div>
          </div>
        </div>
      </div>

      {/* Card Actions Bottom Row */}
      <div className="px-6 sm:px-7 pb-6 pt-2 border-t border-[#1C1C1C] flex flex-wrap sm:flex-nowrap items-center gap-3">
        {/* BOOK NOW Button - Primary Action */}
        <button
          type="button"
          onClick={() => onSelectRooms(hotel)}
          className="w-full sm:flex-1 bg-[#49D67C] hover:bg-white text-black font-extrabold text-xs sm:text-[13px] tracking-[1.4px] uppercase py-3.5 px-4 text-center border border-[#49D67C] hover:border-white transition-all cursor-pointer shadow-md"
        >
          BOOK NOW
        </button>

        {/* BOOK MEETING Button - Secondary Action */}
        <button
          type="button"
          onClick={() => onSelectRooms(hotel)}
          className="w-full sm:w-auto bg-white hover:bg-[#49D67C] text-black font-extrabold text-xs sm:text-[13px] tracking-[1.4px] uppercase py-3.5 px-5 text-center border border-white hover:border-[#49D67C] transition-all cursor-pointer"
        >
          BOOK MEETING
        </button>
      </div>
    </div>
  );
};
