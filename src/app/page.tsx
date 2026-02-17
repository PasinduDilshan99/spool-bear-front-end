import DesignQuestionSection from "@/components/home-page-components/DesignQuestionSection";
import GalleryHome from "@/components/home-page-components/GalleryHome";
import HeroSection from "@/components/home-page-components/HeroSection";
import HowItWorksSection from "@/components/home-page-components/HowItWorksSection";
import NoDesignSection from "@/components/home-page-components/NoDesignSection";
import WhyChooseUsSection from "@/components/home-page-components/WhyChooseUsSection";

export default function Home() {
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
}
