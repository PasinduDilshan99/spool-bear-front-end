// app/print/page.tsx
"use client";

import PrintCTA from "@/components/print-page-components/PrintCTA";
import PrintFeatures from "@/components/print-page-components/PrintFeatures";
import PrintHero from "@/components/print-page-components/PrintHero";
import PrintMaterials from "@/components/print-page-components/PrintMaterials";
import PrintUploadForm from "@/components/print-page-components/PrintUploadForm";

const scrollToForm = () => {
  document.getElementById("upload-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const PrintPage = () => {
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

      <div
        className="container mx-auto relative z-10"
        style={{ padding: "0 clamp(16px, 4vw, 64px)" }}
      >
        {/* 1 — Hero + Upload Form side by side on lg+ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-start pt-10 sm:pt-12 md:pt-16">
          {/* Hero */}
          <PrintHero onScrollToForm={scrollToForm} />

          {/* Upload Form */}
          <div className="lg:sticky lg:top-8 pt-0 lg:pt-16">
            <PrintUploadForm />
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-4">
          <div className="flex-1 h-px bg-black/8" />
          <div className="flex gap-1.5">
            {[0,1,2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#FF5000] animate-pulse"
                style={{ opacity: 0.4, animationDelay: `${i * 200}ms` }} />
            ))}
          </div>
          <div className="flex-1 h-px bg-black/8" />
        </div>

        {/* 2 — Features */}
        <PrintFeatures />

        {/* 3 — Materials */}
        <PrintMaterials />

        {/* 4 — CTA */}
        <PrintCTA onScrollToForm={scrollToForm} />
      </div>
    </div>
  );
};

export default PrintPage;