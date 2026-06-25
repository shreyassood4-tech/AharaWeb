"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CharacterRevealProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const charVariants = {
  initial: { opacity: 0, y: 20, rotateX: -90 },
  animate: { opacity: 1, y: 0, rotateX: 0 },
};

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.025,
    },
  },
};

export default function CharacterReveal({
  children,
  className = "",
  style,
  as: Tag = "h1",
}: CharacterRevealProps) {
  // Split text preserving spaces — spaces get a non-breaking space span
  const chars = children.split("");

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={containerVariants}
      style={{ perspective: "400px", display: "inline-block", ...style }}
    >
      <Tag className={className} style={{ display: "inline" }}>
        {chars.map((char, i) => (
          <motion.span
            key={i}
            variants={charVariants}
            transition={{
              duration: 0.5,
              ease: [0.215, 0.61, 0.355, 1.0],
            }}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}
