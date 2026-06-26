import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — Ahara",
  description: "Terms governing your use of the Ahara website.",
};

export default function TermsPage() {
  return (
    <div
      className="min-h-screen pt-[72px]"
      style={{ background: "#FAF7F2" }}
    >
      <div className="max-w-[720px] mx-auto px-6 py-20">
        <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase mb-6">
          LAST UPDATED: JUNE 2025
        </p>

        <h1
          className="font-cormorant font-light text-charcoal leading-tight mb-12"
          style={{ fontSize: "clamp(40px, 6vw, 64px)" }}
        >
          Terms of Use
        </h1>

        <div className="flex flex-col gap-10 font-inter" style={{ color: "rgba(26,26,26,0.80)", lineHeight: 1.8, fontSize: "17px" }}>
          <div>
            <h2 className="font-cormorant font-semibold text-charcoal text-2xl mb-4">
              Pre-Launch Site
            </h2>
            <p>
              Ahara&apos;s products are in development and not yet available for purchase. Nothing on this site is an offer for sale.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant font-semibold text-charcoal text-2xl mb-4">
              No Medical Advice
            </h2>
            <p>
              Information here is for general informational purposes only and is not medical advice. Always consult a qualified healthcare professional before changing your diet or supplementation.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant font-semibold text-charcoal text-2xl mb-4">
              Intellectual Property
            </h2>
            <p>
              All content — text, design, logo, graphics — is the property of Ahara and may not be reproduced without written permission.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant font-semibold text-charcoal text-2xl mb-4">
              Waitlist
            </h2>
            <p>
              Joining the waitlist does not constitute a purchase or guarantee of product availability.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant font-semibold text-charcoal text-2xl mb-4">
              Limitation of Liability
            </h2>
            <p>
              Ahara is not liable for damages arising from use of this website.
            </p>
          </div>

          <div
            className="pt-8 mt-4"
            style={{ borderTop: "1px solid rgba(196,151,58,0.15)" }}
          >
            <p className="font-mono text-xs tracking-widest" style={{ color: "rgba(26,26,26,0.40)" }}>
              CONTACT: HELLO@AHARA.CO
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
