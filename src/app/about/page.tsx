import type { Metadata } from "next";
import { AboutClient } from "./AboutClient";
import { aboutGallery } from "@/data/images";

export const metadata: Metadata = {
  title: "Our Story & Heritage | About Hotel Ratnawali Jodhpur",
  description:
    "Learn the story behind Hotel Ratnawali — a family-run heritage boutique hotel in Jodhpur's historic Nai Sarak. Meet the team dedicated to authentic Marwari hospitality since 1987.",
  alternates: {
    canonical: "https://hotelratnawalijodhpur.com/about",
  },
  openGraph: {
    title: "Our Story & Heritage | Hotel Ratnawali Jodhpur",
    description:
      "A family-run boutique hotel in Jodhpur's Blue City since 1987. Meet the team behind Hotel Ratnawali and discover our commitment to authentic Marwari hospitality.",
    url: "https://hotelratnawalijodhpur.com/about",
    images: [
      {
        url: aboutGallery[0].src,
        width: 1200,
        height: 630,
        alt: aboutGallery[0].alt,
      },
    ],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
