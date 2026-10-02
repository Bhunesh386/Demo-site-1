import { notFound } from 'next/navigation';
import { rooms } from '@/content/rooms';
import Link from 'next/link';
import { BookingWidget } from '@/components/BookingWidget';
import { RoomGallery } from '@/components/RoomGallery';
import { roomGalleries } from '@/data/images';
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

  const gallery = roomGalleries[room.slug];
  const heroImage = gallery?.[0];

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
      images: heroImage
        ? [
            {
              url: heroImage.src,
              width: heroImage.width,
              height: 630, // social crop
              alt: heroImage.alt,
            },
          ]
        : [],
    },
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

  const gallery = roomGalleries[room.slug] ?? [];
  const heroImage = gallery[0];

  // JSON-LD: Hotel + HotelRoom
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: room.name,
    description: room.description,
    image: heroImage ? `https://hotelratnawalijodhpur.com${heroImage.src}` : undefined,
    bed: {
      '@type': 'BedDetails',
      typeOfBed: 'King/Twin',
    },
    occupancy: {
      '@type': 'QuantitativeValue',
      value: room.capacity.replace('[CONFIRM] ', ''),
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
          <ol className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-muted">
            <li><Link href="/" className="md:hover:text-accent transition-colors">Home</Link></li>
            <li aria-hidden="true" className="text-muted">›</li>
            <li><Link href="/rooms" className="md:hover:text-accent transition-colors">Rooms</Link></li>
            <li aria-hidden="true" className="text-muted">›</li>
            <li className="text-accent" aria-current="page">{room.name}</li>
          </ol>
        </nav>
        
        {/* Room gallery — full width hero with dots and swipe on detail page */}
        <div className="h-[40vh] md:h-96 relative overflow-hidden mb-8 md:mb-12 border border-dark/10 rounded-sm">
          {gallery.length > 0 ? (
            <RoomGallery
              images={gallery}
              showControls={gallery.length > 1}
              sizes="(max-width: 768px) 100vw, 896px"
              className="absolute inset-0"
            />
          ) : null}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
          <div className="w-full md:w-2/3">
            <h1 className="font-serif text-3xl md:text-5xl text-body mb-4 md:mb-6">{room.name}</h1>
            <p className="font-sans text-base md:text-xl font-light text-body/80 mb-8 md:mb-10 leading-relaxed">
              {room.description}
            </p>
            
            <h2 className="font-sans text-base md:text-lg uppercase tracking-widest text-accent mb-4">Features</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-10">
              {room.features.map(f => (
                <li key={f} className="font-sans text-sm md:text-base text-body/80 flex items-center before:content-[''] before:block before:w-1.5 before:h-1.5 before:bg-accent before:mr-3">
                  {f}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="w-full md:w-1/3 md:sticky md:top-24">
            <div className="bg-page p-6 md:p-8 border border-dark/10 text-center rounded-sm">
              <span className="block font-sans text-3xl md:text-4xl text-body mb-2">₹{priceINR}</span>
              <span className="block font-sans text-[10px] md:text-xs text-muted uppercase tracking-widest">+ taxes / night</span>
            </div>
            <BookingWidget roomTypeSlug={room.slug} roomName={room.name} price={room.basePrice} />
          </div>
        </div>
      </div>
    </>
  );
}
