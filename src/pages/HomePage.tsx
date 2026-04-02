import DesignQuestionSection from "@/components/home-page-components/DesignQuestionSection";
import GalleryHome from "@/components/home-page-components/GalleryHome";
import HeroSection from "@/components/home-page-components/HeroSection";
import HowItWorksSection from "@/components/home-page-components/HowItWorksSection";
import NoDesignSection from "@/components/home-page-components/NoDesignSection";
import WhyChooseUsSection from "@/components/home-page-components/WhyChooseUsSection";

const HomePage = () => {
  return (
    <div>
      <div>
        <HeroSection />
      </div>
      <div id="help">
        <DesignQuestionSection />
      </div>
      <div id="how">
        <HowItWorksSection />
      </div>
      <div>
        <GalleryHome />
      </div>
      <div>
        <WhyChooseUsSection />
      </div>
      <div>
        <NoDesignSection />
      </div>
    </div>
  );
};

export default HomePage;
