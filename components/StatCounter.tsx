"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface StatCounterProps {
  target: string;
  suffix?: string;
  label: string;
  fontSize?: string;
}

export default function StatCounter({ target, suffix = "", label, fontSize = "108px" }: StatCounterProps) {
  const [displayed, setDisplayed] = useState("0");
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasRunRef = useRef(false);
  const controls = useAnimation();

  const numericMatch = target.match(/^(\d+)/);
  const numericTarget = numericMatch ? parseInt(numericMatch[1]) : null;
  const nonNumericSuffix = numericMatch ? target.slice(numericMatch[0].length) : "";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasRunRef.current) {
          hasRunRef.current = true;
          setTriggered(true);

          if (numericTarget === null) {
            setTimeout(() => {
              setDisplayed(target);
              triggerGlow();
            }, 200);
            return;
          }

          const duration = 2000;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * numericTarget);
            setDisplayed(`${current}${nonNumericSuffix}`);
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              triggerGlow();
            }
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numericTarget, nonNumericSuffix, target]);

  useEffect(() => {
    if (!triggered) {
      setDisplayed(numericTarget !== null ? "0" : target);
    }
  }, [numericTarget, target, triggered]);

  const triggerGlow = () => {
    controls.start({
      textShadow: [
        "0 0 0px transparent",
        "0 0 60px rgba(196,151,58,0.8)",
        "0 0 20px rgba(196,151,58,0.3)",
      ],
      scale: [1, 1.04, 1],
      transition: { duration: 0.8, ease: "easeOut" },
    });
  };

  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <motion.span
        animate={controls}
        className="font-cormorant font-light text-gold gold-stat leading-none"
        style={{ fontSize, lineHeight: 1, display: "inline-block" }}
      >
        {displayed}{suffix}
      </motion.span>
      <p className="font-inter text-charcoal text-center text-base leading-relaxed max-w-[220px]" style={{ opacity: 0.85 }}>
        {label}
      </p>
    </div>
  );
}
