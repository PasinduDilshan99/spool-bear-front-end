"use client";
import React from "react";
import Image from "next/image";

interface HowItWorksStep {
  iconWrapClass: string;
  icon: {
    src: string;
    alt: string;
    ariaHidden?: boolean;
  };
  title: string;
  textHtml: string;
}

interface HowItWorksSectionProps {
  className?: string;
  title?: string;
  steps?: HowItWorksStep[];
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  className = "",
  title = "How It Works?",
  steps = [
    {
      iconWrapClass: "how-icon icon-upload",
      icon: {
        src: "/images/Home_Page_03(Upload_Icon).png",
        alt: "Upload icon",
      },
      title: "Upload and Describe",
      textHtml:
        "Upload your 3D design file, or tell us about your idea if you don't have a design yet.",
    },
    {
      iconWrapClass: "how-icon icon-quote",
      icon: {
        src: "/images/Home_Page_03(Quote_Icon).png",
        alt: "Quote icon",
      },
      title: "Get an Instant Quote",
      textHtml:
        "Our system automatically analyzes your request and generates a real-time quotation.",
    },
    {
      iconWrapClass: "how-icon icon-delivery",
      icon: {
        src: "/images/Home_Page_03(print_and_Delivery).png",
        alt: "Print and delivery icon",
      },
      title: "Print & Deliver",
      textHtml:
        "Once confirmed, we manufacture your part with care and deliver it to you.",
    },
  ],
}) => {
  return (
    <section className={`relative py-16 md:py-24 lg:py-32 bg-[#e4e7ec] overflow-hidden ${className}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 10% 30%, #ff5000 0%, transparent 40%),
                             radial-gradient(circle at 90% 70%, #ff5000 0%, transparent 40%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Section Title */}
        <div className="text-center mb-16 md:mb-20 lg:mb-24">
          <h2 className="font-black text-[clamp(40px,6vw,64px)] tracking-[-0.02em] text-[#101113] mb-6">
            {title}
          </h2>
          <div className="w-32 h-1.5 bg-[#ff5000] mx-auto rounded-full" />
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Desktop Connecting Line (hidden on mobile/tablet) */}
          <div className="hidden lg:block absolute top-[160px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-transparent via-[#ff5000]/30 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 xl:gap-12 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step Number Badge - Moved up for better visibility */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-[#ff5000] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-xl z-10">
                  {index + 1}
                </div>

                {/* Icon Container - Much larger now */}
                <div className="relative mt-8 mb-8">
                  {/* Background Glow Effect */}
                  <div className="absolute inset-0 bg-[#ff5000]/20 rounded-full blur-2xl scale-150 group-hover:scale-175 transition-transform duration-500" />
                  
                  {/* Main Circle */}
                  <div className="relative w-44 h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 bg-white rounded-full shadow-2xl flex items-center justify-center group-hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-2 border-4 border-white">
                    {/* Inner Circle with Icon */}
                    <div className="relative w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36">
                      <Image
                        src={step.icon.src}
                        alt={step.icon.alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 112px, (max-width: 1024px) 128px, 144px"
                        priority={index === 0}
                      />
                    </div>
                  </div>

                  {/* Decorative Rings */}
                  <div className="absolute -inset-4 border-2 border-[#ff5000]/20 rounded-full group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute -inset-8 border-2 border-[#ff5000]/10 rounded-full group-hover:scale-110 transition-transform duration-700" />
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-[#101113] mb-4 mt-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[#2b2e33] text-base md:text-lg lg:text-xl leading-relaxed max-w-sm">
                  {step.textHtml}
                </p>

                {/* Mobile/Tablet Arrow */}
                {index < steps.length - 1 && (
                  <div className="block lg:hidden mt-8">
                    <div className="w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center">
                      <svg 
                        className="w-8 h-8 text-[#ff5000]" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M19 14l-7 7-7-7m14-8l-7 7-7-7" 
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Arrow Indicators - Larger and more prominent */}
          <div className="hidden lg:flex justify-between absolute top-[150px] left-[18%] right-[18%] pointer-events-none">
            {steps.slice(0, -1).map((_, index) => (
              <div
                key={index}
                className="relative"
                style={{ left: `${index * 33}%` }}
              >
                <div className="w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center">
                  <svg 
                    className="w-8 h-8 text-[#ff5000]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7-7 7M5 5l7 7-7 7" 
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 lg:mt-28">
          <button className="group relative px-10 py-5 bg-[#ff5000] text-white font-bold text-lg rounded-full hover:bg-[#e64800] transition-all duration-300 shadow-2xl hover:shadow-3xl overflow-hidden">
            <span className="relative z-10">Start Your Project Today</span>
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          <p className="text-[#2b2e33] text-base mt-4 font-medium">
            From design to delivery in 3 simple steps
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
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

export default HowItWorksSection;