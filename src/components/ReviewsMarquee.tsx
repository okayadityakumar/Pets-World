import React from 'react';
import { Star, ArrowUpRight } from 'lucide-react';
import { CLIENT_REVIEWS } from '../data/reviewsData';

export const ReviewsMarquee: React.FC = () => {
  // Duplicate for seamless 95s infinite linear loop
  const marqueeReviews = [...CLIENT_REVIEWS, ...CLIENT_REVIEWS];

  return (
    <section id="reviews" className="relative w-full py-20 overflow-hidden">
      {/* Centered Box-Free Section Header */}
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center mb-10">
        <span className="small-caps-clean text-[10px] md:text-[11px] text-white/70 mb-2">
          CLIENT SATISFACTION · 116+ VERIFIED GOOGLE REVIEWS
        </span>
        <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-white my-1">
          Words from Pet Parents
        </h2>
        <div className="flex items-center justify-center gap-1.5 my-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
          ))}
          <span className="small-caps-clean text-[10px] text-white/80 ml-2">
            4.8 GOOGLE RATING · PATNA
          </span>
        </div>

        {/* Direct link to verified Google Maps listing reviews */}
        <a
          href="https://maps.app.goo.gl/Vo7c9YTZCGUGY9m17?g_st=ic"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white text-[9px] tracking-[0.22em] transition-all cursor-pointer shadow-sm group"
        >
          <span className="small-caps-clean">VERIFIED GOOGLE MAPS REVIEWS ↗</span>
        </a>
      </div>

      {/* Seamless Box-Free Marquee (Zero Boxes, Pure Typography Floating Over Wallpaper, No Edge Gradient Masks) */}
      <div className="w-full overflow-hidden select-none py-6">
        <div className="animate-marquee-slow flex gap-16 items-center">
          {marqueeReviews.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="flex flex-col items-center justify-center text-center max-w-sm sm:max-w-md shrink-0 px-4"
            >
              {/* 5 Stars Rating */}
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(review.rating)].map((_, starIndex) => (
                  <Star key={starIndex} className="w-3 h-3 fill-amber-300 text-amber-300" />
                ))}
              </div>

              {/* Font 2: Playfair Italic Review Quote */}
              <p className="font-serif-italic text-xl sm:text-2xl text-white/95 leading-relaxed my-2">
                "{review.quote}"
              </p>

              {/* Unbolded Small-Caps Reviewer Name & Location */}
              <span className="small-caps-clean text-[10px] sm:text-[11px] text-white/80 mt-2">
                {review.author}
              </span>
              <span className="small-caps-clean text-[8.5px] text-white/50 tracking-[0.25em] mt-0.5">
                {review.verifiedLabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
