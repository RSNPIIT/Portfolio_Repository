export interface Ecosystem {
  id: 'python' | 'rust' | 'vue';
  name: string;
  planet: 'earth' | 'mars' | 'venus';
  headline: string;
  tagline: string;
  icon: string;
  buttonText: string;
  accentColor: string;
  glowClass: string;
  description: string;
  keyHighlights: string[];
  metrics: { label: string; value: string }[];
}

export interface Project {
  id: string;
  ecosystemId: 'python' | 'rust' | 'vue';
  title: string;
  shortDesc: string;
  fullDesc: string;
  architecture: string;
  tags: string[];
  stars?: number;
  highlightMetric: string;
  codeSnippet: string;
  codeLanguage: string;
  demoType?: 'mcq' | 'price' | 'cli' | 'component';
}

export interface SkillItem {
  name: string;
  category: 'ai_python' | 'rust_systems' | 'vue_frontend' | 'tools_infra';
  level: number; // 0 - 100
  experience: string;
  highlight: string;
}

export const ECOSYSTEMS: Ecosystem[] = [
  {
    id: 'python',
    name: 'Python & AI/ML',
    planet: 'earth',
    headline: 'Deep Learning, NLP & Full-Stack Systems',
    tagline: 'From PyTorch tensors to robust Flask microservices & ML inference engines',
    icon: 'python',
    buttonText: 'Explore Python Projects 🐍',
    accentColor: '#38bdf8',
    glowClass: 'glow-python',
    description: 'Full-stack Flask web apps, PyTorch Deep Learning MCQ Solver, Gradient Boosting ML price prediction, Healthcare HMS, and Open Source Monorepo.',
    keyHighlights: [
      'PyTorch Transformer & CNN deep learning pipelines with custom loss functions',
      'Production Flask REST APIs with PostgreSQL, background Celery workers & caching',
      'Ensemble Gradient Boosting (XGBoost/LightGBM) with explainable SHAP metrics',
      'Robust Healthcare Management System (HMS) with triage & patient portals'
    ],
    metrics: [
      { label: 'Model Accuracy', value: '99.4%' },
      { label: 'Inference Latency', value: '<45ms' },
      { label: 'Flask Endpoints', value: '35+' }
    ]
  },
  {
    id: 'rust',
    name: 'Rust Systems',
    planet: 'mars',
    headline: 'High-Performance Concurrency & Zero-Cost Abstractions',
    tagline: 'Memory safety without garbage collection and blazing fast multi-threaded computing',
    icon: 'rust',
    buttonText: 'Explore Rust Projects 🦀',
    accentColor: '#f97316',
    glowClass: 'glow-rust',
    description: 'Low-level systems programming, memory safety without GC, high-concurrency CLI tools, zero-cost abstraction patterns, and monorepo collection.',
    keyHighlights: [
      'Multi-threaded high-concurrency CLI utilities powered by Tokio async and Rayon workers',
      'Zero-cost abstraction patterns with custom arena allocators and lock-free rings',
      'WebAssembly (WASM) compilation for high-speed client-side computations',
      'Rust workspace monorepos managing shared core crates and networking modules'
    ],
    metrics: [
      { label: 'GC Pause', value: '0.0ms' },
      { label: 'Throughput', value: '14.2M ops/s' },
      { label: 'Memory Footprint', value: '4.2 MB' }
    ]
  },
  {
    id: 'vue',
    name: 'Vue.js Frontend',
    planet: 'venus',
    headline: 'Reactive Web Interfaces & Scalable SPA Architecture',
    tagline: 'Elegant component systems, 60fps animations, Pinia state & Vite toolchains',
    icon: 'vue',
    buttonText: 'Explore Vue.js Projects ⚡',
    accentColor: '#10b981',
    glowClass: 'glow-vue',
    description: 'Reactive web user interfaces, single-page application (SPA) architectures, custom component libraries, and frontend monorepo applications.',
    keyHighlights: [
      'Modern Vue 3 Composition API with TypeScript, custom composables & Pinia state stores',
      'Custom Design System & component libraries designed for maximum reusability',
      'High-performance client-side rendering with dynamic route pre-fetching and code splitting',
      'Modular frontend monorepos integrating Tailwind CSS, Vite tooling, and Vitest suites'
    ],
    metrics: [
      { label: 'Lighthouse Score', value: '99/100' },
      { label: 'Render Latency', value: '60 FPS' },
      { label: 'Component Suite', value: '40+ Elements' }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'pytorch-mcq-solver',
    ecosystemId: 'python',
    title: 'PyTorch Deep Learning MCQ Solver',
    shortDesc: 'Transformer-based question answering & multiple-choice reasoning model with token attention heatmaps.',
    fullDesc: 'An advanced deep learning natural language understanding system architected in PyTorch. It ingests complex stem questions and multiple-choice options, performing bidirectional cross-attention scoring across candidate distractors. Includes confidence calibration, OCR text ingestion, and comprehensive explanation extraction.',
    architecture: 'Input Stems -> Tokenizer -> DistilBERT/RoBERTa Backbone -> Multi-Head Cross Attention -> Softmax Confidence Head',
    tags: ['PyTorch', 'Transformers', 'NLP', 'HuggingFace', 'Deep Learning', 'Python'],
    stars: 128,
    highlightMetric: '99.4% Validation Accuracy',
    demoType: 'mcq',
    codeLanguage: 'python',
    codeSnippet: `import torch
import torch.nn as nn
from transformers import AutoModel, AutoTokenizer

class MCQSolverNetwork(nn.Module):
    def __init__(self, model_name="bert-base-uncased", num_choices=4):
        super().__init__()
        self.encoder = AutoModel.from_pretrained(model_name)
        self.classifier = nn.Sequential(
            nn.Dropout(0.2),
            nn.Linear(self.encoder.config.hidden_size, 128),
            nn.GELU(),
            nn.Linear(128, 1)
        )
    
    def forward(self, input_ids, attention_mask):
        # input_ids: [batch_size, num_choices, seq_len]
        batch_size, num_choices, seq_len = input_ids.shape
        flat_ids = input_ids.view(-1, seq_len)
        flat_mask = attention_mask.view(-1, seq_len)
        
        outputs = self.encoder(input_ids=flat_ids, attention_mask=flat_mask)
        pooled = outputs.last_hidden_state[:, 0, :]
        logits = self.classifier(pooled).view(batch_size, num_choices)
        return torch.softmax(logits, dim=-1)`
  },
  {
    id: 'gradient-boosting-price',
    ecosystemId: 'python',
    title: 'Gradient Boosting ML Price Predictor',
    shortDesc: 'Ensemble GBDT model predicting multi-variate pricing distributions with SHAP feature interpretability.',
    fullDesc: 'Production machine learning regression pipeline utilizing LightGBM and XGBoost. Features automated outlier pruning, quantile clipping, geographic cluster embeddings, and SHAP (SHapley Additive exPlanations) values to elucidate feature impact for end users.',
    architecture: 'Raw Signals -> Pipeline Imputer -> Target Encoding -> Gradient Boosted Trees -> SHAP Explainability Engine',
    tags: ['LightGBM', 'XGBoost', 'Scikit-Learn', 'SHAP', 'Pandas', 'NumPy'],
    stars: 94,
    highlightMetric: '0.042 RMSE on Test Bench',
    demoType: 'price',
    codeLanguage: 'python',
    codeSnippet: `import lightgbm as lgb
from sklearn.model_selection import KFold
import numpy as np

def train_ensemble_predictor(X, y):
    params = {
        'objective': 'regression',
        'metric': 'rmse',
        'boosting_type': 'gbdt',
        'learning_rate': 0.03,
        'num_leaves': 63,
        'feature_fraction': 0.8,
        'bagging_fraction': 0.8,
        'bagging_freq': 5,
        'verbose': -1
    }
    kf = KFold(n_splits=5, shuffle=True, random_state=42)
    models = []
    for train_idx, val_idx in kf.split(X):
        dtrain = lgb.Dataset(X.iloc[train_idx], label=y.iloc[train_idx])
        dval = lgb.Dataset(X.iloc[val_idx], label=y.iloc[val_idx])
        model = lgb.train(params, dtrain, valid_sets=[dval], num_boost_round=1200)
        models.append(model)
    return models`
  },
  {
    id: 'healthcare-hms-flask',
    ecosystemId: 'python',
    title: 'Healthcare Hospital Management System (HMS)',
    shortDesc: 'Full-stack enterprise clinical workflow portal with triage scheduling, electronic records & RBAC.',
    fullDesc: 'Comprehensive healthcare portal managing inpatient and outpatient clinical lifecycles. Built with Flask, SQLAlchemy, and PostgreSQL. Features role-based access control (RBAC) separating doctors, nurses, pharmacists, and administrators, accompanied by audit logs, prescription routing, and patient appointment queues.',
    architecture: 'Flask App Factory -> Blueprints (Auth, Clinic, Pharmacy) -> SQLAlchemy ORM -> Celery Queue -> PostgreSQL',
    tags: ['Flask', 'Python', 'SQLAlchemy', 'PostgreSQL', 'RBAC', 'REST API'],
    stars: 112,
    highlightMetric: '35+ Relational Models & 100% Audit Logging',
    codeLanguage: 'python',
    codeSnippet: `@hms_bp.route('/triage/admit', methods=['POST'])
@login_required
@roles_accepted('doctor', 'triage_nurse')
def admit_patient():
    payload = request.get_json()
    vitals = VitalsRecord(
        patient_id=payload['patient_id'],
        systolic_bp=payload['systolic'],
        diastolic_bp=payload['diastolic'],
        heart_rate=payload['bpm'],
        oxygen_sat=payload['spo2'],
        temperature_c=payload['temp_c']
    )
    triage_priority = calculate_acuity_score(vitals)
    admission = PatientAdmission(
        patient_id=payload['patient_id'],
        acuity=triage_priority,
        assigned_ward_id=payload.get('ward_id')
    )
    db.session.add_all([vitals, admission])
    db.session.commit()
    dispatch_triage_alert(admission.id, triage_priority)
    return jsonify({'status': 'admitted', 'acuity': triage_priority}), 201`
  },
  {
    id: 'rust-concurrency-cli',
    ecosystemId: 'rust',
    title: 'High-Concurrency Systems CLI Tool',
    shortDesc: 'Multi-threaded asynchronous regex & pattern scanner outperforming traditional tools by 10x.',
    fullDesc: 'Ultra-fast systems command line tool built from the ground up in Rust. Uses Tokio asynchronous runtimes, Rayon parallel data-chunk iterators, and memory-mapped file I/O to crawl hundreds of gigabytes across directories without allocating duplicate buffers.',
    architecture: 'Arg Parser (Clap) -> Memory-Mapped File Buffer -> Rayon Parallel Work Stealing -> SIMD Regex Matcher -> Lock-free Output Stream',
    tags: ['Rust', 'Tokio', 'Rayon', 'Concurrency', 'CLI', 'Memory Mapped I/O'],
    stars: 185,
    highlightMetric: '14.2M Lines / Sec Throughput',
    demoType: 'cli',
    codeLanguage: 'rust',
    codeSnippet: `use rayon::prelude::*;
use std::fs::File;
use std::sync::atomic::{AtomicUsize, Ordering};
use memmap2::Mmap;

pub fn parallel_scan_buffers(paths: &[String], query: &[u8]) -> usize {
    let match_count = AtomicUsize::new(0);

    paths.par_iter().for_each(|path| {
        if let Ok(file) = File::open(path) {
            if let Ok(mmap) = unsafe { Mmap::map(&file) } {
                let count = mmap
                    .windows(query.len())
                    .filter(|window| *window == query)
                    .count();
                match_count.fetch_add(count, Ordering::Relaxed);
            }
        }
    });

    match_count.load(Ordering::SeqCst)
}`
  },
  {
    id: 'rust-zero-cost-engine',
    ecosystemId: 'rust',
    title: 'Zero-Cost Abstraction Memory Safe Engine',
    shortDesc: 'Custom memory arena allocator and lock-free ring buffer demonstrating fearless concurrency without GC overhead.',
    fullDesc: 'A systems engine demonstrating idiomatic Rust lifetime management, custom bump-pointer arena allocation, and lock-free thread queues using atomic pointer CAS operations. Zero runtime garbage collection interruptions with provable compile-time data race elimination.',
    architecture: 'Arena Allocator -> Bounded Lock-free Ring Buffer -> Atomic CAS Synchronization -> Zero-Copy Views',
    tags: ['Rust', 'Lock-Free', 'Atomics', 'Memory Safety', 'Zero-Cost', 'Systems'],
    stars: 142,
    highlightMetric: '0.0ms GC Pause & Deterministic Latency',
    codeLanguage: 'rust',
    codeSnippet: `use std::sync::atomic::{AtomicUsize, Ordering};
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
}`
  },
  {
    id: 'vue-spa-monorepo',
    ecosystemId: 'vue',
    title: 'Reactive Web SPA Architecture & Monorepo',
    shortDesc: 'Production Vue 3 Enterprise Single-Page Application with Pinia state management & dynamic code splitting.',
    fullDesc: 'Architected with Vue 3 Composition API, Vite, Pinia, and Vue Router. Implements micro-frontend orchestration, dynamic route-level preloading, declarative form validation composables, and smooth 60fps view transitions across nested routes.',
    architecture: 'Vite Bundler -> Vue 3 Composition API -> Pinia Stores -> Composable Hooks -> Atomic UI System',
    tags: ['Vue 3', 'TypeScript', 'Pinia', 'Vite', 'Tailwind CSS', 'SPA'],
    stars: 167,
    highlightMetric: '60 FPS Transitions & <18ms First Input Delay',
    codeLanguage: 'typescript',
    codeSnippet: `<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useEcosystemStore } from '@/stores/ecosystem';

const store = useEcosystemStore();
const activeFilter = ref<'all' | 'ai' | 'systems'>('all');

const filteredNodes = computed(() => {
  if (activeFilter.value === 'all') return store.nodes;
  return store.nodes.filter(n => n.category === activeFilter.value);
});

onMounted(async () => {
  await store.fetchTelemetry();
});
</script>

<template>
  <div class="reactive-container grid grid-cols-1 md:grid-cols-3 gap-6">
    <transition-group name="node-fade" tag="div" class="contents">
      <div v-for="node in filteredNodes" :key="node.id" class="node-card">
        <h3>{{ node.title }}</h3>
        <p>{{ node.metric }}</p>
      </div>
    </transition-group>
  </div>
</template>`
  },
  {
    id: 'vue-component-library',
    ecosystemId: 'vue',
    title: 'Custom Component Library & Design System',
    shortDesc: 'Headless, accessible, high-performance Vue 3 component library styled with modern Tailwind CSS tokens.',
    fullDesc: 'A comprehensive suite of 40+ atomic and molecular UI components. Built with full WAI-ARIA compliance, strict keyboard accessibility, composable theme providers, fluid responsiveness, and interactive Storybook documentation.',
    architecture: 'Atomic Tokens -> Accessible Primitives -> Composable Wrappers -> Storybook Catalog',
    tags: ['Vue 3', 'Design System', 'Accessibility', 'Component Library', 'Tailwind CSS'],
    stars: 119,
    highlightMetric: '100% WCAG AA Compliant & Zero Pills',
    codeLanguage: 'typescript',
    codeSnippet: `import { defineComponent, h, type PropType } from 'vue';

export const QuantumButton = defineComponent({
  name: 'QuantumButton',
  props: {
    variant: {
      type: String as PropType<'primary' | 'ghost' | 'cyber'>,
      default: 'primary'
    },
    loading: Boolean,
  },
  setup(props, { slots, emit }) {
    return () => h(
      'button',
      {
        class: [
          'relative px-6 py-3 font-medium transition-all duration-200',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          props.variant === 'cyber' ? 'text-cyan-400 bg-slate-900 border border-cyan-500/40' : 'bg-white text-slate-900'
        ],
        disabled: props.loading,
        onClick: (e: MouseEvent) => emit('click', e)
      },
      props.loading ? 'Processing...' : slots.default?.()
    );
  }
});`
  }
];

export const SKILLS: SkillItem[] = [
  // AI & Python
  { name: 'Python', category: 'ai_python', level: 96, experience: '4+ Years', highlight: 'AsyncIO, Generators, Metaprogramming, Profiling' },
  { name: 'PyTorch', category: 'ai_python', level: 92, experience: '3+ Years', highlight: 'Custom autograd, Attention modules, Distributed training' },
  { name: 'Deep Learning & NLP', category: 'ai_python', level: 90, experience: '3+ Years', highlight: 'BERT, Transformers, Seq2Seq, Fine-tuning, Tokenizers' },
  { name: 'LightGBM / XGBoost', category: 'ai_python', level: 88, experience: '3+ Years', highlight: 'Gradient boosting, Hyperopt, SHAP explainability' },
  { name: 'Flask / FastAPI', category: 'ai_python', level: 94, experience: '4+ Years', highlight: 'Microservices, OpenAPI specs, Celery task workers' },
  { name: 'Pandas & NumPy', category: 'ai_python', level: 95, experience: '4+ Years', highlight: 'Vectorized pipelines, Data cleaning, Feature extraction' },

  // Rust & Systems
  { name: 'Rust', category: 'rust_systems', level: 88, experience: '2+ Years', highlight: 'Ownership, Borrow checker, Lifetimes, Pattern matching' },
  { name: 'Systems Programming', category: 'rust_systems', level: 86, experience: '3+ Years', highlight: 'Memory management, Pointers, Arena allocators, C FFI' },
  { name: 'High Concurrency', category: 'rust_systems', level: 89, experience: '2+ Years', highlight: 'Tokio async runtimes, Rayon work-stealing, Atomics' },
  { name: 'Lock-Free Data Structures', category: 'rust_systems', level: 82, experience: '2+ Years', highlight: 'Compare-and-swap (CAS), Memory ordering, Ring buffers' },
  { name: 'WebAssembly (WASM)', category: 'rust_systems', level: 84, experience: '2+ Years', highlight: 'wasm-bindgen, Browser compute acceleration, SIMD' },

  // Vue & Frontend
  { name: 'Vue.js (Vue 3)', category: 'vue_frontend', level: 95, experience: '4+ Years', highlight: 'Composition API, Custom composables, Teleport, Suspense' },
  { name: 'TypeScript', category: 'vue_frontend', level: 93, experience: '3+ Years', highlight: 'Generics, Utility types, Strict typing, Type narrowing' },
  { name: 'Pinia State Stores', category: 'vue_frontend', level: 92, experience: '3+ Years', highlight: 'Modular reactive stores, Plugins, Hydration, Devtools' },
  { name: 'SPA Architecture', category: 'vue_frontend', level: 94, experience: '4+ Years', highlight: 'Code-splitting, Client-side routing, Micro-frontends' },
  { name: 'Tailwind CSS', category: 'vue_frontend', level: 96, experience: '4+ Years', highlight: 'Design systems, Custom theme plugins, Arbitrary variants' },
  { name: 'Component Libraries', category: 'vue_frontend', level: 90, experience: '3+ Years', highlight: 'Atomic design, Headless patterns, WCAG AA accessibility' },

  // Tools & Infrastructure
  { name: 'Git Monorepos', category: 'tools_infra', level: 92, experience: '4+ Years', highlight: 'Lerna, Turborepo, Cargo workspaces, Conventional commits' },
  { name: 'Docker & Containers', category: 'tools_infra', level: 88, experience: '3+ Years', highlight: 'Multi-stage builds, Container security, Compose stacks' },
  { name: 'PostgreSQL / SQL', category: 'tools_infra', level: 90, experience: '4+ Years', highlight: 'Complex queries, Indexes, Migrations, Window functions' },
  { name: 'Linux & Shell', category: 'tools_infra', level: 93, experience: '4+ Years', highlight: 'Bash automation, Systemd services, Performance profiling' },
  { name: 'CI/CD Pipelines', category: 'tools_infra', level: 87, experience: '3+ Years', highlight: 'GitHub Actions, Automated test suites, Build verification' }
];

export const TIMELINE = [
  {
    year: '2024 — PRESENT',
    role: 'Systems & AI Software Engineer',
    org: 'Open Source Monorepo & Independent Research',
    description: 'Developing high-throughput Rust multi-threaded utilities, PyTorch NLP models, and production Vue 3 single-page applications. Focusing on zero-cost abstractions, inference acceleration, and reactive frontend architectures.'
  },
  {
    year: '2023 — 2024',
    role: 'Machine Learning & Full-Stack Developer',
    org: 'Healthcare Management Systems (HMS) & Predictive Analytics',
    description: 'Engineered clinical triage routing with Flask and PostgreSQL. Trained gradient boosted decision tree ensembles with LightGBM achieving 0.042 RMSE on financial and pricing benchmarks.'
  },
  {
    year: '2022 — 2023',
    role: 'Deep Learning & Systems Researcher',
    org: 'PyTorch MCQ Solver & Algorithm Exploration',
    description: 'Constructed custom transformer attention networks for multiple-choice question reasoning and automated comprehension with confidence scoring.'
  }
];
