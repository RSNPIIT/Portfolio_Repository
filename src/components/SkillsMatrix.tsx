import React, { useState } from 'react';
import { SKILLS, type SkillItem } from '../data/portfolioData';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

type CategoryKey = 'all' | 'ai_python' | 'rust_systems' | 'vue_frontend' | 'tools_infra';

export const SkillsMatrix: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');

  const filteredSkills = activeCategory === 'all'
    ? SKILLS
    : SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 relative z-10"
      >
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>QUANTITATIVE CAPABILITY MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif-space">
            Skills & Architecture Matrix
          </h2>
          <p className="text-slate-400 mt-2 text-sm max-w-xl">
            Quantitative proficiency across low-level systems, high-level reactive frameworks, and deep learning architectures.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="mt-6 md:mt-0 flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 border border-white/10 rounded-xl backdrop-blur-md">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Disciplines
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('ai_python')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeCategory === 'ai_python'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Python AI/ML
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('rust_systems')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeCategory === 'rust_systems'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Rust Systems
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('vue_frontend')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeCategory === 'vue_frontend'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Vue.js SPA
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('tools_infra')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeCategory === 'tools_infra'
                ? 'bg-indigo-500 text-white font-bold shadow-md shadow-indigo-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            DevOps & Monorepos
          </button>
        </div>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10"
      >
        <AnimatePresence>
          {filteredSkills.map((skill: SkillItem, index: number) => {
            const accentColorClass =
              skill.category === 'ai_python'
                ? 'from-sky-400 to-cyan-400'
                : skill.category === 'rust_systems'
                ? 'from-amber-400 to-orange-400'
                : skill.category === 'vue_frontend'
                ? 'from-emerald-400 to-teal-400'
                : 'from-cyan-400 to-blue-400';

            return (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="p-5 rounded-2xl bg-[#09152b]/80 border border-white/10 hover:border-cyan-400/50 hover:bg-[#0c1c38] transition-all backdrop-blur-sm shadow-xl hover:shadow-cyan-500/10 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">
                      Experience: {skill.experience}
                    </span>
                  </div>
                  <span className="text-sm font-mono font-bold text-cyan-300">
                    {skill.level}%
                  </span>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full bg-slate-900/90 h-2 rounded-full overflow-hidden mb-3 border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.05, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${accentColorClass}`}
                  />
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {skill.highlight}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
