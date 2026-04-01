"use client";
import { TermsContent } from "@/components/terms-and-conditions-page-components/TermsContent";
import { TermsFooter } from "@/components/terms-and-conditions-page-components/TermsFooter";
import { TermsHero } from "@/components/terms-and-conditions-page-components/TermsHero";
import { TermsSidebar } from "@/components/terms-and-conditions-page-components/TermsSidebar";
import { termsLastUpdateDate } from "@/data/faq-page-data";
import { sections } from "@/data/terms-and-conditions-page-data";
import { useState } from "react";

const TermsAndConditionPage = () => {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-[#f5f2ee] relative overflow-x-hidden font-['Instrument_Sans',sans-serif]">
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,80,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div
        className="fixed top-0 left-0 right-0 h-[500px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 400px at 50% -100px, rgba(255,80,0,0.07), transparent)",
        }}
      />

      <div
        className="container mx-auto relative z-10"
        style={{
          maxWidth: "1280px",
          padding: "clamp(40px, 5vw, 80px) clamp(20px, 4vw, 60px)",
        }}
      >
        <TermsHero lastUpdated={termsLastUpdateDate} />

        <div className="lg:hidden mb-8">
          <select
            value={activeSection}
            onChange={(e) => setActiveSection(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-[#E2DDD6] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF5000] text-[#2A2420] font-medium shadow-sm"
          >
            {sections.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <TermsSidebar
            sections={sections}
            activeSection={activeSection}
            onSelect={setActiveSection}
          />
          <TermsContent activeSection={activeSection} />
        </div>

        <TermsFooter />
      </div>
    </div>
  );
};

export default TermsAndConditionPage;
