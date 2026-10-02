export function Footer() {
  return (
    <footer className="bg-dark text-page py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-serif text-2xl mb-4">Hotel Ratnawali</h4>
          <p className="font-sans text-sm text-page/70 max-w-xs">
            A sanctuary of modern luxury and serene comfort in the heart of the city.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h5 className="font-sans text-xs md:text-sm uppercase tracking-widest text-accent mb-4">Connect</h5>
          <ul className="flex flex-col items-center md:items-start w-full">
            <li><a href="#" className="flex items-center justify-center md:justify-start min-h-[44px] text-sm text-page/70 md:hover:text-accent transition-colors w-full">Instagram</a></li>
            <li><a href="#" className="flex items-center justify-center md:justify-start min-h-[44px] text-sm text-page/70 md:hover:text-accent transition-colors w-full">Facebook</a></li>
            <li><a href="#" className="flex items-center justify-center md:justify-start min-h-[44px] text-sm text-page/70 md:hover:text-accent transition-colors w-full">Twitter</a></li>
          </ul>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h5 className="font-sans text-xs md:text-sm uppercase tracking-widest text-accent mb-4 mt-4 md:mt-0">Contact Us</h5>
          <div className="not-italic font-sans text-sm text-page/70 space-y-2" itemScope itemType="https://schema.org/LocalBusiness">
            <span itemProp="name" className="sr-only">Hotel Ratnawali Jodhpur</span>
            <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <p itemProp="streetAddress">149–150, Nai Sarak</p>
              <p><span itemProp="addressLocality">Jodhpur</span>, <span itemProp="addressRegion">Rajasthan</span> <span itemProp="postalCode">342001</span></p>
            </div>
            <p className="pt-2"><a href="tel:+919929040000" itemProp="telephone" className="flex items-center justify-center md:justify-start min-h-[44px] md:hover:text-accent transition-colors">+91 99290-40000</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
