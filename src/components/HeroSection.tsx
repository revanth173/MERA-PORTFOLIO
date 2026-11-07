import React, { useEffect, useRef } from 'react';
import { ArrowDown, Eye, Send } from 'lucide-react';
import { PortfolioConfig } from '../types/portfolio';
import { sound } from '../utils/audio';

interface HeroSectionProps {
  config: PortfolioConfig;
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onExploreClick,
  onContactClick,
}) => {
  const videoElementRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      sound.playWhoosh();
    }, 400);

    if (videoElementRef.current) {
      videoElementRef.current.defaultMuted = true;
      videoElementRef.current.muted = true;
      videoElementRef.current.play().catch(() => {});
    }

    return () => clearTimeout(timer);
  }, []);

  const activeVideoUrl = config.customVideoUrl || '/walking_hero.mp4';

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden bg-black pt-20 pb-8 select-none"
    >
      {/* Full-Bleed Edge-to-Edge Red Studio Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Full width ambient red wash spanning 100% screen with zero side gaps */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/50 via-red-900/30 to-red-950/50" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[650px] bg-red-600/30 blur-[140px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[420px] bg-red-500/25 blur-[100px] rounded-full animate-pulse" />

        {/* 3D Perspective Studio Floor Grid - 100% full screen width */}
        <div
          className="absolute bottom-0 left-0 right-0 w-full h-[480px] opacity-45 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(220, 38, 38, 0.22) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(220, 38, 38, 0.22) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            transform: 'perspective(450px) rotateX(68deg)',
            transformOrigin: 'bottom center',
          }}
        />

        {/* Horizon laser line spanning edge to edge */}
        <div className="absolute bottom-[300px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-red-950/50 via-red-900/20 to-transparent blur-2xl" />
      </div>

      {/* Top Header Kicker: ••• WELCOME TO MY WORLD ••• */}
      <div className="relative z-30 flex flex-col items-center text-center px-4 pt-2 transition-all duration-700 opacity-100 translate-y-0">
        <div className="inline-flex items-center gap-3 text-xs md:text-sm font-mono tracking-[0.4em] text-zinc-300 uppercase py-1.5 px-4 bg-black/60 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          <span>••• {config.welcomeKicker || 'WELCOME TO MY WORLD'} •••</span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
        </div>
      </div>

      {/* Main Stage */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-center flex-1 my-2">
        {/* Left Side Tag */}
        <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-start gap-2.5 z-30 transition-all duration-700 delay-300 opacity-100 translate-x-0">
          <div className="text-[11px] font-mono tracking-widest text-zinc-300 bg-black/85 backdrop-blur-md px-3.5 py-1.5 border border-red-500/40 rounded-lg shadow-xl">
            [ {config.titleRole || 'FULL-STACK DEVELOPER & VIDEO EDITOR'} ]
          </div>
          {config.college && (
            <div className="text-[10px] font-mono tracking-wider text-red-400 bg-black/75 backdrop-blur-md px-3 py-1 border border-white/10 rounded">
              {config.college}
            </div>
          )}
          <div className="h-16 w-[1px] bg-gradient-to-b from-red-600 to-transparent ml-4 mt-1" />
        </div>

        {/* Giant 3D Glowing Typography BEHIND Character */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden z-10 px-2">
          <h1
            className="text-[6.5vw] sm:text-[7.5vw] md:text-[8vw] lg:text-[8.5vw] font-heading font-black tracking-tight uppercase text-center leading-none text-red-600 select-none whitespace-nowrap animate-title-slam max-w-full"
            style={{
              textShadow: '0 0 60px rgba(220,38,38,0.95), 0 0 120px rgba(185,28,28,0.7)',
              filter: 'drop-shadow(0 0 45px rgba(220, 38, 38, 0.85)) drop-shadow(0 0 10px rgba(0,0,0,0.9))',
              letterSpacing: '-0.02em',
            }}
          >
            {config.name.toUpperCase()}
          </h1>
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.55em] text-red-400 font-mono mt-2 transition-opacity duration-700 opacity-100 text-center px-2">
            {config.titleRole}
          </div>
        </div>

        {/* Central Character Stage: Natural 9:16 Portrait Ratio & Viewport Height */}
        <div className="relative z-20 flex flex-col items-center">
          <div className="relative h-[58vh] sm:h-[68vh] md:h-[78vh] lg:h-[84vh] max-h-[860px] aspect-[9/16] flex items-end justify-center">
            <video
              ref={videoElementRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-contain object-bottom select-none pointer-events-none mix-blend-screen"
            >
              <source src="/walking_hero.webm" type="video/webm" />
              <source src="/walking_hero.mp4" type="video/mp4" />
            </video>

            {/* Glowing Floor Spotlight */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-56 sm:w-80 md:w-96 lg:w-[480px] h-12 sm:h-16 bg-red-600/50 rounded-full blur-2xl pointer-events-none transition-opacity duration-700 opacity-100" />
          </div>
        </div>
      </div>

      {/* Bottom Section Controls */}
      <div className="relative z-30 flex flex-col items-center gap-3 sm:gap-4 px-4 transition-all duration-700 delay-300 opacity-100 translate-y-0">
        {/* Mobile & Tablet College Tag */}
        {config.college && (
          <div className="lg:hidden text-[11px] font-mono text-zinc-400 text-center px-4 py-1 bg-black/60 rounded-full border border-white/10">
            {config.college}
          </div>
        )}

        <p className="max-w-xl text-center text-xs md:text-sm text-zinc-400 font-body leading-relaxed text-balance px-2">
          {config.bioSummary}
        </p>

        {/* Buttons: [ Explore Universe ] [ Get In Touch ] */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              sound.playWhoosh();
              onExploreClick();
            }}
            className="flex items-center gap-2.5 px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-xs md:text-sm font-bold uppercase tracking-wider rounded-xl shadow-[0_0_35px_rgba(220,38,38,0.55)] transition-all active:scale-95 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Explore Universe</span>
          </button>

          <button
            onClick={() => {
              sound.playTick();
              onContactClick();
            }}
            className="flex items-center gap-2.5 px-6 py-3 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs md:text-sm font-semibold uppercase tracking-wider rounded-xl border border-zinc-700/80 transition-all active:scale-95 cursor-pointer"
          >
            <Send className="w-4 h-4 text-red-400" />
            <span>Get In Touch</span>
          </button>
        </div>

        <button
          onClick={() => {
            sound.playTick();
            onExploreClick();
          }}
          className="flex flex-col items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors pt-1 group cursor-pointer"
        >
          <span className="text-[10px] uppercase font-mono tracking-[0.25em]">Scroll Down</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-red-500" />
        </button>
      </div>
    </section>
  );
};
