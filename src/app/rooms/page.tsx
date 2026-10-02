import type { Metadata } from "next";
import { RoomsClient } from "./RoomsClient";
import { roomsPageOgImage } from "@/data/images";

export const metadata: Metadata = {
  title: "Rooms & Accommodations — Boutique Stays in Jodhpur",
  description:
    "Choose from Deluxe Rooms, Super Deluxe Rooms, and the Ratnawali Royal Suite — each thoughtfully designed with Marwari heritage accents. From ₹2,499 per night in Jodhpur's Blue City.",
  alternates: {
    canonical: "https://hotelratnawalijodhpur.com/rooms",
  },
  openGraph: {
    title: "Rooms & Accommodations | Hotel Ratnawali Jodhpur",
    description:
      "Explore our Deluxe Rooms, Super Deluxe Rooms, and Royal Suite. Premium amenities, heritage design, and panoramic Blue City views — from ₹2,499/night.",
    url: "https://hotelratnawalijodhpur.com/rooms",
    images: [
      {
        url: roomsPageOgImage.url,
        width: roomsPageOgImage.width,
        height: roomsPageOgImage.height,
        alt: roomsPageOgImage.alt,
      },
    ],
  },
};

export default function RoomsPage() {
  return <RoomsClient />;
}
