import DesignQuestionSection from "@/components/home-page-components/DesignQuestionSection";
import GalleryHome from "@/components/home-page-components/GalleryHome";
import HeroSection from "@/components/home-page-components/HeroSection";
import HowItWorksSection from "@/components/home-page-components/HowItWorksSection";
import NoDesignSection from "@/components/home-page-components/NoDesignSection";
import WhyChooseUsSection from "@/components/home-page-components/WhyChooseUsSection";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <DesignQuestionSection />
      <HowItWorksSection />
      <GalleryHome />
      <WhyChooseUsSection />
      <NoDesignSection />
    </div>
  );
};

export default HomePage;
