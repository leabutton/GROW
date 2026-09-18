import React from 'react';
import { BedDouble, Dumbbell, UtensilsCrossed, Briefcase, PartyPopper } from 'lucide-react';

export interface SubBrandBarProps {
  activePillar?: string;
  onSelectPillar?: (pillar: string) => void;
}

export const SubBrandBar: React.FC<SubBrandBarProps> = ({
  activePillar = 'stay',
  onSelectPillar,
}) => {
  const pillars = [
    {
      id: 'stay',
      name: 'Stay & Sleep',
      descriptor: 'Village Hotel',
      icon: <BedDouble className="w-4 h-4" />,
      color: '#FF6A0C',
      accentClass: 'hover:text-[#FF6A0C] border-b-2',
      activeClass: 'border-[#FF6A0C] text-[#FF6A0C]',
    },
    {
      id: 'gym',
      name: 'Gym & Swim',
      descriptor: 'Village Gym',
      icon: <Dumbbell className="w-4 h-4" />,
      color: '#3DB5E6',
      accentClass: 'hover:text-[#3DB5E6] border-b-2',
      activeClass: 'border-[#3DB5E6] text-[#3DB5E6]',
    },
    {
      id: 'eat',
      name: 'Eat & Drink',
      descriptor: 'Pub & Grill & Starbucks',
      icon: <UtensilsCrossed className="w-4 h-4" />,
      color: '#F5A623',
      accentClass: 'hover:text-[#F5A623] border-b-2',
      activeClass: 'border-[#F5A623] text-[#F5A623]',
    },
    {
      id: 'work',
      name: 'Work & Meet',
      descriptor: 'VWorks Coworking',
      icon: <Briefcase className="w-4 h-4" />,
      color: '#9CA3AF',
      accentClass: 'hover:text-gray-300 border-b-2',
      activeClass: 'border-gray-400 text-white',
    },
    {
      id: 'events',
      name: 'Parties & Events',
      descriptor: 'Tribute Nights & Weddings',
      icon: <PartyPopper className="w-4 h-4" />,
      color: '#8B5CF6',
      accentClass: 'hover:text-[#8B5CF6] border-b-2',
      activeClass: 'border-[#8B5CF6] text-[#8B5CF6]',
    },
  ];

  return (
    <div className="bg-[#141414] border-b border-[#262626] hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between text-xs font-semibold py-2">
          <div className="text-gray-400 font-mono tracking-widest uppercase text-[10px] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A0C]"></span>
            Everything Under One Roof:
          </div>
          <div className="flex items-center space-x-6">
            {pillars.map((pillar) => {
              const isActive = activePillar === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => onSelectPillar && onSelectPillar(pillar.id)}
                  className={`flex items-center gap-1.5 py-1 transition-all duration-150 ${
                    isActive
                      ? `${pillar.activeClass} font-bold`
                      : 'text-gray-400 hover:text-white border-transparent'
                  }`}
                >
                  <span style={{ color: isActive ? pillar.color : undefined }}>{pillar.icon}</span>
                  <span>{pillar.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
