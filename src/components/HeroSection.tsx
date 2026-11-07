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
      className="relative h-screen min-h-[620px] max-h-[1080px] w-full flex flex-col items-center justify-between overflow-hidden bg-black pt-16 pb-4 sm:pb-6 select-none"
    >
      {/* Full-Bleed Edge-to-Edge Red Studio Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Full width ambient red wash spanning 100% screen with zero side gaps */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/50 via-red-900/30 to-red-950/50" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[650px] bg-red-600/30 blur-[140px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[420px] bg-red-500/25 blur-[100px] rounded-full animate-pulse" />

        {/* 3D Perspective Studio Floor Grid - 100% full screen width */}
        <div
          className="absolute bottom-0 left-0 right-0 w-full h-[45%] opacity-45 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(220, 38, 38, 0.22) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(220, 38, 38, 0.22) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            transform: 'perspective(450px) rotateX(68deg)',
            transformOrigin: 'bottom center',
          }}
        />

        {/* Horizon laser line spanning edge to edge */}
        <div className="absolute bottom-[28%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-red-950/50 via-red-900/20 to-transparent blur-2xl" />
      </div>

      {/* Top Header Kicker: ••• WELCOME TO MY WORLD ••• */}
      <div className="relative z-30 flex flex-col items-center text-center px-4 pt-1 transition-all duration-700 opacity-100 translate-y-0 shrink-0">
        <div className="inline-flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.35em] text-zinc-300 uppercase py-1 px-3.5 sm:px-4 bg-black/60 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          <span>••• {config.welcomeKicker || 'WELCOME TO MY WORLD'} •••</span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
        </div>
      </div>

      {/* Main Stage */}
      <div className="relative z-10 w-full flex items-center justify-center flex-1 my-auto overflow-visible">
        {/* Left Side Tag */}
        <div className="hidden lg:flex absolute left-6 xl:left-10 top-1/2 -translate-y-1/2 flex-col items-start gap-2 z-30 transition-all duration-700 delay-300 opacity-100 translate-x-0">
          <div className="text-[11px] font-mono tracking-widest text-zinc-300 bg-black/85 backdrop-blur-md px-3.5 py-1.5 border border-red-500/40 rounded-lg shadow-xl">
            [ {config.titleRole || 'FULL-STACK DEVELOPER & VIDEO EDITOR'} ]
          </div>
          {config.college && (
            <div className="text-[10px] font-mono tracking-wider text-red-400 bg-black/75 backdrop-blur-md px-3 py-1 border border-white/10 rounded max-w-[260px]">
              {config.college}
            </div>
          )}
          <div className="h-12 w-[1px] bg-gradient-to-b from-red-600 to-transparent ml-4 mt-1" />
        </div>

        {/* Giant 3D Glowing Typography BEHIND Character - Full-Screen Bold Spread */}
        <div className="absolute inset-0 w-full flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden z-10 px-0">
          <h1
            className="w-full text-[11.5vw] sm:text-[12.5vw] md:text-[13vw] lg:text-[13.8vw] font-heading font-black tracking-tighter uppercase text-center leading-none text-red-600 select-none whitespace-nowrap animate-title-slam"
            style={{
              textShadow: '0 0 60px rgba(220,38,38,0.95), 0 0 120px rgba(185,28,28,0.7)',
              filter: 'drop-shadow(0 0 45px rgba(220, 38, 38, 0.85)) drop-shadow(0 0 15px rgba(0,0,0,0.9))',
              letterSpacing: '-0.03em',
            }}
          >
            {config.name.toUpperCase()}
          </h1>
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.45em] sm:tracking-[0.6em] text-red-400 font-mono mt-1 sm:mt-2 transition-opacity duration-700 opacity-100 text-center px-2">
            {config.titleRole}
          </div>
        </div>

        {/* Central Character Stage: Zoomed & Scaled Prominently */}
        <div className="relative z-20 flex flex-col items-center justify-center">
          <div className="relative h-[56vh] sm:h-[62vh] md:h-[68vh] lg:h-[74vh] max-h-[760px] aspect-[9/16] flex items-end justify-center transform scale-105 sm:scale-110 md:scale-115 transition-transform duration-500">
            <video
              ref={videoElementRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-contain object-bottom select-none pointer-events-none mix-blend-screen drop-shadow-[0_20px_35px_rgba(220,38,38,0.4)]"
            >
              <source src="/walking_hero.webm" type="video/webm" />
              <source src="/walking_hero.mp4" type="video/mp4" />
            </video>

            {/* Glowing Floor Spotlight */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-56 sm:w-80 md:w-96 lg:w-[480px] h-10 sm:h-14 bg-red-600/60 rounded-full blur-2xl pointer-events-none transition-opacity duration-700 opacity-100" />
          </div>
        </div>
      </div>

      {/* Bottom Section Controls: Bio + CTA Buttons + Scroll Down Indicator */}
      <div className="relative z-30 flex flex-col items-center gap-2 sm:gap-3 px-4 transition-all duration-700 delay-300 opacity-100 translate-y-0 shrink-0">
        {/* Mobile & Tablet College Tag */}
        {config.college && (
          <div className="lg:hidden text-[10px] sm:text-[11px] font-mono text-zinc-400 text-center px-3.5 py-0.5 bg-black/60 rounded-full border border-white/10">
            {config.college}
          </div>
        )}

        <p className="max-w-xl text-center text-[11px] sm:text-xs md:text-sm text-zinc-400 font-body leading-snug sm:leading-relaxed text-balance px-2 line-clamp-2 sm:line-clamp-none">
          {config.bioSummary}
        </p>

        {/* Buttons: [ Explore Universe ] [ Get In Touch ] */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-0.5">
          <button
            onClick={() => {
              sound.playWhoosh();
              onExploreClick();
            }}
            className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-red-600 hover:bg-red-500 text-white text-xs md:text-sm font-bold uppercase tracking-wider rounded-xl shadow-[0_0_35px_rgba(220,38,38,0.55)] transition-all active:scale-95 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Explore Universe</span>
          </button>

          <button
            onClick={() => {
              sound.playTick();
              onContactClick();
            }}
            className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs md:text-sm font-semibold uppercase tracking-wider rounded-xl border border-zinc-700/80 transition-all active:scale-95 cursor-pointer"
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
          className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors pt-0.5 group cursor-pointer"
        >
          <span className="text-[9px] uppercase font-mono tracking-[0.25em]">Scroll Down</span>
          <ArrowDown className="w-3 h-3 animate-bounce text-red-500" />
        </button>
      </div>
    </section>
  );
};
