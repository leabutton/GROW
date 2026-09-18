import React, { useState } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';

export interface NavbarProps {
  isMember: boolean;
  onToggleMember: () => void;
  onSelectNav?: (item: string) => void;
  onOpenBooking?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMember,
  onToggleMember,
  onSelectNav,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Stay & Sleep', id: 'stay', href: '#hotels-section' },
    { label: 'Eat & Drink', id: 'eat', href: '#hotels-section' },
    { label: 'Gym & Swim', id: 'gym', href: '#hotels-section' },
    { label: 'Work & Meet', id: 'work', href: '#hotels-section' },
    { label: 'Parties & Events', id: 'events', href: '#hotels-section' },
    { label: 'Offers', id: 'offers', href: '#deals-section' },
  ];

  const handleNavClick = (id: string) => {
    if (onSelectNav) onSelectNav(id);
    setMobileMenuOpen(false);
  };

  return (
    <header id="site-header" className="sticky top-0 z-50 bg-[#000000] border-b border-[#222222] transition-all">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[74px]">
          {/* Left: Hamburger & Brand Logo */}
          <div className="flex items-center gap-5">
            {/* Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-white hover:text-[#49D67C] focus:outline-none transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <div className="w-6 flex flex-col gap-1.5">
                  <span className="w-6 h-[2px] bg-white block"></span>
                  <span className="w-6 h-[2px] bg-white block"></span>
                  <span className="w-4 h-[2px] bg-white block"></span>
                </div>
              )}
            </button>

            {/* Official Village Hotel Club SVG Logo */}
            <a 
              href="#site-header"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center py-2"
              aria-label="Village Hotels Home"
            >
              <img
                src="https://image-tc.galaxy.tf/wisvg-9figbouk9zfn14ue5jbv5sbmz/village-hotel-club-white.svg"
                alt="Village Hotel Club"
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </a>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center space-x-7">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                  const el = document.querySelector(item.href);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[13px] font-bold text-white tracking-[1.3px] uppercase hover:text-[#49D67C] transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Booking Revolution Portal */}
          <div className="flex items-center gap-3">
            {/* Membership Status Badge Toggle */}
            <button
              type="button"
              onClick={onToggleMember}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                isMember
                  ? 'bg-[#49D67C]/15 border-[#49D67C] text-[#49D67C]'
                  : 'bg-[#151515] border-[#333333] text-gray-300 hover:border-gray-400'
              }`}
              title="Toggle member status"
            >
              <span className={`w-2 h-2 rounded-full ${isMember ? 'bg-[#49D67C] animate-pulse' : 'bg-gray-500'}`} />
              <span className="hidden sm:inline">Booking Revolution:</span>
              <span className="font-bold">{isMember ? '£5 Discount Active' : 'Off'}</span>
            </button>

            {/* Join / Sign In Button styled like live site */}
            <button
              type="button"
              onClick={onToggleMember}
              className="flex items-center gap-2 bg-transparent hover:bg-white/10 border border-white/30 hover:border-white px-3.5 py-2 text-white text-xs font-bold tracking-[1.2px] uppercase transition-all cursor-pointer"
            >
              <img
                src="https://image-tc.galaxy.tf/wiwebp-3e1y5vrqn5912nmypxm0n44st/gp-login-icon.webp"
                alt="Member portal icon"
                className="w-4 h-4 object-contain invert"
              />
              <span className="hidden md:inline">{isMember ? 'Member Account' : 'Join for Free / Sign In'}</span>
              <span className="md:hidden">{isMember ? 'Account' : 'Sign In'}</span>
            </button>

            {/* Quick Book Button */}
            {onOpenBooking && (
              <button
                type="button"
                onClick={onOpenBooking}
                className="hidden sm:inline-block bg-[#49D67C] text-black font-extrabold text-xs tracking-[1.4px] uppercase px-4 py-2 hover:bg-white transition-colors cursor-pointer"
              >
                Book Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0A0A0A] border-b border-[#222222] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                  const el = document.querySelector(item.href);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-base font-bold text-white tracking-wider uppercase hover:text-[#49D67C] py-2 border-b border-[#1A1A1A]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                onToggleMember();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#49D67C] text-black font-bold uppercase tracking-wider py-3 text-sm text-center cursor-pointer"
            >
              {isMember ? 'Booking Revolution Active (-£5)' : 'Join Booking Revolution For Free'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
