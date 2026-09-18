export type Region = 
  | 'All' 
  | 'Midlands'
  | 'North of England'
  | 'Scotland'
  | 'South of England'
  | 'Wales';

export interface HotelAmenities {
  pool: boolean;
  gym: boolean;
  starbucks: boolean;
  pubAndGrill: boolean;
  vworks: boolean;
  evCharging: boolean;
  parkingCharge: string;
  parkingValidationNeeded: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  region: Region;
  city: string;
  address: string;
  googleRating: number;
  reviewCount: number;
  basePrice: number;
  memberPrice: number;
  image: string;
  amenities: HotelAmenities;
  complaintMitigationTips: string;
  description: string;
  highlights: string[];
}

export interface Room {
  id: string;
  title: string;
  category: 'standard' | 'club' | 'family';
  tagline: string;
  description: string;
  bedType: string;
  maxAdults: number;
  maxChildren: number;
  sqm: number;
  pricePerNight: number;
  memberPricePerNight: number;
  image: string;
  features: string[];
  includesGymPool: boolean;
  includesSkyTv: boolean;
  includesDyson: boolean;
  popularTag?: string;
}

export interface AddonOption {
  id: string;
  title: string;
  description: string;
  price: number;
  perPerson?: boolean;
  perNight?: boolean;
  badge?: string;
}

export interface BookingSearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  isMember: boolean;
  promoCode: string;
}

export interface ActiveBooking {
  bookingId: string;
  hotel: Hotel;
  room: Room;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  roomsCount: number;
  selectedAddons: string[];
  carRegistration: string;
  isMember: boolean;
  guestName: string;
  guestEmail: string;
  subtotal: number;
  memberDiscount: number;
  addonsTotal: number;
  grandTotal: number;
}
