import { amenities } from '@/content/amenities';

export function Amenities() {
  return (
    <section className="py-24 bg-indigo text-chalk">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-4xl text-center mb-16">Hotel Amenities</h2>
        <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
          {amenities.map(group => (
            <div key={group.category}>
              <h3 className="font-sans text-xl uppercase tracking-widest text-sandstone mb-6 border-b border-sandstone/20 pb-4">
                {group.category}
              </h3>
              <ul className="space-y-4">
                {group.items.map(item => (
                  <li key={item} className="font-sans font-light text-lg opacity-90">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
