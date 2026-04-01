// components/print-page-components/PrintMaterials.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";

const materials = [
  {
    name: "PLA",
    desc: "Easy to print, biodegradable",
    hex: "#22c55e",
    tag: "Popular",
  },
  {
    name: "ABS",
    desc: "Strong, heat resistant",
    hex: "#f97316",
    tag: "Durable",
  },
  {
    name: "PETG",
    desc: "Durable, food safe",
    hex: "#3b82f6",
    tag: "Versatile",
  },
  {
    name: "TPU",
    desc: "Flexible, rubber-like",
    hex: "#a855f7",
    tag: "Flexible",
  },
];

const PrintMaterials: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-14 sm:py-16 md:py-20">
      {/* Heading */}
      <div
        className="text-center mb-10 sm:mb-12"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        <div className="inline-flex items-center gap-2 sm:gap-3 mb-4">
          <div
            className="h-[2px] rounded-full bg-[#FF5000]"
            style={{ width: "clamp(20px, 3vw, 36px)" }}
          />
          <span
            className="font-black uppercase tracking-[0.2em] text-[#FF5000]"
            style={{ fontSize: "clamp(9px, 1vw, 12px)" }}
          >
            Materials
          </span>
          <div
            className="h-[2px] rounded-full bg-[#FF5000]"
            style={{ width: "clamp(20px, 3vw, 36px)" }}
          />
        </div>
        <h2
          className="font-black text-[#101113] tracking-tight"
          style={{
            fontSize: "clamp(24px, 4vw, 46px)",
            letterSpacing: "-0.03em",
          }}
        >
          Available <span className="text-[#FF5000]">Materials</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {materials.map((m, i) => (
          <div
            key={i}
            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(28px)",
              transition: `opacity 0.55s ${0.1 + i * 0.09}s ease-out, transform 0.55s ${0.1 + i * 0.09}s ease-out, box-shadow 0.3s, translate 0.3s`,
            }}
          >
            {/* Colour strip — scales width on hover */}
            <div
              className="h-1.5 w-full transition-all duration-300 group-hover:h-2"
              style={{ background: m.hex }}
            />
            <div className="p-5 sm:p-6 flex items-start gap-4">
              <div
                className="flex-shrink-0 rounded-full shadow-sm mt-0.5 transition-transform duration-300 group-hover:scale-110"
                style={{
                  width: "clamp(32px, 4vw, 44px)",
                  height: "clamp(32px, 4vw, 44px)",
                  background: m.hex,
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3
                    className="font-black text-[#101113]"
                    style={{ fontSize: "clamp(15px, 1.6vw, 18px)" }}
                  >
                    {m.name}
                  </h3>
                  <span
                    className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full text-white"
                    style={{ background: m.hex }}
                  >
                    {m.tag}
                  </span>
                </div>
                <p
                  className="text-[#2b2e33]"
                  style={{ fontSize: "clamp(11px, 1.1vw, 13px)" }}
                >
                  {m.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PrintMaterials;
