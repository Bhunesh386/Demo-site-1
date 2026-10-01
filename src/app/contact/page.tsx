import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact & Reservations — Hotel Ratnawali Jodhpur",
  description:
    "Reserve a room at Hotel Ratnawali Jodhpur or reach out with any inquiry. Visit us at 149–150 Nai Sarak, call +91 99290-40000, or email jodhpur@hotelratnawali.com.",
  alternates: {
    canonical: "https://hotelratnawalijodhpur.com/contact",
  },
  openGraph: {
    title: "Contact & Reservations | Hotel Ratnawali Jodhpur",
    description:
      "Get in touch with Hotel Ratnawali at 149–150 Nai Sarak, Jodhpur. Call +91 99290-40000 or email jodhpur@hotelratnawali.com to reserve your stay.",
    url: "https://hotelratnawalijodhpur.com/contact",
    images: [
      {
        url: "/images/amenity-spa.jpg",
        width: 1200,
        height: 630,
        alt: "Hotel Ratnawali Jodhpur — serene spa and wellness facilities",
      },
    ],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
