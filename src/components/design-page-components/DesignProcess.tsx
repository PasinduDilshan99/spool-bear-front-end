// components/design/DesignProcess.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Users, Clock, Sparkles, FileText } from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "We discuss your idea, requirements, and gather references to understand your vision.",
  },
  {
    step: "02",
    title: "Design & Review",
    description: "Our team creates the 3D model and shares previews for your feedback and approval.",
  },
  {
    step: "03",
    title: "Final Delivery",
    description: "You receive print-ready files and a quote for printing if needed.",
  },
];

const whyItems = [
  { icon: Users,    title: "Experienced Designers", description: "Years of experience in 3D modeling across various industries." },
  { icon: Clock,    title: "Fast Turnaround",        description: "Most design projects completed within 3–5 business days." },
  { icon: Sparkles, title: "Unlimited Revisions",    description: "We work with you until you're 100% satisfied with the design." },
  { icon: FileText, title: "Print-Ready Files",      description: "All designs optimized for 3D printing with proper tolerances." },
];

const DesignProcess: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-14 sm:py-16 md:py-20 space-y-14 sm:space-y-16">

      {/* ── Our Process ── */}
      <div>
        <div
          className="text-center mb-10 sm:mb-12 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)" }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4">
            <div className="h-[2px] rounded-full bg-[#FF5000]" style={{ width: "clamp(20px, 3vw, 36px)" }} />
            <span className="font-black uppercase tracking-[0.2em] text-[#FF5000]"
              style={{ fontSize: "clamp(9px, 1vw, 12px)" }}>
              Process
            </span>
            <div className="h-[2px] rounded-full bg-[#FF5000]" style={{ width: "clamp(20px, 3vw, 36px)" }} />
          </div>
          <h2 className="font-black text-[#101113] tracking-tight"
            style={{ fontSize: "clamp(24px, 4vw, 46px)", letterSpacing: "-0.03em" }}>
            Our Design <span className="text-[#FF5000]">Process</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-[52px] left-[18%] right-[18%] h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,80,0,0.25) 20%, rgba(255,80,0,0.25) 80%, transparent)" }}
          />

          {processSteps.map((item, i) => (
            <div
              key={i}
              className="relative text-center group"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(28px)",
                transition: `opacity 0.65s ${0.1 + i * 0.12}s ease-out, transform 0.65s ${0.1 + i * 0.12}s ease-out`,
              }}
            >
              {/* Diamond tile */}
              <div
                className="mx-auto mb-5 sm:mb-6 flex items-center justify-center transition-all duration-500 group-hover:rotate-90 group-hover:scale-110"
                style={{
                  width: "clamp(64px, 8vw, 88px)",
                  height: "clamp(64px, 8vw, 88px)",
                  borderRadius: "clamp(12px, 1.5vw, 18px)",
                  background: "rgba(255,80,0,0.10)",
                  border: "1.5px solid rgba(255,80,0,0.20)",
                  transform: "rotate(45deg)",
                }}
              >
                <span
                  className="font-black text-[#FF5000] transition-transform duration-500 group-hover:-rotate-90"
                  style={{
                    fontSize: "clamp(16px, 2vw, 22px)",
                    transform: "rotate(-45deg)",
                  }}
                >
                  {item.step}
                </span>
              </div>
              <h3 className="font-black text-[#101113] mb-2"
                style={{ fontSize: "clamp(16px, 1.8vw, 22px)" }}>
                {item.title}
              </h3>
              <p className="text-[#2b2e33] font-medium leading-relaxed mx-auto"
                style={{ fontSize: "clamp(12px, 1.2vw, 15px)", maxWidth: "clamp(200px, 20vw, 280px)" }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Why Choose Us ── */}
      <div>
        <div
          className="text-center mb-10 sm:mb-12 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)" }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4">
            <div className="h-[2px] rounded-full bg-[#FF5000]" style={{ width: "clamp(20px, 3vw, 36px)" }} />
            <span className="font-black uppercase tracking-[0.2em] text-[#FF5000]"
              style={{ fontSize: "clamp(9px, 1vw, 12px)" }}>
              Why Us
            </span>
            <div className="h-[2px] rounded-full bg-[#FF5000]" style={{ width: "clamp(20px, 3vw, 36px)" }} />
          </div>
          <h2 className="font-black text-[#101113] tracking-tight"
            style={{ fontSize: "clamp(24px, 4vw, 46px)", letterSpacing: "-0.03em" }}>
            Why Choose <span className="text-[#FF5000]">Our Team</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
          {whyItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="group flex items-start gap-4 bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  padding: "clamp(16px, 2vw, 24px)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(20px)",
                  transition: `opacity 0.6s ${0.25 + i * 0.08}s ease-out, transform 0.6s ${0.25 + i * 0.08}s ease-out, box-shadow 0.3s, translate 0.3s`,
                }}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF5000] group-hover:border-[#FF5000] transition-colors duration-300">
                  <Icon size={18} className="text-[#FF5000] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-bold text-[#101113] mb-1" style={{ fontSize: "clamp(13px, 1.4vw, 16px)" }}>
                    {item.title}
                  </h3>
                  <p className="text-[#2b2e33] leading-relaxed" style={{ fontSize: "clamp(11px, 1.2vw, 14px)" }}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DesignProcess;