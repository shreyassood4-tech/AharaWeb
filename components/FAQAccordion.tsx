"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-[720px] mx-auto">
      {items.map((item, i) => (
        <div
          key={i}
          className="border-b"
          style={{ borderColor: "rgba(196, 151, 58, 0.15)" }}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between py-6 text-left group"
            aria-expanded={openIndex === i}
          >
            <span className="font-cormorant font-semibold text-white text-xl pr-4">
              {item.question}
            </span>
            <span
              className="font-mono text-gold text-xl flex-shrink-0 transition-transform duration-200"
              style={{ transform: openIndex === i ? "rotate(45deg)" : "none" }}
            >
              +
            </span>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <p
                  className="font-inter text-base pb-6 leading-relaxed"
                  style={{ color: "rgba(242, 237, 227, 0.72)", fontSize: "17px" }}
                >
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
