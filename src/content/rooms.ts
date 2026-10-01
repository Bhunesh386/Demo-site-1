export type RoomType = {
  id: string;
  slug: string;
  name: string;
  description: string;
  basePrice: number; // in paise
  capacity: string;
  units: string;
  features: string[];
};

export const rooms: RoomType[] = [
  {
    id: "deluxe",
    slug: "deluxe",
    name: "Deluxe Room",
    description: "King or twin bed, courtyard or city-street view, climate control, fast Wi-Fi, handcrafted Marwari wood accents.",
    basePrice: 249900, // 2,499.00 INR
    capacity: "[CONFIRM] 2 Adults + 1 Child",
    units: "[CONFIRM] 5",
    features: ["Climate control", "Fast Wi-Fi", "Marwari wood accents"]
  },
  {
    id: "super-deluxe",
    slug: "super-deluxe",
    name: "Super Deluxe Room",
    description: "Spacious layout, carved jharokha seating nook, premium linens, rain shower, workstation.",
    basePrice: 349900,
    capacity: "[CONFIRM] 2 Adults + 1 Child",
    units: "[CONFIRM] 5",
    features: ["Jharokha seating", "Premium linens", "Rain shower", "Workstation"]
  },
  {
    id: "royal-suite",
    slug: "ratnawali-royal-suite",
    name: "Ratnawali Royal Suite",
    description: "Expansive living area, heritage brass fixtures, panoramic Blue City and fort view line, deep-soak bath, personalized concierge attention.",
    basePrice: 549900,
    capacity: "[CONFIRM] 2 Adults + 1 Child",
    units: "[CONFIRM] 2",
    features: ["Panoramic views", "Deep-soak bath", "Living area", "Personalized concierge"]
  }
];
