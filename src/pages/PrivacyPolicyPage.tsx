"use client";

import { PrivacyContent } from "@/components/privacy-policy-page-components/PrivacyContent";
import { PrivacyFooter } from "@/components/privacy-policy-page-components/PrivacyFooter";
import { PrivacyHero } from "@/components/privacy-policy-page-components/PrivacyHero";
import { privacySections } from "@/components/privacy-policy-page-components/PrivacySection";
import { PrivacySidebar } from "@/components/privacy-policy-page-components/PrivacySidebar";
import React, { useState } from "react";

const PrivacyPolicyPage = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  return (
    <div className="min-h-screen bg-[#F5F3EE] relative overflow-x-hidden font-['Instrument_Sans',sans-serif]">
      {/* Dot grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{ backgroundImage: "radial-gradient(circle, #c8bfad 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      {/* Top warm glow */}
      <div
        className="fixed top-0 left-0 right-0 h-[500px] pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse 80% 400px at 50% -100px, rgba(255,80,0,0.07), transparent)" }}
      />

      <div
        className="container mx-auto relative z-10"
        style={{ maxWidth: "1280px", padding: "clamp(40px,5vw,80px) clamp(20px,4vw,60px)" }}
      >
        <PrivacyHero lastUpdated="January 1, 2024" />

        {/* Mobile picker */}
        <div className="lg:hidden mb-8">
          <select
            value={activeSection}
            onChange={(e) => setActiveSection(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-[#E2DDD6] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF5000] text-[#2A2420] font-medium shadow-sm"
          >
            {privacySections.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <PrivacySidebar
            sections={privacySections}
            activeSection={activeSection}
            onSelect={setActiveSection}
          />
          <PrivacyContent activeSection={activeSection} />
        </div>

        <PrivacyFooter />
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;