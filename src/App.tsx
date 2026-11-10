import React, { useState, useEffect } from 'react';
import initialAssetsJson from './data/permanentWebsiteAssets.json';
import { PermanentAssets, InquiryModalState } from './types';
import { Camera } from 'lucide-react';
import { Hero } from './components/Hero';
import { PetStoreCarousel } from './components/PetStoreCarousel';
import { PetClinicCarousel } from './components/PetClinicCarousel';
import { ReviewsMarquee } from './components/ReviewsMarquee';
import { FindUsMap } from './components/FindUsMap';
import { VisitingDateModal } from './components/VisitingDateModal';
import { ClinicService } from './data/clinicData';
import { StoreProduct } from './data/storeProducts';
import { CartItem } from './components/StoreDepartmentModal';

export default function App() {
  const [assets, setAssets] = useState<PermanentAssets>(initialAssetsJson as PermanentAssets);
  const [inquiryModal, setInquiryModal] = useState<InquiryModalState>({
    isOpen: false,
    type: 'clinic',
    title: '',
  });

  // Persistent / active cart for Store products
  const [cart, setCart] = useState<Record<string, CartItem>>({});

  const handleUpdateQuantity = (product: StoreProduct, delta: number) => {
    setCart((prev) => {
      const currentQty = prev[product.id]?.quantity || 0;
      const nextQty = Math.max(0, currentQty + delta);
      if (nextQty === 0) {
        const next = { ...prev };
        delete next[product.id];
        return next;
      }
      return {
        ...prev,
        [product.id]: {
          product,
          quantity: nextQty,
        },
      };
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  // Fetch latest locked assets from full-stack backend
  useEffect(() => {
    fetch('/api/locked-assets')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setAssets(json.data);
        }
      })
      .catch((err) => {
        console.warn('Could not connect to /api/locked-assets, using bundled manifest:', err);
      });
  }, []);

  const handleSelectClinicService = (service: ClinicService) => {
    setInquiryModal({
      isOpen: true,
      type: 'clinic',
      title: service.title,
      category: service.category,
      highlight: service.highlight,
      applicablePets: service.applicablePets,
    });
  };

  const handleOpenSpecialConcierge = () => {
    setInquiryModal({
      isOpen: true,
      type: 'special',
      title: 'Special Item or Clinical Arrangement',
      category: 'Owner Direct Concierge',
      highlight: 'Zero Extra Charge Guarantee',
      applicablePets: ['DOG', 'CAT', 'BIRD', 'RABBIT', 'FISH', 'OTHER'],
    });
  };

  const handleCloseModal = () => {
    setInquiryModal((prev) => ({ ...prev, isOpen: false }));
  };

  const [isUploadingWallpaper, setIsUploadingWallpaper] = useState(false);

  const handleWallpaperUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingWallpaper(true);
    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
      });
      reader.readAsDataURL(file);
      const base64Data = await base64Promise;

      const res = await fetch('/api/upload-wallpaper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64Data, filename: file.name }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setAssets(json.data);
      }
    } catch (err) {
      console.error('Failed to upload wallpaper:', err);
    } finally {
      setIsUploadingWallpaper(false);
    }
  };

  const wallpaper = assets.websiteBackground || '/assets/wallpaper.jpg';

  return (
    <div className="relative min-h-screen w-full bg-[#080d14] text-white overflow-x-hidden selection:bg-white/20 selection:text-white">
      {/* Website Wallpaper Upload Option (Disappears permanently once uploaded and locked) */}
      {!assets.isWallpaperLocked && (
        <div className="fixed top-5 left-5 z-40 animate-in fade-in slide-in-from-top-3 duration-300">
          <label
            className="liquid-glass-interactive py-2.5 px-4 rounded-full flex items-center gap-2 cursor-pointer border border-emerald-400/60 hover:border-emerald-300 text-white shadow-2xl bg-black/60 backdrop-blur-xl group transition-all"
            title="Upload and permanently store website wallpaper into code"
          >
            <Camera className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="small-caps-clean text-[9.5px] tracking-[0.2em] text-white">
              {isUploadingWallpaper ? 'SAVING WALLPAPER...' : 'EDIT WEBSITE WALLPAPER'}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={isUploadingWallpaper}
              onChange={handleWallpaperUpload}
            />
          </label>
        </div>
      )}

      {/* Full-Page Background Wallpaper or Ultra-Clean Zero-Stock Atmospheric Canvas */}
      {wallpaper ? (
        <div
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700 pointer-events-none"
          style={{ backgroundImage: `url(${wallpaper})` }}
        >
          {/* Subtle natural exposure layer for pure text legibility */}
          <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px]" />
        </div>
      ) : (
        /* Zero-Stock Initial Minimal Atmosphere: Pure Untinted Canvas */
        <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-[#070b12] to-[#04060a]" />
      )}

      {/* Main App Content - Floating directly over background */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* 100vh Center-Aligned Hero Section */}
        <Hero onOpenSpecialModal={handleOpenSpecialConcierge} />

        {/* Section 1: Explore Our Pet Store (7 Curated Departments, 91+ Items, Infinite RTL + Touch/Drag + Cart) */}
        <PetStoreCarousel
          assets={assets}
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onClearCart={handleClearCart}
        />

        {/* Section 2: Explore Our Clinic (10 Clinical Services, Infinite RTL + Touch/Drag) */}
        <PetClinicCarousel
          assets={assets}
          onSelectService={handleSelectClinicService}
          onUpdateAssets={(updated) => setAssets(updated)}
        />

        {/* Section 3: Verified Google Reviews Marquee (Box-Free Over Wallpaper) */}
        <ReviewsMarquee />

        {/* Section 4: Find Us Clickable Map & Centered Box-Free Contact Details */}
        <FindUsMap />
      </div>

      {/* Frictionless 1-Tap Visiting Date WhatsApp Inquiry Modal for Clinic Services & Special Concierge */}
      {inquiryModal.isOpen && (
        <VisitingDateModal
          modalState={inquiryModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
