// Server Component — owns metadata for this route.
// The interactive parallax hero is isolated in HomeClient.
import type { Metadata } from "next";
import { HomeClient } from "./HomeClient";

export const metadata: Metadata = {
  title: "Heritage Boutique Hotel in Jodhpur's Blue City",
  description:
    "Hotel Ratnawali is steps from Jodhpur's Clock Tower — a quiet sanctuary blending Marwari heritage with modern comfort. Book your stay in the Blue City today.",
  alternates: {
    canonical: "https://hotelratnawalijodhpur.com",
  },
  openGraph: {
    title: "Hotel Ratnawali Jodhpur — A Quiet Sanctuary in the Blue City",
    description:
      "Steps from Jodhpur's iconic Clock Tower, Hotel Ratnawali offers heritage-inspired rooms, Marwari hospitality, and panoramic views of the Blue City.",
    url: "https://hotelratnawalijodhpur.com",
    images: [
      {
        url: "/images/hero-main.jpg",
        width: 1200,
        height: 630,
        alt: "Hotel Ratnawali Jodhpur — heritage boutique hotel exterior with Blue City view",
      },
    ],
  },
};

export default function Home() {
  return <HomeClient />;
}
