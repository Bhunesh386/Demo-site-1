import { notFound } from 'next/navigation';
import { rooms } from '@/content/rooms';
import Link from 'next/link';
import Image from 'next/image';
import { BookingWidget } from '@/components/BookingWidget';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return rooms.map((room) => ({
    slug: room.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const room = rooms.find(r => r.slug === resolvedParams.slug);
  
  if (!room) {
    return { title: 'Room Not Found' };
  }

  const roomImageMap: Record<string, string> = {
    'deluxe': '/images/room-standard.jpg',
    'super-deluxe': '/images/room-deluxe.jpg',
    'ratnawali-royal-suite': '/images/room-family.jpg'
  };
  const imgUrl = roomImageMap[room.slug] || '/images/room-standard.jpg';

  return {
    title: `${room.name} | Hotel Ratnawali Jodhpur`,
    description: room.description,
    alternates: {
      canonical: `https://hotelratnawalijodhpur.com/rooms/${room.slug}`,
    },
    openGraph: {
      title: `${room.name} | Hotel Ratnawali Jodhpur`,
      description: room.description,
      url: `https://hotelratnawalijodhpur.com/rooms/${room.slug}`,
      images: [
        {
          url: imgUrl,
          width: 1200,
          height: 630,
          alt: `${room.name} at Hotel Ratnawali Jodhpur`,
        },
      ],
    }
  };
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const room = rooms.find(r => r.slug === resolvedParams.slug);
  
  if (!room) {
    notFound();
  }

  const priceINR = (room.basePrice / 100).toLocaleString('en-IN');
  const priceNumeric = (room.basePrice / 100).toString();

  const roomImageMap: Record<string, string> = {
    'deluxe': '/images/room-standard.jpg',
    'super-deluxe': '/images/room-deluxe.jpg',
    'ratnawali-royal-suite': '/images/room-family.jpg'
  };
  const imgUrl = roomImageMap[room.slug] || '/images/room-standard.jpg';

  // JSON-LD: Hotel + HotelRoom
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: room.name,
    description: room.description,
    image: `https://hotelratnawalijodhpur.com${imgUrl}`,
    bed: {
      '@type': 'BedDetails',
      typeOfBed: 'King/Twin',
    },
    occupancy: {
      '@type': 'QuantitativeValue',
      value: room.capacity.replace('[CONFIRM] ', ''), // Fallback stripping
    },
    amenityFeature: room.features.map(f => ({
      '@type': 'LocationFeatureSpecification',
      name: f,
      value: true
    })),
    containedInPlace: {
      '@type': 'Hotel',
      name: 'Hotel Ratnawali Jodhpur',
      url: 'https://hotelratnawalijodhpur.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '149–150, Nai Sarak',
        addressLocality: 'Jodhpur',
        addressRegion: 'Rajasthan',
        postalCode: '342001',
        addressCountry: 'IN',
      }
    },
    offers: {
      '@type': 'Offer',
      price: priceNumeric,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `https://hotelratnawalijodhpur.com/rooms/${room.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <div className="pt-24 pb-24 container mx-auto px-4 max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-6 md:mb-8 pt-4">
          <ol className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-obsidian/50">
            <li><Link href="/" className="md:hover:text-champagne transition-colors">Home</Link></li>
            <li aria-hidden="true" className="text-obsidian/30">›</li>
            <li><Link href="/rooms" className="md:hover:text-champagne transition-colors">Rooms</Link></li>
            <li aria-hidden="true" className="text-obsidian/30">›</li>
            <li className="text-champagne" aria-current="page">{room.name}</li>
          </ol>
        </nav>
        
        <div className="h-[40vh] md:h-96 relative overflow-hidden mb-8 md:mb-12 border border-obsidian/10 rounded-sm">
          <Image 
            src={imgUrl}
            alt={`${room.name} interior at Hotel Ratnawali Jodhpur`}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            priority
            className="object-cover"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
          <div className="w-full md:w-2/3">
            <h1 className="font-serif text-3xl md:text-5xl text-obsidian mb-4 md:mb-6">{room.name}</h1>
            <p className="font-sans text-base md:text-xl font-light text-obsidian/80 mb-8 md:mb-10 leading-relaxed">
              {room.description}
            </p>
            
            <h2 className="font-sans text-base md:text-lg uppercase tracking-widest text-champagne mb-4">Features</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-10">
              {room.features.map(f => (
                <li key={f} className="font-sans text-sm md:text-base text-obsidian/80 flex items-center before:content-[''] before:block before:w-1.5 before:h-1.5 before:bg-champagne before:mr-3">
                  {f}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="w-full md:w-1/3 md:sticky md:top-24">
            <div className="bg-alabaster p-6 md:p-8 border border-obsidian/10 text-center rounded-sm">
              <span className="block font-sans text-3xl md:text-4xl text-obsidian mb-2">₹{priceINR}</span>
              <span className="block font-sans text-[10px] md:text-xs text-obsidian/60 uppercase tracking-widest">+ taxes / night</span>
            </div>
            <BookingWidget roomTypeSlug={room.slug} roomName={room.name} price={room.basePrice} />
          </div>
        </div>
      </div>
    </>
  );
}
