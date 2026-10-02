// Server Component — owns metadata for this route.
// The interactive hero slideshow is isolated in HomeClient.
import type { Metadata } from "next";
import { HomeClient } from "./HomeClient";
import { ogImage } from "@/data/images";

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
        url: ogImage.url,
        width: ogImage.width,
        height: ogImage.height,
        alt: ogImage.alt,
      },
    ],
  },
};

export default function Home() {
  return <HomeClient />;
}
