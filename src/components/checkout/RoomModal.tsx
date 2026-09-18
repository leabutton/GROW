import React, { useState, useEffect } from 'react';
import { Check, Waves, ArrowRight, ArrowLeft, ShieldCheck, Dumbbell, Coffee, Tv, Wind, CheckCircle2, Car } from 'lucide-react';
import { Hotel, ActiveBooking } from '../../types';
import { BookingRecord } from '../../types/booking';
import { mockRooms, mockAddons } from '../../data/mockRooms';
import { bookingDb } from '../../services/bookingDb';
import { Modal } from '../common/Modal';
import { AddonsSection } from './AddonsSection';
import { PriceSummary } from './PriceSummary';
import { BookingConfirmation } from './BookingConfirmation';

export interface RoomModalProps {
  hotel: Hotel | null;
  isOpen: boolean;
  onClose: () => void;
  checkIn: string;
  checkOut: string;
  nightsCount: number;
  adultsCount: number;
  childrenCount: number;
  roomsCount: number;
  isMember: boolean;
  onToggleMember: () => void;
  initialRoomId?: string;
  initialAddons?: string[];
  initialCarReg?: string;
  onBookingConfirmed?: (record: BookingRecord) => void;
}

export const RoomModal: React.FC<RoomModalProps> = ({
  hotel,
  isOpen,
  onClose,
  checkIn,
  checkOut,
  nightsCount,
  adultsCount,
  childrenCount,
  roomsCount,
  isMember,
  onToggleMember,
  initialRoomId = 'room-club',
  initialAddons,
  initialCarReg = '',
  onBookingConfirmed,
}) => {
  const [step, setStep] = useState<'rooms' | 'addons' | 'details' | 'confirmed'>('rooms');
  const [selectedRoomId, setSelectedRoomId] = useState<string>(initialRoomId);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(initialAddons || ['breakfast_buffet']);
  const [carRegistration, setCarRegistration] = useState<string>(initialCarReg);

  // Sync initial props when modal opens or props change
  useEffect(() => {
    if (isOpen) {
      if (initialRoomId) setSelectedRoomId(initialRoomId);
      if (initialAddons) setSelectedAddons(initialAddons);
      if (initialCarReg) setCarRegistration(initialCarReg);
    }
  }, [isOpen, initialRoomId, initialAddons, initialCarReg]);

  // Guest details form state
  const [guestName, setGuestName] = useState('Alex Taylor');
  const [guestEmail, setGuestEmail] = useState('alex.taylor@example.com');
  const [guestPhone, setGuestPhone] = useState('+44 7700 900077');
  const [confirmedBooking, setConfirmedBooking] = useState<ActiveBooking | null>(null);

  if (!hotel) return null;

  const currentRoom = mockRooms.find(r => r.id === selectedRoomId) || mockRooms[1];
  const totalGuests = adultsCount + childrenCount;

  const handleToggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleConfirmBooking = () => {
    const baseNightlyRate = isMember ? currentRoom.memberPricePerNight : currentRoom.pricePerNight;
    const roomSubtotal = baseNightlyRate * nightsCount * roomsCount;

    const addonsTotal = selectedAddons.reduce((sum, addonId) => {
      const addon = mockAddons.find(a => a.id === addonId);
      if (!addon) return sum;
      let cost = addon.price;
      if (addon.perPerson) cost *= totalGuests;
      if (addon.perNight) cost *= nightsCount;
      return sum + cost;
    }, 0);

    const memberSavings = isMember 
      ? (currentRoom.pricePerNight - currentRoom.memberPricePerNight) * nightsCount * roomsCount 
      : 0;

    const grandTotal = roomSubtotal + addonsTotal;
    const vatPortion = grandTotal * 0.20;

    // Save to persistent lightweight database
    const savedRecord = bookingDb.saveBooking({
      bookingReference: `VH-2026-${hotel.city.slice(0, 3).toUpperCase()}${Math.floor(100 + Math.random() * 900)}`,
      hotelId: hotel.id,
      hotelName: hotel.name,
      roomId: currentRoom.id,
      roomTitle: currentRoom.title,
      packageType: currentRoom.id === 'room-club' ? 'club_perks_bundle' : currentRoom.id === 'room-family' ? 'family_stay' : 'standard_custom',
      checkIn,
      checkOut,
      nights: nightsCount,
      adults: adultsCount,
      children: childrenCount,
      guestName,
      guestEmail,
      anprSafePass: carRegistration ? {
        vehicleReg: carRegistration,
        isWhitelisted: true,
        passIssuedAt: new Date().toISOString(),
        pcnProtectionGuarantee: true,
      } : undefined,
      selectedAddons,
      specialRequests: [
        'High floor quiet sanctuary requested',
        'Orange hanger reminder enabled (11 PM)'
      ],
      pricing: {
        roomTotal: roomSubtotal,
        addonsTotal,
        memberSavings,
        grandTotal,
        vatPortion,
      },
      status: 'confirmed',
    });

    const activeBooking: ActiveBooking = {
      bookingId: savedRecord.bookingReference,
      hotel,
      room: currentRoom,
      checkIn,
      checkOut,
      nights: nightsCount,
      adults: adultsCount,
      children: childrenCount,
      roomsCount,
      selectedAddons,
      carRegistration,
      isMember,
      guestName,
      guestEmail,
      subtotal: roomSubtotal,
      memberDiscount: memberSavings,
      addonsTotal,
      grandTotal,
    };

    setConfirmedBooking(activeBooking);
    setStep('confirmed');

    if (onBookingConfirmed) {
      onBookingConfirmed(savedRecord);
    }
  };

  const handleReset = () => {
    setStep('rooms');
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      title={
        step === 'confirmed' ? (
          'Booking Confirmation'
        ) : (
          <div className="flex items-center gap-3">
            <span className="font-sans font-black uppercase tracking-wider">{hotel.name}</span>
            <span className="text-xs px-2.5 py-0.5 bg-[#49D67C]/20 text-[#49D67C] font-bold border border-[#49D67C]/40">
              {nightsCount} {nightsCount === 1 ? 'Night' : 'Nights'}
            </span>
          </div>
        )
      }
      subtitle={
        step === 'confirmed' 
          ? 'Your reservation is confirmed and saved to our database.'
          : `${checkIn} to ${checkOut} • ${totalGuests} Guests • ${roomsCount} Room`
      }
    >
      {step === 'confirmed' && confirmedBooking ? (
        <BookingConfirmation booking={confirmedBooking} onReset={handleReset} />
      ) : (
        <div className="p-4 sm:p-6 space-y-6 bg-black text-white">
          {/* Stepper Progress */}
          <div className="flex items-center justify-between border-b border-[#222222] pb-4">
            <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setStep('rooms')}
                className={`flex items-center gap-1.5 cursor-pointer ${
                  step === 'rooms' ? 'text-[#49D67C]' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold ${
                  step === 'rooms' ? 'bg-[#49D67C] text-black' : 'bg-[#222222] text-gray-400'
                }`}>1</span>
                <span>Select Room</span>
              </button>

              <span className="text-gray-600">/</span>

              <button
                type="button"
                onClick={() => setStep('addons')}
                className={`flex items-center gap-1.5 cursor-pointer ${
                  step === 'addons' ? 'text-[#49D67C]' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold ${
                  step === 'addons' ? 'bg-[#49D67C] text-black' : 'bg-[#222222] text-gray-400'
                }`}>2</span>
                <span>Add-ons & Parking</span>
              </button>

              <span className="text-gray-600">/</span>

              <button
                type="button"
                onClick={() => setStep('details')}
                className={`flex items-center gap-1.5 cursor-pointer ${
                  step === 'details' ? 'text-[#49D67C]' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold ${
                  step === 'details' ? 'bg-[#49D67C] text-black' : 'bg-[#222222] text-gray-400'
                }`}>3</span>
                <span>Guest Details</span>
              </button>
            </div>

            {/* Member toggle reminder */}
            <div
              onClick={onToggleMember}
              className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 cursor-pointer hover:text-white"
            >
              <ShieldCheck className={`w-4 h-4 ${isMember ? 'text-[#49D67C]' : 'text-gray-500'}`} />
              <span>Booking Revolution: <strong className={isMember ? 'text-[#49D67C]' : 'text-gray-300'}>{isMember ? 'Applied (-£5/nt)' : 'Click to apply'}</strong></span>
            </div>
          </div>

          {/* STEP 1: CHOOSE ROOM */}
          {step === 'rooms' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-black uppercase font-sans text-white">Select Your Room</h4>
                <p className="text-xs text-gray-400">All rooms include power shower, flat screen TV casting, and free superfast Wi-Fi.</p>
              </div>

              <div className="space-y-4">
                {mockRooms.map((room) => {
                  const isSelected = selectedRoomId === room.id;
                  const price = isMember ? room.memberPricePerNight : room.pricePerNight;

                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoomId(room.id)}
                      className={`border p-4 sm:p-5 cursor-pointer transition-all duration-200 select-none flex flex-col md:flex-row gap-5 ${
                        isSelected
                          ? 'bg-[#111111] border-[#49D67C] shadow-lg'
                          : 'bg-[#0A0A0A] border-[#2E2E2E] hover:border-gray-400'
                      }`}
                    >
                      {/* Room Image */}
                      <div className="relative md:w-56 h-40 overflow-hidden flex-shrink-0 bg-black">
                        <img
                          src={room.image}
                          alt={room.title}
                          className="w-full h-full object-cover"
                        />
                        {room.popularTag && (
                          <div className="absolute top-2 left-2 bg-[#49D67C] text-black text-[10px] font-black uppercase tracking-wider px-2 py-0.5">
                            {room.popularTag}
                          </div>
                        )}
                        {room.includesGymPool && (
                          <div className="absolute bottom-2 left-2 bg-[#3DB5E6] text-black text-[10px] font-bold px-2 py-0.5 flex items-center gap-1">
                            <Waves className="w-3 h-3" /> Gym & Pool Included
                          </div>
                        )}
                      </div>

                      {/* Room Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <div>
                              <h5 className="text-lg font-black uppercase font-sans text-white flex items-center gap-2">
                                {room.title}
                                {isSelected && <span className="text-xs text-[#49D67C] font-semibold">✓ Selected</span>}
                              </h5>
                              <p className="text-xs text-gray-400 font-medium mt-0.5">{room.tagline}</p>
                            </div>
                            <div className="text-right">
                              <span className="block text-2xl font-black text-white">
                                £{price.toFixed(2)}
                              </span>
                              <span className="block text-[10px] text-gray-400 uppercase tracking-wider">
                                per night
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                            {room.description}
                          </p>

                          {/* Room perks */}
                          <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-gray-300">
                            {room.features.slice(0, 4).map((feat, idx) => (
                              <span key={idx} className="bg-[#181818] border border-[#2B2B2B] px-2 py-0.5 flex items-center gap-1">
                                <Check className="w-3 h-3 text-[#49D67C]" />
                                {feat}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Room Select Button */}
                        <div className="mt-4 pt-3 border-t border-[#222222] flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {room.bedType} • Max {room.maxAdults} adults
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRoomId(room.id);
                              setStep('addons');
                            }}
                            className={`px-5 py-2 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#49D67C] text-black hover:bg-white'
                                : 'bg-white text-black hover:bg-[#49D67C]'
                            }`}
                          >
                            Select & Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Nav */}
              <div className="pt-4 flex items-center justify-between border-t border-[#222222]">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-gray-400 hover:text-white uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setStep('addons')}
                  className="bg-[#49D67C] hover:bg-white text-black font-black uppercase tracking-wider px-6 py-3 text-xs flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Continue to Add-ons</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ADD-ONS & PARKING */}
          {step === 'addons' && (
            <div className="space-y-6">
              <AddonsSection
                selectedAddons={selectedAddons}
                onToggleAddon={handleToggleAddon}
                carRegistration={carRegistration}
                onChangeCarReg={setCarRegistration}
                nightsCount={nightsCount}
                guestsCount={totalGuests}
              />

              <div className="pt-4 flex items-center justify-between border-t border-[#222222]">
                <button
                  type="button"
                  onClick={() => setStep('rooms')}
                  className="border border-[#444444] text-white hover:border-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Rooms</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="bg-[#49D67C] hover:bg-white text-black font-black uppercase tracking-wider px-6 py-3 text-xs flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Continue to Guest Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: GUEST DETAILS & CONFIRMATION */}
          {step === 'details' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form columns */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h4 className="text-lg font-black uppercase font-sans text-white">Lead Guest Details</h4>
                  <p className="text-xs text-gray-400">Used for your digital booking confirmation pass and self-check-in kiosk entry.</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-[#111111] border border-[#333333] px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#49D67C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                      Email Address (for instant confirmation pass)
                    </label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full bg-[#111111] border border-[#333333] px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#49D67C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-[#111111] border border-[#333333] px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#49D67C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                      Vehicle Registration Plate (ANPR Camera Validation)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. MT22 XYZ"
                      value={carRegistration}
                      onChange={(e) => setCarRegistration(e.target.value.toUpperCase())}
                      className="w-full bg-[#111111] border border-[#333333] px-3.5 py-2.5 text-xs text-white uppercase font-mono tracking-widest focus:outline-none focus:border-[#49D67C]"
                    />
                    <span className="block text-[10px] text-gray-400 mt-1">
                      Registers your vehicle directly with the hotel camera system to avoid automated fines.
                    </span>
                  </div>
                </div>

                {/* Booking Revolution Loyalty Perk Box */}
                <div className="p-3.5 bg-[#49D67C]/10 border border-[#49D67C]/40 text-xs text-gray-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#49D67C] uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" /> Booking Revolution Perks Applied
                  </div>
                  <p className="text-[11px] text-gray-300">
                    £5.00 nightly discount deducted, free WiFi, and health club pool/gym access confirmed.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep('addons')}
                    className="border border-[#444444] text-white hover:border-white px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Add-ons</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirmBooking}
                    className="bg-[#49D67C] hover:bg-white text-black font-extrabold uppercase tracking-wider px-8 py-3.5 text-xs cursor-pointer shadow-lg transition-colors"
                  >
                    COMPLETE BOOKING
                  </button>
                </div>
              </div>

              {/* Price summary sidebar */}
              <div className="lg:col-span-5">
                <PriceSummary
                  room={currentRoom}
                  nightsCount={nightsCount}
                  roomsCount={roomsCount}
                  guestsCount={totalGuests}
                  selectedAddons={selectedAddons}
                  isMember={isMember}
                  carRegistration={carRegistration}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};
