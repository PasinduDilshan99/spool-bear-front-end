"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CONTACT_US_PAGE_PATH } from "@/utils/urls";

interface NoDesignSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  paragraphs?: string[];
  closingLine?: string;
  imagePath?: string;
}

const NoDesignSection: React.FC<NoDesignSectionProps> = ({
  className = "",
  title = "No Design? No Worries!",
  subtitle = "Our Bear Workers are here to help.",
  paragraphs = [
    "If you don't have a 3D design file, you can still start your project with us.",
    "Simply share your idea, sketch, reference image, or explain what you need.",
    "Our design team will convert your concept into a proper 3D model ready for printing.",
    "You'll be able to review the design before we move forward with printing.",
  ],
  closingLine = "You bring the idea — we handle the design and printing.",
  imagePath = "/images/3D_Printer(Home).png",
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // Intersection observer — trigger animations on scroll into view
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const steps = [
    { step: "01", label: "Share Idea", icon: "💡" },
    { step: "02", label: "We Design", icon: "🎨" },
    { step: "03", label: "You Approve", icon: "✅" },
  ];

  return (
    <section
      ref={sectionRef}
      className={`relative bg-[#EBEBEB] overflow-hidden ${className}`}
    >
      {/* ── Subtle dot-grid background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #FF5000 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          opacity: 0.045,
        }}
      />

      {/* ── Orange vertical accent bar (desktop only) ── */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#FF5000] hidden lg:block" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 max-w-7xl py-16 sm:py-20 md:py-24 lg:py-32 xl:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 xl:gap-20 items-center">
          {/* ══ LEFT: Text content ══════════════════════════════════════════ */}
          <div
            className={`order-2 lg:order-1 transition-all duration-700 ease-out ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 mb-5 sm:mb-7">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#FF5000] rounded-xl flex items-center justify-center rotate-6 shadow-md shadow-orange-200 flex-shrink-0">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-[#FF5000] font-black text-xs sm:text-sm tracking-[0.25em] uppercase">
                Need Help?
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-black tracking-tight text-[#101113] leading-[1.05] mb-3 sm:mb-4"
              style={{ fontSize: "clamp(32px, 5.5vw, 62px)" }}
            >
              {title}
            </h2>

            {/* Subtitle */}
            <h3
              className="font-bold text-[#FF5000] mb-6 sm:mb-8 leading-snug"
              style={{ fontSize: "clamp(18px, 2.8vw, 30px)" }}
            >
              {subtitle}
            </h3>

            {/* Paragraphs */}
            <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              {paragraphs.map((para, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 transition-all duration-500 ${
                    visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FF5000] flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1 shadow-sm shadow-orange-200">
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p
                    className={`text-[#2b2e33] leading-relaxed ${
                      i === 3 ? "font-semibold text-[#101113]" : ""
                    }`}
                    style={{ fontSize: "clamp(14px, 1.8vw, 19px)" }}
                  >
                    {para}
                  </p>
                </div>
              ))}
            </div>

            {/* Closing line */}
            <div
              className={`relative mb-8 sm:mb-10 transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "700ms" }}
            >
              <div className="absolute -left-3 sm:-left-4 top-0 bottom-0 w-1 bg-[#FF5000] rounded-full" />
              <p
                className="font-bold text-[#101113] italic pl-5 sm:pl-7 leading-snug"
                style={{ fontSize: "clamp(15px, 2vw, 21px)" }}
              >
                {closingLine}
              </p>
            </div>

            {/* CTA */}
            <div
              className={`transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <Link
                href={CONTACT_US_PAGE_PATH}
                className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#FF5000] text-white font-black text-sm sm:text-base rounded-full shadow-xl shadow-orange-200 hover:bg-[#CC4000] hover:shadow-2xl hover:shadow-orange-300 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden relative"
              >
                <span className="relative z-10">Talk to a Bear Worker</span>
                <span className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-200">
                  <svg
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white group-hover:translate-x-0.5 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
                {/* Shine sweep */}
                <span className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12" />
              </Link>
            </div>
          </div>

          {/* ══ RIGHT: Image + elements ════════════════════════════════════ */}
          <div
            className={`order-1 lg:order-2 transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full mx-auto">
              {/* Glow blob */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF5000]/15 to-transparent rounded-[40px] blur-3xl -z-10 scale-110" />

              {/* Main image */}
              <div className="relative aspect-square w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[420px] xl:max-w-[480px] mx-auto">
                <Image
                  src={imagePath}
                  alt="Bear Worker helping with design"
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, (max-width: 1024px) 400px, 480px"
                  priority
                />

                {/* Thought bubble */}
                <div
                  className="absolute -top-4 -right-2 sm:-top-6 sm:-right-4 md:-top-8 md:-right-6 bg-white rounded-2xl sm:rounded-3xl px-3 py-2 sm:px-4 sm:py-3 shadow-2xl z-10 animate-float"
                  style={{ rotate: "3deg" }}
                >
                  <p className="text-[#101113] font-bold text-xs sm:text-sm whitespace-nowrap">
                    🐻 I can help! ✨
                  </p>
                  <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white rotate-45 shadow-sm" />
                </div>

                {/* Floating pencil */}
                <div className="absolute -left-3 sm:-left-5 top-1/4 w-9 h-9 sm:w-11 sm:h-11 bg-white rounded-xl shadow-xl flex items-center justify-center animate-float-delayed z-10">
                  <span className="text-lg sm:text-2xl">✏️</span>
                </div>

                {/* Floating ruler */}
                <div className="absolute -right-3 sm:-right-5 bottom-1/4 w-9 h-9 sm:w-11 sm:h-11 bg-white rounded-xl shadow-xl flex items-center justify-center animate-float-more-delayed z-10">
                  <span className="text-lg sm:text-2xl">📐</span>
                </div>

                {/* Subtle corner glows */}
                <div className="absolute -bottom-4 -left-4 w-20 h-20 sm:w-28 sm:h-28 bg-[#FF5000]/10 rounded-full blur-2xl" />
                <div className="absolute -top-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 bg-[#FF5000]/10 rounded-full blur-2xl" />
              </div>

              {/* Process steps */}
              <div
                className={`mt-8 sm:mt-10 grid grid-cols-3 gap-2 sm:gap-4 max-w-xs sm:max-w-sm md:max-w-md mx-auto transition-all duration-700 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                {steps.map((item, i) => (
                  <div key={item.step} className="text-center group">
                    {/* Step circle */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto bg-white rounded-xl sm:rounded-2xl shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center mb-2 sm:mb-3 border border-gray-100 group-hover:border-orange-200">
                      <span className="text-base sm:text-xl md:text-2xl leading-none">
                        {item.icon}
                      </span>
                    </div>
                    <div className="text-[10px] sm:text-xs font-black text-[#FF5000] tracking-widest mb-0.5">
                      {item.step}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-[#2b2e33]">
                      {item.label}
                    </div>

                    {/* Connector line between steps */}
                    {i < steps.length - 1 && (
                      <div className="hidden sm:block absolute" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom paw trail ── */}
        <div
          className={`mt-12 sm:mt-16 md:mt-20 flex justify-center items-center gap-2 sm:gap-3 transition-all duration-700 ${
            visible ? "opacity-30 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "900ms" }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <div
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-[#FF5000] animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              />
              {i < 4 && (
                <div className="w-4 sm:w-6 md:w-8 h-0.5 bg-[#FF5000]/50 rounded-full" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(3deg);
          }
          50% {
            transform: translateY(-10px) rotate(3deg);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 3.5s ease-in-out infinite;
        }
        .animate-float-more-delayed {
          animation: float-delayed 4.5s ease-in-out 0.5s infinite;
        }
      `}</style>
    </section>
  );
};

export default NoDesignSection;
