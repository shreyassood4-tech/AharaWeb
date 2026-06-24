"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { WAITLIST_INTERESTS } from "@/lib/constants";

interface WaitlistFormProps {
  variant?: "dark" | "light";
}

export default function WaitlistForm({ variant = "dark" }: WaitlistFormProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const inputClass = `w-full px-4 py-3 rounded-xl font-inter text-base outline-none transition-all duration-200 ${
    variant === "dark"
      ? "bg-abyss text-cream placeholder-cream/40 border border-gold/30 focus:border-gold/80"
      : "bg-cream/10 text-charcoal placeholder-charcoal/40 border border-forest/30 focus:border-forest"
  }`;

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const validate = (): boolean => {
    if (!firstName.trim()) {
      setError("Please enter your first name.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    const webhookUrl = process.env.NEXT_PUBLIC_WAITLIST_WEBHOOK_URL;
    if (!webhookUrl) {
      setSuccess(true);
      return;
    }

    setLoading(true);
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          interests,
          timestamp: new Date().toISOString(),
        }),
      });
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[480px] mx-auto">
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col items-center gap-4 py-8 text-center"
          >
            <CheckCircle className="text-gold" size={40} />
            <p className="font-cormorant text-gold text-3xl font-light">You&apos;re on the list.</p>
            <p className="font-inter text-cream/80 text-base">
              We&apos;ll reach out as we get closer to launch.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClass}
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              required
            />

            <div className="flex flex-wrap gap-2 mt-1">
              {WAITLIST_INTERESTS.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-200 ${
                    interests.includes(interest)
                      ? "bg-gold text-void border border-gold"
                      : "bg-transparent text-gold border border-gold/50 hover:border-gold"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>

            {error && (
              <p className="text-gold text-sm font-mono">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold-filled w-full py-4 mt-2 disabled:opacity-60"
            >
              {loading ? "Joining..." : "Join the Waitlist"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
