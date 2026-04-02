import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { CONTACT_US_PAGE_PATH, SHOP_PAGE_PATH } from "@/utils/urls";
import { FaqCtaBannerProps } from "@/types/faq-types";

export function FaqCtaBanner({ visible }: FaqCtaBannerProps) {
  return (
    <div
      className="mt-14 sm:mt-16 relative rounded-2xl sm:rounded-3xl overflow-hidden text-center"
      style={{
        background: "#1A1A1A",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: "opacity 0.65s ease-out, transform 0.65s ease-out",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, #FF5000 2px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF5000]" />
      <div
        className="absolute -top-16 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "clamp(200px, 40vw, 500px)",
          height: "clamp(200px, 40vw, 500px)",
          background:
            "radial-gradient(circle, rgba(255,80,0,0.14) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />

      <div
        className="relative z-10 mx-auto"
        style={{
          maxWidth: "clamp(300px, 55vw, 600px)",
          padding: "clamp(36px, 5vw, 64px) clamp(24px, 4vw, 64px)",
        }}
      >
        <div className="w-14 h-14 rounded-2xl bg-[#FF5000]/20 flex items-center justify-center mx-auto mb-5">
          <MessageCircle size={24} className="text-[#FF5000]" />
        </div>

        <h3
          className="font-black text-white tracking-tight mb-3"
          style={{
            fontSize: "clamp(20px, 3.5vw, 36px)",
            letterSpacing: "-0.03em",
          }}
        >
          Still have questions?
        </h3>
        <p
          className="text-white/60 font-medium mb-8 leading-relaxed"
          style={{ fontSize: "clamp(13px, 1.4vw, 16px)" }}
        >
          Our customer support team is here to help. We typically respond within
          4 hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={CONTACT_US_PAGE_PATH}
            className="group relative overflow-hidden inline-flex items-center gap-2 font-black uppercase tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            style={{
              fontSize: "clamp(11px, 1.1vw, 13px)",
              padding: "clamp(13px, 1.5vw, 15px) clamp(22px, 2.8vw, 32px)",
              background: "#FF5000",
              borderRadius: "clamp(10px, 1.2vw, 14px)",
              boxShadow: "0 6px 20px rgba(255,80,0,0.38)",
            }}
          >
            <span
              className="absolute top-0 bottom-0 w-14 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                animation: "ctaShimmer 2.5s 1s ease-in-out infinite",
              }}
            />
            <MessageCircle size={14} className="relative z-10" />
            <span className="relative z-10">Contact Support</span>
          </Link>

          <Link
            href={SHOP_PAGE_PATH}
            className="inline-flex items-center gap-2 font-black uppercase tracking-[0.08em] text-white border-2 border-white/20 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            style={{
              fontSize: "clamp(11px, 1.1vw, 13px)",
              padding: "clamp(13px, 1.5vw, 15px) clamp(22px, 2.8vw, 32px)",
              borderRadius: "clamp(10px, 1.2vw, 14px)",
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
