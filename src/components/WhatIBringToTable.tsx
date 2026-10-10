import React from 'react';
import { ECOSYSTEMS, type Ecosystem } from '../data/portfolioData';
import { ConstellationCanvas } from './ConstellationCanvas';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface WhatIBringToTableProps {
  selectedEcosystem: 'python' | 'rust' | 'vue';
  onSelectEcosystem: (id: 'python' | 'rust' | 'vue') => void;
  onExploreProjects: (id: 'python' | 'rust' | 'vue') => void;
}

export const WhatIBringToTable: React.FC<WhatIBringToTableProps> = ({
  selectedEcosystem,
  onSelectEcosystem,
  onExploreProjects
}) => {
  return (
    <section id="bring-to-table" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-500/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Header matching user's image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
        className="text-center relative z-10 mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>FULL-STACK ARCHITECTURE MATRIX</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 font-serif-space">
          What I Bring to the Table
        </h2>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-sans tracking-wide">
          Why Choose Me — Select an ecosystem below to explore repositories & applications
        </p>
      </motion.div>

      {/* The 3 Core Ecosystem Cards (faithful to image.png) with motion physics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative z-10">
        {ECOSYSTEMS.map((eco: Ecosystem, idx: number) => {
          const isSelected = selectedEcosystem === eco.id;

          return (
            <motion.div
              key={eco.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              onClick={() => onSelectEcosystem(eco.id)}
              className={`ecosystem-card p-8 flex flex-col justify-between cursor-pointer border relative group ${
                isSelected
                  ? `${eco.glowClass} border-cyan-400/80 ring-2 ring-cyan-400/30 bg-gradient-to-b from-[#13233e] to-[#091426]`
                  : 'border-white/10 hover:border-white/25 hover:bg-[#0c182c]'
              }`}
            >
              {/* Animated moving border beam on selected card */}
              {isSelected && (
                <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
                  <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] opacity-30 bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#38bdf8_50%,#0000_100%)]" />
                </div>
              )}

              {/* Card Top: Icon & Headline */}
              <div className="relative z-10">
                {/* Icon Container with custom SVG styling */}
                <div className="flex justify-center mb-7">
                  <div className="w-20 h-20 rounded-2xl bg-[#1b2b46]/90 border border-white/15 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2">
                    {eco.id === 'python' && (
                      <svg className="w-12 h-12" viewBox="0 0 128 128" fill="none">
                        <path
                          d="M63.5 12c-27.2 0-25.5 11.8-25.5 11.8l.1 12.2h26v3.7H27.7S12 37.9 12 64.9s13.8 26.2 13.8 26.2h8.2v-11.7s-.4-13.8 13.6-13.8h26.4s13.2.2 13.2-12.8V25.2s1.8-13.2-23.7-13.2zm-14.3 8.3c2.6 0 4.8 2.1 4.8 4.8s-2.1 4.8-4.8 4.8-4.8-2.1-4.8-4.8 2.2-4.8 4.8-4.8z"
                          fill="url(#py-blue)"
                        />
                        <path
                          d="M64.5 116c27.2 0 25.5-11.8 25.5-11.8l-.1-12.2h-26v-3.7h36.4s15.7 1.8 15.7-25.2-13.8-26.2-13.8-26.2h-8.2v11.7s.4 13.8-13.6 13.8H54s-13.2-.2-13.2 12.8v27.6s-1.8 13.2 23.7 13.2zm14.3-8.3c-2.6 0-4.8-2.1-4.8-4.8s2.1-4.8 4.8-4.8 4.8 2.1 4.8 4.8-2.2 4.8-4.8 4.8z"
                          fill="url(#py-yellow)"
                        />
                        <defs>
                          <linearGradient id="py-blue" x1="12" y1="12" x2="89" y2="76" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#38bdf8" />
                            <stop offset="1" stopColor="#0284c7" />
                          </linearGradient>
                          <linearGradient id="py-yellow" x1="41" y1="52" x2="116" y2="116" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#fde047" />
                            <stop offset="1" stopColor="#eab308" />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}

                    {eco.id === 'rust' && (
                      <svg className="w-12 h-12" viewBox="0 0 106 106" fill="currentColor">
                        <path
                          d="M93.3 46.5c-.2-.6-.4-1.2-.7-1.8l6.7-4.4-4.5-9.3-7.5 2.8c-.5-.5-1-.9-1.5-1.3l2.8-7.5-9.3-4.5-4.4 6.7c-.6-.2-1.2-.4-1.8-.7L70.5 13l-10.2-2.1-.8 7.9c-.7 0-1.4 0-2.1.1L53 11l-9.8 3.5 1.5 7.8c-.6.2-1.3.5-1.9.8l-6.2-5.1-8.5 5.8 3.8 7c-.5.4-1 .9-1.5 1.4l-7.7-2.3-6.5 7.9 5.7 5.6c-.3.6-.6 1.2-.8 1.8L4 46.8l-3.9 9.6 7.4 3c0 .7.1 1.4.3 2.1l-7.1 3.7 2 10.2 7.9.8c.2.7.4 1.3.7 2L5 82.5l5.8 8.5 7-3.8c.4.5.9 1 1.4 1.5l-2.3 7.7 7.9 6.5 5.6-5.7c.6.3 1.2.6 1.8.8l1.4 7.6 9.6 3.9 3-7.4c.7 0 1.4.1 2.1.1l3.7 7.1 10.2-2 .8-7.9c.7-.2 1.3-.4 2-.7l4.3 6.6 8.5-5.8-3.8-7c.5-.4 1-.9 1.5-1.4l7.7 2.3 6.5-7.9-5.7-5.6c.3-.6.6-1.2.8-1.8l7.6-1.4 3.9-9.6-7.4-3c0-.7-.1-1.4-.3-2.1l7.1-3.7-2-10.2-7.9-.8zm-40.3 35c-15.7 0-28.5-12.8-28.5-28.5S37.3 24.5 53 24.5s28.5 12.8 28.5 28.5S68.7 81.5 53 81.5z"
                          fill="#f97316"
                        />
                        <circle cx="53" cy="53" r="14" fill="#1b2b46" />
                        <path d="M47 43h12v6H47zm0 14h12v6H47z" fill="#f97316" />
                      </svg>
                    )}

                    {eco.id === 'vue' && (
                      <svg className="w-12 h-12" viewBox="0 0 261.76 226.69" fill="none">
                        <path
                          d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z"
                          fill="#42b883"
                        />
                        <path
                          d="M161.096.001l-30.225 52.351L100.647.001H52.846l78.026 135.145L208.897.001z"
                          fill="#35495e"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Card Title */}
                <h3
                  className={`text-2xl font-bold text-center mb-4 transition-colors ${
                    eco.id === 'python'
                      ? 'text-sky-400 group-hover:text-sky-300'
                      : eco.id === 'rust'
                      ? 'text-amber-500 group-hover:text-amber-400'
                      : 'text-emerald-400 group-hover:text-emerald-300'
                  }`}
                >
                  {eco.name}
                </h3>

                {/* Card Description (exact copy from image.png) */}
                <p className="text-sm text-slate-300 text-center leading-relaxed mb-6 font-normal">
                  {eco.description}
                </p>

                {/* Live Performance Micro-Metrics with pulse */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3 mb-6 bg-slate-900/60 rounded-xl border border-white/5 text-center">
                  {eco.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="flex flex-col">
                      <span className="text-xs font-bold text-white font-mono tracking-wide">{m.value}</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Button (exact copy from image.png) */}
              <div className="pt-2 relative z-10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onExploreProjects(eco.id);
                  }}
                  className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm tracking-wide text-white transition-all duration-200 shadow-md flex items-center justify-center gap-2 group-hover:scale-[1.02] cursor-pointer ${
                    eco.id === 'python'
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-sky-500/25'
                      : eco.id === 'rust'
                      ? 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 shadow-amber-600/25'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-emerald-500/25'
                  }`}
                >
                  <span>{eco.buttonText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Constellation Graph underneath, clean and spaced */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
        className="relative z-10"
      >
        <ConstellationCanvas
          activeEcosystem={selectedEcosystem}
          onNodeClick={(cat) => onExploreProjects(cat)}
        />
      </motion.div>
    </section>
  );
};
