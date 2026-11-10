import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ShoppingBag, Search } from 'lucide-react';
import { STORE_CATEGORIES, StoreCategory, StoreProduct } from '../data/storeProducts';
import { PermanentAssets } from '../types';
import { StoreDepartmentModal, CartItem } from './StoreDepartmentModal';

interface PetStoreCarouselProps {
  assets: PermanentAssets;
  cart: Record<string, CartItem>;
  onUpdateQuantity: (product: StoreProduct, delta: number) => void;
  onClearCart: () => void;
}

export const PetStoreCarousel: React.FC<PetStoreCarouselProps> = ({
  assets,
  cart,
  onUpdateQuantity,
  onClearCart,
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
  const [modalViewMode, setModalViewMode] = useState<'browse' | 'checkout'>('browse');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Cart totals
  const cartEntries = Object.values(cart).filter((item) => item.quantity > 0);
  const cartTotalCount = cartEntries.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalPrice = cartEntries.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Duplicate the 7 categories 3 times for continuous infinite loop
  const repeatedCategories = [...STORE_CATEGORIES, ...STORE_CATEGORIES, ...STORE_CATEGORIES];

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

  // Pointer drag gestures
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

  const handleCardClick = (cat: StoreCategory) => {
    if (totalDragDistanceRef.current > 6) return;
    setSelectedCategoryId(cat.id);
    setModalViewMode('browse');
    setIsModalOpen(true);
  };

  const handleOpenAllProducts = () => {
    setSelectedCategoryId('all');
    setModalViewMode('browse');
    setIsModalOpen(true);
  };

  const handleOpenCheckout = () => {
    setSelectedCategoryId('all');
    setModalViewMode('checkout');
    setIsModalOpen(true);
  };

  return (
    <section id="pet-store" className="relative w-full py-20 overflow-hidden">
      {/* Centered Section Header */}
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center mb-10">
        <span className="small-caps-clean text-[10px] md:text-[11px] text-white/70 mb-2">
          SECTION 01 · COMPLETE NUTRITION, ACCESSORIES & TOYS
        </span>
        <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-white my-1">
          Explore Our Pet Store
        </h2>
        <p className="small-caps-clean text-[9px] md:text-[10px] text-white/60 tracking-[0.25em] max-w-xl mt-2">
          7 CURATED DEPARTMENTS · 91+ STORE ESSENTIALS · TOUCH & DRAG FREELY TO EXPLORE
        </p>

        {/* Quick Search & Filter Action Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={handleOpenAllProducts}
            className="py-2.5 px-5 rounded-full liquid-glass-interactive flex items-center gap-2 cursor-pointer border border-white/20 hover:border-white/40 text-white transition-all shadow-md group"
          >
            <Search className="w-3.5 h-3.5 text-white/70 group-hover:scale-110 transition-transform" />
            <span className="small-caps-clean text-[9px] sm:text-[9.5px] tracking-[0.22em]">
              SEARCH & BROWSE ALL 91+ ITEMS ↗
            </span>
          </button>

          {cartTotalCount > 0 && (
            <button
              type="button"
              onClick={handleOpenCheckout}
              className="py-2.5 px-5 rounded-full bg-emerald-500/20 border border-emerald-400/50 hover:bg-emerald-500/30 text-white flex items-center gap-2 cursor-pointer transition-all shadow-lg animate-pulse"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-300" />
              <span className="small-caps-clean text-[9px] sm:text-[9.5px] tracking-[0.22em] text-emerald-200">
                VIEW BASKET ({cartTotalCount} · ₹{cartTotalPrice})
              </span>
            </button>
          )}
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
            // Count items in cart for this category
            const categoryCartCount = cat.products.reduce(
              (sum, p) => sum + (cart[p.id]?.quantity || 0),
              0
            );

            const cardImage = assets.storeAccessories?.[cat.id] || cat.image;

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
                      className="w-full h-full object-cover blur-[0.5px] scale-102 opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    {/* Light natural gradient scrim preserving bright animal colors & crisp text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/55" />
                  </div>
                )}

                {/* Top: Department & Title - Centralised on Upper Side */}
                <div className="w-full flex flex-col items-center relative z-10 text-center">
                  <div className="flex items-center gap-2">
                    <span className="small-caps-clean text-[9px] md:text-[9.5px] text-white/85 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                      {cat.departmentNum} · {cat.itemCount} ITEMS
                    </span>
                    {categoryCartCount > 0 && (
                      <span className="small-caps-clean text-[8px] bg-emerald-500/80 border border-emerald-300 text-white px-2 py-0.5 rounded-full font-medium shadow-md">
                        {categoryCartCount} IN CART
                      </span>
                    )}
                  </div>
                  <div className="w-8 h-[1px] bg-white/40 my-1.5 shadow" />
                  <h3 className="font-serif-display text-xl sm:text-2xl text-white mt-1 leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] max-w-[270px]">
                    {cat.title}
                  </h3>
                </div>

                {/* Body Content: First 5 accessories as bullet points with 'view more' at last */}
                <div className="w-full flex-1 flex flex-col justify-center my-3 px-1 sm:px-2 relative z-10">
                  <ul className="space-y-1.5 text-left inline-block mx-auto w-full max-w-[260px]">
                    {cat.products.slice(0, 5).map((product) => (
                      <li
                        key={product.id}
                        className="flex items-start gap-2 text-xs sm:text-[12.5px] text-white/95 leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]"
                      >
                        <span className="text-emerald-400 font-bold text-sm leading-none shrink-0">•</span>
                        <span className="font-light tracking-wide truncate">{product.name}</span>
                      </li>
                    ))}
                    <li className="flex items-center gap-2 pt-1 text-xs sm:text-[12.5px] text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                      <span className="text-emerald-400 font-bold text-sm leading-none shrink-0">•</span>
                      <span className="font-serif-italic text-sm text-emerald-300 group-hover:text-white transition-colors underline underline-offset-4 decoration-emerald-400/50">
                        view more ↗
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Bottom Micro Action */}
                <div className="w-full pt-1 flex items-center justify-center relative z-10">
                  <span className="small-caps-clean text-[8px] text-white/60 tracking-[0.2em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                    TAP CARD TO VIEW ALL {cat.itemCount} ITEMS ↗
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Bottom Cart Pill (Visible across screen when items are selected) */}
      {cartTotalCount > 0 && (
        <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button
            type="button"
            onClick={handleOpenCheckout}
            className="py-3 px-5 rounded-full liquid-glass-interactive bg-emerald-500/25 border-emerald-400/60 hover:bg-emerald-500/35 text-white flex items-center gap-3 cursor-pointer shadow-2xl backdrop-blur-2xl transition-all"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-emerald-300" />
              <span className="absolute -top-1.5 -right-2 bg-emerald-400 text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {cartTotalCount}
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className="small-caps-clean text-[9px] tracking-[0.2em] text-white">
                STORE CART · ₹{cartTotalPrice}
              </span>
              <span className="small-caps-clean text-[7.5px] text-emerald-200 tracking-wider">
                CHECKOUT ON WHATSAPP ↗
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Interactive 7 Departments & 91+ Products Liquid Glass Modal */}
      {isModalOpen && (
        <StoreDepartmentModal
          isOpen={isModalOpen}
          initialCategoryId={selectedCategoryId}
          initialViewMode={modalViewMode}
          cart={cart}
          onUpdateQuantity={onUpdateQuantity}
          onClearCart={onClearCart}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};
