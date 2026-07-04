import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { CONTACT_US_PAGE_PATH } from "@/utils/urls";
import { FaqHeroProps } from "@/types/faq-types";

export function FaqHero({ heroVisible }: FaqHeroProps) {
  return (
    <div className="text-center mb-12 sm:mb-14 flex flex-col items-center">
      <div
        className="inline-flex items-center justify-center rounded-2xl mb-6"
        style={{
          width: "clamp(56px, 7vw, 72px)",
          height: "clamp(56px, 7vw, 72px)",
          background: "linear-gradient(145deg, #FF5000 0%, #e34800 100%)",
          boxShadow: "0 8px 28px rgba(255,80,0,0.38)",
          animation: heroVisible ? "faqHeroReveal 0.6s ease-out both" : "none",
        }}
      >
        <HelpCircle size={28} className="text-white" />
      </div>

      <div
        className="inline-flex items-center gap-2 sm:gap-3 mb-4"
        style={{
          animation: heroVisible
            ? "faqHeroReveal 0.6s 0.08s ease-out both"
            : "none",
        }}
      >
        <div
          className="h-[2px] rounded-full bg-[#FF5000]"
          style={{ width: "clamp(20px, 3vw, 36px)" }}
        />
        <span className="font-black uppercase tracking-[0.2em] text-[#FF5000] text-[clamp(9px,1vw,12px)]">
          Help Center
        </span>
        <div
          className="h-[2px] rounded-full bg-[#FF5000]"
          style={{ width: "clamp(20px, 3vw, 36px)" }}
        />
      </div>

      <h1
        className="font-black text-[#101113] tracking-tight mb-4 relative inline-block"
        style={{
          fontSize: "clamp(28px, 5vw, 56px)",
          letterSpacing: "-0.03em",
          animation: heroVisible
            ? "faqHeroReveal 0.65s 0.15s ease-out both"
            : "none",
        }}
      >
        Frequently Asked Questions
        <span
          className="absolute -bottom-2 left-0 h-[3px] sm:h-[4px] rounded-full bg-[#FF5000]/25"
          style={{
            animation: heroVisible
              ? "faqUnderline 1s 0.65s ease-out both"
              : "none",
            width: "auto",
          }}
        />
      </h1>

      <p
        className="font-medium text-[#2b2e33] max-w-2xl mx-auto leading-relaxed"
        style={{
          fontSize: "clamp(13px, 1.5vw, 17px)",
          animation: heroVisible
            ? "faqHeroReveal 0.65s 0.22s ease-out both"
            : "none",
        }}
      >
        Find answers to common questions about ordering, shipping, returns, and
        more. Can&apos;t find what you&apos;re looking for?{" "}
        <Link
          href={CONTACT_US_PAGE_PATH}
          className="text-[#FF5000] font-bold hover:underline"
        >
          Contact our support team.
        </Link>
      </p>
    </div>
  );
}
