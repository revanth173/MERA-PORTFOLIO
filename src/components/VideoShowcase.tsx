import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Instagram, Film, Sparkles, X, Maximize2 } from 'lucide-react';
import { VideoReelItem } from '../types/portfolio';
import { sound } from '../utils/audio';

interface VideoShowcaseProps {
  reels: VideoReelItem[];
}

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({ reels }) => {
  const [selectedReel, setSelectedReel] = useState<VideoReelItem | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const handleOpenReel = (reel: VideoReelItem) => {
    sound.playWhoosh();
    setSelectedReel(reel);
    setIsPlaying(true);
    setIsMuted(false);
  };

  const handleCloseReel = () => {
    sound.playTick();
    setSelectedReel(null);
  };

  const toggleModalPlay = () => {
    sound.playTick();
    if (!modalVideoRef.current) return;
    if (isPlaying) {
      modalVideoRef.current.pause();
      setIsPlaying(false);
    } else {
      modalVideoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleModalMute = () => {
    sound.playTick();
    if (!modalVideoRef.current) return;
    const nextMute = !isMuted;
    modalVideoRef.current.muted = nextMute;
    setIsMuted(nextMute);
  };

  return (
    <section
      id="videos"
      className="relative min-h-screen w-full bg-[#050505] py-24 flex flex-col items-center justify-center overflow-hidden border-t border-white/[0.06]"
    >
      {/* Background Volumetric Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Film className="w-3.5 h-3.5 text-red-400" />
            <span>@konaseema_chinnaodu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold uppercase tracking-tight text-white">
            CINEMATIC REELS & EDITING
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-body leading-relaxed">
            High-retention video post-production, aesthetic speed ramps, narrative pacing, and sound design created for digital media.
          </p>
        </div>

        {/* 9:16 Video Reels Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl">
          {reels.map((reel) => (
            <div
              key={reel.id}
              onClick={() => handleOpenReel(reel)}
              className="group relative rounded-3xl bg-zinc-950/80 border border-white/[0.08] hover:border-red-500/60 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_35px_rgba(220,38,38,0.3)] flex flex-col justify-between"
            >
              {/* Top Aspect Box (9:16 Ratio Thumbnail / Video Preview) */}
              <div className="relative aspect-[9/14] w-full overflow-hidden bg-zinc-900">
                {/* Background Video Looping preview */}
                <video
                  src={reel.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />

                {/* Gradient Scrim for readable text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono font-medium text-white">
                  {reel.duration}
                </div>

                {/* Category Pill */}
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-red-600/80 backdrop-blur-md text-[10px] font-mono font-semibold uppercase tracking-wider text-white">
                  {reel.category}
                </div>

                {/* Center Play Button Overlay on Hover */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.7)] group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom Overlay Title on Card */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-heading font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                    {reel.title}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-2 mt-1">
                    {reel.description}
                  </p>
                </div>
              </div>

              {/* Bottom Metadata & Editing Tags */}
              <div className="p-4 bg-zinc-950 border-t border-white/[0.06]">
                <div className="flex flex-wrap gap-1.5">
                  {reel.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-zinc-900 text-zinc-400 border border-zinc-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Video Player Modal */}
      {selectedReel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm sm:max-w-md bg-zinc-950 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="p-4 flex items-center justify-between border-b border-white/[0.08] bg-zinc-900/60">
              <div>
                <h4 className="text-sm font-heading font-bold text-white">
                  {selectedReel.title}
                </h4>
                <p className="text-[11px] font-mono text-red-400">
                  {selectedReel.category}
                </p>
              </div>
              <button
                onClick={handleCloseReel}
                className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-[9/16] w-full bg-black flex items-center justify-center">
              <video
                ref={modalVideoRef}
                key={selectedReel.videoUrl}
                src={selectedReel.videoUrl}
                autoPlay
                playsInline
                controls
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-zinc-900/80 border-t border-white/[0.08] flex items-center justify-between">
              <p className="text-xs text-zinc-400 font-body max-w-[220px] line-clamp-1">
                {selectedReel.description}
              </p>
              {selectedReel.instagramUrl && (
                <a
                  href={selectedReel.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playTick()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
