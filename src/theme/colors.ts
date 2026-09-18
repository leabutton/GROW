/**
 * Village Hotel Club - Official Brand Color System
 * Sourced directly from brand guidelines v2.4 (Section 4)
 */

export const brandColors = {
  // Master Primary Colors
  blazeOrange: '#FF6A0C',     // Master Accent: CTAs, App badges, Room Refresh tags
  blazeOrangeHover: '#E65A00',
  pitchBlack: '#000000',      // Canvas, primary headings, bold framing
  industrialSlate: '#1A1A1A', // Secondary backgrounds, cards, navigation
  slateCard: '#222222',       // Card surface in dark mode
  slateElevated: '#2A2A2A',   // Elevated popovers & modals
  slateBorder: '#333333',     // Clean subtle dividers
  slateMuted: '#9CA3AF',      // Muted secondary copy
  pureWhite: '#FFFFFF',       // Primary light canvas, high-contrast text

  // Sub-Brand & Pillar Accent Colors
  pillars: {
    gymSwim: {
      name: 'Picton Blue',
      hex: '#3DB5E6',
      bgLight: 'rgba(61, 181, 230, 0.15)',
      border: 'rgba(61, 181, 230, 0.3)',
      text: '#3DB5E6',
    },
    performanceHIIT: {
      name: 'Volt Lime',
      hex: '#A8E000',
      bgLight: 'rgba(168, 224, 0, 0.15)',
      border: 'rgba(168, 224, 0, 0.3)',
      text: '#A8E000',
    },
    pubAndGrill: {
      name: 'Craft Amber',
      hex: '#F5A623',
      bgLight: 'rgba(245, 166, 35, 0.15)',
      border: 'rgba(245, 166, 35, 0.3)',
      text: '#F5A623',
    },
    vworks: {
      name: 'Architect Gray',
      hex: '#6B7280',
      bgLight: 'rgba(107, 114, 128, 0.15)',
      border: 'rgba(107, 114, 128, 0.3)',
      text: '#9CA3AF',
    },
    partiesEvents: {
      name: 'Electric Purple',
      hex: '#8B5CF6',
      bgLight: 'rgba(139, 92, 246, 0.15)',
      border: 'rgba(139, 92, 246, 0.3)',
      text: '#8B5CF6',
    },
    bookingRevolution: {
      name: 'Member Green',
      hex: '#49D67C',
      bgLight: 'rgba(73, 214, 124, 0.15)',
      border: 'rgba(73, 214, 124, 0.3)',
      text: '#49D67C',
    }
  }
} as const;

export type PillarType = keyof typeof brandColors.pillars;
