import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { NoticeAlert } from '../common/NoticeAlert';
import { Sparkles, Palette, Layers, Car, Waves, Copy } from 'lucide-react';

export interface BrandShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandShowcaseModal: React.FC<BrandShowcaseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const primarySwatches = [
    { name: 'Blaze Orange', hex: '#FF6A0C', role: 'Master Accent, Primary CTAs & Highlights', text: 'white' },
    { name: 'Pitch Black', hex: '#000000', role: 'Canvas, Primary Headers & Framing', text: 'white' },
    { name: 'Industrial Slate', hex: '#1A1A1A', role: 'Card Surfaces & Dark Mode Backgrounds', text: 'white' },
    { name: 'Slate Elevated', hex: '#2A2A2A', role: 'Modals, Popovers & Hover States', text: 'white' },
    { name: 'Pure White', hex: '#FFFFFF', role: 'High-contrast typography & icons', text: 'black' },
  ];

  const subBrandSwatches = [
    { name: 'Picton Blue', hex: '#3DB5E6', role: 'Village Gym & Swim (Wellness & Pools)', text: 'black' },
    { name: 'Volt Lime', hex: '#A8E000', role: 'Gym Performance / HIIT Fitness', text: 'black' },
    { name: 'Craft Amber', hex: '#F5A623', role: 'Pub & Grill & Starbucks Dining', text: 'black' },
    { name: 'Member Green', hex: '#49D67C', role: 'Booking Revolution Loyalty Perks', text: 'black' },
    { name: 'Electric Purple', hex: '#8B5CF6', role: 'Parties, Events & Tribute Nights', text: 'white' },
    { name: 'Architect Gray', hex: '#6B7280', role: 'VWorks Coworking & Meeting Suites', text: 'white' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      title={
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#FF6A0C]" />
          <span>Village Hotels Reusable Design System</span>
        </div>
      }
      subtitle="Official color palettes, typography tokens, atomic components, and brand guidelines v2.4"
    >
      <div className="p-6 space-y-8">
        {/* 1. COLOR PALETTES */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#FF6A0C]" />
            <span>Master Primary Color Palette</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {primarySwatches.map((color) => (
              <div
                key={color.hex}
                onClick={() => copyToClipboard(color.hex)}
                className="bg-[#222222] border border-[#333333] hover:border-gray-400 rounded-xl p-3 cursor-pointer transition-colors group"
              >
                <div
                  className="h-16 rounded-lg mb-2 shadow-inner flex items-end justify-end p-2 border border-black/20"
                  style={{ backgroundColor: color.hex }}
                >
                  {copiedHex === color.hex && (
                    <span className="text-[10px] font-bold bg-black/80 text-white px-1.5 py-0.5 rounded">
                      Copied!
                    </span>
                  )}
                </div>
                <p className="text-xs font-bold text-white leading-tight">{color.name}</p>
                <p className="text-[11px] font-mono text-[#FF6A0C] mt-0.5 flex items-center justify-between">
                  <span>{color.hex}</span>
                  <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className="text-[10px] text-gray-400 mt-1 leading-snug">{color.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. SUB-BRAND & PILLAR ACCENTS */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#3DB5E6]" />
            <span>Sub-Brand & Pillar Accents</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {subBrandSwatches.map((color) => (
              <div
                key={color.hex}
                onClick={() => copyToClipboard(color.hex)}
                className="bg-[#222222] border border-[#333333] hover:border-gray-400 rounded-xl p-3 cursor-pointer transition-colors group"
              >
                <div
                  className="h-14 rounded-lg mb-2 shadow-inner flex items-end justify-end p-1.5 border border-black/20"
                  style={{ backgroundColor: color.hex }}
                >
                  {copiedHex === color.hex && (
                    <span className="text-[9px] font-bold bg-black/80 text-white px-1 py-0.5 rounded">
                      Copied!
                    </span>
                  )}
                </div>
                <p className="text-xs font-bold text-white leading-tight">{color.name}</p>
                <p className="text-[11px] font-mono text-[#FF6A0C] mt-0.5">{color.hex}</p>
                <p className="text-[10px] text-gray-400 mt-1 leading-snug">{color.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. REUSABLE BUTTON VARIANTS */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#FF6A0C]" />
            <span>Reusable Button Component Variants</span>
          </h4>
          <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-[#181818] border border-[#2E2E2E]">
            <Button variant="primary" size="md">
              Primary (Blaze Orange)
            </Button>
            <Button variant="secondary" size="md">
              Secondary (Industrial)
            </Button>
            <Button variant="revolution" size="md">
              Booking Revolution
            </Button>
            <Button variant="outline-orange" size="md">
              Outline Orange
            </Button>
            <Button variant="ghost" size="md">
              Ghost Button
            </Button>
            <Button variant="primary" size="md" isLoading>
              Loading State
            </Button>
          </div>
        </div>

        {/* 4. REUSABLE BADGES */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#49D67C]" />
            <span>Pillar & Sub-Brand Status Badges</span>
          </h4>
          <div className="flex flex-wrap items-center gap-2.5 p-4 rounded-xl bg-[#181818] border border-[#2E2E2E]">
            <Badge variant="orange">Village Hotel</Badge>
            <Badge variant="gym" icon={<Waves className="w-3 h-3" />}>Gym & Swim</Badge>
            <Badge variant="hiit">HIIT Performance</Badge>
            <Badge variant="pub">Pub & Grill</Badge>
            <Badge variant="vworks">VWorks Coworking</Badge>
            <Badge variant="events">Parties & Events</Badge>
            <Badge variant="revolution">Booking Revolution -£5</Badge>
            <Badge variant="neutral">Industrial Slate</Badge>
          </div>
        </div>

        {/* 5. PROACTIVE NOTICE ALERTS */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <Car className="w-4 h-4 text-[#FF6A0C]" />
            <span>Friction Mitigation Notice Banners</span>
          </h4>
          <div className="space-y-3">
            <NoticeAlert
              type="parking"
              title="ANPR Parking Notice"
              description="Enter your vehicle registration plate in advance or at our lobby screens within 20 minutes of arrival to prevent automatic penalty charges."
            />
            <NoticeAlert
              type="leisure"
              title="Village Gym & Swim Access"
              description="Club Rooms include complimentary unlimited access to the 25m heated pool, sauna, and TechnoGym. Standard rooms can add a pass for just £5/day."
            />
            <NoticeAlert
              type="housekeeping"
              title="The Orange Door Hanger Policy"
              description="We respect your privacy and the environment. For daily room spruce and towel replenishment, simply hang your orange tag out by 11:00 PM."
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
