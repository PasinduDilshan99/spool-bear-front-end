import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { FaqAccordionItemProps } from "@/types/faq-types";

export function FaqAccordionItem({
  faq,
  open,
  onToggle,
  index,
  visible,
}: FaqAccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!contentRef.current) return;

    if (isFirstRender.current && !open) {
      isFirstRender.current = false;
      return;
    }

    const scrollHeight = contentRef.current.scrollHeight;
    const rafId = requestAnimationFrame(() => {
      setHeight(open ? scrollHeight : 0);
    });

    return () => cancelAnimationFrame(rafId);
  }, [open]);

  return (
    <div
      className="group bg-white rounded-2xl border overflow-hidden transition-all duration-300 relative"
      style={{
        borderColor: open ? "rgba(255,80,0,0.30)" : "rgba(0,0,0,0.07)",
        boxShadow: open
          ? "0 8px 32px rgba(255,80,0,0.10)"
          : "0 2px 8px rgba(0,0,0,0.05)",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: `opacity 0.5s ${index * 55}ms ease-out, transform 0.5s ${index * 55}ms ease-out, border-color 0.25s, box-shadow 0.25s`,
      }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300"
        style={{
          background: open ? "#FF5000" : "transparent",
        }}
      />

      <button
        onClick={onToggle}
        className="relative w-full flex items-start gap-4 p-5 sm:p-6 text-left cursor-pointer"
        aria-expanded={open}
      >
        <div
          className="flex-shrink-0 flex items-center justify-center rounded-xl font-black text-xs transition-colors duration-300"
          style={{
            width: "clamp(28px, 3.5vw, 36px)",
            height: "clamp(28px, 3.5vw, 36px)",
            background: open ? "#FF5000" : "rgba(255,80,0,0.08)",
            color: open ? "#fff" : "#FF5000",
            marginTop: "2px",
          }}
        >
          {String(parseInt(faq.id)).padStart(2, "0")}
        </div>

        <span
          className="flex-1 font-bold text-[#101113] leading-snug pr-2 transition-colors duration-200"
          style={{
            fontSize: "clamp(13px, 1.5vw, 16px)",
            color: open ? "#FF5000" : "#101113",
          }}
        >
          {faq.question}
        </span>

        <div
          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 mt-0.5"
          style={{
            background: open ? "#FF5000" : "rgba(0,0,0,0.06)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronDown size={15} style={{ color: open ? "#fff" : "#9ca3af" }} />
        </div>
      </button>

      <div
        style={{
          height: `${height}px`,
          overflow: "hidden",
          transition: "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div ref={contentRef}>
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[calc(1.25rem+clamp(28px,3.5vw,36px)+1rem)]">
            <div className="h-px bg-gray-100 mb-4" />
            <p
              className="text-[#2b2e33] leading-relaxed font-medium"
              style={{ fontSize: "clamp(13px, 1.3vw, 15px)" }}
            >
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
