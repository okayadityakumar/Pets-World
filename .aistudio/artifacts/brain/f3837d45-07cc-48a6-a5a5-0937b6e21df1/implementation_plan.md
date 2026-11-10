# Photo Upload Engine, Natural Wallpaper Framing & Permanent Asset Lock

A structured plan to resolve photo uploading for clinical services, restore the background wallpaper to its natural dimensions without zoom or distortion, provide a sleek floating top management bar, and permanently bake all assets directly into code files upon lock.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were confirmed in Phase 1:
> - **Wallpaper Framing**: Centered at actual size without cropping, stretching, or zoom distortion.
> - **Uploader Placement**: Sleek floating top pill with instant upload, preview, and permanent lock actions.

---

## 1. Overview & Core Concept

This system provides a reliable, self-contained asset configuration workflow for the website owner:
1. **Natural Wallpaper Framing**: Fixes the wallpaper container so custom uploaded images retain their authentic proportions, centered seamlessly over the deep obsidian atmospheric canvas without artificial stretching or responsive zoom degradation.
2. **Clinical Photo Binding**: Connects each of the 8 clinical departments directly to uploaded image assets with immediate real-time feedback in both the uploader drawer and the infinite clinic carousel.
3. **Floating Top Control Pill**: A minimalist, high-luxury floating pill bar fixed at the top of the viewport containing quick actions to manage the background, upload department images, and review status.
4. **Permanent Code-Level Lock Engine**: A 1-click "Save & Lock Permanently" action that writes all assets to persistent static storage (`/public/assets/...`), bakes the image URLs directly into `clinicData.ts` and `permanentWebsiteAssets.json`, and completely unmounts the upload controls forever.

---

## 2. User Experience & Visual Design

### Key User Flows

```
┌─────────────────────────────────────────────────────────────────┐
│               FLOATING SLEEK TOP PILL (MAKING PHASE)            │
│  [📷 Wallpaper]  [🏥 8 Clinic Photos]  [🔒 Save & Lock Permanently]  │
└────────────────────────────────┬────────────────────────────────┘
                                 │
           ┌─────────────────────┴─────────────────────┐
           ▼                                           ▼
┌───────────────────────────────┐     ┌─────────────────────────────────┐
│ 1. UPLOAD & PREVIEW           │     │ 2. SAVE & LOCK PERMANENTLY      │
│ • Natural-dimension Wallpaper │     │ • Files written to static asset │
│ • 8 Dept Photos fit into cards│     │   directories on disk           │
│ • Instant carousel update     │     │ • Source data models updated    │
└───────────────────────────────┘     │ • Floating pill destroyed/hidden│
                                      └─────────────────────────────────┘
```

### Visual Specifications
- **Floating Top Bar**: Rounded-full pill (`backdrop-blur-xl bg-black/60 border border-white/20 text-white`) positioned at `top-4 inset-x-auto` with subtle glow and compact micro-typography.
- **Natural Wallpaper Background**: Centered using `bg-no-repeat bg-center` with `max-w-screen max-h-screen object-contain` scaling so photos maintain their crisp resolution without horizontal or vertical stretching.
- **Clinic Category Cards**: Horizontally scrolling carousel cards ($4:5$ aspect ratio) featuring deep contrast scrims over custom photography for high text legibility.

---

## 3. Key Product Decisions & Trade-Offs

- **Wallpaper Framing: Centered Natural Scale vs Full Cover**:
  - *Chosen Approach*: Centered at natural size (`object-contain` / `bg-contain bg-center bg-no-repeat`) with seamless edge fade into `#080d14`.
  - *Why*: Eliminates the aggressive zoom and pixelation caused by `bg-cover` on non-panoramic aspect ratios.
- **Asset Persistence: Static Code Injection vs Transient API**:
  - *Chosen Approach*: On lock, the server duplicates the uploaded image files to `/public/assets/clinic/` and writes the URLs directly into `src/data/clinicData.ts` and `permanentWebsiteAssets.json`.
  - *Why*: Guarantees that future code customizations, refreshes, or static deployments never revert to placeholder graphics.
- **Temporary Upload UI: Floating Top Pill**:
  - *Chosen Approach*: Unobtrusive floating pill fixed at the top center of the viewport.
  - *Why*: Keeps user controls immediately accessible while leaving the hero typography and navigation pristine.

---

## 4. Technical Architecture & Component Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                             App.tsx                                 │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ FloatingTopUploaderPill.tsx (Visible only when !isLocked)     │  │
│  │ • Wallpaper Upload Trigger                                    │  │
│  │ • Clinic Photos Drawer / Modal (8 Departments)                │  │
│  │ • 1-Click "Save & Lock Permanently" Button                    │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ Fixed Background Wallpaper Container                          │  │
│  │ (Centered, contained natural dimensions, edge-scrimmed)       │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ PetClinicCarousel.tsx (Reads assets.clinicServices[deptId])   │  │
│  └───────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────┬─────────────────────────────────┘
                                    │
                         POST /api/lock-website
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          server.ts                                  │
│  1. Copies uploaded files to /public/assets/clinic & wallpaper      │
│  2. Updates src/data/clinicData.ts image property per department    │
│  3. Writes isLocked: true to permanentWebsiteAssets.json             │
└─────────────────────────────────────────────────────────────────────┘
```

### Implementation Steps
1. **Background Wallpaper Math**: Update `App.tsx` styling for the wallpaper layer to use `bg-center bg-no-repeat` with `contain` sizing and soft radial scrim so the image is never distorted.
2. **Floating Top Bar Component**: Create `src/components/FloatingTopUploader.tsx` with:
   - File input for background wallpaper
   - Quick drawer for 8 clinical department photos
   - Permanent lock action button with confirmation
3. **Backend Persistence Hardening (`server.ts`)**:
   - Enhance `/api/upload-photo` to guarantee unique file writing and valid URL returns.
   - Enhance `/api/lock-website` to physically copy images into `/public/assets/clinic/` and rewrite `src/data/clinicData.ts` with permanent asset references.
4. **Carousel Verification**: Confirm `PetClinicCarousel.tsx` dynamically renders the latest uploaded photo for each department.
5. **Lock Finalization**: Test full permanent lock to verify that the floating uploader vanishes and all photos remain intact permanently.
