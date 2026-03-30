// components/contact/ContactHero.tsx
"use client";
import React from "react";

const ContactHero: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden text-center"
      style={{ padding: "clamp(48px, 7vw, 100px) 0 clamp(32px, 4vw, 60px)" }}
    >
      {/* Corner glows */}
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: "clamp(200px, 35vw, 480px)",
          height: "clamp(200px, 35vw, 480px)",
          background:
            "radial-gradient(circle at top left, rgba(255,80,0,0.07) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: "clamp(200px, 35vw, 480px)",
          height: "clamp(200px, 35vw, 480px)",
          background:
            "radial-gradient(circle at top right, rgba(255,80,0,0.05) 0%, transparent 65%)",
        }}
      />

      <div
        className="relative z-10 mx-auto"
        style={{
          maxWidth: "clamp(300px, 60vw, 800px)",
          padding: "0 clamp(16px, 4vw, 64px)",
        }}
      >
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6 animate-fade-in-up">
          <div
            className="h-[2px] rounded-full bg-[#FF5000]"
            style={{ width: "clamp(20px, 3vw, 36px)" }}
          />
          <span
            className="font-black uppercase tracking-[0.2em] text-[#FF5000]"
            style={{ fontSize: "clamp(9px, 1vw, 12px)" }}
          >
            Get in Touch
          </span>
          <div
            className="h-[2px] rounded-full bg-[#FF5000]"
            style={{ width: "clamp(20px, 3vw, 36px)" }}
          />
        </div>

        {/* Headline */}
        <h1
          className="font-black text-[#101113] tracking-tight mb-4 sm:mb-5 animate-fade-in-up-delay-1"
          style={{
            fontSize: "clamp(32px, 6vw, 76px)",
            letterSpacing: "-0.03em",
          }}
        >
          Let&apos;s{" "}
          <span className="relative inline-block text-[#FF5000]">
            Connect
            <span
              className="absolute bottom-0 left-0 h-[3px] sm:h-[4px] rounded-full bg-[#FF5000]/30 animate-underline"
              style={{
                width: 0,
              }}
            />
          </span>
        </h1>

        {/* Sub */}
        <p
          className="font-medium text-[#2b2e33] leading-relaxed animate-fade-in-up-delay-2"
          style={{
            fontSize: "clamp(13px, 1.6vw, 20px)",
          }}
        >
          Have a question about our services? Need a quote for your project? Our
          team is here to help. Reach out to us anytime.
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes underline {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-fade-in-up-delay-1 {
          animation: fadeInUp 0.65s ease-out 0.1s forwards;
          opacity: 0;
        }

        .animate-fade-in-up-delay-2 {
          animation: fadeInUp 0.65s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-underline {
          animation: underline 0.9s 0.65s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default ContactHero;
