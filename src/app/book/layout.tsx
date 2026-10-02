import { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function BookLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-page pt-20 md:pt-28">
        {children}
      </main>
      <Footer />
    </>
  );
}
