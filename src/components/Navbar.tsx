import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  name: string;
  isAudioActive: boolean;
  onToggleAudio: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  name,
  isAudioActive,
  onToggleAudio,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navLinks = [
    { id: 'hero', label: 'Overview', href: '#hero' },
    { id: 'universe', label: 'Universe', href: '#universe' },
    { id: 'timeline', label: 'Timeline', href: '#timeline' },
    { id: 'works', label: 'Works', href: '#works' },
    { id: 'videos', label: 'Reels', href: '#videos' },
    { id: 'showcase', label: 'Contact', href: '#showcase' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/85 backdrop-blur-md border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a
          href="#hero"
          onClick={() => sound.playTick()}
          className="text-sm sm:text-base md:text-lg font-heading font-extrabold tracking-wider text-white hover:text-red-500 transition-colors uppercase truncate max-w-[200px] sm:max-w-none"
        >
          {name}
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-widest text-zinc-400 font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={() => sound.playTick()}
                className={`relative py-1 transition-colors hover:text-white ${
                  isActive ? 'text-white font-semibold' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              onToggleAudio();
              sound.playTick();
            }}
            title={isAudioActive ? 'Mute ambient soundscape' : 'Enable cinematic soundscape'}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              isAudioActive
                ? 'bg-red-950/60 border-red-700/60 text-red-200 shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span className="hidden sm:inline">Audio On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sound</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              sound.playTick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-900/80 border border-zinc-800 transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-[#09090b]/98 backdrop-blur-xl px-6 py-4 space-y-2 shadow-2xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={() => {
                  sound.playTick();
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-xs uppercase tracking-widest font-semibold transition-colors ${
                  isActive
                    ? 'text-white bg-red-600/20 border border-red-500/30'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};
