import React from 'react';
import { BookingRecord } from '../../types/booking';
import { Calendar, MapPin, ShieldCheck, Car, CheckCircle2, User } from 'lucide-react';

export interface BookingRecordCardProps {
  booking: BookingRecord;
  onOpenDetails?: () => void;
}

export const BookingRecordCard: React.FC<BookingRecordCardProps> = ({
  booking,
  onOpenDetails,
}) => {
  return (
    <div className="bg-[#0C0C0C] border border-[#2E2E2E] rounded-xl p-4 my-2 text-white shadow-xl space-y-3.5">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[#222222] pb-2.5">
        <div>
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Reservation Reference</span>
          <span className="font-mono text-sm font-extrabold text-[#FF6A0C] tracking-wider">
            {booking.bookingReference}
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#49D67C]/15 border border-[#49D67C]/40 text-[#49D67C] flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          <span>{booking.status.replace('_', ' ')}</span>
        </span>
      </div>

      {/* Hotel & Room */}
      <div className="space-y-1">
        <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5 uppercase font-sans">
          <MapPin className="w-3.5 h-3.5 text-[#FF6A0C] flex-shrink-0" />
          <span>{booking.hotelName}</span>
        </h4>
        <p className="text-xs text-gray-300 pl-5">
          {booking.roomTitle} • {booking.packageType === 'club_perks_bundle' ? 'Club Perks VIP Bundle' : 'Custom Stay'}
        </p>
      </div>

      {/* Dates & Guests */}
      <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#141414] p-2.5 rounded border border-[#242424]">
        <div>
          <span className="text-gray-400 block text-[10px] uppercase">Dates</span>
          <span className="font-semibold text-white">
            {booking.checkIn} → {booking.checkOut} ({booking.nights} {booking.nights === 1 ? 'night' : 'nights'})
          </span>
        </div>
        <div>
          <span className="text-gray-400 block text-[10px] uppercase">Guest</span>
          <span className="font-semibold text-white truncate block">
            {booking.guestName}
          </span>
        </div>
      </div>

      {/* ANPR SafePass status badge */}
      {booking.anprSafePass ? (
        <div className="bg-[#0D1D12] border border-[#49D67C]/40 p-2.5 rounded flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-[#49D67C]" />
            <div>
              <span className="text-[10px] text-gray-300 block">ANPR SafePass Whitelisted:</span>
              <span className="font-mono font-bold tracking-widest text-[#FFDC00]">
                {booking.anprSafePass.vehicleReg}
              </span>
            </div>
          </div>
          <span className="text-[10px] text-[#49D67C] font-bold bg-[#49D67C]/15 px-2 py-0.5 rounded flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Zero-Fine Protected
          </span>
        </div>
      ) : (
        <div className="bg-[#1C1C1C] border border-[#2E2E2E] p-2 rounded text-[11px] text-gray-400">
          No vehicle registered. Add plate before arrival to ensure parking clearance.
        </div>
      )}

      {/* Special requests & pricing */}
      <div className="flex items-center justify-between pt-1 border-t border-[#222222] text-xs">
        <span className="text-gray-400 text-[11px]">Total Paid:</span>
        <span className="text-sm font-extrabold text-white font-sans">
          £{booking.pricing.grandTotal.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
