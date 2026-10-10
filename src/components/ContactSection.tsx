import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Github, Linkedin, FileText, CheckCircle2, Download, ExternalLink } from 'lucide-react';

interface ContactSectionProps {
  onOpenDownload?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenDownload }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const myEmail = "ramrupsatpati@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(myEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono">
          GET IN TOUCH
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4 font-serif-space">
          Let&apos;s Build Something Extraordinary
        </h2>
        <p className="text-slate-300 text-sm max-w-lg mx-auto">
          Open for high-impact software engineering roles, machine learning research, systems tooling, and consulting engagements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
        {/* Contact Info Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#091426] border border-white/10 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2">Direct Channel</h3>
            <p className="text-xs text-slate-400 mb-6">
              Feel free to email me directly or schedule an engineering architecture review.
            </p>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-white/5 mb-4">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono text-slate-200 truncate">{myEmail}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <a
              href={`mailto:${myEmail}?subject=Software%20Engineering%20Inquiry%20for%20Ramrup`}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              Open Email Client
            </a>
          </div>

          {/* Socials & Resume */}
          <div className="p-6 rounded-2xl bg-[#091426] border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">PORTFOLIO ECOSYSTEM</span>
              <span className="text-[11px] text-emerald-400 font-mono">ONLINE & VERIFIED</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <a
                href="https://github.com/RSNPIIT"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-2 rounded-xl bg-slate-900 border border-white/5 hover:border-cyan-400/30 flex items-center justify-center gap-1.5 text-xs text-slate-200 hover:text-white transition-all cursor-pointer"
              >
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ramrup-satpati-683970341"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-2 rounded-xl bg-slate-900 border border-white/5 hover:border-cyan-400/30 flex items-center justify-center gap-1.5 text-xs text-slate-200 hover:text-white transition-all cursor-pointer"
              >
                <Linkedin className="w-3.5 h-3.5 text-sky-400" /> LinkedIn
              </a>
              <a
                href="https://www.kaggle.com/ramrupsatpatiiitm"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-2 rounded-xl bg-slate-900 border border-white/5 hover:border-cyan-400/30 flex items-center justify-center gap-1.5 text-xs text-slate-200 hover:text-white transition-all cursor-pointer"
              >
                <span className="text-xs">📊</span> Kaggle
              </a>
            </div>

            <a
              href={`mailto:${myEmail}?subject=Resume%20Request%20-%20Ramrup%20Satpati`}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/20 flex items-center justify-center gap-2 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-400" /> Request Full Curriculum Vitae
            </a>

            {/* ZIP Download and Standalone HTML buttons */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <button
                type="button"
                onClick={onOpenDownload}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download Complete Source Code (.ZIP)
              </button>

              <a
                href="/spaceedu-standalone.html"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-slate-900/80 border border-white/10 hover:border-white/20 flex items-center justify-center gap-2 text-[11px] text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" /> Open Standalone Single-File SpaceEdu HTML
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-2xl bg-[#091426] border border-white/10 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-serif-space">Message Dispatched!</h3>
                <p className="text-sm text-slate-300 max-w-sm mx-auto">
                  Thank you for reaching out. I will respond to <span className="text-cyan-300 font-mono">{formState.email}</span> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="py-2 px-5 rounded-lg bg-slate-800 text-xs text-slate-300 hover:text-white cursor-pointer mt-4"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-2 font-serif-space">Send a Direct Transmission</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alex Chen"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="alex@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">Subject / Project Scope</label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="e.g. Full-Stack / Rust / AI Opportunity"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your architecture requirements, role details, or collaboration ideas..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all shadow-lg shadow-cyan-500/20"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Transmitting...' : 'Dispatch Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-white/10 text-center text-xs text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          © {new Date().getFullYear()} <span className="text-slate-300">Ramrup Satpati</span> · Systems & AI Engineer.
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Python AI</span>
          <span>·</span>
          <span>Rust Systems</span>
          <span>·</span>
          <span>Vue.js SPAs</span>
          <span>·</span>
          <span className="text-cyan-400">SpaceEdu Architecture</span>
        </div>
      </footer>
    </section>
  );
};
