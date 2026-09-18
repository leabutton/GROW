import React from 'react';
import { Coffee, Car, Clock, UtensilsCrossed, Check, ShieldCheck } from 'lucide-react';
import { mockAddons } from '../../data/mockRooms';
import { AddonOption } from '../../types';

export interface AddonsSectionProps {
  selectedAddons: string[];
  onToggleAddon: (addonId: string) => void;
  carRegistration: string;
  onChangeCarReg: (reg: string) => void;
  nightsCount: number;
  guestsCount: number;
}

export const AddonsSection: React.FC<AddonsSectionProps> = ({
  selectedAddons,
  onToggleAddon,
  carRegistration,
  onChangeCarReg,
  nightsCount,
  guestsCount,
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'breakfast_buffet':
        return <Coffee className="w-5 h-5 text-[#F5A623]" />;
      case 'anpr_parking':
        return <Car className="w-5 h-5 text-[#FF6A0C]" />;
      case 'late_checkout':
        return <Clock className="w-5 h-5 text-[#3DB5E6]" />;
      default:
        return <UtensilsCrossed className="w-5 h-5 text-[#49D67C]" />;
    }
  };

  const calculateAddonCost = (addon: AddonOption) => {
    let cost = addon.price;
    if (addon.perPerson) cost *= guestsCount;
    if (addon.perNight) cost *= nightsCount;
    return cost;
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-base font-bold font-sans text-white">Upgrade Your Stay (Optional Add-ons)</h4>
        <p className="text-xs text-gray-400 mt-0.5">
          Customise your Village experience with pre-booked dining and hassle-free parking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {mockAddons.map((addon) => {
          const isSelected = selectedAddons.includes(addon.id);
          const totalCost = calculateAddonCost(addon);

          return (
            <div
              key={addon.id}
              onClick={() => onToggleAddon(addon.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 select-none flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#222222] border-[#FF6A0C] shadow-sm'
                  : 'bg-[#1C1C1C] border-[#2E2E2E] hover:border-gray-500'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#282828] border border-[#333333]">
                      {getIcon(addon.id)}
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white leading-tight">{addon.title}</h5>
                      {addon.badge && (
                        <span className="inline-block mt-1 text-[10px] font-semibold text-[#FF6A0C] bg-[#FF6A0C]/10 px-2 py-0.5 rounded">
                          {addon.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                    isSelected ? 'bg-[#FF6A0C] border-[#FF6A0C] text-white' : 'border-gray-600 bg-transparent'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>

                <p className="text-xs text-gray-300 mt-2.5 leading-relaxed">
                  {addon.description}
                </p>
              </div>

              {/* Price footer */}
              <div className="mt-3 pt-2.5 border-t border-[#2A2A2A] flex items-center justify-between text-xs">
                <span className="text-gray-400">
                  £{addon.price.toFixed(2)} {addon.perPerson ? '/person' : ''} {addon.perNight ? '/night' : ''}
                </span>
                <span className="font-bold text-white text-sm">
                  +£{totalCost.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Proactive ANPR Car Registration Box */}
      {selectedAddons.includes('anpr_parking') && (
        <div className="p-4 rounded-xl bg-[#242424] border border-[#FF6A0C]/40 animate-in fade-in">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#49D67C] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#FF6A0C]">
                Proactive ANPR Parking Registration
              </h5>
              <p className="text-xs text-gray-300 mt-0.5">
                Enter your vehicle registration plate below. Our cameras will automatically recognise your vehicle on arrival—no need to register at the kiosk!
              </p>
              <div className="mt-3 flex items-center gap-2 max-w-sm">
                <div className="relative flex-1">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-black bg-[#003399] text-white px-1 py-0.5 rounded">
                    GB
                  </span>
                  <input
                    type="text"
                    value={carRegistration}
                    onChange={(e) => onChangeCarReg(e.target.value.toUpperCase())}
                    placeholder="E.G. VE24 VLG"
                    className="w-full bg-[#181818] border border-gray-600 rounded-lg pl-10 pr-3 py-2 text-sm font-mono font-bold tracking-widest text-white uppercase placeholder-gray-500 focus:outline-none focus:border-[#FF6A0C]"
                    maxLength={10}
                  />
                </div>
                {carRegistration.trim() && (
                  <span className="text-xs font-bold text-[#49D67C] flex items-center gap-1">
                    <Check className="w-4 h-4" /> Validated
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
