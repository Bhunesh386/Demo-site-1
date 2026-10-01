export function Hero() {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] bg-indigo flex items-center justify-center overflow-hidden">
      {/* Fallback pattern for now, eventually next/image */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNFM0E4NTciLz48L3N2Zz4=')] mix-blend-overlay"></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-chalk font-medium leading-tight tracking-tight mb-6">
          The Heart of <br className="hidden md:block"/> the Blue City
        </h1>
        <p className="font-sans text-lg md:text-xl text-chalk/80 max-w-xl mx-auto mb-10 font-light">
          A heritage-inspired boutique stay steps from the Clock Tower. Experience Marwari hospitality where history meets modern comfort.
        </p>
        <a 
          href="#rooms" 
          className="inline-block px-8 py-4 bg-sandstone text-indigo font-sans text-sm tracking-widest uppercase hover:bg-chalk transition-colors"
        >
          Check Availability
        </a>
      </div>
    </section>
  );
}
