// app/design/page.tsx
"use client";

import DesignCategories from "@/components/design-page-components/DesignCategories";
import DesignCTA from "@/components/design-page-components/DesignCTA";
import DesignHero from "@/components/design-page-components/DesignHero";
import DesignProcess from "@/components/design-page-components/DesignProcess";
import DesignRequestForm from "@/components/design-page-components/DesignRequestForm";
import DesignServices from "@/components/design-page-components/DesignServices";

const scrollToForm = () => {
  document
    .getElementById("design-form")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const DesignPage = () => {
  return (
    <div className="min-h-screen bg-[#e4e7ec] relative overflow-x-hidden">
      {/* Global grid texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,80,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* 1 — Hero (full-width, has its own background) */}
      <DesignHero onScrollToForm={scrollToForm} />

      {/* 2 — Form anchored just below hero */}
      <div
        className="relative z-10"
        style={{ padding: "0 clamp(16px, 4vw, 64px)" }}
      >
        <div
          className="max-w-3xl mx-auto"
          style={{ marginTop: "clamp(-24px, -3vw, -40px)" }}
        >
          <DesignRequestForm />
        </div>
      </div>

      {/* 3 — Rest of the page */}
      <div
        className="container mx-auto relative z-10"
        style={{ padding: "0 clamp(16px, 4vw, 64px)" }}
      >
        {/* Dot divider */}
        <div className="flex items-center gap-4 mt-14 sm:mt-16">
          <div className="flex-1 h-px bg-black/8" />
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-full bg-[#FF5000] animate-pulse"
                style={{
                  width: "6px",
                  height: "6px",
                  opacity: 0.4,
                  animationDelay: `${i * 200}ms`,
                }}
              />
            ))}
          </div>
          <div className="flex-1 h-px bg-black/8" />
        </div>

        {/* Services */}
        <DesignServices />

        {/* What We Can Design */}
        <DesignCategories />

        {/* Process + Why Us */}
        <DesignProcess />

        {/* CTA */}
        <DesignCTA onScrollToForm={scrollToForm} />
      </div>
    </div>
  );
};

export default DesignPage;
