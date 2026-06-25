import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Ahara",
  description: "How Ahara collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div
      className="min-h-screen pt-[72px]"
      style={{ background: "#060D07" }}
    >
      <div className="max-w-[720px] mx-auto px-6 py-20">
        <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase mb-6">
          LAST UPDATED: JUNE 2025
        </p>

        <h1
          className="font-cormorant font-light text-white leading-tight mb-12"
          style={{ fontSize: "clamp(40px, 6vw, 64px)" }}
        >
          Privacy Policy
        </h1>

        <div className="flex flex-col gap-10 font-inter" style={{ color: "rgba(242,237,227,0.80)", lineHeight: 1.8, fontSize: "17px" }}>
          <div>
            <p>
              Ahara (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting your privacy.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant font-semibold text-white text-2xl mb-4">
              Information We Collect
            </h2>
            <p>
              We collect your name, email address, and areas of interest when you join our waitlist.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant font-semibold text-white text-2xl mb-4">
              How We Use Your Information
            </h2>
            <p>
              We use it solely to send launch updates, educational content on nutrition science, and early access notifications. We do not sell or share your data with third parties for marketing.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant font-semibold text-white text-2xl mb-4">
              Data Storage
            </h2>
            <p>
              Stored securely through our form processing service, retained only as long as necessary.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant font-semibold text-white text-2xl mb-4">
              Your Rights
            </h2>
            <p>
              Unsubscribe anytime via the link in any email. Request data deletion at{" "}
              <a
                href="mailto:hello@ahara.co"
                className="text-gold hover:text-gold-bright transition-colors underline underline-offset-2"
              >
                hello@ahara.co
              </a>
              .
            </p>
          </div>

          <div
            className="pt-8 mt-4"
            style={{ borderTop: "1px solid rgba(196,151,58,0.15)" }}
          >
            <p className="font-mono text-xs tracking-widest" style={{ color: "rgba(242,237,227,0.40)" }}>
              CONTACT: HELLO@AHARA.CO · AHARA · INDIA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
