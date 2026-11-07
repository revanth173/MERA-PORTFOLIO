import React from 'react';
import { X, Github, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { sound } from '../utils/audio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-700 p-8 rounded-3xl shadow-2xl">
        <button
          onClick={() => {
            sound.playTick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="px-3 py-1 bg-red-500/10 text-red-400 font-mono text-xs font-semibold rounded-full uppercase">
          {project.category}
        </span>
        <h3 className="text-2xl font-heading font-bold text-white mt-3 mb-1">
          {project.title}
        </h3>
        <p className="text-sm font-mono text-red-400 mb-4">{project.subtitle}</p>
        <p className="text-sm text-zinc-300 leading-relaxed font-body mb-6">
          {project.description}
        </p>

        <div className="p-4 rounded-xl bg-zinc-950 border border-white/[0.06] mb-6">
          <div className="text-xs font-mono text-red-400 uppercase tracking-wider mb-1">Impact & Highlights</div>
          <div className="text-sm text-zinc-200 font-mono">{project.metrics}</div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span key={t} className="px-3 py-1 text-xs font-mono rounded-lg bg-zinc-800 text-zinc-300">
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3 pt-4 border-t border-zinc-800">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Site</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
