import type { LucideIcon } from "lucide-react";

export interface TermsHeroProps {
  lastUpdated: string;
}

export interface Section {
  id: string;
  title: string;
  icon: LucideIcon;
  badge?: string;
}

export interface TermsSideBarProps {
  sections: Section[];
  activeSection: string;
  onSelect: (id: string) => void;
}

export interface InfoBoxData {
  variant: "orange" | "gray" | "red";
  title?: string;
  content: React.ReactNode;
}

export interface SectionContentType {
  heading: string;
  icon: LucideIcon;
  paragraphs: string[];
  bulletPoints?: string[];
  numberedSteps?: string[];
  infoBoxes?: InfoBoxData[];
  links?: Array<{ text: string; href: string; external?: boolean }>;
  contactInfo?: {
    email?: string;
    address?: string;
    phone?: string;
  };
}

export interface TermsSideBarProps {
  sections: Section[];
  activeSection: string;
  onSelect: (id: string) => void;
}

export interface TermsContentProps {
  activeSection: string;
}
