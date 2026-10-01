import { notFound } from 'next/navigation';
import { rooms } from '@/content/rooms';
import Link from 'next/link';
import { BookingWidget } from '@/components/BookingWidget';

export function generateStaticParams() {
  return rooms.map((room) => ({
    slug: room.slug,
  }));
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const room = rooms.find(r => r.slug === resolvedParams.slug);
  
  if (!room) {
    notFound();
  }

  const priceINR = (room.basePrice / 100).toLocaleString('en-IN');

  return (
    <div className="pt-24 pb-24 container mx-auto px-4 max-w-4xl">
      <Link href="/#rooms" className="font-sans text-sm tracking-widest uppercase text-indigo/60 hover:text-indigo mb-8 inline-block">
        ← Back to all rooms
      </Link>
      
      <div className="h-96 bg-indigo/5 relative overflow-hidden mb-12 flex items-center justify-center border border-indigo/10">
        <span className="font-sans text-indigo/30 uppercase tracking-widest">{room.name} Image</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="md:w-2/3">
          <h1 className="font-serif text-5xl text-indigo mb-6">{room.name}</h1>
          <p className="font-sans text-xl font-light text-indigo/80 mb-10 leading-relaxed">
            {room.description}
          </p>
          
          <h2 className="font-sans text-lg uppercase tracking-widest text-sandstone mb-4">Features</h2>
          <ul className="grid grid-cols-2 gap-4 mb-10">
            {room.features.map(f => (
              <li key={f} className="font-sans text-indigo/80 flex items-center before:content-[''] before:block before:w-1.5 before:h-1.5 before:bg-sandstone before:mr-3">
                {f}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="md:w-1/3 sticky top-24">
          <div className="bg-chalk p-8 border border-indigo/10 text-center">
            <span className="block font-sans text-4xl text-indigo mb-2">₹{priceINR}</span>
            <span className="block font-sans text-xs text-indigo/60 uppercase tracking-widest">+ taxes / night</span>
          </div>
          <BookingWidget roomTypeSlug={room.slug} roomName={room.name} price={room.basePrice} />
        </div>
      </div>
    </div>
  );
}
