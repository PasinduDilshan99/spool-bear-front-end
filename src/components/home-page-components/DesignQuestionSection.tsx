import React from "react";
import Link from "next/link";
import Image from "next/image";

interface DesignQuestionSectionProps {
  className?: string;
  imagePath?: string;
}

const DesignQuestionSection: React.FC<DesignQuestionSectionProps> = ({
  className = "",
  imagePath = "/images/Home_Page_02_BG.png",
}) => {
  return (
    <section className={`py-20 bg-white ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <h2 className="font-black text-[clamp(38px,5vw,58px)] tracking-[-0.03em] text-[#101113] mb-4">
              Turn Your Ideas Into Reality with{" "}
              <span className="text-[#ff5000]">3D Printing</span>
            </h2>

            <p className="text-xl sm:text-2xl text-[#2b2e33] mb-8">
              <span className="font-medium">
                Start by telling us one thing:
              </span>
              <br />
              <span className="font-bold text-[#101113]">
                Do you already have a 3D design?
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/upload"
                className="px-8 py-4 font-bold uppercase tracking-[0.06em] text-base text-center transition-all duration-300 border-2 border-[#2b2e33] text-[#101113] hover:bg-[#101113] hover:text-white hover:border-[#101113]"
              >
                Yes, I have a design
              </Link>

              <Link
                href="/contact"
                className="px-8 py-4 font-bold uppercase tracking-[0.06em] text-base text-center transition-all duration-300 bg-[#ff5000] text-white hover:bg-[#e64800]"
              >
                No, I need help
              </Link>
            </div>
          </div>

          {/* Right content - Image */}
          <div className="relative h-[400px] w-full">
            <Image
              src="/images/Home_Page_02_BG.png"
              alt="3D Printing Design"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignQuestionSection;
