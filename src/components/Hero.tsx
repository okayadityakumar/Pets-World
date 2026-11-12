import React from 'react';
import { ArrowDown, MessageCircle, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenSpecialModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSpecialModal }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-6 py-16 sm:py-24">
      {/* Box-Free Center Panel Floating Over Wallpaper */}
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        {/* Top Micro Kicker */}
        <span className="small-caps-clean text-[9.5px] md:text-[10.5px] text-white/90 mb-3 tracking-[0.25em] drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
          PREMIER SANCTUARY FOR YOUR CHERISHED PETS · P.C. COLONY, KANKARBAGH
        </span>

        {/* Fashion Hub style (Font 1: Playfair Roman Display) */}
        <h1 className="font-serif-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white my-2 leading-none drop-shadow-[0_3px_14px_rgba(0,0,0,0.95)]">
          Pets World Pets Care
        </h1>

        {/* Tattoo Studio style (Font 2: Playfair Italic Display) */}
        <span className="font-serif-italic text-2xl sm:text-3xl md:text-4xl text-white my-2 tracking-wide block drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
          Pet's Clinic & Animal Hospital
        </span>

        {/* Hero Introduction in Address Font (Clean Sans Medium) */}
        <p className="text-lg sm:text-2xl font-medium text-white leading-relaxed max-w-3xl my-4 px-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
          A dedicated sanctuary where unconditional love meets clinical excellence. Welcoming pet parents across Patna to explore complete boutique pet supplies, vital nutrition, and gentle veterinary medicine.
        </p>

        {/* Pet Highlights in Address Font (Clean Sans Medium) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 my-4 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
          <span className="text-lg sm:text-2xl font-medium">Dogs</span>
          <span className="text-white/60 text-sm">·</span>
          <span className="text-lg sm:text-2xl font-medium">Cats</span>
          <span className="text-white/60 text-sm">·</span>
          <span className="text-lg sm:text-2xl font-medium">Birds</span>
          <span className="text-white/60 text-sm">·</span>
          <span className="text-lg sm:text-2xl font-medium">Rabbits</span>
          <span className="text-white/60 text-sm">·</span>
          <span className="text-lg sm:text-2xl font-medium">Fish</span>
        </div>

        {/* 3 Centered Untinted Liquid Glass Buttons */}
        <div className="flex flex-col items-center justify-center gap-3.5 w-full max-w-xl mt-6 px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full">
            {/* Button 1: Explore Pet Store */}
            <button
              type="button"
              onClick={() => scrollTo('pet-store')}
              className="w-full sm:w-1/2 py-3.5 px-6 rounded-2xl liquid-glass-interactive text-white flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span className="small-caps-clean text-[10px] md:text-[11px] text-white tracking-[0.22em]">
                EXPLORE OUR PET STORE
              </span>
              <ArrowDown className="w-3.5 h-3.5 text-white/70 group-hover:translate-y-0.5 transition-transform" />
            </button>

            {/* Button 2: Explore Clinic */}
            <button
              type="button"
              onClick={() => scrollTo('clinic-services')}
              className="w-full sm:w-1/2 py-3.5 px-6 rounded-2xl liquid-glass-interactive text-white flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span className="small-caps-clean text-[10px] md:text-[11px] text-white tracking-[0.22em]">
                EXPLORE OUR CLINIC
              </span>
              <ArrowDown className="w-3.5 h-3.5 text-white/70 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Button 3: Prominent Special Owner Arrangement (Zero Extra Charge) */}
          <button
            type="button"
            onClick={onOpenSpecialModal}
            className="w-full py-4 px-6 rounded-2xl liquid-glass-interactive text-white flex flex-col items-center justify-center gap-1 group cursor-pointer border-white/35"
          >
            <div className="flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="small-caps-clean text-[10px] md:text-[11px] text-white tracking-[0.22em]">
                ITEM OR SERVICE NOT LISTED? REQUEST SPECIAL OWNER ARRANGEMENT
              </span>
            </div>
            <span className="small-caps-clean text-[8.5px] text-white/60 tracking-[0.22em]">
              ZERO EXTRA CHARGE • REFILLED & RESTOCKED EXCLUSIVELY FOR YOU
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
