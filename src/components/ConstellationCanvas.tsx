import React, { useEffect, useRef, useState } from 'react';

interface ConstellationNode {
  id: string;
  name: string;
  category: 'python' | 'rust' | 'vue';
  isHub?: boolean;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  color: string;
  connections: string[];
}

const RAW_NODES: { id: string; name: string; category: 'python' | 'rust' | 'vue'; isHub?: boolean; connections: string[] }[] = [
  // 1. Python & AI Ecosystem (Left Galaxy)
  { id: 'py_hub', name: 'Python AI/ML Core', category: 'python', isHub: true, connections: ['pytorch', 'lightgbm', 'flask_rest'] },
  { id: 'pytorch', name: 'PyTorch Deep Learning', category: 'python', connections: ['py_hub', 'mcq', 'nlp'] },
  { id: 'mcq', name: 'MCQ Attention Solver', category: 'python', connections: ['pytorch'] },
  { id: 'nlp', name: 'Transformer Attention', category: 'python', connections: ['pytorch'] },
  { id: 'lightgbm', name: 'LightGBM / GBDT', category: 'python', connections: ['py_hub', 'shap'] },
  { id: 'shap', name: 'SHAP Explainability', category: 'python', connections: ['lightgbm'] },
  { id: 'flask_rest', name: 'Flask REST Microservices', category: 'python', connections: ['py_hub', 'hms'] },
  { id: 'hms', name: 'Healthcare HMS Portal', category: 'python', connections: ['flask_rest'] },

  // 2. Rust Systems Ecosystem (Center Galaxy)
  { id: 'rust_hub', name: 'Rust Systems Core', category: 'rust', isHub: true, connections: ['tokio', 'rayon', 'zero_cost', 'wasm'] },
  { id: 'tokio', name: 'Tokio Async Runtime', category: 'rust', connections: ['rust_hub', 'cli_tool'] },
  { id: 'cli_tool', name: 'High-Throughput CLI', category: 'rust', connections: ['tokio', 'rayon'] },
  { id: 'rayon', name: 'Rayon Work-Stealing', category: 'rust', connections: ['rust_hub', 'cli_tool'] },
  { id: 'zero_cost', name: 'Zero-Cost Abstractions', category: 'rust', connections: ['rust_hub', 'lockfree'] },
  { id: 'lockfree', name: 'Lock-Free Queues (CAS)', category: 'rust', connections: ['zero_cost'] },
  { id: 'wasm', name: 'WebAssembly (WASM)', category: 'rust', connections: ['rust_hub'] },

  // 3. Vue.js Frontend Ecosystem (Right Galaxy)
  { id: 'vue_hub', name: 'Vue.js SPA Core', category: 'vue', isHub: true, connections: ['pinia', 'vite', 'component_lib'] },
  { id: 'pinia', name: 'Pinia State Stores', category: 'vue', connections: ['vue_hub', 'reactive_spa'] },
  { id: 'reactive_spa', name: '60 FPS Reactive View', category: 'vue', connections: ['pinia'] },
  { id: 'vite', name: 'Vite Monorepo Toolchain', category: 'vue', connections: ['vue_hub', 'tailwind'] },
  { id: 'tailwind', name: 'Tailwind Design Tokens', category: 'vue', connections: ['vite', 'component_lib'] },
  { id: 'component_lib', name: 'Accessible UI Library', category: 'vue', connections: ['vue_hub', 'wcag'] },
  { id: 'wcag', name: 'WCAG AA Accessibility', category: 'vue', connections: ['component_lib'] }
];

interface ConstellationCanvasProps {
  activeEcosystem: 'python' | 'rust' | 'vue' | 'all';
  onNodeClick?: (category: 'python' | 'rust' | 'vue') => void;
}

