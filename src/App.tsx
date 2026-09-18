import { useState } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { BookingMask } from './components/booking/BookingMask';
import { HotelGrid } from './components/hotels/HotelGrid';
import { RoomModal } from './components/checkout/RoomModal';
import { BrandShowcaseModal } from './components/showcase/BrandShowcaseModal';
import { CopilotDrawer } from './components/copilot/CopilotDrawer';
import { villageHotels } from './data/locations';
import { BookingSearchParams, Hotel } from './types';
import { BookingRecord } from './types/booking';
import { ChevronDown, ChevronUp, Palette, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export function App() {
  const getTomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const getDayAfterTomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  };

  const [searchParams, setSearchParams] = useState<BookingSearchParams>({
    destination: 'All Locations',
    checkIn: getTomorrowStr(),
    checkOut: getDayAfterTomorrowStr(),
    adults: 2,
    children: 0,
    rooms: 1,
    isMember: true, // Default to member discount enabled to showcase the £5 savings
    promoCode: '',
  });

  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [isShowcaseOpen, setIsShowcaseOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  // Copilot pre-selected package & car registration state
  const [copilotRoomId, setCopilotRoomId] = useState<string>('room-club');
  const [copilotAddons, setCopilotAddons] = useState<string[]>(['breakfast_buffet', 'anpr_parking']);
  const [copilotPlate, setCopilotPlate] = useState<string>('');

  const calculateNights = (inDate: string, outDate: string) => {
    const d1 = new Date(inDate);
    const d2 = new Date(outDate);
    const diff = Math.abs(d2.getTime() - d1.getTime());
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const nightsCount = calculateNights(searchParams.checkIn, searchParams.checkOut);

  const handleUpdateSearchParams = (params: Partial<BookingSearchParams>) => {
    setSearchParams(prev => ({ ...prev, ...params }));
  };

  const handleSelectHotelRooms = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsRoomModalOpen(true);
  };

  const handleOpenSearchModal = () => {
    const match = villageHotels.find(h => h.name.toLowerCase() === searchParams.destination.toLowerCase());
    setSelectedHotel(match || villageHotels[0]);
    setIsRoomModalOpen(true);
  };

  const handleCopilotSelectPackage = (roomId: string, addons: string[], vehicleReg?: string) => {
    setCopilotRoomId(roomId);
    setCopilotAddons(addons);
    if (vehicleReg) {
      setCopilotPlate(vehicleReg);
    }
    // Make sure we have a selected hotel
    if (!selectedHotel) {
      const match = villageHotels.find(h => h.name.toLowerCase().includes(searchParams.destination.toLowerCase()));
      setSelectedHotel(match || villageHotels[0]);
    }
  };

  const faqs = [
    {
      q: 'Where are Village Hotels located across the UK?',
      a: 'Village Hotels has 35 dynamic lifestyle locations across England, Scotland and Wales, including major hubs like Edinburgh, Glasgow, Aberdeen, Manchester, Leeds, Liverpool, Birmingham, Bristol, London Watford, Cardiff, and Swansea. Every hotel features everything under one roof: modern bedrooms, Pub & Grill, Starbucks, and state-of-the-art gym & heated pool.'
    },
    {
      q: 'How does the Booking Revolution member rate work?',
      a: 'Booking Revolution is free to join! When you book directly as a member, you receive £5.00 off every single night of your stay, plus complimentary access to the Village Health & Wellness Club (heated 25m pool, sauna, steam room, and TechnoGym club) and free high-speed WiFi.'
    },
    {
      q: 'How does car parking and ANPR camera registration work?',
      a: 'Most Village Hotels operate an Automated Number Plate Recognition (ANPR) parking management system to ensure spaces are reserved for hotel guests. Parking is £5.00 per night (or free on select member rates). Guests can enter their vehicle registration during direct online booking or via Dozie to issue an ANPR SafePass and prevent automated parking charges.'
    },
    {
      q: 'What is included with a Village Club Room upgrade?',
      a: 'Upgrading to a Village Club Room includes complimentary full access to the Village Gym and 25m heated pool, an in-room Dyson Supersonic™ hairdryer, full Sky HD package with Sky Cinema and Sky Sports, premium coffee machine, and complimentary access to VWorks coworking spaces during your stay.'
    },
    {
      q: 'Can I book dining at the Pub & Grill or a meeting room?',
      a: 'Yes! Use the tabs at the top of our booking bar to select Book a Table (for craft burgers, wings, and live sports on massive 50+ screens) or Book A Meeting (for dedicated conference rooms, day delegate packages, and VWorks hot desks).'
    }
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col font-sans selection:bg-[#49D67C] selection:text-black relative">
      {/* 1. Official Sticky Header */}
      <Navbar
        isMember={searchParams.isMember}
        onToggleMember={() => handleUpdateSearchParams({ isMember: !searchParams.isMember })}
        onSelectNav={(item) => {
          if (item === 'offers') {
            const el = document.getElementById('deals-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else {
            const el = document.getElementById('hotels-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenBooking={() => handleOpenSearchModal()}
      />

      {/* 2. Top Booking Mask Bar (.group-bookingmask-v2) */}
      <div className="py-4 bg-[#000000] border-b border-[#1A1A1A]">
        <BookingMask
          searchParams={searchParams}
          onUpdateParams={handleUpdateSearchParams}
          onSearch={handleOpenSearchModal}
          onHotelDirectSelect={(hotel) => {
            setSelectedHotel(hotel);
            setIsRoomModalOpen(true);
          }}
        />
      </div>

      {/* 3. Hero Visual Section (.main-visual) */}
      <section className="relative h-[380px] sm:h-[460px] md:h-[520px] overflow-hidden bg-black flex items-center justify-center">
        {/* Real Hero Image from live site */}
        <img
          src="https://image-tc.galaxy.tf/wijpeg-8ep95qoc56dnqqezghwahl1q3/copy-of-rs9871-village-b0053a.jpg"
          alt="Village Hotels Across the UK"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.70]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60"></div>

        {/* Hero Typography Matching Live Site */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-[2px] uppercase font-sans drop-shadow-md">
            HOTELS ACROSS THE UK
          </h1>
          <h2 className="text-lg sm:text-2xl md:text-3xl font-light text-white tracking-wide drop-shadow-sm font-sans">
            Where will you discover next?
          </h2>

          {/* Quick Action Triggers */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsCopilotOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-black px-4 py-2 bg-[#FF6A0C] hover:bg-white transition-all shadow-xl cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>✨ Plan with Dozie</span>
            </button>

            <button
              onClick={() => setIsShowcaseOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white px-3.5 py-2 bg-black/70 border border-white/40 hover:border-[#49D67C] backdrop-blur-md transition-colors cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5 text-[#49D67C]" />
              <span>Brand Guidelines & Palette</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Intro & Breadcrumbs Section (#intro) */}
      <section id="intro" className="py-12 bg-black border-b border-[#222222]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {/* Breadcrumbs */}
          <nav className="text-xs text-gray-400 flex items-center gap-2 uppercase tracking-wider">
            <a href="#" className="hover:text-[#49D67C] transition-colors">Home</a>
            <span className="text-gray-600">&gt;</span>
            <span className="text-white font-bold">Book A Room</span>
          </nav>

          {/* Authentic Intro Text */}
          <div className="max-w-4xl space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
            <p>
              At Village Hotels we have <strong className="text-white">everything under one roof</strong> and our UK locations are the perfect destination if you're planning a weekend break, family getaway or business trip.
            </p>
            <p>
              Our hotels offer comfy, stylish and modern rooms with exceptional service to make your stay as enjoyable as possible. On-site dining with a delicious food and drink menu is available at our <strong className="text-white">Pub & Grill</strong>, along with a <strong className="text-white">Starbucks*</strong> to get your coffee fix, state-of-the-art gyms kitted out with the best equipment, heated pool, sauna and steam room!
            </p>
            <p>
              Where will you explore? Check out all of our 35 UK hotel destinations below or use our <button onClick={() => setIsCopilotOpen(true)} className="text-[#FF6A0C] font-bold underline hover:text-white cursor-pointer">AI Booking Assistant, Dozie</button> to find your ideal stay today!
            </p>
            <p className="text-xs text-gray-500 italic pt-1">
              *Starbucks not available at Village Hotel Liverpool.
            </p>
          </div>
        </div>
      </section>

      {/* 5. VIEW OUR LOCATIONS & 35 Hotels Grid */}
      <HotelGrid
        hotels={villageHotels}
        searchDestination={searchParams.destination}
        isMember={searchParams.isMember}
        nightsCount={nightsCount}
        onSelectRooms={handleSelectHotelRooms}
        onSelectDestination={(dest) => handleUpdateSearchParams({ destination: dest })}
      />

      {/* 6. "WHERE WILL YOU DISCOVER?" Section (.big-txt-n-image) */}
      <section className="py-20 bg-black border-t border-b border-[#222222]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block text-xs font-extrabold uppercase tracking-[2px] text-[#49D67C]">
                Explore The United Kingdom
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none font-sans">
                WHERE WILL YOU <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#49D67C] to-white">
                  DISCOVER?
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                The UK is home to some of the best attractions in the world and Village Hotels are perfectly placed for you to explore them. From scenic coastal breaks in Bournemouth and Swansea, to vibrant city culture in Edinburgh, Manchester and Bristol, your next adventure starts here.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('hotels-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-[#49D67C] hover:bg-white text-black font-extrabold text-xs tracking-[1.4px] uppercase px-8 py-4 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Destinations</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Mosaic */}
            <div className="relative overflow-hidden border border-white/40 shadow-2xl">
              <img
                src="https://image-tc.galaxy.tf/wijpeg-7wajjumdbab9yeluq6sxmcojp/hotel-hacks-join-the-revolution-2.jpg?rotate=0&crop=2%2C0%2C1248%2C440&width=1920"
                alt="Village Discovery"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  35 Locations • City, Country & Coast
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Highlight Banner: Booking Revolution Deals (.highlight) */}
      <section 
        id="deals-section"
        className="relative py-20 bg-cover bg-center border-b border-[#222222]"
        style={{
          backgroundImage: "url('https://image-tc.galaxy.tf/wijpeg-7wajjumdbab9yeluq6sxmcojp/hotel-hacks-join-the-revolution-2.jpg?rotate=0&crop=2%2C0%2C1248%2C440&width=1920')",
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.85)'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#49D67C]/20 border border-[#49D67C] px-3.5 py-1 text-xs font-bold text-[#49D67C] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Booking Revolution Exclusive</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-sans">
            On your marks, get set... <br />
            explore with our unmissable deals!
          </h2>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Enjoy hotel stays from as little as <strong className="text-white">£54.00</strong> by becoming a member of the Booking Revolution! As a member you'll get exclusive access to all the best hotel deals throughout the year, plus free Wi-Fi, parking and use of the Village Health & Wellness Club.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                handleUpdateSearchParams({ isMember: true });
                handleOpenSearchModal();
              }}
              className="bg-[#49D67C] hover:bg-white text-black font-extrabold text-xs sm:text-sm tracking-[1.4px] uppercase px-8 py-4 border border-[#49D67C] hover:border-white transition-all cursor-pointer shadow-xl"
            >
              JOIN THE REVOLUTION & BOOK
            </button>
          </div>
        </div>
      </section>

      {/* 8. Authentic FAQs Accordion (.unit-faq) */}
      <section className="py-20 bg-[#000000] border-b border-[#222222]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Everything you need to know about booking and staying at Village Hotels
            </p>
          </div>

          <div className="space-y-3 pt-4">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpen === idx;
              return (
                <div 
                  key={idx}
                  className="border border-[#2B2B2B] bg-[#0A0A0A] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setFaqOpen(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-4.5 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-white tracking-wide">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#49D67C] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-[#1C1C1C]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Footer (.footer-main-content) */}
      <footer className="bg-[#050505] border-t border-[#1F1F1F] text-gray-400 text-xs py-14">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#1A1A1A] pb-8">
            <a href="#" className="flex items-center">
              <img
                src="https://image-tc.galaxy.tf/wisvg-9figbouk9zfn14ue5jbv5sbmz/village-hotel-club-white.svg"
                alt="Village Hotel Club"
                className="h-10 w-auto object-contain"
              />
            </a>
            <div className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-wider text-gray-300">
              <a href="#hotels-section" className="hover:text-[#49D67C]">Hotels</a>
              <a href="#hotels-section" className="hover:text-[#49D67C]">Stay & Sleep</a>
              <a href="#hotels-section" className="hover:text-[#49D67C]">Pub & Grill</a>
              <a href="#hotels-section" className="hover:text-[#49D67C]">Gym & Swim</a>
              <a href="#hotels-section" className="hover:text-[#49D67C]">Work & Meet</a>
              <a href="#deals-section" className="hover:text-[#49D67C]">Booking Revolution</a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
            <div>
              &copy; {new Date().getFullYear()} Village Hotels Club Ltd. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-white">Terms & Conditions</a>
              <span>•</span>
              <a href="#" className="hover:text-white">Cookies</a>
              <span>•</span>
              <a href="#" className="hover:text-white">Modern Slavery Statement</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 10. Floating Dozie AI Booking Trigger */}
      <button
        type="button"
        onClick={() => setIsCopilotOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#FF6A0C] hover:bg-white text-black font-extrabold text-xs sm:text-sm tracking-wider uppercase px-4 sm:px-5 py-3.5 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2.5 border-2 border-black cursor-pointer group"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 text-black group-hover:rotate-12 transition-transform" />
          <span className="w-2 h-2 rounded-full bg-[#49D67C] absolute -top-1 -right-1 animate-ping"></span>
          <span className="w-2 h-2 rounded-full bg-[#49D67C] absolute -top-1 -right-1"></span>
        </div>
        <span>✨ Plan with Dozie</span>
      </button>

      {/* 11. Interactive Copilot Slide-over Drawer */}
      <CopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        onApplySearchParams={handleUpdateSearchParams}
        onSelectHotel={(hotel) => {
          setSelectedHotel(hotel);
          const el = document.getElementById('hotels-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectRoomPackage={handleCopilotSelectPackage}
        onOpenBookingModal={() => setIsRoomModalOpen(true)}
      />

      {/* 12. Mocked TravelClick / IBE Booking Engine Modal */}
      <RoomModal
        hotel={selectedHotel}
        isOpen={isRoomModalOpen}
        onClose={() => setIsRoomModalOpen(false)}
        checkIn={searchParams.checkIn}
        checkOut={searchParams.checkOut}
        nightsCount={nightsCount}
        adultsCount={searchParams.adults}
        childrenCount={searchParams.children}
        roomsCount={searchParams.rooms}
        isMember={searchParams.isMember}
        onToggleMember={() => handleUpdateSearchParams({ isMember: !searchParams.isMember })}
        initialRoomId={copilotRoomId}
        initialAddons={copilotAddons}
        initialCarReg={copilotPlate}
      />

      {/* Brand Design System Modal */}
      <BrandShowcaseModal
        isOpen={isShowcaseOpen}
        onClose={() => setIsShowcaseOpen(false)}
      />
    </div>
  );
}

export default App;
