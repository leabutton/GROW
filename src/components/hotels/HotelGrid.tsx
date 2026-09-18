import React, { useMemo, useState } from 'react';
import { HotelCard } from './HotelCard';
import { Hotel } from '../../types';
import { Search, X, Grid as GridIcon, Map as MapIcon } from 'lucide-react';

export interface HotelGridProps {
  hotels: Hotel[];
  searchDestination: string;
  isMember: boolean;
  nightsCount: number;
  onSelectRooms: (hotel: Hotel) => void;
  onSelectDestination: (dest: string) => void;
}

export const HotelGrid: React.FC<HotelGridProps> = ({
  hotels,
  searchDestination,
  isMember,
  nightsCount,
  onSelectRooms,
  onSelectDestination,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [poolOnly, setPoolOnly] = useState(false);
  const [evOnly, setEvOnly] = useState(false);

  const regions = [
    'All',
    'Midlands',
    'North of England',
    'Scotland',
    'South of England',
    'Wales'
  ];

  const displayedHotels = useMemo(() => {
    return hotels.filter(hotel => {
      // Text search
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchTitle = hotel.name.toLowerCase().includes(q);
        const matchCity = hotel.city.toLowerCase().includes(q);
        const matchAddr = hotel.address.toLowerCase().includes(q);
        const matchReg = hotel.region.toLowerCase().includes(q);
        if (!matchTitle && !matchCity && !matchAddr && !matchReg) return false;
      }

      // External searchDestination if set
      if (searchDestination && searchDestination !== 'All Locations') {
        const dest = searchDestination.toLowerCase();
        const matchHotel = hotel.name.toLowerCase().includes(dest);
        const matchCity = hotel.city.toLowerCase().includes(dest);
        const matchReg = hotel.region.toLowerCase().includes(dest);
        if (!matchHotel && !matchCity && !matchReg) return false;
      }

      // Region Filter
      if (selectedRegion !== 'All' && hotel.region !== selectedRegion) {
        return false;
      }

      // Amenities filter
      if (poolOnly && !hotel.amenities.pool) return false;
      if (evOnly && !hotel.amenities.evCharging) return false;

      return true;
    });
  }, [hotels, searchTerm, searchDestination, selectedRegion, poolOnly, evOnly]);

  return (
    <section id="hotels-section" className="relative">
      {/* 1. VIEW OUR LOCATIONS Search Box matching live site .search-box */}
      <div 
        className="relative py-16 md:py-24 bg-cover bg-center border-b border-[#222222]"
        style={{
          backgroundImage: "url('https://image-tc.galaxy.tf/wipng-72dlq9coy2ama27bi3tddl5zv/bedroom-king-club-2.png?width=1920')",
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.85)'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-[2px] uppercase font-sans">
            VIEW OUR LOCATIONS
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Discover all 35 Village Hotel Club locations across England, Scotland and Wales.
          </p>

          {/* Search Term Input */}
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Start typing your location (e.g. Edinburgh, Manchester, Bristol)..."
              className="w-full bg-[#000000]/90 border border-white/80 text-white text-sm px-5 py-4 pl-12 focus:outline-none focus:border-[#49D67C] placeholder-gray-400 shadow-2xl tracking-wide"
            />
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Filter Bar & Region Switcher */}
      <div className="bg-black border-b border-[#222222] sticky top-[74px] z-20 shadow-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {regions.map((reg) => {
              const isActive = selectedRegion === reg;
              return (
                <button
                  key={reg}
                  type="button"
                  onClick={() => {
                    setSelectedRegion(reg);
                    onSelectDestination(reg === 'All' ? 'All Locations' : reg);
                  }}
                  className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-[1.2px] transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-white text-black border border-white'
                      : 'bg-[#111111] text-gray-300 hover:text-white border border-[#333333]'
                  }`}
                >
                  {reg === 'All' ? 'All Locations' : reg}
                </button>
              );
            })}
          </div>

          {/* Controls: View Mode & Amenities */}
          <div className="flex items-center gap-3">
            {/* Quick Amenity Toggles */}
            <button
              type="button"
              onClick={() => setPoolOnly(!poolOnly)}
              className={`px-3 py-1.5 text-xs font-semibold border transition-all cursor-pointer ${
                poolOnly
                  ? 'bg-[#3DB5E6]/20 border-[#3DB5E6] text-[#3DB5E6]'
                  : 'bg-[#111111] border-[#333333] text-gray-400 hover:text-white'
              }`}
            >
              Pool & Spa
            </button>
            <button
              type="button"
              onClick={() => setEvOnly(!evOnly)}
              className={`px-3 py-1.5 text-xs font-semibold border transition-all cursor-pointer ${
                evOnly
                  ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400'
                  : 'bg-[#111111] border-[#333333] text-gray-400 hover:text-white'
              }`}
            >
              EV Charge
            </button>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center border border-[#333333]">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-black' : 'bg-black text-gray-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <GridIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('map')}
                className={`p-2 transition-colors cursor-pointer ${
                  viewMode === 'map' ? 'bg-white text-black' : 'bg-black text-gray-400 hover:text-white'
                }`}
                title="Map View"
              >
                <MapIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Hotels Grid Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8 border-b border-[#222222] pb-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase font-sans">
              {selectedRegion === 'All' ? 'Our Locations' : `${selectedRegion} Hotels`}
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Showing {displayedHotels.length} {displayedHotels.length === 1 ? 'hotel' : 'hotels'} available
            </p>
          </div>

          {(searchTerm || selectedRegion !== 'All' || searchDestination !== 'All Locations') && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedRegion('All');
                onSelectDestination('All Locations');
              }}
              className="text-xs text-[#49D67C] hover:underline font-bold uppercase tracking-wider cursor-pointer"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Hotels Grid */}
        {displayedHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {displayedHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                isMember={isMember}
                nightsCount={nightsCount}
                onSelectRooms={onSelectRooms}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0A0A0A] border border-[#222222] p-8 space-y-4">
            <p className="text-lg text-gray-300 font-bold uppercase tracking-wide">
              No hotels found matching your search.
            </p>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Try searching by major city name (e.g. Manchester, Edinburgh, Cardiff) or reset your filters to see all 35 locations.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedRegion('All');
                onSelectDestination('All Locations');
              }}
              className="bg-[#49D67C] text-black font-extrabold uppercase tracking-wider px-6 py-2.5 text-xs hover:bg-white transition-colors cursor-pointer"
            >
              View All 35 Locations
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
