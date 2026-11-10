import React, { useState, useRef } from 'react';
import { Camera, Upload, Lock, X, Check, Image as ImageIcon, Sparkles, AlertCircle } from 'lucide-react';
import { CLINIC_CATEGORIES } from '../data/clinicData';
import { PermanentAssets } from '../types';

interface FloatingTopUploaderProps {
  assets: PermanentAssets;
  onUpdateAssets: (newAssets: PermanentAssets) => void;
}

export const FloatingTopUploader: React.FC<FloatingTopUploaderProps> = ({
  assets,
  onUpdateAssets,
}) => {
  const [isClinicModalOpen, setIsClinicModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState<string | null>(null);
  const [isLocking, setIsLocking] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const wallpaperInputRef = useRef<HTMLInputElement | null>(null);

  // If already locked permanently, never render
  if (assets.isLocked) {
    return null;
  }

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const uploadFileToServer = async (file: File, category: string): Promise<string> => {
    const reader = new FileReader();
    const base64Promise = new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
    reader.readAsDataURL(file);
    const base64Data = await base64Promise;

    const res = await fetch('/api/upload-photo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: file.name,
        base64Data,
        category,
      }),
    });

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'Upload failed');
    }
    return data.url;
  };

  const handleWallpaperChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading('wallpaper');
    try {
      const url = await uploadFileToServer(file, 'bg');
      const timestampUrl = `${url}?v=${Date.now()}`;
      const updated: PermanentAssets = {
        ...assets,
        websiteBackground: timestampUrl,
      };
      onUpdateAssets(updated);

      await fetch('/api/save-locked-assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });

      showToast('Whole-website wallpaper updated! Fixed across all sections in original dimensions.');
    } catch (err: any) {
      console.error(err);
      alert('Wallpaper upload failed: ' + (err.message || 'Error'));
    } finally {
      setIsUploading(null);
      if (wallpaperInputRef.current) wallpaperInputRef.current.value = '';
    }
  };

  const handleClinicPhotoChange = async (deptId: string, file: File) => {
    setIsUploading(deptId);
    try {
      const url = await uploadFileToServer(file, 'clinic');
      const timestampUrl = `${url}?v=${Date.now()}`;
      const updated: PermanentAssets = {
        ...assets,
        clinicServices: {
          ...(assets.clinicServices || {}),
          [deptId]: timestampUrl,
        },
      };
      onUpdateAssets(updated);

      await fetch('/api/save-locked-assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });

      showToast('Department photo updated in clinic box!');
    } catch (err: any) {
      console.error(err);
      alert('Photo upload failed: ' + (err.message || 'Error'));
    } finally {
      setIsUploading(null);
    }
  };

  const handleSaveAndLockPermanently = async () => {
    const confirmed = window.confirm(
      'Are you ready to lock these photos permanently?\n\n' +
      '• All uploaded photos (whole-website wallpaper + clinic photos) will be saved directly into the website code files.\n' +
      '• They will remain permanent even if you customize or deploy the website.\n' +
      '• This top upload bar will disappear forever.\n\n' +
      'Click OK to save permanently.'
    );

    if (!confirmed) return;

    setIsLocking(true);
    try {
      const res = await fetch('/api/lock-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assets),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to lock website');
      }

      onUpdateAssets(data.data);
      showToast('Photos permanently locked in code! Upload toolbar removed.');
    } catch (err: any) {
      console.error(err);
      alert('Locking failed: ' + (err.message || 'Error'));
    } finally {
      setIsLocking(false);
    }
  };

  const activeWallpaper = assets.websiteBackground || '/assets/wallpaper/website_wallpaper.jpg';

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[70] bg-emerald-500/95 backdrop-blur-md text-slate-950 font-semibold px-4 py-2.5 rounded-full shadow-2xl text-xs sm:text-sm animate-in fade-in slide-in-from-top-2 flex items-center gap-2 border border-emerald-300">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Sleek Top Pill - Crystal Clear Controls */}
      <div className="fixed top-2.5 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[96vw]">
        <div className="bg-slate-950/90 hover:bg-slate-950/95 backdrop-blur-2xl border border-white/25 rounded-2xl sm:rounded-full p-2 sm:px-4 sm:py-2 shadow-[0_15px_40px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.25)] flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-3 transition-all">
          {/* Label indicator */}
          <div className="flex items-center gap-1.5 shrink-0 px-2 py-0.5 border-b sm:border-b-0 sm:border-r border-white/15 w-full sm:w-auto justify-center sm:justify-start">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="small-caps-clean text-[9px] sm:text-[10px] text-white/90 font-medium tracking-wider">
              WHOLE-SITE DESIGN STUDIO
            </span>
          </div>

          {/* Action 1: Dedicated Button to Change Whole-Website Wallpaper */}
          <label className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/50 text-white text-[10px] sm:text-xs cursor-pointer transition-all shrink-0 shadow-sm group">
            <div className="w-4 h-4 rounded-full overflow-hidden border border-sky-300/60 shrink-0 bg-sky-950">
              <img
                src={activeWallpaper}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <span className="small-caps-clean tracking-wider font-semibold text-sky-200 group-hover:text-white">
              {isUploading === 'wallpaper' ? 'UPLOADING WALLPAPER...' : 'CHANGE WHOLE-WEBSITE WALLPAPER'}
            </span>
            <input
              ref={wallpaperInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              disabled={isUploading === 'wallpaper'}
              onChange={handleWallpaperChange}
            />
          </label>

          {/* Action 2: 8 Clinic Department Box Photos (Individual cards) */}
          <button
            type="button"
            onClick={() => setIsClinicModalOpen(true)}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[10px] sm:text-xs cursor-pointer transition-all shrink-0"
          >
            <Camera className="w-3.5 h-3.5 text-teal-400" />
            <span className="small-caps-clean tracking-wider">
              CLINIC BOX PHOTOS (8)
            </span>
          </button>

          {/* Action 3: Save & Lock Permanently into code files */}
          <button
            type="button"
            onClick={handleSaveAndLockPermanently}
            disabled={isLocking}
            className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-full bg-gradient-to-r from-emerald-500/90 to-teal-500/90 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-[10px] sm:text-xs shadow-md transition-all cursor-pointer shrink-0"
          >
            <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="small-caps-clean tracking-wider">
              {isLocking ? 'LOCKING...' : 'SAVE & LOCK PERMANENTLY'}
            </span>
          </button>
        </div>
      </div>

      {/* Modal to Upload All 8 Clinic Photos */}
      {isClinicModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsClinicModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] rounded-[24px] bg-slate-950/95 border border-white/20 shadow-2xl overflow-hidden flex flex-col text-white backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-white/15 flex items-center justify-between shrink-0 bg-white/[0.03]">
              <div>
                <span className="small-caps-clean text-[9px] text-emerald-400 tracking-[0.2em] font-medium block">
                  8 CLINICAL DEPARTMENT BOXES (CARDS)
                </span>
                <h3 className="font-serif-display text-xl sm:text-2xl text-white mt-0.5">
                  Individual Clinic Box Photos
                </h3>
                <p className="text-xs text-white/60 mt-0.5">
                  These photos appear inside each clinic department card box (separate from the whole-website background wallpaper).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsClinicModalOpen(false)}
                className="p-2 rounded-full text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Department List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 modal-scrollbar">
              {CLINIC_CATEGORIES.map((dept, index) => {
                const currentImg = assets.clinicServices?.[dept.id] || dept.image;
                const isThisUploading = isUploading === dept.id;

                return (
                  <div
                    key={dept.id}
                    className="p-3 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/15 hover:border-white/30 flex items-center justify-between gap-4 transition-all"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Photo Thumbnail */}
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/20 shrink-0 relative bg-black/40">
                        {currentImg ? (
                          <img
                            src={currentImg}
                            alt={dept.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[9px] text-white/40">
                            NO PHOTO
                          </div>
                        )}
                      </div>

                      {/* Department Info */}
                      <div className="min-w-0">
                        <span className="small-caps-clean text-[8.5px] text-emerald-400 tracking-wider block">
                          0{index + 1} · {dept.departmentNum}
                        </span>
                        <h4 className="font-serif-display text-sm sm:text-base text-white truncate font-medium">
                          {dept.title}
                        </h4>
                        <span className="text-[10px] text-white/50 truncate block mt-0.5 font-light">
                          {dept.subtitle}
                        </span>
                      </div>
                    </div>

                    {/* Upload / Change Action */}
                    <label className="py-2 px-3.5 rounded-xl liquid-glass-interactive text-center cursor-pointer shrink-0 border-white/30 hover:border-emerald-400 transition-all">
                      <span className="small-caps-clean text-[9.5px] text-white tracking-wider font-medium">
                        {isThisUploading ? 'UPLOADING...' : 'CHANGE PHOTO'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={isThisUploading}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleClinicPhotoChange(dept.id, file);
                        }}
                      />
                    </label>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer with Save & Lock shortcut */}
            <div className="p-4 sm:p-5 border-t border-white/15 bg-white/[0.02] flex items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-white/50 hidden sm:inline">
                Done uploading? Click Save & Lock Permanently to freeze.
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsClinicModalOpen(false);
                  handleSaveAndLockPermanently();
                }}
                disabled={isLocking}
                className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500/80 to-teal-500/80 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-semibold text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="small-caps-clean tracking-wider font-bold">
                  SAVE & LOCK PERMANENTLY
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
