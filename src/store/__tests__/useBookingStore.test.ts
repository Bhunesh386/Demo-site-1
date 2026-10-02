import { describe, it, expect, beforeEach } from 'vitest';
import { useBookingStore } from '../useBookingStore';

describe('useBookingStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useBookingStore.setState({
      checkIn: null,
      checkOut: null,
      adults: 1,
      children: 0,
      selectedRoomId: null,
      totalPrice: 0,
    });
  });

  it('initializes with default values', () => {
    const state = useBookingStore.getState();
    expect(state.checkIn).toBeNull();
    expect(state.checkOut).toBeNull();
    expect(state.adults).toBe(1);
    expect(state.children).toBe(0);
    expect(state.selectedRoomId).toBeNull();
    expect(state.totalPrice).toBe(0);
  });

  it('sets dates correctly', () => {
    const checkIn = new Date('2026-11-01');
    const checkOut = new Date('2026-11-05');
    
    useBookingStore.getState().setDates(checkIn, checkOut);
    
    const state = useBookingStore.getState();
    expect(state.checkIn).toEqual(checkIn);
    expect(state.checkOut).toEqual(checkOut);
  });

  it('sets guests correctly', () => {
    useBookingStore.getState().setGuests(2, 1);
    
    const state = useBookingStore.getState();
    expect(state.adults).toBe(2);
    expect(state.children).toBe(1);
  });

  it('selects room and price correctly', () => {
    useBookingStore.getState().selectRoom('deluxe-01', 9000);
    
    const state = useBookingStore.getState();
    expect(state.selectedRoomId).toBe('deluxe-01');
    expect(state.totalPrice).toBe(9000);
  });

  it('resets booking to default values', () => {
    // Setup state
    useBookingStore.setState({
      checkIn: new Date('2026-11-01'),
      checkOut: new Date('2026-11-05'),
      adults: 2,
      children: 1,
      selectedRoomId: 'deluxe-01',
      totalPrice: 9000,
    });

    useBookingStore.getState().resetBooking();
    
    const state = useBookingStore.getState();
    expect(state.checkIn).toBeNull();
    expect(state.checkOut).toBeNull();
    expect(state.adults).toBe(1);
    expect(state.children).toBe(0);
    expect(state.selectedRoomId).toBeNull();
    expect(state.totalPrice).toBe(0);
  });
});
