import Link from 'next/link';
import { type RoomType } from '@/content/rooms';

export function RoomCard({ room }: { room: RoomType }) {
  // paise to INR
  const priceINR = (room.basePrice / 100).toLocaleString('en-IN');

  return (
    <div className="group flex flex-col md:flex-row bg-chalk border border-indigo/10 overflow-hidden hover:border-indigo/30 transition-colors">
      <div className="md:w-1/3 h-64 md:h-auto bg-indigo/5 relative overflow-hidden">
        {/* Placeholder for Room Image */}
        <div className="absolute inset-0 flex items-center justify-center text-indigo/30 font-sans text-sm uppercase tracking-widest">
          {room.name} Image
        </div>
      </div>
      <div className="md:w-2/3 p-8 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-serif text-3xl text-indigo">{room.name}</h3>
            <div className="text-right">
              <span className="block font-sans text-xl text-indigo">₹{priceINR}</span>
              <span className="block font-sans text-xs text-indigo/60 uppercase tracking-widest">+ taxes / night</span>
            </div>
          </div>
          <p className="font-sans text-indigo/80 mb-6 font-light">{room.description}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
            {room.features.slice(0, 3).map(f => (
              <li key={f} className="font-sans text-sm text-indigo/70 flex items-center before:content-[''] before:block before:w-1.5 before:h-1.5 before:bg-sandstone before:mr-2">
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-4">
          <Link 
            href={`/rooms/${room.slug}`}
            className="inline-block px-6 py-3 border border-indigo text-indigo hover:bg-indigo hover:text-chalk transition-colors font-sans text-sm tracking-widest uppercase"
          >
            View Details
          </Link>
          <Link 
            href={`/?room=${room.slug}#booking`}
            className="inline-block px-6 py-3 bg-sandstone text-indigo hover:bg-chalk border border-sandstone transition-colors font-sans text-sm tracking-widest uppercase"
          >
            Book this room
          </Link>
        </div>
      </div>
    </div>
  );
}
