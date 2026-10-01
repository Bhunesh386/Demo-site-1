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
    <div id="booking" className="bg-chalk p-6 border border-indigo/10 mt-12">
      <h3 className="font-serif text-2xl text-indigo mb-6">Request Reservation</h3>
      
      <div className="mb-6">
        <label className="block font-sans text-sm uppercase tracking-widest text-indigo/60 mb-2">Select Dates</label>
        <div className="bg-white p-4 border border-indigo/10 overflow-auto flex justify-center">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            disabled={disabledDays}
            className="font-sans text-indigo"
            modifiersStyles={{
              selected: { backgroundColor: 'var(--color-sandstone)', color: 'var(--color-indigo)' }
            }}
          />
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="flex-1">
          <label className="block font-sans text-sm uppercase tracking-widest text-indigo/60 mb-2">Adults</label>
          <input 
            type="number" 
            min="1" max="4" 
            value={adults} 
            onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
            className="w-full border border-indigo/20 p-2 font-sans bg-transparent"
          />
        </div>
        <div className="flex-1">
          <label className="block font-sans text-sm uppercase tracking-widest text-indigo/60 mb-2">Children</label>
          <input 
            type="number" 
            min="0" max="4" 
            value={children} 
            onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
            className="w-full border border-indigo/20 p-2 font-sans bg-transparent"
          />
        </div>
      </div>

      <button 
        onClick={handleBook}
        disabled={!range?.from || !range?.to}
        className="w-full px-6 py-4 bg-indigo text-chalk hover:bg-indigo/90 transition-colors font-sans text-sm tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue to WhatsApp
      </button>
    </div>
  );
}
