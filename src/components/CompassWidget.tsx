import { landmarks } from '@/content/landmarks';

export function CompassWidget() {
  return (
    <section id="heritage" className="py-24 bg-chalk">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="font-serif text-4xl text-center text-indigo mb-16">The Location Matrix</h2>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h3 className="font-sans text-xl uppercase tracking-widest text-sandstone mb-8 border-b border-sandstone/20 pb-4">Distances</h3>
            <ul className="space-y-6">
              {landmarks.map(lm => (
                <li key={lm.name} className="flex justify-between items-end border-b border-indigo/10 pb-2">
                  <div>
                    <span className="block font-serif text-xl text-indigo">{lm.name}</span>
                    <span className="block font-sans text-xs text-indigo/60 uppercase tracking-widest">{lm.distance} • {lm.bearing}</span>
                  </div>
                  <span className="font-sans font-light text-indigo">{lm.walkingTime}</span>
                </li>
              ))}
            </ul>
            <a 
              href="https://maps.google.com/?q=Hotel+Ratnawali+Jodhpur" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-8 font-sans text-sm tracking-widest uppercase text-indigo hover:text-sandstone transition-colors"
            >
              Open in Google Maps →
            </a>
          </div>
          <div className="md:w-1/2 flex justify-center">
            {/* SVG Compass or Map Placeholder */}
            <div className="w-64 h-64 border-2 border-indigo rounded-full flex flex-col items-center justify-center relative bg-indigo/5">
              <span className="absolute top-4 font-sans text-xs uppercase tracking-widest text-indigo font-bold">N</span>
              <span className="absolute bottom-4 font-sans text-xs uppercase tracking-widest text-indigo font-bold">S</span>
              <span className="absolute left-4 font-sans text-xs uppercase tracking-widest text-indigo font-bold">W</span>
              <span className="absolute right-4 font-sans text-xs uppercase tracking-widest text-indigo font-bold">E</span>
              <div className="text-center">
                <span className="block font-serif text-2xl text-indigo">Ratnawali</span>
                <span className="block font-sans text-xs uppercase tracking-widest text-sandstone mt-1">Jodhpur</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
