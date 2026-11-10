import React, { useState, useRef } from 'react';
import { Camera, Check, Upload, Lock, X } from 'lucide-react';

interface WallpaperUploadControlProps {
  isLocked: boolean;
  onWallpaperLocked: (url: string) => void;
}

export const WallpaperUploadControl: React.FC<WallpaperUploadControlProps> = ({
  isLocked,
  onWallpaperLocked,
}) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>('');
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // If already locked permanently or dismissed, do not render
  if (isLocked || isDismissed) {
    return null;
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setStatusText('UPLOADING & LOCKING...');

    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
      });
      reader.readAsDataURL(file);
      const base64Data = await base64Promise;

      const response = await fetch('/api/lock-permanent-wallpaper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          base64Data,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to save wallpaper');
      }

      onWallpaperLocked(result.url);
      setIsDone(true);
      setStatusText('✓ WALLPAPER LOCKED PERMANENTLY');

      // Hide permanently after 3 seconds
      setTimeout(() => {
        setIsDismissed(true);
      }, 3000);
    } catch (err: any) {
      console.error('Error uploading wallpaper:', err);
      setStatusText(`ERROR: ${err.message || 'UPLOAD FAILED'}`);
      setTimeout(() => {
        setIsUploading(false);
        setStatusText('');
      }, 4000);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 animate-in fade-in duration-300">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={isUploading || isDone}
        onChange={handleFileChange}
      />

      <div className="p-1 rounded-full liquid-glass-interactive bg-black/70 border border-white/30 backdrop-blur-xl shadow-2xl flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading || isDone}
          className="py-2.5 px-4 rounded-full flex items-center gap-2 cursor-pointer transition-all hover:bg-white/10 active:scale-95 text-white"
        >
          {isDone ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : isUploading ? (
            <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Camera className="w-4 h-4 text-emerald-400" />
          )}

          <div className="flex flex-col text-left">
            <span className="small-caps-clean text-[9.5px] sm:text-[10px] tracking-[0.2em] font-medium text-white">
              {statusText || 'UPLOAD BG WALLPAPER'}
            </span>
            {!statusText && (
              <span className="small-caps-clean text-[7.5px] text-white/50 tracking-[0.16em]">
                LOCKS PERMANENTLY INTO CODE
              </span>
            )}
          </div>
        </button>

        {!isUploading && !isDone && (
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-2 text-white/40 hover:text-white transition-colors cursor-pointer mr-1"
            aria-label="Dismiss upload button"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
