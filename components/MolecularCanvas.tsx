"use client";

import { useEffect, useRef } from "react";

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

export default function MolecularCanvas({ opacity = 1 }: MolecularCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isMobile = window.innerWidth < 768;
    const totalNodes = isMobile ? 25 : 50;
    const goldCount = isMobile ? 5 : 10;

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
          color: isGold ? "#C4973A" : "#2D4A2F",
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
      if (isMobile) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", onMouseMove);

    const CONNECT_DISTANCE = 150;
    const MOUSE_ATTRACT_DISTANCE = 200;
    const MOUSE_ATTRACT_STRENGTH = 0.02;

    if (prefersReduced) {
      nodesRef.current.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.opacity * 0.8;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      return () => {
        window.removeEventListener("resize", resize);
        canvas.removeEventListener("mousemove", onMouseMove);
      };
    }

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

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
