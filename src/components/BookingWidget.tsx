'use client';

import { useState } from 'react';
import { format, addDays } from 'date-fns';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { buildWhatsAppMessage } from '@/lib/whatsapp';

export function BookingWidget({ roomTypeSlug, roomName, price }: { roomTypeSlug: string, roomName: string, price: number }) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const handleBook = () => {
    if (!range?.from || !range?.to) return;
    const waLink = buildWhatsAppMessage({
      roomType: roomName,
      checkIn: format(range.from, 'yyyy-MM-dd'),
      checkOut: format(range.to, 'yyyy-MM-dd'),
      adults,
      children
    });
    window.open(waLink, '_blank');
  };

  // Restrict to future dates
  const disabledDays = { before: new Date() };

  return (
    <div id="booking" className="bg-alabaster p-6 border border-obsidian/10 mt-12 rounded-sm shadow-md">
      <h3 className="font-serif text-2xl text-obsidian mb-6">Request Reservation</h3>
      
      <div className="mb-6">
        <label className="block font-sans text-sm uppercase tracking-widest text-obsidian/60 mb-2">Select Dates</label>
        <div className="bg-white p-4 border border-obsidian/10 overflow-auto flex justify-center rounded-sm">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            disabled={disabledDays}
            className="font-sans text-obsidian"
            modifiersStyles={{
              selected: { backgroundColor: 'var(--color-champagne)', color: 'var(--color-alabaster)' }
            }}
          />
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="flex-1">
          <label className="block font-sans text-sm uppercase tracking-widest text-obsidian/60 mb-2">Adults</label>
          <input 
            type="number" 
            min="1" max="4" 
            value={adults} 
            onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
            className="w-full border border-obsidian/20 p-2 font-sans bg-transparent min-h-[44px] rounded-none focus:border-champagne focus:outline-none transition-colors"
          />
        </div>
        <div className="flex-1">
          <label className="block font-sans text-sm uppercase tracking-widest text-obsidian/60 mb-2">Children</label>
          <input 
            type="number" 
            min="0" max="4" 
            value={children} 
            onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
            className="w-full border border-obsidian/20 p-2 font-sans bg-transparent min-h-[44px] rounded-none focus:border-champagne focus:outline-none transition-colors"
          />
        </div>
      </div>

      <button 
        onClick={handleBook}
        disabled={!range?.from || !range?.to}
        className="w-full min-h-[44px] px-6 py-4 bg-obsidian text-alabaster md:hover:bg-champagne transition-colors duration-300 font-sans text-sm tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed rounded-sm shadow-sm md:hover:shadow-champagne/30"
      >
        Continue to WhatsApp
      </button>
    </div>
  );
}
