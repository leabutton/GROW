import React from 'react';
import { Waves, Dumbbell, Tv, Wind, Coffee, Car, Check, AlertCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export interface PackageComparisonCardProps {
  nights?: number;
  adults?: number;
  onSelectPackage: (packageType: 'room-club' | 'room-standard') => void;
}

export const PackageComparisonCard: React.FC<PackageComparisonCardProps> = ({
  nights = 2,
  adults = 2,
  onSelectPackage,
}) => {
  return (
    <div className="bg-[#0A0A0A] border border-[#333333] rounded-xl p-4 sm:p-5 space-y-4 my-2 text-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#222222] pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FF6A0C]" />
          <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white">
            Smart Package Value Comparison
          </h4>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#49D67C]/20 text-[#49D67C] px-2 py-0.5 rounded border border-[#49D67C]/40">
          Zero-Surprise Guarantee
        </span>
      </div>

      {/* Side-by-Side Comparison Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Column A: Standard Room + À La Carte */}
        <div className="bg-[#121212] border border-[#262626] rounded-lg p-3.5 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase text-gray-400">Standard Room</span>
              <span className="text-[10px] bg-[#222222] text-gray-400 px-1.5 py-0.5 rounded">À La Carte</span>
            </div>

            <div className="text-xl font-extrabold text-white">
              £110<span className="text-[11px] font-normal text-gray-400">/night true cost</span>
            </div>

            <div className="space-y-1.5 text-[11px] text-gray-300 border-t border-[#1F1F1F] pt-2">
              <div className="flex justify-between">
                <span>Standard Room</span>
                <span className="font-semibold text-white">£95</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>+ Gym & Pool Pass ({adults} guests)</span>
                <span>+£10</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>+ ANPR Parking Fee</span>
                <span>+£5</span>
              </div>
            </div>

            <div className="space-y-1 text-[10px] text-gray-500 pt-1 border-t border-[#1F1F1F]">
              <div className="flex items-center gap-1">✕ Standard tea/instant coffee</div>
              <div className="flex items-center gap-1">✕ No Sky Cinema or Sports HD</div>
              <div className="flex items-center gap-1">✕ Standard travel hairdryer</div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectPackage('room-standard')}
            className="mt-3.5 w-full bg-[#222222] hover:bg-[#333333] text-gray-300 hover:text-white py-2 text-[11px] font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
          >
            Select Standard (£110/nt)
          </button>
        </div>

        {/* Column B: Club Room (Recommended) */}
        <div className="bg-gradient-to-b from-[#1C1A14] to-[#121212] border-2 border-[#FF6A0C] rounded-lg p-3.5 relative flex flex-col justify-between shadow-lg">
          {/* Badge */}
          <div className="absolute -top-2.5 right-3 bg-[#FF6A0C] text-black text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow">
            Best Value (+£5 Only)
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase text-[#FF6A0C]">Village Club Room</span>
              <span className="text-[10px] text-[#49D67C] font-semibold">VIP Bundle</span>
            </div>

            <div className="text-xl font-extrabold text-white">
              £115<span className="text-[11px] font-normal text-gray-400">/night member rate</span>
            </div>

            <div className="space-y-1.5 text-[11px] text-gray-200 border-t border-[#26241D] pt-2">
              <div className="flex items-center gap-1.5 text-[#49D67C]">
                <Check className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Full Village Gym & 25m Heated Pool (FREE)</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#49D67C]">
                <Check className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Pre-Registered ANPR Parking (FREE)</span>
              </div>
              <div className="flex items-center gap-1.5 text-white">
                <Check className="w-3.5 h-3.5 text-[#FF6A0C] flex-shrink-0" />
                <span>Sky Cinema & Sky Sports in HD</span>
              </div>
              <div className="flex items-center gap-1.5 text-white">
                <Check className="w-3.5 h-3.5 text-[#FF6A0C] flex-shrink-0" />
                <span>Dyson Supersonic™ Styling & Lavazza pods</span>
              </div>
            </div>

            <div className="p-2 rounded bg-[#0A0A0A] border border-[#2D2A20] text-[10px] text-[#E0B070] italic">
              "For just £5 more per night, the Club Room bundles full gym, pool, parking, and luxury amenities."
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectPackage('room-club')}
            className="mt-3.5 w-full bg-[#FF6A0C] hover:bg-white text-black py-2.5 text-xs font-black uppercase tracking-wider rounded transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
          >
            <span>Select Club Experience & Book</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Proactive Operational Friction Transparency Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-[#222222] text-[10px]">
        {/* Orange Hanger Rule */}
        <div className="bg-[#181818] border border-[#2B2B2B] p-2 rounded flex items-start gap-1.5 text-gray-300">
          <span className="text-base flex-shrink-0">🏷️</span>
          <div>
            <span className="font-bold text-[#FF6A0C] block">Orange Hanger Rule:</span>
            Hang your orange tag out by 11 PM if you'd like a daily room refresh & fresh towel swap.
          </div>
        </div>

        {/* Pool Splash Hours */}
        <div className="bg-[#181818] border border-[#2B2B2B] p-2 rounded flex items-start gap-1.5 text-gray-300">
          <span className="text-base flex-shrink-0">🏊</span>
          <div>
            <span className="font-bold text-[#3DB5E6] block">Pool Hours Guidance:</span>
            Family splash 9–11am & 3–6pm; adult quiet lane swim all other operational hours.
          </div>
        </div>
      </div>
    </div>
  );
};
