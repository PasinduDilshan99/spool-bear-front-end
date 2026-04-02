import type { LucideIcon } from "lucide-react";

export interface PrivacyPolicyHeroProps {
  lastUpdated: string;
}

export interface PrivacySection {
  id: string;
  title: string;
  icon: LucideIcon;
  badge?: string;
}

export interface PrivacyPolicySideBarProps {
  sections: PrivacySection[];
  activeSection: string;
  onSelect: (id: string) => void;
}

export interface PrivacyContentType {
  heading: string;
  icon: LucideIcon;
  paragraphs?: string[];
  bulletPoints?: string[];
  checkList?: string[];
  infoBoxes?: Array<{
    variant: "orange" | "gray" | "green" | "blue" | "yellow";
    title: string;
    content?: string;
    icon?: React.ReactNode;
  }>;
  subCards?: Array<{
    icon: LucideIcon;
    title: string;
    items: string[];
  }>;
  usageCards?: Array<{
    title: string;
    desc: string;
  }>;
  cookieTypes?: Array<{
    label: string;
    desc: string;
  }>;
  rights?: Array<{
    title: string;
    desc: string;
  }>;
  contactInfo?: {
    email?: string;
    emailLink?: string;
    dpo?: string;
    address?: string;
  };
  responseText?: string;
}
