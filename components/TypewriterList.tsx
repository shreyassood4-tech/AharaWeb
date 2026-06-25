"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterLine {
  role: string;
  ingredients: string;
}

interface TypewriterListProps {
  lines: TypewriterLine[];
}

const CHAR_DELAY = 35; // ms per character
const LINE_STAGGER = 400; // ms between line starts
const CURSOR_BLINK_DURATION = 2000; // ms blinking cursor at end

export default function TypewriterList({ lines }: TypewriterListProps) {
  const [revealed, setRevealed] = useState<string[]>(lines.map(() => ""));
  const [showCursor, setShowCursor] = useState(false);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    lines.forEach((line, lineIdx) => {
      const fullText = `${line.role}  ${line.ingredients}`;
      const lineStartDelay = lineIdx * LINE_STAGGER;

      for (let charIdx = 0; charIdx < fullText.length; charIdx++) {
        const delay = lineStartDelay + charIdx * CHAR_DELAY;
        const t = setTimeout(() => {
          setRevealed((prev) => {
            const next = [...prev];
            next[lineIdx] = fullText.slice(0, charIdx + 1);
            return next;
          });
        }, delay);
        timers.push(t);
      }
    });

    // Blinking cursor after last line completes
    const lastLineEnd = (lines.length - 1) * LINE_STAGGER + lines[lines.length - 1].ingredients.length * CHAR_DELAY + lines[lines.length - 1].role.length * CHAR_DELAY;
    const cursorStart = setTimeout(() => {
      setShowCursor(true);
      setTimeout(() => setShowCursor(false), CURSOR_BLINK_DURATION);
    }, lastLineEnd + 100);
    timers.push(cursorStart);

    return () => timers.forEach(clearTimeout);
  }, [started, lines]);

  return (
    <div ref={ref} className="flex flex-col gap-0">
      {lines.map((line, i) => {
        const text = revealed[i];
        const fullRole = line.role;
        const fullIngr = line.ingredients;
        const roleVisible = text.slice(0, fullRole.length);
        const ingrVisible = text.length > fullRole.length + 2 ? text.slice(fullRole.length + 2) : "";
        const isLastLine = i === lines.length - 1;
        const isLastComplete = text.length === (fullRole.length + 2 + fullIngr.length);

        return (
          <div key={i} className="flex gap-3 py-2 border-b border-gold/10 last:border-0 font-mono text-sm">
            <span className="text-gold min-w-[180px] text-[11px] tracking-wider">
              {roleVisible}
            </span>
            <span className="text-cream/80 text-[12px]">
              {ingrVisible}
              {isLastLine && isLastComplete && showCursor && (
                <span className="animate-pulse text-gold">█</span>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}
