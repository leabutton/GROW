import React from 'react';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Region } from '../../types';
import { ukRegions } from '../../data/locations';

export interface FilterState {
  region: Region;
  poolOnly: boolean;
  vworksOnly: boolean;
  evOnly: boolean;
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'rating';
}

export interface HotelFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalHotelsCount: number;
}

export const HotelFilters: React.FC<HotelFiltersProps> = ({
  filters,
  onChange,
  totalHotelsCount,
}) => {
  return (
    <div className="w-full space-y-4 mb-8">
      {/* Top Filter Bar: Region Buttons */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full md:w-auto">
          {ukRegions.map((region) => {
            const isSelected = filters.region === region;
            return (
              <button
                key={region}
                type="button"
                onClick={() => onChange({ ...filters, region })}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-150 ${
                  isSelected
                    ? 'bg-[#FF6A0C] text-white shadow-glow-sm'
                    : 'bg-[#222222] text-gray-300 hover:text-white hover:bg-[#2C2C2C] border border-[#333333]'
                }`}
              >
                {region}
              </button>
            );
          })}
        </div>

        {/* Sort & Count */}
        <div className="flex items-center gap-3 text-xs w-full md:w-auto justify-between">
          <span className="text-gray-400 font-medium">
            Showing <strong className="text-white">{totalHotelsCount}</strong> Hotels
          </span>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={filters.sortBy}
              onChange={(e) => onChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
              className="bg-[#222222] border border-[#3A3A3A] text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#FF6A0C]"
            >
              <option value="recommended">Featured / Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Guest Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feature toggles */}
      <div className="flex items-center gap-4 text-xs text-gray-300 flex-wrap pt-2 border-t border-[#252525]">
        <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
          <SlidersHorizontal className="w-3 h-3 text-[#FF6A0C]" /> Amenities:
        </span>

        <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
          <input
            type="checkbox"
            checked={filters.poolOnly}
            onChange={(e) => onChange({ ...filters, poolOnly: e.target.checked })}
            className="w-3.5 h-3.5 rounded text-[#FF6A0C] bg-[#222222] border-gray-600 focus:ring-[#FF6A0C]"
          />
          <span>25m Heated Pool</span>
        </label>

        <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
          <input
            type="checkbox"
            checked={filters.vworksOnly}
            onChange={(e) => onChange({ ...filters, vworksOnly: e.target.checked })}
            className="w-3.5 h-3.5 rounded text-[#FF6A0C] bg-[#222222] border-gray-600 focus:ring-[#FF6A0C]"
          />
          <span>VWorks Coworking</span>
        </label>

        <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
          <input
            type="checkbox"
            checked={filters.evOnly}
            onChange={(e) => onChange({ ...filters, evOnly: e.target.checked })}
            className="w-3.5 h-3.5 rounded text-[#FF6A0C] bg-[#222222] border-gray-600 focus:ring-[#FF6A0C]"
          />
          <span>EV Charging</span>
        </label>
      </div>
    </div>
  );
};
