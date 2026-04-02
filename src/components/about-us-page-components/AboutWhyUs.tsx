"use client";
import React from "react";
import { useScrollReveal } from "./aboutUtils";
import { checklistData, featuresData } from "@/data/about-us-page-data";
import { CheckCircle } from "lucide-react";

const AboutWhyUs: React.FC = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref} className="py-14 sm:py-16 md:py-20">
      <div
        className="container mx-auto"
        style={{ maxWidth: "1400px", padding: "0 clamp(16px, 4vw, 64px)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className="grid grid-cols-2 gap-3 sm:gap-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(-24px)",
              transition: "opacity 0.65s ease-out, transform 0.65s ease-out",
            }}
          >
            {featuresData.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="group bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                  style={{
                    padding: "clamp(14px, 2vw, 24px)",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "none" : "scale(0.94)",
                    transition: `opacity 0.5s ${0.1 + i * 0.08}s ease-out, transform 0.5s ${0.1 + i * 0.08}s ease-out, box-shadow 0.3s, translate 0.3s`,
                  }}
                >
                  <div className="h-1 bg-gray-100 group-hover:bg-[#FF5000] transition-colors duration-300 absolute top-0 left-0 right-0" />
                  <div
                    className="flex items-center justify-center rounded-lg sm:rounded-xl mb-3 group-hover:bg-[#FF5000] transition-colors duration-300"
                    style={{
                      width: "clamp(32px, 4vw, 44px)",
                      height: "clamp(32px, 4vw, 44px)",
                      background: "rgba(255,80,0,0.10)",
                    }}
                  >
                    <Icon
                      size={16}
                      className="text-[#FF5000] group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <h4
                    className="font-black text-[#101113] mb-1"
                    style={{ fontSize: "clamp(12px, 1.3vw, 15px)" }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="font-medium text-[#2b2e33]"
                    style={{ fontSize: "clamp(10px, 1vw, 13px)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(24px)",
              transition:
                "opacity 0.65s 0.15s ease-out, transform 0.65s 0.15s ease-out",
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
                Why Us
              </span>
            </div>

            <h2
              className="font-black text-[#101113] tracking-tight mb-4"
              style={{
                fontSize: "clamp(24px, 4vw, 46px)",
                letterSpacing: "-0.03em",
              }}
            >
              Why Choose <span className="text-[#FF5000]">SpoolBear</span>
            </h2>

            <p
              className="font-medium text-[#2b2e33] mb-7 leading-relaxed"
              style={{ fontSize: "clamp(13px, 1.4vw, 17px)" }}
            >
              We combine expertise, cutting-edge technology, and a passion for
              3D printing to deliver exceptional results every time.
            </p>

            <ul className="space-y-3 sm:space-y-4">
              {checklistData.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "none" : "translateX(12px)",
                    transition: `opacity 0.5s ${0.2 + i * 0.07}s ease-out, transform 0.5s ${0.2 + i * 0.07}s ease-out`,
                  }}
                >
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center mt-0.5">
                    <CheckCircle size={12} className="text-[#FF5000]" />
                  </div>
                  <span
                    className="font-medium text-[#101113]"
                    style={{ fontSize: "clamp(13px, 1.4vw, 16px)" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWhyUs;
