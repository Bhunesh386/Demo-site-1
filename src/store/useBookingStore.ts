import { create } from 'zustand';

export interface BookingState {
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
  selectedRoomId: string | null;
  totalPrice: number;
  bookingRef: string | null;
  setDates: (inDate: Date, outDate: Date) => void;
  setGuests: (adults: number, children: number) => void;
  selectRoom: (roomId: string, price: number) => void;
  setBookingRef: (ref: string) => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  checkIn: null,
  checkOut: null,
  adults: 1,
  children: 0,
  selectedRoomId: null,
  totalPrice: 0,
  bookingRef: null,
  
  setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),
  setGuests: (adults, children) => set({ adults, children }),
  selectRoom: (selectedRoomId, totalPrice) => set({ selectedRoomId, totalPrice }),
  setBookingRef: (bookingRef) => set({ bookingRef }),
  resetBooking: () => set({
    checkIn: null,
    checkOut: null,
    adults: 1,
    children: 0,
    selectedRoomId: null,
    totalPrice: 0,
    bookingRef: null,
  }),
}));
