import { amenities } from '@/content/amenities';

export function Amenities() {
  return (
    <section className="py-16 md:py-24 bg-indigo text-chalk">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-12 md:mb-16">Hotel Amenities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-4xl mx-auto">
          {amenities.map(group => (
            <div key={group.category}>
              <h3 className="font-sans text-lg md:text-xl uppercase tracking-widest text-sandstone mb-4 md:mb-6 border-b border-sandstone/20 pb-4">
                {group.category}
              </h3>
              <ul className="space-y-3 md:space-y-4">
                {group.items.map(item => (
                  <li key={item} className="font-sans font-light text-base md:text-lg opacity-90">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
