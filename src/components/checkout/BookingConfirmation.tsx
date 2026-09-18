import React from 'react';
import { CheckCircle2, QrCode, MapPin, Car, Waves, Sparkles, Printer, ArrowRight } from 'lucide-react';
import { ActiveBooking } from '../../types';
import { Button } from '../common/Button';

export interface BookingConfirmationProps {
  booking: ActiveBooking;
  onReset: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  booking,
  onReset,
}) => {
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6 animate-in zoom-in-95 duration-200">
      {/* Success Badge */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-full bg-[#49D67C]/20 border border-[#49D67C]/50 flex items-center justify-center mx-auto text-[#49D67C]">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold font-sans text-white">
          You're Booked In!
        </h3>
        <p className="text-sm text-gray-300">
          Confirmation sent to <strong className="text-white">{booking.guestEmail}</strong>
        </p>
      </div>

      {/* The Digital Pass Card */}
      <div className="bg-[#1C1C1C] border border-[#333333] rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Pass Top Ribbon */}
        <div className="bg-[#FF6A0C] px-6 py-3 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="font-sans font-black tracking-widest text-sm">VILLAGE HOTEL CLUB</span>
            <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded font-bold uppercase">Pass</span>
          </div>
          <span className="font-mono font-bold text-xs">
            REF: {booking.bookingId}
          </span>
        </div>

        {/* Pass Details */}
        <div className="p-6 space-y-6">
          {/* Hotel & Room Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-5">
            <div>
              <h4 className="text-xl font-bold font-sans text-white">{booking.hotel.name}</h4>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#FF6A0C]" /> {booking.hotel.address}
              </p>
              <div className="mt-2 inline-block px-2.5 py-1 rounded bg-[#2A2A2A] text-xs font-semibold text-white">
                {booking.room.title}
              </div>
            </div>

            {/* QR Mockup for Kiosk Check-In */}
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white text-black text-center flex-shrink-0">
              <QrCode className="w-20 h-20" />
              <span className="text-[9px] font-mono font-bold mt-1 tracking-wider uppercase">Scan at Kiosk</span>
            </div>
          </div>

          {/* Dates & Times */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs border-b border-[#2A2A2A] pb-5">
            <div>
              <span className="text-gray-400 block mb-1">Check-in</span>
              <span className="font-bold text-white text-sm block">{booking.checkIn}</span>
              <span className="text-gray-400">From 3:00 PM</span>
            </div>
            <div>
              <span className="text-gray-400 block mb-1">Check-out</span>
              <span className="font-bold text-white text-sm block">{booking.checkOut}</span>
              <span className="text-gray-400">By 11:00 AM</span>
            </div>
            <div>
              <span className="text-gray-400 block mb-1">Guests</span>
              <span className="font-bold text-white text-sm block">
                {booking.adults + booking.children} Persons
              </span>
              <span className="text-gray-400">{booking.roomsCount} Room</span>
            </div>
            <div>
              <span className="text-gray-400 block mb-1">Total Paid</span>
              <span className="font-bold text-[#49D67C] text-sm block">
                £{booking.grandTotal.toFixed(2)}
              </span>
              <span className="text-gray-400">VAT Included</span>
            </div>
          </div>

          {/* Special Inclusions & Friction Mitigations */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400">Your Included Perks & Notes</h5>

            {booking.room.includesGymPool && (
              <div className="flex items-center gap-2.5 text-xs text-gray-300 bg-[#3DB5E6]/10 p-2.5 rounded-lg border border-[#3DB5E6]/30">
                <Waves className="w-4 h-4 text-[#3DB5E6] flex-shrink-0" />
                <span>
                  <strong>Full Leisure Club Access Included:</strong> Enjoy the heated swimming pool, steam room, and state-of-the-art TechnoGym.
                </span>
              </div>
            )}

            {booking.carRegistration ? (
              <div className="flex items-center gap-2.5 text-xs text-gray-300 bg-[#49D67C]/10 p-2.5 rounded-lg border border-[#49D67C]/30">
                <Car className="w-4 h-4 text-[#49D67C] flex-shrink-0" />
                <span>
                  <strong>ANPR Parking Active:</strong> Vehicle plate <span className="font-mono font-bold text-white px-1.5 py-0.5 bg-black/40 rounded">{booking.carRegistration}</span> is pre-cleared for the entire stay.
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2.5 text-xs text-gray-300 bg-[#242424] p-2.5 rounded-lg border border-[#333333]">
                <Car className="w-4 h-4 text-[#FF6A0C] flex-shrink-0" />
                <span>
                  <strong>Driving?</strong> Don't forget to enter your car registration at the lobby terminal upon arrival to validate parking.
                </span>
              </div>
            )}

            <div className="flex items-center gap-2.5 text-xs text-gray-300 bg-[#FF6A0C]/10 p-2.5 rounded-lg border border-[#FF6A0C]/30">
              <Sparkles className="w-4 h-4 text-[#FF6A0C] flex-shrink-0" />
              <span>
                <strong>The Orange Door Hanger:</strong> Need fresh towels and a room spruce? Hang your orange door tag out by 11 PM and we're on it!
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#141414] px-6 py-4 border-t border-[#2A2A2A] flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
          >
            <Printer className="w-4 h-4" /> Print Booking Pass
          </button>

          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={onReset}
          >
            Explore More Hotels
          </Button>
        </div>
      </div>
    </div>
  );
};
