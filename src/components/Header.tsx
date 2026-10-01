import Link from 'next/link';
import { buildWhatsAppMessage } from '@/lib/whatsapp';

export function Header() {
  const waLink = buildWhatsAppMessage({});
  
  return (
    <header className="sticky top-0 z-50 bg-chalk/90 backdrop-blur-md border-b border-indigo/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-semibold text-indigo tracking-wide">
          RATNAWALI
        </Link>
        <nav className="hidden md:flex space-x-8 font-sans text-sm tracking-widest uppercase">
          <Link href="/#rooms" className="hover:text-sandstone transition-colors">Rooms</Link>
          <Link href="/#heritage" className="hover:text-sandstone transition-colors">Heritage</Link>
          <Link href="/#gallery" className="hover:text-sandstone transition-colors">Gallery</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <a 
            href={waLink}
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:inline-flex px-5 py-2 border border-indigo text-indigo hover:bg-indigo hover:text-chalk transition-colors font-sans text-sm tracking-widest uppercase"
          >
            WhatsApp
          </a>
          <button className="md:hidden p-2 text-indigo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
