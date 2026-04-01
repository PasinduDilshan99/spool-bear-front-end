import {
  FileText,
  AlertCircle,
  Scale,
  Shield,
  CreditCard,
  Truck,
  RefreshCw,
  UserCheck,
  BookOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Section {
  id: string;
  title: string;
  icon: LucideIcon;
  badge?: string;
}

export const sections: Section[] = [
  { id: "overview",     title: "Overview",               icon: FileText   },
  { id: "acceptance",   title: "Acceptance of Terms",    icon: Scale      },
  { id: "account",      title: "Account Registration",   icon: UserCheck  },
  { id: "orders",       title: "Orders & Payments",      icon: CreditCard, badge: "Important" },
  { id: "shipping",     title: "Shipping & Delivery",    icon: Truck      },
  { id: "returns",      title: "Returns & Refunds",      icon: RefreshCw  },
  { id: "privacy",      title: "Privacy & Security",     icon: Shield     },
  { id: "intellectual", title: "Intellectual Property",  icon: BookOpen   },
  { id: "limitations",  title: "Limitations of Liability", icon: AlertCircle },
  { id: "governing",    title: "Governing Law",          icon: Scale      },
];