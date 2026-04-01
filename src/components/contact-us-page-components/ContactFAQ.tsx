"use client";
import React, { useEffect, useRef, useState } from "react";
import { HelpCircle } from "lucide-react";
import { faqsData } from "@/data/contact-us-page-data";

const ContactFAQ: React.FC = () => {
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
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-12 sm:py-14 md:py-16">
      <div
        className="container mx-auto"
        style={{ maxWidth: "1400px", padding: "0 clamp(16px, 4vw, 64px)" }}
      >
        <div
          className="text-center mb-10 sm:mb-12 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
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
              FAQ
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
            Frequently Asked <span className="text-[#FF5000]">Questions</span>
          </h2>
          <p
            className="font-medium text-[#2b2e33] mt-3 mx-auto"
            style={{
              fontSize: "clamp(13px, 1.4vw, 17px)",
              maxWidth: "clamp(280px, 45vw, 520px)",
            }}
          >
            Find quick answers to common questions about our services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
          {faqsData.map((faq, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              style={{
                padding: "clamp(16px, 2vw, 24px)",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(20px)",
                transition: `opacity 0.6s ${0.1 + i * 0.08}s ease-out, transform 0.6s ${0.1 + i * 0.08}s ease-out, box-shadow 0.3s, translate 0.3s`,
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5 group-hover:bg-[#FF5000] transition-colors duration-300"
                  style={{
                    width: "clamp(28px, 3.5vw, 36px)",
                    height: "clamp(28px, 3.5vw, 36px)",
                    background: "rgba(255,80,0,0.10)",
                  }}
                >
                  <HelpCircle
                    size={14}
                    className="text-[#FF5000] group-hover:text-gray-800 transition-colors duration-300"
                  />
                </div>
                <div>
                  <h3
                    className="font-black text-[#101113] mb-2 group-hover:text-[#FF5000] transition-colors duration-300"
                    style={{ fontSize: "clamp(13px, 1.4vw, 16px)" }}
                  >
                    {faq.question}
                  </h3>
                  <p
                    className="font-medium text-[#2b2e33] leading-relaxed"
                    style={{ fontSize: "clamp(11px, 1.2vw, 14px)" }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactFAQ;
