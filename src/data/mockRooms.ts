import { Room, AddonOption } from '../types';

export const mockRooms: Room[] = [
  {
    id: 'room-standard',
    title: 'Standard Double Room',
    category: 'standard',
    tagline: 'Modern, comfortable & smart essentials',
    description: 'Crisp white linen, comfortable king-size bed, power drench shower, and smart flat screen TV with screen casting.',
    bedType: '1 King Bed or 2 Twin Beds',
    maxAdults: 2,
    maxChildren: 1,
    sqm: 22,
    pricePerNight: 95,
    memberPricePerNight: 90,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    features: [
      'Ensuite bathroom with power drench shower',
      'Smart 40" TV with mobile device casting',
      'Free high-speed Wi-Fi across all areas',
      'Complimentary tea & coffee station',
      'Work desk with USB charging ports',
      'Gym & Pool access available as £5 add-on'
    ],
    includesGymPool: false,
    includesSkyTv: false,
    includesDyson: false,
  },
  {
    id: 'room-club',
    title: 'Village Club Room',
    category: 'club',
    tagline: 'The Ultimate Village Experience with VIP Perks',
    description: 'Upgrade your stay with complimentary Village Gym & Pool access, Dyson Supersonic styling, Sky Cinema & Sports in bed, and premium espresso.',
    bedType: '1 Luxury King Bed',
    maxAdults: 2,
    maxChildren: 1,
    sqm: 28,
    pricePerNight: 125,
    memberPricePerNight: 115,
    popularTag: 'Most Popular Perk Package',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    features: [
      '⚡ FULL VILLAGE GYM & 25M POOL ACCESS INCLUDED',
      'Dyson Supersonic™ Hairdryer & styling bar',
      'Sky Cinema & Sky Sports in full HD on 50" screen',
      'Lavazza Espresso coffee pod machine',
      'Fluffy bathrobes & premium spa toiletries',
      'Complimentary chilled bottled water & snack pack',
      'Priority early check-in & flexible access'
    ],
    includesGymPool: true,
    includesSkyTv: true,
    includesDyson: true,
  },
  {
    id: 'room-family',
    title: 'Family Suite',
    category: 'family',
    tagline: 'Generous space for parents & kids under one roof',
    description: 'Plenty of space for the whole crew with a master double bed, double pull-out sofa bed, and family-friendly pool slots.',
    bedType: '1 King Bed + Double Sofa Bed',
    maxAdults: 2,
    maxChildren: 2,
    sqm: 34,
    pricePerNight: 135,
    memberPricePerNight: 125,
    popularTag: 'Family Favourite',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    features: [
      'Spacious setup with King bed + sofa bed',
      'Dedicated family splash pool hours included',
      'Kids welcome pack at check-in',
      'Large bathroom with tub and separate shower',
      'Smart TV with kids streaming channels',
      'Under-12s Eat for £1 in Pub & Grill with adult main'
    ],
    includesGymPool: true,
    includesSkyTv: false,
    includesDyson: false,
  }
];

export const mockAddons: AddonOption[] = [
  {
    id: 'breakfast_buffet',
    title: 'Hearty Village Breakfast Buffet',
    description: 'Hot sausages, crispy bacon, eggs cooked to order, hash browns, pastries, fruit, and freshly brewed Starbucks roast coffee.',
    price: 12.50,
    perPerson: true,
    perNight: true,
    badge: 'Save £3 vs paying on the day'
  },
  {
    id: 'anpr_parking',
    title: 'Pre-Registered ANPR Parking Pass',
    description: 'Pre-register your vehicle registration plate now so you bypass the lobby terminal and avoid automated parking penalty charge notices.',
    price: 5.00,
    perNight: true,
    badge: 'Proactive No-Fuss ANPR'
  },
  {
    id: 'late_checkout',
    title: 'Late 1:00 PM Check-Out',
    description: 'Keep your room until 1:00 PM (normally 11:00 AM). Perfect for sleeping in, a leisurely workout, or breakfast in bed.',
    price: 20.00,
    perNight: false,
    badge: 'Relax Longer'
  },
  {
    id: 'pub_dining_allowance',
    title: '£30 Pub & Grill Food & Drink Credit',
    description: 'Enjoy craft beers, stacked smash burgers, or sizzling steaks at our vibrant on-site sports gastropub for just £25 (get £5 free credit).',
    price: 25.00,
    perNight: false,
    badge: 'Bonus £5 Credit'
  }
];
