import React from 'react';
import { Phone, Clock, ShieldCheck, ExternalLink, Navigation } from 'lucide-react';

export const FindUsMap: React.FC = () => {
  const mapShareUrl = 'https://maps.app.goo.gl/Vo7c9YTZCGUGY9m17?g_st=ic';

  return (
    <footer id="location" className="relative w-full pt-16 pb-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
        
        {/* 1. Timings with Red Clock Icon */}
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <Clock className="w-4 h-4 text-[#ea3829] shrink-0" />
          <span className="text-sm sm:text-base font-semibold tracking-wide text-white uppercase">
            MONDAY – SUNDAY <span className="inline-block mx-1 text-white/50">◾</span> 10:00 AM – 8:30 PM
          </span>
        </div>
        <p className="text-[11px] sm:text-xs text-white/70 tracking-[0.15em] uppercase mb-6 font-normal">
          (OPEN ALL 7 DAYS FOR WALK-INS & APPOINTMENTS)
        </p>

        {/* 2. Prominent Address Block */}
        <div className="mb-6 max-w-xl px-2">
          <h3 className="text-lg sm:text-2xl font-medium text-white leading-relaxed sm:leading-snug">
            Malahi Pakhri Chowk, Beside Sudha, Beside Mannat Community Hall, 90 Feet Road, Doctors Colony, Kankarbagh, Patna, Bihar 800020
          </h3>
        </div>

        {/* 3. Features with Red Shield Icon */}
        <div className="flex items-center justify-center gap-2 text-white/80 text-xs sm:text-sm mb-7 px-2">
          <ShieldCheck className="w-4 h-4 text-[#ea3829] shrink-0" />
          <span className="font-normal tracking-wide">
            Full Air-Conditioned Sterile Suites <span className="inline-block mx-1 text-white/40">◾</span> Private Consultation & Pharmacy Rooms
          </span>
        </div>

        {/* 4. Bold Red Pill Button: OPEN IN GOOGLE MAPS */}
        <a
          href={mapShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto min-w-[280px] sm:min-w-[320px] py-4 px-8 rounded-full bg-[#ea3829] hover:bg-[#d62f21] active:scale-[0.98] text-white font-semibold text-sm sm:text-base tracking-[0.12em] shadow-lg shadow-red-600/30 flex items-center justify-center gap-2.5 transition-all cursor-pointer mb-9 uppercase no-underline select-none"
        >
          <span>OPEN IN GOOGLE MAPS</span>
          <ExternalLink className="w-4 h-4 stroke-[2.2]" />
        </a>

        {/* 5. Live Google Map Embed Container - Entire Card is Clickable */}
        <a
          href={mapShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full aspect-[4/3] sm:aspect-[16/10] max-w-2xl rounded-[28px] sm:rounded-[32px] overflow-hidden border border-white/20 shadow-2xl relative block bg-black/40 mb-10 group cursor-pointer"
          aria-label="Open Pets World on Google Maps"
        >
          {/* Top-Left Floating Badge: Open in Maps */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-slate-900 text-xs font-semibold shadow-md group-hover:bg-slate-100 transition-all group-hover:scale-105 pointer-events-none">
            <span>Open in Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>

          {/* Real Google Map iframe with pointer-events-none so ANY click/touch opens Google Maps */}
          <iframe
            title="Pets World Clinic and Store Google Maps Location"
            src="https://maps.google.com/maps?q=Pets+World,+Malahi+Pakhri+Chowk,+90+Feet+Road,+Kankarbagh,+Patna&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0 pointer-events-none select-none"
            loading="lazy"
            tabIndex={-1}
          />

          {/* Bottom Tap Indicator Overlay */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-medium tracking-wider flex items-center gap-1.5 pointer-events-none uppercase shadow-lg whitespace-nowrap">
            <Navigation className="w-3 h-3 text-emerald-400" />
            <span>Tap Anywhere to Open in Google Maps ↗</span>
          </div>
        </a>

        {/* 6. Contact & Direct Lines */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-white/90 mb-4">
          <a
            href="tel:+918271046719"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-white/90 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span className="small-caps-clean">CALL CLINIC: +91 82710 46719</span>
          </a>
          <span className="text-white/30">|</span>
          <a
            href="tel:+918210506250"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-white/90 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span className="small-caps-clean">+91 82105 06250</span>
          </a>
          <span className="text-white/30">|</span>
          <a
            href="https://api.whatsapp.com/send?phone=918271046719"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
          >
            <span className="small-caps-clean">WHATSAPP: 918271046719</span>
          </a>
        </div>

        {/* 7. Concierge Guarantee & Copyright */}
        <p className="small-caps-clean text-[9px] text-white/60 tracking-[0.2em] mb-4">
          OUT-OF-STOCK ITEMS & SPECIAL CLINICAL REQUESTS ARRANGED EXCLUSIVELY AT ZERO EXTRA CHARGE
        </p>

        <p className="small-caps-clean text-[8.5px] text-white/40 tracking-[0.25em]">
          © {new Date().getFullYear()} PETS WORLD PETS CARE (PET'S CLINIC) · MALAHI PAKHRI CHOWK, KANKARBAGH, PATNA · ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
};
