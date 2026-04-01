"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Printer } from "lucide-react";
import { AnimatedCounter, useScrollReveal } from "./aboutUtils";
import Image from "next/image";
import { CONTACT_US_PAGE_PATH, SHOP_PAGE_PATH } from "@/utils/urls";
import { ABOUT_US_PAGE_HERO_SECTION } from "@/utils/imagesUrl";

const AboutHero: React.FC = () => {
  const { ref, visible } = useScrollReveal(0.05);

  const reveal = (delay: string): React.CSSProperties =>
    visible
      ? { animation: `aboutReveal 0.65s ${delay} ease-out both` }
      : { opacity: 0 };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ padding: "clamp(48px, 7vw, 100px) 0 clamp(40px, 5vw, 80px)" }}
    >
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: "clamp(200px, 35vw, 500px)",
          height: "clamp(200px, 35vw, 500px)",
          background:
            "radial-gradient(circle at top right, rgba(255,80,0,0.07) 0%, transparent 65%)",
        }}
      />

      <div
        className="container mx-auto relative z-10"
        style={{ maxWidth: "1400px", padding: "0 clamp(16px, 4vw, 64px)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6"
              style={reveal("0s")}
            >
              <div
                className="h-0.5 rounded-full bg-[#FF5000]"
                style={{ width: "clamp(20px, 3vw, 36px)" }}
              />
              <span
                className="font-black uppercase tracking-[0.2em] text-[#FF5000]"
                style={{ fontSize: "clamp(9px, 1vw, 12px)" }}
              >
                About SpoolBear
              </span>
              <div
                className="h-0.5 rounded-full bg-[#FF5000]"
                style={{ width: "clamp(20px, 3vw, 36px)" }}
              />
            </div>

            <h1
              className="font-black text-[#101113] tracking-tight leading-[1.3] mb-5 sm:mb-6"
              style={{
                fontSize: "clamp(30px, 4.8vw, 62px)",
                letterSpacing: "-0.03em",
                ...reveal("0.1s"),
              }}
            >
              Turning Digital Designs Into{" "}
              <span className="relative inline-block text-[#FF5000]">
                Real-World Solutions
                <span
                  className="absolute bottom-0 left-0 h-0.75 sm:h-1 rounded-full"
                  style={{
                    background: "rgba(255,80,0,0.28)",
                    animation: visible
                      ? "aboutUnderline 0.9s 0.65s ease-out both"
                      : "none",
                    width: 0,
                  }}
                />
              </span>
            </h1>

            <p
              className="text-[#2b2e33] font-medium leading-relaxed mb-8 sm:mb-10"
              style={{
                fontSize: "clamp(13px, 1.5vw, 18px)",
                ...reveal("0.2s"),
              }}
            >
              Since 2026, we&apos;ve been helping creators, engineers, and
              businesses bring their ideas to life through professional 3D
              printing services. What started as a passion project has grown
              into a trusted partner for over 20 clients.
            </p>

            <div
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
              style={reveal("0.3s")}
            >
              <Link
                href={SHOP_PAGE_PATH}
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 font-black uppercase tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  fontSize: "clamp(11px, 1.1vw, 14px)",
                  padding: "clamp(13px, 1.5vw, 16px) clamp(22px, 2.8vw, 36px)",
                  background:
                    "linear-gradient(145deg, #FF5000 0%, #e34800 100%)",
                  borderRadius: "clamp(12px, 1.4vw, 16px)",
                  boxShadow: "0 6px 24px rgba(255,80,0,0.36)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 12px 32px rgba(255,80,0,0.46)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 6px 24px rgba(255,80,0,0.36)";
                }}
              >
                <span
                  className="absolute top-0 bottom-0 w-16 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
                    animation: "aboutShimmer 2.5s 1s ease-in-out infinite",
                  }}
                />
                <span className="relative z-10">Explore Our Work</span>
                <ArrowRight
                  size={16}
                  className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-200"
                />
              </Link>

              <Link
                href={CONTACT_US_PAGE_PATH}
                className="inline-flex items-center justify-center gap-2 font-black uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  fontSize: "clamp(11px, 1.1vw, 14px)",
                  padding: "clamp(13px, 1.5vw, 16px) clamp(22px, 2.8vw, 36px)",
                  color: "#101113",
                  border: "2px solid rgba(0,0,0,0.18)",
                  borderRadius: "clamp(12px, 1.4vw, 16px)",
                  background: "rgba(255,255,255,0.55)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#101113";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderColor = "#101113";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.18)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.55)";
                  e.currentTarget.style.color = "#101113";
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.18)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Contact Us
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="relative" style={reveal("0.15s")}>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg
                className="max-w-full max-h-full"
                style={{
                  width: "clamp(280px, 45vw, 540px)",
                  height: "clamp(280px, 45vw, 540px)",
                }}
                viewBox="0 0 540 540"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="270"
                  cy="270"
                  r="240"
                  stroke="rgba(255,80,0,0.07)"
                  strokeWidth="1.5"
                  strokeDasharray="10 14"
                  style={{
                    animation: "aboutOrbitCW 30s linear infinite",
                    transformOrigin: "270px 270px",
                  }}
                />
                <circle
                  cx="270"
                  cy="270"
                  r="192"
                  stroke="rgba(255,80,0,0.10)"
                  strokeWidth="1"
                  strokeDasharray="7 11"
                  style={{
                    animation: "aboutOrbitCCW 22s linear infinite",
                    transformOrigin: "270px 270px",
                  }}
                />
              </svg>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="rounded-full"
                style={{
                  width: "clamp(180px, 28vw, 340px)",
                  height: "clamp(180px, 28vw, 340px)",
                  background:
                    "radial-gradient(circle, rgba(255,80,0,0.15) 0%, transparent 70%)",
                  filter: "blur(48px)",
                  animation: "aboutPulse 5s ease-in-out infinite",
                }}
              />
            </div>

            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={ABOUT_US_PAGE_HERO_SECTION}
                alt="3D Printing Workshop"
                className="w-full h-auto object-cover"
                width={2000}
                height={2000}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(16,17,19,0.35) 0%, transparent 60%)",
                }}
              />

              <div
                className="absolute flex items-center gap-3 rounded-xl sm:rounded-2xl"
                style={{
                  bottom: "clamp(16px, 3vw, 28px)",
                  left: "clamp(16px, 3vw, 28px)",
                  padding: "clamp(10px, 1.4vw, 16px) clamp(12px, 1.6vw, 20px)",
                  background: "rgba(255,255,255,0.96)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
                  border: "1.5px solid rgba(255,80,0,0.15)",
                  animation: visible
                    ? "aboutBadgePop 0.6s 0.8s ease-out both"
                    : "none",
                  opacity: visible ? undefined : 0,
                }}
              >
                <div
                  className="flex items-center justify-center rounded-xl bg-[#FF5000] flex-shrink-0"
                  style={{
                    width: "clamp(36px, 4vw, 48px)",
                    height: "clamp(36px, 4vw, 48px)",
                  }}
                >
                  <Printer size={20} className="text-white" />
                </div>
                <div>
                  <div
                    className="font-black text-[#FF5000]"
                    style={{
                      fontSize: "clamp(18px, 2.2vw, 28px)",
                      lineHeight: 1,
                    }}
                  >
                    <AnimatedCounter target="5000+" />
                  </div>
                  <div
                    className="font-semibold text-[#2b2e33]"
                    style={{ fontSize: "clamp(10px, 1vw, 13px)" }}
                  >
                    Prints Completed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
