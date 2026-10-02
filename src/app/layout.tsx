import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ogImage } from "@/data/images";

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
        url: ogImage.url,
        width: ogImage.width,
        height: ogImage.height,
        alt: ogImage.alt,
      },
    ],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <meta name="google-site-verification" content="PASTE_YOUR_COPIED_TOKEN_HERE" />
        {/* Google Analytics Placeholder */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>

        {/* Facebook Pixel Placeholder */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'XXXXXXXXXXXXXXX');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="bg-alabaster text-obsidian font-sans antialiased min-h-screen flex flex-col overflow-x-hidden">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
