export interface Room {
  id: string;
  name: string;
  pricePerNight: number;
  capacity: { adults: number; children: number };
  image: string;
  amenities: string[];
}

export const rooms: Room[] = [
  {
    id: "deluxe-01",
    name: "Deluxe Room",
    pricePerNight: 4500,
    capacity: { adults: 2, children: 1 },
    image: "/images/2.jpg",
    amenities: ["King Bed", "City View", "Free WiFi", "Minibar", "Air Conditioning", "En-suite Bathroom"]
  },
  {
    id: "super-deluxe-01",
    name: "Super Deluxe Room",
    pricePerNight: 5500,
    capacity: { adults: 3, children: 2 },
    image: "/images/3.jpg",
    amenities: ["King Bed & Sofa Bed", "Premium City View", "Free WiFi", "Minibar", "Bathtub", "Welcome Basket"]
  },
  {
    id: "royal-suite-01",
    name: "Ratnawali Royal Suite",
    pricePerNight: 8500,
    capacity: { adults: 4, children: 2 },
    image: "/images/1.jpg",
    amenities: ["Two Bedrooms", "Living Room", "Heritage Balcony", "Butler Service", "Complimentary Breakfast", "Luxury Bath Amenities"]
  }
];
