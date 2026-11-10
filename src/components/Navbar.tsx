import React from 'react';
import { MessageCircle } from 'lucide-react';

interface NavbarProps {
  onOpenSpecialModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSpecialModal }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-black/10 border-b border-white/10">
      {/* Top Floating Trust Line */}
      <div className="w-full py-1.5 px-4 text-center border-b border-white/10 bg-white/[0.02]">
        <p className="small-caps-clean text-[9px] md:text-[10px] text-white/80 tracking-[0.25em]">
          4.8★ RATED • 116+ VERIFIED GOOGLE REVIEWS • MALAHI PAKHRI CHOWK, KANKARBAGH
        </p>
      </div>

      {/* Main 3-Zone Navigation Bar */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark in Font 1 & Font 2 */}
        <a
          href="#"
          className="font-serif-display text-xl sm:text-2xl text-white whitespace-nowrap shrink-0 hover:text-white/90 transition-colors tracking-tight flex items-baseline gap-2"
        >
          <span>Pets World Pets Care</span>
          <span className="font-serif-italic text-sm sm:text-base text-white/70 hidden sm:inline font-normal">
            (Pet's Clinic)
          </span>
        </a>

        {/* Zone 2: Concise Unbolded Small-Caps Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#pet-store"
            className="small-caps-clean text-[10px] text-white/70 hover:text-white transition-colors whitespace-nowrap"
          >
            PET STORE
          </a>
          <a
            href="#clinic-services"
            className="small-caps-clean text-[10px] text-white/70 hover:text-white transition-colors whitespace-nowrap"
          >
            VET CLINIC
          </a>
          <a
            href="#reviews"
            className="small-caps-clean text-[10px] text-white/70 hover:text-white transition-colors whitespace-nowrap"
          >
            REVIEWS
          </a>
          <a
            href="#location"
            className="small-caps-clean text-[10px] text-white/70 hover:text-white transition-colors whitespace-nowrap"
          >
            LOCATION
          </a>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenSpecialModal}
            className="px-4 py-2 rounded-xl liquid-glass-interactive flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="small-caps-clean text-[9px] sm:text-[10px] text-white whitespace-nowrap">
              WHATSAPP CONCIERGE
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
