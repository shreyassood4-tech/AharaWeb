import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

// Inline SVG social icons (lucide-react v1 dropped Instagram/Linkedin/Twitter)
function IconInstagram({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function IconLinkedin({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconX({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}

function MolecularSVG() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ opacity: 0.04 }}
    >
      {[
        [80, 120], [200, 60], [340, 140], [460, 80], [580, 160],
        [700, 100], [820, 180], [140, 260], [300, 300], [500, 240],
        [660, 280], [780, 220],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#C4973A" />
      ))}
      <line x1="80" y1="120" x2="200" y2="60" stroke="#C4973A" strokeWidth="0.8" />
      <line x1="200" y1="60" x2="340" y2="140" stroke="#C4973A" strokeWidth="0.8" />
      <line x1="340" y1="140" x2="460" y2="80" stroke="#C4973A" strokeWidth="0.8" />
      <line x1="460" y1="80" x2="580" y2="160" stroke="#C4973A" strokeWidth="0.8" />
      <line x1="580" y1="160" x2="700" y2="100" stroke="#C4973A" strokeWidth="0.8" />
      <line x1="700" y1="100" x2="820" y2="180" stroke="#C4973A" strokeWidth="0.8" />
      <line x1="140" y1="260" x2="300" y2="300" stroke="#C4973A" strokeWidth="0.8" />
      <line x1="300" y1="300" x2="500" y2="240" stroke="#C4973A" strokeWidth="0.8" />
      <line x1="500" y1="240" x2="660" y2="280" stroke="#C4973A" strokeWidth="0.8" />
      <line x1="660" y1="280" x2="780" y2="220" stroke="#C4973A" strokeWidth="0.8" />
      <line x1="200" y1="60" x2="140" y2="260" stroke="#C4973A" strokeWidth="0.8" />
      <line x1="580" y1="160" x2="500" y2="240" stroke="#C4973A" strokeWidth="0.8" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative pt-20 pb-12 overflow-hidden"
      style={{
        background: "#F0EBE3",
        borderTop: "1px solid rgba(196,151,58,0.15)",
      }}
    >
      <MolecularSVG />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-3">
            <Image src="/AharaSubmark.png" alt="Ahara" width={72} height={72} className="rounded-full" />
            <p className="font-inter text-charcoal text-[13px]">Science. Nourishment. Wellbeing.</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono text-xs tracking-[0.12em] text-charcoal/60 hover:text-charcoal transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <a
              href="mailto:hello@ahara.co"
              className="font-inter text-charcoal text-sm underline-offset-2 hover:underline hover:text-gold transition-colors mt-2"
            >
              hello@ahara.co
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <span className="font-mono text-gold text-[11px] tracking-[0.15em] uppercase">
              Follow the Science
            </span>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Instagram" rel="noopener noreferrer" className="text-charcoal/70 hover:text-gold transition-colors">
                <IconInstagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" rel="noopener noreferrer" className="text-charcoal/70 hover:text-gold transition-colors">
                <IconLinkedin size={20} />
              </a>
              <a href="#" aria-label="Twitter/X" rel="noopener noreferrer" className="text-charcoal/70 hover:text-gold transition-colors">
                <IconX size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t" style={{ borderColor: "rgba(196,151,58,0.08)" }}>
          <p className="font-mono text-[11px] text-center" style={{ color: "rgba(26,26,26,0.45)" }}>
            © 2026 Ahara ·{" "}
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            {" · "}
            <Link href="/terms" className="hover:text-gold transition-colors">Terms of Use</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
