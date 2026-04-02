export interface HeroSectionProps {
  title?: string;
  accentText?: string;
  subtitle?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  imagePath?: string;
  imageAlt?: string;
  className?: string;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export interface DesignQuestionSectionProps {
  className?: string;
  imagePath?: string;
}

export interface HowItWorksStep {
  iconWrapClass: string;
  icon: { src: string; alt: string; ariaHidden?: boolean };
  title: string;
  textHtml: string;
}

export interface HowItWorksSectionProps {
  className?: string;
  title?: string;
  steps?: HowItWorksStep[];
}

export interface WhyCardType {
  iconWrapClass: string;
  icon: { src: string; alt: string; ariaHidden?: boolean };
  headingHtml: string;
  textHtml: string;
}

export interface WhyChooseUsProps {
  className?: string;
  title?: string;
  cards?: WhyCardType[];
}

export interface NoDesignSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  paragraphs?: string[];
  closingLine?: string;
  imagePath?: string;
}
