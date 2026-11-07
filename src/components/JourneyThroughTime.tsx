import React, { useState } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { TimelineMilestone } from '../types/portfolio';
import { sound } from '../utils/audio';

interface JourneyThroughTimeProps {
  milestones: TimelineMilestone[];
}

export const JourneyThroughTime: React.FC<JourneyThroughTimeProps> = ({ milestones }) => {
  const [activeYearIndex, setActiveYearIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const activeMilestone = milestones[activeYearIndex] || milestones[0];

  const handlePrev = () => {
    sound.playTick();
    setActiveYearIndex((prev) => (prev === 0 ? milestones.length - 1 : prev - 1));
  };

  const handleNext = () => {
    sound.playTick();
    setActiveYearIndex((prev) => (prev === milestones.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="timeline"
      className="relative min-h-screen w-full bg-[#050505] py-24 flex flex-col items-center justify-center overflow-hidden border-t border-white/[0.06]"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="text-center mb-8">
          <div className="text-xs font-mono tracking-[0.3em] text-red-500 uppercase mb-2">
            Chronological Trajectory
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold uppercase tracking-tight text-white">
            JOURNEY THROUGH TIME
          </h2>
          <p className="mt-3 text-sm text-zinc-400 font-body max-w-lg mx-auto">
            From B.Tech at Aditya College of Engineering and Technology to mastering Spring Boot, DSA, and cinematic video editing.
          </p>
        </div>

        <div className="w-full max-w-4xl relative mb-10">
          <div className="relative w-full h-20 flex items-center justify-between px-3 sm:px-8">
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-red-950 via-red-600 to-amber-500/80 rounded-full" />

            {milestones.map((m, idx) => {
              const isActive = idx === activeYearIndex;
              return (
                <button
                  key={`${m.year}-${m.title}-${idx}`}
                  onClick={() => {
                    sound.playTick();
                    setActiveYearIndex(idx);
                  }}
                  className={`group relative z-10 flex flex-col items-center focus:outline-none transition-all duration-300 ${
                    isActive ? 'scale-125' : 'hover:scale-110 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      isActive
                        ? 'bg-black border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.9)] text-red-400 font-bold'
                        : 'bg-zinc-950 border-zinc-700 text-zinc-400 group-hover:border-zinc-500'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold leading-none">{m.year}</span>
                  </div>
                  <span
                    className={`mt-2 text-[10px] font-mono tracking-wider transition-colors ${
                      isActive ? 'text-red-400 font-bold' : 'text-zinc-400'
                    }`}
                  >
                    {m.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {activeMilestone && (
          <div className="w-full max-w-3xl relative">
            <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/90 border border-white/[0.08] backdrop-blur-md shadow-2xl relative">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs font-semibold rounded-full uppercase">
                  {activeMilestone.category}
                </span>
                <span className="text-xl font-heading font-extrabold text-red-500">
                  {activeMilestone.year}
                </span>
              </div>

              <h3 className="text-2xl font-heading font-bold text-white mb-1">
                {activeMilestone.title}
              </h3>
              <p className="text-sm font-medium text-red-400 mb-4 font-mono">
                {activeMilestone.subtitle}
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed font-body mb-6">
                {activeMilestone.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                {activeMilestone.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono rounded-lg bg-zinc-800/80 text-zinc-300 border border-zinc-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 text-xs font-mono uppercase"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 text-xs font-mono uppercase"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
