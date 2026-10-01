import Link from 'next/link';
import { type RoomType } from '@/content/rooms';

export function RoomCard({ room }: { room: RoomType }) {
  // paise to INR
  const priceINR = (room.basePrice / 100).toLocaleString('en-IN');

  return (
    <div className="group flex flex-col md:flex-row bg-chalk border border-indigo/10 overflow-hidden md:hover:border-indigo/30 transition-colors">
      <div className="w-full md:w-1/3 h-[40vh] md:h-auto bg-indigo/5 relative overflow-hidden">
        {/* Placeholder for Room Image */}
        <div className="absolute inset-0 flex items-center justify-center text-indigo/30 font-sans text-sm uppercase tracking-widest">
          {room.name} Image
        </div>
      </div>
      <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
            <h3 className="font-serif text-2xl md:text-3xl text-indigo mb-2 md:mb-0">{room.name}</h3>
            <div className="md:text-right">
              <span className="block font-sans text-lg md:text-xl text-indigo">₹{priceINR}</span>
              <span className="block font-sans text-xs text-indigo/60 uppercase tracking-widest">+ taxes / night</span>
            </div>
          </div>
          <p className="font-sans text-indigo/80 mb-6 font-light">{room.description}</p>
          <ul className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 mb-8">
            {room.features.slice(0, 3).map(f => (
              <li key={f} className="font-sans text-xs md:text-sm text-indigo/70 flex items-center before:content-[''] before:block before:w-1.5 before:h-1.5 before:bg-sandstone before:mr-2">
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-auto">
          <Link 
            href={`/rooms/${room.slug}`}
            className="flex items-center justify-center min-h-[44px] px-6 py-3 border border-indigo text-indigo md:hover:bg-indigo md:hover:text-chalk transition-colors font-sans text-sm tracking-widest uppercase text-center w-full md:w-auto"
          >
            View Details
          </Link>
          <Link 
            href={`/?room=${room.slug}#booking`}
            className="flex items-center justify-center min-h-[44px] px-6 py-3 bg-sandstone text-indigo md:hover:bg-chalk border border-sandstone transition-colors font-sans text-sm tracking-widest uppercase text-center w-full md:w-auto"
          >
            Book this room
          </Link>
        </div>
      </div>
    </div>
  );
}
