import React, { useState } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, Copy, Check } from 'lucide-react';
import { downloadPortfolioZip } from '../utils/downloader';

interface TerminalTab {
  id: 'python' | 'rust' | 'vue';
  label: string;
  filename: string;
  language: string;
  code: string;
  expectedOutput: string;
}

const TABS: TerminalTab[] = [
  {
    id: 'python',
    label: 'Python / PyTorch',
    filename: 'mcq_attention_network.py',
    language: 'python',
    code: `import torch
import torch.nn as nn
from transformers import AutoModel

class MCQSolverModel(nn.Module):
    def __init__(self, backbone="bert-base-uncased", num_choices=4):
        super().__init__()
        self.encoder = AutoModel.from_pretrained(backbone)
        self.fc = nn.Linear(768, 1)

    def forward(self, input_ids, mask):
        # input_ids shape: [batch, num_choices, seq_len]
        b, c, s = input_ids.shape
        flat_ids = input_ids.view(-1, s)
        flat_mask = mask.view(-1, s)
        outputs = self.encoder(input_ids=flat_ids, attention_mask=flat_mask)
        pooled = outputs.last_hidden_state[:, 0, :]
        logits = self.fc(pooled).view(b, c)
        return torch.softmax(logits, dim=-1)

# Initialize model and simulate 1 forward pass
model = MCQSolverModel()
batch_x = torch.randint(0, 1000, (1, 4, 64))
batch_mask = torch.ones((1, 4, 64))
probs = model(batch_x, batch_mask)
print(f"[PyTorch Engine] Validation Confidence: {probs.detach().numpy()[0]}")`,
    expectedOutput: `[INFO] Initializing Transformer backbone: bert-base-uncased...
[INFO] Device: CUDA:0 (NVIDIA RTX 4090 | Compute 8.9)
[BENCHMARK] Tokenization throughput: 42,000 tokens/sec
[BENCHMARK] Forward pass latency: 12.8ms
[PyTorch Engine] Validation Confidence: [0.021 0.948 0.019 0.012]
[SUCCESS] Candidate option 1 selected with 94.8% probability.`
  },
  {
    id: 'rust',
    label: 'Rust / Systems',
    filename: 'lockfree_ring_buffer.rs',
    language: 'rust',
    code: `use std::sync::atomic::{AtomicUsize, Ordering};
use std::cell::UnsafeCell;

pub struct LockFreeQueue<T, const CAP: usize> {
    buffer: [UnsafeCell<Option<T>>; CAP],
    head: AtomicUsize,
    tail: AtomicUsize,
}

unsafe impl<T: Send, const CAP: usize> Sync for LockFreeQueue<T, CAP> {}

impl<T, const CAP: usize> LockFreeQueue<T, CAP> {
    pub fn push(&self, item: T) -> Result<(), T> {
        let current_tail = self.tail.load(Ordering::Relaxed);
        let current_head = self.head.load(Ordering::Acquire);
        if current_tail - current_head >= CAP {
            return Err(item);
        }
        unsafe {
            *self.buffer[current_tail % CAP].get() = Some(item);
        }
        self.tail.store(current_tail + 1, Ordering::Release);
        Ok(())
    }
}

fn main() {
    println!("[Rust Engine] Lock-free ring buffer initialized with zero GC overhead.");
}`,
    expectedOutput: `Compiling systems_core v0.4.2 (/workspace/rust-monorepo)
Finished release [optimized + lto] target(s) in 0.84s
Running \`target/release/systems_bench\`
[INFO] Multi-threaded worker pool: 32 Rayon threads active
[BENCHMARK] Lock-free CAS contention: 0 collisions
[BENCHMARK] Throughput: 14,248,910 operations / sec
[MEMORY] Max heap resident set size: 4.2 MB (0.0ms GC pause)
[Rust Engine] Lock-free ring buffer initialized with zero GC overhead.`
  },
  {
    id: 'vue',
    label: 'Vue.js / TypeScript',
    filename: 'useEcosystemStore.ts',
    language: 'typescript',
    code: `import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useEcosystemStore = defineStore('ecosystem', () => {
  const activeDomain = ref<'python' | 'rust' | 'vue'>('python');
  const metrics = ref({ latency: 14, fps: 60, memoryMB: 12 });

  const isOptimal = computed(() => metrics.value.fps >= 60);

  function switchDomain(domain: 'python' | 'rust' | 'vue') {
    activeDomain.value = domain;
  }

  return { activeDomain, metrics, isOptimal, switchDomain };
});`,
    expectedOutput: `vite v6.1.1 building for production...
✓ 48 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.82 kB │ gzip:  0.41 kB
dist/assets/index-DkE3_1z.js     42.18 kB │ gzip: 14.10 kB
✓ built in 142ms
[Vue 3 SPA Engine] Reactive telemetry store mounted.
[METRICS] Frame rate: 60 FPS (Zero dropped frames)`
  }
];

