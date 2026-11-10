export interface PetStoreAccessory {
  id: string;
  title: string;
  category: string;
  highlight: string;
  description: string;
  applicablePets: string[];
}

export const PET_STORE_ACCESSORIES: PetStoreAccessory[] = [
  {
    id: "dog-food-nutrition",
    title: "Premium Dog Food & Puppy Growth Nutrition",
    category: "Nutrition & Diet",
    highlight: "Puppy & Adult Vitality",
    description: "Pedigree, Royal Canin, Drools, Arden Grange & imported breed-specific balanced kibble and wet food.",
    applicablePets: ["DOG"],
  },
  {
    id: "cat-food-hairball",
    title: "Gourmet Cat Food, Kitten Meals & Hairball Control Diets",
    category: "Feline Nutrition",
    highlight: "Rich Omega & Taurine",
    description: "Whiskas, Sheba, Me-O, Purina and prescription urinary and hairball relief formulas.",
    applicablePets: ["CAT"],
  },
  {
    id: "interactive-chew-toys",
    title: "Interactive Chew Toys, Fetch Balls, Kongs & Cat Teasers",
    category: "Play & Engagement",
    highlight: "Indestructible & Non-Toxic",
    description: "Durable rubber Kong chewers, treat-dispensing balls, squeakers, laser toys, and feather wands.",
    applicablePets: ["DOG", "CAT"],
  },
  {
    id: "grooming-combs-brushes",
    title: "Detangling Grooming Combs, Slicker Brushes & De-Shedding Tools",
    category: "Grooming & Hygiene",
    highlight: "Gentle Undercoat Care",
    description: "Professional de-shedding combs, undercoat rakes, slicker brushes, and claw trimmers.",
    applicablePets: ["DOG", "CAT", "RABBIT"],
  },
  {
    id: "harnesses-collars-leashes",
    title: "Padded Harnesses, Designer Collars & Heavy-Duty Leashes",
    category: "Walking & Training",
    highlight: "Ergonomic & Reflective",
    description: "No-pull ergonomic chest harnesses, heavy-duty rope leashes, safety buckles, and aesthetic collars.",
    applicablePets: ["DOG", "CAT"],
  },
  {
    id: "medicated-pet-shampoos",
    title: "Medicated, Anti-Tick & Oatmeal Soothing Pet Shampoos",
    category: "Skin & Coat Care",
    highlight: "Veterinary Approved",
    description: "Chlorhexidine antimicrobial shampoos, anti-tick & flea cleansers, conditioning sprays, and perfumes.",
    applicablePets: ["DOG", "CAT"],
  },
  {
    id: "orthopedic-beds-carriers",
    title: "Plush Orthopedic Pet Beds, Blankets & Travel Carriers",
    category: "Comfort & Travel",
    highlight: "Ultra-Soft Joint Support",
    description: "Washable high-density memory foam pet beds, warm microfleece blankets, and ventilated airline-grade travel crates.",
    applicablePets: ["DOG", "CAT", "RABBIT"],
  },
  {
    id: "calcium-bones-treats",
    title: "Natural Calcium Bones, Dental Chews & Training Treats",
    category: "Healthy Treats",
    highlight: "Tartar & Plaque Defense",
    description: "Real meat jerky treats, calcium booster bones, dental cleaning sticks, and reward biscuits.",
    applicablePets: ["DOG", "CAT"],
  },
  {
    id: "odor-lock-cat-litter",
    title: "Odor-Lock Clumping Cat Litter, Trays & Feeding Bowls",
    category: "Feline Sanitation",
    highlight: "99.9% Dust-Free Clumping",
    description: "Activated carbon bentonite cat litter, hooded litter trays, scoops, and non-slip stainless steel double bowls.",
    applicablePets: ["CAT"],
  },
  {
    id: "exotic-bird-hay-fish",
    title: "Exotic Bird Seeds, Rabbit Timothy Hay & Aquarium Fish Food",
    category: "Small Pets & Birds",
    highlight: "Multi-Species Care",
    description: "Premium sunflower & millets mixes for birds, high-fiber Timothy hay for rabbits, and nutritional fish flakes.",
    applicablePets: ["BIRD", "RABBIT", "FISH"],
  },
];
