import React, { useState } from 'react';
import { Car, ShieldCheck, Check, AlertTriangle } from 'lucide-react';

export interface AnprPassCardProps {
  initialPlate?: string;
  onActivatePlate: (plate: string) => void;
}

export const AnprPassCard: React.FC<AnprPassCardProps> = ({
  initialPlate = '',
  onActivatePlate,
}) => {
  const [plate, setPlate] = useState(initialPlate);
  const [isActivated, setIsActivated] = useState(Boolean(initialPlate));

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plate.trim()) return;
    const cleanPlate = plate.trim().toUpperCase();
    setIsActivated(true);
    onActivatePlate(cleanPlate);
  };

  return (
    <div className="bg-[#0A0A0A] border border-[#2B2B2B] rounded-xl p-4 my-2 text-white shadow-xl space-y-3">
      <div className="flex items-center gap-2">
        <Car className="w-4 h-4 text-[#FF6A0C]" />
        <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white">
          ANPR Parking SafePass Activation
        </h4>
      </div>

      <p className="text-[11px] text-gray-300 leading-relaxed">
        Bringing your car? Drop your vehicle registration plate below (e.g., <strong className="text-white">MT22 XYZ</strong>) so we can activate your <span className="text-[#49D67C] font-semibold">ANPR SafePass</span> and whitelist your vehicle directly with parking cameras.
      </p>

      {isActivated ? (
        <div className="bg-[#0E2014] border border-[#49D67C]/60 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#49D67C] animate-pulse"></span>
              <span className="text-xs font-bold text-[#49D67C] uppercase tracking-wider">
                ANPR SafePass Active
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsActivated(false)}
              className="text-[10px] text-gray-400 hover:text-white underline cursor-pointer"
            >
              Change Plate
            </button>
          </div>

          <div className="flex items-center justify-between bg-black/60 px-3 py-2 rounded border border-[#2B3B2B]">
            <span className="font-mono text-base font-black tracking-widest text-[#FFDC00]">
              {plate.toUpperCase()}
            </span>
            <div className="flex items-center gap-1 text-[10px] text-[#49D67C] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Whitelisted</span>
            </div>
          </div>

          <p className="text-[10px] text-gray-300">
            ✓ Guaranteed zero £60–£100 third-party parking penalty charge notices (PCNs).
          </p>
        </div>
      ) : (
        <form onSubmit={handleActivate} className="space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              {/* UK Plate styling */}
              <input
                type="text"
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                placeholder="e.g. MT22 XYZ"
                className="w-full bg-[#181818] border-2 border-[#333333] focus:border-[#FF6A0C] text-white font-mono font-bold tracking-widest text-sm px-3.5 py-2 rounded focus:outline-none placeholder-gray-500 uppercase"
                maxLength={10}
              />
            </div>
            <button
              type="submit"
              disabled={!plate.trim()}
              className="bg-[#49D67C] hover:bg-white text-black font-extrabold text-xs uppercase tracking-wider px-4 py-2.5 rounded transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md flex items-center gap-1 whitespace-nowrap"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Activate SafePass</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
            <AlertTriangle className="w-3 h-3 text-[#FF6A0C] flex-shrink-0" />
            <span>Prevents automated third-party parking enforcement charges without lobby kiosks.</span>
          </div>
        </form>
      )}
    </div>
  );
};
