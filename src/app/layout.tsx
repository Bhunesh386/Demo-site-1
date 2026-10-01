import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = "https://hotelratnawalijodhpur.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Hotel Ratnawali Jodhpur | Heritage Boutique Hotel in the Blue City",
    template: "%s | Hotel Ratnawali Jodhpur",
  },
  description:
    "Hotel Ratnawali is a heritage-inspired boutique hotel at 149–150 Nai Sarak, steps from Jodhpur's Clock Tower. Experience Marwari hospitality, premium rooms, and panoramic fort views in the heart of the Blue City.",
  keywords: [
    "boutique hotel Jodhpur",
    "heritage hotel Blue City",
    "hotel near Clock Tower Jodhpur",
    "Nai Sarak hotel",
    "luxury stay Jodhpur",
    "Marwari hospitality",
    "Rajasthan heritage hotel",
  ],
  authors: [{ name: "Hotel Ratnawali", url: BASE_URL }],
  creator: "Hotel Ratnawali",
  publisher: "Hotel Ratnawali",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Hotel Ratnawali Jodhpur",
    title: "Hotel Ratnawali Jodhpur | Heritage Boutique Hotel in the Blue City",
    description:
      "A heritage-inspired boutique stay steps from the Clock Tower. Experience Marwari hospitality where history meets modern comfort in Jodhpur, Rajasthan.",
    images: [
      {
        url: "/images/hero-main.jpg",
        width: 1200,
        height: 630,
        alt: "Hotel Ratnawali Jodhpur — heritage boutique hotel exterior with Blue City view",
      },
    ],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-alabaster text-obsidian font-sans antialiased min-h-screen flex flex-col overflow-x-hidden">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
