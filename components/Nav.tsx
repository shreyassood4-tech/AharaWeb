"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center px-6 md:px-12"
        style={{
          background: "rgba(250,247,242,0.90)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(196,151,58,0.15)",
        }}
      >
        <div className="flex items-center gap-3 flex-shrink-0">
          <Image
            src="/AharaBrandIcon2.png"
            alt="Ahara"
            width={40}
            height={40}
            className="rounded-lg"
            priority
          />
          <span className="font-cormorant text-xl font-light text-charcoal hidden sm:block" style={{ letterSpacing: "0.08em" }}>
            Ahara
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 mx-auto">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative font-mono text-xs tracking-[0.12em] transition-colors duration-200 group"
                style={{ color: isActive ? "#C4973A" : "rgba(26,26,26,0.70)" }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-px bg-gold transition-all duration-200 origin-left"
                  style={{ width: isActive ? "100%" : "0%", opacity: isActive ? 1 : 0 }}
                />
              </Link>
            );
          })}
        </div>

        <div className="ml-auto md:ml-0 flex items-center gap-4">
          <Link href="/#waitlist" className="btn-gold-filled hidden md:block text-xs py-2 px-6">
            Join the Waitlist
          </Link>
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-gold"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: "#FAF7F2" }}
        >
          <div className="flex items-center justify-between px-6 h-[72px]">
            <Image src="/AharaBrandIcon2.png" alt="Ahara" width={40} height={40} className="rounded-lg" />
            <button onClick={() => setMobileOpen(false)} className="text-gold" aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-cormorant text-5xl font-light text-charcoal hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="px-6 pb-12">
            <Link
              href="/#waitlist"
              onClick={() => setMobileOpen(false)}
              className="btn-gold-filled block text-center py-4"
            >
              Join the Waitlist
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
