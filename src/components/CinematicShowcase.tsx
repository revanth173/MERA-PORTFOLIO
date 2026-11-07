import React, { useState } from 'react';
import { Mail, Phone, MapPin, GraduationCap, Github, Linkedin, Instagram, Check, Copy } from 'lucide-react';
import { PortfolioConfig } from '../types/portfolio';
import { sound } from '../utils/audio';

interface CinematicShowcaseProps {
  config: PortfolioConfig;
}

export const CinematicShowcase: React.FC<CinematicShowcaseProps> = ({ config }) => {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    sound.playTick();
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section
      id="showcase"
      className="relative min-h-screen w-full bg-[#070708] py-24 flex flex-col items-center justify-center border-t border-white/[0.08]"
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Let&apos;s Connect
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
            Have a project in mind, or want to collaborate?
          </h2>
          <p className="mt-4 text-sm md:text-base text-zinc-400 font-body leading-relaxed">
            Whether you want to build scalable software, collaborate on video editing and cinematic reels, or just talk tech — feel free to drop a message!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <div className="bg-zinc-900/60 border border-white/[0.08] p-7 rounded-3xl backdrop-blur-sm flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-heading font-bold text-white mb-1">
                {config.name}
              </h3>
              <p className="text-sm text-red-400 font-medium mb-4">
                {config.titleRole}
              </p>
              <div className="space-y-2 text-xs text-zinc-300 font-body pt-3 border-t border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span>{config.college}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span>Konaseema / Surampalem, Andhra Pradesh, India</span>
                </div>
              </div>
              <p className="mt-4 text-xs sm:text-sm text-zinc-400 font-body leading-relaxed">
                {config.bioSummary}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-white/[0.06] mt-6">
              <a
                href={config.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={config.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={config.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
                title="Instagram @konaseema_chinnaodu"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4 flex flex-col justify-between">
            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/[0.08] hover:border-red-500/40 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <button
                  onClick={() => handleCopy(config.email, 'email')}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-1.5"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="text-xs text-zinc-400 font-mono">Email Address</div>
              <a href={`mailto:${config.email}`} className="text-base font-bold text-white hover:text-red-400 transition-colors">
                {config.email}
              </a>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/[0.08] hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <button
                  onClick={() => handleCopy(config.phone, 'phone')}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-1.5"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="text-xs text-zinc-400 font-mono">Phone / WhatsApp</div>
              <a href={`tel:${config.phone}`} className="text-base font-bold text-white hover:text-emerald-400 transition-colors">
                +91 {config.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/[0.06] text-center text-xs font-mono text-zinc-500">
          © {new Date().getFullYear()} {config.name}. Built with React & Tailwind CSS. All rights reserved.
        </div>
      </div>
    </section>
  );
};
