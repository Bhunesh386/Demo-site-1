export function Footer() {
  return (
    <footer className="bg-obsidian text-alabaster py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-serif text-2xl mb-4">Hotel Ratnawali</h4>
          <p className="font-sans text-sm text-alabaster/70 max-w-xs">
            A sanctuary of modern luxury and serene comfort in the heart of the city.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h5 className="font-sans text-xs md:text-sm uppercase tracking-widest text-champagne mb-4">Connect</h5>
          <ul className="flex flex-col items-center md:items-start w-full">
            <li><a href="#" className="flex items-center justify-center md:justify-start min-h-[44px] text-sm text-alabaster/70 md:hover:text-champagne transition-colors w-full">Instagram</a></li>
            <li><a href="#" className="flex items-center justify-center md:justify-start min-h-[44px] text-sm text-alabaster/70 md:hover:text-champagne transition-colors w-full">Facebook</a></li>
            <li><a href="#" className="flex items-center justify-center md:justify-start min-h-[44px] text-sm text-alabaster/70 md:hover:text-champagne transition-colors w-full">Twitter</a></li>
          </ul>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h5 className="font-sans text-xs md:text-sm uppercase tracking-widest text-champagne mb-4 mt-4 md:mt-0">Contact</h5>
          <address className="not-italic font-sans text-sm text-alabaster/70 space-y-2">
            <p>149–150, Nai Sarak</p>
            <p>Jodhpur, Rajasthan 342001</p>
            <p className="pt-2"><a href="tel:+919929040000" className="flex items-center justify-center md:justify-start min-h-[44px] md:hover:text-champagne transition-colors">+91 99290-40000</a></p>
          </address>
        </div>
      </div>
    </footer>
  );
}
