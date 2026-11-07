import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CreativeUniverse } from './components/CreativeUniverse';
import { JourneyThroughTime } from './components/JourneyThroughTime';
import { BuiltWithoutLimits } from './components/BuiltWithoutLimits';
import { VideoShowcase } from './components/VideoShowcase';
import { CinematicShowcase } from './components/CinematicShowcase';
import { ProjectModal } from './components/ProjectModal';
import {
  defaultPortfolioConfig,
  defaultSkills,
  defaultMilestones,
  defaultProjects,
  defaultVideoReels,
} from './data/defaultPortfolio';
import { PortfolioConfig, ProjectItem } from './types/portfolio';
import { sound } from './utils/audio';

export default function App() {
  const [config] = useState<PortfolioConfig>(defaultPortfolioConfig);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'universe', 'timeline', 'works', 'videos', 'showcase'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAudio = () => {
    const nextState = !isAudioActive;
    setIsAudioActive(nextState);
    sound.setMuted(!nextState);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-zinc-100 font-body selection:bg-red-600 selection:text-white">
      <Navbar
        name={config.name}
        isAudioActive={isAudioActive}
        onToggleAudio={handleToggleAudio}
        activeSection={activeSection}
      />

      <main>
        <HeroSection
          config={config}
          onExploreClick={() => scrollToSection('universe')}
          onContactClick={() => scrollToSection('showcase')}
        />

        <CreativeUniverse skills={defaultSkills} />

        <JourneyThroughTime milestones={defaultMilestones} />

        <BuiltWithoutLimits
          projects={defaultProjects}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <VideoShowcase reels={defaultVideoReels} />

        <CinematicShowcase config={config} />
      </main>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
