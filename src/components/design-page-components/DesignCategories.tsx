"use client";
import React, { useEffect, useRef, useState } from "react";
import { CheckCircle, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { CONTACT_US_PAGE_PATH } from "@/utils/urls";
import { categoriesData } from "@/data/design-page-data";
import Image from "next/image";
import { PRINT_PAGE_DESIGN_CATEGORIES_SECTION } from "@/utils/imagesUrl";

const DesignCategories: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-14 sm:py-16 md:py-20">
      <div className="bg-white/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/60 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div
            className="p-8 sm:p-10 md:p-12"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(-24px)",
              transition: "opacity 0.65s ease-out, transform 0.65s ease-out",
            }}
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-5">
              <div
                className="h-[2px] rounded-full bg-[#FF5000]"
                style={{ width: "clamp(20px, 3vw, 36px)" }}
              />
              <span
                className="font-black uppercase tracking-[0.2em] text-[#FF5000]"
                style={{ fontSize: "clamp(9px, 1vw, 12px)" }}
              >
                What We Design
              </span>
            </div>

            <h2
              className="font-black text-[#101113] tracking-tight mb-4"
              style={{
                fontSize: "clamp(22px, 3.5vw, 42px)",
                letterSpacing: "-0.03em",
              }}
            >
              What We Can <span className="text-[#FF5000]">Design</span>
            </h2>
            <p
              className="text-[#2b2e33] font-medium mb-8 leading-relaxed"
              style={{ fontSize: "clamp(13px, 1.4vw, 17px)" }}
            >
              Our experienced design team can handle a wide range of projects
              across different industries and applications.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {categoriesData.map((cat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 px-3 py-2.5 bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-colors duration-200"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.5s ${0.1 + i * 0.05}s ease-out`,
                  }}
                >
                  <CheckCircle
                    size={14}
                    className="text-[#FF5000] flex-shrink-0"
                  />
                  <span
                    className="font-semibold text-[#101113]"
                    style={{ fontSize: "clamp(11px, 1.2vw, 14px)" }}
                  >
                    {cat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative min-h-[300px] sm:min-h-[360px] lg:min-h-0"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(24px)",
              transition:
                "opacity 0.65s 0.15s ease-out, transform 0.65s 0.15s ease-out",
            }}
          >
            <Image
              src={PRINT_PAGE_DESIGN_CATEGORIES_SECTION}
              alt="3D Design"
              width={2000}
              height={2000}
              className="w-full h-full object-cover"
              style={{ minHeight: "300px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-r lg:from-white/20 lg:to-transparent" />

            <button
              className="cursor-pointer absolute bottom-5 left-5 flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => {
                router.push(CONTACT_US_PAGE_PATH);
              }}
              style={{
                background: "rgba(255,255,255,0.95)",
                boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
                border: "1.5px solid rgba(255,80,0,0.15)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,1)";
                e.currentTarget.style.border =
                  "1.5px solid rgba(255,80,0,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.95)";
                e.currentTarget.style.border =
                  "1.5px solid rgba(255,80,0,0.15)";
              }}
            >
              <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-orange-100">
                <MessageSquare
                  size={16}
                  className="text-[#FF5000] transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div>
                <p
                  className="font-black text-[#101113] leading-tight transition-colors duration-300"
                  style={{ fontSize: "clamp(11px, 1.2vw, 14px)" }}
                >
                  Free Consultation
                </p>
                <p
                  className="text-[#2b2e33] font-medium transition-colors duration-300"
                  style={{ fontSize: "clamp(10px, 1vw, 12px)" }}
                >
                  Discuss your project with us
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignCategories;
