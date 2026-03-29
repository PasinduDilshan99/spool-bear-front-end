// Footer.tsx
"use client";
import React from "react";
import { FooterProps } from "@/types/footer-types";
import { footerData as defaultFooterData } from "@/data/footer-data";
import SmoothScrollLink from "./SmoothScrollLink";

const Footer: React.FC<FooterProps> = ({
  data = defaultFooterData,
  className = "",
}) => {
  return (
    <footer
      className={`relative py-20 ${className}`}
      style={{
        background: "#101113",
        backgroundImage: data.backgroundImage
          ? `linear-gradient(rgba(255,80,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.04) 1px, transparent 1px)`
          : "linear-gradient(rgba(255,80,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.04) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        color: "#fff",
        position: "relative" as const,
      }}
    >
      {/* Optional background image overlay */}
      {data.backgroundImage && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${data.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}

      <div
        className="mx-auto px-[4vw] relative z-10"
        style={{ maxWidth: "3120px" }}
      >
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-16">
          {data.columns.map(({ title, links, class: columnClass }) => (
            <div key={title} className={columnClass || ""}>
              <p
                className="mb-5 text-xs font-black uppercase tracking-[0.10em]"
                style={{ color: "#ff5000" }}
              >
                {title}
              </p>
              {links.map((link) => (
                <SmoothScrollLink
                  key={link.label}
                  href={link.href}
                  className="mb-3 block text-[17px] font-semibold no-underline transition-colors"
                >
                  <span
                    style={{ color: "rgba(255,255,255,0.75)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.75)")
                    }
                  >
                    {link.label}
                  </span>
                </SmoothScrollLink>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4">
          <div
            className="h-[2px] w-[min(720px,78%)]"
            style={{ background: "rgba(255,255,255,0.14)" }}
          />
          <span
            className="font-black"
            style={{
              fontSize: "64px",
              letterSpacing: "-0.03em",
              color: "rgba(255,255,255,0.12)",
            }}
          >
            {data.bottom.brand}
          </span>
          <span
            className="text-xs font-semibold"
            style={{ color: "rgba(255,255,255,0.30)" }}
          >
            © {new Date().getFullYear()} {data.bottom.brand} — All rights
            reserved
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
