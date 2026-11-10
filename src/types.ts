export interface PermanentAssets {
  isLocked: boolean;
  websiteBackground: string;
  storeAccessories: Record<string, string>;
  clinicServices: Record<string, string>;
  lockedAt: string;
  isWallpaperLocked?: boolean;
  wallpaperLockedAt?: string;
  lockedClinicPhotos?: Record<string, boolean>;
}

export interface InquiryModalState {
  isOpen: boolean;
  type: 'store' | 'clinic' | 'special';
  title: string;
  category?: string;
  highlight?: string;
  applicablePets?: string[];
}
