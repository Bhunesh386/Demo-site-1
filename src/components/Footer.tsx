export function Footer() {
  return (
    <footer className="bg-obsidian text-alabaster py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h4 className="font-serif text-2xl mb-4">Hotel Ratnawali</h4>
          <p className="font-sans text-sm text-alabaster/70 max-w-xs">
            A sanctuary of modern luxury and serene comfort in the heart of the city.
          </p>
        </div>
        <div>
          <h5 className="font-sans text-sm uppercase tracking-widest text-champagne mb-4">Connect</h5>
          <ul className="space-y-2 font-sans text-sm text-alabaster/70">
            <li><a href="#" className="hover:text-champagne transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-champagne transition-colors">Facebook</a></li>
            <li><a href="#" className="hover:text-champagne transition-colors">Twitter</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-sans text-sm uppercase tracking-widest text-champagne mb-4">Contact</h5>
          <address className="not-italic font-sans text-sm text-alabaster/70 space-y-2">
            <p>149–150, Nai Sarak</p>
            <p>Jodhpur, Rajasthan 342001</p>
            <p>+91 99290-40000</p>
          </address>
        </div>
      </div>
    </footer>
  );
}
