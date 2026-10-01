// Server Component — owns metadata for this route.
// The interactive parallax hero is isolated in HomeClient.
import type { Metadata } from "next";
import { HomeClient } from "./HomeClient";

export const metadata: Metadata = {
  title: "Hotel Ratnawali Jodhpur | Heritage Boutique Hotel near Clock Tower",
  description:
    "Experience the finest Marwari hospitality at Hotel Ratnawali, a premium heritage boutique hotel located in the heart of Jodhpur's Blue City. Steps from the iconic Clock Tower, offering luxury rooms, panoramic fort views, and modern amenities.",
  alternates: {
    canonical: "https://hotelratnawalijodhpur.com",
  },
  openGraph: {
    title: "Hotel Ratnawali Jodhpur | Heritage Boutique Hotel near Clock Tower",
    description:
      "Experience the finest Marwari hospitality at Hotel Ratnawali, a premium heritage boutique hotel located in the heart of Jodhpur's Blue City. Steps from the iconic Clock Tower, offering luxury rooms, panoramic fort views, and modern amenities.",
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
