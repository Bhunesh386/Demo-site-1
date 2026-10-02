import { useState, useRef, useEffect } from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { Calendar, Users, ChevronDown, Plus, Minus } from 'lucide-react';
import { format, addDays, isBefore, startOfToday } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function BookingSearchWidget({ onSearch }: { onSearch: () => void }) {
  const { checkIn, checkOut, adults, children, setDates, setGuests } = useBookingStore();
  
  // Local state for dropdowns
  const [showCalendar, setShowCalendar] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  
  const today = startOfToday();

  // Range selection for DayPicker
  const [range, setRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: checkIn || undefined,
    to: checkOut || undefined,
  });

  useEffect(() => {
    if (range.from && range.to) {
      setDates(range.from, range.to);
    }
  }, [range, setDates]);

  // Click outside handlers
  const calendarRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
      if (guestsRef.current && !guestsRef.current.contains(event.target as Node)) {
        setShowGuests(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGuestChange = (type: 'adults' | 'children', op: 'add' | 'sub') => {
    let newAdults = adults;
    let newChildren = children;
    
    if (type === 'adults') {
      if (op === 'add' && adults < 4) newAdults++;
      if (op === 'sub' && adults > 1) newAdults--;
    } else {
      if (op === 'add' && children < 4) newChildren++;
      if (op === 'sub' && children > 0) newChildren--;
    }
    
    setGuests(newAdults, newChildren);
  };

  return (
    <div className="bg-surface shadow-xl shadow-obsidian/5 border border-divider rounded-sm p-4 md:p-6 w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between relative z-20">
      
      {/* Dates Selection */}
      <div className="relative w-full md:w-auto flex-1" ref={calendarRef}>
        <label className="block text-xs uppercase tracking-widest text-accent mb-2 font-semibold">Select Dates</label>
        <button 
          onClick={() => { setShowCalendar(!showCalendar); setShowGuests(false); }}
          className="w-full flex items-center justify-between border border-divider px-4 py-3 bg-page text-body rounded-sm focus:outline-none focus:border-accent transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-muted" />
            <span>
              {range.from ? format(range.from, 'MMM d, yyyy') : 'Check-in'} &rarr;{' '}
              {range.to ? format(range.to, 'MMM d, yyyy') : 'Check-out'}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-muted" />
        </button>

        {showCalendar && (
          <div className="absolute top-full left-0 mt-2 bg-surface border border-divider shadow-2xl p-4 rounded-sm z-50 animate-in fade-in slide-in-from-top-2">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={(val) => setRange({ from: val?.from, to: val?.to })}
              disabled={{ before: today }}
              numberOfMonths={2}
              pagedNavigation
              className="font-sans"
              classNames={{
                selected: "bg-accent text-page hover:bg-accent hover:text-page",
                range_middle: "bg-accent/10 text-body",
              }}
            />
          </div>
        )}
      </div>

      {/* Guests Selection */}
      <div className="relative w-full md:w-auto flex-1" ref={guestsRef}>
        <label className="block text-xs uppercase tracking-widest text-accent mb-2 font-semibold">Guests</label>
        <button 
          onClick={() => { setShowGuests(!showGuests); setShowCalendar(false); }}
          className="w-full flex items-center justify-between border border-divider px-4 py-3 bg-page text-body rounded-sm focus:outline-none focus:border-accent transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-muted" />
            <span>{adults} Adults, {children} Children</span>
          </div>
          <ChevronDown className="w-4 h-4 text-muted" />
        </button>

        {showGuests && (
          <div className="absolute top-full left-0 w-full md:min-w-[280px] mt-2 bg-surface border border-divider shadow-2xl p-6 rounded-sm z-50 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-semibold text-body">Adults</p>
                <p className="text-xs text-muted">Ages 12 or above</p>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => handleGuestChange('adults', 'sub')} disabled={adults <= 1} className="w-8 h-8 rounded-full border border-divider flex items-center justify-center disabled:opacity-50 text-body hover:border-accent transition-colors"><Minus className="w-4 h-4"/></button>
                <span className="w-4 text-center font-semibold text-body">{adults}</span>
                <button onClick={() => handleGuestChange('adults', 'add')} disabled={adults >= 4} className="w-8 h-8 rounded-full border border-divider flex items-center justify-center disabled:opacity-50 text-body hover:border-accent transition-colors"><Plus className="w-4 h-4"/></button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-body">Children</p>
                <p className="text-xs text-muted">Ages 0 to 11</p>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => handleGuestChange('children', 'sub')} disabled={children <= 0} className="w-8 h-8 rounded-full border border-divider flex items-center justify-center disabled:opacity-50 text-body hover:border-accent transition-colors"><Minus className="w-4 h-4"/></button>
                <span className="w-4 text-center font-semibold text-body">{children}</span>
                <button onClick={() => handleGuestChange('children', 'add')} disabled={children >= 4} className="w-8 h-8 rounded-full border border-divider flex items-center justify-center disabled:opacity-50 text-body hover:border-accent transition-colors"><Plus className="w-4 h-4"/></button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="w-full md:w-auto mt-6 md:mt-0 flex items-end">
        <button 
          onClick={onSearch}
          disabled={!range.from || !range.to}
          className="w-full md:w-auto px-8 py-3 h-[50px] bg-accent text-page uppercase tracking-widest text-xs font-semibold hover:bg-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          Check Availability
        </button>
      </div>

    </div>
  );
}
