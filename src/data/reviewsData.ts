export interface ClientReview {
  id: string;
  author: string;
  rating: number;
  quote: string;
  verifiedLabel: string;
}

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: "review-1",
    author: "G.K. Mishra",
    rating: 5,
    quote: "Pets World offers an exceptional range of pet products that truly stand out. Their top-quality items are highly durable, reasonably priced, and the environment is warm and welcoming.",
    verifiedLabel: "Google Maps Review · Verified Customer",
  },
  {
    id: "review-2",
    author: "Bhupendra Kumar",
    rating: 5,
    quote: "One of the best pet shops in Patna. Very polite behavior and genuine guidance for pet owners. Reasonable rates on quality dog food and accessories.",
    verifiedLabel: "Google Maps Review · Verified Customer",
  },
  {
    id: "review-3",
    author: "Shiv Shankar",
    rating: 5,
    quote: "One of the most reliable pet care centers in Patna. Good stock of essential pet medicines, feeds, and prompt guidance whenever needed.",
    verifiedLabel: "Google Maps Review · Verified Customer",
  },
  {
    id: "review-4",
    author: "Ashutosh Raj",
    rating: 5,
    quote: "All pet care essentials under one single roof. From authentic brand foods and playful accessories to prompt health consultations.",
    verifiedLabel: "Google Maps Review · Verified Customer",
  },
  {
    id: "review-5",
    author: "Dev Verma",
    rating: 5,
    quote: "Clean setup and very gentle handling during routine checkups and vaccination. Authentic products and warm customer service.",
    verifiedLabel: "Google Maps Review · Verified Customer",
  },
  {
    id: "review-6",
    author: "Amit Sinha",
    rating: 5,
    quote: "Great collection of dog and cat food, leashes, grooming tools, and dental treats. The owner and staff are knowledgeable and guide you properly.",
    verifiedLabel: "Google Maps Review · Verified Customer",
  },
  {
    id: "review-7",
    author: "Manikant Sharma",
    rating: 5,
    quote: "Prompt service and genuine medicines. Very easy to connect over phone or WhatsApp to verify availability before visiting.",
    verifiedLabel: "Google Maps Review · Verified Customer",
  },
  {
    id: "review-8",
    author: "Priya Singh",
    rating: 5,
    quote: "Brought my cat for health checkup and accessories. Good variety of kitten food and litter supplies with a very hygienic environment.",
    verifiedLabel: "Google Maps Review · Verified Customer",
  },
];
