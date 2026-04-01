import {
  Shield, Eye, Database, Cookie, Mail,
  Users, Globe, FileText, Lock, Bell, Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface PrivacySection {
  id: string;
  title: string;
  icon: LucideIcon;
  badge?: string;
}

export const privacySections: PrivacySection[] = [
  { id: "introduction",  title: "Introduction",              icon: FileText  },
  { id: "information",   title: "Information We Collect",    icon: Database  },
  { id: "usage",         title: "How We Use Your Info",      icon: Settings  },
  { id: "cookies",       title: "Cookies & Tracking",        icon: Cookie    },
  { id: "sharing",       title: "Information Sharing",       icon: Users     },
  { id: "security",      title: "Data Security",             icon: Lock, badge: "Key" },
  { id: "rights",        title: "Your Rights",               icon: Shield    },
  { id: "marketing",     title: "Marketing Communications",  icon: Mail      },
  { id: "international", title: "International Transfers",   icon: Globe     },
  { id: "children",      title: "Children's Privacy",        icon: Eye       },
  { id: "updates",       title: "Policy Updates",            icon: Bell      },
  { id: "contact",       title: "Contact Us",                icon: Mail      },
];