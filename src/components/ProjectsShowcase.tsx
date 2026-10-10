import React, { useState } from 'react';
import { PROJECTS, type Project } from '../data/portfolioData';
import { Sparkles, Terminal, Activity, ArrowUpRight, CheckCircle2, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectsShowcaseProps {
  selectedEcosystem: 'python' | 'rust' | 'vue' | 'all';
  onSelectEcosystem: (eco: 'python' | 'rust' | 'vue' | 'all') => void;
  onOpenModal: (project: Project) => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({
  selectedEcosystem,
  onSelectEcosystem,
  onOpenModal
}) => {
  // Mini Demo states
  // 1. MCQ Solver Demo State
  const [mcqQuestionIndex, setMcqQuestionIndex] = useState(0);
  const [mcqRunning, setMcqRunning] = useState(false);
  const [mcqResult, setMcqResult] = useState<number | null>(null);

  const sampleQuestions = [
    {
      q: "Which hash-based associative container guarantees O(1) amortized lookup with zero GC pressure?",
      options: [
        "A) Python standard dictionary with PyObject pointers",
        "B) Rust LockFreeQueue with compare-and-swap (CAS)",
        "C) Java ConcurrentHashMap with stop-the-world pauses",
        "D) C++ std::multiset with red-black tree O(log n)"
      ],
      correct: 1,
      confidences: [0.03, 0.94, 0.02, 0.01],
      rationale: "Token attention focused on 'zero GC' and 'compare-and-swap', identifying the memory-safe atomic lock-free ring structure."
    },
    {
      q: "In gradient-boosted decision trees, which method calculates exact cooperative game-theoretic feature contributions?",
      options: [
        "A) Pearson Correlation Matrix",
        "B) Gini Impurity Gain Split",
        "C) SHAP (SHapley Additive exPlanations)",
        "D) Principal Component Projections"
      ],
      correct: 2,
      confidences: [0.01, 0.05, 0.92, 0.02],
      rationale: "SHAP calculates marginal contributions across all possible feature coalitions using Shapley mathematical axioms."
    }
  ];

  const handleRunMcq = () => {
    setMcqRunning(true);
    setMcqResult(null);
    setTimeout(() => {
      setMcqRunning(false);
      setMcqResult(sampleQuestions[mcqQuestionIndex].correct);
    }, 450);
  };

  // 2. Gradient Boosting Price Calculator Demo
  const [sqft, setSqft] = useState(1850);
  const [beds, setBeds] = useState(3);
  const [locationScore, setLocationScore] = useState(8.5);

  const estimatedPrice = Math.round(
    145000 + (sqft * 215) + (beds * 42000) + (locationScore * 38000)
  );

  // 3. CLI Benchmark Demo
  const [cliRunning, setCliRunning] = useState(false);
  const [cliOutput, setCliOutput] = useState<string | null>(null);

  const handleRunCliBench = () => {
    setCliRunning(true);
    setCliOutput(null);
    setTimeout(() => {
      setCliRunning(false);
      setCliOutput("Scanned 482,910 files across 32 threads in 38.4ms (12.5M lines/s). 0 data races.");
    }, 400);
  };

  const filteredProjects = selectedEcosystem === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.ecosystemId === selectedEcosystem);

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[350px] bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono">
            ENGINEERING REPOSITORIES & ARCHITECTURES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 font-serif-space">
            Production Software & Research
          </h2>
          <p className="text-slate-400 mt-2 text-sm max-w-xl">
            Explore deep neural pipelines, low-latency concurrent systems, and responsive single-page web applications.
          </p>
        </div>

        {/* Filter Tabs (Interactive Segmented Control) */}
        <div className="mt-6 md:mt-0 flex items-center p-1 bg-slate-900/90 border border-white/10 rounded-xl backdrop-blur-md">
          <button
            type="button"
            onClick={() => onSelectEcosystem('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              selectedEcosystem === 'all'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Repositories
          </button>
          <button
            type="button"
            onClick={() => onSelectEcosystem('python')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              selectedEcosystem === 'python'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Python AI/ML
          </button>
          <button
            type="button"
            onClick={() => onSelectEcosystem('rust')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              selectedEcosystem === 'rust'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Rust Systems
          </button>
          <button
            type="button"
            onClick={() => onSelectEcosystem('vue')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              selectedEcosystem === 'vue'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Vue.js SPA
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project) => {
          return (
            <div
              key={project.id}
              className="group relative rounded-2xl bg-[#091426]/90 border border-white/10 hover:border-cyan-400/40 p-7 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/30 flex flex-col justify-between"
            >
              <div>
                {/* Meta Top Line (Zero-Pill Discipline: Unboxed clean metadata) */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-white/5 font-mono">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        project.ecosystemId === 'python'
                          ? 'bg-sky-400'
                          : project.ecosystemId === 'rust'
                          ? 'bg-amber-500'
                          : 'bg-emerald-400'
                      }`}
                    />
                    <span className="uppercase text-slate-300 font-semibold tracking-wider">
                      {project.ecosystemId === 'python'
                        ? 'Python & AI'
                        : project.ecosystemId === 'rust'
                        ? 'Rust Systems'
                        : 'Vue.js Frontend'}
                    </span>
                  </div>

                  <span className="text-cyan-300 font-semibold">
                    {project.highlightMetric}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                {/* Short Desc */}
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {project.shortDesc}
                </p>

                {/* Architecture Snippet */}
                <div className="p-3 rounded-lg bg-slate-950/70 border border-white/5 mb-5 font-mono text-xs text-slate-400">
                  <span className="text-slate-500 block mb-1">Architecture Pipeline:</span>
                  <span className="text-cyan-200">{project.architecture}</span>
                </div>

                {/* Interactive In-Card Demo Widgets */}
                {project.demoType === 'mcq' && (
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/20 mb-5 text-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sky-300 flex items-center gap-1.5 font-mono">
                        <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                        LIVE TRANSFORMER INFERENCE BENCHMARK
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setMcqQuestionIndex((prev) => (prev === 0 ? 1 : 0));
                          setMcqResult(null);
                        }}
                        className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer"
                      >
                        Cycle Question
                      </button>
                    </div>

                    <p className="text-slate-200 font-medium mb-3">
                      {sampleQuestions[mcqQuestionIndex].q}
                    </p>

                    <div className="space-y-1.5 mb-3">
                      {sampleQuestions[mcqQuestionIndex].options.map((opt, oIdx) => {
                        const isChosen = mcqResult === oIdx;
                        const isCorrect = sampleQuestions[mcqQuestionIndex].correct === oIdx;
                        return (
                          <div
                            key={oIdx}
                            className={`p-2 rounded border transition-all ${
                              mcqResult !== null && isCorrect
                                ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                                : 'bg-slate-950/40 border-white/5 text-slate-300'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span>{opt}</span>
                              {mcqResult !== null && (
                                <span className="font-mono text-[10px] text-cyan-300">
                                  {(sampleQuestions[mcqQuestionIndex].confidences[oIdx] * 100).toFixed(0)}%
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={handleRunMcq}
                        disabled={mcqRunning}
                        className="py-1.5 px-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        {mcqRunning ? 'Running PyTorch Attention...' : 'Run PyTorch Inference'}
                      </button>

                      {mcqResult !== null && (
                        <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Predicted in 42ms
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {project.demoType === 'price' && (
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/20 mb-5 text-xs">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-sky-300 flex items-center gap-1.5 font-mono">
                        <Sliders className="w-3.5 h-3.5" />
                        GBDT PARAMETER INFERENCE CALCULATOR
                      </span>
                      <span className="font-mono text-cyan-400 font-bold">
                        ${estimatedPrice.toLocaleString()} USD
                      </span>
                    </div>

                    <div className="space-y-3 mb-2">
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                          <span>Living Area: {sqft} sq ft</span>
                          <span>SHAP Gain: +${(sqft * 215).toLocaleString()}</span>
                        </div>
                        <input
                          type="range"
                          min="800"
                          max="4000"
                          step="50"
                          value={sqft}
                          onChange={(e) => setSqft(Number(e.target.value))}
                          className="w-full accent-cyan-400 cursor-pointer"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                            <span>Bedrooms: {beds}</span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="6"
                            value={beds}
                            onChange={(e) => setBeds(Number(e.target.value))}
                            className="w-full accent-cyan-400 cursor-pointer"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                            <span>Location Index: {locationScore}/10</span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            step="0.5"
                            value={locationScore}
                            onChange={(e) => setLocationScore(Number(e.target.value))}
                            className="w-full accent-cyan-400 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {project.demoType === 'cli' && (
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/20 mb-5 text-xs font-mono">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-amber-400 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5" />
                        TOKIO & RAYON MULTI-THREAD BENCHMARK
                      </span>
                    </div>

                    <div className="p-2.5 rounded bg-black/80 border border-white/5 mb-3 text-slate-300 leading-relaxed text-[11px]">
                      $ fast-grep --threads 32 --pattern "pub fn alloc_arena" /monorepo
                      <div className="text-amber-300 mt-1">
                        {cliRunning
                          ? 'Executing parallel worker scan across 32 threads...'
                          : cliOutput || 'Ready for hardware parallel sweep.'}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRunCliBench}
                      disabled={cliRunning}
                      className="py-1.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {cliRunning ? 'Benchmarking I/O...' : 'Execute Parallel Scan'}
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom: Tags (Unboxed text with dots) and Deep Dive Trigger */}
              <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400">
                  {project.tags.map((tag, tIdx) => (
                    <React.Fragment key={tag}>
                      <span className="text-slate-300 hover:text-cyan-300 transition-colors">
                        {tag}
                      </span>
                      {tIdx < project.tags.length - 1 && (
                        <span aria-hidden="true" className="text-slate-600">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onOpenModal(project)}
                  className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group-hover:translate-x-0.5"
                >
                  Architecture & Code
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
