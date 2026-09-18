import React, { useState, useRef, useEffect } from 'react';
import { Search, Check, X } from 'lucide-react';
import { villageHotels } from '../../data/locations';
import { Hotel } from '../../types';

export interface DestinationDropdownProps {
  selectedDestination: string;
  onSelect: (destination: string, hotel?: Hotel) => void;
}

export const DestinationDropdown: React.FC<DestinationDropdownProps> = ({
  selectedDestination,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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

  const regionsList = ['Midlands', 'North of England', 'Scotland', 'South of England', 'Wales'];

  const filteredHotels = villageHotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Field Trigger matching live site */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 py-3 bg-[#0A0A0A] hover:bg-[#151515] border border-[#333333] hover:border-white transition-colors flex items-center justify-between cursor-pointer"
      >
        <div className="overflow-hidden pr-2">
          <span className="block text-[11px] font-bold uppercase tracking-[1.1px] text-gray-400">
            Where do you want to go?
          </span>
          <span className="block text-sm font-semibold text-white truncate mt-0.5">
            {selectedDestination && selectedDestination !== 'All Locations'
              ? selectedDestination
              : 'City, region or hotel'}
          </span>
        </div>
        <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
      </button>

      {/* Destination Dropdown Window */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 md:min-w-[420px] mt-1 z-50 bg-[#000000] border border-white shadow-2xl p-4 max-h-[460px] overflow-y-auto animate-in fade-in duration-150">
          {/* Search Input */}
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search city, region or hotel..."
              className="w-full bg-[#111111] border border-[#333333] text-white text-xs pl-9 pr-8 py-2.5 focus:outline-none focus:border-[#49D67C]"
              autoFocus
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* All Hotels option */}
          <button
            type="button"
            onClick={() => {
              onSelect('All Locations');
              setIsOpen(false);
            }}
            className={`w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider mb-2 flex items-center justify-between transition-colors cursor-pointer ${
              selectedDestination === 'All Locations' || !selectedDestination
                ? 'bg-[#49D67C] text-black'
                : 'bg-[#151515] text-white hover:bg-white/10'
            }`}
          >
            <span>Show All 35 UK Locations</span>
            {(selectedDestination === 'All Locations' || !selectedDestination) && (
              <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
            )}
          </button>

          {/* Grouped by Region */}
          <div className="space-y-4">
            {regionsList.map(regionName => {
              const hotelsInRegion = filteredHotels.filter(h => h.region === regionName);
              if (hotelsInRegion.length === 0) return null;

              return (
                <div key={regionName} className="border-t border-[#222222] pt-2.5">
                  <div className="flex items-center justify-between px-2 py-1">
                    <span className="text-[11px] font-extrabold uppercase tracking-[1.5px] text-[#49D67C]">
                      {regionName}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onSelect(regionName);
                        setIsOpen(false);
                      }}
                      className="text-[10px] text-gray-400 hover:text-white uppercase tracking-wider underline cursor-pointer"
                    >
                      All in {regionName}
                    </button>
                  </div>

                  <div className="mt-1 space-y-0.5">
                    {hotelsInRegion.map(hotel => {
                      const isSelected = selectedDestination === hotel.name;
                      return (
                        <button
                          key={hotel.id}
                          type="button"
                          onClick={() => {
                            onSelect(hotel.name, hotel);
                            setIsOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-white text-black font-bold'
                              : 'text-gray-200 hover:bg-[#1A1A1A] hover:text-[#49D67C]'
                          }`}
                        >
                          <div className="truncate">
                            <div className="truncate">{hotel.name}</div>
                            <div className={`text-[10px] truncate ${isSelected ? 'text-gray-800' : 'text-gray-400'}`}>
                              {hotel.city} • from £{hotel.basePrice.toFixed(2)}
                            </div>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 flex-shrink-0 text-black stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
