import React, { useState } from 'react';
import { type Project } from '../data/portfolioData';
import { X, Copy, Check, GitBranch, Cpu, Layers } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(project.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#071120] border border-white/20 shadow-2xl p-6 sm:p-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pr-10 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="uppercase">{project.ecosystemId} ECOSYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-space">
            {project.title}
          </h2>
          <div className="text-sm font-semibold text-emerald-400 mt-1 font-mono">
            {project.highlightMetric}
          </div>
        </div>

        {/* Full Description */}
        <div className="mb-6">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-2 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" /> System Overview
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            {project.fullDesc}
          </p>
        </div>

        {/* Architecture Flow */}
        <div className="mb-6 p-4 rounded-xl bg-slate-950/80 border border-white/10">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" /> Architecture Pipeline
          </h4>
          <div className="font-mono text-xs text-cyan-300 bg-slate-900/60 p-3 rounded-lg border border-white/5 break-words">
            {project.architecture}
          </div>
        </div>

        {/* Code Snippet */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-cyan-400" /> Implementation Source ({project.codeLanguage})
            </h4>
            <button
              type="button"
              onClick={handleCopy}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer font-mono"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Snippet
                </>
              )}
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-[#030914] border border-white/10 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-64">
            <code>{project.codeSnippet}</code>
          </pre>
        </div>

        {/* Tags */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-mono mr-1">Stack:</span>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-slate-300 font-mono bg-slate-900 px-2.5 py-1 rounded border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
