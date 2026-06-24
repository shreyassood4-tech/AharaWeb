"use client";

import { useEffect, useRef, useState } from "react";

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
            setTimeout(() => setDisplayed(target), 200);
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
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [numericTarget, nonNumericSuffix, target]);

  useEffect(() => {
    if (!triggered) {
      setDisplayed(numericTarget !== null ? "0" : target);
    }
  }, [numericTarget, target, triggered]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <span
        className="font-cormorant font-light text-gold gold-stat leading-none"
        style={{ fontSize, lineHeight: 1 }}
      >
        {displayed}{suffix}
      </span>
      <p className="font-inter text-cream text-center text-base leading-relaxed max-w-[220px]" style={{ opacity: 0.85 }}>
        {label}
      </p>
    </div>
  );
}
