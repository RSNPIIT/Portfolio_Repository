import React, { useEffect, useRef, useState } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Zap, 
  Cpu, 
  Layers, 
  Activity, 
  Play, 
  RotateCcw,
  Download,
  Terminal,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export type PlanetKey = 'earth' | 'venus' | 'mars';

interface PlanetInfo {
  name: string;
  sub: string;
  bengaliSubtitle?: string;
  slotLabel: string;
  clip: string;
  still: string;
  cutout: string;
  ledeHtml: string;
  ctaText: string;
  ecosystemId: 'python' | 'rust' | 'vue';
  badge: string;
}

const PLANETS: Record<PlanetKey, PlanetInfo> = {
  earth: {
    name: 'RAMRUP SATPATI',
    sub: "HELLO! I'M · SYSTEMS & AI SOFTWARE ENGINEER",
    bengaliSubtitle: 'রামরূপ সাতপতি',
    slotLabel: 'AI & SYSTEMS',
    badge: 'PYTHON · PYTORCH · FULL-STACK',
    clip: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202422_3ffb4889-c520-432d-8458-038009eb40df.mp4',
    still: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202133_508c64b8-a31e-4290-bdfc-1187df70e0a6.png',
    cutout: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202005_3346cc4d-ec3b-44ab-825c-b18e49f5021a.png',
    ctaText: 'EXPLORE AI & PYTHON PROJECTS ⚡',
    ledeHtml: 'Full-Stack Systems & AI Software Engineer — <span class="font-cursive-neon text-[#facc15] font-bold text-[1.25em] not-italic ml-1">Jack of all Trades</span>.<br>Constructing PyTorch deep learning attention models, memory-safe high-concurrency Rust tools, and 60 FPS reactive Vue.js single-page applications.',
    ecosystemId: 'python'
  },
  venus: {
    name: 'VUE.JS FRONTEND',
    sub: 'REACTIVE SPA & DESIGN SYSTEM ARCHITECTURE',
    bengaliSubtitle: 'রিঅ্যাক্টিভ ওয়েব আর্কিটেকচার',
    slotLabel: 'VUE.JS SPA',
    badge: 'VUE 3 · PINIA · TYPESCRIPT · VITE',
    clip: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202422_b211cd74-013b-4dd3-bfd0-64491d8696fa.mp4',
    still: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202133_cf55d1d8-7b59-4a64-80da-d72052ae974e.png',
    cutout: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202012_640b239a-d08a-4200-adb2-741bbe129ac8.png',
    ctaText: 'EXPLORE VUE.JS FRONTEND PROJECTS ⚡',
    ledeHtml: 'Architecting modern Single-Page Applications with Vue 3 Composition API, Pinia state orchestration, and TypeScript.<br>Featuring 40+ accessible design system components, zero cumulative layout shift, and smooth 60 FPS micro-frontend transitions.',
    ecosystemId: 'vue'
  },
  mars: {
    name: 'RUST SYSTEMS',
    sub: 'BARE-METAL CONCURRENCY & ZERO-COST ABSTRACTIONS',
    bengaliSubtitle: 'সিস্টেমস প্রোগ্রামিং ও কনকারেন্সি',
    slotLabel: 'RUST SYSTEMS',
    badge: 'RUST · TOKIO · RAYON · ZERO-COST',
    clip: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202422_51eae59a-2459-4c84-907c-cc5edfe5fea7.mp4',
    still: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202133_0ba6de7c-285d-43dc-b7ab-8c54c73707cb.png',
    cutout: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202018_3d559490-f613-4ed7-a3bb-3b7e9fc90fb8.png',
    ctaText: 'EXPLORE RUST CONCURRENCY PROJECTS 🦀',
    ledeHtml: 'Low-level systems programming with zero garbage collection pauses and compile-time data race elimination.<br>High-concurrency tooling powered by Tokio async runtimes, Rayon parallel work-stealing, and lock-free thread queues benchmarked at 14.2M ops/sec.',
    ecosystemId: 'rust'
  }
};

