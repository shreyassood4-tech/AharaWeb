"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";

interface CharacterRevealProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function CharacterReveal({
  children,
  className = "",
  style,
  as: Tag = "h1",
}: CharacterRevealProps) {
  // Build flat list: each word as a group + trailing space
  const words = children.split(" ");

  // Assign a global index to every character (including spaces) for stagger timing
  let globalIdx = 0;
  const wordGroups = words.map((word, wi) => {
    const chars = word.split("").map((char) => ({ char, idx: globalIdx++ }));
    const space = wi < words.length - 1 ? { char: " ", idx: globalIdx++ } : null;
    return { chars, space };
  });

  return (
    <motion.div
      initial="initial"
      animate="animate"
      style={{ perspective: "400px", display: "block", ...style }}
    >
      <Tag className={className} style={{ display: "block" }}>
        {wordGroups.map((group, gi) => (
          <Fragment key={gi}>
            {/* non-breaking word wrapper — no mid-word line breaks */}
            <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              {group.chars.map(({ char, idx }) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 20, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.025,
                    ease: [0.215, 0.61, 0.355, 1.0],
                  }}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {/* space between words — this is where line breaks are allowed */}
            {group.space && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: group.space.idx * 0.025 }}
                style={{ display: "inline-block", whiteSpace: "pre" }}
              >
                {" "}
              </motion.span>
            )}
          </Fragment>
        ))}
      </Tag>
    </motion.div>
  );
}
