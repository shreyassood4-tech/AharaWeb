"use client";

import { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
  isGold: boolean;
  pulseOffset: number;
}

interface MolecularCanvasProps {
  opacity?: number;
}

// Static SVG fallback — 18 nodes + connecting lines, same visual language
function StaticMolecularSVG({ opacity = 1 }: { opacity?: number }) {
  const nodes = [
    [12, 18], [22, 42], [38, 10], [52, 30], [65, 55],
    [75, 20], [85, 45], [18, 65], [35, 80], [50, 68],
    [60, 85], [78, 72], [90, 85], [42, 50], [28, 35],
    [70, 35], [55, 10], [80, 55],
  ] as [number, number][];

  const goldNodes = [0, 3, 7, 11, 14];

  const connections = [
    [0, 2], [0, 1], [1, 8], [2, 3], [2, 16], [3, 5], [3, 13],
    [4, 6], [4, 9], [5, 15], [6, 11], [7, 8], [8, 9], [9, 10],
    [10, 11], [11, 12], [13, 14], [14, 1], [15, 6], [16, 5],
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ opacity: opacity * 0.6 }}
    >
      {connections.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="#C4973A"
          strokeWidth="0.3"
          opacity="0.12"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={goldNodes.includes(i) ? 1.2 : 0.8}
          fill={goldNodes.includes(i) ? "#C4973A" : "#3D6B4F"}
          opacity={goldNodes.includes(i) ? 0.7 : 0.6}
        />
      ))}
    </svg>
  );
}

export default function MolecularCanvas({ opacity = 1 }: MolecularCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const [useStaticFallback, setUseStaticFallback] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLowEnd = navigator.hardwareConcurrency <= 4;
    const isSmall = window.innerWidth < 768;

    if (isLowEnd || isSmall || prefersReduced) {
      setUseStaticFallback(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const totalNodes = 50;
    const goldCount = 10;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const initNodes = (): Node[] => {
      const nodes: Node[] = [];
      for (let i = 0; i < totalNodes; i++) {
        const isGold = i < goldCount;
        const speed = 0.2 + Math.random() * 0.2;
        const angle = Math.random() * Math.PI * 2;
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 3 + Math.random() * 1,
          color: isGold ? "#C4973A" : "#3D6B4F",
          opacity: isGold ? 0.7 : 0.6,
          isGold,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
      return nodes;
    };

    nodesRef.current = initNodes();

    let mouseX = -1000;
    let mouseY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", onMouseMove);

    const CONNECT_DISTANCE = 150;
    const MOUSE_ATTRACT_DISTANCE = 200;
    const MOUSE_ATTRACT_STRENGTH = 0.02;

    const startTime = performance.now();

    const animate = (timestamp: number) => {
      if (!canvas || !ctx) return;
      const elapsed = (timestamp - startTime) / 1000;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < node.radius || node.x > canvas.width - node.radius) {
          node.vx *= -1;
          node.x = Math.max(node.radius, Math.min(canvas.width - node.radius, node.x));
        }
        if (node.y < node.radius || node.y > canvas.height - node.radius) {
          node.vy *= -1;
          node.y = Math.max(node.radius, Math.min(canvas.height - node.radius, node.y));
        }

        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_ATTRACT_DISTANCE && dist > 0) {
          node.vx += (dx / dist) * MOUSE_ATTRACT_STRENGTH;
          node.vy += (dy / dist) * MOUSE_ATTRACT_STRENGTH;
          const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
          if (speed > 1.5) {
            node.vx = (node.vx / speed) * 1.5;
            node.vy = (node.vy / speed) * 1.5;
          }
        }

        if (node.isGold) {
          const pulse = Math.sin((elapsed * (2 * Math.PI) / 3) + node.pulseOffset);
          node.opacity = 0.4 + (pulse + 1) / 2 * 0.6;
        }
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DISTANCE) {
            const lineAlpha = (1 - dist / CONNECT_DISTANCE) * 0.12;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(196, 151, 58, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(animate);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  if (useStaticFallback) {
    return <StaticMolecularSVG opacity={opacity} />;
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
