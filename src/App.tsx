/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PlanetaryHero } from './components/PlanetaryHero';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { SkillsMatrix } from './components/SkillsMatrix';
import { AboutTimeline } from './components/AboutTimeline';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { DownloadModal } from './components/DownloadModal';
import { CosmicBackground } from './components/CosmicBackground';
import { type Project } from './data/portfolioData';
import { ArrowUp } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const [selectedEcosystem, setSelectedEcosystem] = useState<'python' | 'rust' | 'vue'>('python');
  const [projectFilter, setProjectFilter] = useState<'python' | 'rust' | 'vue' | 'all'>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll Progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectEcosystem = (eco: 'python' | 'rust' | 'vue') => {
    setSelectedEcosystem(eco);
    setProjectFilter(eco);
  };

  const handleOpenContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#04101f] text-white selection:bg-[#79dce8] selection:text-[#071227] font-body-space relative overflow-x-hidden">
      {/* 1. Global Animated Cosmic Starfield & Nebula Particle Background */}
      <CosmicBackground />

      {/* 2. Top Viewport Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 origin-left z-50 shadow-[0_0_10px_rgba(56,189,248,0.7)] pointer-events-none"
        style={{ scaleX }}
      />

      {/* 3. Cinematic Full-Viewport Space Hero with Video Loops & Direct Contacts & Useful Tools */}
      <PlanetaryHero
        onSelectEcosystem={handleSelectEcosystem}
        onOpenContact={handleOpenContact}
        onOpenDownload={() => setIsDownloadOpen(true)}
      />

      {/* 4. Deep-Dive Projects Showcase & Interactive Architecture Demos */}
      <ProjectsShowcase
        selectedEcosystem={projectFilter}
        onSelectEcosystem={(eco) => setProjectFilter(eco)}
        onOpenModal={(project) => setActiveModalProject(project)}
      />

      {/* 5. Interactive Architecture REPL & CLI Playground */}
      <InteractiveTerminal />

      {/* 6. Comprehensive Skills Matrix */}
      <SkillsMatrix />

      {/* 7. Engineering Timeline & Architectural Thesis */}
      <AboutTimeline />

      {/* 8. Maximalist Direct Transmission & Footer with all profiles */}
      <ContactSection onOpenDownload={() => setIsDownloadOpen(true)} />

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />

      {/* Dedicated Project Download Modal */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />

      {/* Floating Scroll to Top Pill */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          type="button"
          onClick={scrollToHero}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#08152a]/90 backdrop-blur-md border border-cyan-500/40 text-cyan-300 hover:text-white hover:bg-cyan-500/30 hover:scale-110 transition-all shadow-xl shadow-cyan-950/50 cursor-pointer"
          aria-label="Scroll back to Cosmic Hero"
          title="Return to Space Orbit"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  );
}
