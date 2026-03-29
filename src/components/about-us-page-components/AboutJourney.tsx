// components/about/AboutJourney.tsx
"use client";
import React from "react";
import { Quote } from "lucide-react";
import { useScrollReveal } from "./aboutUtils";
import Image from "next/image";

const milestones = [
  {
    year: "2026",
    title: "Company Founded",
    description: "Started with a single printer in a small garage.",
  },
  {
    year: "2026",
    title: "First 100 Prints",
    description:
      "Reached our first major milestone with 1000 successful prints.",
  },
  {
    year: "2026",
    title: "Expanded Facility",
    description: "Moved to our current facility and expanded to 5 printers.",
  },
  {
    year: "2026",
    title: "20+ Clients",
    description: "Served over 1000 happy clients across the country.",
  },
  {
    year: "2026",
    title: "4 Materials",
    description: "Now offering over 50 different materials for any project.",
  },
];

const AboutJourney: React.FC = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref} className="py-14 sm:py-16 md:py-20">
      <div
        className="container mx-auto"
        style={{ maxWidth: "1400px", padding: "0 clamp(16px, 4vw, 64px)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* ── Timeline ── */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(-24px)",
              transition: "opacity 0.65s ease-out, transform 0.65s ease-out",
            }}
          >
            {/* Heading */}
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-5">
              <div
                className="h-0.5 rounded-full bg-[#FF5000]"
                style={{ width: "clamp(20px, 3vw, 36px)" }}
              />
              <span
                className="font-black uppercase tracking-[0.2em] text-[#FF5000]"
                style={{ fontSize: "clamp(9px, 1vw, 12px)" }}
              >
                Our Journey
              </span>
            </div>
            <h2
              className="font-black text-[#101113] tracking-tight mb-8 sm:mb-10"
              style={{
                fontSize: "clamp(24px, 4vw, 46px)",
                letterSpacing: "-0.03em",
              }}
            >
              Our <span className="text-[#FF5000]">Journey</span>
            </h2>

            {/* Milestones */}
            <div className="space-y-0">
              {milestones.map((m, i) => (
                <div key={i} className="flex gap-4 sm:gap-5">
                  {/* Left — year badge + connector */}
                  <div className="relative flex flex-col items-center">
                    <div
                      className="flex items-center justify-center font-black text-white rounded-xl shrink-0 shadow-md shadow-orange-200"
                      style={{
                        width: "clamp(48px, 6vw, 64px)",
                        height: "clamp(48px, 6vw, 64px)",
                        fontSize: "clamp(11px, 1.2vw, 14px)",
                        background:
                          "linear-gradient(145deg, #FF5000 0%, #e34800 100%)",
                        opacity: visible ? 1 : 0,
                        transition: `opacity 0.5s ${0.1 + i * 0.1}s ease-out`,
                      }}
                    >
                      {m.year}
                    </div>
                    {i < milestones.length - 1 && (
                      <div
                        className="flex-1 w-px mt-1"
                        style={{
                          background: "rgba(255,80,0,0.22)",
                          minHeight: "clamp(28px, 4vw, 48px)",
                        }}
                      />
                    )}
                  </div>

                  {/* Right — text */}
                  <div
                    className={`flex-1 ${i < milestones.length - 1 ? "pb-6 sm:pb-8" : ""}`}
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "none" : "translateX(12px)",
                      transition: `opacity 0.5s ${0.15 + i * 0.1}s ease-out, transform 0.5s ${0.15 + i * 0.1}s ease-out`,
                    }}
                  >
                    <h3
                      className="font-black text-[#101113] mb-1"
                      style={{ fontSize: "clamp(14px, 1.6vw, 20px)" }}
                    >
                      {m.title}
                    </h3>
                    <p
                      className="font-medium text-[#2b2e33]"
                      style={{ fontSize: "clamp(12px, 1.3vw, 16px)" }}
                    >
                      {m.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Image + quote ── */}
          <div
            className="relative"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(24px)",
              transition:
                "opacity 0.65s 0.15s ease-out, transform 0.65s 0.15s ease-out",
            }}
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://res.cloudinary.com/dkfonkmwr/image/upload/v1773844362/cld-sample-2.jpg"
                alt="3D Printing in action"
                width={2000}
                height={2000}
                className="w-full h-auto object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(16,17,19,0.5) 0%, transparent 60%)",
                }}
              />
            </div>

            {/* Floating quote card */}
            <div
              className="absolute bg-white rounded-xl sm:rounded-2xl shadow-xl"
              style={{
                bottom: "clamp(-16px, -2vw, -24px)",
                left: "clamp(-8px, -1vw, -24px)",
                maxWidth: "clamp(220px, 32vw, 320px)",
                padding: "clamp(14px, 2vw, 24px)",
                animation: "aboutFloat 5s ease-in-out infinite",
                border: "1.5px solid rgba(255,80,0,0.12)",
              }}
            >
              <Quote size={22} className="text-[#FF5000] mb-2" />
              <p
                className="font-medium text-[#101113] mb-2 leading-snug"
                style={{ fontSize: "clamp(11px, 1.1vw, 14px)" }}
              >
                Every print tells a story. We&apos;re here to help you write
                yours.
              </p>
              <p
                className="font-black uppercase tracking-[0.10em] text-[#FF5000]"
                style={{ fontSize: "clamp(9px, 0.9vw, 11px)" }}
              >
                — Sarah Johnson, Founder
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutJourney;