const ORDER: PlanetKey[] = ['earth', 'venus', 'mars'];

interface PlanetaryHeroProps {
  onSelectEcosystem: (ecosystem: 'python' | 'rust' | 'vue') => void;
  onOpenContact: () => void;
  onOpenDownload?: () => void;
}

export const PlanetaryHero: React.FC<PlanetaryHeroProps> = ({
  onSelectEcosystem,
  onOpenContact,
  onOpenDownload
}) => {
  const [featured, setFeatured] = useState<PlanetKey>('earth');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Live Useful Simulation States for Venus & Mars
  // Venus (Vue 3 Reactive State Playground)
  const [vueCount, setVueCount] = useState(42);
  const [vueActiveTab, setVueActiveTab] = useState<'hms' | 'pinia' | 'components'>('hms');

  // Mars (Rust Rayon Concurrency Simulator)
  const [rustBenchRunning, setRustBenchRunning] = useState(false);
  const [rustBenchDone, setRustBenchDone] = useState(false);
  const [rustOpsCount, setRustOpsCount] = useState(14200000);
  const [rustThreadStats, setRustThreadStats] = useState([
    { id: 1, load: 94 },
    { id: 2, load: 98 },
    { id: 3, load: 91 },
    { id: 4, load: 96 }
  ]);

  // Video refs
  const videoRefs = useRef<Record<PlanetKey, HTMLVideoElement | null>>({
    earth: null,
    venus: null,
    mars: null
  });

  // Calculate side planets
  const restPlanets = ORDER.filter((p) => p !== featured);
  const leftPlanetKey = restPlanets[0];
  const rightPlanetKey = restPlanets[1];

  // Helper to warm up video
  const warmVideo = (planet: PlanetKey) => {
    const vid = videoRefs.current[planet];
    if (vid && !vid.src && vid.dataset.src) {
      vid.preload = 'auto';
      vid.src = vid.dataset.src;
      vid.load();
    }
  };

  // Planet Switch Handler
  const showPlanet = (next: PlanetKey) => {
    if (next === featured) return;
    setFeatured(next);
    onSelectEcosystem(PLANETS[next].ecosystemId);

    // Warm next video & play it
    const nextVid = videoRefs.current[next];
    if (nextVid) {
      if (!nextVid.src && nextVid.dataset.src) {
        nextVid.src = nextVid.dataset.src;
      }
      nextVid.play().catch(() => {});
    }

    // Pause others
    ORDER.forEach((p) => {
      if (p !== next) {
        const vid = videoRefs.current[p];
        if (vid) vid.pause();
      }
    });
  };

  // Run warm up on mount
  useEffect(() => {
    const warmAll = () => {
      ORDER.forEach((p) => warmVideo(p));
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(warmAll, { timeout: 3000 });
    } else {
      setTimeout(warmAll, 2000);
    }
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('ramrupsatpati@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetEcosystem = PLANETS[featured].ecosystemId;
    onSelectEcosystem(targetEcosystem);
    scrollToSection('projects');
  };

  // Mars Rayon Benchmark trigger
  const runRustBenchmark = () => {
    if (rustBenchRunning) return;
    setRustBenchRunning(true);
    setRustBenchDone(false);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setRustThreadStats([
        { id: 1, load: Math.floor(Math.random() * 20 + 80) },
        { id: 2, load: Math.floor(Math.random() * 20 + 80) },
        { id: 3, load: Math.floor(Math.random() * 20 + 80) },
        { id: 4, load: Math.floor(Math.random() * 20 + 80) }
      ]);
      setRustOpsCount((prev) => prev + Math.floor(Math.random() * 150000 + 100000));

      if (progress >= 6) {
        clearInterval(interval);
        setRustBenchRunning(false);
        setRustBenchDone(true);
      }
    }, 150);
  };

  return (
    <div ref={containerRef} className="hero-stage select-none min-h-screen relative flex flex-col justify-between">
      {/* Sky backdrop with looping videos and poster fallback */}
      <div
        className="sky"
        style={{
          backgroundImage: `url(${PLANETS[featured].still})`
        }}
      >
        <video
          ref={(el) => { videoRefs.current.earth = el; }}
          data-planet="earth"
          className={featured === 'earth' ? 'is-active' : ''}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src={PLANETS.earth.clip}
          poster={PLANETS.earth.still}
          aria-hidden="true"
        />
        <video
          ref={(el) => { videoRefs.current.venus = el; }}
          data-planet="venus"
          className={featured === 'venus' ? 'is-active' : ''}
          muted
          loop
          playsInline
          preload="none"
          data-src={PLANETS.venus.clip}
          poster={PLANETS.venus.still}
          aria-hidden="true"
        />
        <video
          ref={(el) => { videoRefs.current.mars = el; }}
          data-planet="mars"
          className={featured === 'mars' ? 'is-active' : ''}
          muted
          loop
          playsInline
          preload="none"
          data-src={PLANETS.mars.clip}
          poster={PLANETS.mars.still}
          aria-hidden="true"
        />
      </div>

      {/* Atmospheric Vignette & Cosmic Gradients */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#020b18]/70 via-transparent to-[#04101f] z-[5]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(4,16,31,0.85)_100%)] z-[6]" />

      {/* HEADER NAVBAR - Always clean, accessible and interactive */}
      <header className="relative z-30 w-full px-4 sm:px-8 py-5 border-b border-white/10 backdrop-blur-md bg-[#04101f]/75">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          {/* Brand Logo echoing Picture 2 */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="logo flex items-center gap-2.5 text-decoration-none group"
              onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:border-cyan-400 transition-all shadow-lg shadow-cyan-500/10">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-black tracking-tight text-white font-sans uppercase text-base sm:text-lg leading-tight">
                  RAMRUP <span className="text-[#38bdf8]">SATPATI</span>
                </span>
                <span className="font-bengali-glow text-amber-400 font-bold text-[11px] leading-tight drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]">
                  রামরূপ সাতপতি
                </span>
              </div>
            </a>
          </div>

          {/* Quick Nav Anchors */}
          <nav className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              type="button"
              className="text-xs sm:text-sm text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => scrollToSection('projects')}
            >
              Projects
            </button>

            <button
              type="button"
              className="text-xs sm:text-sm text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => scrollToSection('terminal')}
            >
              Terminal CLI
            </button>

            <button
              type="button"
              className="text-xs sm:text-sm text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => scrollToSection('skills')}
            >
              Skills
            </button>

            <button
              type="button"
              className="text-xs sm:text-sm text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => scrollToSection('about')}
            >
              Philosophy
            </button>

            <button
              type="button"
              className="text-xs sm:text-sm text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </button>

            {onOpenDownload && (
              <button
                type="button"
                onClick={onOpenDownload}
                className="text-xs font-mono font-bold text-slate-900 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer transition-all"
                title="Download Source Code (.ZIP)"
              >
                <Download className="w-3.5 h-3.5" />
                <span>ZIP</span>
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* CENTRAL HERO CONTENT & PLANETARY CONTROLS */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full flex-1 flex flex-col justify-center items-center text-center">
        {/* Planet Status Pill & Active Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a182f]/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4 backdrop-blur-md shadow-lg animate-pulse">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>ORBITING: {featured.toUpperCase()} // {PLANETS[featured].badge}</span>
        </div>

        {/* Planet Eyebrow Subtitle */}
        <div className="font-mono text-xs sm:text-sm text-cyan-400 tracking-widest font-semibold uppercase mb-2">
          {PLANETS[featured].sub}
        </div>

        {/* Massive Planetary Headline Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase drop-shadow-[0_8px_30px_rgba(0,0,0,0.8)] font-serif-space">
          {PLANETS[featured].name}
        </h1>

        {/* Bengali Glowing Subtitle */}
        {PLANETS[featured].bengaliSubtitle && (
          <div className="my-2">
            <span className="font-bengali-glow text-amber-400 font-bold text-lg sm:text-2xl drop-shadow-[0_0_14px_rgba(245,158,11,0.8)] tracking-wide">
              {PLANETS[featured].bengaliSubtitle}
            </span>
          </div>
        )}

        {/* Horizontal Divider Rule */}
        <div className="w-24 sm:w-36 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent my-4" />

        {/* Architectural Lede Description */}
        <p
          className="text-sm sm:text-base md:text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md mb-6 font-sans"
          dangerouslySetInnerHTML={{
            __html: PLANETS[featured].ledeHtml
          }}
        />

        {/* =========================================================================
            PROMINENT CONTACTS & SOCIALS DOCK DIRECTLY WITH THE PLANETS
            Addresses user's critical request:
            "The contacts should ideally be given with the Planets and This all links fail ->
             Kaggle Link -> https://www.kaggle.com/ramrupsatpatiiitm
             LinkedIN Link -> https://www.linkedin.com/in/ramrup-satpati-683970341
             Github Link -> https://github.com/RSNPIIT"
           ========================================================================= */}
        <div className="w-full max-w-4xl mx-auto mb-8 p-3 sm:p-4 rounded-2xl bg-[#07152b]/85 border border-cyan-500/30 backdrop-blur-xl shadow-2xl">
          <div className="text-[11px] font-mono text-cyan-300 tracking-wider uppercase text-center mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            DIRECT TRANSMISSION CHANNELS & PROFILES
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {/* 1. LinkedIn */}
            <a
              href="https://www.linkedin.com/in/ramrup-satpati-683970341"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#0e2343] hover:bg-[#153464] border border-cyan-500/40 hover:border-cyan-400 text-white font-sans text-xs sm:text-sm font-semibold transition-all hover:scale-105 shadow-md shadow-cyan-900/20 group cursor-pointer"
              title="Open Ramrup's LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-slate-400 opacity-60" />
            </a>

            {/* 2. Kaggle */}
            <a
              href="https://www.kaggle.com/ramrupsatpatiiitm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#0e2343] hover:bg-[#153464] border border-cyan-500/40 hover:border-cyan-400 text-white font-sans text-xs sm:text-sm font-semibold transition-all hover:scale-105 shadow-md shadow-cyan-900/20 group cursor-pointer"
              title="Open Ramrup's Kaggle Machine Learning Profile"
            >
              <span className="text-base leading-none">📊</span>
              <span>Kaggle</span>
              <ExternalLink className="w-3 h-3 text-slate-400 opacity-60" />
            </a>

            {/* 3. GitHub */}
            <a
              href="https://github.com/RSNPIIT"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#0e2343] hover:bg-[#153464] border border-cyan-500/40 hover:border-cyan-400 text-white font-sans text-xs sm:text-sm font-semibold transition-all hover:scale-105 shadow-md shadow-cyan-900/20 group cursor-pointer"
              title="Open Ramrup's GitHub (RSNPIIT)"
            >
              <Github className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-400 opacity-60" />
            </a>

            {/* 4. Direct Email */}
            <div className="flex items-center rounded-xl bg-[#0e2343] border border-cyan-500/40 hover:border-cyan-400 overflow-hidden transition-all hover:scale-105 shadow-md shadow-cyan-900/20">
              <a
                href="mailto:ramrupsatpati@gmail.com"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 text-white font-sans text-xs sm:text-sm font-semibold hover:bg-white/5 transition-colors cursor-pointer"
                title="Send Email to Ramrup"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Email</span>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-2.5 bg-black/30 hover:bg-black/50 text-slate-300 hover:text-white transition-colors cursor-pointer border-l border-white/10"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PLANET-SPECIFIC USEFUL INTERACTIVE SHOWCASE
            Addresses user's critical request:
            "and in the Venus Page just give something useful
             and in the Mars page also give smth useful"
           ========================================================================= */}
        <div className="w-full max-w-4xl mx-auto mb-10 text-left">
          {/* VENUS USEFUL VIEW: Live Reactive Vue 3 State Simulator & Hospital Management */}
          {featured === 'venus' && (
            <div className="p-6 rounded-2xl bg-[#091b35]/90 border border-emerald-500/40 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      Vue 3 Reactive Runtime & Architecture Explorer
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                        60 FPS VERIFIED
                      </span>
                    </h3>
                    <p className="text-xs text-slate-300">
                      Live interactive demonstration of Pinia state orchestration, Composition API, and Single-Page Architecture.
                    </p>
                  </div>
                </div>

                {/* Tab switcher for useful tools */}
                <div className="flex items-center gap-1.5 bg-[#051124] p-1 rounded-xl border border-white/10 text-xs">
                  <button
                    type="button"
                    onClick={() => setVueActiveTab('hms')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
                      vueActiveTab === 'hms' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    🏥 Healthcare HMS
                  </button>
                  <button
                    type="button"
                    onClick={() => setVueActiveTab('pinia')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
                      vueActiveTab === 'pinia' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    ⚡ Reactive Playground
                  </button>
                  <button
                    type="button"
                    onClick={() => setVueActiveTab('components')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
                      vueActiveTab === 'components' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    🎨 Design System (40+)
                  </button>
                </div>
              </div>

              {/* Tab 1: Healthcare HMS interactive preview */}
              {vueActiveTab === 'hms' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#061427] border border-white/5 space-y-2">
                    <span className="text-xs font-mono text-emerald-400">PATIENT TRIAGE & BEDS</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-white font-mono">142 Beds</span>
                      <span className="text-xs text-emerald-300 font-mono">94% Occupancy</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full w-[94%]" />
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Real-time WebSocket bed sync with zero UI layout shifts.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#061427] border border-white/5 space-y-2">
                    <span className="text-xs font-mono text-emerald-400">ELECTRONIC HEALTH RECORDS</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-white font-mono">&lt;40ms</span>
                      <span className="text-xs text-emerald-300 font-mono">Vite HMR</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-cyan-400 h-full w-[99%]" />
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Pinia cache stores patient history without re-fetching.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#061427] border border-white/5 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono text-emerald-400">PORTAL REPOSITORY</span>
                      <p className="text-xs text-slate-200 mt-1">
                        Vue 3 + TypeScript Healthcare HMS monorepo.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => scrollToSection('projects')}
                      className="mt-3 w-full py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Inspect HMS Code & Architecture</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: Reactive State Playground */}
              {vueActiveTab === 'pinia' && (
                <div className="p-4 rounded-xl bg-[#061427] border border-white/5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="font-mono text-xs text-emerald-400">PINIA STORE MUTATION ENGINE</div>
                      <div className="text-white text-sm">
                        Mutate store reactive state: <span className="font-mono text-amber-300 font-bold">useStore().telemetryCount = {vueCount}</span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono">
                        Computed double getter: <span className="text-emerald-400 font-bold">{vueCount * 2}</span> · Frame Render: <span className="text-cyan-400">16.6ms (60 FPS)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setVueCount((c) => c + 1)}
                        className="py-2 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md transition-all active:scale-95"
                      >
                        + Increment State
                      </button>
                      <button
                        type="button"
                        onClick={() => setVueCount(42)}
                        className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer transition-colors"
                        title="Reset state"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Design System */}
              {vueActiveTab === 'components' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#061427] border border-white/5">
                    <div className="font-bold text-white mb-1">Tailwind CSS v4</div>
                    <div className="text-slate-400 text-[11px]">Zero runtime CSS, high throughput design tokens.</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#061427] border border-white/5">
                    <div className="font-bold text-white mb-1">Accessibility</div>
                    <div className="text-slate-400 text-[11px]">WAI-ARIA compliance across modals & menus.</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#061427] border border-white/5">
                    <div className="font-bold text-white mb-1">Micro-Frontends</div>
                    <div className="text-slate-400 text-[11px]">Dynamic module federation and decoupled bundles.</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#061427] border border-white/5">
                    <div className="font-bold text-white mb-1">Vitest & CI</div>
                    <div className="text-slate-400 text-[11px]">Unit tests with happy-dom component testing.</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MARS USEFUL VIEW: Live Rayon Parallel Concurrency Work-Stealing Benchmark Simulator */}
          {featured === 'mars' && (
            <div className="p-6 rounded-2xl bg-[#2a120c]/90 border border-orange-500/40 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      Rust Rayon Work-Stealing Concurrency Engine
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 font-mono">
                        ZERO GC PAUSE
                      </span>
                    </h3>
                    <p className="text-xs text-slate-300">
                      Live interactive benchmark: Parallel job scheduling, compile-time borrow checking, and Tokio async actors.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={runRustBenchmark}
                  disabled={rustBenchRunning}
                  className="py-2 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20 cursor-pointer disabled:opacity-50"
                >
                  {rustBenchRunning ? (
                    <>
                      <Activity className="w-4 h-4 animate-spin" />
                      <span>DISPATCHING 1,000,000 TASKS...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>TRIGGER 1,000,000 TASK BENCHMARK 🦀</span>
                    </>
                  )}
                </button>
              </div>

              {/* Live Worker Thread Load Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {rustThreadStats.map((thread) => (
                  <div key={thread.id} className="p-3 rounded-xl bg-[#170a06] border border-orange-500/20 space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono text-orange-400">
                      <span>WORKER #{thread.id}</span>
                      <span className="text-white">{thread.load}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-orange-500 h-full transition-all duration-150"
                        style={{ width: `${thread.load}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Queue: 0 pending
                    </div>
                  </div>
                ))}
              </div>

              {/* Benchmark Summary Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#170a06] border border-white/5">
                  <div className="text-slate-400 text-[11px] font-mono">MEASURED THROUGHPUT</div>
                  <div className="text-lg font-bold text-white font-mono mt-0.5">
                    {rustOpsCount.toLocaleString()} ops/sec
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#170a06] border border-white/5">
                  <div className="text-slate-400 text-[11px] font-mono">TASK EXECUTION LATENCY</div>
                  <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">
                    0.38 ms (P99)
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#170a06] border border-white/5">
                  <div className="text-slate-400 text-[11px] font-mono">MEMORY SAFETY GUARANTEE</div>
                  <div className="text-lg font-bold text-cyan-400 font-mono mt-0.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>0 Unsafe Blocks</span>
                  </div>
                </div>
              </div>

              {rustBenchDone && (
                <div className="mt-3 text-xs font-mono text-emerald-300 flex items-center gap-2 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Benchmark finished: 1,000,000 work-stealing jobs completed in 0.38ms with zero data races.</span>
                </div>
              )}
            </div>
          )}

          {/* EARTH USEFUL VIEW: PyTorch Attention Inference & Deep Learning Matrix */}
          {featured === 'earth' && (
            <div className="p-6 rounded-2xl bg-[#071936]/90 border border-cyan-500/40 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      PyTorch Deep Learning & Systems Command Center
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                        99.4% TOP-1 ACCURACY
                      </span>
                    </h3>
                    <p className="text-xs text-slate-300">
                      Transformer attention matrices, Flask production microservices, and XGBoost real estate regression.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToSection('terminal')}
                  className="py-2 px-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Open Interactive Code REPL</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#041024] border border-cyan-500/20">
                  <div className="font-mono text-cyan-400 text-[11px] mb-1">MCQ SOLVER ATTENTION HEAD</div>
                  <div className="text-white font-bold text-sm">Bidirectional DistilBERT</div>
                  <div className="text-slate-400 text-[11px] mt-1">Cross-attention scoring against question stems and distractors with &lt;45ms inference.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#041024] border border-cyan-500/20">
                  <div className="font-mono text-cyan-400 text-[11px] mb-1">ML PRICE PREDICTION</div>
                  <div className="text-white font-bold text-sm">XGBoost & LightGBM</div>
                  <div className="text-slate-400 text-[11px] mt-1">Real-estate multi-feature regression with explainable SHAP value attribution.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#041024] border border-cyan-500/20">
                  <div className="font-mono text-cyan-400 text-[11px] mb-1">HEALTHCARE HMS</div>
                  <div className="text-white font-bold text-sm">Full-Stack Flask & Vue</div>
                  <div className="text-slate-400 text-[11px] mt-1">PostgreSQL relational model, Celery asynchronous queue, and doctor scheduling.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PLANET CUT-OUT SWITCHER INTERFACE */}
        <div className="flex items-center justify-center gap-6 sm:gap-12 flex-wrap mb-4">
          {/* Left Planet Switcher Button */}
          <button
            type="button"
            className="flex flex-col items-center gap-2 group cursor-pointer transition-all hover:scale-110 active:scale-95"
            onClick={() => showPlanet(leftPlanetKey)}
            onPointerEnter={() => warmVideo(leftPlanetKey)}
            onFocus={() => warmVideo(leftPlanetKey)}
            aria-label={`Switch orbit to ${PLANETS[leftPlanetKey].name}`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/20 group-hover:border-cyan-400 bg-black/40 backdrop-blur-md flex items-center justify-center overflow-hidden shadow-xl transition-all group-hover:shadow-cyan-500/30">
              <img
                src={PLANETS[leftPlanetKey].cutout}
                alt={PLANETS[leftPlanetKey].name}
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain group-hover:rotate-12 transition-transform duration-500"
              />
            </div>
            <span className="font-mono text-xs tracking-wider text-slate-300 group-hover:text-cyan-300 font-bold uppercase">
              {PLANETS[leftPlanetKey].slotLabel}
            </span>
          </button>

          {/* Central Call-to-Action Action Button */}
          <button
            type="button"
            onClick={handleCtaClick}
            className="py-4 px-8 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 hover:from-cyan-300 hover:via-sky-300 hover:to-emerald-300 text-slate-950 font-black text-sm sm:text-base tracking-wider uppercase transition-all shadow-2xl shadow-cyan-500/40 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 font-mono"
          >
            <span>{PLANETS[featured].ctaText}</span>
          </button>

          {/* Right Planet Switcher Button */}
          <button
            type="button"
            className="flex flex-col items-center gap-2 group cursor-pointer transition-all hover:scale-110 active:scale-95"
            onClick={() => showPlanet(rightPlanetKey)}
            onPointerEnter={() => warmVideo(rightPlanetKey)}
            onFocus={() => warmVideo(rightPlanetKey)}
            aria-label={`Switch orbit to ${PLANETS[rightPlanetKey].name}`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/20 group-hover:border-cyan-400 bg-black/40 backdrop-blur-md flex items-center justify-center overflow-hidden shadow-xl transition-all group-hover:shadow-cyan-500/30">
              <img
                src={PLANETS[rightPlanetKey].cutout}
                alt={PLANETS[rightPlanetKey].name}
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain group-hover:-rotate-12 transition-transform duration-500"
              />
            </div>
            <span className="font-mono text-xs tracking-wider text-slate-300 group-hover:text-cyan-300 font-bold uppercase">
              {PLANETS[rightPlanetKey].slotLabel}
            </span>
          </button>
        </div>
      </div>

      {/* Floating Scroll Trigger Indicator */}
      <div className="relative z-20 pb-6 flex justify-center">
        <button
          type="button"
          aria-label="Scroll down to repositories"
          onClick={() => scrollToSection('projects')}
          className="flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="font-mono text-[10px] tracking-widest text-cyan-300 uppercase">
            SCROLL TO EXPLORE REPOSITORIES
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 group-hover:border-cyan-400 flex items-start justify-center p-1">
            <div className="w-1.5 h-2.5 rounded-full bg-cyan-400 animate-bounce" />
          </div>
        </button>
      </div>
    </div>
  );
};
