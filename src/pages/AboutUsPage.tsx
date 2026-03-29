// app/about/page.tsx
"use client";

import AboutCTA from "@/components/about-us-page-components/AboutCTA";
import AboutHero from "@/components/about-us-page-components/AboutHero";
import AboutJourney from "@/components/about-us-page-components/AboutJourney";
import AboutStats from "@/components/about-us-page-components/AboutStats";
import AboutTeam from "@/components/about-us-page-components/AboutTeam";
import AboutValues from "@/components/about-us-page-components/AboutValues";
import AboutWhyUs from "@/components/about-us-page-components/AboutWhyUs";

const AboutPage = () => {
  return (
    <>
      <style global jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Faculty+Glyphic&display=swap");

        @keyframes aboutReveal {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes aboutSlideLeft {
          from {
            opacity: 0;
            transform: translateX(24px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes aboutPulse {
          0%,
          100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
          }
        }
        @keyframes aboutShimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }
        @keyframes aboutOrbitCW {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes aboutOrbitCCW {
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes aboutUnderline {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @keyframes aboutBadgePop {
          0% {
            opacity: 0;
            transform: scale(0) rotate(-15deg);
          }
          70% {
            transform: scale(1.12) rotate(5deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        @keyframes aboutFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>

      <div
        className=" bg-[#e4e7ec] relative overflow-x-hidden"
        style={{ fontFamily: "'Faculty Glyphic', sans-serif" }}
      >
        {/* Global grid texture */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,80,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.045) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative z-10 ">
          {/* 1 — Hero */}
          <AboutHero />

          {/* Dot divider */}
          <Divider />

          {/* 2 — Stats */}
          <AboutStats />

          {/* Dot divider */}
          <Divider />

          {/* 3 — Journey / milestones */}
          <AboutJourney />

          {/* Dot divider */}
          <Divider />

          {/* 4 — Values */}
          <AboutValues />

          {/* Dot divider */}
          <Divider />

          {/* 5 — Why Us */}
          <AboutWhyUs />

          {/* Dot divider */}
          <Divider />

          {/* 6 — Team */}
          {/* <AboutTeam /> */}

          {/* 7 — CTA */}
          <AboutCTA />
        </div>
      </div>
    </>
  );
};

/* Subtle dot divider between sections */
function Divider() {
  return (
    <div
      className="flex items-center gap-3 mx-auto"
      style={{ padding: "0 clamp(16px, 4vw, 64px)", maxWidth: "1400px" }}
    >
      <div className="flex-1 h-px bg-black/6" />
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-full bg-[#FF5000] animate-pulse"
            style={{
              width: "5px",
              height: "5px",
              opacity: 0.35,
              animationDelay: `${i * 200}ms`,
            }}
          />
        ))}
      </div>
      <div className="flex-1 h-px bg-black/6" />
    </div>
  );
}

export default AboutPage;
