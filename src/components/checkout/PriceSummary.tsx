import React from 'react';
import { ShieldCheck, Tag, Info, Car } from 'lucide-react';
import { Room } from '../../types';
import { mockAddons } from '../../data/mockRooms';

export interface PriceSummaryProps {
  room: Room;
  nightsCount: number;
  roomsCount: number;
  guestsCount: number;
  selectedAddons: string[];
  isMember: boolean;
  carRegistration?: string;
}

export const PriceSummary: React.FC<PriceSummaryProps> = ({
  room,
  nightsCount,
  roomsCount,
  guestsCount,
  selectedAddons,
  isMember,
  carRegistration,
}) => {
  const baseNightlyRate = isMember ? room.memberPricePerNight : room.pricePerNight;
  const roomTotal = baseNightlyRate * nightsCount * roomsCount;

  // Addons calculation
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const addon = mockAddons.find(a => a.id === addonId);
    if (!addon) return sum;
    let cost = addon.price;
    if (addon.perPerson) cost *= guestsCount;
    if (addon.perNight) cost *= nightsCount;
    return sum + cost;
  }, 0);

  const memberSavingsPerNight = room.pricePerNight - room.memberPricePerNight;
  const totalMemberSavings = isMember ? memberSavingsPerNight * nightsCount * roomsCount : 0;

  const grandTotal = roomTotal + addonsTotal;
  const vatPortion = grandTotal * 0.20; // 20% UK VAT included

  return (
    <div className="bg-[#141414] border border-[#2B2B2B] rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-[#222222] pb-3">
        <h4 className="text-sm font-black uppercase tracking-wider text-white font-sans">Price Breakdown</h4>
        <span className="text-xs text-gray-400">All prices in GBP (£)</span>
      </div>

      <div className="space-y-2 text-xs">
        {/* Room calculation */}
        <div className="flex justify-between text-gray-300">
          <span>
            {room.title} ({nightsCount} {nightsCount === 1 ? 'night' : 'nights'} × {roomsCount} {roomsCount === 1 ? 'room' : 'rooms'})
          </span>
          <span className="font-semibold text-white">£{roomTotal.toFixed(2)}</span>
        </div>

        {/* Member Discount Line */}
        {isMember && totalMemberSavings > 0 && (
          <div className="flex justify-between text-[#49D67C] font-semibold bg-[#49D67C]/10 px-2.5 py-1 rounded border border-[#49D67C]/30">
            <span className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> Booking Revolution Member Rate (-£5/nt)
            </span>
            <span>-£{totalMemberSavings.toFixed(2)}</span>
          </div>
        )}

        {/* Selected Addons */}
        {selectedAddons.length > 0 && (
          <div className="pt-2 border-t border-[#222222] space-y-1.5">
            {selectedAddons.map((addonId) => {
              const addon = mockAddons.find(a => a.id === addonId);
              if (!addon) return null;
              let cost = addon.price;
              if (addon.perPerson) cost *= guestsCount;
              if (addon.perNight) cost *= nightsCount;
              return (
                <div key={addon.id} className="flex justify-between text-gray-400">
                  <span>+ {addon.title}</span>
                  <span className="text-white font-medium">£{cost.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Taxes */}
        <div className="flex justify-between text-gray-400 pt-2 border-t border-[#222222]">
          <span className="flex items-center gap-1">
            <Info className="w-3 h-3 text-gray-400" /> UK VAT (20% included)
          </span>
          <span>£{vatPortion.toFixed(2)}</span>
        </div>
      </div>

      {/* ANPR SafePass Guaranteed Pill */}
      {carRegistration && (
        <div className="bg-[#0E2014] border border-[#49D67C]/50 rounded-lg p-3 text-xs text-[#49D67C] flex items-center justify-between shadow-inner">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-[#49D67C]" />
            <div>
              <span className="block text-[10px] text-gray-300">ANPR SafePass Guaranteed</span>
              <span className="font-mono font-bold tracking-widest text-[#FFDC00]">{carRegistration}</span>
            </div>
          </div>
          <span className="text-[10px] bg-[#49D67C]/20 border border-[#49D67C]/40 px-2 py-0.5 rounded font-bold uppercase">
            Whitelisted
          </span>
        </div>
      )}

      {/* Total Due */}
      <div className="pt-3 border-t border-[#2B2B2B] flex items-baseline justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Total Payable Now</span>
          <span className="text-[11px] text-gray-400">Free cancellation up to 48h before check-in</span>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black font-sans text-white">
            £{grandTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Booking Revolution Guarantee */}
      <div className="bg-[#1C1C1C] rounded-lg p-3 text-[11px] text-gray-300 flex items-center gap-2 border border-[#2B2B2B]">
        <ShieldCheck className="w-4 h-4 text-[#49D67C] flex-shrink-0" />
        <span>Direct Booking Guarantee: Best rates, free Wi-Fi & zero booking fees.</span>
      </div>
    </div>
  );
};
