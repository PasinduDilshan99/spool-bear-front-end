import { HeroSectionProps } from "@/types/home-page-types";
import {
  HOME_PAGE_HERO_SECTION,
  HOME_PAGE_HOW_IT_WORK_SECTION_PRINT,
  HOME_PAGE_HOW_IT_WORK_SECTION_QUOTE,
  HOME_PAGE_HOW_IT_WORK_SECTION_UPLOAD,
  HOME_PAGE_WHY_CHOOSE_US_SECTION_DESIGN,
  HOME_PAGE_WHY_CHOOSE_US_SECTION_LOCAL,
  HOME_PAGE_WHY_CHOOSE_US_SECTION_QUOTATION,
  HOME_PAGE_WHY_CHOOSE_US_SECTION_RELIABLE,
  HOME_PAGE_WHY_CHOOSE_US_SECTION_TRANSPARENT,
} from "@/utils/imagesUrl";
import { ABOUT_US_PAGE_PATH, SHOP_PAGE_PATH } from "@/utils/urls";

export const HOME_PAGE_HERO_SECTION_DEFAULTS: HeroSectionProps = {
  title: "Turning digital designs into",
  accentText: "real-world solutions.",
  subtitle: "",
  primaryCtaText: "Shop Now",
  primaryCtaLink: SHOP_PAGE_PATH,
  secondaryCtaText: "Learn More",
  secondaryCtaLink: ABOUT_US_PAGE_PATH,
  imagePath: HOME_PAGE_HERO_SECTION,
  imageAlt: "3D Printer",
  className: "",
};

export const howItsWorkData = [
  {
    iconWrapClass: "",
    icon: {
      src: HOME_PAGE_HOW_IT_WORK_SECTION_UPLOAD,
      alt: "Upload icon",
    },
    title: "Upload and Describe",
    textHtml:
      "Upload your 3D design file, or tell us about your idea if you don't have a design yet.",
  },
  {
    iconWrapClass: "",
    icon: {
      src: HOME_PAGE_HOW_IT_WORK_SECTION_QUOTE,
      alt: "Quote icon",
    },
    title: "Get an Instant Quote",
    textHtml:
      "Our system automatically analyzes your request and generates a real-time quotation.",
  },
  {
    iconWrapClass: "",
    icon: {
      src: HOME_PAGE_HOW_IT_WORK_SECTION_PRINT,
      alt: "Print and delivery icon",
    },
    title: "Print & Deliver",
    textHtml:
      "Once confirmed, we manufacture your part with care and deliver it to you.",
  },
];

export const whyChooseUsData = [
  {
    iconWrapClass: "",
    icon: {
      src: HOME_PAGE_WHY_CHOOSE_US_SECTION_QUOTATION,
      alt: "",
      ariaHidden: true,
    },
    headingHtml: "Instant<br />Quotation",
    textHtml:
      "Get a real-time price<br />the moment you<br />upload your design or<br />request a print.",
  },
  {
    iconWrapClass: "",
    icon: {
      src: HOME_PAGE_WHY_CHOOSE_US_SECTION_DESIGN,
      alt: "",
      ariaHidden: true,
    },
    headingHtml: "Design +<br />Print",
    textHtml:
      "From idea to<br />finished part —<br />everything handled<br />in one place.",
  },
  {
    iconWrapClass: "",
    icon: {
      src: HOME_PAGE_WHY_CHOOSE_US_SECTION_RELIABLE,
      alt: "",
      ariaHidden: true,
    },
    headingHtml: "Reliable<br />Quality",
    textHtml:
      "Accurate prints<br />made for both<br />functional and<br />visual use.",
  },
  {
    iconWrapClass: "",
    icon: {
      src: HOME_PAGE_WHY_CHOOSE_US_SECTION_TRANSPARENT,
      alt: "",
      ariaHidden: true,
    },
    headingHtml: "Transparent<br />Pricing",
    textHtml: "Clear pricing<br />with no hidden<br />costs or<br />surprises.",
  },
  {
    iconWrapClass: "",
    icon: {
      src: HOME_PAGE_WHY_CHOOSE_US_SECTION_LOCAL,
      alt: "",
      ariaHidden: true,
    },
    headingHtml: "Local<br />Support",
    textHtml:
      "Fast, reliable<br />help whenever<br />you need<br />assistance.",
  },
];
