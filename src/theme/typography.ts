/**
 * Village Hotel Club - Typography Tokens
 * Sourced from Brand Guidelines Section 5
 */

export const typography = {
  fontFamilies: {
    heading: 'Montserrat, sans-serif',
    body: 'Inter, sans-serif',
  },
  hierarchy: {
    display: 'text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight',
    h1: 'text-3xl md:text-4xl font-bold tracking-tight',
    h2: 'text-2xl md:text-3xl font-bold',
    h3: 'text-lg md:text-xl font-semibold',
    bodyLarge: 'text-lg font-normal leading-relaxed',
    bodyRegular: 'text-base font-normal leading-normal',
    bodyMedium: 'text-base font-medium leading-normal',
    caption: 'text-xs md:text-sm font-medium text-village-slate-muted',
    badge: 'text-xs font-semibold uppercase tracking-wider',
  }
} as const;
