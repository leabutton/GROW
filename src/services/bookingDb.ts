import { BookingRecord } from '../types/booking';
import seedData from '../data/seedBookings.json';

const STORAGE_KEY = 'vh_bookings_db';

class BookingDbService {
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  public getBookings(): BookingRecord[] {
    if (!this.isBrowser()) {
      return seedData as BookingRecord[];
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Initialize with seed data
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
        return seedData as BookingRecord[];
      }
      return JSON.parse(stored) as BookingRecord[];
    } catch (e) {
      console.warn('Error reading from localStorage, falling back to seed data', e);
      return seedData as BookingRecord[];
    }
  }

  public getBookingById(idOrRef: string): BookingRecord | undefined {
    const bookings = this.getBookings();
    const cleanQuery = idOrRef.trim().toUpperCase();
    return bookings.find(
      b => b.id.toUpperCase() === cleanQuery || b.bookingReference.toUpperCase() === cleanQuery
    );
  }

  public findBookingByReg(vehicleReg: string): BookingRecord | undefined {
    const cleanReg = vehicleReg.replace(/\s+/g, '').toUpperCase();
    const bookings = this.getBookings();
    return bookings.find(b => {
      if (!b.anprSafePass?.vehicleReg) return false;
      const bReg = b.anprSafePass.vehicleReg.replace(/\s+/g, '').toUpperCase();
      return bReg === cleanReg;
    });
  }

  public saveBooking(data: Omit<BookingRecord, 'id' | 'createdAt'>): BookingRecord {
    const bookings = this.getBookings();

    // Generate unique VH-2026-XXX reference if not present
    const cityCode = data.hotelName.split(' ').pop()?.slice(0, 3).toUpperCase() || 'RES';
    const randNum = Math.floor(100 + Math.random() * 900);
    const newId = `VH-2026-${cityCode}${randNum}`;
    const newRef = data.bookingReference || newId;

    const newRecord: BookingRecord = {
      ...data,
      id: newId,
      bookingReference: newRef,
      createdAt: new Date().toISOString(),
    };

    const updated = [newRecord, ...bookings];

    if (this.isBrowser()) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent('vh-booking-created', { detail: newRecord }));
      } catch (e) {
        console.error('Error saving booking to localStorage', e);
      }
    }

    return newRecord;
  }

  public resetToSeed(): void {
    if (this.isBrowser()) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
      window.dispatchEvent(new CustomEvent('vh-booking-reset'));
    }
  }
}

export const bookingDb = new BookingDbService();