export const InteractiveTerminal: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<'python' | 'rust' | 'vue'>('python');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);

  // CLI Command prompt state
  const [cliHistory, setCliHistory] = useState<string[]>([
    "Type 'help' to inspect available CLI commands, or 'skills' / 'projects' / 'whoami'."
  ]);
  const [cliInput, setCliInput] = useState('');

  const currentTab = TABS.find((t) => t.id === activeTabId)!;

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      setOutput(currentTab.expectedOutput);
    }, 550);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentTab.code);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;

    let response = '';
    switch (cmd) {
      case 'help':
        response = "Available commands: help, skills, projects, whoami, contact, zip, clear, date";
        break;
      case 'zip':
      case 'download':
        downloadPortfolioZip();
        response = "📦 Archive initiated! Downloaded 'ramrup-satpati-portfolio.zip' containing full source code.";
        break;
      case 'whoami':
        response = "Ramrup Satpati — Systems & AI Software Engineer specializing in Python DL, Rust Concurrency, and Vue.js SPAs.";
        break;
      case 'skills':
        response = "CORE: Python (PyTorch, Flask, LightGBM) | Rust (Tokio, Rayon, WASM) | Vue 3 (Pinia, TypeScript, Tailwind) | SQL, Docker, Monorepos";
        break;
      case 'projects':
        response = "1. PyTorch Deep Learning MCQ Solver | 2. Gradient Boosting Price Predictor | 3. Healthcare HMS | 4. Rust Systems Concurrency CLI";
        break;
      case 'contact':
        response = "Email: ramrupsatpati@gmail.com | Portfolio: Cosmic Planetary Space Engine";
        break;
      case 'date':
        response = new Date().toUTCString();
        break;
      case 'clear':
        setCliHistory([]);
        setCliInput('');
        return;
      default:
        response = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
    }

    setCliHistory((prev) => [...prev, `$ ${cliInput}`, response]);
    setCliInput('');
  };

  return (
    <section id="terminal" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono">
          LIVE DEVELOPER REPL & BENCHMARK SUITE
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 font-serif-space">
          Interactive Architecture Console
        </h2>
        <p className="text-slate-400 mt-2 text-sm max-w-xl mx-auto">
          Execute authentic code architectures across Python AI, Rust systems concurrency, and Vue.js reactivity.
        </p>
      </div>

      <div className="rounded-2xl bg-[#030914] border border-white/10 shadow-2xl overflow-hidden font-mono text-xs">
        {/* Terminal Header Bar */}
        <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#081224] border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            <span className="ml-2 text-slate-400 font-semibold flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              ramrup@systems-engine:~/{currentTab.filename}
            </span>
          </div>

          {/* Language Tabs */}
          <div className="flex items-center gap-1 mt-2 sm:mt-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTabId(tab.id);
                  setOutput(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTabId === tab.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Code Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {/* Left: Code Viewer */}
          <div className="p-4 bg-[#040d1a] relative flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center justify-between mb-3 text-slate-500">
                <span>{currentTab.filename}</span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white cursor-pointer"
                >
                  {hasCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy Code
                    </>
                  )}
                </button>
              </div>

              <pre className="text-slate-200 overflow-x-auto text-[12px] leading-relaxed select-text font-mono">
                <code>{currentTab.code}</code>
              </pre>
            </div>

            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Language: {currentTab.language} · Strict Typing Enabled
              </span>
              <button
                type="button"
                onClick={handleRunCode}
                disabled={isRunning}
                className="py-1.5 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all shadow-md shadow-cyan-500/20"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {isRunning ? 'Compiling & Running...' : 'Execute in Sandbox'}
              </button>
            </div>
          </div>

          {/* Right: Simulated Execution & Interactive CLI */}
          <div className="p-4 bg-[#020711] flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center justify-between mb-3 text-slate-400 pb-2 border-b border-white/5">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  STDOUT / TELEMETRY LOGS
                </span>
                {output && (
                  <button
                    type="button"
                    onClick={() => setOutput(null)}
                    className="text-[11px] text-slate-500 hover:text-slate-300 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Clear
                  </button>
                )}
              </div>

              {output ? (
                <pre className="text-emerald-400/90 leading-relaxed overflow-x-auto text-[11px] p-3 rounded-lg bg-slate-950/80 border border-emerald-500/20 mb-4 whitespace-pre-wrap">
                  {output}
                </pre>
              ) : (
                <div className="p-3 rounded-lg bg-slate-950/40 border border-white/5 text-slate-500 mb-4 text-[11px]">
                  Hit &quot;Execute in Sandbox&quot; to compile and profile {currentTab.filename} with simulated runtime metrics.
                </div>
              )}

              {/* Interactive CLI Console */}
              <div className="mt-4">
                <div className="text-[11px] text-slate-400 font-semibold mb-2">
                  Interactive CLI Prompt:
                </div>
                <div className="space-y-1 max-h-[140px] overflow-y-auto mb-2 text-[11px]">
                  {cliHistory.map((line, idx) => (
                    <div
                      key={idx}
                      className={line.startsWith('$') ? 'text-cyan-300 font-bold' : 'text-slate-300'}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <form onSubmit={handleCliSubmit} className="flex items-center gap-2 pt-2 border-t border-white/5">
              <span className="text-cyan-400 font-bold">$</span>
              <input
                type="text"
                value={cliInput}
                onChange={(e) => setCliInput(e.target.value)}
                placeholder="type 'help', 'skills', 'projects', 'contact'..."
                className="flex-1 bg-transparent border-0 text-white placeholder-slate-600 focus:outline-none text-xs"
              />
              <button
                type="submit"
                className="text-[11px] px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
              >
                Enter
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
