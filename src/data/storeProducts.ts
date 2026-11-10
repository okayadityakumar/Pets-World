export interface StoreProduct {
  id: string;
  name: string;
  price: number;
  size?: string;
  brand?: string;
  petType?: 'DOG' | 'CAT' | 'BIRD' | 'RABBIT' | 'OTHER';
}

export interface StoreCategory {
  id: string;
  departmentNum: string;
  title: string;
  subtitle: string;
  tag: string;
  itemCount: number;
  summary: string;
  image: string;
  products: StoreProduct[];
}

export const STORE_CATEGORIES: StoreCategory[] = [
  {
    id: "shampoos-washes",
    departmentNum: "DEPARTMENT 01",
    title: "Shampoos & Medicated Washes",
    subtitle: "Clinical & Coat Care",
    tag: "GROOMING & DERMATOLOGY",
    itemCount: 17,
    summary: "OXERA · HIMALAYA ERINA-EP · BOL COAT CARE · PETHEX · PETBEN · BARKSON MEDICATED",
    image: "/assets/departments/shampoos.jpg",
    products: [
      { id: "sh-1", name: "Oxera 5 in 1 Dog Shampoo Strawberry 200ml", price: 230, size: "200ml", brand: "Oxera", petType: "DOG" },
      { id: "sh-2", name: "Oxera Dog & Cat Lemon Shampoo 200ml", price: 230, size: "200ml", brand: "Oxera", petType: "DOG" },
      { id: "sh-3", name: "Himalaya Erina-EP Neem Shampoo 200ml", price: 250, size: "200ml", brand: "Himalaya", petType: "DOG" },
      { id: "sh-4", name: "BOL Shiny Coat Shampoo 200ml", price: 300, size: "200ml", brand: "BOL", petType: "DOG" },
      { id: "sh-5", name: "BOL Dog Shampoo & Conditioner 200ml", price: 300, size: "200ml", brand: "BOL", petType: "DOG" },
      { id: "sh-6", name: "BOL Shed Control Shampoo 200ml", price: 300, size: "200ml", brand: "BOL", petType: "DOG" },
      { id: "sh-7", name: "BOL Puppy Shampoo 200ml", price: 300, size: "200ml", brand: "BOL", petType: "DOG" },
      { id: "sh-8", name: "Patina Antifungal Shampoo 220ml", price: 280, size: "220ml", brand: "Patina", petType: "DOG" },
      { id: "sh-9", name: "PetHex Medicated Shampoo 200ml", price: 400, size: "200ml", brand: "PetHex", petType: "DOG" },
      { id: "sh-10", name: "PetBen Benzoyl Peroxide Shampoo 200ml", price: 400, size: "200ml", brand: "PetBen", petType: "DOG" },
      { id: "sh-11", name: "Nuforce-NF Medicated Pet Shampoo 200ml", price: 280, size: "200ml", brand: "Nuforce", petType: "DOG" },
      { id: "sh-12", name: "Softas Max Shampoo 200ml", price: 280, size: "200ml", brand: "Softas", petType: "DOG" },
      { id: "sh-13", name: "Barkson Anti-Itching Shampoo 250ml", price: 350, size: "250ml", brand: "Barkson", petType: "DOG" },
      { id: "sh-14", name: "Barkson Tick & Flea Shampoo 250ml", price: 250, size: "250ml", brand: "Barkson", petType: "DOG" },
      { id: "sh-15", name: "Barkson All-in-One Shampoo 250ml", price: 250, size: "250ml", brand: "Barkson", petType: "DOG" },
      { id: "sh-16", name: "Barkson Gentle Shampoo 250ml", price: 250, size: "250ml", brand: "Barkson", petType: "DOG" },
      { id: "sh-17", name: "Barkson Coat Friendly Shampoo 250ml", price: 250, size: "250ml", brand: "Barkson", petType: "DOG" },
    ],
  },
  {
    id: "grooming-tools",
    departmentNum: "DEPARTMENT 02",
    title: "Grooming Tools & Brushes",
    subtitle: "Detangling & Hygiene",
    tag: "BRUSHES, COMBS & CLIPPERS",
    itemCount: 12,
    summary: "PETAHOLIC 2+1 · BAMBOO PIN BRUSHES · STEEL COMBS · TICK COMBS · CLAW TRIMMERS",
    image: "/assets/departments/grooming.jpg",
    products: [
      { id: "gr-1", name: "Petaholic 2+1 Sleeker Brush", price: 400, size: "Standard", brand: "Petaholic", petType: "DOG" },
      { id: "gr-2", name: "T-Shape Comb with Wooden Handle", price: 180, size: "Wooden Handle", brand: "Classic", petType: "DOG" },
      { id: "gr-3", name: "Steel Comb Single Side", price: 180, size: "Single Side", brand: "Classic", petType: "DOG" },
      { id: "gr-4", name: "Steel Comb Double Side", price: 200, size: "Double Side", brand: "Classic", petType: "DOG" },
      { id: "gr-5", name: "Ticks Comb Standard", price: 150, size: "Fine Tooth", brand: "Standard", petType: "DOG" },
      { id: "gr-6", name: "Ticks Comb Plastic Round Handle", price: 180, size: "Round Handle", brand: "Standard", petType: "DOG" },
      { id: "gr-7", name: "Nail Cutter for Dogs & Cats", price: 250, size: "Dual Pet", brand: "PetCare", petType: "DOG" },
      { id: "gr-8", name: "Sliker Pin Brush", price: 250, size: "Pin Cushion", brand: "Sliker", petType: "DOG" },
      { id: "gr-9", name: "Bamboo Pin Brush Large", price: 300, size: "Large", brand: "EcoBamboo", petType: "DOG" },
      { id: "gr-10", name: "Plastic Handle Sleeker Comb", price: 200, size: "Ergonomic", brand: "Classic", petType: "DOG" },
      { id: "gr-11", name: "Pin Brush Pet Comb Small", price: 210, size: "Small", brand: "Classic", petType: "DOG" },
      { id: "gr-12", name: "Pin Brush Pet Comb Large", price: 280, size: "Large", brand: "Classic", petType: "DOG" },
    ],
  },
  {
    id: "toys-enrichment",
    departmentNum: "DEPARTMENT 03",
    title: "Toys & Enrichment",
    subtitle: "Indestructible & Non-Toxic",
    tag: "PLAY & ENGAGEMENT",
    itemCount: 10,
    summary: "HOLY PAWS FRUITY BITE · SQUEAKY DURIAN · SPIKE RUGBY · RUBBER BONES & BALLS",
    image: "/assets/departments/toys.jpg",
    products: [
      { id: "ty-1", name: "Holy Paws Fruity Bite Pineapple Toy", price: 200, size: "Bite Toy", brand: "Holy Paws", petType: "DOG" },
      { id: "ty-2", name: "Holy Paws Fruity Bite Squeaky Durian", price: 330, size: "Squeaky", brand: "Holy Paws", petType: "DOG" },
      { id: "ty-3", name: "Holy Paws Fruity Bite Squeaky Pomegranate", price: 300, size: "Squeaky", brand: "Holy Paws", petType: "DOG" },
      { id: "ty-4", name: "Holy Paws Spike Rugby Toy", price: 320, size: "Heavy Duty", brand: "Holy Paws", petType: "DOG" },
      { id: "ty-5", name: "Rubber Toy Bone Shape", price: 200, size: "Chew Bone", brand: "DuraRubber", petType: "DOG" },
      { id: "ty-6", name: "Ribbon Rubber Ball", price: 180, size: "Ribbon Swirl", brand: "DuraRubber", petType: "DOG" },
      { id: "ty-7", name: "Rope Rubber Ball", price: 130, size: "Tug & Fetch", brand: "DuraRubber", petType: "DOG" },
      { id: "ty-8", name: "Rubber Ball Classic", price: 150, size: "Bounce Ball", brand: "DuraRubber", petType: "DOG" },
      { id: "ty-9", name: "Rubber Bone Chew Toy", price: 150, size: "Dental Grip", brand: "DuraRubber", petType: "DOG" },
      { id: "ty-10", name: "Bone Shape Food Dispensing Toy", price: 200, size: "Treat Dispenser", brand: "EnrichPet", petType: "DOG" },
    ],
  },
  {
    id: "dog-treats-bones",
    departmentNum: "DEPARTMENT 04",
    title: "Dog Treats, Biscuits & Chew Bones",
    subtitle: "High-Protein Rewards",
    tag: "TREATS & DENTAL CHEWS",
    itemCount: 19,
    summary: "JERHIGH REAL CHICKEN · BOL CHEWSTIX · GOODIES SPIRAL · PUREPET · PET EN CARE",
    image: "/assets/departments/treats.jpg",
    products: [
      { id: "tr-1", name: "JerHigh Liver Real Chicken Meat 70g", price: 170, size: "70g", brand: "JerHigh", petType: "DOG" },
      { id: "tr-2", name: "JerHigh Chicken Strawberry 70g", price: 170, size: "70g", brand: "JerHigh", petType: "DOG" },
      { id: "tr-3", name: "JerHigh Chicken Spinach 70g", price: 170, size: "70g", brand: "JerHigh", petType: "DOG" },
      { id: "tr-4", name: "JerHigh Fish Stick 50g", price: 170, size: "50g", brand: "JerHigh", petType: "DOG" },
      { id: "tr-5", name: "BOL Skin & Coat Hemp Chewstix 100g", price: 200, size: "100g", brand: "BOL", petType: "DOG" },
      { id: "tr-6", name: "BOL Glow & Shine Turmeric Chewstix 100g", price: 200, size: "100g", brand: "BOL", petType: "DOG" },
      { id: "tr-7", name: "Goodies Spiral Twist Sticks BBQ & Lamb 450g", price: 600, size: "450g", brand: "Goodies", petType: "DOG" },
      { id: "tr-8", name: "Goodies Spiral Twist Sticks Chicken Liver & Bacon 450g", price: 600, size: "450g", brand: "Goodies", petType: "DOG" },
      { id: "tr-9", name: "Purepet Biscuit Milk Flavour 900g", price: 250, size: "900g", brand: "Purepet", petType: "DOG" },
      { id: "tr-10", name: "Purepet Biscuit Chicken Flavour 900g", price: 250, size: "900g", brand: "Purepet", petType: "DOG" },
      { id: "tr-11", name: "Pet En Care Chew Bone 3\" - 6 pcs", price: 130, size: "3 Inch (6 pcs)", brand: "Pet En Care", petType: "DOG" },
      { id: "tr-12", name: "Pet En Care Chew Bone 3\" - 1kg", price: 450, size: "3 Inch (1kg)", brand: "Pet En Care", petType: "DOG" },
      { id: "tr-13", name: "Pet En Care Chew Bone 4\" - 4 pcs", price: 130, size: "4 Inch (4 pcs)", brand: "Pet En Care", petType: "DOG" },
      { id: "tr-14", name: "Pet En Care Chew Bone 4\" - 8 pcs", price: 220, size: "4 Inch (8 pcs)", brand: "Pet En Care", petType: "DOG" },
      { id: "tr-15", name: "Pet En Care Chew Bone 4\" - 1kg", price: 550, size: "4 Inch (1kg)", brand: "Pet En Care", petType: "DOG" },
      { id: "tr-16", name: "Pet En Care Munchies Chicken Flavour", price: 130, size: "Standard Pack", brand: "Pet En Care", petType: "DOG" },
      { id: "tr-17", name: "Pet En Care Munchies High Protein Large Pack", price: 230, size: "Large Pack", brand: "Pet En Care", petType: "DOG" },
      { id: "tr-18", name: "Pet En Care Munchies Chicken - 25 pcs", price: 80, size: "25 pcs", brand: "Pet En Care", petType: "DOG" },
      { id: "tr-19", name: "Pet En Care Munchies Lamb - 25 pcs", price: 80, size: "25 pcs", brand: "Pet En Care", petType: "DOG" },
    ],
  },
  {
    id: "dog-food",
    departmentNum: "DEPARTMENT 05",
    title: "Dog Food (Dry & Wet Meals)",
    subtitle: "Complete Breed Nutrition",
    tag: "DAILY MEALS & STARTERS",
    itemCount: 18,
    summary: "FOCUS PUPPY · DROOLS OPTIMUM · CARNIWEL · N&D GRAIN-FREE · SMART HEART · PEDIGREE PRO",
    image: "/assets/departments/food.jpg",
    products: [
      { id: "df-1", name: "Focus Puppy 4kg - 28% Protein", price: 1720, size: "4kg", brand: "Focus", petType: "DOG" },
      { id: "df-2", name: "Drools Starter 1.2kg", price: 340, size: "1.2kg", brand: "Drools", petType: "DOG" },
      { id: "df-3", name: "Drools Optimum Performance Puppy 20kg", price: 2650, size: "20kg", brand: "Drools", petType: "DOG" },
      { id: "df-4", name: "Drools Optimum Performance Adult 20kg", price: 2600, size: "20kg", brand: "Drools", petType: "DOG" },
      { id: "df-5", name: "BOL Essential Puppy 3kg", price: 980, size: "3kg", brand: "BOL", petType: "DOG" },
      { id: "df-6", name: "BOL Essential Mini & Small Adult 3kg", price: 850, size: "3kg", brand: "BOL", petType: "DOG" },
      { id: "df-7", name: "Carniwel Starter Large Breed 3kg", price: 1340, size: "3kg", brand: "Carniwel", petType: "DOG" },
      { id: "df-8", name: "Carniwel Puppy 1kg", price: 450, size: "1kg", brand: "Carniwel", petType: "DOG" },
      { id: "df-9", name: "Carniwel Puppy Small Breed 1kg", price: 430, size: "1kg", brand: "Carniwel", petType: "DOG" },
      { id: "df-10", name: "Carniwel Puppy Small Breed 3kg", price: 1200, size: "3kg", brand: "Carniwel", petType: "DOG" },
      { id: "df-11", name: "N&D Puppy Starter 800g", price: 720, size: "800g", brand: "N&D", petType: "DOG" },
      { id: "df-12", name: "N&D Medium Maxi Adult 2.5kg", price: 2150, size: "2.5kg", brand: "N&D", petType: "DOG" },
      { id: "df-13", name: "Smart Heart Power Pack 10kg", price: 2750, size: "10kg", brand: "Smart Heart", petType: "DOG" },
      { id: "df-14", name: "Pedigree PRO Puppy Large Breed 3kg", price: 1080, size: "3kg", brand: "Pedigree PRO", petType: "DOG" },
      { id: "df-15", name: "Pedigree PRO Adult Small Breed 3kg", price: 1020, size: "3kg", brand: "Pedigree PRO", petType: "DOG" },
      { id: "df-16", name: "Pedigree Chicken Chunks in Gravy 70g", price: 35, size: "70g Gravy", brand: "Pedigree", petType: "DOG" },
      { id: "df-17", name: "Lets Bite Active Adult 10kg", price: 1600, size: "10kg", brand: "Lets Bite", petType: "DOG" },
      { id: "df-18", name: "Lets Bite Active Puppy 10kg", price: 1650, size: "10kg", brand: "Lets Bite", petType: "DOG" },
    ],
  },
  {
    id: "health-supplements",
    departmentNum: "DEPARTMENT 06",
    title: "Health, Supplements & Tonics",
    subtitle: "Clinical Vitality & Immunity",
    tag: "VITAMINS, CALCIUM & SYRUPS",
    itemCount: 12,
    summary: "MERICAN CALCIUM DS · THROMBO FE · FERIKIND · PROVIBOOST · OXERA SALMON OIL · DROOLS ABSOLUTE",
    image: "/assets/departments/supplements.jpg",
    products: [
      { id: "hs-1", name: "Merical Pet Liquid DS Calcium & Phosphorus 300ml", price: 150, size: "300ml", brand: "Merical", petType: "DOG" },
      { id: "hs-2", name: "Ever-Vit Amino Acids & Multivitamin Syrup 200ml", price: 200, size: "200ml", brand: "Ever-Vit", petType: "DOG" },
      { id: "hs-3", name: "Thrombo Fe Iron & Platelet Syrup 200ml", price: 330, size: "200ml", brand: "Thrombo Fe", petType: "DOG" },
      { id: "hs-4", name: "Ferikind Pet Suspension 170ml", price: 160, size: "170ml", brand: "Ferikind", petType: "DOG" },
      { id: "hs-5", name: "ProviBoost Amino Acids & Vitamin Syrup 200ml", price: 250, size: "200ml", brand: "ProviBoost", petType: "DOG" },
      { id: "hs-6", name: "Barkson Ferrum Plus Iron Tonic 200ml", price: 160, size: "200ml", brand: "Barkson", petType: "DOG" },
      { id: "hs-7", name: "Barkson Liv Aid Liver Syrup 200ml", price: 130, size: "200ml", brand: "Barkson", petType: "DOG" },
      { id: "hs-8", name: "Oxera Salmon Oil 200ml", price: 340, size: "200ml", brand: "Oxera", petType: "DOG" },
      { id: "hs-9", name: "Drools Absolute Calcium - 110 Tablets", price: 450, size: "110 Tablets", brand: "Drools", petType: "DOG" },
      { id: "hs-10", name: "Drools Absolute Calcium - 50 Tablets", price: 220, size: "50 Tablets", brand: "Drools", petType: "DOG" },
      { id: "hs-11", name: "Drools Absolute Vitamin - 50 Tablets", price: 220, size: "50 Tablets", brand: "Drools", petType: "DOG" },
      { id: "hs-12", name: "Drools Absolute Skin + Coat - 50 Tablets", price: 220, size: "50 Tablets", brand: "Drools", petType: "DOG" },
    ],
  },
  {
    id: "bird-small-pets",
    departmentNum: "DEPARTMENT 07",
    title: "Bird & Small Pet Food",
    subtitle: "Avian & Pocket Pet Nutrition",
    tag: "BIRDS, RABBITS & GUINEA PIGS",
    itemCount: 6,
    summary: "OXERA COCKTAIL · BUDGIES SEEDS · CONURE MIX · LOVEBIRDS BLEND · TIMOTHY RABBIT HAY",
    image: "/assets/departments/birds.jpg",
    products: [
      { id: "bp-1", name: "Oxera Cocktail Bird Food 500g", price: 230, size: "500g", brand: "Oxera", petType: "BIRD" },
      { id: "bp-2", name: "Oxera Budgies Food 500g", price: 230, size: "500g", brand: "Oxera", petType: "BIRD" },
      { id: "bp-3", name: "Oxera Conure Food 500g", price: 290, size: "500g", brand: "Oxera", petType: "BIRD" },
      { id: "bp-4", name: "Oxera Lovebirds Food 500g", price: 230, size: "500g", brand: "Oxera", petType: "BIRD" },
      { id: "bp-5", name: "Oxera Rabbit Food 500g", price: 230, size: "500g", brand: "Oxera", petType: "RABBIT" },
      { id: "bp-6", name: "Oxera Guinea Pig Food 500g", price: 230, size: "500g", brand: "Oxera", petType: "OTHER" },
    ],
  },
];

// Helper to get all 94 products flat
export const ALL_STORE_PRODUCTS: StoreProduct[] = STORE_CATEGORIES.flatMap((c) => c.products);
