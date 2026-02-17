"use client";
import React from "react";
import Image from "next/image";

interface WhyCard {
  iconWrapClass: string;
  icon: {
    src: string;
    alt: string;
    ariaHidden?: boolean;
  };
  headingHtml: string;
  textHtml: string;
}

interface WhyChooseUsProps {
  className?: string;
  title?: string;
  cards?: WhyCard[];
}

const WhyChooseUsSection: React.FC<WhyChooseUsProps> = ({
  className = "",
  title = "WHY CHOOSE US?",
  cards = [
    {
      iconWrapClass: "why-icon why-icon-instant",
      icon: { src: "/images/quote.png", alt: "", ariaHidden: true },
      headingHtml: "Instant<br />Quotation",
      textHtml:
        "Get a real-time price<br />the moment you<br />upload your design or<br />request a print.",
    },
    {
      iconWrapClass: "why-icon why-icon-design",
      icon: { src: "/images/design.png", alt: "", ariaHidden: true },
      headingHtml: "Design +<br />Print",
      textHtml:
        "From idea to<br />finished part —<br />everything handled<br />in one place.",
    },
    {
      iconWrapClass: "why-icon why-icon-quality",
      icon: { src: "/images/quality.png", alt: "", ariaHidden: true },
      headingHtml: "Reliable<br />Quality",
      textHtml:
        "Accurate prints<br />made for both<br />functional and<br />visual use.",
    },
    {
      iconWrapClass: "why-icon why-icon-pricing",
      icon: { src: "/images/price.png", alt: "", ariaHidden: true },
      headingHtml: "Transparent<br />Pricing",
      textHtml:
        "Clear pricing<br />with no hidden<br />costs or<br />surprises.",
    },
    {
      iconWrapClass: "why-icon why-icon-support",
      icon: { src: "/images/support.png", alt: "", ariaHidden: true },
      headingHtml: "Local<br />Support",
      textHtml:
        "Fast, reliable<br />help whenever<br />you need<br />assistance.",
    },
  ],
}) => {
  return (
    <section
      className={`relative py-20 md:py-28 lg:py-36 bg-[#e4e7ec] overflow-hidden ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 10% 20%, #ff5000 0%, transparent 30%),
                             radial-gradient(circle at 90% 40%, #ff5000 0%, transparent 30%),
                             radial-gradient(circle at 30% 80%, #ff5000 0%, transparent 30%),
                             radial-gradient(circle at 70% 60%, #ff5000 0%, transparent 30%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[#ff5000] font-bold text-sm md:text-base uppercase tracking-[0.2em] mb-4 block">
            Why SpoolBear
          </span>
          <h2 className="font-black text-[clamp(42px,7vw,72px)] tracking-[-0.02em] text-[#101113] mb-6">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-[#2b2e33] max-w-3xl mx-auto">
            We combine expertise, technology, and passion to deliver exceptional
            3D printing services
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-white/50 flex flex-col items-center text-center"
            >
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#ff5000]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon Container */}
              <div className="relative mb-6">
                {/* Background glow */}
                <div className="absolute inset-0 bg-[#ff5000]/20 rounded-full blur-2xl scale-150 group-hover:scale-175 transition-transform duration-500" />

                {/* Icon circle */}
                <div className="relative w-28 h-28 bg-white rounded-2xl rotate-45 shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:rotate-90">
                  <div className="absolute inset-0 flex items-center justify-center -rotate-45 group-hover:-rotate-90 transition-transform duration-500">
                    <div className="relative w-14 h-14">
                      <Image
                        src={card.icon.src}
                        alt={card.icon.alt || "Why choose us icon"}
                        fill
                        className="object-contain"
                        aria-hidden={card.icon.ariaHidden}
                        sizes="56px"
                      />
                    </div>
                  </div>
                </div>

                {/* Decorative rings */}
                <div className="absolute -inset-2 border-2 border-[#ff5000]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-4 border-2 border-[#ff5000]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Heading */}
              <h3
                className="text-xl md:text-2xl font-bold text-[#101113] mb-4"
                dangerouslySetInnerHTML={{ __html: card.headingHtml }}
              />

              {/* Description */}
              <p
                className="text-[#2b2e33] text-base md:text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: card.textHtml }}
              />

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-16 h-1 bg-[#ff5000] rounded-full transition-all duration-500" />

              {/* Step number indicator (small) */}
              <div className="absolute top-4 right-4 text-4xl font-black text-[#ff5000]/10">
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .group:hover .relative {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUsSection;
