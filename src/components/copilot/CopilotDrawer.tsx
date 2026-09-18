import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, RotateCcw, Car, Waves, ShieldCheck, Dumbbell, MapPin, ArrowRight } from 'lucide-react';
import { CopilotChatMessage, BookingRecord } from '../../types/booking';
import { CopilotMessage } from './CopilotMessage';
import { villageHotels } from '../../data/locations';
import { bookingDb } from '../../services/bookingDb';
import { BookingSearchParams, Hotel } from '../../types';

export interface CopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySearchParams: (params: Partial<BookingSearchParams>) => void;
  onSelectHotel: (hotel: Hotel) => void;
  onSelectRoomPackage: (roomId: string, addons: string[], vehicleReg?: string) => void;
  onOpenBookingModal?: () => void;
}

export const CopilotDrawer: React.FC<CopilotDrawerProps> = ({
  isOpen,
  onClose,
  onApplySearchParams,
  onSelectHotel,
  onSelectRoomPackage,
  onOpenBookingModal,
}) => {
  const [messages, setMessages] = useState<CopilotChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [capturedPlate, setCapturedPlate] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialWelcomeMessage: CopilotChatMessage = {
    id: 'msg-welcome',
    sender: 'assistant',
    text: "Welcome to Village Hotel Club! I'm Dozie, your AI Booking Assistant. Everything you need is under one roof—from high-energy Technogym workouts and heated 25m pools to delicious Pub & Grill dining and zero-hassle ANPR parking.\n\nHow can I help plan your stay today? Pick a quick journey below or tell me your plans in plain English:",
    timestamp: 'Just now',
  };

  const quickChips = [
    {
      id: 'chip-mcr',
      label: 'Weekend gym & relax trip to Manchester for 2, driving a car',
      icon: <Dumbbell className="w-3.5 h-3.5 text-[#FF6A0C]" />,
    },
    {
      id: 'chip-edi',
      label: 'Family getaway to Edinburgh with pool splash time',
      icon: <Waves className="w-3.5 h-3.5 text-[#3DB5E6]" />,
    },
    {
      id: 'chip-bristol',
      label: 'Solo business night in Bristol with parking & early workout',
      icon: <Car className="w-3.5 h-3.5 text-[#49D67C]" />,
    },
    {
      id: 'chip-status',
      label: 'Check my existing booking & parking pass',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-[#F5A623]" />,
    },
  ];

  // Initialize welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([initialWelcomeMessage]);
    }
  }, []);

  // Listen for newly confirmed bookings from modal
  useEffect(() => {
    const handleBookingCreated = (e: any) => {
      const record = e.detail as BookingRecord;
      if (record) {
        const confirmMsg: CopilotChatMessage = {
          id: `msg-confirm-${Date.now()}`,
          sender: 'assistant',
          text: `Awesome news, ${record.guestName}! Your stay at ${record.hotelName} is locked in. We've registered your booking and verified your ANPR SafePass.`,
          timestamp: 'Just now',
          widgetType: 'booking_confirmed',
          widgetData: record,
        };
        setMessages(prev => [...prev, confirmMsg]);
      }
    };

    window.addEventListener('vh-booking-created', handleBookingCreated);
    return () => window.removeEventListener('vh-booking-created', handleBookingCreated);
  }, []);

  // Scroll to bottom on message update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleResetChat = () => {
    setMessages([initialWelcomeMessage]);
    setCapturedPlate('');
  };

  const triggerAssistantResponse = (
    responseText: string,
    widgetType?: 'package_comparison' | 'anpr_pass' | 'booking_record' | 'booking_confirmed',
    widgetData?: any,
    extraFollowup?: { text: string; widgetType?: any; widgetData?: any }
  ) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const newMsg: CopilotChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: 'Just now',
        widgetType,
        widgetData,
      };

      setMessages(prev => [...prev, newMsg]);

      // If there is an extra followup (e.g. prompt for ANPR plate right after comparison)
      if (extraFollowup) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const followMsg: CopilotChatMessage = {
            id: `msg-${Date.now() + 1}`,
            sender: 'assistant',
            text: extraFollowup.text,
            timestamp: 'Just now',
            widgetType: extraFollowup.widgetType,
            widgetData: extraFollowup.widgetData,
          };
          setMessages(prev => [...prev, followMsg]);
        }, 600);
      }
    }, 600);
  };

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim()) return;

    // Add user message
    const userMsg: CopilotChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: 'Just now',
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    const lower = promptText.toLowerCase();

    // 1. Existing Booking Lookup
    if (lower.includes('existing') || lower.includes('check my booking') || lower.includes('parking pass') || lower.includes('status')) {
      const bookings = bookingDb.getBookings();
      if (bookings.length > 0) {
        const topBooking = bookings[0];
        triggerAssistantResponse(
          `I found your active reservation in our booking records! Here are your stay details, status, and ANPR SafePass verification:`,
          'booking_record',
          topBooking
        );
      } else {
        triggerAssistantResponse(
          "I couldn't locate an active booking under this session yet. Would you like me to help find a room in Manchester, Edinburgh, or Bristol?",
          undefined,
          undefined
        );
      }
      return;
    }

    // 2. Manchester Trip Prompt
    if (lower.includes('manchester')) {
      const mcrHotel = villageHotels.find(h => h.name.toLowerCase().includes('manchester bury')) || 
                       villageHotels.find(h => h.name.toLowerCase().includes('manchester')) || 
                       villageHotels[0];

      onApplySearchParams({
        destination: mcrHotel.name,
        adults: 2,
        children: 0,
        rooms: 1,
      });
      onSelectHotel(mcrHotel);

      triggerAssistantResponse(
        `Great shout! ${mcrHotel.name} has our premier 25m heated pool, full Technogym floor, and a lively Pub & Grill showing live Premier League matches.\n\nLet's compare your room options to make sure you get the best value with no surprise fees on arrival:`,
        'package_comparison',
        { nights: 2, adults: 2 },
        {
          text: "Are you driving to Manchester? Enter your car registration plate below so we can activate your ANPR SafePass and guarantee zero parking fines:",
          widgetType: 'anpr_pass',
          widgetData: { plate: capturedPlate }
        }
      );
      return;
    }

    // 3. Edinburgh Family Trip Prompt
    if (lower.includes('edinburgh') || lower.includes('family')) {
      const ediHotel = villageHotels.find(h => h.name.toLowerCase().includes('edinburgh')) || villageHotels[0];

      onApplySearchParams({
        destination: ediHotel.name,
        adults: 2,
        children: 2,
        rooms: 1,
      });
      onSelectHotel(ediHotel);

      triggerAssistantResponse(
        `Edinburgh is a fantastic choice for the family! We have our heated pool with designated family splash hours (9–11am & 3–6pm) and delicious kids' menus at the Pub & Grill.\n\nHere is your Smart Package breakdown proving the Club Room upgrade value:`,
        'package_comparison',
        { nights: 2, adults: 2 },
        {
          text: "Driving to the capital? Add your vehicle registration plate below to issue your ANPR SafePass:",
          widgetType: 'anpr_pass',
          widgetData: { plate: capturedPlate }
        }
      );
      return;
    }

    // 4. Bristol Business Trip Prompt
    if (lower.includes('bristol') || lower.includes('business')) {
      const bristolHotel = villageHotels.find(h => h.name.toLowerCase().includes('bristol')) || villageHotels[0];

      onApplySearchParams({
        destination: bristolHotel.name,
        adults: 1,
        children: 0,
        rooms: 1,
      });
      onSelectHotel(bristolHotel);

      triggerAssistantResponse(
        `Bristol is primed for productivity and fitness! Enjoy superfast Wi-Fi, VWorks hot desks, an early 6:00 AM workout in the Technogym club, and pre-registered ANPR parking.\n\nCheck out why the Club Room gives you the best business value:`,
        'package_comparison',
        { nights: 1, adults: 1 },
        {
          text: "Drop your vehicle plate below to activate your Bristol hotel parking clearance:",
          widgetType: 'anpr_pass',
          widgetData: { plate: capturedPlate }
        }
      );
      return;
    }

    // 5. Generic Destination Search / Natural Language fallback
    const matchedHotel = villageHotels.find(h => 
      lower.includes(h.city.toLowerCase()) || lower.includes(h.name.toLowerCase())
    );

    if (matchedHotel) {
      onApplySearchParams({ destination: matchedHotel.name });
      onSelectHotel(matchedHotel);

      triggerAssistantResponse(
        `Spot on! I've loaded ${matchedHotel.name} with our full leisure club, Pub & Grill, and Starbucks on-site.\n\nHere is your zero-surprise package comparison to guarantee maximum value for your stay:`,
        'package_comparison',
        { nights: 2, adults: 2 },
        {
          text: "Will you need hotel parking? Activate your ANPR SafePass directly here:",
          widgetType: 'anpr_pass',
          widgetData: { plate: capturedPlate }
        }
      );
    } else {
      triggerAssistantResponse(
        "I'm on it! Village Hotels has 35 dynamic UK locations offering modern bedrooms, full TechnoGym clubs, 25m heated pools, and Pub & Grill dining all under one roof.\n\nWould you like to explore Manchester, Edinburgh, Bristol, or check an existing reservation?",
        undefined,
        undefined
      );
    }
  };

  const handlePackageSelected = (packageType: 'room-club' | 'room-standard') => {
    const addons = ['breakfast_buffet'];
    if (capturedPlate || packageType === 'room-club') {
      addons.push('anpr_parking');
    }

    onSelectRoomPackage(packageType, addons, capturedPlate);

    const followMsg: CopilotChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: packageType === 'room-club'
        ? `Brilliant choice! I've pre-selected the Village Club Room with FREE Gym & 25m Pool access, Dyson styling, Sky Cinema HD, and attached your ANPR SafePass (${capturedPlate || 'Vehicle Whitelisted'}). Launching checkout now...`
        : `Selected Standard Room with add-on passes. Launching checkout now...`,
      timestamp: 'Just now',
    };
    setMessages(prev => [...prev, followMsg]);

    if (onOpenBookingModal) {
      setTimeout(() => {
        onOpenBookingModal();
      }, 400);
    }
  };

  const handlePlateActivated = (plate: string) => {
    setCapturedPlate(plate);
    const confirmMsg: CopilotChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: `Vehicle ${plate} successfully whitelisted! Your ANPR SafePass is active. You're 100% protected against automated third-party parking penalty charge notices (PCNs).`,
      timestamp: 'Just now',
    };
    setMessages(prev => [...prev, confirmMsg]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Background click to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer Container */}
      <aside 
        aria-label="Dozie - Village Hotels AI Booking Assistant"
        className="w-full sm:max-w-[480px] md:max-w-[540px] h-full bg-[#000000] border-l border-[#262626] flex flex-col shadow-2xl relative z-10 animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 bg-[#0A0A0A] border-b border-[#222222] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FF6A0C] flex items-center justify-center text-black font-black shadow-lg">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-white font-sans">
                  Dozie
                </h3>
                <span className="text-[9px] bg-[#49D67C]/20 border border-[#49D67C]/50 text-[#49D67C] px-1.5 py-0.2 rounded font-bold uppercase">
                  Village AI
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                AI Booking Assistant • ANPR SafePass • Zero-surprise stays
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetChat}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
              title="Reset Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
              title="Close Dozie"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 no-scrollbar">
          {messages.map((msg) => (
            <CopilotMessage
              key={msg.id}
              message={msg}
              onSelectPackage={handlePackageSelected}
              onActivatePlate={handlePlateActivated}
              onOpenDetails={onOpenBookingModal}
            />
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-gray-400 pl-9 py-2">
              <div className="w-2 h-2 rounded-full bg-[#FF6A0C] animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-[#FF6A0C] animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 rounded-full bg-[#FF6A0C] animate-bounce [animation-delay:0.4s]"></div>
              <span className="text-[11px] text-gray-500 font-mono">Dozie is calculating live rates...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompt Chips */}
        <div className="px-4 py-2.5 bg-[#080808] border-t border-[#1C1C1C]">
          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-2">
            1-Tap Demo Scenarios
          </span>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {quickChips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => handleSendPrompt(chip.label)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] hover:bg-[#202020] border border-[#2B2B2B] hover:border-[#FF6A0C] text-[11px] text-gray-200 hover:text-white rounded-full whitespace-nowrap transition-colors cursor-pointer flex-shrink-0"
              >
                {chip.icon}
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Text Input Footer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendPrompt(inputText);
          }}
          className="p-4 bg-[#0A0A0A] border-t border-[#222222] flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask Dozie anything (e.g. Manchester weekend for 2 with car)..."
            className="flex-1 bg-[#141414] border border-[#333333] focus:border-[#FF6A0C] text-white text-xs px-4 py-3 rounded-lg focus:outline-none placeholder-gray-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="bg-[#FF6A0C] hover:bg-white text-black p-3 rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </aside>
    </div>
  );
};
