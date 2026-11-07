# Implementation Plan: Restoring 3D Panoramic Projects Carousel & Adding Cinematic Video Showcase

This plan restores the **3D Curved Panoramic Carousel** for your flagship projects and adds a **dedicated Cinematic Video Showcase** for your edited video reels (@konaseema_chinnaodu).

---

## 1. User Choices Confirmed
- **Projects Style**: 3D Curved Panoramic Carousel with center card highlight, 3D rotation, and smooth Prev/Next navigation.
- **Video Showcase**: A dedicated section specifically for your edited video reels with instant interactive playback modal.

---

## 2. Proposed Changes

### Component 1: `src/components/BuiltWithoutLimits.tsx`
- Restore the 3D perspective carousel stage (`perspective: 1400px`):
  - Dynamic `translateX`, `translateZ`, and `rotateY` transforms calculated from `activeIndex`.
  - Responsive offset for mobile (`180px`) vs desktop (`320px`) to prevent edge clipping.
  - Active center card glowing red border and elevated depth.
  - Interactive navigation controls: Prev/Next arrow buttons and clickable dot indicators.
  - Clicking any side card jumps it to center; clicking the center card opens the project details modal.

### Component 2: `src/types/portfolio.ts`
- Add `VideoReelItem` interface:
  - `id`: string
  - `title`: string
  - `category`: string (e.g., "Cinematic Reel", "Travel & Culture", "Speed Ramp Edit")
  - `videoUrl`: string (supports local MP4 or direct video links)
  - `thumbnailUrl`?: string
  - `duration`: string
  - `description`: string
  - `tags`: string[] (e.g., ["Premiere Pro", "After Effects", "Color Grading", "Sound Design"])
  - `instagramUrl`?: string

### Component 3: `src/data/defaultPortfolio.ts`
- Add `defaultVideoReels`:
  - Curated collection of your video editing work for `@konaseema_chinnaodu` (Monsoon Cinematic, Speed Ramp Travel, Cultural Heritage, Visual Montage).
  - Ready for you to drop in your own video files or links whenever you want.

### Component 4: `src/components/VideoShowcase.tsx` (New Component)
- Create a dedicated **"CINEMATIC REELS & VIDEO CREATIONS"** section:
  - 9:16 vertical cards with play button overlay, duration pill, and editing tags.
  - Clicking a reel opens a fullscreen **Video Modal Player** with play/pause, sound, and direct Instagram link.

### Component 5: `src/App.tsx` & `src/components/Navbar.tsx`
- Integrate `<VideoShowcase />` between Works and Contact sections.
- Add "Reels" / "Videos" navigation link in Navbar with smooth scroll.

---

## 3. Verification Plan
- Verify compilation with `compile_applet`.
- Verify TypeScript types and lint checks with `lint_applet`.
- Restart development server with `restart_dev_server`.
- Test responsive view on mobile and desktop viewports.