export const ConstellationCanvas: React.FC<ConstellationCanvasProps> = ({
  activeEcosystem,
  onNodeClick
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<ConstellationNode | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 950);
    let height = (canvas.height = 380);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 380;
    };
    window.addEventListener('resize', handleResize);

    // Color definitions
    const colors = {
      python: '#38bdf8', // Sky cyan
      rust: '#f97316',   // Rust orange
      vue: '#10b981'     // Emerald green
    };

    // Calculate well-spaced layout across 3 clusters
    const nodes: ConstellationNode[] = [];
    const pyNodes = RAW_NODES.filter((n) => n.category === 'python');
    const rustNodes = RAW_NODES.filter((n) => n.category === 'rust');
    const vueNodes = RAW_NODES.filter((n) => n.category === 'vue');

    const placeCluster = (
      cluster: typeof RAW_NODES,
      cx: number,
      cy: number,
      radiusX: number,
      radiusY: number
    ) => {
      cluster.forEach((item, idx) => {
        if (item.isHub) {
          nodes.push({
            ...item,
            x: cx,
            y: cy,
            baseX: cx,
            baseY: cy,
            radius: 8.5,
            color: colors[item.category]
          });
        } else {
          // Space children cleanly in an ellipse around hub
          const angle = (idx / (cluster.length - 1)) * Math.PI * 2;
          const rx = radiusX * (0.8 + (idx % 2) * 0.25);
          const ry = radiusY * (0.8 + ((idx + 1) % 2) * 0.25);
          const x = cx + Math.cos(angle) * rx;
          const y = cy + Math.sin(angle) * ry;

          nodes.push({
            ...item,
            x,
            y,
            baseX: x,
            baseY: y,
            radius: 5,
            color: colors[item.category]
          });
        }
      });
    };

    const setupPositions = () => {
      nodes.length = 0;
      placeCluster(pyNodes, width * 0.20, height * 0.50, width * 0.11, height * 0.35);
      placeCluster(rustNodes, width * 0.50, height * 0.50, width * 0.11, height * 0.35);
      placeCluster(vueNodes, width * 0.80, height * 0.50, width * 0.11, height * 0.35);
    };

    setupPositions();

    let mouse = { x: -500, y: -500 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };

      const found = nodes.find((n) => {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        return Math.sqrt(dx * dx + dy * dy) < n.radius + 12;
      });
      setHoveredNode(found || null);
    };

    const handleCanvasClick = () => {
      if (hoveredNode && onNodeClick) {
        onNodeClick(hoveredNode.category);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleCanvasClick);

    let tick = 0;

    const render = () => {
      tick += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Subtle celestial background coordinates
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const step = 45;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Orbital guide rings for each galaxy cluster
      [width * 0.20, width * 0.50, width * 0.80].forEach((cx, idx) => {
        const clusterCat = idx === 0 ? 'python' : idx === 1 ? 'rust' : 'vue';
        const isClusterActive = activeEcosystem === 'all' || activeEcosystem === clusterCat;

        ctx.beginPath();
        ctx.ellipse(cx, height * 0.5, width * 0.11, height * 0.35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = isClusterActive
          ? `${colors[clusterCat]}22`
          : 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Update positions with subtle floating breathing physics
      nodes.forEach((n, i) => {
        const floatOffset = Math.sin(tick + i) * 3;
        n.x = n.baseX + Math.cos(tick * 0.8 + i) * 2;
        n.y = n.baseY + floatOffset;

        // Interactive mouse gentle push
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 70 && mDist > 0) {
          const force = (70 - mDist) / 70;
          n.x += (mdx / mDist) * force * 10;
          n.y += (mdy / mDist) * force * 10;
        }
      });

      // Draw constellation connection lines
      nodes.forEach((node) => {
        const isCategoryActive = activeEcosystem === 'all' || activeEcosystem === node.category;

        node.connections.forEach((connId) => {
          const target = nodes.find((n) => n.id === connId);
          if (!target) return;

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);

          if (isCategoryActive) {
            ctx.strokeStyle = `${node.color}55`;
            ctx.lineWidth = node.isHub ? 1.6 : 1.0;
          } else {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
            ctx.lineWidth = 0.5;
          }
          ctx.stroke();
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        const isCategoryActive = activeEcosystem === 'all' || activeEcosystem === node.category;
        const isHovered = hoveredNode?.id === node.id;

        // Radial glow
        if (isCategoryActive || isHovered) {
          const haloRadius = node.isHub ? node.radius * 3.5 : node.radius * 2.5;
          const grad = ctx.createRadialGradient(node.x, node.y, 1, node.x, node.y, haloRadius);
          grad.addColorStop(0, `${node.color}88`);
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(node.x, node.y, haloRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Inner solid core
        ctx.beginPath();
        ctx.arc(node.x, node.y, isHovered ? node.radius * 1.4 : node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isCategoryActive ? node.color : 'rgba(255, 255, 255, 0.25)';
        ctx.fill();

        // Outer white crisp rim
        ctx.strokeStyle = isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = node.isHub ? 2 : 1.2;
        ctx.stroke();

        // Clean typography: ONLY hubs always show labels; child nodes show label on hover or when category active
        const shouldShowLabel = node.isHub || isHovered || (activeEcosystem === node.category && !node.connections.includes('temp'));

        if (shouldShowLabel) {
          ctx.save();
          ctx.fillStyle = isCategoryActive ? '#ffffff' : 'rgba(255, 255, 255, 0.4)';
          ctx.font = node.isHub
            ? 'bold 12px "Hanken Grotesk", sans-serif'
            : isHovered
            ? '600 11px "Hanken Grotesk", sans-serif'
            : '500 10px "Hanken Grotesk", sans-serif';
          ctx.textAlign = 'center';

          // Position label slightly above or below node to prevent overlap
          const labelY = node.isHub
            ? node.y - node.radius - 8
            : node.y + node.radius + 12;

          ctx.fillText(node.name, node.x, labelY);
          ctx.restore();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [activeEcosystem, hoveredNode]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#030914]/90 border border-white/10 p-2 backdrop-blur-md shadow-2xl">
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 border-b border-white/5 text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-cyan-300 font-semibold tracking-wider">
            NEURAL ARCHITECTURE CONSTELLATION
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block shadow-[0_0_8px_#38bdf8]" /> Python ML</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block shadow-[0_0_8px_#f97316]" /> Rust Systems</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block shadow-[0_0_8px_#10b981]" /> Vue.js SPA</span>
        </div>
      </div>

      <canvas ref={canvasRef} className="w-full block cursor-pointer" />

      {hoveredNode && (
        <div className="absolute bottom-4 left-6 pointer-events-none px-4 py-2 rounded-xl bg-slate-900/95 border border-cyan-400/50 text-xs shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: hoveredNode.color }}
            />
            <span className="font-bold text-white text-sm">{hoveredNode.name}</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
            Ecosystem: <span className="text-cyan-300 uppercase">{hoveredNode.category}</span>
          </div>
          <div className="text-[10px] text-emerald-400 font-mono mt-1">
            Connected to {hoveredNode.connections.length} architectural pipelines
          </div>
        </div>
      )}
    </div>
  );
};
