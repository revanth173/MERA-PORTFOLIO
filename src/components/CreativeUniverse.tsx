import React, { useState } from 'react';
import {
  Sparkles,
  Cpu,
  Award,
  Zap,
  Coffee,
  Server,
  Film,
  Code2,
  Database,
  GitBranch,
} from 'lucide-react';
import { SkillItem } from '../types/portfolio';
import { sound } from '../utils/audio';

interface CreativeUniverseProps {
  skills: SkillItem[];
}

export const CreativeUniverse: React.FC<CreativeUniverseProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(skills[0] || null);

  const categories = ['All', 'Backend & Systems', 'Algorithms & DSA', 'Video & Motion', 'Frontend & Web'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  const renderSkillIcon = (iconName: string, className: string = 'w-5 h-5') => {
    switch (iconName) {
      case 'coffee':
        return <Coffee className={className} />;
      case 'server':
        return <Server className={className} />;
      case 'cpu':
        return <Cpu className={className} />;
      case 'film':
        return <Film className={className} />;
      case 'code':
        return <Code2 className={className} />;
      case 'database':
        return <Database className={className} />;
      case 'git-branch':
        return <GitBranch className={className} />;
      case 'zap':
        return <Zap className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <section
      id="universe"
      className="relative min-h-screen w-full bg-[#050505] py-24 flex flex-col items-center justify-center overflow-hidden border-t border-white/[0.06]"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="text-center mb-10">
          <div className="text-xs font-mono tracking-[0.3em] text-red-500 uppercase mb-2">
            Skill Galaxy & Technology Core
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold uppercase tracking-tight text-white">
            THE CREATIVE UNIVERSE
          </h2>
          <p className="mt-3 text-sm text-zinc-400 font-body max-w-lg mx-auto">
            Where logic meets aesthetic mastery. Interactive orbital stack powering next-generation digital artifacts.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-xl mb-12 shadow-2xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playTick();
                setSelectedCategory(cat);
              }}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredSkills.map((skill) => {
              const isSelected = activeSkill?.id === skill.id;
              return (
                <div
                  key={skill.id}
                  onClick={() => {
                    sound.playHover();
                    setActiveSkill(skill);
                  }}
                  className={`group relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                    isSelected
                      ? 'bg-zinc-900/90 border-red-500 shadow-[0_0_25px_rgba(220,38,38,0.35)] -translate-y-1'
                      : 'bg-zinc-950/60 hover:bg-zinc-900/70 border-white/[0.08] hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm border"
                      style={{
                        backgroundColor: `${skill.glowColor}18`,
                        borderColor: `${skill.glowColor}50`,
                        color: skill.glowColor,
                      }}
                    >
                      {renderSkillIcon(skill.icon, 'w-5 h-5')}
                    </div>
                    <span className="text-[11px] font-mono tabular-nums text-zinc-400 group-hover:text-white transition-colors">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors truncate">
                    {skill.name}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1 flex items-center gap-1.5">
                    <span>{skill.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{skill.years}y</span>
                  </div>

                  <div className="mt-3 w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: isSelected ? '#EF4444' : skill.glowColor,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-4">
            {activeSkill ? (
              <div className="p-6 rounded-3xl bg-zinc-900/80 border border-white/[0.08] backdrop-blur-md shadow-2xl relative overflow-hidden">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border"
                  style={{
                    backgroundColor: `${activeSkill.glowColor}25`,
                    borderColor: `${activeSkill.glowColor}60`,
                    color: activeSkill.glowColor,
                  }}
                >
                  {renderSkillIcon(activeSkill.icon, 'w-6 h-6')}
                </div>
                <div className="text-xl font-heading font-bold text-white mb-1">
                  {activeSkill.name}
                </div>
                <div className="text-xs font-mono text-red-400 uppercase tracking-wider mb-4">
                  {activeSkill.category} · {activeSkill.years} Years Experience
                </div>
                <p className="text-sm text-zinc-300 font-body leading-relaxed mb-6">
                  {activeSkill.highlight}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-zinc-400">
                    <span>Mastery Level</span>
                    <span>{activeSkill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-red-600 transition-all duration-700"
                      style={{ width: `${activeSkill.level}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
