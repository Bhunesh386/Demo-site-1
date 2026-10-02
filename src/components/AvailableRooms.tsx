import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { differenceInDays } from 'date-fns';
import { useBookingStore } from '@/store/useBookingStore';
import { rooms } from '@/data/rooms';
import { Check } from 'lucide-react';

export default function AvailableRooms() {
  const router = useRouter();
  const { checkIn, checkOut, selectRoom } = useBookingStore();

  if (!checkIn || !checkOut) return null;

  const nights = differenceInDays(checkOut, checkIn);
  // Ensure at least 1 night
  const validNights = Math.max(1, nights);

  const handleSelectRoom = (roomId: string, price: number) => {
    selectRoom(roomId, price);
    router.push('/book/checkout');
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-16 max-w-5xl mx-auto space-y-8"
    >
      <h2 className="font-serif text-3xl text-body mb-8 text-center md:text-left">Available Accommodations</h2>
      
      {rooms.map(room => (
        <motion.div 
          key={room.id}
          variants={item}
          className="bg-surface border border-divider shadow-md rounded-sm overflow-hidden flex flex-col md:flex-row group"
        >
          {/* Image */}
          <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
            <Image 
              src={room.image} 
              alt={room.name} 
              fill 
              className="object-cover transition-transform duration-1000 md:group-hover:scale-105"
            />
          </div>
          
          {/* Details */}
          <div className="p-6 md:p-8 w-full md:w-3/5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-serif text-2xl md:text-3xl text-body">{room.name}</h3>
                <div className="text-right">
                  <p className="font-sans text-xl md:text-2xl text-body font-semibold">₹{room.pricePerNight * validNights}</p>
                  <p className="text-xs text-muted uppercase tracking-widest">For {validNights} Night{validNights > 1 ? 's' : ''}</p>
                </div>
              </div>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                {room.amenities.map(amenity => (
                  <li key={amenity} className="flex items-center gap-2 text-sm text-body/80 font-sans">
                    <Check className="w-4 h-4 text-accent" />
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-between items-center border-t border-divider pt-6">
              <p className="text-sm text-muted">
                Max Occupancy: {room.capacity.adults} Adults, {room.capacity.children} Children
              </p>
              <button 
                onClick={() => handleSelectRoom(room.id, room.pricePerNight * validNights)}
                className="px-8 py-3 bg-transparent border border-accent text-accent hover:bg-accent hover:text-page transition-colors uppercase tracking-widest text-xs font-semibold rounded-sm"
              >
                Select Room
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
