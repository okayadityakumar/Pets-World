import React, { useState } from 'react';
import { Camera, Upload, Check, Sparkles, RefreshCw } from 'lucide-react';
import { PermanentAssets } from '../types';

interface WallpaperFloatingEditBarProps {
  assets: PermanentAssets;
  onUpdateAssets: (updated: PermanentAssets) => void;
}

export const WallpaperFloatingEditBar: React.FC<WallpaperFloatingEditBarProps> = ({
  assets,
  onUpdateAssets,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [hasUploadedInSession, setHasUploadedInSession] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [isCollapsed, setIsCollapsed] = useState(false);

  // If permanently locked, completely disable and hide the floating bar
  if (assets.isWallpaperLocked) {
    return null;
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setStatusMessage('Writing to code & updating background...');

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
        onUpdateAssets(json.data);
        setHasUploadedInSession(true);
        setStatusMessage('Photo applied! Check background and confirm below.');
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        throw new Error(json.error || 'Upload failed');
      }
    } catch (err: any) {
      console.error('Wallpaper upload error:', err);
      setStatusMessage(`Error: ${err.message || 'Upload failed'}`);
      setTimeout(() => setStatusMessage(null), 4000);
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfirmAndLock = async () => {
    setIsConfirming(true);
    try {
      const res = await fetch('/api/confirm-wallpaper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const json = await res.json();
      if (json.success && json.data) {
        onUpdateAssets(json.data);
      } else {
        // Fallback local lock
        onUpdateAssets({
          ...assets,
          isWallpaperLocked: true,
          wallpaperLockedAt: new Date().toISOString(),
        });
      }
    } catch (err: any) {
      console.error('Lock confirmation error:', err);
      // Fallback
      onUpdateAssets({
        ...assets,
        isWallpaperLocked: true,
      });
    } finally {
      setIsConfirming(false);
    }
  };

  if (isCollapsed) {
    return (
      <aside
        aria-label="Wallpaper editing controls"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-3 duration-300 pointer-events-auto"
      >
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          className="py-2.5 px-4 rounded-full bg-emerald-700/85 hover:bg-emerald-600 border border-emerald-400/80 text-white font-medium text-xs shadow-2xl flex items-center gap-2.5 cursor-pointer active:scale-95 transition-all backdrop-blur-md group"
          title="Open website photo studio & wallpaper controls"
        >
          <Camera className="w-3.5 h-3.5 text-emerald-200 group-hover:scale-110 transition-transform" />
          <span className="small-caps-clean text-[9.5px] tracking-[0.2em] font-medium text-white">
            WEBSITE PHOTO STUDIO (MAKING PHASE)
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
        </button>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Wallpaper editing controls"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto"
    >
      <div className="bg-black/90 backdrop-blur-2xl border border-white/25 rounded-2xl p-2.5 sm:p-3.5 shadow-[0_16px_50px_rgba(0,0,0,0.9)] flex flex-col sm:flex-row items-center justify-between gap-3 text-white ring-1 ring-white/10">
        {/* Left: Indicator & Status */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Active Thumbnail Preview */}
          <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-white/30 shrink-0 bg-slate-900 shadow-md flex items-center justify-center">
            <img
              src={assets.websiteBackground || '/assets/wallpaper.jpg'}
              alt="Active wallpaper preview"
              className="w-full h-full object-cover"
            />
            {hasUploadedInSession && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-black animate-pulse" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Camera className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="small-caps-clean text-[9.5px] sm:text-[10px] tracking-[0.2em] text-white font-medium truncate">
                STATIC BACKGROUND WALLPAPER
              </span>
            </div>
            <p className="text-[10.5px] text-white/70 truncate mt-0.5">
              {statusMessage ||
                (hasUploadedInSession
                  ? 'Photo applied full-screen live! Click confirm to lock permanently.'
                  : 'Full-resolution static wallpaper active. Confirm to lock permanently.')}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
          {/* Upload Button */}
          <label className="flex-1 sm:flex-none py-2 px-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white text-xs font-medium cursor-pointer transition-all flex items-center justify-center gap-1.5 active:scale-95 select-none shadow-sm">
            {isUploading ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
            ) : (
              <Upload className="w-3.5 h-3.5 text-emerald-300" />
            )}
            <span className="small-caps-clean text-[9px] tracking-wider font-semibold">
              {isUploading
                ? 'SAVING...'
                : hasUploadedInSession
                ? 'CHANGE PHOTO'
                : 'UPLOAD PHOTO'}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={isUploading || isConfirming}
              onChange={handleFileSelect}
            />
          </label>

          {/* Confirm & Permanently Lock Button */}
          <button
            type="button"
            onClick={handleConfirmAndLock}
            disabled={isUploading || isConfirming}
            className="flex-1 sm:flex-none py-2 px-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-semibold text-xs cursor-pointer shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-1.5 active:scale-95 select-none disabled:opacity-50"
            title="Permanently save this wallpaper into the code files and hide this edit bar forever"
          >
            {isConfirming ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            )}
            <span className="small-caps-clean text-[9px] tracking-wider font-bold">
              {isConfirming ? 'LOCKING...' : 'CONFIRM & LOCK'}
            </span>
          </button>

          {/* Minimize Button */}
          <button
            type="button"
            onClick={() => setIsCollapsed(true)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-all text-xs"
            title="Minimize to floating pill"
          >
            ✕
          </button>
        </div>
      </div>
    </aside>
  );
};
