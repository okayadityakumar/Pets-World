import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { CLINIC_CATEGORIES, ClinicCategory, ClinicService } from '../data/clinicData';
import { PermanentAssets } from '../types';
import { ClinicCategoryModal } from './ClinicCategoryModal';

interface PetClinicCarouselProps {
  assets: PermanentAssets;
  onSelectService?: (service: ClinicService) => void;
}

export const PetClinicCarousel: React.FC<PetClinicCarouselProps> = ({
  assets,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const offsetRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const currentDragDeltaRef = useRef<number>(0);
  const totalDragDistanceRef = useRef<number>(0);
  const singleSetWidthRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  const animationFrameRef = useRef<number | null>(null);

  // Modal state
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Duplicate the 8 categories 3 times for continuous infinite loop
  const repeatedCategories = [...CLINIC_CATEGORIES, ...CLINIC_CATEGORIES, ...CLINIC_CATEGORIES];

  const updateSingleSetWidth = useCallback(() => {
    if (trackRef.current) {
      const totalWidth = trackRef.current.scrollWidth;
      singleSetWidthRef.current = totalWidth / 3;
    }
  }, []);

  useEffect(() => {
    updateSingleSetWidth();
    window.addEventListener('resize', updateSingleSetWidth);
    return () => window.removeEventListener('resize', updateSingleSetWidth);
  }, [updateSingleSetWidth]);

  // Infinite Right-to-Left Auto Scroll (~45px per sec for comfortable reading)
  useEffect(() => {
    const speed = 45;

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      const singleWidth = singleSetWidthRef.current;

      if (!isDraggingRef.current && singleWidth > 0) {
        offsetRef.current -= speed * Math.min(deltaTime, 0.1);

        while (offsetRef.current <= -singleWidth) {
          offsetRef.current += singleWidth;
        }
        while (offsetRef.current > 0) {
          offsetRef.current -= singleWidth;
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    currentDragDeltaRef.current = 0;
    totalDragDistanceRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    startXRef.current = e.clientX;
    currentDragDeltaRef.current = deltaX;
    totalDragDistanceRef.current += Math.abs(deltaX);

    offsetRef.current += deltaX;

    const singleWidth = singleSetWidthRef.current;
    if (singleWidth > 0) {
      while (offsetRef.current <= -singleWidth) {
        offsetRef.current += singleWidth;
      }
      while (offsetRef.current > 0) {
        offsetRef.current -= singleWidth;
      }
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handleCardClick = (cat: ClinicCategory) => {
    if (totalDragDistanceRef.current > 6) return;
    setSelectedCategoryId(cat.id);
    setIsModalOpen(true);
  };

  const handleOpenAllServices = () => {
    setSelectedCategoryId('all');
    setIsModalOpen(true);
  };

  return (
    <section id="clinic-services" className="relative w-full py-20 overflow-hidden">
      {/* Centered Section Header */}
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center mb-10">
        <span className="small-caps-clean text-[10px] md:text-[11px] text-white/70 mb-2">
          SECTION 02 · VETERINARY HEALTHCARE, DIAGNOSTICS & PREVENTIVE CARE
        </span>
        <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-white my-1">
          Explore Our Pet Clinic
        </h2>
        <p className="small-caps-clean text-[9px] md:text-[10px] text-white/60 tracking-[0.25em] max-w-xl mt-2">
          8 CLINICAL DEPARTMENTS · TAP ANY BOX TO VIEW ALL SERVICES & INQUIRE ON WHATSAPP
        </p>

        {/* Quick Search & Browse Action Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={handleOpenAllServices}
            className="py-2.5 px-5 rounded-full liquid-glass-interactive flex items-center gap-2 cursor-pointer border border-white/20 hover:border-white/40 text-white transition-all shadow-md group"
          >
            <Search className="w-3.5 h-3.5 text-white/70 group-hover:scale-110 transition-transform" />
            <span className="small-caps-clean text-[9px] sm:text-[9.5px] tracking-[0.22em]">
              SEARCH & BROWSE ALL CLINIC SERVICES ↗
            </span>
          </button>
        </div>
      </div>

      {/* Infinite Touch-Draggable Carousel Track */}
      <div
        ref={containerRef}
        className="w-full relative cursor-grab active:cursor-grabbing select-none overflow-hidden py-4"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          ref={trackRef}
          className="flex gap-6 w-max items-center will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          {repeatedCategories.map((cat, index) => {
            const cardImage = assets.clinicServices?.[cat.id] || cat.image;

            return (
              <div
                key={`${cat.id}-${index}`}
                onClick={() => handleCardClick(cat)}
                className="w-[290px] sm:w-[330px] aspect-[4/5] rounded-[28px] liquid-glass-interactive p-6 flex flex-col justify-between text-center mx-auto items-center cursor-pointer relative group shrink-0 overflow-hidden"
              >
                {/* Animal Photo Wallpaper - Crisp, Vibrant & Gently Softened */}
                {cardImage && (
                  <div className="absolute inset-0 rounded-[28px] overflow-hidden pointer-events-none -z-10">
                    <img
                      src={cardImage}
                      alt={cat.title}
                      loading="lazy"
                      className="w-full h-full object-cover blur-[0.5px] scale-102 opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    {/* Natural gradient scrim preserving crisp typography */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/60" />
                  </div>
                )}

                {/* Top: Category & Name of the Service - Centralised on Upper Side */}
                <div className="w-full flex flex-col items-center relative z-10 text-center">
                  <span className="small-caps-clean text-[9px] md:text-[9.5px] text-white/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    {cat.categoryNum} · {cat.itemCount} SERVICES
                  </span>
                  <div className="w-8 h-[1px] bg-white/40 my-1.5 shadow" />
                  <h3 className="font-serif-display text-xl sm:text-2xl text-white mt-1 leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] max-w-[270px]">
                    {cat.title}
                  </h3>
                </div>

                {/* Body Content: Services written with bullet points (dots) */}
                <div className="w-full flex-1 flex flex-col justify-center my-3 px-1 sm:px-2 relative z-10">
                  <ul className="space-y-1.5 text-left inline-block mx-auto max-w-[260px]">
                    {cat.subServices.map((service, sIdx) => (
                      <li
                        key={sIdx}
                        className="flex items-start gap-2 text-xs sm:text-[12.5px] text-white/95 leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]"
                      >
                        <span className="text-emerald-400 font-bold text-sm leading-none shrink-0">•</span>
                        <span className="font-light tracking-wide">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Micro Action */}
                <div className="w-full pt-1 flex items-center justify-center relative z-10">
                  <span className="small-caps-clean text-[8px] text-white/70 tracking-[0.2em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                    TAP TO VIEW & INQUIRE ↗
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Expanded Category Modal */}
      <ClinicCategoryModal
        isOpen={isModalOpen}
        initialCategoryId={selectedCategoryId}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
