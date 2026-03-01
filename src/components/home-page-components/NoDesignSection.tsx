"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface NoDesignSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  paragraphs?: string[];
  closingLine?: string;
  imagePath?: string;
}

const NoDesignSection: React.FC<NoDesignSectionProps> = ({
  className = "",
  title = "No Design? No Worries!",
  subtitle = "Our Bear Workers here to help.",
  paragraphs = [
    "If you don't have a 3D design file, you can still start your project with us.",
    "Simply share your idea, sketch, reference image, or explain what you need.",
    "Our design team will convert your concept into a proper 3D model that's ready for printing.",
    "You'll be able to review the design before we move forward with printing."
  ],
  closingLine = "You bring the idea — we handle the design and printing.",
  imagePath = "/images/3D_Printer(Home).png",
}) => {
  return (
    <section className={`relative py-20 md:py-28 lg:py-36 bg-[#e4e7ec] overflow-hidden ${className}`}>
      {/* Background Pattern - Bear paw prints */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, #ff5000 0%, transparent 8%),
                             radial-gradient(circle at 25% 35%, #ff5000 0%, transparent 8%),
                             radial-gradient(circle at 30% 30%, #ff5000 0%, transparent 8%),
                             radial-gradient(circle at 80% 70%, #ff5000 0%, transparent 8%),
                             radial-gradient(circle at 85% 75%, #ff5000 0%, transparent 8%),
                             radial-gradient(circle at 90% 70%, #ff5000 0%, transparent 8%)`,
            backgroundSize: '200px 200px',
            backgroundPosition: '0 0, 40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Text */}
          <div className="order-2 lg:order-1">
            {/* Title with bear icon */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#ff5000] rounded-2xl rotate-12 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-[#ff5000] font-bold text-lg uppercase tracking-[0.2em]">
                Need Help?
              </span>
            </div>

            <h2 className="font-black text-[clamp(42px,6vw,64px)] tracking-[-0.02em] text-[#101113] mb-4">
              {title}
            </h2>
            
            <h3 className="text-2xl md:text-3xl font-bold text-[#ff5000] mb-8">
              {subtitle}
            </h3>

            {/* Paragraphs with custom styling */}
            <div className="space-y-6 mb-8">
              {paragraphs.map((paragraph, index) => {
                // Special styling for the last paragraph (model ready for printing)
                if (index === 3) {
                  return (
                    <p key={index} className="text-xl md:text-2xl text-[#101113] font-medium">
                      {paragraph}
                    </p>
                  );
                }
                // Special styling for the review paragraph
                if (index === 2) {
                  return (
                    <p key={index} className="text-xl md:text-2xl text-[#2b2e33]">
                      {/* <span className="font-bold text-[#ff5000]"> </span> */}
                      {paragraph}
                    </p>
                  );
                }
                // Regular paragraphs
                return (
                  <p key={index} className="text-xl md:text-2xl text-[#2b2e33] leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Closing Line - Highlighted */}
            <div className="relative mb-10">
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-16 bg-[#ff5000] rounded-full" />
              <p className="text-xl md:text-2xl font-bold text-[#101113] italic pl-6">
                {closingLine}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group relative px-8 py-4 bg-[#ff5000] text-white font-bold text-lg rounded-full hover:bg-[#e64800] transition-all duration-300 shadow-2xl hover:shadow-3xl overflow-hidden"
              >
                <span className="relative z-10">Talk to a Bear Worker</span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              
              {/* <Link
                href="/how-it-works"
                className="group px-8 py-4 bg-transparent text-[#101113] font-bold text-lg rounded-full border-2 border-[#2b2e33] hover:bg-[#101113] hover:text-white hover:border-[#101113] transition-all duration-300"
              >
                Learn More
              </Link> */}
            </div>

            {/* Trust Indicators */}
            {/* <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-[#ff5000]/20 border-2 border-white flex items-center justify-center">
                    <span className="text-sm font-bold text-[#ff5000]">🐻</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 text-[#ff5000] fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-[#2b2e33]">Trusted by 1000+ creators</p>
              </div>
            </div> */}
          </div>

          {/* Right Content - Image with Bear Character */}
          <div className="order-1 lg:order-2 relative">
            {/* Main Image Container */}
            <div className="relative">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff5000]/20 to-transparent rounded-[40px] blur-3xl" />
              
              {/* Bear Worker Image */}
              <div className="relative z-10">
                <div className="relative w-full max-w-md mx-auto">
                  {/* Bear Character */}
                  <div className="relative aspect-square">
                    <Image
                      src={imagePath}
                      alt="Bear Worker helping with design"
                      fill
                      className="object-contain drop-shadow-2xl"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                      priority
                    />
                    
                    {/* Thought Bubble */}
                    <div className="absolute -top-8 -right-8 md:-top-12 md:-right-12 bg-white rounded-3xl p-4 shadow-2xl rotate-3 animate-float">
                      <p className="text-[#101113] font-medium whitespace-nowrap">
                        🐻 I can help! ✨
                      </p>
                      <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white transform rotate-45" />
                    </div>

                    {/* Floating Tools */}
                    <div className="absolute -left-4 top-1/4 w-12 h-12 bg-white rounded-xl shadow-xl flex items-center justify-center animate-float-delayed">
                      <span className="text-2xl">✏️</span>
                    </div>
                    <div className="absolute -right-4 bottom-1/4 w-12 h-12 bg-white rounded-xl shadow-xl flex items-center justify-center animate-float-more-delayed">
                      <span className="text-2xl">📐</span>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#ff5000]/10 rounded-full blur-2xl" />
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#ff5000]/10 rounded-full blur-2xl" />
                </div>
              </div>
            </div>

            {/* Process Steps */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {[
                { step: "1", label: "Share Idea", icon: "💡" },
                { step: "2", label: "We Design", icon: "🎨" },
                { step: "3", label: "You Approve", icon: "✅" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center mb-2 text-xl">
                    {item.icon}
                  </div>
                  <div className="text-xs font-bold text-[#ff5000]">{item.step}</div>
                  <div className="text-sm text-[#2b2e33]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Decoration - Bear Paw Trail */}
        <div className="mt-16 flex justify-center gap-2 opacity-30">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="relative">
              <svg className="w-8 h-8 text-[#ff5000]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
              </svg>
              {i < 5 && (
                <div className="absolute top-1/2 -right-2 w-4 h-0.5 bg-[#ff5000]/30" />
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(3deg);
          }
          50% {
            transform: translateY(-10px) rotate(3deg);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-float-delayed {
          animation: float-delayed 3.5s ease-in-out infinite;
        }
        .animate-float-more-delayed {
          animation: float-delayed 4.5s ease-in-out infinite 0.5s;
        }
      `}</style>
    </section>
  );
};

export default NoDesignSection;