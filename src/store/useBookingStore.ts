import { create } from 'zustand';

export interface BookingState {
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
  selectedRoomId: string | null;
  totalPrice: number;
  setDates: (inDate: Date, outDate: Date) => void;
  setGuests: (adults: number, children: number) => void;
  selectRoom: (roomId: string, price: number) => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  checkIn: null,
  checkOut: null,
  adults: 1,
  children: 0,
  selectedRoomId: null,
  totalPrice: 0,
  
  setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),
  setGuests: (adults, children) => set({ adults, children }),
  selectRoom: (selectedRoomId, totalPrice) => set({ selectedRoomId, totalPrice }),
  resetBooking: () => set({
    checkIn: null,
    checkOut: null,
    adults: 1,
    children: 0,
    selectedRoomId: null,
    totalPrice: 0,
  }),
}));
