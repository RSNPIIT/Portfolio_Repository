import React from 'react';
import { TIMELINE } from '../data/portfolioData';
import { Cpu, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutTimeline: React.FC = () => {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Bio & Core Philosophy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5"
        >
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono">
            ENGINEERING PHILOSOPHY
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6 font-serif-space">
            Architecting Fast, Resilient & Intelligent Software
          </h2>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed font-sans">
            <p>
              I am <span className="text-white font-semibold">Ramrup Satpati</span>, a systems and artificial intelligence engineer focused on building high-performance architectures from first principles.
            </p>
            <p>
              Rather than staying confined to a single layer of abstraction, I bridge the spectrum: from low-level memory layout and zero-cost lock-free concurrency in <span className="text-amber-400 font-semibold">Rust</span>, to deep neural token attention networks and ensemble estimators in <span className="text-sky-400 font-semibold">Python</span>, all the way to 60fps reactive single-page applications in <span className="text-emerald-400 font-semibold">Vue.js</span>.
            </p>
            <p>
              Every project is constructed with monorepo discipline, rigorous unit testing, and determinism in mind.
            </p>
          </div>

          {/* Three pillars */}
          <div className="mt-8 space-y-4">
            <motion.div
              whileHover={{ x: 6 }}
              className="flex items-start gap-3.5 p-4 rounded-xl bg-[#09172c]/80 border border-white/10 shadow-lg hover:border-amber-400/40 transition-colors"
            >
              <Cpu className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-white">Zero-Cost Abstractions</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Eliminating runtime overhead, garbage collection pauses, and cache misses with atomic lock-free queues.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 6 }}
              className="flex items-start gap-3.5 p-4 rounded-xl bg-[#09172c]/80 border border-white/10 shadow-lg hover:border-sky-400/40 transition-colors"
            >
              <Zap className="w-5 h-5 text-sky-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-white">Deep Neural Cognition</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  PyTorch attention networks, multi-choice reasoning models, and LightGBM ensemble trees with SHAP interpretability.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 6 }}
              className="flex items-start gap-3.5 p-4 rounded-xl bg-[#09172c]/80 border border-white/10 shadow-lg hover:border-emerald-400/40 transition-colors"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-white">Accessible Reactive Systems</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Vue 3 component suites strictly compliant with WCAG AA accessibility, token-based design systems, and Pinia stores.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column: Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono">
            TRACK RECORD & MILESTONES
          </span>
          <h2 className="text-3xl font-bold text-white mt-2 mb-8 font-serif-space">
            Engineering Timeline
          </h2>

          <div className="relative border-l-2 border-cyan-500/30 ml-3 space-y-8 pl-8">
            {TIMELINE.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative group p-4 rounded-xl bg-[#09172c]/40 hover:bg-[#09172c]/90 border border-white/5 hover:border-cyan-400/30 transition-all"
              >
                {/* Node dot with pulsing beacon */}
                <div className="absolute -left-[42px] top-6 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:scale-125 transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mx-auto mt-0.5 group-hover:animate-ping" />
                </div>

                <div className="text-xs font-mono text-cyan-400 font-semibold mb-1 flex items-center gap-2">
                  <span>{item.year}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-300 font-medium">{item.org}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.role}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
