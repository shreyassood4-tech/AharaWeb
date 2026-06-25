"use client";

import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function TiltCard({ children, className = "", style }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sheenX = useMotionValue(50);
  const sheenY = useMotionValue(50);

  const springRotX = useSpring(rotX, { stiffness: 150, damping: 20 });
  const springRotY = useSpring(rotY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if ("ontouchstart" in window) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const rx = ((my - rect.height / 2) / rect.height) * 8;
    const ry = ((mx - rect.width / 2) / rect.width) * 8;
    rotX.set(-rx);
    rotY.set(ry);
    // Sheen moves opposite to tilt
    sheenX.set(100 - (mx / rect.width) * 100);
    sheenY.set(100 - (my / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    rotX.set(0);
    rotY.set(0);
    sheenX.set(50);
    sheenY.set(50);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        rotateX: springRotX,
        rotateY: springRotY,
        transformStyle: "preserve-3d",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {/* Sheen overlay */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
          borderRadius: "inherit",
        }}
      />
    </motion.div>
  );
}
