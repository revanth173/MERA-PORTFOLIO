import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Layers, Sparkles } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { sound } from '../utils/audio';

interface BuiltWithoutLimitsProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export const BuiltWithoutLimits: React.FC<BuiltWithoutLimitsProps> = ({
  projects,
  onSelectProject,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    sound.playTick();
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    sound.playTick();
    setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="works"
      className="relative min-h-screen w-full bg-[#050505] py-24 flex flex-col items-center justify-center overflow-hidden border-t border-white/[0.06]"
    >
      {/* Background Volumetric Lighting & Floor Reflections */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-600/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-48 bg-gradient-to-t from-red-950/20 to-transparent blur-2xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-8 max-w-2xl">
          <div className="text-xs font-mono tracking-[0.3em] text-red-500 uppercase mb-2">
            Selected Works & Flagship Creations
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold uppercase tracking-tight text-white">
            BUILT WITHOUT LIMITS
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-body leading-relaxed">
            Real-world engineering systems, cloud architectures, competitive DSA, and viral video post-productions.
          </p>
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center gap-4 mb-8 z-30">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-zinc-900/90 border border-zinc-700 text-zinc-300 hover:text-white hover:border-red-500 hover:bg-zinc-800 transition-all active:scale-95 shadow-lg cursor-pointer"
            title="Previous project"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {projects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  sound.playTick();
                  setActiveIndex(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? 'w-8 bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]'
                    : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                }`}
                title={p.title}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-zinc-900/90 border border-zinc-700 text-zinc-300 hover:text-white hover:border-red-500 hover:bg-zinc-800 transition-all active:scale-95 shadow-lg cursor-pointer"
            title="Next project"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* 3D Curved Holographic Screen Carousel Stage */}
        <div
          className="relative w-full max-w-5xl h-[420px] sm:h-[460px] md:h-[500px] flex items-center justify-center"
          style={{ perspective: '1400px' }}
        >
          {projects.map((project, idx) => {
            const offset = (idx - activeIndex + projects.length) % projects.length;
            // Normalize offset: -2, -1, 0, 1, 2
            let normalizedOffset = offset;
            if (offset > projects.length / 2) {
              normalizedOffset = offset - projects.length;
            }

            // Only render items within immediate viewing distance (-2 to 2)
            if (Math.abs(normalizedOffset) > 2) return null;

            const isCenter = normalizedOffset === 0;
            const stepX = isMobile ? 180 : 320;
            const translateX = normalizedOffset * stepX;
            const translateZ = -Math.abs(normalizedOffset) * (isMobile ? 100 : 160);
            const rotateY = normalizedOffset * (isMobile ? -16 : -24);
            const opacity = isCenter ? 1 : Math.abs(normalizedOffset) === 1 ? (isMobile ? 0.45 : 0.65) : 0.2;
            const scale = isCenter ? 1 : 0.88;

            return (
              <div
                key={project.id}
                onClick={() => {
                  if (isCenter) {
                    sound.playWhoosh();
                    onSelectProject(project);
                  } else {
                    sound.playTick();
                    setActiveIndex(idx);
                  }
                }}
                className={`absolute w-[280px] sm:w-[350px] md:w-[420px] h-[360px] sm:h-[400px] md:h-[430px] rounded-2xl bg-zinc-950/95 border transition-all duration-500 cursor-pointer overflow-hidden group select-none flex flex-col justify-between p-6 ${
                  isCenter
                    ? 'border-red-500 shadow-[0_0_50px_rgba(220,38,38,0.35)] z-30'
                    : 'border-white/[0.08] hover:border-zinc-500 z-10'
                }`}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div>
                  {/* Category Pill and Index */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-[11px] font-semibold rounded-full uppercase">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Project Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white group-hover:text-red-400 transition-colors mb-1.5 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-red-400/90 mb-3 font-mono line-clamp-1">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-body mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Metrics Box */}
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-white/[0.06] mb-4">
                    <div className="text-[10px] font-mono text-red-400 uppercase tracking-wider mb-0.5">
                      Key Impact
                    </div>
                    <div className="text-xs text-zinc-200 font-mono font-medium truncate">
                      {project.metrics}
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-900 text-zinc-400 border border-zinc-800"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-900 text-zinc-500 border border-zinc-800">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playTick();
                        }}
                        className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                        title="GitHub Code"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playTick();
                        }}
                        className="p-2 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors"
                        title="View Live"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <span className="text-xs font-mono text-red-400 group-hover:translate-x-1 transition-transform">
                    {isCenter ? 'View Details →' : 'Click to Focus'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
