export interface AnprSafePass {
  vehicleReg: string;
  isWhitelisted: boolean;
  passIssuedAt: string;
  pcnProtectionGuarantee: boolean;
}

export interface BookingRecord {
  id: string; // e.g. "VH-2026-MAN842"
  bookingReference: string;
  hotelId: string;
  hotelName: string;
  roomId: string;
  roomTitle: string;
  packageType: 'standard_custom' | 'club_perks_bundle' | 'family_stay';
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  guestName: string;
  guestEmail: string;
  anprSafePass?: AnprSafePass;
  selectedAddons: string[];
  specialRequests: string[]; // e.g. ["High floor quiet sanctuary requested", "Orange hanger reminder enabled"]
  pricing: {
    roomTotal: number;
    addonsTotal: number;
    memberSavings: number;
    grandTotal: number;
    vatPortion: number;
  };
  status: 'confirmed' | 'checked_in' | 'completed';
  createdAt: string;
}

export interface CopilotChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  widgetType?: 'package_comparison' | 'anpr_pass' | 'booking_record' | 'booking_confirmed';
  widgetData?: any;
}
